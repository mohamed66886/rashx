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

interface TargetFacilitiesProps {
  locale?: Locale;
}

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
      titleAr: 'الصالونات النسائية والمشاغل',
      titleEn: 'Women Beauty Salons & Studios',
      taglineAr: 'إدارة متكاملة للتصفيف، الصبغات، المكياج، والأظافر',
      taglineEn: 'Styling, color formulas, makeup & nail artistry',
      descAr:
        'نظام مصمم خصيصًا لطبيعة المشاغل النسائية: حفظ أرقام درجات الصبغات في ملف العميلة، حساب استهلاك المواد من المستودع، وتنظيم حجز باقات العرائس المتسلسلة.',
      descEn:
        'Tailored to styling studios: digital hair formula notebooks, automated dye consumption deductions, and sequential bridal package scheduling.',
      highlightsAr: ['سجل معادلات الصبغة وتفضيلات العميلات', 'حساب عمولات الخبيرات حسب الخدمة', 'باقات متسلسلة للعرائس والمناسبات'],
      highlightsEn: ['Hair color formula history', 'Tiered specialist commission rates', 'Sequential bridal & glam packages'],
    },
    {
      id: 'barbershops',
      slug: 'barbershops',
      icon: Scissors,
      titleAr: 'الصالونات الرجالية ومراكز الحلاقة',
      titleEn: 'Men Barbershops & Grooming',
      taglineAr: 'سرعة إنهاء الحسابات وإدارة كراسي الحلاقة والدور',
      taglineEn: 'Fast chair turnover, queue control & commissions',
      descAr:
        'نقطة بيع سريعة بلمسة واحدة على الآيباد، إدارة طابور الانتظار، حجز الحلاق المفضل، وتوزيع عمولات كل حلاق بنهاية الوردية في ثوانٍ معدودة.',
      descEn:
        'One-touch fast POS checkout, smart queue management, preferred barber bookings, and instant end-of-shift commission reconciliation.',
      highlightsAr: ['نقاط بيع فورية بلمسة واحدة', 'تنظيم طابور الانتظار وحجز الكرسي', 'تقفيل يومي سريع للصندوق والعمولات'],
      highlightsEn: ['One-touch rapid POS checkout', 'Chair queue & waitlist control', 'Fast end-of-shift cash drawer balance'],
    },
    {
      id: 'beauty-centers',
      slug: 'beauty-salons', // maps to beauty centers
      icon: Store,
      titleAr: 'مراكز ومجمعات التجميل المتكاملة',
      titleEn: 'Full Beauty Complexes',
      taglineAr: 'إدارة الأقسام المتعددة والفروع والخدمات المجمعة',
      taglineEn: 'Multi-department, multi-floor & branch oversight',
      descAr:
        'تحكم مركزي لمجمعات التجميل الكبرى: ربط قسم الشعر بقسم العناية بالبشرة والأظافر في فاتورة موحدة، مع تقارير أداء تفصيلية لكل قسم وربط متطلبات ZATCA.',
      descEn:
        'Central HQ control for multi-department beauty complexes: consolidate hair, skin, and nails in a unified invoice with multi-level tax reporting.',
      highlightsAr: ['فاتورة واحدة جامعة لأكثر من قسم', 'تقارير أرباح وإنتاجية لكل قسم', 'إدارة فروع متعددة ونطاقات مخصصة'],
      highlightsEn: ['Unified multi-department billings', 'Departmental P&L analytics', 'Multi-branch subdomain management'],
    },
    {
      id: 'spas',
      slug: 'spas',
      icon: Flower2,
      titleAr: 'مراكز السبا والاستجمام',
      titleEn: 'Spa & Wellness Centers',
      taglineAr: 'إدارة أجنحة المساج، الجلسات الممتدة، والاشتراكات',
      taglineEn: 'Treatment suites, extended sessions & memberships',
      descAr:
        'جدولة أجنحة المساج وغرف الحمام المغربي، احتساب الفترات المستقطعة للتعقيم والتجهيز، وبيع بطاقات العضوية وباقات الجلسات الدورية مسبقة الدفع.',
      descEn:
        'Manage massage suites and Moroccan baths, automated sanitation buffer times, and prepaid recurring membership package engines.',
      highlightsAr: ['جدولة الغرف وأوقات التعقيم بين الجلسات', 'باقات اشتراكات شهرية ودورية', 'تتبع استهلاك زيوت ومستحضرات السبا'],
      highlightsEn: ['Sanitation buffer scheduling', 'Monthly membership subscriptions', 'Spa oils & treatment supply tracking'],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-mist-gray" id="for">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-bold">
            <Building2 className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'حلول مخصصة لمنشأتك' : 'Tailored Salon Solutions'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            {isAr
              ? 'لمن نصلح؟ حلول مفصلة لجميع أنواع منشآت التجميل والعناية'
              : 'Who We Serve: Tailored Solutions for Every Beauty Facility'}
          </h2>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            {isAr
              ? 'سواء كنت تدير مشغلاً نسائيًا فرديًا، مركز حلاقة رجالي سريع، مجمع تجميل فاخر، أو مركز سبا واستجمام، راش إكس توفر لك التدفق التشغيلي المثالي.'
              : 'Whether operating an independent women’s studio, a high-volume barbershop, a luxury beauty center, or a wellness spa, RashX adapts to your workflow.'}
          </p>
        </div>

        {/* 4 Facilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {facilities.map((fac) => {
            const Icon = fac.icon;

            return (
              <div
                key={fac.id}
                className="group p-6 sm:p-8 rounded-3xl bg-[#FAFBFB] border border-mist-gray hover:border-dusty-blue/60 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-mist-gray flex items-center justify-center text-ink group-hover:bg-dusty-blue group-hover:text-black transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-dusty-blue">
                      {isAr ? fac.taglineAr : fac.taglineEn}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-ink group-hover:text-dusty-blue transition-colors">
                      {isAr ? fac.titleAr : fac.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mt-2">
                      {isAr ? fac.descAr : fac.descEn}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 pt-2 border-t border-mist-gray/60">
                    {(isAr ? fac.highlightsAr : fac.highlightsEn).map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-medium text-ink">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Link to dedicated /for/[slug] page */}
                <div className="pt-4 border-t border-mist-gray/40">
                  <Link
                    href={`/${locale}/for/${fac.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-ink group-hover:text-dusty-blue transition-colors"
                  >
                    <span>
                      {isAr ? `اكتشف حلول ${fac.titleAr}` : `Explore Solutions for ${fac.titleEn}`}
                    </span>
                    <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetFacilities;

