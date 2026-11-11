'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scissors,
  Sparkles,
  Flower2,
  Store,
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
} from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX Target Facilities — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 * Each card is a single link to its /for/[slug] page.
 */

interface TargetFacilitiesProps {
  locale?: Locale;
}

const TONES = {
  blue: { tile: 'bg-dusty-blue/30', check: 'bg-dusty-blue/30' },
  peach: { tile: 'bg-warm-peach/40', check: 'bg-warm-peach/50' },
} as const;

export const TargetFacilities: React.FC<TargetFacilitiesProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const facilities = [
    {
      id: 'women-salons',
      slug: 'beauty-salons',
      icon: Sparkles,
      tone: 'blue' as const,
      titleAr: 'الصالونات النسائية والمشاغل',
      titleEn: 'Women Beauty Salons & Studios',
      taglineAr: 'التصفيف والصبغات والمكياج والأظافر',
      taglineEn: 'Styling, color, makeup & nails',
      descAr:
        'نظام مصمم لطبيعة المشاغل النسائية: حفظ درجات الصبغات في ملف العميلة، حساب استهلاك المواد، وتنظيم باقات العرائس المتسلسلة.',
      descEn:
        'Built for styling studios: digital formula notebooks, automatic dye consumption and sequential bridal packages.',
      highlightsAr: ['سجل معادلات الصبغة وتفضيلات العميلات', 'حساب عمولات الخبيرات حسب الخدمة', 'باقات متسلسلة للعرائس والمناسبات'],
      highlightsEn: ['Hair color formula history', 'Tiered specialist commissions', 'Sequential bridal & glam packages'],
    },
    {
      id: 'barbershops',
      slug: 'barbershops',
      icon: Scissors,
      tone: 'peach' as const,
      titleAr: 'الصالونات الرجالية ومراكز الحلاقة',
      titleEn: 'Men Barbershops & Grooming',
      taglineAr: 'سرعة الحسابات وإدارة الكراسي والدور',
      taglineEn: 'Fast checkout, chairs & queue',
      descAr:
        'نقطة بيع سريعة بلمسة واحدة، إدارة طابور الانتظار، حجز الحلاق المفضل، وتوزيع العمولات بنهاية الوردية في ثوانٍ.',
      descEn:
        'One-touch POS, queue management, preferred barber bookings and instant end-of-shift commissions.',
      highlightsAr: ['نقاط بيع فورية بلمسة واحدة', 'تنظيم طابور الانتظار وحجز الكرسي', 'تقفيل يومي سريع للصندوق والعمولات'],
      highlightsEn: ['One-touch POS checkout', 'Chair queue & waitlist', 'Fast end-of-shift drawer balance'],
    },
    {
      id: 'beauty-centers',
      slug: 'beauty-salons', // maps to beauty centers
      icon: Store,
      tone: 'peach' as const,
      titleAr: 'مراكز ومجمعات التجميل المتكاملة',
      titleEn: 'Full Beauty Complexes',
      taglineAr: 'الأقسام المتعددة والفروع والخدمات المجمعة',
      taglineEn: 'Multi-department & multi-branch',
      descAr:
        'تحكم مركزي للمجمعات الكبرى: فاتورة موحدة تجمع الشعر والبشرة والأظافر، مع تقارير أداء لكل قسم وربط متطلبات ZATCA.',
      descEn:
        'Central control for large complexes: one invoice across hair, skin and nails, with per-department reports and tax reporting.',
      highlightsAr: ['فاتورة واحدة جامعة لأكثر من قسم', 'تقارير أرباح وإنتاجية لكل قسم', 'إدارة فروع متعددة ونطاقات مخصصة'],
      highlightsEn: ['Unified multi-department billing', 'Departmental P&L analytics', 'Multi-branch subdomains'],
    },
    {
      id: 'spas',
      slug: 'spas',
      icon: Flower2,
      tone: 'blue' as const,
      titleAr: 'مراكز السبا والاستجمام',
      titleEn: 'Spa & Wellness Centers',
      taglineAr: 'أجنحة المساج والجلسات الممتدة والاشتراكات',
      taglineEn: 'Suites, long sessions & memberships',
      descAr:
        'جدولة أجنحة المساج والحمام المغربي، احتساب فترات التعقيم والتجهيز، وبيع بطاقات العضوية وباقات الجلسات مسبقة الدفع.',
      descEn:
        'Schedule massage suites and baths, automatic sanitation buffers, and prepaid membership packages.',
      highlightsAr: ['جدولة الغرف وأوقات التعقيم بين الجلسات', 'باقات اشتراكات شهرية ودورية', 'تتبع استهلاك زيوت ومستحضرات السبا'],
      highlightsEn: ['Sanitation buffer scheduling', 'Monthly membership plans', 'Spa oils & supplies tracking'],
    },
  ];

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      id="for"
      className="border-t border-mist-gray bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-mist-gray/60 px-3 py-1 text-xs font-medium text-ink">
            <Building2 className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
            <span>{isAr ? 'حلول مخصصة لمنشأتك' : 'Tailored Salon Solutions'}</span>
          </div>

          <h2 className="text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl">
            {isAr ? 'لمن نصلح؟ حلول لكل أنواع منشآت التجميل' : 'Who we serve: a fit for every beauty facility'}
          </h2>

          <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
            {isAr
              ? 'مشغل نسائي، صالون رجالي، مجمع تجميل، أو مركز سبا: راش إكس تتكيف مع طريقة عملك.'
              : 'A women’s studio, a busy barbershop, a beauty complex or a spa: RashX adapts to the way you work.'}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {facilities.map((fac) => {
            const Icon = fac.icon;
            const tone = TONES[fac.tone];

            return (
              <Link
                key={fac.id}
                href={`/${locale}/for/${fac.slug}`}
                className="group flex flex-col gap-5 rounded-3xl border border-mist-gray bg-white p-6 transition-colors hover:border-ink sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-ink ${tone.tile}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-semibold leading-snug text-ink sm:text-xl">
                      {isAr ? fac.titleAr : fac.titleEn}
                    </h3>
                    <p className="text-xs font-medium text-ink-muted sm:text-sm">
                      {isAr ? fac.taglineAr : fac.taglineEn}
                    </p>
                  </div>
                </div>

                <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm">{isAr ? fac.descAr : fac.descEn}</p>

                <ul className="space-y-2.5">
                  {(isAr ? fac.highlightsAr : fac.highlightsEn).map((hl) => (
                    <li key={hl} className="flex items-start gap-2.5 text-xs font-normal text-ink sm:text-sm">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${tone.check}`}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-2 pt-1 text-xs font-medium text-ink sm:text-sm">
                  <span>{isAr ? 'اكتشف الحلول' : 'Explore solutions'}</span>
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetFacilities;