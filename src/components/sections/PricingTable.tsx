'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react';
import { PRICING_CONFIG } from '@/config/pricing';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface PricingTableProps {
  locale?: Locale;
  titleAr?: string;
  titleEn?: string;
  subtitleAr?: string;
  subtitleEn?: string;
  isH1?: boolean;
}

export const PricingTable: React.FC<PricingTableProps> = ({
  locale = DEFAULT_LOCALE,
  titleAr,
  titleEn,
  subtitleAr,
  subtitleEn,
  isH1 = false,
}) => {
  const isAr = locale === 'ar';
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const headingText = isAr
    ? titleAr || 'باقات مرنة تناسب صالونك الفردي وسلاسل الفروع'
    : titleEn || 'Flexible Plans for Studios and Multi-Branch Chains';

  const subtitleText = isAr
    ? subtitleAr ||
      'اختر الباقة المناسبة لمنشأتك مع تجربة مجانية لمدة 14 يومًا لجميع الأنظمة العشرة وبدون بطاقة ائتمان.'
    : subtitleEn ||
      'Choose the right tier for your business with a 14-day free trial on all 10 management systems.';

  return (
    <section className="py-16 md:py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'خطط اشتراك شفافة بالريال السعودي' : 'Transparent Subscriptions in SAR'}</span>
          </div>

          {isH1 ? (
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
              {headingText}
            </h1>
          ) : (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-tight leading-tight">
              {headingText}
            </h2>
          )}

          <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
            {subtitleText}
          </p>

          {/* Billing Switcher (Monthly / Annual) */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-mist-gray/60 border border-mist-gray mt-4">
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-ink shadow-xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              <span>{isAr ? 'الدفع السنوي' : 'Annual Billing'}</span>
              <span className="ms-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-dusty-blue/30 text-ink">
                {isAr ? 'وفر إضافي [TODO]' : 'Save [TODO]'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-ink shadow-xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {isAr ? 'الدفع الشهري' : 'Monthly Billing'}
            </button>
          </div>
        </div>

        {/* VAT Notice Box */}
        <div className="max-w-2xl mx-auto mb-10 p-3 rounded-2xl bg-mist-gray/30 border border-mist-gray text-center text-xs text-ink-muted flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-dusty-blue shrink-0" />
          <span>{isAr ? PRICING_CONFIG.vatNoticeAr : PRICING_CONFIG.vatNoticeEn}</span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_CONFIG.plans.map((plan) => {
            const price =
              billingCycle === 'annual' ? plan.priceAnnualSar : plan.priceMonthlySar;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-white border-2 border-dusty-blue shadow-2xl scale-[1.02] z-10'
                    : 'bg-[#FAFBFB] border border-mist-gray hover:border-dusty-blue/40 shadow-xs'
                }`}
              >
                {/* Popular Badge */}
                {plan.badgeAr && (
                  <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-dusty-blue text-black text-xs font-medium shadow-xs">
                    {isAr ? plan.badgeAr : plan.badgeEn}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-ink">
                      {isAr ? plan.nameAr : plan.nameEn}
                    </h3>
                    <p className="text-xs font-normal text-ink-muted mt-1 leading-relaxed">
                      {isAr ? plan.taglineAr : plan.taglineEn}
                    </p>
                    <div className="mt-3 inline-block px-2.5 py-1 rounded-lg bg-mist-gray/50 text-[11px] font-medium text-ink">
                      {isAr ? plan.targetFacilityAr : plan.targetFacilityEn}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="border-y border-mist-gray/60 py-4 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink font-mono">
                        {price}
                      </span>
                      <span className="text-xs font-normal text-ink-muted">
                        {isAr ? PRICING_CONFIG.currencySymbolAr : PRICING_CONFIG.currencySymbolEn}
                        {' / '}
                        {isAr ? 'شهرياً' : 'month'}
                      </span>
                    </div>
                    <p className="text-[11px] font-normal text-ink-muted">
                      {isAr ? plan.billingNoteAr : plan.billingNoteEn}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="text-xs font-medium text-ink uppercase tracking-wider">
                      {isAr ? 'المميزات والأنظمة المشمولة:' : 'Included Features & Systems:'}
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2.5 text-xs ${
                            feat.included ? 'text-ink font-medium' : 'text-ink-muted/50'
                          }`}
                        >
                          {feat.included ? (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 text-ink-muted/40 shrink-0 mt-0.5" />
                          )}
                          <span className={feat.highlight ? 'font-semibold text-ink' : ''}>
                            {isAr ? feat.textAr : feat.textEn}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8 mt-6 border-t border-mist-gray/60">
                  <Link
                    href={`/${locale}${plan.ctaHref}`}
                    className={`w-full inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-semibold rounded-2xl transition-all shadow-xs ${
                      plan.isPopular
                        ? 'bg-dusty-blue hover:bg-dusty-blue/90 text-black shadow-md'
                        : 'bg-white hover:bg-mist-gray/50 text-ink border border-mist-gray'
                    }`}
                  >
                    {isAr ? plan.ctaLabelAr : plan.ctaLabelEn}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Trial Guarantee Footer */}
        <div className="mt-12 text-center text-xs text-ink-muted">
          <p>{isAr ? PRICING_CONFIG.guaranteeNoteAr : PRICING_CONFIG.guaranteeNoteEn}</p>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;

