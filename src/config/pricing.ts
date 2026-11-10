/**
 * ============================================================================
 * RashX (راش إكس) | Pricing Configuration & Tier Specifications
 * ============================================================================
 * Defines the 3 subscription packages for beauty centers, salons, and spas:
 * 1. الباقة الأساسية (الانطلاق) - Basic
 * 2. الباقة الاحترافية (النمو والتوسع) - Professional
 * 3. باقة المؤسسات (السلاسل والمراكز الكبرى) - Enterprise
 *
 * All pricing figures are placeholders [TODO] in Saudi Riyals (SAR / ر.س).
 * Explicitly states that prices exclude 15% VAT.
 */

export interface PricingFeature {
  textAr: string;
  textEn: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingPlan {
  id: 'starter' | 'growth' | 'enterprise';
  slug: string;
  nameAr: string;
  nameEn: string;
  shortNameAr: string;
  shortNameEn: string;
  taglineAr: string;
  taglineEn: string;
  badgeAr?: string;
  badgeEn?: string;
  isPopular?: boolean;
  priceMonthlySar: string; // [TODO] SAR
  priceAnnualSar: string; // [TODO] SAR
  billingNoteAr: string;
  billingNoteEn: string;
  targetFacilityAr: string;
  targetFacilityEn: string;
  features: PricingFeature[];
  ctaLabelAr: string;
  ctaLabelEn: string;
  ctaHref: string;
}

export interface MatrixRow {
  featureNameAr: string;
  featureNameEn: string;
  categoryAr: string;
  categoryEn: string;
  starter: boolean | string;
  growth: boolean | string;
  enterprise: boolean | string;
  tooltipAr?: string;
  tooltipEn?: string;
}

export interface PricingFAQ {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface PricingConfig {
  currencyCode: 'SAR';
  currencySymbolAr: 'ر.س';
  currencySymbolEn: 'SAR';
  vatRatePercent: 15;
  vatNoticeAr: string;
  vatNoticeEn: string;
  freeTrialDays: 14;
  guaranteeNoteAr: string;
  guaranteeNoteEn: string;
  plans: PricingPlan[];
  comparisonMatrix: MatrixRow[];
  faqs: PricingFAQ[];
}

export const PRICING_CONFIG: PricingConfig = {
  currencyCode: 'SAR',
  currencySymbolAr: 'ر.س',
  currencySymbolEn: 'SAR',
  vatRatePercent: 15,
  vatNoticeAr: 'جميع الأسعار المعروضة غير شاملة لضريبة القيمة المضافة (15%) ويتم احتسابها عند الفوترة.',
  vatNoticeEn: 'All displayed prices exclude 15% Value Added Tax (VAT), calculated upon invoicing.',
  freeTrialDays: 14,
  guaranteeNoteAr:
    'تجربة مجانية كاملة لمدة 14 يومًا لجميع الأنظمة العشرة بدون الحاجة لإدخال بطاقة ائتمان، مع ضمان استرداد مرن [TODO].',
  guaranteeNoteEn:
    '14-day free trial on all 10 systems with no credit card required, plus a flexible satisfaction guarantee [TODO].',

  plans: [
    {
      id: 'starter',
      slug: 'starter-plan',
      nameAr: 'الباقة الأساسية (الانطلاق)',
      nameEn: 'Basic Plan (Starter)',
      shortNameAr: 'الأساسية',
      shortNameEn: 'Basic',
      taglineAr: 'مثالية للصالونات والمشاغل الفردية وصالونات الحلاقة الساعية للتحول الرقمي السلس.',
      taglineEn: 'Ideal for single-location studios, barbershops, and salons transitioning to digital.',
      priceMonthlySar: '[TODO]',
      priceAnnualSar: '[TODO]',
      billingNoteAr: 'ر.س / شهرياً (تدفع سنوياً أو شهرياً) [TODO]',
      billingNoteEn: 'SAR / month (billed annually or monthly) [TODO]',
      targetFacilityAr: 'فرع واحد • حتى 5 موظفين',
      targetFacilityEn: '1 branch • up to 5 staff',
      features: [
        { textAr: 'نطاق فرعي مخصص للمنشأة (yourname.rashx.org)', textEn: 'Dedicated branded subdomain', included: true },
        { textAr: 'موقع المنشأة الإلكتروني لعرض الخدمات والحجز', textEn: 'Facility website & booking portal', included: true },
        { textAr: 'لوحة تحكم إدارية سحابية متكاملة', textEn: 'Cloud administrative dashboard', included: true },
        { textAr: 'تطبيق وواجهة العميل لحجز المواعيد (PWA)', textEn: 'Client appointment web app', included: true },
        { textAr: 'واجهة مقدم الخدمة لجدول المواعيد', textEn: 'Service provider schedule interface', included: true },
        { textAr: 'نظام المبيعات ونقاط البيع السريعة (POS)', textEn: 'Fast Sales & POS checkout', included: true },
        { textAr: 'دعم متطلبات الفوترة الإلكترونية (ZATCA 2)', textEn: 'ZATCA Phase 2 E-Invoicing support', included: true },
        { textAr: 'إدارة المواعيد والحجوزات الأساسية', textEn: 'Appointment & booking management', included: true },
        { textAr: 'سجل العملاء وإدارة الزيارات (CRM)', textEn: 'Basic CRM & client logs', included: true },
        { textAr: 'إدارة المخزون والمشتريات المتقدمة', textEn: 'Advanced multi-warehouse inventory', included: false },
        { textAr: 'برامج الولاء والمكافآت التلقائية', textEn: 'Automated loyalty & reward engine', included: false },
        { textAr: 'إدارة فروع متعددة مركزياً', textEn: 'Central multi-branch management', included: false },
      ],
      ctaLabelAr: 'ابدأ التجربة المجانية',
      ctaLabelEn: 'Start Free Trial',
      ctaHref: '/demo?plan=starter',
    },
    {
      id: 'growth',
      slug: 'growth-plan',
      nameAr: 'الباقة الاحترافية (النمو والتوسع)',
      nameEn: 'Professional Plan (Growth)',
      shortNameAr: 'الاحترافية',
      shortNameEn: 'Professional',
      taglineAr: 'الخيار الأكثر شعبية لمراكز التجميل والسبا الطامحة لمضاعفة الإيرادات والولاء.',
      taglineEn: 'The most popular solution for growing beauty centers & spas scaling revenue.',
      badgeAr: 'الأكثر اختياراً في المملكة',
      badgeEn: 'Most Popular in KSA',
      isPopular: true,
      priceMonthlySar: '[TODO]',
      priceAnnualSar: '[TODO]',
      billingNoteAr: 'ر.س / شهرياً (تدفع سنوياً مع وفر إضافي) [TODO]',
      billingNoteEn: 'SAR / month (billed annually with extra savings) [TODO]',
      targetFacilityAr: 'من 1 إلى 3 فروع • حتى 15 موظفاً',
      targetFacilityEn: '1 to 3 branches • up to 15 staff',
      features: [
        { textAr: 'جميع مميزات الباقة الأساسية كاملة', textEn: 'All Basic Plan features included', included: true, highlight: true },
        { textAr: 'الأنظمة العشرة المتكاملة دون قيود', textEn: 'All 10 integrated management systems', included: true, highlight: true },
        { textAr: 'نظام الولاء والمكافآت وبطاقات الهدايا', textEn: 'Loyalty points, cashback & gift cards', included: true },
        { textAr: 'حساب عمولات الموظفين التلقائي والرواتب', textEn: 'Automated staff commissions & payroll', included: true },
        { textAr: 'جرد المخزون وربط استهلاك المواد بالخدمة', textEn: 'Real-time stock consumption per service', included: true },
        { textAr: 'رسائل واتساب آلية للتذكير بالمواعيد', textEn: 'Automated WhatsApp reminder engine', included: true },
        { textAr: 'تقارير ذكاء اصطناعي لساعات الذروة والأرباح', textEn: 'AI analytics for peak hours & profits', included: true },
        { textAr: 'إدارة حتى 3 فروع من شاشة موحدة', textEn: 'Multi-branch control up to 3 locations', included: true },
        { textAr: 'دعم فني أولوية عبر الواتساب والهاتف', textEn: 'Priority phone & WhatsApp support', included: true },
        { textAr: 'ربط مخصص مع أنظمة المحاسبة الكبرى (API)', textEn: 'Custom Enterprise ERP integrations', included: false },
      ],
      ctaLabelAr: 'احجز عرضًا تجريبيًا',
      ctaLabelEn: 'Book a Demo',
      ctaHref: '/demo?plan=growth',
    },
    {
      id: 'enterprise',
      slug: 'enterprise-plan',
      nameAr: 'باقة المؤسسات (السلاسل والمراكز الكبرى)',
      nameEn: 'Enterprise Plan (Chains & Franchises)',
      shortNameAr: 'المؤسسات',
      shortNameEn: 'Enterprise',
      taglineAr: 'بنية سحابية مخصصة لسلاسل الفروع، العلامات الفاخرة، ومجمعات العناية الكبرى.',
      taglineEn: 'Custom tailored enterprise infrastructure for multi-branch chains and beauty complexes.',
      badgeAr: 'للسلاسل والامتياز التجاري',
      badgeEn: 'For Chains & Franchises',
      priceMonthlySar: '[TODO]',
      priceAnnualSar: '[TODO]',
      billingNoteAr: 'تسعير مخصص بحسب عدد الفروع والمتطلبات [TODO]',
      billingNoteEn: 'Custom pricing based on branch count & custom integrations [TODO]',
      targetFacilityAr: 'سلاسل غير محدودة • موظفون غير محدودين',
      targetFacilityEn: 'Unlimited branches & staff',
      features: [
        { textAr: 'كل ما تقدمه راش إكس بلا حدود', textEn: 'Full access to complete RashX ecosystem', included: true, highlight: true },
        { textAr: 'نطاقات فرعية متعددة لكل فرع مع إدارة مركزية', textEn: 'Multiple subdomains with HQ oversight', included: true },
        { textAr: 'ربط مخصص مع بوابات الدفع وأنظمة ERP الحالية', textEn: 'Dedicated custom ERP & payment gateways', included: true },
        { textAr: 'مدير حساب سعودي مخصص وتدريب ميداني للفريق', textEn: 'Dedicated Saudi account manager & on-site training', included: true },
        { textAr: 'اتفاقية مستوى خدمة متميزة (SLA 99.9%)', textEn: 'Guaranteed 99.9% uptime SLA', included: true },
        { textAr: 'تخصيص كامل لواجهة العميل بهوية المنشأة الحصرية', textEn: 'White-label custom client portal design', included: true },
        { textAr: 'تقارير مالية مجمعة ومقارنات دقيقة بين الفروع', textEn: 'Consolidated multi-branch P&L comparisons', included: true },
        { textAr: 'دعم فني على مدار الساعة 24/7 مخصص', textEn: '24/7 dedicated enterprise response line', included: true },
      ],
      ctaLabelAr: 'تواصل مع فريق المبيعات',
      ctaLabelEn: 'Contact Sales',
      ctaHref: '/contact?type=enterprise',
    },
  ],

  comparisonMatrix: [
    // 1. الحجوزات والمواعيد
    {
      categoryAr: 'الحجوزات والمواعيد',
      categoryEn: 'Bookings & Scheduling',
      featureNameAr: 'حجز ذاتي 24/7 عبر موقع المنشأة وتطبيق العميل',
      featureNameEn: '24/7 Self-Booking Portal',
      starter: true,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الحجوزات والمواعيد',
      categoryEn: 'Bookings & Scheduling',
      featureNameAr: 'جدولة ذكية تمنع التضارب وحجز الكراسي والغرف',
      featureNameEn: 'Smart Collision-Free Scheduling',
      starter: true,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الحجوزات والمواعيد',
      categoryEn: 'Bookings & Scheduling',
      featureNameAr: 'إدارة قوائم الانتظار التلقائية (Waitlist)',
      featureNameEn: 'Automated Waitlist Management',
      starter: 'أساسي',
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الحجوزات والمواعيد',
      categoryEn: 'Bookings & Scheduling',
      featureNameAr: 'رسائل تأكيد وتذكير تفاعلية عبر الواتساب',
      featureNameEn: 'Interactive WhatsApp Reminders',
      starter: false,
      growth: true,
      enterprise: true,
    },

    // 2. الموظفين والعمولات
    {
      categoryAr: 'الموظفين والعمولات',
      categoryEn: 'Staff & Commissions',
      featureNameAr: 'عدد حسابات الموظفين ومقدمي الخدمة',
      featureNameEn: 'Active Staff Accounts',
      starter: 'حتى 5 موظفين',
      growth: 'حتى 15 موظفًا',
      enterprise: 'غير محدود',
    },
    {
      categoryAr: 'الموظفين والعمولات',
      categoryEn: 'Staff & Commissions',
      featureNameAr: 'احتساب آلي لعمولات الخدمات والمنتجات فور الإغلاق',
      featureNameEn: 'Automated Real-Time Commissions',
      starter: 'نسبة ثابتة',
      growth: 'شرائح متعددة ونسب متقدمة',
      enterprise: 'تخصيص كامل وقواعد معقدة',
    },
    {
      categoryAr: 'الموظفين والعمولات',
      categoryEn: 'Staff & Commissions',
      featureNameAr: 'شاشة خاصة لكل أخصائي لمتابعة إنجازه اليومي',
      featureNameEn: 'Private Specialist Portal',
      starter: true,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الموظفين والعمولات',
      categoryEn: 'Staff & Commissions',
      featureNameAr: 'مسيرات الرواتب المتوافقة مع نظام حماية الأجور',
      featureNameEn: 'Wage Protection Payroll Reports',
      starter: false,
      growth: true,
      enterprise: true,
    },

    // 3. المخزون والمشتريات
    {
      categoryAr: 'المخزون والمشتريات',
      categoryEn: 'Inventory & Purchasing',
      featureNameAr: 'فصل مخزون الاستهلاك الداخلي (Backbar) عن التجزئة',
      featureNameEn: 'Dual Backbar & Retail Tracking',
      starter: false,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'المخزون والمشتريات',
      categoryEn: 'Inventory & Purchasing',
      featureNameAr: 'خصم تلقائي لكميات المواد المستهلكة مع كل خدمة',
      featureNameEn: 'Auto-Deduction per Service Completed',
      starter: false,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'المخزون والمشتريات',
      categoryEn: 'Inventory & Purchasing',
      featureNameAr: 'تنبيهات الحد الأدنى لإعادة الطلب وجرد الباركود',
      featureNameEn: 'Low-Stock Alerts & Barcode Audits',
      starter: 'تنبيهات أساسية',
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'المخزون والمشتريات',
      categoryEn: 'Inventory & Purchasing',
      featureNameAr: 'دورة المشتريات ومطابقة فواتير الموردين الضريبية',
      featureNameEn: 'PO Cycles & Vendor Tax Invoices',
      starter: false,
      growth: true,
      enterprise: true,
    },

    // 4. الولاء والمكافآت
    {
      categoryAr: 'الولاء والمكافآت',
      categoryEn: 'Loyalty & Rewards',
      featureNameAr: 'نقاط الاسترداد النقدي التلقائي (Cashback)',
      featureNameEn: 'Automated Cashback Points',
      starter: false,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الولاء والمكافآت',
      categoryEn: 'Loyalty & Rewards',
      featureNameAr: 'بطاقات الهدايا الرقمية وقسائم الخصم بالواتساب',
      featureNameEn: 'WhatsApp Digital Gift Cards',
      starter: false,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الولاء والمكافآت',
      categoryEn: 'Loyalty & Rewards',
      featureNameAr: 'باقات واشتراكات الجلسات الدورية مسبقة الدفع',
      featureNameEn: 'Prepaid Recurring Membership Packages',
      starter: false,
      growth: true,
      enterprise: true,
    },

    // 5. الفوترة الإلكترونية (ZATCA)
    {
      categoryAr: 'الفوترة الإلكترونية (ZATCA)',
      categoryEn: 'E-Invoicing & ZATCA',
      featureNameAr: 'دعم متطلبات الفوترة الإلكترونية (المرحلة 2) وفق حالة المنشأة',
      featureNameEn: 'ZATCA Phase 2 Support per Facility Status',
      starter: true,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الفوترة الإلكترونية (ZATCA)',
      categoryEn: 'E-Invoicing & ZATCA',
      featureNameAr: 'إصدار الفواتير الضريبية المبسطة مع رمز QR مشفر',
      featureNameEn: 'Cryptographic QR Code on Invoices',
      starter: true,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الفوترة الإلكترونية (ZATCA)',
      categoryEn: 'E-Invoicing & ZATCA',
      featureNameAr: 'تقارير الإقرار الضريبي الجاهزة لضريبة القيمة المضافة 15%',
      featureNameEn: '15% VAT Tax Declaration Reports',
      starter: true,
      growth: true,
      enterprise: true,
    },

    // 6. عدد الفروع والنطاق الفرعي
    {
      categoryAr: 'الفروع والنطاق الفرعي',
      categoryEn: 'Branches & Subdomain',
      featureNameAr: 'عدد الفروع المشمولة في النظام',
      featureNameEn: 'Supported Branch Locations',
      starter: 'فرع واحد',
      growth: 'حتى 3 فروع',
      enterprise: 'فروع غير محدودة',
    },
    {
      categoryAr: 'الفروع والنطاق الفرعي',
      categoryEn: 'Branches & Subdomain',
      featureNameAr: 'نطاق فرعي سحابي مستقل (yourname.rashx.org)',
      featureNameEn: 'Dedicated Subdomain Instance',
      starter: true,
      growth: true,
      enterprise: true,
    },
    {
      categoryAr: 'الفروع والنطاق الفرعي',
      categoryEn: 'Branches & Subdomain',
      featureNameAr: 'ربط نطاق خاص مخصص (Custom Domain مثل yoursalon.com)',
      featureNameEn: 'Custom Domain Mapping',
      starter: false,
      growth: 'متاح اختياريًا',
      enterprise: true,
    },
    {
      categoryAr: 'الفروع والنطاق الفرعي',
      categoryEn: 'Branches & Subdomain',
      featureNameAr: 'إدارة مركزية مجمعة للتقارير والتحويل بين الفروع',
      featureNameEn: 'Central HQ Multi-Branch Reporting',
      starter: false,
      growth: true,
      enterprise: true,
    },

    // 7. الدعم الفني والتدريب
    {
      categoryAr: 'الدعم الفني والتدريب',
      categoryEn: 'Support & Training',
      featureNameAr: 'قنوات الدعم الفني وخدمة العملاء',
      featureNameEn: 'Customer Support Channels',
      starter: 'تذاكر وإيميل + مركز مساعدة',
      growth: 'أولوية هاتف وواتساب مباشر',
      enterprise: 'دعم مخصص 24/7 وخط ساخن',
    },
    {
      categoryAr: 'الدعم الفني والتدريب',
      categoryEn: 'Support & Training',
      featureNameAr: 'مدير حساب سعودي مخصص وتدريب الفريق',
      featureNameEn: 'Dedicated Account Manager & Training',
      starter: 'تدريب رقمي مسجل',
      growth: 'جلسات تدريب حية عن بُعد',
      enterprise: 'مدير حساب مخصص وتدريب ميداني',
    },
    {
      categoryAr: 'الدعم الفني والتدريب',
      categoryEn: 'Support & Training',
      featureNameAr: 'اتفاقية مستوى الخدمة وضمان الجاهزية (SLA)',
      featureNameEn: 'Service Level Agreement (SLA)',
      starter: '99.5% قياسي',
      growth: '99.9% متميز',
      enterprise: '99.9% مع تعويضات تشغيلية',
    },
  ],

  faqs: [
    {
      questionAr: 'ما هي طرق الدفع المدعومة للاشتراك في منصة راش إكس في السعودية؟',
      questionEn: 'What payment methods are supported for RashX subscriptions in KSA?',
      answerAr:
        'ندعم خيارات الدفع الأكثر شيوعًا وموثوقية في المملكة العربية السعودية: بطاقات مدى (Mada)، التحويل البنكي المباشر لحساباتنا الرسمية في البنوك السعودية، Apple Pay، والبطاقات الائتمانية (Visa / MasterCard) [TODO]. يتم إصدار فاتورة ضريبية رسمية فور إتمام السداد.',
      answerEn:
        'We support the most trusted payment options in Saudi Arabia: Mada debit cards, official Saudi direct bank transfers, Apple Pay, and credit cards [TODO]. Formal tax invoices are issued instantly upon payment confirmation.',
    },
    {
      questionAr: 'هل الأسعار المعروضة في الباقات تشمل ضريبة القيمة المضافة 15%؟',
      questionEn: 'Do displayed subscription prices include the 15% Value Added Tax (VAT)?',
      answerAr:
        'جميع الأسعار المعروضة في باقات راش إكس غير شاملة لضريبة القيمة المضافة (15%). يتم احتساب نسبة الضريبة النظامية وإضافتها بوضوح في الفاتورة الضريبية الصادرة عند عملية الاشتراك والسداد.',
      answerEn:
        'All displayed prices on RashX packages exclude 15% Value Added Tax (VAT). The statutory tax amount is calculated and itemized clearly on your subscription tax invoice upon checkout.',
    },
    {
      questionAr: 'كيف تعمل التجربة المجانية لمدة 14 يومًا؟ وهل تتطلب بطاقة ائتمان؟',
      questionEn: 'How does the 14-day free trial work, and does it require a credit card?',
      answerAr:
        'تمنحك التجربة المجانية وصولاً كاملاً غير مقيد لكافة الأنظمة العشرة لتجربة إدخال الخدمات، إصدار فواتير كاشير تجريبية، وجدولة المواعيد. لا نطلب منك إدخال أي بطاقة ائتمان لبدء التجربة [TODO]، ولا يوجد أي التزام مالي مسبق.',
      answerEn:
        'The free trial gives you full unrestricted access to all 10 core systems without requiring any credit card upfront [TODO]. You can test POS checkout, appointments, and inventory with zero risk or financial commitment.',
    },
    {
      questionAr: 'هل يمكنني ترقية باقتي أو تغييرها لاحقًا مع نمو صالوني؟',
      questionEn: 'Can I upgrade or adjust my plan later as my salon expands?',
      answerAr:
        'نعم بكل تأكيد. يمكنك الترقية من الباقة الأساسية إلى الباقة الاحترافية أو باقة المؤسسات في أي وقت بضغطة زر من لوحة التحكم، ويتم احتساب الأيام المتبقية من اشتراكك الحالي تلقائيًا بنظام المقاصة التناسبية.',
      answerEn:
        'Yes, absolutely. You can upgrade seamlessly anytime directly from your dashboard, with your remaining unused subscription balance applied proportionally toward the new plan.',
    },
    {
      questionAr: 'هل توجد أي رسوم تأسيس أو رسوم خفية إضافية؟',
      questionEn: 'Are there any setup fees or hidden charges?',
      answerAr:
        'لا توجد أي رسوم خفية إطلاقًا. اشتراكك يشمل الاستضافة السحابية، النطاق الفرعي المخصص، وتحديثات النظام الدورية. خدمات التدريب الميداني والتهيئة الخاصة للسلاسل الكبرى متوفرة بطلب مسبق ضمن باقة المؤسسات [TODO].',
      answerEn:
        'Zero hidden fees. Your subscription covers secure cloud hosting, dedicated subdomain, and ongoing platform updates. Bespoke enterprise on-site onboarding is available upon request [TODO].',
    },
    {
      questionAr: 'ماذا يحدث لبيانات صالوني وعميلاتي إذا قررت عدم تجديد الاشتراك؟',
      questionEn: 'What happens to my salon and client records if I decide to cancel?',
      answerAr:
        'تتمتع بكامل السيادة الرقمية على بياناتك. يمكنك في أي وقت تصدير كامل سجلات عملائك، فواتيرك، وقوائم مخزونك بملفات Excel و PDF بضغطة زر واحدة وفق معايير حماية البيانات الشخصية (PDPL) بالمملكة.',
      answerEn:
        'You retain 100% digital sovereignty. You can export complete client logs, invoices, and inventory ledgers into Excel and PDF at any time in full compliance with Saudi PDPL regulations.',
    },
  ],
};
