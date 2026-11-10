export interface FAQItem {
  id: string;
  category: 'general' | 'pricing' | 'zatca' | 'security' | 'onboarding' | 'whitelabel';
  categoryAr: string;
  categoryEn: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export const FAQ_CATEGORIES = [
  { id: 'all', nameAr: 'جميع الأسئلة', nameEn: 'All Questions' },
  { id: 'general', nameAr: 'عامة', nameEn: 'General' },
  { id: 'pricing', nameAr: 'الأسعار', nameEn: 'Pricing' },
  { id: 'zatca', nameAr: 'الفوترة الإلكترونية', nameEn: 'E-Invoicing (ZATCA)' },
  { id: 'security', nameAr: 'الأمان والخصوصية', nameEn: 'Security & Privacy' },
  { id: 'onboarding', nameAr: 'التفعيل والدعم', nameEn: 'Onboarding & Support' },
  { id: 'whitelabel', nameAr: 'White Label والتخصيص', nameEn: 'White Label & Customization' },
] as const;

export const RASHX_FAQS: FAQItem[] = [
  /* =========================================================================
     1. عامة (General) - 4 Questions
     ========================================================================= */
  {
    id: 'gen-1',
    category: 'general',
    categoryAr: 'عامة',
    categoryEn: 'General',
    questionAr: 'ما هي منصة راش إكس (RashX) وما الأنشطة التي تخدمها؟',
    questionEn: 'What is RashX and what types of facilities does it serve?',
    answerAr:
      'راش إكس هي منظومة سحابية متكاملة لإدارة منشآت التجميل والعناية في المملكة العربية السعودية، تشمل: الصالونات والمشاغل النسائية، صالونات الحلاقة الرجالية، مراكز السبا والاستجمام، وعيادات ومجمعات التجميل والجلدية.',
    answerEn:
      'RashX is an all-in-one cloud management platform tailored for the Saudi beauty and grooming sector, powering women beauty salons and studios, barbershops, luxury spas, and cosmetic dermatology clinics.',
  },
  {
    id: 'gen-2',
    category: 'general',
    categoryAr: 'عامة',
    categoryEn: 'General',
    questionAr: 'ما هي البوابات الرقمية الأربع التي تحصل عليها كل منشأة؟',
    questionEn: 'What are the 4 dedicated portals provided to every facility?',
    answerAr:
      'تحصل كل منشأة على 4 بوابات مخصصة بنطاق فرعي مستقل (*.rashx.org): 1) موقع تسويقي عام للمنشأة، 2) لوحة تحكم إدارية شاملة للمالك والمديرين، 3) تطبيق ويب تقدمي للعميل (PWA) للحجز والمكافآت، و4) واجهة خاصة بمقدم الخدمة والأخصائية.',
    answerEn:
      'Every facility operates on an isolated subdomain (*.rashx.org) featuring 4 distinct portals: 1) Public marketing website, 2) Comprehensive administrative dashboard, 3) Client Progressive Web App (PWA) for self-booking and rewards, and 4) Dedicated Specialist Interface.',
  },
  {
    id: 'gen-3',
    category: 'general',
    categoryAr: 'عامة',
    categoryEn: 'General',
    questionAr: 'هل يحتاج العميل إلى تحميل تطبيق من App Store أو Google Play لحجز موعده؟',
    questionEn: 'Do clients need to install an app from App Store or Google Play to book?',
    answerAr:
      'لا، لا يحتاج العميل لتحميل أي تطبيق؛ حيث يعمل تطبيق العميل بتقنية الويب التقدمي (PWA) الخفيف والسريع، ويفتح مباشرة عبر الرابط في أقل من ثانية من إنستغرام أو واتساب أو خرائط جوجل دون أي مساحة تخزينية.',
    answerEn:
      'No app store installation is needed. The Client Web App utilizes Progressive Web App (PWA) technology, launching instantly via link in under 1 second from Instagram, WhatsApp, or Google Maps.',
  },
  {
    id: 'gen-4',
    category: 'general',
    categoryAr: 'عامة',
    categoryEn: 'General',
    questionAr: 'هل يدعم النظام إدارة سلاسل الفروع المتعددة بحساب موحد؟',
    questionEn: 'Does the system support managing multi-branch salon chains from a unified account?',
    answerAr:
      'نعم، توفر المنصة لوحة قيادة مركزية متعددة الفروع تمكن المالك من مراقبة إيرادات كافة الفروع، مقارنة مؤشرات الأداء، وتوزيع الكوادر ونقل المخزون بين الفروع، مع عزل كامل لصلاحيات موظفي كل فرع.',
    answerEn:
      'Yes, a centralized multi-branch command hub allows enterprise owners to monitor location revenues, benchmark operational KPIs, dispatch staff, and transfer stock with strict branch-isolated role permissions.',
  },

  /* =========================================================================
     2. الأسعار (Pricing) - 4 Questions
     ========================================================================= */
  {
    id: 'price-1',
    category: 'pricing',
    categoryAr: 'الأسعار',
    categoryEn: 'Pricing',
    questionAr: 'كيف يتم احتساب تكلفة الاشتراك في راش إكس؟',
    questionEn: 'How are subscription costs calculated in RashX?',
    answerAr:
      'تُحتسب الاشتراكات وفق باقات دورية شفافة (شهرية وسنوية) بالريال السعودي (SAR) بحسب حجم المنشأة وعدد الفروع، بدون أي رسوم خفية. تفاصيل الأسعار الدقيقة متوفرة في صفحة الأسعار وتخضع لـ [TODO: اعتماد التسعير النهائي للباقات].',
    answerEn:
      'Subscriptions are calculated on transparent recurring tiers (monthly and annual) in Saudi Riyals (SAR) based on facility scale and branch count, with zero hidden charges. Exact figures are listed on the pricing page pending [TODO: Final Tier Pricing Ratification].',
  },
  {
    id: 'price-2',
    category: 'pricing',
    categoryAr: 'الأسعار',
    categoryEn: 'Pricing',
    questionAr: 'هل توجد أي عمولات أو نسب مقتطعة على حجوزات أو مبيعات الصالون؟',
    questionEn: 'Are there any commissions or percentage fees deducted from bookings or sales?',
    answerAr:
      'لا على الإطلاق. لا تقتطع راش إكس أي نسبة أو عمولة من مبيعات أو حجوزات الصالون، وتعود كافة إيرادات المنشأة لمالكها بنسبة 100%.',
    answerEn:
      'Zero booking commissions. RashX never takes a percentage cut from your appointments or product sales; 100% of facility revenue remains entirely yours.',
  },
  {
    id: 'price-3',
    category: 'pricing',
    categoryAr: 'الأسعار',
    categoryEn: 'Pricing',
    questionAr: 'هل تشمل الأسعار المعلنة ضريبة القيمة المضافة (15%)؟',
    questionEn: 'Do published subscription rates include the 15% Value Added Tax (VAT)?',
    answerAr:
      'تُعرض أسعار باقات الاشتراك غير شاملة ضريبة القيمة المضافة، وتُضاف نسبة الـ 15% المقررة نظاماً في المملكة العربية السعودية عند إصدار الفاتورة الضريبية للاشتراك.',
    answerEn:
      'Subscription rates are displayed exclusive of VAT; the statutory 15% Value Added Tax in Saudi Arabia is calculated and added upon issuing the subscription tax invoice.',
  },
  {
    id: 'price-4',
    category: 'pricing',
    categoryAr: 'الأسعار',
    categoryEn: 'Pricing',
    questionAr: 'هل تتوفر فترة تجربة مجانية قبل تأكيد الاشتراك؟',
    questionEn: 'Is there a free trial period available before committing to a paid subscription?',
    answerAr:
      'نعم، تمنح راش إكس كل منشأة جديدة فترة تجربة مجانية كاملة المزايا لمدة 14 يوماً دون الحاجة لإدخال بطاقة بنكية، مع دعم وتدريب مباشر.',
    answerEn:
      'Yes, new facilities enjoy an unrestricted 14-day free trial with no credit card required, including live setup support and staff onboarding.',
  },

  /* =========================================================================
     3. الفوترة الإلكترونية (E-Invoicing & ZATCA) - 4 Questions
     ========================================================================= */
  {
    id: 'zatca-1',
    category: 'zatca',
    categoryAr: 'الفوترة الإلكترونية',
    categoryEn: 'E-Invoicing (ZATCA)',
    questionAr: 'هل تدعم راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل)؟',
    questionEn: 'Does RashX support ZATCA Phase 2 e-invoicing integration requirements?',
    answerAr:
      'تدعم منصة راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة ومتطلبات الربط والتفعيل الصادرة عن هيئة الزكاة والضريبة والجمارك (ZATCA)، مع توليد فواتير ضريبية مبسطة بـ QR فوري وربط عبر واجهات API المعتمدة.',
    answerEn:
      'RashX supports ZATCA Phase 2 e-invoicing integration directives in accordance with the facility status and technical guidelines issued by ZATCA, generating QR-encoded simplified tax invoices and integrating via authorized APIs.',
  },
  {
    id: 'zatca-2',
    category: 'zatca',
    categoryAr: 'الفوترة الإلكترونية',
    categoryEn: 'E-Invoicing (ZATCA)',
    questionAr: 'هل تدّعي منصة راش إكس اعتماداً رسمياً من ZATCA؟',
    questionEn: 'Does RashX claim official endorsement or accreditation from ZATCA?',
    answerAr:
      'لا تدّعي راش إكس اعتماداً رسمياً؛ بل تدعم المنظومة المتطلبات الفنية وفق الأنظمة الصادرة عن الهيئة والتي قد تخضع للتغيير والتحديث، وتحدد الهيئة اشتراطات وتواريخ إلزام كل منشأة (لمزيد من التفاصيل يرجى مراجعة الموقع الرسمي zatca.gov.sa).',
    answerEn:
      'RashX does not claim official accreditation; the platform complies with technical specifications mandated by the authority, which remain subject to regulatory updates. Facility deadlines and wave requirements are determined solely by ZATCA (visit zatca.gov.sa).',
  },
  {
    id: 'zatca-3',
    category: 'zatca',
    categoryAr: 'الفوترة الإلكترونية',
    categoryEn: 'E-Invoicing (ZATCA)',
    questionAr: 'كيف يطبع النظام الفواتير الضريبية المبسطة وما البيانات الإلزامية فيها؟',
    questionEn: 'How does the system print simplified tax invoices and what required fields are included?',
    answerAr:
      'يطبع النظام الفواتير تلقائياً على كافة الطابعات الحرارية القياسية، متضمنة: اسم المنشأة، الرقم الضريبي، المعرف الفريد (UUID)، الطابع الزمني، ورمز الاستجابة السريعة (QR Code) المشفر طبقاً للمواصفات الفنية المعتمدة.',
    answerEn:
      'Invoices print automatically on standard thermal receipt printers, including facility trading name, VAT registration number, cryptographic UUID, timestamp, and compliant encrypted QR code.',
  },
  {
    id: 'zatca-4',
    category: 'zatca',
    categoryAr: 'الفوترة الإلكترونية',
    categoryEn: 'E-Invoicing (ZATCA)',
    questionAr: 'هل يدعم نظام الكاشير تجزئة الفاتورة الواحدة بين أكثر من طريقة دفع؟',
    questionEn: 'Does the POS support splitting a single bill across multiple payment methods?',
    answerAr:
      'نعم، يتيح الكاشير تجزئة الفاتورة بمرونة بين مدى، البطاقات الائتمانية، Apple Pay، مبالغ نقدية، أو استبدال رصيد محفظة نقاط الولاء في نفس الفاتورة مع إيصال موحد يوضح تفاصيل السداد بدقة.',
    answerEn:
      'Yes, the POS effortlessly splits a transaction across Mada, credit cards, Apple Pay, cash, or loyalty wallet point redemption on a single unified receipt.',
  },

  /* =========================================================================
     4. الأمان والخصوصية (Security & Privacy) - 4 Questions
     ========================================================================= */
  {
    id: 'sec-1',
    category: 'security',
    categoryAr: 'الأمان والخصوصية',
    categoryEn: 'Security & Privacy',
    questionAr: 'كيف يمتثل النظام لنظام حماية البيانات الشخصية السعودي (PDPL)؟',
    questionEn: 'How does the platform comply with the Saudi Personal Data Protection Law (PDPL)?',
    answerAr:
      'صُمم النظام وفق ضوابط نظام PDPL الصادر بالمرسوم الملكي (م/19) ولائحته التنفيذية؛ بما يشمل آليات الموافقة الصريحة، حجب أرقام جوالات العميلات، عزل قواعد البيانات السحابية، وتمكين المنشأة من تلبية حقوق العميل في تصحيح أو إتلاف بياناته.',
    answerEn:
      'The platform was architected under the Saudi PDPL (Royal Decree M/19), providing lawful consent workflows, client mobile number masking, tenant database segregation, and data subject access and deletion mechanisms.',
  },
  {
    id: 'sec-2',
    category: 'security',
    categoryAr: 'الأمان والخصوصية',
    categoryEn: 'Security & Privacy',
    questionAr: 'ما هي ميزة حجب أرقام الهواتف (Phone Masking) وكيف تحمي الصالون من تسريب العملاء؟',
    questionEn: 'What is phone number masking and how does it prevent client poaching?',
    answerAr:
      'تُخفي المنظومة أرقام جوالات العميلات تلقائياً على شاشات موظفي الاستقبال والأخصائيات (تظهر بصيغة 05****1234)، لمنع نسخ أرقام العميلات أو التواصل الشخصي معهن، مع قفل تصدير القوائم على المالك فقط بتوثيق ثنائي.',
    answerEn:
      'Automated phone masking shields customer numbers from receptionists and specialists (displayed as 05****1234), stopping staff from saving client contacts, while bulk exports are hard-locked to verified primary owners.',
  },
  {
    id: 'sec-3',
    category: 'security',
    categoryAr: 'الأمان والخصوصية',
    categoryEn: 'Security & Privacy',
    questionAr: 'كيف تضمن راش إكس عزل بيانات صالوني عن باقي المنشآت؟',
    questionEn: 'How does RashX ensure my salon data is isolated from other facilities?',
    answerAr:
      'تحصل كل منشأة على نطاق فرعي مخصص (*.rashx.org) مع عزل منطقي كامل لمنطق التطبيق وقواعد البيانات، بحيث يستحيل برمجياً ومعمارياً وصول أي مستخدم أو صالون آخر إلى عملائك أو مبيعاتك.',
    answerEn:
      'Every facility operates on an isolated sovereign subdomain (*.rashx.org) backed by strict database tenancy isolation, making cross-tenant data access architecturally impossible.',
  },
  {
    id: 'sec-4',
    category: 'security',
    categoryAr: 'الأمان والخصوصية',
    categoryEn: 'Security & Privacy',
    questionAr: 'ما هي معايير التشفير المطبقة لحماية البيانات والنسخ الاحتياطي؟',
    questionEn: 'What encryption standards safeguard platform data and backups?',
    answerAr:
      'تُشفر كافة البيانات أثناء النقل ببروتوكول TLS 1.3 فائق الأمان، بينما تُشفر البيانات الساكنة وقواعد البيانات والنسخ الاحتياطية اليومية بنظام التشفير القياسي العالمي AES-256.',
    answerEn:
      'Data in transit is guarded by high-security TLS 1.3 encryption, while stored databases and daily automated backups are encrypted using standard AES-256 bit protocols.',
  },

  /* =========================================================================
     5. التفعيل والدعم (Onboarding & Support) - 4 Questions
     ========================================================================= */
  {
    id: 'onb-1',
    category: 'onboarding',
    categoryAr: 'التفعيل والدعم',
    categoryEn: 'Onboarding & Support',
    questionAr: 'كم يستغرق إعداد وتفعيل حساب الصالون لبدء استقبال الحجوزات؟',
    questionEn: 'How long does it take to activate and configure a salon account to start booking?',
    answerAr:
      'يتم إنشاء حساب المنشأة وتخصيص نطاقها الفرعي فورياً، وتستغرق تهيئة قائمة الخدمات، الأسعار، وبيانات الموظفين في المعتاد ما بين عدة ساعات إلى 24 ساعة بمساعدة فريق الدعم والتهيئة.',
    answerEn:
      'Account creation and subdomain provisioning occur instantly, while catalog configuration, pricing, and staff rosters typically take between a few hours to 24 hours with specialist guidance.',
  },
  {
    id: 'onb-2',
    category: 'onboarding',
    categoryAr: 'التفعيل والدعم',
    categoryEn: 'Onboarding & Support',
    questionAr: 'كيف يتم تدريب موظفي الصالون ومقدمي الخدمة على استخدام المنظومة؟',
    questionEn: 'How are salon staff and specialists trained on using the system?',
    answerAr:
      'نوفر جلسات تدريب تفاعلية أونلاين لفريق الإدارة والكاشير، بالإضافة إلى أدلة إرشادية وفيديوهات توضيحية مبسطة لواجهة مقدم الخدمة وتطبيق العميل لضمان سهولة وسرعة التبني.',
    answerEn:
      'We conduct interactive online walkthroughs for administrators and receptionists, accompanied by concise visual guides for the specialist and client portals.',
  },
  {
    id: 'onb-3',
    category: 'onboarding',
    categoryAr: 'التفعيل والدعم',
    categoryEn: 'Onboarding & Support',
    questionAr: 'ما هي قنوات وأوقات الدعم الفني المتاحة للصالونات المشتركة؟',
    questionEn: 'What support channels and working hours are available to subscribed salons?',
    answerAr:
      'يتوفر فريق الدعم الفني عبر المحادثة المباشرة في واتساب، والبريد الإلكتروني، والهاتف خلال ساعات العمل بتوقيت المملكة العربية السعودية (AST)، لمساندة منشأتك أثناء أوقات العمل والمواسم.',
    answerEn:
      'Technical support is available via direct WhatsApp chat, email, and phone during Saudi business hours (AST), assisting your facility during active peak operational shifts.',
  },
  {
    id: 'onb-4',
    category: 'onboarding',
    categoryAr: 'التفعيل والدعم',
    categoryEn: 'Onboarding & Support',
    questionAr: 'هل يمكن استيراد قائمة العملاء وسجلات الخدمات الحالية من نظام سابق؟',
    questionEn: 'Can existing client lists and service catalogs be migrated from previous software?',
    answerAr:
      'نعم، يتيح فريق التهيئة استيراد بيانات العملاء والخدمات وأرصدة المخزون عبر قوالب إكسل (CSV/Excel) منظمة دون أي فقدان لبياناتك السابقة.',
    answerEn:
      'Yes, our onboarding team assists with importing customer lists, service catalogs, and inventory balances via structured CSV/Excel templates with zero data loss.',
  },

  /* =========================================================================
     6. White Label والتخصيص (White Label & Subdomain) - 4 Questions
     ========================================================================= */
  {
    id: 'wl-1',
    category: 'whitelabel',
    categoryAr: 'White Label والتخصيص',
    categoryEn: 'White Label & Customization',
    questionAr: 'ما هو النطاق الفرعي المستقل (*.rashx.org) وكيف يعمل لصالوني؟',
    questionEn: 'What is the dedicated isolated subdomain (*.rashx.org) and how does it work?',
    answerAr:
      'تمنح راش إكس صالونك نطاقاً فرعياً مخصصاً باسمك التجاري (مثل `salon-name.rashx.org`) يعمل كعنوان رسمي مستقل لموقعك وتطبيق حجز عميلاتك دون مشاركة مسار مشترك أو دليل عام مع صالونات أخرى.',
    answerEn:
      'RashX provisions a dedicated subdomain under your brand (e.g. `salon-name.rashx.org`) serving as your independent web portal and booking PWA, with zero competitor sharing or marketplace directories.',
  },
  {
    id: 'wl-2',
    category: 'whitelabel',
    categoryAr: 'White Label والتخصيص',
    categoryEn: 'White Label & Customization',
    questionAr: 'ما هي عناصر الهوية البصرية التي يمكن تخصيصها للمنشأة؟',
    questionEn: 'Which visual brand elements can be customized for my facility?',
    answerAr:
      'يمكنك تخصيص: اسم الصالون، الشعار (Logo)، الأيقونة (Favicon)، الألوان الرئيسية المتوافقة مع هوية صالونك، صور الخدمات، نبذة المنشأة، وسائل التواصل الاجتماعي، ومواقع الفروع.',
    answerEn:
      'You can customize: trading name, brand logo, browser favicon, brand color palette, service catalog imagery, facility bio, social links, and branch location maps.',
  },
  {
    id: 'wl-3',
    category: 'whitelabel',
    categoryAr: 'White Label والتخصيص',
    categoryEn: 'White Label & Customization',
    questionAr: 'هل يدعم النظام ربط نطاق خاص بالكامل (Custom Domain مثل salonname.com)؟',
    questionEn: 'Does the system support connecting a fully custom domain (e.g. salonname.com)?',
    answerAr:
      '[TODO: ربط النطاقات المخصصة بالكامل (Custom Domains) قيد التطوير والإتاحة في خطة التحديثات المؤسسية؛ حالياً تعمل المنشآت بنطاقات فرعية معزولة فائقة السرعة تحت rashx.org].',
    answerEn:
      '[TODO: Fully custom domain mapping is currently in development on our enterprise roadmap; facilities currently run on high-performance isolated subdomains under *.rashx.org].',
  },
  {
    id: 'wl-4',
    category: 'whitelabel',
    categoryAr: 'White Label والتخصيص',
    categoryEn: 'White Label & Customization',
    questionAr: 'هل تظهر علامة راش إكس التجارية في واجهات وتطبيقات العميل النهائي؟',
    questionEn: 'Does the RashX brand appear in client-facing web and booking portals?',
    answerAr:
      'تُصمم واجهات العميل وتطبيق PWA لتركز بشكل كامل على هوية صالونك وشعاره وألوانه الخاصة كمنظومة مستقلة، مع إشارة تقنية مبسطة تفيد بأن البنية التحتية السحابية مدعومة بواسطة RashX.',
    answerEn:
      'Client booking portals and PWA screens highlight your salon logo, branding, and color scheme as a sovereign experience, with an unobtrusive technical badge indicating powered by RashX infrastructure.',
  },
];

