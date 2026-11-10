'use client';

import React, { useState } from 'react';
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  UserCheck,
  Sparkles,
  ShieldCheck,
  Check,
  Calendar,
  Clock,
  CreditCard,
  TrendingUp,
  Scissors,
  Star,
  Award,
  Wallet,
  Lock,
  ArrowUpRight,
  Users,
  Receipt,
  CheckCircle2,
  Timer,
} from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface FourPillarsSubdomainProps {
  locale?: Locale;
}

export const FourPillarsSubdomain: React.FC<FourPillarsSubdomainProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const [salonSlug, setSalonSlug] = useState('velvet-spa');

  const sampleSlugs = [
    { labelAr: 'فيلفيت سبا', labelEn: 'Velvet Spa', slug: 'velvet-spa' },
    { labelAr: 'لافندر بيوتي', labelEn: 'Lavender Beauty', slug: 'lavender' },
    { labelAr: 'إيليت باربر', labelEn: 'Elite Barber', slug: 'elite-cut' },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F4F6F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. Header & Interactive Subdomain Simulator */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-ink text-xs font-bold">
              <Sparkles className="w-4 h-4 text-dusty-blue" />
              <span>
                {isAr ? 'السيادة الرقمية لمنشأتك — 4 أنظمة في نطاق واحد' : 'Digital Sovereignty — 4 Portals, 1 Subdomain'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
              {isAr
                ? 'بيئة سحابية مستقلة مصممة لكل فرد في صالونك'
                : 'An Independent Cloud Ecosystem Tailored for Every Role'}
            </h2>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              {isAr
                ? 'بدلاً من إدراج صالونك في تطبيقات مزدحمة بالمنافسين، يمنحك راش إكس نطاقًا خاصًا يربط 4 شاشات متخصصة تعمل بتناغم لحظي.'
                : 'Instead of listing in crowded directories, RashX powers your salon with a dedicated subdomain connecting 4 specialized live interfaces.'}
            </p>
          </div>

          {/* Interactive Subdomain Switcher */}
          <div className="bg-white p-4 rounded-2xl space-y-3 min-w-[320px] sm:min-w-[380px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-ink-muted">
                {isAr ? 'جرّب تغيير اسم النطاق الحي:' : 'Test Live Subdomain Routing:'}
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAr ? 'عزل بيانات تام' : 'Isolated Tenant'}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#F4F6F9] px-3.5 py-2.5 rounded-xl" dir="ltr">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-xs sm:text-sm font-mono text-ink-muted truncate">
                https://<span className="text-ink font-extrabold bg-dusty-blue/20 px-1.5 py-0.5 rounded">{salonSlug}</span>.rashx.org
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {sampleSlugs.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => setSalonSlug(item.slug)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-colors ${
                    salonSlug === item.slug
                      ? 'bg-ink text-white'
                      : 'bg-[#F4F6F9] text-ink-muted hover:text-ink'
                  }`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Custom Specialized Screens Showcase */}
        <div className="space-y-8">
          
          {/* =========================================================
              SCREEN 1: PUBLIC FACILITY WEBSITE (FULL-WIDTHSHOWCASE)
          ========================================================== */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F6F9] text-ink text-xs font-bold">
                <Globe className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'الواجهة الأولى: التسويق والجمهور' : 'Portal 01: Public Marketing'}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-ink">
                  {isAr ? 'موقع المنشأة الإلكتروني الفاخر' : 'Branded Facility Website'}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {isAr
                    ? 'واجهة بهوية صالونك تستعرض قائمة الخدمات، الأسعار، صور التسريحات، وتقييمات العميلات مع تحويل الزوار مباشرة إلى حجوزات مؤكدة.'
                    : 'A luxury portal tailored to your brand identity, showcasing service menus, lookbooks, and staff profiles with direct booking conversion.'}
                </p>
              </div>

              {/* URL Route Pill */}
              <div className="inline-flex items-center gap-2 bg-[#F4F6F9] px-4 py-2 rounded-xl font-mono text-xs text-ink" dir="ltr">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{salonSlug}.rashx.org</span>
              </div>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  isAr ? 'كتالوج خدمات وأسعار تفاعلي' : 'Interactive service & price menu',
                  isAr ? 'معرض أعمال وصور قبل/بعد' : 'Before/After portfolio gallery',
                  isAr ? 'ملفات تعريف الأخصائيات' : 'Specialist bio & rating cards',
                  isAr ? 'متوافق مع محركات البحث SEO' : 'Local SEO & Google Maps ready',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-ink">
                    <div className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Mock UI: Browser Showcase */}
            <div className="lg:col-span-7 bg-[#F4F6F9] rounded-2xl p-4 sm:p-6 space-y-4">
              {/* Browser Header */}
              <div className="bg-white rounded-xl px-4 py-2.5 flex items-center justify-between gap-4" dir="ltr">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="bg-[#F4F6F9] px-4 py-1 rounded-lg text-[11px] font-mono text-ink-muted flex-1 text-center truncate">
                  https://<strong className="text-ink">{salonSlug}</strong>.rashx.org
                </div>
                <div className="text-[11px] font-bold text-dusty-blue">SSL</div>
              </div>

              {/* Website Mock Content */}
              <div className="bg-white rounded-xl p-5 space-y-5">
                {/* Mock Navbar & Hero */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-ink text-white flex items-center justify-center font-bold text-xs uppercase">
                      {salonSlug.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-ink uppercase tracking-wide">{salonSlug.replace('-', ' ')}</div>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.9</span>
                        <span className="text-ink-muted font-normal">({isAr ? '٣٢٠ تقييم' : '320 reviews'})</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3.5 py-2 rounded-xl bg-ink text-white text-xs font-bold">
                    {isAr ? 'احجزي موعدك الآن' : 'Book Appointment'}
                  </span>
                </div>

                {/* Service Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[
                    { ar: 'جميع الخدمات', en: 'All Services', active: true },
                    { ar: 'علاجات الشعر', en: 'Hair Care', active: false },
                    { ar: 'العناية بالبشرة', en: 'Skincare & Spa', active: false },
                    { ar: 'المكياج والأظافر', en: 'Makeup & Nails', active: false },
                  ].map((tab, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ${
                        tab.active ? 'bg-dusty-blue/20 text-ink' : 'bg-[#F4F6F9] text-ink-muted'
                      }`}
                    >
                      {isAr ? tab.ar : tab.en}
                    </span>
                  ))}
                </div>

                {/* Mock Service Catalog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      nameAr: 'بروتين ومعالجة كافيار للشعر',
                      nameEn: 'Caviar Keratin Hair Therapy',
                      timeAr: '٩٠ دقيقة',
                      timeEn: '90 mins',
                      price: '450 SAR',
                    },
                    {
                      nameAr: 'تنظيف بشرة عميق هيدرافيشل',
                      nameEn: 'HydraFacial Deep Glow',
                      timeAr: '٦٠ دقيقة',
                      timeEn: '60 mins',
                      price: '320 SAR',
                    },
                  ].map((srv, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#F4F6F9] flex flex-col justify-between gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-ink">{isAr ? srv.nameAr : srv.nameEn}</span>
                        <Scissors className="w-4 h-4 text-dusty-blue shrink-0" />
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-ink-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {isAr ? srv.timeAr : srv.timeEn}
                        </span>
                        <span className="text-xs font-extrabold text-ink bg-white px-2.5 py-1 rounded-lg" dir="ltr">
                          {srv.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              SCREEN 2: ADMIN DASHBOARD & POS (COMMAND CENTER)
          ========================================================== */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Custom Mock UI: Dark/High-Contrast POS & Financial Command (Left on Desktop) */}
            <div className="lg:col-span-7 order-2 lg:order-1 bg-[#12161F] text-white rounded-2xl p-5 sm:p-6 space-y-5">
              {/* Top Command Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1C222F] px-4 py-3 rounded-xl">
                <div className="flex items-center gap-2" dir="ltr">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-300">
                    {salonSlug}.rashx.org<strong className="text-white">/admin</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                    {isAr ? 'الفوترة الإلكترونية ZATCA متصلة' : 'ZATCA Phase 2 Active'}
                  </span>
                </div>
              </div>

              {/* Live KPI Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#1C222F] p-3.5 rounded-xl space-y-1">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{isAr ? 'مبيعات اليوم' : "Today's Revenue"}</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-white" dir="ltr">14,850 SAR</div>
                  <div className="text-[10px] text-emerald-400 font-bold">+18% {isAr ? 'عن أمس' : 'vs yesterday'}</div>
                </div>

                <div className="bg-[#1C222F] p-3.5 rounded-xl space-y-1">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{isAr ? 'الحجوزات المكتملة' : 'Completed'}</span>
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-white">42 / 48</div>
                  <div className="text-[10px] text-sky-400 font-bold">{isAr ? '٦ قيد التنفيذ' : '6 in chair'}</div>
                </div>

                <div className="bg-[#1C222F] p-3.5 rounded-xl space-y-1">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{isAr ? 'عهدة الصندوق' : 'Cash Drawer'}</span>
                    <Wallet className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-white" dir="ltr">3,200 SAR</div>
                  <div className="text-[10px] text-slate-400">{isAr ? 'مطابق ١٠٠٪' : '100% Matched'}</div>
                </div>
              </div>

              {/* Fast Touch POS Checkout Bar */}
              <div className="bg-[#1C222F] p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isAr ? 'نقطة بيع سريعة — فاتورة #9042' : 'Fast POS — Invoice #9042'}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isAr ? 'صبغة شعر + سشوار • شامل الضريبة ١٥٪' : 'Hair Color + Blowdry • 15% VAT Included'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="px-3 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{isAr ? 'دفع مدى / Apple Pay' : 'Pay Mada / Apple Pay'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Info Column (Right on Desktop) */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F6F9] text-ink text-xs font-bold">
                <LayoutDashboard className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'الواجهة الثانية: القيادة والمالية' : 'Portal 02: Operations & Finance'}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-ink">
                  {isAr ? 'لوحة التحكم الإدارية ونقاط البيع' : 'Admin HQ & Fast Touch POS'}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {isAr
                    ? 'غرفة عمليات متكاملة لمالك الصالون أو المدير: شاشة كاشير سريعة اللمس، مراقبة الإيرادات اللحظية، إغلاق الصندوق اليومي، وتقارير الضريبة والفوترة المعتمدة.'
                    : 'Central command center for owners and managers: fast touch POS, real-time revenue tracking, cash drawer reconciliation, and ZATCA tax compliance.'}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#F4F6F9] px-4 py-2 rounded-xl font-mono text-xs text-ink" dir="ltr">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>{salonSlug}.rashx.org/admin</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  isAr ? 'كاشير سريع يدعم تقسيم الدفع' : 'Split-payment Fast Touch POS',
                  isAr ? 'تقارير الضريبة والأرباح الصافية' : 'Automated VAT & P&L reports',
                  isAr ? 'إدارة المخزون والمواد المستهلكة' : 'Backbar & retail stock control',
                  isAr ? 'صلاحيات دقيقة لكل موظف' : 'Role-based security permissions',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-ink">
                    <div className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================
              BOTTOM SPLIT: CLIENT MOBILE PWA + STAFF SPECIALIST PORTAL
          ========================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* SCREEN 3: CLIENT BOOKING PWA */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F6F9] text-ink text-xs font-bold">
                    <Smartphone className="w-4 h-4 text-dusty-blue" />
                    <span>{isAr ? 'الواجهة الثالثة: جوال العميلة' : 'Portal 03: Client Mobile PWA'}</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#F4F6F9] font-mono text-xs text-ink" dir="ltr">
                    /book
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
                    {isAr ? 'تطبيق وواجهة العميل السريعة (PWA)' : 'Instant Client Booking App (PWA)'}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
                    {isAr
                      ? 'يفتح فورًا على جوال العميلة بدون تعقيد التحميل من المتاجر؛ لاختيار الأخصائية، دفع العربون، ومتابعة نقاط الولاء.'
                      : 'Opens instantly on any smartphone without app store downloads—handling specialist choice, deposits, and loyalty points.'}
                  </p>
                </div>
              </div>

              {/* Custom Mock UI: Mobile Phone Viewport */}
              <div className="bg-[#F4F6F9] rounded-2xl p-5">
                <div className="max-w-xs mx-auto bg-white rounded-2xl p-4 space-y-4">
                  {/* Phone Status & App Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-ink-muted">{isAr ? 'أهلاً بكِ، سارة' : 'Welcome, Sarah'}</div>
                      <div className="text-xs font-extrabold text-ink">{isAr ? 'احجزي جلستك القادمة' : 'Book Next Session'}</div>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-extrabold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>450 {isAr ? 'نقطة' : 'pts'}</span>
                    </div>
                  </div>

                  {/* Specialist Selector */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-ink-muted">
                      {isAr ? '١. اختاري الأخصائية المفضلة:' : '1. Choose Specialist:'}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { nameAr: 'نورة (خبيرة)', nameEn: 'Noura', active: true },
                        { nameAr: 'ريم (شعر)', nameEn: 'Reem', active: false },
                        { nameAr: ' دانة (بشرة)', nameEn: 'Dana', active: false },
                      ].map((sp, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded-xl text-center text-[11px] font-bold ${
                            sp.active ? 'bg-ink text-white' : 'bg-[#F4F6F9] text-ink'
                          }`}
                        >
                          {isAr ? sp.nameAr : sp.nameEn}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Slot Pills */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-ink-muted">
                      {isAr ? '٢. الأوقات المتاحة اليوم:' : '2. Available Today:'}
                    </div>
                    <div className="grid grid-cols-3 gap-2" dir="ltr">
                      {['04:30 PM', '06:00 PM', '07:30 PM'].map((time, idx) => (
                        <div
                          key={idx}
                          className={`py-1.5 rounded-lg text-center text-[11px] font-mono font-bold ${
                            idx === 1 ? 'bg-dusty-blue/25 text-ink' : 'bg-[#F4F6F9] text-ink-muted'
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apple Pay Deposit CTA */}
                  <div className="pt-1">
                    <div className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isAr ? 'تأكيد الحجز السريع • Apple Pay' : 'Instant Confirm • Apple Pay'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Features */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {(isAr
                  ? ['حجز ذاتي 24/7', 'دفع عربون فوري', 'محفظة ولاء رقمية']
                  : ['24/7 Self-Booking', 'Upfront Deposits', 'Loyalty Wallet']
                ).map((feat, idx) => (
                  <div key={idx} className="bg-[#F4F6F9] px-3 py-2 rounded-xl text-center text-[11px] font-bold text-ink">
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* SCREEN 4: SERVICE PROVIDER & STYLIST INTERFACE */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F4F6F9] text-ink text-xs font-bold">
                    <UserCheck className="w-4 h-4 text-dusty-blue" />
                    <span>{isAr ? 'الواجهة الرابعة: شاشة الأخصائية' : 'Portal 04: Specialist Workspace'}</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#F4F6F9] font-mono text-xs text-ink" dir="ltr">
                    /staff
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
                    {isAr ? 'بوابة مقدم الخدمة ومصففي الشعر' : 'Stylist & Service Provider Portal'}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-relaxed">
                    {isAr
                      ? 'شاشة خاصة لكل موظفة لمتابعة جدول مواعيدها اللحظي، تسجيل استهلاك المواد، وحساب عمولاتها بدقة وشفافية تمنع أي خلاف.'
                      : 'A dedicated workspace for stylists to manage their daily queue, log backbar product usage, and track real-time commissions.'}
                  </p>
                </div>
              </div>

              {/* Custom Mock UI: Stylist Queue & Commission Workspace */}
              <div className="bg-[#F4F6F9] rounded-2xl p-5 space-y-3">
                {/* Staff Header & Live Commission */}
                <div className="bg-white rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-dusty-blue/20 text-ink flex items-center justify-center font-extrabold text-xs">
                      {isAr ? 'ن' : 'N'}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-ink">
                        {isAr ? 'الأخصائية: نورة العتيبي' : 'Stylist: Noura Al-Otaibi'}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-bold">
                        {isAr ? 'متاحة في الصالون • الكرسي رقم ٢' : 'On Shift • Station #2'}
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-[10px] text-ink-muted">{isAr ? 'عمولة اليوم المكتسبة' : "Today's Commission"}</div>
                    <div className="text-sm font-extrabold text-emerald-600" dir="ltr">+ 420 SAR</div>
                  </div>
                </div>

                {/* Live Queue Timeline */}
                <div className="space-y-2">
                  {/* Active Session */}
                  <div className="bg-white rounded-xl p-3.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Timer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink">
                          {isAr ? 'العنود محمد — معالجة كافيار' : 'Al-Anoud — Caviar Hair Therapy'}
                        </div>
                        <div className="text-[11px] text-ink-muted">
                          {isAr ? 'بدأت 05:00 م • خصم 50 مل سيروم' : 'Started 5:00 PM • 50ml Serum logged'}
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold shrink-0">
                      {isAr ? 'جاري التنفيذ' : 'In Progress'}
                    </span>
                  </div>

                  {/* Next Session */}
                  <div className="bg-white/70 rounded-xl p-3.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F4F6F9] text-ink-muted flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink">
                          {isAr ? 'مها الفيصل — صبغة جذور وسشوار' : 'Maha — Root Color & Blowdry'}
                        </div>
                        <div className="text-[11px] text-ink-muted">
                          {isAr ? 'الموعد القادم 06:30 م • عربون مدفوع' : 'Next 6:30 PM • Deposit Paid'}
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F4F6F9] text-ink-muted text-[11px] font-bold shrink-0">
                      {isAr ? 'بالانتظار' : 'Up Next'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Features */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {(isAr
                  ? ['جدول مواعيد لحظي', 'خصم مواد الجلسة', 'شفافية العمولات']
                  : ['Live Daily Queue', 'Backbar Usage Log', 'Commission Audit']
                ).map((feat, idx) => (
                  <div key={idx} className="bg-[#F4F6F9] px-3 py-2 rounded-xl text-center text-[11px] font-bold text-ink">
                    {feat}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FourPillarsSubdomain;