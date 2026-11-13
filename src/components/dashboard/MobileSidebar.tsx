'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  UserPlus,
  MoreHorizontal,
  Database,
  Users,
  Settings,
  ChevronLeft,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { getPlatformNavItems } from './nav-data';
import { usePresence } from '@/hooks/usePresence';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onToggle?: () => void;
  onLogoutRequest: () => void;
  uploadedInvoicesCount?: number;
  invoicesBadge?: React.ReactNode;
}

/**
 * Two dedicated layouts (hidden from lg up, where the desktop sidebar takes over):
 *  - Mobile (< sm)   : full-width bottom tab bar (icon above label, active icon in a pill)
 *                      + a bottom sheet for "More".
 *  - Tablet (sm - lg): floating, centered pill nav (icon beside label)
 *                      + a side drawer that slides in from the end for "More".
 */
export function MobileSidebar({
  isOpen,
  onClose,
  onOpen,
  onToggle,
  onLogoutRequest,
  uploadedInvoicesCount,
  invoicesBadge,
}: MobileSidebarProps) {
  const { admin, openAvatarPicker } = useDashboardAuth();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  const isAr = locale === 'ar';

  const navItems = getPlatformNavItems(locale, { uploadedInvoices: uploadedInvoicesCount });
  const { mounted, visible } = usePresence(isOpen, 280);

  // ESC to close + lock body scroll while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!admin) return null;

  const primaryTabs = [
    {
      title: 'الرئيسية',
      titleEn: 'Overview',
      href: `/${locale}/dashboard`,
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: 'الصالونات',
      titleEn: 'Tenants',
      href: `/${locale}/dashboard/tenants`,
      icon: Building2,
    },
    {
      title: 'الاشتراكات',
      titleEn: 'Plans',
      href: `/${locale}/dashboard/subscriptions`,
      icon: CreditCard,
    },
    {
      title: 'الطلبات',
      titleEn: 'Leads',
      href: `/${locale}/dashboard/leads`,
      icon: UserPlus,
      badge: 'جديد',
    },
  ];

  const isMoreActive =
    pathname?.includes('/dashboard/database') ||
    pathname?.includes('/dashboard/admins') ||
    pathname?.includes('/dashboard/settings') ||
    isOpen;

  const handleMoreClick = () => {
    if (onToggle) onToggle();
    else if (isOpen) onClose();
    else if (onOpen) onOpen();
  };

  const chevron = (
    <ChevronLeft className="w-4 h-4 shrink-0 text-ink-muted/60 ltr:rotate-180" />
  );

  const openAvatar = () => {
    onClose();
    openAvatarPicker();
  };

  /* ───────── "More" content, shared by the bottom sheet and the side drawer ───────── */
  const moreContent = (
    <>
      {/* Group 1: system tools */}
      <section>
        <h3 className="text-[11px] font-bold text-ink-muted px-3 mb-1.5">
          البيانات والمنظومة الحية
        </h3>
        <div className="bg-base rounded-2xl border border-neutral divide-y divide-neutral overflow-hidden">
          <Link
            href={`/${locale}/dashboard/database`}
            onClick={onClose}
            className="flex items-center justify-between gap-3 p-3.5 hover:bg-neutral/40 active:bg-neutral transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-primary text-ink">
                <Database className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-ink truncate">
                  مركز قاعدة بيانات فايربيز والجلسات
                </div>
                <div className="text-[10px] text-ink-muted truncate">
                  مراقبة Firestore وسجلات الدخول
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Live
              </span>
              {chevron}
            </div>
          </Link>

          <Link
            href={`/${locale}/dashboard/admins`}
            onClick={onClose}
            className="flex items-center justify-between gap-3 p-3.5 hover:bg-neutral/40 active:bg-neutral transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-warm-peach text-ink">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-ink truncate">
                  مسؤولو المنصة والصلاحيات
                </div>
                <div className="text-[10px] text-ink-muted truncate">
                  فريق الإدارة المركزية والأذونات
                </div>
              </div>
            </div>
            {chevron}
          </Link>

          <Link
            href={`/${locale}/dashboard/settings`}
            onClick={onClose}
            className="flex items-center justify-between gap-3 p-3.5 hover:bg-neutral/40 active:bg-neutral transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-neutral text-ink">
                <Settings className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-ink truncate">
                  إعدادات المنظومة والنطاقات
                </div>
                <div className="text-[10px] text-ink-muted truncate">
                  نطاق Wildcard والتكاملات التقنية
                </div>
              </div>
            </div>
            {chevron}
          </Link>
        </div>
      </section>

      {/* Group 2: all platform sections */}
      <section>
        <h3 className="text-[11px] font-bold text-ink-muted px-3 mb-1.5">كافة أقسام المنصة</h3>
        <div className="bg-base rounded-2xl border border-neutral divide-y divide-neutral overflow-hidden">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname?.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-between gap-3 p-3.5 border-s-4 transition-colors active:bg-neutral ${
                  isActive
                    ? 'bg-primary/15 border-primary'
                    : 'border-transparent hover:bg-neutral/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-ink' : 'text-ink-muted'}`}
                  />
                  <span
                    className={`text-xs truncate ${
                      isActive ? 'text-ink font-bold' : 'text-ink'
                    }`}
                  >
                    {isAr ? item.title : item.titleEn}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.href.endsWith('/dashboard/invoices') && invoicesBadge !== undefined ? (
                    invoicesBadge
                  ) : item.badge ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-warm-peach text-ink">
                      {item.badge}
                    </span>
                  ) : null}
                  {chevron}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Group 3: account + session */}
      <section>
        <div className="flex items-center justify-between px-3 mb-1.5">
          <h3 className="text-[11px] font-bold text-ink-muted">الحساب والجلسة النشطة</h3>
          <button
            type="button"
            onClick={openAvatar}
            className="flex items-center gap-1 text-[10px] font-bold text-ink underline decoration-primary decoration-2 underline-offset-4"
          >
            <Sparkles className="w-3 h-3" />
            <span>تخصيص الأفاتار</span>
          </button>
        </div>

        <div className="bg-base rounded-2xl border border-neutral p-3.5 space-y-3">
          <button
            type="button"
            onClick={openAvatar}
            className="group w-full flex items-center gap-3 text-start"
            title="انقر لتخصيص الأفاتار (3D Animoji)"
          >
            <div className="relative shrink-0">
              <Avatar
                name={admin.name}
                animojiId={admin.avatarId || 1}
                size="md"
                status="online"
                className="group-hover:ring-2 group-hover:ring-primary transition-all"
              />
              <span className="absolute -bottom-1 -end-1 grid place-items-center w-4 h-4 rounded-full bg-primary text-ink ring-2 ring-base">
                <Sparkles className="w-2.5 h-2.5" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-ink truncate">{admin.name}</div>
              <div className="text-[11px] text-ink-muted truncate font-mono" dir="ltr">
                {admin.email}
              </div>
              <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-warm-peach text-ink">
                {admin.title}
              </span>
            </div>
          </button>

          <div className="p-2.5 rounded-xl bg-neutral/40 border border-neutral flex items-center justify-between text-[10px]">
            <span className="text-ink-muted flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              قاعدة بيانات Firebase
            </span>
            <span className="font-mono text-ink font-bold">{process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Connected'}</span>
          </div>
        </div>
      </section>

      {/* Group 4: logout */}
      <div className="bg-base rounded-2xl border border-neutral overflow-hidden">
        <button
          type="button"
          onClick={() => {
            onClose();
            onLogoutRequest();
          }}
          className="w-full flex items-center justify-center gap-2 p-3.5 text-red-600 hover:bg-rose-50 active:bg-rose-100 transition-colors text-xs font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج من إدارة راش إكس</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          1. BOTTOM NAV
             mobile : full-width bar, icon above label
             tablet : floating centered pill, icon beside label
         ═══════════════════════════════════════════════════════════ */}
      <nav
        aria-label="التنقل السفلي"
        className="lg:hidden fixed z-40 bottom-0 inset-x-0 bg-base border-t border-neutral sm:bottom-4 sm:mx-auto sm:w-fit sm:border sm:rounded-full sm:shadow-lg"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="grid grid-cols-5 items-center px-1 pt-1.5 pb-1 sm:flex sm:gap-1 sm:p-1.5">
          {primaryTabs.map((tab) => {
            const isActive = tab.exact
              ? pathname === tab.href
              : pathname?.startsWith(tab.href);
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={onClose}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 active:scale-95 transition-all sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5 sm:rounded-full ${
                  isActive
                    ? 'text-ink sm:bg-primary'
                    : 'text-ink-muted hover:text-ink sm:hover:bg-neutral/60'
                }`}
              >
                <span
                  className={`relative flex items-center justify-center px-4 py-1 rounded-full transition-colors sm:p-0 sm:bg-transparent ${
                    isActive ? 'bg-primary' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.75} />
                  {tab.badge && (
                    <span className="absolute -top-1 -end-1 sm:-end-2 px-1.5 rounded-full bg-warm-peach text-ink border border-ink-muted/30 text-[8px] font-bold leading-4">
                      {tab.badge}
                    </span>
                  )}
                </span>
                <span
                  className={`text-[10px] sm:text-xs tracking-tight truncate max-w-full ${
                    isActive ? 'font-bold' : 'font-medium'
                  }`}
                >
                  {isAr ? tab.title : tab.titleEn}
                </span>
              </Link>
            );
          })}

          {/* More */}
          <button
            type="button"
            onClick={handleMoreClick}
            aria-expanded={isOpen}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 px-1 active:scale-95 transition-all sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5 sm:rounded-full ${
              isMoreActive
                ? 'text-ink sm:bg-primary'
                : 'text-ink-muted hover:text-ink sm:hover:bg-neutral/60'
            }`}
          >
            <span
              className={`relative flex items-center justify-center px-4 py-1 rounded-full transition-colors sm:p-0 sm:bg-transparent ${
                isMoreActive ? 'bg-primary' : ''
              }`}
            >
              <MoreHorizontal className="w-5 h-5" strokeWidth={isMoreActive ? 2.5 : 1.75} />
              <span className="absolute top-0 end-1 sm:-top-0.5 sm:-end-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-base" />
            </span>
            <span
              className={`text-[10px] sm:text-xs tracking-tight truncate ${
                isMoreActive ? 'font-bold' : 'font-medium'
              }`}
            >
              المزيد
            </span>
          </button>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          2. "MORE" PANEL
             mobile : bottom sheet
             tablet : side drawer from the end
         ═══════════════════════════════════════════════════════════ */}
      {mounted && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            data-state={visible ? 'open' : 'closed'}
            className="fixed inset-0 bg-ink/60 data-[state=open]:animate-rx-fade-in data-[state=closed]:animate-rx-fade-out"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            data-state={visible ? 'open' : 'closed'}
            className="
              fixed z-10 flex flex-col overflow-hidden bg-[#F3F5F5] shadow-2xl
              inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[28px]
              data-[state=open]:animate-rx-sheet-in data-[state=closed]:animate-rx-sheet-out
              sm:inset-x-auto sm:inset-y-0 sm:end-0 sm:w-[420px] sm:max-h-none sm:rounded-t-none sm:rounded-s-[28px]
              sm:data-[state=open]:animate-rx-drawer-in sm:data-[state=closed]:animate-rx-drawer-out
            "
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)' }}
          >
            {/* Grabber (mobile only) */}
            <button
              type="button"
              onClick={onClose}
              className="sm:hidden shrink-0 pt-2.5 pb-1 flex justify-center"
              aria-label="إغلاق"
            >
              <span className="w-10 h-1.5 rounded-full bg-neutral" />
            </button>

            {/* Header */}
            <div className="shrink-0 flex items-center justify-between gap-3 px-5 h-14 sm:h-16 bg-[#F3F5F5] border-b border-neutral">
              <Link
                href={`/${locale}/dashboard`}
                onClick={onClose}
                className="flex items-center"
                aria-label="RASHX"
              >
                <Image
                  src="/brand/logo/lockup-bilingual/lockup-bilingual-black.svg"
                  alt="RASHX Brand Logo"
                  width={130}
                  height={30}
                  priority
                  className="h-6 sm:h-7 w-auto"
                />
              </Link>

              {/* Mobile: "Done" / Tablet: close icon */}
              <button
                type="button"
                onClick={onClose}
                className="sm:hidden px-4 h-9 rounded-full bg-base border border-neutral text-ink font-bold text-xs hover:bg-neutral/60 transition-colors"
              >
                تم
              </button>
              <button
                type="button"
                onClick={onClose}
                className="hidden sm:grid place-items-center w-10 h-10 rounded-xl bg-base border border-neutral text-ink-muted hover:text-ink hover:bg-neutral/60 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4">
              {moreContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const MobileBottomNav = MobileSidebar;