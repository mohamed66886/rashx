'use client';

import React from 'react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface StatsRowProps {
  locale?: Locale;
}

export const StatsRow: React.FC<StatsRowProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';

  const stats = [
    {
      value: '10',
      labelAr: 'أنظمة تشغيل متكاملة في شاشة واحدة',
      labelEn: 'Integrated Core Systems in One Hub',
      verified: true,
    },
    {
      value: '4',
      labelAr: 'واجهات مستقلة لكل منشأة (موقع، إدارة، عميل، أخصائي)',
      labelEn: 'Independent Portals per Salon',
      verified: true,
    },
    {
      value: '14',
      labelAr: 'يومًا تجربة مجانية بدون بطاقة ائتمان',
      labelEn: 'Days Free Trial with Zero Risk',
      verified: true,
    },
    {
      value: '[TODO]',
      labelAr: 'حجز وموعد تم جدولته عبر المنظومة [TODO]',
      labelEn: 'Appointments Scheduled across Salons [TODO]',
      verified: false,
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-mist-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-mono text-ink tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm text-ink-muted font-normal max-w-[200px] mx-auto">
                {isAr ? stat.labelAr : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRow;

