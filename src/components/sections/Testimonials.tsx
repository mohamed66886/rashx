'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Quote, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX Testimonials slider.
 * - Native scroll-snap: swipe / drag / trackpad, plus arrows and dots.
 * - RTL aware (scroll direction, arrows and dots follow the locale).
 * - Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 *
 * TO ADD A REAL REVIEW: replace one object in `TESTIMONIALS` and delete its
 * `placeholder: true`. Cards marked as placeholders keep a dashed border and a
 * "[TODO]" avatar so they can never be mistaken for a real client review.
 * Only publish reviews you have written permission for.
 */

interface TestimonialsProps {
  locale?: Locale;
}

interface Testimonial {
  id: number;
  placeholder?: boolean;
  quoteAr: string;
  quoteEn: string;
  nameAr: string;
  nameEn: string;
  facilityAr: string;
  facilityEn: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    placeholder: true,
    quoteAr:
      '[TODO: سيتم إدراج تقييم حقيقي لمالك/مدير صالون نسائي في الرياض بعد انتهاء مرحلة الإطلاق التجريبي]',
    quoteEn:
      '[TODO: Verified testimonial from a Riyadh salon manager will be inserted here post-launch]',
    nameAr: '[TODO: اسم مالك المنشأة]',
    nameEn: '[TODO: Client Name]',
    facilityAr: '[TODO: اسم الصالون / المشغل - الرياض]',
    facilityEn: '[TODO: Salon Name - Riyadh]',
  },
  {
    id: 2,
    placeholder: true,
    quoteAr:
      '[TODO: سيتم إدراج تقييم حقيقي لمدير مركز سبا واستجمام في جدة بعد انتهاء مرحلة الإطلاق التجريبي]',
    quoteEn:
      '[TODO: Verified testimonial from a Jeddah spa manager will be inserted here post-launch]',
    nameAr: '[TODO: اسم مدير المركز]',
    nameEn: '[TODO: Center Director]',
    facilityAr: '[TODO: مركز سبا واستجمام - جدة]',
    facilityEn: '[TODO: Spa Center - Jeddah]',
  },
  {
    id: 3,
    placeholder: true,
    quoteAr:
      '[TODO: سيتم إدراج تقييم حقيقي لسلسلة صالونات حلاقة في الشرقية بعد انتهاء مرحلة الإطلاق التجريبي]',
    quoteEn:
      '[TODO: Verified testimonial from an Eastern Province barbershop chain will be inserted here]',
    nameAr: '[TODO: اسم المستثمر / المالك]',
    nameEn: '[TODO: Franchise Owner]',
    facilityAr: '[TODO: سلسلة صالونات حلاقة - الدمام]',
    facilityEn: '[TODO: Barbershop Chain - Dammam]',
  },
];

const CARD_TONES = ['bg-dusty-blue/30', 'bg-warm-peach/40', 'bg-mist-gray/70'] as const;
const GAP_PX = 20;

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('');

export const Testimonials: React.FC<TestimonialsProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const PrevIcon = isAr ? ArrowRight : ArrowLeft;
  const NextIcon = isAr ? ArrowLeft : ArrowRight;

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* Sync arrows + dots with the real scroll position (works in LTR and RTL) */
  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setAtStart(pos < 4);
    setAtEnd(pos >= max - 4);

    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + GAP_PX : el.clientWidth;
    const idx = pos >= max - 4 ? TESTIMONIALS.length - 1 : Math.round(pos / step);
    setActive(Math.min(Math.max(idx, 0), TESTIMONIALS.length - 1));
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
  }, [update]);

  const goTo = (index: number) => {
    const el = trackRef.current;
    const card = el?.querySelectorAll<HTMLElement>('[data-card]')[index];
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const step = (dir: 1 | -1) => goTo(Math.min(Math.max(active + dir, 0), TESTIMONIALS.length - 1));

  const arrowBtn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-mist-gray bg-white text-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-40';

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className="overflow-hidden bg-neutral/40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + arrows */}
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink">
              <Sparkles className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
              <span>{isAr ? 'تجارب المنشآت الشريكة' : 'Partner Facilities'}</span>
            </div>

            <h2 className="text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl">
              {isAr ? 'آراء وتجارب شركاء النجاح' : 'Feedback from our partners'}
            </h2>

            <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
              {isAr
                ? 'نوثّق تجارب عملائنا الحقيقية بشفافية ومصداقية، وسنعرضها هنا بعد انتهاء مرحلة الإطلاق التجريبي.'
                : 'We feature only verified client reviews, and they will appear here once the pilot launch ends.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label={isAr ? 'السابق' : 'Previous'}
              className={arrowBtn}
            >
              <PrevIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
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
          aria-label={isAr ? 'آراء العملاء' : 'Client reviews'}
        >
          <div
            ref={trackRef}
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((item, index) => {
              const name = isAr ? item.nameAr : item.nameEn;
              return (
                <figure
                  key={item.id}
                  data-card
                  className={`flex shrink-0 basis-[88%] snap-start flex-col justify-between gap-6 rounded-3xl bg-white p-6 sm:basis-[calc(50%-10px)] sm:p-8 lg:basis-[calc(33.333%-14px)] ${
                    item.placeholder ? 'border border-dashed border-ink/25' : 'border border-mist-gray'
                  }`}
                >
                  <div className="space-y-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-ink ${
                        CARD_TONES[index % CARD_TONES.length]
                      }`}
                    >
                      <Quote className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <blockquote
                      className={`text-xs font-normal leading-relaxed sm:text-sm md:text-base ${
                        item.placeholder ? 'italic text-ink-muted' : 'text-ink'
                      }`}
                    >
                      {isAr ? item.quoteAr : item.quoteEn}
                    </blockquote>
                  </div>

                  <figcaption className="flex items-center gap-3 border-t border-mist-gray pt-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist-gray text-xs font-semibold text-ink">
                      {item.placeholder ? '[TODO]' : initials(name)}
                    </span>
                    <span className="text-sm">
                      <span className="block text-xs font-semibold text-ink sm:text-sm">{name}</span>
                      <span className="block text-[11px] font-normal text-ink-muted sm:text-xs">
                        {isAr ? item.facilityAr : item.facilityEn}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={isAr ? `الرأي ${i + 1}` : `Review ${i + 1}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-ink' : 'w-2 bg-ink/25 hover:bg-ink/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;