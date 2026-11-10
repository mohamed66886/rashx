'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  ShieldCheck,
  Globe,
  Send,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { FOOTER_COLUMNS, LEGAL_LINKS } from '@/config/nav';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/* =========================================================================
   TYPES & INTERFACES
   ========================================================================= */

export type FooterVariant = 'detailed' | 'simple' | 'dashboard';
export type FooterBackgroundVariant = 'mist' | 'black' | 'dark' | 'peach' | 'blue' | 'white';

export interface FooterProps {
  locale?: Locale;
  /** Footer layout variant (default: 'detailed') */
  variant?: FooterVariant;
  /**
   * Footer brand background theme (default: 'mist')
   * - 'mist': Brand Mist Gray (#F5F7F7)
   * - 'black' / 'dark': Brand Pure Black (#000000)
   * - 'peach': Brand Warm Peach (#FDF6F2)
   * - 'blue': Brand Dusty Blue (#EFF5F7)
   * - 'white': Pure Base White (#FFFFFF)
   */
  bgVariant?: FooterBackgroundVariant;
  logoSrc?: string;
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
  showPaymentPartners?: boolean;
  className?: string;
}

/* =========================================================================
   SOCIAL ICONS (8 Channels)
   ========================================================================= */

const SocialIcon: React.FC<{ type: string; className?: string }> = ({
  type,
  className = 'w-4 h-4',
}) => {
  switch (type) {
    case 'telegram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
        </svg>
      );
    case 'x':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 005.73 2.29V11.9a4.85 4.85 0 01-3.77-1.44 4.84 4.84 0 01-.03-3.77z" />
        </svg>
      );
    case 'snapchat':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.002 2C9.4 2 7.7 3.5 7.7 5.7c0 .6.1 1.2.3 1.8-.8.1-1.6.4-2.1.8-.6.5-.8 1.1-.6 1.7.3.7 1.1 1 2 1 .3 0 .6 0 .9-.1-.1.4-.2.8-.2 1.3 0 2.2 1.5 4.1 4 4.1s4-1.9 4-4.1c0-.5-.1-.9-.2-1.3.3.1.6.1.9.1.9 0 1.7-.3 2-1 .2-.6 0-1.2-.6-1.7-.5-.4-1.3-.7-2.1-.8.2-.6.3-1.2.3-1.8 0-2.2-1.7-3.7-4.3-3.7z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z" />
        </svg>
      );
    default:
      return null;
  }
};

/* =========================================================================
   FONT WEIGHT SCALE (موحّد في كل الفوتر)
   - font-normal   (400): الفقرات والنصوص الوصفية
   - font-medium   (500): الروابط، الأسماء الصغيرة، الشارات
   - font-semibold (600): العناوين
   ========================================================================= */

export const Footer: React.FC<FooterProps> = ({
  locale = DEFAULT_LOCALE,
  variant = 'detailed',
  bgVariant = 'mist',
  logoSrc,
  showNewsletter = true,
  onNewsletterSubmit,
  showPaymentPartners = true,
  className = '',
}) => {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isDark = bgVariant === 'dark' || bgVariant === 'black';

  const resolvedLogo =
    logoSrc ||
    (isDark
      ? '/brand/logo/lockup-bilingual/lockup-bilingual-white.svg'
      : '/brand/logo/lockup-bilingual/lockup-bilingual-black.svg');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    onNewsletterSubmit?.(newsletterEmail.trim());
    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const resolvedCopyright = isAr
    ? `جميع الحقوق محفوظة © ${SITE_CONFIG.foundedYear} لمنظومة راش إكس — RASHX`
    : `All Rights Reserved © ${SITE_CONFIG.foundedYear} RashX Platform`;

  // نظام ألوان الهوية الموحد — زيرو بوردر وزيرو شادو
  const themeClasses: Record<FooterBackgroundVariant, string> = {
    mist: 'bg-[#F5F7F7] text-black',
    black: 'bg-[#000000] text-white',
    dark: 'bg-[#000000] text-white',
    peach: 'bg-[#FDF6F2] text-black',
    blue: 'bg-[#EFF5F7] text-black',
    white: 'bg-white text-black',
  };

  const currentThemeClass = themeClasses[bgVariant] || themeClasses.mist;
  const mutedTextClass = isDark ? 'text-[#E5E9E8]/75' : 'text-[#5E6665]';
  const strongTextClass = isDark ? 'text-white' : 'text-black';
  const linkHoverClass = isDark ? 'hover:text-white' : 'hover:text-black';

  // فصل الطبقات والـ Cards عن طريق تباين السطح فقط بدون أي حدود
  const surfaceClass = isDark
    ? 'bg-[#0D0D0D]'
    : bgVariant === 'white'
      ? 'bg-[#F5F7F7]'
      : 'bg-white';

  const socialLinks = [
    { id: 'whatsapp', name: 'WhatsApp', href: SITE_CONFIG.whatsappUrl, iconType: 'whatsapp' },
    { id: 'x', name: 'X (Twitter)', href: SITE_CONFIG.social.x, iconType: 'x' },
    { id: 'instagram', name: 'Instagram', href: SITE_CONFIG.social.instagram, iconType: 'instagram' },
    { id: 'tiktok', name: 'TikTok', href: SITE_CONFIG.social.tiktok, iconType: 'tiktok' },
    { id: 'snapchat', name: 'Snapchat', href: SITE_CONFIG.social.snapchat, iconType: 'snapchat' },
    { id: 'linkedin', name: 'LinkedIn', href: SITE_CONFIG.social.linkedin, iconType: 'linkedin' },
    { id: 'telegram', name: 'Telegram', href: SITE_CONFIG.social.telegram, iconType: 'telegram' },
    { id: 'facebook', name: 'Facebook', href: SITE_CONFIG.social.facebook, iconType: 'facebook' },
  ];

  /* -----------------------------------------------------------------------
     1) DASHBOARD (Compact)
     ----------------------------------------------------------------------- */
  if (variant === 'dashboard') {
    return (
      <footer
        dir={dir}
        className={`mt-auto w-full ${currentThemeClass} px-4 py-3 text-xs sm:px-6 sm:py-4 ${className}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <span className={`flex items-center gap-1.5 font-medium ${strongTextClass}`}>
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {isAr ? 'حالة الخوادم: متصلة 100%' : 'System Status: 100% Online'}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className={`font-normal ${mutedTextClass}`}>{resolvedCopyright}</span>
          </div>

          <div className={`flex items-center gap-3 text-[11px] font-normal sm:gap-4 ${mutedTextClass}`}>
            {LEGAL_LINKS.slice(0, 2).map((link, i) => (
              <React.Fragment key={link.href}>
                {i > 0 && <span>•</span>}
                <Link
                  href={`/${locale}${link.href}`}
                  className={`transition-colors ${linkHoverClass}`}
                >
                  {isAr ? link.labelAr : link.labelEn}
                </Link>
              </React.Fragment>
            ))}
            <span>•</span>
            <span
              className={`rounded px-2 py-0.5 font-mono font-medium ${
                isDark ? 'bg-white/10 text-[#91B8C0]' : 'bg-[#E5E9E8] text-black'
              }`}
            >
              v2.4.0
            </span>
          </div>
        </div>
      </footer>
    );
  }

  /* -----------------------------------------------------------------------
     2) SIMPLE
     ----------------------------------------------------------------------- */
  if (variant === 'simple') {
    return (
      <footer
        dir={dir}
        className={`mt-auto w-full ${currentThemeClass} px-4 py-6 sm:px-6 sm:py-8 ${className}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row md:gap-6">
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
            <Link href={`/${locale}`} className="shrink-0">
              <Image
                src={resolvedLogo}
                alt={SITE_CONFIG.name}
                width={140}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
            <span className={`text-center text-xs font-normal md:text-start ${mutedTextClass}`}>
              {resolvedCopyright}
            </span>
          </div>

          <nav
            className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium ${mutedTextClass}`}
          >
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`transition-colors ${linkHoverClass}`}
              >
                {isAr ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    );
  }

  /* -----------------------------------------------------------------------
     3) DETAILED
     الترتيب البصري المعتمد:
       A. شريط النشرة البريدية + إشعار ZATCA والنطاق الفرعي (Cards بدون بوردر)
       B. البراند ومعلومات التواصل والسوشيال + أعمدة الروابط
       C. شريط بوابات الدفع + بطاقة المؤسس والاعتمادات
       D. الشريط السفلي (الحقوق + الروابط القانونية + صُنع بحب في الرياض)
     ----------------------------------------------------------------------- */
  return (
    <footer dir={dir} className={`mt-auto w-full ${currentThemeClass} ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-6 pt-10 sm:gap-12 sm:px-6 sm:pb-8 sm:pt-12 lg:gap-14 lg:px-8 lg:pt-16">
        {/* ============ A. NEWSLETTER & ARCHITECTURE BAND ============ */}
        <div className="flex flex-col gap-4">
          {showNewsletter && (
            <div
              className={`flex flex-col gap-5 rounded-2xl p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-8 ${surfaceClass}`}
            >
              <div className="space-y-1.5 text-start lg:max-w-md">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#91B8C0]/25 p-1">
                    <Image
                      src="/brand/icons/favicon-black-on-blue.svg"
                      alt="RASHX Icon"
                      width={18}
                      height={18}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h4 className={`text-sm font-semibold sm:text-base ${strongTextClass}`}>
                    {isAr
                      ? 'اشترك في النشرة الدورية لـ RASHX'
                      : 'Subscribe to RASHX Newsletter'}
                  </h4>
                </div>
                <p className={`text-xs font-normal leading-relaxed sm:text-sm ${mutedTextClass}`}>
                  {isAr
                    ? 'احصل أولاً بأول على تحديثات أنظمة إدارة الصالونات، تعاميم هيئة الزكاة، والميزات السحابية الجديدة.'
                    : 'Get the latest updates on salon management systems, ZATCA regulations, and new cloud features.'}
                </p>
              </div>

              <div className="w-full lg:max-w-lg lg:flex-1">
                {isSubscribed ? (
                  <div className="flex items-center gap-2 rounded-xl bg-[#91B8C0]/20 p-3 text-xs font-medium text-black sm:text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-black" />
                    <span>
                      {isAr
                        ? 'شكراً لاشتراكك! ستصلك أحدث المستجدات والأنظمة مباشرة على بريدك.'
                        : 'Thank you for subscribing! You will receive our latest updates directly.'}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={
                        isAr
                          ? 'أدخل بريدك الإلكتروني (e.g. salon@domain.sa)'
                          : 'Enter your email (e.g. salon@domain.sa)'
                      }
                      required
                      className={`w-full flex-1 rounded-xl px-4 py-2.5 text-xs font-normal outline-none transition-colors focus-visible:outline-2 focus-visible:outline-[#91B8C0] sm:text-sm ${
                        isDark
                          ? 'bg-[#000000] text-white placeholder:text-[#5E6665]'
                          : 'bg-[#F5F7F7] text-black placeholder:text-[#5E6665]/60'
                      }`}
                    />
                    <button
                      type="submit"
                      className={`inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-medium transition-colors sm:w-auto sm:text-sm ${
                        isDark
                          ? 'bg-white text-black hover:bg-[#E5E9E8]'
                          : 'bg-black text-white hover:bg-black/85'
                      }`}
                    >
                      <Send className="h-3.5 w-3.5 rtl:rotate-180" />
                      <span>{isAr ? 'اشترك الآن' : 'Subscribe'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* ZATCA Notice & Subdomain Architecture Bar (Pure Surface - No Borders) */}
          <div
            className={`flex flex-col justify-between gap-3 rounded-2xl px-5 py-3.5 text-xs md:flex-row md:items-center sm:px-6 ${surfaceClass}`}
          >
            <div className={`flex items-center gap-2.5 font-normal ${mutedTextClass}`}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#91B8C0]/20 text-[#91B8C0]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>
              <span>{isAr ? SITE_CONFIG.zatca.noticeAr : SITE_CONFIG.zatca.noticeEn}</span>
            </div>

            <div className={`flex shrink-0 items-center gap-2.5 font-medium ${strongTextClass}`}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#F0C5AE]/25 text-black">
                <Globe className="h-3.5 w-3.5" />
              </span>
              <span>
                {isAr
                  ? 'منظومة سحابية مستقلة بنطاق فرعي لكل منشأة'
                  : 'Dedicated Subdomain Cloud Ecosystem'}
              </span>
            </div>
          </div>
        </div>

        {/* ============ B. BRAND + LINK COLUMNS ============ */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4 text-start lg:col-span-4">
            <Link
              href={`/${locale}`}
              className="group inline-block"
              aria-label={SITE_CONFIG.name}
            >
              <Image
                src={resolvedLogo}
                alt="راش إكس – RashX"
                width={170}
                height={38}
                className="h-8.5 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            <p className={`text-sm font-semibold ${strongTextClass}`}>
              {isAr ? SITE_CONFIG.slogan.ar : SITE_CONFIG.slogan.en}
            </p>

            <p className={`max-w-md text-xs font-normal leading-loose sm:text-sm ${mutedTextClass}`}>
              {isAr
                ? 'النظام الذكي الشامل لإدارة صالونات التجميل، المشاغل، مراكز الحلاقة، والسبا في المملكة العربية السعودية. نطاق فرعي خاص، 10 أنظمة متكاملة، وحماية فائقة للبيانات.'
                : 'Smart all-in-one management platform for beauty salons, styling studios, barbershops, and wellness spas in Saudi Arabia.'}
            </p>

            {/* Direct Contact Pills (Flat UI Surfaces) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${surfaceClass} ${
                  isDark ? 'text-white hover:bg-[#91B8C0]/20' : 'text-black hover:bg-[#91B8C0]/20'
                }`}
              >
                <Phone className="h-3.5 w-3.5 text-[#91B8C0]" />
                <span dir="ltr" className="font-mono">
                  {SITE_CONFIG.phone}
                </span>
                <span className="rounded bg-[#91B8C0]/20 px-1.5 py-0.5 text-[10px] font-medium text-black">
                  {isAr ? 'واتساب / اتصال' : 'WhatsApp'}
                </span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${surfaceClass} ${
                  isDark ? 'text-white hover:bg-[#91B8C0]/20' : 'text-black hover:bg-[#91B8C0]/20'
                }`}
              >
                <Mail className="h-3.5 w-3.5 text-[#91B8C0]" />
                <span className="font-mono">{SITE_CONFIG.email}</span>
              </a>
            </div>

            {/* Compliance Badges — بدون بوردر ولا ظل */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium ${
                  isDark ? 'bg-[#91B8C0]/15 text-white' : `${surfaceClass} text-black`
                }`}
                title={
                  isAr
                    ? 'نظام الفوترة الإلكترونية المعتمد من ZATCA (المرحلة الثانية)'
                    : 'ZATCA E-Invoicing Phase 2 Ready'
                }
              >
                <Image
                  src="/zatca.svg"
                  alt="ZATCA Logo"
                  width={80}
                  height={20}
                  className={`h-3.5 w-auto ${isDark ? 'brightness-0 invert' : ''}`}
                />
                <span className="text-[11px] font-medium text-[#91B8C0]">
                  {isAr ? 'المرحلة الثانية' : 'Phase 2'}
                </span>
              </div>

              <div
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium ${
                  isDark ? 'bg-[#F0C5AE]/15 text-white' : `${surfaceClass} text-black`
                }`}
                title={
                  isAr
                    ? 'متوافق مع الهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA)'
                    : 'SDAIA PDPL Compliant'
                }
              >
                <Image
                  src="/sdaia.svg"
                  alt="SDAIA Logo"
                  width={75}
                  height={20}
                  className={`h-3.5 w-auto ${isDark ? 'brightness-0 invert' : ''}`}
                />
                <span className="text-[11px] font-medium text-[#F0C5AE]">
                  {isAr ? 'نظام PDPL' : 'PDPL'}
                </span>
              </div>
            </div>

            {/* Social Media (All 8 Channels) — بدون بوردر ولا ظل */}
            <div className="space-y-3 pt-2">
              <span className={`block text-xs font-medium ${mutedTextClass}`}>
                {isAr ? 'تابع راش إكس على منصات التواصل' : 'Follow RashX on Social Media'}
              </span>
              <ul className="flex flex-wrap items-center gap-2">
                {socialLinks.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-medium transition-colors ${surfaceClass} ${
                        isDark
                          ? 'text-white hover:bg-[#91B8C0]/20'
                          : 'text-black hover:bg-[#91B8C0]/25'
                      }`}
                    >
                      <SocialIcon type={social.iconType} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nav Columns (4 Columns from FOOTER_COLUMNS) */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:gap-x-8 md:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((col, idx) => (
              <div key={idx} className="space-y-4 text-start">
                <h5
                  className={`flex items-center gap-2 text-xs font-semibold sm:text-sm ${strongTextClass}`}
                >
                  <span
                    aria-hidden="true"
                    className="h-4 w-1 shrink-0 rounded-full bg-[#91B8C0]"
                  />
                  {isAr ? col.titleAr : col.titleEn}
                </h5>
                <ul className={`space-y-3 text-xs font-normal sm:text-[13px] ${mutedTextClass}`}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={`/${locale}${link.href}`}
                        className={`inline-flex flex-wrap items-center gap-1.5 leading-relaxed transition-colors ${
                          isDark ? 'hover:text-[#91B8C0]' : 'hover:text-black'
                        }`}
                      >
                        <span>{isAr ? link.labelAr : link.labelEn}</span>
                        {link.badgeAr && (
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                              isDark
                                ? 'bg-[#91B8C0]/20 text-[#91B8C0]'
                                : 'bg-[#91B8C0]/20 text-black'
                            }`}
                          >
                            {isAr ? link.badgeAr : link.badgeEn}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ============ C. FOUNDER & PAYMENT PARTNERS BAND ============ */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Founder Card */}
          <div
            className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-4 sm:px-6 lg:col-span-5 ${surfaceClass}`}
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#91B8C0]/25 text-xs font-semibold text-black">
                RX
              </div>
              <div className="space-y-0.5 text-start">
                <div className={`text-xs font-semibold sm:text-sm ${strongTextClass}`}>
                  {isAr ? SITE_CONFIG.founder.nameAr : SITE_CONFIG.founder.nameEn}
                </div>
                <div className={`text-[11px] font-normal ${mutedTextClass}`}>
                  {isAr ? SITE_CONFIG.founder.roleAr : SITE_CONFIG.founder.roleEn} •{' '}
                  {SITE_CONFIG.foundedYear}
                </div>
              </div>
            </div>

            <span className="shrink-0 rounded-lg bg-[#F0C5AE]/25 px-2.5 py-1 text-[11px] font-medium text-black">
              {isAr ? 'مؤسس المنظومة' : 'Founder'}
            </span>
          </div>

          {/* Payment Partners Card */}
          {showPaymentPartners && (
            <div
              className={`flex flex-col items-start gap-4 rounded-2xl px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:col-span-7 ${surfaceClass}`}
            >
              <span className={`text-[11px] font-medium sm:text-xs ${mutedTextClass}`}>
                {isAr
                  ? 'بوابات وطرق الدفع المعتمدة بالمملكة:'
                  : 'Supported Payment Partners in KSA:'}
              </span>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
                <div className="transition-opacity hover:opacity-80" title="مدى - Mada">
                  <Image
                    src="/mada.svg"
                    alt="Mada"
                    width={56}
                    height={22}
                    className="h-5 w-auto object-contain"
                  />
                </div>
                <div className="transition-opacity hover:opacity-80" title="Apple Pay">
                  <Image
                    src="/apple-pay.svg"
                    alt="Apple Pay"
                    width={50}
                    height={22}
                    className={`h-4.5 w-auto object-contain sm:h-5 ${
                      isDark ? 'brightness-0 invert' : ''
                    }`}
                  />
                </div>
                <div className="transition-opacity hover:opacity-80" title="stc pay">
                  <Image
                    src="/stc-pay.svg"
                    alt="stc pay"
                    width={64}
                    height={22}
                    className="h-5 w-auto object-contain"
                  />
                </div>
                <div className="transition-opacity hover:opacity-80" title="تمارا - Tamara">
                  <Image
                    src="/tamara.svg"
                    alt="Tamara"
                    width={60}
                    height={22}
                    className="h-5 w-auto object-contain"
                  />
                </div>
                <div className="transition-opacity hover:opacity-80" title="تابي - Tabby">
                  <Image
                    src="/tabby.svg"
                    alt="Tabby"
                    width={54}
                    height={22}
                    className="h-5 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ============ D. BOTTOM BAR ============ */}
        <div
          className={`flex flex-col items-center justify-between gap-5 text-xs sm:flex-row ${mutedTextClass}`}
        >
          {/* Copyright & Legal Links */}
          <div className="order-2 flex flex-col items-center gap-3 sm:order-1 md:flex-row md:gap-6">
            <span className="text-center font-normal leading-relaxed sm:text-start">
              {resolvedCopyright}
            </span>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-medium">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className={`transition-colors ${linkHoverClass}`}
                >
                  {isAr ? link.labelAr : link.labelEn}
                </Link>
              ))}
            </div>
          </div>

          {/* صُنع بحب في الرياض */}
          <span
            role="img"
            aria-label={isAr ? 'صُنع بحب في الرياض' : 'Made with love in Riyadh'}
            className={`order-1 inline-flex items-center justify-center gap-2 text-center text-lg font-semibold sm:order-2 sm:ms-auto sm:gap-1.5 sm:text-xs sm:font-medium ${strongTextClass}`}
          >
            <span aria-hidden="true">{isAr ? 'صُنع بحب' : 'Made with'}</span>
            <Heart
              aria-hidden="true"
              className="h-5 w-5 shrink-0 fill-red-500 text-red-500 sm:h-3.5 sm:w-3.5"
            />
            <span aria-hidden="true">{isAr ? 'في الريـــــــاض' : 'in Riyadh'}</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;