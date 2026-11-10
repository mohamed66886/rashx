'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, QrCode, Check, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX ZATCA section — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 */

interface ZatcaSectionProps {
  locale?: Locale;
}

export const ZatcaSection: React.FC<ZatcaSectionProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const points = [
    {
      titleAr: 'فواتير ضريبية مبسطة بـ QR Code متوافق',
      titleEn: 'Compliant simplified invoices with QR',
      descAr: 'طباعة فورية أو إرسال عبر الواتساب متضمنًا كافة الحقول الإلزامية ورمز الاستجابة السريع.',
      descEn: 'Print instantly or send via WhatsApp with all mandatory tax fields and QR code.',
    },
    {
      titleAr: 'جاهزية الربط والتكامل (المرحلة الثانية)',
      titleEn: 'Phase 2 integration readiness',
      descAr: 'واجهات API مهيأة للتكامل المباشر وفق حالة المنشأة ومتطلبات الربط والتفعيل.',
      descEn: 'API architecture prepared for direct integration based on onboarding criteria and timelines.',
    },
    {
      titleAr: 'تقارير ضريبة القيمة المضافة (15%) بضغطة زر',
      titleEn: 'One-click 15% VAT reports',
      descAr: 'تصدير تقرير المبيعات والمشتريات الضريبية مفصلاً وجاهزًا لتقديمه لهيئة الزكاة والضريبة والجمارك.',
      descEn: 'Export detailed sales and purchase VAT summaries ready for ZATCA declarations.',
    },
  ];

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      id="zatca"
      className="border-t border-mist-gray bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-dusty-blue/15 p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Content */}
            <div className="space-y-6 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink">
                <ShieldCheck className="h-4 w-4 text-dusty-blue" aria-hidden="true" />
                <span>{isAr ? 'الامتثال للفوترة الإلكترونية السعودية' : 'Saudi E-Invoicing Compliance'}</span>
              </div>

              <h2 className="text-balance text-2xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl">
                {isAr
                  ? 'دعم متطلبات الفوترة الإلكترونية (المرحلة الثانية) لصالونك'
                  : 'ZATCA Phase 2 E-Invoicing Support for Your Salon'}
              </h2>

              {/* Compliance notice — wording comes from SITE_CONFIG */}
              <p className="text-sm font-medium leading-relaxed text-ink-muted sm:text-base">
                {isAr ? SITE_CONFIG.zatca.noticeAr : SITE_CONFIG.zatca.noticeEn}
              </p>

              <ul className="space-y-4 pt-2">
                {points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-dusty-blue text-ink">
                      <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-ink">{isAr ? pt.titleAr : pt.titleEn}</h3>
                      <p className="text-xs leading-relaxed text-ink-muted sm:text-sm">
                        {isAr ? pt.descAr : pt.descEn}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/${locale}/zatca`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-warm-peach px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-warm-peach/80"
                >
                  <span>{isAr ? 'تفاصيل متطلبات الفوترة الإلكترونية' : 'E-Invoicing Requirements Details'}</span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>

                <div className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{isAr ? 'تشفير وحماية كاملة للفواتير' : 'Encrypted & sealed invoices'}</span>
                </div>
              </div>
            </div>

            {/* Invoice mockup */}
            <div className="lg:col-span-5">
              <div className="mx-auto max-w-sm space-y-4 rounded-3xl border border-mist-gray bg-white p-6">
                <div className="space-y-1 border-b border-mist-gray pb-4 text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink">
                    {isAr ? 'فاتورة ضريبية مبسطة' : 'Simplified Tax Invoice'}
                  </div>
                  <div className="text-xs font-bold text-ink">
                    {isAr ? 'صالون راش إكس للتجميل' : 'RashX Beauty Salon'}
                  </div>
                  <div className="text-[10px] text-ink-muted">
                    {isAr ? 'الرقم الضريبي: 3000XXXXXXXX003' : 'VAT No: 3000XXXXXXXX003'}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-ink-muted">
                    <span>{isAr ? 'الخدمة' : 'Service'}</span>
                    <span>{isAr ? 'السعر (ر.س)' : 'Price (SAR)'}</span>
                  </div>
                  <div className="flex items-center justify-between font-medium text-ink">
                    <span>{isAr ? 'تصفيف شعر ملكي + عناية' : 'Royal Hair Styling'}</span>
                    <span>150.00</span>
                  </div>
                  <div className="flex items-center justify-between font-medium text-ink">
                    <span>{isAr ? 'جلسة سبا ومساج مهدئ' : 'Relaxing Spa Session'}</span>
                    <span>200.00</span>
                  </div>

                  <div className="space-y-1 border-t border-mist-gray pt-2">
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>{isAr ? 'المجموع قبل الضريبة' : 'Subtotal'}</span>
                      <span>350.00</span>
                    </div>
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>{isAr ? 'ضريبة القيمة المضافة (15%)' : 'VAT (15%)'}</span>
                      <span>52.50</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between rounded-xl bg-warm-peach/30 px-3 py-2 text-sm font-extrabold text-ink">
                      <span>{isAr ? 'الإجمالي' : 'Total'}</span>
                      <span>402.50 {isAr ? 'ر.س' : 'SAR'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 rounded-2xl bg-neutral/40 p-4">
                  <QrCode className="h-20 w-20 text-ink" aria-hidden="true" />
                  <div className="text-center text-[10px] leading-tight text-ink-muted">
                    {isAr
                      ? 'رمز QR وفق متطلبات هيئة الزكاة والضريبة والجمارك'
                      : 'QR code following ZATCA requirements'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZatcaSection;