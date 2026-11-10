'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, Globe, Rocket, ArrowRight, ArrowLeft } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface StepsTimelineProps {
  locale?: Locale;
}

export const StepsTimeline: React.FC<StepsTimelineProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const steps = [
    {
      step: '01',
      titleAr: 'احجز العرض التجريبي وحدد احتياجاتك',
      titleEn: 'Book Your Demo & Define Needs',
      descAr:
        'جلسة مباشرة مع مستشار متخصص لاستعراض الأنظمة الأنسب لحجم منشأتك (صالون، مشغل، سبا، أو سلسلة).',
      descEn:
        'A live consultation to review the systems best matched to your facility size and operations.',
      icon: CalendarCheck,
    },
    {
      step: '02',
      titleAr: 'تجهيز النطاق الفرعي واستيراد البيانات',
      titleEn: 'Subdomain Setup & Data Import',
      descAr:
        'نطلق بيئتك السحابية الخاصة (yourname.rashx.org) ونرفع قائمة خدماتك وأسعارك وفريق عملك بدقة.',
      descEn:
        'We launch your dedicated cloud instance and import your complete service catalog, prices, and staff.',
      icon: Globe,
    },
    {
      step: '03',
      titleAr: 'تدريب الفريق والبدء الفوري',
      titleEn: 'Staff Training & Instant Go-Live',
      descAr:
        'تدريب مبسط لفريق الاستقبال ومقدمي الخدمة مع دعم فني مستمر لتشغيل نقاط البيع والحجوزات.',
      descEn:
        'Streamlined training for receptionists and stylists with continuous Saudi technical support.',
      icon: Rocket,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFB] border-y border-mist-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            {isAr ? 'كيف تبدأ مع راش إكس في 3 خطوات بسيطة؟' : 'How to Get Started in 3 Simple Steps'}
          </h2>
          <p className="text-sm sm:text-base text-ink-muted">
            {isAr
              ? 'انتقال رقمي سلس بدون تعقيدات وبدون توقف لعمليات صالونك اليومية.'
              : 'Smooth digital transition with zero disruptions to your salon’s daily operations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 sm:p-8 rounded-3xl bg-white border border-mist-gray shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink font-bold">
                    <Icon className="w-6 h-6 text-dusty-blue" />
                  </div>
                  <span className="text-2xl font-black font-mono text-mist-gray/90">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-ink">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/demo`}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-sm transition-all"
          >
            <span>{isAr ? 'ابدأ خطوتك الأولى الآن' : 'Take Your First Step Now'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StepsTimeline;

