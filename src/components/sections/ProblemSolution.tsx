'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  CalendarX2,
  CalendarCheck2,
  UserX,
  UserCheck,
  FileSpreadsheet,
  FileCheck,
  MessageCircle,
  Palette,
  Gift,
  QrCode,
  Percent,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX Brand Color Distribution (Lightened, Flat & Role-Differentiated - No Gradients):
 *
 * 1. Scheduling  → Flat Light Dusty Blue (#EBF3F5)
 *    Cool, tech-forward, organized calendar with Dusty Blue & Peach appointment blocks.
 *
 * 2. CRM & Loyalty → Flat Light Warm Peach (#FAF0EA)
 *    Welcoming, salon-care, formula history and loyalty reward points.
 *
 * 3. ZATCA & Finance → Flat Light Mint / Sage (#EBF5F0)
 *    Tax compliance, simplified QR invoices, and automated stylist commissions.
 *
 * Problem sides: Flat Light soft neutral (#FAFBFB) with delicate borders and rose indicators.
 * Mockups: Pure crisp white (#FFFFFF) with refined borders and soft shadows.
 * All text maintains high WCAG AAA contrast with Ink (#000000) and Ink-Muted (#5E6665).
 */

interface ProblemSolutionProps {
  locale?: Locale;
}

/* ───────────────────────── Illustrations ───────────────────────── */

const INK = '#000000';
const BLUE = '#91B8C0';
const PEACH = '#F0C5AE';

/** Problem 1 — appointment blocks colliding */
const ClashArt = () => (
  <svg viewBox="0 0 220 96" className="h-24 w-full max-w-[260px]" aria-hidden="true">
    <rect x="8" y="12" width="105" height="28" rx="8" fill="#fff" stroke="#E2E8F0" strokeWidth="1.5" />
    <circle cx="20" cy="26" r="3" fill="#94A3B8" />
    <rect x="28" y="22" width="48" height="8" rx="3" fill="#CBD5E1" />
    <rect x="82" y="22" width="22" height="8" rx="3" fill="#E2E8F0" />

    {/* Overlapping conflicting appointment */}
    <rect x="76" y="28" width="130" height="32" rx="9" fill="#fff" stroke="#FDA4AF" strokeWidth="1.5" />
    <rect x="84" y="36" width="34" height="16" rx="4" fill="#F43F5E" />
    <text x="101" y="47" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
      تضارب!
    </text>
    <rect x="124" y="39" width="50" height="9" rx="3" fill="#FDA4AF" fillOpacity=".6" />

    {/* Ghost no-show slot */}
    <rect
      x="24"
      y="66"
      width="100"
      height="22"
      rx="7"
      fill="#fff"
      stroke="#CBD5E1"
      strokeDasharray="4 4"
    />
    <rect x="34" y="73" width="55" height="7" rx="3" fill="#E2E8F0" />

    <circle cx="196" cy="16" r="10" fill="#F43F5E" />
    <path d="M192 12l8 8M200 12l-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Problem 2 — scattered paper notes & missing formulas */
const NotesArt = () => (
  <svg viewBox="0 0 220 96" className="h-24 w-full max-w-[260px]" aria-hidden="true">
    <g transform="rotate(-7 50 48)">
      <rect x="16" y="16" width="66" height="58" rx="8" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
      <path d="M26 32h44M26 42h32M26 52h36" stroke="#D97706" strokeOpacity=".45" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <g transform="rotate(5 120 48)">
      <rect x="92" y="14" width="66" height="58" rx="8" fill="#FCE7F3" stroke="#FBCFE8" strokeWidth="1.5" />
      <path d="M102 30h42M102 40h26" stroke="#DB2777" strokeOpacity=".45" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M104 52q6-6 12 0t12 0" stroke="#DB2777" strokeOpacity=".6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
    <g transform="rotate(-3 190 60)">
      <rect x="164" y="34" width="46" height="48" rx="8" fill="#fff" stroke="#CBD5E1" strokeDasharray="3 3" />
      <text x="187" y="66" textAnchor="middle" fontSize="26" fontWeight="800" fill="#94A3B8">
        ?
      </text>
    </g>
  </svg>
);

/** Problem 3 — paper tally and manual calculator */
const TallyArt = () => (
  <svg viewBox="0 0 220 96" className="h-24 w-full max-w-[260px]" aria-hidden="true">
    <rect x="14" y="8" width="116" height="82" rx="10" fill="#fff" stroke="#E2E8F0" strokeWidth="1.5" />
    <path d="M28 26h56M28 40h78M28 54h46M28 68h68" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 38l94 -18" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="146" y="14" width="60" height="70" rx="10" fill="#1E293B" />
    <rect x="154" y="22" width="44" height="14" rx="4" fill="#334155" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <rect
          key={`${r}${c}`}
          x={154 + c * 16}
          y={44 + r * 12}
          width="12"
          height="8"
          rx="2.5"
          fill="#64748B"
        />
      )),
    )}
  </svg>
);

/** Solution 1 — clean timeline with distributed brand colors */
const TimelineArt = () => {
  return (
    <svg viewBox="0 0 310 134" className="w-full" aria-hidden="true">
      {/* Time marker line */}
      <line x1="160" y1="6" x2="160" y2="128" stroke={BLUE} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="160" cy="8" r="3.5" fill={BLUE} />

      {/* Lane 1 */}
      <rect x="0" y="14" width="310" height="32" rx="10" fill="#F4F8FA" />
      <rect x="6" y="18" width="92" height="24" rx="7" fill={BLUE} />
      <rect x="104" y="18" width="70" height="24" rx="7" fill={INK} />
      <rect x="180" y="18" width="124" height="24" rx="7" fill={PEACH} />

      {/* Lane 2 */}
      <rect x="0" y="52" width="310" height="32" rx="10" fill="#F4F8FA" />
      <rect x="20" y="56" width="115" height="24" rx="7" fill={PEACH} />
      <rect x="141" y="56" width="78" height="24" rx="7" fill={BLUE} />
      <rect x="225" y="56" width="78" height="24" rx="7" fill={INK} />

      {/* Lane 3 */}
      <rect x="0" y="90" width="310" height="32" rx="10" fill="#F4F8FA" />
      <rect x="6" y="94" width="126" height="24" rx="7" fill={BLUE} />
      <rect x="138" y="94" width="68" height="24" rx="7" fill={INK} />
      <rect x="212" y="94" width="92" height="24" rx="7" fill={PEACH} />
    </svg>
  );
};

/** Solution 3 — QR tile */
const QR_PATTERN = [
  '111111101',
  '100000101',
  '101110111',
  '101110100',
  '101110111',
  '100000101',
  '111111100',
  '000000001',
  '101101011',
];

const QrArt = () => (
  <svg viewBox="0 0 90 90" className="h-full w-full" aria-hidden="true">
    {QR_PATTERN.map((row, r) =>
      row.split('').map((v, c) =>
        v === '1' ? (
          <rect key={`${r}-${c}`} x={c * 10} y={r * 10} width="9" height="9" rx="1.5" fill={INK} />
        ) : null,
      ),
    )}
  </svg>
);

/** Solution 2 — loyalty ring with warm peach theme */
const PointsRing = () => (
  <svg viewBox="0 0 72 72" className="h-[72px] w-[72px] shrink-0" aria-hidden="true">
    <circle cx="36" cy="36" r="30" fill="none" stroke="#FDEEE6" strokeWidth="8" />
    <circle
      cx="36"
      cy="36"
      r="30"
      fill="none"
      stroke={PEACH}
      strokeWidth="8"
      strokeLinecap="round"
      strokeDasharray="188.5"
      strokeDashoffset="48"
      transform="rotate(-90 36 36)"
    />
    <circle cx="36" cy="36" r="22" fill="#FFF8F5" />
  </svg>
);

/* ───────────────────────── Small building blocks ───────────────────────── */

const Tag: React.FC<{
  children: React.ReactNode;
  tone?: 'light' | 'problem' | 'blue' | 'peach' | 'mint' | 'solid';
}> = ({ children, tone = 'light' }) => {
  const tones = {
    light: 'bg-white text-ink border border-mist-gray shadow-2xs',
    problem: 'bg-rose-50/90 text-rose-700 border border-rose-200/70',
    blue: 'bg-dusty-blue/30 text-[#0F3942] border border-dusty-blue/50 font-bold',
    peach: 'bg-warm-peach/40 text-[#7C3814] border border-warm-peach/60 font-bold',
    mint: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold',
    solid: 'bg-ink text-white',
  } as const;
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

const IconTile: React.FC<{
  icon: LucideIcon;
  className?: string;
}> = ({ icon: Icon, className = '' }) => (
  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${className}`}>
    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
  </span>
);

/* ───────────────────────── Main component ───────────────────────── */

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const t = (ar: string, en: string) => (isAr ? ar : en);

  const before = t('قبل راش إكس', 'Before RashX');
  const after = t('مع راش إكس', 'With RashX');

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className="border-t border-mist-gray bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <header className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-mist-gray/60 px-3 py-1 text-xs font-bold text-ink">
              <Sparkles className="h-3.5 w-3.5 text-dusty-blue" />
              <span>{t('قبل وبعد راش إكس', 'Before & After RashX')}</span>
            </div>
            <h2 className="text-balance text-3xl font-extrabold leading-[1.2] text-ink md:text-4xl lg:text-5xl">
              {t(
                'تحديات أصحاب الصالونات اليومية... وكيف تحلها راش إكس',
                'Daily salon struggles, and how RashX solves them',
              )}
            </h2>
          </div>
          <p className="max-w-md text-base font-normal leading-relaxed text-ink-muted lg:text-lg">
            {t(
              'صممنا راش إكس بعد دراسة عميقة لأكبر التحديات التشغيلية والمالية التي تواجه المشاغل ومراكز التجميل والسبا في المملكة.',
              'Built around the real operational and financial pain points of salons and spas across Saudi Arabia.',
            )}
          </p>
        </header>

        <div className="space-y-6 md:space-y-8">
          {/* ═════════ 1 · Scheduling — Light Dusty Blue Theme ═════════ */}
          <article className="grid overflow-hidden rounded-[32px] border border-[#91B8C0]/35 bg-white shadow-xs transition-shadow hover:shadow-md lg:grid-cols-12">
            {/* Problem side */}
            <div className="flex flex-col justify-between gap-8 bg-[#FAFBFB] p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <div className="space-y-5">
                <Tag tone="problem">{before}</Tag>
                <div className="flex items-start gap-4">
                  <IconTile icon={CalendarX2} className="border border-rose-200 bg-white text-rose-600 shadow-2xs" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-snug text-ink">
                      {t('فوضى المواعيد وتضارب الحجوزات', 'Scheduling chaos & double bookings')}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-ink-muted sm:text-base">
                      {t(
                        'تسجيل المواعيد يدويًا أو عبر شات الواتساب غير المنتظم يسبب تضارب أوقات الأخصائيات، تأخر العميلات، وازدحامًا غير مرغوب في صالة الانتظار.',
                        'Manual phone logs and scattered WhatsApp chats result in double bookings, stylist delays, and overcrowded reception lounges.',
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <ClashArt />
            </div>

            {/* Solution side: Flat Light Dusty Blue */}
            <div className="flex flex-col gap-6 border-t border-[#91B8C0]/25 bg-[#EBF3F5] p-6 sm:p-8 lg:col-span-7 lg:border-t-0 lg:border-s lg:p-10">
              <Tag tone="blue">{after}</Tag>
              <div className="flex items-start gap-4">
                <IconTile icon={CalendarCheck2} className="bg-ink text-white shadow-xs" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold leading-snug text-ink sm:text-2xl">
                    {t('جدولة ذكية 24/7 وتذكير آلي', '24/7 smart booking & auto reminders')}
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-ink/80 sm:text-base">
                    {t(
                      'محرك حجز ذاتي يفتح على مدار الساعة يمنع أي تداخل، يخصص مدة الخدمة بدقة، ويرسل رسائل تذكير تفاعلية عبر الواتساب تقلص الغياب بنسبة ملموسة.',
                      'Self-service booking engine open 24/7 with zero overlap, automated buffer times, and interactive WhatsApp confirmations reducing no-shows.',
                    )}
                  </p>
                </div>
              </div>

              {/* Timeline Art Mockup */}
              <div className="rounded-3xl border border-[#91B8C0]/30 bg-white p-4 shadow-xs sm:p-5">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-ink-muted">
                  <span className="flex items-center gap-1.5 text-ink">
                    <Clock className="h-3.5 w-3.5 text-dusty-blue" />
                    {t('جدول الأخصائيات اليومي (مباشر)', 'Live Stylist Schedule')}
                  </span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-dusty-blue" />
                      {t('شعر', 'Hair')}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-warm-peach" />
                      {t('مكياج', 'Makeup')}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-ink" />
                      {t('سبا وأظافر', 'Spa & Nails')}
                    </span>
                  </div>
                </div>
                <TimelineArt />
              </div>

              {/* Interactive WhatsApp confirmation highlight */}
              <div className="flex items-center justify-between rounded-2xl border border-emerald-500/25 bg-white px-4 py-3 shadow-2xs">
                <div className="flex items-center gap-3 text-ink">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageCircle className="h-4.5 w-4.5" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium">
                    {t('تأكيد وحجز ذاتي تلقائيًا عبر الواتساب', 'Automated WhatsApp confirmation & booking')}
                  </span>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                  {t('98% تأكيد', '98% Confirmed')}
                </span>
              </div>
            </div>
          </article>

          {/* ═════════ 2 · CRM & Loyalty — Light Warm Peach Theme (Mirrored) ═════════ */}
          <article className="grid overflow-hidden rounded-[32px] border border-[#F0C5AE]/45 bg-white shadow-xs transition-shadow hover:shadow-md lg:grid-cols-12">
            {/* Problem side */}
            <div className="flex flex-col justify-between gap-8 bg-[#FAFBFB] p-6 sm:p-8 lg:order-2 lg:col-span-5 lg:p-10">
              <div className="space-y-5">
                <Tag tone="problem">{before}</Tag>
                <div className="flex items-start gap-4">
                  <IconTile icon={UserX} className="border border-rose-200 bg-white text-rose-600 shadow-2xs" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-snug text-ink">
                      {t('ضياع بيانات العملاء وضعف تكرار الزيارة', 'Lost client data & low repeat visits')}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-ink-muted sm:text-base">
                      {t(
                        'نسيان معادلات صبغات الشعر ونوع البشرة، وعدم وجود نظام مكافآت يجعل العميلة تتجه لأي صالون منافس بعد الزيارة الأولى.',
                        'Forgotten hair dye formulas and lack of loyalty incentives leave clients wandering off to nearby competitor salons.',
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <NotesArt />
            </div>

            {/* Solution side: Flat Light Warm Peach */}
            <div className="flex flex-col gap-6 border-t border-[#F0C5AE]/30 bg-[#FAF0EA] p-6 sm:p-8 lg:order-1 lg:col-span-7 lg:border-t-0 lg:border-e lg:p-10">
              <Tag tone="peach">{after}</Tag>
              <div className="flex items-start gap-4">
                <IconTile icon={UserCheck} className="bg-ink text-white shadow-xs" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold leading-snug text-ink sm:text-2xl">
                    {t('ملف عميلة متكامل ونظام ولاء ونقاط', '360° client profile & loyalty rewards')}
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-ink/80 sm:text-base">
                    {t(
                      'سجل رقمي يحفظ تاريخ الزيارات ودرجات الصبغات وتفضيلات كل عميلة، مع نظام ولاء ونقاط استرداد وكوبونات تحفز العودة وترفع ولاء العميلات.',
                      'Comprehensive digital history with formula notes, plus automated cashback points and digital gift cards driving repeat salon visits.',
                    )}
                  </p>
                </div>
              </div>

              {/* Client profile + Loyalty reward mock */}
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="space-y-3 rounded-3xl border border-[#F0C5AE]/35 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-mist-gray/50 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-peach/40 text-sm font-bold text-[#7C3814]">
                        س.خ
                      </span>
                      <div>
                        <div className="text-sm font-bold text-ink">سارة الخالد</div>
                        <div className="text-xs text-ink-muted">عميلة VIP • 14 زيارة سابقة</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {t('ولاء مرتفع ★', 'High Loyalty ★')}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-warm-peach/50 bg-[#FDF4EF] px-3 py-1.5 text-xs font-semibold text-[#8C3A10]">
                      <Palette className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      {t('صبغة: 6.3 + 7.1 كستنائي', 'Formula: 6.3 + 7.1')}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-dusty-blue/40 bg-dusty-blue/20 px-3 py-1.5 text-xs font-medium text-[#13444D]">
                      {t('نوع الشعر: ناعم معالج', 'Hair: Fine treated')}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-mist-gray bg-[#F8FAFA] px-3 py-1.5 text-xs font-medium text-ink-muted">
                      {t('المشروب: كورتادو', 'Pref: Cortado')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-3xl border border-[#F0C5AE]/40 bg-white p-5 text-ink shadow-xs sm:flex-col sm:justify-center sm:text-center">
                  <div className="relative">
                    <PointsRing />
                    <Gift
                      className="absolute inset-0 m-auto h-6 w-6 text-[#9A4215]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-ink">{t('450 نقطة', '450 Pts')}</div>
                    <span className="text-xs font-medium text-ink-muted">{t('كوبون خصم 50 ر.س', '50 SAR Coupon')}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* ═════════ 3 · ZATCA & Commissions — Light Mint Theme ═════════ */}
          <article className="overflow-hidden rounded-[32px] border border-emerald-600/25 bg-white shadow-xs transition-shadow hover:shadow-md">
            {/* Problem horizontal strip */}
            <div className="grid items-center gap-6 border-b border-mist-gray/60 bg-[#FAFBFB] p-6 sm:p-8 md:grid-cols-[1fr_auto] lg:px-10 lg:py-8">
              <div className="space-y-4">
                <Tag tone="problem">{before}</Tag>
                <div className="flex items-start gap-4">
                  <IconTile icon={FileSpreadsheet} className="border border-rose-200 bg-white text-rose-600 shadow-2xs" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-snug text-ink">
                      {t('صعوبة الفواتير الإلكترونية وحساب العمولات', 'E-invoicing complexity & manual commissions')}
                    </h3>
                    <p className="max-w-2xl text-sm font-normal leading-relaxed text-ink-muted sm:text-base">
                      {t(
                        'القلق من اشتراطات هيئة الزكاة والضريبة والجمارك (ZATCA)، وإهدار ساعات طويلة كل ليلة في مطابقة الكاشير وحساب عمولات الموظفين يدويًا.',
                        'Stress over tax authority compliance and spending hours every evening calculating stylist commissions manually on paper.',
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <TallyArt />
            </div>

            {/* Solution container: Flat Light Mint / Sage */}
            <div className="grid items-center gap-8 bg-[#EBF5F0] p-6 text-ink sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">
              <div className="space-y-5">
                <Tag tone="mint">{after}</Tag>
                <div className="flex items-start gap-4">
                  <IconTile icon={FileCheck} className="bg-ink text-white shadow-xs" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-snug sm:text-2xl">
                      {t('دعم ZATCA المرحلة 2 وحساب عمولات فوري', 'ZATCA Phase 2 support & auto commissions')}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-ink/80 sm:text-base">
                      {t(
                        'إصدار فوري للفواتير الضريبية المبسطة بـ QR Code المتوافق مع دعم متطلبات المرحلة الثانية، واحتساب آلي دقيق لعمولة كل موظف فور إغلاق الفاتورة.',
                        'Instant compliant simplified tax invoices with QR code supporting Phase 2 criteria, and instant automated stylist commission payouts.',
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 ps-0 sm:ps-16">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-white px-3 py-1.5 text-xs font-bold text-ink shadow-2xs">
                    <QrCode className="h-3.5 w-3.5 text-emerald-700" strokeWidth={2} aria-hidden="true" />
                    {t('فاتورة بـ QR مشفر', 'Encrypted QR invoice')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-warm-peach/60 bg-warm-peach/40 px-3 py-1.5 text-xs font-bold text-[#7C3814] shadow-2xs">
                    <Percent className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    {t('عمولة فورية لكل أخصائية', 'Instant stylist commission')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-dusty-blue/50 bg-dusty-blue/30 px-3 py-1.5 text-xs font-bold text-[#103E47] shadow-2xs">
                    <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    {t('جاهزية المرحلة الثانية', 'Phase 2 Ready')}
                  </span>
                </div>
              </div>

              {/* Invoice + Commissions Mockup */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* ZATCA Simplified Tax Invoice Preview */}
                <div className="flex flex-col justify-between rounded-3xl border border-emerald-600/15 bg-white p-5 shadow-xs">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-mist-gray/60 pb-2.5">
                      <span className="text-xs font-bold text-ink">{t('فاتورة ضريبية مبسطة', 'Tax Invoice')}</span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        {t('متوافق ZATCA ✓', 'ZATCA ✓')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 shrink-0 rounded-xl border border-mist-gray/70 bg-[#FAFBFB] p-1.5">
                        <QrArt />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="text-[11px] font-bold text-ink">{t('صالون الرقي للتجميل', 'Elegance Salon')}</div>
                        <div className="text-[10px] text-ink-muted font-mono">الرقم: 302000000000003</div>
                        <div className="text-[10px] font-semibold text-emerald-700">{t('شامل ضريبة 15%', '15% VAT Included')}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 border-t border-mist-gray/60 pt-2 flex items-center justify-between text-xs font-black text-ink">
                    <span>{t('المجموع النهائي', 'Total')}</span>
                    <span className="font-mono text-sm">480.00 ر.س</span>
                  </div>
                </div>

                {/* Instant Stylist Commission Bars */}
                <div className="space-y-3.5 rounded-3xl border border-emerald-600/15 bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between border-b border-mist-gray/60 pb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-ink">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      {t('عمولات وردية اليوم', "Today's Commissions")}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700">{t('آلي وفوري', 'Automated')}</span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Sara - Hair (Dusty Blue) */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-ink">{t('سارة (شعر)', 'Sara (Hair)')}</span>
                        <span className="font-mono font-bold text-ink">340 ر.س <span className="text-[10px] text-ink-muted">(15%)</span></span>
                      </div>
                      <div className="h-2 rounded-full bg-mist-gray/40">
                        <div className="h-full rounded-full bg-dusty-blue" style={{ width: '75%' }} />
                      </div>
                    </div>

                    {/* Nora - Makeup (Warm Peach) */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-ink">{t('نورة (مكياج)', 'Nora (Makeup)')}</span>
                        <span className="font-mono font-bold text-ink">260 ر.س <span className="text-[10px] text-ink-muted">(12%)</span></span>
                      </div>
                      <div className="h-2 rounded-full bg-mist-gray/40">
                        <div className="h-full rounded-full bg-warm-peach" style={{ width: '60%' }} />
                      </div>
                    </div>

                    {/* Mona - Nails & Spa (Emerald) */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-ink">{t('منى (أظافر)', 'Mona (Nails)')}</span>
                        <span className="font-mono font-bold text-ink">180 ر.س <span className="text-[10px] text-ink-muted">(10%)</span></span>
                      </div>
                      <div className="h-2 rounded-full bg-mist-gray/40">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: '45%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
