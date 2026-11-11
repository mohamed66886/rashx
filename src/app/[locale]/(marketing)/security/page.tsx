import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Server,
  KeyRound,
  FileCheck2,
  EyeOff,
  Database,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Sliders,
  BadgeCheck,
  AlertTriangle,
  UserCheck,
  Cpu,
  Layers,
  HardDrive,
  FileText,
  Activity,
  Workflow,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getFAQPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface SecurityPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: SecurityPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'أمان بياناتك وبيانات عملائك أولويتنا | RashX'
      : 'Securing Your Data and Your Clients’ Data Is Our Priority | RashX',
    description: isAr
      ? 'حماية بيانات الصالونات والمراجعين في راش إكس: تنظيم الصلاحيات، إدارة الأدوار، الفصل المنطقي بين المنشآت، بيئة تشغيل موثوقة، واستمرارية الأعمال.'
      : 'Enterprise salon data security at RashX: granular permissions, role management, logical tenant isolation, reliable operating environment, and business continuity.',
    keywords: [
      'أمان بيانات الصالونات',
      'تنظيم الوصول بالصلاحيات',
      'إدارة الأدوار والمستخدمين',
      'الفصل المنطقي بين بيانات المنشآت',
      'نظام حماية البيانات الشخصية PDPL',
      'سرية معلومات الصالون',
      'استمرارية أعمال الصالونات',
    ],
    pathname: '/security',
    noIndex: false,
  });
}

export default async function SecurityPage({ params }: SecurityPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'الأمان والخصوصية' : 'Security & Privacy', item: `/${locale}/security` },
  ];

  /* =========================================================================
     THE 7 SECURITY PILLARS (من وصف الشركة المعتمد)
     ========================================================================= */
  const securityPillars = [
    {
      icon: KeyRound,
      titleAr: 'تنظيم الوصول بالصلاحيات',
      titleEn: 'Access Control by Granular Permissions',
      descAr:
        'تحديد دقيق وصارم لما يمكن لكل موظف الاطلاع عليه أو تنفيذه؛ لمنع أي تجاوزات تشغيلية، وحماية السجلات المالية، والأسعار، وقوائم العملاء من أي عبث.',
      descEn:
        'Granular control dictating exact viewing and execution rights per staff member, preventing unauthorized changes to financial ledgers, pricing, or client rosters.',
    },
    {
      icon: UserCheck,
      titleAr: 'إدارة الأدوار والمستخدمين',
      titleEn: 'Role & User Management',
      descAr:
        'تصنيف المستخدمين وفق أدوار وظيفية واضحة (المالك، مدير الفرع، موظف الاستقبال، مقدم الخدمة/الأخصائية، المحاسب)؛ حيث يحصل كل مستخدم على شاشة مستقلة مقيدة باختصاصه.',
      descEn:
        'Clear organizational roles (Owner, Branch Manager, Receptionist, Specialist, Accountant) ensuring every user interacts solely with their authorized functional portal.',
    },
    {
      icon: Lock,
      titleAr: 'حماية الحسابات والبيانات',
      titleEn: 'Account & Data Protection',
      descAr:
        'آليات أمان استباقية لحماية حسابات تسجيل الدخول، ومنع محاولات الدخول غير المصرح بها، وتشفير كافة البيانات المتداولة عبر بروتوكول TLS 1.3 المشفر بنكياً.',
      descEn:
        'Proactive safeguards securing login credentials, blocking brute-force attempts, and encrypting all active traffic using modern TLS 1.3 cryptographic protocols.',
    },
    {
      icon: Server,
      titleAr: 'الفصل المنطقي بين بيانات المنشآت',
      titleEn: 'Logical Separation of Facility Data',
      descAr:
        'تعمل كل منشأة في بيئة سحابية معزولة تماماً بنطاق فرعي مخصص (*.rashx.org)؛ حيث تُعزل قواعد البيانات ومنطق المعالجة منطقياً لمنع أي تداخل أو تسريب بين المنشآت.',
      descEn:
        'Every facility operates within an isolated cloud partition under its own subdomain (*.rashx.org), enforcing strict logical database separation with zero cross-tenant leakage.',
    },
    {
      icon: EyeOff,
      titleAr: 'سرية المعلومات',
      titleEn: 'Information Confidentiality',
      descAr:
        'التزام كامل بسرية البيانات وتطبيق تقنية حجب أرقام جوالات العميلات التلقائي (Phone Masking 05****1234) لحماية قاعدة عميلاتك من التسريب أو المنافسة غير المشروعة.',
      descEn:
        'Unconditional commitment to data confidentiality, featuring automated client phone masking (05****1234) safeguarding customer databases from unauthorized extraction.',
    },
    {
      icon: Cpu,
      titleAr: 'بيئة تشغيل موثوقة',
      titleEn: 'Reliable Operating Environment',
      descAr:
        'بنية سحابية حديثة مصممة لتفادي التعارض في المواعيد، وضمان ثبات الأداء وسرعة الاستجابة حتى خلال أوقات الذروة والمواسم الكبرى في المملكة العربية السعودية.',
      descEn:
        'Modern cloud architecture engineered to eliminate double-booking clashes and maintain lightning-fast response times during intense Saudi holiday seasons.',
    },
    {
      icon: RefreshCw,
      titleAr: 'استمرارية الأعمال',
      titleEn: 'Business Continuity & Disaster Recovery',
      descAr:
        'إجراءات نسخ احتياطي تلقائي مشفرة يومياً، وتوزيع مرن للخدمات يضمن استمرارية أعمال صالونك بنسبة توافر لا تقل عن 99.9%، مع خطط تعافٍ سريعة من الطوارئ.',
      descEn:
        'Automated encrypted daily snapshots and redundant service architecture guaranteeing 99.9% operational availability with resilient disaster recovery protocols.',
    },
  ];

  /* =========================================================================
     FAQ ACCORDION DATA (concise, verified, strict on hosting [TODO])
     ========================================================================= */
  const securityFaqs = [
    {
      question: isAr
        ? 'أين تُستضاف بيانات صالوني وعملائي؟'
        : 'Where is my facility and client data hosted?',
      answer: isAr
        ? '[TODO: مكان استضافة البيانات - يُحدد وفق مزود الاستضافة السحابي المعتمد وبيئة التشغيل المخصصة للمنصة]. يتم تطبيق الفصل المنطقي الصارم والتشفير التام لضمان سيادة وسرية بياناتك.'
        : '[TODO: Data hosting infrastructure location is determined based on the authorized cloud hosting partner and certified deployment environment]. Strict logical tenant isolation and end-to-end encryption are enforced.',
    },
    {
      question: isAr
        ? 'كيف يعمل الفصل المنطقي بين المنشآت على منع وصول الصالونات الأخرى لبياناتي؟'
        : 'How does logical tenant separation prevent other salons from accessing my data?',
      answer: isAr
        ? 'تحصل كل منشأة على نطاق فرعي خاص (*.rashx.org). تُقيد كافة استعلامات قواعد البيانات بمفتاح عزل فريد يمنع أي خادم أو استعلام من جلب بيانات لا تخص المنشأة المحددة، مما يجعل الوصول المشترك مستحيلاً معمارياً.'
        : 'Each facility is provisioned with a dedicated subdomain (*.rashx.org). Every database transaction is locked to a verified tenant context, making cross-tenant querying architecturally impossible.',
    },
    {
      question: isAr
        ? 'كيف يحمي النظام أرقام هواتف العميلات من السرقة بواسطة موظفي الصالون؟'
        : 'How does RashX prevent customer phone theft by salon staff?',
      answer: isAr
        ? 'تطبق المنصة حجب أرقام الهواتف (Phone Masking) تلقائياً على شاشات الاستقبال ومقدمي الخدمة (يظهر الرقم بصيغة 05****1234). كما تمنع تصدير جداول العملاء إلا للمالك الرئيسي فقط بتوثيق ثنائي.'
        : 'The platform enforces automated phone masking (05****1234) across front-desk and stylist screens, while bulk contact downloads are restricted exclusively to primary owners via multi-factor authentication.',
    },
    {
      question: isAr
        ? 'هل يتوافق النظام مع نظام حماية البيانات الشخصية السعودي (PDPL)؟'
        : 'Does RashX comply with the Saudi Personal Data Protection Law (PDPL)?',
      answer: isAr
        ? 'نعم، تلتزم راش إكس بضوابط نظام حماية البيانات الشخصية السعودي (PDPL) ولائحته التنفيذية، بما يشمل الشفافية والموافقة الصريحة، وتحديد الغرض، وتمكين المنشأة من تلبية حقوق العميل في مراجعة أو إتلاف بياناته.'
        : 'Yes, RashX adheres strictly to the Saudi Personal Data Protection Law (PDPL), providing transparent consent mechanisms, purpose limitation, and tools enabling facilities to honor client data access and erasure rights.',
    },
    {
      question: isAr
        ? 'كيف تضمن راش إكس استمرارية الأعمال وحماية البيانات من الفقدان؟'
        : 'How does RashX ensure business continuity and disaster recovery?',
      answer: isAr
        ? 'تُجرى عمليات نسخ احتياطي يومية مشفرة وتُحفظ في بيئات تخزين متعددة، مع خطط استعادة فورية تضمن عودة النظام للعمل دون فقدان أي حركات أو فواتير في حال حدوث أي طارئ تقني.'
        : 'Automated encrypted daily snapshots are retained in redundant storage partitions with automated recovery procedures ensuring zero data loss and uninterrupted billing continuity.',
    },
    {
      question: isAr
        ? 'كيف يؤمّن النظام الربط مع هيئة الزكاة والضريبة والجمارك (ZATCA)؟'
        : 'How does the platform secure ZATCA Phase 2 e-invoicing data transactions?',
      answer: isAr
        ? 'تدعم راش إكس متطلبات المرحلة الثانية عبر شهادات الامتثال الرقمية (CSID)، وتوقيع الفواتير بالختم المشفر، وتوليد المعرفات الفريدة العالمية (UUID) غير القابلة للتكرار أو التلاعب، وفق المعايير الفنية الصادرة عن الهيئة.'
        : 'RashX implements Phase 2 compliance via cryptographic compliance certificates (CSID), digital hash signatures, and tamper-evident UUID tracking adhering to ZATCA technical specifications.',
    },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      <JsonLd data={getFAQPageSchema(securityFaqs)} id="security-faq-schema" />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="security-breadcrumb-schema" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-16">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? 'الأمان والخصوصية' : 'Security & Privacy'}
          </span>
        </div>

        {/* Section 1: Hero Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <ShieldCheck className="w-4 h-4 text-dusty-blue" />
            <span>
              {isAr
                ? 'الأمان والسرية المؤسسية • حماية موثوقة لصالونك'
                : 'Enterprise Security & Complete Data Privacy'}
            </span>
          </div>

          {/* Mandatory Exact H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {isAr ? 'أمان بياناتك وبيانات عملائك أولويتنا' : 'Securing Your Data and Your Clients’ Data Is Our Priority'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal">
            {isAr
              ? 'تلتزم راش إكس بأعلى معايير حماية البيانات وسرية المعلومات؛ بنينا المنظومة السحابية على مبادئ تنظيم الوصول بالصلاحيات، إدارة الأدوار والمستخدمين، الفصل المنطقي التام بين بيانات المنشآت، وبيئة تشغيل موثوقة تضمن استمرارية أعمالك ونمو أرباحك بأمان تام.'
              : 'At RashX, data protection is paramount. Our private cloud architecture is built upon granular role permissions, strict logical tenant isolation, confidential data handling, and high-availability operational resilience.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/demo`}
              className="px-6 py-3.5 text-sm font-semibold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? 'احجز استشارة أمان وبيانات (20 دقيقة)' : 'Schedule Security Walkthrough'}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? 'مرحبًا راش إكس، أود الاستفسار عن معايير الأمان وحماية البيانات في المنصة.'
                  : 'Hello RashX, I would like to inquire about data security and PDPL compliance.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'استفسار أمني مباشر عبر واتساب' : 'Security Consultation'}</span>
            </a>
          </div>

          {/* Quick Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ink-muted">
            <div className="flex items-center gap-1.5 font-semibold text-ink">
              <Server className="w-4 h-4 text-dusty-blue" />
              <span>{isAr ? 'فصل منطقي تام بين المنشآت' : 'Strict Logical Tenant Separation'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-ink">
              <KeyRound className="w-4 h-4 text-[#10B981]" />
              <span>{isAr ? 'تنظيم الصلاحيات وإدارة الأدوار' : 'Role-Based Access Control (RBAC)'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-ink">
              <EyeOff className="w-4 h-4 text-[#8B5CF6]" />
              <span>{isAr ? 'حجب أرقام الجوالات (PDPL)' : 'Client Mobile Number Masking'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-[#F59E0B]" />
              <span>{isAr ? 'استمرارية أعمال ونسخ يومي' : 'Business Continuity & Daily Backups'}</span>
            </div>
          </div>
        </div>

        {/* ===================================================================
           Section 2: Visual Diagram (رسم يوضح الفصل المنطقي بين المنشآت)
           =================================================================== */}
        <div className="rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray text-xs font-medium text-ink">
              <Workflow className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'رسم تخطيطي معماري' : 'Architectural Diagram'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
              {isAr
                ? 'مخطط الفصل المنطقي بين بيانات المنشآت (Multi-Tenant Logical Isolation)'
                : 'Logical Tenant Isolation Architecture Diagram'}
            </h2>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
              {isAr
                ? 'يوضح هذا المخطط كيف تفصل راش إكس بين المنشآت المختلفة؛ حيث يحصل كل صالون أو سبا على مسار نطاق فرعي مخصص وقناة معالجة معزولة منطقياً تمنع وصول أي منشأة أو موظف خارجي لقاعدة بياناتك وعملائك.'
                : 'This schematic illustrates how RashX enforces multi-tenant segregation. Each facility is routed through isolated subdomain contexts and strict tenant-locked logic preventing any cross-tenant data leakage.'}
            </p>
          </div>

          {/* Interactive Responsive SVG / Card Diagram */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFBFB] border border-mist-gray space-y-8">
            {/* Top Tier: External Users & Subdomains */}
            <div className="space-y-3">
              <div className="text-center text-xs font-bold text-ink-muted uppercase tracking-wider">
                {isAr ? 'الطبقة 1: بوابات النطاق الفرعي المستقل لكل منشأة' : 'Tier 1: Dedicated Sovereign Subdomains'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border-2 border-dusty-blue/40 shadow-xs space-y-1.5 text-center">
                  <div className="text-[10px] font-bold text-dusty-blue uppercase font-mono">المنشأة (أ) • صالون نسائي</div>
                  <div className="text-xs font-semibold text-ink font-mono" dir="ltr">lumiere.rashx.org</div>
                  <div className="text-[11px] text-ink-muted">4 بوابات خاصة • هوية وشعار مستقل</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-[#10B981]/40 shadow-xs space-y-1.5 text-center">
                  <div className="text-[10px] font-bold text-[#10B981] uppercase font-mono">المنشأة (ب) • صالون رجالي</div>
                  <div className="text-xs font-semibold text-ink font-mono" dir="ltr">elite-barber.rashx.org</div>
                  <div className="text-[11px] text-ink-muted">4 بوابات خاصة • هوية وشعار مستقل</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-[#8B5CF6]/40 shadow-xs space-y-1.5 text-center">
                  <div className="text-[10px] font-bold text-[#8B5CF6] uppercase font-mono">المنشأة (ج) • مركز وسبا</div>
                  <div className="text-xs font-semibold text-ink font-mono" dir="ltr">lavender-spa.rashx.org</div>
                  <div className="text-[11px] text-ink-muted">4 بوابات خاصة • هوية وشعار مستقل</div>
                </div>
              </div>
            </div>

            {/* Middle Tier: RashX Security Gateway & Tenant Context Barrier */}
            <div className="p-5 rounded-2xl bg-ink text-white space-y-3 text-center relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-dusty-blue">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isAr
                    ? 'بوابة أمان راش إكس • تشفير TLS 1.3 والتحقق الصارم من سياق المنشأة'
                    : 'RashX Security Gateway • TLS 1.3 & Strict Tenant Context Validation'}
                </span>
              </div>
              <p className="text-xs text-mist-gray/80 max-w-xl mx-auto leading-relaxed">
                {isAr
                  ? 'يقوم جدار الحماية بالتحقق من هوية المنشأة وتوثيق كل طلب برمجياً، مع حظر أي استعلام يحاول طلب بيانات خارج سياق المنشأة المعتمدة.'
                  : 'Automated perimeter firewalls enforce cryptographic tenant validation, terminating cross-boundary query attempts at the perimeter.'}
              </p>
            </div>

            {/* Bottom Tier: Isolated Logical Tenant Data Partitions */}
            <div className="space-y-3">
              <div className="text-center text-xs font-bold text-ink-muted uppercase tracking-wider">
                {isAr ? 'الطبقة 2: الفصل المنطقي التام لقواعد البيانات والمستندات' : 'Tier 2: Logical Separation of Database Partitions'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Partition A */}
                <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-2.5 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-dusty-blue" />
                      <span>بيانات المنشأة (أ)</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-dusty-blue/20 text-dusty-blue">
                      معزول منطقياً
                    </span>
                  </div>
                  <ul className="text-[11px] text-ink-muted space-y-1 list-disc list-inside">
                    <li>قاعدة عميلات وملاحظات صالون أ</li>
                    <li>فواتير ZATCA وسجلات الكاشير</li>
                    <li>عمولات مصففات الشعر ورواتبهن</li>
                  </ul>
                  <div className="pt-1 text-[10px] text-[#10B981] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>مغلق تماماً عن المنشآت الأخرى</span>
                  </div>
                </div>

                {/* Partition B */}
                <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-2.5 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>بيانات المنشأة (ب)</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981]/20 text-[#10B981]">
                      معزول منطقياً
                    </span>
                  </div>
                  <ul className="text-[11px] text-ink-muted space-y-1 list-disc list-inside">
                    <li>سجلات زبائن الحلاقة والاشتراكات</li>
                    <li>فواتير ZATCA وسجلات الكاشير</li>
                    <li>عمولات الحلاقين ومواعيد الكراسي</li>
                  </ul>
                  <div className="pt-1 text-[10px] text-[#10B981] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>مغلق تماماً عن المنشآت الأخرى</span>
                  </div>
                </div>

                {/* Partition C */}
                <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-2.5 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>بيانات المنشأة (ج)</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/20 text-[#8B5CF6]">
                      معزول منطقياً
                    </span>
                  </div>
                  <ul className="text-[11px] text-ink-muted space-y-1 list-disc list-inside">
                    <li>باقات جلسات السبا والتدليك</li>
                    <li>فواتير ZATCA والمخزون الداخلي</li>
                    <li>سجلات المعالجين وتقارير الفروع</li>
                  </ul>
                  <div className="pt-1 text-[10px] text-[#10B981] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>مغلق تماماً عن المنشآت الأخرى</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagram Takeaway Footer */}
            <div className="pt-3 border-t border-mist-gray flex flex-wrap items-center justify-between gap-4 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5 font-semibold text-ink">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>0% تداخل أو تسريب بين بيانات المنشآت المختلفة</span>
              </span>
              <span className="text-[11px]">
                {isAr ? 'عزل معماري على مستوى التطبيق وقواعد البيانات' : 'Application & Database Tenancy Isolation'}
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================================
           Section 3: The 7 Pillars (الأركان السبعة من وصف الشركة)
           =================================================================== */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-medium text-dusty-blue uppercase tracking-wider">
              {isAr ? 'منظومة الأمان المتكاملة' : 'Integrated Security Architecture'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              {isAr
                ? 'الأركان السبعة لحماية صالونك واستمرارية أعمالك'
                : 'The 7 Security Pillars Safeguarding Your Salon'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted font-normal">
              {isAr
                ? 'إجراءات تقنية وتنظيمية متكاملة تضمن سرية البيانات وسلامة العمليات التشغيلية.'
                : 'Comprehensive technical and organizational controls guaranteeing data confidentiality and business continuity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityPillars.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                    <IconComponent className="w-5 h-5 text-dusty-blue" />
                  </div>
                  <h3 className="text-base font-semibold text-ink">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
           Section 4: Data Hosting [TODO] & PDPL Regulatory Links
           =================================================================== */}
        <div className="rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray text-xs font-medium text-ink">
              <FileCheck2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{isAr ? 'موقع الاستضافة والامتثال النظامي' : 'Hosting & Regulatory Framework'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
              {isAr
                ? 'استضافة موثوقة والتزام تام بنظام حماية البيانات الشخصية السعودي (PDPL)'
                : 'Reliable Hosting & Full Saudi PDPL Compliance'}
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-ink-muted leading-relaxed">
              <p>
                <strong className="text-ink">{isAr ? 'موقع استضافة البيانات:' : 'Data Hosting Infrastructure:'}</strong>{' '}
                <span className="font-mono text-dusty-blue font-semibold">
                  {isAr
                    ? '[TODO: مكان استضافة البيانات - يُحدد وفق مزود الاستضافة السحابي المعتمد وبيئة التشغيل المخصصة للمنصة]'
                    : '[TODO: Data hosting infrastructure location is determined based on the authorized cloud hosting partner and certified deployment environment]'}
                </span>
              </p>
              <p>
                {isAr
                  ? 'تلتزم منصة راش إكس بمتطلبات نظام حماية البيانات الشخصية الصادر في المملكة العربية السعودية بالمرسوم الملكي رقم (م/19)، وتطبق كافة المعايير اللازمة لضمان شفافية المعالجة، سرية سجلات المراجعين، وحجب أرقام الهواتف التلقائي لحماية المنشآت من تسريب العملاء.'
                  : 'RashX adheres to all mandates of the Saudi Personal Data Protection Law (PDPL, Royal Decree M/19), incorporating transparent consent controls, patient and client record confidentiality, and automated phone masking protecting businesses from data exfiltration.'}
              </p>
            </div>
          </div>

          {/* Quick Legal & Regulatory Links */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-ink text-white hover:bg-ink/90 text-xs font-semibold transition-all"
            >
              <FileText className="w-4 h-4 text-dusty-blue" />
              <span>{isAr ? 'اطلع على سياسة الخصوصية وحماية البيانات' : 'Read Full Privacy Policy'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 text-dusty-blue" />
            </Link>

            <Link
              href={`/${locale}/blog/saudi-pdpl-compliance-for-salons`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-mist-gray hover:bg-mist-gray/40 text-xs font-semibold text-ink transition-colors"
            >
              <span>{isAr ? 'دليل نظام PDPL للصالونات' : 'Salon PDPL Compliance Guide'}</span>
            </Link>

            <Link
              href={`/${locale}/terms`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-mist-gray hover:bg-mist-gray/40 text-xs font-semibold text-ink transition-colors"
            >
              <span>{isAr ? 'شروط وأحكام الخدمة' : 'Terms of Service'}</span>
            </Link>
          </div>
        </div>

        {/* ===================================================================
           Section 5: FAQ Accordion
           =================================================================== */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-medium text-dusty-blue uppercase tracking-wider">
              {isAr ? 'الأسئلة الشائعة حول الأمان' : 'Security FAQ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              {isAr
                ? 'أسئلة شائعة حول أمان وسرية بيانات الصالونات'
                : 'Frequently Asked Questions about Salon Security & Isolation'}
            </h2>
          </div>

          <div className="space-y-3">
            {securityFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/30 transition-colors space-y-2"
              >
                <h3 className="text-sm font-semibold text-ink flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-dusty-blue shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pe-4 ps-6 font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
           Section 6: Closing CTA
           =================================================================== */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'أمان بنكي وخصوصية تامة' : 'Bank-Grade Security & Privacy'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {isAr
                ? 'حافظ على سرية عميلاتك وأمان صالونك مع راش إكس'
                : 'Protect Your Clients & Secure Your Salon with RashX'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto font-normal">
              {isAr
                ? 'اكتشف كيف تحمي بنيتنا السحابية منشأتك من تسريب البيانات وتضمن امتثالك الكامل للأنظمة السعودية في عرض حي مدته 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                : 'See how our private cloud architecture safeguards your salon from data leaks and delivers full Saudi regulatory compliance in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                  ? 'مرحبًا راش إكس، أود الاستفسار عن معايير الأمان وحماية البيانات في المنصة.'
                  : 'Hello RashX, I would like to inquire about security and privacy standards.'
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
