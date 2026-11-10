'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

export interface RelatedLink {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  href: string;
  badgeAr?: string;
  badgeEn?: string;
}

interface RelatedPagesProps {
  locale?: Locale;
  titleAr?: string;
  titleEn?: string;
  links: RelatedLink[];
}

export const RelatedPages: React.FC<RelatedPagesProps> = ({
  locale = DEFAULT_LOCALE,
  titleAr = 'حلول وأنظمة ذات صلة لمنشأتك',
  titleEn = 'Related Solutions for Your Facility',
  links,
}) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-12 md:py-16 bg-[#FAFBFB] border-t border-mist-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-5 h-5 text-dusty-blue" />
          <h3 className="text-xl font-bold text-ink">
            {isAr ? titleAr : titleEn}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={`/${locale}${link.href}`}
              className="group p-5 rounded-2xl bg-white border border-mist-gray hover:border-dusty-blue hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-ink group-hover:text-dusty-blue transition-colors">
                    {isAr ? link.titleAr : link.titleEn}
                  </h4>
                  {link.badgeAr && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-mist-gray font-medium text-ink-muted">
                      {isAr ? link.badgeAr : link.badgeEn}
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
                  {isAr ? link.descriptionAr : link.descriptionEn}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-mist-gray/40 flex items-center gap-1.5 text-xs font-semibold text-ink group-hover:text-dusty-blue transition-colors">
                <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPages;

