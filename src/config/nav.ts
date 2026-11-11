/**
 * ============================================================================
 * RashX (راش إكس) | Navigation Configuration
 * ============================================================================
 * Centralized navigation maps for Header, Mobile Drawer, Footer, and Quick Links.
 */

export interface NavLink {
  labelAr: string;
  labelEn: string;
  href: string;
  badgeAr?: string;
  badgeEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  isExternal?: boolean;
}

export interface NavDropdownGroup {
  groupTitleAr: string;
  groupTitleEn: string;
  items: NavLink[];
}

export interface MainNavItem {
  id: string;
  labelAr: string;
  labelEn: string;
  href?: string;
  dropdown?: NavDropdownGroup[];
}

export interface FooterColumn {
  titleAr: string;
  titleEn: string;
  links: NavLink[];
}

export const MAIN_NAV: MainNavItem[] = [
  {
    id: 'solutions',
    labelAr: 'الحلول والأنظمة',
    labelEn: 'Solutions',
    dropdown: [
      {
        groupTitleAr: 'الأنظمة الأساسية العشرة',
        groupTitleEn: 'The 10 Core Systems',
        items: [
          {
            labelAr: 'الحجوزات والمواعيد الذكية',
            labelEn: 'Smart Booking & Scheduling',
            href: '/solutions/booking-system',
            descriptionAr: 'حجز ذاتي 24/7 وجدولة ذكية تمنع التضارب',
            descriptionEn: '24/7 self-service booking & smart conflict-free scheduling',
          },
          {
            labelAr: 'المبيعات ونقاط البيع (POS)',
            labelEn: 'Fast POS & Sales',
            href: '/solutions/pos-billing',
            descriptionAr: 'إصدار الفواتير الفورية ودعم الدفع السريع',
            descriptionEn: 'Fast checkout & quick payment processing',
          },
          {
            labelAr: 'إدارة العملاء والولاء (CRM)',
            labelEn: 'CRM & Loyalty Engine',
            href: '/solutions/crm-loyalty',
            descriptionAr: 'سجل تفضيلات العملاء، النقاط والمكافآت',
            descriptionEn: 'Client beauty logs, preferences, points & rewards',
          },
          {
            labelAr: 'الموارد البشرية والعمولات',
            labelEn: 'Staff HR & Commissions',
            href: '/solutions/staff-hr',
            descriptionAr: 'حساب عمولات الخدمات تلقائيًا ومسيرات الرواتب',
            descriptionEn: 'Automated service commissions & payroll schedules',
          },
          {
            labelAr: 'المخزون وإدارة المشتريات',
            labelEn: 'Inventory & Purchasing',
            href: '/solutions/inventory-purchasing',
            descriptionAr: 'جرد المواد، استهلاك المنتجات وتنبيهات النواقص',
            descriptionEn: 'Stock auditing, product consumption & low-stock alerts',
          },
          {
            labelAr: 'التقارير والذكاء الاصطناعي',
            labelEn: 'AI Reports & Analytics',
            href: '/solutions/analytics-ai',
            descriptionAr: 'تحليل ساعات الذروة، الأرباح ونمو المنشأة',
            descriptionEn: 'Peak hours discovery, revenue tracking & salon growth',
          },
        ],
      },
      {
        groupTitleAr: 'حلول حسب نوع المنشأة',
        groupTitleEn: 'By Facility Type',
        items: [
          {
            labelAr: 'الصالونات النسائية والمشاغل',
            labelEn: 'Beauty Salons & Studios',
            href: '/for/beauty-salons',
            descriptionAr: 'حل متكامل لتنظيم خدمات التصفيف والمكياج والعناية',
            descriptionEn: 'Complete management for hair, makeup & styling studios',
          },
          {
            labelAr: 'الصالونات الرجالية ومراكز الحلاقة',
            labelEn: 'Barbershops & Grooming',
            href: '/for/barbershops',
            descriptionAr: 'سرعة إنهاء الفواتير وإدارة كراسي الحلاقة والعمولات',
            descriptionEn: 'Fast chair turnover, queue control & barber commissions',
          },
          {
            labelAr: 'مراكز السبا والاستجمام',
            labelEn: 'Spa & Wellness Centers',
            href: '/for/spas',
            descriptionAr: 'إدارة غرف المساج، الجلسات الممتدة والباقات المجمعة',
            descriptionEn: 'Session suites management, extended packages & relaxation',
          },
          {
            labelAr: 'مجمعات وعيادات التجميل',
            labelEn: 'Beauty Clinics & Polyclinics',
            href: '/for/clinics',
            descriptionAr: 'جدولة دقيقة للمختصين والأجهزة مع سرية تامة للسجلات',
            descriptionEn: 'Precision scheduling for specialists and devices',
          },
        ],
      },
    ],
  },
  {
    id: 'features',
    labelAr: 'المميزات',
    labelEn: 'Features',
    href: '/features',
  },
  {
    id: 'pricing',
    labelAr: 'الأسعار',
    labelEn: 'Pricing',
    href: '/pricing',
  },
  {
    id: 'security',
    labelAr: 'الأمان والامتثال',
    labelEn: 'Security & PDPL',
    href: '/security',
  },
  {
    id: 'about',
    labelAr: 'من نحن',
    labelEn: 'About Us',
    href: '/about',
  },
  {
    id: 'blog',
    labelAr: 'المدونة',
    labelEn: 'Blog',
    href: '/blog',
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    titleAr: 'الأنظمة والحلول',
    titleEn: 'Systems & Solutions',
    links: [
      { labelAr: 'نظام الحجوزات والمواعيد', labelEn: 'Bookings & Scheduling', href: '/solutions/booking-system' },
      { labelAr: 'نقاط البيع والمبيعات', labelEn: 'Fast POS & Invoicing', href: '/solutions/pos-billing' },
      { labelAr: 'إدارة علاقات العملاء (CRM)', labelEn: 'Client CRM & Preferences', href: '/solutions/crm-loyalty' },
      { labelAr: 'الموارد البشرية والعمولات', labelEn: 'Staff HR & Commissions', href: '/solutions/staff-hr' },
      { labelAr: 'إدارة المخزون والمشتريات', labelEn: 'Inventory & Supplies', href: '/solutions/inventory-purchasing' },
      { labelAr: 'التقارير وتحليلات النمو', labelEn: 'Reports & Growth Analytics', href: '/solutions/analytics-ai' },
    ],
  },
  {
    titleAr: 'قطاعات المنشآت',
    titleEn: 'Target Facilities',
    links: [
      { labelAr: 'الصالونات والمشاغل النسائية', labelEn: 'Women Beauty Salons & Studios', href: '/for/beauty-salons' },
      { labelAr: 'صالونات الحلاقة الرجالية', labelEn: 'Barbershops', href: '/for/barbershops' },
      { labelAr: 'مراكز السبا والاستجمام', labelEn: 'Spa & Wellness', href: '/for/spas' },
      { labelAr: 'عيادات ومجمعات التجميل', labelEn: 'Beauty Clinics', href: '/for/clinics' },
    ],
  },
  {
    titleAr: 'المنصة والتقنية',
    titleEn: 'Platform & Tech',
    links: [
      { labelAr: 'استعراض المميزات الشاملة', labelEn: 'All Platform Features', href: '/features' },
      { labelAr: 'خطط وأسعار الاشتراكات', labelEn: 'Subscription Plans', href: '/pricing' },
      { labelAr: 'النطاق الفرعي والمنظومة المستقلة', labelEn: 'Subdomain Architecture', href: '/security#architecture' },
      { labelAr: 'الفوترة الإلكترونية (ZATCA 2)', labelEn: 'ZATCA E-Invoicing Phase 2', href: '/zatca', badgeAr: 'المرحلة 2' },
      { labelAr: 'أمان البيانات والامتثال لنظام PDPL', labelEn: 'Data Privacy & PDPL', href: '/security' },
      { labelAr: 'الأسئلة الشائعة', labelEn: 'Frequently Asked Questions', href: '/faq' },
    ],
  },
  {
    titleAr: 'الشركة والتواصل',
    titleEn: 'Company & Contact',
    links: [
      { labelAr: 'عن منصة راش إكس', labelEn: 'About RashX', href: '/about' },
      { labelAr: 'المؤسس ورؤية المنظومة', labelEn: 'Founder & Vision', href: '/founder' },
      { labelAr: 'المدن والمناطق المغطاة', labelEn: 'Saudi Cities Covered', href: '/cities/riyadh' },
      { labelAr: 'المدونة ومقالات الإدارة', labelEn: 'Beauty Management Blog', href: '/blog' },
      { labelAr: 'سجل التحديثات والأخبار', labelEn: 'Changelog & News', href: '/changelog', badgeAr: 'جديد' },
      { labelAr: 'تواصل مع الدعم والمبيعات', labelEn: 'Contact Sales & Support', href: '/contact' },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { labelAr: 'سياسة الخصوصية (نظام PDPL)', labelEn: 'Privacy Policy (PDPL)', href: '/privacy' },
  { labelAr: 'شروط وأحكام الخدمة', labelEn: 'Terms of Service', href: '/terms' },
  { labelAr: 'إعدادات الكوكيز', labelEn: 'Cookie Settings', href: '#cookies' },
  { labelAr: 'خريطة الموقع', labelEn: 'Sitemap', href: '/sitemap.xml' },
];

