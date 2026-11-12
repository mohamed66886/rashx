'use server';

import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { adminDb } from '@/server/firebase-admin';
import { requireAdmin } from '@/server/auth/session';
import { purgeBillingAssetsCache } from '@/server/data/billing-settings';
import type { PlatformBillingSettings } from '@/lib/types/platform';

const saudiIbanRegex = /^SA\d{22}$/;
const saudiCrRegex = /^\d{10}$/;
const saudiVatRegex = /^\d{15}$/;

export const billingSellerSchema = z.object({
  nameAr: z.string().trim().min(2, 'الاسم بالعربية مطلوب (حرفين على الأقل)'),
  nameEn: z.string().trim().min(2, 'الاسم بالإنجليزية مطلوب (حرفين على الأقل)'),
  commercialRegNumber: z
    .string()
    .trim()
    .regex(saudiCrRegex, 'رقم السجل التجاري يجب أن يتكون من 10 أرقام'),
  vatNumber: z
    .string()
    .trim()
    .regex(saudiVatRegex, 'الرقم الضريبي يجب أن يتكون من 15 رقماً')
    .or(z.literal(''))
    .optional()
    .default(''),
  address: z.string().trim().min(2, 'العنوان الرسمي للمنشأة مطلوب'),
  email: z.string().trim().email('البريد الإلكتروني الرسمي غير صالح'),
  phone: z.string().trim().min(8, 'رقم الهاتف الرسمي مطلوب'),
  bankName: z.string().trim().min(2, 'اسم البنك المعتمد مطلوب'),
  accountName: z.string().trim().min(2, 'اسم صاحب الحساب الرسمي مطلوب'),
  iban: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, '').toUpperCase())
    .refine((val) => saudiIbanRegex.test(val), {
      message: 'الآيبان البنكي يجب أن يبدأ بـ SA متبوعاً بـ 22 رقماً',
    }),
});

export const saveBillingSettingsSchema = z.object({
  seller: billingSellerSchema,
  signaturePath: z.string().trim().nullable().optional(),
  stampPath: z.string().trim().nullable().optional(),
  invoicePrefix: z.string().trim().min(1, 'بادئة الفواتير مطلوبة').default('INV'),
  quotePrefix: z.string().trim().min(1, 'بادئة عروض الأسعار مطلوبة').default('QUO'),
  disclaimerLine: z.string().trim().min(5, 'سطر التنويه القانوني مطلوب').default('هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.'),
  defaultDueDays: z.coerce.number().int().positive('أيام الاستحقاق يجب أن تكون رقماً موجباً').default(14),
});

export type SaveBillingSettingsInput = z.infer<typeof saveBillingSettingsSchema>;

export interface BillingSettingsActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

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
  const settingsRef = adminDb.collection('platform_settings').doc('billing');

  try {
    const batch = adminDb.batch();

    // 1. Set billing settings document
    batch.set(
      settingsRef,
      {
        seller: {
          nameAr: data.seller.nameAr,
          nameEn: data.seller.nameEn,
          commercialRegNumber: data.seller.commercialRegNumber,
          vatNumber: data.seller.vatNumber,
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
        updatedBy: admin.email,
        updatedById: admin.uid,
      },
      { merge: true }
    );

    // 2. Write Audit Log
    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'UPDATE_BILLING_SETTINGS',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        sellerNameAr: data.seller.nameAr,
        vatNumber: data.seller.vatNumber,
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
      // cache fallback
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
    const message = error instanceof Error ? error.message : 'فشل في حفظ إعدادات الفوترة في قاعدة البيانات';
    console.error('[saveBillingSettingsAction] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

