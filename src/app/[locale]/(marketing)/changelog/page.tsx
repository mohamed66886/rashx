import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Rocket,
  ArrowRight,
  PhoneCall,
  Clock,
  Rss,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getBreadcrumbSchema,
  getNewsArticleSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { CHANGELOG_ITEMS } from '@/data/changelog';
import { ChangelogTimelineClient } from '@/components/sections/ChangelogTimelineClient';

interface ChangelogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ChangelogPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'سجل التحديثات والأخبار – إطلاقات وشراكات راش إكس | RashX'
      : 'Changelog & News – Product Releases & Partnerships | RashX',
    description: isAr
      ? 'سجل التحديثات والأخبار الرسمية لمنظومة راش إكس (RashX): إطلاق 2026، ترقيات الفوترة الإلكترونية ZATCA، شراكات بوابات الدفع مدى و Apple Pay، ومحرك ولاء العملاء.'
      : 'Official product changelog, release notes, and partnerships for RashX in Saudi Arabia: 2026 launch, ZATCA e-invoicing updates, and loyalty engines.',
    keywords: [
      'تحديثات راش إكس',
      'إطلاق RashX 2026',
      'سجل تحديثات برنامج الصالونات',
      'شراكات راش إكس',
      'تحديثات الفوترة الإلكترونية للصالونات',
      'RashX Changelog',
      'RashX News',
    ],
    pathname: '/changelog',
    noIndex: false,
  });
}

export default async function ChangelogPage({ params }: ChangelogPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    {
      name: isAr ? 'سجل التحديثات والأخبار' : 'Changelog & News',
      item: `/${locale}/changelog`,
    },
  ];

  const pageUrl = `${SITE_CONFIG.url}/${locale}/changelog`;

  // Build NewsArticle Schema for each changelog item
  const newsSchemas = CHANGELOG_ITEMS.map((item) =>
    getNewsArticleSchema({
      headline: isAr ? item.titleAr : item.titleEn,
      description: isAr ? item.descriptionAr : item.descriptionEn,
      url: `${pageUrl}#${item.id}`,
      datePublished: item.date,
      dateModified: item.date,
      category: isAr ? item.categoryAr : item.categoryEn,
      locale,
    })
  );

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      {/* Schema.org NewsArticle for each item */}
      {newsSchemas.map((schema, idx) => (
        <JsonLd
          key={idx}
          data={schema}
          id={`changelog-news-schema-${CHANGELOG_ITEMS[idx].id}`}
        />
      ))}
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="changelog-breadcrumb-schema" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-16 space-y-12">
        {/* Breadcrumb Navigation & RSS link */}
        <div className="flex items-center justify-between gap-4 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-ink-muted">
            <Link href={`/${locale}`} className="hover:text-ink transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {isAr ? 'سجل التحديثات والأخبار' : 'Changelog'}
            </span>
          </nav>

          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-mist-gray hover:border-[#FFA500] hover:text-[#FF8C00] text-ink-muted text-xs font-semibold transition-all shadow-2xs"
            title={isAr ? 'خلاصة الأخبار RSS' : 'RSS Feed'}
          >
            <Rss className="w-3.5 h-3.5 text-[#FFA500]" />
            <span className="font-mono text-[11px]">RSS</span>
          </a>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <Rocket className="w-4 h-4 text-dusty-blue" />
            <span>
              {isAr
                ? 'سجل التحديثات والإطلاقات الرسمية • RashX Changelog'
                : 'Product Changelog & Engineering Milestones'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {isAr
              ? 'سجل التحديثات والأخبار: كل جديد في راش إكس'
              : 'Product Changelog: What’s New in RashX'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal">
            {isAr
              ? 'تتبع تطور المنصة لحظة بلحظة: الإطلاقات الكبرى، المزايا التشغيلية المضافة لكاشير الصالونات، التحسينات النظامية والأمنية، والشراكات المعتمدة في المملكة العربية السعودية.'
              : 'Follow our platform journey: major releases, new cashier workflows, regulatory and cybersecurity updates, and strategic Saudi partnerships.'}
          </p>
        </div>

        {/* Timeline Stream with Filtering */}
        <ChangelogTimelineClient items={CHANGELOG_ITEMS} locale={locale} />

        {/* Closing CTA */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl mt-16">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'تطوير مستمر لخدمة صالونك' : 'Continuous Evolution'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {isAr
                ? 'جاهز لاختبار هذه المزايا في صالونك؟'
                : 'Ready to Experience These Features in Your Facility?'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto font-normal">
              {isAr
                ? 'احجز جلسة عرض حي مدتها 20 دقيقة لنشرح لك كيف توفر راش إكس الفوترة الإلكترونية، أمان البيانات، وإدارة العمولات آلياً لصالونك، مع تجربة مجانية لمدة 14 يومًا.'
                : 'Book a 20-minute tailored walkthrough and see how RashX automates booking, ZATCA e-invoicing, and loyalty for your facility. Includes a 14-day free trial.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              href={`/${locale}/demo`}
              className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? 'احجز عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book Free 20-Min Demo'}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? 'مرحبًا راش إكس، اطلعت على سجل التحديثات وأود مناقشة تجربة المنصة لصالوني.'
                  : 'Hello RashX, I reviewed your changelog and would like to try the platform.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'تواصل عبر واتساب' : 'WhatsApp Consultation'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

