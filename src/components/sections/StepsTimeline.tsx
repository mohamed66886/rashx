'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, Globe, Rocket, ArrowRight, ArrowLeft } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX Steps — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 * Three numbered steps joined by a thin line on desktop.
 */

interface StepsTimelineProps {
  locale?: Locale;
}

const TONES = ['bg-dusty-blue', 'bg-warm-peach', 'bg-dusty-blue'] as const;

export const StepsTimeline: React.FC<StepsTimelineProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const steps = [
    {
      step: '01',
      titleAr: 'احجز العرض التجريبي وحدد احتياجاتك',
      titleEn: 'Book your demo & define needs',
      descAr:
        'جلسة مباشرة مع مستشار متخصص لاستعراض الأنظمة الأنسب لحجم منشأتك (صالون، مشغل، سبا، أو سلسلة).',
      descEn:
        'A live consultation to review the systems best matched to your facility size and operations.',
      icon: CalendarCheck,
    },
    {
      step: '02',
      titleAr: 'تجهيز النطاق الفرعي واستيراد البيانات',
      titleEn: 'Subdomain setup & data import',
      descAr:
        'نطلق بيئتك السحابية الخاصة (yourname.rashx.org) ونرفع قائمة خدماتك وأسعارك وفريق عملك بدقة.',
      descEn:
        'We launch your dedicated cloud instance and import your service catalog, prices and staff.',
      icon: Globe,
    },
    {
      step: '03',
      titleAr: 'تدريب الفريق والبدء الفوري',
      titleEn: 'Staff training & instant go-live',
      descAr:
        'تدريب مبسط لفريق الاستقبال ومقدمي الخدمة مع دعم فني مستمر لتشغيل نقاط البيع والحجوزات.',
      descEn:
        'Streamlined training for receptionists and stylists, with continuous technical support.',
      icon: Rocket,
    },
  ];

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      className="border-y border-mist-gray bg-neutral/40 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center md:mb-16">
          <h2 className="text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl">
            {isAr ? 'كيف تبدأ مع راش إكس في 3 خطوات بسيطة؟' : 'Get started in 3 simple steps'}
          </h2>
          <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
            {isAr
              ? 'انتقال رقمي سلس بدون تعقيدات وبدون توقف لعمليات صالونك اليومية.'
              : 'A smooth digital transition with zero disruption to your salon’s daily operations.'}
          </p>
        </div>

        <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Connecting line behind the step badges (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[16.66%] top-7 hidden h-px bg-mist-gray md:block"
          />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={item.step} className="relative flex flex-col items-center text-center">
                <span
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-ink ring-8 ring-neutral/40 ${TONES[idx]}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <div className="mt-5 flex w-full flex-1 flex-col gap-3 rounded-3xl border border-mist-gray bg-white p-6 sm:p-7">
                  <span className="font-mono text-xs font-medium text-ink-muted">
                    {isAr ? `الخطوة ${item.step}` : `Step ${item.step}`}
                  </span>
                  <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/demo`}
            className="inline-flex items-center gap-2 rounded-2xl bg-warm-peach px-6 py-3.5 text-xs font-semibold text-ink transition-colors hover:bg-warm-peach/80 sm:text-sm"
          >
            <span>{isAr ? 'ابدأ خطوتك الأولى الآن' : 'Take your first step now'}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StepsTimeline;