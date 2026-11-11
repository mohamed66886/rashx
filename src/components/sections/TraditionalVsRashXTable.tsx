'use client';

import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * Traditional vs RashX — simplified.
 * Brand colors only. Desktop: 3-column table. Mobile: each row becomes a
 * small card (no sideways scrolling).
 */

interface TraditionalVsRashXTableProps {
  locale?: Locale;
}

const GRID = 'md:grid-cols-[1fr_1.5fr_1.5fr]';

export const TraditionalVsRashXTable: React.FC<TraditionalVsRashXTableProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';

  const rows = [
    {
      criterionAr: 'حجز المواعيد والجدولة',
      criterionEn: 'Appointment Booking',
      traditionalAr: 'دفتر ورقي أو دردشات واتساب مشتتة تسبب تضارب المواعيد وتأخر العميلات والازدحام.',
      traditionalEn: 'Paper notebooks or messy WhatsApp chats causing double-bookings and salon lobby congestion.',
      rashxAr: 'حجز ذاتي ذكي 24/7 عبر موقع المنشأة وتطبيق العميل، مع منع التضارب وتحديد أوقات التعقيم آليًا.',
      rashxEn: 'Smart 24/7 self-service scheduling via salon website & PWA, with zero collisions and auto-buffer times.',
    },
    {
      criterionAr: 'سجل العميلات وتفضيلات التجميل',
      criterionEn: 'Client Records & Beauty Preferences',
      traditionalAr: 'اعتماد كلي على ذاكرة الموظفة، مما يفقد الصالون أرقام صبغات الشعر ونوع البشرة عند غياب الأخصائية.',
      traditionalEn: 'Relying entirely on staff memory, losing custom hair dye formulas when a stylist leaves.',
      rashxAr: 'ملف CRM رقمي متكامل لكل عميلة يحفظ تاريخ الزيارات، أرقام درجات الصبغات، والحساسيات بدقة.',
      rashxEn: '360° digital client profile preserving past visit histories, dye formulas, and allergy notes.',
    },
    {
      criterionAr: 'حساب عمولات مصففي الشعر والخبراء',
      criterionEn: 'Stylist Commission Calculations',
      traditionalAr: 'حسابات يدوية معقدة في نهاية كل يوم أو شهر على أوراق وإكسل تسبب أخطاء وخلافات مع الفريق.',
      traditionalEn: 'Tedious late-night paper calculations and Excel formulas prone to disputes and errors.',
      rashxAr: 'احتساب آلي دقيق لعمولة كل موظف فور إغلاق الفاتورة، مع شاشة مخصصة لكل أخصائي لمتابعة إنجازه.',
      rashxEn: 'Instant automated commission calculation upon invoice checkout, with private staff performance views.',
    },
    {
      criterionAr: 'المخزون ومراقبة هدر المواد (Backbar)',
      criterionEn: 'Backbar Consumption & Stock Control',
      traditionalAr: 'هدر غير مرئي لصبغات الشعر وزيوت المساج دون معرفة التكلفة الحقيقية لكل خدمة تجميلية.',
      traditionalEn: 'Unmonitored dye and treatment material wastage with unknown per-service gross margins.',
      rashxAr: 'خصم تلقائي لكميات المواد المستهلكة من المستودع مع كل خدمة، وتنبيهات فورية قبل نفاد النواقص.',
      rashxEn: 'Automated stock deduction per completed service, and instant low-stock reorder threshold alerts.',
    },
    {
      criterionAr: 'الفوترة الإلكترونية والامتثال لـ ZATCA',
      criterionEn: 'E-Invoicing & ZATCA Compliance',
      traditionalAr: 'أجهزة كاشير منفصلة أو برامج غير متصلة تزيد مخاطر الأخطاء في الإقرارات الضريبية وغراماتها.',
      traditionalEn: 'Disconnected legacy registers risking costly VAT declaration inaccuracies and non-compliance.',
      rashxAr: 'تدعم متطلبات الفوترة الإلكترونية (المرحلة الثانية) وفق حالة المنشأة بإصدار فوري لرمز QR وتقارير جاهزة.',
      rashxEn: 'Supports ZATCA Phase 2 E-Invoicing criteria per facility status with compliant QR and instant reports.',
    },
    {
      criterionAr: 'برامج الولاء والاحتفاظ بالعميلات',
      criterionEn: 'Loyalty Programs & Retention',
      traditionalAr: 'بطاقات ورقية تضيع أو تتلف، وصعوبة قياس فعالية العروض وباقات الاشتراكات.',
      traditionalEn: 'Paper loyalty punch cards that get lost, with zero visibility into client return rates.',
      rashxAr: 'نقاط استرداد نقدي رقمية، بطاقات هدايا تشاركها العميلة بالواتساب، وباقات اشتراكات دورية مسبقة الدفع.',
      rashxEn: 'Digital cashback points, WhatsApp gift cards, and prepaid recurring beauty membership passes.',
    },
    {
      criterionAr: 'التذكير بالمواعيد وتقليل الغياب',
      criterionEn: 'Reminders & No-Show Prevention',
      traditionalAr: 'اتصالات يدوية مرهقة تستهلك وقت موظفة الاستقبال وغالبًا لا يتم الرد عليها.',
      traditionalEn: 'Exhausting manual calls that tie up reception staff and often go unanswered.',
      rashxAr: 'رسائل واتساب تفاعلية آلية ترسل قبل الموعد بـ 24 ساعة و3 ساعات مع أزرار تأكيد الحضور الفوري.',
      rashxEn: 'Automated interactive WhatsApp reminders sent 24h & 3h prior with one-tap confirmation buttons.',
    },
    {
      criterionAr: 'الوصول وإدارة الصالون عن بُعد',
      criterionEn: 'Remote Access & Mobility',
      traditionalAr: 'ضرورة تواجد المالك في الصالون لمتابعة الكاشير والمبيعات اليومية من الجهاز المكتبي.',
      traditionalEn: 'Requiring the owner’s physical presence in the salon to view daily drawer totals on desktop.',
      rashxAr: 'منظومة سحابية بنطاق فرعي خاص تمكنك من متابعة فروعك ومبيعاتك لحظة بلحظة من أي هاتف أو لابتوب.',
      rashxEn: 'Cloud-based private subdomain enabling owners to monitor live revenue and operations from anywhere.',
    },
  ];

  const traditionalLabel = isAr ? 'الطريقة التقليدية (ورق / إكسل / شات)' : 'Traditional (paper / Excel / chat)';
  const rashxLabel = isAr ? 'منظومة راش إكس' : 'RashX Platform';

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      id="comparison"
      className="border-t border-mist-gray bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-mist-gray/60 px-3 py-1 text-xs font-bold text-ink">
            <Sparkles className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
            <span>{isAr ? 'مقارنة الفوارق التشغيلية' : 'Operational comparison'}</span>
          </div>

          <h2 className="text-balance text-2xl font-extrabold leading-tight text-ink sm:text-3xl md:text-4xl">
            {isAr
              ? 'الإدارة بالطريقة التقليدية (ورق / إكسل / واتساب) مقابل راش إكس'
              : 'Traditional salon management (paper / Excel / WhatsApp) vs. RashX'}
          </h2>

          <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
            {isAr
              ? 'الفرق بين إهدار الساعات في أعمال يدوية معرضة للخطأ، وبين إدارة منشأتك بمنظومة رقمية مؤتمتة.'
              : 'The difference between hours lost on error-prone manual work and running your facility on one automated digital system.'}
          </p>
        </div>

        {/* Comparison */}
        <div role="table" className="overflow-hidden rounded-3xl border border-mist-gray bg-white">
          {/* Column headers (desktop) */}
          <div role="row" className={`hidden bg-neutral/40 md:grid ${GRID}`}>
            <div role="columnheader" className="px-6 py-5 text-sm font-extrabold text-ink">
              {isAr ? 'مجال العمليات' : 'Operational area'}
            </div>
            <div
              role="columnheader"
              className="flex items-center gap-2 px-6 py-5 text-sm font-extrabold text-ink-muted"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span>{traditionalLabel}</span>
            </div>
            <div
              role="columnheader"
              className="flex items-center gap-2 bg-dusty-blue/30 px-6 py-5 text-sm font-extrabold text-ink"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>{rashxLabel}</span>
            </div>
          </div>

          {rows.map((row, idx) => (
            <div
              key={idx}
              role="row"
              className={`grid gap-3 border-mist-gray p-5 md:gap-0 md:p-0 ${GRID} ${idx > 0 ? 'border-t' : 'md:border-t'}`}
            >
              <div role="rowheader" className="text-sm font-extrabold text-ink md:px-6 md:py-5">
                {isAr ? row.criterionAr : row.criterionEn}
              </div>

              <div role="cell" className="md:px-6 md:py-5">
                <span className="mb-1 block text-[11px] font-bold text-ink-muted md:hidden">
                  {traditionalLabel}
                </span>
                <div className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{isAr ? row.traditionalAr : row.traditionalEn}</span>
                </div>
              </div>

              <div role="cell" className="rounded-2xl bg-dusty-blue/15 p-3 md:rounded-none md:bg-dusty-blue/15 md:px-6 md:py-5">
                <span className="mb-1 block text-[11px] font-bold text-ink md:hidden">{rashxLabel}</span>
                <div className="flex items-start gap-2 text-sm font-medium leading-relaxed text-ink">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                  <span>{isAr ? row.rashxAr : row.rashxEn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TraditionalVsRashXTable;