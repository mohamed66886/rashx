'use client';

import { usePathname } from 'next/navigation';
import { Locale, DEFAULT_LOCALE, isSupportedLocale } from '@/i18n/config';
import { createTranslator } from '@/i18n/translations';

/**
 * Lightweight safe next-intl drop-in replacement.
 * Automatically resolves active locale from URL pathname or document attributes.
 */
export function useLocale(): Locale {
  const pathname = usePathname() ?? '';
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/ar')) return 'ar';
  if (typeof document !== 'undefined') {
    const docLang = document.documentElement.lang;
    if (docLang && isSupportedLocale(docLang)) return docLang as Locale;
  }
  return DEFAULT_LOCALE;
}

export function useTranslations(namespace: 'common' | 'seo' = 'common') {
  const locale = useLocale();
  return createTranslator(locale, namespace);
}

export default {
  useLocale,
  useTranslations,
};
