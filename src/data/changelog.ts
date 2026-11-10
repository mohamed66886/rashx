export type ChangelogCategory = 'launch' | 'product_update' | 'partnership';

export interface ChangelogItem {
  id: string;
  date: string; // ISO date or placeholder
  dateDisplayAr: string;
  dateDisplayEn: string;
  category: ChangelogCategory;
  categoryAr: string;
  categoryEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  highlightsAr: string[];
  highlightsEn: string[];
  badgeAr?: string;
  badgeEn?: string;
  version?: string;
  isInitialLaunch?: boolean;
}

export const CHANGELOG_ITEMS: ChangelogItem[] = [
  // =========================================================================
  // Element 1: أول عنصر: إطلاق RashX 2026 [TODO التاريخ]
  // =========================================================================
  {
    id: 'launch-rashx-2026',
    date: '2026-01-01',
    dateDisplayAr: '2026 م [TODO: تحديد تاريخ الإطلاق الدقيق]',
    dateDisplayEn: '2026 [TODO: Exact Launch Date]',
    category: 'launch',
    categoryAr: 'إطلاق',
    categoryEn: 'Launch',
    titleAr: 'إطلاق RashX 2026 [TODO التاريخ]',
    titleEn: 'Launch of RashX 2026 [TODO Date]',
    descriptionAr:
      'الإطلاق الرسمي لمنظومة راش إكس (RashX) في المملكة العربية السعودية كأول بنية تحتية سحابية مستقلة لإدارة صالونات التجميل، المشاغل النسائية، صالونات الحلاقة الرجالية، ومراكز السبا، بنطاق فرعي مخصص (*.rashx.org) ونموذج 0% عمولة على الحجوزات.',
    descriptionEn:
      'Official commercial launch of the RashX platform in Saudi Arabia as a sovereign cloud infrastructure purpose-built for beauty salons, studios, barbershops, and spas, featuring dedicated subdomains (*.rashx.org) and 0% booking commission.',
    highlightsAr: [
      'توفير نطاق فرعي مخصص ومستقل لكل صالون مع 4 بوابات تشغيلية (موقع المنشأة، لوحة الإدارة، تطبيق العميل PWA، وواجهة مقدم الخدمة).',
      'دعم كامل لمتطلبات الفوترة الإلكترونية المرحلة الثانية (ZATCA - الربط والتكامل) وإصدار الفواتير الضريبية المبسطة.',
      'محرك حجب أرقام جوالات العميلات التلقائي (Phone Masking) للامتثال لنظام حماية البيانات الشخصية السعودي (PDPL).',
      'نموذج اشتراك سحابي شفاف بالريال السعودي بدون أي نسبة مقتطعة من إيرادات أو حجوزات المنشأة (0% عمولة).',
      'جدولة مواعيد لحظية ونظام كاشير سريع يدعم المدفوعات النقدية ومدى و Apple Pay.',
    ],
    highlightsEn: [
      'Dedicated independent subdomain per salon with 4 distinct portals (Public Site, Admin Hub, Client PWA, Specialist UI).',
      'Native ZATCA Phase 2 e-invoicing compliance generating cryptographic QR codes and simplified tax invoices.',
      'Automated client phone number masking (05****1234) adhering to the Saudi Personal Data Protection Law (PDPL).',
      'Transparent flat SAR subscription model with zero booking commissions (0% cut).',
      'Real-time booking calendar and fast POS cashier supporting cash, Mada, and Apple Pay.',
    ],
    badgeAr: 'الإطلاق الرسمي v1.0',
    badgeEn: 'Official Launch v1.0',
    version: 'v1.0.0',
    isInitialLaunch: true,
  },

  // =========================================================================
  // Element 2: تحديث منتج - محرك ولاء العملاء والاشتراكات الشهرية
  // =========================================================================
  {
    id: 'update-loyalty-memberships',
    date: '2026-11-05',
    dateDisplayAr: '5 نوفمبر 2026 م',
    dateDisplayEn: 'November 5, 2026',
    category: 'product_update',
    categoryAr: 'تحديث منتج',
    categoryEn: 'Product Update',
    titleAr: 'إطلاق محرك برامج ولاء العملاء المتقدم والاشتراكات الشهرية المتكررة',
    titleEn: 'Rollout of Advanced Salon Loyalty Points Engine & Recurring Memberships',
    descriptionAr:
      'ترقية كبرى لنظام إدارة علاقات العملاء (CRM) تشمل إطلاق محفظة نقاط الولاء الذكية (Points-to-Rewards) مع إمكانية استبدال النقاط بخدمات تكميلية، ونظام إدارة باقات الاشتراكات الدورية للشعر والأظافر والحلاقة لتأمين سيولة نقدية مسبقة.',
    descriptionEn:
      'Major CRM upgrade introducing our automated Points-to-Rewards engine redeemable for high-margin aesthetic treatments, alongside recurring monthly grooming memberships.',
    highlightsAr: [
      'احتساب نقاط الولاء آلياً مع كل عملية دفع على الكاشير وربطها برقم جوال العميل.',
      'تحديد فترات صلاحية النقاط (مثل 90 يوماً) لتحفيز تكرار الزيارة وتنشيط الحجوزات.',
      'إدارة الاشتراكات الشهرية والباقات مسبقة الدفع مع تتبع رصيد الجلسات المتبقية تلقائياً.',
      'تقارير تفصيلية لمعدلات عودة العملاء (Retention Rate) ومؤشرات القيمة الدائمة (CLV).',
    ],
    highlightsEn: [
      'Automated loyalty point accumulation upon cashier checkout tied to verified phone records.',
      'Configurable point validity horizons (e.g. 90-day expiry) driving repeat booking velocity.',
      'Recurring monthly membership management with automated session counter balance tracking.',
      'Granular retention intelligence dashboards and Customer Lifetime Value (CLV) analytics.',
    ],
    badgeAr: 'تحديث رئيسي v1.2',
    badgeEn: 'Major Update v1.2',
    version: 'v1.2.0',
  },

  // =========================================================================
  // Element 3: شراكة - التكامل مع بوابات الدفع الوطنية
  // =========================================================================
  {
    id: 'partnership-national-payment-gateways',
    date: '2026-10-25',
    dateDisplayAr: '25 أكتوبر 2026 م',
    dateDisplayEn: 'October 25, 2026',
    category: 'partnership',
    categoryAr: 'شراكة',
    categoryEn: 'Partnership',
    titleAr: 'اعتماد التكامل المباشر مع بوابات الدفع الوطنية (مدى و Apple Pay) [TODO تفاصيل المزود]',
    titleEn: 'Native Integration with National Payment Gateways (Mada & Apple Pay) [TODO Provider Details]',
    descriptionAr:
      'إبرام شراكة تكامل تقني مع مزودي بوابات الدفع السحابية المعتمدة في السعودية لتمكين الصالونات من تحصيل العربون المسبق إلكترونياً أثناء حجز العميل من الجوال، وتسوية المدفوعات مباشرة في الحساب البنكي للمنشأة [TODO: تحديد اسم مزود بوابة الدفع المعتمد فور توثيق الشراكة الرسمية].',
    descriptionEn:
      'Technical integration partnership with certified Saudi payment gateways enabling salons to collect upfront appointment deposits online via Mada, Credit Cards, and Apple Pay [TODO: Partner gateway provider name to be confirmed upon final ratification].',
    highlightsAr: [
      'دفع العربون المسبق بضغطة زر عبر Apple Pay ومدى أثناء الحجز من رابط الجوال (PWA).',
      'تخفيض نسبة التخلف عن الحضور (No-Shows) بنسبة تزيد عن 90% خلال مواسم الذروة.',
      'تسوية بنكية مباشرة إلى الحساب التجاري للمنشأة وفق المعايير المصرفية للبنك المركزي السعودي (ساما).',
    ],
    highlightsEn: [
      'One-tap upfront appointment deposits via Mada and Apple Pay during mobile web booking.',
      'Slashing no-show rates by over 90% during peak holiday rushes.',
      'Direct merchant bank account settlements compliant with Saudi Central Bank (SAMA) standards.',
    ],
    badgeAr: 'تكامل معتمد',
    badgeEn: 'Certified Integration',
  },

  // =========================================================================
  // Element 4: تحديث منتج - ترقية محرك الفوترة الإلكترونية ZATCA المرحلة الثانية
  // =========================================================================
  {
    id: 'update-zatca-phase-2-engine',
    date: '2026-10-10',
    dateDisplayAr: '10 أكتوبر 2026 م',
    dateDisplayEn: 'October 10, 2026',
    category: 'product_update',
    categoryAr: 'تحديث منتج',
    categoryEn: 'Product Update',
    titleAr: 'ترقية محرك الفوترة الإلكترونية: دعم الختم التشفيري (CSID) والتكامل السحابي مع ZATCA',
    titleEn: 'ZATCA Phase 2 E-Invoicing Engine: CSID Cryptographic Stamping & Cloud API Integration',
    descriptionAr:
      'تحديث شامل لنظام كاشير راش إكس ليتوافق كلياً مع متطلبات المرحلة الثانية (الربط والتكامل) الصادرة عن هيئة الزكاة والضريبة والجمارك، وتوليد شهادات الامتثال الرقمية آلياً.',
    descriptionEn:
      'Comprehensive upgrade to RashX POS fully conforming with ZATCA Phase 2 integration requirements, generating compliance cryptographic stamps (CSID) and tamper-evident QR codes.',
    highlightsAr: [
      'توليد رموز QR المشفرة بتنسيق Base64 والمعرفات الفريدة (UUID) في أجزاء من الثانية دون إبطاء الكاشير.',
      'منع الحذف أو التعديل اليدوي على الفواتير آلياً، وتفعيل دورة الإشعارات الدائنة والمدينة.',
      'أرشفة سحابية مشفرة لجميع الفواتير الضريبية المبسطة لمدة 5 سنوات التزاماً بالأنظمة.',
    ],
    highlightsEn: [
      'Sub-second generation of cryptographic Base64 QR codes and unbroken UUID sequences.',
      'Strict automated enforcement preventing manual deletion, mandating credit/debit notes.',
      'Encrypted cloud archiving of all simplified tax receipts fulfilling statutory 5-year retention.',
    ],
    badgeAr: 'تحديث أمني ونظامي',
    badgeEn: 'Security & Compliance',
    version: 'v1.1.0',
  },

  // =========================================================================
  // Element 5: شراكة - الربط الرسمي مع واتساب للأعمال (WhatsApp Business API)
  // =========================================================================
  {
    id: 'partnership-whatsapp-business-api',
    date: '2026-09-20',
    dateDisplayAr: '20 سبتمبر 2026 م',
    dateDisplayEn: 'September 20, 2026',
    category: 'partnership',
    categoryAr: 'شراكة',
    categoryEn: 'Partnership',
    titleAr: 'تكامل سحابي مباشر مع واجهات واتساب للأعمال الرسمية (WhatsApp Business API)',
    titleEn: 'Native Cloud Integration with Official WhatsApp Business API',
    descriptionAr:
      'ربط منصة راش إكس مباشرة عبر واجهات برمجة تطبيقات واتساب الرسمية لأتمتة إرسال تأكيدات المواعيد، تذكيرات ما قبل الزيارة، واستدعاء الدور في صالونات الحلاقة دون أي تدخل يدوي من الاستقبال.',
    descriptionEn:
      'Direct integration with official Meta WhatsApp Business API endpoints, automating appointment confirmations, 24-hour advance reminders, and digital chair summoning.',
    highlightsAr: [
      'تأكيد فوري للحجز مع تفاصيل الموعد واسم الأخصائية وموقع الصالون على خرائط جوجل.',
      'تذكير تلقائي قبل الموعد بـ 24 ساعة يتيح للعميل التأكيد أو إعادة الجدولة بضغطة واحدة.',
      'تذاكر الدور واستدعاء الزبون قبل وصول دوره بـ 10 دقائق لإنهاء التكدس في صالات الانتظار.',
    ],
    highlightsEn: [
      'Instant booking confirmations including appointment details, specialist name, and Google Maps pin.',
      'Automated 24h reminders enabling one-click confirmation or rescheduling.',
      'Digital queue summon alerts 10 minutes prior to chair availability eliminating lobby crowding.',
    ],
    badgeAr: 'شراكة تقنية',
    badgeEn: 'Tech Partnership',
  },
];

