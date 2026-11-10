'use client';

import React from 'react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface LogoCloudProps {
  locale?: Locale;
}

export const LogoCloud: React.FC<LogoCloudProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';

  const placeholders = [
    { id: 1, label: '[TODO: شعار صالون شريك 1]' },
    { id: 2, label: '[TODO: شعار مركز تجميل 2]' },
    { id: 3, label: '[TODO: شعار مشغل نسائي 3]' },
    { id: 4, label: '[TODO: شعار مركز سبا 4]' },
    { id: 5, label: '[TODO: شعار سلسلة حلاقة 5]' },
  ];

  return (
    <section className="py-10 bg-[#FAFBFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-ink-muted uppercase tracking-wider mb-6">
          {isAr
            ? 'شركاء النجاح ومراكز التجميل المنضمة حديثاً [TODO]'
            : 'Partner Beauty Centers & Salons [TODO]'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {placeholders.map((p) => (
            <div
              key={p.id}
              className="px-4 py-2.5 rounded-xl border border-dashed border-mist-gray bg-white text-xs font-mono text-ink-muted/80 shadow-2xs"
            >
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;

