'use client';

import React from 'react';
import { Check, X, Sparkles, FileSpreadsheet, Smartphone, ShieldCheck } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface TraditionalVsRashXTableProps {
  locale?: Locale;
}

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

  return (
    <section className="py-16 md:py-24 bg-white border-t border-mist-gray" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'مقارنة الفوارق التشغيلية' : 'Operational Comparison'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-tight leading-tight">
            {isAr
              ? 'الإدارة بالطريقة التقليدية (ورق / إكسل / واتساب) مقابل راش إكس'
              : 'Traditional Salon Management (Paper / Excel / WhatsApp) vs. RashX'}
          </h2>

          <p className="text-xs sm:text-sm font-normal text-ink-muted leading-relaxed">
            {isAr
              ? 'اكتشف الفرق الجوهري بين إهدار الساعات في الأعمال اليدوية المعرضة للخطأ، وبين إدارة منشأتك بمنظومة رقمية ذكية ومؤتمتة بالكامل.'
              : 'Discover the profound shift from manual error-prone tasks to a synchronized, automated digital ecosystem.'}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-mist-gray shadow-md bg-white">
          <table className="w-full text-start text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-mist-gray">
                <th className="py-5 px-6 text-start font-semibold text-ink w-1/4 bg-mist-gray/30">
                  {isAr ? 'مجال العمليات' : 'Operational Area'}
                </th>
                <th className="py-5 px-6 text-start font-semibold text-rose-700 w-[37.5%] bg-rose-50/50 border-e border-mist-gray/70">
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>{isAr ? 'الطريقة التقليدية (ورق / إكسل / شات)' : 'Traditional Methods (Paper / Excel)'}</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-start font-semibold text-black w-[37.5%] bg-dusty-blue/20">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-dusty-blue" />
                    <span>{isAr ? 'منظومة راش إكس (RashX)' : 'RashX Platform'}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-gray/60">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-mist-gray/15 transition-colors">
                  <td className="py-4 px-6 text-ink font-bold bg-mist-gray/10">
                    {isAr ? row.criterionAr : row.criterionEn}
                  </td>
                  <td className="py-4 px-6 text-ink-muted leading-relaxed bg-rose-50/20 border-e border-mist-gray/60">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{isAr ? row.traditionalAr : row.traditionalEn}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-ink font-medium leading-relaxed bg-dusty-blue/10">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                      <span>{isAr ? row.rashxAr : row.rashxEn}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TraditionalVsRashXTable;

