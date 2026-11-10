'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, SlidersHorizontal, Check, X } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface CookieConsentBannerProps {
  locale?: Locale;
}

interface CookieCategories {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'rashx_cookie_consent_v1';

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [categories, setCategories] = useState<CookieCategories>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      } else {
        const parsed = JSON.parse(stored);
        if (parsed.categories) {
          setCategories(parsed.categories);
        }
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (updated: CookieCategories) => {
    try {
      const payload = {
        hasResponded: true,
        timestamp: new Date().toISOString(),
        version: '1.0',
        categories: updated,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      window.dispatchEvent(
        new CustomEvent('rashx-cookie-consent-updated', { detail: payload })
      );
    } catch {
      // storage error fallback
    }
    setVisible(false);
  };

  const handleAcceptAll = () => {
    const allEnabled = { necessary: true, analytics: true, marketing: true };
    setCategories(allEnabled);
    saveConsent(allEnabled);
  };

  const handleRejectOptional = () => {
    const essentialOnly = { necessary: true, analytics: false, marketing: false };
    setCategories(essentialOnly);
    saveConsent(essentialOnly);
  };

  const handleSaveCustom = () => {
    saveConsent(categories);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={isAr ? 'إشعار ملفات تعريف الارتباط والخصوصية' : 'Cookie and Privacy Notice'}
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t border-mist-gray shadow-2xl animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {!showCustomize ? (
          /* Summary View */
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-dusty-blue" />
                <h3 className="text-sm font-bold text-ink">
                  {isAr
                    ? 'إشعار الخصوصية وملفات تعريف الارتباط (وفق نظام PDPL السعودي)'
                    : 'Privacy Notice & Cookie Preferences (Saudi PDPL Compliant)'}
                </h3>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                {isAr
                  ? 'نستخدم ملفات تعريف الارتباط الأساسية لضمان عمل المنصة، والملفات التحليلية والتسويقية (مثل سناب شات، تيك توك، وميتا) لتحسين تجربتك وتقديم محتوى يلائم احتياجات منشأتك وفق نظام حماية البيانات الشخصية السعودي.'
                  : 'We use necessary cookies for core operation, and analytical/marketing cookies (Snapchat, TikTok, Meta) to optimize your browsing and provide tailored salon solutions compliant with Saudi PDPL.'}
                {' '}
                <Link
                  href={`/${locale}/privacy`}
                  className="text-dusty-blue hover:underline font-medium inline-block"
                >
                  {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-xs transition-colors"
              >
                {isAr ? 'قبول الكل' : 'Accept All'}
              </button>

              <button
                type="button"
                onClick={handleRejectOptional}
                className="px-4 py-2 text-xs font-semibold text-ink bg-mist-gray hover:bg-mist-gray/80 rounded-xl transition-colors"
              >
                {isAr ? 'رفض غير الأساسي' : 'Essential Only'}
              </button>

              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="px-3 py-2 text-xs font-medium text-ink-muted hover:text-ink flex items-center gap-1 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{isAr ? 'تخصيص' : 'Customize'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Customize View */
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-mist-gray pb-2">
              <h3 className="text-sm font-bold text-ink">
                {isAr ? 'تخصيص تفضيلات الخصوصية' : 'Customize Privacy Preferences'}
              </h3>
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="text-xs text-ink-muted hover:text-ink"
              >
                {isAr ? 'إغلاق والتراجع' : 'Close'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Essential */}
              <div className="p-3 rounded-xl border border-mist-gray bg-mist-gray/20 space-y-1">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>{isAr ? 'الملفات الضرورية' : 'Necessary'}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    {isAr ? 'مفعّلة دائماً' : 'Always Active'}
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted">
                  {isAr
                    ? 'أساسية لتأمين جلسات التصفح وحفظ تفضيلاتك.'
                    : 'Required for platform security and session handling.'}
                </p>
              </div>

              {/* Analytics */}
              <div className="p-3 rounded-xl border border-mist-gray bg-white space-y-1">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>{isAr ? 'التحليلات ومؤشرات الأداء' : 'Analytics (GA4)'}</span>
                  <input
                    type="checkbox"
                    checked={categories.analytics}
                    onChange={(e) =>
                      setCategories({ ...categories, analytics: e.target.checked })
                    }
                    className="w-4 h-4 accent-dusty-blue rounded"
                    aria-label={isAr ? 'تفعيل تحليلات الأداء' : 'Enable Analytics'}
                  />
                </div>
                <p className="text-[11px] text-ink-muted">
                  {isAr
                    ? 'تساعدنا على فهم أداء الصفحات وسرعتها دون تتبع هويتك الشخصية.'
                    : 'Measures page speeds and visits anonymously.'}
                </p>
              </div>

              {/* Marketing */}
              <div className="p-3 rounded-xl border border-mist-gray bg-white space-y-1">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>{isAr ? 'التسويق (Snapchat & TikTok & Meta)' : 'Marketing Pixels'}</span>
                  <input
                    type="checkbox"
                    checked={categories.marketing}
                    onChange={(e) =>
                      setCategories({ ...categories, marketing: e.target.checked })
                    }
                    className="w-4 h-4 accent-dusty-blue rounded"
                    aria-label={isAr ? 'تفعيل بكسل التسويق' : 'Enable Marketing'}
                  />
                </div>
                <p className="text-[11px] text-ink-muted">
                  {isAr
                    ? 'لقياس فعالية حملات الصالونات عبر سناب شات، تيك توك، وإنستغرام.'
                    : 'Helps assess salon promotional campaigns on Snap, TikTok, and Meta.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2 text-xs font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl shadow-xs"
              >
                {isAr ? 'حفظ التفضيلات المحددة' : 'Save Preferences'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsentBanner;

