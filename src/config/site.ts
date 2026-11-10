/**
 * ============================================================================
 * RashX (راش إكس) | Official Site Configuration & Company Metadata
 * ============================================================================
 * Contains verified company data, official contacts, social channels,
 * slogans, product structure, ZATCA e-invoicing notice, and security pillars.
 */

export interface FounderInfo {
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  titleAr: string;
}

export interface SocialLinks {
  telegram: string;
  linkedin: string;
  tiktok: string;
  snapchat: string;
  facebook: string;
  x: string;
  instagram: string;
  whatsapp: string;
}

export interface ProductPillar {
  id: 'website' | 'dashboard' | 'client_app' | 'staff_app';
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface SystemItem {
  id: string;
  nameAr: string;
  nameEn: string;
  shortDescAr: string;
  shortDescEn: string;
  slug: string;
}

export interface SiteConfig {
  name: string;
  nameAr: string;
  nameEn: string;
  shortName: string;
  foundedYear: number;
  url: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  whatsappDefaultMessage: string;
  email: string;
  founder: FounderInfo;
  social: SocialLinks;
  slogan: {
    ar: string;
    en: string;
  };
  product: {
    architectureAr: string;
    architectureEn: string;
    pillars: ProductPillar[];
  };
  tenSystems: SystemItem[];
  zatca: {
    noticeAr: string;
    noticeEn: string;
    phase: string;
    phaseAr: string;
  };
  security: {
    rolesAndPermissionsAr: string;
    logicalIsolationAr: string;
    dataProtectionAr: string;
    pdplComplianceAr: string;
  };
  analytics: {
    ga4Id: string;
    gscVerification: string;
    metaPixelId: string;
    snapPixelId: string;
    tiktokPixelId: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: 'RashX – راش إكس',
  nameAr: 'راش إكس',
  nameEn: 'RashX',
  shortName: 'RashX',
  foundedYear: 2026,
  url: 'https://rashx.org',
  phone: '+966 54 808 2945',
  phoneRaw: '+966548082945',
  whatsappUrl: 'https://wa.me/966548082945',
  whatsappDefaultMessage:
    'السلام عليكم، أود الاستفسار عن منصة راش إكس لإدارة الصالونات ومراكز التجميل وحجز عرض تجريبي للنظام.',
  email: 'contact@rashx.org',

  founder: {
    nameAr: 'م. محمد عبده رشاد البهي',
    nameEn: 'Eng. Mohamed Abdo Rashad Elbahy',
    roleAr: 'المؤسس ورئيس تطوير المنتج',
    roleEn: 'Founder & Chief Product Architect',
    titleAr: 'مهندس برمجيات ومؤسس منصة راش إكس',
  },

  social: {
    telegram: 'https://t.me/rashxsa',
    linkedin: 'https://www.linkedin.com/company/rashx',
    tiktok: 'https://www.tiktok.com/@rashx.sa',
    snapchat: 'https://snapchat.com/t/MuwsbAAK',
    facebook: 'https://www.facebook.com/rashx.sa',
    x: 'https://x.com/rashxsa',
    instagram: 'https://www.instagram.com/rashx.sa',
    whatsapp: 'https://wa.me/966548082945',
  },

  slogan: {
    ar: 'راش إكس – أكثر من مجرد إدارة، تجربة رقمية متكاملة.',
    en: 'RashX – More Than Management, A Complete Digital Experience.',
  },

  product: {
    architectureAr:
      'لكل منشأة منظومة سحابية مستقلة بنطاق فرعي خاص (Subdomain) تمنحها هوية رقمية كاملة وسيادة تامة على بياناتها.',
    architectureEn:
      'Each facility receives an independent subdomain ecosystem providing complete digital identity and total data autonomy.',
    pillars: [
      {
        id: 'website',
        titleAr: 'موقع المنشأة الإلكتروني',
        titleEn: 'Facility Website',
        descriptionAr: 'واجهة تسويقية بهوية منشأتك لاستعراض الخدمات والأسعار وفريق العمل واستقبال الحجوزات المباشرة.',
        descriptionEn: 'A branded marketing site displaying your services, staff, pricing, and accepting direct bookings.',
      },
      {
        id: 'dashboard',
        titleAr: 'لوحة التحكم الإدارية',
        titleEn: 'Admin Management Dashboard',
        descriptionAr: 'مركز عمليات شامل لإدارة المبيعات، المخزون، الموظفين، والتقارير المالية والضريبية بدقة متناهية.',
        descriptionEn: 'Comprehensive control center for sales, inventory, staff, and financial and tax reporting.',
      },
      {
        id: 'client_app',
        titleAr: 'تطبيق وواجهة العميل',
        titleEn: 'Client App & Booking Portal',
        descriptionAr: 'تطبيق ويب تقدمي (PWA) فائق السرعة يمكّن عملاءك من الحجز، الدفع المسبق، ومتابعة نقاط الولاء.',
        descriptionEn: 'Progressive Web App enabling seamless appointments, upfront payments, and loyalty rewards tracking.',
      },
      {
        id: 'staff_app',
        titleAr: 'واجهة مقدم الخدمة',
        titleEn: 'Service Provider Interface',
        descriptionAr: 'شاشة مخصصة لخبراء التجميل والحلاقين لتنظيم جدول المواعيد اليومي، تتبع العمولات، وتسجيل الإنجاز.',
        descriptionEn: 'Dedicated specialist interface for daily appointment schedules, commission tracking, and completion logs.',
      },
    ],
  },

  tenSystems: [
    {
      id: 'hr',
      nameAr: 'نظام الموارد البشرية والعمولات',
      nameEn: 'HR & Commission System',
      shortDescAr: 'إدارة عقود الموظفين، الحضور والانصراف، حساب عمولات الخدمات، ومسيرات الرواتب.',
      shortDescEn: 'Staff contracts, attendance, service commission calculations, and payroll processing.',
      slug: 'hr-management',
    },
    {
      id: 'crm',
      nameAr: 'نظام إدارة علاقات العملاء (CRM)',
      nameEn: 'CRM & Client Records',
      shortDescAr: 'سجل تفصيلي لتفضيلات كل عميل، تاريخ الزيارات، الملاحظات الخاصة، وتصنيف العملاء VIP.',
      shortDescEn: 'Detailed client preferences, visit history, beauty notes, and VIP client segmentation.',
      slug: 'crm-client-management',
    },
    {
      id: 'bookings',
      nameAr: 'نظام الحجوزات والمواعيد الذكية',
      nameEn: 'Smart Booking & Scheduling',
      shortDescAr: 'جدولة فورية تمنع التضارب، إدارة قوائم الانتظار، وإتاحة الحجز على مدار الساعة.',
      shortDescEn: 'Conflict-free appointment scheduling, waitlist control, and 24/7 self-service booking.',
      slug: 'booking-system',
    },
    {
      id: 'services',
      nameAr: 'نظام الخدمات والباقات والأسعار',
      nameEn: 'Services & Dynamic Pricing',
      shortDescAr: 'هيكلة باقات التجميل والسبا، تخصيص مدد الخدمات، وتحديد الأسعار والخصومات الموسمية.',
      shortDescEn: 'Beauty & spa service packaging, service durations, and seasonal dynamic pricing.',
      slug: 'services-pricing',
    },
    {
      id: 'sales',
      nameAr: 'نظام المبيعات ونقاط البيع السريعة (POS)',
      nameEn: 'Sales & Fast POS System',
      shortDescAr: 'إصدار فوري للفواتير، دعم طرق الدفع المتعددة (مدى، Apple Pay، كاش)، ودعم متطلبات الفوترة الإلكترونية.',
      shortDescEn: 'Fast checkout, split payments (Mada, Apple Pay, Cash), supporting e-invoicing requirements.',
      slug: 'pos-sales',
    },
    {
      id: 'purchasing',
      nameAr: 'نظام المشتريات وإدارة الموردين',
      nameEn: 'Purchasing & Vendor Management',
      shortDescAr: 'أوامر الشراء الإلكترونية لمستحضرات التجميل، تتبع فواتير الموردين، وإدارة مستحقات الدفع.',
      shortDescEn: 'Cosmetics POs, supplier invoice tracking, payment schedules, and purchase audits.',
      slug: 'purchasing-suppliers',
    },
    {
      id: 'inventory',
      nameAr: 'نظام المخزون وجرد المستودعات',
      nameEn: 'Inventory & Stock Control',
      shortDescAr: 'تتبع استهلاك المواد المستخدمة بالخدمات، تنبيهات إعادة الطلب التلقائية، وجرد دقيق بالباركود.',
      shortDescEn: 'Real-time internal consumption tracking, barcode auditing, and low-stock automated alerts.',
      slug: 'inventory-management',
    },
    {
      id: 'loyalty',
      nameAr: 'نظام الولاء والمكافآت والكوبونات',
      nameEn: 'Loyalty & Reward Engine',
      shortDescAr: 'نقاط الاسترداد النقدي، بطاقات الهدايا الرقمية، قسائم الخصم، وباقات الاشتراكات الدورية.',
      shortDescEn: 'Cashback points, digital gift cards, promo coupons, and recurring memberships.',
      slug: 'loyalty-rewards',
    },
    {
      id: 'notifications',
      nameAr: 'نظام الإشعارات والرسائل التفاعلية',
      nameEn: 'Smart Notifications & Alerts',
      shortDescAr: 'تذكير آلي بمواعيد الحجز عبر الواتساب والرسائل النصية لتقليل الغياب غير المبرر بنسبة ملحوظة.',
      shortDescEn: 'Automated WhatsApp & SMS appointment reminders drastically reducing no-shows.',
      slug: 'smart-notifications',
    },
    {
      id: 'reports',
      nameAr: 'نظام التقارير والتحليلات والذكاء الاصطناعي',
      nameEn: 'Reports & AI Analytics',
      shortDescAr: 'لوحات قياس الأداء المالي، ساعات الذروة، إنتاجية الموظفين، والإقرارات الضريبية بضغطة زر.',
      shortDescEn: 'Financial KPIs, peak hours discovery, staff productivity, and one-click tax reports.',
      slug: 'reports-analytics',
    },
  ],

  zatca: {
    noticeAr:
      'تدعم منصة راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة ومتطلبات الربط والتفعيل الصادرة عن هيئة الزكاة والضريبة والجمارك (ZATCA).',
    noticeEn:
      'RashX supports ZATCA Phase 2 (Integration) E-Invoicing requirements subject to facility onboarding status and integration criteria issued by the Zakat, Tax and Customs Authority.',
    phase: 'Phase 2 (Integration & Linking)',
    phaseAr: 'المرحلة الثانية (الربط والتكامل)',
  },

  security: {
    rolesAndPermissionsAr:
      'نظام أدوار وصلاحيات دقيق يضمن رؤية كل موظف لما يخصه فقط، مع سجل تدقيق كامل لكل العمليات.',
    logicalIsolationAr:
      'عزل منطقي تام وصارم لقاعدة بيانات كل منشأة على حدة (Multi-tenant Logical Isolation) لمنع أي تداخل.',
    dataProtectionAr:
      'حماية الحسابات والبيانات وتشفير عالي المستوى لكافة المعاملات المالية ومعلومات العملاء الحساسة.',
    pdplComplianceAr:
      'الالتزام الكامل بضوابط نظام حماية البيانات الشخصية السعودي (PDPL) ولوائحه التنفيذية.',
  },

  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || 'G-[TODO]',
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '[TODO-GSC-VERIFICATION]',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '[TODO-META-PIXEL]',
    snapPixelId: process.env.NEXT_PUBLIC_SNAP_PIXEL_ID || '[TODO-SNAP-PIXEL]',
    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '[TODO-TIKTOK-PIXEL]',
  },
};

