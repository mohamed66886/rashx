'use client';

import React from 'react';
import {
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  Globe,
  PhoneCall,
  Lock,
  ArrowUpLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/* =========================================================================
   TYPES & INTERFACES
   ========================================================================= */

export interface HeroProps {
  locale?: Locale;
}

/* =========================================================================
   FONT WEIGHT SCALE (موحّد مع الهيدر والفوتر)
   - font-normal   (400): الوصف والنصوص الفرعية
   - font-medium   (500): الشارات، الروابط، الكبسولات
   - font-semibold (600): العناوين الرئيسية، أزرار الـ CTA، الأرقام
   ========================================================================= */

export const Hero: React.FC<HeroProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  const whatsappHref = `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`;

  return (
    <section
      dir={dir}
      className="w-full bg-[#F5F7F7] py-6 text-black sm:py-10 lg:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* =============================================================
              1. RIGHT/START COLUMN: CONTENT & ACTIONS (6 Cols on Desktop)
             ============================================================= */}
          <div className="space-y-5 text-start md:text-center lg:col-span-6 lg:space-y-6 lg:text-start">
            {/* Soft Brand Badge */}
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-medium text-black">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F0C5AE] text-black">
                <Sparkles className="h-3 w-3" />
              </span>
              <span>
                {isAr
                  ? 'المنظومة الرقمية الأحدث لإدارة مراكز التجميل 2026'
                  : 'Next-Gen Beauty & Salon Management Platform 2026'}
              </span>
            </div>

            {/* Clean H1 with Soft Highlight Surface */}
            <h1 className="text-2xl font-semibold leading-[1.35] tracking-tight text-black sm:text-4xl lg:text-[40px] xl:text-[44px]">
              {isAr ? (
                <>
                  نظام إدارة ذكي{' '}
                  <span className="inline-block rounded-xl bg-[#91B8C0]/35 px-3 py-0.5 text-black">
                    لصالونك أو مركز التجميل
                  </span>{' '}
                  أو السبا
                </>
              ) : (
                <>
                  Smart Management System{' '}
                  <span className="inline-block rounded-xl bg-[#91B8C0]/35 px-3 py-0.5 text-black">
                    for Your Salon, Beauty Center
                  </span>{' '}
                  or Spa
                </>
              )}
            </h1>

            {/* Concise 2-Line Description */}
            <p className="mx-auto max-w-xl text-xs font-normal leading-relaxed text-[#5E6665] sm:text-sm lg:mx-0 lg:text-[15px]">
              {isAr
                ? 'منظومة سحابية متكاملة تمنح منشأتك موقعاً إلكترونياً ولوحة تحكم وتطبيقاً لحجز العميل بنطاق فرعي خاص، مع 10 أنظمة ذكية للمبيعات والمواعيد والعمولات.'
                : 'An all-in-one cloud ecosystem giving your salon a branded website, control panel, and client booking app on a dedicated subdomain with 10 smart systems.'}
            </p>

            {/* Light & Friendly Dual CTAs (Zero Black Backgrounds) */}
            <div className="flex flex-col items-stretch justify-start gap-3 pt-1 sm:flex-row sm:items-center md:justify-center lg:justify-start">
              <a
                href="#demo-form"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#91B8C0] px-6 py-3.5 text-xs font-semibold text-black transition-colors hover:bg-[#91B8C0]/80 sm:text-sm"
              >
                <span>{isAr ? 'احجز عرضاً تجريبياً' : 'Book a Free Demo'}</span>
                <ArrowIcon className="h-4 w-4 text-black" />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-xs font-semibold text-black transition-colors hover:bg-[#E5E9E8] sm:text-sm"
              >
                <PhoneCall className="h-4 w-4 text-black" />
                <span>{isAr ? 'تواصل واتساب' : 'Chat on WhatsApp'}</span>
              </a>
            </div>

            {/* Clean Trust Pills Row */}
            <div className="grid grid-cols-3 gap-2 pt-2 sm:gap-3">
              <div className="rounded-2xl bg-white p-3 text-start">
                <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#EFF5F7] text-black">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="text-[11px] font-semibold text-black sm:text-xs">
                  {isAr ? 'فوترة ZATCA' : 'ZATCA Ready'}
                </div>
                <div className="text-[10px] font-normal text-[#5E6665]">
                  {isAr ? 'المرحلة الثانية' : 'Phase 2 Sync'}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-3 text-start">
                <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#FDF6F2] text-black">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="text-[11px] font-semibold text-black sm:text-xs">
                  {isAr ? 'نطاق فرعي خاص' : 'Subdomain'}
                </div>
                <div className="text-[10px] font-normal text-[#5E6665]">
                  {isAr ? 'بهوية صالونك' : 'Branded App'}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-3 text-start">
                <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#F5F7F7] text-black">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="text-[11px] font-semibold text-black sm:text-xs">
                  {isAr ? 'حماية PDPL' : 'PDPL Safe'}
                </div>
                <div className="text-[10px] font-normal text-[#5E6665]">
                  {isAr ? 'أمان سحابي' : 'Data Privacy'}
                </div>
              </div>
            </div>
          </div>

          {/* =============================================================
              2. LEFT/END COLUMN: LIGHT MULTI-DEVICE VISUALS (6 Cols on Desktop)
             ============================================================= */}
          <div className="lg:col-span-6">
            {/* --- A) MOBILE LAYOUT (< md): Light & Airy Summary Card --- */}
            <div className="rounded-3xl bg-white p-4 md:hidden">
              {/* Subdomain Pill */}
              <div className="flex items-center justify-between rounded-2xl bg-[#F5F7F7] px-3.5 py-2.5">
                <div dir="ltr" className="flex items-center gap-1.5 font-mono text-xs">
                  <Globe className="h-3.5 w-3.5 text-black" />
                  <span className="font-semibold text-black">your-salon</span>
                  <span className="text-[#5E6665]">.rashx.org</span>
                </div>
                <span className="rounded-lg bg-[#91B8C0]/30 px-2 py-0.5 text-[10px] font-semibold text-black">
                  {isAr ? 'متصل' : 'Live'}
                </span>
              </div>

              {/* 2 Soft Pastel Cards */}
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <div className="rounded-2xl bg-[#EFF5F7] p-3.5 text-start">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#5E6665]">
                      {isAr ? 'مواعيد اليوم' : 'Bookings'}
                    </span>
                    <CalendarCheck className="h-4 w-4 text-black" />
                  </div>
                  <div className="mt-1 text-lg font-semibold text-black">
                    24 {isAr ? 'موعد' : 'Appts'}
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium text-black">
                    {isAr ? 'مؤكدة عبر واتساب' : 'WhatsApp Synced'}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FDF6F2] p-3.5 text-start">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#5E6665]">
                      {isAr ? 'إشغال الكراسي' : 'Suites'}
                    </span>
                    <Clock className="h-4 w-4 text-black" />
                  </div>
                  <div className="mt-1 text-lg font-semibold text-black">8 / 10</div>
                  <div className="mt-0.5 text-[10px] font-medium text-black">
                    {isAr ? 'عمولات محسوبة آلياً' : 'Auto Commissions'}
                  </div>
                </div>
              </div>
            </div>

            {/* --- B) TABLET LAYOUT (md to lg): Dual Pastel Workspace Cards --- */}
            <div className="hidden grid-cols-2 gap-4 md:grid lg:hidden">
              {/* Blue Pastel Card */}
              <div className="flex flex-col justify-between rounded-3xl bg-[#EFF5F7] p-5 text-start">
                <div className="flex items-center justify-between">
                  <span className="rounded-xl bg-white px-3 py-1 text-xs font-semibold text-black">
                    {isAr ? 'إدارة المواعيد والاستقبال' : 'Bookings & Queue'}
                  </span>
                  <CalendarCheck className="h-5 w-5 text-black" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-3.5">
                    <div className="text-[11px] text-[#5E6665]">
                      {isAr ? 'حجوزات اليوم' : "Today's Appts"}
                    </div>
                    <div className="mt-1 text-xl font-semibold text-black">24</div>
                  </div>
                  <div className="rounded-2xl bg-[#91B8C0] p-3.5 text-black">
                    <div className="text-[11px] font-medium">
                      {isAr ? 'نسبة الإشغال' : 'Occupancy'}
                    </div>
                    <div className="mt-1 text-xl font-semibold">80%</div>
                  </div>
                </div>
              </div>

              {/* Peach Pastel Card */}
              <div className="flex flex-col justify-between rounded-3xl bg-[#FDF6F2] p-5 text-start">
                <div className="flex items-center justify-between">
                  <span className="rounded-xl bg-white px-3 py-1 text-xs font-semibold text-black">
                    {isAr ? 'الكاشير والعمولات' : 'POS & Commissions'}
                  </span>
                  <TrendingUp className="h-5 w-5 text-black" />
                </div>

                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-xs">
                    <span className="font-medium text-[#5E6665]">
                      {isAr ? 'عمولات الأخصائيات' : 'Staff Commissions'}
                    </span>
                    <span className="font-semibold text-black">
                      {isAr ? 'حساب آلي فوري' : 'Auto-Calculated'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-xs">
                    <span className="font-medium text-[#5E6665]">
                      {isAr ? 'خصم مخزون المواد' : 'Material Stock'}
                    </span>
                    <span className="font-semibold text-black">
                      {isAr ? 'مربوط بالفاتورة' : 'Auto-Deducted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- C) DESKTOP LAYOUT (lg and up): Pure Light Browser Workspace --- */}
            <div className="hidden rounded-3xl bg-white p-6 lg:block">
              {/* Top Light Address Bar */}
              <div className="flex items-center justify-between rounded-2xl bg-[#F5F7F7] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F0C5AE]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#91B8C0]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E5E9E8]" />
                </div>

                <div
                  dir="ltr"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-1 font-mono text-xs"
                >
                  <Globe className="h-3.5 w-3.5 text-[#91B8C0]" />
                  <span className="font-semibold text-black">your-salon</span>
                  <span className="text-[#5E6665]">.rashx.org</span>
                </div>

                <span className="rounded-lg bg-[#91B8C0]/25 px-2.5 py-1 text-[11px] font-semibold text-black">
                  {isAr ? 'نشط 24/7' : 'Active 24/7'}
                </span>
              </div>

              {/* Main Metrics Grid (Soft Brand Surfaces Only) */}
              <div className="mt-4 grid grid-cols-3 gap-3.5">
                <div className="rounded-2xl bg-[#EFF5F7] p-4 text-start">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#5E6665]">
                      {isAr ? 'مواعيد اليوم' : 'Bookings'}
                    </span>
                    <CalendarCheck className="h-4 w-4 text-black" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-black">24</div>
                  <div className="mt-1 text-[11px] font-medium text-black">
                    {isAr ? 'تأكيد آلي عبر واتساب' : 'Confirmed via WhatsApp'}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FDF6F2] p-4 text-start">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#5E6665]">
                      {isAr ? 'كراسي الخدمة' : 'Active Suites'}
                    </span>
                    <Clock className="h-4 w-4 text-black" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-black">8 / 10</div>
                  <div className="mt-1 text-[11px] font-medium text-black">
                    {isAr ? '80% نسبة الإشغال' : '80% Occupancy'}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#F5F7F7] p-4 text-start">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#5E6665]">
                      {isAr ? 'تطبيق العميل' : 'Client PWA'}
                    </span>
                    <Smartphone className="h-4 w-4 text-black" />
                  </div>
                  <div className="mt-2 text-xl font-semibold text-black">
                    {isAr ? 'حجز ذاتي' : 'Self-Book'}
                  </div>
                  <div className="mt-1 text-[11px] font-medium text-[#5E6665]">
                    {isAr ? 'ودفع إلكتروني مسبق' : 'Online Prepayment'}
                  </div>
                </div>
              </div>

              {/* Live Salon Queue & Automated Workflow Cards */}
              <div className="mt-4 grid grid-cols-2 gap-3.5">
                <div className="rounded-2xl bg-[#F5F7F7] p-4 text-start">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-black">
                      {isAr ? 'الاستقبال المباشر الآن' : 'Live Reception Queue'}
                    </span>
                    <span className="rounded-md bg-[#91B8C0]/30 px-2 py-0.5 text-[10px] font-semibold text-black">
                      {isAr ? 'مباشر' : 'Live'}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                      <span className="font-medium text-black">
                        {isAr ? 'سارة م. (تصفيف وصبغة)' : 'Sarah M. (Hair Styling)'}
                      </span>
                      <span className="rounded bg-[#EFF5F7] px-2 py-0.5 text-[10px] font-semibold text-black">
                        {isAr ? 'كرسي 1' : 'Chair 1'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                      <span className="font-medium text-black">
                        {isAr ? 'نورة ع. (عناية وسبا)' : 'Noura A. (Nail & Spa)'}
                      </span>
                      <span className="rounded bg-[#FDF6F2] px-2 py-0.5 text-[10px] font-semibold text-black">
                        {isAr ? 'جناح 2' : 'Suite 2'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-2xl bg-[#91B8C0]/25 p-4 text-start">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-black">
                      {isAr ? 'العمولات والمخزون الآلي' : 'Auto Commissions & Stock'}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-black" />
                  </div>

                  <div className="my-2 space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                      <span className="text-[#5E6665]">
                        {isAr ? 'عمولات الأخصائيات' : 'Staff Commission'}
                      </span>
                      <span className="font-semibold text-black">
                        {isAr ? 'تُضاف فور الإغلاق' : 'Instant Sync'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                      <span className="text-[#5E6665]">
                        {isAr ? 'مواد الصبغات والعناية' : 'Backbar Materials'}
                      </span>
                      <span className="font-semibold text-black">
                        {isAr ? 'خصم آلي من المخزن' : 'Auto-Deducted'}
                      </span>
                    </div>
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

export default Hero;