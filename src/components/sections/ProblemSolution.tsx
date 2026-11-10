'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { CalendarCheck2, UserCheck, FileCheck, Sparkles, Check, X } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX Before / After — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 * Each card = the problem (quiet, grey) on top, the solution (brand tint) below.
 */

interface ProblemSolutionProps {
  locale?: Locale;
}

interface Item {
  id: string;
  icon: LucideIcon;
  tone: 'blue' | 'peach' | 'gray';
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
  chips: string[];
}

const TONES = {
  blue: { panel: 'bg-dusty-blue/20', tile: 'bg-dusty-blue text-ink' },
  peach: { panel: 'bg-warm-peach/30', tile: 'bg-warm-peach text-ink' },
  gray: { panel: 'bg-mist-gray/60', tile: 'bg-ink text-white' },
} as const;

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const t = (ar: string, en: string) => (isAr ? ar : en);

  const before = t('قبل راش إكس', 'Before RashX');
  const after = t('مع راش إكس', 'With RashX');

  const items: Item[] = [
    {
      id: 'scheduling',
      icon: CalendarCheck2,
      tone: 'blue',
      problemTitle: t('فوضى المواعيد وتضارب الحجوزات', 'Scheduling chaos & double bookings'),
      problemText: t(
        'تسجيل المواعيد يدويًا أو عبر الواتساب يسبب تضارب أوقات الأخصائيات وتأخر العميلات.',
        'Manual logs and scattered WhatsApp chats cause double bookings and stylist delays.',
      ),
      solutionTitle: t('جدولة ذكية 24/7 وتذكير آلي', '24/7 smart booking & auto reminders'),
      solutionText: t(
        'حجز ذاتي على مدار الساعة بدون أي تداخل، مع تذكير تلقائي عبر الواتساب يقلل الغياب.',
        'Self-service booking around the clock with zero overlap and WhatsApp reminders that cut no-shows.',
      ),
      chips: [t('تأكيد عبر الواتساب', 'WhatsApp confirmation'), t('بدون تضارب', 'No double bookings')],
    },
    {
      id: 'crm',
      icon: UserCheck,
      tone: 'peach',
      problemTitle: t('ضياع بيانات العملاء وضعف تكرار الزيارة', 'Lost client data & low repeat visits'),
      problemText: t(
        'نسيان معادلات الصبغات وتفضيلات العميلة، وبدون مكافآت تذهب العميلة لصالون آخر.',
        'Forgotten dye formulas and no rewards send clients to the salon next door.',
      ),
      solutionTitle: t('ملف عميلة متكامل ونظام ولاء', '360° client profile & loyalty'),
      solutionText: t(
        'سجل رقمي لكل زيارة وصبغة وتفضيل، مع نقاط وكوبونات تشجع العميلة على العودة.',
        'A digital history of every visit, formula and preference, plus points and coupons that bring clients back.',
      ),
      chips: [t('سجل الصبغات', 'Dye formulas'), t('نقاط وكوبونات', 'Points & coupons')],
    },
    {
      id: 'zatca',
      icon: FileCheck,
      tone: 'gray',
      problemTitle: t('صعوبة الفواتير الإلكترونية وحساب العمولات', 'E-invoicing & manual commissions'),
      problemText: t(
        'القلق من اشتراطات هيئة الزكاة (ZATCA) وساعات ضائعة كل ليلة في حساب العمولات يدويًا.',
        'Stress over ZATCA compliance and hours lost every night calculating commissions by hand.',
      ),
      solutionTitle: t('ZATCA المرحلة 2 وعمولات فورية', 'ZATCA Phase 2 & instant commissions'),
      solutionText: t(
        'فواتير ضريبية مبسطة بـ QR، واحتساب آلي لعمولة كل أخصائية فور إغلاق الفاتورة.',
        'Compliant simplified invoices with QR, and each stylist’s commission calculated the moment a bill closes.',
      ),
      chips: [t('فاتورة بـ QR', 'QR invoice'), t('عمولة فورية', 'Instant commission')],
    },
  ];

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className="border-t border-mist-gray bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mx-auto mb-10 max-w-2xl space-y-4 text-center md:mb-14">

          <h2 className="text-balance text-3xl font-extrabold leading-[1.25] text-ink md:text-4xl">
            {t('تحديات الصالون اليومية... وراش إكس يحلها', 'Daily salon struggles, solved by RashX')}
          </h2>
          <p className="text-base leading-relaxed text-ink-muted md:text-lg">
            {t(
              'صُمم راش إكس حول أكبر التحديات التشغيلية والمالية في المشاغل ومراكز التجميل بالمملكة.',
              'Built around the real operational and financial pain points of salons across Saudi Arabia.',
            )}
          </p>
        </header>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => {
            const tone = TONES[item.tone];
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-mist-gray bg-white"
              >
                {/* Problem */}
                <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mist-gray px-3 py-1 text-xs font-bold text-ink-muted">
                    <X className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    {before}
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-ink">{item.problemTitle}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{item.problemText}</p>
                </div>

                {/* Solution */}
                <div className={`flex flex-col gap-3 p-6 sm:p-7 ${tone.panel}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone.tile}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold text-ink">{after}</span>
                  </div>
                  <h3 className="text-xl font-extrabold leading-snug text-ink">{item.solutionTitle}</h3>
                  <p className="text-sm leading-relaxed text-ink/75">{item.solutionText}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {item.chips.map((chip) => (
                      <li
                        key={chip}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink"
                      >
                        <Check className="h-3.5 w-3.5 text-ink" strokeWidth={2.5} aria-hidden="true" />
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;