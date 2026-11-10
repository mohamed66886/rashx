'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, ArrowDown } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface FeaturesStickyNavProps {
  locale?: Locale;
}

export const FeaturesStickyNav: React.FC<FeaturesStickyNavProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const [activeId, setActiveId] = useState<string>('system-hr');

  const navItems = [
    { id: 'system-hr', labelAr: 'الموارد البشرية والعمولات', labelEn: 'HR & Commissions' },
    { id: 'system-crm', labelAr: 'إدارة العملاء CRM', labelEn: 'CRM & Client Records' },
    { id: 'system-bookings', labelAr: 'الحجوزات والمواعيد', labelEn: 'Smart Booking' },
    { id: 'system-services', labelAr: 'الخدمات والأسعار', labelEn: 'Services & Pricing' },
    { id: 'system-sales', labelAr: 'المبيعات ونقاط البيع POS', labelEn: 'Fast Sales & POS' },
    { id: 'system-purchasing', labelAr: 'المشتريات والموردين', labelEn: 'Purchasing & Vendors' },
    { id: 'system-inventory', labelAr: 'المخزون وجرد المستودع', labelEn: 'Inventory & Stock' },
    { id: 'system-loyalty', labelAr: 'الولاء والمكافآت', labelEn: 'Loyalty & Rewards' },
    { id: 'system-notifications', labelAr: 'الإشعارات والواتساب', labelEn: 'Notifications & Alerts' },
    { id: 'system-reports', labelAr: 'التقارير والذكاء الاصطناعي', labelEn: 'Reports & Analytics' },
    { id: 'comparison', labelAr: 'مقارنة راش إكس مع البدائل', labelEn: 'Traditional vs RashX' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      aria-label={isAr ? 'فهرس الأنظمة السريع' : 'Quick Systems Index'}
      className="hidden xl:block w-72 shrink-0 self-start sticky top-28 p-5 rounded-3xl bg-[#FAFBFB] border border-mist-gray shadow-xs"
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-mist-gray">
        <Layers className="w-4 h-4 text-dusty-blue" />
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
          {isAr ? 'فهرس الأنظمة العشرة' : 'Systems Index'}
        </h4>
      </div>

      <nav className="space-y-1">
        {navItems.map((item, idx) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                isActive
                  ? 'bg-white text-ink font-bold shadow-2xs border border-mist-gray'
                  : 'text-ink-muted hover:text-ink hover:bg-mist-gray/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-dusty-blue' : 'bg-mist-gray'
                  }`}
                />
                <span className="line-clamp-1">{isAr ? item.labelAr : item.labelEn}</span>
              </div>
              <span className="text-[10px] font-mono text-ink-muted/60">
                {idx < 10 ? `0${idx + 1}` : 'VS'}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Quick CTA inside Sticky Sidebar */}
      <div className="mt-6 pt-4 border-t border-mist-gray space-y-2">
        <a
          href="#demo-form"
          className="w-full flex items-center justify-center py-2.5 px-3 rounded-xl bg-dusty-blue hover:bg-dusty-blue/90 text-black text-xs font-bold shadow-2xs transition-colors text-center"
        >
          {isAr ? 'احجز عرضًا تجريبيًا' : 'Book a Demo'}
        </a>
      </div>
    </aside>
  );
};

export default FeaturesStickyNav;

