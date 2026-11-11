import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Sparkles,
  CalendarCheck,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  ArrowLeft,
  Scissors,
  Crown,
  Lock,
  Gift,
  Star,
  MessageSquare,
  DollarSign,
  Percent,
  Layers,
  Store,
  BadgeCheck,
  Heart,
  CalendarDays,
  Smartphone,
  AlertCircle,
  UserCheck,
  TrendingUp,
  Boxes,
  Truck,
  Stethoscope,
  Activity,
  FileText,
  Zap,
  ClipboardCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getFAQPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface FacilityPageProps {
  params: Promise<{ locale: string; type: string }>;
}

const SUPPORTED_FACILITY_TYPES = [
  'beauty-salons',
  'barbershops',
  'spas',
  'clinics',
];

export async function generateStaticParams() {
  const params: { locale: string; type: string }[] = [];
  for (const locale of LOCALES) {
    for (const type of SUPPORTED_FACILITY_TYPES) {
      params.push({ locale, type });
    }
  }
  return params;
}

export async function generateMetadata({ params }: FacilityPageProps): Promise<Metadata> {
  const { locale: rawLocale, type } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  if (type === 'beauty-salons') {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج متكامل للصالونات النسائية والمشاغل | RashX'
        : 'Comprehensive Beauty Salons & Studios Software | RashX',
      description: isAr
        ? 'برنامج صالون نسائي ونظام إدارة مشغل نسائي ذكي. تنظيم الحجوزات المزدحمة، باقات العرائس، عمولات المختصات، وتذكيرات واتساب مع خصوصية تامة لبيانات العميلات.'
        : 'All-in-one salon software for beauty salons and studios in Saudi Arabia. Manage peak seasons, bridal bundles, specialist commissions, and strict client privacy.',
      keywords: [
        'برنامج صالون نسائي',
        'نظام إدارة مشغل نسائي',
        'برنامج مشاغل نسائية',
        'تنظيم حجوزات المشاغل',
        'باقات عرايس صالون',
        'برنامج كوافيرات السعودية',
      ],
      pathname: `/for/${type}`,
      noIndex: false,
    });
  }

  if (type === 'barbershops') {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج حلاق ونظام إدارة صالونات الحلاقة الرجالية | RashX'
        : 'Barbershop & Men Grooming Management Software | RashX',
      description: isAr
        ? 'برنامج حلاق ونظام حجز صالون رجالي سريع. تنظيم الدور وتقليل الانتظار، إدارة كراسي الحلاقة والعمولات، كاشير سريع، وباقات اشتراك شهرية متوافقة مع ZATCA.'
        : 'Fast barbershop POS & chair queue management software. Streamline walk-in queues, barber commissions, monthly grooming passes, and ZATCA e-invoicing.',
      keywords: [
        'برنامج حلاق',
        'نظام حجز صالون رجالي',
        'كاشير صالون حلاقة',
        'إدارة كراسي الحلاقة',
        'برنامج صالون رجالي السعودية',
      ],
      pathname: `/for/${type}`,
      noIndex: false,
    });
  }

  if (type === 'spas') {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج مراكز التجميل والسبا متعددة الخدمات | RashX'
        : 'Multi-Service Beauty Centers & Spa Management Software | RashX',
      description: isAr
        ? 'برنامج مراكز تجميل ونظام إدارة سبا متكامل. جدولة الخدمات المتعددة، باقات الجلسات، إدارة الفروع والمخزون، تقارير KPIs، ودعم الفوترة الإلكترونية ZATCA.'
        : 'Enterprise beauty center & spa software. Multi-service scheduling, recurring session packages, multi-branch control, backbar recipes, and ZATCA compliance.',
      keywords: [
        'برنامج مراكز تجميل',
        'نظام إدارة سبا',
        'برنامج سبا ومساج',
        'إدارة مراكز التجميل المتعددة الفروع',
        'حجوزات باقات السبا',
      ],
      pathname: `/for/${type}`,
      noIndex: false,
    });
  }

  if (type === 'clinics') {
    return generatePageMetadata({
      locale,
      title: isAr
        ? 'برنامج إدارة عيادات ومجمعات التجميل والجلدية | RashX'
        : 'Medical Aesthetic & Beauty Clinics Software | RashX',
      description: isAr
        ? 'نظام إدارة عيادات تجميل ذكي. جدولة الأطباء والأخصائيين، حجز أجهزة الليزر، ملفات المرضى السرية، وفواتير إلكترونية متوافقة مع الأنظمة السعودية.'
        : 'Precision aesthetic clinic management. Device and room allocation, medical consent notes, specialist rotas, and ZATCA compliance.',
      keywords: [
        'برنامج عيادات تجميل',
        'نظام مجمعات التجميل والجلدية',
        'إدارة مواعيد أجهزة الليزر',
      ],
      pathname: `/for/${type}`,
      noIndex: false,
    });
  }

  return generatePageMetadata({
    locale,
    title: isAr
      ? `حلول راش إكس للأنشطة التجميلية | ${type}`
      : `RashX Facility Solutions | ${type}`,
    description: isAr
      ? 'منظومة سحابية متخصصة لإدارة مختلف أنواع المنشآت التجميلية في المملكة العربية السعودية.'
      : 'Tailored cloud salon and spa management platform in Saudi Arabia.',
    pathname: `/for/${type}`,
    noIndex: false,
  });
}

export default async function FacilityTypePage({ params }: FacilityPageProps) {
  const { locale: rawLocale, type } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  if (!SUPPORTED_FACILITY_TYPES.includes(type)) {
    notFound();
  }

  const isBeautySalons = type === 'beauty-salons';
  const isBarbershops = type === 'barbershops';
  const isSpas = type === 'spas';
  const isClinics = type === 'clinics';

  const typeName = isBeautySalons
    ? isAr ? 'الصالونات النسائية والمشاغل' : 'Beauty Salons & Studios'
    : isBarbershops
    ? isAr ? 'الصالونات الرجالية ومراكز الحلاقة' : 'Barbershops & Grooming'
    : isSpas
    ? isAr ? 'مراكز التجميل والسبا' : 'Beauty Centers & Spas'
    : isAr ? 'مجمعات وعيادات التجميل' : 'Beauty & Aesthetic Clinics';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'الحلول والأنشطة' : 'Solutions', item: `/${locale}/features` },
    { name: typeName, item: `/${locale}/for/${type}` },
  ];

  /* =========================================================================
     1. BEAUTY SALONS DATA (صالونات نسائية ومشاغل)
     ========================================================================= */
  const beautySalonsFaqs = [
    {
      question: isAr
        ? 'كيف يساعد النظام في ضبط الازدحام ومنع الفوضى في ليلة العيد ومواسم الزواجات؟'
        : 'How does RashX eliminate chaos during Eid rushes and wedding peak seasons?',
      answer: isAr
        ? 'يوفر النظام محركاً ذكياً لإدارة مواسم الذروة يتيح لك: تحديد سقف المواعيد لكل ساعة، اشتراط دفع عربون تأكيد إلكتروني، تفعيل قائمة الانتظار الذكية لتعويض الإلغاءات فورياً، وتمديد ساعات الورديات في العشر الأواخر من رمضان لتوزيع الإقبال بانسيابية تامة.'
        : 'Our peak season engine limits hourly appointments, enforces automated online deposits, activates a dynamic waitlist to backfill cancellations, and extends late-night shift rotas during Ramadan for smooth salon flow.',
    },
    {
      question: isAr
        ? 'هل يمكن تنظيم باقات العرائس متعددة الجلسات على مدار عدة أسابيع؟'
        : 'Can we configure multi-session bridal packages spanning several weeks?',
      answer: isAr
        ? 'نعم بكل تأكيد. يمكنك إنشاء باقة عروس مجمعة تتضمن جلسات العناية بالبشرة والشعر قبل أسبوعين، الحمام الملكي قبل الزفاف بيومين، ومكياج وتسريحة يوم الزفاف، مع حجز الغرف وتخصيص الخبيرات تلقائياً لكل موعد.'
        : 'Yes. You can build comprehensive bridal suites spanning pre-wedding skincare 2 weeks prior, royal baths 2 days prior, and wedding-day hair and makeup, with automated room and stylist reservation locks.',
    },
    {
      question: isAr
        ? 'كيف تُحتسب عمولات خبيرات المكياج وتصفيف الشعر عند الاشتراك في باقة واحدة؟'
        : 'How are specialist commissions split when multiple beauticians execute one bundle?',
      answer: isAr
        ? 'يتعامل النظام بذكاء فائق مع تجزئة العمولات؛ حيث يوزع قيمة الباقة على الخدمات الفرعية بدقة، ليحصل مصفف الشعر على نسبته المحددة وتأخذ خبيرة المكياج نسبتها تلقائياً فور إغلاق الفاتورة دون أي تداخل أو حساب يدوي.'
        : 'The commission engine automatically splits bundled service values: the hair stylist receives their designated percentage and the makeup artist receives theirs upon checkout, eliminating disputes.',
    },
    {
      question: isAr
        ? 'هل يضمن النظام عدم تسريب أو اطلاع الموظفات على أرقام هواتف العميلات وسجلاتهن؟'
        : 'Does the system protect client phone numbers and styling histories from staff leaks?',
      answer: isAr
        ? 'نعم، نطبق نظام صلاحيات وأدوار مشدد يتوافق مع نظام حماية البيانات الشخصية السعودي (PDPL)؛ حيث تُحجب أرقام الهواتف عن شاشات الموظفات (تظهر فقط كـ 050••••89)، مع منع تصدير جهات الاتصال إلا للمالك فقط، وتشفير كافة الملاحظات الفنية.'
        : 'Yes. In strict compliance with Saudi PDPL, phone numbers are masked on staff interfaces, customer contact exports are locked exclusively to the salon owner, and all personal styling notes are encrypted.',
    },
    {
      question: isAr
        ? 'هل يدعم المشغل تحصيل مبالغ مقدمة (عربون) لتأكيد حجوزات المواسم؟'
        : 'Can we collect advance deposits to confirm peak-season appointments?',
      answer: isAr
        ? 'نعم، يمكنك تفعيل ميزة العربون الإلكتروني عبر روابط دفع سريعة (مدى أو Apple Pay) عند الحجز عبر موقع الصالون أو تطبيق العميل، مع خصم العربون تلقائياً من الفاتورة النهائية عند المحاسبة على الكاشير.'
        : 'Yes, configure mandatory online booking deposits via Mada or Apple Pay on your facility booking site and client PWA. The deposit is automatically credited to the final invoice at checkout.',
    },
    {
      question: isAr
        ? 'هل يحتاج المشغل النسائي لشراء أجهزة معقدة أم يعمل على أجهزة الآيباد الحالية؟'
        : 'Does our salon need proprietary hardware, or does it work on our existing iPads?',
      answer: isAr
        ? 'يعمل راش إكس كنظام سحابي مرن على كافة الأجهزة الحالية: أجهزة الآيباد، أجهزة التابلت، اللابتوب، وجوالات الخبيرات، مع توافق كامل مع طابعات الفواتير الحرارية، كاشيرات اللمس، وقارئات الباركود المتوفرة في السوق السعودي.'
        : 'RashX is a responsive cloud platform running seamlessly on your existing iPads, Android tablets, laptops, and staff smartphones, compatible with standard Bluetooth/USB thermal receipt printers.',
    },
  ];

  const beautySalonsPillars = [
    {
      icon: CalendarCheck,
      titleAr: 'الحجز المسبق وإدارة مواسم الذروة (رمضان والأعياد)',
      titleEn: 'Advance Booking & Ramadan / Eid Peak Queue Engine',
      descAr:
        'تنظيم تدفق العميلات في ليلة العيد ومواسم الزواجات، مع تحديد سقف الإشغال لكل ساعة، وفرض عربون الحجز، وتفعيل قائمة الانتظار الذكية لتعويض الإلغاءات.',
      descEn:
        'Control client surges during Eid and wedding seasons with hourly capacity limits, mandatory booking deposits, and automated waitlist backfilling.',
    },
    {
      icon: Crown,
      titleAr: 'هندسة باقات العرائس والخدمات المجمعة متعددة الجلسات',
      titleEn: 'Multi-Session Bridal Suites & Luxury Packages',
      descAr:
        'جدولة متكاملة لبرنامج العروس قبل الزفاف بأسابيع (بشرة، شعر، سبا، مكياج)، مع تثبيت غرف الخدمة الخاصة وتوزيع المواعيد تلقائياً دون تضارب.',
      descEn:
        'Comprehensive multi-week bridal treatment itineraries coordinating skincare, hair repair, royal baths, and wedding-day glam effortlessly.',
    },
    {
      icon: Users,
      titleAr: 'إدارة المختصات وتوزيع الورديات وحساب العمولات بدقة',
      titleEn: 'Specialist Shift Rotas & Transparent Commissions',
      descAr:
        'احتساب فوري لعمولة كل خبيرة تجميل ومصففة شعر فور إغلاق الفاتورة، مع دعم العمولات المتدرجة، وحصص مبيعات المنتجات، ومسيرات رواتب منضبطة تمنع الخلافات.',
      descEn:
        'Instant commission allocation per specialist upon checkout with tier thresholds, retail sales incentives, and dispute-free payroll summaries.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'خصوصية مشددة وسرية تامة لبيانات العميلات (PDPL)',
      titleEn: 'Strict Saudi PDPL Privacy & Confidential Treatment Records',
      descAr:
        'حجب أرقام هواتف العميلات عن طاقم العمل، ومنع تصدير قوائم العملاء إلا للمالك، مع تشفير سجلات الحساسية وملاحظات تركيبات الصبغة داخل نطاق معزول.',
      descEn:
        'Masked client phone numbers on staff screens, restricted data exports, and encrypted hair color formulas aligned with Saudi PDPL privacy regulations.',
    },
    {
      icon: MessageSquare,
      titleAr: 'إشعارات وتذكيرات الواتساب التلقائية لتقليص الغياب',
      titleEn: 'Automated WhatsApp Reminders Sashing No-Shows',
      descAr:
        'إرسال تأكيدات المواعيد الفورية مع روابط الموقع الجغرافي للمشغل، ورسائل تذكير قبل الموعد بـ 24 و 3 ساعات مع رابط سريع للتأكيد أو إعادة الجدولة.',
      descEn:
        'Automated branded WhatsApp confirmations, Google Maps location pins, and scheduled reminders slashing costly no-shows by up to 70%.',
    },
    {
      icon: Gift,
      titleAr: 'برامج الولاء والمكافآت وتكرار زيارات العميلات',
      titleEn: 'Tailored Female Client Loyalty & Repeat Perks',
      descAr:
        'منح نقاط ولاء على كل ريال يُنفق، مكافآت أعياد الميلاد الحصرية، وترقية العميلات الدائمات لمستويات VIP تمنحهن أولوية الحجز وخدمات الضيافة الملكية.',
      descEn:
        'Rewarding frequent visitors with redeemable points per SAR spent, birthday vouchers, and VIP upgrades offering priority salon chair booking.',
    },
  ];

  /* =========================================================================
     2. BARBERSHOPS DATA (صالونات رجالية ومراكز حلاقة)
     ========================================================================= */
  const barbershopFaqs = [
    {
      question: isAr
        ? 'كيف يوفق النظام بين الزبائن المباشرين بدون موعد (Walk-ins) والمواعيد المحجوزة مسبقاً؟'
        : 'How does the system balance walk-in customers with pre-booked appointments?',
      answer: isAr
        ? 'يدمج راش إكس طابور الانتظار المباشر مع الحجوزات الذكية بانسيابية؛ حيث يحجز النظام أوقات المواعيد المسبقة آلياً على كراسي الحلاقين المحددين، مع توزيع الزبائن المباشرين فور وصولهم على الكراسي المتاحة وعرض وقت الانتظار المتوقع على الشاشة.'
        : 'RashX unifies walk-in queues and online appointments seamlessly: reserved slots lock on specific barber chairs, while walk-ins are dynamically distributed to next available chairs with live wait-time displays.',
    },
    {
      question: isAr
        ? 'هل يمكن تحديد نسب عمولات مختلفة لكل حلاق بحسب خبرته وسنوات عمله؟'
        : 'Can we set distinct commission percentages per barber based on seniority?',
      answer: isAr
        ? 'نعم بكل تأكيد. يتيح لك النظام ضبط هيكل عمولات مرن لكل حلاق؛ سواء كنسبة مئوية من إجمالي خدماته، أو مبالغ مقطوعة على خدمات معينة (مثل المعالجات والصبغات)، مع احتساب عمولات منفصلة على مبيعات منتجات العناية باللحية والشعر.'
        : 'Yes, absolutely. Configure customizable commission structures per barber: tiered percentages, fixed-fee incentives per treatment (e.g. hair coloring or facials), and separate incentives for retail grooming sales.',
    },
    {
      question: isAr
        ? 'كيف تزيد الباقات والاشتراكات الشهرية من أرباح واستقرار صالون الحلاقة؟'
        : 'How do monthly grooming passes increase barbershop revenue and retention?',
      answer: isAr
        ? 'تضمن الاشتراكات الشهرية (مثل باقة 4 حلاقات ذقن شهرياً) تدفقاً مالياً نقدياً ثابتاً ومسبق الدفع لصالونك، كما تضمن ولاء الزبون وتردده الأسبوعي المنتظم، مع خصم الجلسات بضغطة زر واحدة على الكاشير ومتابعة الرصيد المتبقي.'
        : 'Prepaid monthly grooming memberships provide predictable upfront cash flow and secure regular weekly client visits. Sessions are deducted with a single tap on the POS, with automatic renewal reminders.',
    },
    {
      question: isAr
        ? 'هل يدعم كاشير راش إكس متطلبات الفوترة الإلكترونية ZATCA للمحلات الرجالية؟'
        : 'Does the POS support ZATCA e-invoicing Phase 2 for barbershops?',
      answer: isAr
        ? 'تدعم راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة ومتطلبات هيئة الزكاة والضريبة والجمارك، مع طباعة الفواتير الضريبية المبسطة المزودة برمز الاستجابة السريعة (QR) في أقل من 5 ثوانٍ.'
        : 'RashX supports ZATCA Phase 2 e-invoicing requirements in accordance with your facility integration tier, printing compliant simplified tax receipts with dynamic cryptographic QR codes in under 5 seconds.',
    },
    {
      question: isAr
        ? 'كيف تعمل شاشة الدور الذكية، وهل يحتاج الزبون للبقاء جالساً داخل الصالون؟'
        : 'How does the digital queue work, and does the client need to sit in the waiting area?',
      answer: isAr
        ? 'لا يحتاج الزبون للانتظار داخل الصالون في أوقات الزحام؛ حيث يحصل على تذكرة دور رقمية عبر جواله، ويستطيع متابعة ترتيبه إلكترونياً، مع إرسال رسالة واتساب تنبيهية تلقائية قبل حلول دوره بـ 10 دقائق ليعود مباشرة إلى كرسي الحلاقة.'
        : 'Clients do not need to wait inside crowded lobbies. They receive a digital queue ticket on their phone, track their real-time turn, and receive automated WhatsApp alerts 10 minutes before their chair is ready.',
    },
    {
      question: isAr
        ? 'هل يمكن بيع مستحضرات العناية والشعر (Retail) وإضافتها على نفس فاتورة الحلاقة؟'
        : 'Can we sell styling products and retail grooming items on the same haircut receipt?',
      answer: isAr
        ? 'نعم، يدعم كاشير اللمس مسح باركود منتجات التصفيف، زيوت اللحية، ومثبتات الشعر، وإضافتها فوراً لفاتورة الحلاقة، مع خصمها آلياً من رصيد المستودع واحتساب عمولة البيع للحلاق الذي رشح المنتج.'
        : 'Yes, scan barcodes for pomades, beard oils, and shampoos directly onto the service invoice, automatically deducting stock balances and crediting retail commissions to the recommending barber.',
    },
  ];

  const barbershopPillars = [
    {
      icon: Clock,
      titleAr: 'سرعة الحجز وإدارة الدور وتقليل وقت الانتظار',
      titleEn: 'Fast Chair Booking, Queue Control & Zero Wait Time',
      descAr:
        'دمج ذكي بين الزبائن المباشرين (Walk-in) والمواعيد المسبقة، مع شاشة دور تفاعلية وتنبيهات واتساب قبل الدور بـ 10 دقائق لتفريغ صالة الانتظار.',
      descEn:
        'Unified handling of walk-ins and pre-booked clients with interactive queue boards and automated 10-minute WhatsApp chair alerts.',
    },
    {
      icon: Scissors,
      titleAr: 'إدارة كراسي الحلاقة ومسيرات عمولات الحلاقين',
      titleEn: 'Barber Chair Turnover & Transparent Commissions',
      descAr:
        'تتبع إنتاجية كل كرسي وحلاق لحظياً، واحتساب العمولات آلياً بنسب مئوية أو مبالغ ثابتة لكل خدمة، مع تقارير مسيرات أسبوعية ويومية بدون خلافات.',
      descEn:
        'Real-time chair productivity tracking, automated tier-based commission splits, and transparent payroll summaries eliminating disputes.',
    },
    {
      icon: BadgeCheck,
      titleAr: 'كاشير لمس فائق السرعة وفواتير ZATCA الإلكترونية',
      titleEn: 'Ultra-Fast Touch POS & ZATCA QR Invoicing',
      descAr:
        'إنهاء الفاتورة وطباعة إيصال الفوترة الإلكترونية الضريبي برمز QR في أقل من 5 ثوانٍ، مع دعم الدفع السريع عبر مدى، Apple Pay، وتجزئة الحساب.',
      descEn:
        'Checkout in under 5 seconds with ZATCA Phase 2 compliant QR code receipts, split billing, Mada, and contactless Apple Pay support.',
    },
    {
      icon: Layers,
      titleAr: 'الاشتراكات الشهرية وباقات العناية الدورية مسبقة الدفع',
      titleEn: 'Prepaid Monthly Grooming Passes & Memberships',
      descAr:
        'بيع باقات حلاقة شهرية (مثل 4 جلسات ذقن و2 قص شعر) تضمن تدفقاً نقدياً مقدماً للصالون، مع خصم الجلسات بضغطة زر وتتبع الرصيد المتبقي.',
      descEn:
        'Sell recurring monthly passes providing upfront cash flow, with effortless one-tap session deductions at the register.',
    },
    {
      icon: Gift,
      titleAr: 'برامج الولاء ونقاط الاسترداد للزبائن الدائمين',
      titleEn: 'Loyalty Rewards & Frequent Client Retention',
      descAr:
        'منح نقاط ولاء على كل حلاقة يستبدلها الزبون بخصومات أو خدمات مجانية، مما يضمن ارتباط الزبون بكرسي صالونك وعدم ذهابه للمنافسين.',
      descEn:
        'Cashback points on every haircut redeemable for complimentary services or discounts, turning casual clients into devoted regulars.',
    },
    {
      icon: Store,
      titleAr: 'إدارة المخزون ومستلزمات الحلاقة ومبيعات التجزئة',
      titleEn: 'Shaving Supplies Control & Retail Barcode Sales',
      descAr:
        'تتبع استهلاك الشفرات والمعقمات وكريمات الحلاقة، مع بيع منتجات اللحية والشعر بالباركود وإضافتها مباشرة على فاتورة العميل.',
      descEn:
        'Barcode inventory auditing for backbar blades and sanitizers, with instant retail add-ons for pomades, waxes, and beard oils.',
    },
  ];

  /* =========================================================================
     3. SPAS & BEAUTY CENTERS DATA (مراكز التجميل والسبا)
     ========================================================================= */
  const spaFaqs = [
    {
      question: isAr
        ? 'كيف يتعامل النظام مع تباين مدد الجلسات وتجهيز الغرف (Buffer Times)؟'
        : 'How does the system handle varied session durations and room turnaround buffers?',
      answer: isAr
        ? 'يتيح راش إكس ضبط مدة كل خدمة بدقة (مثل مساج 60 دقيقة، حمام مغربي 90 دقيقة)، مع إضافة وقت فاصل تلقائي (Buffer Time) قابل للتخصيص (مثل 15 دقيقة) بعد كل موعد لتنظيف الغرفة، تعقيم الأدوات، وتبديل الشراشف دون أي تداخل في الحجوزات.'
        : 'RashX configures exact service durations (e.g. 60-min massage, 90-min Moroccan bath) with automatic customizable buffer periods (e.g. 15 mins) appended to every session for suite sanitization and linen prep.',
    },
    {
      question: isAr
        ? 'كيف تدار باقات الجلسات المجمعة والاشتراكات الدورية في مراكز التجميل والسبا؟'
        : 'How are multi-session bundles and recurring spa memberships managed?',
      answer: isAr
        ? 'يمكنك إنشاء باقات مجمعة (مثل باقة 6 جلسات مساج أو 4 جلسات تنظيف بشرة) يدفع العميل قيمتها مقدماً. يقوم النظام بتتبع الرصيد المتبقي بدقة، وخصم الجلسة بضغطة زر عند الزيارة، مع إرسال إشعار فوري برصيد الجلسات المتبقية وتاريخ الصلاحية.'
        : 'Create prepaid multi-visit packages (e.g. 6-session massage pass). The system tracks remaining sessions, allows one-tap checkout redemption, and sends automated WhatsApp balance updates.',
    },
    {
      question: isAr
        ? 'هل يدعم النظام إدارة سلاسل مراكز التجميل والفروع المتعددة بحساب موحد؟'
        : 'Does the platform support multi-branch beauty center chains and franchises?',
      answer: isAr
        ? 'نعم بكل تأكيد. تمنحك راش إكس لوحة تحكم مركزية (Multi-Branch Dashboard) لمراقبة إيرادات كافة الفروع، مقارنة الأداء ومعدلات الإشغال، وإدارة تنقل الموظفين بين الفروع بصلاحيات وصول مخصصة لكل مدير فرع.'
        : 'Yes, absolutely. Centralized multi-branch control lets enterprise owners monitor cross-location revenues, benchmark room occupancy, and transfer therapists across branches with branch-isolated manager permissions.',
    },
    {
      question: isAr
        ? 'كيف يضبط النظام استهلاك الزيوت ومواد السبا المستهلكة (Backbar)؟'
        : 'How does the system control backbar spa supplies and massage oils consumption?',
      answer: isAr
        ? 'يربط النظام كل خدمة ببطاقة وصفة استهلاك المواد (Recipe)؛ فعند إتمام جلسة المساج أو الحمام المغربي، يُخصم الحجم المحدد من الزيوت أو الصابون أو الأقنعة آلياً من المستودع، مع تنبيه الإدارة فور وصول أي صنف لحد إعادة الطلب لمنع الهدر والسرقة.'
        : 'Each treatment links to a backbar consumption recipe: upon checkout, exact amounts of essential oils, Moroccan soaps, and clays are deducted automatically from stock, triggering low-stock replenishment alerts.',
    },
    {
      question: isAr
        ? 'ما هي مؤشرات الأداء والتقارير (KPIs) التي يوفرها النظام للإدارة العليا؟'
        : 'What executive KPIs and analytics does RashX provide for spa management?',
      answer: isAr
        ? 'توفر راش إكس تقارير لحظية تشمل: معدل دوران وإشغال الغرف والأجنحة، إنتاجية وعمولات كل أخصائي ومعالج، متوسط قيمة الفاتورة، الخدمات الأعلى ربحية، ساعات الذروة والركود، وتقارير الإقرار الضريبي الجاهزة لـ ZATCA.'
        : 'Real-time executive dashboards report suite occupancy rates, therapist billable hours, average ticket size, top-margin treatments, peak vs off-peak hours, and instant ZATCA tax filings.',
    },
    {
      question: isAr
        ? 'هل يدعم النظام الفوترة الإلكترونية ZATCA وتجزئة الفواتير بطرق دفع متعددة؟'
        : 'Does the system support ZATCA Phase 2 e-invoicing and split payments?',
      answer: isAr
        ? 'تدعم راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة، مع دعم تجزئة الفاتورة بين مدى، Apple Pay، مبالغ نقدية، ونقاط مكافآت أو قسائم هدايا على نفس الفاتورة بسلاسة تامة.'
        : 'RashX supports ZATCA Phase 2 compliance, printing QR-encoded simplified tax invoices and facilitating split payments across credit cards, Apple Pay, cash, and loyalty wallet credits on a single invoice.',
    },
  ];

  const spaPillars = [
    {
      icon: Clock,
      titleAr: 'الخدمات المتعددة والمدد المتفاوتة مع أوقات التعقيم الآلية',
      titleEn: 'Multi-Duration Scheduling & Automatic Sanitation Buffers',
      descAr:
        'إدارة دقيقة لجلسات متباينة (30، 45، 60، 90، 120 دقيقة) مع إضافة أوقات فاصلة تلقائية (Buffer Time) لتعقيم الغرف وتجهيز الزيوت دون تداخل.',
      descEn:
        'Precision scheduling for treatments from 30 to 120 minutes with automated buffer intervals for suite sanitation, linen swaps, and prep.',
    },
    {
      icon: Layers,
      titleAr: 'باقات الجلسات المجمعة والاشتراكات الدورية مسبقة الدفع',
      titleEn: 'Prepaid Multi-Session Bundles & Recurring Memberships',
      descAr:
        'هندسة باقات استجمام دورية (مثل باقة 6 جلسات مساج أو 4 حمام مغربي) تؤمّن سيولة نقدية مقدماً مع خصم الجلسات بالكاشير وتتبع الرصيد المتبقي.',
      descEn:
        'Create bundled wellness passes and monthly memberships providing upfront revenue, with seamless 1-tap checkout deductions.',
    },
    {
      icon: Store,
      titleAr: 'إدارة الفروع المتعددة وحوكمة الصلاحيات المركزية',
      titleEn: 'Multi-Branch Governance & Enterprise Permissions',
      descAr:
        'لوحة تحكم تنفيذية موحدة لمراقبة ومقارنة كافة فروع مراكز التجميل والسبا، وإدارة تنقل الكوادر والمعالجين بصلاحيات دقيقة لكل فرع.',
      descEn:
        'Centralized dashboard for multi-location spa chains, enabling cross-branch therapist dispatching and isolated branch permissions.',
    },
    {
      icon: Boxes,
      titleAr: 'رقابة المستودع ومستلزمات السبا (Backbar) وأوامر الشراء',
      titleEn: 'Backbar Consumption Recipes & Direct Vendor POs',
      descAr:
        'ربط الجلسات بوصفات استهلاك الزيوت ومواد الحمام المغربي والأقنعة، مع خصمها آلياً وتنبيه الإدارة عند وصول المخزون لحد إعادة الطلب.',
      descEn:
        'Automated recipe deductions for essential oils, clays, and scrubs per treatment, with one-click vendor purchase order generation.',
    },
    {
      icon: TrendingUp,
      titleAr: 'لوحات مؤشرات الأداء التنفيذية وتقارير نمو الأرباح (KPIs)',
      titleEn: 'Executive Analytics, Room Turnover & Performance KPIs',
      descAr:
        'تقارير تفصيلية لحظية لمعدل إشغال الأجنحة، إنتاجية المعالجين، متوسط سلة المشتريات، وساعات الذروة لاتخاذ قرارات تسويقية مدروسة.',
      descEn:
        'Real-time metrics on therapy room utilization, therapist earnings, average transaction value, and peak-hour revenue patterns.',
    },
    {
      icon: BadgeCheck,
      titleAr: 'الفوترة الإلكترونية ZATCA وتجزئة طرق الدفع بمرونة',
      titleEn: 'ZATCA Phase 2 E-Invoicing & Flexible Split Tender',
      descAr:
        'فواتير ضريبية مبسطة معتمدة برمز الاستجابة السريعة QR، مع إمكانية تجزئة الحساب بين الشبكة، كاش، Apple Pay، ورصيد نقاط الولاء.',
      descEn:
        'Full ZATCA Phase 2 compatibility, printing instant QR receipts and effortlessly splitting bills across cards, cash, and loyalty balances.',
    },
  ];

  /* =========================================================================
     4. CLINICS & AESTHETIC CENTERS DATA (مجمعات وعيادات التجميل والجلدية)
     ========================================================================= */
  const clinicFaqs = [
    {
      question: isAr
        ? 'كيف يمنع راش إكس تعارض حجز أجهزة الليزر بين الأطباء والأخصائيات؟'
        : 'How does RashX prevent laser device booking conflicts across practitioners?',
      answer: isAr
        ? 'يعتمد النظام خوارزمية الربط الثلاثي المباشر (Tri-Resource Allocation)؛ حيث يشترط تأكيد الموعد توفر الطبيب أو الأخصائية، الجهاز الطبي المطلوب (مثل أجهزة كانديلا أو فوتونا)، وغرفة العلاج المجهزة في نفس التوقيت بدقة. إذا كان الجهاز محجوزاً في غرفة أخرى فلن يسمح النظام بالحجز، مما ينهي تماماً مشكلة الانتظار وتعارض الأجهزة.'
        : 'RashX utilizes a tri-resource allocation algorithm that mandates simultaneous availability of the practitioner, specific medical device (e.g. Candela or Fotona), and treatment suite. If a device is occupied in another room, the slot is locked, eliminating double-bookings completely.',
    },
    {
      question: isAr
        ? 'كيف تدار باقات جلسات التجميل والليزر والمتابعة التلقائية للمتبقي منها؟'
        : 'How are multi-session aesthetic and laser packages managed and tracked?',
      answer: isAr
        ? 'يمكنك إنشاء باقات مخصصة (مثل باقة 6 جلسات ليزر كامل الجسم مع جلسات الرتوش). يتابع النظام استهلاك الجلسات آلياً مع كل زيارة، ويسجل تاريخ كل جلسة والمتبقي وتاريخ انتهاء الصلاحية، مع إرسال تذكير تلقائي عبر واتساب للمراجعة بموعد الجلسة التالية أو موعد الرتوش.'
        : 'Set up customized treatment packages (e.g., 6-session full body laser + complimentary touch-ups). The system logs completed visits, counts down remaining balance, tracks package expiration dates, and triggers automated WhatsApp reminders for upcoming touch-ups.',
    },
    {
      question: isAr
        ? 'كيف يحمي النظام سرية بيانات المرضى والملاحظات الطبية وفق نظام PDPL السعودي؟'
        : 'How does the platform safeguard confidential patient records under Saudi PDPL?',
      answer: isAr
        ? 'تلتزم راش إكس بأعلى معايير نظام حماية البيانات الشخصية السعودي (PDPL)؛ حيث تُعزل قواعد البيانات وتُشفر الملاحظات الطبية وصور الحالات بنظام تشفير بنكي. كما تطبق المنصة نظام صلاحيات صارم (RBAC) يمنع موظفي الاستقبال من الاطلاع على التاريخ الطبي، ويقصر الوصول للملف الطبي على الطبيب المعالج فقط، مع تسجيل سجل تدقيق (Audit Log) لكل عملية فتح ملف.'
        : 'RashX enforces strict Saudi Personal Data Protection Law (PDPL) compliance with tenant data isolation, encrypted clinical notes, and granular role-based access control. Receptionists are restricted from clinical histories, granting viewing privileges strictly to treating practitioners with complete audit trails.',
    },
    {
      question: isAr
        ? 'هل يدعم البرنامج تتبع القطع المستهلكة الطبية (مثل رؤوس الأجهزة والإبر) مع كل جلسة؟'
        : 'Does the software track medical consumables, device tips, and disposable cartridges?',
      answer: isAr
        ? 'نعم، يتيح النظام ربط كل إجراء طبي بقائمة المستهلكات الخاصة به (مثل رؤوس ليزر معينة، إبر فيلر أو بوتوكس، خيوط شد، معقمات). عند إغلاق الفاتورة يُخصم المستهلك مباشرة من مخزن العيادة مع تسجيل رقم التشغيلة (Batch Number) وتاريخ الصلاحية لضمان سلامة المرضى والرقابة المالية.'
        : 'Yes, treatments are linked to consumable usage profiles (e.g. specialized laser tips, aesthetic vials, cannulas). Checkout automatically debits consumables from clinical sub-inventories while logging batch serials and expiry dates for patient safety and cost auditing.',
    },
    {
      question: isAr
        ? 'كيف تُحسب عمولات الأطباء والأخصائيين بعد خصم تكلفة المواد الطبية؟'
        : 'How are doctor and practitioner split-commissions calculated after material deductions?',
      answer: isAr
        ? 'يوفر النظام محرك عمولات مرن يدعم احتساب العمولات كنسبة مئوية أو مبلغ ثابت، مع خيار الخصم المسبق لتكلفة المواد الطبية المستهلكة (Net Revenue Commission) قبل استخراج نصيب الطبيب، مما يضمن دقة وعدالة المحاسبة المالية وشفافيتها بين المركز والكوادر الطبية.'
        : 'A flexible commission engine supports percentage or fixed splits with the option to deduct medical consumable costs prior to payout calculations (Net Revenue Commission), ensuring fair, transparent, and automated financial settlements.',
    },
    {
      question: isAr
        ? 'هل تتوافق فواتير العيادات الطبية في راش إكس مع اشتراطات هيئة الزكاة والضريبة والجمارك (ZATCA)؟'
        : 'Are clinical invoices compliant with Saudi ZATCA e-invoicing Phase 2 regulations?',
      answer: isAr
        ? 'تدعم راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة، مع دعم الفواتير الضريبية المبسطة المزودة برمز QR المشفر، وتصنيف الخدمات وفق المعايير الضريبية السعودية، وتوفير الربط التقني عبر واجهات API المعتمدة لدى الهيئة.'
        : 'RashX supports ZATCA Phase 2 e-invoicing integration in line with facility readiness, generating QR-encoded simplified tax receipts, correctly applying medical VAT exemptions where mandated, and connecting via standard ZATCA APIs.',
    },
  ];

  const clinicPillars = [
    {
      icon: Activity,
      titleAr: 'الربط الثلاثي المتزامن: الطبيب، الجهاز، وغرفة العلاج',
      titleEn: 'Tri-Resource Allocation: Doctor, Laser & Clinical Suite',
      descAr:
        'منع تعارض حجوزات أجهزة الليزر باهظة الثمن والغرف المجهزة من خلال خوارزمية تضمن عدم حجز الجهاز لأكثر من مراجع في نفس اللحظة.',
      descEn:
        'Eliminate laser equipment conflicts and treatment room clashes with automatic 3-way synchronization ensuring optimal device utilization.',
    },
    {
      icon: ClipboardCheck,
      titleAr: 'إدارة باقات الجلسات المتعددة والرتوش وتتبع المتبقي',
      titleEn: 'Multi-Visit Treatment Packages & Touch-Up Balances',
      descAr:
        'هندسة باقات الليزر والعناية (مثل 6 جلسات + رتوش) مع عداد تلقائي للجلسات المتبقية، وتذكيرات واتساب استباقية قبل موعد كل جلسة.',
      descEn:
        'Configure multi-session passes with automated session countdowns, package expiry rules, and proactive WhatsApp touch-up alerts.',
    },
    {
      icon: Lock,
      titleAr: 'سجلات المراجعين السرية وموافقات الإجراءات (PDPL)',
      titleEn: 'Encrypted Health Records, Consents & PDPL Privacy',
      descAr:
        'حفظ الملاحظات الطبية، إعدادات النبضات والجول، والموافقات الرقمية في بيئة سحابية معزولة ومشفرة، مع قصر الاطلاع على الطبيب فقط.',
      descEn:
        'Store clinical parameters, digital consents, and case notes under military-grade encryption with role-based practitioner-only access.',
    },
    {
      icon: Zap,
      titleAr: 'رقابة المستهلكات الطبية ورؤوس الأجهزة وتواريخ الصلاحية',
      titleEn: 'Medical Consumables, Cartridges & Batch Tracking',
      descAr:
        'خصم فوري لرؤوس الليزر، الفيلر، ومستهلكات العيادة مع كل إجراء، مع تتبع أرقام التشغيلات (Batches) وتنبيهات انتهاء الصلاحية.',
      descEn:
        'Real-time deduction of single-use tips, cannulas, and aesthetic consumables per session with batch tracking and expiry warnings.',
    },
    {
      icon: DollarSign,
      titleAr: 'محرك عمولات الأطباء وحساب صافي الإيراد بعد المواد',
      titleEn: 'Doctor Split-Commissions & Net Revenue Calculations',
      descAr:
        'احتساب آلي لعمولات الأطباء والتمريض بنسب دقيقة بعد خصم تكلفة المواد المستهلكة، لتجنب النزاعات المحاسبية في نهاية الشهر.',
      descEn:
        'Automate doctor revenue sharing with customizable rules deducting consumable material expenses before final commission payouts.',
    },
    {
      icon: BadgeCheck,
      titleAr: 'الفوترة الإلكترونية ZATCA وتقارير الإيرادات الطبية',
      titleEn: 'ZATCA Phase 2 E-Invoicing & Clinical Performance KPIs',
      descAr:
        'إصدار فواتير ضريبية فورية متوافقة مع اشتراطات ZATCA، مع لوحات تفصيلية لإيرادات كل جهاز تجميلي وطبيب وغرفة علاج.',
      descEn:
        'Issue compliant ZATCA Phase 2 QR invoices while tracking high-margin medical procedures, doctor performance, and device ROI.',
    },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      <JsonLd
        data={getFAQPageSchema(
          isBeautySalons
            ? beautySalonsFaqs
            : isBarbershops
            ? barbershopFaqs
            : isSpas
            ? spaFaqs
            : clinicFaqs
        )}
        id="facility-faq-schema"
      />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="facility-breadcrumb-schema" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/features`} className="hover:text-ink transition-colors">
            {isAr ? 'الحلول والأنشطة' : 'Solutions'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{typeName}</span>
        </div>

        {/* ===================================================================
           VIEW: BEAUTY SALONS & STUDIOS (صالونات نسائية ومشاغل)
           =================================================================== */}
        {isBeautySalons && (
          <div className="space-y-16">
            {/* Section 1: Hero */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
                <Crown className="w-4 h-4 text-dusty-blue" />
                <span>
                  {isAr
                    ? 'برنامج صالون نسائي • نظام إدارة مشغل نسائي'
                    : 'All-in-One Beauty Salon & Women Studio Software'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
                {isAr
                  ? 'برنامج متكامل للصالونات النسائية'
                  : 'Comprehensive Management Software for Beauty Salons'}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {isAr
                  ? 'صُمم راش إكس خصيصاً ليلبي أدق تفاصيل وتشغيل الصالونات النسائية ومشاغل التجميل في المملكة العربية السعودية. من إدارة فترات الذروة والمواسم المزدحمة (رمضان، عيدي الفطر والأضحى، ومواسم الأعراس)، إلى تنظيم باقات العرائس متعددة الجلسات، واحتساب عمولات خبيرات التجميل بدقة وشفافية، مع ضمان أقصى درجات الخصوصية والأمان لبيانات وتفضيلات عميلاتك وفق نظام حماية البيانات الشخصية السعودي (PDPL).'
                  : 'Engineered specifically to master the operational nuances of female beauty salons, studios, and aesthetics centers in Saudi Arabia. Master high-demand seasonal rushes (Ramadan, Eids, wedding seasons), orchestrate multi-session bridal suites, track beautician commissions with total transparency, and safeguard client privacy strictly in line with Saudi PDPL regulations.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/demo`}
                  className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
                >
                  {isAr ? 'احجز عرضًا تجريبيًا مخصصًا (20 دقيقة)' : 'Book a Tailored Salon Demo'}
                </Link>

                <a
                  href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    isAr
                      ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة الصالونات والمشاغل النسائية.'
                      : 'Hello RashX, I would like to inquire about the beauty salon and women studio management system.'
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
                    {isAr ? 'خصوصية مشددة وفق PDPL السعودي' : 'Saudi PDPL Privacy Compliant'}
                  </span>
                </Link>
                <div className="flex items-center gap-1.5 font-semibold text-ink">
                  <CalendarCheck className="w-4 h-4 text-dusty-blue" />
                  <span>{isAr ? 'تنظيم مواسم الذروة والأعياد' : 'Ramadan & Eid Rush Engine'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-[#F59E0B]" />
                  <span>{isAr ? 'باقات العرائس ومسيرات العمولات' : 'Bridal Suites & Commission Payroll'}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Interactive Mockups (Bridal Suite & Ramadan Rush) */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'محاكاة تشغيلية متطورة' : 'Operational Salon Interface'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'إدارة محكمة لباقات العرائس وانسيابية كاملة في مواسم الذروة'
                    : 'Mastering Bridal Packages & Conquering Holiday Rushes'}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {isAr
                    ? 'شاهد كيف يبسط راش إكس تنسيق الجلسات متعددة المواعيد للعروس، وكيف يمنع التكدس وفوضى ليلة العيد.'
                    : 'Experience how RashX synchronizes multi-session bridal itineraries and controls holiday waitlists effortlessly.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Mockup 1: Multi-Session Bridal Suite Manager */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-mist-gray shadow-md overflow-hidden space-y-0">
                  <div className="px-6 py-4 bg-ink text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-dusty-blue/20 text-dusty-blue flex items-center justify-center border border-dusty-blue/30">
                        <Crown className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">باقة العروس الملكية (VIP Bridal Suite)</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                            مؤكد ومحجوز
                          </span>
                        </div>
                        <div className="text-[11px] text-mist-gray/70">
                          العميلة: العنود آل سعود • تاريخ الزفاف: الجمعة 14 نوفمبر 2026
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <span className="text-[10px] text-mist-gray/60 block">قيمة الباقة الشاملة</span>
                      <span className="text-sm font-black text-dusty-blue">3,500 ر.س</span>
                    </div>
                  </div>

                  {/* Bridal Sessions Timeline */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-mist-gray">
                      <span className="font-bold text-ink">جدول الجلسات المعتمدة (5 جلسات منسقة)</span>
                      <span className="text-[11px] text-[#059669] font-bold">تم تحصيل العربون (1,500 ر.س)</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      {/* Session 1 */}
                      <div className="p-3 rounded-2xl bg-mist-gray/20 border border-mist-gray flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          <div>
                            <span className="font-bold text-ink block">1. تنظيف بشرة هيدرافيشل ملكي + تقشير كربوني</span>
                            <span className="text-[11px] text-ink-muted">قبل أسبوعين من الزفاف • الخبيرة: د. مريم</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#10B981]/15 text-[#059669] font-bold text-[10px]">
                          مكتمل بنجاح
                        </span>
                      </div>

                      {/* Session 2 */}
                      <div className="p-3 rounded-2xl bg-mist-gray/20 border border-mist-gray flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          <div>
                            <span className="font-bold text-ink block">2. علاج وترميم مكثف للشعر بمعالج أولابلكس No.1/2</span>
                            <span className="text-[11px] text-ink-muted">قبل 6 أيام • الخبيرة: سارة الشمري</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#10B981]/15 text-[#059669] font-bold text-[10px]">
                          مكتمل بنجاح
                        </span>
                      </div>

                      {/* Session 3 */}
                      <div className="p-3 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-[#D97706]" />
                          <div>
                            <span className="font-bold text-[#92400E] block">3. حمام مغربي ملكي بالأعشاب + مساج استرخائي</span>
                            <span className="text-[11px] text-[#78350F]">الأربعاء (قبل الزفاف بيومين) • غرفة السبا الخاصة رقم 2</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-bold text-[10px]">
                          الموعد القادم
                        </span>
                      </div>

                      {/* Session 4 */}
                      <div className="p-3 rounded-2xl bg-mist-gray/20 border border-mist-gray flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CalendarDays className="w-4 h-4 text-ink-muted" />
                          <div>
                            <span className="font-bold text-ink block">4. بديكير ومنيكير سبا + تركيب رموش وأظافر أكريليك</span>
                            <span className="text-[11px] text-ink-muted">الخميس (قبل الزفاف بيوم) • الخبيرة: ريم</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-mist-gray text-ink font-semibold text-[10px]">
                          مجدول ومؤكد
                        </span>
                      </div>

                      {/* Session 5 */}
                      <div className="p-3.5 rounded-2xl bg-[#FDF4FF] border-2 border-[#F0ABFC] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Crown className="w-4 h-4 text-[#C026D3]" />
                          <div>
                            <span className="font-bold text-[#86198F] block">5. تسريحة ومكياج العروس الملكي + تركيب الطرحة</span>
                            <span className="text-[11px] text-[#701A75]">يوم الزفاف 2:00 ظهرًا • جناح العروس VIP رقم 1</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#C026D3]/20 text-[#86198F] font-black text-[10px]">
                          يوم المناسبة
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-mist-gray/30 border border-mist-gray text-[11px] text-ink-muted flex items-center justify-between">
                      <span>توزيع العمولات آلياً: 40% شعر • 35% مكياج • 25% عناية وسبا</span>
                      <span className="font-bold text-ink">محدث تلقائياً بالكاشير</span>
                    </div>
                  </div>
                </div>

                {/* Mockup 2: Ramadan & Eid Rush Control Engine */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white rounded-3xl border border-mist-gray p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-mist-gray">
                      <div className="flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4 text-dusty-blue" />
                        <span className="text-xs font-bold text-ink uppercase tracking-wider">
                          محرك تنظيم مواسم الذروة والأعياد
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] text-[10px] font-bold">
                        موسم العيد مفعل
                      </span>
                    </div>

                    {/* Operational Settings */}
                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#92400E]">إشغال العشر الأواخر من رمضان:</span>
                          <span className="font-black text-[#92400E]">96% محجوز</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden">
                          <div className="h-full bg-[#D97706] rounded-full w-[96%]" />
                        </div>
                        <span className="text-[10px] text-[#78350F] block">
                          الورديات الليلية مفعلة: من 8:30 م إلى 3:30 ص مع فترات راحة منضبطة.
                        </span>
                      </div>

                      {/* Rule 1: Mandatory Deposit */}
                      <div className="p-3 rounded-2xl bg-white border border-mist-gray flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          <div>
                            <span className="font-bold text-ink block">اشتراط عربون 50% لتأكيد الحجز</span>
                            <span className="text-[10px] text-ink-muted">عبر مدى و Apple Pay لتقليص الغياب</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-lg bg-[#10B981]/10 text-[#059669] font-bold text-[10px]">
                          نشط
                        </span>
                      </div>

                      {/* Rule 2: Smart Waitlist */}
                      <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#166534]">قائمة الانتظار الذكية (Smart Waitlist)</span>
                          <span className="font-black text-[#15803D]">18 عميلة في الانتظار</span>
                        </div>
                        <p className="text-[11px] text-[#14532D] leading-relaxed">
                          عند إلغاء أي موعد، يرسل النظام فوراً رسالة واتساب للعميلة الأولى في الانتظار لتأكيد الموعد تلقائياً دون إهدار دقيقة واحدة.
                        </p>
                      </div>

                      {/* Rule 3: Fast Touch POS */}
                      <div className="p-3 rounded-2xl bg-white border border-mist-gray flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <BadgeCheck className="w-4 h-4 text-dusty-blue" />
                          <div>
                            <span className="font-bold text-ink block">كاشير سريع (Speed Checkout)</span>
                            <span className="text-[10px] text-ink-muted">إصدار فاتورة ZATCA الإلكترونية في 8 ثوانٍ</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-lg bg-mist-gray text-ink font-bold text-[10px]">
                          جاهز
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Respectful Note Box */}
                  <div className="p-4 rounded-2xl bg-white border border-mist-gray shadow-xs space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-ink">
                      <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                      <span>بيئة عمل محتشمة ولغة تراعي خصوصية المجتمع</span>
                    </div>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      صُممت راش إكس لتعكس قيم وخصوصية الصالونات والمشاغل النسائية في المملكة؛ لغة رصينة، سرية تامة للسجلات، وحفظ أرقام العميلات من أي استغلال.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Core Specialized Pillars (6 Pillars) */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'ركائز المشاغل النسائية' : 'Specialized Capabilities'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? '6 ركائز صُممت خصيصاً لتفاصيل المشاغل والصالونات النسائية'
                    : '6 Pillars Built Exclusively for Saudi Female Salons & Studios'}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {isAr
                    ? 'حلول تقنية ذكية ترفع ربحية صالونك وتضمن رضا العميلات في المواسم العادية وأيام الأعياد والزواجات.'
                    : 'Smart operational tools designed to maximize profitability, efficiency, and client satisfaction year-round.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beautySalonsPillars.map((pillar, idx) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-3"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                        <IconComponent className="w-5 h-5 text-dusty-blue" />
                      </div>
                      <h3 className="text-base font-bold text-ink">
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

            {/* Section 4: Privacy & Modesty Callout (PDPL Compliance) */}
            <div className="rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-bold text-[#065F46]">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>
                    {isAr
                      ? 'حماية بيانات عميلاتك وفق نظام حماية البيانات الشخصية السعودي (PDPL)'
                      : 'Saudi PDPL Privacy Mandate Compliance'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                  {isAr
                    ? 'خصوصية عميلاتك وسرية الملاحظات الفنية.. أمان مطلق والتزام أخلاقي'
                    : 'Strict Client Privacy & Formula Confidentiality by Design'}
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isAr
                    ? 'ندرك في راش إكس أن خصوصية العميلات في الصالونات والمشاغل النسائية بالمملكة هي حجر الزاوية لبناء الثقة. لذلك، تخضع كافة سجلات العميلات، وتفضيلاتهن، وملاحظات الصبغة والتجميل لأعلى معايير التشفير السحابي. نوفر خاصية حجب أرقام الهواتف عن الموظفات، ونمنع تصدير أي بيانات إلا بإذن المالك المباشر، مع عزل تام لكل صالون على نطاقه الفرعي الخاص.'
                    : 'We understand that client privacy is the bedrock of customer trust in Saudi beauty salons. All client profiles, technical styling formulas, and sensitivities are fully encrypted in accordance with Saudi PDPL regulations, featuring masked phone numbers and restricted export privileges.'}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/${locale}/security`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-ink text-white hover:bg-ink/90 text-xs font-bold transition-all"
                  >
                    <span>
                      {isAr
                        ? 'تعرف على معايير الأمان وحماية البيانات في راش إكس'
                        : 'Explore Security & Privacy Architecture'}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-dusty-blue" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 5: FAQ Accordion */}
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'أسئلة شائعة حول إدارة الصالونات والمشاغل النسائية'
                    : 'Frequently Asked Questions about Beauty Salon Management'}
                </h2>
              </div>

              <div className="space-y-3">
                {beautySalonsFaqs.map((faq, idx) => (
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
                  <Crown className="w-3.5 h-3.5 text-dusty-blue" />
                  <span>{isAr ? 'إدارة ذكية لمشغل راقٍ' : 'Smart Salon Operations'}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
                  {isAr
                    ? 'جاهزة لتنظيم مشغلك ومضاعفة إشغال المواعيد في المواسم؟'
                    : 'Ready to Streamline Your Salon & Maximize Peak Season Bookings?'}
                </h2>

                <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                  {isAr
                    ? 'اكتشفي كيف تدير راش إكس باقات العرائس، زحمة الأعياد، وعمولات المختصات في جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                    : 'Experience bridal bundle coordination, peak season queues, and specialist commission payroll in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
                <Link
                  href={`/${locale}/demo`}
                  className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  {isAr ? 'احجزي عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book Free 20-Min Demo'}
                </Link>

                <a
                  href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    isAr
                      ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة الصالونات والمشاغل النسائية.'
                      : 'Hello RashX, I would like to inquire about the beauty salon management software.'
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
        )}

        {/* ===================================================================
           VIEW: BARBERSHOPS (الصالونات الرجالية ومراكز الحلاقة)
           =================================================================== */}
        {isBarbershops && (
          <div className="space-y-16">
            {/* Section 1: Hero */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
                <Scissors className="w-4 h-4 text-dusty-blue" />
                <span>
                  {isAr
                    ? 'برنامج حلاق • نظام حجز صالون رجالي'
                    : 'Barbershop & Men Grooming Management Software'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
                {isAr
                  ? 'نظام إدارة لصالونات الرجال ومحلات الحلاقة'
                  : 'Management Software for Barbershops & Men Grooming'}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {isAr
                  ? 'ودّع طوابير الانتظار الطويلة وفوضى حساب العمولات. يمنحك راش إكس نظاماً سريعاً ومخصصاً لطبيعة صالونات الحلاقة ومراكز العناية الرجالية في المملكة؛ تنظيم فوري لطابور الحضور المباشر (Walk-in) والمواعيد المسبقة، كاشير لمس فائق السرعة يصدر الفاتورة الإلكترونية خلال ثوانٍ، احتساب آلي لعمولات الحلاقين لكل كرسي وخدمة، وباقات اشتراكات شهرية دورية تضمن تدفقاً مالياً ثابتاً وتزيد ولاء عملائك الدائمين.'
                  : 'Say goodbye to crowded waiting lobbies and commission disputes. RashX equips modern barbershops and male grooming lounges in Saudi Arabia with rapid chair turnover, walk-in queue automation, split-second touch POS with ZATCA Phase 2 compliance, and recurring monthly passes that lock in predictable revenue.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/demo`}
                  className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
                >
                  {isAr ? 'احجز عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book Free 20-Min Demo'}
                </Link>

                <a
                  href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    isAr
                      ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة صالونات ومحلات الحلاقة الرجالية.'
                      : 'Hello RashX, I would like to inquire about the barbershop and grooming management software.'
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
                  <Clock className="w-4 h-4 text-dusty-blue" />
                  <span>{isAr ? 'تنظيم الدور وشاشة الانتظار الحية' : 'Live Chair & Queue Board'}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-ink">
                  <BadgeCheck className="w-4 h-4 text-[#10B981]" />
                  <span>{isAr ? 'كاشير لمس فائق السرعة + ZATCA' : '5-Sec ZATCA POS Checkout'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#F59E0B]" />
                  <span>{isAr ? 'عمولات الحلاقين واشتراكات دورية' : 'Barber Commissions & Monthly Passes'}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Interactive Mockups (Live Queue Board & Monthly Passes) */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'محاكاة تشغيلية لصالة الحلاقة' : 'Interactive Barbershop Simulation'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'شاشة كراسي الحلاقة الحية واشتراكات شهرية تؤمّن دخلك'
                    : 'Live Chair Queue Board & Recurring Monthly Passes'}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {isAr
                    ? 'شاهد كيف يراقب النظام كراسي الحلاقين بالدقائق، وكيف يدير اشتراكات وباقات الزبائن الدائمين بسلاسة.'
                    : 'Experience real-time chair turnover tracking and automated monthly grooming package deductions.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Mockup 1: Live Chairs & Queue Board */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-mist-gray shadow-md overflow-hidden space-y-0">
                  <div className="px-6 py-4 bg-ink text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-dusty-blue/20 text-dusty-blue flex items-center justify-center border border-dusty-blue/30">
                        <Scissors className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">شاشة كراسي الصالون وطابور الانتظار</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                            مباشر • 3 كراسي نشطة
                          </span>
                        </div>
                        <div className="text-[11px] text-mist-gray/70">
                          صالون الأناقة الرجالي • فرع الرياض (حي الملقا)
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <span className="text-[10px] text-mist-gray/60 block">متوسط مدة الخدمة</span>
                      <span className="text-sm font-black text-dusty-blue">22 دقيقة / كرسي</span>
                    </div>
                  </div>

                  {/* Chairs Status Grid */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-mist-gray">
                      <span className="font-bold text-ink">حالة كراسي الحلاقة الآن</span>
                      <span className="text-[11px] text-[#059669] font-bold">طابور الانتظار: 2 زبائن</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Chair 1 */}
                      <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-black flex items-center justify-center text-xs">
                            #1
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-ink">الحلاق أحمد حسن</span>
                              <span className="text-[10px] text-ink-muted">(شعر + لحية ملكي)</span>
                            </div>
                            <span className="text-[11px] text-[#92400E]">
                              الزبون: فيصل الدوسري • بدأت منذ 14 دقيقة (متبقي 8 دقائق)
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-bold text-[10px]">
                          مشغول الآن
                        </span>
                      </div>

                      {/* Chair 2 */}
                      <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-black flex items-center justify-center text-xs">
                            #2
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-ink">الحلاق طارق سعيد</span>
                              <span className="text-[10px] text-ink-muted">(حلاقة وتحديد ذقن VIP)</span>
                            </div>
                            <span className="text-[11px] text-[#92400E]">
                              الزبون: سلطان الغامدي • متبقي 3 دقائق على إنهاء الخدمة
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-bold text-[10px]">
                          أوشك على الإتمام
                        </span>
                      </div>

                      {/* Chair 3 (Available) */}
                      <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border-2 border-[#86EFAC] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#10B981]/20 text-[#047857] font-black flex items-center justify-center text-xs">
                            #3
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#14532D]">الحلاق مراد الشامي</span>
                              <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#047857] text-[10px] font-bold">
                                الكرسي جاهز ومعقم
                              </span>
                            </div>
                            <span className="text-[11px] text-[#166534]">
                              الدور التالي في الانتظار: #14 سعد المطيري (شعر ولحية)
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="px-3.5 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-[11px] shadow-xs transition-colors"
                        >
                          استدعاء الدور التالي
                        </button>
                      </div>
                    </div>

                    {/* Live Queue Strip */}
                    <div className="p-3 rounded-2xl bg-mist-gray/30 border border-mist-gray text-[11px] text-ink-muted flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>تنبيه واتساب تلقائي يُرسل للزبون قبل دوره بـ 10 دقائق</span>
                      </div>
                      <span className="font-bold text-ink">محدث لحظياً</span>
                    </div>
                  </div>
                </div>

                {/* Mockup 2: Monthly Grooming Subscriptions Engine */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white rounded-3xl border border-mist-gray p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-mist-gray">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-dusty-blue" />
                        <span className="text-xs font-bold text-ink uppercase tracking-wider">
                          محرك الاشتراكات والباقات الشهرية
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] text-[10px] font-bold">
                        اشتراك نشط
                      </span>
                    </div>

                    {/* Monthly Pass Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] p-5 text-white shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-mist-gray/80">باقة العناية الشهرية الذهبية</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#FCD34D] border border-[#F59E0B]/40 text-[10px] font-bold">
                          350 ر.س / شهرياً
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-sm font-bold text-white block">سلطان الغامدي</span>
                        <span className="text-[11px] text-[#A7F3D0]">
                          يتجدد الاشتراك تلقائياً في 1 ديسمبر 2026
                        </span>
                      </div>

                      {/* Remaining Sessions Breakdown */}
                      <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-mist-gray/90">حلاقة وتحديد ذقن ملكي:</span>
                          <span className="font-bold text-white">متبقي 2 من 4 جلسات</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-mist-gray/90">قص شعر واستشوار:</span>
                          <span className="font-bold text-white">متبقي 1 من 2 جلسات</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-mist-gray/90">قناع تنظيف وتقشير الوجه:</span>
                          <span className="font-bold text-[#FCD34D]">1 جلسة متاحة</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick POS Deduction Button */}
                    <button
                      type="button"
                      className="w-full py-2.5 px-3 rounded-xl bg-ink hover:bg-ink/90 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <BadgeCheck className="w-4 h-4 text-dusty-blue" />
                      <span>خصم جلسة اليوم من الباقة وإصدار الفاتورة</span>
                    </button>
                  </div>

                  {/* Benefit Callout */}
                  <div className="p-4 rounded-2xl bg-white border border-mist-gray shadow-xs space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 font-bold text-ink">
                      <DollarSign className="w-4 h-4 text-dusty-blue" />
                      <span>تدفق نقدي مسبق وولاء يمنع تسرب الزبائن</span>
                    </div>
                    <p className="text-[11px] text-ink-muted leading-relaxed">
                      عندما يشترك الزبون في باقة شهرية، تضمن حصول صالونك على قيمة الخدمات مقدماً، وتضمن عودته أسبوعياً لكرسي الحلاقة الخاص بك بدلاً من تجربة أي صالون منافس.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Core Specialized Pillars (6 Pillars) */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'ركائز صالونات الحلاقة' : 'Barbershop Pillars'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? '6 ركائز لتسريع خدمة الزبائن ومضاعفة إيرادات صالونك'
                    : '6 Pillars to Turbocharge Turnover & Maximize Chair Revenue'}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {isAr
                    ? 'أدوات ذكية مصممة خصيصاً لتفاصيل وسرعة عمل صالونات الحلاقة الرجالية ومراكز العناية في المملكة.'
                    : 'Engineered specifically for the high-speed operational dynamics of Saudi barbershops.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {barbershopPillars.map((pillar, idx) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-3"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                        <IconComponent className="w-5 h-5 text-dusty-blue" />
                      </div>
                      <h3 className="text-base font-bold text-ink">
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

            {/* Section 4: Live Queue & Client PWA Experience Callout */}
            <div className="rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
                  <Clock className="w-4 h-4 text-dusty-blue" />
                  <span>
                    {isAr
                      ? 'تقليص الانتظار بنسبة 80% عبر شاشة الدور الذكية'
                      : '80% Reduction in Waiting Room Congestion'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                  {isAr
                    ? 'زبونك يحجز في طريقه للصالون.. ويدخل الكرسي بدون انتظار دقيقة واحدة!'
                    : 'Clients Book En Route & Walk Straight to the Barber Chair'}
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isAr
                    ? 'أكبر سبب لخسارة زبائن الحلاقة هو الازدحام وطول الانتظار في الصالة. مع راش إكس، يفتح الزبون رابط صالونك من جواله (تطبيق PWA بدون تحميل) ليأخذ رقم دوره فوراً وهو في سيارته أو مكتبه، ويرى عدد المنتظرين أمامه بدقة، مع إشعار واتساب تلقائي يصله فور تجهيز الكرسي، مما يمنحه تجربة فاخرة تجعله زبونك الدائم.'
                    : 'The number-one reason barbers lose valuable customers is waiting lobby friction. With RashX, clients grab their live queue ticket via your branded PWA while driving or at the office, tracking exact wait minutes, and receiving a WhatsApp chair summons right as their barber sterilizes the station.'}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/${locale}/demo`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-ink text-white hover:bg-ink/90 text-xs font-bold transition-all"
                  >
                    <span>{isAr ? 'شاهد شاشة الدور في عرض حي' : 'Explore Live Queue in Demo'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-dusty-blue" />
                  </Link>
                  <Link
                    href={`/${locale}/solutions/pos-billing`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-mist-gray hover:bg-mist-gray/40 text-xs font-semibold text-ink transition-colors"
                  >
                    <span>{isAr ? 'تفاصيل نظام الكاشير ونقاط البيع' : 'Explore Fast POS System'}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 5: FAQ Accordion */}
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'أسئلة شائعة حول برنامج إدارة صالونات الحلاقة الرجالية'
                    : 'Frequently Asked Questions about Barbershop Management'}
                </h2>
              </div>

              <div className="space-y-3">
                {barbershopFaqs.map((faq, idx) => (
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
                  <Scissors className="w-3.5 h-3.5 text-dusty-blue" />
                  <span>{isAr ? 'سرعة وتشغيل منظم' : 'High-Speed Barbershop Ops'}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
                  {isAr
                    ? 'جاهز لتسريع صالونك ومضاعفة دوران كراسي الحلاقة؟'
                    : 'Ready to Accelerate Chair Turnover & Eliminate Wait Times?'}
                </h2>

                <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                  {isAr
                    ? 'اكتشف كيف يدير راش إكس طابور الانتظار، الكاشير السريع، وعمولات الحلاقين في جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                    : 'Experience live queue tracking, ultra-fast POS checkout, and automated barber commissions in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                      ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة صالونات ومحلات الحلاقة الرجالية.'
                      : 'Hello RashX, I would like to inquire about the barbershop management software.'
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
        )}

        {/* ===================================================================
           VIEW: SPAS & BEAUTY CENTERS (مراكز التجميل والسبا متعددة الخدمات)
           =================================================================== */}
        {isSpas && (
          <div className="space-y-16">
            {/* Section 1: Hero */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
                <Sparkles className="w-4 h-4 text-dusty-blue" />
                <span>
                  {isAr
                    ? 'برنامج مراكز تجميل • نظام إدارة سبا'
                    : 'Multi-Service Beauty Centers & Spa Management Software'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
                {isAr
                  ? 'منظومة لمراكز التجميل والسبا متعددة الخدمات'
                  : 'All-in-One Platform for Multi-Service Beauty Centers & Spas'}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {isAr
                  ? 'صُممت راش إكس لتلبي التعقيد التشغيلي لمراكز التجميل الكبرى ومنتجعات السبا متعددة الأقسام والفروع في المملكة؛ جدولة متزامنة لخدمات العناية المتنوعة بمدد زمنية متباينة (مساج، حمام مغربي، معالجات شعر، عناية بالبشرة)، هندسة باقات الجلسات المجمعة الدورية، رقابة مركزية على استهلاك المستودعات والمستلزمات، تقارير مؤشرات أداء (KPIs) لحظية، وربط كامل بالفوترة الإلكترونية ZATCA.'
                  : 'Engineered to conquer the operational complexity of large aesthetic centers and luxury multi-department spa chains in Saudi Arabia: multi-duration room scheduling, recurring wellness session bundles, centralized multi-branch governance, backbar consumption control, and ZATCA Phase 2 e-invoicing.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/demo`}
                  className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
                >
                  {isAr ? 'احجز عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book Free 20-Min Demo'}
                </Link>

                <a
                  href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    isAr
                      ? 'مرحبًا راش إكس، أود الاستفسار عن منظومة إدارة مراكز التجميل والسبا متعددة الخدمات.'
                      : 'Hello RashX, I would like to inquire about the multi-service beauty center and spa platform.'
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
                  <Store className="w-4 h-4 text-dusty-blue" />
                  <span>{isAr ? 'إدارة متعددة الفروع والأقسام' : 'Multi-Branch Enterprise Control'}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-ink">
                  <Clock className="w-4 h-4 text-[#10B981]" />
                  <span>{isAr ? 'ربط الغرف بالأخصائيين والمواد' : '3-Way Room & Staff Locks'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-[#F59E0B]" />
                  <span>{isAr ? 'فوترة إلكترونية ZATCA المرحلة 2' : 'ZATCA Phase 2 E-Invoicing'}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Interactive Mockups (Suites Dispatcher & Multi-Branch KPIs) */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'محاكاة تشغيلية لمركز السبا' : 'Interactive Spa Operations'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'جدولة أجنحة السبا متعددة المدد ولوحة رقابة مركزية للفروع'
                    : 'Multi-Duration Room Dispatcher & Multi-Branch Executive KPIs'}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {isAr
                    ? 'شاهد كيف يدير راش إكس مدد الجلسات المتفاوتة وأوقات التعقيم، وكيف يراقب المالك أداء كافة الفروع والمخزون.'
                    : 'Experience automated suite buffer management and real-time multi-branch revenue benchmarking.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Mockup 1: Multi-Duration Suites & Room Dispatcher */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-mist-gray shadow-md overflow-hidden space-y-0">
                  <div className="px-6 py-4 bg-ink text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-dusty-blue/20 text-dusty-blue flex items-center justify-center border border-dusty-blue/30">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">مخطط أجنحة وغرف السبا المباشرة</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                            مباشر • 4 أجنحة نشطة
                          </span>
                        </div>
                        <div className="text-[11px] text-mist-gray/70">
                          منتجع لافندر الصحي والسبا • الفرع الرئيسي (الرياض)
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <span className="text-[10px] text-mist-gray/60 block">معدل إشغال الغرف</span>
                      <span className="text-sm font-black text-dusty-blue">94% نشط</span>
                    </div>
                  </div>

                  {/* Spa Suites Timeline Grid */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-mist-gray">
                      <span className="font-bold text-ink">حالة الأجنحة والجلسات الجارية</span>
                      <span className="text-[11px] text-[#059669] font-bold">وقت التعقيم التلقائي: 15 دقيقة بعد كل جلسة</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Suite 1 */}
                      <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-black flex items-center justify-center text-xs">
                            جناح 1
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-ink">جناح الحمام المغربي الملكي</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-mist-gray font-bold text-ink">
                                المدة: 90 دقيقة
                              </span>
                            </div>
                            <span className="text-[11px] text-[#92400E]">
                              العميل: فهد السليمان • المعالجة: خديجة • متبقي 25 دقيقة (يتبعها 15 دقيقة تعقيم)
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-bold text-[10px]">
                          جلسة جارية
                        </span>
                      </div>

                      {/* Suite 2 */}
                      <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-black flex items-center justify-center text-xs">
                            جناح 2
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-ink">جناح المساج التايلاندي والأحجار الساخنة</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-mist-gray font-bold text-ink">
                                المدة: 60 دقيقة
                              </span>
                            </div>
                            <span className="text-[11px] text-[#92400E]">
                              العميل: نايف العتيبي • المعالج: كيم • متبقي 12 دقيقة
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-[#F59E0B]/20 text-[#B45309] font-bold text-[10px]">
                          جلسة جارية
                        </span>
                      </div>

                      {/* Suite 3 (Available & Sanitized) */}
                      <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border-2 border-[#86EFAC] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 text-[#047857] font-black flex items-center justify-center text-xs">
                            جناح 3
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#14532D]">جناح تنظيف البشرة والهيدرافيشل</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#86EFAC] font-bold text-[#047857]">
                                المدة: 45 دقيقة
                              </span>
                            </div>
                            <span className="text-[11px] text-[#166534]">
                              الأخصائية: نورة الشمري • الجناح معقم ومجهز بالزيوت ومستلزمات الجلسة
                            </span>
                          </div>
                        </div>
                        <span className="px-3 py-1.5 rounded-xl bg-[#10B981] text-white font-bold text-[11px] shadow-xs">
                          جاهز للحجز التالي
                        </span>
                      </div>
                    </div>

                    {/* Three-way check strip */}
                    <div className="p-3 rounded-2xl bg-mist-gray/30 border border-mist-gray text-[11px] text-ink-muted flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        <span>فحص ثلاثي تلقائي: توافر الجناح + تفرغ المعالج + توافر مستلزمات الجلسة</span>
                      </div>
                      <span className="font-bold text-ink">Zero Clashes</span>
                    </div>
                  </div>
                </div>

                {/* Mockup 2: Multi-Branch KPIs & Backbar Stock */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white rounded-3xl border border-mist-gray p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-mist-gray">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-dusty-blue" />
                        <span className="text-xs font-bold text-ink uppercase tracking-wider">
                          لوحة الفروع التنفيذية وKPIs
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-mist-gray text-ink text-[10px] font-bold">
                        تحديث لحظي
                      </span>
                    </div>

                    {/* Branch Performance Comparison */}
                    <div className="space-y-2.5 text-xs">
                      {/* Branch 1 */}
                      <div className="p-3 rounded-2xl bg-white border border-mist-gray flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                            <span className="font-bold text-ink">فرع الرياض (حي العليا)</span>
                          </div>
                          <span className="text-[11px] text-ink-muted">إشغال 94% • متوسط الفاتورة 480 ر.س</span>
                        </div>
                        <span className="font-black text-ink text-sm">18,450 ر.س</span>
                      </div>

                      {/* Branch 2 */}
                      <div className="p-3 rounded-2xl bg-white border border-mist-gray flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-dusty-blue"></span>
                            <span className="font-bold text-ink">فرع جدة (طريق الملك)</span>
                          </div>
                          <span className="text-[11px] text-ink-muted">إشغال 88% • متوسط الفاتورة 420 ر.س</span>
                        </div>
                        <span className="font-black text-ink text-sm">14,200 ر.س</span>
                      </div>

                      {/* Branch 3 */}
                      <div className="p-3 rounded-2xl bg-white border border-mist-gray flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-mist-gray"></span>
                            <span className="font-bold text-ink">فرع الخبر (حي الشاطئ)</span>
                          </div>
                          <span className="text-[11px] text-ink-muted">إشغال 82% • متوسط الفاتورة 390 ر.س</span>
                        </div>
                        <span className="font-black text-ink text-sm">11,800 ر.س</span>
                      </div>
                    </div>

                    {/* Backbar Inventory Alert Strip */}
                    <div className="p-3.5 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#92400E]">تنبيه استهلاك مستلزمات السبا (Backbar):</span>
                        <span className="text-[10px] font-bold text-[#B45309]">أمر شراء مقترح</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#78350F]">
                        <span>زيت اللافندر الطبيعي (متبقي 3 عبوات)</span>
                        <span className="font-bold text-[#B45309]">تحت حد الأمان</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#78350F]">
                        <span>صابون مغربي ملكي بالأعشاب (متوفر 15 كجم)</span>
                        <span className="font-bold text-[#15803D]">متوفر</span>
                      </div>
                    </div>

                    {/* ZATCA E-Invoicing Status */}
                    <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-[#10B981]" />
                        <span className="font-bold text-[#166534]">الفوترة الإلكترونية ZATCA المرحلة الثانية</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#15803D] bg-white px-2 py-0.5 rounded-md border border-[#BBF7D0]">
                        الربط والتكامل جاهز
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Core Specialized Pillars (6 Pillars) */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'ركائز مراكز التجميل والسبا' : 'Enterprise Spa Pillars'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? '6 ركائز مصممة للتعقيد التشغيلي لمراكز التجميل والسبا الكبرى'
                    : '6 Pillars Engineered for Large Multi-Service Beauty Centers'}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {isAr
                    ? 'منظومة متكاملة تضبط المواعيد المتباينة، باقات الجلسات، المخزون، وحوكمة الفروع باحترافية مطلقة.'
                    : 'Complete ecosystem mastering varied treatment durations, wellness packages, stock recipes, and multi-branch governance.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaPillars.map((pillar, idx) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-3"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                        <IconComponent className="w-5 h-5 text-dusty-blue" />
                      </div>
                      <h3 className="text-base font-bold text-ink">
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

            {/* Section 4: Multi-Branch Scalability Callout */}
            <div className="rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
                  <Store className="w-4 h-4 text-dusty-blue" />
                  <span>
                    {isAr
                      ? 'حوكمة مركزية لسلاسل مراكز التجميل والسبا في المملكة'
                      : 'Enterprise Multi-Location Chain Governance'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                  {isAr
                    ? 'من مركز واحد إلى سلسلة فروع.. إدارة موحدة بأعلى درجات التحكم'
                    : 'From a Single Sanctuary to a National Chain: Unified Enterprise Command'}
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isAr
                    ? 'تتيح راش إكس للمستثمرين وأصحاب سلاسل مراكز التجميل والسبا مراقبة أداء كافة الفروع من شاشة واحدة؛ إيرادات كل فرع، معدلات إشغال الأجنحة، إنتاجية المعالجين، وتحويل الكوادر والمخزون بين الفروع بسلاسة، مع عزل كامل لصلاحيات موظفي الاستقبال لمنع أي تسريب للبيانات أو التلاعب المالي.'
                    : 'RashX empowers spa chain owners and investors to supervise all locations from a single command dashboard: branch revenues, suite utilization benchmarks, therapist billable hours, and inter-branch inventory transfers, backed by strict branch-isolated staff permissions.'}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/${locale}/demo`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-ink text-white hover:bg-ink/90 text-xs font-bold transition-all"
                  >
                    <span>{isAr ? 'احجز استشارة عرض الفروع المتعددة' : 'Schedule Multi-Branch Demo'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-dusty-blue" />
                  </Link>
                  <Link
                    href={`/${locale}/solutions/inventory-purchasing`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-mist-gray hover:bg-mist-gray/40 text-xs font-semibold text-ink transition-colors"
                  >
                    <span>{isAr ? 'استكشف نظام المخزون والمشتريات' : 'Explore Inventory & Purchasing'}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 5: FAQ Accordion */}
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'أسئلة شائعة حول إدارة مراكز التجميل والسبا'
                    : 'Frequently Asked Questions about Beauty Centers & Spas'}
                </h2>
              </div>

              <div className="space-y-3">
                {spaFaqs.map((faq, idx) => (
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
                  <span>{isAr ? 'إدارة فاخرة وانسيابية تامة' : 'Luxury Spa Orchestration'}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
                  {isAr
                    ? 'جاهز لضبط تشغيل مركز التجميل والسبا ومضاعفة أرباح فروعك؟'
                    : 'Ready to Elevate Your Spa Operations & Maximize Multi-Branch Growth?'}
                </h2>

                <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                  {isAr
                    ? 'اكتشف كيف تدير راش إكس أجنحة السبا، باقات الجلسات المجمعة، المخزون، والفوترة الإلكترونية في جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                    : 'Experience therapy suite allocation, recurring session passes, backbar inventory recipes, and ZATCA Phase 2 compliance in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                      ? 'مرحبًا راش إكس، أود الاستفسار عن منظومة إدارة مراكز التجميل والسبا متعددة الخدمات.'
                      : 'Hello RashX, I would like to inquire about the beauty center and spa management software.'
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
        )}

        {/* ===================================================================
           VIEW: CLINICS (مجمعات وعيادات التجميل والجلدية)
           =================================================================== */}
        {isClinics && (
          <div className="space-y-16">
            {/* Section 1: Hero */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
                <Stethoscope className="w-4 h-4 text-dusty-blue" />
                <span>
                  {isAr
                    ? 'برنامج عيادات تجميل • نظام إدارة المراكز الجلدية والليزر'
                    : 'Aesthetic, Dermatology & Laser Clinics Software'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
                {isAr
                  ? 'برنامج إدارة عيادات ومجمعات التجميل والجلدية'
                  : 'Precision Management for Aesthetic & Dermatology Clinics'}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
                {isAr
                  ? 'صُممت راش إكس لتلبي الدقة التشغيلية والسرية الصارمة التي تتطلبها عيادات التجميل ومجمعات الجلدية والليزر في المملكة العربية السعودية؛ خوارزمية حجز ثلاثية تمنع تضارب أجهزة الليزر والغرف بين الأطباء، إدارة باقات الجلسات المتعددة ومتابعة الرتوش آلياً، سجلات طبية وموافقات إلكترونية مشفرة متوافقة مع نظام حماية البيانات الشخصية (PDPL)، تتبع أرقام تشغيلات المستهلكات الطبية ورؤوس الأجهزة، وحساب دقيق لعمولات الأطباء بعد استقطاع تكلفة المواد، مع ربط متكامل بالفوترة الإلكترونية ZATCA.'
                  : 'Engineered for the clinical precision and data confidentiality demanded by aesthetic, dermatology, and medical laser clinics in Saudi Arabia: 3-way synchronization eliminating laser device clashes, multi-visit session tracking, encrypted E-records & digital consents compliant with Saudi PDPL, disposable tip serial auditing, doctor split-commissions after material deductions, and ZATCA Phase 2 compliance.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${locale}/demo`}
                  className="px-6 py-3.5 text-sm font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-2xl shadow-md transition-all active:scale-[0.98]"
                >
                  {isAr ? 'احجز عرضًا تجريبيًا مجانيًا (20 دقيقة)' : 'Book Free 20-Min Demo'}
                </Link>

                <a
                  href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    isAr
                      ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة عيادات ومجمعات التجميل والجلدية.'
                      : 'Hello RashX, I would like to inquire about the aesthetic and dermatology clinic management software.'
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
                  <Activity className="w-4 h-4 text-dusty-blue" />
                  <span>{isAr ? 'ربط ثلاثي: طبيب + جهاز ليزر + غرفة' : '3-Way Doctor + Device + Suite Lock'}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-ink">
                  <Lock className="w-4 h-4 text-[#10B981]" />
                  <span>{isAr ? 'امتثال كامل لنظام حماية البيانات (PDPL)' : 'Saudi PDPL Privacy Compliant'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-[#F59E0B]" />
                  <span>{isAr ? 'فوترة إلكترونية ZATCA المرحلة 2' : 'ZATCA Phase 2 E-Invoicing'}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Interactive Mockups (Tri-Resource Laser Dispatcher & Encrypted Medical Record) */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'محاكاة تشغيلية للعيادة ومجمع التجميل' : 'Interactive Clinical Operations'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'جدولة أجهزة الليزر ثلاثية الموارد والسجل الطبي المشفر'
                    : 'Tri-Resource Laser Dispatcher & Encrypted E-Health Record'}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {isAr
                    ? 'شاهد كيف يمنع راش إكس تضارب أجهزة الليزر الطبية، وكيف يدير باقات الجلسات وعمولات الأطباء وسرية المراجعين.'
                    : 'See how RashX coordinates expensive aesthetic lasers, patient session passes, doctor commissions, and PDPL privacy.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Mockup 1: Tri-Resource Laser & Clinical Suite Dispatcher */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-mist-gray shadow-md overflow-hidden space-y-0">
                  <div className="px-6 py-4 bg-ink text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-dusty-blue/20 text-dusty-blue flex items-center justify-center border border-dusty-blue/30">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">مخطط غرف وأجهزة الليزر المباشرة</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                            مباشر • 3 عيادات نشطة
                          </span>
                        </div>
                        <div className="text-[11px] text-mist-gray/70">
                          مجمع النخبة التخصصي للجلدية والليزر • فرع العليا (الرياض)
                        </div>
                      </div>
                    </div>
                    <div className="text-end hidden sm:block">
                      <div className="text-xs text-mist-gray font-mono">11:30 ص</div>
                      <div className="text-[10px] text-dusty-blue font-semibold">معدل الإشغال: 92%</div>
                    </div>
                  </div>

                  {/* 3 Clinical Suites Status */}
                  <div className="p-6 space-y-4">
                    {/* Suite 1: Active Laser */}
                    <div className="p-4 rounded-2xl border-2 border-[#10B981]/40 bg-[#10B981]/5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-ink">عيادة الليزر 01 • Candela GentleMax Pro</span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#10B981] text-white">
                              جلسة جارية
                            </span>
                          </div>
                          <div className="text-xs text-ink-muted">
                            الممارس: <span className="font-semibold text-ink">د. سارة العتيبي</span> (أخصائية جلدية)
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-xs font-bold text-[#10B981] flex items-center gap-1 justify-end">
                            <Clock className="w-3.5 h-3.5" />
                            <span>متبقي 20 دقيقة</span>
                          </div>
                          <div className="text-[10px] text-ink-muted">الانتهاء: 11:50 ص</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-[#10B981]/20 text-xs space-y-1.5">
                        <div className="flex justify-between items-center text-ink">
                          <span>المراجعة: <strong className="font-bold">نورة الشمري</strong></span>
                          <span className="text-dusty-blue font-bold font-mono">جلسة 3 من 6 • ليزر كامل الجسم</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-muted">
                          <span>معايير النبض: <strong>18 J/cm² • Spot 18mm</strong></span>
                          <span>المستهلك: <strong>رأس معقم #SN-8821</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Suite 2: Buffer & Sanitization */}
                    <div className="p-4 rounded-2xl border border-mist-gray bg-[#FAFBFB] space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-ink">عيادة العناية والتجديد • Fotona 4D</span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-dusty-blue text-black">
                              تعقيم وتجهيز (15 دقيقة)
                            </span>
                          </div>
                          <div className="text-xs text-ink-muted">
                            الممارس: <span className="font-semibold text-ink">أخصائية ريم التميمي</span>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-xs font-bold text-ink-muted flex items-center gap-1 justify-end">
                            <Clock className="w-3.5 h-3.5" />
                            <span>الموعد القادم: 11:45 ص</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-mist-gray text-xs space-y-1">
                        <div className="flex justify-between items-center text-ink">
                          <span>المراجعة القادمة: <strong>منى الدوسري</strong></span>
                          <span className="text-[#10B981] font-semibold text-[11px]">مؤكدة • وصلت صالة الانتظار</span>
                        </div>
                        <div className="text-[11px] text-ink-muted">
                          الإجراء: شد ونضارة البشرة بالليزر الرباعي (45 دقيقة)
                        </div>
                      </div>
                    </div>

                    {/* Suite 3: Aesthetic Injections & Consumable Deduction */}
                    <div className="p-4 rounded-2xl border border-mist-gray bg-white space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-ink">عيادة الحقن التجميلي • جناح 03</span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#8B5CF6]/20 text-[#8B5CF6]">
                              إجراء مكتمل • جاهز للفوترة
                            </span>
                          </div>
                          <div className="text-xs text-ink-muted">
                            الممارس: <span className="font-semibold text-ink">د. خالد الشريف</span> (استشاري جراحة وتجميل)
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-xs font-bold text-ink font-mono">1,850 ر.س</div>
                          <div className="text-[10px] text-[#10B981] font-semibold">موافقة رقمية موقّعة</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-mist-gray/30 border border-mist-gray text-[11px] text-ink-muted flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                          <span>خصم آلي من المستودع: <strong>1 أمبول Botox 100U (تشغيلة #BX-9042)</strong></span>
                        </div>
                        <span className="text-ink font-semibold">عمولة الطبيب: 340 ر.س</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-mist-gray/40 border-t border-mist-gray flex items-center justify-between text-xs text-ink-muted">
                    <span className="flex items-center gap-1.5 text-ink font-semibold">
                      <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                      <span>خوارزمية الربط تمنع 100% من تعارض حجز أجهزة الليزر والغرف</span>
                    </span>
                    <span className="text-[11px]">محدث لحظياً</span>
                  </div>
                </div>

                {/* Mockup 2: Encrypted Patient Clinical File & Digital Consent */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-mist-gray shadow-md overflow-hidden space-y-0">
                  <div className="px-6 py-4 bg-mist-gray/60 border-b border-mist-gray flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-dusty-blue" />
                      <span className="text-sm font-bold text-ink">الملف الطبي وموافقة الإجراء (PDPL)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/20">
                      مشفر سحابياً
                    </span>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Patient Header (Masked for PDPL) */}
                    <div className="p-4 rounded-2xl bg-mist-gray/30 border border-mist-gray space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-ink-muted">رقم الملف الطبي: <strong className="font-mono text-ink">#MED-78214</strong></span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-ink border border-mist-gray">
                          فصيلة الدم: +O
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-ink">نورة الشمري</div>
                        <div className="text-xs font-mono text-ink-muted" dir="ltr">05****1234</div>
                      </div>
                      <div className="p-2 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 text-[11px] text-[#EF4444] font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>تنبيه طبي: تحسس جلدي من مادة الليدوكايين (Lidocaine Alert)</span>
                      </div>
                    </div>

                    {/* Active Package Tracker */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-ink">باقة ليزر كامل الجسم (6 جلسات)</span>
                        <span className="text-dusty-blue font-bold font-mono">متبقي 3 جلسات + 1 رتوش</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-mist-gray overflow-hidden">
                        <div className="h-full bg-dusty-blue rounded-full" style={{ width: '50%' }} />
                      </div>
                      <div className="flex justify-between text-[11px] text-ink-muted">
                        <span>الجلسة الحالية: رقم 3</span>
                        <span>الصلاحية: 30 أكتوبر 2026</span>
                      </div>
                    </div>

                    {/* E-Consent Digital Signature */}
                    <div className="p-3.5 rounded-2xl border border-mist-gray bg-[#FAFBFB] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-ink flex items-center gap-1.5">
                          <ClipboardCheck className="w-4 h-4 text-[#10B981]" />
                          <span>إقرار الموافقة المستنيرة على جلسة الليزر</span>
                        </span>
                        <span className="text-[10px] font-bold text-[#10B981]">موقّع إلكترونياً</span>
                      </div>
                      <p className="text-[11px] text-ink-muted leading-relaxed">
                        تم التوقيع رقمياً من قبل المراجعة عبر شاشة الآيباد في الاستقبال مع توثيق البصمة الزمنية، والتأكيد على عدم التعرض لأشعة الشمس المباشرة أو استخدام التان خلال الـ 14 يوماً الماضية.
                      </p>
                    </div>

                    {/* Quick Checkout & ZATCA Invoice */}
                    <div className="pt-2 border-t border-mist-gray space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink-muted">قيمة الجلسة (مخصومة من الباقة):</span>
                        <span className="font-bold text-ink">0.00 ر.س (مدفوعة مسبقاً)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink-muted">مستهلكات إضافية (كريم مهدئ):</span>
                        <span className="font-bold text-ink font-mono">92.00 ر.س (شامل الضريبة)</span>
                      </div>

                      <div className="pt-1 flex items-center gap-2">
                        <button
                          type="button"
                          className="flex-1 py-2.5 px-3 rounded-xl bg-ink text-white hover:bg-ink/90 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <BadgeCheck className="w-3.5 h-3.5 text-dusty-blue" />
                          <span>إصدار فاتورة ZATCA بـ QR</span>
                        </button>
                        <button
                          type="button"
                          className="py-2.5 px-3 rounded-xl bg-mist-gray hover:bg-mist-gray/80 text-xs font-semibold text-ink transition-colors"
                        >
                          واتساب
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: The 6 Clinic Pillars Grid */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'الركائز الست لمنظومة العيادات' : 'The 6 Clinical Pillars'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'كل ما يحتاجه مجمع التجميل والجلدية في منصة سحابية واحدة'
                    : 'Everything Your Aesthetic Clinic Needs in One Unified Platform'}
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted">
                  {isAr
                    ? 'من لحظة حجز الموعد وحتى إصدار الفاتورة الضريبية وحساب عمولة الطبيب بكل شفافية ودقة.'
                    : 'From initial consultation to treatment completion, material deduction, and automated doctor payouts.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinicPillars.map((pillar, idx) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-white border border-mist-gray hover:border-dusty-blue/40 hover:shadow-md transition-all space-y-3"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                        <IconComponent className="w-5 h-5 text-dusty-blue" />
                      </div>
                      <h3 className="text-base font-bold text-ink">
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

            {/* Section 4: PDPL & Confidentiality Callout Box */}
            <div className="rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>
                    {isAr
                      ? 'امتثال كامل لنظام حماية البيانات الشخصية السعودي (PDPL)'
                      : 'Strict Saudi Personal Data Protection Law (PDPL) Compliance'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                  {isAr
                    ? 'بيانات مرضاك وملاحظاتهم الطبية في حصن سحابي مشفر'
                    : 'Confidential Patient Health Records in a Bank-Grade Cloud Fortress'}
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isAr
                    ? 'تضع راش إكس خصوصية وأمان المعلومات الطبية فوق كل اعتبار؛ حيث يتم عزل قواعد بيانات كل منشأة بنطاق فرعي مستقل، وتشفير الملاحظات السريرية والموافقات وصور الحالات بتقنيات تشفير بنكي. كما تمنحك المنصة نظام صلاحيات صارم (RBAC) يمنع موظفي الاستقبال من الاطلاع على التاريخ المرضي للمراجعين، مع تسجيل سجل تدقيق إلكتروني غير قابل للتعديل (Audit Trail) لكل عملية فتح أو تعديل على الملف الطبي.'
                    : 'RashX treats clinical privacy with zero compromise: every clinic operates within an isolated tenant database, with medical notes, digital consents, and clinical photos protected under bank-grade encryption. Strict role-based permissions shield medical charts from administrative staff, backed by immutable audit trails recording every chart access event.'}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/${locale}/demo`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-ink text-white hover:bg-ink/90 text-xs font-bold transition-all"
                  >
                    <span>{isAr ? 'احجز استشارة أمان العيادات' : 'Schedule Clinical Security Demo'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 text-dusty-blue" />
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-mist-gray hover:bg-mist-gray/40 text-xs font-semibold text-ink transition-colors"
                  >
                    <span>{isAr ? 'تواصل مع فريق الحلول المتخصصة' : 'Contact Specialist Team'}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 5: FAQ Accordion */}
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-dusty-blue uppercase tracking-wider">
                  {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                  {isAr
                    ? 'أسئلة شائعة حول إدارة عيادات ومجمعات التجميل'
                    : 'Frequently Asked Questions about Aesthetic Clinic Software'}
                </h2>
              </div>

              <div className="space-y-3">
                {clinicFaqs.map((faq, idx) => (
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
                  <Stethoscope className="w-3.5 h-3.5 text-dusty-blue" />
                  <span>{isAr ? 'دقة سريرية وتشغيل احترافي' : 'Clinical Precision & Seamless Ops'}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
                  {isAr
                    ? 'جاهز لضبط تشغيل عيادتك ومضاعفة كفاءة أجهزة التجميل؟'
                    : 'Ready to Streamline Your Clinic & Maximize Aesthetic Device ROI?'}
                </h2>

                <p className="text-xs sm:text-sm text-mist-gray/80 leading-relaxed max-w-xl mx-auto">
                  {isAr
                    ? 'اكتشف كيف تنهي راش إكس تعارض حجز أجهزة الليزر، وتدير باقات الجلسات وعمولات الأطباء والفوترة الإلكترونية في جلسة عرض حي مدتها 20 دقيقة، مع تجربة مجانية لمدة 14 يومًا.'
                    : 'Discover how RashX eliminates laser double-bookings, orchestrates multi-session passes, calculates doctor payouts, and delivers ZATCA compliance in a 20-minute tailored walkthrough. Includes a 14-day free trial.'}
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
                      ? 'مرحبًا راش إكس، أود الاستفسار عن برنامج إدارة عيادات ومجمعات التجميل والجلدية.'
                      : 'Hello RashX, I would like to inquire about the aesthetic and dermatology clinic software.'
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
        )}
      </div>
    </div>
  );
}

