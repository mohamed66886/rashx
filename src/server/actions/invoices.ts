'use server';

import crypto from 'crypto';
import { after } from 'next/server';
import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { adminDb, getAdminStorageBucket } from '@/server/firebase-admin';
import { requireAdmin } from '@/server/auth/session';
import { computeTotals } from '@/server/invoices/compute-totals';
import { nextInvoiceNumber } from '@/server/invoices/counters';
import { getBillingSettings, toBillingSettings } from '@/server/data/billing-settings';
import { getClauses } from '@/server/data/clauses';
import { getInvoicesPage, getInvoice } from '@/server/data/invoices';
import { toIsoString } from '@/server/data/utils';
import { generateInvoicePdf } from '@/server/pdf/invoice-pdf';
import { sendInvoiceEmail, generateInvoicePdfBuffer } from '@/server/email/mailer';
import type {
  PlatformInvoice,
  InvoiceStatus,
  InvoiceDocKind,
  InvoiceSeller,
  InvoiceSigningFile,
} from '@/lib/types/billing';
import { halalasToSar } from '@/lib/types/billing';

// ─────────────────────────────────────────────────────────────
// Schemas
// ─────────────────────────────────────────────────────────────

export const invoiceItemSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  description: z.string().trim().min(1, 'اسم الخدمة أو المنتج مطلوب'),
  quantity: z.coerce.number().positive('الكمية يجب أن تكون أكبر من 0'),
  unitPriceHalalas: z.coerce.number().int().nonnegative('السعر بالهللات يجب أن يكون 0 أو أكثر'),
});

export const invoiceCustomerSchema = z.object({
  facilityName: z.string().trim().min(2, 'اسم المنشأة مطلوب (حرفين على الأقل)'),
  commercialRegNumber: z.string().trim().optional(),
  name: z.string().trim().min(2, 'اسم العميل / المفوض مطلوب'),
  address: z.string().trim().min(2, 'العنوان مطلوب'),
  email: z.string().trim().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  phone: z.string().trim().optional(),
});

export const saveDraftInvoiceSchema = z.object({
  id: z.string().trim().optional(),
  docKind: z.enum(['contract_invoice', 'quote'] as const).default('contract_invoice'),
  customer: invoiceCustomerSchema,
  items: z.array(invoiceItemSchema).min(1, 'يجب إضافة بند واحد على الأقل في الفاتورة'),
  discountHalalas: z.coerce.number().int().nonnegative().default(0),
  vatRatePercent: z.coerce.number().min(0).max(100).default(15),
  issueDate: z.string().trim().min(1, 'تاريخ الإصدار مطلوب'),
  dueDate: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export const issueInvoiceSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف الفاتورة مطلوب'),
});

export const cancelInvoiceSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف الفاتورة مطلوب'),
  reason: z.string().trim().min(3, 'سبب الإلغاء مطلوب (3 أحرف على الأقل)'),
});

export const markPaidSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف الفاتورة مطلوب'),
  paymentMethod: z.string().trim().optional().default('bank-transfer'),
  reference: z.string().trim().optional(),
});

export const approveSignedFileSchema = z.object({
  invoiceId: z.string().min(1, 'معرف المستند مطلوب'),
});

export const rejectSignedFileSchema = z.object({
  invoiceId: z.string().min(1, 'معرف المستند مطلوب'),
  reason: z.string().trim().min(2, 'سبب الرفض مطلوب'),
});

export type SaveDraftInvoiceInput = z.infer<typeof saveDraftInvoiceSchema>;
export type IssueInvoiceInput = z.infer<typeof issueInvoiceSchema>;
export type CancelInvoiceInput = z.infer<typeof cancelInvoiceSchema>;
export type MarkPaidInput = z.infer<typeof markPaidSchema>;
export type ApproveSignedFileInput = z.infer<typeof approveSignedFileSchema>;
export type RejectSignedFileInput = z.infer<typeof rejectSignedFileSchema>;

export interface InvoiceActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  emailSent?: boolean;
}

// ─────────────────────────────────────────────────────────────
// 1. saveDraftInvoice
// ─────────────────────────────────────────────────────────────
/**
 * Creates or updates a draft invoice in platform_invoices/{id}.
 * Computes totals with computeTotals pure function.
 * Uses atomic WriteBatch (invoice doc + event + audit log + stats increment).
 * Purges 'invoices' tag.
 */
export async function saveDraftInvoice(
  input: SaveDraftInvoiceInput
): Promise<InvoiceActionResponse<PlatformInvoice>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const validation = saveDraftInvoiceSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات مسودة الفاتورة غير صالحة',
    };
  }

  const data = validation.data;
  const totals = computeTotals(data.items, data.discountHalalas, data.vatRatePercent);

  const invoiceRef = data.id
    ? adminDb.collection('platform_invoices').doc(data.id)
    : adminDb.collection('platform_invoices').doc();
  const invoiceId = invoiceRef.id;

  try {
    const existingDoc = data.id ? await invoiceRef.get() : null;
    const isNew = !existingDoc || !existingDoc.exists;

    if (!isNew && existingDoc) {
      const currentStatus = existingDoc.data()?.status;
      if (currentStatus && currentStatus !== 'draft') {
        return {
          success: false,
          error: `لا يمكن تعديل المستند كمسودة؛ حالته الحالية هي: ${currentStatus}`,
        };
      }
    }

    const batch = adminDb.batch();

    // 1. Invoice Document
    batch.set(
      invoiceRef,
      {
        id: invoiceId,
        number: null, // Draft has no sequential number assigned yet
        docKind: data.docKind,
        customer: data.customer,
        items: data.items,
        totals,
        vatRatePercent: data.vatRatePercent,
        currency: 'SAR',
        issueDate: data.issueDate,
        dueDate: data.dueDate || null,
        notes: data.notes || null,
        status: 'draft',
        updatedAt: FieldValue.serverTimestamp(),
        ...(isNew && {
          createdAt: FieldValue.serverTimestamp(),
          createdBy: admin.email,
        }),
      },
      { merge: true }
    );

    // 2. Subcollection Event
    const eventRef = invoiceRef.collection('events').doc();
    batch.set(eventRef, {
      type: isNew ? 'DRAFT_CREATED' : 'DRAFT_UPDATED',
      at: FieldValue.serverTimestamp(),
      by: admin.email,
      meta: {
        totalHalalas: totals.total,
        itemsCount: data.items.length,
      },
    });

    // 3. Audit Log
    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: isNew ? 'CREATE_DRAFT_INVOICE' : 'UPDATE_DRAFT_INVOICE',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        invoiceId,
        facilityName: data.customer.facilityName,
        totalHalalas: totals.total,
      },
    });

    // 4. Stats Increment on stats/invoices
    if (isNew) {
      const statsRef = adminDb.collection('stats').doc('invoices');
      batch.set(
        statsRef,
        {
          draftCount: FieldValue.increment(1),
          'counts.draft': FieldValue.increment(1),
          totalCount: FieldValue.increment(1),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }

    await batch.commit();

    try {
      updateTag('invoices');
      updateTag('invoice-stats');
      updateTag(`invoice:${invoiceId}`);
    } catch {
      // cache fallback
    }

    return {
      success: true,
      data: {
        id: invoiceId,
        number: null,
        docKind: data.docKind,
        customer: data.customer,
        items: data.items,
        totals,
        vatRatePercent: data.vatRatePercent,
        currency: 'SAR',
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        terms: [],
        notes: data.notes,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: admin.email,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في حفظ مسودة الفاتورة';
    console.error('[saveDraftInvoice] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

// ─────────────────────────────────────────────────────────────
// 2. issueInvoice
// ─────────────────────────────────────────────────────────────
/**
 * Issues an official invoice:
 * - Assigns monotonic number via nextInvoiceNumber (counters/invoices-{year})
 * - Freezes seller billing settings copy at issue time
 * - Freezes active contract clauses (terms) copy at issue time
 * - Updates status to 'issued'
 * - Single WriteBatch (invoice + event + audit log + stats increment)
 * - Purges 'invoices' tag
 */
export async function issueInvoice(
  input: IssueInvoiceInput
): Promise<InvoiceActionResponse<{ id: string; number: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const validation = issueInvoiceSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'معرف الفاتورة غير صالح',
    };
  }

  const { invoiceId } = validation.data;
  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);

  try {
    const invoiceDoc = await invoiceRef.get();
    if (!invoiceDoc.exists) {
      return {
        success: false,
        error: 'المستند المطلوب غير موجود في قاعدة البيانات',
      };
    }

    const invoiceData = invoiceDoc.data()!;
    if (invoiceData.status !== 'draft') {
      return {
        success: false,
        error: `لا يمكن إصدار المستند؛ حالته الحالية: ${invoiceData.status}`,
      };
    }

    // 1. Fetch Billing Settings & Active Clauses
    const [rawBilling, activeClauses] = await Promise.all([
      getBillingSettings(),
      getClauses(false),
    ]);

    if (!rawBilling || !rawBilling.seller?.iban || !rawBilling.seller?.bankName) {
      return {
        success: false,
        error: 'إعدادات الفوترة والآيبان البنكي للمنصة غير مكتملة. يرجى ضبطها أولاً من إعدادات الفوترة.',
      };
    }

    const sellerSnapshot: InvoiceSeller = {
      nameAr: rawBilling.seller.nameAr,
      nameEn: rawBilling.seller.nameEn,
      commercialRegNumber: rawBilling.seller.commercialRegNumber,
      vatNumber: rawBilling.seller.vatNumber || undefined,
      address: rawBilling.seller.address,
      email: rawBilling.seller.email,
      phone: rawBilling.seller.phone,
      bankName: rawBilling.seller.bankName,
      accountName: rawBilling.seller.accountName,
      iban: rawBilling.seller.iban,
      disclaimerLine: rawBilling.disclaimerLine,
    };

    // 2. Generate sequential number atomically via Firestore counter transaction
    const docKind = (invoiceData.docKind as InvoiceDocKind) || 'contract_invoice';
    const prefix = docKind === 'quote' ? (rawBilling.quotePrefix || 'QUO') : (rawBilling.invoicePrefix || 'INV');
    const invoiceNumber = await nextInvoiceNumber(prefix);

    // 3. Assemble full issued invoice snapshot and generate immutable PDF
    const issuedInvoiceSnapshot: PlatformInvoice = {
      id: invoiceId,
      number: invoiceNumber,
      docKind,
      customer: invoiceData.customer,
      items: Array.isArray(invoiceData.items) ? invoiceData.items : [],
      totals: invoiceData.totals || { subtotal: 0, discount: 0, taxable: 0, vat: 0, total: 0 },
      vatRatePercent: Number(invoiceData.vatRatePercent) || 0,
      currency: 'SAR',
      issueDate: invoiceData.issueDate || new Date().toISOString(),
      dueDate: invoiceData.dueDate,
      terms: activeClauses,
      notes: invoiceData.notes,
      seller: sellerSnapshot,
      status: 'issued',
      createdAt: invoiceData.createdAt ? toIsoString(invoiceData.createdAt) : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: invoiceData.createdBy || admin.email,
    };

    const { buffer: pdfBuffer, sha256 } = await generateInvoicePdf(issuedInvoiceSnapshot);

    // Upload to Storage invoices/{id}/original.pdf
    const storagePath = `invoices/${invoiceId}/original.pdf`;
    const bucket = getAdminStorageBucket();
    await bucket.file(storagePath).save(pdfBuffer, {
      metadata: {
        contentType: 'application/pdf',
        metadata: {
          invoiceId,
          number: invoiceNumber,
          sha256,
          issuedBy: admin.email,
        },
      },
    });

    const batch = adminDb.batch();

    // 4. Update Invoice Document with frozen seller, terms, and immutable PDF record
    batch.update(invoiceRef, {
      number: invoiceNumber,
      status: 'issued',
      seller: sellerSnapshot,
      terms: activeClauses,
      pdf: {
        path: storagePath,
        sha256,
      },
      issuedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // 4. Subcollection Event
    const eventRef = invoiceRef.collection('events').doc();
    batch.set(eventRef, {
      type: 'ISSUED',
      at: FieldValue.serverTimestamp(),
      by: admin.email,
      meta: {
        number: invoiceNumber,
        totalHalalas: invoiceData.totals?.total || 0,
        termsCount: activeClauses.length,
      },
    });

    // 5. Audit Log
    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'ISSUE_INVOICE',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        invoiceId,
        number: invoiceNumber,
        totalHalalas: invoiceData.totals?.total || 0,
      },
    });

    // 6. Stats in stats/invoices
    const statsRef = adminDb.collection('stats').doc('invoices');
    const invoiceTotalHalalas = Number(invoiceData.totals?.total) || 0;
    batch.set(
      statsRef,
      {
        draftCount: FieldValue.increment(-1),
        'counts.draft': FieldValue.increment(-1),
        issuedCount: FieldValue.increment(1),
        'counts.issued': FieldValue.increment(1),
        outstandingAmount: FieldValue.increment(invoiceTotalHalalas),
        totalAmountHalalas: FieldValue.increment(invoiceTotalHalalas),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await batch.commit();

    try {
      updateTag('invoices');
      updateTag('invoice-stats');
      updateTag(`invoice:${invoiceId}`);
    } catch {
      // cache fallback
    }

    return {
      success: true,
      data: {
        id: invoiceId,
        number: invoiceNumber,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في إصدار الفاتورة رسمياً';
    console.error('[issueInvoice] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

// ─────────────────────────────────────────────────────────────
// 3. cancelInvoice
// ─────────────────────────────────────────────────────────────
/**
 * Cancels an invoice.
 * Updates status to 'cancelled', records cancel reason, logs event, writes audit log, updates stats.
 */
export async function cancelInvoice(
  input: CancelInvoiceInput
): Promise<InvoiceActionResponse<{ id: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);

  const validation = cancelInvoiceSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات إلغاء الفاتورة غير صالحة',
    };
  }

  const { invoiceId, reason } = validation.data;
  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);

  try {
    const invoiceDoc = await invoiceRef.get();
    if (!invoiceDoc.exists) {
      return {
        success: false,
        error: 'المستند المطلوب غير موجود في قاعدة البيانات',
      };
    }

    const invoiceData = invoiceDoc.data()!;
    const previousStatus = invoiceData.status as InvoiceStatus;

    if (previousStatus === 'cancelled') {
      return {
        success: false,
        error: 'هذا المستند ملغي بالفعل مسبقاً',
      };
    }

    const batch = adminDb.batch();

    // 1. Update Invoice Doc
    batch.update(invoiceRef, {
      status: 'cancelled',
      cancelReason: reason,
      cancelledAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // 2. Subcollection Event
    const eventRef = invoiceRef.collection('events').doc();
    batch.set(eventRef, {
      type: 'CANCELLED',
      at: FieldValue.serverTimestamp(),
      by: admin.email,
      meta: {
        reason,
        previousStatus,
      },
    });

    // 3. Audit Log
    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'CANCEL_INVOICE',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        invoiceId,
        number: invoiceData.number,
        reason,
        previousStatus,
      },
    });

    // 4. Update Stats
    const statsRef = adminDb.collection('stats').doc('invoices');
    const invoiceTotalHalalas = Number(invoiceData.totals?.total) || 0;
    const statsUpdate: Record<string, unknown> = {
      cancelledCount: FieldValue.increment(1),
      'counts.cancelled': FieldValue.increment(1),
      [`${previousStatus}Count`]: FieldValue.increment(-1),
      [`counts.${previousStatus}`]: FieldValue.increment(-1),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (previousStatus !== 'draft') {
      statsUpdate.totalAmountHalalas = FieldValue.increment(-invoiceTotalHalalas);
      // If it was unpaid, decrement outstandingAmount
      if (previousStatus !== 'paid') {
        statsUpdate.outstandingAmount = FieldValue.increment(-invoiceTotalHalalas);
      }
    }

    batch.set(statsRef, statsUpdate, { merge: true });

    await batch.commit();

    try {
      updateTag('invoices');
      updateTag('invoice-stats');
      updateTag(`invoice:${invoiceId}`);
    } catch {
      // cache fallback
    }

    return {
      success: true,
      data: { id: invoiceId },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في إلغاء الفاتورة';
    console.error('[cancelInvoice] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

// ─────────────────────────────────────────────────────────────
// 4. markPaid
// ─────────────────────────────────────────────────────────────
/**
 * Marks an invoice as paid.
 * Updates status to 'paid', logs payment details, writes event + audit log, updates stats.
 */
export async function markPaid(
  input: MarkPaidInput
): Promise<InvoiceActionResponse<{ id: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const validation = markPaidSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات تسوية السداد غير صالحة',
    };
  }

  const { invoiceId, paymentMethod, reference } = validation.data;
  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);

  try {
    const invoiceDoc = await invoiceRef.get();
    if (!invoiceDoc.exists) {
      return {
        success: false,
        error: 'المستند المطلوب غير موجود في قاعدة البيانات',
      };
    }

    const invoiceData = invoiceDoc.data()!;
    const previousStatus = invoiceData.status as InvoiceStatus;

    if (previousStatus === 'paid') {
      return {
        success: false,
        error: 'تم تسجيل سداد هذه الفاتورة بالفعل مسبقاً',
      };
    }

    if (previousStatus === 'cancelled') {
      return {
        success: false,
        error: 'لا يمكن تسجيل سداد مستند ملغي',
      };
    }

    const batch = adminDb.batch();

    // 1. Update Invoice Doc
    batch.update(invoiceRef, {
      status: 'paid',
      paymentMethod,
      paymentReference: reference || null,
      paidAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // 2. Subcollection Event
    const eventRef = invoiceRef.collection('events').doc();
    batch.set(eventRef, {
      type: 'PAID',
      at: FieldValue.serverTimestamp(),
      by: admin.email,
      meta: {
        paymentMethod,
        reference: reference || null,
        previousStatus,
      },
    });

    // 3. Audit Log
    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'MARK_INVOICE_PAID',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        invoiceId,
        number: invoiceData.number,
        paymentMethod,
        reference,
      },
    });

    // 4. Update Stats
    const statsRef = adminDb.collection('stats').doc('invoices');
    const invoiceTotalHalalas = Number(invoiceData.totals?.total) || 0;
    const statsUpdate: Record<string, unknown> = {
      paidCount: FieldValue.increment(1),
      'counts.paid': FieldValue.increment(1),
      [`${previousStatus}Count`]: FieldValue.increment(-1),
      [`counts.${previousStatus}`]: FieldValue.increment(-1),
      outstandingAmount: FieldValue.increment(-invoiceTotalHalalas),
      paidAmountThisMonth: FieldValue.increment(invoiceTotalHalalas),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (previousStatus === 'draft') {
      statsUpdate.totalAmountHalalas = FieldValue.increment(invoiceTotalHalalas);
    }

    batch.set(statsRef, statsUpdate, { merge: true });

    await batch.commit();

    try {
      updateTag('invoices');
      updateTag('invoice-stats');
      updateTag(`invoice:${invoiceId}`);
    } catch {
      // cache fallback
    }

    return {
      success: true,
      data: { id: invoiceId },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في تسجيل سداد الفاتورة';
    console.error('[markPaid] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

// ─────────────────────────────────────────────────────────────
// Backward Compatibility Handlers for UI and Existing Views
// ─────────────────────────────────────────────────────────────

/**
 * Creates an invoice directly (issues or creates draft depending on requested status)
 */
export async function createInvoiceAction(input: {
  docKind?: InvoiceDocKind;
  facilityName: string;
  facilityAddress: string;
  invoiceDate: string;
  startDate?: string;
  endDate?: string;
  planName?: string;
  paymentDetails?: string;
  dueDate?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  taxNumber?: string;
  commercialReg?: string;
  items: Array<{ id?: string; description: string; quantity: number; unitPrice: number }>;
  subtotal?: number;
  discount?: number;
  vatEnabled?: boolean;
  vatRate?: number;
  paymentMethod?: string;
  status?: string;
  notes?: string;
  sendEmailOnCreate?: boolean;
  recipientEmail?: string;
}): Promise<InvoiceActionResponse<{ id: string; invoiceNumber: string }>> {
  // Convert SAR inputs to integer halalas
  const itemsHalalas = input.items.map((it) => ({
    id: it.id || Math.random().toString(36).substring(2, 9),
    description: it.description,
    quantity: it.quantity,
    unitPriceHalalas: Math.round(Number(it.unitPrice || 0) * 100),
  }));

  const discountHalalas = Math.round(Number(input.discount || 0) * 100);
  const vatRatePercent = input.vatEnabled ? Math.round((Number(input.vatRate) || 0.15) * 100) : 0;

  // 1. Save Draft
  const draftRes = await saveDraftInvoice({
    docKind: input.docKind || 'contract_invoice',
    customer: {
      facilityName: input.facilityName,
      commercialRegNumber: input.commercialReg,
      name: input.customerName || input.facilityName,
      address: input.facilityAddress,
      email: input.customerEmail,
      phone: input.customerPhone,
    },
    items: itemsHalalas,
    discountHalalas,
    vatRatePercent,
    issueDate: input.invoiceDate,
    dueDate: input.dueDate,
    notes: input.notes,
  });

  if (!draftRes.success || !draftRes.data) {
    return {
      success: false,
      error: draftRes.error || 'فشل في حفظ مسودة الفاتورة',
    };
  }

  const invoiceId = draftRes.data.id;

  // 2. Issue the invoice immediately
  const issueRes = await issueInvoice({ invoiceId });
  if (!issueRes.success || !issueRes.data) {
    return {
      success: false,
      error: issueRes.error || 'فشل في إصدار الفاتورة',
    };
  }

  const invoiceNumber = issueRes.data.number;

  // If status is paid, mark paid
  if (input.status === 'paid') {
    await markPaid({
      invoiceId,
      paymentMethod: input.paymentMethod || 'bank-transfer',
      reference: input.paymentDetails,
    });
  }

  // Optional Email dispatch
  let emailSent = false;
  const targetEmail = (input.recipientEmail || input.customerEmail)?.trim();
  if (input.sendEmailOnCreate && targetEmail) {
    const totals = draftRes.data.totals;
    const emailRes = await sendInvoiceEmail({
      to: targetEmail,
      invoiceNumber,
      docKind: input.docKind,
      vatEnabled: input.vatEnabled,
      vatRate: input.vatRate,
      facilityName: input.facilityName,
      facilityAddress: input.facilityAddress,
      invoiceDate: input.invoiceDate,
      startDate: input.startDate,
      endDate: input.endDate,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      taxNumber: input.taxNumber,
      planName: input.planName,
      items: input.items.map((it) => ({
        description: it.description,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        total: it.quantity * it.unitPrice,
      })),
      subtotal: halalasToSar(totals.subtotal),
      discount: halalasToSar(totals.discount),
      vatAmount: halalasToSar(totals.vat),
      totalAmount: halalasToSar(totals.total),
      paymentDetails: input.paymentDetails,
    });
    if (emailRes.success) emailSent = true;
  }

  return {
    success: true,
    data: {
      id: invoiceId,
      invoiceNumber,
    },
    emailSent,
  };
}

export async function cancelInvoiceAction(
  invoiceId: string,
  reason: string = 'إلغاء من قبل المشرف'
): Promise<InvoiceActionResponse<{ id: string }>> {
  return cancelInvoice({ invoiceId, reason });
}

export async function deleteInvoiceAction(
  input: string | { invoiceId: string }
): Promise<InvoiceActionResponse<{ deletedId: string }>> {
  const invoiceId = typeof input === 'string' ? input : input.invoiceId;
  const result = await cancelInvoice({ invoiceId, reason: 'حذف المسودة من لوحة التحكم' });
  if (!result.success || !result.data) {
    return { success: false, error: result.error || 'فشل في حذف المسودة' };
  }
  return { success: true, data: { deletedId: result.data.id } };
}

export async function generateInvoicePdfAction(params: {
  invoiceNumber: string;
  docKind?: InvoiceDocKind;
  vatEnabled?: boolean;
  vatRate?: number;
  facilityName: string;
  facilityAddress?: string;
  invoiceDate?: string;
  startDate?: string;
  endDate?: string;
  customerName?: string;
  customerPhone?: string;
  taxNumber?: string;
  planName?: string;
  items?: Array<{ description: string; quantity: number; unitPrice: number; total: number }>;
  subtotal?: number;
  discount?: number;
  vatAmount?: number;
  totalAmount: number;
  paymentDetails?: string;
}): Promise<InvoiceActionResponse<{ pdfBase64: string }>> {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  try {
    const rawBilling = await getBillingSettings();
    const pdfBuf = generateInvoicePdfBuffer({
      to: '',
      invoiceNumber: params.invoiceNumber,
      docKind: params.docKind,
      vatEnabled: params.vatEnabled,
      vatRate: params.vatRate,
      facilityName: params.facilityName,
      facilityAddress: params.facilityAddress,
      invoiceDate: params.invoiceDate,
      startDate: params.startDate,
      endDate: params.endDate,
      customerName: params.customerName,
      customerPhone: params.customerPhone,
      taxNumber: params.taxNumber,
      planName: params.planName,
      items: params.items,
      subtotal: params.subtotal,
      discount: params.discount,
      vatAmount: params.vatAmount,
      totalAmount: params.totalAmount,
      paymentDetails: params.paymentDetails,
      billingSettings: rawBilling ? {
        facilityName: rawBilling.seller.nameAr || rawBilling.seller.nameEn,
        accountName: rawBilling.seller.accountName,
        bankName: rawBilling.seller.bankName,
        iban: rawBilling.seller.iban,
        taxNumber: rawBilling.seller.vatNumber,
        commercialReg: rawBilling.seller.commercialRegNumber,
        address: rawBilling.seller.address,
        disclaimerLine: rawBilling.disclaimerLine,
      } : null,
    });

    return {
      success: true,
      data: {
        pdfBase64: pdfBuf.toString('base64'),
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'فشل في توليد مستند PDF';
    console.error('[generateInvoicePdfAction] Error:', err);
    return {
      success: false,
      error: message,
    };
  }
}

export async function sendInvoiceAction(
  invoiceId: string,
  recipientEmail?: string
): Promise<InvoiceActionResponse<{ signingUrl: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);
  const doc = await invoiceRef.get();
  if (!doc.exists) {
    return { success: false, error: 'المستند غير موجود' };
  }

  const data = doc.data()!;
  // Check status: issued or sent only
  if (data.status !== 'issued' && data.status !== 'sent') {
    return {
      success: false,
      error: `لا يمكن إرسال المستند في حالته الحالية (${data.status}). الإرسال متاح للمستندات المصدرة أو المرسلة فقط.`,
    };
  }

  const targetEmail = recipientEmail || data.customer?.email;
  if (!targetEmail || !targetEmail.trim()) {
    return {
      success: false,
      error: 'البريد الإلكتروني للمستلم مطلوب لإتمام عملية الإرسال',
    };
  }

  // 1. Generate 32-byte random token
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

  // 2. Build signing URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rashx.com';
  const locale = 'ar';
  const signingUrl = `${siteUrl}/${locale}/sign/${invoiceId}.${token}`;

  // 3. Atomically update invoice document & stats
  const batch = adminDb.batch();
  batch.update(invoiceRef, {
    status: 'sent',
    'signing.tokenHash': tokenHash,
    'signing.expiresAt': expiresAt,
    'signing.sentTo': targetEmail.trim(),
    'signing.sentAt': FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  if (data.status !== 'sent') {
    const statsRef = adminDb.collection('stats').doc('invoices');
    batch.set(
      statsRef,
      {
        [`${data.status}Count`]: FieldValue.increment(-1),
        [`counts.${data.status}`]: FieldValue.increment(-1),
        sentCount: FieldValue.increment(1),
        'counts.sent': FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  await batch.commit();

  updateTag('invoices');
  updateTag('invoice-stats');
  updateTag(`invoice:${invoiceId}`);

  // 4. Send via after() so the action returns fast
  after(async () => {
    try {
      // Load stored PDF
      let pdfBuffer: Buffer | null = null;
      if (data.pdf?.path) {
        try {
          const bucket = getAdminStorageBucket();
          const [buf] = await bucket.file(data.pdf.path).download();
          pdfBuffer = buf;
        } catch (err) {
          console.warn('[sendInvoiceAction] Failed to load PDF from storage:', err);
        }
      }

      // If PDF missing in storage, generate on the fly
      if (!pdfBuffer) {
        const fullInvoice = await getInvoice(invoiceId);
        if (fullInvoice) {
          const gen = await generateInvoicePdf(fullInvoice);
          pdfBuffer = gen.buffer;
        }
      }

      const rawBilling = await getBillingSettings();
      const totals = data.totals || {};

      const res = await sendInvoiceEmail({
        to: targetEmail.trim(),
        invoiceNumber: data.number || `RX-${doc.id.slice(-4).toUpperCase()}`,
        docKind: data.docKind,
        vatEnabled: Number(data.vatRatePercent) > 0,
        vatRate: Number(data.vatRatePercent) / 100,
        facilityName: data.customer?.facilityName || '—',
        facilityAddress: data.customer?.address,
        invoiceDate: data.issueDate,
        startDate: data.issueDate,
        endDate: data.dueDate,
        customerName: data.customer?.name,
        customerPhone: data.customer?.phone,
        taxNumber: data.customer?.commercialRegNumber,
        items: Array.isArray(data.items)
          ? data.items.map((it: Record<string, unknown>) => ({
              description: String(it.description || ''),
              quantity: Number(it.quantity) || 1,
              unitPrice: halalasToSar(Number(it.unitPriceHalalas) || 0),
              total: Number(it.quantity || 1) * halalasToSar(Number(it.unitPriceHalalas) || 0),
            }))
          : [],
        subtotal: halalasToSar(totals.subtotal || 0),
        discount: halalasToSar(totals.discount || 0),
        vatAmount: halalasToSar(totals.vat || 0),
        totalAmount: halalasToSar(totals.total || 0),
        paymentDetails: data.paymentDetails,
        billingSettings: rawBilling ? {
          facilityName: rawBilling.seller.nameAr || rawBilling.seller.nameEn,
          accountName: rawBilling.seller.accountName,
          bankName: rawBilling.seller.bankName,
          iban: rawBilling.seller.iban,
          taxNumber: rawBilling.seller.vatNumber,
          commercialReg: rawBilling.seller.commercialRegNumber,
          address: rawBilling.seller.address,
          disclaimerLine: rawBilling.disclaimerLine,
        } : null,
        signingUrl,
        locale,
        pdfBuffer: pdfBuffer || undefined,
      });

      if (res.ok) {
        await invoiceRef.collection('events').doc().set({
          type: 'email_sent',
          at: FieldValue.serverTimestamp(),
          by: admin.email,
          meta: {
            to: targetEmail.trim(),
            messageId: res.messageId,
          },
        });
      } else {
        await invoiceRef.collection('events').doc().set({
          type: 'email_failed',
          at: FieldValue.serverTimestamp(),
          by: admin.email,
          meta: {
            to: targetEmail.trim(),
            error: res.error || 'Failed to send',
          },
        });
      }
    } catch (bgErr: unknown) {
      const errorMsg = bgErr instanceof Error ? bgErr.message : 'Unknown send failure';
      console.error('[sendInvoiceAction] after() background error:', bgErr);
      await invoiceRef.collection('events').doc().set({
        type: 'email_failed',
        at: FieldValue.serverTimestamp(),
        by: admin.email,
        meta: {
          to: targetEmail.trim(),
          error: errorMsg,
        },
      });
    }
  });

  return {
    success: true,
    data: { signingUrl },
  };
}

export async function sendInvoiceEmailAction(input: {
  invoiceId: string;
  recipientEmail: string;
}): Promise<InvoiceActionResponse<{ messageId?: string; signingUrl?: string }>> {
  const result = await sendInvoiceAction(input.invoiceId, input.recipientEmail);
  return {
    success: result.success,
    error: result.error,
    data: result.data,
  };
}

export async function generateSigningLinkAction(
  invoiceId: string
): Promise<InvoiceActionResponse<{ signingUrl: string }>> {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);
  const doc = await invoiceRef.get();
  if (!doc.exists) {
    return { success: false, error: 'المستند غير موجود' };
  }

  const data = doc.data()!;
  if (data.status === 'cancelled') {
    return { success: false, error: 'لا يمكن إنشاء رابط توقيع لمستند ملغى.' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rashx.com';
  const signingUrl = `${siteUrl}/ar/sign/${invoiceId}.${token}`;

  await invoiceRef.update({
    'signing.tokenHash': tokenHash,
    'signing.expiresAt': expiresAt,
    updatedAt: FieldValue.serverTimestamp(),
  });

  updateTag('invoices');
  updateTag(`invoice:${invoiceId}`);

  return {
    success: true,
    data: { signingUrl },
  };
}

// ─────────────────────────────────────────────────────────────
// 10. issueAndSendInvoiceAction
// ─────────────────────────────────────────────────────────────
export async function issueAndSendInvoiceAction(
  input: { invoiceId: string; recipientEmail?: string }
): Promise<InvoiceActionResponse<{ id: string; number: string; emailSent: boolean }>> {
  const issueResult = await issueInvoice({ invoiceId: input.invoiceId });
  if (!issueResult.success || !issueResult.data) {
    return { success: false, error: issueResult.error };
  }

  const invoiceId = issueResult.data.id;
  let targetEmail = input.recipientEmail;

  if (!targetEmail) {
    const doc = await adminDb.collection('platform_invoices').doc(invoiceId).get();
    targetEmail = doc.data()?.customer?.email;
  }

  let emailSent = false;
  if (targetEmail && targetEmail.trim().length > 0) {
    try {
      const emailRes = await sendInvoiceEmailAction({
        invoiceId,
        recipientEmail: targetEmail.trim(),
      });
      emailSent = Boolean(emailRes.success);
    } catch {
      emailSent = false;
    }
  }

  return {
    success: true,
    data: {
      id: invoiceId,
      number: issueResult.data.number,
      emailSent,
    },
  };
}

// ─────────────────────────────────────────────────────────────
// 11. searchTenantsForInvoiceAction (Lazy Autocomplete)
// ─────────────────────────────────────────────────────────────
export interface TenantAutocompleteItem {
  id: string;
  name: string;
  commercialRegNumber?: string;
  address?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
}

export async function searchTenantsForInvoiceAction(
  query: string
): Promise<TenantAutocompleteItem[]> {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);
  const term = (query || '').trim().toLowerCase();
  if (!term || term.length < 2) return [];

  const snap = await adminDb.collection('tenants').limit(50).get();
  const results: TenantAutocompleteItem[] = [];

  for (const doc of snap.docs) {
    const data = doc.data();
    const name = String(data.name || '');
    const ownerName = String(data.ownerName || '');
    const phone = String(data.phone || '');
    const email = String(data.email || '');

    if (
      name.toLowerCase().includes(term) ||
      ownerName.toLowerCase().includes(term) ||
      phone.includes(term) ||
      email.toLowerCase().includes(term)
    ) {
      results.push({
        id: doc.id,
        name,
        commercialRegNumber: data.commercialRegistrationNumber || data.crNumber || undefined,
        address: data.address || data.city || undefined,
        ownerName: data.ownerName || undefined,
        ownerEmail: data.email || undefined,
        ownerPhone: data.phone || undefined,
      });
      if (results.length >= 10) break;
    }
  }

  return results;
}

// ─────────────────────────────────────────────────────────────
// 12. uploadSignedFileAction
// ─────────────────────────────────────────────────────────────
export async function uploadSignedFileAction(input: {
  invoiceId: string;
  fileName: string;
  fileBase64: string; // base64 string
  contentType?: string;
}): Promise<InvoiceActionResponse<{ path: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);
  const { invoiceId, fileName, fileBase64, contentType = 'application/pdf' } = input;

  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);
  const doc = await invoiceRef.get();
  if (!doc.exists) {
    return { success: false, error: 'المستند غير موجود' };
  }

  const bucket = getAdminStorageBucket();
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `billing/signed_contracts/${invoiceId}/${Date.now()}-${sanitizedName}`;

  const cleanBase64 = fileBase64.includes(',') ? fileBase64.split(',')[1] : fileBase64;
  const buffer = Buffer.from(cleanBase64, 'base64');

  await bucket.file(storagePath).save(buffer, {
    metadata: {
      contentType,
      metadata: {
        invoiceId,
        uploadedBy: admin.email,
      },
    },
  });

  const fileEntry: InvoiceSigningFile = {
    name: fileName,
    path: storagePath,
    uploadedAt: new Date().toISOString(),
  };

  const batch = adminDb.batch();
  batch.update(invoiceRef, {
    status: 'uploaded',
    'signing.files': FieldValue.arrayUnion(fileEntry),
    updatedAt: FieldValue.serverTimestamp(),
  });

  // Event
  const eventRef = invoiceRef.collection('events').doc();
  batch.set(eventRef, {
    type: 'UPLOADED',
    at: FieldValue.serverTimestamp(),
    by: admin.email,
    meta: { fileName, storagePath },
  });

  // Audit log
  const auditRef = adminDb.collection('platform_audit_logs').doc();
  batch.set(auditRef, {
    action: 'INVOICE_SIGNED_FILE_UPLOADED',
    actorEmail: admin.email,
    actorRole: admin.role,
    targetType: 'platform_invoice',
    targetId: invoiceId,
    timestamp: FieldValue.serverTimestamp(),
    details: { fileName, storagePath },
  });

  await batch.commit();
  updateTag('invoices');
  updateTag(`invoice:${invoiceId}`);

  return { success: true, data: { path: storagePath } };
}

// ─────────────────────────────────────────────────────────────
// 13. getInvoicesPageAction (Client Cursor Pagination)
// ─────────────────────────────────────────────────────────────
export async function getInvoicesPageAction(params: {
  cursor?: string;
  limit?: number;
  status?: InvoiceStatus;
  q?: string;
}) {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);
  return getInvoicesPage(params);
}

// ─────────────────────────────────────────────────────────────
// 14. approveSignedFile
// ─────────────────────────────────────────────────────────────
export async function approveSignedFile(
  input: ApproveSignedFileInput
): Promise<InvoiceActionResponse<{ id: string; status: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);
  const validation = approveSignedFileSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message };
  }

  const { invoiceId } = validation.data;
  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);
  const doc = await invoiceRef.get();
  if (!doc.exists) {
    return { success: false, error: 'المستند غير موجود' };
  }

  const data = doc.data()!;
  const prevStatus = (data.status as InvoiceStatus) || 'uploaded';

  if (prevStatus === 'signed') {
    return { success: false, error: 'تم اعتماد المستند مسبقاً' };
  }
  if (prevStatus === 'cancelled' || prevStatus === 'paid') {
    return { success: false, error: `لا يمكن اعتماد مستند بحالته الحالية (${prevStatus})` };
  }

  const nowIso = new Date().toISOString();
  const batch = adminDb.batch();

  // 1. Update invoice
  batch.update(invoiceRef, {
    status: 'signed',
    'signing.signedAt': nowIso,
    'signing.reviewedBy': admin.email,
    updatedAt: FieldValue.serverTimestamp(),
  });

  // 2. Subcollection Event
  const eventRef = invoiceRef.collection('events').doc();
  batch.set(eventRef, {
    type: 'SIGNED',
    at: FieldValue.serverTimestamp(),
    by: admin.email,
    meta: {
      signedAt: nowIso,
      reviewedBy: admin.email,
      previousStatus: prevStatus,
    },
  });

  // 3. Audit Log
  const auditRef = adminDb.collection('platform_audit_logs').doc();
  batch.set(auditRef, {
    adminId: admin.uid,
    adminEmail: admin.email,
    action: 'INVOICE_SIGNED_FILE_APPROVED',
    timestamp: FieldValue.serverTimestamp(),
    details: {
      invoiceId,
      number: data.number,
      reviewedBy: admin.email,
      signedAt: nowIso,
    },
  });

  // 4. Update Stats
  const statsRef = adminDb.collection('stats').doc('invoices');
  batch.set(
    statsRef,
    {
      [`${prevStatus}Count`]: FieldValue.increment(-1),
      [`counts.${prevStatus}`]: FieldValue.increment(-1),
      signedCount: FieldValue.increment(1),
      'counts.signed': FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  await batch.commit();

  updateTag('invoices');
  updateTag('invoice-stats');
  updateTag(`invoice:${invoiceId}`);

  return {
    success: true,
    data: { id: invoiceId, status: 'signed' },
  };
}

// ─────────────────────────────────────────────────────────────
// 15. rejectSignedFile
// ─────────────────────────────────────────────────────────────
export async function rejectSignedFile(
  input: RejectSignedFileInput
): Promise<InvoiceActionResponse<{ id: string; status: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);
  const validation = rejectSignedFileSchema.safeParse(input);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message };
  }

  const { invoiceId, reason } = validation.data;
  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);
  const doc = await invoiceRef.get();
  if (!doc.exists) {
    return { success: false, error: 'المستند غير موجود' };
  }

  const data = doc.data()!;
  const prevStatus = (data.status as InvoiceStatus) || 'uploaded';

  if (prevStatus === 'cancelled' || prevStatus === 'paid') {
    return { success: false, error: `لا يمكن رفض مستند بحالته الحالية (${prevStatus})` };
  }

  const nowIso = new Date().toISOString();
  const batch = adminDb.batch();

  // 1. Update invoice back to 'sent'
  batch.update(invoiceRef, {
    status: 'sent',
    'signing.rejectReason': reason,
    'signing.rejectedAt': nowIso,
    updatedAt: FieldValue.serverTimestamp(),
  });

  // 2. Subcollection Event
  const eventRef = invoiceRef.collection('events').doc();
  batch.set(eventRef, {
    type: 'REJECTED',
    at: FieldValue.serverTimestamp(),
    by: admin.email,
    meta: {
      reason,
      reviewedBy: admin.email,
      rejectedAt: nowIso,
      previousStatus: prevStatus,
    },
  });

  // 3. Audit Log
  const auditRef = adminDb.collection('platform_audit_logs').doc();
  batch.set(auditRef, {
    adminId: admin.uid,
    adminEmail: admin.email,
    action: 'INVOICE_SIGNED_FILE_REJECTED',
    timestamp: FieldValue.serverTimestamp(),
    details: {
      invoiceId,
      number: data.number,
      reason,
      reviewedBy: admin.email,
    },
  });

  // 4. Update Stats: uploaded -> sent
  const statsRef = adminDb.collection('stats').doc('invoices');
  batch.set(
    statsRef,
    {
      [`${prevStatus}Count`]: FieldValue.increment(-1),
      [`counts.${prevStatus}`]: FieldValue.increment(-1),
      sentCount: FieldValue.increment(1),
      'counts.sent': FieldValue.increment(1),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  await batch.commit();

  updateTag('invoices');
  updateTag('invoice-stats');
  updateTag(`invoice:${invoiceId}`);

  // 5. Email customer the rejection reason with the signing link
  const targetEmail = data.customer?.email || data.signing?.sentTo;
  if (targetEmail) {
    after(async () => {
      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rashx.com';
        // Generate or refresh signing link
        const newToken = crypto.randomBytes(32).toString('hex');
        const newTokenHash = crypto.createHash('sha256').update(newToken).digest('hex');
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

        await invoiceRef.update({
          'signing.tokenHash': newTokenHash,
          'signing.expiresAt': expiresAt,
        });

        const signingUrl = `${siteUrl}/ar/sign/${invoiceId}.${newToken}`;
        const rawBilling = await getBillingSettings();

        await sendInvoiceEmail({
          to: targetEmail,
          invoiceNumber: data.number || invoiceId,
          facilityName: data.customer?.facilityName || '',
          customerName: data.customer?.name,
          customerPhone: data.customer?.phone,
          totalAmount: (data.totals?.total || 0) / 100,
          signingUrl,
          notes: `تمت مراجعة النسخة الموقعة المرفوعة من قبلكم، ولم نتمكن من اعتمادها للأسباب التالية:\n"${reason}"\nيرجى إعادة رفع نسخة واضحة وموقعة ومختومة عبر رابط التوقيع المرفق أدناه.`,
          billingSettings: toBillingSettings(rawBilling),
        });
      } catch (err) {
        console.error('[rejectSignedFile] Error sending customer notification:', err);
      }
    });
  }

  return {
    success: true,
    data: { id: invoiceId, status: 'sent' },
  };
}
