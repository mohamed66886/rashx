'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

export interface FeatureSplitProps {
  locale?: Locale;
  badge?: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export const FeatureSplit: React.FC<FeatureSplitProps> = ({
  locale = DEFAULT_LOCALE,
  badge,
  title,
  description,
  bullets,
  ctaLabel,
  ctaHref,
  imageSrc = '/brand/social/og-share-blue.svg',
  imageAlt = 'واجهة نظام راش إكس',
  reverse = false,
}) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? 'lg:grid-flow-dense' : ''
          }`}
        >
          {/* Content Column */}
          <div className={`space-y-6 ${reverse ? 'lg:col-start-2' : ''}`}>
            {badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{badge}</span>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-ink tracking-tight leading-tight">
              {title}
            </h2>

            <p className="text-xs sm:text-sm font-normal text-ink-muted leading-relaxed">
              {description}
            </p>

            <ul className="space-y-3 pt-2">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {ctaLabel && ctaHref && (
              <div className="pt-4">
                <Link
                  href={`/${locale}${ctaHref}`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-xs transition-colors"
                >
                  <span>{ctaLabel}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Visual / Mockup Column */}
          <div className={`${reverse ? 'lg:col-start-1' : ''}`}>
            <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-mist-gray to-white border border-mist-gray shadow-xl">
              <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-white border border-mist-gray/60">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSplit;

