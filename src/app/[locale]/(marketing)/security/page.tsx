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
  Check,
  Plus,
  RefreshCw,
  UserCheck,
  Cpu,
  FileText,
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
        'آليات أمان استباقية لحماية حسابات تسجيل الدخول، ومنع محاولات الدخول غير المصرح بها، وتشفير كافة البيانات المتداولة عبر بروتوكول TLS 1.3.',
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
        ? 'تُجرى عمليات نسخ احتياطي يومية مشفرة وتُحفظ في بيئات تخزين متعددة، مع خطط استعادة تهدف إلى عودة النظام للعمل بأقل فقدان ممكن للبيانات في حال حدوث أي طارئ تقني.'
        : 'Automated encrypted daily snapshots are retained in redundant storage partitions with recovery procedures designed to restore service with minimal data loss.',
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

  const waText = (ar: string, en: string) =>
    `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(isAr ? ar : en)}`;

  const trust = [
    { icon: Server, ar: 'فصل منطقي بين المنشآت', en: 'Logical tenant separation' },
    { icon: KeyRound, ar: 'تنظيم الصلاحيات وإدارة الأدوار', en: 'Role-based access control' },
    { icon: EyeOff, ar: 'حجب أرقام جوالات العميلات', en: 'Client phone masking' },
    { icon: RefreshCw, ar: 'استمرارية أعمال ونسخ يومي', en: 'Continuity & daily backups' },
  ];

  const tenants: {
    tone: string;
    tag: [string, string];
    url: string;
    items: [string, string][];
  }[] = [
    {
      tone: 'bg-dusty-blue/30',
      tag: ['المنشأة (أ) • صالون نسائي', 'Facility A • Women salon'],
      url: 'lumiere.rashx.org',
      items: [
        ['قاعدة عميلات وملاحظات الصالون', 'Client base & salon notes'],
        ['فواتير ZATCA وسجلات الكاشير', 'ZATCA invoices & POS logs'],
        ['عمولات مصففات الشعر ورواتبهن', 'Stylist commissions & payroll'],
      ],
    },
    {
      tone: 'bg-warm-peach/40',
      tag: ['المنشأة (ب) • صالون رجالي', 'Facility B • Barbershop'],
      url: 'elite-barber.rashx.org',
      items: [
        ['سجلات زبائن الحلاقة والاشتراكات', 'Client records & memberships'],
        ['فواتير ZATCA وسجلات الكاشير', 'ZATCA invoices & POS logs'],
        ['عمولات الحلاقين ومواعيد الكراسي', 'Barber commissions & chair bookings'],
      ],
    },
    {
      tone: 'bg-mist-gray/70',
      tag: ['المنشأة (ج) • مركز وسبا', 'Facility C • Spa center'],
      url: 'lavender-spa.rashx.org',
      items: [
        ['باقات جلسات السبا والتدليك', 'Spa & massage packages'],
        ['فواتير ZATCA والمخزون الداخلي', 'ZATCA invoices & internal stock'],
        ['سجلات المعالجين وتقارير الفروع', 'Therapist records & branch reports'],
      ],
    },
  ];

  const PILLAR_TONES = ['bg-dusty-blue/30', 'bg-warm-peach/40'] as const;

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="w-full bg-white">
      {/* The unanswered [TODO] hosting question stays on the page but is kept out of the schema */}
      <JsonLd
        data={getFAQPageSchema(securityFaqs.filter((f) => !f.answer.includes('[TODO')))}
        id="security-faq-schema"
      />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="security-breadcrumb-schema" />

      {/* ============================ Hero ============================ */}
      <section className="border-b border-mist-gray bg-gradient-to-b from-dusty-blue/20 to-white">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:pt-36 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label={isAr ? 'مسار التنقل' : 'Breadcrumb'}
            className="mb-8 flex items-center gap-2 text-xs text-ink-muted"
          >
            <Link href={`/${locale}`} className="font-medium transition-colors hover:text-ink">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-bold text-ink" aria-current="page">
              {isAr ? 'الأمان والخصوصية' : 'Security & Privacy'}
            </span>
          </nav>

          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink">
              <ShieldCheck className="h-4 w-4 text-dusty-blue" aria-hidden="true" />
              <span>{isAr ? 'الأمان والسرية • حماية موثوقة لصالونك' : 'Security & data privacy for your salon'}</span>
            </div>

            {/* Required H1 */}
            <h1 className="text-balance text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
              {isAr ? 'أمان بياناتك وبيانات عملائك أولويتنا' : 'Securing Your Data and Your Clients’ Data Is Our Priority'}
            </h1>

            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {isAr
                ? 'بنينا المنظومة السحابية على مبادئ تنظيم الوصول بالصلاحيات، وإدارة الأدوار والمستخدمين، والفصل المنطقي بين بيانات المنشآت، وبيئة تشغيل موثوقة تدعم استمرارية أعمالك.'
                : 'RashX’s cloud architecture is built on granular role permissions, logical separation between facilities, confidential data handling and a reliable operating environment that supports your business continuity.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/${locale}/demo`}
                className="rounded-2xl bg-warm-peach px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-warm-peach/80"
              >
                {isAr ? 'احجز استشارة أمان وبيانات (20 دقيقة)' : 'Schedule a security walkthrough'}
              </Link>

              <a
                href={waText(
                  'مرحبًا راش إكس، أود الاستفسار عن معايير الأمان وحماية البيانات في المنصة.',
                  'Hello RashX, I would like to inquire about data security and PDPL compliance.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-mist-gray bg-white px-5 py-3.5 text-sm font-bold text-ink transition-colors hover:border-ink"
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                <span>{isAr ? 'استفسار أمني عبر واتساب' : 'Security consultation'}</span>
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 text-xs font-bold text-ink">
              {trust.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.en} className="flex items-center gap-1.5">
                    <Icon className="h-4 w-4 text-dusty-blue" aria-hidden="true" />
                    <span>{isAr ? item.ar : item.en}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 md:space-y-24 md:py-20 lg:px-8">
        {/* ====================== Isolation diagram ====================== */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-mist-gray/60 px-3 py-1 text-xs font-bold text-ink">
              <Workflow className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
              <span>{isAr ? 'رسم تخطيطي معماري' : 'Architecture diagram'}</span>
            </div>

            <h2 className="text-balance text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
              {isAr
                ? 'مخطط الفصل المنطقي بين بيانات المنشآت (Multi-Tenant Isolation)'
                : 'Logical tenant isolation diagram'}
            </h2>

            <p className="text-sm leading-relaxed text-ink-muted">
              {isAr
                ? 'يوضح المخطط كيف تفصل راش إكس بين المنشآت: كل صالون أو سبا يحصل على نطاق فرعي خاص وقناة معالجة معزولة منطقياً، تمنع وصول أي منشأة أو موظف خارجي إلى قاعدة بياناتك وعملائك.'
                : 'Each facility is routed through its own subdomain and a logically isolated processing context, so no other facility or outside user can reach your database or client records.'}
            </p>
          </div>

          <div className="space-y-6 rounded-3xl bg-neutral/40 p-5 sm:p-8">
            {/* Tier 1 */}
            <div className="space-y-3">
              <p className="text-center text-xs font-bold text-ink-muted">
                {isAr ? 'الطبقة 1: نطاق فرعي مستقل لكل منشأة' : 'Tier 1: a dedicated subdomain per facility'}
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {tenants.map((t) => (
                  <div key={t.url} className="space-y-1.5 rounded-2xl border border-mist-gray bg-white p-4 text-center">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold text-ink ${t.tone}`}>
                      {isAr ? t.tag[0] : t.tag[1]}
                    </span>
                    <div className="font-mono text-xs font-bold text-ink" dir="ltr">
                      {t.url}
                    </div>
                    <div className="text-[11px] text-ink-muted">
                      {isAr ? '4 بوابات خاصة • هوية وشعار مستقل' : '4 private portals • own logo & brand'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gateway */}
            <div className="space-y-2 rounded-2xl bg-ink p-5 text-center text-white">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-dusty-blue">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                <span>
                  {isAr
                    ? 'بوابة أمان راش إكس • تشفير TLS 1.3 والتحقق من سياق المنشأة'
                    : 'RashX security gateway • TLS 1.3 & tenant context validation'}
                </span>
              </div>
              <p className="mx-auto max-w-xl text-xs leading-relaxed text-white/75">
                {isAr
                  ? 'يتحقق النظام من هوية المنشأة مع كل طلب، ويحظر أي استعلام يحاول الوصول إلى بيانات خارج سياق المنشأة المعتمدة.'
                  : 'Every request is validated against its facility, and any query reaching outside that facility’s context is blocked.'}
              </p>
            </div>

            {/* Tier 2 */}
            <div className="space-y-3">
              <p className="text-center text-xs font-bold text-ink-muted">
                {isAr ? 'الطبقة 2: فصل منطقي لقواعد البيانات والمستندات' : 'Tier 2: logical separation of database partitions'}
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {tenants.map((t) => (
                  <div key={t.url} className="space-y-3 rounded-2xl border border-mist-gray bg-white p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-ink">
                        <Database className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
                        <span>{isAr ? t.tag[0].split(' • ')[0].replace('المنشأة', 'بيانات المنشأة') : t.tag[1].split(' • ')[0] + ' data'}</span>
                      </span>
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold text-ink ${t.tone}`}>
                        {isAr ? 'معزول منطقياً' : 'Isolated'}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {t.items.map((item) => (
                        <li key={item[1]} className="flex items-start gap-2 text-[12px] text-ink-muted">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-ink" strokeWidth={3} aria-hidden="true" />
                          <span>{isAr ? item[0] : item[1]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <p className="border-t border-mist-gray pt-4 text-center text-xs font-bold text-ink">
              {isAr
                ? 'كل منشأة تعمل في سياق بيانات منفصل عن غيرها على مستوى التطبيق وقواعد البيانات'
                : 'Each facility runs in its own data context, at both application and database level'}
            </p>
          </div>
        </section>

        {/* =========================== 7 pillars =========================== */}
        <section className="space-y-8">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <span className="text-xs font-bold text-ink-muted">
              {isAr ? 'منظومة الأمان المتكاملة' : 'Integrated security architecture'}
            </span>
            <h2 className="text-balance text-2xl font-extrabold text-ink sm:text-3xl">
              {isAr
                ? 'الأركان السبعة لحماية صالونك واستمرارية أعمالك'
                : 'The 7 security pillars protecting your salon'}
            </h2>
            <p className="text-sm text-ink-muted">
              {isAr
                ? 'إجراءات تقنية وتنظيمية تدعم سرية البيانات وسلامة العمليات التشغيلية.'
                : 'Technical and organizational controls supporting data confidentiality and business continuity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={idx}
                  className="space-y-3 rounded-3xl border border-mist-gray bg-white p-6 sm:p-7"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-ink ${PILLAR_TONES[idx % 2]}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-extrabold text-ink">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* ======================= Hosting & PDPL ======================= */}
        <section className="space-y-6 rounded-3xl bg-dusty-blue/15 p-6 sm:p-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-ink">
              <FileCheck2 className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
              <span>{isAr ? 'موقع الاستضافة والإطار النظامي' : 'Hosting & regulatory framework'}</span>
            </div>

            <h2 className="text-balance text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
              {isAr
                ? 'استضافة موثوقة والتزام بنظام حماية البيانات الشخصية السعودي (PDPL)'
                : 'Reliable hosting & alignment with the Saudi PDPL'}
            </h2>

            <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
              <p>
                <strong className="text-ink">{isAr ? 'موقع استضافة البيانات:' : 'Data hosting location:'}</strong>{' '}
                <span className="rounded bg-warm-peach/50 px-1.5 py-0.5 font-mono text-xs font-bold text-ink">
                  {isAr
                    ? '[TODO: مكان استضافة البيانات - يُحدد وفق مزود الاستضافة السحابي المعتمد وبيئة التشغيل المخصصة للمنصة]'
                    : '[TODO: Data hosting infrastructure location is determined based on the authorized cloud hosting partner and certified deployment environment]'}
                </span>
              </p>
              <p>
                {isAr
                  ? 'تلتزم منصة راش إكس بمتطلبات نظام حماية البيانات الشخصية الصادر في المملكة العربية السعودية بالمرسوم الملكي رقم (م/19)، وتطبق المعايير اللازمة لشفافية المعالجة وسرية سجلات المراجعين وحجب أرقام الهواتف التلقائي لحماية المنشآت من تسريب بيانات العملاء.'
                  : 'RashX follows the requirements of the Saudi Personal Data Protection Law (PDPL, Royal Decree M/19), with transparent consent controls, confidential client records and automated phone masking that protects businesses from client data leakage.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/privacy`}
              className="inline-flex items-center gap-2 rounded-2xl bg-warm-peach px-5 py-3 text-xs font-bold text-ink transition-colors hover:bg-warm-peach/80 sm:text-sm"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>{isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Read the privacy policy'}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>

            <Link
              href={`/${locale}/blog/saudi-pdpl-compliance-for-salons`}
              className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-xs font-bold text-ink transition-colors hover:bg-mist-gray sm:text-sm"
            >
              {isAr ? 'دليل نظام PDPL للصالونات' : 'Salon PDPL compliance guide'}
            </Link>

            <Link
              href={`/${locale}/terms`}
              className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-xs font-bold text-ink transition-colors hover:bg-mist-gray sm:text-sm"
            >
              {isAr ? 'شروط وأحكام الخدمة' : 'Terms of service'}
            </Link>
          </div>
        </section>

        {/* ============================== FAQ ============================== */}
        <section className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold text-ink-muted">
              {isAr ? 'الأسئلة الشائعة حول الأمان' : 'Security FAQ'}
            </span>
            <h2 className="text-balance text-2xl font-extrabold text-ink sm:text-3xl">
              {isAr
                ? 'أسئلة شائعة حول أمان وسرية بيانات الصالونات'
                : 'Frequently asked questions about salon data security'}
            </h2>
          </div>

          <div className="space-y-3">
            {securityFaqs.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group rounded-2xl border border-mist-gray bg-white transition-colors open:border-ink hover:border-ink/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden sm:px-6">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-dusty-blue/30 text-ink transition-colors group-open:bg-warm-peach"
                  >
                    <Plus className="h-4 w-4 transition-transform duration-200 group-open:rotate-45" strokeWidth={2.5} />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted sm:px-6">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ========================== Closing CTA ========================== */}
        <section className="space-y-6 rounded-3xl bg-dusty-blue/20 p-8 text-center sm:p-12">
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-ink">
              <Lock className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
              <span>{isAr ? 'أمان وخصوصية لبيانات صالونك' : 'Security & privacy for your salon data'}</span>
            </div>

            <h2 className="text-balance text-2xl font-extrabold leading-tight text-ink sm:text-4xl">
              {isAr
                ? 'حافظ على سرية عميلاتك وأمان صالونك مع راش إكس'
                : 'Protect your clients & secure your salon with RashX'}
            </h2>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink-muted">
              {isAr
                ? 'اكتشف كيف تحمي بنيتنا السحابية بيانات منشأتك وتدعم امتثالك للأنظمة السعودية في عرض حي مدته 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                : 'See how our cloud architecture protects your facility’s data and supports your Saudi regulatory compliance in a 20-minute tailored walkthrough, with a 14-day free trial.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/demo`}
              className="rounded-2xl bg-warm-peach px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-warm-peach/80"
            >
              {isAr ? 'احجز عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book a free 20-min demo'}
            </Link>

            <a
              href={waText(
                'مرحبًا راش إكس، أود الاستفسار عن معايير الأمان وحماية البيانات في المنصة.',
                'Hello RashX, I would like to inquire about security and privacy standards.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-mist-gray"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              <span>{isAr ? 'تواصل معنا عبر واتساب' : 'WhatsApp consultation'}</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}