import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { CookieConsentBanner } from '@/components/layout/CookieConsentBanner';
import { AnalyticsScripts } from '@/components/seo/AnalyticsScripts';
import { JsonLd } from '@/components/seo/JsonLd';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/seo';
import { LOCALES, Locale, isSupportedLocale, getDirection } from '@/i18n/config';

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dir = getDirection(locale);

  return (
    <div lang={locale} dir={dir} className="min-h-screen flex flex-col bg-white text-ink">
      {/* Global Structured Data */}
      <JsonLd data={getOrganizationSchema()} id="org-schema" />
      <JsonLd data={getWebSiteSchema(locale)} id="website-schema" />

      {/* Global Sticky Header */}
      <Header locale={locale} />

      {/* Main Page Content */}
      <main className="flex-1 w-full focus:outline-none">
        {children}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer locale={locale} />

      {/* Floating Interactive WhatsApp CTA */}
      <FloatingWhatsApp locale={locale} />

      {/* Saudi PDPL Compliant Cookie Consent Banner */}
      <CookieConsentBanner locale={locale} />

      {/* Analytics & Pixel Scripts (GA4, Meta, Snapchat, TikTok) */}
      <AnalyticsScripts />
    </div>
  );
}

