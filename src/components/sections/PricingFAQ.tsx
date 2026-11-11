'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFAQPageSchema } from '@/lib/seo';
import { PRICING_CONFIG } from '@/config/pricing';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface PricingFAQProps {
  locale?: Locale;
}

export const PricingFAQ: React.FC<PricingFAQProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const schemaItems = PRICING_CONFIG.faqs.map((f) => ({
    question: isAr ? f.questionAr : f.questionEn,
    answer: isAr ? f.answerAr : f.answerEn,
  }));

  return (
    <section className="py-16 md:py-24 bg-white border-t border-mist-gray" id="pricing-faq">
      {/* Inject FAQPage Schema */}
      <JsonLd data={getFAQPageSchema(schemaItems)} id="pricing-faq-schema" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Guarantee Banner [TODO] */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dusty-blue/15 via-[#FAFBFB] to-warm-peach/15 border border-mist-gray shadow-xs text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-mist-gray mx-auto flex items-center justify-center text-emerald-600 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-ink">
            {isAr ? 'تجربة مجانية لمدة 14 يومًا بدون مخاطرة' : '14-Day Risk-Free Full Trial'}
          </h3>

          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto leading-relaxed">
            {isAr ? PRICING_CONFIG.guaranteeNoteAr : PRICING_CONFIG.guaranteeNoteEn}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {isAr ? 'بدون بطاقة ائتمان [TODO]' : 'No Credit Card [TODO]'}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {isAr ? 'وصول لجميع الأنظمة العشرة' : 'All 10 Systems Unlocked'}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-ink">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {isAr ? 'دعم فني سعودي خلال التجربة' : 'Saudi Support During Trial'}
            </span>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'الأسئلة الشائعة حول الأسعار والدفع' : 'Pricing & Billing FAQ'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight leading-tight">
            {isAr
              ? 'إجابات واضحة حول الفواتير والاشتراكات وطرق الدفع'
              : 'Common Questions About Subscriptions & Payments'}
          </h2>

          <p className="text-xs sm:text-sm font-normal leading-relaxed text-ink-muted">
            {isAr
              ? 'كل ما تحتاج لمعرفته حول خيارات الدفع المحلية في السعودية وسياسات الترقية والإلغاء.'
              : 'Everything you need to know about KSA payment channels, VAT, and upgrades.'}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {PRICING_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-mist-gray bg-[#FAFBFB] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4 px-6 text-start flex items-center justify-between gap-4 font-semibold text-ink text-xs sm:text-sm hover:text-dusty-blue transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{isAr ? faq.questionAr : faq.questionEn}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-ink-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-dusty-blue' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm font-normal text-ink-muted leading-relaxed border-t border-mist-gray/40 animate-in fade-in duration-200">
                    {isAr ? faq.answerAr : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;

