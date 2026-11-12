'use server';

import crypto from 'crypto';
import path from 'path';
import { headers } from 'next/headers';
import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb, getAdminStorageBucket } from '@/server/firebase-admin';
import type { PlatformInvoice, InvoiceSigningFile } from '@/lib/types/billing';
import { toIsoString } from '@/server/data/utils';
import { sendInvoiceEmail } from '@/server/email/mailer';

// Allowed MIME types and max size (15MB)
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]);
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

// ─────────────────────────────────────────────────────────────
// Rate Limiter: In-memory sliding window counter (10 requests/hour per token or IP)
// ─────────────────────────────────────────────────────────────
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function checkRateLimit(key: string, limit: number = 10, windowMs: number = 60 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

// ─────────────────────────────────────────────────────────────
// Timing-Safe String Comparison Helper
// ─────────────────────────────────────────────────────────────
function timingSafeEqualHex(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  try {
    const bufA = Buffer.from(a, 'hex');
    const bufB = Buffer.from(b, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export interface VerifyTokenResult {
  valid: boolean;
  error?: 'invalid_token' | 'not_found' | 'cancelled' | 'expired' | 'missing_token';
  invoice?: PlatformInvoice;
  invoiceId?: string;
  token?: string;
}

/**
 * Validates the public customer signing token with timing-safe comparison,
 * ensuring document exists, is not cancelled, and token has not expired.
 */
export async function verifySigningToken(fullToken: string): Promise<VerifyTokenResult> {
  if (!fullToken || typeof fullToken !== 'string') {
    return { valid: false, error: 'missing_token' };
  }

  const dotIndex = fullToken.indexOf('.');
  if (dotIndex <= 0 || dotIndex >= fullToken.length - 1) {
    return { valid: false, error: 'invalid_token' };
  }

  const invoiceId = fullToken.substring(0, dotIndex);
  const rawToken = fullToken.substring(dotIndex + 1);

  const docSnap = await adminDb.collection('platform_invoices').doc(invoiceId).get();
  if (!docSnap.exists) {
    return { valid: false, error: 'not_found' };
  }

  const data = docSnap.data()!;

  // Must not be cancelled
  if (data.status === 'cancelled') {
    return { valid: false, error: 'cancelled' };
  }

  const storedHash = data.signing?.tokenHash;
  const expiresAt = data.signing?.expiresAt;

  if (!storedHash || !expiresAt) {
    return { valid: false, error: 'invalid_token' };
  }

  // Timing-safe compare of SHA-256 hash
  const computedHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  if (!timingSafeEqualHex(computedHash, storedHash)) {
    return { valid: false, error: 'invalid_token' };
  }

  // Check expiration
  const expTime = new Date(expiresAt).getTime();
  if (isNaN(expTime) || expTime < Date.now()) {
    return { valid: false, error: 'expired' };
  }

  // Sanitize signing and pdf to prevent leaking tokenHash or internal storage paths to public client
  const sanitizedSigning = data.signing
    ? {
        expiresAt: data.signing.expiresAt,
        sentTo: data.signing.sentTo,
        sentAt: data.signing.sentAt,
        viewedAt: data.signing.viewedAt,
        signedAt: data.signing.signedAt,
        reviewedBy: data.signing.reviewedBy,
        files: (data.signing.files || []).map((f: InvoiceSigningFile) => ({
          id: f.id,
          name: f.name,
          size: f.size,
          mimeType: f.mimeType,
          sha256: f.sha256,
          uploadedAt: f.uploadedAt,
          path: '', // stripped for public response
        })),
      }
    : undefined;

  const sanitizedPdf = data.pdf
    ? {
        sha256: data.pdf.sha256,
        path: '', // stripped for public response
      }
    : undefined;

  const invoice: PlatformInvoice = {
    id: docSnap.id,
    number: data.number || null,
    docKind: data.docKind || 'contract_invoice',
    customer: data.customer || { facilityName: '', name: '', address: '' },
    items: data.items || [],
    totals: data.totals || { subtotal: 0, discount: 0, taxable: 0, vat: 0, total: 0 },
    vatRatePercent: Number(data.vatRatePercent) || 0,
    currency: 'SAR',
    issueDate: data.issueDate || toIsoString(data.createdAt),
    dueDate: data.dueDate,
    terms: data.terms || [],
    notes: data.notes,
    seller: data.seller,
    status: data.status,
    signing: sanitizedSigning,
    pdf: sanitizedPdf,
    createdAt: toIsoString(data.createdAt),
    updatedAt: toIsoString(data.updatedAt || data.createdAt),
    createdBy: data.createdBy || '',
  };

  return {
    valid: true,
    invoice,
    invoiceId,
    token: rawToken,
  };
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
 * Re-verifies token, validates size & MIME type, and applies 10/hr rate limiting.
 */
export async function requestUploadUrlAction(
  fullToken: string,
  fileMeta: { name: string; size: number; type: string }
): Promise<{ success: boolean; data?: { uploadUrl: string; storagePath: string }; error?: string }> {
  const verification = await verifySigningToken(fullToken);
  if (!verification.valid || !verification.invoiceId) {
    return { success: false, error: 'رابط التوقيع غير صالح أو منتهي الصلاحية.' };
  }

  const { invoiceId } = verification;

  // Rate Limiting
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() || headerList.get('x-real-ip') || 'unknown';
  const rateLimitKey = `upload_${invoiceId}_${ip}`;
  if (!checkRateLimit(rateLimitKey, 10, 60 * 60 * 1000)) {
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
 * Confirms the direct upload to Storage:
 * 1. Checks object exists in storage and verifies actual size.
 * 2. Validates magic bytes (PDF, JPEG, PNG, WebP).
 * 3. Computes SHA-256 of the stored file.
 * 4. Appends to signing.files and updates status to 'uploaded'.
 * 5. Records event with evidence: timestamp, IP, User Agent, SHA-256, and size.
 * 6. Sends email alert to RASHX team.
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

  // 3. Compute SHA-256
  const fileSha256 = crypto.createHash('sha256').update(buffer).digest('hex');

  // 4. Capture Client Evidence
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() || headerList.get('x-real-ip') || 'unknown';
  const userAgent = headerList.get('user-agent') || 'unknown';
  const nowIso = new Date().toISOString();

  const fileEntry: InvoiceSigningFile = {
    name: fileMeta.name || 'signed-contract.pdf',
    path: cleanPath,
    uploadedAt: nowIso,
  };

  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);
  const batch = adminDb.batch();

  // Update Invoice Document
  batch.update(invoiceRef, {
    status: 'uploaded',
    'signing.files': FieldValue.arrayUnion(fileEntry),
    updatedAt: FieldValue.serverTimestamp(),
  });

  // Log Event with Complete Digital Evidence
  const eventRef = invoiceRef.collection('events').doc();
  batch.set(eventRef, {
    type: 'UPLOADED',
    by: 'customer',
    at: FieldValue.serverTimestamp(),
    meta: {
      timestamp: nowIso,
      ip,
      userAgent,
      fileSha256,
      fileSize: actualSize,
      fileName: fileMeta.name,
      storagePath: cleanPath,
    },
  });

  // Update Stats if status changed to uploaded
  if (invoice.status !== 'uploaded') {
    const statsRef = adminDb.collection('stats').doc('invoices');
    batch.set(
      statsRef,
      {
        [`${invoice.status}Count`]: FieldValue.increment(-1),
        [`counts.${invoice.status}`]: FieldValue.increment(-1),
        uploadedCount: FieldValue.increment(1),
        'counts.uploaded': FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  await batch.commit();
  updateTag('invoices');
  updateTag('invoice-stats');
  updateTag(`invoice:${invoiceId}`);

  // 5. Send Alert Email to RASHX Billing Team
  const notifyEmail = process.env.BILLING_NOTIFY_EMAIL || process.env.SMTP_USER;
  if (notifyEmail) {
    try {
      await sendInvoiceEmail({
        to: notifyEmail,
        invoiceNumber: invoice.number || invoiceId,
        facilityName: invoice.customer.facilityName,
        totalAmount: invoice.totals.total / 100,
        customerName: invoice.customer.name,
        customerPhone: invoice.customer.phone,
        notes: `تم رفع نسخة موقعة جديدة من قبل العميل: ${fileMeta.name} (حجم: ${(actualSize / 1024).toFixed(1)} KB, SHA-256: ${fileSha256.substring(0, 16)}...)`,
      });
    } catch (err) {
      console.warn('[confirmUploadAction] Failed to send team alert email:', err);
    }
  }

  return { success: true };
}
