'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { SarIcon } from './SarIcon';

export interface StatCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  value: React.ReactNode;
  isCurrency?: boolean;
  trend?: number | string;
  trendDirection?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  description?: React.ReactNode;
  accent?: 'primary' | 'secondary' | 'none';
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      isCurrency = false,
      trend,
      trendDirection = 'up',
      trendLabel = 'مقارنة بالشهر السابق',
      icon,
      badge,
      description,
      accent = 'none',
      className = '',
      ...props
    },
    ref
  ) => {
    const accentBorder =
      accent === 'primary'
        ? 'border-t-2 border-t-[#91B8C0]'
        : accent === 'secondary'
        ? 'border-t-2 border-t-[#F0C5AE]'
        : '';

    return (
      <div
        ref={ref}
        className={`rounded-xl border border-[#E5E9E8]/70 bg-white p-5 shadow-none hover:border-[#91B8C0]/50 hover:shadow-xs transition-all ${accentBorder} ${className}`}
        {...props}
      >
        {/* Top Header: Title & Icon/Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-semibold text-[#5E6665]">{title}</span>

          <div className="flex items-center gap-2">
            {badge}
            {icon && (
              <div className="w-10 h-10 rounded-2xl bg-[#E5E9E8]/60 text-black flex items-center justify-center">
                {icon}
              </div>
            )}
          </div>
        </div>

        {/* Main Value */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl sm:text-3xl font-semibold text-black tracking-tight font-mono">
            {value}
          </span>
          {isCurrency && (
            <SarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" />
          )}
        </div>

        {/* Trend & Description Footer */}
        {(trend !== undefined || description) && (
          <div className="flex items-center gap-2 text-xs pt-3 border-t border-[#E5E9E8]/70">
            {trend !== undefined && (
              <span
                className={`inline-flex items-center gap-0.5 font-medium px-2 py-0.5 rounded-full text-[11px] ${
                  trendDirection === 'up'
                    ? 'bg-emerald-100 text-emerald-800'
                    : trendDirection === 'down'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-[#E5E9E8] text-black'
                }`}
              >
                {trendDirection === 'up' && (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                )}
                {trendDirection === 'down' && (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {trendDirection === 'neutral' && (
                  <Minus className="w-3 h-3" />
                )}
                <span>{trend}</span>
              </span>
            )}

            {trendLabel && (
              <span className="text-[11px] text-[#5E6665] truncate">
                {trendLabel}
              </span>
            )}

            {description && (
              <span className="text-[11px] text-[#5E6665] ms-auto">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
StatCard.displayName = 'StatCard';

export default StatCard;
