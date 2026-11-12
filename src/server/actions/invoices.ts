'use server';

import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { adminDb } from '@/server/firebase-admin';
import { requireAdmin } from '@/server/auth/session';
import { sendInvoiceEmail, generateInvoicePdfBuffer } from '@/server/email/mailer';

const invoiceItemSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  description: z.string().trim().min(1, 'اسم الخدمة أو المنتج مطلوب'),
  quantity: z.coerce.number().positive('الكمية يجب أن تكون أكبر من 0'),
  unitPrice: z.coerce.number().nonnegative('السعر يجب أن يكون 0 أو أكثر'),
  total: z.coerce.number().nonnegative(),
});

const createInvoiceSchema = z.object({
  facilityName: z.string().trim().min(2, 'اسم المنشأة مطلوب (حرفين على الأقل)'),
  facilityAddress: z.string().trim().min(2, 'العنوان مطلوب (حرفين على الأقل)'),
  invoiceDate: z.string().trim().min(1, 'تاريخ الفاتورة مطلوب'),
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
  planName: z.string().trim().optional(),
  paymentDetails: z.string().trim().optional(),
  dueDate: z.string().trim().optional(),
  tenantId: z.string().trim().optional(),
  customerName: z.string().trim().min(2, 'اسم العميل مطلوب'),
  customerPhone: z.string().trim().optional(),
  customerEmail: z.string().trim().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  taxNumber: z.string().trim().optional().default('300000000000003'),
  commercialReg: z.string().trim().optional(),
  items: z.array(invoiceItemSchema).min(1, 'يجب إضافة بند واحد على الأقل في الفاتورة'),
  subtotal: z.coerce.number().nonnegative(),
  discount: z.coerce.number().nonnegative().default(0),
  paymentMethod: z.enum(['cash', 'mada', 'apple-pay', 'visa', 'bank-transfer'] as const).default('bank-transfer'),
  status: z.enum(['paid', 'unpaid', 'draft', 'cancelled'] as const).default('paid'),
  notes: z.string().trim().optional(),
  // Email sending options
  sendEmailOnCreate: z.boolean().default(false),
  recipientEmail: z.string().trim().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  pdfBase64: z.string().optional(),
});

const sendInvoiceEmailSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف الفاتورة مطلوب'),
  recipientEmail: z.string().trim().email('يرجى إدخال عنوان بريد إلكتروني صالح'),
  pdfBase64: z.string().optional(),
});

const deleteInvoiceSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف الفاتورة مطلوب'),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type SendInvoiceEmailInput = z.infer<typeof sendInvoiceEmailSchema>;
export type DeleteInvoiceInput = z.infer<typeof deleteInvoiceSchema>;

export interface InvoiceActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  emailSent?: boolean;
}

/**
 * Creates an official tax invoice in Firestore with atomic audit logging.
 * Purges the 'invoices' cache tag.
 */
export async function createInvoiceAction(input: CreateInvoiceInput): Promise<InvoiceActionResponse<{ id: string; invoiceNumber: string }>> {
  const admin = await requireAdmin();

  const validation = createInvoiceSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات الفاتورة غير صالحة',
    };
  }

  const data = validation.data;

  // Recalculate amounts safely on server
  const computedSubtotal = data.items.reduce(
    (acc, item) => acc + (Number(item.quantity) * Number(item.unitPrice)),
    0
  );
  const discount = Math.min(computedSubtotal, Math.max(0, Number(data.discount) || 0));
  const taxableAmount = Math.max(0, computedSubtotal - discount);
  const vatRate = 0.15;
  const vatAmount = taxableAmount * vatRate;
  const totalAmount = taxableAmount + vatAmount;

  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const invoiceRef = adminDb.collection('platform_invoices').doc();
  const invoiceId = invoiceRef.id;

  try {
    const batch = adminDb.batch();

    // 1. Set Invoice document
    batch.set(invoiceRef, {
      id: invoiceId,
      invoiceNumber,
      facilityName: data.facilityName,
      facilityAddress: data.facilityAddress,
      invoiceDate: data.invoiceDate,
      startDate: data.startDate || data.invoiceDate,
      endDate: data.endDate || null,
      planName: data.planName || null,
      paymentDetails: data.paymentDetails || null,
      dueDate: data.dueDate || null,
      tenantId: data.tenantId || null,
      customerName: data.customerName,
      customerPhone: data.customerPhone || null,
      customerEmail: data.customerEmail || null,
      taxNumber: data.taxNumber || '300000000000003',
      commercialReg: data.commercialReg || null,
      items: data.items,
      subtotal: computedSubtotal,
      discount,
      taxableAmount,
      vatRate,
      vatAmount,
      totalAmount,
      paymentMethod: data.paymentMethod,
      status: data.status,
      notes: data.notes || null,
      createdBy: admin.email,
      createdById: admin.uid,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    // 2. Write Audit Log
    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'CREATE_INVOICE',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        invoiceId,
        invoiceNumber,
        facilityName: data.facilityName,
        totalAmount,
      },
    });

    await batch.commit();

    // Invalidate cache
    try {
      updateTag('invoices');
    } catch {
      // cache invalidation fallback
    }

    // Optional email dispatch
    let emailSent = false;
    const targetEmail = data.recipientEmail || process.env.SMTP_USER || 'mohamedabdouooo28@gmail.com';

    if (data.sendEmailOnCreate && targetEmail) {
      const emailResult = await sendInvoiceEmail({
        to: targetEmail,
        invoiceNumber,
        facilityName: data.facilityName,
        facilityAddress: data.facilityAddress,
        invoiceDate: data.invoiceDate,
        startDate: data.startDate,
        endDate: data.endDate,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        taxNumber: data.taxNumber,
        planName: data.planName,
        items: data.items.map((it) => ({
          description: it.description,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          total: it.quantity * it.unitPrice,
        })),
        subtotal: computedSubtotal,
        discount,
        vatAmount,
        totalAmount,
        paymentDetails: data.paymentDetails,
        pdfBase64: data.pdfBase64,
      });

      if (emailResult.success) {
        emailSent = true;
        // Update invoice sent state
        await invoiceRef.update({
          sentToEmail: targetEmail,
          sentAt: FieldValue.serverTimestamp(),
        });
      }
    }

    return {
      success: true,
      data: {
        id: invoiceId,
        invoiceNumber,
      },
      emailSent,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في حفظ الفاتورة في قاعدة البيانات';
    console.error('[createInvoiceAction] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Sends or resends an invoice to a recipient email address with PDF attachment.
 */
export async function sendInvoiceEmailAction(input: SendInvoiceEmailInput): Promise<InvoiceActionResponse<{ messageId?: string }>> {
  const admin = await requireAdmin();

  const validation = sendInvoiceEmailSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات الإرسال غير صالحة',
    };
  }

  const { invoiceId, recipientEmail, pdfBase64 } = validation.data;

  try {
    const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);
    const invoiceDoc = await invoiceRef.get();

    if (!invoiceDoc.exists) {
      return {
        success: false,
        error: 'الفاتورة المحددة غير موجودة في قاعدة البيانات',
      };
    }

    const invoiceData = invoiceDoc.data()!;

    const result = await sendInvoiceEmail({
      to: recipientEmail,
      invoiceNumber: invoiceData.invoiceNumber || `RX-${invoiceId.slice(-4).toUpperCase()}`,
      facilityName: invoiceData.facilityName || 'منشأة معتمدة',
      facilityAddress: invoiceData.facilityAddress,
      invoiceDate: invoiceData.invoiceDate,
      startDate: invoiceData.startDate,
      endDate: invoiceData.endDate,
      customerName: invoiceData.customerName,
      customerPhone: invoiceData.customerPhone,
      taxNumber: invoiceData.taxNumber,
      planName: invoiceData.planName,
      items: Array.isArray(invoiceData.items) ? invoiceData.items : [],
      subtotal: Number(invoiceData.subtotal) || 0,
      discount: Number(invoiceData.discount) || 0,
      vatAmount: Number(invoiceData.vatAmount) || 0,
      totalAmount: Number(invoiceData.totalAmount) || 0,
      paymentDetails: invoiceData.paymentDetails,
      pdfBase64,
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error || 'فشل في إرسال البريد الإلكتروني عبر خادم SMTP',
      };
    }

    // Update invoice record and audit log in batch
    const batch = adminDb.batch();
    batch.update(invoiceRef, {
      sentToEmail: recipientEmail,
      sentAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'SEND_INVOICE_EMAIL',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        invoiceId,
        invoiceNumber: invoiceData.invoiceNumber,
        recipientEmail,
      },
    });

    await batch.commit();

    try {
      updateTag('invoices');
    } catch {
      // cache fallback
    }

    return {
      success: true,
      data: {
        messageId: result.messageId,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'حدث خطأ أثناء إرسال الفاتورة بالبريد';
    console.error('[sendInvoiceEmailAction] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Deletes an invoice and logs the action in audit logs.
 */
export async function deleteInvoiceAction(input: DeleteInvoiceInput): Promise<InvoiceActionResponse> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);

  const validation = deleteInvoiceSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'معرف الفاتورة غير صالح',
    };
  }

  const { invoiceId } = validation.data;
  const invoiceRef = adminDb.collection('platform_invoices').doc(invoiceId);

  try {
    const doc = await invoiceRef.get();
    if (!doc.exists) {
      return {
        success: false,
        error: 'الفاتورة غير موجودة بالفعل',
      };
    }

    const invoiceData = doc.data()!;

    const batch = adminDb.batch();
    batch.delete(invoiceRef);

    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'DELETE_INVOICE',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        invoiceId,
        invoiceNumber: invoiceData.invoiceNumber,
        facilityName: invoiceData.facilityName,
      },
    });

    await batch.commit();

    try {
      updateTag('invoices');
    } catch {
      // cache fallback
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في حذف الفاتورة';
    console.error('[deleteInvoiceAction] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Generates and returns a clean, vector A4 PDF (base64) for any invoice.
 * Guaranteed zero-mojibake with embedded Amiri font.
 */
export async function generateInvoicePdfAction(params: {
  invoiceNumber: string;
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
  await requireAdmin();

  try {
    const pdfBuf = generateInvoicePdfBuffer({
      to: '',
      invoiceNumber: params.invoiceNumber,
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
