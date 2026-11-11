'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Globe,
  ArrowUpLeft,
  ArrowUpRight,
  Layers,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { MAIN_NAV } from '@/config/nav';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/* =========================================================================
   TYPES & INTERFACES
   ========================================================================= */

export type HeaderThemeVariant = 'mist' | 'white' | 'dark';

export interface HeaderProps {
  locale?: Locale;
  /**
   * Header brand surface theme (default: 'mist')
   * - 'mist': Soft Mist (#F5F7F7) with Pure White inner capsules
   * - 'white': Pure White (#FFFFFF) with Mist Gray (#F5F7F7) inner capsules
   * - 'dark': Pure Black (#000000) with Dark Surface (#0D0D0D) inner capsules
   */
  themeVariant?: HeaderThemeVariant;
  showTopBar?: boolean;
}

/* =========================================================================
   FONT WEIGHT SCALE (موحّد مع الفوتر)
   - font-normal   (400): الوصف والنصوص الفرعية
   - font-medium   (500): الروابط، الشارات، الأزرار الفرعية
   - font-semibold (600): العناوين وأزرار الـ CTA الرئيسية
   ========================================================================= */

export const Header: React.FC<HeaderProps> = ({
  locale = DEFAULT_LOCALE,
  themeVariant = 'mist',
  showTopBar = true,
}) => {
  const pathname = usePathname() || `/${locale}`;
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  // States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileGroup, setActiveMobileGroup] = useState<number | null>(0);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Language switcher path
  const targetLocale = isAr ? 'en' : 'ar';
  const localizedPath = pathname.replace(/^\/(ar|en)/, '');
  const switchLangHref = `/${targetLocale}${localizedPath || ''}`;

  const isDark = themeVariant === 'dark';
  const ArrowIcon = isAr ? ArrowUpLeft : ArrowUpRight;

  // Smart Scroll: Hide on scroll down, Reveal immediately on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setIsAtTop(currentScrollY < 24);

      // Keep header visible if near top, or if menus are open
      if (currentScrollY < 60 || mobileMenuOpen || solutionsOpen) {
        setIsVisible(true);
      } else if (delta > 8) {
        // Scrolling down -> hide smoothly
        setIsVisible(false);
        setSolutionsOpen(false);
      } else if (delta < -6) {
        // Scrolling up -> reveal smoothly
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, solutionsOpen]);

  // Close Mega Menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile fullscreen menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  // Brand Surfaces (Zero Borders, Zero Box Shadows)
  const mainSurfaceClass = isDark
    ? 'bg-[#000000]/95 text-white'
    : themeVariant === 'white'
      ? 'bg-white/95 text-black'
      : 'bg-[#F5F7F7]/95 text-black';

  const capsuleSurfaceClass = isDark
    ? 'bg-[#0D0D0D]'
    : themeVariant === 'white'
      ? 'bg-[#F5F7F7]'
      : 'bg-white';

  const mutedTextClass = isDark ? 'text-[#E5E9E8]/75' : 'text-[#5E6665]';
  const strongTextClass = isDark ? 'text-white' : 'text-black';

  const resolvedLogo = isDark
    ? '/brand/logo/lockup-bilingual/lockup-bilingual-white.svg'
    : '/brand/logo/lockup-bilingual/lockup-bilingual-black.svg';

  const whatsappHref = `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
    SITE_CONFIG.whatsappDefaultMessage
  )}`;

  const isConversionPage = pathname.includes('/demo');

  /* =========================================================================
     1) CONVERSION PAGE MINIMAL HEADER (/demo)
     ========================================================================= */
  if (isConversionPage) {
    return (
      <header
        dir={dir}
        className={`fixed inset-x-0 top-0 z-50 w-full pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 lg:px-8">
          <div
            className={`pointer-events-auto flex items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-md sm:px-6 ${capsuleSurfaceClass}`}
          >
            <div className="flex items-center gap-3">
              <Link href={`/${locale}`} className="shrink-0" aria-label={SITE_CONFIG.name}>
                <Image
                  src={resolvedLogo}
                  alt="RASHX Logo"
                  width={140}
                  height={34}
                  priority
                  className="h-7 w-auto object-contain sm:h-8"
                />
              </Link>
              <span className="hidden items-center gap-1.5 rounded-xl bg-[#F0C5AE]/30 px-3 py-1 text-xs font-medium text-black sm:inline-flex">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isAr ? 'حجز جلسة عرض مخصصة' : 'Custom Demo Session'}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href={`/${locale}`}
                className={`hidden items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-colors md:inline-flex ${mutedTextClass} hover:bg-[#E5E9E8]/60 hover:text-black`}
              >
                <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
              </Link>

              <Link
                href={switchLangHref}
                className="rounded-xl bg-[#E5E9E8]/70 px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-[#91B8C0]/30"
              >
                {isAr ? 'EN' : 'عربي'}
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#91B8C0] px-3.5 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#91B8C0]/85"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span className="hidden font-mono sm:inline" dir="ltr">
                  {SITE_CONFIG.phone}
                </span>
                <span className="sm:hidden">{isAr ? 'تحدث معنا' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }

  /* =========================================================================
     2) MAIN MULTI-DEVICE ADAPTIVE HEADER
     ========================================================================= */
  return (
    <>
      <header
        dir={dir}
        className={`fixed inset-x-0 top-0 z-50 w-full pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* ============ A. SMART TOP BAR (Collapses smoothly when scrolling) ============ */}
        {showTopBar && (
          <div
            className={`pointer-events-auto overflow-hidden bg-[#000000] text-white transition-all duration-300 ease-out ${
              isAtTop ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] sm:px-6 sm:text-xs lg:px-8">
              {/* Right/Start: Compliance & Subdomain Pill */}
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[#F0C5AE] px-2 py-0.5 text-[10px] font-semibold text-black">
                  <ShieldCheck className="h-3 w-3" />
                  <span>ZATCA Phase 2</span>
                </span>

                <span className="truncate font-normal text-[#E5E9E8]">
                  {isAr
                    ? 'منظومة سحابية بنطاق فرعي خاص لكل صالون ومنشأة في المملكة'
                    : 'Dedicated Cloud Subdomain Ecosystem for Every Salon in KSA'}
                </span>
              </div>

              {/* Left/End: Status, Direct Phone & Quick Links */}
              <div className="hidden shrink-0 items-center gap-4 md:flex">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#E5E9E8]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{isAr ? 'الخوادم متصلة 100%' : '100% Online'}</span>
                </span>

                <span className="text-[#5E6665]">•</span>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[#91B8C0] transition-colors hover:text-white"
                >
                  <PhoneCall className="h-3 w-3" />
                  <span dir="ltr">{SITE_CONFIG.phone}</span>
                </a>

                <span className="text-[#5E6665]">•</span>

                <Link
                  href={switchLangHref}
                  className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-[#91B8C0] hover:text-black"
                >
                  <Globe className="h-3 w-3" />
                  <span>{isAr ? 'English' : 'العربية'}</span>
                </Link>
              </div>

              {/* Mobile-Only Top Bar Action */}
              <Link
                href={switchLangHref}
                className="shrink-0 rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white md:hidden"
              >
                {isAr ? 'EN' : 'عربي'}
              </Link>
            </div>
          </div>
        )}

        {/* ============ B. ADAPTIVE MAIN NAVBAR ============ */}
        <div
          className={`w-full transition-all duration-300 ${
            isAtTop ? 'pt-2 sm:pt-3' : 'pt-2'
          }`}
        >
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div
              className={`pointer-events-auto flex items-center justify-between rounded-2xl px-3.5 py-2.5 backdrop-blur-md transition-colors sm:px-5 sm:py-3 ${mainSurfaceClass}`}
            >
              {/* 1. Brand Logo + Badge */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/${locale}`}
                  className="group flex items-center gap-2.5 focus:outline-none"
                  aria-label={SITE_CONFIG.name}
                >
                  <Image
                    src={resolvedLogo}
                    alt="شعار راش إكس – RashX"
                    width={145}
                    height={36}
                    priority
                    className="h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:h-8"
                  />
                </Link>

                {/* Tablet-Only Quick Status Pill */}
                <span className="hidden items-center gap-1.5 rounded-xl bg-[#91B8C0]/20 px-2.5 py-1 text-[11px] font-medium text-black md:inline-flex lg:hidden">
                  <Sparkles className="h-3 w-3" />
                  <span>{isAr ? '10 أنظمة متكاملة' : '10 Integrated Apps'}</span>
                </span>
              </div>

              {/* 2. Desktop Center Floating Nav Island (lg and up) */}
              <nav
                aria-label={isAr ? 'التنقل الرئيسي' : 'Main Navigation'}
                className={`hidden items-center gap-1 rounded-xl p-1.5 lg:flex ${capsuleSurfaceClass}`}
              >
                {MAIN_NAV.map((item) => {
                  const isItemActive =
                    item.href !== '#' && pathname.startsWith(`/${locale}${item.href}`);

                  if (item.dropdown) {
                    return (
                      <div key={item.id} className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setSolutionsOpen(!solutionsOpen)}
                          aria-expanded={solutionsOpen}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors xl:text-[13px] ${
                            solutionsOpen
                              ? 'bg-[#91B8C0] text-black font-semibold'
                              : `${mutedTextClass} hover:bg-[#E5E9E8]/60 hover:text-black`
                          }`}
                        >
                          <span>{isAr ? item.labelAr : item.labelEn}</span>
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              solutionsOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* FLAT UI MEGA MENU (Zero Borders, Zero Shadows, Surface Contrast Only) */}
                        {solutionsOpen && (
                          <div
                            className={`absolute start-0 top-full mt-3 w-[760px] rounded-2xl p-5 xl:w-[820px] ${
                              isDark ? 'bg-[#0D0D0D] text-white' : 'bg-white text-black'
                            }`}
                          >
                            <div className="grid grid-cols-12 gap-5">
                              {/* Mega Menu Columns (8 cols) */}
                              <div className="col-span-8 grid grid-cols-2 gap-5">
                                {item.dropdown.map((group, idx) => (
                                  <div key={idx} className="space-y-3">
                                    <div className="flex items-center gap-2 px-2">
                                      <span
                                        aria-hidden="true"
                                        className={`h-3.5 w-1 rounded-full ${
                                          idx === 0 ? 'bg-[#91B8C0]' : 'bg-[#F0C5AE]'
                                        }`}
                                      />
                                      <h4
                                        className={`text-xs font-semibold ${strongTextClass}`}
                                      >
                                        {isAr ? group.groupTitleAr : group.groupTitleEn}
                                      </h4>
                                    </div>

                                    <div className="space-y-1">
                                      {group.items.map((subItem) => (
                                        <Link
                                          key={subItem.href}
                                          href={`/${locale}${subItem.href}`}
                                          onClick={() => setSolutionsOpen(false)}
                                          className={`group flex items-start gap-3 rounded-xl p-2.5 transition-colors ${
                                            isDark
                                              ? 'hover:bg-white/5'
                                              : 'hover:bg-[#F5F7F7]'
                                          }`}
                                        >
                                          <div
                                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                              idx === 0
                                                ? 'bg-[#91B8C0]/20 text-black group-hover:bg-[#91B8C0]'
                                                : 'bg-[#F0C5AE]/25 text-black group-hover:bg-[#F0C5AE]'
                                            }`}
                                          >
                                            {idx === 0 ? (
                                              <Layers className="h-4 w-4" />
                                            ) : (
                                              <Building2 className="h-4 w-4" />
                                            )}
                                          </div>
                                          <div className="space-y-0.5 text-start">
                                            <div
                                              className={`flex items-center gap-1.5 text-xs font-semibold ${strongTextClass}`}
                                            >
                                              <span>
                                                {isAr ? subItem.labelAr : subItem.labelEn}
                                              </span>
                                              <ArrowIcon className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </div>
                                            <p
                                              className={`line-clamp-1 text-[11px] font-normal ${mutedTextClass}`}
                                            >
                                              {isAr
                                                ? subItem.descriptionAr
                                                : subItem.descriptionEn}
                                            </p>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Featured Brand Highlight Card inside Mega Menu (4 cols) */}
                              <div className="col-span-4 flex flex-col justify-between rounded-2xl bg-[#EFF5F7] p-5 text-black">
                                <div className="space-y-3">
                                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#91B8C0]/30 px-2.5 py-1 text-[11px] font-medium text-black">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    <span>{isAr ? 'معمارية RASHX' : 'RASHX Architecture'}</span>
                                  </span>

                                  <h5 className="text-sm font-semibold leading-snug">
                                    {isAr
                                      ? 'نطاق فرعي مستقل وهوية خاصة لكل منشأة'
                                      : 'Dedicated Subdomain & Custom Brand Identity'}
                                  </h5>

                                  <p className="text-xs font-normal leading-relaxed text-[#5E6665]">
                                    {isAr
                                      ? 'كاشير سريع، حجز مواعيد، إدارة مخزون، عمولات موظفات، وفوترة إلكترونية ZATCA المرحلة الثانية.'
                                      : 'Fast POS, booking, inventory, staff commissions, and ZATCA Phase 2 e-invoicing.'}
                                  </p>
                                </div>

                                <div className="space-y-2 pt-4">
                                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-black">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-black" />
                                    <span>
                                      {isAr ? 'تفعيل فوري خلال دقائق' : 'Instant Cloud Setup'}
                                    </span>
                                  </div>

                                  <Link
                                    href={`/${locale}/demo`}
                                    onClick={() => setSolutionsOpen(false)}
                                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-black/85"
                                  >
                                    <span>
                                      {isAr ? 'جرّب النظام مجاناً' : 'Try Free Demo'}
                                    </span>
                                    <ArrowIcon className="h-3.5 w-3.5" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={`/${locale}${item.href}`}
                      className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors xl:text-[13px] ${
                        isItemActive
                          ? 'bg-[#91B8C0]/30 text-black font-semibold'
                          : `${mutedTextClass} hover:bg-[#E5E9E8]/60 hover:text-black`
                      }`}
                    >
                      {isAr ? item.labelAr : item.labelEn}
                    </Link>
                  );
                })}
              </nav>

              {/* 3. Desktop Actions (lg and up) */}
              <div className="hidden items-center gap-2 lg:flex">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={isAr ? 'تواصل عبر واتساب' : 'WhatsApp Support'}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${capsuleSurfaceClass} text-black hover:bg-[#F0C5AE]/40`}
                >
                  <PhoneCall className="h-4 w-4" />
                </a>

                <Link
                  href={`/${locale}/demo`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#91B8C0] px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#91B8C0]/80 xl:px-5 xl:text-sm"
                >
                  <span>{isAr ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}</span>
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>

              {/* 4. Tablet Layout Actions (md to lg: Compact Action Bar + Menu Button) */}
              <div className="hidden items-center gap-2 md:flex lg:hidden">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-black transition-colors ${capsuleSurfaceClass} hover:bg-[#F0C5AE]/30`}
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                </a>

                <Link
                  href={`/${locale}/demo`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#91B8C0] px-3.5 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#91B8C0]/80"
                >
                  <span>{isAr ? 'احجز عرضاً' : 'Book Demo'}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-black transition-colors ${capsuleSurfaceClass}`}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

              {/* 5. Mobile Layout Actions (< md: Quick CTA Pill + Bento Trigger) */}
              <div className="flex items-center gap-1.5 md:hidden">
                <Link
                  href={`/${locale}/demo`}
                  className="rounded-xl bg-[#91B8C0] px-3 py-2 text-xs font-semibold text-black"
                >
                  {isAr ? 'احجز عرضاً' : 'Demo'}
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                    mobileMenuOpen ? 'bg-black text-white' : `${capsuleSurfaceClass} text-black`
                  }`}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ C. MOBILE & TABLET FULL-SCREEN BENTO DRAWER ============ */}
      {mobileMenuOpen && (
        <div
          dir={dir}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-[#F5F7F7] px-4 pb-6 pt-24 overflow-y-auto lg:hidden"
        >
          <div className="mx-auto w-full max-w-xl space-y-4">
            {/* Highlight Banner inside Mobile Menu */}
            <div className="flex items-center justify-between rounded-2xl bg-[#FDF6F2] p-4 text-black">
              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-black">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{isAr ? 'معتمد من هيئة الزكاة ZATCA' : 'ZATCA Phase 2 Approved'}</span>
                </span>
                <p className="text-xs font-normal text-[#5E6665]">
                  {isAr
                    ? 'نطاق فرعي مستقل + 10 أنظمة سحابية لصالونك'
                    : 'Dedicated Subdomain + 10 Cloud Systems'}
                </p>
              </div>
              <span className="rounded-xl bg-[#F0C5AE] px-2.5 py-1 text-[11px] font-semibold text-black">
                v2.4
              </span>
            </div>

            {/* Accordion Groups for Solutions & Facility Types */}
            {MAIN_NAV[0]?.dropdown?.map((group, idx) => {
              const isExpanded = activeMobileGroup === idx;
              return (
                <div key={idx} className="rounded-2xl bg-white p-4">
                  <button
                    type="button"
                    onClick={() => setActiveMobileGroup(isExpanded ? null : idx)}
                    className="flex w-full items-center justify-between text-start"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`h-4 w-1 rounded-full ${
                          idx === 0 ? 'bg-[#91B8C0]' : 'bg-[#F0C5AE]'
                        }`}
                      />
                      <span className="text-sm font-semibold text-black">
                        {isAr ? group.groupTitleAr : group.groupTitleEn}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-[#5E6665] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {group.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={`/${locale}${subItem.href}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between rounded-xl bg-[#F5F7F7] px-3.5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-[#91B8C0]/25"
                        >
                          <span>{isAr ? subItem.labelAr : subItem.labelEn}</span>
                          <ArrowIcon className="h-3.5 w-3.5 text-[#5E6665]" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bento Grid for Main Direct Links */}
            <div className="grid grid-cols-2 gap-2.5">
              {MAIN_NAV.filter((item) => !item.dropdown).map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl bg-white p-4 text-sm font-semibold text-black transition-colors hover:bg-[#91B8C0]/20"
                >
                  <span>{isAr ? item.labelAr : item.labelEn}</span>
                  <ArrowIcon className="h-4 w-4 text-[#5E6665]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Sticky Bottom Dock inside Mobile Menu */}
          <div className="mx-auto mt-6 w-full max-w-xl space-y-2.5 rounded-2xl bg-white p-4">
            <Link
              href={`/${locale}/demo`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#91B8C0] px-4 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#91B8C0]/85"
            >
              <span>{isAr ? 'احجز عرضاً تجريبياً مجانياً' : 'Book a Free Demo'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#F5F7F7] px-3 py-2.5 text-xs font-medium text-black transition-colors hover:bg-[#F0C5AE]/30"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>{isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}</span>
              </a>

              <Link
                href={switchLangHref}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#F5F7F7] px-3 py-2.5 text-xs font-medium text-black transition-colors hover:bg-[#91B8C0]/25"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{isAr ? 'English (EN)' : 'العربية (AR)'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;