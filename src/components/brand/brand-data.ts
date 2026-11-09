/* =========================================================================
   RASHX BRAND DATA & ASSETS CATALOG
   ========================================================================= */

export type LogoCategory = 'all' | 'wordmark' | 'wordmark-arabic' | 'symbol-rx' | 'lockup-bilingual';
export type LogoBgFilter = 'all' | 'transparent' | 'white' | 'black' | 'blue' | 'peach' | 'mist';

export interface BrandColor {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  hex: string;
  rgb: string;
  hsl: string;
  cssVar: string;
  textColor: string;
  contrastDesc: string;
  contrastRatio: string;
  wcagRating: string;
  usageTips: string;
  isPrimary?: boolean;
}

export interface LogoItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'wordmark' | 'wordmark-arabic' | 'symbol-rx' | 'lockup-bilingual';
  bgType: 'transparent' | 'white' | 'black' | 'blue' | 'peach' | 'mist';
  filePath: string;
  previewBg: string;
  isDarkLogo: boolean;
  dimensions: string;
}

export interface IconItem {
  id: string;
  nameAr: string;
  nameEn: string;
  type: 'app-icon' | 'favicon';
  colorTheme: 'blue' | 'peach' | 'white' | 'black';
  filePath: string;
  previewBg: string;
}

export interface SocialItem {
  id: string;
  nameAr: string;
  nameEn: string;
  type: 'avatar-r' | 'avatar-rx' | 'cover' | 'og-share';
  colorTheme: 'blue' | 'peach' | 'white' | 'black';
  filePath: string;
  dimensions: string;
}

export interface DocumentItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'stationery' | 'letterhead' | 'presentation' | 'finance';
  format: string;
  dimensions: string;
  filePath: string;
  description: string;
}

export interface EmailAssetItem {
  id: string;
  nameAr: string;
  nameEn: string;
  type: 'template' | 'signature' | 'png-image';
  filePath: string;
  format: string;
  description: string;
}

/* =========================================================================
   COLORS DATA
   ========================================================================= */

export const BRAND_COLORS: BrandColor[] = [
  {
    id: 'primary',
    nameAr: 'الأزرق الهادئ (Dusty Blue)',
    nameEn: 'Primary · Dusty Blue',
    roleAr: 'اللون الأساسي للعلامة',
    hex: '#91B8C0',
    rgb: '145, 184, 192',
    hsl: '190°, 28%, 66%',
    cssVar: 'var(--dusty-blue)',
    textColor: '#000000',
    contrastRatio: '10.2:1 مع الأسود',
    wcagRating: 'AAA مع الأسود',
    contrastDesc: 'تباين ممتاز مع الأسود (10.2:1). تباين منخفض مع الأبيض (2:1).',
    usageTips:
      'يُستخدم كخلفيات للبطاقات، الأزرار الأساسية، وتفاصيل الهوية، ويوضع فوقه الشعار والنصوص باللون الأسود دائماً.',
    isPrimary: true,
  },
  {
    id: 'secondary',
    nameAr: 'الخوخي الدافئ (Warm Peach)',
    nameEn: 'Secondary · Warm Peach',
    roleAr: 'اللون الثانوي التفاعلي',
    hex: '#F0C5AE',
    rgb: '240, 197, 174',
    hsl: '21°, 72%, 81%',
    cssVar: 'var(--warm-peach)',
    textColor: '#000000',
    contrastRatio: '11.5:1 مع الأسود',
    wcagRating: 'AAA مع الأسود',
    contrastDesc: 'تباين فائق مع الأسود (11.5:1). تباين منخفض مع الأبيض (1.8:1).',
    usageTips:
      'يُستخدم للتمييز البصري والخطوط الفاصلة وبطاقات الدعوة للإجراء (CTA)، مع نصوص وشعارات باللون الأسود.',
  },
  {
    id: 'base',
    nameAr: 'الأبيض النقي (Pure White)',
    nameEn: 'Base · White',
    roleAr: 'لون الأساس والمساحات',
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    hsl: '0°, 0%, 100%',
    cssVar: 'var(--base)',
    textColor: '#000000',
    contrastRatio: '21:1 مع الأسود',
    wcagRating: 'AAA المثالي',
    contrastDesc: 'أعلى نسبة تباين فيزيائية مع الحبر الأسود (21:1).',
    usageTips:
      'خلفية الموقع الرئيسية، أوراق المراسلات الرسمية، ومساحات القراءة النظيفة التي تبرز رقي التصميم.',
  },
  {
    id: 'neutral',
    nameAr: 'الرمادي الضبابي (Mist Gray)',
    nameEn: 'Neutral · Mist Gray',
    roleAr: 'اللون المحايد للهيكل والحدود',
    hex: '#E5E9E8',
    rgb: '229, 233, 232',
    hsl: '170°, 6%, 91%',
    cssVar: 'var(--mist-gray)',
    textColor: '#000000',
    contrastRatio: '12.8:1 مع الأسود',
    wcagRating: 'AAA مع الأسود',
    contrastDesc: 'تباين مريح للعين مع الأسود (12.8:1).',
    usageTips:
      'يُستخدم لخلفيات الجداول، حدود الحقول والبطاقات، وتجويف الواجهات ليمنح عمقاً وتوازناً هادئاً.',
  },
  {
    id: 'ink',
    nameAr: 'حبر أسود نقي (Ink Black)',
    nameEn: 'Ink · Pure Black',
    roleAr: 'لون الشعار والنصوص الأساسية',
    hex: '#000000',
    rgb: '0, 0, 0',
    hsl: '0°, 0%, 0%',
    cssVar: 'var(--ink)',
    textColor: '#FFFFFF',
    contrastRatio: '21:1 مع الأبيض',
    wcagRating: 'AAA فائق الوضوح',
    contrastDesc: 'اللون الأوضح والأعلى تركيزاً للنصوص والقراءة.',
    usageTips:
      'اللون الحصري للوجو والنصوص الرئيسية فوق جميع الخلفيات (الأبيض، الأزرق، الخوخي، والرمادي).',
  },
  {
    id: 'ink-muted',
    nameAr: 'حبر ثانوي مهدأ (Muted Ink)',
    nameEn: 'Ink Muted · Secondary',
    roleAr: 'لون النصوص الفرعية والبيانات',
    hex: '#5E6665',
    rgb: '94, 102, 101',
    hsl: '173°, 4%, 38%',
    cssVar: 'var(--ink-muted)',
    textColor: '#FFFFFF',
    contrastRatio: '4.9:1 مع الأبيض',
    wcagRating: 'AA معتمد للقراءة',
    contrastDesc: 'متوافق تماماً مع معايير الوصول العالمية للنصوص الثانوية.',
    usageTips:
      'للنصوص الفرعية، التسميات، الأوصاف الإضافية، وهوامش المستندات والبيانات الإحصائية.',
  },
];

/* =========================================================================
   LOGOS DATA (23 items)
   ========================================================================= */

export const LOGOS: LogoItem[] = [
  // 1. Wordmark (Latin)
  {
    id: 'wordmark-black',
    nameAr: 'الشعار النصي (RASHX) — أسود مفرغ',
    nameEn: 'Wordmark Black (Transparent)',
    category: 'wordmark',
    bgType: 'transparent',
    filePath: '/brand/logo/wordmark/wordmark-black.svg',
    previewBg: 'bg-white',
    isDarkLogo: true,
    dimensions: 'SVG فيكتور مسارات',
  },
  {
    id: 'wordmark-white',
    nameAr: 'الشعار النصي (RASHX) — أبيض مفرغ',
    nameEn: 'Wordmark White (Transparent)',
    category: 'wordmark',
    bgType: 'transparent',
    filePath: '/brand/logo/wordmark/wordmark-white.svg',
    previewBg: 'bg-black',
    isDarkLogo: false,
    dimensions: 'SVG فيكتور مسارات',
  },
  {
    id: 'wordmark-on-white',
    nameAr: 'الشعار النصي (RASHX) — على أبيض',
    nameEn: 'Wordmark on White',
    category: 'wordmark',
    bgType: 'white',
    filePath: '/brand/logo/wordmark/wordmark-on-white.svg',
    previewBg: 'bg-white',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية بيضاء',
  },
  {
    id: 'wordmark-on-black',
    nameAr: 'الشعار النصي (RASHX) — على أسود',
    nameEn: 'Wordmark on Black',
    category: 'wordmark',
    bgType: 'black',
    filePath: '/brand/logo/wordmark/wordmark-on-black.svg',
    previewBg: 'bg-black',
    isDarkLogo: false,
    dimensions: 'SVG مع خلفية سوداء',
  },
  {
    id: 'wordmark-on-blue',
    nameAr: 'الشعار النصي (RASHX) — على أزرق',
    nameEn: 'Wordmark on Dusty Blue',
    category: 'wordmark',
    bgType: 'blue',
    filePath: '/brand/logo/wordmark/wordmark-on-blue.svg',
    previewBg: 'bg-[#91B8C0]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية زرقاء',
  },
  {
    id: 'wordmark-on-peach',
    nameAr: 'الشعار النصي (RASHX) — على خوخي',
    nameEn: 'Wordmark on Warm Peach',
    category: 'wordmark',
    bgType: 'peach',
    filePath: '/brand/logo/wordmark/wordmark-on-peach.svg',
    previewBg: 'bg-[#F0C5AE]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية خوخية',
  },
  {
    id: 'wordmark-on-mist',
    nameAr: 'الشعار النصي (RASHX) — على رمادي ميست',
    nameEn: 'Wordmark on Mist Gray',
    category: 'wordmark',
    bgType: 'mist',
    filePath: '/brand/logo/wordmark/wordmark-on-mist.svg',
    previewBg: 'bg-[#E5E9E8]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية رمادية',
  },

  // 2. Wordmark Arabic
  {
    id: 'wordmark-ar-black',
    nameAr: 'الشعار العربي (راش اكس + Rx) — أسود مفرغ',
    nameEn: 'Arabic Wordmark Black (Transparent)',
    category: 'wordmark-arabic',
    bgType: 'transparent',
    filePath: '/brand/logo/wordmark-arabic/wordmark-arabic-black.svg',
    previewBg: 'bg-white',
    isDarkLogo: true,
    dimensions: 'SVG فيكتور مسارات',
  },
  {
    id: 'wordmark-ar-white',
    nameAr: 'الشعار العربي (راش اكس + Rx) — أبيض مفرغ',
    nameEn: 'Arabic Wordmark White (Transparent)',
    category: 'wordmark-arabic',
    bgType: 'transparent',
    filePath: '/brand/logo/wordmark-arabic/wordmark-arabic-white.svg',
    previewBg: 'bg-black',
    isDarkLogo: false,
    dimensions: 'SVG فيكتور مسارات',
  },
  {
    id: 'wordmark-ar-on-white',
    nameAr: 'الشعار العربي — على خلفية بيضاء',
    nameEn: 'Arabic Wordmark on White',
    category: 'wordmark-arabic',
    bgType: 'white',
    filePath: '/brand/logo/wordmark-arabic/wordmark-arabic-on-white.svg',
    previewBg: 'bg-white',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية بيضاء',
  },
  {
    id: 'wordmark-ar-on-black',
    nameAr: 'الشعار العربي — على خلفية سوداء',
    nameEn: 'Arabic Wordmark on Black',
    category: 'wordmark-arabic',
    bgType: 'black',
    filePath: '/brand/logo/wordmark-arabic/wordmark-arabic-on-black.svg',
    previewBg: 'bg-black',
    isDarkLogo: false,
    dimensions: 'SVG مع خلفية سوداء',
  },
  {
    id: 'wordmark-ar-on-blue',
    nameAr: 'الشعار العربي — على أزرق دافي',
    nameEn: 'Arabic Wordmark on Dusty Blue',
    category: 'wordmark-arabic',
    bgType: 'blue',
    filePath: '/brand/logo/wordmark-arabic/wordmark-arabic-on-blue.svg',
    previewBg: 'bg-[#91B8C0]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية زرقاء',
  },
  {
    id: 'wordmark-ar-on-peach',
    nameAr: 'الشعار العربي — على خوخي دافي',
    nameEn: 'Arabic Wordmark on Warm Peach',
    category: 'wordmark-arabic',
    bgType: 'peach',
    filePath: '/brand/logo/wordmark-arabic/wordmark-arabic-on-peach.svg',
    previewBg: 'bg-[#F0C5AE]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية خوخية',
  },
  {
    id: 'wordmark-ar-on-mist',
    nameAr: 'الشعار العربي — على رمادي ميست',
    nameEn: 'Arabic Wordmark on Mist Gray',
    category: 'wordmark-arabic',
    bgType: 'mist',
    filePath: '/brand/logo/wordmark-arabic/wordmark-arabic-on-mist.svg',
    previewBg: 'bg-[#E5E9E8]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية رمادية',
  },

  // 3. Symbol Rx
  {
    id: 'symbol-rx-black',
    nameAr: 'رمز العلامة (Rx) — أسود مفرغ',
    nameEn: 'Symbol Rx Black (Transparent)',
    category: 'symbol-rx',
    bgType: 'transparent',
    filePath: '/brand/logo/symbol-rx/symbol-rx-black.svg',
    previewBg: 'bg-white',
    isDarkLogo: true,
    dimensions: 'SVG فيكتور مسارات',
  },
  {
    id: 'symbol-rx-white',
    nameAr: 'رمز العلامة (Rx) — أبيض مفرغ',
    nameEn: 'Symbol Rx White (Transparent)',
    category: 'symbol-rx',
    bgType: 'transparent',
    filePath: '/brand/logo/symbol-rx/symbol-rx-white.svg',
    previewBg: 'bg-black',
    isDarkLogo: false,
    dimensions: 'SVG فيكتور مسارات',
  },
  {
    id: 'symbol-rx-on-white',
    nameAr: 'رمز العلامة (Rx) — على أبيض',
    nameEn: 'Symbol Rx on White',
    category: 'symbol-rx',
    bgType: 'white',
    filePath: '/brand/logo/symbol-rx/symbol-rx-on-white.svg',
    previewBg: 'bg-white',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية بيضاء',
  },
  {
    id: 'symbol-rx-on-black',
    nameAr: 'رمز العلامة (Rx) — على أسود',
    nameEn: 'Symbol Rx on Black',
    category: 'symbol-rx',
    bgType: 'black',
    filePath: '/brand/logo/symbol-rx/symbol-rx-on-black.svg',
    previewBg: 'bg-black',
    isDarkLogo: false,
    dimensions: 'SVG مع خلفية سوداء',
  },
  {
    id: 'symbol-rx-on-blue',
    nameAr: 'رمز العلامة (Rx) — على أزرق',
    nameEn: 'Symbol Rx on Dusty Blue',
    category: 'symbol-rx',
    bgType: 'blue',
    filePath: '/brand/logo/symbol-rx/symbol-rx-on-blue.svg',
    previewBg: 'bg-[#91B8C0]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية زرقاء',
  },
  {
    id: 'symbol-rx-on-peach',
    nameAr: 'رمز العلامة (Rx) — على خوخي',
    nameEn: 'Symbol Rx on Warm Peach',
    category: 'symbol-rx',
    bgType: 'peach',
    filePath: '/brand/logo/symbol-rx/symbol-rx-on-peach.svg',
    previewBg: 'bg-[#F0C5AE]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية خوخية',
  },
  {
    id: 'symbol-rx-on-mist',
    nameAr: 'رمز العلامة (Rx) — على رمادي ميست',
    nameEn: 'Symbol Rx on Mist Gray',
    category: 'symbol-rx',
    bgType: 'mist',
    filePath: '/brand/logo/symbol-rx/symbol-rx-on-mist.svg',
    previewBg: 'bg-[#E5E9E8]',
    isDarkLogo: true,
    dimensions: 'SVG مع خلفية رمادية',
  },

  // 4. Lockup Bilingual
  {
    id: 'lockup-bilingual-black',
    nameAr: 'الشعار المزدوج (عربي + إنجليزي) — أسود',
    nameEn: 'Lockup Bilingual Black',
    category: 'lockup-bilingual',
    bgType: 'transparent',
    filePath: '/brand/logo/lockup-bilingual/lockup-bilingual-black.svg',
    previewBg: 'bg-white',
    isDarkLogo: true,
    dimensions: 'SVG فيكتور مسارات',
  },
  {
    id: 'lockup-bilingual-white',
    nameAr: 'الشعار المزدوج (عربي + إنجليزي) — أبيض',
    nameEn: 'Lockup Bilingual White',
    category: 'lockup-bilingual',
    bgType: 'transparent',
    filePath: '/brand/logo/lockup-bilingual/lockup-bilingual-white.svg',
    previewBg: 'bg-black',
    isDarkLogo: false,
    dimensions: 'SVG فيكتور مسارات',
  },
];

/* =========================================================================
   ICONS DATA
   ========================================================================= */

export const ICONS: IconItem[] = [
  {
    id: 'app-icon-blue',
    nameAr: 'أيقونة تطبيق Rx (أسود على أزرق)',
    nameEn: 'App Icon Rx Black on Blue',
    type: 'app-icon',
    colorTheme: 'blue',
    filePath: '/brand/icons/app-icon-rx-black-on-blue.svg',
    previewBg: '#91B8C0',
  },
  {
    id: 'app-icon-peach',
    nameAr: 'أيقونة تطبيق Rx (أسود على خوخي)',
    nameEn: 'App Icon Rx Black on Peach',
    type: 'app-icon',
    colorTheme: 'peach',
    filePath: '/brand/icons/app-icon-rx-black-on-peach.svg',
    previewBg: '#F0C5AE',
  },
  {
    id: 'app-icon-white',
    nameAr: 'أيقونة تطبيق Rx (أسود على أبيض)',
    nameEn: 'App Icon Rx Black on White',
    type: 'app-icon',
    colorTheme: 'white',
    filePath: '/brand/icons/app-icon-rx-black-on-white.svg',
    previewBg: '#FFFFFF',
  },
  {
    id: 'app-icon-black',
    nameAr: 'أيقونة تطبيق Rx (أبيض على أسود)',
    nameEn: 'App Icon Rx White on Black',
    type: 'app-icon',
    colorTheme: 'black',
    filePath: '/brand/icons/app-icon-rx-white-on-black.svg',
    previewBg: '#000000',
  },
  {
    id: 'favicon-blue',
    nameAr: 'فافيكون المتصفح (أسود على أزرق)',
    nameEn: 'Favicon Black on Blue',
    type: 'favicon',
    colorTheme: 'blue',
    filePath: '/brand/icons/favicon-black-on-blue.svg',
    previewBg: '#91B8C0',
  },
  {
    id: 'favicon-peach',
    nameAr: 'فافيكون المتصفح (أسود على خوخي)',
    nameEn: 'Favicon Black on Peach',
    type: 'favicon',
    colorTheme: 'peach',
    filePath: '/brand/icons/favicon-black-on-peach.svg',
    previewBg: '#F0C5AE',
  },
  {
    id: 'favicon-white',
    nameAr: 'فافيكون المتصفح (أسود على أبيض)',
    nameEn: 'Favicon Black on White',
    type: 'favicon',
    colorTheme: 'white',
    filePath: '/brand/icons/favicon-black-on-white.svg',
    previewBg: '#FFFFFF',
  },
  {
    id: 'favicon-black',
    nameAr: 'فافيكون المتصفح (أبيض على أسود)',
    nameEn: 'Favicon White on Black',
    type: 'favicon',
    colorTheme: 'black',
    filePath: '/brand/icons/favicon-white-on-black.svg',
    previewBg: '#000000',
  },
];

/* =========================================================================
   SOCIAL MEDIA GRAPHICS
   ========================================================================= */

export const SOCIAL_GRAPHICS: SocialItem[] = [
  // Avatars
  {
    id: 'avatar-rx-blue',
    nameAr: 'صورة شخصية (Rx على أزرق)',
    nameEn: 'Avatar Rx Black on Blue',
    type: 'avatar-rx',
    colorTheme: 'blue',
    filePath: '/brand/social/avatar-rx-black-on-blue.svg',
    dimensions: 'مربعة 1:1 SVG',
  },
  {
    id: 'avatar-rx-peach',
    nameAr: 'صورة شخصية (Rx على خوخي)',
    nameEn: 'Avatar Rx Black on Peach',
    type: 'avatar-rx',
    colorTheme: 'peach',
    filePath: '/brand/social/avatar-rx-black-on-peach.svg',
    dimensions: 'مربعة 1:1 SVG',
  },
  {
    id: 'avatar-rx-white',
    nameAr: 'صورة شخصية (Rx على أبيض)',
    nameEn: 'Avatar Rx Black on White',
    type: 'avatar-rx',
    colorTheme: 'white',
    filePath: '/brand/social/avatar-rx-black-on-white.svg',
    dimensions: 'مربعة 1:1 SVG',
  },
  {
    id: 'avatar-rx-black',
    nameAr: 'صورة شخصية (Rx على أسود)',
    nameEn: 'Avatar Rx White on Black',
    type: 'avatar-rx',
    colorTheme: 'black',
    filePath: '/brand/social/avatar-rx-white-on-black.svg',
    dimensions: 'مربعة 1:1 SVG',
  },
  {
    id: 'avatar-r-blue',
    nameAr: 'صورة شخصية (حرف R على أزرق)',
    nameEn: 'Avatar R Black on Blue',
    type: 'avatar-r',
    colorTheme: 'blue',
    filePath: '/brand/social/avatar-r-black-on-blue.svg',
    dimensions: 'مربعة 1:1 SVG',
  },
  {
    id: 'avatar-r-peach',
    nameAr: 'صورة شخصية (حرف R على خوخي)',
    nameEn: 'Avatar R Black on Peach',
    type: 'avatar-r',
    colorTheme: 'peach',
    filePath: '/brand/social/avatar-r-black-on-peach.svg',
    dimensions: 'مربعة 1:1 SVG',
  },
  // Covers
  {
    id: 'cover-blue',
    nameAr: 'غلاف الحسابات (أزرق هادئ)',
    nameEn: 'Cover Banner Blue',
    type: 'cover',
    colorTheme: 'blue',
    filePath: '/brand/social/cover-blue.svg',
    dimensions: 'بانر عريض 3:1 SVG',
  },
  {
    id: 'cover-peach',
    nameAr: 'غلاف الحسابات (خوخي دافئ)',
    nameEn: 'Cover Banner Peach',
    type: 'cover',
    colorTheme: 'peach',
    filePath: '/brand/social/cover-peach.svg',
    dimensions: 'بانر عريض 3:1 SVG',
  },
  {
    id: 'cover-white',
    nameAr: 'غلاف الحسابات (أبيض نقي)',
    nameEn: 'Cover Banner White',
    type: 'cover',
    colorTheme: 'white',
    filePath: '/brand/social/cover-white.svg',
    dimensions: 'بانر عريض 3:1 SVG',
  },
  {
    id: 'cover-black',
    nameAr: 'غلاف الحسابات (أسود داكن)',
    nameEn: 'Cover Banner Black',
    type: 'cover',
    colorTheme: 'black',
    filePath: '/brand/social/cover-black.svg',
    dimensions: 'بانر عريض 3:1 SVG',
  },
  // OG Share
  {
    id: 'og-share-blue',
    nameAr: 'بطاقة مشاركة الروابط OG (أزرق)',
    nameEn: 'OG Share Card Blue',
    type: 'og-share',
    colorTheme: 'blue',
    filePath: '/brand/social/og-share-blue.svg',
    dimensions: '1200 × 630 px SVG',
  },
  {
    id: 'og-share-peach',
    nameAr: 'بطاقة مشاركة الروابط OG (خوخي)',
    nameEn: 'OG Share Card Peach',
    type: 'og-share',
    colorTheme: 'peach',
    filePath: '/brand/social/og-share-peach.svg',
    dimensions: '1200 × 630 px SVG',
  },
  {
    id: 'og-share-white',
    nameAr: 'بطاقة مشاركة الروابط OG (أبيض)',
    nameEn: 'OG Share Card White',
    type: 'og-share',
    colorTheme: 'white',
    filePath: '/brand/social/og-share-white.svg',
    dimensions: '1200 × 630 px SVG',
  },
  {
    id: 'og-share-black',
    nameAr: 'بطاقة مشاركة الروابط OG (أسود)',
    nameEn: 'OG Share Card Black',
    type: 'og-share',
    colorTheme: 'black',
    filePath: '/brand/social/og-share-black.svg',
    dimensions: '1200 × 630 px SVG',
  },
];

/* =========================================================================
   DOCUMENTS & STATIONERY
   ========================================================================= */

export const DOCUMENTS: DocumentItem[] = [
  {
    id: 'presentation-cover',
    nameAr: 'غلاف العرض التقديمي (16:9)',
    nameEn: 'Presentation Cover 16:9',
    category: 'presentation',
    format: 'SVG Vector',
    dimensions: '1920 × 1080 (16:9)',
    filePath: '/brand/documents/presentation-cover-16x9.svg',
    description: 'قالب شريحة الغلاف والعنوان الرئيسي للعروض التقديمية والمؤتمرات.',
  },
  {
    id: 'presentation-slide',
    nameAr: 'شريحة المحتوى الداخلي (16:9)',
    nameEn: 'Presentation Content Slide 16:9',
    category: 'presentation',
    format: 'SVG Vector',
    dimensions: '1920 × 1080 (16:9)',
    filePath: '/brand/documents/presentation-slide-16x9.svg',
    description: 'قالب الشرائح الداخلية للنصوص والرسوم البيانية مع ترويسة راش إكس.',
  },
  {
    id: 'business-card-front',
    nameAr: 'بطاقة العمل الرسمية (الوجه التفصيلي)',
    nameEn: 'Business Card Front (Detailed)',
    category: 'stationery',
    format: 'SVG Vector',
    dimensions: '90 × 50 mm (قياسي)',
    filePath: '/brand/documents/business-card-front.svg',
    description: 'واجهة الكارت الشخصي متضمنة الاسم والمسمى وبيانات التواصل وشعار راش إكس.',
  },
  {
    id: 'business-card-front-symbol',
    nameAr: 'بطاقة العمل الرسمية (وجه الرمز المختصر)',
    nameEn: 'Business Card Front (Symbol Rx)',
    category: 'stationery',
    format: 'SVG Vector',
    dimensions: '90 × 50 mm (قياسي)',
    filePath: '/brand/documents/business-card-front-symbol.svg',
    description: 'تصميم بديل بسيط يبرز رمز Rx بشكل أنيق وعصري.',
  },
  {
    id: 'business-card-back',
    nameAr: 'بطاقة العمل الرسمية (الظهر الموحد)',
    nameEn: 'Business Card Back',
    category: 'stationery',
    format: 'SVG Vector',
    dimensions: '90 × 50 mm (قياسي)',
    filePath: '/brand/documents/business-card-back.svg',
    description: 'ظهر الكارت الشخصي بخلفية نقية وشعار راش إكس المعتمد.',
  },
  {
    id: 'letterhead-arabic',
    nameAr: 'الورق الرسمي للمراسلات (A4 عربي)',
    nameEn: 'Official Letterhead A4 (Arabic)',
    category: 'letterhead',
    format: 'SVG Vector',
    dimensions: '210 × 297 mm (A4)',
    filePath: '/brand/documents/letterhead-a4-arabic.svg',
    description: 'ورق الخطابات والعقود والاتفاقيات الرسمية باللغة العربية مع هوامش معتمدة.',
  },
  {
    id: 'letterhead-english',
    nameAr: 'الورق الرسمي للمراسلات (A4 إنجليزي)',
    nameEn: 'Official Letterhead A4 (English)',
    category: 'letterhead',
    format: 'SVG Vector',
    dimensions: '210 × 297 mm (A4)',
    filePath: '/brand/documents/letterhead-a4.svg',
    description: 'ترويسة المراسلات الرسمية الدولية باللغة الإنجليزية للشركاء والجهات الخارجية.',
  },
  {
    id: 'invoice-a4',
    nameAr: 'قالب الفاتورة الرسمية والضريبية (A4)',
    nameEn: 'Official Tax Invoice Template A4',
    category: 'finance',
    format: 'SVG Vector',
    dimensions: '210 × 297 mm (A4)',
    filePath: '/brand/documents/invoice-a4.svg',
    description: 'تصميم الفاتورة المعتمدة المتوافق مع متطلبات هيئة الزكاة والضريبة والجمارك ZATCA.',
  },
  {
    id: 'envelope-dl',
    nameAr: 'مظروف المراسلات البريدي الرسمي (DL)',
    nameEn: 'Official Mailing Envelope DL',
    category: 'stationery',
    format: 'SVG Vector',
    dimensions: '220 × 110 mm (DL)',
    filePath: '/brand/documents/envelope-dl.svg',
    description: 'مظروف المراسلات البريدية للشركات مع نافذة الشعار وبيانات العنوان.',
  },
];

/* =========================================================================
   EMAIL ASSETS & TEMPLATES
   ========================================================================= */

export const EMAIL_ASSETS: EmailAssetItem[] = [
  {
    id: 'email-signature-html',
    nameAr: 'توقيع البريد الإلكتروني (HTML حي)',
    nameEn: 'Email Signature (HTML)',
    type: 'signature',
    filePath: '/brand/email/signature.html',
    format: 'HTML + Inline CSS',
    description: 'كود جاهز للنسخ الفوري ولصقه في Gmail وOutlook وApple Mail.',
  },
  {
    id: 'email-signature-svg',
    nameAr: 'توقيع البريد الإلكتروني (فيكتور SVG)',
    nameEn: 'Email Signature (SVG)',
    type: 'signature',
    filePath: '/brand/email/signature.svg',
    format: 'SVG Vector',
    description: 'النسخة الأصلية الفيكتور لتوقيع البريد الإلكتروني.',
  },
  {
    id: 'email-template-ar',
    nameAr: 'قالب رسائل البريد الإلكتروني (عربي)',
    nameEn: 'Email Newsletter Template (Arabic)',
    type: 'template',
    filePath: '/brand/email/email-template-ar.html',
    format: 'HTML متجاوب',
    description: 'قالب الرسائل الإخبارية والإشعارات باللغة العربية متوافق مع كافة برامج البريد.',
  },
  {
    id: 'email-template-en',
    nameAr: 'قالب رسائل البريد الإلكتروني (إنجليزي)',
    nameEn: 'Email Newsletter Template (English)',
    type: 'template',
    filePath: '/brand/email/email-template-en.html',
    format: 'HTML متجاوب',
    description: 'قالب الرسائل والمراسلات الدولية باللغة الإنجليزية بتصميم متجاوب ونظيف.',
  },
  {
    id: 'email-header-svg',
    nameAr: 'ترويسة البريد الإلكتروني (SVG)',
    nameEn: 'Email Header Graphic (SVG)',
    type: 'signature',
    filePath: '/brand/email/email-header.svg',
    format: 'SVG Vector',
    description: 'ترويسة الرسائل الرسمية بنسق فيكتور قابل للتحجيم.',
  },
  {
    id: 'email-img-header',
    nameAr: 'بانر الترويسة للبريد الإلكتروني (@2x PNG)',
    nameEn: 'Email Header Image (Retina PNG)',
    type: 'png-image',
    filePath: '/brand/email/images/email-header@2x.png',
    format: 'PNG عالية الدقة',
    description: 'نسخة ريتينا متوافقة مع عملاء البريد التي لا تدعم SVG مثل Outlook وGmail القديم.',
  },
  {
    id: 'email-img-wordmark',
    nameAr: 'شعار RASHX اللاتيني للبريد (@2x PNG)',
    nameEn: 'Email Logo Wordmark (Retina PNG)',
    type: 'png-image',
    filePath: '/brand/email/images/logo-wordmark@2x.png',
    format: 'PNG عالية الدقة',
    description: 'شعار نصي شفاف بدقة فائقة مخصص للاستخدام في ترويسة وتوقيع البريد.',
  },
  {
    id: 'email-img-symbol',
    nameAr: 'رمز Rx المختصر للبريد (@2x PNG)',
    nameEn: 'Email Logo Symbol Rx (Retina PNG)',
    type: 'png-image',
    filePath: '/brand/email/images/logo-symbol-rx@2x.png',
    format: 'PNG عالية الدقة',
    description: 'رمز Rx مصمم للتوافق التام مع توقيعات موظفي الشركة في برامج البريد.',
  },
  {
    id: 'email-img-arabic',
    nameAr: 'شعار راش اكس العربي للبريد (@2x PNG)',
    nameEn: 'Email Logo Arabic (Retina PNG)',
    type: 'png-image',
    filePath: '/brand/email/images/logo-wordmark-arabic@2x.png',
    format: 'PNG عالية الدقة',
    description: 'الشعار العربي مخصص لحملات البريد الإلكتروني المحلية وقوائم المشتركين.',
  },
];

export const RAW_SIGNATURE_HTML = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Ping AR + LT', 'PingAR+LT', 'Helvetica Neue', Arial, Tahoma, sans-serif;color:#000000;font-size:13px;line-height:1.5;">
<tr>
<td style="padding-right:16px;vertical-align:top;"><img src="/brand/email/images/logo-symbol-rx@2x.png" width="56" alt="RASHX" style="display:block;border:0;"></td>
<td style="border-left:2px solid #91B8C0;padding-left:16px;vertical-align:top;">
<div style="font-size:15px;font-weight:700;">محمد رشاد</div>
<div style="color:#5E6665;margin-bottom:8px;">المؤسس والرئيس التنفيذي · RASHX</div>
<div>+966 50 000 0000</div>
<div><a href="mailto:hello@rashx.com" style="color:#000000;text-decoration:none;">hello@rashx.com</a></div>
<div><a href="https://rashx.com" style="color:#000000;text-decoration:none;font-weight:700;">rashx.com</a></div>
</td></tr>
<tr><td colspan="2" style="padding-top:12px;"><div style="height:3px;background:#F0C5AE;width:100%;font-size:0;line-height:0;">&nbsp;</div></td></tr>
</table>`;

export const FONT_CSS_SNIPPET = `@font-face {
  font-family: "Ping AR + LT";
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url("/fonts/PingAR+LT-Regular.woff2") format("woff2"),
       url("/fonts/PingAR+LT-Regular.otf") format("opentype");
}
@font-face {
  font-family: "Ping AR + LT";
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url("/fonts/PingAR+LT-Medium.woff2") format("woff2"),
       url("/fonts/PingAR+LT-Medium.otf") format("opentype");
}
@font-face {
  font-family: "Ping AR + LT";
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url("/fonts/PingAR+LT-Bold.woff2") format("woff2"),
       url("/fonts/PingAR+LT-Bold.otf") format("opentype");
}
@font-face {
  font-family: "Ping AR + LT";
  font-weight: 800;
  font-style: normal;
  font-display: swap;
  src: url("/fonts/PingAR+LT-ExtraBold.woff2") format("woff2"),
       url("/fonts/PingAR+LT-ExtraBold.otf") format("opentype");
}

:root {
  --font-brand: "Ping AR + LT", "Helvetica Neue", Arial, "Noto Sans Arabic", Tahoma, sans-serif;
}`;

