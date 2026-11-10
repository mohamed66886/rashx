import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getFAQPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { RASHX_FAQS } from '@/data/faqs';
import { FAQAccordionClient } from '@/components/sections/FAQAccordionClient';

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'الأسئلة الشائعة عن RashX – إجابات شاملة وموثوقة | RashX'
      : 'Frequently Asked Questions about RashX | RashX',
    description: isAr
      ? 'إجابات دقيقة وموجزة عن منصة راش إكس لإدارة الصالونات ومراكز التجميل في السعودية: الأسعار، الفوترة الإلكترونية ZATCA، الأمان، التفعيل، وWhite Label.'
      : 'Comprehensive, accurate answers about RashX salon & spa software: pricing, ZATCA e-invoicing Phase 2, PDPL security, onboarding, and White Label.',
    keywords: [
      'الأسئلة الشائعة راش إكس',
      'أسئلة برنامج الصالونات',
      'فوترة زاتكا مشاغل',
      'أسعار راش إكس',
      'وايت ليبل صالونات',
      'برنامج صالونات السعودية FAQ',
    ],
    pathname: '/faq',
    noIndex: false,
  });
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'الأسئلة الشائعة عن RashX' : 'FAQ', item: `/${locale}/faq` },
  ];

  // Full complete FAQPage schema containing all 24 questions & answers
  const faqSchemaData = RASHX_FAQS.map((faq) => ({
    question: isAr ? faq.questionAr : faq.questionEn,
    answer: isAr ? faq.answerAr : faq.answerEn,
  }));

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      <JsonLd data={getFAQPageSchema(faqSchemaData)} id="faq-hub-schema" />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="faq-breadcrumb-schema" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? 'الأسئلة الشائعة عن RashX' : 'Frequently Asked Questions'}
          </span>
        </div>

        {/* Interactive Client Accordion with In-Page Search & Category Tabs */}
        <FAQAccordionClient locale={locale} />
      </div>
    </div>
  );
}
