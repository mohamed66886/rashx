'use client';

import React from 'react';
import type { PlatformInvoice } from '@/lib/types/platform';

export interface InvoicePrintableDocumentProps {
  invoice: PlatformInvoice;
  id?: string;
  className?: string;
}

export const InvoicePrintableDocument: React.FC<InvoicePrintableDocumentProps> = ({
  invoice,
  id = 'printable-invoice-doc',
  className = '',
}) => {
  const displayDate = invoice.invoiceDate || new Date().toISOString().split('T')[0];
  const displayStart = invoice.startDate || displayDate;
  const displayEnd = invoice.endDate || 'سنة من تاريخ البدء';

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

        {/* Top Right: INVOICE / فاتورة */}
        <div className="text-left font-sans">
          <div className="text-2xl font-normal tracking-[2px] text-[#000000] uppercase">
            INVOICE
          </div>
          <div className="text-xs text-[#5E6665] font-normal tracking-normal mt-0.5">
            عقد اشتراك وفاتورة
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
            {invoice.facilityName || '[Client name]'}
          </div>
          <div className="text-xs text-[#5E6665] font-normal leading-relaxed">
            {invoice.facilityAddress || '[Client address]'}
          </div>
          {invoice.customerName && (
            <div className="text-xs text-[#000000] font-medium mt-1.5">
              المسؤول المفوض: <span className="font-bold">{invoice.customerName}</span>
              {invoice.customerPhone && (
                <span className="text-[#5E6665] ms-2">({invoice.customerPhone})</span>
              )}
            </div>
          )}
          {invoice.taxNumber && (
            <div className="text-[11px] text-[#5E6665] mt-0.5">
              الرقم الضريبي / السجل: {invoice.taxNumber}
            </div>
          )}
        </div>

        {/* Left side (RTL End): INVOICE NO & DATE */}
        <div className="text-left">
          <div className="mb-3">
            <div className="text-[10px] text-[#5E6665] font-bold tracking-widest uppercase mb-0.5">
              INVOICE NO. · رقم العقد والفاتورة
            </div>
            <div className="text-sm font-bold text-[#000000]">
              {invoice.invoiceNumber || 'RX-0001'}
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
            invoice.items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="px-4 py-3.5 flex items-center justify-between text-xs font-normal"
              >
                <div className="flex-1 text-right">
                  <div className="font-bold text-[#000000]">{item.description}</div>
                </div>
                <div className="w-16 text-center text-[#5E6665]">{item.quantity}</div>
                <div className="w-28 text-left font-mono text-[#5E6665]">
                  {formatCurrency(item.unitPrice)}
                </div>
                <div className="w-28 text-left font-mono font-bold text-[#000000]">
                  {formatCurrency(Number(item.quantity) * Number(item.unitPrice))}
                </div>
              </div>
            ))
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
            <span>المجموع قبل الضريبة (Subtotal):</span>
            <span className="font-mono text-[#000000] font-medium">
              {formatCurrency(invoice.subtotal)}
            </span>
          </div>

          {invoice.discount > 0 && (
            <div className="flex justify-between items-center text-xs text-amber-700 py-1">
              <span>الخصم الترويجي المعتمد:</span>
              <span className="font-mono font-medium">
                -{formatCurrency(invoice.discount)}
              </span>
            </div>
          )}

          {/* Tax (15%) */}
          <div className="flex justify-between items-center text-xs text-[#5E6665] py-1 mb-2">
            <span>ضريبة القيمة المضافة 15% (VAT):</span>
            <span className="font-mono text-[#000000] font-medium">
              {formatCurrency(invoice.vatAmount)}
            </span>
          </div>

          {/* TOTAL Highlight Bar (#F0C5AE) */}
          <div className="bg-[#F0C5AE] text-[#000000] px-3.5 py-3 flex justify-between items-center rounded-xs">
            <span className="text-xs font-bold uppercase tracking-wider">
              TOTAL · الإجمالي المستحق
            </span>
            <span className="text-base font-black font-mono">
              {formatCurrency(invoice.totalAmount)} ر.س
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
          {invoice.paymentDetails || (
            <>
              مصرف الراجحي (Al Rajhi Bank) · الحساب: مؤسسة راش إكس للاتصالات وتقنية المعلومات
              <br />
              الآيبان البنكي (IBAN): <span className="font-mono font-bold" dir="ltr">SA44 8000 0205 6080 1001 2345</span>
            </>
          )}
        </div>
        {invoice.notes && (
          <div className="text-[11px] text-[#5E6665] mt-2 italic">
            * {invoice.notes}
          </div>
        )}
      </div>

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
          <div className="border border-dashed border-[#CCD4D3] rounded-lg p-3 bg-white text-center">
            <div className="text-[10px] font-bold text-[#5E6665] uppercase mb-1">
              الطرف الأول (منصة راش إكس RASHX)
            </div>
            <div className="text-xs font-bold text-[#000000]">إدارة الاشتراكات والتعاقدات</div>
            <div className="h-14 flex items-center justify-center my-1">
              <span className="text-[11px] font-bold text-[#29545c] border-b border-[#29545c] px-4 py-1">
                معتمد رسمياً · RASHX HQ
              </span>
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
              {invoice.customerName || invoice.facilityName || 'المفوض بالتوقيع'}
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

      {/* ───────────────── Footer (#91B8C0 line + thank you) ───────────────── */}
      <div className="mt-6">
        <div className="w-full h-[2px] bg-[#91B8C0] mb-3" />
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
