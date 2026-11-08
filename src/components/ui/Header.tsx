'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';
import { Avatar, AvatarStatus } from './Avatar';
import { DropdownButton, DropdownButtonItem } from './DropdownButton';
import { LanguageToggle } from './LanguageToggle';

/* =========================================================================
   TYPES & INTERFACES (أنواع البيانات والواجهات البرمجية)
   ========================================================================= */

export type HeaderVariant = 'app' | 'marketing' | 'minimal';

export interface HeaderNavLink {
  label: string;
  href: string;
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'neutral';
  isExternal?: boolean;
}

export interface HeaderUser {
  name: string;
  email?: string;
  avatarId?: number;
  avatarSrc?: string;
  status?: AvatarStatus;
  role?: string;
}

export interface HeaderProps {
  /** Style variant of the header */
  variant?: HeaderVariant;
  /** Whether the header sticks to the top of the viewport (default: true) */
  sticky?: boolean;
  /** Custom logo source override */
  logoSrc?: string;
  /** Logo link href (default: '/') */
  logoHref?: string;
  /** Optional badge next to the logo */
  badgeText?: string;
  /** Main navigation links */
  navLinks?: HeaderNavLink[];
  /** Logged-in user information */
  user?: HeaderUser;
  /** User dropdown menu items */
  userMenuItems?: DropdownButtonItem[];
  /** Callback when user clicks on their avatar */
  onAvatarClick?: () => void;
  /** Whether to show notification bell (default: true in 'app' variant) */
  showNotifications?: boolean;
  /** Unread notification count badge */
  notificationCount?: number;
  /** Callback when user clicks the notification bell */
  onNotificationsClick?: () => void;
  /** Whether to show the LanguageToggle component (default: true) */
  showLanguageToggle?: boolean;
  /** Primary Call-to-Action button */
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Secondary Call-to-Action button (for marketing variant) */
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Optional announcement banner displayed directly above the header */
  announcement?: React.ReactNode;
  /** Additional custom actions / children on the right */
  children?: React.ReactNode;
  /** Extra container className */
  className?: string;
}

/* =========================================================================
   DEFAULT NAVIGATION PRESETS
   ========================================================================= */

const DEFAULT_MARKETING_LINKS: HeaderNavLink[] = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الحلول والخدمات', href: '#features' },
  { label: 'الفوترة الإلكترونية', href: '#e-invoicing', badge: 'ZATCA 2' },
  { label: 'الأسعار والباقات', href: '#pricing' },
  { label: 'تواصل معنا', href: '#contact' },
];

const DEFAULT_APP_LINKS: HeaderNavLink[] = [
  { label: 'لوحة التحكم', href: '/dashboard' },
  { label: 'الفواتير', href: '/invoices' },
  { label: 'العملاء', href: '/customers' },
  { label: 'التقارير', href: '/reports' },
];

/* =========================================================================
   MAIN COMPONENT: Header
   ========================================================================= */

export const Header: React.FC<HeaderProps> = ({
  variant = 'app',
  sticky = true,
  logoSrc = '/brand/logo/lockup-bilingual/lockup-bilingual-black.svg',
  logoHref = '/',
  badgeText = 'مكتبة المكونات UI',
  navLinks,
  user,
  userMenuItems,
  onAvatarClick,
  showNotifications = true,
  notificationCount = 0,
  onNotificationsClick,
  showLanguageToggle = true,
  primaryAction,
  secondaryAction,
  announcement,
  children,
  className = '',
}) => {
  const pathname = usePathname() ?? '';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu when route changes during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Resolve links according to variant
  const links =
    navLinks || (variant === 'marketing' ? DEFAULT_MARKETING_LINKS : DEFAULT_APP_LINKS);

  const defaultUserMenuItems: DropdownButtonItem[] = [
    {
      label: 'تخصيص الأفاتار (3D Animoji)',
      onClick: () => onAvatarClick?.(),
    },
    { label: 'الملف الشخصي', onClick: () => {} },
    { label: 'إعدادات المنظومة', onClick: () => {} },
    { label: 'تسجيل الخروج', danger: true, onClick: () => {} },
  ];

  const resolvedUserMenuItems = userMenuItems || defaultUserMenuItems;

  return (
    <div
      dir="rtl"
      className={`${sticky ? 'sticky top-0 z-40' : 'relative z-20'} w-full`}
    >
      {/* Optional Top Announcement Banner */}
      {announcement && (
        <div className="w-full bg-[#F0C5AE] text-black text-xs font-semibold py-2 px-4 text-center border-b border-[#e0b59e] flex items-center justify-center gap-2">
          {announcement}
        </div>
      )}

      {/* Main Navbar Header */}
      <header
        className={`w-full border-b border-[#E5E9E8] bg-white/95 backdrop-blur-md transition-all ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* 1. LEFT SIDE (Brand Logo & Optional Badge / Links) */}
          <div className="flex items-center gap-6">
            <Link
              href={logoHref}
              className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#91B8C0] rounded-lg p-0.5"
            >
              <Image
                src={logoSrc}
                alt="RASHX Brand Logo"
                width={160}
                height={36}
                priority
                className="h-7 sm:h-8 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            {badgeText && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#91B8C0]/20 text-[#1e464e] border border-[#91B8C0]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#91B8C0]" />
                {badgeText}
              </span>
            )}

            {/* Desktop Navigation Links */}
            {variant !== 'minimal' && links && links.length > 0 && (
              <nav className="hidden lg:flex items-center gap-1.5 pr-2">
                {links.map((link, idx) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname.startsWith(link.href));

                  return (
                    <Link
                      key={idx}
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 ${
                        isActive
                          ? 'bg-[#E5E9E8]/70 text-black font-bold'
                          : 'text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/40'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#F0C5AE] text-black">
                          {link.badge}
                        </span>
                      )}
                      {link.isExternal && <ArrowUpRight className="w-3 h-3 text-[#5E6665]" />}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* 2. RIGHT SIDE (Language, Notifications, Actions & User Avatar) */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Custom Children / Extra Slot */}
            {children}

            {/* Language Toggle */}
            {showLanguageToggle && (
              <div className="hidden sm:block">
                <LanguageToggle size="sm" variant="button" />
              </div>
            )}

            {/* Notification Bell (App Variant) */}
            {showNotifications && (
              <button
                type="button"
                onClick={onNotificationsClick}
                className="relative p-2 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 transition-colors cursor-pointer border border-[#E5E9E8]"
                aria-label="الإشعارات والتنبيهات"
                title="الإشعارات والتنبيهات"
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-bold ring-2 ring-white">
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </span>
                )}
              </button>
            )}

            {/* Marketing Secondary Action (e.g. "تسجيل الدخول") */}
            {secondaryAction && (
              <Button
                variant="outline"
                size="sm"
                onClick={secondaryAction.onClick}
                className="hidden sm:inline-flex"
              >
                {secondaryAction.href ? (
                  <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                ) : (
                  secondaryAction.label
                )}
              </Button>
            )}

            {/* Primary Action Button (e.g. "إنشاء فاتورة" or "ابدأ الآن") */}
            {primaryAction && (
              <Button
                variant="primary"
                size="sm"
                onClick={primaryAction.onClick}
                className="hidden xs:inline-flex font-bold"
              >
                {primaryAction.href ? (
                  <Link href={primaryAction.href}>{primaryAction.label}</Link>
                ) : (
                  primaryAction.label
                )}
              </Button>
            )}

            {/* User Account Dropdown (App Variant) */}
            {user && (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-col text-left rtl:text-right">
                  <span className="text-xs font-bold text-black leading-tight">
                    {user.name}
                  </span>
                  {user.role && (
                    <span className="text-[10px] text-[#5E6665] leading-tight">
                      {user.role}
                    </span>
                  )}
                </div>

                <DropdownButton
                  label={
                    <Avatar
                      animojiId={user.avatarId}
                      src={user.avatarSrc}
                      name={user.name}
                      size="sm"
                      status={user.status || 'online'}
                      className="cursor-pointer"
                    />
                  }
                  variant="ghost"
                  size="sm"
                  items={resolvedUserMenuItems}
                />
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle Button */}
            {variant !== 'minimal' && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 transition-colors border border-[#E5E9E8] cursor-pointer"
                aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-black" />
                ) : (
                  <Menu className="w-5 h-5 text-black" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* 3. MOBILE RESPONSIVE DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5E9E8] bg-white px-6 py-6 space-y-5 animate-in slide-in-from-top-2 duration-200 shadow-xl">
            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#E5E9E8]/80 text-black font-bold'
                        : 'text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/40'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold rounded bg-[#F0C5AE] text-black">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions Strip */}
            <div className="pt-4 border-t border-[#E5E9E8] space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#5E6665] font-medium">اللغة المفضلة:</span>
                <LanguageToggle size="sm" variant="button" />
              </div>

              {primaryAction && (
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    primaryAction.onClick?.();
                  }}
                >
                  {primaryAction.href ? (
                    <Link href={primaryAction.href}>{primaryAction.label}</Link>
                  ) : (
                    primaryAction.label
                  )}
                </Button>
              )}

              {secondaryAction && (
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    secondaryAction.onClick?.();
                  }}
                >
                  {secondaryAction.href ? (
                    <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                  ) : (
                    secondaryAction.label
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
