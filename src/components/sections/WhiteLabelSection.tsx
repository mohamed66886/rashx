'use client';

import React, { useState } from 'react';
import { Palette, Smartphone, FileText, Globe } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX White Label section — simplified.
 * The section itself uses the brand palette only (dusty-blue, warm-peach,
 * mist-gray, ink, ink-muted). The four swatches below are demo client themes:
 * they are meant to look different from RashX, so they keep their own colors.
 */

interface WhiteLabelSectionProps {
  locale?: Locale;
}

interface DemoTheme {
  id: string;
  nameAr: string;
  nameEn: string;
  primary: string; // brand color of the demo salon
  onPrimary: string; // readable text color on top of `primary`
  secondary: string; // soft background of the demo salon
}

const THEMES: DemoTheme[] = [
  { id: 'rose-gold', nameAr: 'الوردي الذهبي', nameEn: 'Rose Gold', primary: '#E0A99A', onPrimary: '#4A2821', secondary: '#F8EBE7' },
  { id: 'dusty-blue', nameAr: 'الأزرق الهادئ', nameEn: 'Dusty Blue', primary: '#91B8C0', onPrimary: '#1F3438', secondary: '#EFF5F7' },
  { id: 'royal-emerald', nameAr: 'الزمردي الملكي', nameEn: 'Royal Emerald', primary: '#2E6F5E', onPrimary: '#FFFFFF', secondary: '#EBF4F1' },
  { id: 'luxury-gold', nameAr: 'الذهبي الفاخر', nameEn: 'Luxury Gold', primary: '#C9A96E', onPrimary: '#1C1917', secondary: '#FBF8F2' },
];

export const WhiteLabelSection: React.FC<WhiteLabelSectionProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const [activeId, setActiveId] = useState(THEMES[0].id);
  const theme = THEMES.find((t) => t.id === activeId) ?? THEMES[0];

  const features = [
    {
      icon: Smartphone,
      titleAr: 'تطبيق حجز العميلة',
      titleEn: 'Client booking app',
      descAr: 'شعارك وألوانك على كل شاشات الحجز واختيار الأخصائية.',
      descEn: 'Your logo and colors on every booking screen.',
    },
    {
      icon: FileText,
      titleAr: 'الفواتير والإيصالات',
      titleEn: 'Invoices & receipts',
      descAr: 'ترويس الفاتورة بشعارك ورقمك الضريبي وبياناتك الرسمية.',
      descEn: 'Receipts headed with your logo, VAT number and details.',
    },
    {
      icon: Globe,
      titleAr: 'نطاق خاص بصالونك',
      titleEn: 'Your own subdomain',
      descAr: 'your-salon.rashx.org',
      descEn: 'your-salon.rashx.org',
    },
  ];

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className="border-t border-mist-gray bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center md:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-mist-gray/60 px-3 py-1 text-xs font-medium text-ink">
            <Palette className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
            <span>{isAr ? 'علامة بيضاء (White Label)' : 'White Label'}</span>
          </div>

          <h2 className="text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl">
            {isAr ? 'هويتك أولاً: الشعار والألوان والنطاق' : 'Your brand first: logo, colors & subdomain'}
          </h2>

          <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
            {isAr
              ? 'صالونك هو النجم. راش إكس تعمل بهدوء في الخلفية، وتظهر واجهات الحجز والتطبيقات والفواتير بشعارك وألوانك.'
              : 'Your salon is the hero. RashX works quietly in the background while booking pages, apps and receipts show your logo and colors.'}
          </p>
        </div>

        {/* Showcase */}
        <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl bg-neutral/40 p-6 sm:p-10 md:grid-cols-2 md:gap-12">
          {/* Details + swatches */}
          <div className="space-y-6">
            <ul className="space-y-4">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.titleEn} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dusty-blue/30 text-ink">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-ink sm:text-sm">{isAr ? f.titleAr : f.titleEn}</div>
                      <div
                        className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm"
                        dir={f.titleEn === 'Your own subdomain' ? 'ltr' : undefined}
                      >
                        {isAr ? f.descAr : f.descEn}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-3 border-t border-mist-gray pt-5">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-medium text-ink">
                  {isAr ? 'جرّب هوية مختلفة:' : 'Try a different brand:'}
                </span>
                <span className="font-normal text-ink-muted">{isAr ? theme.nameAr : theme.nameEn}</span>
              </div>

              <div className="flex items-center gap-3">
                {THEMES.map((th) => {
                  const active = th.id === activeId;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setActiveId(th.id)}
                      aria-pressed={active}
                      aria-label={isAr ? th.nameAr : th.nameEn}
                      className={`h-9 w-9 rounded-full border-2 border-white transition-shadow ${
                        active ? 'ring-2 ring-ink' : 'ring-1 ring-mist-gray hover:ring-ink/40'
                      }`}
                      style={{ backgroundColor: th.primary }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live preview of the demo salon */}
          <div className="flex justify-center">
            <div
              className="w-full max-w-xs space-y-4 rounded-3xl border p-5 transition-colors duration-300"
              style={{ backgroundColor: theme.secondary, borderColor: `${theme.primary}55` }}
            >
              <div className="space-y-2 border-b pb-3 text-center" style={{ borderColor: `${theme.primary}40` }}>
                <div
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-xs font-semibold transition-colors duration-300"
                  style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
                >
                  LOGO
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">
                    {isAr ? 'صالون لمسة الجمال' : 'Luxury Touch Beauty'}
                  </div>
                  <div className="text-[10px] text-ink-muted" dir="ltr">
                    salon-beauty.rashx.org
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-2xl bg-white p-3">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>{isAr ? 'تصفيف شعر وعناية' : 'Hair Styling & Care'}</span>
                  <span className="font-mono">{isAr ? '180 ر.س' : '180 SAR'}</span>
                </div>
                <div className="text-[10px] text-ink-muted">
                  {isAr ? '45 دقيقة • مع سارة' : '45 min • with Sarah'}
                </div>
                <button
                  type="button"
                  className="w-full rounded-xl py-2 text-xs font-bold transition-colors duration-300"
                  style={{ backgroundColor: theme.primary, color: theme.onPrimary }}
                >
                  {isAr ? 'تأكيد الحجز' : 'Confirm Appointment'}
                </button>
              </div>

              <div className="text-center text-[10px] text-ink-muted">
                {isAr ? 'تعمل بهدوء بواسطة راش إكس' : 'Powered quietly by RashX'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelSection;