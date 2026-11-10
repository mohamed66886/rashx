'use client';

import React from 'react';
import { ShieldCheck, Lock, Globe, Server, CheckCircle2 } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface TrustBarProps {
  locale?: Locale;
}

export const TrustBar: React.FC<TrustBarProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';

  const badges = [
    {
      icon: ShieldCheck,
      titleAr: 'دعم الفوترة الإلكترونية (ZATCA 2)',
      titleEn: 'ZATCA Phase 2 E-Invoicing Support',
      descAr: 'وفق حالة المنشأة ومتطلبات الربط والتفعيل',
      descEn: 'Per facility onboarding status & criteria',
    },
    {
      icon: Lock,
      titleAr: 'امتثال لنظام PDPL السعودي',
      titleEn: 'Saudi PDPL Data Compliance',
      descAr: 'حماية وتشفير صارم لبيانات العملاء',
      descEn: 'Strict personal data security & rights',
    },
    {
      icon: Globe,
      titleAr: 'نطاق فرعي سحابي مستقل',
      titleEn: 'Independent Branded Subdomain',
      descAr: 'سيادة تامة واستقلالية لكل منشأة',
      descEn: 'Full data autonomy for each salon',
    },
    {
      icon: Server,
      titleAr: 'فصل منطقي بين المنشآت',
      titleEn: 'Multi-Tenant Logical Isolation',
      descAr: 'صلاحيات وأدوار متقدمة وعزل كامل',
      descEn: 'Granular permissions & tenant segregation',
    },
  ];

  return (
    <section className="py-10 bg-white border-y border-mist-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray/60"
              >
                <div className="p-2.5 rounded-xl bg-dusty-blue/20 text-ink shrink-0">
                  <Icon className="w-5 h-5 text-dusty-blue" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-ink">
                    {isAr ? badge.titleAr : badge.titleEn}
                  </h4>
                  <p className="text-[11px] text-ink-muted leading-tight">
                    {isAr ? badge.descAr : badge.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;

