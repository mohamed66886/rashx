'use client';

import { usePathname } from 'next/navigation';

/**
 * Lightweight safe next-intl shim for environments without next-intl installed.
 * Automatically resolves active locale from URL pathname or document attributes.
 */
export function useLocale(): string {
  const pathname = usePathname() ?? '';
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/ar')) return 'ar';
  if (typeof document !== 'undefined') {
    return document.documentElement.lang?.startsWith('en') ? 'en' : 'ar';
  }
  return 'ar';
}

export function useTranslations() {
  return (key: string) => key;
}

export default {
  useLocale,
  useTranslations,
};

