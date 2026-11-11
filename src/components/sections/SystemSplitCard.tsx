'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
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
  QrCode,
  Smartphone,
  ShieldCheck,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

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

export const SystemSplitCard: React.FC<SystemSplitCardProps> = ({
  system,
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Custom visual mockup depending on system id
  const renderMockup = (sysId: string) => {
    switch (sysId) {
      case 'hr':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-dusty-blue/30 flex items-center justify-center font-bold text-xs text-ink">
                  س
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">سارة الأخصائية (مصففة شعر)</div>
                  <div className="text-[10px] text-ink-muted">الوردية الصباحية • فرع الرياض</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                نشطة الآن
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-[10px] text-ink-muted">فواتير اليوم المنجزة</div>
                <div className="text-lg font-semibold text-ink">8 خدمات</div>
                <div className="text-[10px] text-emerald-600 font-medium">مكتملة 100%</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-[10px] text-ink-muted">عمولات اليوم المحققة</div>
                <div className="text-lg font-semibold font-mono text-ink">340 ر.س</div>
                <div className="text-[10px] text-dusty-blue font-medium">نسبة 15% للخدمة</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-mist-gray/30 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-ink">
                <span>مسير الرواتب وحماية الأجور</span>
                <span className="text-emerald-700">متوافق نظاميًا ✓</span>
              </div>
              <div className="text-[10px] text-ink-muted">
                تنبيه: تجديد رخصة المزاولة والإقامة سارٍ لـ 180 يومًا إضافيًا.
              </div>
            </div>
          </div>
        );

      case 'crm':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-warm-peach/40 flex items-center justify-center font-bold text-xs text-ink">
                  ن
                </div>
                <div>
                  <div className="text-xs font-bold text-ink">نورة العتيبي (VIP)</div>
                  <div className="text-[10px] text-ink-muted">الزيارات: 14 زيارة • إجمالي الإنفاق: 4,850 ر.س</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                عميلة ماسية
              </span>
            </div>

            {/* Hair Color Formula Notebook */}
            <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-ink">
                <span>سجل معادلات الصبغة السابقة</span>
                <span className="text-dusty-blue text-[10px]">آخر تعديل: 12 أكتوبر</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-mist-gray/60 font-mono text-[11px] text-ink leading-relaxed">
                L&apos;Oréal Majirel 7.1 (اشقر رمادي) + 8.0 (بيج) بنسبة 1:1 مع أوكسجين 20Vol.
              </div>
              <div className="text-[10px] text-ink-muted">
                ملاحظات الحساسية: تفضل عدم استخدام زيوت عطرية مركزة على فروة الرأس.
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-mist-gray/30 text-xs">
              <span className="text-[11px] font-medium text-ink">رصيد نقاط الولاء الحالي:</span>
              <span className="font-bold text-dusty-blue font-mono">450 نقطة (45 ر.س رصيد متاح)</span>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="text-xs font-bold text-ink">جدول المواعيد الذكي • اليوم</div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                حجز ذاتي 24/7
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-dusty-blue/15 border border-dusty-blue/30 space-y-1">
                <div className="flex items-center justify-between font-bold text-ink text-[11px]">
                  <span>4:00 م - 5:15 م • تصفيف شعر + صبغة</span>
                  <span className="text-dusty-blue font-semibold">كرسي 1</span>
                </div>
                <div className="text-[10px] text-ink-muted">العميلة: ريم الشمري • مع سارة الأخصائية</div>
              </div>

              {/* Sanitation Buffer Bar */}
              <div className="px-3 py-1 rounded-lg bg-mist-gray/40 border border-dashed border-mist-gray text-[10px] text-ink-muted flex items-center justify-between">
                <span>⏱ وقت مستقطع آلي للتعقيم وتجهيز الكرسي (15 دقيقة)</span>
                <span className="text-emerald-700 font-semibold">تلقائي</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-mist-gray space-y-1">
                <div className="flex items-center justify-between font-bold text-ink text-[11px]">
                  <span>5:30 م - 6:30 م • جلسة مساج وسبا</span>
                  <span className="text-warm-peach font-semibold">جناح 2</span>
                </div>
                <div className="text-[10px] text-ink-muted">العميلة: ليلى ع. • مع منى أخصائية السبا</div>
              </div>
            </div>

            <div className="text-[10px] text-ink-muted flex items-center justify-between pt-1">
              <span>قائمة الانتظار التلقائية (Waitlist): 2 عميلات</span>
              <span className="text-emerald-600 font-semibold">إعادة تسكين فوري عند الإلغاء</span>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="text-xs font-bold text-ink">قائمة الخدمات والباقات التجميلية</div>
              <span className="text-[10px] text-ink-muted font-mono">12 فئة • 48 خدمة</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink">باقة العناية المتكاملة (شعر + أظافر + مساج)</span>
                  <span className="font-bold font-mono text-dusty-blue">380 ر.س</span>
                </div>
                <div className="text-[10px] text-ink-muted">المدة الإجمالية: 110 دقيقة • باقة موسمية مخفضة</div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded bg-white border text-[9px] text-ink">تصفيف ملكي</span>
                  <span className="px-2 py-0.5 rounded bg-white border text-[9px] text-ink">مانيكير وباديكير</span>
                  <span className="px-2 py-0.5 rounded bg-white border text-[9px] text-ink">مساج استرخائي 30 دقيقة</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-mist-gray/30 flex items-center justify-between text-[11px]">
                <span className="text-ink font-medium">تسعير ديناميكي حسب طول الشعر:</span>
                <span className="text-ink-muted">قصير (120) • متوسط (160) • طويل (220 ر.س)</span>
              </div>
            </div>

            <div className="text-[10px] text-emerald-700 font-medium">
              ✓ خصم آلي لكميات المواد المستهلكة من المخزن فور اختيار الخدمة.
            </div>
          </div>
        );

      case 'sales':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="text-xs font-bold text-ink">نقطة البيع السريعة POS</div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                ZATCA 2 Ready
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2 text-xs">
              <div className="flex items-center justify-between text-ink-muted text-[11px]">
                <span>الفاتورة الضريبية المبسطة #1042</span>
                <span>اليوم 5:45 م</span>
              </div>
              <div className="flex items-center justify-between font-bold text-ink">
                <span>المجموع شامل ضريبة 15%</span>
                <span className="text-base font-mono">230.00 ر.س</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1 text-[10px] text-ink-muted">
                <span className="px-2 py-0.5 rounded bg-white border">مدى (Mada): 150 ر.س</span>
                <span className="px-2 py-0.5 rounded bg-white border">نقاط ولاء: 80 ر.س</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-mist-gray">
              <QrCode className="w-12 h-12 text-ink shrink-0" />
              <div className="text-[10px] text-ink-muted leading-tight">
                رمز QR مشفر وفق متطلبات هيئة الزكاة والضريبة والجمارك (المرحلة الثانية).
              </div>
            </div>
          </div>
        );

      case 'purchasing':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="text-xs font-bold text-ink">أوامر الشراء وإدارة الموردين</div>
              <span className="text-[10px] text-ink-muted">دورة مشتريات إلكترونية</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1.5">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>شركة وكلاء التجميل الكبرى</span>
                  <span className="font-mono text-dusty-blue">PO #882</span>
                </div>
                <div className="text-[11px] text-ink-muted">طلب: 30 عبوة صبغة + 10 جالون شامبو معالج</div>
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-mist-gray/40">
                  <span className="text-emerald-600 font-semibold">تم الفحص والمطابقة ✓</span>
                  <span className="font-bold text-ink font-mono">2,450 ر.س</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-mist-gray/30 text-[10px] text-ink-muted flex items-center justify-between">
                <span>تحديث تكلفة الوحدة تلقائيًا:</span>
                <span className="text-ink font-bold">متوسط التكلفة المرجح</span>
              </div>
            </div>

            <div className="text-[10px] text-ink-muted">
              سجل مدفوعات وفواتير ضريبية للموردين متوافق مع متطلبات ضريبة القيمة المضافة.
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="text-xs font-bold text-ink">المخزون وجرد المستودعات</div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-mist-gray font-medium text-ink">
                استهلاك داخلي + تجزئة
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Product 1: Low stock alert */}
              <div className="p-3 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>صبغة شعر أشقر رمادي 7.1 (Backbar)</span>
                  <span className="text-rose-600 font-bold font-mono">باقي 2 عبوات</span>
                </div>
                <div className="w-full bg-rose-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[15%]" />
                </div>
                <div className="text-[10px] text-rose-700">تنبيه آلي: تم الوصول لحد إعادة الطلب الأدنى.</div>
              </div>

              {/* Product 2: Normal Retail Stock */}
              <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1.5">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>سيروم الكيراتين المعالج (بيع تجزئة)</span>
                  <span className="text-emerald-600 font-bold font-mono">18 عبوة</span>
                </div>
                <div className="w-full bg-mist-gray h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[75%]" />
                </div>
              </div>
            </div>

            <div className="text-[10px] text-ink-muted flex items-center justify-between pt-1">
              <span>جرد دوري سريع بالباركود</span>
              <span className="text-emerald-700 font-semibold">منع الهدر وسد العجز</span>
            </div>
          </div>
        );

      case 'loyalty':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="text-xs font-bold text-ink">نظام الولاء والمكافآت التلقائي</div>
              <span className="text-[10px] text-dusty-blue font-bold">رفع معدل العودة</span>
            </div>

            {/* Loyalty Digital Pass Mockup */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-ink via-[#1F2B2D] to-black text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold tracking-wide">بطاقة ولاء الصالون الرقمية</span>
                <span className="text-[10px] text-dusty-blue font-mono">RashX Pass</span>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] text-mist-gray">رصيد الاسترداد النقدي (Cashback)</div>
                <div className="text-2xl font-semibold font-mono text-warm-peach">85.00 ر.س</div>
              </div>
              <div className="text-[10px] text-mist-gray/80 pt-1 border-t border-white/10 flex items-center justify-between">
                <span>تكتسب 5% نقاط مع كل زيارة</span>
                <span>قابلة للخصم بالفاتورة</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-ink">
                <span>بطاقات الهدايا الرقمية (Gift Cards)</span>
                <span className="text-emerald-600 font-semibold">مشاركة بالواتساب</span>
              </div>
              <div className="text-[10px] text-ink-muted">
                إهداء قسائم تجميل للأصدقاء برابط مباشر ومتابعة صرفها بالنظام.
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-ink">
                <div className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
                <span>رسائل واتساب التفاعلية الموثقة</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold">تأكيد آلي</span>
            </div>

            {/* WhatsApp Message Preview */}
            <div className="p-3.5 rounded-2xl bg-[#EFEAE2] space-y-2 text-xs shadow-inner">
              <div className="p-3 rounded-xl bg-white text-ink space-y-2 shadow-xs">
                <div className="text-[11px] font-bold text-[#128C7E]">صالون راش إكس للتجميل ✓</div>
                <p className="text-[11px] leading-relaxed">
                  أهلاً سارة، نذكرك بموعدك غداً الساعة 5:00 م لتصفيف الشعر مع الأخصائية سارة.
                </p>
                <div className="pt-2 border-t border-mist-gray/40 space-y-1.5">
                  <div className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#128C7E] font-bold text-[10px] text-center">
                    [تأكيد الحضور بضغطة زر]
                  </div>
                  <div className="p-1.5 rounded-lg bg-mist-gray/40 text-ink-muted font-medium text-[10px] text-center">
                    [طلب تعديل الموعد]
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-ink-muted text-center">
              ✓ تقليص نسبة الغياب غير المبرر بنسبة ملحوظة في الصالونات السعودية.
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-mist-gray shadow-xl space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-between border-b border-mist-gray pb-3">
              <div className="text-xs font-bold text-ink">تقارير الذكاء الاصطناعي والأرباح</div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                تحليل فوري
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-ink-muted">ساعات الذروة التشغيلية (Peak Hours)</span>
                  <span className="text-dusty-blue font-bold text-[10px]">الخميس والجمعة</span>
                </div>
                {/* Micro Bar Chart */}
                <div className="flex items-end gap-1.5 h-14 pt-2 px-1">
                  <div className="flex-1 bg-mist-gray rounded-t h-[40%]" title="12 م" />
                  <div className="flex-1 bg-mist-gray rounded-t h-[60%]" title="2 م" />
                  <div className="flex-1 bg-dusty-blue rounded-t h-[95%]" title="5 م" />
                  <div className="flex-1 bg-dusty-blue rounded-t h-[100%]" title="7 م" />
                  <div className="flex-1 bg-mist-gray rounded-t h-[70%]" title="9 م" />
                </div>
                <div className="text-[10px] text-ink-muted text-center">
                  أعلى ضغط وإشغال بين 4:30 م إلى 8:30 م (اقتراح عروض صباحية لملء الفراغ).
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-mist-gray flex items-center justify-between text-[11px]">
                <span className="font-bold text-ink">تقرير إقرار ضريبة ZATCA:</span>
                <span className="text-emerald-700 font-bold">جاهز للتصدير (15% VAT) ✓</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id={system.anchorId}
      className="py-14 sm:py-20 border-b border-mist-gray/70 scroll-mt-28"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
          system.reverse ? 'lg:grid-flow-dense' : ''
        }`}
      >
        {/* Text Details (7 cols) */}
        <div
          className={`space-y-5 ${
            system.reverse ? 'lg:col-start-6 lg:col-span-7' : 'lg:col-span-7'
          }`}
        >
          {/* Order Badge & Category */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-mist-gray font-mono font-medium text-xs text-ink">
              {system.order}
            </span>
            <span className="text-xs font-medium text-dusty-blue uppercase tracking-wider">
              {isAr ? system.taglineAr : system.taglineEn}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-ink tracking-tight leading-tight">
            {isAr ? system.nameAr : system.nameEn}
          </h3>

          <p className="text-xs sm:text-sm font-normal text-ink-muted leading-relaxed">
            {isAr ? system.descAr : system.descEn}
          </p>

          {/* 4 to 6 Detailed Bullet Points */}
          <ul className="space-y-2.5 pt-2">
            {(isAr ? system.bulletsAr : system.bulletsEn).map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Learn More Button */}
          <div className="pt-4">
            <Link
              href={`/${locale}/solutions/${system.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-xs transition-colors"
            >
              <span>{isAr ? 'اعرف أكثر عن هذا النظام' : 'Learn More About This System'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Visual Mockup (5 cols) */}
        <div
          className={`${
            system.reverse ? 'lg:col-start-1 lg:col-span-5' : 'lg:col-span-5'
          }`}
        >
          {renderMockup(system.id)}
        </div>
      </div>
    </div>
  );
};

export default SystemSplitCard;

