import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { FieldValue } from 'firebase-admin/firestore';
import { updateTag } from 'next/cache';
import { adminDb, getAdminStorageBucket } from '@/server/firebase-admin';
import { getAdmin } from '@/server/auth/session';
import { purgeBillingAssetsCache } from '@/server/data/billing-settings';

function isValidImageMagicBytes(buf: Buffer): 'png' | 'webp' | null {
  if (buf.length < 12) return null;

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  const isPng =
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a;
  if (isPng) return 'png';

  // WebP: RIFF (bytes 0..3) + WEBP (bytes 8..11)
  const isWebp =
    buf[0] === 0x52 &&
    buf[1] === 0x49 &&
    buf[2] === 0x46 &&
    buf[3] === 0x46 &&
    buf[8] === 0x57 &&
    buf[9] === 0x45 &&
    buf[10] === 0x42 &&
    buf[11] === 0x50;
  if (isWebp) return 'webp';

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdmin(false);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!['super_admin', 'platform_engineer'].includes(admin.role)) {
      return NextResponse.json(
        { error: 'غير مصرح لك بتنفيذ هذه العملية. يتطلب صلاحية مسؤول المنظومة.' },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const assetType = formData.get('type'); // 'signature' | 'stamp'

    if (!assetType || (assetType !== 'signature' && assetType !== 'stamp')) {
      return NextResponse.json(
        { error: 'نوع الملف غير صالح. يجب تحديد signature أو stamp.' },
        { status: 400 }
      );
    }

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'لم يتم استلام أي ملف صالح للرفع.' },
        { status: 400 }
      );
    }

    // 2MB size limit
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'حجم الملف يتجاوز الحد الأقصى المسموح به (2 ميجابايت).' },
        { status: 400 }
      );
    }

    const rawBuffer = Buffer.from(await file.arrayBuffer());

    // Magic bytes verification
    const detectedFormat = isValidImageMagicBytes(rawBuffer);
    if (!detectedFormat) {
      return NextResponse.json(
        { error: 'صيغة الملف غير مدعومة. يقبل النظام فقط ملفات PNG أو WebP الحقيقية والمحققة.' },
        { status: 400 }
      );
    }

    // Process with sharp: trim transparent edges, resize to max 600px wide, output PNG
    let processedBuffer: Buffer;
    try {
      processedBuffer = await sharp(rawBuffer)
        .trim()
        .resize({ width: 600, withoutEnlargement: true })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer();
    } catch {
      processedBuffer = await sharp(rawBuffer)
        .resize({ width: 600, withoutEnlargement: true })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer();
    }

    const destinationPath =
      assetType === 'signature'
        ? 'billing/assets/signature.png'
        : 'billing/assets/stamp.png';

    // Store in Firebase Storage (private; Admin SDK only; never public URLs)
    const bucket = getAdminStorageBucket();
    const storageFile = bucket.file(destinationPath);
    await storageFile.save(processedBuffer, {
      contentType: 'image/png',
      metadata: {
        cacheControl: 'private, max-age=3600',
        uploadedBy: admin.email,
        uploadedAt: new Date().toISOString(),
      },
    });

    // Update Firestore platform_settings/billing doc & write audit log
    const batch = adminDb.batch();
    const settingsRef = adminDb.collection('platform_settings').doc('billing');
    const updateField =
      assetType === 'signature'
        ? { signaturePath: destinationPath }
        : { stampPath: destinationPath };

    batch.set(
      settingsRef,
      {
        ...updateField,
        updatedAt: FieldValue.serverTimestamp(),
        updatedBy: admin.email,
        updatedById: admin.uid,
      },
      { merge: true }
    );

    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'UPLOAD_BILLING_ASSET',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        assetType,
        destinationPath,
        sizeBytes: processedBuffer.length,
      },
    });

    await batch.commit();

    purgeBillingAssetsCache();
    try {
      updateTag('billing-settings');
      updateTag('invoices');
    } catch {
      // cache fallback
    }

    return NextResponse.json({
      success: true,
      path: destinationPath,
      assetType,
      size: processedBuffer.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل أثناء معالجة ورفع الملف';
    console.error('[POST /api/dashboard/billing/upload] Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
