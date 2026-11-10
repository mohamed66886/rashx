'use client';

import React from 'react';
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
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const displayItems = limit ? items.slice(0, limit) : items;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dusty-blue/15 text-ink text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'منظومة تشغيل متكاملة' : 'Complete Operating System'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            {isAr ? titleAr : titleEn}
          </h2>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            {isAr ? subtitleAr : subtitleEn}
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((system) => {
            const Icon = iconMap[system.iconName] || Sparkles;

            return (
              <div
                key={system.id}
                className="group relative rounded-3xl p-6 sm:p-7 bg-[#FAFBFB] border border-mist-gray hover:border-dusty-blue/60 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon & Order Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-mist-gray flex items-center justify-center text-ink group-hover:bg-dusty-blue group-hover:text-black transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-ink-muted/60">
                      0{system.order}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-bold text-ink group-hover:text-dusty-blue transition-colors">
                      {isAr ? system.nameAr : system.nameEn}
                    </h3>
                    <p className="text-xs font-medium text-dusty-blue mt-1">
                      {isAr ? system.taglineAr : system.taglineEn}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                    {isAr ? system.descriptionAr : system.descriptionEn}
                  </p>

                  {/* Top Bullet Points */}
                  <ul className="space-y-1.5 pt-2 border-t border-mist-gray/60">
                    {(isAr ? system.keyBenefitsAr : system.keyBenefitsEn)
                      .slice(0, 2)
                      .map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-ink/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-dusty-blue mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{bullet}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Card Footer Link */}
                <div className="pt-6 mt-4 border-t border-mist-gray/40">
                  <Link
                    href={`/${locale}/solutions/${system.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ink group-hover:text-dusty-blue transition-colors"
                  >
                    <span>{isAr ? 'استكشف تفاصيل النظام' : 'Explore System Details'}</span>
                    <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

