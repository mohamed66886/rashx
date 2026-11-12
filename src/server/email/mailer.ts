import 'server-only';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';
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

let cachedAmiriBase64: string | null = null;

function getAmiriFontBase64(): string {
  if (!cachedAmiriBase64) {
    const fontPath = path.join(process.cwd(), 'public/fonts/Amiri-Regular.ttf');
    if (fs.existsSync(fontPath)) {
      cachedAmiriBase64 = fs.readFileSync(fontPath).toString('base64');
    }
  }
  return cachedAmiriBase64 || '';
}

/**
 * Generates an A4 PDF document matching invoice-a4.svg on the server as a guaranteed attachment.
 * Uses Amiri font with native Arabic shaping for 100% crisp, connected, readable Arabic text.
 */
export function generateInvoicePdfBuffer(params: SendInvoiceEmailParams): Buffer {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const fontBase64 = getAmiriFontBase64();
  if (fontBase64) {
    doc.addFileToVFS('Amiri-Regular.ttf', fontBase64);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri');
  }

  const L = 20;   // left margin
  const R = 190;  // right margin (RTL start edge)
  const GRAY: [number, number, number] = [94, 102, 101];
  const BLACK: [number, number, number] = [0, 0, 0];
  const TEAL: [number, number, number] = [41, 84, 92];

  const hasArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

  // Single text helper: applies Arabic shaping/bidi only when the string has Arabic.
  const put = (
    text: unknown,
    x: number,
    y: number,
    opts: {
      align?: 'left' | 'right' | 'center';
      size?: number;
      color?: [number, number, number];
    } = {},
  ) => {
    const t = String(text ?? '');
    if (opts.size) doc.setFontSize(opts.size);
    if (opts.color) doc.setTextColor(...opts.color);
    const align = opts.align ?? 'right';
    if (hasArabic(t)) {
      (doc.text as (text: string, x: number, y: number, flags?: unknown) => void)(t, x, y, { align, lang: 'ar' });
    } else {
      doc.text(t, x, y, { align });
    }
  };

  const money = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const isQuote = params.docKind === 'quote';
  const docTitleAr = isQuote ? 'عرض سعر وعقد' : 'عقد وفاتورة';
  const docTitleEn = isQuote ? 'PRICE QUOTE & CONTRACT' : 'CONTRACT & INVOICE';
  const docNumberLabelAr = isQuote ? 'رقم عرض السعر والعقد' : 'رقم العقد والفاتورة';

  const bs = params.billingSettings;
  // Show VAT line and seller VAT number ONLY when VAT is enabled AND seller.vatNumber exists
  const hasVat = Boolean(params.vatEnabled && bs?.taxNumber);

  const total = Number(params.totalAmount || 0);
  const discount = Number(params.discount || 0);
  const vat = hasVat ? Number(params.vatAmount || 0) : 0;
  const sub = Number(params.subtotal ?? (hasVat ? Math.max(0, total - vat) : total));
  const issueDate = params.invoiceDate || new Date().toISOString().split('T')[0];

  // ───────── 1. Header ─────────
  put('RASHX', L, 24, { align: 'left', size: 22, color: BLACK });
  put(docTitleAr, R, 21, { size: 15, color: BLACK });
  put(docTitleEn, R, 27, { size: 9, color: GRAY });
  put('منظومة إدارة وتشغيل الصالونات السحابية', R, 32, { size: 9, color: GRAY });

  doc.setDrawColor(145, 184, 192);
  doc.setLineWidth(0.6);
  doc.line(L, 37, R, 37);

  // ───────── 2. Billed-to (right) ─────────
  put('الطرف الثاني (الصالون المشترك)', R, 47, { size: 8, color: GRAY });
  put(params.facilityName || '—', R, 54, { size: 12, color: BLACK });
  put(params.facilityAddress || '—', R, 60, { size: 9, color: GRAY });

  let by = 66;
  if (params.customerName) {
    put(`المسؤول المفوض: ${params.customerName}`, R, by, { size: 9, color: GRAY });
    by += 6;
    if (params.customerPhone) {
      put(params.customerPhone, R, by, { size: 9, color: GRAY });
      by += 6;
    }
  }
  if (params.taxNumber) {
    put('الرقم الضريبي / السجل التجاري للعميل', R, by, { size: 9, color: GRAY });
    put(params.taxNumber, R, by + 6, { size: 9, color: BLACK });
  }

  // ───────── 3. Invoice meta (left column, right-aligned at x=100) ─────────
  const MX = 100;
  put(docNumberLabelAr, MX, 47, { size: 8, color: GRAY });
  put(params.invoiceNumber || (isQuote ? 'QUO-0001' : 'INV-0001'), MX, 53, { size: 11, color: BLACK });

  put('تاريخ الإصدار', MX, 61, { size: 8, color: GRAY });
  put(issueDate, MX, 67, { size: 10, color: BLACK });

  put('مدة وسريان العقد', MX, 75, { size: 8, color: GRAY });
  const period = `${params.startDate || issueDate}  >  ${params.endDate || '—'}`;
  put(period, MX, 81, { size: 9, color: TEAL });

  // ───────── 4. Items table (RTL columns) ─────────
  const TY = 90;
  doc.setFillColor(145, 184, 192);
  doc.rect(L, TY, R - L, 8, 'F');

  const COL_DESC = R - 3;  // right-aligned
  const COL_QTY = 108;     // centered
  const COL_UNIT = 78;     // centered
  const COL_AMT = 40;      // centered

  put('البيان', COL_DESC, TY + 5.5, { size: 9, color: BLACK });
  put('الكمية', COL_QTY, TY + 5.5, { align: 'center', size: 9 });
  put('سعر الوحدة (ر.س)', COL_UNIT, TY + 5.5, { align: 'center', size: 9 });
  put('المبلغ (ر.س)', COL_AMT, TY + 5.5, { align: 'center', size: 9 });

  const items: InvoiceEmailItem[] =
    params.items && params.items.length > 0
      ? params.items
      : [
          {
            description: params.planName || 'اشتراك منصة راش إكس السحابية لإدارة الصالونات (POS والحجوزات)',
            quantity: 1,
            unitPrice: total,
            total: total,
          },
          { description: 'بوابة إدارة العمليات والربط التقني والتكامل السحابي', quantity: 1, unitPrice: 0, total: 0 },
          { description: 'تطبيق العملاء الذكي (PWA) والدعم السحابي طوال فترة التعاقد', quantity: 1, unitPrice: 0, total: 0 },
        ];

  let y = TY + 16;
  const descMaxWidth = R - COL_QTY - 14; // keep text clear of qty column
  items.forEach((it) => {
    doc.setFontSize(9);
    const lines: string[] = doc.splitTextToSize(String(it.description), descMaxWidth);
    lines.forEach((line, i) => put(line, COL_DESC, y + i * 5, { size: 9, color: BLACK }));

    const qty = it.quantity || 1;
    const unit = Number(it.unitPrice || 0);
    const lineTotal = Number(it.total || qty * unit || 0);
    put(String(qty), COL_QTY, y, { align: 'center', size: 9, color: GRAY });
    put(money(unit), COL_UNIT, y, { align: 'center', size: 9, color: GRAY });
    put(money(lineTotal), COL_AMT, y, { align: 'center', size: 9, color: BLACK });

    const rowH = Math.max(1, lines.length) * 5 + 4;
    doc.setDrawColor(229, 233, 232);
    doc.setLineWidth(0.2);
    doc.line(L, y + rowH - 3, R, y + rowH - 3);
    y += rowH + 3;
  });

  // ───────── 5. Totals (left side) ─────────
  const BX = L;        // box left
  const BW = 80;       // box width
  const LBL = BX + BW - 2; // labels right-aligned inside box
  const VAL = BX + 2;      // values left-aligned inside box

  doc.setDrawColor(145, 184, 192);
  doc.setLineWidth(0.6);
  doc.line(BX, y + 2, BX + BW, y + 2);

  let ty = y + 9;
  put(hasVat ? 'المجموع قبل الضريبة' : 'المجموع الإجمالي', LBL, ty, { size: 9, color: GRAY });
  put(`${money(sub)} SAR`, VAL, ty, { align: 'left', size: 9, color: BLACK });

  if (discount > 0) {
    ty += 7;
    put('الخصم المعتمد', LBL, ty, { size: 9, color: [180, 83, 9] });
    put(`-${money(discount)} SAR`, VAL, ty, { align: 'left', size: 9, color: [180, 83, 9] });
  }

  if (hasVat) {
    const ratePercent = Math.round(((params.vatRate ?? 0.15) > 0 ? (params.vatRate ?? 0.15) : 0.15) * 100);
    ty += 7;
    put(`ضريبة القيمة المضافة ${ratePercent}%`, LBL, ty, { size: 9, color: GRAY });
    put(`${money(vat)} SAR`, VAL, ty, { align: 'left', size: 9, color: BLACK });
  }

  ty += 5;
  doc.setFillColor(240, 197, 174);
  doc.rect(BX, ty, BW, 10, 'F');
  put('الإجمالي المستحق', LBL, ty + 6.5, { size: 10, color: BLACK });
  put(`${money(total)} SAR`, VAL, ty + 6.5, { align: 'left', size: 12, color: BLACK });

  // ───────── 6. Payment details (seller billing settings) ─────────
  put('تفاصيل الحساب البنكي المعتمد', R, y + 9, { size: 8, color: GRAY });
  if (bs && bs.bankName && bs.iban) {
    put(bs.bankName, R, y + 16, { size: 9, color: BLACK });
    put(`اسم الحساب: ${bs.accountName}`, R, y + 22, { size: 9, color: BLACK });
    put('رقم الآيبان (IBAN)', R, y + 29, { size: 8, color: GRAY });
    put(bs.iban, R, y + 35, { size: 10, color: BLACK });
    if (hasVat && bs.taxNumber) {
      put(`الرقم الضريبي للمنشأة المصدرة: ${bs.taxNumber}`, R, y + 41, { size: 8, color: GRAY });
    }
  } else {
    put('خطأ: إعدادات الفوترة غير متوفرة (Missing billing settings)', R, y + 16, { size: 9, color: [220, 38, 38] });
  }

  // ───────── 7. Signatures ─────────
  const sy = ty + 22;
  put('إقرار واعتماد العقد', R, sy, { size: 8, color: GRAY });

  doc.setDrawColor(145, 184, 192);
  doc.setLineWidth(0.3);

  // First party → right box
  doc.rect(110, sy + 4, 80, 26);
  const sellerPartyTitle = bs?.facilityName
    ? `الطرف الأول: ${bs.facilityName}`
    : 'الطرف الأول: منصة راش إكس (RASHX)';
  put(sellerPartyTitle, 187, sy + 10, { size: 8, color: GRAY });

  if (params.assets?.stampBuffer) {
    try {
      const stampBase64 = params.assets.stampBuffer.toString('base64');
      doc.addImage(`data:image/png;base64,${stampBase64}`, 'PNG', 115, sy + 7, 20, 20);
    } catch {
      // ignore
    }
  }

  if (params.assets?.signatureBuffer) {
    try {
      const sigBase64 = params.assets.signatureBuffer.toString('base64');
      doc.addImage(`data:image/png;base64,${sigBase64}`, 'PNG', 145, sy + 10, 32, 16);
    } catch {
      put('معتمد رسمياً · RASHX HQ', 187, sy + 20, { size: 10, color: TEAL });
    }
  } else {
    put('معتمد رسمياً · RASHX HQ', 187, sy + 20, { size: 10, color: TEAL });
  }

  // Second party → left box
  doc.rect(L, sy + 4, 80, 26);
  put('الطرف الثاني: توقيع وختم الصالون المشترك', 97, sy + 10, { size: 8, color: BLACK });
  put('التوقيع:', 97, sy + 20, { size: 8, color: GRAY });
  doc.line(50, sy + 20, 82, sy + 20);
  put('الختم:', 97, sy + 26, { size: 8, color: GRAY });

  // ───────── 8. Footer & Legal Disclaimer ─────────
  const disclaimerText = bs?.disclaimerLine || 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.';
  doc.setDrawColor(145, 184, 192);
  doc.setLineWidth(0.4);
  doc.line(L, 271, R, 271);

  put(disclaimerText, R, 275.5, { size: 7.5, color: GRAY });

  doc.setDrawColor(229, 233, 232);
  doc.setLineWidth(0.2);
  doc.line(L, 278, R, 278);

  put('شكراً لتعاملكم واختياركم منصة راش إكس', R, 283, { size: 8.5, color: GRAY });
  put('Thank you for your business', L, 283, { align: 'left', size: 8.5, color: GRAY });

  return Buffer.from(doc.output('arraybuffer'));
}

/**
 * Sends a subscription agreement / invoice email strictly following
 * rashx-brand/email/email-template-ar.html and attaching the server-generated invoice PDF.
 */
export async function sendInvoiceEmail({
  to,
  invoiceNumber,
  docKind = 'contract_invoice',
  vatEnabled = false,
  vatRate,
  facilityName,
  facilityAddress,
  invoiceDate,
  startDate,
  endDate,
  customerName,
  customerPhone,
  taxNumber,
  planName = 'باقة راش إكس المتكاملة لإدارة الصالونات',
  items = [],
  subtotal,
  discount = 0,
  vatAmount,
  totalAmount,
  paymentDetails,
  notes,
  billingSettings,
  assets,
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

    // 2. Attach PDF document (use provided stored buffer or generate)
    const attachedPdfBuffer =
      pdfBuffer ||
      generateInvoicePdfBuffer({
        to,
        invoiceNumber,
        docKind,
        vatEnabled,
        vatRate,
        facilityName,
        facilityAddress,
        invoiceDate: displayDate,
        startDate: displayStart,
        endDate: displayEnd,
        customerName,
        customerPhone,
        taxNumber,
        planName,
        items,
        subtotal,
        discount,
        vatAmount,
        totalAmount,
        paymentDetails,
        billingSettings,
        assets,
      });

    const filePrefix = isQuote ? 'Quote-Contract' : 'Invoice-Contract';
    attachments.push({
      filename: `${filePrefix}-${invoiceNumber}.pdf`,
      content: attachedPdfBuffer,
      contentType: 'application/pdf',
      contentDisposition: 'attachment',
    });

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
