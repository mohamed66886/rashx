'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Rocket,
  Cpu,
  Handshake,
  Calendar,
  CheckCircle2,
  Tag,
  ArrowRight,
  ArrowLeft,
  Filter,
  Check,
} from 'lucide-react';
import { ChangelogItem, ChangelogCategory } from '@/data/changelog';
import { Locale } from '@/i18n/config';

interface ChangelogTimelineClientProps {
  items: ChangelogItem[];
  locale: Locale;
}

export function ChangelogTimelineClient({
  items,
  locale,
}: ChangelogTimelineClientProps) {
  const isAr = locale === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { key: string; label: string; icon: React.ElementType }[] = [
    { key: 'all', label: isAr ? 'جميع التحديثات' : 'All Updates', icon: Sparkles },
    { key: 'launch', label: isAr ? 'إطلاق' : 'Launches', icon: Rocket },
    { key: 'product_update', label: isAr ? 'تحديث منتج' : 'Product Updates', icon: Cpu },
    { key: 'partnership', label: isAr ? 'شراكة' : 'Partnerships', icon: Handshake },
  ];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const getCategoryBadgeClass = (category: ChangelogCategory) => {
    switch (category) {
      case 'launch':
        return 'bg-dusty-blue/20 text-dusty-blue border-dusty-blue/40';
      case 'product_update':
        return 'bg-ink text-white border-ink';
      case 'partnership':
        return 'bg-[#10B981]/15 text-[#047857] border-[#10B981]/30';
      default:
        return 'bg-mist-gray text-ink border-mist-gray';
    }
  };

  const getCategoryIcon = (category: ChangelogCategory) => {
    switch (category) {
      case 'launch':
        return Rocket;
      case 'product_update':
        return Cpu;
      case 'partnership':
        return Handshake;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.key;
          const count =
            cat.key === 'all'
              ? items.length
              : items.filter((i) => i.category === cat.key).length;

          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                isSelected
                  ? 'bg-ink text-white shadow-xs'
                  : 'bg-white border border-mist-gray text-ink hover:bg-mist-gray/60'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isSelected ? 'text-dusty-blue' : 'text-ink-muted'
                }`}
              />
              <span>{cat.label}</span>
              <span className="ms-0.5 opacity-70 font-mono text-[11px]">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline Stream */}
      <div className="relative">
        {/* Continuous Timeline Vertical Line */}
        <div className="absolute top-4 bottom-4 start-4 sm:start-7 w-0.5 bg-mist-gray -translate-x-1/2 rtl:translate-x-1/2" />

        <div className="space-y-8 relative">
          {filteredItems.map((item, idx) => {
            const CategoryIcon = getCategoryIcon(item.category);
            const isInitial = item.isInitialLaunch;

            return (
              <div
                key={item.id}
                id={item.id}
                className="relative flex items-start gap-4 sm:gap-8 group scroll-mt-24"
              >
                {/* Timeline Dot Indicator */}
                <div
                  className={`w-8 h-8 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-105 shadow-xs ${
                    isInitial
                      ? 'bg-ink text-dusty-blue ring-4 ring-dusty-blue/30'
                      : item.category === 'launch'
                      ? 'bg-dusty-blue text-black'
                      : item.category === 'partnership'
                      ? 'bg-[#10B981] text-white'
                      : 'bg-white border-2 border-mist-gray text-ink'
                  }`}
                >
                  <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Timeline Content Card */}
                <div
                  className={`grow rounded-3xl p-6 sm:p-8 transition-all space-y-4 border ${
                    isInitial
                      ? 'bg-linear-to-b from-white to-mist-gray/30 border-dusty-blue/50 shadow-md ring-1 ring-dusty-blue/20'
                      : 'bg-white border-mist-gray hover:border-dusty-blue/40 hover:shadow-xs'
                  }`}
                >
                  {/* Card Header: Category + Date + Version */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Category Badge */}
                      <span
                        className={`px-3 py-1 rounded-full font-bold border text-[11px] inline-flex items-center gap-1.5 ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        <CategoryIcon className="w-3 h-3" />
                        <span>{isAr ? item.categoryAr : item.categoryEn}</span>
                      </span>

                      {/* Badge / Version */}
                      {(item.badgeAr || item.version) && (
                        <span className="px-2.5 py-0.5 rounded-full bg-mist-gray text-ink font-mono text-[11px] font-semibold">
                          {isAr ? item.badgeAr : item.badgeEn || item.version}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-ink-muted font-mono text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-dusty-blue" />
                      <span>{isAr ? item.dateDisplayAr : item.dateDisplayEn}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-black text-ink tracking-tight leading-snug ${
                      isInitial ? 'text-xl sm:text-2xl text-ink' : 'text-lg sm:text-xl'
                    }`}
                  >
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr ? item.descriptionAr : item.descriptionEn}
                  </p>

                  {/* Highlights Bullet List */}
                  {item.highlightsAr.length > 0 && (
                    <div className="pt-2 border-t border-mist-gray/60 space-y-2">
                      <div className="text-[11px] font-bold text-ink uppercase tracking-wider">
                        {isAr ? 'أبرز المزايا والمخرجات:' : 'Key Highlights & Deliverables:'}
                      </div>

                      <ul className="space-y-1.5 text-xs text-ink-muted">
                        {(isAr ? item.highlightsAr : item.highlightsEn).map(
                          (highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{highlight}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

