import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Trophy,
  Sparkles,
  Building,
  CalendarCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Quote,
  ShieldCheck,
  Layers,
  Star,
  Lock,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import { generatePageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { ShareExperienceForm } from '@/components/sections/ShareExperienceForm';

interface CaseStudiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: CaseStudiesPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'قصص نجاح منشآت تدير أعمالها مع RashX | راش إكس'
      : 'Success Stories of Facilities Powered by RashX | RashX',
    description: isAr
      ? 'نماذج وقوالب توثيق قصص نجاح وتحول الصالونات ومراكز التجميل عبر منظومة راش إكس السحابية في المملكة العربية السعودية.'
      : 'Case study blueprints and operational transformation stories of salons and spas powered by RashX in Saudi Arabia.',
    keywords: [
      'قصص نجاح صالونات التجميل',
      'تجارب المشاغل النسائية راش إكس',
      'دراسات حالة إدارة صالونات الحلاقة',
      'التحول الرقمي للصالونات السعودية',
    ],
    pathname: '/case-studies',
    // Strictly set to noIndex as requested until at least one genuine verified story is active
    noIndex: true,
  });
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'قصص النجاح' : 'Case Studies', item: `/${locale}/case-studies` },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="case-studies-breadcrumb-schema" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? 'قصص النجاح' : 'Success Stories'}
          </span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <Trophy className="w-4 h-4 text-dusty-blue" />
            <span>
              {isAr
                ? 'قصص النجاح والتحول الرقمي • شركاء راش إكس'
                : 'Digital Transformation Stories • RashX Partners'}
            </span>
          </div>

          {/* Mandatory Exact H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {isAr
              ? 'قصص نجاح منشآت تدير أعمالها مع RashX'
              : 'Success Stories of Facilities Powered by RashX'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal">
            {isAr
              ? 'كيف تسهم راش إكس في رفع كفاءة التشغيل، القضاء على تعارض المواعيد، وضبط العمولات والفوترة الإلكترونية للصالونات والمشاغل والسبا في المملكة العربية السعودية.'
              : 'Discover how RashX elevates operational efficiency, eliminates double-bookings, and streamlines e-invoicing for salons and spas across Saudi Arabia.'}
          </p>
        </div>

        {/* Mandatory Transparency & Authenticity Notice */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-mist-gray space-y-3 relative overflow-hidden shadow-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-ink">
            <ShieldCheck className="w-5 h-5 text-dusty-blue" />
            <span>
              {isAr
                ? 'إشعار الشفافية والمصداقية (تأسست راش إكس في 2026 م)'
                : 'Transparency & Integrity Notice (Founded in 2026)'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            {isAr
              ? 'انطلاقاً من قيمنا المؤسسية والتزامنا الصارم بالمصداقية مع عملائنا، فإننا لا ننشر أي نتائج غير حقيقية، أرقام مصطنعة، أو تقييمات وهمية. تمثل النماذج أدناه هيكلية دراسات الحالة وقوالب قياس الأثر، ونعمل حالياً مع منشآتنا الشريكة في مختلف مدن المملكة لتوثيق قصص نجاحهم واعتماد مؤشراتهم الواقعية تمهيداً لنشرها تباعاً.'
              : 'In strict adherence to our founding principles of transparency, RashX never publishes fabricated metrics, unverified reviews, or synthetic testimonials. The blueprints below represent our operational impact templates, currently in active documentation with our inaugural partner salons across Saudi Arabia.'}
          </p>
          <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-dusty-blue">
            <span className="w-2 h-2 rounded-full bg-dusty-blue animate-pulse" />
            <span>
              {isAr
                ? 'تم ضبط الصفحة برمجياً بـ (noindex) حتى اكتمال ونشر أول قصة نجاح موثقة'
                : 'This page is set to noindex until inaugural case studies are formally validated'}
            </span>
          </div>
        </div>

        {/* Section 2: Case Study Template Blueprints */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="text-xs font-medium text-dusty-blue uppercase tracking-wider">
              {isAr ? 'قوالب دراسات الحالة التشغيلية' : 'Case Study Impact Blueprints'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              {isAr
                ? 'هيكلية قياس الأثر والتحول في المنشآت الشريكة'
                : 'Operational Transformation Framework Across Facility Types'}
            </h2>
          </div>

          <div className="space-y-8">
            {/* Template 1: Beauty Salon & Studio (صالون نسائي ومشغل - الرياض) */}
            <div className="p-8 rounded-3xl bg-white border border-mist-gray shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-mist-gray pb-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-mist-gray text-ink">
                    {isAr ? 'صالون نسائي ومشغل • الرياض' : 'Beauty Salon & Studio • Riyadh'}
                  </span>
                  <h3 className="text-xl font-bold text-ink">
                    {isAr
                      ? '[TODO: اسم الصالون النسائي الشريك الأول – الرياض]'
                      : '[TODO: Partner Salon Case Study – Riyadh]'}
                  </h3>
                </div>
                <div className="text-xs font-mono font-semibold text-dusty-blue">
                  {isAr ? 'نطاق مخصص • تطبيق عميل PWA' : 'Dedicated Subdomain • PWA Engine'}
                </div>
              </div>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
                  <div className="text-xs font-bold text-[#EF4444] uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{isAr ? 'التحديات التشغيلية السابقة (قبل راش إكس)' : 'Previous Bottlenecks (Before RashX)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr
                      ? '[TODO: التحديات التشغيلية السابقة - تضارب في مواعيد الحجز اليدوي عبر الدفتر خلال ذروة المساء، هدر وقت العميلات في صالة الانتظار، وتخلف متكرر عن المواعيد دون دفع عربون مسبق، مع صعوبة في احتساب عمولات الأخصائيات في نهاية الشهر].'
                      : '[TODO: Previous challenges - Manual booking collisions during evening rush hours, no-show losses without advance deposits, and friction calculating stylist commission splits].'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/30 space-y-2">
                  <div className="text-xs font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'النتائج المحققة (بعد اعتماد راش إكس)' : 'Operational Transformation (With RashX)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr
                      ? '[TODO: النتائج المحققة - حجز ذاتي سلس عبر تطبيق الويب التقدمي PWA بنطاق مستقل، قفل تضارب المواعيد آلياً بنسبة 100%، إشعارات واتساب تلقائية، وفواتير إلكترونية ZATCA فورية بالكاشير السريع].'
                      : '[TODO: Transformation - Friction-free self-booking via branded PWA, 100% conflict prevention, automated WhatsApp reminders, and instant ZATCA Phase 2 receipts].'}
                  </p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="p-5 rounded-2xl bg-mist-gray/30 border border-mist-gray relative">
                <Quote className="w-6 h-6 text-dusty-blue/40 mb-1 rtl:rotate-180" />
                <p className="text-xs sm:text-sm font-medium text-ink italic leading-relaxed">
                  {isAr
                    ? '«[TODO: اقتباس موثق من مالكة المنشأة حول تجربتها الواقعية مع راش إكس وأثر المنظومة على تنظيم صالونها ورضا عميلاتها].»'
                    : '«[TODO: Verified quotation from salon owner detailing operational impact and client satisfaction with RashX].»'}
                </p>
                <div className="mt-2 text-xs font-bold text-dusty-blue">
                  {isAr ? '— [TODO: اسم مالكة المنشأة / المديرة]' : '— [TODO: Salon Owner / Director]'}
                </div>
              </div>

              {/* Key Metric Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'نسبة خفض التخلف عن المواعيد' : 'No-Show Reduction'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: --%]</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'سرعة إصدار فاتورة ZATCA' : 'ZATCA POS Checkout'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: &lt; 5s]</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'نمو الحجوزات الذاتية المسبقة' : 'Digital Booking Growth'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: --%]</div>
                </div>
              </div>
            </div>

            {/* Template 2: Barbershop & Men Grooming Lounge (صالون حلاقة رجالي - جدة) */}
            <div className="p-8 rounded-3xl bg-white border border-mist-gray shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-mist-gray pb-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-mist-gray text-ink">
                    {isAr ? 'صالون حلاقة رجالي • جدة' : 'Men Grooming & Barbershop • Jeddah'}
                  </span>
                  <h3 className="text-xl font-bold text-ink">
                    {isAr
                      ? '[TODO: اسم صالون الحلاقة الرجالي الشريك – جدة]'
                      : '[TODO: Partner Barbershop Case Study – Jeddah]'}
                  </h3>
                </div>
                <div className="text-xs font-mono font-semibold text-dusty-blue">
                  {isAr ? 'طابور انتظار حي • باقات شهرية' : 'Live Chair Queue • Monthly Passes'}
                </div>
              </div>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
                  <div className="text-xs font-bold text-[#EF4444] uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{isAr ? 'التحديات التشغيلية السابقة (قبل راش إكس)' : 'Previous Bottlenecks (Before RashX)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr
                      ? '[TODO: التحديات - تكدس الزبائن في صالة الانتظار وعزوفهم عن الانتظار لأكثر من 20 دقيقة، نزاعات الحلاقين على الأدوار والعمولات، وغياب الولاء الدوري للصالون].'
                      : '[TODO: Previous challenges - Customer walkouts during peak lobby congestion, disputes over barber queues, and lack of recurring subscription memberships].'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/30 space-y-2">
                  <div className="text-xs font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'النتائج المحققة (بعد اعتماد راش إكس)' : 'Operational Transformation (With RashX)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr
                      ? '[TODO: النتائج - حجز الدور عن بعد عبر PWA، إشعار واتساب تلقائي قبل 10 دقائق من تجهيز الكرسي، اشتراكات شهرية متكررة، وتسريع دوران الكراسي].'
                      : '[TODO: Transformation - Remote mobile queue ticketing, automated 10-minute chair summons, and recurring monthly grooming passes].'}
                  </p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="p-5 rounded-2xl bg-mist-gray/30 border border-mist-gray relative">
                <Quote className="w-6 h-6 text-dusty-blue/40 mb-1 rtl:rotate-180" />
                <p className="text-xs sm:text-sm font-medium text-ink italic leading-relaxed">
                  {isAr
                    ? '«[TODO: اقتباس موثق من مدير الصالون الرجالي حول سرعة إنهاء الدور وتنظيم كراسي الحلاقة والعمولات].»'
                    : '«[TODO: Verified quotation from barbershop manager detailing chair turnover acceleration and queue automation].»'}
                </p>
                <div className="mt-2 text-xs font-bold text-dusty-blue">
                  {isAr ? '— [TODO: اسم مدير الصالون الرجالي]' : '— [TODO: Barbershop General Manager]'}
                </div>
              </div>

              {/* Key Metric Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'زيادة دوران كراسي الحلاقة' : 'Chair Turnover Boost'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: --%]</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'تقليل وقت الانتظار بالصالة' : 'Lobby Wait Time Drop'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: -- دقيقة]</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'مشتركو الباقات الشهرية' : 'Monthly Member Adoption'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: --%]</div>
                </div>
              </div>
            </div>

            {/* Template 3: Multi-Service Spa & Wellness Sanctuary (مركز سبا واستجمام - الخبر) */}
            <div className="p-8 rounded-3xl bg-white border border-mist-gray shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-mist-gray pb-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-mist-gray text-ink">
                    {isAr ? 'مركز تجميل وسبا فاخر • الخبر' : 'Luxury Spa & Aesthetic Center • Khobar'}
                  </span>
                  <h3 className="text-xl font-bold text-ink">
                    {isAr
                      ? '[TODO: اسم مركز السبا الشريك – الخبر]'
                      : '[TODO: Partner Luxury Spa Case Study – Khobar]'}
                  </h3>
                </div>
                <div className="text-xs font-mono font-semibold text-dusty-blue">
                  {isAr ? 'أجنحة متعددة • رقابة استهلاك Backbar' : 'Multi-Suite Dispatcher • Backbar Control'}
                </div>
              </div>

              {/* Before vs After Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
                  <div className="text-xs font-bold text-[#EF4444] uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>{isAr ? 'التحديات التشغيلية السابقة (قبل راش إكس)' : 'Previous Bottlenecks (Before RashX)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr
                      ? '[TODO: التحديات - تداخل مدد الجلسات المتفاوتة (مساج 60د، حمام مغربي 90د)، هدر مستلزمات التدليك والزيوت دون وصفات استهلاك دقيقة، وغياب لوحة قيادة مركزية للفروع].'
                      : '[TODO: Previous challenges - Suite turnaround bottlenecks across varied treatment durations, untracked massage oil consumption, and lack of cross-branch analytics].'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/30 space-y-2">
                  <div className="text-xs font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'النتائج المحققة (بعد اعتماد راش إكس)' : 'Operational Transformation (With RashX)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr
                      ? '[TODO: النتائج - ضبط فواصل التعقيم التلقائية (Buffer Times)، خصم مستلزمات الخدمة آلياً من المخزون، وباقات جلسات دورية مسبقة الدفع تؤمن سيولة نقدية مستمرة].'
                      : '[TODO: Transformation - Automated suite sanitization buffers, recipe-based backbar deductions, and recurring wellness session bundles].'}
                  </p>
                </div>
              </div>

              {/* Quote Block */}
              <div className="p-5 rounded-2xl bg-mist-gray/30 border border-mist-gray relative">
                <Quote className="w-6 h-6 text-dusty-blue/40 mb-1 rtl:rotate-180" />
                <p className="text-xs sm:text-sm font-medium text-ink italic leading-relaxed">
                  {isAr
                    ? '«[TODO: اقتباس موثق من المستثمر/المدير العام لمركز السبا حول ضبط استهلاك المواد وتوفير تجربة استجمام راقية للضيوف].»'
                    : '«[TODO: Verified quotation from spa managing director detailing backbar waste reduction and guest experience excellence].»'}
                </p>
                <div className="mt-2 text-xs font-bold text-dusty-blue">
                  {isAr ? '— [TODO: اسم المستثمر / المدير التنفيذي]' : '— [TODO: Managing Director / Investor]'}
                </div>
              </div>

              {/* Key Metric Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'معدل إشغال أجنحة السبا' : 'Suite Utilization Rate'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: --%]</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'خفض هدر مستلزمات التدليك' : 'Backbar Waste Drop'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: --%]</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-mist-gray text-center space-y-1">
                  <div className="text-xs text-ink-muted">{isAr ? 'دقة الإيرادات والعمولات' : 'Commission Ledger Accuracy'}</div>
                  <div className="text-lg font-black text-ink font-mono">[TODO: 100%]</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Interactive "Share Your Experience" Form */}
        <div className="space-y-4">
          <ShareExperienceForm locale={locale} />
        </div>

        {/* Section 4: Closing CTA */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'ابدأ رحلة تحول صالونك' : 'Begin Your Salon Transformation'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {isAr
                ? 'جاهز لتكون قصة النجاح القادمة مع راش إكس؟'
                : 'Ready to Become the Next Success Story with RashX?'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto font-normal">
              {isAr
                ? 'اكتشف كيف تدير راش إكس الحجوزات والمبيعات والعمولات بنطاق فرعي مستقل وهوية صالونك في جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                : 'Discover how RashX streamlines appointments, sales, and commissions under your dedicated subdomain in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                  ? 'مرحبًا راش إكس، أود الاستفسار عن الانضمام لشركاء النجاح وتجربة المنصة لصالوني.'
                  : 'Hello RashX, I would like to inquire about partnering and trying RashX for my salon.'
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
