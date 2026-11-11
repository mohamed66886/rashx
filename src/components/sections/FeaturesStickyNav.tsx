'use client';

import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * Sticky index for the features page.
 * Brand colors only. The active item is found with getBoundingClientRect
 * (offsetTop was relative to the nearest positioned parent, so it drifted).
 */

interface FeaturesStickyNavProps {
  locale?: Locale;
}

const NAV_ITEMS = [
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

const ACTIVE_OFFSET = 200; // px from the top of the viewport

export const FeaturesStickyNav: React.FC<FeaturesStickyNavProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  useEffect(() => {
    const onScroll = () => {
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          setActiveId(NAV_ITEMS[i].id);
          return;
        }
      }
      setActiveId(NAV_ITEMS[0].id);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside
      aria-label={isAr ? 'فهرس الأنظمة السريع' : 'Quick systems index'}
      className="sticky top-28 hidden w-72 shrink-0 self-start rounded-3xl border border-mist-gray bg-white p-5 xl:block"
    >
      <div className="mb-4 flex items-center gap-2 border-b border-mist-gray pb-3">
        <Layers className="h-4 w-4 text-dusty-blue" aria-hidden="true" />
        <p className="text-xs font-extrabold text-ink">
          {isAr ? 'فهرس الأنظمة العشرة' : 'Systems index'}
        </p>
      </div>

      <nav className="space-y-1">
        {NAV_ITEMS.map((item, idx) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs transition-colors ${
                isActive
                  ? 'bg-dusty-blue/30 font-bold text-ink'
                  : 'font-medium text-ink-muted hover:bg-mist-gray/50 hover:text-ink'
              }`}
            >
              <span className="line-clamp-1">{isAr ? item.labelAr : item.labelEn}</span>
              <span className="font-mono text-[10px] text-ink-muted">
                {idx < 10 ? String(idx + 1).padStart(2, '0') : 'VS'}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="mt-5 border-t border-mist-gray pt-4">
        <a
          href="#demo-form"
          className="flex w-full items-center justify-center rounded-xl bg-warm-peach px-3 py-2.5 text-center text-xs font-bold text-ink transition-colors hover:bg-warm-peach/80"
        >
          {isAr ? 'احجز عرضًا تجريبيًا' : 'Book a demo'}
        </a>
      </div>
    </aside>
  );
};

export default FeaturesStickyNav;