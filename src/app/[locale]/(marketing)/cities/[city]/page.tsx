import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Sparkles,
  Building2,
  CalendarCheck,
  CreditCard,
  Users,
  ShieldCheck,
  Clock,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Store,
  BadgeCheck,
  Calendar,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getFAQPageSchema,
  getBreadcrumbSchema,
  getCityServiceSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { SAUDI_CITIES, SUPPORTED_CITY_SLUGS } from '@/data/cities';

interface CityPageProps {
  params: Promise<{ locale: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; city: string }[] = [];
  for (const locale of LOCALES) {
    for (const city of SUPPORTED_CITY_SLUGS) {
      params.push({ locale, city });
    }
  }
  return params;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { locale: rawLocale, city: citySlug } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const city = SAUDI_CITIES[citySlug];
  if (!city) {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج إدارة صالونات في السعودية | RashX'
        : 'Salon Management Software in Saudi Arabia | RashX',
      description: isAr
        ? 'منظومة إدارة الصالونات ومراكز التجميل في المملكة العربية السعودية.'
        : 'Salon and spa management cloud software in Saudi Arabia.',
      pathname: `/cities/${citySlug}`,
      noIndex: true,
    });
  }

  // Enforce noindex if unique content is not present
  const hasUnique = city.hasUniqueContent === true;

  return generatePageMetadata({
    locale,
    title: isAr ? city.titleAr : city.titleEn,
    description: isAr ? city.descriptionAr : city.descriptionEn,
    keywords: city.keywords,
    pathname: `/cities/${citySlug}`,
    noIndex: !hasUnique,
  });
}

export default async function CityLandingPage({ params }: CityPageProps) {
  const { locale: rawLocale, city: citySlug } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const city = SAUDI_CITIES[citySlug];
  if (!city) {
    notFound();
  }

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'المدن المغطاة' : 'Cities', item: `/${locale}/cities/${citySlug}` },
    { name: isAr ? city.nameAr : city.nameEn, item: `/${locale}/cities/${citySlug}` },
  ];

  const faqSchemaData = city.faqs.map((faq) => ({
    question: isAr ? faq.questionAr : faq.questionEn,
    answer: isAr ? faq.answerAr : faq.answerEn,
  }));

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      {/* Structured Data: Service (with areaServed: City) + FAQPage + Breadcrumbs */}
      <JsonLd
        data={getCityServiceSchema({
          cityNameAr: city.nameAr,
          cityNameEn: city.nameEn,
          descriptionAr: city.descriptionAr,
          descriptionEn: city.descriptionEn,
          citySlug,
          locale,
        })}
        id="city-service-schema"
      />
      <JsonLd data={getFAQPageSchema(faqSchemaData)} id="city-faq-schema" />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="city-breadcrumb-schema" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-16 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? `صالونات ${city.nameAr}` : `${city.nameEn} Salons`}
          </span>
        </nav>

        {/* Section 1: Hero */}
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <MapPin className="w-4 h-4 text-dusty-blue" />
            <span>
              {isAr ? `${city.regionAr} • حلول راش إكس المعتمدة` : `${city.regionEn} • Certified RashX Systems`}
            </span>
          </div>

          {/* Exact H1 requested */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {isAr ? city.h1Ar : city.h1En}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal">
            {isAr ? city.descriptionAr : city.descriptionEn}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/demo`}
              className="px-6 py-3.5 text-sm font-semibold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? `احجز عرضًا تجريبيًا في ${city.nameAr}` : `Book Free ${city.nameEn} Demo`}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? `مرحبًا راش إكس، أود الاستفسار عن تشغيل المنصة في مدينة ${city.nameAr}.`
                  : `Hello RashX, I would like to inquire about operating in ${city.nameEn}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ink-muted">
            <div className="flex items-center gap-1.5 font-semibold text-ink">
              <Store className="w-4 h-4 text-dusty-blue" />
              <span>{isAr ? 'نطاق فرعي مستقل (*.rashx.org)' : 'Dedicated Subdomain'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-ink">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>{isAr ? 'حماية بيانات العميلات (PDPL)' : 'Saudi PDPL Privacy'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-ink">
              <BadgeCheck className="w-4 h-4 text-[#F59E0B]" />
              <span>{isAr ? 'فوترة ZATCA المرحلة 2' : 'ZATCA Phase 2 Ready'}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Prominent Districts & Neighborhoods in this City */}
        <div className="rounded-3xl bg-white border border-mist-gray p-8 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-dusty-blue uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>{isAr ? 'تغطية الأحياء والمناطق' : 'District & Neighborhood Coverage'}</span>
            </div>
            <h2 className="text-2xl font-semibold text-ink">
              {isAr
                ? `جاهزون لخدمة صالونات ومشاغل أرقى أحياء ${city.nameAr}`
                : `Powering Salons & Spas Across ${city.nameEn} Districts`}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted font-normal">
              {isAr
                ? `سواء كنت تدير مشغلاً نسائياً فاخراً أو صالون حلاقة رجالي أو مركز سبا متعدد الفروع، نوفر لك بنية سحابية متوافقة مع متطلبات أحياء ${city.nameAr}.`
                : `From boutique beauty studios to multi-chair barbershops and wellness chains, RashX delivers resilient cloud tools tailored to ${city.nameEn}.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {(isAr ? city.neighborhoodsAr : city.neighborhoodsEn).map((dist, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-[#FAFBFB] border border-mist-gray text-xs font-medium text-ink hover:border-dusty-blue/40 transition-colors"
              >
                {dist}
              </span>
            ))}
          </div>
        </div>

        {/* Section 3: Market Context & Unique Observation + [TODO] Note */}
        <div className="rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray text-xs font-medium text-ink">
              <TrendingUp className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'خصوصية السوق المحلي' : 'Local Market Dynamics'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
              {isAr
                ? `ملاحظات حول سوق التجميل في ${city.nameAr}`
                : `Beauty & Wellness Market Profile in ${city.nameEn}`}
            </h2>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
              {isAr ? city.marketContextAr : city.marketContextEn}
            </p>

            {/* Explicit [TODO] Note for Real Statistical Data */}
            <div className="p-4 rounded-2xl bg-mist-gray/40 border border-dusty-blue/40 flex items-start gap-3 text-xs">
              <AlertCircle className="w-4 h-4 text-dusty-blue shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-ink block">
                  {isAr ? 'ملاحظة توثيق البيانات الميدانية:' : 'Market Data Notice:'}
                </span>
                <p className="text-ink-muted font-mono text-[11px] leading-relaxed">
                  {isAr ? city.marketTodoAr : city.marketTodoEn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Tailored Systems & Services in this City */}
        <div className="space-y-6">
          <div className="text-xs font-medium text-dusty-blue uppercase tracking-wider">
            {isAr ? 'الأنظمة والخدمات الأكثر طلباً' : 'In-Demand Systems & Workflows'}
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
            {isAr
              ? `الأنظمة التشغيلية الأكثر طلباً لصالونات ${city.nameAr}`
              : `Key Software Solutions Tailored for ${city.nameEn} Establishments`}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {city.keySystems.map((sys, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-sm transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-mist-gray/80 flex items-center justify-center text-dusty-blue font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-ink">
                  {isAr ? sys.titleAr : sys.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
                  {isAr ? sys.descAr : sys.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Local Peak Seasons (مواسم الذروة المحلية) */}
        <div className="rounded-3xl bg-white border border-mist-gray p-8 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-dusty-blue uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>{isAr ? 'مواسم الذروة المحلية' : 'Local Peak Seasons'}</span>
            </div>
            <h2 className="text-2xl font-semibold text-ink">
              {isAr
                ? `مواسم الذروة والإقبال الكثيف لصالونات ${city.nameAr}`
                : `Peak Demand Seasons for Salons in ${city.nameEn}`}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted font-normal">
              {isAr
                ? 'كيف تساعد راش إكس منشأتك على استيعاب الإقبال القياسي ومضاعفة العوائد في الفترات الموسمية.'
                : 'How RashX equips your facility to master peak holiday and seasonal demand without collisions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {city.peakSeasons.map((season, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-dusty-blue">
                    {isAr ? season.seasonAr : season.seasonEn}
                  </span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-mist-gray text-ink font-medium">
                    {isAr ? season.periodAr : season.periodEn}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
                  {isAr ? season.descAr : season.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Dedicated Local FAQ */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-medium text-dusty-blue uppercase tracking-wider">
              {isAr ? 'الأسئلة الشائعة المحلية' : 'Local FAQ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              {isAr
                ? `أسئلة شائعة حول صالونات ومراكز التجميل في ${city.nameAr}`
                : `Frequently Asked Questions for ${city.nameEn} Salons`}
            </h2>
          </div>

          <div className="space-y-3">
            {city.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/30 transition-colors space-y-2"
              >
                <h3 className="text-sm font-semibold text-ink flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-dusty-blue shrink-0 mt-0.5" />
                  <span>{isAr ? faq.questionAr : faq.questionEn}</span>
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pe-4 ps-6 font-normal">
                  {isAr ? faq.answerAr : faq.answerEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Other Saudi Cities Navigation */}
        <div className="space-y-4">
          <div className="text-xs font-medium text-dusty-blue uppercase tracking-wider">
            {isAr ? 'المدن والمناطق الأخرى في المملكة' : 'Other Saudi Cities Covered'}
          </div>
          <div className="flex flex-wrap gap-2.5">
            {SUPPORTED_CITY_SLUGS.filter((s) => s !== citySlug).map((otherSlug) => {
              const otherCity = SAUDI_CITIES[otherSlug];
              return (
                <Link
                  key={otherSlug}
                  href={`/${locale}/cities/${otherSlug}`}
                  className="px-4 py-2.5 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue text-xs font-medium text-ink transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-dusty-blue" />
                  <span>{isAr ? otherCity.nameAr : otherCity.nameEn}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 8: Closing CTA */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? `انطلق بصالونك في ${city.nameAr}` : `Launch Your ${city.nameEn} Salon`}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {isAr
                ? `جاهز لترقية تشغيل صالونك في ${city.nameAr}؟`
                : `Ready to Modernize Your Salon Operations in ${city.nameEn}?`}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto font-normal">
              {isAr
                ? `اكتشف كيف تدير راش إكس حجوزات صالونك ومبيعاته وعمولات كوادره في ${city.nameAr} في عرض تجريبي حي مدته 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.`
                : `Experience how RashX optimizes appointments, staff payouts, and ZATCA Phase 2 compliance for your ${city.nameEn} facility in a 20-minute tailored walkthrough. Includes a 14-day free trial.`}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              href={`/${locale}/demo`}
              className="px-6 py-3.5 text-sm font-semibold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? 'احجز عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book Free 20-Min Demo'}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? `مرحبًا راش إكس، أود الاستفسار عن تشغيل المنصة في مدينة ${city.nameAr}.`
                  : `Hello RashX, I would like to inquire about operating in ${city.nameEn}.`
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
