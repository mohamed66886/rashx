'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { Button } from './Button';

/* =========================================================================
   TYPES & INTERFACES
   ========================================================================= */

export type FooterVariant = 'detailed' | 'simple' | 'dashboard';
export type FooterBackgroundVariant = 'mist' | 'black' | 'dark' | 'peach' | 'blue' | 'white';

export interface FooterLinkItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterSocialLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export interface FooterProps {
  /** Footer layout variant (default: 'detailed') */
  variant?: FooterVariant;
  /**
   * Footer brand background theme (default: 'mist')
   * - 'mist': Brand Mist Gray (#F5F7F7 / #E5E9E8)
   * - 'black' / 'dark': Brand Pure Black (#000000)
   * - 'peach': Brand Warm Peach (#FDF6F2 / #F0C5AE)
   * - 'blue': Brand Dusty Blue (#EFF5F7 / #91B8C0)
   * - 'white': Pure Base White (#FFFFFF)
   */
  bgVariant?: FooterBackgroundVariant;
  logoSrc?: string;
  description?: string;
  vatNumber?: string;
  columns?: FooterColumn[];
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
  showPaymentPartners?: boolean;
  /** Social links (default: X, LinkedIn, Instagram, YouTube). Pass [] to hide */
  socialLinks?: FooterSocialLink[];
  copyright?: string;
  className?: string;
}

/* =========================================================================
   DEFAULT DATA
   ========================================================================= */

const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'الأنظمة والحلول',
    links: [
      { label: 'الفوترة الإلكترونية المعتمدة', href: '/invoices', badge: 'ZATCA 2' },
      { label: 'نقطة البيع السريعة (POS)', href: '/pos' },
      { label: 'إدارة المخزون والمشتريات', href: '/inventory' },
      { label: 'إدارة العملاء ونقاط الولاء', href: '/crm' },
      { label: 'التقارير والإقرارات الضريبية', href: '/reports' },
    ],
  },
  {
    title: 'الامتثال واللوائح',
    links: [
      { label: 'متطلبات هيئة الزكاة (ZATCA)', href: '#zatca' },
      { label: 'نظام حماية البيانات الشخصية (PDPL)', href: '#pdpl' },
      { label: 'ضوابط الفوترة والربط والتكامل', href: '#integration' },
      { label: 'معايير الأمان والتشفير المالي', href: '#security' },
      { label: 'التحديثات والتعاميم المالية', href: '#updates' },
    ],
  },
  {
    title: 'الموارد والدعم',
    links: [
      { label: 'مركز المساعدة والأسئلة الشائعة', href: '#help' },
      { label: 'توثيق واجهة المبرمجين (API Docs)', href: '#api', isExternal: true },
      { label: 'حالة الخوادم والمنظومة', href: '#status', badge: '100% متصل' },
      { label: 'دليل النماذج والسندات', href: '#templates' },
      { label: 'تواصل مع الدعم الفني', href: '#support' },
    ],
  },
  {
    title: 'الشركة والسياسات',
    links: [
      { label: 'عن منصة راش إكس (RASHX)', href: '#about' },
      { label: 'الشروط والأحكام المعتمدة', href: '#terms' },
      { label: 'سياسة الخصوصية وأمان البيانات', href: '#privacy' },
      { label: 'سياسة ملفات تعريف الارتباط', href: '#cookies' },
      { label: 'الوظائف وفريق العمل', href: '#careers' },
    ],
  },
];

/* =========================================================================
   SOCIAL ICONS & DEFAULT LINKS
   (غيّر الروابط '#' بحسابات راش إكس الحقيقية)
   ========================================================================= */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const XIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg {...iconProps}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg {...iconProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg {...iconProps}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const DEFAULT_SOCIAL_LINKS: FooterSocialLink[] = [
  { name: 'X (تويتر)', href: '#', icon: <XIcon /> },
  { name: 'لينكدإن', href: '#', icon: <LinkedinIcon /> },
  { name: 'إنستغرام', href: '#', icon: <InstagramIcon /> },
  { name: 'يوتيوب', href: '#', icon: <YoutubeIcon /> },
];

/* =========================================================================
   FONT WEIGHT SCALE (موحّد في كل الفوتر)
   - font-normal   (400): الفقرات والنصوص الوصفية
   - font-medium   (500): الروابط، الأسماء الصغيرة، الشارات
   - font-semibold (600): العناوين
   ========================================================================= */

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export const Footer: React.FC<FooterProps> = ({
  variant = 'detailed',
  bgVariant = 'mist',
  logoSrc,
  description = 'منظومة راش إكس (RASHX) للتقنية المالية والحلول السحابية المعتمدة وفق اشتراطات هيئة الزكاة والضريبة والجمارك (ZATCA Phase 2). حلول مبتكرة للفوترة الإلكترونية، إدارة المبيعات، ومراقبة المخزون.',
  vatNumber = '310489201900003',
  columns = DEFAULT_FOOTER_COLUMNS,
  showNewsletter = true,
  onNewsletterSubmit,
  showPaymentPartners = true,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  copyright,
  className = '',
}) => {
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

  const defaultCopyright = 'جميع الحقوق محفوظة © 2026 لمنظومة راش إكس للتقنية المالية — RASHX';
  const resolvedCopyright = copyright || defaultCopyright;

  // نفس ألوان البراند بدون أي تغيير — بدون بوردر
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

  // الأسطح (كروت/شارات) تتميز بالخلفية فقط بدل البوردر
  const surfaceClass = isDark
    ? 'bg-[#0D0D0D]'
    : bgVariant === 'white'
      ? 'bg-[#F5F7F7]'
      : 'bg-white';

  /* -----------------------------------------------------------------------
     1) DASHBOARD (compact)
     ----------------------------------------------------------------------- */
  if (variant === 'dashboard') {
    return (
      <footer
        dir="rtl"
        className={`mt-auto w-full ${currentThemeClass} px-4 py-3 text-xs sm:px-6 sm:py-4 ${className}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-right">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <span className={`flex items-center gap-1.5 font-medium ${strongTextClass}`}>
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              حالة الخوادم: متصلة 100%
            </span>
            <span className="hidden sm:inline">•</span>
            <span className={`font-normal ${mutedTextClass}`}>{resolvedCopyright}</span>
          </div>

          <div className={`flex items-center gap-3 text-[11px] font-normal sm:gap-4 ${mutedTextClass}`}>
            <Link href="#help" className={`transition-colors ${linkHoverClass}`}>
              مركز المساعدة
            </Link>
            <span>•</span>
            <Link href="#privacy" className={`transition-colors ${linkHoverClass}`}>
              الخصوصية
            </Link>
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
        dir="rtl"
        className={`mt-auto w-full ${currentThemeClass} px-4 py-6 sm:px-6 sm:py-8 ${className}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row md:gap-6">
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
            <Link href="/" className="shrink-0">
              <Image
                src={resolvedLogo}
                alt="RASHX Logo"
                width={140}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
            <span className={`text-center text-xs font-normal md:text-right ${mutedTextClass}`}>
              {resolvedCopyright}
            </span>
          </div>

          <nav
            className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium ${mutedTextClass}`}
          >
            <Link href="#terms" className={`transition-colors ${linkHoverClass}`}>
              الشروط والأحكام
            </Link>
            <Link href="#privacy" className={`transition-colors ${linkHoverClass}`}>
              سياسة الخصوصية
            </Link>
            <Link href="#cookies" className={`transition-colors ${linkHoverClass}`}>
              إعدادات الكوكيز
            </Link>
            <Link href="#contact" className={`transition-colors ${linkHoverClass}`}>
              تواصل معنا
            </Link>
          </nav>
        </div>
      </footer>
    );
  }

  /* -----------------------------------------------------------------------
     3) DETAILED
     الترتيب الجديد:
       A. النشرة البريدية (شريط كامل العرض)
       B. البراند + أعمدة الروابط
       C. شريط وسائل الدفع
       D. الشريط السفلي (الحقوق + السوشيال + صُنع بحب)
     ----------------------------------------------------------------------- */
  return (
    <footer dir="rtl" className={`mt-auto w-full ${currentThemeClass} ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-6 pt-10 sm:gap-12 sm:px-6 sm:pb-8 sm:pt-12 lg:gap-14 lg:px-8 lg:pt-16">
        {/* ============ A. NEWSLETTER BAND ============ */}
        {showNewsletter && (
          <div
            className={`flex flex-col gap-5 rounded-2xl p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-8 ${surfaceClass}`}
          >
            <div className="space-y-1.5 text-right lg:max-w-md">
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
                  اشترك في النشرة الدورية لـ RASHX
                </h4>
              </div>
              <p className={`text-xs font-normal leading-relaxed sm:text-sm ${mutedTextClass}`}>
                احصل أولاً بأول على تحديثات الأنظمة المالية، تعاميم هيئة الزكاة، والميزات البرمجية الجديدة.
              </p>
            </div>

            <div className="w-full lg:max-w-lg lg:flex-1">
              {isSubscribed ? (
                <div className="flex items-center gap-2 rounded-xl bg-[#91B8C0]/20 p-3 text-xs font-medium text-black sm:text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-black" />
                  <span>شكراً لاشتراكك! ستصلك أحدث المستجدات والأنظمة المالية مباشرة على بريدك.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني (e.g. name@company.sa)"
                    required
                    className={`w-full flex-1 rounded-xl px-4 py-2.5 text-xs font-normal outline-none transition-colors focus-visible:outline-2 focus-visible:outline-[#91B8C0] sm:text-sm ${
                      isDark
                        ? 'bg-[#000000] text-white placeholder:text-[#5E6665]'
                        : 'bg-[#F5F7F7] text-black placeholder:text-[#5E6665]/60'
                    }`}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full shrink-0 gap-1.5 font-medium sm:w-auto"
                  >
                    <Send className="h-3.5 w-3.5 rtl:rotate-180" />
                    <span>اشترك الآن</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ============ B. BRAND + LINK COLUMNS ============ */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4 text-right lg:col-span-4 xl:col-span-3">
            <Link href="/" className="group inline-block">
              <Image
                src={resolvedLogo}
                alt="RASHX Logo"
                width={170}
                height={38}
                className="h-8.5 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            <p className={`max-w-md text-xs font-normal leading-loose sm:text-sm ${mutedTextClass}`}>
              {description}
            </p>

            {/* Compliance badges — بدون بوردر ولا ظل */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium ${
                  isDark ? 'bg-[#91B8C0]/15 text-white' : `${surfaceClass} text-black`
                }`}
                title="نظام الفوترة الإلكترونية المعتمد من ZATCA (المرحلة الثانية)"
              >
                <Image
                  src="/zatca.svg"
                  alt="ZATCA Logo"
                  width={80}
                  height={20}
                  className={`h-3.5 w-auto ${isDark ? 'brightness-0 invert' : ''}`}
                />
                <span className="text-[11px] font-medium text-[#91B8C0]">المرحلة الثانية</span>
              </div>

              <div
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium ${
                  isDark ? 'bg-[#F0C5AE]/15 text-white' : `${surfaceClass} text-black`
                }`}
                title="متوافق مع الهيئة السعودية للبيانات والذكاء الاصطناعي (SDAIA)"
              >
                <Image
                  src="/sdaia.svg"
                  alt="SDAIA Logo"
                  width={75}
                  height={20}
                  className={`h-3.5 w-auto ${isDark ? 'brightness-0 invert' : ''}`}
                />
                <span className="text-[11px] font-medium text-[#F0C5AE]">نظام PDPL</span>
              </div>

              {vatNumber && (
                <div
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-medium ${
                    isDark
                      ? 'bg-[#F0C5AE]/15 text-[#F0C5AE]'
                      : 'bg-[#F0C5AE]/25 text-black'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#F0C5AE]" />
                  <span>الرقم الضريبي: {vatNumber}</span>
                </div>
              )}
            </div>

            {/* Social media — أيقونات بدون بوردر ولا ظل */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="space-y-3 pt-3">
                <span className={`block text-xs font-medium ${mutedTextClass}`}>تابعنا على</span>
                <ul className="flex flex-wrap items-center gap-2">
                  {socialLinks.map((s, idx) => (
                    <li key={idx}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        title={s.name}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-medium transition-colors ${surfaceClass} ${
                          isDark
                            ? 'text-white hover:bg-[#91B8C0]/20'
                            : 'text-black hover:bg-[#91B8C0]/25'
                        }`}
                      >
                        {s.icon || s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns && columns.length > 0 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:gap-x-8 md:grid-cols-4 lg:col-span-8 lg:grid-cols-2 lg:gap-y-10 xl:col-span-9 xl:grid-cols-4">
              {columns.map((col, idx) => (
                <div key={idx} className="space-y-4 text-right">
                  <h5
                    className={`flex items-center gap-2 text-xs font-semibold sm:text-sm ${strongTextClass}`}
                  >
                    <span aria-hidden="true" className="h-4 w-1 shrink-0 rounded-full bg-[#91B8C0]" />
                    {col.title}
                  </h5>
                  <ul className={`space-y-3 text-xs font-normal sm:text-[13px] ${mutedTextClass}`}>
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          href={link.href}
                          target={link.isExternal ? '_blank' : undefined}
                          rel={link.isExternal ? 'noopener noreferrer' : undefined}
                          className={`inline-flex flex-wrap items-center gap-1.5 leading-relaxed transition-colors ${
                            isDark ? 'hover:text-[#91B8C0]' : 'hover:text-black'
                          }`}
                        >
                          <span>{link.label}</span>
                          {link.badge && (
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                                isDark
                                  ? 'bg-[#91B8C0]/20 text-[#91B8C0]'
                                  : 'bg-[#91B8C0]/20 text-black'
                              }`}
                            >
                              {link.badge}
                            </span>
                          )}
                          {link.isExternal && <ExternalLink className="h-3 w-3 opacity-60" />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============ C. PAYMENT PARTNERS ============ */}
        {showPaymentPartners && (
          <div
            className={`flex flex-col items-start gap-4 rounded-2xl px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between ${surfaceClass}`}
          >
            <span className={`text-[11px] font-medium sm:text-xs ${mutedTextClass}`}>
              بوابات وطرق الدفع والتحصيل المعتمدة بالمملكة:
            </span>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-7">
              <div className="transition-opacity hover:opacity-80" title="مدى - Mada">
                <Image src="/mada.svg" alt="Mada" width={56} height={22} className="h-5 w-auto object-contain" />
              </div>
              <div className="transition-opacity hover:opacity-80" title="Apple Pay">
                <Image
                  src="/apple-pay.svg"
                  alt="Apple Pay"
                  width={50}
                  height={22}
                  className={`h-4.5 w-auto object-contain sm:h-5 ${isDark ? 'brightness-0 invert' : ''}`}
                />
              </div>
              <div className="transition-opacity hover:opacity-80" title="stc pay">
                <Image src="/stc-pay.svg" alt="stc pay" width={64} height={22} className="h-5 w-auto object-contain" />
              </div>
              <div className="transition-opacity hover:opacity-80" title="تمارا - Tamara">
                <Image src="/tamara.svg" alt="Tamara" width={60} height={22} className="h-5 w-auto object-contain" />
              </div>
              <div className="transition-opacity hover:opacity-80" title="تابي - Tabby">
                <Image src="/tabby.svg" alt="Tabby" width={54} height={22} className="h-5 w-auto object-contain" />
              </div>
            </div>
          </div>
        )}

        {/* ============ D. BOTTOM BAR ============ */}
        <div
          className={`flex flex-col items-center gap-5 text-xs sm:flex-row sm:gap-5 ${mutedTextClass}`}
        >
          {/* الحقوق: ثاني حاجة على الموبايل، أول حاجة (يمين) من sm وطالع */}
          <span className="order-2 text-center font-normal leading-relaxed sm:order-1 sm:text-right">
            {resolvedCopyright}
          </span>

          {/* صُنع بحب في الرياض — على الموبايل: في النص وكبيرة وفوق. من sm وطالع: صغيرة في الشريط زي الأول */}
          <span
            role="img"
            aria-label="صُنع بحب في الرياض"
            className={`order-1 inline-flex items-center justify-center gap-2 text-center text-lg font-semibold sm:order-2 sm:ms-auto sm:gap-1.5 sm:text-xs sm:font-medium ${strongTextClass}`}
          >
            <span aria-hidden="true">صُنع بحب</span>
            <Heart
              aria-hidden="true"
              className="h-5 w-5 shrink-0 fill-red-500 text-red-500 sm:h-3.5 sm:w-3.5"
            />
            <span aria-hidden="true">في الريـــــــاض</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;