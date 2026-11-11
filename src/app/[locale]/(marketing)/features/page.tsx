import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Breadcrumbs,
  SystemSplitCard,
  SystemDetailProps,
  FeaturesStickyNav,
  TraditionalVsRashXTable,
  CTABanner,
  LeadForm,
} from '@/components/sections';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  generatePageMetadata,
  getSoftwareApplicationSchema,
} from '@/lib/seo';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/translations';
import { Sparkles, Check } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const dict = getDictionary(locale);

  return generatePageMetadata({
    title: dict.seo.features.title,
    description: dict.seo.features.description,
    locale,
    pathname: '/features',
    keywords: dict.seo.features.keywords,
  });
}

export default async function FeaturesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const isAr = locale === 'ar';

  const breadcrumbsList = [
    { label: isAr ? 'المميزات' : 'Features', href: '/features' },
  ];

  // The 10 Core Systems detailed data with 4-6 bullet points each
  const systemsData: SystemDetailProps[] = [
    {
      id: 'hr',
      anchorId: 'system-hr',
      order: '01',
      nameAr: 'نظام الموارد البشرية والعمولات',
      nameEn: 'HR & Commission Management System',
      taglineAr: 'إدارة فريق العمل، حساب العمولات تلقائيًا، ومسيرات الرواتب',
      taglineEn: 'Staff Rotas, Automated Commissions & Wage Protection',
      descAr:
        'صُمم هذا النظام خصيصًا لإنهاء النزاعات اليومية حول حساب نسب عمولات مصففي الشعر وأخصائيات التجميل. يتولى النظام حساب عمولة كل أخصائي فور إغلاق الفاتورة بدقة تامة وبحسب الشروط المحددة.',
      descEn:
        'Engineered to eliminate end-of-shift disputes over stylist commission splits, automatically allocating precise commission payouts on invoice checkout.',
      bulletsAr: [
        'احتساب آلي فوري لعمولة كل موظف فور إغلاق الفاتورة (نسب مئوية أو مبالغ مقطوعة).',
        'لوحة تحكم خاصة لكل موظف لاستعراض فواتيره المنجزة وعمولاته اليومية بشفافية.',
        'إدارة الورديات وجداول الدوام ومتابعة الحضور والانصراف وفق نظام العمل السعودي.',
        'سجل شامل للوثائق والإقامات وتنبيهات انتهاء الرخص المهنية قبل موعدها.',
        'إعداد مسيرات الرواتب والبدلات ومطابقتها مع نظام حماية الأجور بضغطة زر.',
      ],
      bulletsEn: [
        'Instant automated commission allocation on checkout (percentage or flat SAR rate).',
        'Dedicated staff interface to review personal completed bookings and commissions.',
        'Shift schedules, rotas, and attendance compliant with Saudi labor regulations.',
        'Comprehensive staff document records with automated Iqama expiry notifications.',
        'One-click payroll summaries and allowances aligned with Saudi wage protection.',
      ],
      slug: 'hr-management',
      reverse: false,
    },
    {
      id: 'crm',
      anchorId: 'system-crm',
      order: '02',
      nameAr: 'نظام إدارة علاقات العملاء (CRM)',
      nameEn: 'Client Intelligence & CRM',
      taglineAr: 'سجل تجميلي رقمي متكامل لكل عميلة مع تفضيلات العناية',
      taglineEn: 'Complete 360° Beauty Profiles & Treatment Histories',
      descAr:
        'ملف شخصي وتاريخي شامل لكل عميلة يحفظ أرقام درجات صبغات الشعر السابقة ونوع البشرة والحساسيات، لتمنحها تجربة فاخرة في كل زيارة حتى وإن تغيرت الأخصائية.',
      descEn:
        'Maintains previous hair color formulas, skin profiles, sensitivities, and beauty preferences ensuring consistent luxury treatment across all visits.',
      bulletsAr: [
        'سجل رقمي لمعادلات ودرجات صبغات الشعر السابقة ونسب الأوكسجين المستخدمة.',
        'تصنيف تلقائي للعميلات (عميلات VIP، عميلات منتظمات، عميلات منقطعات بحاجة لمتابعة).',
        'تتبع إجمالي إنفاق كل عميلة ومتوسط قيمة الفاتورة ومعدل تكرار الزيارات (LTV).',
        'ملاحظات تفضيلات العناية الخاصة تظهر لمقدمة الخدمة تلقائيًا عند بدء الجلسة.',
        'حماية وتشفير بيانات الاتصال وفق ضوابط نظام حماية البيانات الشخصية السعودي (PDPL).',
      ],
      bulletsEn: [
        'Digital hair color formula notebook recording shade codes and developer volumes.',
        'Automated client segmentation (VIPs, regulars, at-risk lost clients).',
        'Lifetime customer spend tracking, average ticket size, and visit frequency.',
        'Stylist preference alerts displaying automatically before starting any service.',
        'Data encryption fully aligned with Saudi Personal Data Protection Law (PDPL).',
      ],
      slug: 'crm-client-management',
      reverse: true,
    },
    {
      id: 'bookings',
      anchorId: 'system-bookings',
      order: '03',
      nameAr: 'نظام الحجوزات والمواعيد الذكية',
      nameEn: 'Smart Appointment Scheduling',
      taglineAr: 'حجز ذاتي على مدار الساعة 24/7 يمنع التضارب ويقلل الانتظار',
      taglineEn: '24/7 Self-Service Booking with Zero Collisions',
      descAr:
        'محرك جدولة متطور يربط الموظفة المتاحة بالكرسي أو جناح الخدمة المناسب وبمدة الخدمة بدقة متناهية، مع إتاحة الحجز الذاتي للعميلات ودفع العربون المسبق.',
      descEn:
        'Advanced booking engine matching specialist availability, chair/suite capacity, dynamic service duration, and deposit payments.',
      bulletsAr: [
        'صفحة حجز ذاتي أنيقة بهوية الصالون تعمل على مدار 24 ساعة لاستقبال المواعيد.',
        'منع تضارب الحجوزات نهائيًا مع إمكانية ربط الخدمة بكرسي محدد أو غرفة مساج.',
        'تحديد وقت مستقطع آلي (Buffer Time) للتعقيم والتنظيف بين المواعيد.',
        'إدارة ذكية لقوائم الانتظار (Waitlist) وإعادة التسكين الفوري عند حدوث إلغاء.',
        'دعم حجز باقات متسلسلة متعددة الخدمات في زيارة واحدة ودفع العربون الإلكتروني.',
      ],
      bulletsEn: [
        'Branded 24/7 online booking interface enabling clients to self-schedule anytime.',
        'Guaranteed zero double-bookings with chair, specialist, and room allocations.',
        'Automated configurable sanitation buffer time between scheduled appointments.',
        'Intelligent waitlist engine filling last-minute cancellations automatically.',
        'Multi-service sequential bookings in a single checkout with online deposit support.',
      ],
      slug: 'booking-system',
      reverse: false,
    },
    {
      id: 'services',
      anchorId: 'system-services',
      order: '04',
      nameAr: 'نظام الخدمات والباقات والأسعار',
      nameEn: 'Services & Dynamic Pricing Engine',
      taglineAr: 'تصنيف مرن للخدمات، تسعير ديناميكي، وباقات المناسبات',
      taglineEn: 'Tiered Pricing, Hair Length Rules & Seasonal Packages',
      descAr:
        'هيكلة كاملة لكافة خدمات التجميل والسبا والعناية، مع تحديد مدد زمنية دقيقة لكل خدمة، وتحديد الأسعار حسب خبرة الأخصائية أو طول الشعر، وربط استهلاك المواد بالخدمة.',
      descEn:
        'Structured catalog for all salon services with custom durations, tiered pricing by hair length or specialist seniority, and direct material inventory linkage.',
      bulletsAr: [
        'تصنيف متعدد المستويات للخدمات (تصفيف، صبغات، مكياج، أظافر، مساج، حمام مغربي).',
        'تسعير ديناميكي مرن بحسب طول وكثافة الشعر أو خبرة الأخصائية أو الفرع.',
        'باقات وعروض موسمية مخصصة للأعياد، اليوم الوطني، ويوم التأسيس السعودي.',
        'ربط كل خدمة تجميلية بمقادير المواد المستهلكة من المستودع تخصم آليًا.',
        'إمكانية إضافة خدمات ترقية تكميلية (Add-ons) ترفع متوسط إنفاق العميلة.',
      ],
      bulletsEn: [
        'Multi-level service classification (hair, color, makeup, nails, massage, bath).',
        'Dynamic pricing rules based on hair length, density, or specialist seniority.',
        'Custom seasonal bundles for Eid, Saudi National Day, and Founding Day promos.',
        'Automatic linking of service recipes to backbar inventory material consumption.',
        'Complementary upsell service add-ons increasing average ticket spend.',
      ],
      slug: 'services-pricing',
      reverse: true,
    },
    {
      id: 'sales',
      anchorId: 'system-sales',
      order: '05',
      nameAr: 'نظام المبيعات ونقاط البيع السريعة (POS)',
      nameEn: 'Fast Sales & POS Terminal',
      taglineAr: 'إصدار الفواتير في ثوانٍ مع دعم متطلبات الفوترة الإلكترونية',
      taglineEn: 'Split-Second Checkout & ZATCA Phase 2 E-Invoicing Support',
      descAr:
        'نقطة بيع سريعة مصممة لشاشات اللمس والآيباد تتيح إغلاق الفاتورة في ثوانٍ، وتدعم تقسيم الحساب وطرق الدفع المتعددة وتوليد رمز الاستجابة السريع (QR Code).',
      descEn:
        'Touch-optimized fast POS terminal supporting split payments, multi-channel checkout, and cryptographic QR code generation.',
      bulletsAr: [
        'إصدار فوري للفواتير الضريبية المبسطة مع رمز الاستجابة السريع (QR Code) المتوافق.',
        'تدعم متطلبات الفوترة الإلكترونية (المرحلة الثانية) وفق حالة المنشأة ومتطلبات الربط.',
        'دعم تقسيم الفاتورة وتعدد طرق الدفع (مدى، Apple Pay، كاش، تمارا، تابي، ونقاط الولاء).',
        'إغلاق الورديات اليومية وتقفيل الصندوق ومطابقة الكاشير والعهد النقدية بدقة.',
        'طباعة فورية للإيصالات أو إرسالها رقميًا للعميلة عبر الواتساب لتوفير الورق.',
      ],
      bulletsEn: [
        'Instant simplified tax invoice issuance with compliant cryptographic QR code.',
        'Supports ZATCA Phase 2 E-Invoicing criteria per facility onboarding status.',
        'Split bills and multi-method payments (Mada, Apple Pay, Cash, BNPL, Loyalty).',
        'End-of-shift drawer balancing, cash float reconciliations, and register auditing.',
        'Instant thermal receipt printing or paperless WhatsApp digital receipt sharing.',
      ],
      slug: 'pos-sales',
      reverse: false,
    },
    {
      id: 'purchasing',
      anchorId: 'system-purchasing',
      order: '06',
      nameAr: 'نظام المشتريات وإدارة الموردين',
      nameEn: 'Purchasing & Vendor Management',
      taglineAr: 'تنظيم مشتريات مستحضرات التجميل ومتابعة فواتير الموردين',
      taglineEn: 'Procurement Cycles, Vendor Payables & Cost Optimization',
      descAr:
        'دورة مشتريات رقمية محكمة تبدأ من رصد النواقص، وإصدار أوامر الشراء للموردين، وفحص البضاعة ومطابقتها، وتسجيل فواتير المشتريات الضريبية وجدولة الدفعات.',
      descEn:
        'End-to-end digital procurement from supply requests to purchase orders, receiving inspection, vendor tax invoices, and scheduled disbursements.',
      bulletsAr: [
        'دليل رقمي شامل لكافة الموردين ووكلاء مستحضرات التجميل والعناية بالسعودية.',
        'مقارنة أسعار المنتجات بين الموردين لخفض تكاليف الشراء وتحسين هوامش الربح.',
        'تحديث تلقائي لمتوسط تكلفة الوحدة وأرصدة المخازن فور تأكيد استلام الشحنة.',
        'سجل فواتير ضريبية كامل للمشتريات متوافق مع إقرارات ضريبة القيمة المضافة.',
        'جدولة دفعات الموردين وتنبيهات مواعيد السداد لمنع تعطل التوريد.',
      ],
      bulletsEn: [
        'Central vendor directory for cosmetic distributors and equipment providers.',
        'Price comparison across suppliers minimizing overhead and improving margins.',
        'Automated weighted-average cost updates on inventory receipt confirmation.',
        'Complete purchasing tax ledger aligned with monthly/quarterly VAT filing.',
        'Vendor payment schedules and upcoming due-date payment reminders.',
      ],
      slug: 'purchasing-suppliers',
      reverse: true,
    },
    {
      id: 'inventory',
      anchorId: 'system-inventory',
      order: '07',
      nameAr: 'نظام المخزون وجرد المستودعات',
      nameEn: 'Inventory & Stock Control',
      taglineAr: 'فصل استهلاك المواد الداخلية عن بيع التجزئة ومنع الهدر',
      taglineEn: 'Dual Backbar & Retail Stock Control with Zero Leakage',
      descAr:
        'فصل ذكي بين مخزون الاستهلاك الداخلي (صبغات، شامبوهات، زيوت مساج) ومخزون بيع التجزئة للعميلات، مع احتساب دقيق لتكلفة المواد لكل خدمة لمنع الهدر.',
      descEn:
        'Dual inventory architecture: Internal Backbar Consumption (dyes, oils, treatments) vs. Front Retail Display, computing exact service margins.',
      bulletsAr: [
        'خصم المواد المستهلكة آليًا مع كل خدمة تجميل منجزة بحسب المعايير المحددة.',
        'تنبيهات فورية عند وصول كمية أي منتج للحد الأدنى لإعادة الطلب قبل النفاد.',
        'جرد دوري سريع بالباركود وكشف فروقات المخزون والعجز والهدر بدقة متناهية.',
        'إدارة مخازن متعددة والتحويل الداخلي السلس بين الفروع والمستودع المركزي.',
        'مراقبة تواريخ صلاحية المستحضرات ومواد التجميل الحساسة لتفادي التلف.',
      ],
      bulletsEn: [
        'Automated backbar deduction upon service completion based on recipe amounts.',
        'Real-time low-stock threshold notifications before running out of essential dyes.',
        'Fast barcode scanning for periodic audits, pinpointing shrinkage and discrepancies.',
        'Multi-warehouse control and seamless inter-branch supply transfers.',
        'Expiration date monitoring for sensitive organic beauty formulas and cosmetics.',
      ],
      slug: 'inventory-management',
      reverse: false,
    },
    {
      id: 'loyalty',
      anchorId: 'system-loyalty',
      order: '08',
      nameAr: 'نظام الولاء والمكافآت والاشتراكات',
      nameEn: 'Loyalty & Reward Engine',
      taglineAr: 'تحويل العميلات العابرات إلى زائرات دائمات ببرامج النقاط',
      taglineEn: 'Cashback Points, WhatsApp Gift Cards & Prepaid Packages',
      descAr:
        'منظومة متكاملة لولاء العملاء تمنح نقاط استرداد نقدي مع كل ريال ينفق، وتتيح بيع بطاقات الهدايا الرقمية، وباقات الجلسات الشهرية المدفوعة مسبقًا.',
      descEn:
        'Comprehensive loyalty engine providing cashback points per SAR spent, digital gift cards, referral rewards, and prepaid recurring packages.',
      bulletsAr: [
        'احتساب نقاط الولاء تلقائيًا وإمكانية استبدالها بخصم في الفاتورة أو خدمات مجانية.',
        'إصدار بطاقات هدايا رقمية (Gift Cards) تشاركها العميلة عبر الواتساب مع صديقاتها.',
        'باقات واشتراكات دورية مسبقة الدفع (مثل باقات المساج أو تصفيف الشعر الأسبوعي).',
        'كوبونات ترويجية مخصصة لحملات المشاهير والسوشيال ميديا مع تتبع العائد المالي.',
        'رفع معدل تكرار الزيارة (Retention Rate) ومعدل إنفاق العميلة السنوي.',
      ],
      bulletsEn: [
        'Automated cashback points accrual redeemable on future visits or free services.',
        'WhatsApp-shareable digital gift certificates driving new client referrals.',
        'Prepaid session bundles and weekly blow-dry membership passes.',
        'Influencer promo codes with attribution analytics and ROI tracking.',
        'Helps increase client retention rates and annual client lifetime value.',
      ],
      slug: 'loyalty-rewards',
      reverse: true,
    },
    {
      id: 'notifications',
      anchorId: 'system-notifications',
      order: '09',
      nameAr: 'نظام الإشعارات والرسائل التفاعلية',
      nameEn: 'Smart Notifications & Interactive WhatsApp',
      taglineAr: 'تذكير ذكي بالمواعيد عبر الواتساب لتقليص الغياب والتأخير',
      taglineEn: 'Automated WhatsApp & SMS Reminders Slashing No-Shows',
      descAr:
        'إرسال تأكيدات الحجز الفورية، ورسائل التذكير التلقائية قبل الموعد بـ 24 ساعة و3 ساعات مع أزرار تفاعلية لتأكيد الحضور، واستطلاع تقييم الخدمة بعد الزيارة.',
      descEn:
        'Dispatches instant booking confirmations, 24h & 3h appointment reminders with one-tap confirmation buttons, and post-visit review requests.',
      bulletsAr: [
        'رسائل واتساب رسمية وموثقة باسم صالونك تصل للعميلة فور تثبيت الحجز.',
        'أزرار تفاعلية داخل الواتساب تتيح للعميلة تأكيد الحضور بضغطة زر أو طلب التعديل.',
        'المساعدة على تقليص نسبة عدم حضور العميلات بدون موعد مسبق (No-shows) عبر التذكيرات التلقائية.',
        'استطلاع تقييم الخدمة آليًا بعد إتمام الزيارة لرفع تقييم الصالون على خرائط جوجل.',
        'إشعارات فورية للإدارة عند العمليات الحساسة (حذف فاتورة، خصم خاص، فتح الصندوق).',
      ],
      bulletsEn: [
        'Official branded WhatsApp interactive messages sent upon booking creation.',
        'One-tap interactive confirmation or reschedule buttons directly in WhatsApp.',
        'Helps reduce no-shows and missed appointments through automated reminders.',
        'Automated post-service survey boosting Google Business reviews and local ranking.',
        'Real-time manager alerts for sensitive actions (voided invoices, special overrides).',
      ],
      slug: 'smart-notifications',
      reverse: false,
    },
    {
      id: 'reports',
      anchorId: 'system-reports',
      order: '10',
      nameAr: 'نظام التقارير والتحليلات والذكاء الاصطناعي',
      nameEn: 'Reports & AI Growth Analytics',
      taglineAr: 'قرارات تشغيلية مبنية على أرقام دقيقة وإقرارات ضريبية جاهزة',
      taglineEn: 'Peak Hour Analytics, Stylist Rankings & One-Click VAT Filing',
      descAr:
        'لوحات بيانات ورسوم بيانية تفاعلية تكشف ساعات الذروة، أنشط الأيام، الخدمات الأكثر ربحية، إنتاجية كل أخصائية، وحساب الإقرار الضريبي لـ ZATCA بضغطة زر.',
      descEn:
        'Interactive visual dashboards revealing peak traffic hours, top-grossing services, specialist productivity rankings, and automated VAT declaration summaries.',
      bulletsAr: [
        'تقرير الإقرار الضريبي للفوترة الإلكترونية بضغطة زر جاهز للتسليم لـ ZATCA.',
        'تحليل ساعات الذروة وأوقات الركود لتخطيط العروض الترويجية وتوزيع الورديات.',
        'مقارنة أداء الفروع في السلاسل ومراكز التجميل المتعددة لتحديد نقاط التحسين.',
        'حساب صافي الأرباح الحقيقية بعد خصم تكلفة المواد والعمولات والرواتب والإيجار.',
        'ترتيب الخبيرات ومصففي الشعر حسب رضا العميلات والإنتاجية والمبيعات.',
      ],
      bulletsEn: [
        'One-click ZATCA VAT declaration summary report ready for official submission.',
        'Peak vs. slow hours analytics to optimize shift rotas and off-peak promotions.',
        'Multi-branch performance benchmark matrix identifying growth opportunities.',
        'Net profit calculator accounting for raw materials, commissions, and overhead.',
        'Stylist productivity rankings based on client satisfaction scores and ticket totals.',
      ],
      slug: 'reports-analytics',
      reverse: true,
    },
  ];

  const highlights = [
    isAr ? '10 أنظمة متكاملة' : '10 integrated systems',
    isAr ? 'دعم متطلبات الفوترة الإلكترونية (ZATCA 2)' : 'ZATCA Phase 2 e-invoicing support',
    isAr ? 'نطاق فرعي وهوية رقمية خاصة' : 'Private subdomain & brand identity',
    isAr ? 'مبني وفق ضوابط نظام PDPL السعودي' : 'Built around Saudi PDPL guidelines',
  ];

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      {/* Schemas: SoftwareApplication & BreadcrumbList */}
      <JsonLd data={getSoftwareApplicationSchema(locale)} id="software-app-schema-features" />

      {/* Breadcrumbs (with BreadcrumbList schema) */}
      <div className="border-b border-mist-gray bg-neutral/40 pt-24 sm:pt-28">
        <Breadcrumbs locale={locale} items={breadcrumbsList} />
      </div>

      {/* Hero */}
      <section className="border-b border-mist-gray bg-gradient-to-b from-dusty-blue/20 to-white pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink">
            <Sparkles className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
            <span>{isAr ? 'منظومة التشغيل الشاملة 2026' : 'Comprehensive operating platform 2026'}</span>
          </div>

          <h1 className="text-balance text-3xl font-extrabold leading-[1.3] text-ink sm:text-4xl md:text-5xl lg:text-6xl">
            {isAr ? (
              <>
                كل ما يحتاجه صالونك{' '}
                <span className="box-decoration-clone rounded-2xl bg-dusty-blue/35 px-3">في منظومة واحدة</span>
              </>
            ) : (
              <>
                Everything your salon needs{' '}
                <span className="box-decoration-clone rounded-2xl bg-dusty-blue/35 px-3">
                  in one integrated system
                </span>
              </>
            )}
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {isAr
              ? 'صُممت منصة راش إكس لتلغي الحاجة للتعامل مع برامج متفرقة ودفاتر يدوية. هنا تجد 10 أنظمة تشغيلية ذكية صُممت لطبيعة الصالونات والمشاغل ومراكز التجميل في السعودية، تعمل بتناغم تحت مظلة سحابية ونطاق فرعي مستقل لمنشأتك.'
              : 'RashX replaces disjointed apps and paper registers with 10 unified management systems built for salons, styling studios and spas across Saudi Arabia, all running under a private subdomain.'}
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {highlights.map((text) => (
              <li
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border border-mist-gray bg-white px-3.5 py-1.5 text-xs font-bold text-ink"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sticky index + the 10 systems */}
      <section className="bg-white py-12 md:py-20">
        <h2 className="sr-only">{isAr ? 'الأنظمة العشرة' : 'The 10 systems'}</h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-12 lg:gap-16 xl:flex-row">
            <FeaturesStickyNav locale={locale} />

            <div className="w-full flex-1">
              {systemsData.map((sys) => (
                <SystemSplitCard key={sys.id} system={sys} locale={locale} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Traditional vs RashX */}
      <TraditionalVsRashXTable locale={locale} />

      {/* Closing CTA + lead form */}
      <section
        id="demo-form"
        className="scroll-mt-20 border-t border-mist-gray bg-neutral/40 py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <CTABanner locale={locale} />

          <div className="pt-4">
            <div className="mx-auto mb-8 max-w-2xl space-y-2 text-center">
              <h2 className="text-balance text-2xl font-extrabold text-ink sm:text-3xl">
                {isAr
                  ? 'جاهز لاختبار هذه المميزات عمليًا في صالونك؟'
                  : 'Ready to test these features in your salon?'}
              </h2>
              <p className="text-sm text-ink-muted">
                {isAr
                  ? 'احجز عرضك التجريبي المجاني وسيقوم خبراؤنا بتهيئة بيئة الاختبار لصالونك خلال دقائق.'
                  : 'Book your free live walkthrough and test all 10 systems with our specialists.'}
              </p>
            </div>

            <LeadForm locale={locale} />
          </div>
        </div>
      </section>
    </div>
  );
}