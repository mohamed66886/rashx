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
        aria-label="Breadcrumb"
        className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-ink-muted"
      >
        <ol className="flex items-center gap-1.5 flex-wrap">
          {fullList.map((crumb, idx) => {
            const isLast = idx === fullList.length - 1;

            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {idx > 0 && <Separator className="w-3.5 h-3.5 text-mist-gray shrink-0" />}
                {isLast ? (
                  <span className="font-semibold text-ink" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-dusty-blue transition-colors flex items-center gap-1"
                  >
                    {idx === 0 && <Home className="w-3 h-3 text-ink-muted shrink-0" />}
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

