import { z } from 'zod';

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
  disclaimerLine: z
    .string()
    .trim()
    .min(5, 'سطر التنويه القانوني مطلوب')
    .default(
      'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.'
    ),
  defaultDueDays: z.coerce
    .number()
    .int()
    .positive('أيام الاستحقاق يجب أن تكون رقماً موجباً')
    .default(14),
});

export type SaveBillingSettingsInput = z.infer<typeof saveBillingSettingsSchema>;

export interface BillingSettingsActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

