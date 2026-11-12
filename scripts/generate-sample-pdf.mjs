import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { jsPDF } from 'jspdf';
import sharp from 'sharp';

async function generateSamplePdf() {
  console.log('Generating multi-page sample PDF with jsPDF and Amiri font...');

  const fontPath = path.join(process.cwd(), 'public/fonts/Amiri-Regular.ttf');
  const fontBase64 = fs.readFileSync(fontPath).toString('base64');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  doc.addFileToVFS('Amiri-Regular.ttf', fontBase64);
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
  doc.setFont('Amiri');

  // Rasterize RASHX logo
  const svgPath = path.join(process.cwd(), 'public/brand/logo/wordmark/wordmark-black.svg');
  let logoPngBase64 = null;
  if (fs.existsSync(svgPath)) {
    const pngBuf = await sharp(fs.readFileSync(svgPath)).resize({ width: 400 }).png().toBuffer();
    logoPngBase64 = pngBuf.toString('base64');
  }

  const L = 20;
  const R = 190;
  const W = R - L;
  const FOOTER_Y = 272;

  const COLOR_TEAL = [41, 84, 92];
  const COLOR_GRAY = [94, 102, 101];
  const COLOR_BLACK = [0, 0, 0];
  const COLOR_LINE = [145, 184, 192];

  const hasArabic = (s) => /[\u0600-\u06FF]/.test(s);

  const put = (text, x, y, opts = {}) => {
    const t = String(text ?? '');
    if (opts.size) doc.setFontSize(opts.size);
    if (opts.color) doc.setTextColor(...opts.color);
    const align = opts.align ?? 'right';
    if (hasArabic(t)) {
      doc.text(t, x, y, { align, lang: 'ar' });
    } else {
      doc.text(t, x, y, { align });
    }
  };

  const docNumber = 'INV-2026-0001';
  const issueDate = '2026-11-12';
  const dueDate = '2027-11-12';

  // 1. Header
  if (logoPngBase64) {
    doc.addImage(`data:image/png;base64,${logoPngBase64}`, 'PNG', L, 16, 38, 12);
  }
  put('عقد وفاتورة تجارية', R, 20, { size: 14, color: COLOR_BLACK });
  put('COMMERCIAL CONTRACT & INVOICE', R, 25.5, { size: 8, color: COLOR_GRAY });
  put('منظومة إدارة وتشغيل الصالونات ومراكز التجميل السحابية', R, 30.5, { size: 8, color: COLOR_GRAY });

  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.6);
  doc.line(L, 35, R, 35);

  // 2. Customer & Document Meta
  put('BILLED TO · الطرف الثاني (المنشأة المشتركة)', R, 44, { size: 8, color: COLOR_GRAY });
  put('صالون لمسات الأناقة للتزيين النسائي', R, 50, { size: 11, color: COLOR_BLACK });
  put('المملكة العربية السعودية، الرياض، حي العليا، طريق الملك فهد', R, 55.5, { size: 8.5, color: COLOR_GRAY });
  put('المسؤول المفوض: أ. نورة بنت عبدالعزيز القحطاني', R, 61, { size: 8.5, color: COLOR_BLACK });
  put('الهاتف: +966 50 123 4567 | البريد: noura@elegance-salon.sa', R, 66, { size: 8, color: COLOR_GRAY });
  put('السجل التجاري: 1010889922 | الرقم الضريبي: 310123456700003', R, 71, { size: 8, color: COLOR_GRAY });

  const MX = 100;
  put('رقم العقد والفاتورة', MX, 44, { size: 8, color: COLOR_GRAY });
  put(docNumber, MX, 50, { size: 11, color: COLOR_BLACK });
  put('تاريخ الإصدار', MX, 57, { size: 8, color: COLOR_GRAY });
  put(issueDate, MX, 62.5, { size: 9, color: COLOR_BLACK });
  put('فترة وسريان العقد', MX, 69.5, { size: 8, color: COLOR_GRAY });
  put(`من ${issueDate} إلى ${dueDate}`, MX, 75, { size: 8.5, color: COLOR_TEAL });

  // 3. Seller Block
  const sellerBarY = 78;
  doc.setFillColor(250, 251, 251);
  doc.rect(L, sellerBarY, W, 10, 'F');
  doc.setDrawColor(229, 233, 232);
  doc.setLineWidth(0.2);
  doc.rect(L, sellerBarY, W, 10, 'D');
  put('الطرف الأول: منصة راش إكس لتقنية المعلومات RASHX | س.ت: 1010998877 | الرقم الضريبي: 300099887700003 | billing@rashx.com', R - 3, sellerBarY + 6.5, { size: 7.5, color: COLOR_GRAY });

  // 4. Items Table
  const TY = sellerBarY + 14;
  doc.setFillColor(...COLOR_LINE);
  doc.rect(L, TY, W, 8, 'F');

  const COL_DESC = R - 3;
  const COL_QTY = 105;
  const COL_UNIT = 72;
  const COL_AMT = 38;

  put('البيان والخدمات المشمولة', COL_DESC, TY + 5.5, { size: 8.5, color: COLOR_BLACK });
  put('الكمية', COL_QTY, TY + 5.5, { align: 'center', size: 8.5, color: COLOR_BLACK });
  put('سعر الوحدة (ر.س)', COL_UNIT, TY + 5.5, { align: 'center', size: 8.5, color: COLOR_BLACK });
  put('المبلغ المستحق (ر.س)', COL_AMT, TY + 5.5, { align: 'center', size: 8.5, color: COLOR_BLACK });

  const items = [
    { description: 'اشتراك منصة راش إكس السحابية المتكاملة (الباقة الاحترافية Pro) - سنة كاملة تشمل نظام الكاشير POS وإدارة المواعيد', quantity: 1, unitPrice: 12000, total: 12000 },
    { description: 'تفعيل بوابة الحجز الإلكتروني عبر الويب وتطبيق العملاء المخصص (PWA)', quantity: 1, unitPrice: 1500, total: 1500 },
    { description: 'حزمة إعداد الحساب، تهيئة الخدمات، وتدريب طاقم العمل والدعم الفني المباشر VIP', quantity: 1, unitPrice: 1000, total: 1000 },
  ];

  let y = TY + 14;
  const descMaxWidth = R - COL_QTY - 12;

  items.forEach((item) => {
    doc.setFontSize(8.5);
    const lines = doc.splitTextToSize(item.description, descMaxWidth);
    lines.forEach((line, i) => put(line, COL_DESC, y + i * 4.5, { size: 8.5, color: COLOR_BLACK }));

    put(String(item.quantity), COL_QTY, y, { align: 'center', size: 8.5, color: COLOR_GRAY });
    put(item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 }), COL_UNIT, y, { align: 'center', size: 8.5, color: COLOR_GRAY });
    put(item.total.toLocaleString('en-US', { minimumFractionDigits: 2 }), COL_AMT, y, { align: 'center', size: 8.5, color: COLOR_BLACK });

    const rowH = Math.max(1, lines.length) * 4.5 + 3.5;
    doc.setDrawColor(229, 233, 232);
    doc.setLineWidth(0.2);
    doc.line(L, y + rowH - 2, R, y + rowH - 2);
    y += rowH + 2.5;
  });

  // 5. Totals Box & Bank Details
  const totalsY = y + 4;
  const BX = L;
  const BW = 78;
  const LBL = BX + BW - 2;
  const VAL = BX + 2;

  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.6);
  doc.line(BX, totalsY, BX + BW, totalsY);

  let ty = totalsY + 6.5;
  put('المجموع قبل الضريبة', LBL, ty, { size: 8.5, color: COLOR_GRAY });
  put('14,500.00 SAR', VAL, ty, { align: 'left', size: 8.5, color: COLOR_BLACK });

  ty += 6;
  put('الخصم الترويجي المعتمد', LBL, ty, { size: 8.5, color: [180, 83, 9] });
  put('-1,500.00 SAR', VAL, ty, { align: 'left', size: 8.5, color: [180, 83, 9] });

  ty += 6;
  put('ضريبة القيمة المضافة 15%', LBL, ty, { size: 8.5, color: COLOR_GRAY });
  put('1,950.00 SAR', VAL, ty, { align: 'left', size: 8.5, color: COLOR_BLACK });

  ty += 4.5;
  doc.setFillColor(240, 197, 174);
  doc.rect(BX, ty, BW, 9, 'F');
  put('TOTAL · الإجمالي المستحق', LBL, ty + 6, { size: 9, color: COLOR_BLACK });
  put('14,950.00 SAR', VAL, ty + 6, { align: 'left', size: 10.5, color: COLOR_BLACK });

  put('تفاصيل الحساب البنكي المعتمد للسداد', R, totalsY + 6.5, { size: 8, color: COLOR_GRAY });
  put('مصرف الراجحي (Al Rajhi Bank)', R, totalsY + 12.5, { size: 8.5, color: COLOR_BLACK });
  put('اسم الحساب: شركة راش إكس لتقنية المعلومات', R, totalsY + 17.5, { size: 8.5, color: COLOR_BLACK });
  put('رقم الآيبان (IBAN):', R, totalsY + 23, { size: 7.5, color: COLOR_GRAY });
  put('SA4480000205608010012345', R, totalsY + 28.5, { size: 9.5, color: COLOR_BLACK });
  put('الرقم الضريبي للمنشأة المصدرة: 300099887700003', R, totalsY + 34, { size: 8, color: COLOR_GRAY });

  // 6. Contract Clauses (Multi-Page Paginated)
  let termsStartY = Math.max(ty + 16, totalsY + 42);
  if (termsStartY > 215) {
    doc.addPage();
    termsStartY = 25;
  }

  put('بنود وشروط التعاقد والاشتراك المعتمدة (CONTRACT TERMS & CONDITIONS)', R, termsStartY, { size: 9.5, color: COLOR_TEAL });
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.4);
  doc.line(L, termsStartY + 3, R, termsStartY + 3);

  const clauses = [
    { title: 'نطاق الخدمة والاشتراك السحابي', body: 'تلتزم منصة راش إكس (RASHX) بتوفير خدمات النظام السحابي لإدارة وتشغيل الصالونات، بما يشمل نظام نقاط البيع السحابي POS، إدارة المواعيد والحجوزات، ملفات العملاء، والتقارير المالية والتشغيلية وفق الباقة المحددة في هذا العقد وخلال مدة سريان الاشتراك.' },
    { title: 'المقابل المالي وشروط الدفع والسداد', body: 'يلتزم الطرف الثاني بسداد المقابل المالي الموضح في جدول الأسعار أعلاه خلال مدة أقصاها (14) يوماً من تاريخ إصدار هذه الفاتورة عبر التحويل البنكي المعتمد لحساب الطرف الأول. وفي حال التأخر في السداد يحق للطرف الأول تعليق تفعيل الخدمات السحابية بعد إشعار الطرف الثاني.' },
    { title: 'مدة العقد والسريان والإنهاء', body: 'يسري هذا العقد اعتباراً من تاريخ توقيعه أو تفعيل الحساب السحابي للطرف الثاني ولمدة سنة ميلادية كاملة تتجدد تلقائياً لمدد مماثلة ما لم يخطر أحد الطرفين الآخر كتابياً بعدم رغبته في التجديد قبل ثلاثين (30) يوماً على الأقل من تاريخ نهاية المدة السارية.' },
    { title: 'سرية وأمان البيانات والخصوصية', body: 'يتعهد الطرفان بالحفاظ على السرية التامة لكافة البيانات والمعلومات التشغيلية والمالية وقواعد بيانات العملاء المتبادلة بموجب هذا العقد. وتلتزم منصة راش إكس بحماية بيانات العميل ومشتركيه بأعلى معايير التشفير والأمان السحابي المعتمدة وفق الأنظمة المعمول بها.' },
    { title: 'حدود المسؤولية والتعويض', body: 'تقتصر مسؤولية منصة راش إكس التعاقدية عن أي أضرار مباشرة ناتجة عن انقطاع الخدمة على ما لا يتجاوز إجمالي المبالغ المدفوعة فعلياً من الطرف الثاني خلال الثلاثة أشهر السابقة للواقعة، ولا تتحمل المنصة أي مسؤولية عن الأرباح الفائتة أو الأضرار التبعية أو غير المباشرة.' },
    { title: 'النظام الواجب التطبيق والاختصاص القضائي', body: 'يخضع هذا العقد ويفسر وفقاً للأنظمة واللوائح السارية في المملكة العربية السعودية، وتختص المحاكم التجارية بمدينة الرياض حصرياً بالفصل في أي نزاع قد ينشأ عن تنفيذ أو تفسير بنود هذا العقد.' },
  ];

  let curTermsY = termsStartY + 9;

  clauses.forEach((term, idx) => {
    const clauseTitle = `${idx + 1}. ${term.title}:`;
    doc.setFontSize(8.5);
    const bodyLines = doc.splitTextToSize(term.body, W);
    const clauseHeight = 4.5 + bodyLines.length * 4.2 + 3;

    if (curTermsY + clauseHeight > 255) {
      doc.addPage();
      curTermsY = 25;
      put('(تابع) بنود وشروط التعاقد والاشتراك المعتمدة', R, curTermsY, { size: 9, color: COLOR_TEAL });
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

    curTermsY += 2.5;
  });

  // 7. Signature Block
  const sigBlockHeight = 40;
  if (curTermsY + sigBlockHeight > 255) {
    doc.addPage();
    curTermsY = 25;
  } else {
    curTermsY += 4;
  }

  put('إقرار واعتماد العقد (CONTRACT ACCEPTANCE & SIGNATURES)', R, curTermsY, { size: 9, color: COLOR_TEAL });
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.4);
  doc.line(L, curTermsY + 2.5, R, curTermsY + 2.5);

  const sy = curTermsY + 6;
  const boxWidth = 80;

  // Box 1: RASHX (Right)
  doc.setDrawColor(...COLOR_LINE);
  doc.setLineWidth(0.3);
  doc.rect(110, sy, boxWidth, 28);
  put('الطرف الأول: منصة راش إكس لتقنية المعلومات RASHX', 187, sy + 5.5, { size: 7.5, color: COLOR_GRAY });
  put('إدارة الاشتراكات والتعاقدات الرسمية', 187, sy + 10, { size: 8, color: COLOR_BLACK });
  put('معتمد رسمياً · RASHX HQ', 187, sy + 22, { size: 9, color: COLOR_TEAL });
  put(`التاريخ: ${issueDate}`, 187, sy + 26, { size: 7.5, color: COLOR_GRAY });

  // Box 2: Second Party (Left)
  doc.setDrawColor(0, 0, 0);
  doc.setLineDashPattern([1.5, 1.5], 0);
  doc.rect(L, sy, boxWidth, 28);
  doc.setLineDashPattern([], 0);

  put('الطرف الثاني (الصالون المشترك · المفوض بالتوقيع)', 97, sy + 5.5, { size: 7.5, color: COLOR_BLACK });
  put('أ. نورة بنت عبدالعزيز القحطاني', 97, sy + 10.5, { size: 8, color: COLOR_BLACK });
  put('[ مساحة التوقيع والختم الرسمي للعميل ]', 60, sy + 18, { align: 'center', size: 7.5, color: COLOR_GRAY });
  put('نسخة موقعة يتم رفعها بعد الاعتماد', 60, sy + 24, { align: 'center', size: 7, color: COLOR_GRAY });

  // 8. Footer on Every Page
  const totalPages = doc.getNumberOfPages();
  const disclaimerText = 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.';

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...COLOR_LINE);
    doc.setLineWidth(0.4);
    doc.line(L, FOOTER_Y, R, FOOTER_Y);

    put(disclaimerText, R, FOOTER_Y + 4, { size: 7, color: COLOR_GRAY });

    doc.setDrawColor(229, 233, 232);
    doc.setLineWidth(0.2);
    doc.line(L, FOOTER_Y + 7, R, FOOTER_Y + 7);

    put(`رقم المستند: ${docNumber}`, R, FOOTER_Y + 11.5, { size: 7.5, color: COLOR_BLACK });
    put(`صفحة ${i} من ${totalPages}`, L, FOOTER_Y + 11.5, { align: 'left', size: 7.5, color: COLOR_BLACK });
    put('شكراً لتعاملكم واختياركم منصة راش إكس · Thank you for your business', 105, FOOTER_Y + 11.5, { align: 'center', size: 7.5, color: COLOR_GRAY });
  }

  const pdfArrayBuffer = doc.output('arraybuffer');
  const buffer = Buffer.from(pdfArrayBuffer);
  const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');

  const outputPath = '/tmp/sample-invoice-contract.pdf';
  fs.writeFileSync(outputPath, buffer);

  console.log('✅ Generated sample PDF successfully!');
  console.log(`- Path: ${outputPath}`);
  console.log(`- Size: ${(buffer.length / 1024).toFixed(2)} KB`);
  console.log(`- Total Pages: ${totalPages}`);
  console.log(`- SHA-256: ${sha256}`);
}

generateSamplePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});

