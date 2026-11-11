'use client';

import React from 'react';
import { Check, X, Sparkles, HelpCircle } from 'lucide-react';
import { PRICING_CONFIG, MatrixRow } from '@/config/pricing';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface DetailedPricingMatrixProps {
  locale?: Locale;
}

export const DetailedPricingMatrix: React.FC<DetailedPricingMatrixProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';

  // Group matrix rows by category
  const categories = Array.from(
    new Set(PRICING_CONFIG.comparisonMatrix.map((r) => (isAr ? r.categoryAr : r.categoryEn)))
  );

  const renderValue = (val: boolean | string) => {
    if (val === true) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
          <Check className="w-4 h-4 font-bold" />
        </span>
      );
    }
    if (val === false) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-mist-gray text-ink-muted/50">
          <X className="w-3.5 h-3.5" />
        </span>
      );
    }
    return (
      <span className="inline-block px-2.5 py-1 rounded-lg bg-mist-gray/40 text-[11px] font-semibold text-ink">
        {val}
      </span>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-mist-gray" id="detailed-matrix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'مقارنة دقيقة وشاملة' : 'Detailed Plan Breakdown'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-tight leading-tight">
            {isAr
              ? 'جدول مقارنة المميزات والخصائص بالتفصيل'
              : 'Comprehensive Features Comparison Matrix'}
          </h2>

          <p className="text-xs sm:text-sm font-normal text-ink-muted leading-relaxed">
            {isAr
              ? 'استعرض كافة الفوارق بين الباقات (الأساسية، الاحترافية، والمؤسسات) لاختيار الباقة التي تغطي متطلبات صالونك بدقة.'
              : 'Review detailed feature availability across all tiers (Basic, Professional, and Enterprise).'}
          </p>
        </div>

        {/* The Matrix Table */}
        <div className="overflow-x-auto rounded-3xl border border-mist-gray shadow-md bg-white">
          <table className="w-full text-start text-xs sm:text-sm">
            {/* Sticky Table Header */}
            <thead>
              <tr className="border-b border-mist-gray bg-[#FAFBFB]">
                <th className="py-5 px-6 text-start font-semibold text-ink w-[40%]">
                  {isAr ? 'الخاصية / النظام' : 'Feature / System'}
                </th>
                <th className="py-5 px-4 text-center font-semibold text-ink w-[20%]">
                  <div>{isAr ? 'الباقة الأساسية' : 'Basic Plan'}</div>
                  <div className="text-[10px] text-ink-muted font-normal">
                    {isAr ? 'فرع واحد • 5 موظفين' : '1 branch • 5 staff'}
                  </div>
                </th>
                <th className="py-5 px-4 text-center font-bold text-black w-[20%] bg-dusty-blue/20 border-x border-mist-gray/70">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-dusty-blue" />
                    <span>{isAr ? 'الباقة الاحترافية' : 'Professional'}</span>
                  </div>
                  <div className="text-[10px] text-ink font-semibold">
                    {isAr ? 'الأكثر اختيارًا في السعودية' : 'Most Popular in KSA'}
                  </div>
                </th>
                <th className="py-5 px-4 text-center font-bold text-ink w-[20%]">
                  <div>{isAr ? 'باقة المؤسسات' : 'Enterprise'}</div>
                  <div className="text-[10px] text-ink-muted font-normal">
                    {isAr ? 'سلاسل ومراكز كبرى' : 'Chains & Franchises'}
                  </div>
                </th>
              </tr>
            </thead>

            {/* Matrix Body Grouped by Category */}
            <tbody className="divide-y divide-mist-gray/60">
              {categories.map((cat, catIdx) => {
                const rowsInCategory = PRICING_CONFIG.comparisonMatrix.filter(
                  (r) => (isAr ? r.categoryAr : r.categoryEn) === cat
                );

                return (
                  <React.Fragment key={catIdx}>
                    {/* Category Title Row */}
                    <tr className="bg-mist-gray/40">
                      <td
                        colSpan={4}
                        className="py-3 px-6 text-xs font-semibold text-ink uppercase tracking-wider"
                      >
                        {cat}
                      </td>
                    </tr>

                    {/* Features in this Category */}
                    {rowsInCategory.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-mist-gray/15 transition-colors">
                        <td className="py-3.5 px-6 text-ink font-medium">
                          <div className="flex items-center gap-2">
                            <span>{isAr ? row.featureNameAr : row.featureNameEn}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(row.starter)}
                        </td>
                        <td className="py-3.5 px-4 text-center bg-dusty-blue/10 border-x border-mist-gray/60">
                          {renderValue(row.growth)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(row.enterprise)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DetailedPricingMatrix;

