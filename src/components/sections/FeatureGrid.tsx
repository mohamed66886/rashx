'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  UserCheck,
  CalendarCheck,
  Sparkles,
  CreditCard,
  ShoppingBag,
  Boxes,
  Gift,
  BellRing,
  LineChart,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { SYSTEMS_DATA, SystemDetail } from '@/config/systems';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX Systems Slider.
 * - Native scroll-snap (swipe on touch, trackpad, drag) + arrow buttons.
 * - RTL aware (arrows, scroll direction and progress bar flip with the locale).
 * - Autoplay that pauses on hover/focus, stops for good once the user
 *   interacts, and is off when the OS asks for reduced motion.
 * - Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 */

interface FeatureGridProps {
  locale?: Locale;
  titleAr?: string;
  titleEn?: string;
  subtitleAr?: string;
  subtitleEn?: string;
  items?: SystemDetail[];
  limit?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  UserCheck,
  CalendarCheck,
  Sparkles,
  CreditCard,
  ShoppingBag,
  Boxes,
  Gift,
  BellRing,
  LineChart,
};

// Card header tints cycle through the brand palette
const CARD_TONES = ['bg-dusty-blue/30', 'bg-warm-peach/40', 'bg-mist-gray/70'] as const;

const GAP_PX = 20;
const AUTOPLAY_MS = 4500;

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  locale = DEFAULT_LOCALE,
  titleAr = 'الأنظمة العشرة المتكاملة في منصة راش إكس',
  titleEn = 'The 10 Integrated Systems in RashX Platform',
  subtitleAr = 'كل ما يحتاجه صالونك أو مشغلك أو مركزك التجميلي تحت مظلة سحابية واحدة مترابطة بدون برامج متفرقة.',
  subtitleEn = 'Everything your salon, studio, or spa requires under one unified cloud ecosystem.',
  items = SYSTEMS_DATA,
  limit,
}) => {
  const isAr = locale === 'ar';
  const PrevIcon = isAr ? ArrowRight : ArrowLeft;
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  const displayItems = limit ? items.slice(0, limit) : items;

  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [thumb, setThumb] = useState(1); // visible share of the track (0-1)
  const [progress, setProgress] = useState(0); // scroll position (0-1)
  const [hovering, setHovering] = useState(false);
  const [stopped, setStopped] = useState(false); // user took control

  /* Keep arrows + progress bar in sync with the real scroll position.
     Math.abs() makes this work in both LTR and RTL. */
  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setAtStart(pos < 4);
    setAtEnd(pos >= max - 4);
    setProgress(max > 0 ? Math.min(pos / max, 1) : 0);
    setThumb(el.scrollWidth > 0 ? Math.min(el.clientWidth / el.scrollWidth, 1) : 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, displayItems.length]);

  /* Move by exactly one card. dir: 1 = forward, -1 = back (flipped for RTL). */
  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>('[data-card]');
      const step = card ? card.offsetWidth + GAP_PX : el.clientWidth * 0.8;
      el.scrollBy({ left: dir * (isAr ? -1 : 1) * step, behavior: 'smooth' });
    },
    [isAr],
  );

  const handleArrow = (dir: 1 | -1) => {
    setStopped(true);
    scrollByCard(dir);
  };

  /* Autoplay */
  useEffect(() => {
    if (stopped || hovering) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (Math.abs(el.scrollLeft) >= max - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByCard(1);
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [stopped, hovering, scrollByCard]);

  const arrowBtn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-mist-gray bg-white text-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-40';

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className="overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + arrows */}
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-mist-gray/60 px-3 py-1 text-xs font-medium text-ink">
              <Sparkles className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
              <span>{isAr ? 'منظومة تشغيل متكاملة' : 'Complete Operating System'}</span>
            </div>
            <h2 className="text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl">
              {isAr ? titleAr : titleEn}
            </h2>
            <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
              {isAr ? subtitleAr : subtitleEn}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleArrow(-1)}
              disabled={atStart}
              aria-label={isAr ? 'السابق' : 'Previous'}
              className={arrowBtn}
            >
              <PrevIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleArrow(1)}
              disabled={atEnd}
              aria-label={isAr ? 'التالي' : 'Next'}
              className={arrowBtn}
            >
              <NextIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={isAr ? 'أنظمة راش إكس' : 'RashX systems'}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          <div
            ref={trackRef}
            onPointerDown={() => setStopped(true)}
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {displayItems.map((system, index) => {
              const Icon = iconMap[system.iconName] || Sparkles;

              return (
                <Link
                  key={system.id}
                  data-card
                  href={`/${locale}/solutions/${system.slug}`}
                  draggable={false}
                  className="group flex shrink-0 basis-[85%] snap-start flex-col overflow-hidden rounded-3xl border border-mist-gray bg-white transition-colors hover:border-ink sm:basis-[calc(50%-10px)] lg:basis-[calc(33.333%-14px)]"
                >
                  <div className={`flex items-center justify-between p-5 ${CARD_TONES[index % CARD_TONES.length]}`}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-ink">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-3xl font-semibold text-ink/20">
                      {String(system.order).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="space-y-1.5">
                      <h3 className="text-base font-semibold text-ink sm:text-lg">
                        {isAr ? system.nameAr : system.nameEn}
                      </h3>
                      <p className="text-xs font-medium text-ink-muted sm:text-sm">
                        {isAr ? system.taglineAr : system.taglineEn}
                      </p>
                    </div>

                    <p className="line-clamp-3 text-xs font-normal leading-relaxed text-ink-muted sm:text-sm">
                      {isAr ? system.descriptionAr : system.descriptionEn}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-ink sm:text-sm">
                      <span>{isAr ? 'استكشف النظام' : 'Explore system'}</span>
                      <NextIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Progress bar: thumb size = visible share, position = scroll */}
          <div className="relative mt-6 h-1 w-full overflow-hidden rounded-full bg-mist-gray" aria-hidden="true">
            <div
              className="absolute top-0 h-full rounded-full bg-ink transition-[inset-inline-start] duration-150"
              style={{
                width: `${thumb * 100}%`,
                insetInlineStart: `${progress * (1 - thumb) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;