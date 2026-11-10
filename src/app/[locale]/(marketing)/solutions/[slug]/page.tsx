import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CalendarCheck,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Smartphone,
  Laptop2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  PhoneCall,
  Bell,
  AlertCircle,
  HelpCircle,
  Check,
  Layers,
  UserCheck,
  Calendar,
  CreditCard,
  Receipt,
  FileCheck2,
  Boxes,
  Percent,
  Wallet,
  TrendingUp,
  Tag,
  Printer,
  QrCode,
  Store,
  DollarSign,
  Coins,
  UserCog,
  Award,
  FileText,
  BadgePercent,
  Lock,
  CalendarDays,
  Timer,
  Briefcase,
  PackageOpen,
  Truck,
  ClipboardCheck,
  ArrowUpDown,
  History,
  ShoppingCart,
  RefreshCw,
  Barcode,
  HeartHandshake,
  MessageSquare,
  Filter,
  Star,
  UserPlus,
  FileSpreadsheet,
  Gift,
  Trophy,
  BadgeCheck,
  Repeat,
  Globe,
  Palette,
  LayoutDashboard,
  Sliders,
  XCircle,
  Eye,
  Share2,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getFAQPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface SolutionPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const ALL_SOLUTION_SLUGS = [
  'booking-system',
  'pos-billing',
  'pos-sales',
  'crm-loyalty',
  'crm-client-management',
  'staff-hr',
  'hr-management',
  'inventory-purchasing',
  'inventory-management',
  'analytics-ai',
  'reports-analytics',
  'services-catalog',
  'services-pricing',
  'salon-website',
  'subdomain-platform',
  'branded-website',
  'purchasing-vendors',
  'purchasing-suppliers',
  'loyalty-rewards',
  'smart-notifications',
];

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const slug of ALL_SOLUTION_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  if (slug === 'booking-system') {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'نظام حجز مواعيد للصالونات ومراكز التجميل | RashX'
        : 'Salon & Spa Appointment Booking System | RashX',
      description: isAr
        ? 'نظام حجز مواعيد صالون ذكي يملأ جدول صالونك ويمنع تعارض المواعيد. حجز اونلاين للصالونات عبر موقع المنشأة وتطبيق العميل مع إشعارات واتساب آلية.'
        : 'Smart salon appointment booking system that fills your calendar and eliminates double bookings. 24/7 online booking with automated WhatsApp reminders.',
      keywords: [
        'نظام حجز مواعيد صالون',
        'برنامج حجوزات للصالونات',
        'حجز اونلاين صالون',
        'جدولة مواعيد صالون تجميل',
        'حجز مشاغل نسائية',
      ],
      pathname: `/solutions/${slug}`,
      noIndex: false,
    });
  }

  if (slug === 'pos-billing' || slug === 'pos-sales') {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج كاشير ونقاط بيع للصالونات ومراكز التجميل | RashX'
        : 'Salon POS & Cashier Software | RashX',
      description: isAr
        ? 'برنامج كاشير صالون ونظام نقاط بيع سريع لإدارة مبيعات الخدمات والمنتجات، تجزئة الدفع، احتساب العمولات، ودعم متطلبات الفوترة الإلكترونية ZATCA.'
        : 'Fast salon POS and cashier management system for services and retail sales, split payments, commissions, and ZATCA e-invoicing compliance.',
      keywords: [
        'برنامج كاشير صالون',
        'نظام نقاط بيع للصالونات',
        'فواتير الصالون',
        'كاشير مشاغل نسائية',
        'نظام بيع صالون تجميل',
      ],
      pathname: `/solutions/${slug}`,
      noIndex: false,
    });
  }

  if (slug === 'staff-hr' || slug === 'hr-management') {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج إدارة موظفين وعمولات الصالونات ومراكز التجميل | RashX'
        : 'Salon Staff Management & Commission Software | RashX',
      description: isAr
        ? 'برنامج عمولات الموظفين صالون وإدارة موظفين صالون تجميل ذكي. تنظيم الورديات، مسيرات الرواتب، حساب العمولات التلقائي، وواجهة مقدم الخدمة المستقلة.'
        : 'Smart salon staff management & commission software. Track shifts, payroll, automated service commissions, and dedicated staff portals.',
      keywords: [
        'برنامج عمولات الموظفين صالون',
        'إدارة موظفين صالون تجميل',
        'حساب عمولات المشاغل',
        'رواتب خبيرات التجميل',
        'برنامج كوافيرات وحلاقين',
      ],
      pathname: `/solutions/${slug}`,
      noIndex: false,
    });
  }

  if (
    slug === 'inventory-purchasing' ||
    slug === 'inventory-management' ||
    slug === 'purchasing-vendors' ||
    slug === 'purchasing-suppliers'
  ) {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج إدارة مخزون ومستلزمات الصالونات ومراكز التجميل | RashX'
        : 'Salon Inventory & Beauty Supplies Management Software | RashX',
      description: isAr
        ? 'برنامج مخزون صالون ذكي للتحكم في مستلزمات التجميل. جرد بالباركود، تنبيهات النواقص، فصل استهلاك الخدمات عن مبيعات التجزئة، وربط بالمشتريات.'
        : 'Smart salon inventory management software. Barcode auditing, low-stock alerts, backbar vs. retail tracking, and direct supplier PO integration.',
      keywords: [
        'برنامج مخزون صالون',
        'إدارة مخزون مستلزمات التجميل',
        'جرد مستودع صالون',
        'مستلزمات مشاغل نسائية',
        'برنامج إدارة مشتريات الصالونات',
      ],
      pathname: `/solutions/${slug}`,
      noIndex: false,
    });
  }

  if (
    slug === 'crm-loyalty' ||
    slug === 'crm-client-management'
  ) {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'نظام CRM وإدارة عملاء الصالونات ومراكز التجميل | RashX'
        : 'Salon CRM & Client Management System | RashX',
      description: isAr
        ? 'برنامج إدارة عملاء صالون وCRM للصالونات. سجل الزيارات والتفضيلات، تصنيف السلوك، حملات واتساب مخصصة مع التزام صارم بنظام حماية البيانات الشخصية.'
        : 'Smart salon CRM and client management system. Track visit history, beauty preferences, automated segmentation, and personalized WhatsApp engagement.',
      keywords: [
        'CRM للصالونات',
        'برنامج إدارة عملاء صالون',
        'قاعدة بيانات عملاء مشغل',
        'نظام ولاء الصالونات',
        'سجل زيارات عملاء التجميل',
      ],
      pathname: `/solutions/${slug}`,
      noIndex: false,
    });
  }

  if (slug === 'loyalty-rewards') {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج ولاء ونقاط للصالونات ومراكز التجميل | RashX'
        : 'Salon Loyalty & Rewards Program Software | RashX',
      description: isAr
        ? 'برنامج ولاء عملاء صالون ونظام نقاط ولاء للصالونات مخصص. منح النقاط وفق سياسة منشأتك، مكافأة الدائمين، وربط رصيد المكافآت بتطبيق العميل مباشرة.'
        : 'Smart salon loyalty and rewards program. Custom points policy, VIP customer tiers, off-peak point multipliers, and direct Client PWA integration.',
      keywords: [
        'نظام نقاط ولاء للصالونات',
        'برنامج ولاء عملاء صالون',
        'مكافآت عملاء المشاغل',
        'نقاط صالون تجميل',
        'كوبونات خصم الصالون',
      ],
      pathname: `/solutions/${slug}`,
      noIndex: false,
    });
  }

  if (
    slug === 'services-catalog' ||
    slug === 'services-pricing' ||
    slug === 'salon-website' ||
    slug === 'subdomain-platform' ||
    slug === 'branded-website'
  ) {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'موقع وتطبيق خاص لصالونك بنطاق فرعي وهوية متكاملة | RashX'
        : 'Custom Branded Salon Website & Subdomain Platform | RashX',
      description: isAr
        ? 'موقع خاص بالصالون وتطبيق حجز لصالوني بنطاق فرعي مستقل تحت RashX. تخصيص الاسم والشعار والألوان والخدمات والأسعار مع 4 بوابات ذكية لكل منشأة.'
        : 'Get a branded salon website and instant booking web app on a dedicated subdomain. Fully customize your logo, colors, services, pricing, and 4 smart portals.',
      keywords: [
        'موقع خاص بالصالون',
        'تطبيق حجز لصالوني',
        'موقع صالون بنطاق فرعي',
        'تصميم موقع مشغل نسائي',
        'منصة حجز صالونات مخصصة',
      ],
      pathname: `/solutions/${slug}`,
      noIndex: false,
    });
  }

  return generatePageMetadata({
    locale,
    title: isAr
      ? `حلول وأنظمة راش إكس للصالونات | ${slug}`
      : `RashX Salon Management Solutions | ${slug}`,
    description: isAr
      ? 'منظومة سحابية متكاملة لإدارة الصالونات ومراكز التجميل والسبا في المملكة العربية السعودية.'
      : 'Comprehensive cloud management ecosystem for beauty salons and spas in Saudi Arabia.',
    pathname: `/solutions/${slug}`,
    noIndex: false,
  });
}

export default async function SolutionSlugPage({ params }: SolutionPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  if (!ALL_SOLUTION_SLUGS.includes(slug)) {
    notFound();
  }

  const isPos = slug === 'pos-billing' || slug === 'pos-sales';
  const isBooking = slug === 'booking-system';
  const isHr = slug === 'staff-hr' || slug === 'hr-management';
  const isInventory =
    slug === 'inventory-purchasing' ||
    slug === 'inventory-management' ||
    slug === 'purchasing-vendors' ||
    slug === 'purchasing-suppliers';
  const isCrm =
    slug === 'crm-loyalty' ||
    slug === 'crm-client-management';
  const isLoyalty = slug === 'loyalty-rewards';
  const isBrandedPlatform =
    slug === 'services-catalog' ||
    slug === 'services-pricing' ||
    slug === 'salon-website' ||
    slug === 'subdomain-platform' ||
    slug === 'branded-website';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'الحلول والأنظمة' : 'Solutions', item: `/${locale}/features` },
    {
      name: isBooking
        ? isAr ? 'نظام الحجوزات والمواعيد' : 'Booking & Scheduling'
        : isPos
        ? isAr ? 'المبيعات ونقاط البيع (POS)' : 'POS & Cashier'
        : isHr
        ? isAr ? 'الموارد البشرية والعمولات' : 'Staff HR & Commissions'
        : isInventory
        ? isAr ? 'المخزون والمشتريات' : 'Inventory & Purchasing'
        : isCrm
        ? isAr ? 'إدارة علاقات العملاء (CRM)' : 'Client CRM & Preferences'
        : isLoyalty
        ? isAr ? 'الولاء والمكافآت' : 'Loyalty & Rewards'
        : isBrandedPlatform
        ? isAr ? 'الموقع والنطاق الفرعي' : 'Branded Web & Subdomain'
        : slug,
      item: `/${locale}/solutions/${slug}`,
    },
  ];

  /* =========================================================================
     1. BOOKING SYSTEM DATA
     ========================================================================= */
  const bookingFaqs = [
    {
      question: isAr ? 'هل يحجز العميل بدون تحميل أي تطبيق من المتاجر؟' : 'Can clients book appointments without downloading an app?',
      answer: isAr ? 'نعم بكل تأكيد. تتيح راش إكس للعميل الحجز مباشرة من خلال موقع المنشأة الإلكتروني وتطبيق الويب التقدمي (PWA) عبر متصفح الجوال في ثوانٍ معدودة دون تحميل تطبيق.' : 'Yes, absolutely. Clients can book directly through your branded facility website and lightweight Progressive Web App (PWA) from any mobile browser with zero download required.',
    },
    {
      question: isAr ? 'هل يمكن للعميلة تحديد موظفة أو خبيرة معينة أثناء الحجز؟' : 'Can clients select a specific specialist or beautician?',
      answer: isAr ? 'نعم، يتيح النظام للعميل اختيار الخبيرة المفضلة ورؤية مواعيدها الشاغرة فقط، أو اختيار خيار "أي موظفة متاحة" لتسريع الحصول على موعد وملء الفراغات في جدول الصالون تلقائيًا.' : 'Yes. Clients can choose their favorite specialist to view only their open slots, or select "Any Available Specialist" to maximize booking speed and calendar fill rates.',
    },
    {
      question: isAr ? 'كيف يمنع نظام راش إكس تضارب وازدواجية المواعيد (Double Booking)؟' : 'How does RashX prevent appointment clashes and double booking?',
      answer: isAr ? 'يعمل محرك الجدولة بذكاء فوري يربط مدة الخدمة الفعلية بتوافر الموظف، الكرسي، أو غرفة الخدمة. بمجرد تأكيد الحجز، يُحجب الوقت تلقائيًا لمنع أي تعارض بنسبة 100%.' : 'Our scheduling engine maps real service duration, specialist availability, and chair or treatment room capacity in real time. Once locked, the slot is immediately removed from all interfaces.',
    },
    {
      question: isAr ? 'هل يدعم النظام إضافة وقت فاصل تلقائي (Buffer Time) للتعقيم والتجهيز؟' : 'Can we add automated buffer times for cleaning and sanitation?',
      answer: isAr ? 'نعم، يمكنك تخصيص وقت فاصل تلقائي (مثل 10 أو 15 دقيقة) بعد كل موعد لتنظيف وتعقيم الأدوات وتجهيز المكان قبل وصول العميل التالي دون الحاجة لضبط ذلك يدويًا.' : 'Yes. You can configure automatic sanitation buffer periods (e.g., 10 or 15 minutes) appended to each appointment so staff can clean and sanitize equipment effortlessly.',
    },
    {
      question: isAr ? 'كيف تصل إشعارات التذكير وتأكيد المواعيد للعملاء؟' : 'How do appointment confirmations and reminders reach clients?',
      answer: isAr ? 'يرسل النظام إشعارات فورية مؤتمتة عبر الواتساب والرسائل النصية فور الحجز، تليها رسائل تذكير قبل الموعد بساعات محددة مع رابط سريع للتأكيد أو طلب إعادة الجدولة.' : 'Automated WhatsApp and SMS confirmations are dispatched immediately upon booking, followed by automated reminders prior to appointment times, drastically reducing no-shows.',
    },
    {
      question: isAr ? 'هل يمكن لخبيرات التجميل الاطلاع على جداول مواعيد زملائهن أو أرقام المبيعات؟' : 'Can specialists view their colleagues’ schedules or sales metrics?',
      answer: isAr ? 'لا. صُممت واجهة مقدم الخدمة بنظام صلاحيات وأدوار دقيق يتيح لكل موظف رؤية جدول مواعيده اليومية والعمولات الخاصة بخدماته فقط دون الاطلاع على مبيعات الإدارة العامة.' : 'No. Dedicated staff portals operate under strict role-based permissions; specialists only view their own daily appointment pipeline and commissions with zero access to overall financials.',
    },
  ];

  const bookingModules = [
    {
      icon: CalendarCheck,
      titleAr: 'تنظيم المواعيد والجدولة الذكية 24/7',
      titleEn: 'Smart 24/7 Appointment Scheduling',
      descAr: 'استقبال الحجوزات المؤكدة آليًا على مدار الساعة من خلال موقع المنشأة وتطبيق العميل بدون تدخل بشري.',
      descEn: 'Continuous 24/7 automated booking capture from your branded site and client app with zero manual intervention.',
    },
    {
      icon: Users,
      titleAr: 'إدارة جداول ومناوبات مقدمي الخدمة',
      titleEn: 'Specialist Shift & Roster Management',
      descAr: 'تحديد ساعات دوام كل خبيرة ومصفف شعر، أيام الإجازات، والخدمات المؤهلة لتنفيذها مع توزيع عادل للمناوبات.',
      descEn: 'Configuring staff work hours, leaves, and specialist treatment authorizations with balanced scheduling.',
    },
    {
      icon: CheckCircle2,
      titleAr: 'إدارة متكاملة لحالات الحجز وأوقات التوافر',
      titleEn: 'Real-time Booking Statuses & Slot Availability',
      descAr: 'متابعة حالة كل موعد بلون مميز (مؤكد، في الانتظار، جاري التنفيذ، مكتمل، ملغي) لمعرفة سير العمل بلمحة.',
      descEn: 'Visual status tags (confirmed, waitlisted, in-progress, completed, cancelled) for total operational transparency.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'محرك منع التضارب والازدواجية (Zero Clashes)',
      titleEn: 'Conflict-Free Scheduling Engine',
      descAr: 'فحص ثلاثي فوري لتوافر الخبيرة، كرسي/غرفة الخدمة، والمواد المطلوبة، لمنع أي تضارب مواعيد نهائيًا.',
      descEn: 'Instant multi-point checks verifying staff, room/chair, and material availability to eliminate overlapping clashes.',
    },
    {
      icon: Smartphone,
      titleAr: 'تجربة حجز فاخرة وسلسة للعميل (PWA)',
      titleEn: 'Frictionless Client Booking Experience',
      descAr: 'واجهة جوال أنيقة بهوية صالونك تمكّن العميل من اختيار الخدمة والموظفة وتحديد الوقت والتأكيد في ثوانٍ.',
      descEn: 'Branded mobile web interface enabling service and specialist selection with checkout completed in under 60 seconds.',
    },
    {
      icon: Bell,
      titleAr: 'إشعارات التذكير الذكية عبر الواتساب وSMS',
      titleEn: 'Automated WhatsApp & SMS Reminder Alerts',
      descAr: 'تنبيهات مسبقة للعميل قبل موعده تقلل نسبة عدم الحضور (No-shows)، مع إشعارات فورية للموظفة عند حجز موعد.',
      descEn: 'Automated pre-visit alerts minimizing no-shows and alerting specialists immediately upon new bookings.',
    },
  ];

  /* =========================================================================
     2. POS & SALES DATA
     ========================================================================= */
  const posFaqs = [
    {
      question: isAr ? 'هل يدعم نظام كاشير راش إكس الفوترة الإلكترونية؟' : 'Does the RashX POS support electronic invoicing?',
      answer: isAr ? 'تدعم منصة راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة ومتطلبات الربط والتفعيل الصادرة عن هيئة الزكاة والضريبة والجمارك (ZATCA)، مع إصدار الفواتير الضريبية المبسطة وتوليد رمز الاستجابة السريعة (QR Code) المتوافق.' : 'RashX supports ZATCA Phase 2 (Integration & Linking) e-invoicing requirements subject to facility onboarding status and integration criteria issued by the Zakat, Tax and Customs Authority, including simplified tax invoices and cryptographic QR code generation.',
    },
    {
      question: isAr ? 'هل يدعم الكاشير أكثر من طريقة دفع في نفس الفاتورة (Split Payment)؟' : 'Does the POS support multiple split payment methods in a single bill?',
      answer: isAr ? 'نعم بكل تأكيد. يتيح النظام مرونة تامة لتجزئة قيمة الفاتورة عبر عدة وسائل دفع مختلفة (مثال: دفع جزء نقدًا، وجزء عبر مدى، وجزء عبر Apple Pay أو رصيد المحفظة ونقاط الولاء) وتوثيق كل عملية بدقة.' : 'Yes. The POS supports flexible split payments across cash, Mada, Apple Pay, credit cards, and loyalty point balances in one single transaction.',
    },
    {
      question: isAr ? 'كيف يربط الكاشير بين بيع الخدمة واستهلاك المخزون؟' : 'How does the POS integrate with salon inventory and consumption?',
      answer: isAr ? 'بمجرد إغلاق فاتورة الخدمة، يخصم النظام تلقائيًا كميات المواد المعيارية المستخدمة من مستودع الصالون الداخلي (Backbar)، وإذا اشترت العميلة منتجًا منزليًا (Retail) يتم خصمه لحظيًا من رصيد رف البيع.' : 'Upon invoice completion, the POS automatically deducts backbar consumables mapped to that service, while directly adjusting retail stock on the shelf.',
    },
    {
      question: isAr ? 'هل تُحتسب عمولة الخبيرة تلقائيًا عند إتمام الفاتورة؟' : 'Are specialist commissions computed automatically upon checkout?',
      answer: isAr ? 'نعم، بمجرد إصدار الفاتورة وتحديد الخبيرة التي قدمت الخدمة، يحتسب النظام عمولتها آليًا وفق النسبة أو المبلغ الثابت المعتمد في ملفها، وتُسجل في تقاريرها المالية فورًا دون أي حسابات يدوية.' : 'Yes. Once an invoice is closed and linked to the specialist, their commission is instantly allocated according to configured percentages or flat amounts.',
    },
    {
      question: isAr ? 'هل يعمل الكاشير على أجهزة التابلت وشاشات اللمس الحالية؟' : 'Does the POS work on existing tablets and touchscreens?',
      answer: isAr ? 'نعم، راش إكس منظومة سحابية حديثة تعمل عبر المتصفح على أي جهاز تابلت (iPad أو Android)، شاشات نقاط البيع اللمسية، وأجهزة الكمبيوتر المحمولة، وتتوافق مع طابعات الإيصالات الحرارية القياسية.' : 'Yes. RashX is cloud-based and runs on any iPad, Android tablet, POS touchscreen, laptop, or desktop, integrating smoothly with thermal receipt printers.',
    },
    {
      question: isAr ? 'كيف يتعامل النظام مع الخصومات وكوبونات الولاء وباقات الجلسات؟' : 'How does the POS handle discounts, promo codes, and multi-session bundles?',
      answer: isAr ? 'يمكن تطبيق الخصومات بالنسبة المئوية أو المبالغ الثابتة، واسترداد كوبونات الخصم بضغطة زر، أو خصم جلسة مدفوعة مسبقًا من رصيد باقة العميلة مع طباعة إيصال يوضح الرصيد المتبقي.' : 'Discounts and promo codes can be applied instantly, while pre-purchased treatment package sessions are redeemed in one tap with remaining session balances printed on the receipt.',
    },
  ];

  const posModules = [
    {
      icon: Store,
      titleAr: 'إدارة البيع اليومي وصندوق الكاشير (Shift Register)',
      titleEn: 'Daily Shift & Cash Register Control',
      descAr: 'فتح وإغلاق الورديات اليومية، تسجيل العهدة النقدية، مطابقة المبيعات الفعلية، ومنع العجز المالي.',
      descEn: 'Opening and closing cash shifts, float balance tracking, register reconciliations, and shortage prevention.',
    },
    {
      icon: Receipt,
      titleAr: 'فواتير الخدمات ومبيعات المنتجات المزدوجة',
      titleEn: 'Unified Service & Retail Invoicing',
      descAr: 'إصدار فاتورة موحدة تجمع بين خدمات التجميل والسبا المؤداة ومستحضرات العناية المنزلية في معاملة واحدة.',
      descEn: 'Consolidated invoices seamlessly merging performed salon services and retail beauty products in a single checkout.',
    },
    {
      icon: TrendingUp,
      titleAr: 'متابعة الإيرادات والتحصيلات اللحظية',
      titleEn: 'Real-time Revenue & Cashflow Tracking',
      descAr: 'لوحة أرقام حية توضح إجمالي المبيعات، المدفوعات المحصلة، والضرائب المحتسبة لكل فرع وكل وردية.',
      descEn: 'Live financial tracking detailing gross revenue, collected proceeds, and accrued taxes across every branch.',
    },
    {
      icon: Percent,
      titleAr: 'الخصومات الذكية والعروض وباقات الجلسات',
      titleEn: 'Dynamic Discounts & Multi-session Bundles',
      descAr: 'تطبيق كوبونات الخصم، كروت الهدايا، العروض الموسمية، وخصم الجلسات المسبقة الدفع بنقرة واحدة.',
      descEn: 'One-click redemption for promotional coupons, digital gift vouchers, seasonal deals, and pre-paid session packages.',
    },
    {
      icon: CreditCard,
      titleAr: 'تعدد طرق الدفع وتجزئة الفاتورة (Split Payment)',
      titleEn: 'Multi-Payment & Flexible Split Tendering',
      descAr: 'دعم الدفع عبر مدى، Apple Pay، البطاقات الائتمانية، والنقد، مع إمكانية تجزئة الفاتورة بمرونة.',
      descEn: 'Support for Mada, Apple Pay, cards, and cash, with seamless split payment across multiple tender types.',
    },
    {
      icon: FileCheck2,
      titleAr: 'التقارير المالية والضريبية وحساب العمولات',
      titleEn: 'Financial Reports, VAT & Automated Commissions',
      descAr: 'احتساب عمولة الموظفة لحظيًا فور إغلاق الفاتورة، وتوليد تقارير ضريبة القيمة المضافة 15% للإقرار.',
      descEn: 'Instant staff commission accounting upon checkout, along with comprehensive 15% VAT tax return summaries.',
    },
  ];

  /* =========================================================================
     3. STAFF HR & COMMISSIONS DATA
     ========================================================================= */
  const hrFaqs = [
    {
      question: isAr ? 'كيف تُحسب عمولات الخدمات ومبيعات المنتجات في نظام راش إكس؟' : 'How are service and product commissions calculated in RashX?',
      answer: isAr ? 'يحتسب النظام العمولات آليًا فور إتمام الفاتورة وفق القواعد المحددة مسبقًا في ملف كل موظفة؛ سواء كانت نسبة مئوية من قيمة الخدمة، مبلغًا مقطوعًا ثابتًا، أو شرائح تصاعدية، مع فصل دقيق بين عمولة الخدمات وعمولة مبيعات منتجات التجزئة.' : 'Commissions are calculated automatically upon checkout based on pre-configured rules per employee: percentage of service value, flat fee per service, or tiered performance tiers, cleanly differentiating between treatment services and retail cosmetic sales.',
    },
    {
      question: isAr ? 'هل يمكن تحديد نسب عمولة مختلفة لكل خبيرة أو لكل نوع خدمة؟' : 'Can we configure different commission rates per specialist or service category?',
      answer: isAr ? 'نعم بالكامل. يتيح النظام مرونة فائقة لتخصيص نسب العمولات؛ يمكنك تحديد نسبة خاصة للخبيرات ذوات الخبرة العالية تختلف عن المساعدات، أو تخصيص نسب عمولة أعلى للخدمات التخصصية كالصبغات المعقدة أو المعالجات.' : 'Yes, completely flexible. You can set individual commission rates tailored to specialist seniority or service category, incentivizing higher-margin treatments like complex coloring or advanced hair therapies.',
    },
    {
      question: isAr ? 'ماذا يرى الموظف في "واجهة مقدم الخدمة" المستقلة على هاتفه؟' : 'What does the employee see in their dedicated staff portal?',
      answer: isAr ? 'تمنح واجهة مقدم الخدمة الموظفة وصولاً منظمًا وخاصًا يتيح لها: استعراض جدول مواعيدها الخاصة، معرفة الخدمة المطلوبة، تتبع عمولاتها المكتسبة، وتسجيل إتمام الخدمات، دون أي صلاحية لرؤية مبيعات الصالون العامة أو بيانات الإدارة.' : 'The staff portal gives specialists a streamlined personal view: their daily and weekly appointments, client names, scheduled treatments, earned commission logs, and task completion buttons, with zero access to overall salon financials or client phone records.',
    },
    {
      question: isAr ? 'كيف يدعم النظام إدارة الحضور والانصراف وفق الإمكانات المفعلة؟' : 'How does the system handle attendance and time-tracking per activated setup?',
      answer: isAr ? 'يدعم النظام تسجيل الحضور والانصراف وفق الإمكانات المتاحة لدى المنشأة (مثل تسجيل الدخول عبر الكاشير، أو تأكيد الحضور من واجهة الموظفة)، مع مطابقتها التلقائية مع ساعات الورديات المجدولة لاحتساب التأخير والساعات الإضافية.' : 'Supports attendance logging based on your facility configuration (PIN login at POS, or portal clock-ins), cross-referencing against scheduled rosters to calculate overtime or tardiness accurately.',
    },
    {
      question: isAr ? 'هل يمكن منع الموظفة من رؤية أرقام هواتف العميلات أو تعديل الفواتير؟' : 'Can we hide client phone numbers and restrict invoice editing for staff?',
      answer: isAr ? 'نعم، يتميز نظام راش إكس بصلاحيات أمان صارمة (Role-based Permissions) متوافقة مع نظام حماية البيانات الشخصية السعودي (PDPL)؛ حيث يمكنك إخفاء أرقام الاتصال عن الموظفات لمنع التسريب، وحظر حذف الفواتير إلا للمدير المصرح له فقط.' : 'Yes. Granular permissions compliant with Saudi PDPL allow you to mask client phone numbers from staff preventing off-platform poaching, and restrict invoice adjustments or voids exclusively to authorized managers.',
    },
    {
      question: isAr ? 'كيف يساعد النظام الصالون في ضبط مسيرات الرواتب وفق نظام العمل السعودي؟' : 'How does the software assist in payroll processing under Saudi labor guidelines?',
      answer: isAr ? 'يولد النظام تقرير مسيرات الرواتب الشهرية شاملاً: الراتب الأساسي، البدلات الثابتة، إجمالي العمولات المستحقة للخدمات والمنتجات، والخصومات إن وُجدت، مما يسهل مطابقتها وإعدادها للاعتماد والتحويل المالي المعتمد.' : 'Generates consolidated monthly payroll summaries breaking down base salary, allowances, earned commissions, and sanctioned deductions, ready for administrative approval and bank transfer workflows.',
    },
  ];

  const hrModules = [
    {
      icon: Briefcase,
      titleAr: 'ملفات الموظفين وسجلات الوثائق الرسمية',
      titleEn: 'Comprehensive Staff Profiles & Documents',
      descAr: 'سجل رقمي متكامل لكل موظفة يشمل: العقد، الإقامة، الشهادة الصحية لصالونات التجميل، وتنبيهات مسبقة قبل انتهاء صلاحية الوثائق.',
      descEn: 'Digital profiles tracking labor contracts, Iqama IDs, municipal health certificates, and automated expiration alerts.',
    },
    {
      icon: Lock,
      titleAr: 'نظام الصلاحيات والأدوار الدقيق (PDPL)',
      titleEn: 'Granular Role-based Access Control',
      descAr: 'حماية أسرار الصالون وقوائم العميلات؛ منع التعديل على الأسعار أو الفواتير، وإخفاء أرقام الهواتف عن الموظفات لمنع التسريب.',
      descEn: 'Safeguarding salon data and client contact privacy, restricting price edits, and preventing off-platform poaching.',
    },
    {
      icon: CalendarDays,
      titleAr: 'جداول العمل وتوزيع الورديات والمناوبات',
      titleEn: 'Smart Shift Scheduling & Rosters',
      descAr: 'تنظيم ورديات العمل الصباحية والمسائية، أيام الإجازات، وتغطية ساعات الذروة في عطلات نهاية الأسبوع ومواسم الأعياد.',
      descEn: 'Planning morning and evening shifts, days off, and peak weekend coverage to maintain optimal staffing.',
    },
    {
      icon: TrendingUp,
      titleAr: 'متابعة الأداء ومؤشرات الإنتاجية والتقييم',
      titleEn: 'Productivity Metrics & Staff Ratings',
      descAr: 'تقارير تفصيلية توضح عدد الخدمات المنجزة لكل خبيرة، متوسط مدة الخدمة، إجمالي مبيعاتها، وتقييمات العميلات بعد الزيارة.',
      descEn: 'Actionable KPIs revealing completed treatments per specialist, average duration, gross revenue contribution, and client ratings.',
    },
    {
      icon: BadgePercent,
      titleAr: 'احتساب العمولات والمستحقات بدقة آلية',
      titleEn: 'Automated Commission Engine & Payouts',
      descAr: 'حساب عمولة الخدمة والمنتج فور إغلاق الفاتورة؛ بنسب ثابتة، مبالغ مقطوعة، أو شرائح متدرجة تحفز زيادة المبيعات وتنهي الخلافات.',
      descEn: 'Real-time commission allocation per invoice: fixed percentages, flat rates, or tiered targets ending disputes.',
    },
    {
      icon: Timer,
      titleAr: 'الحضور والانصراف وفق الإمكانات المفعلة',
      titleEn: 'Attendance & Work Hours Tracking',
      descAr: 'تسجيل الحضور والانصراف ومطابقته آليًا مع الورديات المجدولة لاحتساب ساعات التأخير أو الساعات الإضافية بعدالة تامة.',
      descEn: 'Tracking check-ins and check-outs mapped against scheduled shifts for transparent overtime and delay tracking.',
    },
    {
      icon: Smartphone,
      titleAr: 'واجهة مقدم الخدمة المستقلة (Staff Portal)',
      titleEn: 'Dedicated Service Provider Mobile Interface',
      descAr: 'بوابة مستقلة على جوال الخبيرة تستعرض مواعيدها الخاصة، تسجل إتمام الخدمات، وتتابع رصيد عمولاتها دون رؤية بيانات الإدارة.',
      descEn: 'A private mobile web app for specialists to view personal bookings, mark treatments complete, and track daily commissions.',
    },
  ];

  /* =========================================================================
     4. INVENTORY & PURCHASING DATA
     ========================================================================= */
  const inventoryFaqs = [
    {
      question: isAr
        ? 'ما الفرق بين مخزون الاستخدام الداخلي (Backbar) ومخزون البيع (Retail) في صالونات التجميل؟'
        : 'What is the difference between Backbar and Retail inventory in salons?',
      answer: isAr
        ? 'مخزون الاستخدام الداخلي (Backbar) يضم مستحضرات التجميل والمواد المستهلكة في تقديم الخدمات داخل الصالون (مثل عبوات الصبغة الكبيرة، الشامبو المعالج، الأكاسيد، وزيوت المساج) وتُخصم تلقائيًا عند تنفيذ الخدمة. أما مخزون البيع بالتجزئة (Retail) فيشمل المنتجات المغلفة الجاهزة للبيع المباشر للعميلات للعناية المنزلية وتُباع عبر الكاشير بسعر تجزئة.'
        : 'Backbar encompasses salon-use supplies consumed during treatments (large dye tubes, technical shampoos, massage oils), automatically depleted per service formula. Retail inventory consists of branded take-home products sold directly to clients at the front desk POS.',
    },
    {
      question: isAr
        ? 'كيف يخصم النظام استهلاك المواد المستخدمة في خدمات الشعر والبشرة؟'
        : 'How does the software track cosmetic consumption per service formula?',
      answer: isAr
        ? 'يتيح لك النظام ربط كل خدمة في قائمة الصالون بكميات المواد المعيارية المستهلكة منها؛ فعند إتمام جلسة صبغة أو تنظيف بشرة وإصدار فاتورتها بالكاشير، يقوم النظام بخصم الكمية المحددة من رصيد المستودع الداخلي تلقائيًا دون الحاجة لتسجيل الخصم يدويًا في كل مرة.'
        : 'You can map standard product consumption quantities to each catalog service. Upon invoice checkout, the POS automatically deducts mapped grams or milliliters from internal backbar stock rooms with zero manual paperwork.',
    },
    {
      question: isAr
        ? 'هل يرسل النظام تنبيهات تلقائية عند اقتراب نفاد المواد الأساسية؟'
        : 'Does the system send automated low-stock threshold alerts?',
      answer: isAr
        ? 'نعم، يمكنك تحديد "نقطة إعادة الطلب" (Minimum Reorder Point) لكل مادة أو منتج؛ وبمجرد أن يصل الرصيد إلى هذا الحد الأدنى، يرسل النظام تنبيهًا فوريًا لمدير الصالون أو مسؤول المشتريات، مما يمنع انقطاع المواد الأساسية في أوقات الذروة ومواسم الأعياد.'
        : 'Yes. You define minimum reorder thresholds for every SKU. When stock dips to that limit, automated alerts trigger on the management dashboard, preventing critical supply stockouts during peak holiday seasons.',
    },
    {
      question: isAr
        ? 'كيف يدعم النظام الجرد الفعلي للمستودع باستخدام الباركود؟'
        : 'How does the system streamline physical stocktaking using barcode scanners?',
      answer: isAr
        ? 'يدعم النظام مسح الباركود باستخدام قارئ الباركود اللاسلكي أو كاميرا الجهاز اللوحي؛ حيث يمكنك جرد الرفوف بسرعة ومطابقة الكميات الفعلية مع الرصيد الدفتري المسجل، ويقوم النظام بإظهار الفروقات وتوثيق التسويات المخزنية بنقرة واحدة.'
        : 'Supports rapid barcode scanning via wireless handheld scanners or tablet cameras, allowing quick shelf audits and instant discrepancy reconciliations between physical inventory and system ledgers.',
    },
    {
      question: isAr
        ? 'كيف يرتبط المخزون بنظام المشتريات وإدارة الموردين؟'
        : 'How is inventory connected to purchasing and supplier management?',
      answer: isAr
        ? 'عند انخفاض كميات أي مادة، يمكنك تحويل قائمة النواقص بضغطة زر إلى أمر شراء رسمي (Purchase Order) موجّه للمورد المعتمد، وعند استلام الشحنة ومطابقتها، تُضاف الكميات الموردة تلقائيًا إلى رصيد المخزون مع توثيق فاتورة المورد في الحسابات.'
        : 'Low-stock items can be transformed into official Purchase Orders (POs) sent directly to preferred vendors. Once goods arrive and are inspected, received quantities automatically update stock balances while vendor invoices are logged into accounts payable.',
    },
    {
      question: isAr
        ? 'هل يدعم النظام إدارة مخزون الفروع المتعددة والتحويل بينها؟'
        : 'Does the platform support multi-branch stock transfers and warehouse hubs?',
      answer: isAr
        ? 'نعم، يمكنك إدارة مستودع مركزي أو مستودعات مستقلة لكل فرع من فروع صالونك، مع ميزة التحويل المخزني الموثق بين الفروع (Inter-branch Transfers) التي تتبع الشحنة من الفرع المرسل وحتى تأكيد استلامها في الفرع المستقبل.'
        : 'Yes. Manage central warehouses or dedicated stockrooms per branch, utilizing documented inter-branch transfer workflows that track consignments until receiver confirmation.',
    },
  ];

  const inventoryModules = [
    {
      icon: PackageOpen,
      titleAr: 'فصل مخزون الصالون (Backbar) عن البيع (Retail)',
      titleEn: 'Dual Backbar & Retail Stock Segregation',
      descAr:
        'إدارة منفصلة لمستحضرات الاستخدام الداخلي في كبائن الخدمات ومستحضرات البيع المباشر للعميلات لمنع خلط الحسابات والتكلفة.',
      descEn:
        'Clean separation between internal treatment consumption supplies and take-home retail cosmetics ensuring precise margin auditing.',
    },
    {
      icon: Boxes,
      titleAr: 'متابعة الكميات المتاحة والأرصدة اللحظية',
      titleEn: 'Real-time Stock Levels & Multi-Branch Balances',
      descAr:
        'رؤية شاملة للأرصدة المتوفرة في كل مستودع وكل فرع على مدار الساعة مع رصد تواريخ الصلاحية وأرقام التشغيلات (Batches).',
      descEn:
        'Live visibility over available inventory across all branches and central storage, including batch numbers and expiration dates.',
    },
    {
      icon: ArrowUpDown,
      titleAr: 'إدارة عمليات الصرف والإضافة الموثقة',
      titleEn: 'Documented Stock In, Stock Out & Transfers',
      descAr:
        'سندات استلام بضائع، صرف مواد لمحطات عمل الكوافيرات، إتلاف المواد منتهية الصلاحية، وسندات تحويل بين الفروع.',
      descEn:
        'Formal goods received notes, station disbursements, write-offs for damaged goods, and inter-branch transfer tracking.',
    },
    {
      icon: History,
      titleAr: 'سجل تدقيق حركة المخزون (Inventory Audit Trail)',
      titleEn: 'Granular Inventory Movement Audit Trail',
      descAr:
        'تتبع دقيق لكل حركة صنف: من صرف المادة، في أي تاريخ ووقت، وبأي فاتورة خدمة أو بيع، وأي خبيرة استلمتها.',
      descEn:
        'Trace every product movement: timestamp, authorized employee, mapped service ticket, and exact consumption deductions.',
    },
    {
      icon: Bell,
      titleAr: 'تنبيهات انخفاض الكميات وحد إعادة الطلب',
      titleEn: 'Automated Low-Stock Threshold Alerts',
      descAr:
        'إشعارات ذكية تظهر فور وصول أي صنف لحد الأمان الأدنى لمنع نفاد الصبغات أو الزيوت الأساسية أثناء مواسم الذروة والأعياد.',
      descEn:
        'Proactive threshold alerts warning management when key dyes or treatment formulas reach reorder levels, preventing peak-season outages.',
    },
    {
      icon: Barcode,
      titleAr: 'الجرد الدوري السريع بالباركود ومطابقة الفروقات',
      titleEn: 'Fast Barcode Stocktaking & Discrepancy Audits',
      descAr:
        'جرد سنوي أو دوري في دقائق عبر مسح الباركود، مع كشف فوري لأي عجز أو زيادة وتسوية الفروقات المخزنية بضغطة زر.',
      descEn:
        'Periodic stocktakes executed in minutes using wireless scanners, pinpointing variances between physical counts and system balances.',
    },
    {
      icon: Truck,
      titleAr: 'ربط مباشر بأوامر الشراء وإدارة الموردين',
      titleEn: 'Direct Purchasing & Vendor PO Automation',
      descAr:
        'تحويل النواقص آليًا إلى أوامر شراء (POs)، حفظ سجلات الموردين وأسعار التوريد، ومطابقة الفواتير مع الشحنات المستلمة.',
      descEn:
        'One-click conversion of low-stock alerts into vendor purchase orders, maintaining supplier price lists and delivery receipts.',
    },
  ];

  /* =========================================================================
     5. CRM & CLIENT MANAGEMENT DATA
     ========================================================================= */
  const crmFaqs = [
    {
      question: isAr
        ? 'هل يستطيع موظفو الاستقبال أو خبيرات التجميل تصدير أو سرقة قاعدة بيانات العملاء؟'
        : 'Can receptionists or salon specialists export or leak client databases?',
      answer: isAr
        ? 'قطعاً لا. توفر راش إكس نظام صلاحيات وأدوار متقدم؛ حيث يمكنك حجب أرقام هواتف العملاء بإخفاء الأرقام الوسطى، وتعطيل خاصية تصدير قوائم العملاء تماماً إلا للمالك أو المدير التنفيذي فقط.'
        : 'Absolutely not. RashX features granular role-based permissions; you can mask phone numbers and completely restrict customer list export privileges exclusively to the business owner.',
    },
    {
      question: isAr
        ? 'كيف يساعد تصنيف وسلوك العملاء في استعادة العميلات المنقطعات؟'
        : 'How does client behavioral segmentation help win back lapsed customers?',
      answer: isAr
        ? 'يقوم النظام تلقائياً بتحديد فئة العميلات المعرضات للانقطاع (اللاتي لم يزرن الصالون منذ 45 إلى 60 يوماً)، ويمنحك إمكانية إرسال رسائل واتساب تشجيعية وعروض مخصصة لتحفيزهن على تكرار الزيارة.'
        : 'The engine automatically detects churn-risk clients (inactive for 45-60 days) and enables one-click personalized WhatsApp re-engagement campaigns with tailored incentives.',
    },
    {
      question: isAr
        ? 'هل يدعم ملف العميل تدوين درجات ألوان الصبغات والملاحظات الطبية والحساسية؟'
        : 'Does the client profile store hair color formulas, allergies, and treatment notes?',
      answer: isAr
        ? 'نعم بكل تأكيد. يحتوي كل ملف عميل على قسم تفضيلات وملاحظات فنية يتيح تسجيل تركيبة ودرجة الصبغة، ونوعية البشرة، وأي حساسية تجاه مستحضرات معينة لتنبيه الفريق قبل تقديم الخدمة.'
        : 'Yes, definitively. Every client record includes technical and medical note sections for hair dye formulas, skin sensitivity, and product allergies, alerting stylists before service delivery.',
    },
    {
      question: isAr
        ? 'كيف تمتثل راش إكس لنظام حماية البيانات الشخصية السعودي (PDPL)؟'
        : 'How does RashX comply with the Saudi Personal Data Protection Law (PDPL)?',
      answer: isAr
        ? 'تُعزل بيانات كل صالون منطقياً ضمن نطاقه الفرعي المستقل وتُشفر بالكامل أثناء النقل والتخزين، مع التزام تام بعدم مشاركة أو استغلال بيانات العملاء بأي شكل وفق متطلبات نظام حماية البيانات الشخصية السعودي.'
        : 'Each facility operates on a logically isolated subdomain with end-to-end data encryption at rest and in transit, strictly complying with Saudi PDPL regulations without third-party data sharing.',
    },
    {
      question: isAr
        ? 'هل يمكننا استيراد بيانات عملائنا السابقة من ملف إكسل (Excel)؟'
        : 'Can we import our existing client base from Excel or CSV spreadsheets?',
      answer: isAr
        ? 'نعم، نوفر أداة استيراد سهلة تتيح لك رفع سجلات العملاء وأرقامهم وعناوينهم وتواريخ ميلادهم من ملفات Excel وCSV بضغطة زر مع فحص تلقائي لمنع تكرار السجلات.'
        : 'Yes, our spreadsheet import wizard lets you upload client contact lists, birthdays, and historic notes with automated deduplication checks.',
    },
    {
      question: isAr
        ? 'هل يمكن مكافأة العملاء تلقائياً بنقاط ولاء على كل زيارة أو خدمة؟'
        : 'Can clients automatically accumulate loyalty rewards per visit and service?',
      answer: isAr
        ? 'نعم، يرتبط نظام CRM بمحرك الولاء والمكافآت، مما يتيح احتساب نقاط تلقائية بناءً على قيمة الفاتورة، مع إمكانية استبدال النقاط بخصومات أو خدمات مجانية مباشرة على الكاشير.'
        : 'Yes, integrated loyalty engines accrue redeemable points based on spend thresholds, usable as instant discounts or complimentary treatments directly at checkout.',
    },
  ];

  const crmModules = [
    {
      icon: Users,
      titleAr: 'قاعدة بيانات عملاء مركزية وملف 360° موحد',
      titleEn: 'Centralized 360° Client Profile',
      descAr:
        'ملف شخصي متكامل لكل عميل يجمع بيانات التواصل، تفضيلات الخدمة، تاريخ المعاملات، ورصيد الولاء من كافة قنوات الصالون.',
      descEn:
        'Comprehensive client directory aggregating contact details, aesthetic preferences, visit history, and loyalty balances.',
    },
    {
      icon: History,
      titleAr: 'سجل الزيارات والخدمات والمشتريات السابقة',
      titleEn: 'Complete Visit, Service & Retail History',
      descAr:
        'متابعة تفصيلية لكل جلسة علاجية، الخدمات المنفذة، المنتجات المشتراة، وملاحظات الخبيرة السابقة لتكرار النتيجة المثالية.',
      descEn:
        'Full timeline of past appointments, rendered treatments, retail purchases, and stylist notes for consistent service quality.',
    },
    {
      icon: CalendarCheck,
      titleAr: 'تاريخ الحجوزات ومعدل الحضور والغياب (No-Show)',
      titleEn: 'Booking Track Record & Attendance Rates',
      descAr:
        'تتبع التزام العميل بالمواعيد السابقة ورصد حالات عدم الحضور والإلغاء مع ميزة القائمة التنبيهية للحجوزات المستقبلية.',
      descEn:
        'Track client punctuality, no-shows, and cancellations with alert flags to protect salon calendar utilization.',
    },
    {
      icon: Filter,
      titleAr: 'تصنيف العملاء وتحليل السلوك الشرائي',
      titleEn: 'Smart Behavioral & RFM Segmentation',
      descAr:
        'تصنيف آلي للعميلات (VIP، عميلات منتظمات، زوار جدد، وعميلات منقطعات) لاستهداف كل فئة بالحملات والعروض المناسبة.',
      descEn:
        'Automated categorization (VIP, regular, new, lapsed) based on recency, frequency, and monetary spend patterns.',
    },
    {
      icon: HeartHandshake,
      titleAr: 'سجل الملاحظات الفنية والتفضيلات والحساسية',
      titleEn: 'Personalized Preferences & Allergy Safeguards',
      descAr:
        'حفظ أرقام وتركيبات الصبغة، وحساسية البشرة، وتفضيلات الضيافة والخبيرة المفضلة لتقديم تجربة استثنائية تناسب ذوق العميل.',
      descEn:
        'Record dye formulas, skin sensitivities, favorite beauticians, and hospitality preferences for VIP care.',
    },
    {
      icon: MessageSquare,
      titleAr: 'تحسين التواصل وحملات الواتساب المخصصة',
      titleEn: 'Personalized WhatsApp & Engagement Campaigns',
      descAr:
        'إرسال إشعارات التهنئة بالمناسبات وأعياد الميلاد، وتذكير العميلات بمواعيد إعادة العناية والصبغة في التوقيت المثالي.',
      descEn:
        'Automated birthday greetings, seasonal promotions, and personalized touchpoints driving recurring bookings.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'حماية البيانات وفق نظام حماية البيانات السعودي (PDPL)',
      titleEn: 'Saudi PDPL Compliance & Subdomain Security',
      descAr:
        'عزل منطقي تام لبيانات منشأتك على نطاقك الفرعي الخاص، مع تشفير البيانات ومنع تصدير أرقام العملاء إلا بإذن الإدارة.',
      descEn:
        'Strict logical tenant isolation on dedicated subdomains with data encryption complying with Saudi PDPL regulations.',
    },
  ];

  /* =========================================================================
     6. LOYALTY & REWARDS SYSTEM DATA
     ========================================================================= */
  const loyaltyFaqs = [
    {
      question: isAr
        ? 'هل يمكن تحديد سياسة خاصة لاكتساب النقاط (مثل ريال = نقطة، أو نقاط على خدمات محددة)؟'
        : 'Can we define custom points accrual rules (e.g. SAR to points or per-service)?',
      answer: isAr
        ? 'نعم بكل تأكيد. يمنحك محرك الولاء في راش إكس مرونة كاملة لتحديد قواعد اكتساب النقاط وفق سياسة منشأتك؛ يمكنك تحديد عدد الريالات المقابلة لكل نقطة (مثل كل 10 ر.س = 1 نقطة)، أو تخصيص نقاط مضاعفة على خدمات معينة ذات هوامش ربح مرتفعة (مثل المعالجات والصبغات) أو في أيام محددة.'
        : 'Yes, absolutely. The RashX loyalty engine provides full flexibility to configure points rules matching your salon policy: define points per SAR spent (e.g. 10 SAR = 1 point), or award multiplier points on high-margin treatments or specific weekdays.',
    },
    {
      question: isAr
        ? 'كيف يتابع العميل رصيد نقاطه ومكافآته المتاحة؟'
        : 'How do clients check their accumulated points balance and rewards?',
      answer: isAr
        ? 'يرتبط نظام الولاء مباشرة بتطبيق العميل (PWA) المخصص لمنشأتك على نطاقها الفرعي. بمجرد فتح العميل لصفحة الصالون على هاتفه، يظهر رصيد نقاطه اللحظي، فئته الحالية (فضي/ذهبي/بلاتيني)، وقائمة المكافآت التي يمكنه استبدالها بضغطة زر بدون تحميل أي تطبيق.'
        : 'The loyalty system links in real time to your branded Client Progressive Web App (PWA) on your dedicated subdomain. Clients view their points balance, tier status, and redeemable vouchers instantly on any smartphone with zero app download required.',
    },
    {
      question: isAr
        ? 'كيف يتم استبدال النقاط أثناء الدفع على شاشة الكاشير؟'
        : 'How are loyalty points redeemed during checkout on the POS?',
      answer: isAr
        ? 'عند إتمام عملية البيع على نقطة البيع (POS)، يتعرف النظام تلقائياً على رقم العميل ويعرض رصيد نقاطه القابلة للاستبدال وقيمتها النقدية بالريال السعودي. يستطيع موظف الكاشير تطبيق الخصم فوراً بضغطة واحدة، ليُخصم الرصيد من محفظة العميل ويُوثق في الفاتورة الإلكترونية.'
        : 'During POS checkout, the cashier recognizes the client and displays their redeemable points and SAR cash value. Staff apply the discount with a single tap, immediately deducting the points from the wallet and itemizing it on the receipt.',
    },
    {
      question: isAr
        ? 'هل يمكن تفعيل مضاعفة النقاط في أوقات الركود لتشجيع الحجز في الأيام الهادئة؟'
        : 'Can we enable double points during off-peak hours to drive bookings?',
      answer: isAr
        ? 'نعم، يدعم النظام ميزة النقاط الديناميكية (Off-Peak Multipliers). يمكنك ضبط النظام لمضاعفة النقاط تلقائياً (مثل x2 نقاط) في الأيام الهادئة (مثل الإثنين والثلاثاء) لتشجيع العميلات على حجز المواعيد في تلك الفترات وموازنة تشغيل الصالون.'
        : 'Yes, our off-peak multiplier engine lets you automatically grant 2x or 3x points on slow weekdays (e.g. Mondays/Tuesdays), incentivizing bookings to balance salon chair occupancy.',
    },
    {
      question: isAr
        ? 'هل تنتهي صلاحية نقاط الولاء، وكيف يُنبه العميل قبل انقضائها؟'
        : 'Do loyalty points expire, and are clients notified beforehand?',
      answer: isAr
        ? 'يمكنك تحديد مدة صلاحية للنقاط (مثل 6 أشهر أو سنة) لتحفيز العملاء على تكرار الزيارة بسرعة قبل نفاد رصيدهم. يرسل النظام إشعارات تذكيرية ذكية عبر الواتساب قبل موعد انتهاء النقاط لإبلاغ العميل بالرصيد المتبقي وتشجيعه على حجز موعد للاستفادة منها.'
        : 'You can configure points validity periods (e.g. 6 or 12 months). Automated WhatsApp alerts notify clients 14 days prior to expiration, driving urgent appointment bookings to salvage their points.',
    },
    {
      question: isAr
        ? 'هل يدعم النظام مستويات ولاء متدرجة (VIP Tiers) لمكافأة العميلات الأكثر إنفاقاً؟'
        : 'Does the system support tiered memberships (VIP Tiers) for high-spenders?',
      answer: isAr
        ? 'نعم، يمكنك بناء مستويات عضوية متعددة (مثل الفضي، الذهبي، والبلاتيني). يترقى العميل آلياً بمجرد وصول إجمالي إنفاقه للحد المحدد، ليحصل على امتيازات حصرية مثل خصومات دائمة، أولوية الحجز، أو خدمات ترحيبية مجانية.'
        : 'Yes, configure multi-tiered memberships (Silver, Gold, Platinum). Clients auto-graduate upon hitting cumulative spend thresholds, unlocking permanent retail discounts, priority booking, and complimentary perks.',
    },
  ];

  const loyaltyModules = [
    {
      icon: Award,
      titleAr: 'برامج ولاء مخصصة ومرنة وفق نموذج صالونك',
      titleEn: 'Customizable Loyalty Policy Engine',
      descAr:
        'تصميم قواعد احتساب واستبدال النقاط بما يناسب نموذج عملك وهوامش ربحية الخدمات بدون أي قيود برمجية.',
      descEn:
        'Flexible points rules and redemption matrices tailored to your business model, service margins, and brand identity.',
    },
    {
      icon: Coins,
      titleAr: 'منح النقاط التلقائي وربطه المباشر بنقاط البيع (POS)',
      titleEn: 'Automated POS Points Accrual',
      descAr:
        'احتساب فوري للنقاط على كل فاتورة خدمات أو منتجات تجزئة عند إتمام البيع، مع تحديث فوري لرصيد العميل.',
      descEn:
        'Real-time points calculation on every completed checkout invoice for both salon treatments and retail cosmetics.',
    },
    {
      icon: Trophy,
      titleAr: 'مستويات عضوية متدرجة (VIP Tiers) لمكافأة الدائمين',
      titleEn: 'Tiered VIP Recognition & Milestones',
      descAr:
        'ترقية تلقائية للعميلات الأكثر إنفاقاً (فضي، ذهبي، بلاتيني) تمنحهن أولوية الحجز وامتيازات دائمة تُشعرهن بالتقدير.',
      descEn:
        'Auto-tier graduation based on annual spend thresholds, providing top VIPs with priority scheduling and exclusive gifts.',
    },
    {
      icon: Gift,
      titleAr: 'عروض وامتيازات حصرية ومكافآت أعياد الميلاد',
      titleEn: 'Exclusive Perks & Birthday Gifts',
      descAr:
        'إرسال نقاط مجانية أو قسائم خدمات وهدايا ترحيبية في أعياد ميلاد العميلات والمناسبات الوطنية لتوطيد الارتباط بالعلامة.',
      descEn:
        'Automated birthday reward points, holiday vouchers, and anniversary treats cementing customer emotional attachment.',
    },
    {
      icon: Repeat,
      titleAr: 'تشجيع تكرار الزيارة ومضاعفة النقاط في أوقات الركود',
      titleEn: 'Repeat-Visit Incentives & Off-Peak Multipliers',
      descAr:
        'تفعيل مضاعفة النقاط (2x أو 3x) في الأيام الهادئة لتشجيع الحجوزات وملء الكراسي الشاغرة بذكاء واحترافية.',
      descEn:
        'Dynamic points multiplication during quiet weekday slots, turning low-traffic periods into bustling booking windows.',
    },
    {
      icon: Smartphone,
      titleAr: 'ربط مباشر بتطبيق العميل (PWA) بدون تحميل',
      titleEn: 'Direct Client PWA Rewards Wallet',
      descAr:
        'محفظة نقاط رقمية تعرض رصيد المكافآت والقسائم الجاهزة للاستبدال على هاتف العميل مباشرة عبر النطاق الفرعي للمنشأة.',
      descEn:
        'Branded digital wallet on your facility subdomain where clients track points, tier progression, and available vouchers with zero downloads.',
    },
    {
      icon: BadgeCheck,
      titleAr: 'استبدال فوري وآمن يمنع التلاعب والأخطاء',
      titleEn: 'Secure Instant Checkout Redemption',
      descAr:
        'ظهور رصيد النقاط تلقائياً على شاشة الكاشير وتطبيق الخصم بضغطة زر مع توثيق كامل لمنع أي تلاعب أو ازدواجية.',
      descEn:
        'One-tap point deduction directly at the register, preventing cashier fraud and automatically printing itemized receipts.',
    },
  ];

  /* =========================================================================
     7. BRANDED SUBDOMAIN & 4-PORTALS SYSTEM DATA
     ========================================================================= */
  const brandedFaqs = [
    {
      question: isAr
        ? 'كيف أحصل على نطاق فرعي لصالوني، وهل أحتاج لخبرة تقنية أو مبرمجين؟'
        : 'How do I get a dedicated salon subdomain, and do I need coding skills?',
      answer: isAr
        ? 'تُنشئ راش إكس نطاقك الفرعي تلقائياً فور التسجيل (مثل: yoursalon.rashx.org) وتفعله خلال دقائق معدودة. تتكفل المنظومة بتهيئة الخوادم السحابية، شهادات الأمان SSL المشفرة، وقواعد البيانات بدون الحاجة لأي مبرمجين أو خبرة تقنية.'
        : 'RashX automatically provisions your dedicated subdomain (e.g. yoursalon.rashx.org) in minutes. Server deployment, SSL certificates, and cloud infrastructure are handled entirely with zero technical skills required.',
    },
    {
      question: isAr
        ? 'هل أستطيع تخصيص الألوان والشعار والخطوط بما يتطابق مع هويتي البصرية؟'
        : 'Can I fully customize our salon colors, logo, and visual identity?',
      answer: isAr
        ? 'نعم بكل تأكيد. تتيح لك لوحة التحكم رفع شعارك بدقة عالية، واختيار ألوان العلامة الأساسية والثانوية، وكتابة نبذة المنشأة، لتنعكس هويتك فوراً على موقع الصالون وتطبيق العميل وواجهة الخبيرات.'
        : 'Yes, absolutely. The admin dashboard lets you upload your high-res logo, set primary and secondary brand palette colors, and craft your salon bio, instantly applied across your website, client PWA, and staff portals.',
    },
    {
      question: isAr
        ? 'ما هي المكونات الأربعة الأساسية التي تتكون منها منظومة كل صالون؟'
        : 'What are the 4 core portals included with every facility subscription?',
      answer: isAr
        ? 'تحصل كل منشأة على: 1) موقع إلكتروني فاخر للزوار واستعراض الخدمات. 2) تطبيق ويب تقدمي للعميل (Client PWA) للحجز ومتابعة نقاط الولاء. 3) واجهة خاصة بمقدم الخدمة لمتابعة جداول المواعيد والعمولات. 4) لوحة تحكم إدارية شاملة للمالك والمدير.'
        : 'Every salon receives: 1) Branded client-facing marketing website, 2) Client Progressive Web App (PWA) for self-booking and loyalty, 3) Dedicated Specialist portal for schedules and commissions, and 4) Full Admin Command Dashboard.',
    },
    {
      question: isAr
        ? 'هل تظهر صالونات أو مشاغل أخرى منافسة في موقعي أو تطبيقي؟'
        : 'Will competing salons or service providers appear on my website or app?',
      answer: isAr
        ? 'قطعاً لا. راش إكس ليست دليلاً عاماً أو منصة تجميع لصالونات متعددة، بل هي منظومة مخصصة ومستقلة لكل منشأة بنطاقها الفرعي المعزول. نطاقك وتطبيقك ملكٌ خاص لصالونك بنسبة 100% ولا يرى عملاؤك إلا علامتك فقط.'
        : 'Never. RashX is not a shared marketplace directory. Your dedicated subdomain is 100% independent and isolated, showcasing strictly your brand, treatments, and pricing with zero competing salon noise.',
    },
    {
      question: isAr
        ? 'كيف يمكنني تعديل قائمة الخدمات والأسعار ومدد الجلسات؟'
        : 'How easily can I update our service catalog, durations, and pricing?',
      answer: isAr
        ? 'يمكنك إضافة فئات الخدمات وتعديل الأسعار شاملة ضريبة القيمة المضافة 15%، وتحديد المدة الزمنية لكل خدمة بالدقائق بضغطة زر واحدة، لتنعكس فوراً على موقع الحجز وتطبيق العميل والكاشير.'
        : 'You can update service categories, durations, and 15% VAT-inclusive prices in seconds from the admin panel, instantly synchronizing with your live booking site, client app, and touch POS.',
    },
    {
      question: isAr
        ? 'هل يحتاج العميل لتحميل تطبيق من App Store أو Google Play للحجز؟'
        : 'Does the customer need to download an app from the App Store or Google Play?',
      answer: isAr
        ? 'لا يحتاج العميل لتحميل أي تطبيق ثقيل؛ يعمل تطبيق العميل بتقنية الويب التقدمي (PWA) عبر متصفح الجوال في ثوانٍ، مع إمكانية تثبيت أيقونة الصالون على الشاشة الرئيسية بضغطة زر وتصفح الخدمات وحجز المواعيد بسلاسة.'
        : 'No native app download is required. Your lightweight Client PWA loads in seconds on any smartphone browser, allowing customers to add your salon icon to their home screen and book instantly.',
    },
  ];

  const brandedModules = [
    {
      icon: Globe,
      titleAr: 'نطاق فرعي مستقل ومعزول لكل منشأة [salon].rashx.org',
      titleEn: 'Dedicated Isolated Subdomain [salon].rashx.org',
      descAr:
        'عنوان رقمي خاص يمنح صالونك هيبة واحترافية واستقلالية تقنية تامة، مع إمكانية ربط نطاق مخصص (Custom Domain).',
      descEn:
        'A prestigious independent web address ensuring isolated tenant data and brand prominence, with optional custom domain support.',
    },
    {
      icon: Palette,
      titleAr: 'تخصيص كامل للهوية البصرية والشعار والألوان',
      titleEn: 'Full Visual Identity & Color Customization',
      descAr:
        'تطبيق ألوان هوية صالونك الأساسية والثانوية ورفع الشعار والأيقونة لتنعكس على كافة البوابات وتطبيقات المنظومة.',
      descEn:
        'Apply your exact salon palette, upload vector logos and favicons, consistently rendered across all portals.',
    },
    {
      icon: LayoutDashboard,
      titleAr: 'بوابات المنظومة الأربع المتكاملة والمتزامنة',
      titleEn: 'The 4 Unified Real-Time Operational Portals',
      descAr:
        'ربط لحظي بين موقع الزائر، تطبيق العميل، واجهة خبيرات التجميل، ولوحة التحكم الإدارية دون تضارب أو تأخير.',
      descEn:
        'Instant data synchronization between public website, client PWA, specialist mobile portal, and executive dashboard.',
    },
    {
      icon: Sparkles,
      titleAr: 'كتالوج مرن للخدمات والأسعار شاملة الضريبة 15%',
      titleEn: 'Dynamic Services Catalog & 15% VAT Pricing',
      descAr:
        'هيكلة فئات الخدمات (شعر، بشرة، أظافر، مكياج، سبا) مع تحديد مدد الجلسات بالدقائق والأسعار الشفافة بدقة.',
      descEn:
        'Structured service menus with custom session durations and transparent pricing complying with 15% Saudi VAT.',
    },
    {
      icon: Smartphone,
      titleAr: 'تطبيق العميل الذكي PWA بدون تحميل من المتاجر',
      titleEn: 'Instant Client PWA Booking Web App',
      descAr:
        'تطبيق سريع يفتحه العميل من أي متصفح جوال لحجز مواعيده ومتابعة رصيد نقاط ولائه مع إمكانية التثبيت على شاشة الجوال.',
      descEn:
        'Frictionless web app opening directly on mobile browsers with one-tap home screen pinning and instant booking.',
    },
    {
      icon: UserCog,
      titleAr: 'واجهة مخصصة لمقدم الخدمة وخبيرات التجميل',
      titleEn: 'Dedicated Mobile Specialist Portal',
      descAr:
        'شاشة هاتف ذكية لكل أخصائية لاستعراض مواعيدها اليومية، تفضيلات العميلات، والعمولات الشخصية بصلاحيات محمية.',
      descEn:
        'Staff-facing dashboard displaying personalized daily schedules, client treatment notes, and earned commissions securely.',
    },
    {
      icon: Share2,
      titleAr: 'بيانات التواصل، خرائط Google، ومواعيد العمل',
      titleEn: 'Contact Info, Google Maps & Operating Hours',
      descAr:
        'عرض أرقام الواتساب والاتصال، روابط حسابات التواصل الاجتماعي، وموقع الصالون الجغرافي لتسهيل وصول العميلات.',
      descEn:
        'Prominent WhatsApp direct chat, social channels, working hours, and interactive Google Maps directions.',
    },
  ];

  /* =========================================================================
     RENDER: BRANDED SUBDOMAIN & 4-PORTALS SPECIALIZED VIEW
     ========================================================================= */
  if (isBrandedPlatform) {
    return (
      <div className="w-full bg-[#FAFBFB] min-h-screen">
        <JsonLd data={getFAQPageSchema(brandedFaqs)} id="branded-faq-schema" />
        <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="branded-breadcrumb-schema" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
            <Link href={`/${locale}`} className="hover:text-ink transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/features`} className="hover:text-ink transition-colors">
              {isAr ? 'الحلول' : 'Solutions'}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {isAr ? 'الموقع والنطاق الفرعي' : 'Branded Web & Subdomain'}
            </span>
          </div>

          {/* Section 1: Hero */}
          <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
              <Globe className="w-4 h-4 text-dusty-blue" />
              <span>
                {isAr
                  ? 'موقع خاص بالصالون • تطبيق حجز لصالوني • موقع صالون بنطاق فرعي'
                  : 'Custom Salon Website & Dedicated Subdomain Platform'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
              {isAr
                ? 'موقع وتطبيق بهوية صالونك، جاهزان للانطلاق'
                : 'Your Branded Website & Booking App, Ready to Launch'}
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {isAr
                ? 'انطلق بأقوى حضور رقمي لصالونك في دقائق معدودة. تمنح راش إكس كل منشأة نطاقاً فرعياً مخصصاً ومستقلاً (مثل: yoursalon.rashx.org) بهويتك البصرية الكاملة؛ خصص اسم الصالون، الشعار، الألوان، وقائمة الخدمات والأسعار مع بيانات التواصل والموقع الجغرافي. ستحصل على منظومة متكاملة من 4 بوابات ذكية: موقع إلكتروني فاخر للزوار، تطبيق ويب تقدمي للعميل (PWA)، واجهة خاصة بخبيرات التجميل، ولوحة تحكم مركزية للإدارة.'
                : 'Establish a commanding digital presence for your salon in minutes. RashX equips every facility with a dedicated, isolated subdomain (e.g. yoursalon.rashx.org) styled with your visual branding: logo, custom colors, service menus, and location info. You receive 4 synchronized portals: a public marketing site, client booking PWA, staff specialist portal, and full admin dashboard.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
              >
                {isAr ? 'احجز عرضًا تجريبيًا مجانيًا' : 'Book a Free Live Demo'}
              </Link>

              <a
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحبًا راش إكس، أود الاستفسار عن إنشاء موقع وتطبيق خاص بنطاق فرعي لصالوني.'
                    : 'Hello RashX, I would like to inquire about getting a branded website and subdomain for my salon.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5 font-semibold text-ink">
                <Globe className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'نطاق فرعي مخصص [salon].rashx.org' : 'Dedicated Subdomain'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'هوية بصرية: ألوان وشعار وخطوط' : 'Custom Brand Palette'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4 text-[#10B981]" />
                <span>{isAr ? '4 بوابات تشغيلية في اشتراك واحد' : '4 Integrated Portals'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: The 4 Portals Architecture Diagram (مخطط المكونات الأربعة) */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'الهندسة البرمجية لمنظومتك' : 'Core System Architecture'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? 'منظومة واحدة.. 4 بوابات رقمية متزامنة في الوقت الفعلي'
                  : 'One System, 4 Synchronized Portals in Real Time'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'لكل طرف في منشأتك واجهة مخصصة مصممة بأعلى معايير السهولة والخصوصية لتسيير العمل بدون تعقيد.'
                  : 'Tailored interfaces crafted for clients, beauticians, management, and visitors, operating seamlessly in unison.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Portal 1: Website */}
              <div className="p-6 rounded-3xl bg-white border border-mist-gray shadow-sm hover:border-dusty-blue/50 hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-dusty-blue/20 text-dusty-blue flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-dusty-blue px-2 py-0.5 rounded-full bg-mist-gray">
                    البوابة 1 • للزوار
                  </span>
                  <h3 className="text-base font-bold text-ink">موقع المنشأة الإلكتروني</h3>
                  <div className="text-[11px] font-mono text-ink-muted bg-mist-gray/40 px-2 py-1 rounded-lg">
                    yoursalon.rashx.org
                  </div>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  واجهة تسويقية فاخرة تبرز علامتك التجارية، صور المنشأة، كتالوج الخدمات بأسعار ومدد واضحة، وزر حجز فوري يحول الزائر إلى عميل في ثوانٍ.
                </p>
              </div>

              {/* Portal 2: Client PWA */}
              <div className="p-6 rounded-3xl bg-white border border-mist-gray shadow-sm hover:border-dusty-blue/50 hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#10B981]/15 text-[#059669] flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#059669] px-2 py-0.5 rounded-full bg-[#10B981]/10">
                    البوابة 2 • للعملاء
                  </span>
                  <h3 className="text-base font-bold text-ink">تطبيق العميل الذكي (PWA)</h3>
                  <div className="text-[11px] font-mono text-ink-muted bg-mist-gray/40 px-2 py-1 rounded-lg">
                    yoursalon.rashx.org/client
                  </div>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  تطبيق ويب تقدمي خفيف يفتحه العميل من متصفح الجوال بدون تحميل؛ لحجز المواعيد، متابعة رصيد نقاط الولاء، واختيار الخبيرة المفضلة بضغطة زر.
                </p>
              </div>

              {/* Portal 3: Specialist Portal */}
              <div className="p-6 rounded-3xl bg-white border border-mist-gray shadow-sm hover:border-dusty-blue/50 hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 text-[#D97706] flex items-center justify-center">
                  <UserCog className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#D97706] px-2 py-0.5 rounded-full bg-[#F59E0B]/10">
                    البوابة 3 • للخبيرات
                  </span>
                  <h3 className="text-base font-bold text-ink">واجهة مقدم الخدمة المستقلة</h3>
                  <div className="text-[11px] font-mono text-ink-muted bg-mist-gray/40 px-2 py-1 rounded-lg">
                    yoursalon.rashx.org/specialist
                  </div>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  شاشة مخصصة لكل خبيرة تجميل على هاتفها لمتابعة جدول مواعيدها اليومية، تفضيلات العميل القادم، ورصيد عمولاتها اليومية بشفافية تامة ودون كشف أرقام الإدارة.
                </p>
              </div>

              {/* Portal 4: Admin Dashboard */}
              <div className="p-6 rounded-3xl bg-white border border-mist-gray shadow-sm hover:border-dusty-blue/50 hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-ink text-white flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-dusty-blue" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-ink px-2 py-0.5 rounded-full bg-mist-gray">
                    البوابة 4 • للإدارة والمالك
                  </span>
                  <h3 className="text-base font-bold text-ink">لوحة التحكم المركزية</h3>
                  <div className="text-[11px] font-mono text-ink-muted bg-mist-gray/40 px-2 py-1 rounded-lg">
                    yoursalon.rashx.org/admin
                  </div>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  لوحة قيادة شاملة لإدارة الحجوزات اليومية، الكاشير ونقاط البيع السريعة، مسيرات الرواتب والعمولات، المخزون، والتقارير المالية والضريبية المعتمدة لـ ZATCA.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Visual Before / After Comparison (مقارنة بصرية: قبل راش إكس مقابل بعد راش إكس) */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'مقارنة التحول الرقمي' : 'Transformation Comparison'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? 'الفارق الجذري: الإدارة بالطريقة التقليدية مقابل منظومة راش إكس'
                  : 'The Definitive Shift: Traditional Headaches vs. RashX Clarity'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'كيف يغير امتلاك موقع وتطبيق خاص لصالونك مسار أعمالك وتجربة عميلاتك اليومية.'
                  : 'How a dedicated branded online platform transforms customer perception and operational ease.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Before: Traditional */}
              <div className="p-8 rounded-3xl bg-[#FEF2F2]/60 border-2 border-[#FCA5A5] space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF4444]/15 text-[#B91C1C] text-xs font-black">
                    <XCircle className="w-4 h-4" />
                    <span>قبل راش إكس (الطريقة التقليدية وحسابات السوشيال فقط)</span>
                  </div>

                  <h3 className="text-xl font-black text-[#991B1B]">
                    تشتت وفقدان للعملاء وإرهاق للموظفين
                  </h3>

                  <ul className="space-y-3.5 text-xs text-[#7F1D1D] leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                      <span>
                        <strong>قوائم أسعار عشوائية:</strong> إرسال صور أو ملفات PDF غير واضحة يصعب تصفحها عبر شاشة الجوال وتفتقد لأي تحديث فوري.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                      <span>
                        <strong>ضياع الحجوزات في محادثات الواتساب:</strong> انتظار العميل ساعات طويلة حتى يرد موظف الاستقبال لتأكيد توفر الخبيرة.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                      <span>
                        <strong>مفاجآت في الأسعار والضريبة:</strong> تذمر العميلات عند المحاسبة من رسوم غير معلنة أو إضافة ضريبة القيمة المضافة 15% فجأة.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                      <span>
                        <strong>غياب الهوية الرقمية المستقلة:</strong> الاعتماد الكلي على إنستقرام أو سناب شات المعرضة لخطر الحظر أو تشتت المتابع بإعلانات المنافسين.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/70 border border-[#FCA5A5]/60 text-[11px] text-[#991B1B] font-medium">
                  النتيجة: إشغال كراسي منخفض، استفسارات متكررة تستهلك وقت الاستقبال، وانطباع غير احترافي لدى العملاء الجدد.
                </div>
              </div>

              {/* After: With RashX */}
              <div className="p-8 rounded-3xl bg-[#F0FDF4]/70 border-2 border-[#86EFAC] space-y-6 flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#047857] text-xs font-black">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>مع راش إكس (منظومة رقمية متكاملة بهوية صالونك)</span>
                  </div>

                  <h3 className="text-xl font-black text-[#14532D]">
                    حضور فاخر وحجز آلي مستمر على مدار 24 ساعة
                  </h3>

                  <ul className="space-y-3.5 text-xs text-[#166534] leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>
                        <strong>موقع رسمي على نطاقك الخاص:</strong> رابط مباشر ومستقل <code>lavender.rashx.org</code> يحمل شعارك وألوانك المعتمدة بفخامة.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>
                        <strong>حجز ذاتي مؤكد 24/7:</strong> يحجز العميل في 20 ثانية حتى أثناء إغلاق الصالون مع إشعارات واتساب فورية وتأكيد تلقائي.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>
                        <strong>شفافية تامة في الخدمات والأسعار:</strong> عرض مدد الجلسات بالدقائق والأسعار شاملة ضريبة 15% دون أي غموض أو شكاوى.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>
                        <strong>تطبيق ويب تقدمي PWA فوري:</strong> تحفظه العميلة على شاشة هاتفها لمتابعة الحجوزات ونقاط الولاء بلمسة واحدة.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white/90 border border-[#86EFAC]/80 text-[11px] text-[#14532D] font-bold">
                  النتيجة: ملء جدول المواعيد تلقائياً، تفرغ موظفي الاستقبال لخدمة الزوار، وبناء براند راسخ ومميز في السوق.
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Visual Mockup Showcase (Subdomain Customizer Simulation) */}
          <div className="mb-16 bg-white rounded-3xl border border-mist-gray p-6 sm:p-10 shadow-md space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'محاكاة حية للتخصيص' : 'Live Brand Customizer Mockup'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? 'خصص موقعك وتطبيقك في 3 خطوات بسيطة'
                  : 'Customize Your Website & Portals in 3 Simple Steps'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'أدخل بيانات صالونك الأساسية، وحدد ألوانك، وستقوم المنظومة بإنشاء الموقع والتطبيق فوراً.'
                  : 'Enter your salon details, choose your colors, and the system deploys all portals instantly.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Settings Controls (Step 1-3) */}
              <div className="lg:col-span-5 space-y-4 text-xs">
                {/* Control 1: Subdomain */}
                <div className="p-4 rounded-2xl bg-mist-gray/30 border border-mist-gray space-y-2">
                  <span className="font-bold text-ink block">1. اختر اسم النطاق الفرعي لصالونك</span>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-mist-gray font-mono">
                    <span className="text-ink font-bold">lavender</span>
                    <span className="text-ink-muted">.rashx.org</span>
                    <span className="ms-auto text-[10px] text-[#059669] font-bold">متاح ونشط</span>
                  </div>
                </div>

                {/* Control 2: Colors & Logo */}
                <div className="p-4 rounded-2xl bg-mist-gray/30 border border-mist-gray space-y-3">
                  <span className="font-bold text-ink block">2. الهوية البصرية والألوان</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#5B21B6] border border-black/10"></span>
                      <span className="text-[11px] text-ink-muted">اللون الأساسي (بنفسجي ملكي)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-[#F472B6] border border-black/10"></span>
                      <span className="text-[11px] text-ink-muted">اللون الثانوي</span>
                    </div>
                  </div>
                </div>

                {/* Control 3: Services & Details */}
                <div className="p-4 rounded-2xl bg-mist-gray/30 border border-mist-gray space-y-2">
                  <span className="font-bold text-ink block">3. الخدمات والموقع الجغرافي</span>
                  <div className="space-y-1.5 text-[11px] text-ink-muted">
                    <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-mist-gray/60">
                      <span>الخدمات المفعلة: شعر، بشرة، أظافر، مساج</span>
                      <span className="font-bold text-ink">36 خدمة</span>
                    </div>
                    <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-mist-gray/60">
                      <span>الموقع: الرياض - حي الصحافة</span>
                      <span className="font-bold text-[#059669]">Google Maps متصل</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Window (Mockup Screen) */}
              <div className="lg:col-span-7 bg-[#FAFBFB] rounded-3xl border-2 border-mist-gray p-5 shadow-sm space-y-4">
                {/* Browser Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-mist-gray text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="bg-white border border-mist-gray px-4 py-1 rounded-full font-mono text-[10px] text-ink flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-[#10B981]" />
                    <span>https://lavender.rashx.org</span>
                  </div>
                  <span className="text-[10px] text-ink-muted">معاينة حية</span>
                </div>

                {/* Live Mockup Website Content */}
                <div className="bg-white rounded-2xl border border-mist-gray p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#5B21B6] text-white font-black flex items-center justify-center text-sm shadow-sm">
                        L
                      </div>
                      <div>
                        <span className="font-bold text-sm text-ink block">صالون لافندر للتجميل والسبا</span>
                        <span className="text-[10px] text-ink-muted">مفتوح الآن • يغلق 10:00 مساءً</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-[#5B21B6] text-white text-xs font-bold shadow-xs hover:bg-[#4C1D95] transition-colors"
                    >
                      احجز موعدك الآن
                    </button>
                  </div>

                  {/* Service Showcase Mini Grid */}
                  <div className="space-y-2 pt-2 border-t border-mist-gray text-xs">
                    <span className="text-[11px] font-bold text-ink uppercase tracking-wider block">
                      أبرز الخدمات والباقات المعتمدة
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl bg-mist-gray/30 border border-mist-gray flex items-center justify-between">
                        <div>
                          <span className="font-bold text-ink block">صبغة شعر كاملة + ماسك أولابلكس</span>
                          <span className="text-[10px] text-ink-muted">المدة: 120 دقيقة</span>
                        </div>
                        <span className="font-black text-ink">450 ر.س</span>
                      </div>

                      <div className="p-3 rounded-xl bg-mist-gray/30 border border-mist-gray flex items-center justify-between">
                        <div>
                          <span className="font-bold text-ink block">بديكير ومنيكير سبا ملكي</span>
                          <span className="text-[10px] text-ink-muted">المدة: 60 دقيقة</span>
                        </div>
                        <span className="font-black text-ink">180 ر.س</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Footer inside Mockup */}
                  <div className="flex items-center justify-between pt-2 border-t border-mist-gray text-[10px] text-ink-muted">
                    <span>جميع الأسعار تشمل ضريبة القيمة المضافة 15%</span>
                    <span>مشغل بتقنية راش إكس • RashX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Core Functional Pillars (7 Pillars) */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'الميزات والركائز' : 'Core Capabilities'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? '7 ركائز تمنح صالونك حضوراً رقمياً لا يُضاهى'
                  : '7 Pillars Powering Your Salon’s Digital Supremacy'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'كل ما تحتاجه لتشغيل وتسويق منشأتك عبر الإنترنت دون الاعتماد على حلول متفرقة أو منصات وساطة.'
                  : 'Everything required to launch, market, and manage your beauty facility without fractured third-party tools.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandedModules.map((module, idx) => {
                const IconComponent = module.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                      <IconComponent className="w-5 h-5 text-dusty-blue" />
                    </div>
                    <h3 className="text-base font-bold text-ink">
                      {isAr ? module.titleAr : module.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {isAr ? module.descAr : module.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 6: FAQ Accordion */}
          <div className="mb-16 max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? 'أسئلة شائعة عن موقع الصالون والنطاق الفرعي'
                  : 'Frequently Asked Questions about Salon Websites & Subdomains'}
              </h2>
            </div>

            <div className="space-y-3">
              {brandedFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/30 transition-colors space-y-2"
                >
                  <h3 className="text-sm font-bold text-ink flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-dusty-blue shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pe-4 ps-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Closing CTA */}
          <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'هوية رقمية جاهزة للانطلاق' : 'Ready-to-Launch Branded Identity'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {isAr
                  ? 'جاهز لإطلاق موقع وتطبيق صالونك المستقل خلال 20 دقيقة؟'
                  : 'Ready to Launch Your Salon’s Branded Website & App in 20 Minutes?'}
              </h2>

              <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                {isAr
                  ? 'شاهد كيف يبدو صالونك على نطاق فرعي مخصص بألوانك وشعارك وخدماتك في جلسة عرض حي مخصصة، مع تجربة مجانية لمدة 14 يومًا.'
                  : 'Preview your facility with custom brand colors, logo, and service menus on a dedicated subdomain in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                    ? 'مرحبًا راش إكس، أود الاستفسار عن إنشاء موقع وتطبيق خاص بنطاق فرعي لصالوني.'
                    : 'Hello RashX, I would like to inquire about getting a branded website and subdomain for my salon.'
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

  /* =========================================================================
     RENDER: LOYALTY & REWARDS SPECIALIZED VIEW
     ========================================================================= */
  if (isLoyalty) {
    return (
      <div className="w-full bg-[#FAFBFB] min-h-screen">
        <JsonLd data={getFAQPageSchema(loyaltyFaqs)} id="loyalty-faq-schema" />
        <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="loyalty-breadcrumb-schema" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
            <Link href={`/${locale}`} className="hover:text-ink transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/features`} className="hover:text-ink transition-colors">
              {isAr ? 'الحلول' : 'Solutions'}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {isAr ? 'برنامج الولاء والمكافآت' : 'Loyalty & Rewards'}
            </span>
          </div>

          {/* Section 1: Hero */}
          <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
              <Award className="w-4 h-4 text-dusty-blue" />
              <span>
                {isAr
                  ? 'نظام نقاط ولاء للصالونات • برنامج ولاء عملاء صالون'
                  : 'Salon Loyalty & Rewards Program Software'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
              {isAr
                ? 'حوّل زوارك إلى عملاء دائمين'
                : 'Turn First-Time Visitors into Lifelong Brand Champions'}
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {isAr
                ? 'اجعل كل ريال ينفقه العميل خطوة نحو زيارته القادمة. يمنحك محرك الولاء والمكافآت في راش إكس مرونة مطلقة لتصميم برامج ولاء مخصصة تتوافق تماماً مع سياسة صالونك؛ حدد قواعد اكتساب النقاط (مثل 1 نقطة لكل 10 ر.س)، كافئ العميلات الدائمات بترقيات حصرية ومستويات VIP، وقدم قسائم وخصومات فورية تُعرض وتُستبدل مباشرة داخل تطبيق العميل (PWA) بدون الحاجة لكروت ورقية أو بطاقات بلاستيكية.'
                : 'Make every riyal spent a stepping stone toward the next visit. The RashX loyalty engine provides ultimate flexibility to craft customized reward programs aligned with your salon policy: define points per SAR spent, reward repeat clients with tiered VIP status, and grant instant vouchers redeemed directly within the Client Progressive Web App (PWA) with zero paper or plastic cards.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
              >
                {isAr ? 'احجز عرضًا تجريبيًا مجانيًا' : 'Book a Free Live Demo'}
              </Link>

              <a
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحبًا راش إكس، أود الاستفسار عن نظام نقاط وبرامج ولاء الصالونات.'
                    : 'Hello RashX, I would like to inquire about the salon loyalty and rewards program.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5 font-semibold text-ink">
                <Smartphone className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'تطبيق العميل PWA بدون تحميل' : 'PWA App - Zero Download'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'سياسات نقاط مرنة ومخصصة' : 'Custom Points Accrual Policy'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-[#10B981]" />
                <span>{isAr ? 'استبدال فوري عند الكاشير' : 'Instant POS Checkout Deduction'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Mockups (Client PWA Rewards Wallet & Admin Rule Builder) */}
          <div className="mb-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'تجربة تفاعلية متكاملة' : 'Interactive Loyalty Experience'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? 'محفظة مكافآت ذكية في جوال العميل.. وتحكم كامل للإدارة'
                  : 'Digital Rewards Wallet for Clients & Absolute Admin Control'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'شاهد كيف تتابع العميلة رصيد نقاطها وتستبدل مكافآتها من هاتفها، وكيف تصمم الإدارة قواعد النقاط ومستويات الـ VIP.'
                  : 'Experience the client-side wallet for points redemption alongside the back-office rule engine for tiered memberships.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Mockup 1: Client PWA Rewards Wallet (Mobile Frame) */}
              <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-mist-gray p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-mist-gray">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-dusty-blue/20 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-ink block">صالون لافندر للتجميل</span>
                      <span className="text-[10px] text-ink-muted">تطبيق العميل • lavendersalon.rashx.org</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] text-[10px] font-bold">
                    متصل PWA
                  </span>
                </div>

                {/* Digital VIP Membership Card */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E1B4B] p-5 text-white shadow-md relative overflow-hidden space-y-4">
                  <div className="absolute top-0 end-0 -mt-4 -me-4 w-28 h-28 bg-dusty-blue/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-medium tracking-wide text-mist-gray/80">بطاقة الولاء الرقمية</span>
                    <span className="px-2.5 py-1 rounded-full bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/40 text-[10px] font-black flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>العضوية الذهبية (Gold)</span>
                    </span>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <span className="text-xs text-mist-gray/70 block">رصيد النقاط الحالي</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-white tracking-tight">750</span>
                      <span className="text-xs text-dusty-blue font-bold">نقطة مكافآت</span>
                    </div>
                    <span className="text-[11px] text-[#A7F3D0] block">
                      = 75.00 ر.س رصيد خصم متاح للاستبدال
                    </span>
                  </div>

                  {/* Tier Progress Bar */}
                  <div className="space-y-1.5 pt-2 relative z-10 border-t border-white/10">
                    <div className="flex items-center justify-between text-[10px] text-mist-gray/80">
                      <span>الترقية إلى العضوية البلاتينية</span>
                      <span className="font-bold text-white">750 / 1,000 نقطة</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-dusty-blue rounded-full w-[75%]" />
                    </div>
                  </div>
                </div>

                {/* Redeemable Rewards List */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                    مكافآت جاهزة للاستبدال الفوري
                  </span>

                  <div className="p-3 rounded-2xl bg-mist-gray/20 border border-mist-gray/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-mist-gray/60 flex items-center justify-center text-dusty-blue shadow-xs">
                        <Gift className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-ink block">قسيمة خصم 50 ر.س</span>
                        <span className="text-[10px] text-ink-muted">تكلفة الاستبدال: 500 نقطة</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-dusty-blue text-black font-bold text-[11px] hover:bg-dusty-blue/90 shadow-xs transition-colors"
                    >
                      استبدال بالكاشير
                    </button>
                  </div>

                  <div className="p-3 rounded-2xl bg-mist-gray/20 border border-mist-gray/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white border border-mist-gray/60 flex items-center justify-center text-dusty-blue shadow-xs">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-ink block">جلسة ماسك عناية بالشعر مجانية</span>
                        <span className="text-[10px] text-ink-muted">تكلفة الاستبدال: 600 نقطة</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-dusty-blue text-black font-bold text-[11px] hover:bg-dusty-blue/90 shadow-xs transition-colors"
                    >
                      استبدال بالكاشير
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center gap-2 text-xs text-[#92400E]">
                    <Star className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span className="text-[11px] font-semibold">
                      مكافأة عيد ميلادك مفعلة: خصم 15% + ضيافة ملكية مجانية في زيارتك القادمة!
                    </span>
                  </div>
                </div>
              </div>

              {/* Mockup 2: Admin Rule Builder & Tier Engine */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-mist-gray p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-mist-gray">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-mist-gray flex items-center justify-center text-ink">
                      <Trophy className="w-4 h-4 text-dusty-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-ink">محرك إعداد سياسات الولاء والمكافآت</h3>
                      <p className="text-[11px] text-ink-muted">لوحة تحكم المنشأة • تخصيص كامل لقواعد النقاط</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#059669] text-xs font-bold">
                    البرنامج نشط
                  </span>
                </div>

                {/* Accrual & Redemption Rule Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-mist-gray/30 border border-mist-gray/60 space-y-1.5">
                    <span className="text-[11px] text-ink-muted font-semibold block">قاعدة اكتساب النقاط (Accrual)</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-ink">كل 10 ر.س</span>
                      <span className="text-xs text-ink-muted">= 1 نقطة</span>
                    </div>
                    <span className="text-[10px] text-[#059669] block font-medium">10% قيمة استردادية محفزة</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-mist-gray/30 border border-mist-gray/60 space-y-1.5">
                    <span className="text-[11px] text-ink-muted font-semibold block">قاعدة الاستبدال بالكاشير (Redemption)</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-ink">كل 100 نقطة</span>
                      <span className="text-xs text-ink-muted">= 10 ر.س خصم</span>
                    </div>
                    <span className="text-[10px] text-ink-muted block font-medium">تخصم تلقائياً من الفاتورة</span>
                  </div>
                </div>

                {/* Dynamic Smart Multipliers */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                    قواعد مضاعفة النقاط في أوقات الركود والخدمات
                  </span>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-2xl bg-white border border-mist-gray flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Repeat className="w-4 h-4 text-dusty-blue" />
                        <div>
                          <span className="font-bold text-ink block">مضاعفة النقاط x2 يومي الإثنين والثلاثاء (Off-Peak)</span>
                          <span className="text-[10px] text-ink-muted">تشجيع الحجز في الأيام الهادئة لموازنة إشغال الكراسي</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#059669] font-bold text-[10px]">
                        مفعل تلقائياً
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-mist-gray flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-dusty-blue" />
                        <div>
                          <span className="font-bold text-ink block">3x نقاط على خدمات العناية بالبشرة والمساج</span>
                          <span className="text-[10px] text-ink-muted">زيادة الطلب على الخدمات ذات هوامش الربحية العالية</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#059669] font-bold text-[10px]">
                        مفعل تلقائياً
                      </span>
                    </div>
                  </div>
                </div>

                {/* VIP Tiers Architecture */}
                <div className="space-y-3 pt-2 border-t border-mist-gray">
                  <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                    مستويات العضوية المتدرجة (VIP Tiers)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-mist-gray/30 border border-mist-gray/60 space-y-1">
                      <span className="text-xs font-bold text-ink block">المستوى الفضي</span>
                      <span className="text-[10px] text-ink-muted block">0 - 1,499 ر.س</span>
                      <span className="text-[10px] font-semibold text-dusty-blue block">50 نقطة ترحيبية</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-1">
                      <span className="text-xs font-bold text-[#92400E] block">المستوى الذهبي</span>
                      <span className="text-[10px] text-[#78350F] block">1,500 - 3,999 ر.س</span>
                      <span className="text-[10px] font-bold text-[#B45309] block">خصم 5% على المبيعات</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-1">
                      <span className="text-xs font-bold text-[#166534] block">المستوى البلاتيني</span>
                      <span className="text-[10px] text-[#14532D] block">4,000+ ر.س</span>
                      <span className="text-[10px] font-bold text-[#15803D] block">أولوية حجز + مساج شهري</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Core Functional Pillars (7 Pillars) */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'منظومة الولاء والمكافآت' : 'Loyalty Architecture'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? '7 ركائز لبناء ولاء حقيقي ومضاعفة معدل عودة العميلات'
                  : '7 Pillars to Foster Genuine Brand Loyalty & Repeat Bookings'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'أدوات ولاء متقدمة مصممة خصيصاً لزيادة القيمة العمرية للعميل (LTV) في صالونات ومراكز التجميل بالمملكة.'
                  : 'Comprehensive reward mechanics engineered specifically to maximize customer lifetime value in Saudi salons.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loyaltyModules.map((module, idx) => {
                const IconComponent = module.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                      <IconComponent className="w-5 h-5 text-dusty-blue" />
                    </div>
                    <h3 className="text-base font-bold text-ink">
                      {isAr ? module.titleAr : module.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {isAr ? module.descAr : module.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Client PWA Integration Deep-Dive Callout */}
          <div className="mb-16 rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
                <Smartphone className="w-4 h-4 text-dusty-blue" />
                <span>
                  {isAr
                    ? 'تجربة تطبيق العميل PWA بدون تحميل أو تعقيد'
                    : 'Client PWA: Frictionless Web App on Dedicated Subdomains'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-ink leading-tight">
                {isAr
                  ? 'محفظة ولاء رقمية بين يدي كل عميل.. فوراً عبر متصفح الجوال'
                  : 'A Digital Loyalty Wallet in Every Client’s Hand—Zero App Store Downloads'}
              </h2>

              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {isAr
                  ? 'تجاوز عقبة إقناع العميلات بتحميل تطبيقات ثقيلة من متجر التطبيقات. في راش إكس، تمتلك كل منشأة تطبيق ويب تقدمي (PWA) فائق السرعة على نطاقها الفرعي المستقل. تفتح العميلة الرابط من هاتفها لتجد محفظة نقاطها الذهبية، وتاريخ اكتساب المكافآت، والقسائم الجاهزة للاستبدال الفوري بنقرة واحدة، مما يرفع نسبة المشاركة في برنامج الولاء إلى مستويات قياسية.'
                  : 'Eliminate the friction of asking clients to download bulky native apps. RashX equips your facility with a blazing-fast Progressive Web App (PWA) hosted on your dedicated subdomain. Clients access their digital rewards wallet, check point balances, and activate promotional vouchers seamlessly from any mobile browser.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/demo`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-ink text-white hover:bg-ink/90 text-xs font-bold transition-all"
                >
                  <span>{isAr ? 'شاهد تجربة تطبيق العميل في عرض حي' : 'Explore Client PWA in a Live Demo'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 text-dusty-blue" />
                </Link>
                <Link
                  href={`/${locale}/features`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-mist-gray hover:bg-mist-gray/40 text-xs font-semibold text-ink transition-colors"
                >
                  <span>{isAr ? 'استكشف كافة أنظمة المنظومة العشرة' : 'Explore All 10 Core Systems'}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Section 5: FAQ Accordion */}
          <div className="mb-16 max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? 'أسئلة شائعة عن نقاط وبرامج ولاء الصالونات'
                  : 'Frequently Asked Questions about Salon Loyalty'}
              </h2>
            </div>

            <div className="space-y-3">
              {loyaltyFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/30 transition-colors space-y-2"
                >
                  <h3 className="text-sm font-bold text-ink flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-dusty-blue shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pe-4 ps-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Closing CTA */}
          <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'ولاء دائم وعائد استثماري أعلى' : 'Enduring Loyalty & Maximum LTV'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {isAr
                  ? 'جاهز لتحويل زوار صالونك إلى عملاء دائمين لا يستغنون عنك؟'
                  : 'Ready to Turn First-Time Visitors into Devoted Brand Champions?'}
              </h2>

              <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                {isAr
                  ? 'اكتشف كيف تدير سياسات الولاء، ومستويات الـ VIP، واستبدال النقاط عبر جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                  : 'Experience dynamic loyalty rule building, VIP tiering, and instant POS redemption in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                    ? 'مرحبًا راش إكس، أود الاستفسار عن نظام نقاط وبرامج ولاء الصالونات.'
                    : 'Hello RashX, I would like to inquire about the salon loyalty and rewards program.'
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

  /* =========================================================================
     RENDER: CRM & CLIENT MANAGEMENT SPECIALIZED VIEW
     ========================================================================= */
  if (isCrm) {
    return (
      <div className="w-full bg-[#FAFBFB] min-h-screen">
        <JsonLd data={getFAQPageSchema(crmFaqs)} id="crm-faq-schema" />
        <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="crm-breadcrumb-schema" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
            <Link href={`/${locale}`} className="hover:text-ink transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/features`} className="hover:text-ink transition-colors">
              {isAr ? 'الحلول' : 'Solutions'}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {isAr ? 'إدارة علاقات العملاء (CRM)' : 'Client CRM & Preferences'}
            </span>
          </div>

          {/* Section 1: Hero */}
          <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
              <Users className="w-4 h-4 text-dusty-blue" />
              <span>
                {isAr
                  ? 'CRM للصالونات • برنامج إدارة عملاء صالون'
                  : 'Salon CRM & Client Management Software'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
              {isAr
                ? 'اعرف عميلك وابنِ علاقة طويلة الأمد'
                : 'Know Your Client & Build Enduring Relationships'}
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {isAr
                ? 'حَوّل كل زيارة إلى علاقة ولاء دائمة. تمنحك راش إكس قاعدة بيانات مركزية متكاملة لعملاء صالونك، تحفظ سجل الزيارات والخدمات السابقة، تاريخ الحجوزات والمشتريات، وأدق تفضيلات العميل وملاحظات الحساسية. مع أدوات تصنيف السلوك وحملات التواصل المخصصة، ستضمن عودة العميل مراراً وتكراراً مع الامتثال الكامل لأعلى معايير حماية وخصوصية البيانات.'
                : 'Transform every appointment into long-term loyalty. RashX provides a centralized 360-degree client database storing past visit logs, treatment formulas, booking attendance, and personalized preference notes. Leverage automated behavioral segmentation and tailored WhatsApp campaigns to maximize client retention while upholding Saudi PDPL privacy compliance.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
              >
                {isAr ? 'احجز عرضًا تجريبيًا مجانيًا' : 'Book a Free Live Demo'}
              </Link>

              <a
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحبًا راش إكس، أود الاستفسار عن نظام CRM وإدارة علاقات العملاء لصالوني.'
                    : 'Hello RashX, I would like to inquire about the salon CRM and client management system.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ink-muted">
              <Link
                href={`/${locale}/security`}
                className="flex items-center gap-1.5 hover:text-dusty-blue transition-colors group"
              >
                <ShieldCheck className="w-4 h-4 text-[#10B981] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-ink underline underline-offset-4 decoration-mist-gray">
                  {isAr
                    ? 'حماية مشددة وفق نظام PDPL السعودي'
                    : 'Saudi PDPL Privacy Compliant'}
                </span>
              </Link>
              <div className="flex items-center gap-1.5">
                <History className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'سجل تاريخي كامل 360°' : '360° Historic Logs'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'تصنيف سلوكي وتحفيز العودة' : 'RFM Smart Segmentation'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Mockups (Client 360 Profile & Behavioral Segmentation) */}
          <div className="mb-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'تجربة تفاعلية متطورة' : 'Interactive Interface'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? 'ملف شخصي شامل ومحرك تواصل يعيد العميلات لصالونك'
                  : 'Comprehensive Profiles & Automated Client Win-Back'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'شاهد كيف تعرض راش إكس تاريخ الخدمات والتفضيلات الحساسة لكل عميلة، وكيف تستهدف الشرائح المختلفة بحملات ذكية.'
                  : 'Explore how RashX visualizes treatment history, allergy safeguards, and automated retention messaging.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Mockup 1: Client 360° Profile Card */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-mist-gray shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-ink text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-dusty-blue/20 text-dusty-blue font-black flex items-center justify-center text-sm border border-dusty-blue/30">
                      نس
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">نورة السعيد</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          <span>VIP عميلة ذهبية</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-mist-gray/70 flex items-center gap-2">
                        <span>050 •••• 892</span>
                        <span>•</span>
                        <span>الرياض - حي النرجس</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="text-[10px] text-mist-gray/60 block">نقاط الولاء</span>
                    <span className="text-sm font-black text-dusty-blue">450 نقطة</span>
                  </div>
                </div>

                {/* Key Metrics Bar */}
                <div className="grid grid-cols-4 border-b border-mist-gray/60 bg-mist-gray/10 text-center py-3 px-4 text-xs">
                  <div>
                    <span className="text-[10px] text-ink-muted block">إجمالي الزيارات</span>
                    <span className="font-bold text-ink">18 زيارة</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted block">إجمالي الإنفاق</span>
                    <span className="font-bold text-ink">4,850 ر.س</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted block">آخر زيارة</span>
                    <span className="font-bold text-ink">منذ 12 يومًا</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted block">معدل الحضور</span>
                    <span className="font-bold text-[#10B981]">100% ملتزمة</span>
                  </div>
                </div>

                {/* Profile Tabs & Content */}
                <div className="p-6 space-y-5">
                  {/* Preferences & Medical / Technical Notes */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-ink uppercase tracking-wider block">
                      التفضيلات والملاحظات الفنية الخاصة
                    </span>
                    <div className="space-y-2">
                      <div className="p-3 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <span className="font-bold text-[#991B1B] block">
                            تنبيه طبي وحساسية جلدية:
                          </span>
                          <span className="text-[#7F1D1D]">
                            حساسية من صبغات الأمونيا العالية. يُرجى استخدام مستحضرات Organic الخالية من الأمونيا فقط.
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-3 rounded-xl bg-mist-gray/30 border border-mist-gray/60 space-y-1">
                          <span className="text-[11px] text-ink-muted block font-semibold">
                            الضيافة والمشروب المفضل:
                          </span>
                          <span className="font-bold text-ink">كورتادو حليب لوز (بدون سكر) + ماء فوار</span>
                        </div>
                        <div className="p-3 rounded-xl bg-mist-gray/30 border border-mist-gray/60 space-y-1">
                          <span className="text-[11px] text-ink-muted block font-semibold">
                            الخبيرات المفضلات:
                          </span>
                          <span className="font-bold text-ink">سارة الشمري (شعر) • ليندا (أظافر)</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-xs">
                        <span className="font-bold text-[#166534] block mb-0.5">
                          آخر تركيبة صبغة معتمدة:
                        </span>
                        <span className="text-[#14532D]">
                          Koleston Perfect (7/1 + 8/0) بنسبة 1:1 مع أكسجين 20Vol ومعالج Olaplex No.1
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Past Visits Log Snapshot */}
                  <div className="space-y-2 pt-2 border-t border-mist-gray">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-ink">سجل آخر الخدمات والزيارات</span>
                      <span className="text-[11px] text-dusty-blue font-semibold">عرض السجل الكامل (18)</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-mist-gray/20 border border-mist-gray/40">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                          <div>
                            <span className="font-bold text-ink">صبغة هايلايت + بديكير ملكي</span>
                            <span className="text-[10px] text-ink-muted block">الخبيرة: سارة • 15 أكتوبر 2026</span>
                          </div>
                        </div>
                        <span className="font-bold text-ink">650 ر.س</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-mist-gray/20 border border-mist-gray/40">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                          <div>
                            <span className="font-bold text-ink">علاج بروتين للشعر + استشوار</span>
                            <span className="text-[10px] text-ink-muted block">الخبيرة: مريم • 18 سبتمبر 2026</span>
                          </div>
                        </div>
                        <span className="font-bold text-ink">820 ر.س</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Confirmed Booking */}
                  <div className="p-3 rounded-2xl bg-dusty-blue/10 border border-dusty-blue/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-dusty-blue" />
                      <div>
                        <span className="font-bold text-ink block">موعد قادم مؤكد</span>
                        <span className="text-[11px] text-ink-muted">الأحد القادم - 4:30 م (جلسة رتوش صبغة)</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-dusty-blue text-black font-bold text-[10px]">
                      مؤكد تلقائياً
                    </span>
                  </div>
                </div>
              </div>

              {/* Mockup 2: Smart Segmentation & Automated Retention Hub */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-3xl border border-mist-gray p-6 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-dusty-blue" />
                      <span className="text-xs font-bold text-ink uppercase tracking-wider">
                        تصنيف وتحليل سلوك العملاء
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-mist-gray font-bold text-ink">
                      تحديث تلقائي
                    </span>
                  </div>

                  {/* Segments Stack */}
                  <div className="space-y-2.5">
                    {/* Segment 1: VIP */}
                    <div className="p-3 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/50 transition-all flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                          <span className="text-xs font-bold text-ink">كبار العملاء (VIP)</span>
                        </div>
                        <span className="text-[11px] text-ink-muted">142 عميلة • معدل إنفاق &gt; 3,500 ر.س</span>
                      </div>
                      <span className="text-xs font-bold text-[#F59E0B] px-2.5 py-1 rounded-xl bg-[#F59E0B]/10">
                        عرض تقديري
                      </span>
                    </div>

                    {/* Segment 2: Regulars */}
                    <div className="p-3 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/50 transition-all flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                          <span className="text-xs font-bold text-ink">العميلات المنتظمات</span>
                        </div>
                        <span className="text-[11px] text-ink-muted">580 عميلة • زيارة كل 3-4 أسابيع</span>
                      </div>
                      <span className="text-xs font-bold text-ink px-2.5 py-1 rounded-xl bg-mist-gray/40">
                        باقات العناية
                      </span>
                    </div>

                    {/* Segment 3: At-Risk / Lapsed (Crucial) */}
                    <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FCD34D] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse"></span>
                          <span className="text-xs font-bold text-[#92400E]">معرضات للانقطاع (لم يزرن &gt; 45 يومًا)</span>
                        </div>
                        <span className="text-xs font-black text-[#92400E]">84 عميلة</span>
                      </div>
                      <p className="text-[11px] text-[#78350F] leading-relaxed">
                        اكتشفهن النظام تلقائياً قبل خسارتهن. يمكنك إرسال حملة إعادة تنشيط بضغطة واحدة.
                      </p>
                      <button
                        type="button"
                        className="w-full py-2 px-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>إرسال واتساب مخصص (خصم عودة 20%)</span>
                      </button>
                    </div>

                    {/* Segment 4: New Clients */}
                    <div className="p-3 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/50 transition-all flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-dusty-blue"></span>
                          <span className="text-xs font-bold text-ink">عميلات جدد هذا الشهر</span>
                        </div>
                        <span className="text-[11px] text-ink-muted">65 عميلة • الزيارة الأولى</span>
                      </div>
                      <span className="text-xs font-bold text-ink px-2.5 py-1 rounded-xl bg-mist-gray/40">
                        استبيان رضا
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Message Preview Bubble */}
                <div className="bg-white rounded-3xl border border-mist-gray p-5 shadow-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#10B981]">
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>معاينة رسالة الواتساب التلقائية</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E7F8ED] border border-[#A7F3D0] text-xs text-ink space-y-2 leading-relaxed">
                    <p>
                      أهلاً أستاذة <strong>نورة</strong> ✨ اشتقنا لشوفتك في صالون لافندر!
                    </p>
                    <p>
                      مرّ شهر على جلستك السابقة، ويسرنا تقديم كود خصم حصري <strong>20%</strong> على جلستك القادمة للعناية بالشعر.
                    </p>
                    <div className="p-2 rounded-xl bg-white/80 border border-black/5 text-[11px] font-mono text-dusty-blue">
                      رابط الحجز السريع: https://lavender.rashx.org/book
                    </div>
                  </div>
                  <span className="text-[10px] text-ink-muted block text-center">
                    تُرسل الرسائل باسم صالونك وبشكل مخصص لكل عميلة آلياً
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Core Functional Pillars (7 Pillars) */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'منظومة إدارة العملاء' : 'CRM Architecture'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? '7 ركائز لبناء تجربة عميل استثنائية وزيادة ولاء الصالون'
                  : '7 Pillars for Unrivaled Client Care & Maximum Retention'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'أدوات ذكية متكاملة مصممة خصيصاً لتفاصيل مراكز التجميل والمشاغل النسائية والصالونات الرجالية في المملكة.'
                  : 'Tailored client management tools built specifically for Saudi salons, spas, and aesthetic centers.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crmModules.map((module, idx) => {
                const IconComponent = module.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-3"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                      <IconComponent className="w-5 h-5 text-dusty-blue" />
                    </div>
                    <h3 className="text-base font-bold text-ink">
                      {isAr ? module.titleAr : module.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {isAr ? module.descAr : module.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Saudi PDPL Compliance & Data Protection Callout */}
          <div className="mb-16 rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-bold text-[#065F46]">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>
                  {isAr
                    ? 'امتثال كامل لنظام حماية البيانات الشخصية السعودي (PDPL)'
                    : 'Saudi Personal Data Protection Law (PDPL) Certified Architecture'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-ink leading-tight">
                {isAr
                  ? 'حماية وسرية بيانات عملائك.. التزام قانوني وأمان مطلق'
                  : 'Client Data Privacy & Security: Absolute Integrity by Design'}
              </h2>

              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {isAr
                  ? 'تدرك راش إكس أن بيانات وتفضيلات عملاء صالونك هي أثمن أصولك التجارية. لذلك نوفر عزلاً منطقياً كاملاً لبيانات كل منشأة على نطاق فرعي مخصص (Subdomain)، مع تشفير تام للبيانات أثناء التخزين والنقل. نطبق صلاحيات مشددة للأدوار تمنع موظفي الاستقبال أو خبيرات التجميل من نسخ أو تصدير أرقام العملاء، مع التزام قانوني صارم بعدم مشاركة أو استغلال بياناتك وفق لوائح الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).'
                  : 'Your client relationships and treatment histories are your most valuable business assets. RashX enforces strict logical tenant isolation on dedicated subdomains, encrypting all data in transit and at rest. Granular role-based controls prevent unauthorized exports or leaks by reception staff, fully respecting Saudi PDPL mandates.'}
              </p>

              <div className="pt-2">
                <Link
                  href={`/${locale}/security`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-ink text-white hover:bg-ink/90 text-xs font-bold transition-all"
                >
                  <span>
                    {isAr
                      ? 'تعرف على معايير الأمان وحماية البيانات في راش إكس'
                      : 'Explore Security & Privacy Standards in RashX'}
                  </span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 text-dusty-blue" />
                </Link>
              </div>
            </div>
          </div>

          {/* Section 5: FAQ Accordion */}
          <div className="mb-16 max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr
                  ? 'أسئلة شائعة عن CRM وإدارة عملاء الصالونات'
                  : 'Frequently Asked Questions about Salon CRM'}
              </h2>
            </div>

            <div className="space-y-3">
              {crmFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue/30 transition-colors space-y-2"
                >
                  <h3 className="text-sm font-bold text-ink flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-dusty-blue shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pe-4 ps-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Closing CTA */}
          <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'علاقات عملاء مستدامة' : 'Lasting Client Relationships'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {isAr
                  ? 'جاهز لمضاعفة ولاء عملاء صالونك وزيادة تكرار زياراتهم؟'
                  : 'Ready to Double Customer Retention & Visit Frequency?'}
              </h2>

              <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                {isAr
                  ? 'شاهد كيف يبسط نظام راش إكس إدارة سجلات العملاء، والتفضيلات الحساسة، وحملات الواتساب الذكية في جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                  : 'Experience unified client profiles, automated segmentation, and retention messaging in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                    ? 'مرحبًا راش إكس، أود الاستفسار عن نظام CRM وإدارة علاقات العملاء لصالوني.'
                    : 'Hello RashX, I would like to inquire about the salon CRM and client retention software.'
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

  /* =========================================================================
     RENDER: INVENTORY & PURCHASING SPECIALIZED VIEW
     ========================================================================= */
  if (isInventory) {
    return (
      <div className="w-full bg-[#FAFBFB] min-h-screen">
        <JsonLd data={getFAQPageSchema(inventoryFaqs)} id="inventory-faq-schema" />
        <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="inventory-breadcrumb-schema" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
            <Link href={`/${locale}`} className="hover:text-ink transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/features`} className="hover:text-ink transition-colors">
              {isAr ? 'الحلول' : 'Solutions'}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {isAr ? 'المخزون والمشتريات' : 'Inventory & Purchasing'}
            </span>
          </div>

          {/* Section 1: Hero */}
          <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
              <Boxes className="w-4 h-4 text-dusty-blue" />
              <span>
                {isAr
                  ? 'برنامج مخزون صالون • إدارة مخزون مستلزمات التجميل'
                  : 'Salon Inventory & Beauty Supplies Management'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
              {isAr
                ? 'مخزون تحت السيطرة دون هدر'
                : 'Salon Inventory Under Control Without Waste'}
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {isAr
                ? 'تحكم كامل في كافة مستلزمات الصالون، مستحضرات التجميل، والمنتجات الاستهلاكية. تتيح راش إكس الفصل الدقيق بين مواد الاستخدام الداخلي في الخدمات (Backbar) ومنتجات البيع بالتجزئة (Retail)، مع تتبع لحظي لحركة الصرف والإضافة، وتنبيهات إعادة الطلب التلقائية، وجرد دقيق بالباركود يربط المخزون بالمبيعات والمشتريات مباشرة لمنع الهدر والسرقة.'
                : 'Complete control over salon consumables, cosmetic supplies, and retail inventory. RashX strictly differentiates internal backbar treatment formulas from retail products, featuring real-time movement tracking, automated reorder alerts, barcode stocktaking, and seamless integration with sales POS and supplier purchasing.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
              >
                {isAr ? 'احجز عرضًا تجريبيًا مجانيًا' : 'Book a Free Live Demo'}
              </Link>

              <a
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة المخزون والمستلزمات لصالوني.'
                    : 'Hello RashX, I would like to inquire about the salon inventory and supplies software.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
              </a>
            </div>

            {/* Quick Badges */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'فصل دقيق بين Backbar و Retail' : 'Backbar vs Retail Separation'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'تخصيم استهلاك الخدمات آليًا' : 'Automatic Formula Deductions'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'تنبيهات فورية عند اقتراب النفاد' : 'Low-Stock Safety Alerts'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'جرد دقيق وسريع بالباركود' : 'Barcode Stocktaking Ready'}
              </span>
            </div>
          </div>

          {/* Section 2: Visual Mockups (Stock Audit Table & Vendor PO Engine) */}
          <div className="mb-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'شاشات مراقبة المخزون والتوريد' : 'Live Inventory & Vendor Mockup'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'رؤية لحظية لكل عبوة ومستحضر داخل الصالون' : 'Real-Time Visibility Over Every Formula & Bottle'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'جدول تفاعلي لأرصدة المستودع مع تنبيهات النواقص، وشاشة أوامر الشراء الآلية للموردين'
                  : 'Interactive inventory status with low-stock alerts and automated supplier purchase orders'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Mockup 1: Inventory Stock Audit Table (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl bg-white p-6 sm:p-8 border border-mist-gray shadow-md space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-mist-gray">
                    <div>
                      <div className="flex items-center gap-2">
                        <Boxes className="w-5 h-5 text-dusty-blue" />
                        <h3 className="text-base font-bold text-ink">
                          لوحة جرد وأرصدة المستودع اللحظية
                        </h3>
                      </div>
                      <p className="text-xs text-ink-muted mt-0.5">
                        صالون لمسة حرير VIP • المستودع الرئيسي + رفوف الكاشير
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-mist-gray text-ink font-bold">
                        تحديث لحظي
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        قارئ باركود نشط
                      </span>
                    </div>
                  </div>

                  {/* Stock Items Table */}
                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-start">
                      <thead>
                        <tr className="border-b border-mist-gray text-ink-muted text-[11px]">
                          <th className="pb-2 text-start font-semibold">الصنف والمستحضر</th>
                          <th className="pb-2 text-center font-semibold">التصنيف</th>
                          <th className="pb-2 text-center font-semibold">الرصيد الحالي</th>
                          <th className="pb-2 text-center font-semibold">حد الطلب</th>
                          <th className="pb-2 text-end font-semibold">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-mist-gray/60 font-mono text-[11px]">
                        <tr>
                          <td className="py-2.5 text-start font-sans">
                            <span className="font-bold text-ink block">صبغة شعر أولابلكس 100ml</span>
                            <span className="text-[10px] text-ink-muted font-mono" dir="ltr">SKU-77291</span>
                          </td>
                          <td className="py-2.5 text-center font-sans">
                            <span className="px-1.5 py-0.5 rounded bg-mist-gray text-ink-muted text-[9px]">
                              داخلي (Backbar)
                            </span>
                          </td>
                          <td className="py-2.5 text-center font-bold text-rose-700">6 عبوات</td>
                          <td className="py-2.5 text-center text-ink-muted">10 عبوات</td>
                          <td className="py-2.5 text-end font-sans">
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                              أعد الطلب ⚠️
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-2.5 text-start font-sans">
                            <span className="font-bold text-ink block">شامبو كيراتين برازيلي 1000ml</span>
                            <span className="text-[10px] text-ink-muted font-mono" dir="ltr">SKU-88301</span>
                          </td>
                          <td className="py-2.5 text-center font-sans">
                            <span className="px-1.5 py-0.5 rounded bg-mist-gray text-ink-muted text-[9px]">
                              داخلي (Backbar)
                            </span>
                          </td>
                          <td className="py-2.5 text-center font-bold text-amber-700">3 عبوات</td>
                          <td className="py-2.5 text-center text-ink-muted">4 عبوات</td>
                          <td className="py-2.5 text-end font-sans">
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                              اقترب من النفاد
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-2.5 text-start font-sans">
                            <span className="font-bold text-ink block">سيروم لوريال الاحترافي 100ml</span>
                            <span className="text-[10px] text-ink-muted font-mono" dir="ltr">SKU-99214</span>
                          </td>
                          <td className="py-2.5 text-center font-sans">
                            <span className="px-1.5 py-0.5 rounded bg-dusty-blue/20 text-black text-[9px] font-bold">
                              تجزئة (Retail)
                            </span>
                          </td>
                          <td className="py-2.5 text-center font-bold text-emerald-700">18 عبوة</td>
                          <td className="py-2.5 text-center text-ink-muted">6 عبوات</td>
                          <td className="py-2.5 text-end font-sans">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              متوفر ✓
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-2.5 text-start font-sans">
                            <span className="font-bold text-ink block">زيت مساج لافندر مركز 500ml</span>
                            <span className="text-[10px] text-ink-muted font-mono" dir="ltr">SKU-44102</span>
                          </td>
                          <td className="py-2.5 text-center font-sans">
                            <span className="px-1.5 py-0.5 rounded bg-mist-gray text-ink-muted text-[9px]">
                              داخلي (Backbar)
                            </span>
                          </td>
                          <td className="py-2.5 text-center font-bold text-emerald-700">12 عبوة</td>
                          <td className="py-2.5 text-center text-ink-muted">4 عبوات</td>
                          <td className="py-2.5 text-end font-sans">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              متوفر ✓
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Real-time deduction audit trail banner */}
                  <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between font-bold text-ink">
                      <span>آخر حركة صرف آلية:</span>
                      <span className="text-emerald-700">خصم فوري ناجح ✓</span>
                    </div>
                    <p className="text-ink-muted">
                      تم خصم (1 عبوة صبغة أولابلكس) آليًا بمجرد إغلاق الفاتورة #08492 لخدمة الخبيرة سارة العتيبي.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mockup 2: Automated Vendor Purchase Order (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-white p-6 border border-mist-gray shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-mist-gray pb-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-dusty-blue" />
                      <div>
                        <h4 className="text-sm font-bold text-ink">أمر شراء آلي (PO)</h4>
                        <span className="text-[10px] text-ink-muted font-mono" dir="ltr">PO-2026-0041</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                      بانتظار التوريد
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFBFB] border border-mist-gray text-xs space-y-1">
                    <span className="text-ink-muted text-[10px] block">المورد المعتمد:</span>
                    <span className="font-bold text-ink">شركة توريدات التجميل الوطنية</span>
                  </div>

                  {/* Auto-populated items */}
                  <div className="space-y-2 text-xs">
                    <span className="text-[11px] font-bold text-ink block">
                      المواد المطلوبة آليًا بناءً على حد الأمان:
                    </span>
                    <div className="p-2.5 rounded-xl bg-white border border-mist-gray flex items-center justify-between">
                      <div>
                        <span className="font-bold text-ink block">صبغة شعر أولابلكس 100ml</span>
                        <span className="text-[10px] text-ink-muted">الكمية المطلوبة: 24 عبوة</span>
                      </div>
                      <span className="font-mono font-bold text-ink">960.00 ر.س</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-mist-gray flex items-center justify-between">
                      <div>
                        <span className="font-bold text-ink block">شامبو كيراتين برازيلي 1000ml</span>
                        <span className="text-[10px] text-ink-muted">الكمية المطلوبة: 12 عبوة</span>
                      </div>
                      <span className="font-mono font-bold text-ink">720.00 ر.س</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-3 rounded-xl bg-[#FAFBFB] border border-mist-gray space-y-1 text-xs">
                    <div className="flex justify-between text-ink-muted text-[11px]">
                      <span>الإجمالي قبل الضريبة:</span>
                      <span className="font-mono">1,680.00 ر.س</span>
                    </div>
                    <div className="flex justify-between text-ink-muted text-[11px]">
                      <span>ضريبة القيمة المضافة 15%:</span>
                      <span className="font-mono">252.00 ر.س</span>
                    </div>
                    <div className="flex justify-between font-bold text-ink pt-1 border-t border-mist-gray">
                      <span>الإجمالي المستحق للمورد:</span>
                      <span className="font-mono text-dusty-blue">1,932.00 ر.س</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl bg-dusty-blue text-black font-bold text-xs shadow-xs flex items-center justify-center gap-2 hover:bg-dusty-blue/90 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تأكيد استلام الشحنة وتحديث رصيد المستودع تلقائيًا</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: The 7 Core Functional Pillars */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'الركائز السبع للمنظومة' : '7 Core Inventory Pillars'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'منظومة مخزون شاملة لإيقاف الهدر وزيادة الأرباح' : 'Comprehensive Inventory Control Ending Waste'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'من استلام شحنات الموردين وحتى استهلاك الجرامات في محطات العمل ومبيعات الرفوف'
                  : 'From supplier deliveries to workstation gram deductions and retail front-desk checkouts'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventoryModules.map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white p-6 sm:p-7 border border-mist-gray shadow-xs hover:border-dusty-blue hover:shadow-md transition-all space-y-3 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-mist-gray/70 border border-mist-gray flex items-center justify-center text-ink group-hover:bg-dusty-blue group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-ink">
                      {isAr ? mod.titleAr : mod.titleEn}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {isAr ? mod.descAr : mod.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: FAQs */}
          <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'إجابات مباشرة' : 'Direct Answers'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'الأسئلة الشائعة حول إدارة مخزون الصالونات' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'إجابات واضحة عن تتبع الاستهلاك والجرد بالباركود وإدارة مشتريات مستلزمات التجميل'
                  : 'Clear facts on formula consumption, barcode audits, and beauty supply replenishment'}
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto pt-4">
              {inventoryFaqs.map((faq, idx) => (
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

          {/* Section 5: Closing CTA */}
          <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'صفر هدر ومخزون منضبط' : 'Zero Waste & Total Stock Auditing'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {isAr
                  ? 'جاهز لضبط مخزون صالونك والقضاء على الهدر المالي؟'
                  : 'Ready to Bring Your Salon Inventory Under Complete Control?'}
              </h2>

              <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                {isAr
                  ? 'اكتشف كيف تضبط راش إكس استهلاك مستحضرات التجميل وتنبيهات النواقص وجرد الباركود عبر جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا بدون بطاقة بنكية.'
                  : 'See how RashX automates cosmetic formulas, reorder thresholds, and barcode audits in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                    ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة المخزون والمشتريات لصالوني.'
                    : 'Hello RashX, I would like to inquire about inventory and purchasing software.'
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

  /* =========================================================================
     RENDER: STAFF HR & COMMISSIONS SPECIALIZED VIEW
     ========================================================================= */
  if (isHr) {
    return (
      <div className="w-full bg-[#FAFBFB] min-h-screen">
        <JsonLd data={getFAQPageSchema(hrFaqs)} id="hr-faq-schema" />
        <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="hr-breadcrumb-schema" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
            <Link href={`/${locale}`} className="hover:text-ink transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/features`} className="hover:text-ink transition-colors">
              {isAr ? 'الحلول' : 'Solutions'}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {isAr ? 'الموارد البشرية والعمولات' : 'Staff HR & Commissions'}
            </span>
          </div>

          <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
              <Users className="w-4 h-4 text-dusty-blue" />
              <span>
                {isAr
                  ? 'برنامج عمولات الموظفين صالون • إدارة موظفين صالون تجميل'
                  : 'Salon Staff Management & Commission Engine'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
              {isAr
                ? 'إدارة الموظفين والعمولات بدقة وشفافية'
                : 'Salon Staff & Commission Management with Precision & Transparency'}
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {isAr
                ? 'وداعًا للخلافات الحسابية وجداول الإكسل المعقدة. تتيح راش إكس لأصحاب الصالونات والمشاغل إدارة ملفات الموظفين، ضبط الصلاحيات، جدولة الورديات، وتتبع الحضور والانصراف، مع احتساب آلي لحظي لعمولات الخدمات ومبيعات المنتجات، وواجهة خاصة لكل خبيرة تجميل لمتابعة إنجازها اليومي بشفافية تامة.'
                : 'Say goodbye to commission disputes and manual spreadsheets. RashX empowers salon and spa owners to manage staff documents, enforce granular permissions, schedule shifts, and track attendance, with instant automated service and retail commission calculations and a dedicated portal for specialists.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
              >
                {isAr ? 'احجز عرضًا تجريبيًا مجانيًا' : 'Book a Free Live Demo'}
              </Link>

              <a
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة الموظفين والعمولات لصالوني.'
                    : 'Hello RashX, I would like to inquire about the salon staff and commission software.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
              </a>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'حساب آلي لحظي للعمولات' : 'Real-time Commission Allocation'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'واجهة خاصة لكل موظف (Staff Portal)' : 'Dedicated Staff Portal'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'صلاحيات دقيقة وحماية للبيانات' : 'Granular Role Permissions'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'متابعة الورديات والحضور' : 'Shift Roster & Attendance'}
              </span>
            </div>
          </div>

          {/* Section 2: Visual Mockups */}
          <div className="mb-16 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'معاينة شاشات الموظفين والإدارة' : 'Staff & Admin Interface Preview'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'شفافية للموظفة وتحكم كامل للإدارة' : 'Transparency for Specialists, Full Control for Management'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'واجهة هاتف مستقلة للخبيرة تعرض إنجازها وعمولاتها، مقابل لوحة إدارة متطورة لمسيرات الرواتب والصلاحيات'
                  : 'A dedicated mobile portal for stylists alongside an executive payroll and permission board'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Mockup 1: Dedicated Staff Portal Mobile View */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[340px] rounded-[40px] p-3 bg-ink shadow-2xl border-4 border-mist-gray/80 relative">
                  <div className="w-32 h-4 bg-ink rounded-b-xl mx-auto mb-2 flex items-center justify-center">
                    <div className="w-12 h-1 bg-white/20 rounded-full" />
                  </div>

                  <div className="rounded-[30px] bg-white overflow-hidden text-xs text-ink space-y-3.5 p-4">
                    <div className="flex items-center justify-between border-b border-mist-gray pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-dusty-blue/30 text-black flex items-center justify-center font-bold text-xs">
                          س.ع
                        </div>
                        <div>
                          <span className="font-bold text-[11px] block">سارة العتيبي</span>
                          <span className="text-[9px] text-ink-muted">أخصائية تصفيف ومعالجات</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                        على رأس العمل
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-ink-muted">
                        <span>إنجاز اليوم (الخميس 12 نوفمبر):</span>
                        <span className="font-bold text-ink">4 خدمات مكتملة</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded-xl bg-white border border-mist-gray text-center">
                          <span className="text-[9px] text-ink-muted block">عمولة الخدمات (15%)</span>
                          <span className="text-xs font-bold text-emerald-700 font-mono">127.50 ر.س</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-mist-gray text-center">
                          <span className="text-[9px] text-ink-muted block">عمولة المنتجات (10%)</span>
                          <span className="text-xs font-bold text-dusty-blue font-mono">21.00 ر.س</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] pt-1 border-t border-mist-gray">
                        <span className="font-bold text-ink">إجمالي المستحق اليوم:</span>
                        <span className="font-mono font-bold text-ink text-xs">148.50 ر.س</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-ink">
                        <span>مواعيدي القادمة اليوم:</span>
                        <span className="text-ink-muted font-normal">2 موعد متبقي</span>
                      </div>

                      <div className="space-y-1.5 text-[10px]">
                        <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 flex items-center justify-between">
                          <div>
                            <span className="font-bold block">4:30 م • قص وتصفيف شعر</span>
                            <span className="text-[9px] text-sky-800">العميلة: ريم • مدة: 45 دقيقة</span>
                          </div>
                          <span className="px-1.5 py-0.5 rounded bg-white text-sky-800 font-bold text-[9px]">
                            الكرسي 1
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-[#FAFBFB] border border-mist-gray text-ink flex items-center justify-between">
                          <div>
                            <span className="font-bold block">6:00 م • صبغة شعر كاملة VIP</span>
                            <span className="text-[9px] text-ink-muted">العميلة: نورة • مدة: 90 دقيقة</span>
                          </div>
                          <span className="px-1.5 py-0.5 rounded bg-white border text-ink-muted text-[9px]">
                            قادم
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-mist-gray/40 border border-mist-gray text-[9px] text-ink-muted text-center leading-tight">
                      🔒 واجهة مستقلة ومحمية: لا تطلع الموظفة على مبيعات الصالون العامة أو تقارير الإدارة
                    </div>
                  </div>
                </div>
              </div>

              {/* Mockup 2: Admin HR & Payroll Dashboard */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-3xl bg-white p-6 sm:p-8 border border-mist-gray shadow-md space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-mist-gray">
                    <div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-dusty-blue" />
                        <h3 className="text-base font-bold text-ink">
                          لوحة مسير عمولات الموظفين ومطابقة الرواتب
                        </h3>
                      </div>
                      <p className="text-xs text-ink-muted mt-0.5">
                        حساب لحظي لعمولات الخدمات ومبيعات التجزئة وساعات الحضور
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-mist-gray text-ink font-bold">
                        نوفمبر 2026
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        احتساب آلي 100%
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-start">
                      <thead>
                        <tr className="border-b border-mist-gray text-ink-muted text-[11px]">
                          <th className="pb-2 text-start font-semibold">الموظفة / التخصص</th>
                          <th className="pb-2 text-center font-semibold">نسبة العمولة</th>
                          <th className="pb-2 text-center font-semibold">مبيعات الخدمات</th>
                          <th className="pb-2 text-center font-semibold">مبيعات المنتجات</th>
                          <th className="pb-2 text-center font-semibold">إجمالي العمولة</th>
                          <th className="pb-2 text-end font-semibold">حالة الوثائق</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-mist-gray/60 font-mono text-[11px]">
                        <tr>
                          <td className="py-2.5 text-start font-sans">
                            <span className="font-bold text-ink block">سارة العتيبي</span>
                            <span className="text-[10px] text-ink-muted">تصفيف ومعالجات</span>
                          </td>
                          <td className="py-2.5 text-center font-bold text-ink">15%</td>
                          <td className="py-2.5 text-center">8,450 ر.س</td>
                          <td className="py-2.5 text-center">1,200 ر.س</td>
                          <td className="py-2.5 text-center font-bold text-emerald-700">1,387.50 ر.س</td>
                          <td className="py-2.5 text-end font-sans">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                              سارية ✓
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-2.5 text-start font-sans">
                            <span className="font-bold text-ink block">نورة السبيعي</span>
                            <span className="text-[10px] text-ink-muted">صبغات وتسريحات</span>
                          </td>
                          <td className="py-2.5 text-center font-bold text-ink">18%</td>
                          <td className="py-2.5 text-center">11,200 ر.س</td>
                          <td className="py-2.5 text-center">850 ر.س</td>
                          <td className="py-2.5 text-center font-bold text-emerald-700">2,101.00 ر.س</td>
                          <td className="py-2.5 text-end font-sans">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                              سارية ✓
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-2.5 text-start font-sans">
                            <span className="font-bold text-ink block">منى القحطاني</span>
                            <span className="text-[10px] text-ink-muted">مكياج وبشرة</span>
                          </td>
                          <td className="py-2.5 text-center font-bold text-ink">12%</td>
                          <td className="py-2.5 text-center">7,100 ر.س</td>
                          <td className="py-2.5 text-center">2,400 ر.س</td>
                          <td className="py-2.5 text-center font-bold text-emerald-700">1,092.00 ر.س</td>
                          <td className="py-2.5 text-end font-sans">
                            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold">
                              تجديد شهادة
                            </span>
                          </td>
                        </tr>

                        <tr>
                          <td className="py-2.5 text-start font-sans">
                            <span className="font-bold text-ink block">لطيفة الدوسري</span>
                            <span className="text-[10px] text-ink-muted">أظافر وسبا</span>
                          </td>
                          <td className="py-2.5 text-center font-bold text-ink">10%</td>
                          <td className="py-2.5 text-center">5,600 ر.س</td>
                          <td className="py-2.5 text-center">450 ر.س</td>
                          <td className="py-2.5 text-center font-bold text-emerald-700">605.00 ر.س</td>
                          <td className="py-2.5 text-end font-sans">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                              سارية ✓
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-ink font-semibold">
                        مطابقة تامة للفواتير: تم احتساب العمولات لحظيًا مع كل فاتورة مغلقة
                      </span>
                    </div>
                    <span className="font-mono font-bold text-ink">
                      إجمالي عمولات الفريق: 5,185.50 ر.س
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: The 7 Core Functional Pillars */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'الركائز السبع للمنظومة' : '7 Core Pillars'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'كل ما تحتاجه لإدارة فريق صالونك باحترافية' : 'Everything Needed for Professional Staff Management'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'من توثيق العقود وتحديد الصلاحيات، وحتى حساب العمولات ومسيرات الرواتب دون أخطاء'
                  : 'From contract archiving to automated commissions and role-based data security'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hrModules.map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white p-6 sm:p-7 border border-mist-gray shadow-xs hover:border-dusty-blue hover:shadow-md transition-all space-y-3 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-mist-gray/70 border border-mist-gray flex items-center justify-center text-ink group-hover:bg-dusty-blue group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-ink">
                      {isAr ? mod.titleAr : mod.titleEn}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {isAr ? mod.descAr : mod.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: FAQs */}
          <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'إجابات مباشرة' : 'Direct Answers'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'الأسئلة الشائعة حول إدارة الموظفين والعمولات' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'حقائق وإجابات دقيقة عن كيفية عمل نظام العمولات والصلاحيات وحماية البيانات'
                  : 'Clear facts on commission rules, staff portals, and privacy controls'}
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto pt-4">
              {hrFaqs.map((faq, idx) => (
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

          {/* Section 5: Closing CTA */}
          <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'شفافية كاملة وتحفيز للإنتاجية' : 'Absolute Transparency & Morale Boost'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {isAr
                  ? 'جاهز لضبط عمولات موظفيك وإنهاء الخلافات الحسابية؟'
                  : 'Ready to Automate Staff Commissions & Eliminate Disputes?'}
              </h2>

              <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                {isAr
                  ? 'اكتشف كيف تمنح خبيرات صالونك واجهة خاصة لحساب العمولات والمواعيد عبر جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا بدون بطاقة بنكية.'
                  : 'See how our dedicated staff portal and automated commission engine operate in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                    ? 'مرحبًا راش إكس، أود الاستفسار عن نظام إدارة الموظفين والعمولات للصالونات.'
                    : 'Hello RashX, I would like to inquire about staff management and commissions.'
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

  /* =========================================================================
     RENDER: POS & CASHIER SPECIALIZED VIEW
     ========================================================================= */
  if (isPos) {
    return (
      <div className="w-full bg-[#FAFBFB] min-h-screen">
        <JsonLd data={getFAQPageSchema(posFaqs)} id="pos-faq-schema" />
        <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="pos-breadcrumb-schema" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
            <Link href={`/${locale}`} className="hover:text-ink transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/features`} className="hover:text-ink transition-colors">
              {isAr ? 'الحلول' : 'Solutions'}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {isAr ? 'المبيعات ونقاط البيع (POS)' : 'POS & Cashier'}
            </span>
          </div>

          <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
              <CreditCard className="w-4 h-4 text-dusty-blue" />
              <span>
                {isAr
                  ? 'برنامج كاشير صالون • نظام نقاط بيع للصالونات'
                  : 'Fast Salon POS & Cashier Management System'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
              {isAr
                ? 'كاشير ومبيعات مصمم لتفاصيل الصالونات'
                : 'Salon POS & Cashier Engineered for Beauty Facilities'}
            </h1>

            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {isAr
                ? 'واجهة نقطة بيع (POS) سريعة باللمس مصممة لسرعة إنجاز فواتير الصالونات والمشاغل، تدعم تجزئة الدفع (مدى، Apple Pay، كاش)، ربط الفاتورة بالخبيرة والعمولة، الخصومات وباقات الخدمات، ودعم متطلبات الفوترة الإلكترونية ZATCA المرحلة الثانية، مع خصم المخزون اللحظي.'
                : 'A lightning-fast touchscreen POS tailored for salons and studios: multi-tender split payments (Mada, Apple Pay, Cash), automated staff commissions, dynamic packages, real-time inventory adjustments, and ZATCA Phase 2 readiness.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/demo`}
                className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
              >
                {isAr ? 'احجز عرضًا تجريبيًا مجانيًا' : 'Book a Free Live Demo'}
              </Link>

              <a
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  isAr
                    ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج كاشير الصالونات ونقاط البيع.'
                    : 'Hello RashX, I would like to inquire about the salon POS cashier system.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
              </a>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'إصدار الفاتورة في أقل من 5 ثوانٍ' : 'Checkout in Under 5 Seconds'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'تجزئة الدفع (مدى + كاش + Apple Pay)' : 'Multi-Tender Split Payment'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'دعم متطلبات ZATCA المرحلة 2' : 'ZATCA Phase 2 E-Invoicing Ready'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                {isAr ? 'تخصيم لحظي من المخزون' : 'Instant Stock Consumption'}
              </span>
            </div>
          </div>

          {/* Section 2: Fast Touch POS Mockup */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'شاشة الكاشير السريعة' : 'Interactive POS Mockup'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'واجهة نقطة بيع مصممة لسرعة الاستقبال' : 'Fast Touch POS Designed for Salon Front Desks'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'أزرار لمس كبيرة، ربط فوري بالخبيرة، واحتساب آلي للضريبة والخصم دون تعقيد'
                  : 'Large touch targets, instant specialist commission allocation, and automatic 15% VAT calculation'}
              </p>
            </div>

            <div className="rounded-3xl bg-ink text-white p-4 sm:p-6 shadow-2xl border-4 border-mist-gray/80 overflow-hidden">
              <div className="rounded-2xl bg-white text-ink p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2 border-b border-mist-gray pb-3 text-xs">
                    <span className="px-3 py-1.5 rounded-xl bg-dusty-blue text-black font-bold">
                      {isAr ? 'الكل' : 'All'}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-mist-gray/60 text-ink font-semibold">
                      {isAr ? 'خدمات الشعر' : 'Hair Services'}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-mist-gray/60 text-ink font-semibold">
                      {isAr ? 'الأظافر والسبا' : 'Nails & Spa'}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-mist-gray/60 text-ink font-semibold">
                      {isAr ? 'المكياج والبشرة' : 'Makeup & Skin'}
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-mist-gray/60 text-ink font-semibold">
                      {isAr ? 'منتجات التجزئة' : 'Retail Products'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border-2 border-dusty-blue shadow-2xs space-y-1 relative">
                      <span className="font-bold text-ink block">قص وتصفيف الشعر</span>
                      <span className="text-dusty-blue font-bold font-mono">180 ر.س</span>
                      <span className="text-[10px] text-ink-muted block">45 دقيقة • سارة</span>
                      <span className="absolute top-2 start-2 w-2 h-2 rounded-full bg-emerald-500" />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                      <span className="font-bold text-ink block">صبغة شعر كاملة</span>
                      <span className="text-ink font-bold font-mono">350 ر.س</span>
                      <span className="text-[10px] text-ink-muted block">90 دقيقة • نورة</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                      <span className="font-bold text-ink block">بديكير ومنيكير سبا</span>
                      <span className="text-ink font-bold font-mono">150 ر.س</span>
                      <span className="text-[10px] text-ink-muted block">50 دقيقة • لطيفة</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                      <span className="font-bold text-ink block">جلسة تنظيف هيدرافيشل</span>
                      <span className="text-ink font-bold font-mono">280 ر.س</span>
                      <span className="text-[10px] text-ink-muted block">60 دقيقة • منى</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink">سيروم لوريال 100ml</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold">منتج</span>
                      </div>
                      <span className="text-ink font-bold font-mono">140 ر.س</span>
                      <span className="text-[10px] text-emerald-700 block">المخزون: 18 عبوة</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink">شامبو كيراتين عضوي</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold">منتج</span>
                      </div>
                      <span className="text-ink font-bold font-mono">115 ر.س</span>
                      <span className="text-[10px] text-emerald-700 block">المخزون: 9 عبوات</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-mist-gray/30 border border-mist-gray text-[11px] text-ink-muted flex items-center justify-between">
                    <span>💡 يمكنك البحث السريع برقم الباركود أو اسم الخدمة في شريط البحث</span>
                    <span className="font-bold text-ink">قارئ باركود نشط ✓</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#FAFBFB] rounded-2xl p-4 sm:p-5 border border-mist-gray flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-mist-gray pb-2.5">
                      <div>
                        <div className="text-xs font-bold text-ink">فاتورة ضريبية مبسطة</div>
                        <div className="text-[10px] text-ink-muted font-mono" dir="ltr">INV-2026-08492</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        ZATCA جاهزة
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-mist-gray text-xs">
                      <div>
                        <span className="text-ink font-bold block">العميلة: ريم العبدالله</span>
                        <span className="text-[10px] text-ink-muted" dir="ltr">054 808 2945</span>
                      </div>
                      <span className="text-[10px] font-bold text-dusty-blue bg-dusty-blue/20 px-2 py-0.5 rounded-md">
                        عميلة VIP (120 نقطة)
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-mist-gray flex items-center justify-between">
                        <div>
                          <div className="font-bold text-ink">قص وتصفيف الشعر</div>
                          <div className="text-[10px] text-ink-muted">الخبيرة: سارة (عمولة 15% = 27 ر.س)</div>
                        </div>
                        <span className="font-mono font-bold text-ink">180.00 ر.س</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-mist-gray flex items-center justify-between">
                        <div>
                          <div className="font-bold text-ink">سيروم لوريال الاحترافي 100ml</div>
                          <div className="text-[10px] text-emerald-700">تخصيم المخزون: -1 عبوة تلقائيًا</div>
                        </div>
                        <span className="font-mono font-bold text-ink">140.00 ر.س</span>
                      </div>

                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-[11px]">
                        <span className="font-bold">خصم عرض باقة VIP (10%):</span>
                        <span className="font-mono font-bold">-32.00 ر.س</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-mist-gray text-xs">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-ink-muted">
                        <span>المجموع الخاضع للضريبة:</span>
                        <span className="font-mono">288.00 ر.س</span>
                      </div>
                      <div className="flex justify-between text-ink-muted">
                        <span>ضريبة القيمة المضافة (15%):</span>
                        <span className="font-mono">43.20 ر.س</span>
                      </div>
                      <div className="flex justify-between text-sm font-black text-ink pt-1 border-t border-mist-gray">
                        <span>الإجمالي شامل الضريبة:</span>
                        <span className="font-mono text-dusty-blue text-base">331.20 ر.س</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-mist-gray space-y-2">
                      <div className="text-[11px] font-bold text-ink flex items-center justify-between">
                        <span>تجزئة الدفع (Split Payment):</span>
                        <span className="text-[10px] text-emerald-700 font-bold">مكتمل 100%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-1.5 rounded-lg bg-mist-gray/40 border border-mist-gray flex justify-between">
                          <span>مدى (Mada):</span>
                          <span className="font-bold">200.00 ر.س</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-mist-gray/40 border border-mist-gray flex justify-between">
                          <span>Apple Pay:</span>
                          <span className="font-bold">131.20 ر.س</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full py-3 rounded-xl bg-dusty-blue text-black font-bold text-xs shadow-sm flex items-center justify-center gap-2 hover:bg-dusty-blue/90 transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>إصدار الفاتورة الضريبية وطباعة الإيصال (QR)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: The 6 Functional Pillars */}
          <div className="mb-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'قدرات نقاط البيع والكاشير' : 'POS Capabilities'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'كل ما تحتاجه لإدارة عمليات البيع المالي' : 'Complete Financial Sales Operations'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'من فتح وردية الصندوق اليومية وحتى إصدار الإقرار الضريبي وحساب عمولات الخبيرات'
                  : 'From daily shift openings to tax compliance and automated beautician commissions'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posModules.map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-white p-6 sm:p-7 border border-mist-gray shadow-xs hover:border-dusty-blue hover:shadow-md transition-all space-y-3 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-mist-gray/70 border border-mist-gray flex items-center justify-center text-ink group-hover:bg-dusty-blue group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-ink">
                      {isAr ? mod.titleAr : mod.titleEn}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {isAr ? mod.descAr : mod.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Deep Integration with ZATCA & Inventory */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="rounded-3xl bg-white p-8 border border-mist-gray shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">
                      {isAr ? 'الامتثال للفوترة الإلكترونية (ZATCA)' : 'ZATCA E-Invoicing Integration'}
                    </h3>
                    <p className="text-xs text-ink-muted">
                      {isAr ? 'المرحلة الثانية: الربط والتكامل' : 'Phase 2: Integration & Linking'}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isAr
                    ? 'تدعم منصة راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة ومتطلبات الربط والتفعيل الصادرة عن هيئة الزكاة والضريبة والجمارك (ZATCA)، مع توليد الفواتير الضريبية المبسطة وتشفير رمز الاستجابة السريعة (QR Code) تلقائيًا فور كل معاملة بيع.'
                    : 'RashX supports ZATCA Phase 2 (Integration & Linking) e-invoicing criteria subject to facility onboarding status, automatically generating compliant simplified tax invoices with cryptographic QR codes.'}
                </p>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs space-y-1">
                  <span className="font-bold block">
                    {isAr ? 'توافق كامل مع متطلبات المنشآت السعودية:' : 'Full Saudi Regulatory Alignment:'}
                  </span>
                  <span className="text-[11px] text-emerald-800">
                    {isAr
                      ? 'طباعة الرقم الضريبي للمنشأة، الختم المشفر، الرقم التسلسلي الموحد، وتفصيل ضريبة القيمة المضافة 15% بدقة.'
                      : 'Tax ID printing, cryptographic stamp, unique sequential numbering, and itemized 15% VAT.'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-mist-gray">
                <Link
                  href={`/${locale}/zatca`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-ink hover:text-dusty-blue transition-colors"
                >
                  <span>{isAr ? 'دليل متطلبات الفوترة الإلكترونية الكامل' : 'Full ZATCA E-Invoicing Guide'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 border border-mist-gray shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Boxes className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">
                      {isAr ? 'الربط التلقائي مع نظام المخزون والمستودع' : 'Live Inventory & Consumables Sync'}
                    </h3>
                    <p className="text-xs text-ink-muted">
                      {isAr ? 'تخصيم استهلاك الخدمات ومبيعات التجزئة' : 'Backbar consumption & retail deductions'}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isAr
                    ? 'يرتبط الكاشير مباشرة بمستودعات الصالون؛ فبمجرد فوترة أي خدمة (مثل صبغة، بروتين، أو جلسة سبا) يخصم النظام كميات المواد المعيارية المستهلكة من مخزون الصالون الداخلي (Backbar)، ويخصم منتجات العناية المباعة من رصيد رف البيع (Retail) مع تنبيهات فورية عند اقتراب نفاد المواد.'
                    : 'The POS syncs directly with stock rooms. Every invoiced treatment automatically decrements internal backbar consumables, while retail sales update shelf balances in real time with low-stock alerts.'}
                </p>

                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs space-y-1">
                  <span className="font-bold block">
                    {isAr ? 'حماية من الهدر وسرقة المنتجات:' : 'Zero Waste & Pilferage Protection:'}
                  </span>
                  <span className="text-[11px] text-amber-800">
                    {isAr
                      ? 'مطابقة دورية دقيقة بين كميات المواد المستهلكة المسجلة في الفواتير والرصيد الفعلي للمستودع عبر جرد الباركود.'
                      : 'Accurate reconciliation between invoiced service formulas and physical stock audits via barcode scanners.'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-mist-gray">
                <Link
                  href={`/${locale}/solutions/inventory-purchasing`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-ink hover:text-dusty-blue transition-colors"
                >
                  <span>{isAr ? 'استكشف نظام المخزون وإدارة المشتريات' : 'Explore Inventory & Purchasing System'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            </div>
          </div>

          {/* Section 5: POS FAQs */}
          <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'إجابات مباشرة' : 'Direct Answers'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-ink">
                {isAr ? 'الأسئلة الشائعة حول الكاشير ونقاط البيع' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">
                {isAr
                  ? 'إجابات واضحة ودقيقة عن الفوترة الإلكترونية وتجزئة الدفع وإدارة المبيعات'
                  : 'Clear facts on e-invoicing compliance, split payments, and POS operations'}
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto pt-4">
              {posFaqs.map((faq, idx) => (
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

          {/* Section 6: Closing CTA */}
          <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'كاشير سريع ومبيعات منضبطة' : 'Fast POS & Accurate Audits'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {isAr
                  ? 'جاهز لتسريع كاشير صالونك وضبط إيراداتك وعمولاتك؟'
                  : 'Ready to Accelerate Your Checkout & Reconcile Revenue?'}
              </h2>

              <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                {isAr
                  ? 'اكتشف كيف تدير المبيعات ونقاط البيع السريعة والفوترة الإلكترونية عبر جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا بدون بطاقة بنكية.'
                  : 'Experience our touch POS, split payment engine, and ZATCA integration in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                    ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج كاشير ونقاط بيع الصالونات.'
                    : 'Hello RashX, I would like to inquire about the salon POS cashier software.'
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

  /* =========================================================================
     RENDER: BOOKING SYSTEM SPECIALIZED VIEW (DEFAULT DETAILED VIEW)
     ========================================================================= */
  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      <JsonLd data={getFAQPageSchema(bookingFaqs)} id="booking-faq-schema" />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="booking-breadcrumb-schema" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/features`} className="hover:text-ink transition-colors">
            {isAr ? 'الحلول' : 'Solutions'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? 'نظام الحجوزات والمواعيد' : 'Booking System'}
          </span>
        </div>

        <div className="max-w-3xl mb-12 lg:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <CalendarCheck className="w-4 h-4 text-dusty-blue" />
            <span>
              {isAr
                ? 'نظام حجز مواعيد صالون ذكي • حجز اونلاين 24/7'
                : 'Smart Salon Booking Software • 24/7 Online Scheduling'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight leading-tight">
            {isAr
              ? 'نظام حجوزات يملأ جدول صالونك ويقلل التعارض'
              : 'Booking System That Fills Your Salon Calendar & Eliminates Clashes'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            {isAr
              ? 'حوّل هاتفك المزدحم بالمحادثات إلى محرك حجز ذاتي منظم على مدار الساعة. تتيح راش إكس لعميلاتك حجز الخدمات واختيار خبيراتهن المفضّلات عبر موقع المنشأة وتطبيق العميل بسهولة تامة، بينما تنظم لوحة التحكم الإدارية جداول الموظفين وفترات التعقيم وتمنع تضارب المواعيد نهائيًا.'
              : 'Transform chaotic message threads into a 24/7 self-service booking engine. RashX empowers clients to select services and preferred stylists via your facility website and client portal, while your admin board synchronizes staff schedules and prevents double bookings.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/demo`}
              className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
            >
              {isAr ? 'احجز عرضًا تجريبيًا مجانيًا' : 'Book a Free Live Demo'}
            </Link>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? 'مرحبًا راش إكس، أود تجربة نظام حجز المواعيد ومعرفة تفاصيل ربطه بصالوني.'
                  : 'Hello RashX, I would like to explore the appointment booking system for my salon.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-2xl transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-[#25D366]" />
              <span>{isAr ? 'استشرنا عبر واتساب' : 'WhatsApp Consultation'}</span>
            </a>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              {isAr ? 'حجز بدون تحميل تطبيق (PWA)' : 'Instant PWA Booking (No Download)'}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              {isAr ? 'منع التضارب بنسبة 100%' : '100% Conflict-Free Engine'}
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              {isAr ? 'تنبيهات تذكير بالواتساب' : 'Automated WhatsApp Reminders'}
            </span>
          </div>
        </div>

        {/* Section 2: Visual Mockups */}
        <div className="mb-16 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'معاينة حية للمنظومة' : 'Interactive System Preview'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr ? 'كيف تبدو تجربة الحجز لك ولعميلك؟' : 'How the Booking Flow Works'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'واجهة سريعة فائقة البساطة للعميل على الجوال، مقابل لوحة تحكم ذكية وشاملة لإدارة صالونك'
                : 'A seamless mobile booking portal for clients, paired with an executive admin calendar board'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Mockup 1: Mobile Client Booking App */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] rounded-[40px] p-3 bg-ink shadow-2xl border-4 border-mist-gray/80 relative">
                <div className="w-32 h-4 bg-ink rounded-b-xl mx-auto mb-2 flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/20 rounded-full" />
                </div>

                <div className="rounded-[30px] bg-white overflow-hidden text-xs text-ink space-y-3 p-4">
                  <div className="flex items-center justify-between border-b border-mist-gray pb-2">
                    <div>
                      <span className="font-bold text-[11px] block">صالون لمسة حرير VIP</span>
                      <span className="text-[9px] text-ink-muted font-mono" dir="ltr">
                        lamset-hareer.rashx.org
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                      متاح للحجز
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-ink-muted px-1">
                    <span className="font-bold text-dusty-blue">1. الخدمة ✓</span>
                    <span className="font-bold text-dusty-blue">2. الأخصائية ✓</span>
                    <span className="font-bold text-ink">3. الموعد</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                    <div className="flex items-center justify-between font-bold text-[11px]">
                      <span>قص وتصفيف الشعر الاحترافي</span>
                      <span className="text-dusty-blue font-mono">180 ر.س</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-ink-muted">
                      <Clock className="w-3 h-3" />
                      <span>المدة: 45 دقيقة</span>
                      <span>•</span>
                      <span>الخبيرة: سارة العتيبي</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-bold text-[10px] block text-ink">
                      اختر الوقت المتاح (الخميس 12 نوفمبر):
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      <button type="button" className="p-2 rounded-lg bg-mist-gray/40 text-[10px] text-ink-muted line-through">
                        3:30 م
                      </button>
                      <button type="button" className="p-2 rounded-lg bg-dusty-blue text-black font-bold text-[10px] shadow-2xs">
                        4:30 م ✓
                      </button>
                      <button type="button" className="p-2 rounded-lg bg-[#FAFBFB] border border-mist-gray text-[10px] text-ink hover:bg-mist-gray/40">
                        5:30 م
                      </button>
                      <button type="button" className="p-2 rounded-lg bg-[#FAFBFB] border border-mist-gray text-[10px] text-ink hover:bg-mist-gray/40">
                        6:30 م
                      </button>
                      <button type="button" className="p-2 rounded-lg bg-[#FAFBFB] border border-mist-gray text-[10px] text-ink hover:bg-mist-gray/40">
                        7:15 م
                      </button>
                      <button type="button" className="p-2 rounded-lg bg-[#FAFBFB] border border-mist-gray text-[10px] text-ink hover:bg-mist-gray/40">
                        8:00 م
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-mist-gray">
                    <div className="p-2 rounded-lg bg-[#FAFBFB] border border-mist-gray text-[10px] flex items-center justify-between">
                      <span className="text-ink-muted">رقم الجوال:</span>
                      <span className="font-mono font-bold" dir="ltr">054 808 2945</span>
                    </div>

                    <button
                      type="button"
                      className="w-full py-2.5 rounded-xl bg-dusty-blue text-black font-bold text-[11px] shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تأكيد الحجز الفوري (بدون تطبيق)</span>
                    </button>

                    <div className="text-[9px] text-center text-ink-muted">
                      🔒 سيصلك تأكيد الموعد فورًا عبر الواتساب
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mockup 2: Admin Dispatcher Board & Calendar */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl bg-white p-6 sm:p-8 border border-mist-gray shadow-md space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-mist-gray">
                  <div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-dusty-blue" />
                      <h3 className="text-base font-bold text-ink">
                        لوحة تحكم وتوزيع المواعيد (Admin Dispatcher Board)
                      </h3>
                    </div>
                    <p className="text-xs text-ink-muted mt-0.5">
                      عرض جدول الصالون اللحظي مقسمًا حسب مقدمي الخدمة وفترات التعقيم
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-mist-gray text-ink font-bold">
                      الخميس 12 نوفمبر
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      مؤتمت بالكامل
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink-muted pt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>مؤكد</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    <span>جاري التنفيذ</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>في الانتظار</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-mist-gray-dark border border-mist-gray" />
                    <span>وقت تعقيم وتجهيز (Buffer)</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="rounded-2xl bg-[#FAFBFB] p-3 border border-mist-gray space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-mist-gray">
                      <span className="font-bold text-ink">سارة العتيبي</span>
                      <span className="text-[10px] text-ink-muted">كرسي 1</span>
                    </div>

                    <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span>4:00 - 4:45 م</span>
                        <span>جاري التنفيذ</span>
                      </div>
                      <div className="font-bold text-[11px]">صبغة شعر كاملة VIP</div>
                      <div className="text-[10px] text-sky-800">العميلة: ريم العبدالله</div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-mist-gray/40 border border-dashed border-mist-gray text-center text-[9px] text-ink-muted">
                      15 دقيقة تعقيم وتنظيف الأدوات (Buffer)
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span>5:00 - 5:45 م</span>
                        <span>مؤكد (أونلاين)</span>
                      </div>
                      <div className="font-bold text-[11px]">قص وتصفيف الشعر</div>
                      <div className="text-[10px] text-emerald-800">العميلة: نورة السبيعي</div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#FAFBFB] p-3 border border-mist-gray space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-mist-gray">
                      <span className="font-bold text-ink">منى القحطاني</span>
                      <span className="text-[10px] text-ink-muted">جناح VIP</span>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span>4:30 - 6:00 م</span>
                        <span>مؤكد (مدفوع عربون)</span>
                      </div>
                      <div className="font-bold text-[11px]">مكياج سهرة كامل</div>
                      <div className="text-[10px] text-emerald-800">العميلة: مشاعل الحربي</div>
                    </div>

                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span>6:30 - 7:15 م</span>
                        <span>في الانتظار</span>
                      </div>
                      <div className="font-bold text-[11px]">تنظيف بشرة هيدرافيشل</div>
                      <div className="text-[10px] text-amber-800">العميلة: هند الدوسري</div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#FAFBFB] p-3 border border-mist-gray space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-mist-gray">
                      <span className="font-bold text-ink">لطيفة الدوسري</span>
                      <span className="text-[10px] text-ink-muted">محطة الأظافر</span>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span>4:00 - 5:00 م</span>
                        <span>مؤكد</span>
                      </div>
                      <div className="font-bold text-[11px]">بديكير ومنيكير سبا باللافندر</div>
                      <div className="text-[10px] text-emerald-800">العميلة: عبير الشهري</div>
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-emerald-300 border-dashed text-center space-y-1">
                      <span className="text-[10px] text-emerald-700 font-bold block">
                        فترة شاغرة متاحة للحجز
                      </span>
                      <span className="text-[9px] text-ink-muted">5:00 - 6:00 م (متاحة أونلاين)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>محرك منع التعارض نشط: لا يمكن حجز نفس الموظفة أو الكرسي في وقت واحد</span>
                  </div>
                  <span className="font-bold text-[11px]">حماية 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: The 6 Functional Pillars */}
        <div className="mb-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'المميزات الوظيفية المتكاملة' : 'Core Booking Capabilities'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr ? 'كل ما تحتاجه لإدارة حجوزات صالونك باحترافية' : 'Everything You Need for Seamless Scheduling'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'منظومة تجمع بين راحة العميل ودقة المتابعة التشغيلية لمنع تضارب المواعيد'
                : 'Engineered for customer convenience, staff clarity, and zero double booking'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingModules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white p-6 sm:p-7 border border-mist-gray shadow-xs hover:border-dusty-blue hover:shadow-md transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-mist-gray/70 border border-mist-gray flex items-center justify-center text-ink group-hover:bg-dusty-blue group-hover:text-black transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-ink">
                    {isAr ? mod.titleAr : mod.titleEn}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {isAr ? mod.descAr : mod.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: FAQs */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xs mb-16 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink-muted text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'إجابات مباشرة' : 'Direct Answers'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              {isAr ? 'الأسئلة الشائعة حول نظام الحجوزات' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'إجابات شفافة وواضحة عن كيفية عمل نظام الحجوزات دون أي وعود غير مؤكدة'
                : 'Clear and transparent facts about our scheduling and booking system'}
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto pt-4">
            {bookingFaqs.map((faq, idx) => (
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

        {/* Section 5: Closing CTA */}
        <div className="rounded-3xl bg-ink text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'أوقف فوضى المواعيد اليوم' : 'Stop Appointment Chaos Today'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {isAr
                ? 'جاهز لتنظيم جدول صالونك وملء مقاعده بحجوزات مؤكدة؟'
                : 'Ready to Fill Your Salon Chairs with Confirmed Bookings?'}
            </h2>

            <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
              {isAr
                ? 'شاهد عمليًا كيف يعمل نظام الحجوزات والمواعيد على نوع نشاطك خلال جلسة عرض تجريبي حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا بدون بطاقة بنكية.'
                : 'See our smart appointment scheduling engine live on your facility workflow in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                  ? 'مرحبًا راش إكس، أود تجربة نظام حجز المواعيد ومعرفة تفاصيل ربطه بصالوني.'
                  : 'Hello RashX, I would like to explore the appointment booking system for my salon.'
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
