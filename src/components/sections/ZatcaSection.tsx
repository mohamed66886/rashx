'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  QrCode,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Layers,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface ZatcaSectionProps {
  locale?: Locale;
}

export const ZatcaSection: React.FC<ZatcaSectionProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const points = [
    {
      titleAr: 'فواتير ضريبية مبسطة بـ QR Code متوافق',
      titleEn: 'Compliant Simplified Invoices with Cryptographic QR',
      descAr: 'طباعة فورية أو إرسال رقمي عبر الواتساب متضمنًا كافة الحقول الإلزامية ورمز الاستجابة السريع.',
      descEn: 'Instant receipt printing or WhatsApp dispatch containing all mandatory tax fields and cryptographic QR.',
    },
    {
      titleAr: 'جاهزية الربط والتكامل (المرحلة الثانية)',
      titleEn: 'Integration Phase 2 Readiness',
      descAr: 'هيكلة برمجية عبر واجهات API مهيأة للتكامل المباشر وفق حالة المنشأة ومتطلبات الربط والتفعيل.',
      descEn: 'API architecture prepared for direct integration based on facility onboarding criteria and timelines.',
    },
    {
      titleAr: 'إقرارات ضريبة القيمة المضافة (15%) بضغطة زر',
      titleEn: 'One-Click 15% VAT Tax Filing Reports',
      descAr: 'تصدير تقرير المبيعات والمشتريات الضريبية مفصلاً وجاهزًا لتقديمه لهيئة الزكاة والضريبة والجمارك.',
      descEn: 'Export comprehensive sales and purchase VAT summaries formatted directly for ZATCA declaration portals.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-mist-gray" id="zatca">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#FAFBFB] via-white to-mist-gray/30 border border-mist-gray p-8 sm:p-12 lg:p-16 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dusty-blue/20 text-ink text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'الامتثال للفوترة الإلكترونية السعودية' : 'Saudi E-Invoicing Compliance'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight leading-tight">
                {isAr
                  ? 'دعم متطلبات الفوترة الإلكترونية (المرحلة الثانية) لصالونك'
                  : 'ZATCA Phase 2 E-Invoicing Support for Your Salon'}
              </h2>

              {/* Exact compliant wording required by the prompt */}
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-medium">
                {isAr ? SITE_CONFIG.zatca.noticeAr : SITE_CONFIG.zatca.noticeEn}
              </p>

              <div className="space-y-4 pt-2">
                {points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-ink">
                        {isAr ? pt.titleAr : pt.titleEn}
                      </h4>
                      <p className="text-xs text-ink-muted leading-relaxed">
                        {isAr ? pt.descAr : pt.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Link Button to dedicated page/section */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/zatca`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-sm transition-all"
                >
                  <span>{isAr ? 'تفاصيل متطلبات الفوترة الإلكترونية' : 'E-Invoicing Requirements Details'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isAr ? 'تشفير وحماية كاملة للفواتير' : 'Encrypted & Cryptographically Sealed'}</span>
                </div>
              </div>
            </div>

            {/* Right/Visual Column: Tax Invoice Mockup (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-6 bg-white border border-mist-gray shadow-xl space-y-4 max-w-sm mx-auto">
                {/* Invoice Mock Header */}
                <div className="text-center border-b border-mist-gray pb-4 space-y-1">
                  <div className="text-[11px] font-bold text-ink uppercase tracking-wider">
                    {isAr ? 'فاتورة ضريبية مبسطة' : 'Simplified Tax Invoice'}
                  </div>
                  <div className="text-xs font-mono font-bold text-ink">
                    {isAr ? 'صالون راش إكس للتجميل' : 'RashX Beauty Salon'}
                  </div>
                  <div className="text-[10px] text-ink-muted">
                    {isAr ? 'الرقم الضريبي: 3000XXXXXXXX003' : 'VAT No: 3000XXXXXXXX003'}
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-ink-muted text-[11px]">
                    <span>{isAr ? 'الخدمة / الباقة' : 'Service Item'}</span>
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
                  <div className="pt-2 border-t border-mist-gray/60 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>{isAr ? 'المجموع غير شامل الضريبة' : 'Subtotal Excl. VAT'}</span>
                      <span>350.00</span>
                    </div>
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>{isAr ? 'ضريبة القيمة المضافة (15%)' : 'VAT (15%)'}</span>
                      <span>52.50</span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-ink text-sm pt-1 border-t border-mist-gray">
                      <span>{isAr ? 'الإجمالي النهائي' : 'Total Amount'}</span>
                      <span>402.50 ر.س</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Graphic Mockup */}
                <div className="p-4 rounded-2xl bg-[#FAFBFB] border border-mist-gray flex flex-col items-center justify-center space-y-2">
                  <QrCode className="w-20 h-20 text-ink" />
                  <div className="text-[10px] text-ink-muted text-center leading-tight">
                    {isAr
                      ? 'رمز QR مشفر وفق متطلبات هيئة الزكاة والضريبة والجمارك'
                      : 'Cryptographic QR Code complying with ZATCA criteria'}
                  </div>
                </div>

                <div className="text-center text-[10px] text-emerald-700 font-semibold bg-emerald-50 py-1.5 rounded-lg border border-emerald-100">
                  {isAr ? '✓ جاهزية متكاملة لبيئة الاختبار والتشغيل' : '✓ Full Testing & Sandbox Readiness'}
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

