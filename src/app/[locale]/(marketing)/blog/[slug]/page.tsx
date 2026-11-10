import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  Calendar,
  RefreshCw,
  User,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Check,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getArticleSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BLOG_POSTS, BlogPost } from '@/data/blog';
import { ShareButtons } from '@/components/sections/ShareButtons';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const post of BLOG_POSTS) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return generatePageMetadata({
      locale,
      title: isAr ? 'مقال غير موجود | RashX' : 'Article Not Found | RashX',
      description: isAr ? 'المقال المطلوب غير متوفر.' : 'The requested article was not found.',
      pathname: `/blog/${slug}`,
    });
  }

  return generatePageMetadata({
    locale,
    title: isAr ? `${post.titleAr} | RashX` : `${post.titleEn} | RashX`,
    description: isAr ? post.descriptionAr : post.descriptionEn,
    keywords: post.keywords,
    pathname: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.datePublished,
    authors: [isAr ? post.authorAr : post.authorEn],
    noIndex: false,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'المدونة' : 'Blog', item: `/${locale}/blog` },
    { name: isAr ? post.titleAr : post.titleEn, item: `/${locale}/blog/${slug}` },
  ];

  // Related articles (prefer same category or other posts)
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug);
  const relatedPosts = [
    ...otherPosts.filter((p) => p.category === post.category),
    ...otherPosts.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  const articleUrl = `${SITE_CONFIG.url}/${locale}/blog/${slug}`;
  const articleTitle = isAr ? post.titleAr : post.titleEn;
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      {/* Schema.org Article + Breadcrumbs */}
      <JsonLd
        data={getArticleSchema({
          headline: articleTitle,
          description: isAr ? post.descriptionAr : post.descriptionEn,
          url: articleUrl,
          image: '/brand/social/og-share-blue.svg',
          datePublished: post.datePublished,
          dateModified: post.dateModified || post.datePublished,
          authorName: isAr ? post.authorAr : post.authorEn,
          locale,
        })}
        id="blog-post-article-schema"
      />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="blog-post-breadcrumb-schema" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/blog`} className="hover:text-ink transition-colors">
            {isAr ? 'المدونة' : 'Blog'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold truncate max-w-xs">
            {articleTitle}
          </span>
        </nav>

        {/* Article Header Card */}
        <header className="space-y-6 border-b border-mist-gray pb-8">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-mist-gray border border-mist-gray text-ink font-bold">
              {isAr ? post.categoryAr : post.categoryEn}
            </span>

            {/* Published Date */}
            <span className="text-ink-muted flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? `تاريخ النشر: ${post.datePublished}` : `Published: ${post.datePublished}`}</span>
            </span>

            {/* Modified Date (if distinct) */}
            {post.dateModified && post.dateModified !== post.datePublished && (
              <>
                <span>•</span>
                <span className="text-ink-muted flex items-center gap-1 font-mono">
                  <RefreshCw className="w-3 h-3 text-dusty-blue" />
                  <span>{isAr ? `آخر تحديث: ${post.dateModified}` : `Updated: ${post.dateModified}`}</span>
                </span>
              </>
            )}

            <span>•</span>

            {/* Read Time */}
            <span className="text-ink-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
            </span>
          </div>

          {/* Title H1 */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-ink tracking-tight leading-tight">
            {articleTitle}
          </h1>

          {/* Summary / Deck */}
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            {isAr ? post.descriptionAr : post.descriptionEn}
          </p>

          {/* Author Card + Social Share */}
          <div className="pt-4 border-t border-mist-gray/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Author Profile */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-ink text-dusty-blue flex items-center justify-center font-bold text-sm border border-dusty-blue/30 shadow-xs shrink-0">
                {post.authorType === 'founder' ? 'MR' : 'RX'}
              </div>

              <div>
                {post.authorType === 'founder' ? (
                  <Link
                    href={`/${locale}/founder`}
                    className="text-sm font-bold text-ink hover:text-dusty-blue transition-colors flex items-center gap-1"
                  >
                    <span>{isAr ? post.authorAr : post.authorEn}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-dusty-blue/20 text-dusty-blue font-bold">
                      {isAr ? 'المؤسس' : 'Founder'}
                    </span>
                  </Link>
                ) : (
                  <div className="text-sm font-bold text-ink flex items-center gap-1">
                    <span>{isAr ? post.authorAr : post.authorEn}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-mist-gray text-ink font-bold">
                      {isAr ? 'فريق RashX' : 'RashX Team'}
                    </span>
                  </div>
                )}
                <div className="text-xs text-ink-muted">
                  {isAr ? post.authorRoleAr : post.authorRoleEn}
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <ShareButtons url={articleUrl} title={articleTitle} locale={locale} />
          </div>
        </header>

        {/* Auto Table of Contents (فهرس تلقائي) */}
        {post.sections.length > 1 && (
          <nav
            aria-label={isAr ? 'محتويات الدليل' : 'Table of Contents'}
            className="p-6 sm:p-7 rounded-2xl bg-white border border-mist-gray space-y-3.5 shadow-2xs"
          >
            <div className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-dusty-blue" />
              <span>{isAr ? 'فهرس محتويات هذا الدليل' : 'Table of Contents'}</span>
            </div>

            <ol className="space-y-2 text-xs sm:text-sm">
              {post.sections.map((sec, idx) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="text-ink-muted hover:text-dusty-blue transition-colors flex items-start gap-2 py-0.5"
                  >
                    <span className="font-mono text-dusty-blue font-bold shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="font-medium hover:underline">
                      {isAr ? sec.titleAr.replace(/^\d+\.\s*/, '') : sec.titleEn.replace(/^\d+\.\s*/, '')}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Article Body Sections */}
        <article className="space-y-12">
          {post.sections.map((sec, sIdx) => (
            <React.Fragment key={sec.id}>
              <section id={sec.id} className="space-y-4 scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
                  {isAr ? sec.titleAr : sec.titleEn}
                </h2>

                <div className="space-y-3.5 text-sm sm:text-base text-ink-muted leading-relaxed">
                  {(isAr ? sec.contentAr : sec.contentEn).map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {/* Key Takeaways Box (if present) */}
                {(isAr ? sec.keyTakeawaysAr : sec.keyTakeawaysEn) && (
                  <div className="p-5 rounded-2xl bg-mist-gray/40 border border-mist-gray space-y-2.5 text-xs sm:text-sm">
                    <div className="font-bold text-ink flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      <span>{isAr ? 'أبرز النقاط المستفادة:' : 'Key Takeaways:'}</span>
                    </div>
                    <ul className="space-y-1.5 text-ink-muted ps-6 list-disc">
                      {(isAr ? sec.keyTakeawaysAr : sec.keyTakeawaysEn)!.map((item, tIdx) => (
                        <li key={tIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Callout / Regulatory Alert Box (if present) */}
                {(isAr ? sec.calloutAr : sec.calloutEn) && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-dusty-blue/10 border border-dusty-blue/30 text-xs sm:text-sm text-ink space-y-1">
                    <div className="flex items-center gap-2 font-bold text-dusty-blue">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isAr ? 'إشعار توضيحي' : 'Important Note'}</span>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {isAr ? sec.calloutAr : sec.calloutEn}
                    </p>
                  </div>
                )}
              </section>

              {/* Embedded Mid-Article CTA Banner (shown after Section 3) */}
              {sIdx === 2 && (
                <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-mist-gray/80 via-white to-mist-gray/80 border border-dusty-blue/40 shadow-xs text-center sm:text-start space-y-4 my-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dusty-blue/20 text-dusty-blue font-bold text-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isAr ? 'تجربة حية لصالونك' : 'Live Walkthrough for Your Salon'}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-ink">
                        {isAr
                          ? 'هل ترغب في تطبيق هذه المعايير في صالونك فوراً؟'
                          : 'Ready to implement these standards in your salon?'}
                      </h3>
                      <p className="text-xs text-ink-muted max-w-xl">
                        {isAr
                          ? 'احجز جلسة عرض حي مدتها 20 دقيقة لنشرح لك كيف تدير راش إكس منظومة الحجز، الفوترة الإلكترونية، ونقاط الولاء لصالونك، مع تجربة مجانية لمدة 14 يوماً.'
                          : 'Book a 20-minute tailored walkthrough and see how RashX automates booking, ZATCA e-invoicing, and loyalty for your facility. Includes a 14-day free trial.'}
                      </p>
                    </div>

                    <Link
                      href={`/${locale}/demo`}
                      className="px-5 py-3 rounded-xl bg-ink hover:bg-ink/90 text-white font-bold text-xs shadow-md transition-all shrink-0 active:scale-95"
                    >
                      {isAr ? 'احجز عرضاً تجريبياً (20 دقيقة)' : 'Book 20-Min Demo'}
                    </Link>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </article>

        {/* Bottom Social Share Bar */}
        <div className="pt-6 border-t border-mist-gray flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-ink-muted">
            {isAr
              ? 'هل أعجبك هذا الدليل؟ شاركه مع زملائك في قطاع التجميل الصالونات.'
              : 'Found this guide helpful? Share it with peers in the salon industry.'}
          </div>
          <ShareButtons url={articleUrl} title={articleTitle} locale={locale} />
        </div>

        {/* Author Bio Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-mist-gray flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-ink text-dusty-blue flex items-center justify-center font-black text-xl border border-dusty-blue/30 shadow-md shrink-0">
            {post.authorType === 'founder' ? 'MR' : 'RX'}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
              {isAr ? 'عن الكاتب' : 'About the Author'}
            </div>
            <div className="text-base font-bold text-ink">
              {isAr ? post.authorAr : post.authorEn}
            </div>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              {post.authorType === 'founder'
                ? isAr
                  ? 'مهندس برمجيات ومؤسس منصة راش إكس (RashX) في عام 2026 م، يقود الرؤية الهندسية والمعمارية لرقمنة قطاع الصالونات ومراكز التجميل في المملكة العربية السعودية.'
                  : 'Software Engineer and Founder of RashX in 2026, architecting sovereign cloud infrastructure for Saudi salons and wellness facilities.'
                : isAr
                  ? 'فريق متخصص من باحثي وخبراء تشغيل الصالونات في راش إكس يركز على تطوير تجربة العميل وزيادة الإيرادات والامتثال للأنظمة السعودية.'
                  : 'Specialized salon operations research team at RashX focused on elevating client experience, maximizing chair turnover, and ensuring regulatory compliance.'}
            </p>
            {post.authorType === 'founder' && (
              <div className="pt-1">
                <Link
                  href={`/${locale}/founder`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-dusty-blue hover:underline"
                >
                  <span>{isAr ? 'الملف التعريفي الكامل للمؤسس' : 'View Full Founder Profile'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 border-t border-mist-gray space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'مقالات وأدلة ذات صلة' : 'Related Articles & Blueprints'}
              </div>

              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-dusty-blue transition-colors"
              >
                <span>{isAr ? 'عرض كافة المقالات' : 'View All'}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/${locale}/blog/${related.slug}`}
                  className="p-5 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-2.5 block group"
                >
                  <div className="flex items-center justify-between text-[10px] text-ink-muted">
                    <span className="font-bold text-dusty-blue">
                      {isAr ? related.categoryAr : related.categoryEn}
                    </span>
                    <span className="font-mono">{related.readTimeAr}</span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-ink group-hover:text-dusty-blue transition-colors line-clamp-2 leading-snug">
                    {isAr ? related.titleAr : related.titleEn}
                  </h3>

                  <p className="text-[11px] text-ink-muted line-clamp-2 leading-relaxed">
                    {isAr ? related.descriptionAr : related.descriptionEn}
                  </p>

                  <div className="pt-2 text-[11px] font-mono text-ink-muted border-t border-mist-gray/60">
                    {related.datePublished}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Closing CTA Box */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-10 text-center space-y-5 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
              {isAr
                ? 'جاهز لتطبيق هذه الرؤى العملية على صالونك؟'
                : 'Ready to Put These Operational Insights into Practice?'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
              {isAr
                ? 'شاهد كيف تدير راش إكس الفوترة الإلكترونية ZATCA، طابور الانتظار، وعمولات الكوادر في عرض حي مخصص مدته 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                : 'Discover how RashX automates ZATCA e-invoicing, walk-in queues, and staff commissions in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
            </p>
          </div>

          <div className="pt-1 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              href={`/${locale}/demo`}
              className="px-6 py-3 text-xs sm:text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? 'احجز عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book Free 20-Min Demo'}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? `مرحبًا راش إكس، قرأت مقال "${post.titleAr}" وأود مناقشة تطبيقه في صالوني.`
                  : `Hello RashX, I read your article "${post.titleEn}" and would like to discuss it.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
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
