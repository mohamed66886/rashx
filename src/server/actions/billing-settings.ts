'use server';

import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/server/firebase-admin';
import { requireAdmin } from '@/server/auth/session';
import { purgeBillingAssetsCache } from '@/server/data/billing-settings';
import type { PlatformBillingSettings } from '@/lib/types/platform';
import {
  saveBillingSettingsSchema,
  type SaveBillingSettingsInput,
  type BillingSettingsActionResponse,
} from '@/server/billing/schemas';

/**
 * Saves platform billing and official seller settings to Firestore with atomic audit logging.
 * Invalidates 'billing-settings' cache tag.
 */
export async function saveBillingSettingsAction(
  input: SaveBillingSettingsInput
): Promise<BillingSettingsActionResponse<PlatformBillingSettings>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);

  const validation = saveBillingSettingsSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات إعدادات الفوترة غير صالحة',
    };
  }

  const data = validation.data;
  const db = getAdminDb();
  const settingsRef = db.collection('platform_settings').doc('billing');

  try {
    const batch = db.batch();

    // 1. Set billing settings document
    batch.set(
      settingsRef,
      {
        seller: {
          nameAr: data.seller.nameAr,
          nameEn: data.seller.nameEn,
          commercialRegNumber: data.seller.commercialRegNumber,
          vatNumber: data.seller.vatNumber || '',
          address: data.seller.address,
          email: data.seller.email,
          phone: data.seller.phone,
          bankName: data.seller.bankName,
          accountName: data.seller.accountName,
          iban: data.seller.iban,
        },
        signaturePath: data.signaturePath || null,
        stampPath: data.stampPath || null,
        invoicePrefix: data.invoicePrefix,
        quotePrefix: data.quotePrefix,
        disclaimerLine: data.disclaimerLine,
        defaultDueDays: data.defaultDueDays,
        updatedAt: FieldValue.serverTimestamp(),
        updatedBy: admin.email || 'admin',
        updatedById: admin.uid || 'admin',
      },
      { merge: true }
    );

    // 2. Write Audit Log
    const auditRef = db.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid || 'admin',
      adminEmail: admin.email || 'admin',
      action: 'UPDATE_BILLING_SETTINGS',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        sellerNameAr: data.seller.nameAr,
        vatNumber: data.seller.vatNumber || '',
        iban: data.seller.iban,
        bankName: data.seller.bankName,
        invoicePrefix: data.invoicePrefix,
        quotePrefix: data.quotePrefix,
      },
    });

    await batch.commit();

    // Purge module memory cache
    purgeBillingAssetsCache();

    // Invalidate next cache tags
    try {
      updateTag('billing-settings');
      updateTag('invoices');
    } catch {
      // cache fallback — may throw outside request context
    }

    return {
      success: true,
      data: {
        seller: data.seller,
        signaturePath: data.signaturePath || null,
        stampPath: data.stampPath || null,
        invoicePrefix: data.invoicePrefix,
        quotePrefix: data.quotePrefix,
        disclaimerLine: data.disclaimerLine,
        defaultDueDays: data.defaultDueDays,
        updatedAt: new Date().toISOString(),
        updatedBy: admin.email,
      },
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'فشل في حفظ إعدادات الفوترة في قاعدة البيانات';
    console.error('[saveBillingSettingsAction] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}
