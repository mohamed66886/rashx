import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Building2,
  Eye,
  Target,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Users,
  Compass,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  Laptop2,
  TrendingUp,
  HeartHandshake,
  Cpu,
  BarChart3,
  Lock,
  Globe2,
  Award,
  ChevronLeft,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getAboutPageSchema,
  getOrganizationSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'من نحن | راش إكس RashX - شركة برمجيات صالونات السعودية'
      : 'About Us | RashX - Saudi Salon Software Company',
    description: isAr
      ? 'تعرف على راش إكس، شركة برمجيات صالونات السعودية الرائدة في رقمنة المشاغل ومراكز التجميل والسبا عبر منظومة سحابية بنطاق فرعي خاص و10 أنظمة متكاملة.'
      : 'Discover RashX, the Saudi salon software company digitizing beauty studios, wellness spas, and barbershops with dedicated subdomains and 10 integrated systems.',
    keywords: [
      'شركة برمجيات صالونات السعودية',
      'برنامج إدارة صالونات',
      'نظام راش إكس',
      'برمجيات مشاغل نسائية',
      'إدارة مراكز التجميل السعودية',
      'RashX software',
    ],
    pathname: '/about',
    noIndex: false,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'من نحن' : 'About Us', item: `/${locale}/about` },
  ];

  // 8 Core Objectives (الأهداف الثمانية)
  const eightObjectives = [
    {
      id: 1,
      icon: Globe2,
      titleAr: 'السيادة والاستقلالية الرقمية',
      titleEn: 'Digital Sovereignty & Independence',
      descAr:
        'منح كل منشأة نطاقًا فرعيًا خاصًا (Subdomain) يعزز هويتها التجارية المباشرة ويحميها من التبعية للمنصات الوسيطة أو اقتطاع نسب من مبيعاتها.',
      descEn:
        'Equipping each facility with an independent branded subdomain, freeing salons from aggregator commissions and dependency.',
    },
    {
      id: 2,
      icon: Laptop2,
      titleAr: 'أتمتة الحجوزات ونقاط البيع السريعة',
      titleEn: 'Automated Booking & Fast POS',
      descAr:
        'توفير تجربة حجز ذاتية على مدار الساعة ومنع تضارب المواعيد نهائيًا، مع نقطة بيع POS تدعم كافة وسائل الدفع السعودية المتعددة.',
      descEn:
        'Frictionless 24/7 self-service scheduling, zero appointment clashes, and an ultra-fast POS supporting all Saudi payment methods.',
    },
    {
      id: 3,
      icon: ShieldCheck,
      titleAr: 'الامتثال لمتطلبات الفوترة الإلكترونية ZATCA',
      titleEn: 'ZATCA E-Invoicing Phase 2 Readiness',
      descAr:
        'دعم متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) بسلاسة وأمان وفق حالة المنشأة ومتطلبات الهيئة دون تعقيدات تشغيلية.',
      descEn:
        'Seamless support for ZATCA Phase 2 integration requirements tailored to facility onboarding status and regulatory guidelines.',
    },
    {
      id: 4,
      icon: Users,
      titleAr: 'العدالة والشفافية في العمولات والرواتب',
      titleEn: 'Transparent Commissions & Payroll',
      descAr:
        'أتمتة احتساب عمولات الخدمات والمنتجات لخبيرات التجميل والحلاقين بدقة لحظية تمنع الأخطاء الحسابية وتحفز الإنتاجية.',
      descEn:
        'Automated real-time service and retail commission calculations for beauticians and barbers, eliminating disputes and boosting morale.',
    },
    {
      id: 5,
      icon: Layers,
      titleAr: 'ضبط استهلاك المخزون والحد من الهدر',
      titleEn: 'Strict Inventory Control & Zero Waste',
      descAr:
        'الربط الدقيق بين استهلاك مستحضرات التجميل وجلسات الخدمات المؤداة، مع تنبيهات إعادة الطلب الآلية لتفادي نفاد المواد الأساسية.',
      descEn:
        'Direct tracking between service consumables and treatment execution, with automated low-stock reorder thresholds.',
    },
    {
      id: 6,
      icon: HeartHandshake,
      titleAr: 'تعزيز ولاء العملاء وتكرار الزيارات',
      titleEn: 'Customer Retention & Loyalty Engine',
      descAr:
        'بناء علاقات طويلة الأمد عبر نقاط الاسترداد، بطاقات الهدايا، والباقات الموسمية مع رسائل تذكير تلقائية عبر الواتساب للحد من الغياب.',
      descEn:
        'Long-term client relationships through loyalty points, gift cards, recurring memberships, and proactive WhatsApp appointment reminders.',
    },
    {
      id: 7,
      icon: Lock,
      titleAr: 'أمان البيانات والامتثال لنظام PDPL',
      titleEn: 'Data Privacy & Saudi PDPL Compliance',
      descAr:
        'عزل منطقي تام لقواعد بيانات كل صالون، ونظام صلاحيات دقيق، وتشفير متقدم متوافق مع نظام حماية البيانات الشخصية السعودي.',
      descEn:
        'Strict multi-tenant logical database isolation, granular role permissions, and full compliance with Saudi PDPL data privacy laws.',
    },
    {
      id: 8,
      icon: BarChart3,
      titleAr: 'قرارات تشغيلية مدعومة بالبيانات والذكاء الاصطناعي',
      titleEn: 'Data-Driven & AI Growth Insights',
      descAr:
        'لوحات مؤشرات أداء حية توضح ساعات الذروة، إنتاجية الموظفين، وأعلى الخدمات ربحية، لمساعدة الإدارة في التوسع بثقة واستدامة.',
      descEn:
        'Live executive dashboards highlighting peak operating hours, staff efficiency, and top margin services to guide confident expansion.',
    },
  ];

  // Core Values (قيمنا)
  const coreValues = [
    {
      icon: Compass,
      titleAr: 'التمكين لا التبعية',
      titleEn: 'Empowerment, Not Dependency',
      descAr:
        'نؤمن بأن الصالون هو صاحب العلامة والقيمة؛ لذا نوفر له بنية رقمية مستقلة خاصة به دون أن نتدخل في تسعيره أو نقتطع من أرباحه.',
      descEn:
        'Salons own their brand and client relationships. We empower them with private digital infrastructure with zero profit deduction.',
    },
    {
      icon: Cpu,
      titleAr: 'الابتكار الواقعي المتخصص',
      titleEn: 'Pragmatic Local Innovation',
      descAr:
        'برمجياتنا مصممة خصيصًا لتحديات ومصطلحات السوق السعودي (المشاغل، الصالونات النسائية، مراكز الحلاقة، والسبا)، وليست أنظمة غربية مترجمة.',
      descEn:
        'Engineered from the ground up for the nuances of Saudi beauty operations, local regulations, and genuine operational workflows.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'الموثوقية والسرية الصارمة',
      titleEn: 'Integrity & Data Confidentiality',
      descAr:
        'بيانات الصالون وقوائم عملائه ومعاملاته المالية أمانة مقدسة محمية بأعلى معايير التشفير والعزل المنطقي ولا يتم مشاركتها إطلاقًا.',
      descEn:
        'Salon data, client history, and financial transactions are sacredly protected through strict logical separation and encryption.',
    },
    {
      icon: Award,
      titleAr: 'الوضوح والالتزام الأخلاقي',
      titleEn: 'Radical Transparency',
      descAr:
        'وضوح تام في باقات الأسعار والشروط والجاهزية التقنية دون وعود تسويقية زائفة أو شروط جزائية خفية.',
      descEn:
        'Complete transparency in pricing, feature capabilities, and technical onboarding with zero hidden fees or misleading promises.',
    },
  ];

  // Simple Timeline (التأسيس 2026 ثم [TODO] المحطات القادمة)
  const timelineMilestones = [
    {
      year: '2026',
      status: isAr ? 'محطة التأسيس والانطلاق' : 'Foundation & Launch',
      isCurrent: true,
      titleAr: 'تأسيس راش إكس وإطلاق المنظومة الرقمية الشاملة',
      titleEn: 'Founding of RashX & Ecosystem Launch',
      descAr:
        'تأسست المنصة في المملكة العربية السعودية على يد م. محمد عبده رشاد البهي، وتم تدشين البنية السحابية المتكاملة بالنطاقات الفرعية المستقلة (Subdomains) والأنظمة العشرة الداعمة لمتطلبات الفوترة الإلكترونية ZATCA المرحلة الثانية.',
      descEn:
        'Established in Saudi Arabia by Eng. Mohamed Abdo Rashad Elbahy, introducing the independent subdomain architecture and 10 core operational systems supporting ZATCA Phase 2 e-invoicing.',
    },
    {
      year: '[TODO]',
      status: isAr ? 'المرحلة التطويرية القادمة' : 'Upcoming Phase',
      isCurrent: false,
      titleAr: '[TODO: إطلاق محرك الذكاء الاصطناعي التنبؤي لإدارة فترات الذروة والمخزون]',
      titleEn: '[TODO: Rollout of Predictive AI for Peak Demand & Inventory Forecasting]',
      descAr:
        '[TODO: تفاصيل التطوير التقني القادم المخطط له للمنشآت والمشاغل الكبرى في المملكة لتعزيز كفاءة الجدولة التلقائية وتقليل التكاليف].',
      descEn:
        '[TODO: Future operational enhancements and automated supply replenishment algorithms for high-volume enterprise beauty chains].',
    },
    {
      year: '[TODO]',
      status: isAr ? 'محطة التوسع المستقبلي' : 'Future Expansion Milestone',
      isCurrent: false,
      titleAr: '[TODO: تكاملات مالية ومصرفية موسعة وشبكة شراكات التجميل بالمملكة]',
      titleEn: '[TODO: Deep Local Banking Integrations & Nationwide Partner Network]',
      descAr:
        '[TODO: إضافة تفاصيل التوسع الجغرافي المستقبلي والربط المالي المتقدم فور تدشينها رسميًا].',
      descEn:
        '[TODO: Add verified regional expansion milestones and direct corporate integrations upon formal release].',
    },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      {/* Structured Data: AboutPage + Organization + Breadcrumbs */}
      <JsonLd data={getAboutPageSchema(locale)} id="about-page-schema" />
      <JsonLd data={getOrganizationSchema()} id="about-org-schema" />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="about-breadcrumb-schema" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{isAr ? 'من نحن' : 'About Us'}</span>
        </div>

        {/* Section 1: Hero Banner & Primary Heading */}
        <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>
              {isAr
                ? 'شركة برمجيات صالونات السعودية • تأسست 2026'
                : 'Saudi Salon Software Company • Founded 2026'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {isAr ? 'نرقمن قطاع التجميل في المملكة' : 'Digitizing the Beauty Industry in Saudi Arabia'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            {isAr
              ? 'راش إكس (RashX) هي شركة برمجيات صالونات سعودية متخصصة في تطوير حلول الإدارة السحابية الذكية لصالونات التجميل، المشاغل النسائية، مراكز الحلاقة الرجالية، ومجمعات السبا. نمنح كل منشأة هويتها وسيادتها الرقمية الكاملة من خلال نطاق فرعي خاص، و10 أنظمة تشغيلية ذكية تدعم متطلبات الفوترة الإلكترونية ZATCA المرحلة الثانية.'
              : 'RashX is a Saudi salon software platform delivering smart cloud management ecosystems for beauty centers, styling studios, barbershops, and luxury spas. We provide each facility with complete digital sovereignty via dedicated subdomains and 10 integrated operating modules compliant with ZATCA Phase 2.'}
          </p>
        </div>

        {/* Section 2: Founding Story & Platform Architecture */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-mist-gray">
            <div className="w-10 h-10 rounded-2xl bg-dusty-blue/20 flex items-center justify-center text-black font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-ink">
                {isAr ? 'قصة التأسيس: لماذا بنينا راش إكس؟' : 'The Origin: Why We Built RashX'}
              </h2>
              <p className="text-xs text-ink-muted">
                {isAr
                  ? 'من التحديات اليومية للصالونات إلى بنية سحابية متقدمة'
                  : 'From operational bottlenecks to an advanced sovereign architecture'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-sm text-ink-muted leading-relaxed">
            <div className="space-y-4">
              <p>
                {isAr
                  ? 'انطلقت منصة راش إكس (RashX) في عام 2026 برؤية هندسية واضحة أسسها المهندس محمد عبده رشاد البهي، استجابةً للتحديات المعقدة التي يواجهها ملاك المشاغل وصالونات التجميل في المملكة العربية السعودية: الاعتماد على برمجيات نقطة بيع بدائية لا تلبي خصوصية الخدمات، أو استخدام منصات وساطة تقتطع عمولات ضخمة وتخفي الهوية المستقلة للمنشأة.'
                  : 'RashX was founded in 2026 under the technical leadership of Eng. Mohamed Abdo Rashad Elbahy to address a pervasive dilemma in the Saudi beauty sector: reliance on primitive POS systems ill-suited for complex treatments, or aggregator apps imposing heavy commissions while concealing the salon’s authentic brand.'}
              </p>
              <p>
                {isAr
                  ? 'أدركنا أن صالون التجميل أو السبا ليس مجرد متجر تجزئة؛ بل هو منظومة عمل متكاملة تتداخل فيها الحجوزات الدقيقة مع مهارات الموظفين وعمولاتهم، وحسابات استهلاك المواد، ومتطلبات الفوترة الإلكترونية الصارمة لهيئة الزكاة والضريبة والجمارك (ZATCA).'
                  : 'We realized that a beauty salon or wellness spa is far more than a retail counter; it is a complex operational ecosystem where appointment scheduling intersects with staff commissions, cosmetic consumption rates, and stringent ZATCA e-invoicing standards.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-ink">
                  <Sparkles className="w-4 h-4 text-dusty-blue" />
                  <span>
                    {isAr ? 'المعادلة الفريدة لراش إكس: النطاق الفرعي والواجهات الأربع' : 'The RashX Blueprint'}
                  </span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {isAr
                    ? 'لكل منشأة منظومة مستقلة تمامًا بنطاق فرعي خاص (Subdomain) يشتمل على: موقع المنشأة التسويقي، لوحة التحكم الإدارية، تطبيق العميل للحجز الفوري، وواجهة مقدم الخدمة للموظفين، مدعومة بـ 10 أنظمة تشغيلية تضمن التكامل التام.'
                    : 'Each facility is provisioned with an isolated subdomain architecture encompassing 4 integrated portals: facility website, management dashboard, client self-booking app, and staff interface, powered by 10 synchronized engines.'}
                </p>
              </div>

              <p className="text-xs text-ink-muted/90">
                {isAr
                  ? 'نحن لا نقدم مجرد برنامج كاشير؛ بل نبني الأصول الرقمية المستقلة لمنشأتك لتنمو بأمان وتتوسع بفروع متعددة.'
                  : 'We do not build generic cash register tools; we engineer independent digital assets that empower salons to scale securely.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Vision & Mission Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <div className="rounded-3xl bg-white p-8 border border-mist-gray shadow-xs space-y-4 relative overflow-hidden group hover:border-dusty-blue transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-dusty-blue/20 flex items-center justify-center text-black">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-ink">
              {isAr ? 'رؤيتنا' : 'Our Vision'}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {isAr
                ? 'أن نكون الشريك التكنولوجي الأول والأكثر موثوقية لمنشآت التجميل والسبا في المملكة العربية السعودية، ونقود التحول الرقمي الشامل لقطاع العناية بما يواكب معايير ومستهدفات رؤية السعودية 2030 في تمكين رواد الأعمال وأتمتة المنشآت الوطنية.'
                : 'To become the premier and most trusted technology partner for salons and wellness centers in Saudi Arabia, spearheading digital transformation in alignment with Saudi Vision 2030 enterprise automation goals.'}
            </p>
          </div>

          {/* Mission Card */}
          <div className="rounded-3xl bg-white p-8 border border-mist-gray shadow-xs space-y-4 relative overflow-hidden group hover:border-dusty-blue transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-ink">
              {isAr ? 'رسالتنا' : 'Our Mission'}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {isAr
                ? 'تمكين أصحاب المشاغل والصالونات ومراكز التجميل من إدارة عملياتهم اليومية وموظفيهم ومخزونهم وفواتيرهم بأعلى درجات السهولة والتحكم الكامل، مع توفير تجربة رقمية راقية تحافظ على خصوصية وهوية المنشأة وسيادتها المستقلة.'
                : 'To empower beauty salon and spa owners to seamlessly operate their daily appointments, staff, inventory, and ZATCA compliance with absolute control, while delivering an elegant, sovereign digital experience for their clients.'}
            </p>
          </div>
        </div>

        {/* Section 4: The 8 Core Objectives (الأهداف الثمانية كبطاقات) */}
        <div className="mb-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <Target className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'أهدافنا الاستراتيجية الثمانية' : 'Our 8 Strategic Objectives'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              {isAr ? 'أهداف راش إكس لتطوير القطاع' : 'RashX Strategic Objectives'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'ثماني ركائز أساسية صُممت عليها منصة راش إكس لإحداث نقلة نوعية في كفاءة وربحية الصالونات'
                : 'Eight fundamental pillars engineered to deliver unmatched efficiency and profitability for beauty facilities'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eightObjectives.map((obj) => {
              const Icon = obj.icon;
              return (
                <div
                  key={obj.id}
                  className="rounded-3xl bg-white p-6 border border-mist-gray shadow-2xs hover:shadow-md hover:border-dusty-blue transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-mist-gray/70 flex items-center justify-center text-ink group-hover:bg-dusty-blue group-hover:text-black transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold font-mono text-ink-muted/50">
                        0{obj.id}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-ink leading-snug">
                      {isAr ? obj.titleAr : obj.titleEn}
                    </h3>

                    <p className="text-xs text-ink-muted leading-relaxed">
                      {isAr ? obj.descAr : obj.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5: Core Values (قيمنا) */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'مبادئنا الثابتة' : 'Our Guiding Principles'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              {isAr ? 'قيم راش إكس' : 'Core Values of RashX'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'المعايير الأخلاقية والمهنية التي تحكم كل سطر برمجي نكتبه وكل علاقة نبنيها مع شركائنا'
                : 'The ethical and engineering standards that guide every line of code and customer interaction'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-3 hover:border-dusty-blue transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-mist-gray flex items-center justify-center text-ink shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-ink">
                    {isAr ? val.titleAr : val.titleEn}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {isAr ? val.descAr : val.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 6: Simple Timeline (التأسيس 2026 ثم محطات [TODO] القادمة) */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'مسيرة التطور والتوسع' : 'Milestones & Roadmap'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              {isAr ? 'محطات راش إكس' : 'RashX Milestones'}
            </h2>
            <p className="text-xs text-ink-muted">
              {isAr
                ? 'انطلاقة واثقة في عام 2026، ومسار تطويري مستمر يخدم نمو قطاع التجميل السعودي'
                : 'A confident launch in 2026 with a dedicated roadmap for Saudi beauty automation'}
            </p>
          </div>

          <div className="space-y-6 relative border-s-2 border-mist-gray ms-4 sm:ms-6 ps-6 sm:ps-8">
            {timelineMilestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Milestone Node Dot */}
                <div
                  className={`absolute -start-[31px] sm:-start-[39px] top-1.5 w-5 h-5 rounded-full border-4 border-white ${
                    milestone.isCurrent
                      ? 'bg-dusty-blue ring-4 ring-dusty-blue/20'
                      : 'bg-mist-gray/80 ring-2 ring-mist-gray'
                  }`}
                />

                <div className="p-6 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2.5 hover:border-dusty-blue transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-ink px-2.5 py-1 rounded-lg bg-white border border-mist-gray">
                      {milestone.year}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        milestone.isCurrent
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-mist-gray text-ink-muted border border-mist-gray'
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-ink">
                    {isAr ? milestone.titleAr : milestone.titleEn}
                  </h3>

                  <p className="text-xs text-ink-muted leading-relaxed">
                    {isAr ? milestone.descAr : milestone.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Strict Notice regarding unverified stats */}
          <div className="p-3.5 rounded-xl border border-dashed border-mist-gray bg-mist-gray/20 text-[11px] text-ink-muted text-center">
            {isAr
              ? 'تلتزم منصة راش إكس بالشفافية الكاملة وفق قواعد النشر وعدم اختلاق إحصائيات أو أرقام عملاء غير مؤكدة [TODO: إضافة إحصائيات النمو الرسمية المعتمدة فور صدور تقرير الأداء الدوري]'
              : 'RashX strictly adheres to transparency standards: unverified figures are held until formally audited [TODO: Insert audited metrics upon periodic governance report publication].'}
          </div>
        </div>

        {/* Section 7: Founder Snapshot Card (م. محمد عبده رشاد البهي) */}
        <div className="rounded-3xl bg-gradient-to-br from-white to-[#FAFBFB] p-8 sm:p-10 border border-mist-gray shadow-md mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Avatar / Monogram */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-mist-gray border-2 border-white shadow-lg flex flex-col items-center justify-center text-ink text-center p-4">
                  <span className="text-3xl font-semibold font-mono text-black">RX</span>
                  <span className="text-[10px] font-bold text-ink-muted mt-1 uppercase tracking-wider">
                    Founder
                  </span>
                </div>
                <div className="absolute -bottom-2 -end-2 w-8 h-8 rounded-full bg-dusty-blue text-black flex items-center justify-center shadow-md">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Founder Info & Narrative */}
            <div className="lg:col-span-9 space-y-4 text-center lg:text-start">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mist-gray text-[11px] font-semibold text-ink-muted">
                  <span>{isAr ? 'قيادة المنتج والتطوير' : 'Product Leadership'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-ink">
                  {isAr ? SITE_CONFIG.founder.nameAr : SITE_CONFIG.founder.nameEn}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-dusty-blue">
                  {isAr ? SITE_CONFIG.founder.roleAr : SITE_CONFIG.founder.roleEn}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-2xl">
                {isAr
                  ? 'مهندس برمجيات متخصص في بناء المنظومات السحابية الحديثة وحلول الأتمتة المؤسسية. يقود الرؤية المعمارية لمنصة راش إكس (RashX) لتحويل تحديات إدارة الصالونات المعقدة إلى واجهات رقمية انسيابية وسهلة الاستخدام، تجمع بين الانضباط المالي والضريبي وتجربة الرفاهية الرقمية.'
                  : 'Software engineer and system architect specializing in cloud infrastructure and enterprise automation. Leading the core product engineering of RashX to deliver resilient, scalable software engineered specifically for the Saudi beauty economy.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href={`/${locale}/founder`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl transition-all shadow-xs"
                >
                  <span>{isAr ? 'تعرف على رؤية المؤسس كاملة' : 'Read Full Founder Story'}</span>
                  {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Link>

                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-xl transition-colors"
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Verified Company Information Table */}
        <div className="rounded-3xl bg-white p-8 sm:p-10 border border-mist-gray shadow-xs mb-16 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-ink">
              {isAr ? 'بيانات ومعلومات الشركة الرسمية' : 'Official Corporate Profile'}
            </h2>
            <p className="text-xs text-ink-muted">
              {isAr
                ? 'بيانات التحقق والتوثيق المعتمدة لمنصة راش إكس'
                : 'Verified corporate and operational profile of RashX'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-mist-gray/80 space-y-1">
              <span className="text-ink-muted text-[11px] block">{isAr ? 'الاسم التجاري' : 'Brand Name'}</span>
              <span className="font-bold text-ink">{SITE_CONFIG.name}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-mist-gray/80 space-y-1">
              <span className="text-ink-muted text-[11px] block">{isAr ? 'سنة التأسيس' : 'Founded Year'}</span>
              <span className="font-bold text-ink font-mono">{SITE_CONFIG.foundedYear}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-mist-gray/80 space-y-1">
              <span className="text-ink-muted text-[11px] block">{isAr ? 'المؤسس ورئيس المنتج' : 'Founder'}</span>
              <span className="font-bold text-ink">{isAr ? SITE_CONFIG.founder.nameAr : SITE_CONFIG.founder.nameEn}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-mist-gray/80 space-y-1">
              <span className="text-ink-muted text-[11px] block">{isAr ? 'السوق المستهدف' : 'Target Market'}</span>
              <span className="font-bold text-ink">{isAr ? 'المملكة العربية السعودية (KSA)' : 'Saudi Arabia (KSA)'}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-mist-gray/80 space-y-1">
              <span className="text-ink-muted text-[11px] block">{isAr ? 'الموقع الرسمي' : 'Official Website'}</span>
              <a href={SITE_CONFIG.url} target="_blank" rel="noopener noreferrer" className="font-bold text-dusty-blue hover:underline">
                https://rashx.org
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-mist-gray/80 space-y-1">
              <span className="text-ink-muted text-[11px] block">{isAr ? 'الهاتف المعتمد' : 'Phone / WhatsApp'}</span>
              <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="font-bold text-ink font-mono" dir="ltr">
                {SITE_CONFIG.phone}
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-mist-gray/80 space-y-1">
              <span className="text-ink-muted text-[11px] block">{isAr ? 'البريد الإلكتروني' : 'Official Email'}</span>
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-bold text-ink">
                {SITE_CONFIG.email}
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-mist-gray/80 space-y-1">
              <span className="text-ink-muted text-[11px] block">{isAr ? 'الفوترة الإلكترونية' : 'E-Invoicing Readiness'}</span>
              <span className="font-bold text-ink">{isAr ? 'المرحلة الثانية (ZATCA)' : 'ZATCA Phase 2 Ready'}</span>
            </div>
          </div>
        </div>

        {/* Section 9: Closing CTA Banner */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'ابدأ تجربة التحول الرقمي لمنشأتك' : 'Begin Your Facility Transformation'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {isAr
                ? 'جاهز لنقل صالونك إلى معايير الإدارة الذكية؟'
                : 'Ready to Upgrade Your Salon to Smart Management?'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
              {isAr
                ? 'احجز جلسة عرض تجريبي حي لمدة 20 دقيقة مع مستشارينا، وشاهد كيف تعمل راش إكس على خصوصية صالونك بنطاق فرعي مخصص وبدون أي التزام.'
                : 'Schedule a tailored 20-minute live demonstration with our team. Explore how RashX runs on your private subdomain with zero commitment.'}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              href={`/${locale}/demo`}
              className="px-6 py-3 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? 'احجز عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book Free 20-Min Demo'}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? 'مرحبًا راش إكس، أود الاستفسار عن منصتكم لإدارة الصالونات ومراكز التجميل.'
                  : 'Hello RashX, I would like to inquire about your salon management platform.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'تحدث معنا عبر واتساب' : 'WhatsApp Consultation'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
