import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Hero,
  ProblemSolution,
  FourPillarsSubdomain,
  FeatureGrid,
  ZatcaSection,
  WhiteLabelSection,
  TargetFacilities,
  StepsTimeline,
  SecuritySnapshot,
  Testimonials,
  FAQ,
  CTABanner,
  LeadForm,
} from '@/components/sections';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generatePageMetadata,
  getSoftwareApplicationSchema,
  getOrganizationSchema,
  getWebSiteSchema,
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
    title: dict.seo.home.title,
    description: dict.seo.home.description,
    locale,
    pathname: '',
    keywords: dict.seo.home.keywords,
  });
}

export default async function MarketingHomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const isAr = locale === 'ar';

  return (
    <>
      {/* Schemas: SoftwareApplication (Organization and WebSite are also linked) */}
      <JsonLd data={getSoftwareApplicationSchema(locale)} id="software-app-schema" />
      <JsonLd data={getOrganizationSchema()} id="org-schema-home" />
      <JsonLd data={getWebSiteSchema(locale)} id="website-schema-home" />

      {/* 1) Hero: H1 + وصف من سطرين + زرّين + mockup للوحة التحكم + شريط ثقة */}
      <Hero locale={locale} />

      {/* 2) المشكلة والحل: 3 مشاكل شائعة وكيف تحلها RashX */}
      <ProblemSolution locale={locale} />

      {/* 3) "منظومة كاملة لكل منشأة": 4 بطاقات مع شرح النطاق الفرعي */}
      <FourPillarsSubdomain locale={locale} />

      {/* 4) الأنظمة العشرة في FeatureGrid مع روابط لكل صفحة */}
      <FeatureGrid locale={locale} />

      {/* 5) قسم الفوترة الإلكترونية ZATCA المرحلة الثانية مع زر لصفحتها */}
      <ZatcaSection locale={locale} />

      {/* 6) White Label: تخصيص وتغيير الشعار والألوان */}
      <WhiteLabelSection locale={locale} />

      {/* 7) لمن نصلح: صالون نسائي، رجالي، مركز تجميل، سبا */}
      <TargetFacilities locale={locale} />

      {/* 8) كيف نبدأ: 3 خطوات (اطلب عرضًا → نجهز منظومتك → ابدأ التشغيل) */}
      <StepsTimeline locale={locale} />

      {/* 9) أمان البيانات (مختصر) */}
      <SecuritySnapshot locale={locale} />

      {/* 10) آراء العملاء (placeholder [TODO]) */}
      <Testimonials locale={locale} />

      {/* 11) FAQ من 6 أسئلة مع FAQPage schema */}
      <FAQ locale={locale} />

      {/* 12) CTA ختامي + الفورم */}
      <section className="py-16 md:py-24 bg-white" id="demo-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <CTABanner locale={locale} />

          <div className="pt-4">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                {isAr
                  ? 'احجز جلستك الاستشارية والعرض التجريبي الآن'
                  : 'Book Your Free Consultation & Live Walkthrough'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'املأ بيانات منشأتك وسيتواصل معك مستشار سعودي متخصص لتجهيز بيئتك السحابية.'
                  : 'Provide your facility details and a specialist will contact you to set up your sandbox.'}
              </p>
            </div>

            <LeadForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
