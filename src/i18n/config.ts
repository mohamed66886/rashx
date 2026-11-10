/**
 * ============================================================================
 * RashX (راش إكس) | Internationalization (i18n) Configuration
 * ============================================================================
 * Arabic is the primary default locale ('ar') with full RTL support.
 * English ('en') is supported with LTR layout.
 */

export const LOCALES = ['ar', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ar';

export interface LocaleMeta {
  code: Locale;
  name: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  langCode: string; // BCP 47
  flag: string;
}

export const LOCALES_METADATA: Record<Locale, LocaleMeta> = {
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    langCode: 'ar-SA',
    flag: '🇸🇦',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    langCode: 'en-US',
    flag: '🇺🇸',
  },
};

export function isSupportedLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return LOCALES_METADATA[locale]?.dir ?? 'rtl';
}

