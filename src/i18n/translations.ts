import { Locale, DEFAULT_LOCALE, isSupportedLocale } from './config';
import arCommon from '../content/ar/common.json';
import enCommon from '../content/en/common.json';
import arSeo from '../content/ar/seo.json';
import enSeo from '../content/en/seo.json';

export type Dictionaries = {
  common: typeof arCommon;
  seo: typeof arSeo;
};

const catalogs: Record<Locale, Dictionaries> = {
  ar: {
    common: arCommon,
    seo: arSeo,
  },
  en: {
    common: enCommon,
    seo: enSeo,
  },
};

export function getDictionary(localeInput?: string): Dictionaries {
  const locale: Locale =
    localeInput && isSupportedLocale(localeInput) ? localeInput : DEFAULT_LOCALE;
  return catalogs[locale] ?? catalogs[DEFAULT_LOCALE];
}

/**
 * Access nested keys safely with dot notation, e.g. "lead.title" or "brand.name"
 */
export function getNestedTranslation(
  dict: Record<string, unknown>,
  path: string,
  fallback?: string
): string {
  const segments = path.split('.');
  let current: unknown = dict;

  for (const segment of segments) {
    if (current && typeof current === 'object' && segment in current) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return fallback ?? path;
    }
  }

  if (typeof current === 'string') {
    return current;
  }

  return fallback ?? path;
}

export function createTranslator(localeInput?: string, namespace: 'common' | 'seo' = 'common') {
  const dict = getDictionary(localeInput)[namespace];

  return function t(key: string, params?: Record<string, string | number>): string {
    let text = getNestedTranslation(dict as unknown as Record<string, unknown>, key, key);

    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        text = text.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramVal));
      });
    }

    return text;
  };
}

