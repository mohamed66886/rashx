import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  Rss,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import { generatePageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BLOG_POSTS } from '@/data/blog';
import { BlogArchiveClient } from '@/components/sections/BlogArchiveClient';

interface BlogIndexProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: BlogIndexProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'مدونة راش إكس – مقالات وأدلة إدارة الصالونات والمشاغل | RashX'
      : 'RashX Blog – Saudi Salon, Spa & Clinic Management Guides',
    description: isAr
      ? 'مقالات وأدلة متخصصة لأصحاب الصالونات ومراكز التجميل في السعودية: اختيار البرنامج الأنسب، الفوترة الإلكترونية ZATCA، برامج ولاء العملاء، وحماية البيانات PDPL.'
      : 'Expert guides and operational blueprints for Saudi beauty salon and spa owners: choosing software, ZATCA e-invoicing, client loyalty, and PDPL compliance.',
    keywords: [
      'مدونة إدارة الصالونات',
      'كيف تختار برنامج لإدارة صالونك',
      'دليل الفوترة الإلكترونية للصالونات في السعودية',
      'كيف تزيد ولاء عملاء الصالون',
      'نظام حماية البيانات الشخصية المشاغل',
      'إدارة صالونات التجميل في السعودية',
    ],
    pathname: '/blog',
    noIndex: false,
  });
}

export default async function BlogIndexPage({ params }: BlogIndexProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'المدونة والمعرفة' : 'Blog', item: `/${locale}/blog` },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="blog-breadcrumb-schema" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12">
        {/* Breadcrumb Navigation & RSS Feed Link */}
        <div className="flex items-center justify-between gap-4 text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-ink-muted">
            <Link href={`/${locale}`} className="hover:text-ink transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {isAr ? 'المدونة والمعرفة' : 'Blog'}
            </span>
          </nav>

          {/* RSS Feed Button */}
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-mist-gray hover:border-[#FFA500] hover:text-[#FF8C00] text-ink-muted text-xs font-semibold transition-all shadow-2xs"
            title={isAr ? 'خلاصة الأخبار RSS' : 'RSS Feed'}
          >
            <Rss className="w-3.5 h-3.5 text-[#FFA500]" />
            <span className="font-mono text-[11px]">RSS Feed</span>
          </a>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <BookOpen className="w-4 h-4 text-dusty-blue" />
            <span>
              {isAr
                ? 'مركز المعرفة والأدلة التكتيكية لقطاع التجميل السعودي'
                : 'Knowledge Hub & Tactical Blueprints for Saudi Salons'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {isAr
              ? 'أدلة ورؤى تشغيلية لرواد قطاع التجميل في المملكة'
              : 'Actionable Insights for Saudi Beauty Leaders & Salon Owners'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal">
            {isAr
              ? 'شروحات عملية موثوقة تغطي كيفية اختيار أنظمة الصالونات، متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA)، استراتيجيات مضاعفة ولاء العملاء، والامتثال الصارم لنظام حماية البيانات الشخصية (PDPL).'
              : 'Practical, in-depth blueprints covering salon management selection, ZATCA Phase 2 compliance, client loyalty strategies, and Saudi PDPL data protection.'}
          </p>
        </div>

        {/* Interactive Blog Archive with Category Filtering, Search, and Pagination */}
        <BlogArchiveClient posts={BLOG_POSTS} locale={locale} />

        {/* Closing CTA */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'تطبيق عملي فوري' : 'Turn Knowledge into Action'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {isAr
                ? 'جاهز لتطبيق هذه المعايير على صالونك باحترافية؟'
                : 'Ready to Implement These Standards in Your Salon?'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto font-normal">
              {isAr
                ? 'احجز جلسة عرض تجريبي مدتها 20 دقيقة لنشرح لك كيف توفر راش إكس الفوترة الإلكترونية، أمان البيانات، وإدارة العمولات آلياً لصالونك، مع تجربة مجانية لمدة 14 يومًا.'
                : 'Book a 20-minute tailored walkthrough and see how RashX automates e-invoicing, staff commissions, and PDPL compliance. Includes a 14-day free trial.'}
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
                  ? 'مرحبًا راش إكس، أود الاستفسار عن تفاصيل مقالات مدونة المنصة وحجز عرض تجريبي.'
                  : 'Hello RashX, I would like to inquire about your blog insights and demo.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'تواصل معنا عبر واتساب' : 'WhatsApp Consultation'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
