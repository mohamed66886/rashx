/**
 * ============================================================================
 * RashX (راش إكس) | The 10 Core Systems Specifications
 * ============================================================================
 * Complete architectural description of the 10 integrated systems powering
 * beauty centers, salons, and spas in Saudi Arabia.
 */

export interface SystemDetail {
  id: string;
  slug: string;
  order: number;
  iconName: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  keyBenefitsAr: string[];
  keyBenefitsEn: string[];
  saudiContextAr: string;
  saudiContextEn: string;
}

export const SYSTEMS_DATA: SystemDetail[] = [
  {
    id: 'hr',
    slug: 'hr-management',
    order: 1,
    iconName: 'Users',
    nameAr: 'نظام الموارد البشرية والعمولات',
    nameEn: 'HR & Commission Management',
    taglineAr: 'حساب دقيق لعمولات الخدمات، مسيرات الرواتب، وساعات العمل.',
    taglineEn: 'Precise service commissions, automated payroll schedules, and shifts.',
    descriptionAr:
      'نظام مخصص لقطاع التجميل يتعامل مع تعقيدات عمولات خبراء التجميل ومصففي الشعر. يدعم النسب المئوية، المبالغ الثابتة حسب الخدمة، الشرائح التصاعدية، وحسم الغياب والبدلات.',
    descriptionEn:
      'Engineered specifically for the beauty sector handling tier-based specialist commissions, product sales incentives, shift rotas, and payroll processing.',
    keyBenefitsAr: [
      'حساب آلي لعمولة كل موظف فور إغلاق الفاتورة',
      'إدارة الورديات وجداول الدوام وفق نظام العمل السعودي',
      'سجل شامل للوثائق والإقامات وتنبيهات التجديد',
      'لوحة تحكم خاصة لكل موظف لاستعراض إنجازه وعمولاته',
    ],
    keyBenefitsEn: [
      'Automatic commission allocation on invoice checkout',
      'Shift planning compliant with Saudi labor regulations',
      'Staff document & Iqama renewal notifications',
      'Dedicated staff portal for personal performance & earnings',
    ],
    saudiContextAr: 'يدعم متطلبات تسجيل الموظفين وتوثيق العقود ونظام حماية الأجور.',
    saudiContextEn: 'Built to support Saudi labor guidelines and wage protection workflows.',
  },
  {
    id: 'crm',
    slug: 'crm-client-management',
    order: 2,
    iconName: 'UserCheck',
    nameAr: 'نظام إدارة علاقات العملاء (CRM)',
    nameEn: 'CRM & Client Intelligence',
    taglineAr: 'ملف شخصي تفصيلي لكل عميلة يشمل سجل الخدمات وتفضيلات التجميل.',
    taglineEn: 'Complete 360-degree client profiles with styling notes and treatment histories.',
    descriptionAr:
      'ملف متكامل لكل عميل يحفظ أرقام درجات صبغات الشعر السابقة، نوع البشرة، الحساسيات، والملاحظات الشخصية لمقدمي الخدمة لضمان تجربة استثنائية في كل زيارة.',
    descriptionEn:
      'Maintains past hair color formulas, skin profiles, sensitivities, and custom preferences ensuring consistent luxury treatment across all visits.',
    keyBenefitsAr: [
      'سجل رقمي لمعادلات الصبغة وتفضيلات التجميل السابقة',
      'تصنيف العملاء إلى شرائح (VIP، عملاء جدد، عملاء منقطعون)',
      'تتبع إجمالي إنفاق كل عميل ومتوسط قيمة الفاتورة',
      'حماية وتشفير بيانات الاتصال وفق نظام PDPL السعودي',
    ],
    keyBenefitsEn: [
      'Digital formula notebook for hair dye and skin preferences',
      'Automated client tiering (VIP, regulars, lost clients)',
      'Lifetime value (LTV) and average spend analytics',
      'Data encryption fully aligned with Saudi PDPL regulations',
    ],
    saudiContextAr: 'متوافق 100% مع نظام حماية البيانات الشخصية السعودي (PDPL).',
    saudiContextEn: 'Fully compliant with Saudi Personal Data Protection Law (PDPL).',
  },
  {
    id: 'bookings',
    slug: 'booking-system',
    order: 3,
    iconName: 'CalendarCheck',
    nameAr: 'نظام الحجوزات والمواعيد الذكية',
    nameEn: 'Smart Booking & Scheduling',
    taglineAr: 'حجز فوري على مدار 24 ساعة يمنع التضارب ويقلل وقت الانتظار.',
    taglineEn: '24/7 self-service scheduling preventing double bookings and wait times.',
    descriptionAr:
      'محرك جدولة متقدم يربط الموظف المتاح بالكرسي أو الغرفة المناسبة وبمدة الخدمة بدقة. يتيح للعملاء الحجز الذاتي من موقع المنشأة مع إمكانية دفع عربون مقدم.',
    descriptionEn:
      'Advanced scheduling engine mapping specialist availability, chair/treatment room capacity, and dynamic service buffer times.',
    keyBenefitsAr: [
      'صفحة حجز أنيقة بهوية الصالون تفتح على مدار الساعة',
      'إدارة قوائم الانتظار وإعادة التسكين الفوري عند الإلغاء',
      'تحديد وقت مستقطع آلي للتعقيم والتنظيف بين الجلسات',
      'حجز متسلسل للخدمات المتعددة في زيارة واحدة',
    ],
    keyBenefitsEn: [
      'Branded 24/7 online booking interface',
      'Intelligent waitlist with instant opening fill-ups',
      'Configurable sanitation buffer between appointments',
      'Multi-service sequential booking in a single checkout',
    ],
    saudiContextAr: 'يدعم حجز مواسم الأعياد والمناسبات مع سياسات العربون لحماية الصالون من الغياب.',
    saudiContextEn: 'Built for high-volume Eid and wedding seasons with deposit policies.',
  },
  {
    id: 'services',
    slug: 'services-pricing',
    order: 4,
    iconName: 'Sparkles',
    nameAr: 'نظام الخدمات والباقات والأسعار',
    nameEn: 'Services & Dynamic Pricing',
    taglineAr: 'هيكلة باقات العناية المتكاملة والتحكم المرن بالأسعار والمدد.',
    taglineEn: 'Custom beauty service bundling, duration rules, and dynamic price tiers.',
    descriptionAr:
      'تصنيف مرن لكافة خدمات التجميل (شعر، أظافر، مكياج، مساج، حمام مغربي، سبا)، مع تحديد مدد دقيقة لكل خدمة، والتحكم في الأسعار حسب خبرة الأخصائية أو الفرع.',
    descriptionEn:
      'Structured catalog for all salon services (hair, nails, makeup, massage, Moroccan bath, spa) with custom durations and tiered pricing by specialist seniority.',
    keyBenefitsAr: [
      'تصنيف متعدد المستويات للخدمات والخدمات الإضافية',
      'باقات وعروض موسمية قابلة للتخصيص بالكامل',
      'تحديد السعر حسب طول الشعر أو نوع المستحضر',
      'ربط كل خدمة بالمواد المستهلكة من المستودع تلقائياً',
    ],
    keyBenefitsEn: [
      'Multi-level categories and upsell service add-ons',
      'Custom seasonal bundles and membership service packages',
      'Dynamic pricing based on hair length or premium product use',
      'Direct linkage to inventory consumption recipes',
    ],
    saudiContextAr: 'دعم عروض الأعياد، اليوم الوطني، ويوم التأسيس بكل سهولة.',
    saudiContextEn: 'Effortless setup for Saudi National Day, Founding Day, and seasonal promos.',
  },
  {
    id: 'sales',
    slug: 'pos-sales',
    order: 5,
    iconName: 'CreditCard',
    nameAr: 'نظام المبيعات ونقاط البيع السريعة (POS)',
    nameEn: 'Fast Sales & POS Terminal',
    taglineAr: 'إغلاق الفواتير في ثوانٍ مع دعم الفوترة الإلكترونية ووسائل الدفع المتعددة.',
    taglineEn: 'Split-second checkout supporting e-invoicing and all payment methods.',
    descriptionAr:
      'نقطة بيع فائقة السرعة مصممة لشاشات اللمس والآيباد. تدعم تقسيم الفاتورة بين أكثر من طريقة دفع (مدى، Apple Pay، كاش، تمارا، تابي، نقاط الولاء)، مع طباعة رمز الاستجابة السريع (QR Code).',
    descriptionEn:
      'Touch-optimized fast POS terminal supporting split payments (Mada, Apple Pay, Cash, BNPL, Loyalty) with instant QR code generation.',
    keyBenefitsAr: [
      'إصدار فوري للفواتير الضريبية المبسطة مع رمز الاستجابة السريع',
      'دعم تجزئة الفاتورة بين العملاء أو بين وسائل دفع مختلفة',
      'إغلاق الورديات اليومية وتقفيل الصندوق بدقة (Cash Float)',
      'تدعم متطلبات الفوترة الإلكترونية (المرحلة الثانية) وفق حالة المنشأة',
    ],
    keyBenefitsEn: [
      'Instant simplified tax invoice issuance with QR code',
      'Split bill and split payment method capabilities',
      'End-of-shift drawer reconciliation and cash float auditing',
      'Supports ZATCA Phase 2 E-Invoicing criteria per facility onboarding status',
    ],
    saudiContextAr: 'جاهزية لدعم متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA) ومدى وApple Pay.',
    saudiContextEn: 'Built for Saudi Mada, Apple Pay, and ZATCA compliance readiness.',
  },
  {
    id: 'purchasing',
    slug: 'purchasing-suppliers',
    order: 6,
    iconName: 'ShoppingBag',
    nameAr: 'نظام المشتريات وإدارة الموردين',
    nameEn: 'Purchasing & Vendor Management',
    taglineAr: 'تنظيم مشتريات مستحضرات التجميل ومتابعة فواتير ومستحقات الموردين.',
    taglineEn: 'Manage cosmetics procurement, purchase orders, and vendor payables.',
    descriptionAr:
      'دورة مشتريات إلكترونية تبدأ من طلب الشراء، ثم أمر الشراء، ثم مطابقة فحص البضاعة، وتسجيل فاتورة المورد مع التكاليف المضافة، وجدولة الدفعات.',
    descriptionEn:
      'End-to-end procurement cycle from internal supply requests to purchase orders, receiving inspection, and scheduled vendor disbursements.',
    keyBenefitsAr: [
      'دليل رقمي لكافة الموردين ووكلاء مستحضرات التجميل',
      'مقارنة أسعار المنتجات بين الموردين لخفض تكاليف التشغيل',
      'تحديث تلقائي لتكلفة الوحدة وأرصدة المخازن عند الاستلام',
      'سجل مدفوعات وفواتير ضريبية كامل للمشتريات',
    ],
    keyBenefitsEn: [
      'Central vendor directory for cosmetic distributors',
      'Price comparison across vendors to minimize overhead',
      'Automated weighted-average cost updates on receipt',
      'Complete purchasing tax ledger and payment schedules',
    ],
    saudiContextAr: 'يدعم الفواتير الضريبية للموردين المسجلين في ضريبة القيمة المضافة.',
    saudiContextEn: 'Fully compliant with VAT-registered Saudi vendor invoices.',
  },
  {
    id: 'inventory',
    slug: 'inventory-management',
    order: 7,
    iconName: 'Boxes',
    nameAr: 'نظام المخزون وجرد المستودعات',
    nameEn: 'Inventory & Stock Control',
    taglineAr: 'تتبع استهلاك المواد الداخلية ومبيعات التجزئة ومنع الهدر.',
    taglineEn: 'Monitor internal treatment consumption and retail sales preventing waste.',
    descriptionAr:
      'فصل ذكي بين نوعين من المخزون: مخزون الاستهلاك الداخلي (صبغات، شامبوهات، زيوت مساج)، ومخزون بيع التجزئة للعميلات، مع احتساب دقيق لتكلفة كل خدمة.',
    descriptionEn:
      'Dual inventory architecture: Internal Backbar Consumption (dyes, shampoos, massage oils) vs. Front Retail Display, computing exact margins per service.',
    keyBenefitsAr: [
      'خصم المواد المستهلكة آلياً مع كل خدمة تجميل منجزة',
      'تنبيهات فورية بالحد الأدنى لإعادة الطلب قبل نفاد الكمية',
      'جرد دوري سريع بالباركود وكشف فروقات المخزون والهدر',
      'إدارة مخازن متعددة والتحويل الداخلي السلس بين الفروع',
    ],
    keyBenefitsEn: [
      'Automated backbar deduction upon service completion',
      'Real-time low-stock threshold notifications',
      'Fast barcode auditing to pinpoint discrepancies and shrinkage',
      'Multi-warehouse control and seamless branch transfers',
    ],
    saudiContextAr: 'مراقبة هدر المواد المستوردة والمكلفة في المشاغل وصالونات التجميل.',
    saudiContextEn: 'Prevents costly material waste on premium imported salon products.',
  },
  {
    id: 'loyalty',
    slug: 'loyalty-rewards',
    order: 8,
    iconName: 'Gift',
    nameAr: 'نظام الولاء والمكافآت والاشتراكات',
    nameEn: 'Loyalty & Reward Engine',
    taglineAr: 'تحويل العميلات العابرات إلى زائرات دائمات عبر برامج النقاط والاشتراكات.',
    taglineEn: 'Turn first-time visitors into brand champions with automated loyalty programs.',
    descriptionAr:
      'منظومة متكاملة لولاء العملاء تمنح نقاط استرداد نقدي مع كل ريال ينفق، وتتيح بيع بطاقات الهدايا الرقمية، وباقات الجلسات الشهرية المدفوعة مسبقاً.',
    descriptionEn:
      'Comprehensive loyalty engine providing cashback points per SAR spent, digital gift cards, referral rewards, and prepaid recurring packages.',
    keyBenefitsAr: [
      'احتساب نقاط الولاء تلقائياً وإمكانية استبدالها بخدمات أو خصومات',
      'إصدار بطاقات هدايا رقمية تشاركها العميلة عبر الواتساب',
      'باقات واشتراكات دورية (مثل باقات المساج أو تصفيف الشعر الأسبوعي)',
      'كوبونات ترويجية مخصصة لحملات المشاهير والسوشيال ميديا',
    ],
    keyBenefitsEn: [
      'Automated points accrual redeemable on future visits',
      'WhatsApp-shareable digital gift certificates',
      'Prepaid session bundles and weekly blow-dry passes',
      'Influencer promo codes with attribution analytics',
    ],
    saudiContextAr: 'يزيد معدل العودة والتكرار (Retention Rate) في الصالونات السعودية بنسب ملموسة.',
    saudiContextEn: 'Drastically boosts salon repeat bookings in the competitive Saudi market.',
  },
  {
    id: 'notifications',
    slug: 'smart-notifications',
    order: 9,
    iconName: 'BellRing',
    nameAr: 'نظام الإشعارات والرسائل التفاعلية',
    nameEn: 'Smart Notifications & Alerts',
    taglineAr: 'تذكير ذكي بالمواعيد عبر الواتساب والـ SMS لتقليص الغياب والتأخير.',
    taglineEn: 'Automated WhatsApp & SMS reminders eliminating costly no-shows.',
    descriptionAr:
      'إرسال تأكيدات الحجز الفورية، ورسائل التذكير التلقائية قبل الموعد بـ 24 ساعة و 3 ساعات، مع روابط تعديل أو تأكيد الحجز، ورسائل تقييم الخدمة بعد الزيارة.',
    descriptionEn:
      'Dispatches instant booking confirmations, 24h & 3h appointment reminders with one-tap confirmation links, and post-visit review requests.',
    keyBenefitsAr: [
      'رسائل واتساب رسمية وموثقة باسم المنشأة',
      'تخفيض نسبة عدم حضور العميلات بدون موعد مسبق',
      'استطلاع تقييم الخدمة فورياً بعد إتمام الزيارة لرفع تقييم Google Maps',
      'إشعارات للمدير عند العمليات الحساسة (حذف فاتورة، خصم خاص)',
    ],
    keyBenefitsEn: [
      'Official branded WhatsApp interactive notifications',
      'Drastically slashes salon no-show and cancellation rates',
      'Automated post-service survey boosting Google Business ratings',
      'Real-time manager alerts for sensitive actions (voids, overrides)',
    ],
    saudiContextAr: 'الواتساب هو قناة التواصل رقم 1 في السعودية، والرسائل التفاعلية تضمن التجاوب السريع.',
    saudiContextEn: 'WhatsApp is Saudi Arabia’s primary communication channel for high response rates.',
  },
  {
    id: 'reports',
    slug: 'reports-analytics',
    order: 10,
    iconName: 'LineChart',
    nameAr: 'نظام التقارير والتحليلات والذكاء الاصطناعي',
    nameEn: 'Reports & AI Analytics',
    taglineAr: 'قرارات مبنية على أرقام دقيقة وأرباح حقيقية وإقرارات ضريبية جاهزة.',
    taglineEn: 'Data-driven insights, true net profits, and instant VAT declarations.',
    descriptionAr:
      'لوحات بيانات ورسوم بيانية تفاعلية تكشف لك ساعات الذروة، أنشط الأيام، الخدمات الأكثر ربحية، إنتاجية كل أخصائية، وحساب الإقرار الضريبي لهيئة الزكاة بدقة.',
    descriptionEn:
      'Interactive visual dashboards revealing peak traffic hours, top-grossing services, specialist productivity rankings, and automated VAT declaration summaries.',
    keyBenefitsAr: [
      'تقرير الإقرار الضريبي للفوترة الإلكترونية بضغطة زر واحدة',
      'تحليل ساعات الذروة وأوقات الركود لتخطيط العروض الترويجية',
      'مقارنة أداء الفروع في السلاسل ومراكز التجميل المتعددة',
      'حساب صافي الأرباح بعد خصم تكلفة المواد والعمولات والرواتب',
    ],
    keyBenefitsEn: [
      'One-click ZATCA VAT declaration summary report',
      'Peak vs. slow hours analytics to optimize promotions',
      'Multi-branch performance benchmark matrix',
      'Net profit calculator accounting for raw materials and commissions',
    ],
    saudiContextAr: 'تسهيل تقديم الإقرارات الضريبية لـ ZATCA ربع سنويًا أو شهريًا.',
    saudiContextEn: 'Simplifies monthly and quarterly ZATCA VAT tax filing.',
  },
];

