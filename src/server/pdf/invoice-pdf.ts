import 'server-only';

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { jsPDF } from 'jspdf';
import sharp from 'sharp';
import type {
  PlatformInvoice,
  InvoiceSeller,
  ContractClause,
  InvoiceItem,
} from '../../lib/types/billing.ts';
import { halalasToSar } from '../../lib/types/billing.ts';
import type { BillingAssets } from '../data/billing-settings.ts';
import { loadBillingAssets } from '../data/billing-settings.ts';

// ─────────────────────────────────────────────────────────────
// Module-level in-memory cache for fonts and rasterized images
// ─────────────────────────────────────────────────────────────
let cachedAmiriBase64: string | null = null;
let cachedLogoPngBase64: string | null = null;

function getAmiriFontBase64(): string {
  if (!cachedAmiriBase64) {
    const fontPath = path.join(process.cwd(), 'public/fonts/Amiri-Regular.ttf');
    if (fs.existsSync(fontPath)) {
      cachedAmiriBase64 = fs.readFileSync(fontPath).toString('base64');
    }
  }
  return cachedAmiriBase64 || '';
}

async function getLogoPngBase64(): Promise<string | null> {
  if (cachedLogoPngBase64) {
    return cachedLogoPngBase64;
  }

  const svgPath = path.join(process.cwd(), 'public/brand/logo/wordmark/wordmark-black.svg');
  if (fs.existsSync(svgPath)) {
    try {
      const svgBuffer = fs.readFileSync(svgPath);
      const pngBuffer = await sharp(svgBuffer)
        .resize({ width: 400 })
        .png()
        .toBuffer();
      cachedLogoPngBase64 = pngBuffer.toString('base64');
    } catch (err) {
      console.warn('[invoice-pdf] Failed to rasterize SVG logo:', err);
    }
  }

  return cachedLogoPngBase64;
}

export interface GenerateInvoicePdfOptions {
  invoice: PlatformInvoice;
  assets?: BillingAssets | null;
}

export interface GeneratedPdfResult {
  buffer: Buffer;
  sha256: string;
}

/**
 * Generates an immutable, multi-page A4 contract + commercial invoice PDF
 * matching RASHX brand styling with Arabic typography (Amiri) and native shaping.
 */
export async function generateInvoicePdf(
  invoice: PlatformInvoice,
  customAssets?: BillingAssets | null
): Promise<GeneratedPdfResult> {
  // Load stored assets (signature + stamp) if not provided
  const assets = customAssets ?? (await loadBillingAssets());
  const logoPngBase64 = await getLogoPngBase64();

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Inject Amiri font for high-quality Arabic shaping
  const fontBase64 = getAmiriFontBase64();
  if (fontBase64) {
    doc.addFileToVFS('Amiri-Regular.ttf', fontBase64);
    doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri');
  }

  // ──────────────── Layout Constants (in mm) ────────────────
  const L = 20;      // Left margin
  const R = 190;     // Right margin (RTL start edge)
  const W = R - L;   // Usable width = 170mm
  const FOOTER_Y = 272; // Reserve bottom area for disclaimer, invoice num, and page num

  const COLOR_TEAL: [number, number, number] = [41, 84, 92];     // #29545c
  const COLOR_GRAY: [number, number, number] = [94, 102, 101];    // #5E6665
  const COLOR_BLACK: [number, number, number] = [0, 0, 0];        // #000000
  const COLOR_LINE: [number, number, number] = [145, 184, 192];   // #91B8C0

  const hasArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

  /**
   * Helper to render text with automatic Arabic shaping and BiDi alignment.
   */
  const put = (
    text: unknown,
    x: number,
    y: number,
    opts: {
      align?: 'left' | 'right' | 'center';
      size?: number;
      color?: [number, number, number];
    } = {}
  ) => {
    const t = String(text ?? '');
    if (opts.size) doc.setFontSize(opts.size);
    if (opts.color) doc.setTextColor(...opts.color);
    const align = opts.align ?? 'right';
    if (hasArabic(t)) {
      (doc.text as (text: string, x: number, y: number, flags?: unknown) => void)(
        t,
        x,
        y,
        { align, lang: 'ar' }
      );
    } else {
      doc.text(t, x, y, { align });
    }
  };

  const formatSar = (val: number) =>
    Number(val || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Basic variables
  const isQuote = invoice.docKind === 'quote';
  const docTitleAr = isQuote ? 'عرض سعر وعقد' : 'عقد وفاتورة تجارية';
  const docTitleEn = isQuote ? 'PRICE QUOTE & CONTRACT' : 'COMMERCIAL CONTRACT & INVOICE';
  const docNumberLabelAr = isQuote ? 'رقم عرض السعر والعقد' : 'رقم العقد والفاتورة';
  const docNumber = invoice.number || (isQuote ? 'QUO-0001' : 'INV-0001');

  const seller: InvoiceSeller = invoice.seller || {
    nameAr: 'منصة راش إكس لتقنية المعلومات RASHX',
    nameEn: 'RASHX PLATFORM',
    commercialRegNumber: '1010000000',
    address: 'المملكة العربية السعودية',
    email: 'contact@rashx.com',
    phone: '920000000',
    bankName: 'مصرف الراجحي',
    accountName: 'منصة راش إكس',
    iban: 'SA0000000000000000000000',
    disclaimerLine: 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.',
  };

  const hasVat = Boolean(invoice.vatRatePercent > 0 && seller.vatNumber);
  const subtotalSar = halalasToSar(invoice.totals.subtotal);
  const discountSar = halalasToSar(invoice.totals.discount);
  const vatSar = hasVat ? halalasToSar(invoice.totals.vat) : 0;
  const totalSar = halalasToSar(invoice.totals.total);

  const displayDate = invoice.issueDate ? invoice.issueDate.split('T')[0] : new Date().toISOString().split('T')[0];
  const displayDue = invoice.dueDate ? invoice.dueDate.split('T')[0] : 'سنة من تاريخ البدء';

  // ─────────────────────────────────────────────────────────────
  // PAGE 1: Header, Billed-To, Seller, Items Table, Totals, Bank
  // ─────────────────────────────────────────────────────────────

  // 1. Header with Logo
  if (logoPngBase64) {
    try {
      doc.addImage(`data:image/png;base64,${logoPngBase64}`, 'PNG', L, 16, 38, 12);
    } catch {
      put('RASHX', L, 24, { align: 'left', size: 20, color: COLOR_BLACK });
    }
  } else {
    put('RASHX', L, 24, { align: 'left', size: 20, color: COLOR_BLACK });
  }

  put(docTitleAr, R, 20, { size: 14, color: COLOR_BLACK });
  put(docTitleEn, R, 25.5, { size: 8, color: COLOR_GRAY });
  put('منظومة إدارة وتشغيل الصالونات ومراكز التجميل السحابية', R, 30.5, { size: 8, color: COLOR_GRAY });

  // Teal Separator
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.6);
  doc.line(L, 35, R, 35);

  // 2. Metadata Columns (Customer on Right, Document Meta on Left)
  // Right Column: Customer
  put('BILLED TO · الطرف الثاني (المنشأة المشتركة)', R, 44, { size: 8, color: COLOR_GRAY });
  put(invoice.customer.facilityName || '—', R, 50, { size: 11, color: COLOR_BLACK });
  put(invoice.customer.address || '—', R, 55.5, { size: 8.5, color: COLOR_GRAY });

  let curY = 61;
  if (invoice.customer.name) {
    put(`المسؤول المفوض: ${invoice.customer.name}`, R, curY, { size: 8.5, color: COLOR_BLACK });
    curY += 5;
    if (invoice.customer.phone) {
      put(`الهاتف: ${invoice.customer.phone}`, R, curY, { size: 8.5, color: COLOR_GRAY });
      curY += 5;
    }
  }
  if (invoice.customer.commercialRegNumber) {
    put(`السجل التجاري / الرقم الضريبي للعميل: ${invoice.customer.commercialRegNumber}`, R, curY, {
      size: 8,
      color: COLOR_GRAY,
    });
    curY += 5;
  }

  // Left Column: Document Metadata
  const MX = 100;
  put(docNumberLabelAr, MX, 44, { size: 8, color: COLOR_GRAY });
  put(docNumber, MX, 50, { size: 11, color: COLOR_BLACK });

  put('تاريخ الإصدار', MX, 57, { size: 8, color: COLOR_GRAY });
  put(displayDate, MX, 62.5, { size: 9, color: COLOR_BLACK });

  put('فترة وسريان العقد', MX, 69.5, { size: 8, color: COLOR_GRAY });
  put(`من ${displayDate} إلى ${displayDue}`, MX, 75, { size: 8.5, color: COLOR_TEAL });

  // 3. Seller Block Summary (Subtle bar)
  const sellerBarY = Math.max(curY + 2, 80);
  doc.setFillColor(250, 251, 251);
  doc.rect(L, sellerBarY, W, 10, 'F');
  doc.setDrawColor(229, 233, 232);
  doc.setLineWidth(0.2);
  doc.rect(L, sellerBarY, W, 10, 'D');

  const sellerText = `الطرف الأول: ${seller.nameAr} | س.ت: ${seller.commercialRegNumber}${
    seller.vatNumber ? ` | الرقم الضريبي: ${seller.vatNumber}` : ''
  } | ${seller.email}`;
  put(sellerText, R - 3, sellerBarY + 6.5, { size: 7.5, color: COLOR_GRAY });

  // 4. Items Table
  const TY = sellerBarY + 14;
  doc.setFillColor(...COLOR_LINE);
  doc.rect(L, TY, W, 8, 'F');

  const COL_DESC = R - 3; // Right-aligned description
  const COL_QTY = 105;    // Center qty
  const COL_UNIT = 72;    // Center unit price
  const COL_AMT = 38;     // Center line total

  put('البيان والخدمات المشمولة', COL_DESC, TY + 5.5, { size: 8.5, color: COLOR_BLACK });
  put('الكمية', COL_QTY, TY + 5.5, { align: 'center', size: 8.5, color: COLOR_BLACK });
  put('سعر الوحدة (ر.س)', COL_UNIT, TY + 5.5, { align: 'center', size: 8.5, color: COLOR_BLACK });
  put('المبلغ المستحق (ر.س)', COL_AMT, TY + 5.5, { align: 'center', size: 8.5, color: COLOR_BLACK });

  let y = TY + 14;
  const descMaxWidth = R - COL_QTY - 12;

  invoice.items.forEach((item: InvoiceItem) => {
    doc.setFontSize(8.5);
    const lines: string[] = doc.splitTextToSize(String(item.description), descMaxWidth);
    lines.forEach((line, i) => put(line, COL_DESC, y + i * 4.5, { size: 8.5, color: COLOR_BLACK }));

    const qty = item.quantity || 1;
    const unitPrice = halalasToSar(item.unitPriceHalalas);
    const lineTotal = qty * unitPrice;

    put(String(qty), COL_QTY, y, { align: 'center', size: 8.5, color: COLOR_GRAY });
    put(formatSar(unitPrice), COL_UNIT, y, { align: 'center', size: 8.5, color: COLOR_GRAY });
    put(formatSar(lineTotal), COL_AMT, y, { align: 'center', size: 8.5, color: COLOR_BLACK });

    const rowH = Math.max(1, lines.length) * 4.5 + 3.5;
    doc.setDrawColor(229, 233, 232);
    doc.setLineWidth(0.2);
    doc.line(L, y + rowH - 2, R, y + rowH - 2);
    y += rowH + 2.5;
  });

  // 5. Totals & Bank Details
  const totalsY = y + 4;
  const BX = L;
  const BW = 78;
  const LBL = BX + BW - 2;
  const VAL = BX + 2;

  // Totals Box (Left)
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.6);
  doc.line(BX, totalsY, BX + BW, totalsY);

  let ty = totalsY + 6.5;
  put(hasVat ? 'المجموع قبل الضريبة' : 'المجموع الإجمالي', LBL, ty, { size: 8.5, color: COLOR_GRAY });
  put(`${formatSar(subtotalSar)} SAR`, VAL, ty, { align: 'left', size: 8.5, color: COLOR_BLACK });

  if (discountSar > 0) {
    ty += 6;
    put('الخصم المعتمد', LBL, ty, { size: 8.5, color: [180, 83, 9] });
    put(`-${formatSar(discountSar)} SAR`, VAL, ty, { align: 'left', size: 8.5, color: [180, 83, 9] });
  }

  if (hasVat) {
    ty += 6;
    put(`ضريبة القيمة المضافة ${invoice.vatRatePercent}%`, LBL, ty, { size: 8.5, color: COLOR_GRAY });
    put(`${formatSar(vatSar)} SAR`, VAL, ty, { align: 'left', size: 8.5, color: COLOR_BLACK });
  }

  ty += 4.5;
  doc.setFillColor(240, 197, 174); // #F0C5AE
  doc.rect(BX, ty, BW, 9, 'F');
  put('TOTAL · الإجمالي المستحق', LBL, ty + 6, { size: 9, color: COLOR_BLACK });
  put(`${formatSar(totalSar)} SAR`, VAL, ty + 6, { align: 'left', size: 10.5, color: COLOR_BLACK });

  // Bank Details (Right)
  put('تفاصيل الحساب البنكي المعتمد للسداد', R, totalsY + 6.5, { size: 8, color: COLOR_GRAY });
  put(seller.bankName, R, totalsY + 12.5, { size: 8.5, color: COLOR_BLACK });
  put(`اسم الحساب: ${seller.accountName}`, R, totalsY + 17.5, { size: 8.5, color: COLOR_BLACK });
  put('رقم الآيبان (IBAN):', R, totalsY + 23, { size: 7.5, color: COLOR_GRAY });
  put(seller.iban, R, totalsY + 28.5, { size: 9.5, color: COLOR_BLACK });
  if (hasVat && seller.vatNumber) {
    put(`الرقم الضريبي للمنشأة المصدرة: ${seller.vatNumber}`, R, totalsY + 34, { size: 8, color: COLOR_GRAY });
  }

  // ─────────────────────────────────────────────────────────────
  // CONTRACT TERMS & CONDITIONS (PAGINATED ACCROSS PAGES)
  // ─────────────────────────────────────────────────────────────
  const terms: ContractClause[] = Array.isArray(invoice.terms) ? invoice.terms : [];

  // Determine starting Y for terms or add new page if not enough space
  let termsStartY = Math.max(ty + 16, totalsY + 40);
  if (termsStartY > 215) {
    doc.addPage();
    termsStartY = 25;
  }

  // Terms Section Header
  put('بنود وشروط التعاقد والاشتراك المعتمدة (CONTRACT TERMS & CONDITIONS)', R, termsStartY, {
    size: 9.5,
    color: COLOR_TEAL,
  });
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.4);
  doc.line(L, termsStartY + 3, R, termsStartY + 3);

  let curTermsY = termsStartY + 9;

  terms.forEach((term, idx) => {
    const clauseTitle = `${idx + 1}. ${term.title}:`;
    doc.setFontSize(8.5);
    const bodyLines: string[] = doc.splitTextToSize(term.body, W);
    const clauseHeight = 4.5 + bodyLines.length * 4.2 + 3;

    // Check if clause fits on current page before footer area (255mm)
    if (curTermsY + clauseHeight > 255) {
      doc.addPage();
      curTermsY = 25;
      put('(تابع) بنود وشروط التعاقد والاشتراك المعتمدة', R, curTermsY, {
        size: 9,
        color: COLOR_TEAL,
      });
      doc.setDrawColor(...COLOR_LINE);
      doc.setLineWidth(0.4);
      doc.line(L, curTermsY + 3, R, curTermsY + 3);
      curTermsY += 9;
    }

    put(clauseTitle, R, curTermsY, { size: 8.5, color: COLOR_BLACK });
    curTermsY += 4.5;

    bodyLines.forEach((line) => {
      put(line, R, curTermsY, { size: 7.5, color: COLOR_GRAY });
      curTermsY += 4.2;
    });

    curTermsY += 2.5; // spacing between clauses
  });

  // ─────────────────────────────────────────────────────────────
  // SIGNATURES BLOCK (RASHX + CLIENT EMPTY BOX)
  // ─────────────────────────────────────────────────────────────
  const sigBlockHeight = 40;
  if (curTermsY + sigBlockHeight > 255) {
    doc.addPage();
    curTermsY = 25;
  } else {
    curTermsY += 4;
  }

  put('إقرار واعتماد العقد (CONTRACT ACCEPTANCE & SIGNATURES)', R, curTermsY, {
    size: 9,
    color: COLOR_TEAL,
  });
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.4);
  doc.line(L, curTermsY + 2.5, R, curTermsY + 2.5);

  const sy = curTermsY + 6;
  const boxWidth = 80;

  // 1. Right Box: First Party (RASHX Platform)
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.3);
  doc.rect(110, sy, boxWidth, 28);
  put(`الطرف الأول: ${seller.nameAr}`, 187, sy + 5.5, { size: 7.5, color: COLOR_GRAY });
  put('إدارة الاشتراكات والتعاقدات الرسمية', 187, sy + 10, { size: 8, color: COLOR_BLACK });

  // Place Stamp Image if available
  if (assets?.stampBuffer) {
    try {
      const stampBase64 = assets.stampBuffer.toString('base64');
      doc.addImage(`data:image/png;base64,${stampBase64}`, 'PNG', 114, sy + 8, 18, 18);
    } catch {
      // ignore
    }
  }

  // Place Signature Image if available
  if (assets?.signatureBuffer) {
    try {
      const sigBase64 = assets.signatureBuffer.toString('base64');
      doc.addImage(`data:image/png;base64,${sigBase64}`, 'PNG', 138, sy + 11, 28, 14);
    } catch {
      put('معتمد رسمياً · RASHX HQ', 187, sy + 22, { size: 9, color: COLOR_TEAL });
    }
  } else {
    put('معتمد رسمياً · RASHX HQ', 187, sy + 22, { size: 9, color: COLOR_TEAL });
  }
  put(`التاريخ: ${displayDate}`, 187, sy + 26, { size: 7.5, color: COLOR_GRAY });

  // 2. Left Box: Second Party (Customer / Salon)
  doc.setDrawColor(0, 0, 0);
  doc.setLineDashPattern([1.5, 1.5], 0);
  doc.rect(L, sy, boxWidth, 28);
  doc.setLineDashPattern([], 0); // reset dash

  put('الطرف الثاني (الصالون المشترك · المفوض بالتوقيع)', 97, sy + 5.5, { size: 7.5, color: COLOR_BLACK });
  put(invoice.customer.name || invoice.customer.facilityName, 97, sy + 10.5, { size: 8, color: COLOR_BLACK });

  put('[ مساحة التوقيع والختم الرسمي للعميل ]', 60, sy + 18, {
    align: 'center',
    size: 7.5,
    color: COLOR_GRAY,
  });
  put('نسخة موقعة يتم رفعها بعد الاعتماد', 60, sy + 24, {
    align: 'center',
    size: 7,
    color: COLOR_GRAY,
  });

  // ─────────────────────────────────────────────────────────────
  // FOOTER & PAGE NUMBERS (STAMPED ON EVERY PAGE)
  // ─────────────────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  const disclaimerText =
    seller.disclaimerLine ||
    'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.';

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Top border line
    doc.setDrawColor(...COLOR_LINE);
    doc.setLineWidth(0.4);
    doc.line(L, FOOTER_Y, R, FOOTER_Y);

    // Disclaimer
    put(disclaimerText, R, FOOTER_Y + 4, { size: 7, color: COLOR_GRAY });

    // Separator line
    doc.setDrawColor(229, 233, 232);
    doc.setLineWidth(0.2);
    doc.line(L, FOOTER_Y + 7, R, FOOTER_Y + 7);

    // Document Number & Page Counter
    put(`رقم المستند: ${docNumber}`, R, FOOTER_Y + 11.5, { size: 7.5, color: COLOR_BLACK });
    put(`صفحة ${i} من ${totalPages}`, L, FOOTER_Y + 11.5, { align: 'left', size: 7.5, color: COLOR_BLACK });

    put('شكراً لتعاملكم واختياركم منصة راش إكس · Thank you for your business', 105, FOOTER_Y + 11.5, {
      align: 'center',
      size: 7.5,
      color: COLOR_GRAY,
    });
  }

  const pdfArrayBuffer = doc.output('arraybuffer');
  const buffer = Buffer.from(pdfArrayBuffer);
  const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');

  return {
    buffer,
    sha256,
  };
}
