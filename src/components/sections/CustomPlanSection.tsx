'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  PhoneCall,
  CheckCircle2,
  Layers,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Users2,
  Network,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface CustomPlanSectionProps {
  locale?: Locale;
}

export const CustomPlanSection: React.FC<CustomPlanSectionProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const highlights = [
    {
      titleAr: 'فروع ونطاقات فرعية غير محدودة',
      titleEn: 'Unlimited Branches & Subdomains',
      descAr: 'إطلاق نطاق فرعي مخصص لكل فرع مع لوحة قيادة مركزية لمتابعة كافة العمليات من مقر الإدارة العامة.',
      descEn: 'Dedicated subdomain instances for every branch with consolidated headquarters oversight.',
    },
    {
      titleAr: 'مدير حساب سعودي وتدريب ميداني',
      titleEn: 'Dedicated Account Manager & On-Site Training',
      descAr: 'فريق عمل محلي يتولى تدريب موظفي الاستقبال ومصففي الشعر في فروعك مع متابعة مستمرة.',
      descEn: 'On-site staff onboarding and hands-on operational training across your Saudi locations.',
    },
    {
      titleAr: 'ربط مخصص مع أنظمة ERP والمحاسبة',
      titleEn: 'Custom ERP & Gateway Integrations',
      descAr: 'ربط سحابي متقدم عبر واجهات البرمجة (API) مع برامج المحاسبة العامة وبوابات الدفع الخاصة بمنشأتك.',
      descEn: 'Direct API integrations with existing enterprise accounting ledgers and payment systems.',
    },
    {
      titleAr: 'اتفاقية مستوى خدمة متميزة (SLA 99.9%)',
      titleEn: 'Guaranteed 99.9% Uptime SLA',
      descAr: 'ضمان استمرارية تشغيل بنسبة 99.9% مع خط ساخن للدعم الفني المخصص على مدار الساعة 24/7.',
      descEn: 'Enterprise uptime SLA with round-the-clock priority response lines.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFB] border-t border-mist-gray" id="custom-plan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-white border border-mist-gray shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray text-ink text-xs font-medium">
                <Building2 className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'للسلاسل والامتياز التجاري (Franchises)' : 'For Salon Chains & Franchises'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink tracking-tight leading-tight">
                {isAr
                  ? 'هل تحتاج باقة مخصصة لسلسلة فروعك أو مجمعك التجميلي؟'
                  : 'Need a Custom Tailored Plan for Your Multi-Branch Salon Chain?'}
              </h2>

              <p className="text-xs sm:text-sm font-normal text-ink-muted leading-relaxed">
                {isAr
                  ? 'إذا كانت منشأتك تتكون من فروع متعددة، أو تدير علامة امتياز تجاري بحاجة لتقارير مالية مجمعة وربط مخصص مع أنظمة المحاسبة، نوفر لك بنية سحابية مستقلة مصممة خصيصًا لحجم أعمالك.'
                  : 'If you operate multi-branch complexes or salon franchise networks requiring consolidated financial rollups, we engineer an enterprise tier matching your exact scope.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {highlights.map((h, idx) => (
                  <div key={idx} className="space-y-1 p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray/70">
                    <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-ink">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isAr ? h.titleAr : h.titleEn}</span>
                    </div>
                    <p className="text-[11px] font-normal text-ink-muted leading-relaxed">
                      {isAr ? h.descAr : h.descEn}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    'السلام عليكم، أود الاستفسار عن باقة المؤسسات والسلاسل المخصصة من راش إكس.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-black" />
                  <span>{isAr ? 'تحدث مع مستشار المشاريع الكبرى' : 'Talk to Enterprise Consultant'}</span>
                </a>

                <a
                  href="#demo-form"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-ink bg-white hover:bg-mist-gray/40 border border-mist-gray rounded-2xl transition-colors"
                >
                  <span>{isAr ? 'طلب عرض سعر مخصص' : 'Request Custom Quote'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Visual Badge Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-ink via-[#1B2527] to-black text-white space-y-5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-dusty-blue font-mono font-bold">
                      ENTERPRISE INFRASTRUCTURE
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {isAr ? 'بنية السلاسل الكبرى' : 'Chains Architecture'}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-dusty-blue">
                    <Network className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-mist-gray">{isAr ? 'الفروع والنطاقات:' : 'Subdomains:'}</span>
                    <span className="font-bold text-white font-mono">غير محدود (Unlimited)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-mist-gray">{isAr ? 'الفوترة الإلكترونية:' : 'E-Invoicing:'}</span>
                    <span className="font-bold text-emerald-400">ZATCA المرحلة الثانية ✓</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-mist-gray">{isAr ? 'مدير الحساب والتدريب:' : 'Support SLA:'}</span>
                    <span className="font-bold text-warm-peach">ميداني ومخصص 24/7</span>
                  </div>
                </div>

                <div className="text-[11px] text-mist-gray/80 text-center leading-relaxed pt-2 border-t border-white/10">
                  {isAr
                    ? 'تسعير مخصص بحسب عدد الفروع والمتطلبات التشغيلية الخاصة [TODO].'
                    : 'Bespoke pricing scaled precisely to branch volume & integrations [TODO].'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomPlanSection;

