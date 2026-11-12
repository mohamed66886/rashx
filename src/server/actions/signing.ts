'use server';

import crypto from 'crypto';
import path from 'path';
import { headers } from 'next/headers';
import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb, getAdminStorageBucket } from '@/server/firebase-admin';
import type { InvoiceSigningFile, InvoiceStatus } from '@/lib/types/billing';
import { verifySigningToken } from '@/server/signing/verify';
import { sendSignedUploadNotificationEmail } from '@/server/email/mailer';

// Re-export verifySigningToken type for client usage if needed
export type { VerifyTokenResult } from '@/server/signing/verify';

// Allowed MIME types and max size (15MB)
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]);
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

// ─────────────────────────────────────────────────────────────
// Distributed Rate Limiter: Firestore Transaction with Sliding Window
// Stored in rate_limits/{key} (10 requests/hour limit)
// ─────────────────────────────────────────────────────────────
async function checkFirestoreRateLimit(
  key: string,
  limit: number = 10,
  windowMs: number = 60 * 60 * 1000
): Promise<boolean> {
  const cleanKey = key.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 100);
  const docRef = adminDb.collection('rate_limits').doc(cleanKey);
  const now = Date.now();

  try {
    return await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(docRef);
      if (!snap.exists) {
        tx.set(docRef, {
          count: 1,
          resetAt: now + windowMs,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });
        return true;
      }

      const data = snap.data()!;
      const resetAt = typeof data.resetAt === 'number' ? data.resetAt : 0;
      const count = typeof data.count === 'number' ? data.count : 0;

      if (now > resetAt) {
        tx.set(docRef, {
          count: 1,
          resetAt: now + windowMs,
          updatedAt: FieldValue.serverTimestamp(),
        });
        return true;
      }

      if (count >= limit) {
        return false;
      }

      tx.update(docRef, {
        count: count + 1,
        updatedAt: FieldValue.serverTimestamp(),
      });
      return true;
    });
  } catch (err) {
    console.warn('[checkFirestoreRateLimit] Transaction failed, allowing request:', err);
    return true; // fail-open for client resilience
  }
}

/**
 * Marks the document as 'viewed' upon first valid open by the customer.
 * Stores evidence: timestamp, IP address, user agent in the event metadata.
 */
export async function recordViewAction(fullToken: string): Promise<{ success: boolean }> {
  const verification = await verifySigningToken(fullToken);
  if (!verification.valid || !verification.invoice || !verification.invoiceId) {
    return { success: false };
  }

  const { invoice, invoiceId } = verification;

  // Only record once if not viewed before
  if (invoice.signing?.viewedAt) {
    return { success: true };
  }

  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() || headerList.get('x-real-ip') || 'unknown';
  const userAgent = headerList.get('user-agent') || 'unknown';
  const nowIso = new Date().toISOString();

  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);
  const batch = adminDb.batch();

  const updateFields: Record<string, unknown> = {
    'signing.viewedAt': nowIso,
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (invoice.status === 'sent') {
    updateFields.status = 'viewed';
    const statsRef = adminDb.collection('stats').doc('invoices');
    batch.set(
      statsRef,
      {
        sentCount: FieldValue.increment(-1),
        viewedCount: FieldValue.increment(1),
        'counts.sent': FieldValue.increment(-1),
        'counts.viewed': FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  batch.update(invoiceRef, updateFields);

  const eventRef = invoiceRef.collection('events').doc();
  batch.set(eventRef, {
    type: 'VIEWED',
    by: 'customer',
    at: FieldValue.serverTimestamp(),
    meta: {
      timestamp: nowIso,
      ip,
      userAgent,
    },
  });

  await batch.commit();
  updateTag('invoices');
  updateTag('invoice-stats');
  updateTag(`invoice:${invoiceId}`);

  return { success: true };
}

/**
 * Requests a direct-to-Storage V4 signed PUT URL for uploading signed contracts.
 * Re-verifies token, validates size & MIME type, enforces status gates,
 * adds x-goog-content-length-range header, and applies transactional rate limiting.
 */
export async function requestUploadUrlAction(
  fullToken: string,
  fileMeta: { name: string; size: number; type: string }
): Promise<{ success: boolean; data?: { uploadUrl: string; storagePath: string }; error?: string }> {
  const verification = await verifySigningToken(fullToken);
  if (!verification.valid || !verification.invoiceId || !verification.invoice) {
    return { success: false, error: 'رابط التوقيع غير صالح أو منتهي الصلاحية.' };
  }

  const { invoiceId, invoice } = verification;

  // Gate: Allow uploads ONLY when status is 'sent', 'viewed', or 'uploaded'
  if (!['sent', 'viewed', 'uploaded'].includes(invoice.status)) {
    return {
      success: false,
      error: 'رابط التوقيع غير متاح لرفع مستندات جديدة لهذا العقد.',
    };
  }

  // Rate Limiting via Firestore Counter Transaction
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() || headerList.get('x-real-ip') || 'unknown';
  const rateLimitKey = `upload_${invoiceId}_${ip}`;
  const allowed = await checkFirestoreRateLimit(rateLimitKey, 10, 60 * 60 * 1000);
  if (!allowed) {
    return {
      success: false,
      error: 'تجاوزت الحد المسموح لطلبات الرفع (10 طلبات بالساعة). يرجى المحاولة لاحقاً.',
    };
  }

  // Validate File Size (Max 15MB)
  if (!fileMeta.size || fileMeta.size <= 0) {
    return { success: false, error: 'ملف غير صالح أو فارغ.' };
  }
  if (fileMeta.size > MAX_FILE_SIZE) {
    return { success: false, error: 'حجم الملف يتجاوز الحد الأقصى المسموح به (15 ميجابايت).' };
  }

  // Validate MIME Type
  if (!ALLOWED_MIME_TYPES.has(fileMeta.type)) {
    return {
      success: false,
      error: 'نوع الملف غير مدعوم. الصيغ المدعومة هي: PDF, JPG, PNG, WebP.',
    };
  }

  const cleanExt = path.extname(fileMeta.name).toLowerCase() || (fileMeta.type === 'application/pdf' ? '.pdf' : '.png');
  const uniqueId = crypto.randomUUID();
  const storagePath = `invoices/${invoiceId}/signed/${uniqueId}${cleanExt}`;

  const bucket = getAdminStorageBucket();
  const file = bucket.file(storagePath);

  try {
    const [uploadUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      contentType: fileMeta.type,
      extensionHeaders: {
        'x-goog-content-length-range': '0,15728640',
      },
    });

    return {
      success: true,
      data: {
        uploadUrl,
        storagePath,
      },
    };
  } catch (err) {
    console.error('[requestUploadUrlAction] Error generating signed URL:', err);
    return {
      success: false,
      error: 'تعذر إنشاء رابط الرفع المباشر. يرجى المحاولة مرة أخرى.',
    };
  }
}

/**
 * Confirms direct upload to Storage:
 * 1. Checks object exists in storage and verifies actual size.
 * 2. Validates magic bytes (PDF, JPEG, PNG, WebP).
 * 3. Computes SHA-256 of the stored file.
 * 4. Appends to signing.files with full metadata: id, name, size, mimeType, sha256, path, uploadedAt.
 * 5. Performs status transition and stats update inside an atomic Firestore transaction.
 * 6. Sends internal email notification to RASHX platform staff.
 */
export async function confirmUploadAction(
  fullToken: string,
  storagePath: string,
  fileMeta: { name: string; size: number }
): Promise<{ success: boolean; error?: string }> {
  const verification = await verifySigningToken(fullToken);
  if (!verification.valid || !verification.invoiceId || !verification.invoice) {
    return { success: false, error: 'رابط التوقيع غير صالح أو منتهي الصلاحية.' };
  }

  const { invoiceId, invoice } = verification;

  // Gate: Allow uploads ONLY when status is 'sent', 'viewed', or 'uploaded'
  if (!['sent', 'viewed', 'uploaded'].includes(invoice.status)) {
    return {
      success: false,
      error: 'رابط التوقيع غير متاح لرفع مستندات جديدة لهذا العقد.',
    };
  }

  // Basic path sanitization
  const cleanPath = storagePath.replace(/\\/g, '/');
  if (!cleanPath.startsWith(`invoices/${invoiceId}/signed/`) || cleanPath.includes('..')) {
    return { success: false, error: 'مسار الملف غير صالح.' };
  }

  const bucket = getAdminStorageBucket();
  const file = bucket.file(cleanPath);

  const [exists] = await file.exists();
  if (!exists) {
    return { success: false, error: 'الملف المرفوع غير موجود في وحدة التخزين.' };
  }

  // 1. Check size
  const [metadata] = await file.getMetadata();
  const actualSize = Number(metadata.size) || 0;
  if (actualSize <= 0 || actualSize > MAX_FILE_SIZE) {
    await file.delete().catch(() => {});
    return { success: false, error: 'حجم الملف يتجاوز الحد الأقصى (15MB) أو الملف فارغ.' };
  }

  // 2. Download file buffer for magic bytes and SHA-256 computation
  const [buffer] = await file.download();

  // Validate Magic Bytes
  const isPdf = buffer.length >= 4 && buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46; // %PDF
  const isPng = buffer.length >= 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47; // .PNG
  const isJpg = buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff; // JPEG SOI
  const isWebp = buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP'; // WebP

  if (!isPdf && !isPng && !isJpg && !isWebp) {
    await file.delete().catch(() => {});
    return {
      success: false,
      error: 'محتوى الملف غير متوافق مع صيغ المستندات المدعومة (PDF, JPG, PNG, WebP).',
    };
  }

  const inferredMime = isPdf ? 'application/pdf' : isPng ? 'image/png' : isJpg ? 'image/jpeg' : 'image/webp';

  // 3. Compute SHA-256
  const fileSha256 = crypto.createHash('sha256').update(buffer).digest('hex');

  // 4. Capture Client Evidence
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() || headerList.get('x-real-ip') || 'unknown';
  const userAgent = headerList.get('user-agent') || 'unknown';
  const nowIso = new Date().toISOString();

  // Full file metadata stored in signing.files entry
  const fileId = crypto.randomUUID();
  const fileEntry: InvoiceSigningFile = {
    id: fileId,
    name: fileMeta.name || 'signed-contract.pdf',
    size: actualSize,
    mimeType: inferredMime,
    sha256: fileSha256,
    path: cleanPath,
    uploadedAt: nowIso,
    uploaderIp: ip,
    uploaderUserAgent: userAgent,
  };

  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);

  // 5. Update Status & Stats inside a single Firestore Transaction
  try {
    await adminDb.runTransaction(async (tx) => {
      const snap = await tx.get(invoiceRef);
      if (!snap.exists) {
        throw new Error('المستند المطلوب غير موجود.');
      }

      const currentData = snap.data()!;
      const currentStatus = currentData.status as InvoiceStatus;

      if (!['sent', 'viewed', 'uploaded'].includes(currentStatus)) {
        throw new Error('حالة المستند لا تسمح برفع نسخ جديدة حالياً.');
      }

      // Update invoice document
      tx.update(invoiceRef, {
        status: 'uploaded',
        'signing.files': FieldValue.arrayUnion(fileEntry),
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Log event
      const eventRef = invoiceRef.collection('events').doc();
      tx.set(eventRef, {
        type: 'UPLOADED',
        by: 'customer',
        at: FieldValue.serverTimestamp(),
        meta: {
          fileId,
          timestamp: nowIso,
          ip,
          userAgent,
          fileSha256,
          fileSize: actualSize,
          fileName: fileMeta.name,
          storagePath: cleanPath,
        },
      });

      // Update stats atomically using the status read inside transaction
      if (currentStatus !== 'uploaded') {
        const statsRef = adminDb.collection('stats').doc('invoices');
        tx.set(
          statsRef,
          {
            [`${currentStatus}Count`]: FieldValue.increment(-1),
            [`counts.${currentStatus}`]: FieldValue.increment(-1),
            uploadedCount: FieldValue.increment(1),
            'counts.uploaded': FieldValue.increment(1),
            updatedAt: FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
    });
  } catch (txErr: unknown) {
    const msg = txErr instanceof Error ? txErr.message : 'فشلت معالجة تأكيد الرفع';
    return { success: false, error: msg };
  }

  updateTag('invoices');
  updateTag('invoice-stats');
  updateTag(`invoice:${invoiceId}`);

  // 6. Send Internal Notification Email to RASHX Staff
  const notifyEmail = process.env.BILLING_NOTIFY_EMAIL || process.env.SMTP_USER;
  if (notifyEmail) {
    try {
      await sendSignedUploadNotificationEmail({
        to: notifyEmail,
        invoiceId,
        invoiceNumber: invoice.number || invoiceId,
        docKind: invoice.docKind,
        facilityName: invoice.customer.facilityName,
        customerName: invoice.customer.name,
        customerEmail: invoice.customer.email,
        customerPhone: invoice.customer.phone,
        fileName: fileMeta.name,
        fileSize: actualSize,
        fileSha256,
        uploadedAt: nowIso,
        uploaderIp: ip,
      });
    } catch (err) {
      console.warn('[confirmUploadAction] Failed to send team alert email:', err);
    }
  }

  return { success: true };
}
