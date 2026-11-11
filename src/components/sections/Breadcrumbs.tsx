'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema, BreadcrumbItem } from '@/lib/seo';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface BreadcrumbsProps {
  locale?: Locale;
  items: {
    label: string;
    href: string;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  locale = DEFAULT_LOCALE,
  items,
}) => {
  const isAr = locale === 'ar';
  const Separator = isAr ? ChevronLeft : ChevronRight;

  const fullList = [
    { label: isAr ? 'الرئيسية' : 'Home', href: `/${locale}` },
    ...items.map((i) => ({
      label: i.label,
      href: i.href.startsWith(`/${locale}`) ? i.href : `/${locale}${i.href}`,
    })),
  ];

  const schemaItems: BreadcrumbItem[] = fullList.map((crumb) => ({
    name: crumb.label,
    item: crumb.href,
  }));

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(schemaItems)} id="breadcrumb-schema" />

      <nav
        aria-label={isAr ? 'مسار التنقل' : 'Breadcrumb'}
        dir={isAr ? 'rtl' : 'ltr'}
        className="mx-auto max-w-7xl px-4 py-3 text-xs text-ink-muted sm:px-6 lg:px-8"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {fullList.map((crumb, idx) => {
            const isLast = idx === fullList.length - 1;

            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {idx > 0 && <Separator className="h-3.5 w-3.5 shrink-0 text-ink-muted/50" aria-hidden="true" />}
                {isLast ? (
                  <span className="font-bold text-ink" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="flex items-center gap-1 font-medium transition-colors hover:text-ink"
                  >
                    {idx === 0 && <Home className="h-3 w-3 shrink-0" aria-hidden="true" />}
                    <span>{crumb.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;