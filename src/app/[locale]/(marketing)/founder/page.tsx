import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Globe,
  Quote,
  Zap,
  Terminal,
  Send,
  Camera,
  FileText,
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Building2,
  Lock,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { BLOG_POSTS } from '@/data/blog';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getPersonSchema,
  getProfilePageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface FounderPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: FounderPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'م. محمد عبده رشاد البهي – مؤسس RashX'
      : 'Eng. Mohamed Abdo Rashad Elbahy – Founder of RashX',
    description: isAr
      ? 'الملف التعريفي للمهندس محمد عبده رشاد البهي، مؤسس منصة راش إكس (RashX) عام 2026 ورؤيته لرقمنة قطاع التجميل والصالونات في السعودية.'
      : 'Profile of Eng. Mohamed Abdo Rashad Elbahy, Founder of RashX in 2026 and his vision for digitizing the beauty and salon sector in Saudi Arabia.',
    keywords: [
      'محمد عبده رشاد البهي',
      'مؤسس RashX',
      'مؤسس راش إكس',
      'رقمنة قطاع التجميل',
      'برنامج صالونات السعودية',
      'Eng. Mohamed Abdo Rashad Elbahy',
      'RashX founder',
      'Mohamed Abdo Rashad Elbahy',
    ],
    pathname: '/founder',
    noIndex: false,
  });
}

export default async function FounderPage({ params }: FounderPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'من نحن' : 'About Us', item: `/${locale}/about` },
    {
      name: isAr ? 'م. محمد عبده رشاد البهي' : 'Eng. Mohamed Abdo Rashad Elbahy',
      item: `/${locale}/founder`,
    },
  ];

  // Articles authored by the founder
  const founderArticles = BLOG_POSTS.filter(
    (post) =>
      post.authorAr.includes('محمد عبده رشاد البهي') ||
      post.authorEn.toLowerCase().includes('mohamed abdo rashad elbahy')
  ).slice(0, 3);

  // Vision Pillars
  const visionPillars = [
    {
      icon: Globe,
      titleAr: 'الاستقلالية الرقمية والهوية الحرة لكل منشأة',
      titleEn: 'Digital Sovereignty & Branded Autonomy',
      descAr:
        'منح كل صالون ومستثمر نطاقاً فرعياً خاصاً ومستقلاً (*.rashx.org) يحمل اسمه وشعاره وألوانه، ليتحرر من التطبيقات الوسيطة التي تقتطع العمولات وتُخفي هوية المنشأة.',
      descEn:
        'Equipping every salon with a dedicated sovereign subdomain (*.rashx.org) bearing its identity, freeing owners from commission-heavy aggregator apps.',
    },
    {
      icon: Lock,
      titleAr: 'حماية بيانات العميلات والامتثال لـ PDPL',
      titleEn: 'Data Privacy & Strict Saudi PDPL Compliance',
      descAr:
        'بناء منظومة أمان تضمن سرية أرقام جوالات العميلات وسجلات الخدمات، وحجب أرقام الهواتف عن غير المخولين، والتوافق مع نظام حماية البيانات الشخصية السعودي.',
      descEn:
        'Enforcing stringent phone masking and tenant isolation compliant with the Saudi Personal Data Protection Law (PDPL).',
    },
    {
      icon: Zap,
      titleAr: 'امتثال تقني سلس للفوترة الإلكترونية (ZATCA)',
      titleEn: 'Frictionless ZATCA Phase 2 E-Invoicing',
      descAr:
        'إدماج متطلبات الربط والتكامل مع هيئة الزكاة والضريبة والجمارك تلقائياً داخل نظام الكاشير السحابي دون إضافة أعباء محاسبية أو تشغيلية على الطاقم.',
      descEn:
        'Seamless integration with ZATCA Phase 2 e-invoicing standards built directly into the cloud POS without overhead for salon staff.',
    },
    {
      icon: Building2,
      titleAr: 'نموذج عمل شفاف بدون أي عمولة على الحجوزات',
      titleEn: 'Transparent Model: 0% Booking Commissions',
      descAr:
        'تأسيس راش إكس على مبدأ أن دخل المنشأة حق خالص لصاحبها؛ لا نسب مقتطعة من الفواتير ولا رسوم خفية على المواعيد.',
      descEn:
        'Founded on the principle that salon revenue belongs 100% to the owner, with zero percentage taken from bookings or transactions.',
    },
  ];

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      {/* JSON-LD Structured Data: Person & ProfilePage */}
      <JsonLd data={getPersonSchema(locale)} id="founder-person-schema" />
      <JsonLd data={getProfilePageSchema(locale)} id="founder-profile-schema" />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="founder-breadcrumb-schema" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs text-ink-muted"
        >
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/about`} className="hover:text-ink transition-colors">
            {isAr ? 'من نحن' : 'About Us'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? 'م. محمد عبده رشاد البهي' : 'Eng. Mohamed Abdo Rashad Elbahy'}
          </span>
        </nav>

        {/* =========================================================================
            Hero Profile Header Card: Image [TODO] + H1 + Bio + LinkedIn + Contact Button
           ========================================================================= */}
        <div className="rounded-3xl bg-white border border-mist-gray p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 relative overflow-hidden">
          <div className="absolute top-0 end-0 w-96 h-96 bg-dusty-blue/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image Placeholder [TODO] Column (4 Cols on Large) */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full max-w-xs aspect-4/5 rounded-3xl bg-linear-to-b from-mist-gray/80 to-mist-gray/30 border-2 border-dashed border-dusty-blue/50 flex flex-col items-center justify-center p-6 text-center shadow-inner overflow-hidden group">
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#96B0BC_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

                <div className="relative z-10 flex flex-col items-center space-y-4">
                  {/* Monogram / Portrait Avatar */}
                  <div className="w-24 h-24 rounded-2xl bg-ink text-white flex flex-col items-center justify-center shadow-lg border-2 border-dusty-blue/40">
                    <span className="text-2xl font-black tracking-widest text-dusty-blue">
                      {isAr ? 'م.ر' : 'MR'}
                    </span>
                    <span className="text-[9px] uppercase font-mono text-mist-gray/80 mt-0.5">
                      FOUNDER
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {/* Explicit Photo [TODO] Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dusty-blue/20 text-dusty-blue font-bold text-xs">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{isAr ? '[TODO: صورة المؤسس]' : '[TODO: Founder Photo]'}</span>
                    </div>

                    <p className="text-[11px] text-ink-muted leading-relaxed max-w-[200px]">
                      {isAr
                        ? 'سيتم رفع الصورة الرسمية للمهندس محمد عبده رشاد البهي هنا بدقة عالية.'
                        : 'Official portrait photograph of Eng. Mohamed Abdo Rashad Elbahy will be published here.'}
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-3 text-[10px] font-mono text-ink-muted/70">
                  RashX Architecture • 2026
                </div>
              </div>
            </div>

            {/* Profile Information & Actions Column (8 Cols on Large) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray text-xs font-bold text-ink">
                <Terminal className="w-3.5 h-3.5 text-dusty-blue" />
                <span>
                  {isAr
                    ? 'مؤسس منصة راش إكس (تأسست عام 2026 م)'
                    : 'Founder of RashX (Founded in 2026)'}
                </span>
              </div>

              {/* Exact H1 requested */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-ink tracking-tight leading-tight">
                {isAr
                  ? 'م. محمد عبده رشاد البهي – مؤسس RashX'
                  : 'Eng. Mohamed Abdo Rashad Elbahy – Founder of RashX'}
              </h1>

              {/* Section 1: نبذة (بالمعلومات المتوفرة فقط) */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'نبذة عن المؤسس' : 'About the Founder'}
                </h2>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                  {isAr
                    ? 'مهندس برمجيات ومؤسس منصة راش إكس (RashX) في عام 2026 م، يقود الرؤية التقنية والهندسية للمنصة بهدف رقمنة قطاع صالونات التجميل والمشاغل ومراكز السبا في المملكة العربية السعودية، وتحويلها إلى بنية تحتية سحابية مستقلة تمكّن أصحاب المنشآت من امتلاك هويتهم الرقمية وحماية بيانات عملائهم دون وسيط.'
                    : 'Software Engineer and Founder of RashX in 2026, leading the technological and engineering vision to digitize beauty salons, studios, and wellness centers in Saudi Arabia through sovereign cloud infrastructure granting owners full digital autonomy and uncompromised client data privacy.'}
                </p>
              </div>

              {/* Action Buttons: LinkedIn + Contact Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {/* LinkedIn Link */}
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>{isAr ? 'الملف المهني على LinkedIn' : 'LinkedIn Profile'}</span>
                  <ExternalLink className="w-3 h-3 text-white/80" />
                </a>

                {/* Contact Button */}
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink hover:bg-ink/90 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-dusty-blue" />
                  <span>{isAr ? 'تواصل مع المؤسس وفريق راش إكس' : 'Contact Founder & Team'}</span>
                </Link>

                {/* Direct WhatsApp Consultation */}
                <a
                  href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    isAr
                      ? 'السلام عليكم م. محمد، أود التواصل بشأن منصة راش إكس لصالوني.'
                      : 'Hello Eng. Mohamed, I would like to inquire about RashX platform for my salon.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-mist-gray hover:bg-mist-gray/80 text-ink text-xs font-bold transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{isAr ? 'محادثة واتساب مباشرة' : 'WhatsApp'}</span>
                </a>
              </div>

              {/* Verified Facts Banner */}
              <div className="pt-4 border-t border-mist-gray/70 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-ink-muted block">{isAr ? 'الدور الوظيفي' : 'Role'}</span>
                  <span className="font-bold text-ink">
                    {isAr ? 'مؤسس ورئيس تطوير المنتج' : 'Founder & Product Architect'}
                  </span>
                </div>
                <div>
                  <span className="text-ink-muted block">{isAr ? 'سنة التأسيس' : 'Founded'}</span>
                  <span className="font-bold text-ink font-mono">2026 م</span>
                </div>
                <div>
                  <span className="text-ink-muted block">{isAr ? 'المنظومة' : 'Platform'}</span>
                  <span className="font-bold text-ink">RashX | راش إكس</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            Section 2: رؤيته لرقمنة قطاع التجميل (His Vision for the Beauty Sector)
           ========================================================================= */}
        <div className="mt-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
              {isAr ? 'الرؤية التقنية' : 'The Vision'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr
                ? 'رؤية المؤسس لرقمنة قطاع التجميل في السعودية'
                : 'Founder’s Vision for Digitizing the Saudi Beauty Sector'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'المبادئ الأربعة التي يقود بها م. محمد عبده رشاد البهي تطوير راش إكس لخدمة الصالونات والمشاغل.'
                : 'The four core convictions guiding Eng. Mohamed Abdo Rashad Elbahy in engineering RashX for Saudi salons.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visionPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-sm transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-mist-gray/70 flex items-center justify-center text-ink">
                    <IconComp className="w-6 h-6 text-dusty-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            Section 3: لماذا بدأ RashX [TODO نص من المؤسس]
           ========================================================================= */}
        <div className="mt-16 rounded-3xl bg-white border border-mist-gray p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray text-xs font-bold text-ink">
              <Quote className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'دوافع التأسيس' : 'Founding Motivations'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr ? 'لماذا بدأ RashX؟' : 'Why He Started RashX'}
            </h2>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              {isAr
                ? 'انطلقت راش إكس في عام 2026 لمعالجة فجوة واضحة في السوق السعودي: الصالونات كانت مجبرة إما على استخدام برامج كاشير قديمة لا تفهم تعقيد مواعيد التجميل، أو الانضمام لتطبيقات وسيطة تقتطع عمولات ضخمة وتتحكم في بيانات العميلات.'
                : 'RashX was founded in 2026 to bridge a critical market gap in Saudi Arabia: salons were forced to choose between rigid retail cashiers blind to beauty workflows, or aggregator directories charging aggressive commissions while hoarding client lists.'}
            </p>
          </div>

          {/* Dedicated [TODO] Box for Founder's Personal Text */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFBFB] border-2 border-dashed border-dusty-blue/60 space-y-4 relative">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-dusty-blue shrink-0 mt-0.5" />
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-dusty-blue/20 text-dusty-blue font-bold text-xs">
                  {isAr ? '[TODO نص من المؤسس]' : '[TODO Founder Statement]'}
                </span>

                <p className="text-sm sm:text-base font-medium text-ink leading-relaxed">
                  {isAr
                    ? '«[TODO: نص شخصي بقلم م. محمد عبده رشاد البهي – يوضح القصة الشخصية والدوافع المباشرة التي قادته لتأسيس راش إكس في عام 2026، والتجربة الميدانية التي رصدها مع أصحاب الصالونات، ورؤيته لمستقبل المنظومة السحابية في المملكة العربية السعودية.]»'
                    : '"[TODO: Personal statement written by Eng. Mohamed Abdo Rashad Elbahy detailing the personal motivations and inspiration behind founding RashX in 2026, field observations with salon owners, and future outlook for sovereign cloud salon systems in Saudi Arabia.]"'}
                </p>

                <div className="text-xs text-ink-muted font-bold pt-1">
                  {isAr ? '— م. محمد عبده رشاد البهي، مؤسس RashX' : '— Eng. Mohamed Abdo Rashad Elbahy, Founder of RashX'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            Section 4: أحدث مقالاته (Latest Articles by the Founder)
           ========================================================================= */}
        <div className="mt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'المقالات والأدلة الإرشادية' : 'Articles & Guides'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'أحدث مقالات المؤسس' : 'Latest Articles by the Founder'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'أدلة متخصصة كتبها م. محمد عبده رشاد البهي لمساعدة أصحاب الصالونات والمشاغل في المملكة.'
                  : 'Actionable guides authored by Eng. Mohamed Abdo Rashad Elbahy for Saudi salon and studio owners.'}
              </p>
            </div>

            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-dusty-blue hover:text-ink transition-colors shrink-0"
            >
              <span>{isAr ? 'عرض كافة المقالات' : 'View All Articles'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founderArticles.map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl bg-white border border-mist-gray p-6 hover:border-dusty-blue/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-ink-muted">
                    <span className="px-2.5 py-1 rounded-full bg-mist-gray font-semibold text-ink">
                      {isAr ? post.categoryAr : post.categoryEn}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-dusty-blue" />
                      <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-ink leading-snug hover:text-dusty-blue transition-colors">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {isAr ? post.titleAr : post.titleEn}
                    </Link>
                  </h3>

                  <p className="text-xs text-ink-muted line-clamp-3 leading-relaxed">
                    {isAr ? post.descriptionAr : post.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-mist-gray flex items-center justify-between">
                  <span className="text-[11px] text-ink-muted font-mono">
                    {post.datePublished}
                  </span>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-dusty-blue transition-colors"
                  >
                    <span>{isAr ? 'اقرأ المقال' : 'Read Article'}</span>
                    <ArrowIcon className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =========================================================================
            Section 5: زر التواصل والدعوة لاتخاذ إجراء (Contact CTA)
           ========================================================================= */}
        <div className="mt-16 rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'قنوات التواصل المباشر' : 'Direct Communication'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {isAr
                ? 'تواصل مع المؤسس وفريق راش إكس'
                : 'Connect with the Founder & RashX Team'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
              {isAr
                ? 'هل ترغب في مناقشة احتياجات منشأتك التجميلية أو تجربة راش إكس على أرض الواقع؟ تواصل معنا مباشرة أو احجز عرضاً تجريبياً حياً لمدة 20 دقيقة.'
                : 'Discuss your salon or beauty center’s operational needs directly with the RashX team, or schedule a personalized 20-minute live demo.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              href={`/${locale}/contact`}
              className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? 'نموذج التواصل السريع' : 'Contact Form'}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? 'مرحبًا م. محمد وفريق راش إكس، أود الاستفسار عن تجربة منصة راش إكس لصالوني.'
                  : 'Hello Eng. Mohamed and RashX team, I would like to inquire about trying RashX for my salon.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'محادثة واتساب مباشرة' : 'WhatsApp Consultation'}</span>
            </a>

            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
            >
              <svg
                className="w-4 h-4 fill-white"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>{isAr ? 'LinkedIn' : 'LinkedIn'}</span>
              <ExternalLink className="w-3 h-3 text-white/70" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
