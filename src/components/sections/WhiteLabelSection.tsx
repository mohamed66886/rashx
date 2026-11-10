'use client';

import React, { useState } from 'react';
import { Palette, Sparkles, Check, Smartphone, FileText, Globe } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface WhiteLabelSectionProps {
  locale?: Locale;
}

export const WhiteLabelSection: React.FC<WhiteLabelSectionProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';

  const themes = [
    {
      id: 'rose-gold',
      nameAr: 'الوردي الذهبي (Rose Gold)',
      nameEn: 'Rose Gold Luxury',
      primary: '#E0A99A',
      secondary: '#F8EBE7',
      text: '#4A2821',
      bgClass: 'bg-[#E0A99A]',
    },
    {
      id: 'dusty-blue',
      nameAr: 'الأزرق الهادئ (Dusty Blue)',
      nameEn: 'Dusty Blue Calm',
      primary: '#91B8C0',
      secondary: '#EFF5F7',
      text: '#1F3438',
      bgClass: 'bg-[#91B8C0]',
    },
    {
      id: 'royal-emerald',
      nameAr: 'الزمردي الملكي (Emerald Spa)',
      nameEn: 'Royal Emerald',
      primary: '#2E6F5E',
      secondary: '#EBF4F1',
      text: '#0D2D24',
      bgClass: 'bg-[#2E6F5E]',
    },
    {
      id: 'luxury-noir',
      nameAr: 'الأسود والذهبي الفاخر',
      nameEn: 'Luxury Noir & Gold',
      primary: '#C9A96E',
      secondary: '#FBF8F2',
      text: '#1C1917',
      bgClass: 'bg-[#C9A96E]',
    },
  ];

  const [activeTheme, setActiveTheme] = useState(themes[0]);

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFB] border-t border-mist-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-bold">
            <Palette className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'علامة بيضاء بالكامل (White Label)' : '100% White Label Customization'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            {isAr
              ? 'هويتك أولاً: تخصيص كامل للشعار والألوان والنطاق'
              : 'Your Brand First: Complete Customization of Logo, Colors & Subdomain'}
          </h2>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            {isAr
              ? 'صالونك أو مركزك التجميلي هو النجم الأوحد. راش إكس تعمل كشريك تقني صامت في الخلفية، بينما تظهر واجهات الحجز والتطبيقات والفواتير بشعارك وألوانك الحصرية.'
              : 'Your beauty salon is the hero. RashX powers your backend silently, while all client portals, appointments, and receipts shine in your brand colors and logo.'}
          </p>

          {/* Interactive Palette Switcher */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold text-ink me-2">
              {isAr ? 'جرّب تغيير هوية الصالون:' : 'Preview Brand Themes:'}
            </span>
            {themes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setActiveTheme(theme)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeTheme.id === theme.id
                    ? 'border-ink bg-white shadow-xs scale-105'
                    : 'border-mist-gray bg-white/70 hover:bg-white text-ink-muted'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: theme.primary }}
                />
                <span>{isAr ? theme.nameAr : theme.nameEn}</span>
                {activeTheme.id === theme.id && <Check className="w-3 h-3 text-ink" />}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Showcase: Mobile App Mockup & Customization Details */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-white border border-mist-gray shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Customization Pillars (7 cols) */}
          <div className="md:col-span-7 space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-dusty-blue">
                {isAr ? 'تجربة رقمية فريدة لعميلاتك' : 'Unique Digital Touchpoint'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                {isAr
                  ? 'صالونك، ألوانك، شعارك، ونطاقك الخاص'
                  : 'Your Logo, Your Palette, Your Domain'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              {isAr
                ? 'عندما تفتح عميلتك صفحة الحجز أو تستلم الفاتورة، ترى فقط اسم صالونك وهويتك المميزة، مما يرسخ مكانة علامتك التجارية الفاخرة في ذهنها.'
                : 'Whenever your clients book or receive invoices, they experience only your unique brand presence, reinforcing your salon’s luxury reputation.'}
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-mist-gray/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Smartphone className="w-3.5 h-3.5 text-ink" />
                </div>
                <div>
                  <div className="font-bold text-ink">
                    {isAr ? 'تطبيق حجز العميل (PWA)' : 'Client Booking Portal (PWA)'}
                  </div>
                  <div className="text-ink-muted text-[11px]">
                    {isAr ? 'شعارك وألوانك المختارة تكسو شاشات الحجز واختيار الأخصائيات.' : 'Your logo and color scheme customize every booking screen.'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-mist-gray/60 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5 text-ink" />
                </div>
                <div>
                  <div className="font-bold text-ink">
                    {isAr ? 'الفواتير وإيصالات الكاشير' : 'Invoices & Receipts'}
                  </div>
                  <div className="text-ink-muted text-[11px]">
                    {isAr ? 'طباعة وترويس الفاتورة بشعارك ورقمك الضريبي وبياناتك الرسمية.' : 'Printed & digital tax receipts branded with your exact credentials.'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-mist-gray/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-3.5 h-3.5 text-ink" />
                </div>
                <div>
                  <div className="font-bold text-ink">
                    {isAr ? 'النطاق المخصص أو الفرعي' : 'Custom Subdomain'}
                  </div>
                  <div className="text-ink-muted text-[11px]" dir="ltr">
                    your-salon.rashx.org
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Themed Card Preview (5 cols) */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-xs rounded-3xl p-5 border shadow-2xl transition-all duration-300 space-y-4"
              style={{
                backgroundColor: activeTheme.secondary,
                borderColor: `${activeTheme.primary}40`,
              }}
            >
              {/* Salon Branded Header */}
              <div className="text-center space-y-2 border-b pb-3" style={{ borderColor: `${activeTheme.primary}30` }}>
                <div
                  className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-sm transition-colors duration-300"
                  style={{ backgroundColor: activeTheme.primary }}
                >
                  LOGO
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">
                    {isAr ? 'صالون لمسة الجمال الفاخر' : 'Luxury Touch Beauty Studio'}
                  </div>
                  <div className="text-[10px] text-ink-muted" dir="ltr">
                    salon-beauty.rashx.org
                  </div>
                </div>
              </div>

              {/* Service Mock Item */}
              <div className="p-3 rounded-2xl bg-white shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-ink">
                  <span>{isAr ? 'تصفيف شعر وعناية' : 'Hair Styling & Care'}</span>
                  <span className="font-mono" style={{ color: activeTheme.primary }}>
                    180 ر.س
                  </span>
                </div>
                <div className="text-[10px] text-ink-muted">
                  {isAr ? 'المدة: 45 دقيقة • مع سارة الأخصائية' : 'Duration: 45 min • with Sarah'}
                </div>
                <button
                  type="button"
                  className="w-full py-2 text-xs font-bold text-white rounded-xl shadow-xs transition-colors duration-300"
                  style={{ backgroundColor: activeTheme.primary }}
                >
                  {isAr ? 'تأكيد الحجز الفوري' : 'Confirm Appointment'}
                </button>
              </div>

              {/* Bottom Tag */}
              <div className="text-center text-[10px] text-ink-muted/80">
                {isAr ? '✓ تعمل بهدوء بواسطة راش إكس' : '✓ Powered securely by RashX'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhiteLabelSection;

