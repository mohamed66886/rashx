import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  FileCheck2,
  QrCode,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Building2,
  Layers,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  PhoneCall,
  Laptop2,
  Calendar,
  BookOpen,
  Info,
  Check,
  Scale,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getFAQPageSchema,
  getBreadcrumbSchema,
  getSoftwareApplicationSchema,
  getArticleSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface ZatcaPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ZatcaPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'الفوترة الإلكترونية للصالونات في السعودية – المرحلة الثانية (ZATCA) | RashX'
      : 'Saudi Salon E-Invoicing Phase 2 (ZATCA) | RashX',
    description: isAr
      ? 'دليل الفوترة الإلكترونية للصالونات في السعودية – المرحلة الثانية ZATCA. تعرف على متطلبات الربط والتكامل وكيف تدعم راش إكس إصدار الفواتير المتوافقة.'
      : 'Complete guide to ZATCA Phase 2 E-Invoicing for salons and spas in Saudi Arabia. Learn how RashX supports integration and compliance.',
    keywords: [
      'الفوترة الإلكترونية للصالونات',
      'فوترة ZATCA المرحلة الثانية',
      'برنامج فواتير إلكترونية معتمد السعودية',
      'فاتورة إلكترونية صالون تجميل',
      'الربط والتكامل ZATCA مشاغل',
      'ZATCA phase 2 salon software',
    ],
    pathname: '/zatca',
    noIndex: false,
  });
}

export default async function ZatcaPage({ params }: ZatcaPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    {
      name: isAr ? 'الفوترة الإلكترونية (ZATCA)' : 'ZATCA E-Invoicing',
      item: `/${locale}/zatca`,
    },
  ];

  // 8 Specific In-depth ZATCA FAQs
  const zatcaFaqs = [
    {
      question: isAr
        ? 'هل برنامج راش إكس معتمد أو مرخص رسميًا من هيئة الزكاة والضريبة والجمارك (ZATCA)؟'
        : 'Is RashX officially certified or licensed by ZATCA?',
      answer: isAr
        ? 'تدعم منصة راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة ومتطلبات الربط والتفعيل الصادرة عن هيئة الزكاة والضريبة والجمارك. نوضح لعملائنا بكل شفافية أننا نوفر البنية التقنية البرمجية المتوافقة التي تمكّن منشأتك من توليد الفواتير بالصيغ المعتمدة وربط أجهزتك مع منصة "فاتورة"، دون الادعاء بأي اعتماد حصري مسبق خارج الضوابط المنظمة.'
        : 'RashX supports ZATCA Phase 2 (Integration & Linking) e-invoicing technical criteria subject to facility onboarding status and regulatory guidelines. We provide the compliant software layer for cryptographic QR generation and API linking without asserting unverified claims.',
    },
    {
      question: isAr
        ? 'ما الفرق بين الفاتورة الضريبية والفاتورة الضريبية المبسطة لصالونات ومراكز التجميل؟'
        : 'What is the difference between a Tax Invoice and a Simplified Tax Invoice for salons?',
      answer: isAr
        ? 'في صالونات ومراكز التجميل، تكون معظم المعاملات موجهة للمستهلك النهائي الأفراد (B2C)؛ وتُصدر لها "فاتورة ضريبية مبسطة" تتضمن بيانات الصالون، الرقم الضريبي، تفاصيل الخدمات والضريبة 15%، ورمز الاستجابة السريعة (QR Code) المشفر. أما الفاتورة الضريبية الكاملة فتُصدر عند التعامل مع شركات أخرى (B2B) وتتطلب ذكر الرقم الضريبي للعميل وعنوانه وتخضع لمرحلة الاعتماد المسبق (Clearance).'
        : 'Salons mostly issue Simplified Tax Invoices for individual retail customers (B2C), featuring salon tax ID, itemized 15% VAT, and cryptographic QR code. Full Tax Invoices are issued for corporate clients (B2B) requiring buyer tax identification and clearance.',
    },
    {
      question: isAr
        ? 'ما هو رمز الاستجابة السريعة (QR Code) المشفر المطلوب على فواتير الصالون؟'
        : 'What is the cryptographic QR Code required on salon receipts?',
      answer: isAr
        ? 'هو رمز رقمي مشفر يتضمن بيانات إلزامية وفق معايير الهيئة (اسم المنشأة، الرقم الضريبي، طابع الوقت والتاريخ، إجمالي الفاتورة شاملاً الضريبة، ومبلغ ضريبة القيمة المضافة)، وفي المرحلة الثانية يشتمل أيضًا على التوقيع الرقمي والتشفير لضمان عدم التلاعب بالفاتورة بعد إصدارها.'
        : 'A cryptographic barcode embedding mandatory fields (seller name, VAT number, timestamp, total with VAT, VAT amount, and Phase 2 digital cryptographic signature) ensuring the invoice is tamper-evident.',
    },
    {
      question: isAr
        ? 'هل يلزم الصالون شراء أجهزة كاشير معينة ومكلفة للربط مع ZATCA؟'
        : 'Does the salon need to purchase expensive proprietary POS hardware?',
      answer: isAr
        ? 'لا. صُممت راش إكس كمنظومة سحابية بالكامل؛ وتعمل عبر أي جهاز كمبيوتر، شاشة لمس، أو جهاز لوحي (iPad / Android) متصل بالإنترنت ومزود بطابعة إيصالات قياسية تدعم طباعة رمز الاستجابة السريعة بوضوح، مما يوفر تكاليف الأجهزة الباهظة.'
        : 'No. RashX is cloud-native, running smoothly on any modern PC, tablet, or touchscreen connected to a standard thermal receipt printer that supports clear QR printing.',
    },
    {
      question: isAr
        ? 'ماذا يحدث إذا انقطع الاتصال بالإنترنت أثناء إصدار الفاتورة في الصالون؟'
        : 'What happens if the internet goes down during checkout?',
      answer: isAr
        ? 'وفق ضوابط هيئة الزكاة والضريبة والجمارك الخاصة بالفواتير الضريبية المبسطة (B2C)، يمكن للمنشأة الاستمرار في إصدار الفواتير للعملاء محليًا مع طباعة رمز QR، ويقوم النظام بحفظها في سجل مؤمن ليتم إشعار منصة "فاتورة" وإرسالها تلقائيًا فور استعادة الاتصال بالإنترنت خلال المهلة النظامية.'
        : 'Under ZATCA B2C guidelines, simplified invoices can be issued locally with compliant QR codes, queued securely, and transmitted automatically to the Fatoora platform once internet connectivity resumes.',
    },
    {
      question: isAr
        ? 'متى تصبح منشأتي ملزمة بالربط مع المرحلة الثانية لمنصة فاتورة؟'
        : 'When does my beauty facility become legally mandated to integrate with Phase 2?',
      answer: isAr
        ? 'تُحدد هيئة الزكاة والضريبة والجمارك مجموعات الإلزام تدريجيًا بناءً على حجم الإيرادات السنوية الخاضعة لضريبة القيمة المضافة للمنشآت، وتقوم الهيئة بإشعار كل مجموعة رسمياً قبل 6 أشهر على الأقل من تاريخ الإلزام المحدد. نوصي بمراجعة إشعارات حساب المنشأة في الهيئة باستمرار.'
        : 'ZATCA rolls out Phase 2 integration waves progressively based on annual taxable revenues, formally notifying each wave at least 6 months prior to their deadline.',
    },
    {
      question: isAr
        ? 'هل يحتاج الصالون إلى فني تقني متخصص لإجراء الربط والتفعيل؟'
        : 'Does the salon require an on-site IT engineer for activation?',
      answer: isAr
        ? 'لا يتطلب الأمر فريقًا تقنيًا داخل صالونك؛ فمن خلال إرشادات راش إكس البسيطة، يقوم فريق الدعم الفني بمساعدتك خطوة بخطوة في استخراج رمز التفعيل (OTP) من بوابة الهيئة وإدخاله في لوحة تحكم صالونك لإتمام الربط بسلاسة.'
        : 'No internal IT staff needed. RashX support guides you step-by-step through generating your OTP on the ZATCA portal and activating your digital certificate within minutes.',
    },
    {
      question: isAr
        ? 'هل الأسعار المعروضة في باقات راش إكس تشمل ضريبة القيمة المضافة 15%؟'
        : 'Do RashX subscription prices include 15% VAT?',
      answer: isAr
        ? 'تُوضح الأسعار الرسمية لراش إكس في صفحة الأسعار بالريال السعودي [TODO]، مع بيان صريح ومحدد يوضح ما إذا كانت الباقة تشمل أو لا تشمل ضريبة القيمة المضافة 15% وفق المعايير والأنظمة الضريبية السارية في المملكة.'
        : 'Prices are presented in Saudi Riyals (SAR) with clear disclosure regarding whether figures include or exclude the 15% VAT rate in compliance with Saudi tax guidelines.',
    },
  ];

  // The 3 General Activation Steps
  const activationSteps = [
    {
      step: '01',
      titleAr: 'تسجيل المنشأة في منصة فاتورة (Fatoora)',
      titleEn: 'Register on the Fatoora Portal',
      descAr:
        'الدخول إلى بوابة هيئة الزكاة والضريبة والجمارك عبر حساب المنشأة الرسمي، وتوليد رمز التحقق لمرة واحدة (OTP) المخصص لنقطة البيع أو الكاشير.',
      descEn:
        'Log in to the official ZATCA Fatoora portal using your facility credentials and generate an OTP for your POS device.',
    },
    {
      step: '02',
      titleAr: 'الربط البرمجي وشهادة الامتثال الرقمية (CSID)',
      titleEn: 'API Integration & Compliance CSID',
      descAr:
        'إدخال رمز التحقق في لوحة تحكم راش إكس لتوليد زوج المفاتيح التشفيرية وشهادة الامتثال الرقمية وربط النظام سحابيًا مع منصة الهيئة.',
      descEn:
        'Enter your OTP into the RashX admin settings to generate your cryptographic key pair, obtain your CSID, and link with ZATCA APIs.',
    },
    {
      step: '03',
      titleAr: 'البدء وإصدار الفواتير المتوافقة مباشرة',
      titleEn: 'Go Live & Issue Compliant Invoices',
      descAr:
        'إصدار الفواتير الضريبية المبسطة عند كل عملية دفع في الصالون مع رمز QR المشفر، وإرسال التقارير المؤتمتة للهيئة في الخلفية دون أي جهد إضافي.',
      descEn:
        'Issue simplified tax invoices at checkout with encrypted QR codes while background reporting to ZATCA occurs automatically.',
    },
  ];

  // Educational Blog Articles Links
  const relatedArticles = [
    {
      titleAr: 'دليل الصالونات الشامل لمتطلبات الفوترة الإلكترونية المرحلة الثانية',
      titleEn: 'Complete Salon Guide to ZATCA Phase 2 E-Invoicing',
      descAr: 'شرح مبسط لكافة المعايير الفنية والضريبية التي يجب على ملاك المشاغل ومراكز التجميل معرفتها.',
      descEn: 'Simplified walkthrough of all technical and tax standards required for Saudi beauty facilities.',
      readTime: isAr ? '5 دقائق قراءة' : '5 min read',
      href: `/${locale}/blog/zatca-phase-2-guide-salons`,
    },
    {
      titleAr: 'كيف تتجنب المخالفات الضريبية الشائعة في صالونات ومراكز التجميل؟',
      titleEn: 'Avoiding Common Tax Infractions in Beauty Centers',
      descAr: 'أهم الممارسات المحاسبية لحفظ السجلات وتفادي أخطاء احتساب ضريبة القيمة المضافة 15%.',
      descEn: 'Key accounting best practices to maintain compliant records and avoid 15% VAT miscalculations.',
      readTime: isAr ? '4 دقائق قراءة' : '4 min read',
      href: `/${locale}/blog/avoiding-tax-fines-salons`,
    },
    {
      titleAr: 'الفاتورة المبسطة مقابل الفاتورة الضريبية: ما الفرق لصالونك؟',
      titleEn: 'Simplified vs. Standard Tax Invoice: What Salons Must Know',
      descAr: 'متى تصدر فاتورة مبسطة للمستهلك النهائي ومتى يلزم إصدار فاتورة ضريبية كاملة للشركات.',
      descEn: 'When to issue B2C simplified receipts and when corporate B2B full tax invoices are legally required.',
      readTime: isAr ? '4 دقائق قراءة' : '4 min read',
      href: `/${locale}/blog/simplified-vs-standard-tax-invoice`,
    },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      {/* Structured Data: Article + FAQPage + SoftwareApplication + Breadcrumbs */}
      <JsonLd
        data={getArticleSchema({
          headline: isAr
            ? 'دليل الفوترة الإلكترونية للصالونات في السعودية – المرحلة الثانية (ZATCA)'
            : 'Saudi Salon E-Invoicing Phase 2 Guide (ZATCA)',
          description: isAr
            ? 'شرح متكامل لمتطلبات الفوترة الإلكترونية المرحلة الثانية للصالونات ومراكز التجميل والسبا في المملكة وكيف تدعم راش إكس الامتثال.'
            : 'Complete guide on ZATCA Phase 2 e-invoicing for salons and spas in Saudi Arabia.',
          url: `${SITE_CONFIG.url}/${locale}/zatca`,
          image: `${SITE_CONFIG.url}/brand/social/og-share-blue.svg`,
          datePublished: '2026-01-01T00:00:00Z',
          locale,
        })}
        id="zatca-article-schema"
      />
      <JsonLd data={getFAQPageSchema(zatcaFaqs)} id="zatca-faq-schema" />
      <JsonLd data={getSoftwareApplicationSchema(locale)} id="zatca-software-schema" />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="zatca-breadcrumb-schema" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? 'الفوترة الإلكترونية (ZATCA)' : 'ZATCA E-Invoicing'}
          </span>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              {isAr
                ? 'الفوترة الإلكترونية للمنشآت في السعودية • المرحلة الثانية'
                : 'Saudi E-Invoicing Phase 2 • Integration & Linking'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
            {isAr
              ? 'فوترة إلكترونية لصالونك متوافقة مع متطلبات ZATCA'
              : 'Salon E-Invoicing Fully Aligned with ZATCA Requirements'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            {isAr
              ? 'دليل عملي شامل لأصحاب المشاغل، صالونات التجميل، مراكز الحلاقة، والسبا في المملكة العربية السعودية. تعرف على متطلبات المرحلة الثانية (الربط والتكامل)، وكيف تدعم منصة راش إكس إصدار الفواتير الضريبية المبسطة المزودة برمز QR المشفر وفق ضوابط هيئة الزكاة والضريبة والجمارك.'
              : 'A comprehensive operational guide for beauty salons, styling studios, barbershops, and spas in Saudi Arabia. Discover Phase 2 (Integration & Linking) criteria and how RashX supports compliant simplified tax invoices with cryptographic QR codes.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/demo`}
              className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? 'احجز عرضًا تجريبيًا وافحص جاهزيتك' : 'Book a Demo & Verify Readiness'}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? 'مرحبًا راش إكس، أود الاستفسار عن دعم الفوترة الإلكترونية ZATCA لصالوني.'
                  : 'Hello RashX, I would like to inquire about ZATCA e-invoicing compliance for my salon.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'استشارة فورية عبر واتساب' : 'WhatsApp Consultation'}</span>
            </a>
          </div>
        </div>

        {/* Section 1: Mandatory Official Regulatory Disclaimer (تنويه رسمي صريح) */}
        <div className="rounded-3xl bg-amber-50/70 border border-amber-200/80 p-6 sm:p-8 mb-16 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              {isAr
                ? 'تنويه تنظيمي هام بشأن معايير الفوترة الإلكترونية ومجموعات الإلزام'
                : 'Important Regulatory Notice on ZATCA E-Invoicing Standards'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
            {isAr
              ? 'تحدد هيئة الزكاة والضريبة والجمارك (ZATCA) متطلبات الفوترة الإلكترونية، ومراحل الإلزام، والضوابط الفنية بصفتها الجهة التنظيمية المختصة في المملكة العربية السعودية، وتخضع هذه الضوابط للتحديث الدوري من قِبل الهيئة. تدعم منصة راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة ومتطلبات الربط والتفعيل الصادرة عن الهيئة دون ادعاء أي اعتماد رسمي مسبق خارج النطاق النظامي. يُرجى دائمًا مراجعة القرارات والأدلة الرسمية عبر موقع الهيئة.'
              : 'The Zakat, Tax and Customs Authority (ZATCA) exclusively establishes e-invoicing criteria, rollout waves, and technical specifications, which are subject to regulatory updates. RashX supports ZATCA Phase 2 integration requirements subject to individual facility onboarding status without claiming proprietary certification. Always consult the official ZATCA portal for binding directives.'}
          </p>

          <div className="pt-2">
            <a
              href="https://zatca.gov.sa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-700 underline"
            >
              <span>{isAr ? 'زيارة الموقع الرسمي لهيئة الزكاة والضريبة والجمارك (zatca.gov.sa)' : 'Visit the Official ZATCA Portal (zatca.gov.sa)'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Section 2: What is E-Invoicing? (المرحلتان بشرح مبسط) */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'مفهوم الفوترة الإلكترونية (فاتورة)' : 'The Fatoora Project Explained'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr ? 'ما هي الفوترة الإلكترونية وما هما مرحلتاها؟' : 'What is E-Invoicing & Its Two Phases?'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'إجراء يهدف إلى تحويل إصدار الفواتير والإشعارات الورقية إلى منظومة إلكترونية منظمة تضمن الدقة ومنع التلاعب'
                : 'A nationwide initiative replacing manual handwritten bills with an auditable, encrypted electronic invoicing lifecycle'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phase 1 Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-mist-gray text-ink font-bold text-xs">
                  {isAr ? 'المرحلة الأولى: مرحلة الإصدار' : 'Phase 1: Generation Phase'}
                </span>
                <span className="text-xs font-mono text-ink-muted">ديسمبر 2021</span>
              </div>

              <h3 className="text-base font-bold text-ink">
                {isAr ? 'إصدار وحفظ الفواتير الإلكترونية' : 'Electronic Generation & Archiving'}
              </h3>

              <p className="text-xs text-ink-muted leading-relaxed">
                {isAr
                  ? 'ألزمت الهيئة كافة المنشآت المسجلة في ضريبة القيمة المضافة بالتوقف التام عن استخدام الفواتير الورقية المكتوبة يدويًا أو برامج معالجة النصوص، واستخدام نظام إلكتروني يصدر فواتير ضريبية مبسطة تحتوي على رمز الاستجابة السريعة (QR Code) وتمنع التعديل غير الموثق.'
                  : 'Prohibited all handwritten and manual text invoices, requiring VAT-registered facilities to use compliant e-invoicing software generating simplified receipts with essential QR codes.'}
              </p>

              <div className="text-[11px] text-ink-muted/80 pt-2 border-t border-mist-gray">
                {isAr ? '✓ تشمل: الاسم، الرقم الضريبي، التاريخ، الإجمالي، والضريبة.' : '✓ Included: Business name, Tax ID, timestamp, totals, and VAT.'}
              </div>
            </div>

            {/* Phase 2 Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                  {isAr ? 'المرحلة الثانية: الربط والتكامل' : 'Phase 2: Integration & Linking'}
                </span>
                <span className="text-xs font-mono text-emerald-800 font-bold">يناير 2023 وما بعدها</span>
              </div>

              <h3 className="text-base font-bold text-ink">
                {isAr ? 'الربط المباشر مع منصة "فاتورة" (ZATCA)' : 'Direct API Integration with Fatoora Platform'}
              </h3>

              <p className="text-xs text-ink-muted leading-relaxed">
                {isAr
                  ? 'مرحلة متقدمة تُطبق على مجموعات إلزامية تدريجية. تتطلب ربط نظام الفوترة الخاص بالصالون عبر واجهات برمجية (APIs) مع منصة الهيئة، وإصدار الفواتير بصيغ XML أو PDF/A-3 مشفرة بتوقيع رقمي (Cryptographic Stamp) ورمز QR مشفر ومربوط بسلسلة التشفير (Hash).'
                  : 'Mandated in progressive waves. Requires direct API integration linking the salon POS to ZATCA, generating XML/PDF/A-3 formats signed with digital certificates and cryptographic chains.'}
              </p>

              <div className="text-[11px] text-emerald-800 font-semibold pt-2 border-t border-emerald-200">
                {isAr ? '⚡ تدعم راش إكس البنية التقنية المؤهلة لهذا الربط وفق حالة المنشأة.' : '⚡ RashX provides the technical architecture engineered for this integration.'}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Who is Mandated? (من يجب عليه الالتزام؟) */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-ink">
              {isAr ? 'من يجب عليه الالتزام من صالونات ومراكز التجميل؟' : 'Who Must Comply in the Beauty Industry?'}
            </h2>
            <p className="text-xs text-ink-muted">
              {isAr
                ? 'تنطبق متطلبات الفوترة الإلكترونية على المنشآت الخاضعة لضريبة القيمة المضافة في المملكة'
                : 'Applicable to all VAT-registered commercial entities operating in Saudi Arabia'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
              <span className="font-bold text-ink block text-sm">الصالونات النسائية والمشاغل</span>
              <p className="text-ink-muted leading-relaxed">
                كل مشغل أو صالون مسجل في ضريبة القيمة المضافة ويصدر فواتير خدمات تجميل وتصفيف شعر ومكياج للمستهلكات.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
              <span className="font-bold text-ink block text-sm">مراكز الحلاقة الرجالية</span>
              <p className="text-ink-muted leading-relaxed">
                صالونات الحلاقة والعناية الرجالية المسجلة ضريبيًا وتتعامل بالنقد أو بطاقات مدى مع الأفراد.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
              <span className="font-bold text-ink block text-sm">مراكز السبا والاستجمام</span>
              <p className="text-ink-muted leading-relaxed">
                مجمعات الاستجمام والمساج والحمام المغربي التي تبيع باقات علاجية وجلسات استرخاء فردية أو جماعية.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
              <span className="font-bold text-ink block text-sm">سلاسل الفروع وعيادات التجميل</span>
              <p className="text-ink-muted leading-relaxed">
                الشركات والمؤسسات الكبرى ذات الفروع المتعددة المشمولة بمجموعات الإلزام المتقدمة لهيئة ZATCA.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: How RashX Supports Integration (كيف تدعم RashX الربط والتفعيل؟) */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <Laptop2 className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'الحل البرمجي السحابي' : 'Cloud Architecture'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr ? 'كيف تدعم راش إكس الربط والتفعيل لمنشأتك؟' : 'How RashX Supports Your ZATCA Integration'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'بنية برمجية مهيأة للتعامل مع متطلبات المرحلة الثانية وفق حالة كل منشأة ومتطلبات الهيئة'
                : 'Engineered architecture tailored to handle Phase 2 requirements per facility readiness'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-3">
              <div className="w-10 h-10 rounded-xl bg-dusty-blue/20 text-black flex items-center justify-center font-bold">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-ink">تشفير رمز QR المشفر تلقائيًا</h3>
              <p className="text-ink-muted leading-relaxed">
                توليد رمز الاستجابة السريعة المشفر على كل إيصال صالون لحظيًا، ليتيح للعميل ومفتشي الهيئة التحقق من سلامة الفاتورة ومطابقتها.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-3">
              <div className="w-10 h-10 rounded-xl bg-dusty-blue/20 text-black flex items-center justify-center font-bold">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-ink">صيغ الفواتير المعيارية (XML / PDF/A-3)</h3>
              <p className="text-ink-muted leading-relaxed">
                إنشاء الفواتير وفق مواصفات UBL 2.1 XML المعيارية المطلوبة من قِبل ZATCA وحفظ النسخ الرقمية المشفرة وفق الأطر النظامية.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-3">
              <div className="w-10 h-10 rounded-xl bg-dusty-blue/20 text-black flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-ink">سجل تدقيق آمن يمنع التلاعب (Tamper-evident)</h3>
              <p className="text-ink-muted leading-relaxed">
                حفظ متسلسل وغير قابل للتعديل لكافة الفواتير الصادرة، مع أرشفة سحابية محمية تضمن الامتثال الكامل عند الفحص الضريبي.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: The 3 General Activation Steps (خطوات التفعيل بصيغة عامة) */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'مسار التفعيل الميسر' : 'General Activation Roadmap'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr ? 'خطوات التفعيل والربط بصيغة عامة' : '3 High-Level Activation Steps'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'خطوات واضحة ومباشرة لتجهيز منشأتك وربط نقطة البيع دون تعقيد'
                : 'A clear 3-step workflow to prepare your salon and integrate POS devices'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activationSteps.map((st) => (
              <div
                key={st.step}
                className="p-6 sm:p-7 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-3 relative"
              >
                <div className="text-2xl font-black font-mono text-dusty-blue">
                  {st.step}
                </div>
                <h3 className="text-sm font-bold text-ink">
                  {isAr ? st.titleAr : st.titleEn}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {isAr ? st.descAr : st.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Benefits for the Facility (فوائد الالتزام للمنشأة) */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-6">
          <div className="max-w-2xl space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-ink">
              {isAr ? 'فوائد الامتثال بالفوترة الإلكترونية لمنشأتك' : 'Operational Benefits for Your Salon'}
            </h2>
            <p className="text-xs text-ink-muted">
              {isAr ? 'أكثر من مجرد التزام نظامي؛ إنها نقلة نحو الدقة المالية التامة' : 'Beyond compliance: a leap forward in operational efficiency'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60 space-y-1.5">
              <span className="font-bold text-emerald-950 block">تفادي الغرامات المالية</span>
              <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                حماية المنشأة من العقوبات والغرامات المترتبة على إصدار فواتير ورقية أو عدم تضمين رمز QR.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60 space-y-1.5">
              <span className="font-bold text-emerald-950 block">سهولة الإقرار الضريبي ربع السنوي</span>
              <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                توليد تقارير الإقرار الضريبي وحساب ضريبة الـ 15% بدقة تلقائية بضغطة زر واحدة.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60 space-y-1.5">
              <span className="font-bold text-emerald-950 block">الربط الآلي مع المبيعات والمخزون</span>
              <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                ربط كل فاتورة بخدمة مؤداة ومواد مستهلكة من المخزون وعمولة موظفة لمنع أي هدر.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/60 space-y-1.5">
              <span className="font-bold text-emerald-950 block">تعزيز موثوقية الصالون</span>
              <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                بناء ثقة عالية لدى العميلات بتقديم فواتير رقمية احترافية تحمل هوية الصالون وشعاره.
              </p>
            </div>
          </div>
        </div>

        {/* Section 7: FAQ (8 أسئلة وإجابات دقيقة) */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'إجابات شفافة ونظامية' : 'Transparent Answers'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr ? 'الأسئلة الشائعة حول فوترة الصالونات وZATCA' : 'ZATCA E-Invoicing Frequently Asked Questions'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'إجابات صريحة ودقيقة دون ادعاءات اعتماد غير مصرح بها'
                : 'Direct facts regarding compliance and integration criteria'}
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto pt-4">
            {zatcaFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl bg-[#FAFBFB] border border-mist-gray p-5 transition-colors open:bg-white open:border-dusty-blue"
              >
                <summary className="flex items-center justify-between font-bold text-sm text-ink cursor-pointer list-none">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-ink-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-xs text-ink-muted leading-relaxed mt-3 pt-3 border-t border-mist-gray">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Section 8: Related Blog Articles */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-ink">
                {isAr ? 'مقالات وأدلة توعوية من مدونة راش إكس' : 'Educational Guides from RashX Blog'}
              </h2>
              <p className="text-xs text-ink-muted">
                {isAr ? 'مقالات إرشادية تساعدك على فهم الجوانب الضريبية والتشغيلية لمنشأتك' : 'In-depth articles covering tax compliance and salon operations'}
              </p>
            </div>

            <Link
              href={`/${locale}/blog`}
              className="text-xs font-bold text-dusty-blue hover:underline hidden sm:flex items-center gap-1"
            >
              <span>{isAr ? 'عرض كافة المقالات' : 'View all articles'}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((art, idx) => (
              <Link
                key={idx}
                href={art.href}
                className="rounded-3xl bg-white p-6 border border-mist-gray hover:border-dusty-blue shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-ink-muted">
                    <span className="font-semibold text-dusty-blue">{art.readTime}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-mist-gray">توعية ضريبية</span>
                  </div>

                  <h3 className="text-sm font-bold text-ink group-hover:text-dusty-blue transition-colors leading-snug">
                    {art.titleAr}
                  </h3>

                  <p className="text-xs text-ink-muted leading-relaxed">
                    {art.descAr}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-mist-gray flex items-center justify-between text-xs font-bold text-ink group-hover:text-dusty-blue transition-colors">
                  <span>{isAr ? 'اقرأ المقال الكامل' : 'Read Article'}</span>
                  {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 9: Closing CTA */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'امتثال هادئ وفواتير منضبطة' : 'Peace of Mind Compliance'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {isAr
                ? 'جاهز لضمان توافق فواتير صالونك مع متطلبات ZATCA؟'
                : 'Ready to Ensure Your Salon Invoices Align with ZATCA?'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
              {isAr
                ? 'احجز جلسة عرض تجريبي مباشر لمدة 20 دقيقة، واكتشف كيف تدعم راش إكس إصدار فواتيرك الضريبية بنطاق فرعي مخصص وبأعلى معايير الأمان، مع تجربة مجانية لمدة 14 يومًا بدون بطاقة بنكية.'
                : 'Book a 20-minute tailored walkthrough. Discover how RashX supports compliant invoicing on your private subdomain with a 14-day free trial.'}
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
                  ? 'مرحبًا راش إكس، أود الاستفسار عن دعم الفوترة الإلكترونية ZATCA لصالوني.'
                  : 'Hello RashX, I would like to consult on ZATCA e-invoicing for my salon.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

