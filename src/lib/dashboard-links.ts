'use client';

import { useCallback } from 'react';
import { useParams } from 'next/navigation';

/**
 * Returns a fully qualified, locale-aware dashboard URL path.
 *
 * Examples:
 *   dashboardHref('ar', '') => '/ar/dashboard'
 *   dashboardHref('ar', '/') => '/ar/dashboard'
 *   dashboardHref('ar', '/invoices') => '/ar/dashboard/invoices'
 *   dashboardHref('ar', '/dashboard/invoices') => '/ar/dashboard/invoices'
 *   dashboardHref('en', 'invoices/new') => '/en/dashboard/invoices/new'
 */
export function dashboardHref(locale: string, path: string = ''): string {
  const cleanLocale = (locale || 'ar').replace(/^\/+|\/+$/g, '') || 'ar';
  let cleanPath = (path || '').trim().replace(/^\/+/, '');
  if (cleanPath.startsWith('dashboard')) {
    cleanPath = cleanPath.replace(/^dashboard\/?/, '');
  }
  return cleanPath ? `/${cleanLocale}/dashboard/${cleanPath}` : `/${cleanLocale}/dashboard`;
}

/**
 * React hook to generate locale-aware dashboard URLs using the active route locale from useParams().
 */
export function useDashboardHref() {
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  return useCallback((path: string = '') => dashboardHref(locale, path), [locale]);
}
