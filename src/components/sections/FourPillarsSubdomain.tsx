'use client';

import React from 'react';
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  UserCheck,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface FourPillarsSubdomainProps {
  locale?: Locale;
}

export const FourPillarsSubdomain: React.FC<FourPillarsSubdomainProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';

  const pillars = [
    {
      id: 'website',
      icon: Globe,
      titleAr: 'موقع المنشأة الإلكتروني',
      titleEn: 'Facility Website',
      roleAr: 'الواجهة التسويقية المفتوحة للجمهور',
      roleEn: 'Public Marketing Showcase',
      descAr:
        'واجهة عصرية فاخرة مصممة بهوية صالونك لاستعراض قائمة الخدمات والأسعار، صور الأعمال والتسريحات، وفريق العمل، مع تمكين العميلات من بدء الحجز الفوري.',
      descEn:
        'A high-end branded portal presenting your service catalog, pricing tiers, gallery, and team profiles, enabling immediate direct appointments.',
      featuresAr: ['عرض الأسعار والخدمات', 'معرض أعمال وتصفيفات', 'حجز إلكتروني فوري'],
      featuresEn: ['Service catalog & prices', 'Lookbook & portfolio', 'Instant self-booking'],
      badgeAr: 'yourname.rashx.org',
      badgeEn: 'yourname.rashx.org',
    },
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      titleAr: 'لوحة التحكم الإدارية',
      titleEn: 'Admin Management Dashboard',
      roleAr: 'مركز قيادة العمليات والمالية',
      roleEn: 'Operations & Financial HQ',
      descAr:
        'شاشة الإدارة الشاملة لمالك الصالون أو المدير: مراقبة المبيعات الحية، نقاط البيع السريعة، إغلاق الصندوق، تقارير الفوترة الإلكترونية، وإدارة الفروع المتعددة.',
      descEn:
        'Central control station for managers: Real-time revenue analytics, fast touch POS, drawer closing, e-invoicing compliance, and multi-branch oversight.',
      featuresAr: ['نقاط البيع السريعة POS', 'تقارير الأرباح والضريبة', 'إدارة صلاحيات الموظفين'],
      featuresEn: ['Fast Touch POS', 'P&L & Tax Reports', 'Granular staff permissions'],
      badgeAr: 'yourname.rashx.org/admin',
      badgeEn: 'yourname.rashx.org/admin',
    },
    {
      id: 'client_app',
      icon: Smartphone,
      titleAr: 'تطبيق وواجهة العميل (PWA)',
      titleEn: 'Client App & Booking Portal',
      roleAr: 'تجربة حجز سلسة على جوال العميل',
      roleEn: 'Frictionless Mobile Booking',
      descAr:
        'تطبيق ويب تقدمي فائق الخفة يفتح فورًا على الجوال دون تحميل من المتاجر، يمكّن العميلة من حجز موعدها، اختيار الأخصائية المفضلة، الدفع، ومتابعة نقاط الولاء.',
      descEn:
        'A lightweight progressive web app opening instantly on any smartphone without app store downloads, handling bookings, specialist selection, and loyalty rewards.',
      featuresAr: ['حجز ذاتي على مدار 24/7', 'دفع إلكتروني وعربون', 'رصيد نقاط ومكافآت'],
      featuresEn: ['24/7 self-service scheduling', 'Upfront deposits & pay', 'Loyalty balance & passes'],
      badgeAr: 'yourname.rashx.org/book',
      badgeEn: 'yourname.rashx.org/book',
    },
    {
      id: 'staff_app',
      icon: UserCheck,
      titleAr: 'واجهة مقدم الخدمة والأخصائي',
      titleEn: 'Service Provider Interface',
      roleAr: 'شاشة مصففي الشعر وخبراء التجميل',
      roleEn: 'Stylists & Specialists Portal',
      descAr:
        'شاشة ذكية لكل أخصائية تجميل أو مصفف شعر لمعرفة جدول المواعيد اليومي، تسجيل بدء الخدمة وإنهائها، ومتابعة العمولات المكتسبة بدقة وشفافية كاملة.',
      descEn:
        'A dedicated tablet/mobile view for stylists to review daily bookings, log service progress, and view earned commissions in complete real-time transparency.',
      featuresAr: ['جدول المواعيد اليومي', 'تسجيل استهلاك المواد', 'متابعة العمولات الشخصية'],
      featuresEn: ['Daily queue schedule', 'Backbar consumption logs', 'Personal commission audits'],
      badgeAr: 'yourname.rashx.org/staff',
      badgeEn: 'yourname.rashx.org/staff',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFB] border-t border-mist-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'السيادة الرقمية لمنشأتك' : 'Digital Sovereignty'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            {isAr
              ? 'منظومة كاملة لكل منشأة بنطاق فرعي مستقل'
              : 'A Complete Digital Ecosystem with an Independent Subdomain'}
          </h2>

          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            {isAr
              ? 'في راش إكس، لا نضع صالونك داخل دليل مشترك مع منافسيك. بدلاً من ذلك، نمنحك نطاقًا فرعيًا سحابيًا خاصًا يضم 4 واجهات مترابطة تلبي كافة أطراف العملية التشغيلية.'
              : 'Instead of listing your salon in a shared crowded directory, RashX equips your business with a private cloud subdomain featuring 4 interconnected portals.'}
          </p>
        </div>

        {/* Subdomain Explainer Feature Bar */}
        <div className="max-w-3xl mx-auto mb-12 p-4 sm:p-5 rounded-3xl bg-white border border-mist-gray shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-dusty-blue/20 text-ink flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-dusty-blue" />
            </div>
            <div>
              <div className="text-xs font-bold text-ink">
                {isAr ? 'نطاق فرعي مخصص بهوية منشأتك الحصرية' : 'Dedicated Branded Subdomain'}
              </div>
              <div className="text-[11px] text-ink-muted font-mono" dir="ltr">
                https://<span className="text-ink font-bold">your-salon</span>.rashx.org
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? 'عزل كامل وسيادة تامة على البيانات' : 'Full Tenant Isolation'}</span>
          </div>
        </div>

        {/* The 4 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-mist-gray shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Top Bar with Icon & URL Path */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-mist-gray/60 flex items-center justify-center text-ink">
                      <Icon className="w-6 h-6 text-dusty-blue" />
                    </div>
                    <span
                      className="px-3 py-1 rounded-full bg-mist-gray/40 text-[11px] font-mono font-medium text-ink-muted border border-mist-gray/60"
                      dir="ltr"
                    >
                      {isAr ? pillar.badgeAr : pillar.badgeEn}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink">
                      {isAr ? pillar.titleAr : pillar.titleEn}
                    </h3>
                    <p className="text-xs font-semibold text-dusty-blue mt-0.5">
                      {isAr ? pillar.roleAr : pillar.roleEn}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>

                {/* Features Bullets */}
                <div className="pt-4 border-t border-mist-gray/60">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(isAr ? pillar.featuresAr : pillar.featuresEn).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-xs text-ink font-medium"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
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

export default FourPillarsSubdomain;

