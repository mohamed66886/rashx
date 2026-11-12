'use client';

import React from 'react';
import type { PlatformInvoice as LegacyInvoice, BillingSettings } from '@/lib/types/platform';
import type { PlatformInvoice, ContractClause } from '@/lib/types/billing';

export interface InvoicePrintableDocumentProps {
  invoice: PlatformInvoice | LegacyInvoice | any;
  billingSettings?: BillingSettings | null;
  id?: string;
  className?: string;
}

export const InvoicePrintableDocument: React.FC<InvoicePrintableDocumentProps> = ({
  invoice,
  billingSettings,
  id = 'printable-invoice-doc',
  className = '',
}) => {
  const isQuote = invoice.docKind === 'quote';
  const docTitleAr = isQuote ? 'عرض سعر وعقد' : 'عقد وفاتورة';
  const docTitleEn = isQuote ? 'PRICE QUOTE & CONTRACT' : 'CONTRACT & INVOICE';
  const docNumberLabelAr = isQuote ? 'رقم عرض السعر والعقد' : 'رقم العقد والفاتورة';
  const docNumberLabelEn = isQuote ? 'QUOTE NO.' : 'INVOICE NO.';

  // Seller from frozen copy or billingSettings
  const seller = invoice.seller || (billingSettings ? {
    nameAr: billingSettings.facilityName,
    nameEn: 'RASHX PLATFORM',
    bankName: billingSettings.bankName,
    accountName: billingSettings.accountName,
    iban: billingSettings.iban,
    vatNumber: billingSettings.taxNumber,
    address: billingSettings.address,
    disclaimerLine: billingSettings.disclaimerLine,
  } : undefined);

  const sellerNameAr = seller?.nameAr || billingSettings?.facilityName || 'منصة راش إكس RASHX';
  const sellerBankName = seller?.bankName || billingSettings?.bankName;
  const sellerAccountName = seller?.accountName || billingSettings?.accountName;
  const sellerIban = seller?.iban || billingSettings?.iban;
  const sellerVatNumber = seller?.vatNumber || billingSettings?.taxNumber;
  const disclaimerLine = seller?.disclaimerLine || billingSettings?.disclaimerLine || 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.';

  const isVatEnabled = invoice.vatRatePercent !== undefined ? invoice.vatRatePercent > 0 : Boolean(invoice.vatEnabled);
  const hasVat = Boolean(isVatEnabled && sellerVatNumber);
  const vatRatePercent = invoice.vatRatePercent !== undefined ? invoice.vatRatePercent : Math.round((invoice.vatRate || 0.15) * 100);

  const facilityName = invoice.customer?.facilityName || invoice.facilityName || '—';
  const facilityAddress = invoice.customer?.address || invoice.facilityAddress || '—';
  const customerName = invoice.customer?.name || invoice.customerName || '';
  const customerPhone = invoice.customer?.phone || invoice.customerPhone || '';
  const commercialReg = invoice.customer?.commercialRegNumber || invoice.commercialReg || invoice.taxNumber || '';

  const subtotal = (invoice.totals?.subtotal !== undefined ? invoice.totals.subtotal / 100 : invoice.subtotal) || 0;
  const discount = (invoice.totals?.discount !== undefined ? invoice.totals.discount / 100 : invoice.discount) || 0;
  const vatAmount = (invoice.totals?.vat !== undefined ? invoice.totals.vat / 100 : invoice.vatAmount) || 0;
  const totalAmount = (invoice.totals?.total !== undefined ? invoice.totals.total / 100 : invoice.totalAmount) || 0;

  const displayDate = invoice.issueDate || invoice.invoiceDate || new Date().toISOString().split('T')[0];
  const displayStart = invoice.issueDate || invoice.startDate || displayDate;
  const displayEnd = invoice.dueDate || invoice.endDate || 'سنة من تاريخ البدء';
  const invoiceNum = invoice.number || invoice.invoiceNumber || (isQuote ? 'QUO-0001' : 'INV-0001');

  const formatCurrency = (val: number) =>
    Number(val || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div
      id={id}
      dir="rtl"
      className={`bg-white text-[#000000] mx-auto relative shadow-md border border-[#E5E9E8] print:border-none print:shadow-none print:m-0 ${className}`}
      style={{
        width: '100%',
        maxWidth: '820px',
        minHeight: '1160px', // Standard A4 aspect ratio (1 : 1.414)
        padding: '50px 48px',
        fontFamily: "'Ping AR + LT', 'PingAR+LT', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        boxSizing: 'border-box',
      }}
    >
      {/* ───────────────── Top Header ───────────────── */}
      <div className="flex justify-between items-start mb-4">
        {/* Top Left / End: RASHX Wordmark */}
        <div className="text-right">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo/wordmark/wordmark-black.svg"
            alt="RASHX"
            className="h-8 w-auto mb-1"
          />
          <div className="text-[11px] text-[#5E6665] font-normal tracking-wide">
            منظومة إدارة وتشغيل الصالونات السحابية
          </div>
        </div>

        {/* Top Right: CONTRACT & INVOICE / عقد وفاتورة */}
        <div className="text-left font-sans">
          <div className="text-xl font-bold tracking-[1.5px] text-[#000000] uppercase">
            {docTitleEn}
          </div>
          <div className="text-xs text-[#5E6665] font-normal tracking-normal mt-0.5">
            {docTitleAr}
          </div>
        </div>
      </div>

      {/* Separator line (#91B8C0) */}
      <div className="w-full h-[2.5px] bg-[#91B8C0] mb-7" />

      {/* ───────────────── BILLED TO & INVOICE META ───────────────── */}
      <div className="grid grid-cols-2 gap-8 mb-8 text-xs">
        {/* Right side (RTL Start): BILLED TO */}
        <div>
          <div className="text-[10px] text-[#5E6665] font-bold tracking-widest uppercase mb-1.5">
            BILLED TO · الطرف الثاني (المنشأة المشتركة)
          </div>
          <div className="text-base font-bold text-[#000000] mb-1">
            {facilityName}
          </div>
          <div className="text-xs text-[#5E6665] font-normal leading-relaxed">
            {facilityAddress}
          </div>
          {customerName && (
            <div className="text-xs text-[#000000] font-medium mt-1.5">
              المسؤول المفوض: <span className="font-bold">{customerName}</span>
              {customerPhone && (
                <span className="text-[#5E6665] ms-2">({customerPhone})</span>
              )}
            </div>
          )}
          {commercialReg && (
            <div className="text-[11px] text-[#5E6665] mt-0.5">
              الرقم الضريبي / السجل: {commercialReg}
            </div>
          )}
        </div>

        {/* Left side (RTL End): INVOICE NO & DATE */}
        <div className="text-left">
          <div className="mb-3">
            <div className="text-[10px] text-[#5E6665] font-bold tracking-widest uppercase mb-0.5">
              {docNumberLabelEn} · {docNumberLabelAr}
            </div>
            <div className="text-sm font-bold text-[#000000]">
              {invoiceNum}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-[10px] text-[#5E6665] font-bold tracking-widest uppercase mb-0.5">
              DATE · تاريخ الإصدار
            </div>
            <div className="text-xs text-[#000000]">
              {displayDate}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#5E6665] font-bold tracking-widest uppercase mb-0.5">
              CONTRACT PERIOD · مدة وسريان العقد
            </div>
            <div className="text-xs font-bold text-[#29545c]">
              من {displayStart} إلى {displayEnd}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── Table of Items ───────────────── */}
      <div className="mb-6">
        {/* Table Header: solid #91B8C0 */}
        <div className="bg-[#91B8C0] text-[#000000] px-4 py-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <div className="flex-1 text-right">DESCRIPTION · بيان البنود والاشتراك</div>
          <div className="w-16 text-center">QTY · الكمية</div>
          <div className="w-28 text-left">UNIT PRICE (ر.س)</div>
          <div className="w-28 text-left">AMOUNT (ر.س)</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#E5E9E8]">
          {invoice.items && invoice.items.length > 0 ? (
            invoice.items.map((item: any, idx: number) => {
              const uPrice = item.unitPriceHalalas !== undefined ? item.unitPriceHalalas / 100 : (item.unitPrice || 0);
              const lineTotal = Number(item.quantity || 1) * uPrice;
              return (
                <div
                  key={item.id || idx}
                  className="px-4 py-3.5 flex items-center justify-between text-xs font-normal"
                >
                  <div className="flex-1 text-right">
                    <div className="font-bold text-[#000000]">{item.description}</div>
                  </div>
                  <div className="w-16 text-center text-[#5E6665]">{item.quantity}</div>
                  <div className="w-28 text-left font-mono text-[#5E6665]">
                    {formatCurrency(uPrice)}
                  </div>
                  <div className="w-28 text-left font-mono font-bold text-[#000000]">
                    {formatCurrency(lineTotal)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-3.5 text-xs text-[#5E6665] text-center">
              لا توجد بنود محددة
            </div>
          )}
        </div>
      </div>

      {/* ───────────────── Totals Box (Right aligned in LTR, Left in RTL) ───────────────── */}
      <div className="flex justify-start mb-8">
        <div className="w-72">
          {/* Top line #91B8C0 */}
          <div className="w-full h-[2px] bg-[#91B8C0] mb-2.5" />

          {/* Subtotal */}
          <div className="flex justify-between items-center text-xs text-[#5E6665] py-1">
            <span>{hasVat ? 'المجموع قبل الضريبة (Subtotal):' : 'المجموع الإجمالي:'}</span>
            <span className="font-mono text-[#000000] font-medium">
              {formatCurrency(subtotal)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center text-xs text-amber-700 py-1">
              <span>الخصم الترويجي المعتمد:</span>
              <span className="font-mono font-medium">
                -{formatCurrency(discount)}
              </span>
            </div>
          )}

          {/* Tax (Only when VAT is enabled and seller VAT number exists) */}
          {hasVat && (
            <div className="flex justify-between items-center text-xs text-[#5E6665] py-1 mb-2">
              <span>ضريبة القيمة المضافة {vatRatePercent}% (VAT):</span>
              <span className="font-mono text-[#000000] font-medium">
                {formatCurrency(vatAmount)}
              </span>
            </div>
          )}

          {/* TOTAL Highlight Bar (#F0C5AE) */}
          <div className="bg-[#F0C5AE] text-[#000000] px-3.5 py-3 flex justify-between items-center rounded-xs">
            <span className="text-xs font-bold uppercase tracking-wider">
              TOTAL · الإجمالي المستحق
            </span>
            <span className="text-base font-black font-mono">
              {formatCurrency(totalAmount)} ر.س
            </span>
          </div>
        </div>
      </div>

      {/* ───────────────── Payment Details & Notes ───────────────── */}
      <div className="mb-8 pt-3 border-t border-[#E5E9E8] text-xs">
        <div className="text-[10px] text-[#5E6665] font-bold tracking-widest uppercase mb-1">
          PAYMENT DETAILS · تفاصيل الحساب البنكي المعتمد
        </div>
        <div className="text-xs text-[#000000] leading-relaxed">
          {sellerBankName && sellerIban ? (
            <>
              {sellerBankName} · الحساب: {sellerAccountName}
              <br />
              الآيبان البنكي (IBAN):{' '}
              <span className="font-mono font-bold" dir="ltr">
                {sellerIban}
              </span>
              {hasVat && sellerVatNumber && (
                <div className="text-[11px] text-[#5E6665] mt-1">
                  الرقم الضريبي للمنشأة المصدرة: {sellerVatNumber}
                </div>
              )}
            </>
          ) : (
            <div className="text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-md font-medium text-[11px] my-1">
              خطأ: لم يتم ضبط إعدادات الفوترة البنكية (Missing billing settings)
            </div>
          )}
          {invoice.paymentDetails && (
            <div className="mt-1.5 text-[#5E6665]">
              {invoice.paymentDetails}
            </div>
          )}
        </div>
        {invoice.notes && (
          <div className="text-[11px] text-[#5E6665] mt-2 italic">
            * {invoice.notes}
          </div>
        )}
      </div>

      {/* ───────────────── Contract Clauses / Terms (If available) ───────────────── */}
      {Array.isArray(invoice.terms) && invoice.terms.length > 0 && (
        <div className="mb-8 pt-3 border-t border-[#E5E9E8] text-xs">
          <div className="text-[10px] text-[#5E6665] font-bold tracking-widest uppercase mb-2">
            CONTRACT CLAUSES & CONDITIONS · بنود وشروط التعاقد والاشتراك
          </div>
          <div className="space-y-2 bg-[#FAFBFB] p-3.5 rounded-lg border border-[#E5E9E8]">
            {invoice.terms.map((term: any, idx: number) => (
              <div key={term.id || idx} className="text-[10.5px] leading-relaxed text-[#2C3333]">
                <span className="font-bold text-[#000000]">
                  {idx + 1}. {term.title}:
                </span>{' '}
                <span className="text-[#5E6665]">{term.body}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────── Contract Agreement & Signature Section ("يمضي عليه") ───────────────── */}
      <div className="p-4 rounded-xl border border-[#CCD4D3] bg-[#FAFBFB] mb-8 text-xs">
        <div className="text-[11px] font-bold text-[#000000] mb-1.5 flex items-center justify-between">
          <span>إقرار واعتماد العقد (CONTRACT ACCEPTANCE & SIGNATURE)</span>
          <span className="text-[10px] text-[#5E6665] font-normal">
            فترة سريان العقد: من {displayStart} إلى {displayEnd}
          </span>
        </div>

        <p className="text-[11px] text-[#5E6665] leading-relaxed mb-4">
          يُقر الطرف الثاني (المنشأة المشتركة) بموافقته التامة على بنود اشتراك منصة راش إكس السحابية، وتفعيل الخدمات الموضحة أعلاه وفق الأسعار والشروط المعتمدة. يُعتبر هذا المستند عقداً ملزماً ونافذاً بمجرد التوقيع والختم.
        </p>

        {/* Two Signature Boxes */}
        <div className="grid grid-cols-2 gap-6 pt-2">
          {/* Box 1: RashX Platform (First Party) */}
          <div className="border border-dashed border-[#CCD4D3] rounded-lg p-3 bg-white text-center relative overflow-hidden">
            <div className="text-[10px] font-bold text-[#5E6665] uppercase mb-1">
              الطرف الأول ({sellerNameAr})
            </div>
            <div className="text-xs font-bold text-[#000000]">إدارة الاشتراكات والتعاقدات</div>
            <div className="h-14 flex items-center justify-center my-1 relative">
              {billingSettings?.stampUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={billingSettings.stampUrl}
                  alt="Official Stamp"
                  className="absolute h-14 w-auto object-contain opacity-75 pointer-events-none transform -rotate-6"
                />
              )}
              {billingSettings?.signatureUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={billingSettings.signatureUrl}
                  alt="Authorized Signature"
                  className="relative z-10 h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-[11px] font-bold text-[#29545c] border-b border-[#29545c] px-4 py-1 z-10">
                  معتمد رسمياً · RASHX HQ
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#5E6665]">
              التاريخ: {displayDate}
            </div>
          </div>

          {/* Box 2: Client / Salon (Second Party - Sign & Stamp) */}
          <div className="border border-dashed border-[#000000] rounded-lg p-3 bg-white text-center">
            <div className="text-[10px] font-bold text-[#000000] uppercase mb-1">
              الطرف الثاني (الصالون المشترك · المفوض بالتوقيع)
            </div>
            <div className="text-xs font-bold text-[#000000]">
              {customerName || facilityName || 'المفوض بالتوقيع'}
            </div>
            <div className="h-14 flex flex-col items-center justify-center border-y border-dashed border-neutral/60 my-1 text-[10px] text-[#8F9998]">
              <span>[ مساحة توقيع العميل وختم المنشأة الرسمي ]</span>
            </div>
            <div className="text-[10px] text-[#5E6665]">
              التوقيع: ............................ الختم: ............................
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── Footer (#91B8C0 line + legal disclaimer + thank you) ───────────────── */}
      <div className="mt-6">
        <div className="w-full h-[2px] bg-[#91B8C0] mb-2.5" />
        <div className="text-[10px] text-[#5E6665] text-center mb-2 leading-relaxed font-normal">
          {disclaimerLine}
        </div>
        <div className="w-full h-[1px] bg-[#E5E9E8] mb-2.5" />
        <div className="flex justify-between items-center text-xs text-[#5E6665]">
          <div>
            Thank you for your business · شكراً لتعاملكم واختياركم راش إكس
          </div>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo/symbol-rx/symbol-rx-black.svg"
              alt="RX"
              className="h-4 w-auto opacity-75"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
