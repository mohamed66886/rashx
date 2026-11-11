'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowUpLeft,
  ArrowUpRight,
  PhoneCall,
  Sparkles,
  Check,
  Globe,
  ShieldCheck,
  Smartphone,
  CalendarCheck,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX closing CTA — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 * Font weights follow the brand font (400 / 500 / 700 / 800): no 600.
 */

export type CTABannerVariant = 'default' | 'minimal' | 'action-split';

export interface CTABannerProps {
  locale?: Locale;
  variant?: CTABannerVariant;
}

export const CTABanner: React.FC<CTABannerProps> = ({
  locale = DEFAULT_LOCALE,
  variant = 'default',
}) => {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  const whatsappHref = `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`;

  const trust = [
    isAr ? 'بدون بطاقة ائتمان' : 'No credit card',
    isAr ? 'تفعيل فوري خلال دقائق' : 'Instant activation',
    isAr ? 'دعم فني بالسعودية' : 'KSA support',
  ];

  return (
    <section dir={dir} data-variant={variant} className="w-full py-4 text-ink sm:py-6">
      <div className="rounded-3xl bg-dusty-blue/20 p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Content */}
          <div className="space-y-5 text-start lg:col-span-7 lg:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-ink">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-dusty-blue">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
              </span>
              <span>{isAr ? 'ابدأ رحلة التحول الرقمي لمنشأتك' : 'Elevate your salon today'}</span>
            </div>

            <h2 className="text-balance text-2xl font-extrabold leading-[1.35] text-ink sm:text-3xl lg:text-4xl">
              {isAr ? (
                <>
                  جاهز لتطوير صالونك بنطاق فرعي خاص{' '}
                  <span className="box-decoration-clone rounded-xl bg-white px-3 py-0.5">
                    و10 أنظمة ذكية متكاملة؟
                  </span>
                </>
              ) : (
                <>
                  Ready to transform your salon with a{' '}
                  <span className="box-decoration-clone rounded-xl bg-white px-3 py-0.5">
                    dedicated subdomain & 10 systems?
                  </span>
                </>
              )}
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-ink-muted lg:text-[15px]">
              {isAr
                ? 'منظومة RASHX تجمع إدارة المواعيد والكاشير والعمولات ودعم ZATCA المرحلة الثانية في مكان واحد، لتدير صالونك بهدوء.'
                : 'RASHX brings appointments, POS, commissions and ZATCA Phase 2 support together in one place, so you can run your salon with less stress.'}
            </p>

            <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:items-center">
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-warm-peach px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-warm-peach/80"
              >
                <span>{isAr ? 'احجز عرضاً تجريبياً' : 'Book a Free Demo'}</span>
                <ArrowIcon className="h-4 w-4" />
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-mist-gray"
              >
                <PhoneCall className="h-4 w-4" />
                <span>{isAr ? 'استشر فريقنا عبر واتساب' : 'Chat via WhatsApp'}</span>
              </a>
            </div>

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs font-medium text-ink-muted">
              {trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-ink" strokeWidth={2.5} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Subdomain preview */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white p-6 text-start sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink">
                  {isAr ? 'معاينة النطاق الفرعي' : 'Subdomain preview'}
                </span>
                <span className="rounded-lg bg-dusty-blue/30 px-2.5 py-1 text-[11px] font-bold text-ink">
                  {isAr ? 'جاهز للعمل' : 'Ready'}
                </span>
              </div>

              <div
                dir="ltr"
                className="mt-4 flex items-center justify-between rounded-2xl bg-neutral/40 px-4 py-3 font-mono text-xs text-ink"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Globe className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                  <span className="truncate">
                    <span className="font-bold">your-salon-name</span>
                    <span className="text-ink-muted">.rashx.org</span>
                  </span>
                </div>
                <span className="h-2 w-2 shrink-0 rounded-full bg-dusty-blue" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-dusty-blue/20 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-ink-muted">
                      {isAr ? 'تطبيق العملاء' : 'Client app'}
                    </span>
                    <Smartphone className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                  </div>
                  <div className="mt-1 text-xs font-bold text-ink">
                    {isAr ? 'حجز ذاتي مخصص' : 'Custom PWA'}
                  </div>
                </div>

                <div className="rounded-2xl bg-warm-peach/30 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-ink-muted">
                      {isAr ? 'الفوترة' : 'Invoicing'}
                    </span>
                    <ShieldCheck className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                  </div>
                  <div className="mt-1 text-xs font-bold text-ink">
                    {isAr ? 'ZATCA المرحلة 2' : 'ZATCA Phase 2'}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-neutral/40 px-4 py-3 text-xs">
                <div className="flex items-center gap-2 font-medium text-ink">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  <span>{isAr ? 'نظام المواعيد متصل' : 'Appointments synced'}</span>
                </div>
                <span className="font-mono font-bold text-ink">10/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;