export interface CityFaq {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface CityPeakSeason {
  seasonAr: string;
  seasonEn: string;
  periodAr: string;
  periodEn: string;
  descAr: string;
  descEn: string;
}

export interface CityKeySystem {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface CityData {
  slug: string;
  nameAr: string;
  nameEn: string;
  regionAr: string;
  regionEn: string;
  titleAr: string;
  titleEn: string;
  h1Ar: string;
  h1En: string;
  descriptionAr: string;
  descriptionEn: string;
  keywords: string[];
  neighborhoodsAr: string[];
  neighborhoodsEn: string[];
  marketContextAr: string;
  marketContextEn: string;
  marketTodoAr: string;
  marketTodoEn: string;
  keySystems: CityKeySystem[];
  peakSeasons: CityPeakSeason[];
  faqs: CityFaq[];
  hasUniqueContent: boolean;
}

export const SAUDI_CITIES: Record<string, CityData> = {
  // =========================================================================
  // 1. الرياض (Riyadh)
  // =========================================================================
  riyadh: {
    slug: 'riyadh',
    nameAr: 'الرياض',
    nameEn: 'Riyadh',
    regionAr: 'منطقة الرياض – العاصمة',
    regionEn: 'Riyadh Province – Capital',
    titleAr: 'برنامج إدارة صالونات في الرياض | RashX',
    titleEn: 'Salon Management Software in Riyadh | RashX',
    h1Ar: 'نظام إدارة الصالونات ومراكز التجميل في الرياض',
    h1En: 'Salon & Beauty Center Management System in Riyadh',
    descriptionAr:
      'نظام سحابي متكامل لإدارة صالونات التجميل، المشاغل النسائية، ومراكز السبا في الرياض. تنظيم أوقات الذروة المسائية، باقات العرائس، طابور الانتظار، وفوترة ZATCA بنطاق فرعي مستقل.',
    descriptionEn:
      'Cloud management platform for beauty salons, studios, and spas in Riyadh. Master evening rushes, bridal passes, barber queues, and ZATCA Phase 2 compliance.',
    keywords: [
      'برنامج إدارة صالونات في الرياض',
      'برنامج صالونات الرياض',
      'نظام إدارة مشغل نسائي بالرياض',
      'كاشير صالون حلاقة الرياض',
      'برنامج مراكز سبا الرياض',
      'فواتير صالونات زاتكا الرياض',
    ],
    neighborhoodsAr: [
      'العليا',
      'حطين',
      'الملقا',
      'الياسمين',
      'النخيل',
      'الصحافة',
      'السليمانية',
      'الربيع',
    ],
    neighborhoodsEn: [
      'Al-Olaya',
      'Hittin',
      'Al-Malqa',
      'Al-Yasmin',
      'Al-Nakheel',
      'Al-Sahafa',
      'Al-Sulaimaniyah',
      'Al-Rabie',
    ],
    marketContextAr:
      'تشهد مدينة الرياض وتيرة تنافسية هي الأعلى على مستوى المملكة؛ حيث تتركز الصالونات الراقية في أحياء شمال الرياض (الملقا، حطين، الياسمين) وتتميز بارتفاع متوسط سلة الإنفاق للعميلة الواحدة. التحدي الأكبر لأصحاب الصالونات في الرياض هو إدارة ساعات الذروة المسائية (من 6 مساءً حتى 11 ليلاً)، والازدحام الشديد في عطلات نهاية الأسبوع، وارتفاع معدل التخلف عن الحضور (No-Shows) بسبب زحام السير. يوفر راش إكس لصالونات الرياض حجزاً ذاتياً مع قفل المواعيد بالعربون المسبق عبر مدى و Apple Pay لضمان الجدية التامة.',
    marketContextEn:
      'Riyadh represents the most intensely competitive salon market in Saudi Arabia, with premier lounges concentrated in northern districts (Al-Malqa, Hittin, Al-Yasmin) boasting high average ticket sizes. The core operational hurdle is managing peak evening congestion (6 PM - 11 PM) and reducing traffic-induced no-shows. RashX resolves this with upfront deposit booking via Mada and Apple Pay.',
    marketTodoAr:
      '[TODO: بيانات وإحصائيات موثقة عن عدد صالونات ومشاغل التجميل المرخصة في الرياض وفق بيانات وزارة التجارة والغرفة التجارية]',
    marketTodoEn:
      '[TODO: Verified official statistics on licensed salon counts in Riyadh from Ministry of Commerce and Chamber records]',
    keySystems: [
      {
        titleAr: 'قفل المواعيد بالعربون المسبق',
        titleEn: 'Upfront Booking Deposit Locks',
        descAr: 'تحصيل عربون مالي أثناء الحجز الإلكتروني يقلل تخلف العميلات بنسبة تتجاوز 90% في صالونات الرياض.',
        descEn: 'Mandating deposits during online booking slashes no-shows by over 90% across busy Riyadh districts.',
      },
      {
        titleAr: 'إدارة العمولات والكوادر المتعددة',
        titleEn: 'Multi-Stylist Commission Logic',
        descAr: 'احتساب دقيق لعمولات خبيرات الشعر والمكياج واستقطاع تكلفة المواد لصالونات الرياض الكبرى.',
        descEn: 'Granular commission calculation and net backbar deduction for high-capacity Riyadh venues.',
      },
      {
        titleAr: 'لوحات الذكاء الاصطناعي لساعات الذروة',
        titleEn: 'Peak Hours AI Analytics',
        descAr: 'تنبؤ أوقات الازدحام وإعادة توزيع ورديات العمل لتحقيق أعلى عائد لكل كرسي تجميل.',
        descEn: 'Forecasting busy hours and balancing stylist shifts to optimize chair turnover.',
      },
    ],
    peakSeasons: [
      {
        seasonAr: 'موسم الرياض والفعاليات الشتوية',
        seasonEn: 'Riyadh Season & Winter Festivals',
        periodAr: 'أكتوبر – مارس',
        periodEn: 'October – March',
        descAr: 'ارتفاع قياسي في طلب جلسات التصفيف والمكياج وعلاجات البشرة المصاحبة للمناسبات والفعاليات.',
        descEn: 'Surge in styling, glam makeup, and facial appointments during premier winter entertainment events.',
      },
      {
        seasonAr: 'موسم رمضان والعيدين',
        seasonEn: 'Ramadan & Eid Holidays',
        periodAr: 'العشر الأواخر وأيام العيد',
        periodEn: 'Final Ten Nights & Eid Days',
        descAr: 'تشغيل متواصل حتى ساعات الفجر مع تنظيم جداول الورديات الليلية لفرق العمل.',
        descEn: 'Round-the-clock operations extending until dawn with balanced night-shift rotas.',
      },
      {
        seasonAr: 'موسم أعراس الشتاء والربيع',
        seasonEn: 'Winter & Spring Wedding Rush',
        periodAr: 'نوفمبر – فبراير',
        periodEn: 'November – February',
        descAr: 'طلب مكثف على باقات العرائس الشاملة وجلسات التحضير المسبق المتعددة.',
        descEn: 'Intense booking demand for comprehensive multi-session bridal packages.',
      },
    ],
    faqs: [
      {
        questionAr: 'كيف يمنع راش إكس تضارب مواعيد الذروة المسائية في صالونات الرياض؟',
        questionEn: 'How does RashX prevent evening booking collisions in Riyadh salons?',
        answerAr:
          'يعتمد النظام معمارية لحظية متزامنة تقفل فترة الحجز فورياً فور بدء العملية، مع برمجة فواصل تعقيم إجبارية (Buffers) بين كل موعد وآخر.',
        answerEn:
          'Our real-time reactive engine locks appointment slots instantaneously and introduces mandatory sanitization buffers between clients.',
      },
      {
        questionAr: 'هل يدعم كاشير راش إكس الربط مع المرحلة الثانية لهيئة ZATCA في الرياض؟',
        questionEn: 'Is RashX POS compliant with ZATCA Phase 2 integration in Riyadh?',
        answerAr:
          'نعم، الكاشير مهيأ لتوليد الختم التشفيري CSID ورمز QR المشفر للفواتير الضريبية المبسطة آلياً ودون الحاجة لخوادم محلية باهظة.',
        answerEn:
          'Yes, our cloud POS automatically generates CSID cryptographic stamps and tamper-evident QR codes for simplified tax receipts.',
      },
      {
        questionAr: 'هل يمكن إدارة عدة فروع لصالوني في أحياء الرياض المختلفة من لوحة واحدة؟',
        questionEn: 'Can I manage multiple salon branches across Riyadh from a single dashboard?',
        answerAr:
          'بالتأكيد؛ تتيح راش إكس ربط كافة فروعك في الرياض مع تقارير مركزية لمراقبة المبيعات والمخزون وحركة الكادر لكل فرع لحظياً.',
        answerEn:
          'Absolutely; connect all your Riyadh branches under a unified enterprise hub monitoring live sales, inventory, and staff rosters.',
      },
    ],
    hasUniqueContent: true,
  },

  // =========================================================================
  // 2. جدة (Jeddah)
  // =========================================================================
  jeddah: {
    slug: 'jeddah',
    nameAr: 'جدة',
    nameEn: 'Jeddah',
    regionAr: 'منطقة مكة المكرمة – عروس البحر الأحمر',
    regionEn: 'Makkah Province – Red Sea Coast',
    titleAr: 'برنامج إدارة صالونات في جدة | RashX',
    titleEn: 'Salon Management Software in Jeddah | RashX',
    h1Ar: 'نظام إدارة الصالونات ومراكز التجميل في جدة',
    h1En: 'Salon & Beauty Center Management System in Jeddah',
    descriptionAr:
      'منظومة سحابية متخصصة لصالونات التجميل، المشاغل، ولاونجات العناية بالبشرة والسبا في جدة. حجز سريع عبر إنستغرام، باقات العرائس البحرية، وفوترة ZATCA بنطاق فرعي مستقل.',
    descriptionEn:
      'Premier cloud salon software for beauty lounges, bridal studios, and wellness spas in Jeddah. Direct Instagram PWA booking and ZATCA Phase 2 compliance.',
    keywords: [
      'برنامج إدارة صالونات في جدة',
      'برنامج صالونات جدة',
      'نظام إدارة مشغل نسائي بجدة',
      'كاشير صالون نسائي في جدة',
      'برنامج سبا وصالونات جدة',
    ],
    neighborhoodsAr: [
      'الروضة',
      'الشاطئ',
      'الحمراء',
      'الزهراء',
      'المحمدية',
      'السلامة',
      'الخالدية',
      'أبحر الشمالية',
    ],
    neighborhoodsEn: [
      'Al-Rawdah',
      'Al-Shati',
      'Al-Hamra',
      'Al-Zahra',
      'Al-Mohammadiyah',
      'Al-Salamah',
      'Al-Khalidiyah',
      'North Obhur',
    ],
    marketContextAr:
      'تتميز مدينة جدة بطابعها الساحلي المنفتح وتنوع خيارات التجميل بين الصالونات الفندقية الفاخرة على الكورنيش ولاونجات التجميل في الروضة والشاطئ. تعتمد عميلات جدة بشكل شبه كلي على تصفح أعمال خبيرات التجميل عبر منصات إنستغرام وسناب شات وطلب الحجز الفوري. التحدي المحلي يتمثل في الرغبة بحجز سريع دون تحميل تطبيقات، والطلب المتكرر على علاجات ترطيب الشعر وحماية البشرة من الرطوبة والملوحة البحرية.',
    marketContextEn:
      'Jeddah is defined by its vibrant coastal lifestyle with luxury beauty retreats and boutique lounges concentrated across Al-Rawdah and Al-Shati. Jeddah clients expect instantaneous mobile web booking directly from social media bios, with heavy demand for humidity-defense hair treatments and seaside wellness sessions.',
    marketTodoAr:
      '[TODO: بيانات وإحصائيات موثقة عن حجم سوق صالونات التجميل في محافظة جدة ومعدل نمو استثمارات السبا]',
    marketTodoEn:
      '[TODO: Verified official market statistics on salon and spa density across Jeddah Governorate]',
    keySystems: [
      {
        titleAr: 'تطبيق ويب سريع PWA للحجز من إنستغرام',
        titleEn: 'Instant Instagram Bio PWA Booking',
        descAr: 'تمكين عميلات جدة من الحجز في ثوانٍ من رابط البايو دون تحميل تطبيق من المتجر.',
        descEn: 'Frictionless client booking in seconds directly from Instagram bio links.',
      },
      {
        titleAr: 'باقات العناية الساحلية وعلاجات الشعر',
        titleEn: 'Coastal Humidity Hair Bundles',
        descAr: 'تنظيم باقات علاج البروتين والترطيب الممتدة مع خصم تكلفة المواد تلقائياً.',
        descEn: 'Managing multi-session deep hydration and protein treatments with automatic material deductions.',
      },
      {
        titleAr: 'إدارة باقات العرائس متعددة الخدمات',
        titleEn: 'Bespoke Bridal Suite Management',
        descAr: 'جدولة جلسات الحمام المغربي، المكياج، وتصفيف الشعر دون أي تعارض زمني.',
        descEn: 'Seamless coordination of bridal packages spanning hair, makeup, and spa baths.',
      },
    ],
    peakSeasons: [
      {
        seasonAr: 'موسم جدة الصيفي وعطلات الكورنيش',
        seasonEn: 'Jeddah Summer Season & Coastal Vacations',
        periodAr: 'مايو – أغسطس',
        periodEn: 'May – August',
        descAr: 'نشاط استثنائي لصالونات أوبحر والشاطئ مع إقبال العائلات والمصطافين على جلسات التجميل السريعة.',
        descEn: 'Exceptional rush for waterfront salons in Obhur driven by domestic summer vacationers.',
      },
      {
        seasonAr: 'فعاليات ومواسم نهاية الأسبوع',
        seasonEn: 'Weekend Events & Formula 1',
        periodAr: 'نوفمبر – مارس',
        periodEn: 'November – March',
        descAr: 'حجوزات مكياج سهرة وتصفيف شعر مكثفة تصاحب الفعاليات الفنية والحفلات الخاصة.',
        descEn: 'Concentrated evening glam and styling bookings for high-profile weekend gatherings.',
      },
      {
        seasonAr: 'ليالي رمضان المبارك والعيد',
        seasonEn: 'Ramadan Nights & Eid Prep',
        periodAr: 'العشر الأواخر',
        periodEn: 'Last 10 Nights of Ramadan',
        descAr: 'ازدحام متواصل يتطلب حجز المواعيد المسبق مع دفع العربون لتفادي الفوضى.',
        descEn: 'Intense booking demand necessitating automated deposits to secure station availability.',
      },
    ],
    faqs: [
      {
        questionAr: 'هل يتيح البرنامج للعميلة حجز موعد في صالون جدة دون تحميل تطبيق؟',
        questionEn: 'Can clients in Jeddah book without installing a native app?',
        answerAr:
          'نعم، تعمل واجهة راش إكس كتطبيق ويب متقدم (PWA) يفتح فورياً عبر المتصفح من رابط إنستغرام وسناب شات بضغطة زر واحدة.',
        answerEn:
          'Yes, RashX provides a zero-download Progressive Web App launching instantly from Instagram and Snapchat links.',
      },
      {
        questionAr: 'كيف يساعد راش إكس صالونات جدة في حماية بيانات العميلات؟',
        questionEn: 'How does RashX protect client data privacy in Jeddah salons?',
        answerAr:
          'يحجب النظام أرقام جوالات العميلات تلقائياً (05****1234) عن شاشات الموظفين لمنع تسريبها، التزاماً بنظام حماية البيانات الشخصية السعودي (PDPL).',
        answerEn:
          'The system automatically masks customer mobile numbers on staff screens, strictly enforcing Saudi PDPL privacy compliance.',
      },
      {
        questionAr: 'هل يدعم النظام الدفع بـ Apple Pay ومدى أثناء الحجز؟',
        questionEn: 'Does the system accept Apple Pay and Mada for deposit bookings?',
        answerAr:
          'نعم، يتيح النظام تحصيل العربون أو قيمة الخدمة كاملة عبر مدى، Apple Pay، والبطاقات الائتمانية بشكل آمن وفوري.',
        answerEn:
          'Yes, collect deposits or full service fees via Mada, Apple Pay, and credit cards securely and seamlessly.',
      },
    ],
    hasUniqueContent: true,
  },

  // =========================================================================
  // 3. الدمام (Dammam)
  // =========================================================================
  dammam: {
    slug: 'dammam',
    nameAr: 'الدمام',
    nameEn: 'Dammam',
    regionAr: 'المنطقة الشرقية – حاضرة الخليج',
    regionEn: 'Eastern Province – Gulf Gateway',
    titleAr: 'برنامج إدارة صالونات في الدمام | RashX',
    titleEn: 'Salon Management Software in Dammam | RashX',
    h1Ar: 'نظام إدارة الصالونات ومراكز التجميل في الدمام',
    h1En: 'Salon & Beauty Center Management System in Dammam',
    descriptionAr:
      'نظام سحابي متطور لإدارة الصالونات النسائية ومحلات الحلاقة الرجالية في الدمام. تنظيم دور الكاشير، حساب عمولات الكادر، الفوترة الإلكترونية ZATCA، ونطاق فرعي مستقل.',
    descriptionEn:
      'Cloud salon software for women styling studios and barbershops in Dammam. Streamlined queues, staff payroll, and ZATCA Phase 2 compliance.',
    keywords: [
      'برنامج إدارة صالونات في الدمام',
      'برنامج صالونات الدمام',
      'نظام إدارة مشغل نسائي بالدمام',
      'كاشير صالون حلاقة الدمام',
      'برنامج فواتير صالونات الدمام',
    ],
    neighborhoodsAr: [
      'الشاطئ الغربي',
      'الفيصلية',
      'المزروعية',
      'الجلوية',
      'الحمراء',
      'الفردوس',
      'طيبة',
      'الضباب',
    ],
    neighborhoodsEn: [
      'West Shati',
      'Al-Faisaliyah',
      'Al-Mazrouiyah',
      'Al-Jalawiyah',
      'Al-Hamra',
      'Al-Ferdous',
      'Taybah',
      'Al-Dhabab',
    ],
    marketContextAr:
      'تتميز حاضرة الدمام بكونها المركز الإداري والتجاري للمنطقة الشرقية، حيث يرتبط نمط الحياة اليومي بأوقات عمل موظفي القطاع الحكومي والشركات الكبرى والقطاع الصناعي. تتميز الصالونات هنا بطلب متوازن على مدار أيام الأسبوع مع ذروة حادة مساء كل خميس وجمعة. تحتاج صالونات ومحلات الحلاقة في الدمام إلى نظام كاشير سريع يقلل وقت الانتظار، ويدير دوران الكراسي بكفاءة، ويوثق استهلاك المخزون المزدوج بدقة.',
    marketContextEn:
      'Dammam functions as the administrative and business nerve center of the Eastern Province. Salons cater to working corporate and industrial sector families, demanding high operational efficiency on Thursday and Friday afternoons. Systems must emphasize rapid point-of-sale checkout and dual inventory tracking.',
    marketTodoAr:
      '[TODO: بيانات وإحصائيات موثقة عن عدد المشاغل ومراكز الحلاقة الرجالية المرخصة في حاضرة الدمام]',
    marketTodoEn:
      '[TODO: Verified official statistics on licensed salon counts across Dammam metropolis]',
    keySystems: [
      {
        titleAr: 'الكاشير السريع ونقاط البيع الفورية',
        titleEn: 'Rapid Cashier POS Checkout',
        descAr: 'إصدار الفاتورة الضريبية المبسطة بضغطة زر وطباعتها على طابعات الإيصالات الحرارية.',
        descEn: 'Instant generation of simplified tax invoices on thermal receipt printers.',
      },
      {
        titleAr: 'تذاكر الدور الذكية لصالونات الحلاقة',
        titleEn: 'Digital Barbershop Queue System',
        descAr: 'حجز الدور عبر الجوال واستدعاء الزبون قبل وصول دوره بـ 10 دقائق لإنهاء التكدس.',
        descEn: 'Mobile queue tickets summoning clients 10 minutes prior to chair availability.',
      },
      {
        titleAr: 'إدارة المخزون المزدوج وتنبيهات النواقص',
        titleEn: 'Dual Inventory & Low-Stock Alerts',
        descAr: 'الفصل بين مستلزمات الجلسات الداخلية (Backbar) ومنتجات التجزئة المعروضة للبيع.',
        descEn: 'Differentiating internal treatment supplies from retail products sold at reception.',
      },
    ],
    peakSeasons: [
      {
        seasonAr: 'عطلات نهاية الأسبوع المزدحمة',
        seasonEn: 'Weekend Corporate Family Rush',
        periodAr: 'مساء الخميس والجمعة',
        periodEn: 'Thursday & Friday Evenings',
        descAr: 'ذروة أسبوعية تتطلب تشغيل كامل كراسي الصالون وجدولة أوقات الكادر بدقة.',
        descEn: 'Intense weekly surges requiring 100% chair utilization and tight staff rotas.',
      },
      {
        seasonAr: 'مواسم الأعياد والعطلات المدرسية',
        seasonEn: 'Eid Seasons & School Breaks',
        periodAr: 'أعياد الفطر والأضحى',
        periodEn: 'Eid Al-Fitr & Al-Adha',
        descAr: 'إقبال عائلي كثيف على باقات الأطفال وتجهيز الحلاقة والتصفيف للأمهات والآباء.',
        descEn: 'Family-wide appointments spanning kids styling and adult grooming.',
      },
    ],
    faqs: [
      {
        questionAr: 'هل يدعم كاشير راش إكس طابعات الفواتير وأدراج النقدية في الدمام؟',
        questionEn: 'Does RashX POS support thermal printers and cash drawers in Dammam?',
        answerAr:
          'نعم، يتوافق البرنامج مع كافة طابعات الإيصالات الحرارية (Epson, Sunmi, Xprinter) وأدراج النقدية وأجهزة الباركود القياسية عبر البلوتوث والشبكة.',
        answerEn:
          'Yes, our cloud POS works seamlessly with standard thermal printers, barcode scanners, and cash drawers via Bluetooth or LAN.',
      },
      {
        questionAr: 'كيف يتم حساب عمولات الحلاقين والأخصائيات في الدمام؟',
        questionEn: 'How are stylist and barber commissions calculated in Dammam?',
        answerAr:
          'يتولى النظام احتساب النسب آلياً فور إغلاق الفاتورة، مع خيار خصم تكلفة المواد، واستخراج كشف حساب فوري لكل موظف بنهاية الشهر.',
        answerEn:
          'Commissions are calculated automatically upon checkout, with optional backbar deductions and instant monthly pay slips.',
      },
    ],
    hasUniqueContent: true,
  },

  // =========================================================================
  // 4. الخبر (Khobar)
  // =========================================================================
  khobar: {
    slug: 'khobar',
    nameAr: 'الخبر',
    nameEn: 'Khobar',
    regionAr: 'المنطقة الشرقية – واحة الأعمال والجمال',
    regionEn: 'Eastern Province – Corniche & Business Hub',
    titleAr: 'برنامج إدارة صالونات في الخبر | RashX',
    titleEn: 'Salon Management Software in Khobar | RashX',
    h1Ar: 'نظام إدارة الصالونات ومراكز التجميل في الخبر',
    h1En: 'Salon & Beauty Center Management System in Khobar',
    descriptionAr:
      'منظومة سحابية راقية لصالونات البوتيك والمشاغل ومراكز السبا الفاخرة في الخبر. برامج ولاء VIP، باقات الاشتراكات الشهرية، وفوترة ZATCA بنطاق فرعي مستقل.',
    descriptionEn:
      'High-end salon and wellness software for boutique beauty lounges and luxury spas in Khobar. VIP loyalty, recurring memberships, and ZATCA compliance.',
    keywords: [
      'برنامج إدارة صالونات في الخبر',
      'برنامج صالونات الخبر',
      'نظام إدارة مشغل نسائي بالخبر',
      'كاشير صالون نسائي بالخبر',
      'برنامج سبا الخبر الفاخر',
    ],
    neighborhoodsAr: [
      'الحزام الذهبي',
      'الحزام الأخضر',
      'الكورنيش',
      'الراكة',
      'العليا',
      'اليرموك',
      'القرطبة',
      'التحلية',
    ],
    neighborhoodsEn: [
      'Al-Hizam Al-Thahabi',
      'Al-Hizam Al-Akhdar',
      'Corniche',
      'Al-Rakah',
      'Al-Olaya',
      'Al-Yarmouk',
      'Al-Qurtoba',
      'Al-Tahlia',
    ],
    marketContextAr:
      'تعد مدينة الخبر من أرقى أسواق التجميل في المنطقة الشرقية، وتتميز بانتشار صالونات "البوتيك" الفاخرة ومراكز السبا الراقية في أحياء الحزام الذهبي والكورنيش والراكة. تشهد الخبر حركة زيارات مكثفة في عطلات نهاية الأسبوع من مواطني ومقيمي دول الخليج المجاورة (خاصة البحرين) وزوار أرامكو. تبحث عميلات الخبر عن تجربة شخصية راقية وبرامج مكافآت مرنة وخدمات استرخاء مدفوعة مقدماً.',
    marketContextEn:
      'Khobar is renowned for its affluent demographic, boutique salons, and luxury spa concepts along Al-Hizam Al-Thahabi and the Corniche. It experiences cross-border weekend surges from neighboring Gulf visitors (notably Bahrain) and Aramco professionals. Clients demand seamless bilingual hospitality and bespoke loyalty tiers.',
    marketTodoAr:
      '[TODO: إحصائيات موثقة عن متوسط الإنفاق على خدمات التجميل والاسترخاء في مدينة الخبر]',
    marketTodoEn:
      '[TODO: Verified official data on average wellness basket size across Khobar municipality]',
    keySystems: [
      {
        titleAr: 'محرك برامج ولاء VIP ونقاط المكافآت',
        titleEn: 'VIP Tiered Loyalty & Rewards Engine',
        descAr: 'منح نقاط ولاء تراكمية واستبدالها بجلسات عناية تكميلية فاخرة تضمن ولاء العميلات.',
        descEn: 'Accumulate loyalty points redeemable for high-margin complimentary spa treatments.',
      },
      {
        titleAr: 'الاشتراكات الشهرية والباقات المسبقة',
        titleEn: 'Recurring Monthly Grooming Subscriptions',
        descAr: 'تصميم باقات مدفوعة مسبقاً للعناية الأسبوعية بالشعر والأظافر لتأمين تدفقات نقدية مستقرة.',
        descEn: 'Curating recurring weekly styling and nail bundles for steady month-start cash flow.',
      },
      {
        titleAr: 'واجهة متعددة اللغات (عربي وإنجليزي)',
        titleEn: 'Native Bilingual Arabic & English UI',
        descAr: 'دعم كامل للغتين في موقع الصالون وتطبيق الحجز والكاشير لخدمة المقيمين والزوار.',
        descEn: 'Full bilingual support across public booking, client PWA, and cashier POS.',
      },
    ],
    peakSeasons: [
      {
        seasonAr: 'عطلات نهاية الأسبوع وزوار الخليج',
        seasonEn: 'Weekend Cross-Border Influx',
        periodAr: 'كل خميس وسبت',
        periodEn: 'Thursday to Saturday',
        descAr: 'إقبال مرتفع من زوار المنطقة الشرقية والبحرين على خدمات التجميل السريعة والمساج.',
        descEn: 'Spikes from regional and Bahraini weekend travelers seeking premium grooming.',
      },
      {
        seasonAr: 'مواسم المعارض والأعياد',
        seasonEn: 'Dhahran Expo Seasons & Eid',
        periodAr: 'فبراير – أبريل وأكتوبر',
        periodEn: 'Spring & Autumn Expo Waves',
        descAr: 'حجوزات تصفيف شعر ومكياج مرتبطة بحفلات الاستقبال والمؤتمرات الكبرى.',
        descEn: 'Corporate events and styling rushes accompanying international exhibitions.',
      },
    ],
    faqs: [
      {
        questionAr: 'هل يدعم البرنامج تسجيل بيانات عميلات وزوار الخبر من دول الخليج؟',
        questionEn: 'Does the system accept foreign Gulf phone numbers for bookings in Khobar?',
        answerAr:
          'نعم، يدعم نظام راش إكس أرقام الجوالات الخليجية والدولية مع إرسال رسائل التأكيد والتذكير عبر واتساب دون أي عوائق.',
        answerEn:
          'Yes, our platform natively accepts GCC and international mobile prefixes, dispatching WhatsApp confirmations reliably.',
      },
      {
        questionAr: 'كيف تضمن راش إكس خصوصية بيانات صالوني في الخبر؟',
        questionEn: 'How does RashX ensure data privacy for Khobar salon owners?',
        answerAr:
          'يحصل صالونك على نطاق فرعي معزول تماماً (*.rashx.org) مع تشفير كامل للبيانات وحجب أرقام العميلات وفق نظام PDPL.',
        answerEn:
          'Your salon operates on an isolated private subdomain (*.rashx.org) with client phone masking under Saudi PDPL.',
      },
    ],
    hasUniqueContent: true,
  },

  // =========================================================================
  // 5. مكة المكرمة (Makkah)
  // =========================================================================
  makkah: {
    slug: 'makkah',
    nameAr: 'مكة المكرمة',
    nameEn: 'Makkah',
    regionAr: 'منطقة مكة المكرمة – العاصمة المقدسة',
    regionEn: 'Makkah Province – Holy City',
    titleAr: 'برنامج إدارة صالونات في مكة المكرمة | RashX',
    titleEn: 'Salon Management Software in Makkah | RashX',
    h1Ar: 'نظام إدارة الصالونات ومراكز التجميل في مكة المكرمة',
    h1En: 'Salon & Beauty Center Management System in Makkah',
    descriptionAr:
      'نظام سحابي مرن لإدارة صالونات التجميل النسائية ومحلات الحلاقة في مكة المكرمة. إدارة مواسم الحج والعمرة، طابور الحلاقة السريع، والفوترة الإلكترونية ZATCA.',
    descriptionEn:
      'Resilient cloud salon and barbershop software in Makkah. Master Hajj and Umrah peak rushes, digital queues, and ZATCA Phase 2 e-invoicing.',
    keywords: [
      'برنامج إدارة صالونات في مكة المكرمة',
      'برنامج صالونات مكة',
      'كاشير صالون حلاقة مكة',
      'نظام إدارة مشغل نسائي بمكة',
      'فواتير صالونات مكة زاتكا',
    ],
    neighborhoodsAr: [
      'العزيزية',
      'الشوقية',
      'النزهة',
      'العوالي',
      'بطحاء قريش',
      'الرصيفة',
      'الزايدي',
      'المنطقة المركزية',
    ],
    neighborhoodsEn: [
      'Al-Aziziyah',
      'Al-Shawqiyah',
      'Al-Nuzha',
      'Al-Awali',
      'Batha Quraish',
      'Al-Rusaifah',
      'Al-Zaydi',
      'Central Area',
    ],
    marketContextAr:
      'تتميز العاصمة المقدسة بديناميكية تشغيلية استثنائية لا مثيل لها في العالم؛ حيث تتضاعف أعداد الزبائن عشرات المرات خلال مواسم الحج والعمرة الكبرى (رجب، شعبان، ورمضان). تحتاج صالونات الحلاقة الرجالية ومراكز التجميل النسائية في مكة إلى نظام كاشير عالي السرعة يتحمل الضغط الشديد دون أي بطء، مع تذاكر دور رقمية تمنع التدافع، وفوترة ضريبية مبسطة تطبع في أقل من ثانية واحدة.',
    marketContextEn:
      'Makkah features extraordinary operational dynamics driven by annual Hajj and Umrah influxes. Barbershops and salons near the Central Area and Aziziyah experience extreme customer volumes requiring sub-second transaction speeds, digital queue management, and ultra-reliable offline resilience.',
    marketTodoAr:
      '[TODO: إحصائيات موثقة عن تراخيص الصالونات ومحلات الحلاقة في العاصمة المقدسة وأعداد المستفيدين في المواسم]',
    marketTodoEn:
      '[TODO: Verified official records on licensed barber and salon capacities in Makkah]',
    keySystems: [
      {
        titleAr: 'طابور الحلاقة فائق السرعة واستدعاء الدور',
        titleEn: 'Ultra-Fast Digital Queue Ticketing',
        descAr: 'إصدار تذاكر دور رقمية سريعة لإنهاء تكدس المعتمرين والحجاج أمام كراسي الحلاقة.',
        descEn: 'Instant digital queue tokens eliminating waiting room congestion during pilgrim surges.',
      },
      {
        titleAr: 'كاشير فوري يتحمل ضغط الذروة',
        titleEn: 'High-Volume Cashier POS Speed',
        descAr: 'إصدار الفاتورة الضريبية المبسطة ZATCA في أجزاء من الثانية مع رمز QR المشفر.',
        descEn: 'Sub-second ZATCA simplified invoice generation with cryptographic QR stamps.',
      },
      {
        titleAr: 'نظام إرسال الفواتير عبر واتساب',
        titleEn: 'Instant WhatsApp Receipt Dispatch',
        descAr: 'إرسال الفواتير الرقمية مباشرة لجوالات الزبائن لتقليل استهلاك الورق وتسريع الخدمة.',
        descEn: 'Dispatching digital receipts directly to client WhatsApp reducing paper consumption.',
      },
    ],
    peakSeasons: [
      {
        seasonAr: 'موسم الحج الأكبر',
        seasonEn: 'Annual Hajj Season',
        periodAr: 'شهر ذو الحجة',
        periodEn: 'Dhul Hijjah Month',
        descAr: 'ضغط قياسي على محلات الحلاقة الرجالية لإتمام نسك التحلل، وتشغيل مستمر 24 ساعة.',
        descEn: 'Monumental barbershop turnover for post-pilgrimage rites operating around the clock.',
      },
      {
        seasonAr: 'موسم رمضان والعمرة الكبرى',
        seasonEn: 'Ramadan Umrah Season',
        periodAr: 'شهر رمضان المبارك',
        periodEn: 'Holy Month of Ramadan',
        descAr: 'ازدحام شديد في الفترات الليلية بعد صلاة التراويح والتهجد حتى ساعات الفجر الأولى.',
        descEn: 'Intense late-night operations post-Taraweeh prayers extending until dawn.',
      },
    ],
    faqs: [
      {
        questionAr: 'هل يتحمل كاشير راش إكس ضغط الحج والعمرة الشديد في مكة المكرمة؟',
        questionEn: 'Can RashX POS handle high-volume Hajj and Umrah transaction spikes in Makkah?',
        answerAr:
          'نعم، صُممت المعمارية السحابية لراش إكس لتتحمل آلاف الحركات في الدقيقة الواحدة بسرعة استجابة فائقة دون أي تعليق.',
        answerEn:
          'Yes, our cloud infrastructure is architected for extreme concurrency, processing thousands of requests without slowdown.',
      },
      {
        questionAr: 'هل يدعم البرنامج إصدار فواتير بلغات متعددة لضيوف الرحمن؟',
        questionEn: 'Does the system generate receipts understood by international pilgrims?',
        answerAr:
          'نعم، تدعم الفواتير والإيصالات اللغتين العربية والإنجليزية مع رمز QR القياسي المعتمد من هيئة الزكاة والضريبة والجمارك.',
        answerEn:
          'Yes, receipts provide bilingual Arabic and English itemization alongside compliant ZATCA Phase 2 QR codes.',
      },
    ],
    hasUniqueContent: true,
  },

  // =========================================================================
  // 6. المدينة المنورة (Madinah)
  // =========================================================================
  madinah: {
    slug: 'madinah',
    nameAr: 'المدينة المنورة',
    nameEn: 'Madinah',
    regionAr: 'منطقة المدينة المنورة – طيبة الطيبة',
    regionEn: 'Madinah Province – The Radiant City',
    titleAr: 'برنامج إدارة صالونات في المدينة المنورة | RashX',
    titleEn: 'Salon Management Software in Madinah | RashX',
    h1Ar: 'نظام إدارة الصالونات ومراكز التجميل في المدينة المنورة',
    h1En: 'Salon & Beauty Center Management System in Madinah',
    descriptionAr:
      'نظام سحابي متكامل لصالونات ومشاغل التجميل ومحلات الحلاقة في المدينة المنورة. جدولة مواعيد الزوار وسكان طيبة، الفوترة الإلكترونية ZATCA، ونطاق فرعي مستقل.',
    descriptionEn:
      'Comprehensive cloud management software for beauty salons and barbershops in Madinah. Seamless visitor scheduling, ZATCA e-invoicing, and subdomains.',
    keywords: [
      'برنامج إدارة صالونات في المدينة المنورة',
      'برنامج صالونات المدينة المنورة',
      'كاشير صالون حلاقة المدينة',
      'نظام إدارة مشغل نسائي بالمدينة المنورة',
      'فواتير صالونات زاتكا المدينة',
    ],
    neighborhoodsAr: [
      'سلطانة',
      'قربان',
      'قباء',
      'الهجرة',
      'العزيزية',
      'المنطقة المركزية',
      'الخالدية',
      'بئر عثمان',
    ],
    neighborhoodsEn: [
      'Sultana',
      'Qurban',
      'Quba',
      'Al-Hijrah',
      'Al-Aziziyah',
      'Central Area',
      'Al-Khalidiyah',
      'Bir Uthman',
    ],
    marketContextAr:
      'تجمع المدينة المنورة بين أصالة المجتمع المحلي والتدفق المستمر لملايين الزوار والمعتمرين على مدار العام في أحياء سلطانة وقباء والمنطقة المركزية. تتطلب المنشآت التجميلية في المدينة توازناً دقيقاً بين خدمة العميلات الدائمات بباقات العناية الدورية، واستقبال ضيوف الرحمن بخدمات سريعة وموثوقة دون تضارب في المواعيد.',
    marketContextEn:
      'Madinah blends a deeply rooted local community with millions of international pilgrims visiting the Prophet Mosque year-round. Salons across Sultana, Quba, and Central districts require dual workflows: cultivating lifelong neighborhood client loyalty while swiftly servicing transient visitors.',
    marketTodoAr:
      '[TODO: بيانات موثقة عن عدد المنشآت التجميلية المرخصة في منطقة المدينة المنورة]',
    marketTodoEn:
      '[TODO: Verified official figures on registered aesthetic establishments in Madinah region]',
    keySystems: [
      {
        titleAr: 'التوفيق بين عملاء الحي وزوار المدينة',
        titleEn: 'Dual Resident & Visitor Management',
        descAr: 'تنظيم مواعيد العميلات الدائمات مع إتاحة شواغر الحجز السريع للزوار والمعتمرين.',
        descEn: 'Balancing resident recurring appointments with instant slots for visiting pilgrims.',
      },
      {
        titleAr: 'تأكيدات المواعيد التلقائية عبر واتساب',
        titleEn: 'Automated WhatsApp Appointment Confirmations',
        descAr: 'إرسال تذكيرات المواعيد وموقع الصالون عبر واتساب لمنع ضياع الزائرات في المدينة.',
        descEn: 'Dispatching WhatsApp confirmations and location pins directly to visiting clients.',
      },
      {
        titleAr: 'فوترة إلكترونية معتمدة للمرحلة الثانية',
        titleEn: 'ZATCA Phase 2 Certified Cloud POS',
        descAr: 'طباعة سريعة للفواتير الضريبية المبسطة بالريال السعودي مع دعم كامل لنقاط بيع مدى.',
        descEn: 'Instant printing of compliant simplified tax receipts with Mada POS integration.',
      },
    ],
    peakSeasons: [
      {
        seasonAr: 'مواسم ما بعد الحج والزيارة',
        seasonEn: 'Post-Hajj Visitor Season',
        periodAr: 'محرم وصفر',
        periodEn: 'Muharram & Safar',
        descAr: 'نشاط سياحي مكثف في أسواق المدينة المركزية وسلطانة وإقبال كبير على خدمات الصالونات.',
        descEn: 'High visitor density in Central and Sultana districts driving salon appointments.',
      },
      {
        seasonAr: 'شهر رمضان المبارك',
        seasonEn: 'Ramadan Holy Nights',
        periodAr: 'طوال أيام الشهر',
        periodEn: 'Throughout Ramadan',
        descAr: 'تحول فترات العمل إلى الليلية مع ذروة حادة في الأيام العشرة الأخيرة.',
        descEn: 'Shift to nocturnal operational hours peaking in the final ten nights.',
      },
    ],
    faqs: [
      {
        questionAr: 'هل يدعم البرنامج تشغيل عدة ورديات عمل مسائية في المدينة المنورة؟',
        questionEn: 'Does the system support multiple evening shifts in Madinah?',
        answerAr:
          'نعم، يتيح راش إكس ضبط ورديات عمل مرنة وتوزيع الكوادر بين فترات ما بعد الظهر والمساء مع تقارير إغلاق صندوق مستقلة لكل وردية.',
        answerEn:
          'Yes, configure multiple flexible shifts with separate cash register reconciliations per shift.',
      },
      {
        questionAr: 'هل تتوفر فترة تجربة مجانية لصالونات المدينة المنورة؟',
        questionEn: 'Is there a free trial for salons in Madinah?',
        answerAr:
          'نعم، نوفر تجربة مجانية كاملة المزايا لمدة 14 يوماً مع جلسة تدريبية أونلاين مدتها 20 دقيقة لإعداد حساب صالونك فوراً.',
        answerEn:
          'Yes, enjoy an unrestricted 14-day free trial accompanied by a 20-minute tailored walkthrough setting up your facility in minutes.',
      },
    ],
    hasUniqueContent: true,
  },

  // =========================================================================
  // 7. الطائف (Taif) - NEW
  // =========================================================================
  taif: {
    slug: 'taif',
    nameAr: 'الطائف',
    nameEn: 'Taif',
    regionAr: 'منطقة مكة المكرمة – مدينة الورد والمصائف',
    regionEn: 'Makkah Province – City of Roses & Highland Resort',
    titleAr: 'برنامج إدارة صالونات في الطائف | RashX',
    titleEn: 'Salon Management Software in Taif | RashX',
    h1Ar: 'نظام إدارة الصالونات ومراكز التجميل في الطائف',
    h1En: 'Salon & Beauty Center Management System in Taif',
    descriptionAr:
      'منظومة سحابية متخصصة لصالونات التجميل والمشاغل ومراكز تجهيز العرائس في الطائف. تنظيم مواسم أعراس الصيف، مهرجانات الورد، وباقات العناية بنطاق فرعي مستقل.',
    descriptionEn:
      'Dedicated cloud salon software for beauty studios and bridal centers in Taif. Master summer wedding rushes, rose festivals, and ZATCA Phase 2 compliance.',
    keywords: [
      'برنامج إدارة صالونات في الطائف',
      'برنامج صالونات الطائف',
      'مشاغل نسائية الطائف',
      'صالون عرائس الطائف',
      'كاشير صالون حلاقة الطائف',
      'فواتير صالونات زاتكا الطائف',
    ],
    neighborhoodsAr: [
      'الحوية',
      'شهار',
      'الشفا',
      'الردف',
      'الريان',
      'الفيصلية',
      'قروى',
      'الوسام',
    ],
    neighborhoodsEn: [
      'Al-Hawiyah',
      'Shehar',
      'Al-Shifa',
      'Al-Rudaf',
      'Al-Rayan',
      'Al-Faisaliyah',
      'Qarwa',
      'Al-Wesam',
    ],
    marketContextAr:
      'تعد مدينة الطائف المقصد الصيفي الأول في غرب المملكة، وتشتهر بأنها "عاصمة الأعراس الصيفية"؛ حيث يقصدها آلاف العائلات من مكة وجدة والرياض لإقامة حفلات الزفاف في أجوائها الجبلية المعتدلة. يشهد قطاع الصالونات والمشاغل في شهار والحوية والريان ذروة عمل قياسية خلال أشهر الصيف، تتركز في باقات العرائس متعددة الخدمات (مكياج، تصفيف شعر، حمام مغربي، وبروتين). التحدي التشغيلي الأكبر هو إدارة حجوزات العرائس المتداخلة وتأكيد العربون المسبق لضمان عدم إلغاء المواعيد في اللحظات الأخيرة.',
    marketContextEn:
      'Taif serves as the premier summer resort and wedding capital of Western Saudi Arabia. Due to its temperate mountain climate, thousands of families celebrate summer weddings here, generating massive seasonal demand for bridal salons across Shehar and Al-Hawiyah. Software must excel in multi-hour bridal package booking, room sanitization intervals, and non-refundable deposit collection.',
    marketTodoAr:
      '[TODO: بيانات وإحصائيات موثقة عن عدد المشاغل النسائية وصالونات التجميل في محافظة الطائف ونمو قطاع تجهيز العرائس]',
    marketTodoEn:
      '[TODO: Verified official statistics on bridal studios and licensed beauty salons in Taif Governorate]',
    keySystems: [
      {
        titleAr: 'إدارة باقات العرائس والمناسبات الكبرى',
        titleEn: 'Comprehensive Bridal Suite Management',
        descAr: 'جدولة باقات العروس متعددة الجلسات (شعر، مكياج، سبا) دون أي تعارض زمني بين الأخصائيات.',
        descEn: 'Seamless coordination of multi-hour bridal passes across hair, makeup, and spa specialists.',
      },
      {
        titleAr: 'قفل حجوزات الصيف بالعربون المسبق',
        titleEn: 'Summer Booking Non-Refundable Deposit Locks',
        descAr: 'تحصيل عربون مالي إلكتروني عبر مدى و Apple Pay لضمان جدية حجوزات مواسم الأعراس.',
        descEn: 'Online deposit collection via Mada and Apple Pay preventing last-minute wedding cancellations.',
      },
      {
        titleAr: 'إدارة الكوادر والمكافآت الموسمية',
        titleEn: 'Seasonal Staff & Commission Scaling',
        descAr: 'ضبط عمولات الأخصائيات في مواسم الضغط الصيفي واستخراج تقارير الرواتب بضغطة زر.',
        descEn: 'Effortless commission scaling and net wage slip generation during high-volume summer rushes.',
      },
    ],
    peakSeasons: [
      {
        seasonAr: 'موسم الأعراس والصيف السياحي',
        seasonEn: 'Summer Wedding & Tourism Peak',
        periodAr: 'يونيو – سبتمبر',
        periodEn: 'June – September',
        descAr: 'ذروة سنوية استثنائية لحفلات الزفاف والمصطافين تتطلب تشغيل كامل طاقة المشاغل.',
        descEn: 'The single largest annual spike driven by highland wedding celebrations and domestic tourists.',
      },
      {
        seasonAr: 'موسم حصاد الورد الطائفي',
        seasonEn: 'Taif Rose Harvesting Festival',
        periodAr: 'مارس – أبريل',
        periodEn: 'March – April',
        descAr: 'إقبال سياحي على جلسات العناية بالبشرة والسبا المستوحاة من مستخلصات الورد الطبيعية.',
        descEn: 'Tourism influx boosting bookings for organic rose-infused facials and wellness treatments.',
      },
      {
        seasonAr: 'موسم عيد الفطر والأضحى',
        seasonEn: 'Eid Holiday Rushes',
        periodAr: 'الأيام السابقة للعيدين',
        periodEn: 'Days Preceding Eid',
        descAr: 'ازدحام عائلي كثيف على خدمات الحلاقة الرجالية وتجهيز الشعر والتزيين النسائي.',
        descEn: 'Family-wide appointment rushes for Eid styling and grooming services.',
      },
    ],
    faqs: [
      {
        questionAr: 'كيف يساعد راش إكس مشاغل الطائف في منع تضارب مواعيد العرائس؟',
        questionEn: 'How does RashX prevent bridal double-booking in Taif salons?',
        answerAr:
          'يتيح النظام تخصيص غرف وأجنحة العناية لكل عروس مع فواصل زمنية إجبارية تمنع أي تداخل، مع تنبيهات تلقائية للأخصائيات على جوالاتهن.',
        answerEn:
          'Our platform assigns dedicated treatment suites with automated buffer intervals and SMS/WhatsApp specialist alerts.',
      },
      {
        questionAr: 'هل يدعم البرنامج تحصيل العربون أونلاين لزبائن الطائف من مدن أخرى؟',
        questionEn: 'Can Taif salons collect online deposits from clients booking from other cities?',
        answerAr:
          'نعم، تفتح العميلة رابط صالونك من جدة أو مكة أو الرياض، وتدفع العربون عبر Apple Pay أو مدى ليتم تثبيت حجزها فورياً في جدول الصالون.',
        answerEn:
          'Yes, clients visiting from Jeddah or Riyadh can pay deposits via Apple Pay or Mada, locking appointments instantly.',
      },
      {
        questionAr: 'هل كاشير راش إكس متوافق مع الفوترة الإلكترونية ZATCA المرحلة الثانية في الطائف؟',
        questionEn: 'Is RashX POS compliant with ZATCA Phase 2 directives in Taif?',
        answerAr:
          'نعم، الكاشير سحابي بالكامل ويولد رموز QR المشفرة والأختام الرقمية (CSID) وفق أحدث لوائح هيئة الزكاة والضريبة والجمارك.',
        answerEn:
          'Yes, the cloud POS generates compliant Base64 QR codes and CSID cryptographic stamps adhering to ZATCA standards.',
      },
    ],
    hasUniqueContent: true,
  },

  // =========================================================================
  // 8. أبها (Abha) - NEW
  // =========================================================================
  abha: {
    slug: 'abha',
    nameAr: 'أبها',
    nameEn: 'Abha',
    regionAr: 'منطقة عسير – عروس الجنوب وسيدة الضباب',
    regionEn: 'Asir Province – Southern Mountain Capital',
    titleAr: 'برنامج إدارة صالونات في أبها | RashX',
    titleEn: 'Salon Management Software in Abha | RashX',
    h1Ar: 'نظام إدارة الصالونات ومراكز التجميل في أبها',
    h1En: 'Salon & Beauty Center Management System in Abha',
    descriptionAr:
      'نظام سحابي متكامل لإدارة صالونات التجميل والمشاغل ومراكز السبا في أبها ومنطقة عسير. إدارة مواسم صيف عسير، باقات الاستجمام الجبلي، وفوترة ZATCA بنطاق فرعي مستقل.',
    descriptionEn:
      'Cloud management platform for beauty salons, studios, and mountain wellness spas in Abha and Asir. Master summer tourism rushes and ZATCA compliance.',
    keywords: [
      'برنامج إدارة صالونات في أبها',
      'برنامج صالونات أبها',
      'مشاغل نسائية أبها',
      'كاشير صالون حلاقة أبها',
      'مراكز سبا أبها وعسير',
      'فواتير صالونات زاتكا أبها',
    ],
    neighborhoodsAr: [
      'الضباب',
      'المفتاحة',
      'المنهل',
      'الخالدية',
      'المروج',
      'السد',
      'البديع',
      'مدينة سلطان',
    ],
    neighborhoodsEn: [
      'Al-Dhabab',
      'Al-Muftaha',
      'Al-Manhal',
      'Al-Khalidiyah',
      'Al-Murooj',
      'Al-Sadd',
      'Al-Badee',
      'Sultan City',
    ],
    marketContextAr:
      'تشهد مدينة أبها ومنطقة عسير نهضة تنموية وسياحية كبرى في إطار استراتيجية "قمم وشيم"؛ حيث تستقبل مئات الآلاف من السياح والمصطافين في فصل الصيف للاستمتاع بالطبيعة والضباب. يشهد قطاع التجميل والاسترخاء في أبها نمواً سريعاً، لاسيما في مراكز السبا والاستجمام الجبلي وصالونات العناية النسائية في المفتاحة والضباب. تحتاج منشآت أبها إلى نظام ذكي يجمع بين خدمة العميلات المحليات طوال العام، واستيعاب التدفق السياحي الصيفي بحجوزات سريعة وسلسة.',
    marketContextEn:
      'Abha and the wider Asir highland region are undergoing rapid transformation under the "Qimam & Sheem" regional tourism initiative. During the summer, cool temperatures attract extensive domestic and GCC tourists. Salons and mountain spa resorts in Al-Dhabab and Al-Muftaha require software handling regular resident bookings alongside sudden seasonal tourist spikes.',
    marketTodoAr:
      '[TODO: بيانات وإحصائيات موثقة عن نمو سوق صالونات التجميل والمراكز الترفيهية والسبا في أبها ومنطقة عسير]',
    marketTodoEn:
      '[TODO: Verified official statistics on aesthetic and wellness salon growth in Abha and Asir]',
    keySystems: [
      {
        titleAr: 'إدارة مراكز السبا والاستجمام الجبلي',
        titleEn: 'Mountain Wellness & Spa Session Engine',
        descAr: 'جدولة جلسات المساج، الحمام المغربي، والعناية بالبشرة مع تنظيم أوقات الغرف وتعقيمها.',
        descEn: 'Managing spa baths, massage therapies, and skincare rooms with automated sanitization intervals.',
      },
      {
        titleAr: 'حجز سياحي مرن عبر رابط الويب (PWA)',
        titleEn: 'Frictionless Mobile Tourist Booking',
        descAr: 'تمكين زوار أبها والمصطافين من الحجز المباشر دون الحاجة لتحميل تطبيقات ثقيلة.',
        descEn: 'Enabling visiting tourists to book salon sessions in seconds without app downloads.',
      },
      {
        titleAr: 'سجل تفضيلات العميلات وبطاقات الولاء',
        titleEn: 'Client Preference History & Loyalty',
        descAr: 'حفظ درجات ألوان الصبغات والمستحضرات المفضلة لبناء ولاء دائم مع عميلات أبها.',
        descEn: 'Archiving custom color formulas and skin sensitivities to build lifelong client loyalty.',
      },
    ],
    peakSeasons: [
      {
        seasonAr: 'موسم صيف عسير ومهرجانات الضباب',
        seasonEn: 'Asir Summer Festival & Fog Season',
        periodAr: 'يوليو – أغسطس',
        periodEn: 'July – August',
        descAr: 'ذروة سياحية كبرى مع إقبال المصطافين على جلسات الاستجمام والمساج والعناية بالشعر.',
        descEn: 'Peak tourism surge with high demand for wellness therapies, blowouts, and spa treatments.',
      },
      {
        seasonAr: 'موسم الأعراس والمناسبات الجنوبية',
        seasonEn: 'Southern Wedding Season',
        periodAr: 'أشهر الصيف والإجازات',
        periodEn: 'Summer & Extended Holidays',
        descAr: 'طلب مرتفع على باقات العرائس وتصفيف الشعر والمكياج لحفلات الزفاف في أبها وخميس مشيط.',
        descEn: 'Intense booking density for bridal styling across Abha and Khamis Mushait wedding venues.',
      },
      {
        seasonAr: 'مواسم الأعياد الرسمية',
        seasonEn: 'Official Eid Holidays',
        periodAr: 'عيد الفطر وعيد الأضحى',
        periodEn: 'Eid Al-Fitr & Al-Adha',
        descAr: 'إقبال عائلي كثيف على الحلاقة الرجالية وتجهيز الإطلالات الاحتفالية.',
        descEn: 'High family demand for men grooming and women styling ahead of Eid festivities.',
      },
    ],
    faqs: [
      {
        questionAr: 'كيف يدعم راش إكس صالونات أبها في مواكبة نمو السياحة الصيفية؟',
        questionEn: 'How does RashX help Abha salons capitalize on summer tourism growth?',
        answerAr:
          'يتيح النظام لزوار أبها حجز المواعيد إلكترونياً بضغطة زر من خرائط جوجل أو إنستغرام مع دفع العربون، مما يملأ جداول الصالون دون أي ازدحام في صالة الاستقبال.',
        answerEn:
          'Tourists discover and book your salon via Google Maps or Instagram in seconds with upfront deposits, filling your calendar smoothly.',
      },
      {
        questionAr: 'هل يمكن تشغيل راش إكس لصالون وسبا في أبها مع فرع في خميس مشيط؟',
        questionEn: 'Can I manage salon and spa branches in both Abha and Khamis Mushait?',
        answerAr:
          'نعم، توفر المنظومة إدارة مركزية متعددة الفروع تمكنك من متابعة أداء فرعي أبها والخميس والمخزون وحسابات الكادر من شاشة واحدة.',
        answerEn:
          'Yes, connect both Abha and Khamis Mushait branches to one centralized dashboard tracking sales, stock, and staff performance.',
      },
      {
        questionAr: 'هل يدعم الكاشير متطلبات الفوترة الإلكترونية ZATCA في منطقة عسير؟',
        questionEn: 'Is the cashier fully compliant with ZATCA Phase 2 in Asir Province?',
        answerAr:
          'بالتأكيد؛ يصدر النظام الفواتير الضريبية المبسطة فورياً مع رمز QR المشفر والختم الرقمي CSID وفق لوائح هيئة الزكاة والضريبة والجمارك.',
        answerEn:
          'Absolutely; instant generation of simplified tax invoices with cryptographic QR codes and CSID stamps adhering to ZATCA rules.',
      },
    ],
    hasUniqueContent: true,
  },
};

export const SUPPORTED_CITY_SLUGS = Object.keys(SAUDI_CITIES);
