import 'server-only';
import { z } from 'zod';

export const invoiceItemSchema = z.object({
  id: z.string().optional(),
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
  docKind: z.enum(['contract_invoice', 'quote']).default('contract_invoice'),
  locale: z.enum(['ar', 'en']).optional().default('ar'),
  customer: invoiceCustomerSchema,
  items: z.array(invoiceItemSchema).min(1, 'يجب إضافة بند واحد على الأقل في الفاتورة'),
  discountHalalas: z.coerce.number().int().nonnegative().default(0),
  vatRatePercent: z.coerce.number().min(0).max(100).default(15),
  issueDate: z.string().trim().min(1, 'تاريخ الإصدار مطلوب'),
  dueDate: z.string().trim().optional(),
  selectedClauseIds: z.array(z.string()).optional(),
  notes: z.string().trim().optional(),
});

export const issueInvoiceSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف الفاتورة مطلوب'),
  selectedClauseIds: z.array(z.string()).optional(),
});

export const cancelInvoiceSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف الفاتورة مطلوب'),
  reason: z.string().trim().min(2, 'سبب الإلغاء مطلوب (حرفين على الأقل)'),
});

export const markPaidSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف الفاتورة مطلوب'),
  paymentMethod: z.string().trim().optional().default('bank-transfer'),
  reference: z.string().trim().optional(),
});

export const approveSignedFileSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف المستند مطلوب'),
});

export const rejectSignedFileSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف المستند مطلوب'),
  reason: z.string().trim().min(2, 'سبب الرفض مطلوب'),
});

export const sendInvoiceActionSchema = z.object({
  invoiceId: z.string().trim().min(1, 'معرف المستند مطلوب'),
  recipientEmail: z.string().trim().email('البريد الإلكتروني غير صالح').optional(),
});

export type SaveDraftInvoiceInput = z.infer<typeof saveDraftInvoiceSchema>;
export type IssueInvoiceInput = z.infer<typeof issueInvoiceSchema>;
export type CancelInvoiceInput = z.infer<typeof cancelInvoiceSchema>;
export type MarkPaidInput = z.infer<typeof markPaidSchema>;
export type ApproveSignedFileInput = z.infer<typeof approveSignedFileSchema>;
export type RejectSignedFileInput = z.infer<typeof rejectSignedFileSchema>;
export type SendInvoiceActionInput = z.infer<typeof sendInvoiceActionSchema>;
