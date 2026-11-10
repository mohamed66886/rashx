'use client';

import React from 'react';
import {
  CalendarX2,
  CalendarCheck2,
  UserX,
  UserCheck,
  FileSpreadsheet,
  FileCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface ProblemSolutionProps {
  locale?: Locale;
}

export const ProblemSolution: React.FC<ProblemSolutionProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';

  const painPoints = [
    {
      id: 'scheduling',
      titleAr: 'فوضى المواعيد وتضارب الحجوزات',
      titleEn: 'Scheduling Chaos & Double Bookings',
      problemDescAr:
        'تسجيل المواعيد يدويًا أو عبر شات الواتساب غير المنتظم يسبب تضارب أوقات الأخصائيات، تأخر العميلات، وازدحامًا غير مرغوب في صالة الانتظار.',
      problemDescEn:
        'Manual phone logs and scattered WhatsApp chats result in double bookings, stylist delays, and overcrowded reception lounges.',
      solutionTitleAr: 'الحل مع راش إكس: جدولة ذكية 24/7 وتذكير آلي',
      solutionTitleEn: 'RashX Solution: 24/7 Smart Booking & Auto Reminders',
      solutionDescAr:
        'محرك حجز ذاتي يفتح على مدار الساعة يمنع أي تداخل، يخصص مدة الخدمة بدقة، ويرسل رسائل تذكير تفاعلية عبر الواتساب تقلص الغياب بنسبة ملموسة.',
      solutionDescEn:
        'Self-service booking engine open 24/7 with zero overlap, automated buffer times, and interactive WhatsApp confirmations reducing no-shows.',
      problemIcon: CalendarX2,
      solutionIcon: CalendarCheck2,
      accentColor: 'dusty-blue',
    },
    {
      id: 'crm',
      titleAr: 'ضياع بيانات العملاء وضعف تكرار الزيارة',
      titleEn: 'Lost Client Data & Low Repeat Visits',
      problemDescAr:
        'نسيان معادلات صبغات الشعر ونوع البشرة، وعدم وجود نظام مكافآت يجعل العميلة تتجه لأي صالون منافس بعد الزيارة الأولى.',
      problemDescEn:
        'Forgotten hair dye formulas and lack of loyalty incentives leave clients wandering off to nearby competitor salons.',
      solutionTitleAr: 'الحل مع راش إكس: ملف CRM متكامل ومحرك ولاء ونقاط',
      solutionTitleEn: 'RashX Solution: 360° Client Profile & Loyalty Rewards',
      solutionDescAr:
        'سجل رقمي يحفظ تاريخ الزيارات ودرجات الصبغات وتفضيلات كل عميلة، مع نظام ولاء ونقاط استرداد وكوبونات تحفز العودة وترفع ولاء العميلات.',
      solutionDescEn:
        'Comprehensive digital history with formula notes, plus automated cashback points and digital gift cards driving repeat salon visits.',
      problemIcon: UserX,
      solutionIcon: UserCheck,
      accentColor: 'warm-peach',
    },
    {
      id: 'zatca_billing',
      titleAr: 'صعوبة الفواتير الإلكترونية وحساب العمولات',
      titleEn: 'E-Invoicing Complexity & Manual Commissions',
      problemDescAr:
        'القلق من اشتراطات هيئة الزكاة والضريبة والجمارك (ZATCA)، وإهدار ساعات طويلة كل ليلة في مطابقة الكاشير وحساب عمولات الموظفين يدويًا.',
      problemDescEn:
        'Stress over tax authority compliance and spending hours every evening calculating stylist commissions manually on paper.',
      solutionTitleAr: 'الحل مع راش إكس: دعم ZATCA المرحلة 2 وحساب عمولات فوري',
      solutionTitleEn: 'RashX Solution: ZATCA Phase 2 Support & Auto Commissions',
      solutionDescAr:
        'إصدار فوري للفواتير الضريبية المبسطة بـ QR Code المتوافق مع دعم متطلبات المرحلة الثانية، واحتساب آلي دقيق لعمولة كل موظف فور إغلاق الفاتورة.',
      solutionDescEn:
        'Instant compliant simplified tax invoices with QR code supporting Phase 2 criteria, and instant automated stylist commission payouts.',
      problemIcon: FileSpreadsheet,
      solutionIcon: FileCheck,
      accentColor: 'dusty-blue',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-mist-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'من الفوضى إلى الانضباط الكامل' : 'From Chaos to Total Harmony'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            {isAr
              ? 'تحديات أصحاب الصالونات اليومية... وكيف تحلها راش إكس'
              : 'Daily Salon Struggles & How RashX Solves Them'}
          </h2>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            {isAr
              ? 'صممنا راش إكس بعد دراسة عميقة لأكبر التحديات التشغيلية والمالية التي تواجه المشاغل ومراكز التجميل والسبا في المملكة.'
              : 'Engineered specifically around the real operational and financial pain points of salons and spas across Saudi Arabia.'}
          </p>
        </div>

        {/* 3 Problems & Solutions Cards */}
        <div className="space-y-6">
          {painPoints.map((item, idx) => {
            const ProblemIcon = item.problemIcon;
            const SolutionIcon = item.solutionIcon;

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-mist-gray bg-[#FAFBFB] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Problem Side (Left/Start) */}
                <div className="p-6 sm:p-8 bg-rose-50/40 border-b lg:border-b-0 lg:border-e border-mist-gray/70 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <ProblemIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                        {isAr ? 'المشكلة الشائعة' : 'Common Salon Pain Point'}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-ink">
                        {isAr ? item.titleAr : item.titleEn}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr ? item.problemDescAr : item.problemDescEn}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-600">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>{isAr ? 'خسارة إيرادات وإرهاق إداري مستمر' : 'Lost revenue and daily operational fatigue'}</span>
                  </div>
                </div>

                {/* Solution Side (Right/End) */}
                <div className="p-6 sm:p-8 bg-white space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-dusty-blue/20 text-ink flex items-center justify-center shrink-0">
                        <SolutionIcon className="w-5 h-5 text-dusty-blue" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-dusty-blue">
                          {isAr ? 'الحل مع راش إكس' : 'The RashX Solution'}
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-ink">
                          {isAr ? item.solutionTitleAr : item.solutionTitleEn}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {isAr ? item.solutionDescAr : item.solutionDescEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-mist-gray/60 flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isAr ? 'تشغيل ذكي وسلس يرفع رضا العميلات والأرباح' : 'Smart automated workflow boosting retention and profits'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
