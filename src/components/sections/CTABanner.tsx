'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUpLeft,
  ArrowUpRight,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Smartphone,
  CalendarCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/* =========================================================================
   TYPES & INTERFACES
   ========================================================================= */

export type CTABannerVariant = 'default' | 'minimal' | 'action-split';

export interface CTABannerProps {
  locale?: Locale;
  variant?: CTABannerVariant;
}

/* =========================================================================
   FONT WEIGHT SCALE (موحّد في كل المنظومة)
   - font-normal   (400): الوصف والنصوص الفرعية
   - font-medium   (500): الشارات، المزايا، الكبسولات
   - font-semibold (600): العناوين الرئيسية وأزرار الـ CTA
   ========================================================================= */

export const CTABanner: React.FC<CTABannerProps> = ({
  locale = DEFAULT_LOCALE,
  variant = 'default',
}) => {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  const whatsappHref = `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`;

  return (
    <section dir={dir} className="w-full bg-white py-10 text-black sm:py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Flat Horizontal Split Card */}
        <div className="rounded-3xl bg-[#F5F7F7] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            
            {/* =============================================================
                1. LEFT/START SIDE: ACTION CONTENT (7 Cols on Desktop)
               ============================================================= */}
            <div className="space-y-5 text-start lg:col-span-7 lg:space-y-6">
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-medium text-black">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#91B8C0] text-black">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span>
                  {isAr ? 'ابدأ رحلة التحول الرقمي لمنشأتك' : 'Elevate Your Salon Today'}
                </span>
              </div>

              {/* Direct H2 Heading */}
              <h2 className="text-2xl font-semibold leading-[1.3] tracking-tight text-black sm:text-3xl lg:text-4xl">
                {isAr ? (
                  <>
                    جاهز لتطوير صالونك بنطاق فرعي خاص{' '}
                    <span className="inline-block rounded-xl bg-white px-3 py-0.5 text-black">
                      و10 أنظمة ذكية متكاملة؟
                    </span>
                  </>
                ) : (
                  <>
                    Ready to Transform Your Salon with a{' '}
                    <span className="inline-block rounded-xl bg-white px-3 py-0.5 text-black">
                      Dedicated Subdomain & 10 Systems?
                    </span>
                  </>
                )}
              </h2>

              {/* Short Value Proposition */}
              <p className="max-w-xl text-xs font-normal leading-relaxed text-[#5E6665] sm:text-sm lg:text-[15px]">
                {isAr
                  ? 'انضم إلى مئات مراكز التجميل والسبا في المملكة التي تستخدم منظومة RASHX لإدارة المواعيد، الكاشير، العمولات، وربط ZATCA المرحلة الثانية.'
                  : 'Join hundreds of beauty salons and spas in KSA using RASHX for appointments, POS, commissions, and ZATCA Phase 2 compliance.'}
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-col items-stretch justify-start gap-3 pt-1 sm:flex-row sm:items-center">
                <Link
                  href={`/${locale}/demo`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#91B8C0] px-6 py-3.5 text-xs font-semibold text-black transition-colors hover:bg-[#91B8C0]/80 sm:text-sm"
                >
                  <span>{isAr ? 'احجز عرضاً تجريبياً' : 'Book a Free Demo'}</span>
                  <ArrowIcon className="h-4 w-4 text-black" />
                </Link>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-xs font-semibold text-black transition-colors hover:bg-[#E5E9E8] sm:text-sm"
                >
                  <PhoneCall className="h-4 w-4 text-black" />
                  <span>{isAr ? 'استشر فريقنا عبر واتساب' : 'Chat via WhatsApp'}</span>
                </a>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium text-[#5E6665]">
                <div className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-black" />
                  <span>{isAr ? 'بدون بطاقة ائتمان' : 'No Credit Card'}</span>
                </div>
                <span>•</span>
                <div className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-black" />
                  <span>{isAr ? 'تفعيل فوري خلال دقائق' : 'Instant Activation'}</span>
                </div>
                <span>•</span>
                <div className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-black" />
                  <span>{isAr ? 'دعم فني بالسعودية' : 'KSA Support'}</span>
                </div>
              </div>
            </div>

            {/* =============================================================
                2. RIGHT/END SIDE: INTERACTIVE SUBDOMAIN PREVIEW CARD (5 Cols)
               ============================================================= */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white p-6 sm:p-7 text-start">
                {/* Header inside card */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-black">
                    {isAr ? 'معاينة النطاق الفرعي' : 'Subdomain Preview'}
                  </span>
                  <span className="rounded-lg bg-[#EFF5F7] px-2.5 py-1 text-[11px] font-medium text-black">
                    {isAr ? 'جاهز للعمل' : 'Ready'}
                  </span>
                </div>

                {/* Simulated Address Bar */}
                <div
                  dir="ltr"
                  className="mt-4 flex items-center justify-between rounded-2xl bg-[#F5F7F7] px-4 py-3 font-mono text-xs text-black"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#91B8C0]" />
                    <span className="font-semibold text-black">your-salon-name</span>
                    <span className="text-[#5E6665]">.rashx.org</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>

                {/* 2 Quick System Features Inside Card */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#EFF5F7] p-3.5 text-start">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#5E6665]">
                        {isAr ? 'تطبيق العملاء' : 'Client App'}
                      </span>
                      <Smartphone className="h-3.5 w-3.5 text-black" />
                    </div>
                    <div className="mt-1 text-xs font-semibold text-black">
                      {isAr ? 'حجز ذاتي مخصص' : 'Custom PWA'}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#FDF6F2] p-3.5 text-start">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#5E6665]">
                        {isAr ? 'الفوترة' : 'Invoicing'}
                      </span>
                      <ShieldCheck className="h-3.5 w-3.5 text-black" />
                    </div>
                    <div className="mt-1 text-xs font-semibold text-black">
                      {isAr ? 'ZATCA المرحلة 2' : 'ZATCA Phase 2'}
                    </div>
                  </div>
                </div>

                {/* Bottom mini status bar */}
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#F5F7F7] px-4 py-3 text-xs">
                  <div className="flex items-center gap-2 font-medium text-black">
                    <CalendarCheck className="h-4 w-4 text-black" />
                    <span>{isAr ? 'نظام المواعيد متصل' : 'Appointments Synced'}</span>
                  </div>
                  <span className="font-mono font-semibold text-black">10/10</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;