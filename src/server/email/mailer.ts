import 'server-only';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import type { BillingSettings } from '@/lib/types/platform';

export interface InvoiceEmailItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface SendInvoiceEmailParams {
  to: string;
  invoiceNumber: string;
  docKind?: 'contract_invoice' | 'quote';
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
  items?: InvoiceEmailItem[];
  subtotal?: number;
  discount?: number;
  vatAmount?: number;
  totalAmount: number;
  paymentDetails?: string;
  notes?: string;
  billingSettings?: BillingSettings | null;
  assets?: {
    signatureBuffer?: Buffer | null;
    stampBuffer?: Buffer | null;
  } | null;
  signingUrl?: string;
  locale?: string;
  pdfBuffer?: Buffer;
}

export interface SendEmailResult {
  ok: boolean;
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Escapes dynamic HTML values to prevent injection.
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type MailTransporter = ReturnType<typeof nodemailer.createTransport>;

/**
 * Lazy singleton instance of nodemailer transporter.
 */
let cachedTransporter: MailTransporter | null = null;

/**
 * Creates the nodemailer transporter once at module level (lazy singleton).
 */
function getTransporter(): MailTransporter {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('إعدادات البريد الإلكتروني (SMTP_USER / SMTP_PASS) غير متوفرة في متغيرات البيئة.');
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return cachedTransporter;
}



// PDF generation is exclusively handled by src/server/pdf/invoice-pdf.ts

/**
 * Sends a subscription agreement / invoice email strictly following
 * rashx-brand/email/email-template-ar.html and attaching the server-generated invoice PDF.
 */
export async function sendInvoiceEmail({
  to,
  invoiceNumber,
  docKind = 'contract_invoice',
  facilityName,
  invoiceDate,
  startDate,
  endDate,
  customerName,
  totalAmount,
  notes,
  billingSettings,
  signingUrl,
  locale = 'ar',
  pdfBuffer,
}: SendInvoiceEmailParams): Promise<SendEmailResult> {
  try {
    const transporter = getTransporter();
    const fromAddress = process.env.SMTP_FROM || `"راش إكس RASHX" <${process.env.SMTP_USER}>`;

    const isQuote = docKind === 'quote';
    const isEn = locale === 'en';

    const formattedTotal = Number(totalAmount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const displayDate = invoiceDate || new Date().toISOString().split('T')[0];
    const displayStart = startDate || displayDate;
    const displayEnd = endDate || 'سنة من تاريخ البدء';

    const safeInvoiceNumber = escapeHtml(invoiceNumber);
    const safeCustomerName = escapeHtml(customerName || (isEn ? 'Valued Partner' : 'عزيزنا الشريك'));
    const safeFacilityName = escapeHtml(facilityName || '—');
    const safeDisplayStart = escapeHtml(displayStart);
    const safeDisplayEnd = escapeHtml(displayEnd);
    const safeFormattedTotal = escapeHtml(formattedTotal);
    const safeSigningUrl = escapeHtml(signingUrl || 'https://rashx.com');
    const safeSellerAddress = escapeHtml(billingSettings?.address || 'المملكة العربية السعودية');

    const emailSubject = isEn
      ? `${isQuote ? 'Price Quote & Contract' : 'Contract & Invoice'} for ${safeFacilityName} | #${safeInvoiceNumber}`
      : `${isQuote ? 'عرض سعر وعقد راش إكس' : 'عقد وفاتورة راش إكس'} لـ ${safeFacilityName} | رقم #${safeInvoiceNumber}`;

    // Structure following rashx-brand/email/email-template-ar.html (and -en)
    const htmlContent = isEn
      ? `<!DOCTYPE html>
<html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RASHX</title></head>
<body style="margin:0;padding:0;background:#E5E9E8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E5E9E8;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;font-family:'Ping AR + LT', 'PingAR+LT', 'Helvetica Neue', Arial, Tahoma, sans-serif;color:#000000;direction:ltr;">
<tr><td align="center" style="background:#91B8C0;padding:36px 24px;"><img src="cid:rashx-brand-logo" width="150" alt="RASHX" style="display:block;border:0;margin:0 auto;"></td></tr>
<tr><td style="padding:40px 40px 8px;text-align:left;"><h1 style="margin:0;font-size:24px;font-weight:700;line-height:1.3;">${isQuote ? 'Price Quote & Contract' : 'Commercial Contract & Invoice'} · ${safeInvoiceNumber}</h1><div style="width:48px;height:4px;background:#F0C5AE;margin-top:16px;font-size:0;line-height:0;">&nbsp;</div></td></tr>
<tr><td style="padding:24px 40px;text-align:left;font-size:15px;line-height:1.7;">
  <p style="margin:0 0 16px;font-weight:700;">Dear ${safeCustomerName},</p>
  <p style="margin:0 0 16px;">We are pleased to provide you with the ${isQuote ? 'official price quote & contract' : 'contract & commercial invoice'} for <strong>${safeFacilityName}</strong> covering the period from <strong>${safeDisplayStart}</strong> to <strong>${safeDisplayEnd}</strong> for a total amount of <strong>${safeFormattedTotal} SAR</strong>.</p>
  ${notes ? `<div style="background:#FFF3CD;border:1px solid #FFEBAA;border-radius:6px;padding:12px 16px;margin:16px 0;color:#856404;font-size:14px;line-height:1.6;"><strong>Notice from RASHX:</strong><br>${escapeHtml(notes).replace(/\n/g, '<br>')}</div>` : ''}
  <p style="margin:0 0 16px;">The official contract document is attached as a <strong>PDF</strong>. Please review the terms and upload your signed copy using the secure signing portal link below.</p>
  <p style="margin:0;color:#5E6665;">Best regards,<br>The RASHX Team</p>
</td></tr>
<tr><td style="padding:8px 40px 40px;text-align:left;"><a href="${safeSigningUrl}" style="display:inline-block;background:#F0C5AE;color:#000000;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:4px;">View Invoice & Upload Signed Copy</a></td></tr>
<tr><td style="background:#E5E9E8;padding:24px 40px;text-align:left;font-size:12px;line-height:1.6;color:#5E6665;">Official transactional notification sent by RASHX Platform · ${safeSellerAddress}</td></tr>
</table></td></tr></table></body></html>`
      : `<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RASHX</title></head>
<body style="margin:0;padding:0;background:#E5E9E8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E5E9E8;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;font-family:'Ping AR + LT', 'PingAR+LT', 'Helvetica Neue', Arial, Tahoma, sans-serif;color:#000000;direction:rtl;">
<tr><td align="center" style="background:#91B8C0;padding:36px 24px;"><img src="cid:rashx-brand-logo" width="150" alt="RASHX" style="display:block;border:0;margin:0 auto;"></td></tr>
<tr><td style="padding:40px 40px 8px;text-align:right;"><h1 style="margin:0;font-size:24px;font-weight:700;line-height:1.3;">${isQuote ? 'عرض سعر وعقد راش إكس' : 'عقد وفاتورة راش إكس'} · ${safeInvoiceNumber}</h1><div style="width:48px;height:4px;background:#F0C5AE;margin-top:16px;font-size:0;line-height:0;">&nbsp;</div></td></tr>
<tr><td style="padding:24px 40px;text-align:right;font-size:15px;line-height:1.7;">
  <p style="margin:0 0 16px;font-weight:700;">أهلاً ${safeCustomerName}،</p>
  <p style="margin:0 0 16px;">يسعدنا تزويدكم بـ ${isQuote ? 'عرض سعر وعقد' : 'عقد وفاتورة'} منصة راش إكس (RASHX) المخصص لـ <strong>${safeFacilityName}</strong> للفترة من <strong>${safeDisplayStart}</strong> إلى <strong>${safeDisplayEnd}</strong> بقيمة إجمالية قدرها <strong>${safeFormattedTotal} ر.س</strong>.</p>
  ${notes ? `<div style="background:#FFF3CD;border:1px solid #FFEBAA;border-radius:6px;padding:12px 16px;margin:16px 0;color:#856404;font-size:14px;line-height:1.6;"><strong>إشعار وتوجيه من إدارة راش إكس:</strong><br>${escapeHtml(notes).replace(/\n/g, '<br>')}</div>` : ''}
  <p style="margin:0 0 16px;">مرفق مع هذه الرسالة ملف المستند والعقد المعتمد بصيغة <strong>PDF</strong> للاطلاع والاعتماد. يمكنكم مراجعة بنود العقد ورفع النسخة الموقعة والمختومة مباشرة عبر الرابط أدناه.</p>
  <p style="margin:0;color:#5E6665;">مع تحياتنا،<br>فريق راش اكس</p>
</td></tr>
<tr><td style="padding:8px 40px 40px;text-align:right;"><a href="${safeSigningUrl}" style="display:inline-block;background:#F0C5AE;color:#000000;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:4px;">عرض الفاتورة ورفع النسخة الموقّعة</a></td></tr>
<tr><td style="background:#E5E9E8;padding:24px 40px;text-align:right;font-size:12px;line-height:1.6;color:#5E6665;">تم إرسال هذا البريد الإلكتروني كإشعار تعاقدي رسمي من منصة راش إكس (RASHX) · ${safeSellerAddress}</td></tr>
</table></td></tr></table></body></html>`;

    const attachments: Array<{
      filename: string;
      content?: Buffer;
      path?: string;
      contentType?: string;
      cid?: string;
      contentDisposition?: 'inline' | 'attachment';
    }> = [];

    // 1. Embed Brand Logo as Inline CID attachment
    const logoPath = path.join(process.cwd(), 'public/brand/email/images/logo-wordmark-arabic@2x.png');
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: 'logo-wordmark-arabic.png',
        path: logoPath,
        cid: 'rashx-brand-logo',
        contentDisposition: 'inline',
      });
    }

    // 2. Attach PDF document (use provided stored buffer from server/pdf/invoice-pdf.ts)
    if (pdfBuffer) {
      const filePrefix = isQuote ? 'Quote-Contract' : 'Invoice-Contract';
      attachments.push({
        filename: `${filePrefix}-${invoiceNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
        contentDisposition: 'attachment',
      });
    }

    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject: emailSubject,
      html: htmlContent,
      attachments,
    });

    return {
      ok: true,
      success: true,
      messageId: info.messageId,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في إرسال البريد الإلكتروني';
    console.error('[sendInvoiceEmail] Error:', error);
    return {
      ok: false,
      success: false,
      error: message,
    };
  }
}

export interface SendSignedUploadNotificationParams {
  to: string;
  invoiceId: string;
  invoiceNumber: string;
  docKind?: 'contract_invoice' | 'quote';
  facilityName: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  fileName: string;
  fileSize: number;
  fileSha256: string;
  uploadedAt: string;
  uploaderIp?: string;
}

/**
 * Sends an internal notification email to RASHX platform staff when a customer
 * uploads a signed copy. Contains NO customer invoice items or pricing calculations.
 */
export async function sendSignedUploadNotificationEmail(
  params: SendSignedUploadNotificationParams
): Promise<{ ok: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getTransporter();
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
    const reviewUrl = siteUrl ? `${siteUrl}/ar/dashboard/invoices/${params.invoiceId}` : '#';

    const isQuote = params.docKind === 'quote';
    const docLabel = isQuote ? 'عرض السعر والعقد' : 'العقد والفاتورة التجارية';
    const subject = `[راش إكس] تم رفع نسخة موقعة: ${docLabel} رقم ${params.invoiceNumber}`;
    const sizeFormatted = `${(params.fileSize / (1024 * 1024)).toFixed(2)} MB`;

    const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="utf-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8F9FA; margin: 0; padding: 24px; color: #0D1517; direction: rtl;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #E5E9E8; padding: 32px;">
    <div style="border-bottom: 2px solid #29545c; padding-bottom: 16px; margin-bottom: 24px;">
      <h2 style="margin: 0; color: #0D1517; font-size: 18px;">🔔 إشعار إداري: تم رفع نسخة موقعة ومختومة</h2>
      <p style="margin: 6px 0 0; color: #5E6665; font-size: 13px;">قام العميل برفع النسخة الموقعة وتتطلب المراجعة والاعتماد.</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; color: #5E6665; width: 35%;">رقم المستند:</td>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; font-weight: bold; font-family: monospace;">${escapeHtml(params.invoiceNumber)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; color: #5E6665;">نوع المستند:</td>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; font-weight: bold;">${escapeHtml(docLabel)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; color: #5E6665;">المنشأة المستفيدة:</td>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; font-weight: bold;">${escapeHtml(params.facilityName)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; color: #5E6665;">اسم المفوض / العميل:</td>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2;">${escapeHtml(params.customerName || '—')}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; color: #5E6665;">الملف المرفوع:</td>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; font-weight: bold;">${escapeHtml(params.fileName)} (${escapeHtml(sizeFormatted)})</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; color: #5E6665;">بصمة التشفير (SHA-256):</td>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; font-family: monospace; font-size: 11px; word-break: break-all;">${escapeHtml(params.fileSha256)}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; color: #5E6665;">تاريخ ووقت الرفع:</td>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2;">${escapeHtml(params.uploadedAt)}</td>
      </tr>
      ${params.uploaderIp ? `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; color: #5E6665;">عنوان IP الرافع:</td>
        <td style="padding: 10px; border-bottom: 1px solid #F0F2F2; font-family: monospace;">${escapeHtml(params.uploaderIp)}</td>
      </tr>` : ''}
    </table>

    <div style="text-align: center; margin-top: 28px;">
      <a href="${escapeHtml(reviewUrl)}" style="display: inline-block; background-color: #0D1517; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-weight: bold; font-size: 14px;">
        مراجعة واعتماد النسخة في المنظومة &larr;
      </a>
    </div>

    <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #E5E9E8; font-size: 11px; color: #8F9998; text-align: center;">
      منصة راش إكس لتقنية المعلومات &bull; إشعار نظام داخلي
    </div>
  </div>
</body>
</html>`;

    const fromAddress = process.env.SMTP_FROM || 'RASHX Platform HQ <admin@rashx.org>';
    const info = await transporter.sendMail({
      from: fromAddress,
      to: params.to,
      subject,
      html,
    });

    return { ok: true, messageId: info.messageId };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown mailer error';
    console.error('[sendSignedUploadNotificationEmail] Error:', error);
    return { ok: false, error: errorMsg };
  }
}
