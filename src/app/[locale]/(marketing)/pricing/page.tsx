import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Breadcrumbs,
  PricingTable,
  DetailedPricingMatrix,
  CustomPlanSection,
  PricingFAQ,
  CTABanner,
  LeadForm,
} from '@/components/sections';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generatePageMetadata,
  getSoftwareApplicationSchema,
} from '@/lib/seo';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/translations';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const dict = getDictionary(locale);

  return generatePageMetadata({
    title: dict.seo.pricing.title,
    description: dict.seo.pricing.description,
    locale,
    pathname: '/pricing',
    keywords: dict.seo.pricing.keywords,
  });
}

export default async function PricingPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const isAr = locale === 'ar';

  const breadcrumbsList = [
    { label: isAr ? 'الأسعار والباقات' : 'Pricing Plans', href: '/pricing' },
  ];

  return (
    <>
      {/* Schemas: SoftwareApplication with Offers (SAR) + Breadcrumbs */}
      <JsonLd
        data={getSoftwareApplicationSchema(locale)}
        id="software-app-offers-pricing"
      />

      {/* Visual Breadcrumbs */}
      <div className="bg-[#FAFBFB] border-b border-mist-gray pt-24 sm:pt-28">
        <Breadcrumbs locale={locale} items={breadcrumbsList} />
      </div>

      {/* 1. Main Pricing Table (H1: باقات RashX المناسبة لحجم منشأتك) */}
      <PricingTable
        locale={locale}
        isH1={true}
        titleAr="باقات RashX المناسبة لحجم منشأتك"
        titleEn="RashX Plans Tailored for Your Salon Size"
        subtitleAr="3 باقات مرنة بالريال السعودي تلائم المنشآت الفردية ومراكز النمو وسلاسل الفروع الكبرى مع تجربة مجانية 14 يومًا بدون بطاقة ائتمان."
        subtitleEn="3 flexible tiers in SAR for independent studios, fast-growing beauty centers, and multi-branch chains with a 14-day risk-free trial."
      />

      {/* 2. Detailed Features Comparison Matrix */}
      <DetailedPricingMatrix locale={locale} />

      {/* 3. "Need a Custom Plan?" Section for Multi-Branch Chains */}
      <CustomPlanSection locale={locale} />

      {/* 4. Guarantee [TODO] & Pricing/Payment FAQ (Mada, Bank Transfer, Apple Pay [TODO]) */}
      <PricingFAQ locale={locale} />

      {/* 5. Closing CTA + Interactive Lead Booking Form */}
      <section className="py-16 md:py-24 bg-[#FAFBFB] border-t border-mist-gray" id="demo-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <CTABanner locale={locale} />

          <div className="pt-4">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-ink tracking-tight">
                {isAr
                  ? 'احجز عرضًا تجريبيًا مجانيًا لمنشأتك'
                  : 'Book a Free Personalized Walkthrough'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted font-normal">
                {isAr
                  ? 'اختر الباقة المناسبة وسيقوم مستشارنا بتهيئة بيئة الاختبار لصالونك بدون أي رسوم أو التزام مالي.'
                  : 'Select your preferred tier and a specialist will set up your sandbox instance with zero risk.'}
              </p>
            </div>

            <LeadForm locale={locale} defaultPlan={isAr ? 'الباقة الاحترافية' : 'Growth Plan'} />
          </div>
        </div>
      </section>
    </>
  );
}

