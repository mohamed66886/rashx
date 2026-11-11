'use client';

import React from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Users,
  UserCheck,
  CalendarCheck,
  CreditCard,
  ShoppingBag,
  Boxes,
  Gift,
  BellRing,
  LineChart,
} from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * One system on the features page — simplified.
 * The ten hand-built mockups are replaced by one calm brand panel per system
 * (icon, order number, tagline). Brand colors only; panels alternate blue/peach.
 * Props and exports are unchanged.
 */

export interface SystemDetailProps {
  id: string;
  anchorId: string;
  order: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  descAr: string;
  descEn: string;
  bulletsAr: string[];
  bulletsEn: string[];
  slug: string;
  reverse?: boolean;
}

interface SystemSplitCardProps {
  system: SystemDetailProps;
  locale?: Locale;
}

const ICONS: Record<string, LucideIcon> = {
  hr: Users,
  crm: UserCheck,
  bookings: CalendarCheck,
  services: Sparkles,
  sales: CreditCard,
  purchasing: ShoppingBag,
  inventory: Boxes,
  loyalty: Gift,
  notifications: BellRing,
  reports: LineChart,
};

const TONES = [
  { panel: 'bg-dusty-blue/25', check: 'bg-dusty-blue/40' },
  { panel: 'bg-warm-peach/35', check: 'bg-warm-peach/50' },
] as const;

export const SystemSplitCard: React.FC<SystemSplitCardProps> = ({
  system,
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const Icon = ICONS[system.id] ?? Sparkles;
  const tone = TONES[((Number(system.order) || 1) - 1) % 2];

  return (
    <div
      id={system.anchorId}
      className="scroll-mt-28 border-b border-mist-gray/70 py-12 last:border-b-0 sm:py-16"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
        {/* Text */}
        <div className={`space-y-5 lg:col-span-7 ${system.reverse ? 'lg:order-2' : ''}`}>
          <h3 className="text-xl font-extrabold leading-tight text-ink sm:text-2xl md:text-3xl">
            {isAr ? system.nameAr : system.nameEn}
          </h3>

          <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
            {isAr ? system.descAr : system.descEn}
          </p>

          <ul className="space-y-2.5 pt-1">
            {(isAr ? system.bulletsAr : system.bulletsEn).map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${tone.check}`}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3">
            <Link
              href={`/${locale}/solutions/${system.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-warm-peach px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-warm-peach/80"
            >
              <span>{isAr ? 'اعرف أكثر عن هذا النظام' : 'Learn more about this system'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Brand panel */}
        <div
          aria-hidden="true"
          className={`flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-3xl p-8 text-center lg:col-span-5 ${tone.panel} ${
            system.reverse ? 'lg:order-1' : ''
          }`}
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-ink">
            <Icon className="h-9 w-9" strokeWidth={1.7} />
          </span>
          <span className="font-mono text-6xl font-extrabold leading-none text-ink/15">{system.order}</span>
          <span className="max-w-[18rem] text-sm font-bold leading-snug text-ink">
            {isAr ? system.taglineAr : system.taglineEn}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemSplitCard;