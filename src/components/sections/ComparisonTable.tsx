'use client';

import React from 'react';
import { Check, X, Minus, Sparkles } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface ComparisonTableProps {
  locale?: Locale;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';

  const rows = [
    {
      featureAr: 'نطاق فرعي مستقل وهوية رقمية خاصة لكل منشأة',
      featureEn: 'Independent Subdomain & Branded Digital Identity',
      rashx: true,
      legacy: false,
      manual: false,
    },
    {
      featureAr: 'موقع المنشأة وتطبيق العميل (PWA) للحجز الذاتي 24/7',
      featureEn: 'Facility Website & Client PWA for 24/7 Booking',
      rashx: true,
      legacy: 'جزئي',
      manual: false,
    },
    {
      featureAr: 'الأنظمة العشرة كاملة في منصة سحابية واحدة مترابطة',
      featureEn: 'All 10 Systems in One Unified Cloud Architecture',
      rashx: true,
      legacy: false,
      manual: false,
    },
    {
      featureAr: 'دعم متطلبات الفوترة الإلكترونية (ZATCA 2)',
      featureEn: 'ZATCA Phase 2 E-Invoicing Support',
      rashx: true,
      legacy: 'إضافي',
      manual: false,
    },
    {
      featureAr: 'حساب تلقائي لعمولات مصففي الشعر والخبراء فورياً',
      featureEn: 'Automated Real-Time Stylist Commissions Calculation',
      rashx: true,
      legacy: false,
      manual: false,
    },
    {
      featureAr: 'ربط استهلاك مواد الصبغة والعناية بالمخزون آلياً',
      featureEn: 'Automated Backbar Cosmetics Consumption Linkage',
      rashx: true,
      legacy: false,
      manual: false,
    },
    {
      featureAr: 'تذكير ذكي بالمواعيد عبر الواتساب لتقليل الغياب',
      featureEn: 'Automated Interactive WhatsApp Reminders',
      rashx: true,
      legacy: 'تكلفة إضافية',
      manual: false,
    },
    {
      featureAr: 'عزل منطقي تام وحماية البيانات وفق نظام PDPL السعودي',
      featureEn: 'Strict Logical Isolation & Saudi PDPL Compliance',
      rashx: true,
      legacy: 'غير واضح',
      manual: false,
    },
  ];

  const renderCell = (val: boolean | string) => {
    if (val === true) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
          <Check className="w-4 h-4" />
        </span>
      );
    }
    if (val === false) {
      return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 text-rose-500">
          <X className="w-4 h-4" />
        </span>
      );
    }
    return <span className="text-xs text-ink-muted font-medium">{val}</span>;
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFB] border-t border-mist-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight leading-tight">
            {isAr
              ? 'لماذا يختار أصحاب الصالونات والمشاغل راش إكس؟'
              : 'Why Salons & Studios Choose RashX'}
          </h2>
          <p className="text-xs sm:text-sm font-normal leading-relaxed text-ink-muted">
            {isAr
              ? 'مقارنة شفافة بين راش إكس والحلول البرمجية التقليدية والدفاتر اليدوية.'
              : 'A transparent comparison between RashX, legacy desktop software, and manual registers.'}
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-mist-gray bg-white shadow-sm">
          <table className="w-full text-start text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-mist-gray bg-mist-gray/30">
                <th className="py-4 px-6 text-start font-semibold text-ink w-1/2">
                  {isAr ? 'المعيار / الميزة' : 'Criterion / Feature'}
                </th>
                <th className="py-4 px-4 text-center font-semibold text-black bg-dusty-blue/20">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
                    <span>راش إكس (RashX)</span>
                  </div>
                </th>
                <th className="py-4 px-4 text-center font-medium text-ink-muted">
                  {isAr ? 'البرامج القديمة المنفصلة' : 'Legacy Software'}
                </th>
                <th className="py-4 px-4 text-center font-medium text-ink-muted">
                  {isAr ? 'الدفاتر والملفات اليدوية' : 'Manual / Excel'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-gray/60">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-mist-gray/20 transition-colors">
                  <td className="py-4 px-6 text-ink font-medium">
                    {isAr ? row.featureAr : row.featureEn}
                  </td>
                  <td className="py-4 px-4 text-center bg-dusty-blue/10">
                    {renderCell(row.rashx)}
                  </td>
                  <td className="py-4 px-4 text-center">{renderCell(row.legacy)}</td>
                  <td className="py-4 px-4 text-center">{renderCell(row.manual)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;

