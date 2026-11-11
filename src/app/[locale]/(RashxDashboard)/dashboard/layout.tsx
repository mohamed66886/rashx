'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useParams } from 'next/navigation';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { DesktopSidebar } from '@/components/dashboard/DesktopSidebar';
import { MobileSidebar } from '@/components/dashboard/MobileSidebar';
import { DesktopHeader } from '@/components/dashboard/DesktopHeader';
import { MobileHeader } from '@/components/dashboard/MobileHeader';
import { LogoutConfirmModal } from '@/components/dashboard/LogoutConfirmModal';
import { AvatarPickerModal } from '@/components/dashboard/AvatarPickerModal';

interface PlatformAdminLayoutProps {
  children: React.ReactNode;
}

export default function PlatformAdminLayout({ children }: PlatformAdminLayoutProps) {
  const { admin, logout, isLoading } = useDashboardAuth();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  const isAr = locale === 'ar';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Close the mobile sheet/drawer when the viewport grows to desktop,
  // so it never leaves the page scroll-locked behind the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleChange = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // If loading or on login page, render children without dashboard frame
  if (isLoading || pathname?.includes('/dashboard/login')) {
    return <>{children}</>;
  }

  // If unauthenticated, gatekeeper will redirect, show a light, solid loader
  if (!admin) {
    return (
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className="min-h-dvh flex flex-col items-center justify-center gap-1 px-6 text-center bg-base text-ink"
      >
        <div className="grid place-items-center w-14 h-14 mb-3 rounded-2xl bg-base border border-neutral shadow-md animate-pulse">
          <Image
            src="/brand/icons/app-icon-rx-black-on-blue.svg"
            alt="RashX Platform Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
        </div>
        <div className="text-sm font-bold text-ink">
          {isAr
            ? 'التحقق من جلسة الإدارة المركزية (admin.rashx.org)...'
            : 'Verifying Central Management Session (admin.rashx.org)...'}
        </div>
        <div className="text-xs text-ink-muted font-mono">Firebase Firestore (aya2-a5057)</div>
      </div>
    );
  }

  const handleLogoutClick = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-dvh flex bg-[#F3F5F5] text-ink">
      {/* ============================================================== */}
      {/* NAVIGATION: Desktop Sidebar & Mobile Bottom Navigation / Sheet  */}
      {/* ============================================================== */}
      <DesktopSidebar onLogoutRequest={() => setShowLogoutConfirm(true)} />
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpen={() => setMobileMenuOpen(true)}
        onToggle={() => setMobileMenuOpen((open) => !open)}
        onLogoutRequest={() => setShowLogoutConfirm(true)}
      />

      {/* ============================================================== */}
      {/* MAIN CONTAINER: Headers (Desktop & Mobile) + Content Body      */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0 min-h-dvh">
        {/* Desktop Header (lg+) */}
        <DesktopHeader onLogoutRequest={() => setShowLogoutConfirm(true)} />

        {/* Mobile / Tablet Header (< lg) */}
        <MobileHeader
          onMenuToggle={() => setMobileMenuOpen((open) => !open)}
          onLogoutRequest={() => setShowLogoutConfirm(true)}
        />

        {/*
          Bottom padding leaves room for the bottom nav:
          mobile = full-width bar, tablet = floating pill, desktop = none.
        */}
        <main
          id="main-content"
          className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-8"
        >
          {/* Soft fade-up on every route change */}
          <div key={pathname} className="animate-rx-fade-up">
            {children}
          </div>
        </main>
      </div>

      {/* ============================================================== */}
      {/* LOGOUT CONFIRMATION MODAL                                      */}
      {/* ============================================================== */}
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogoutClick}
      />
      {/* ============================================================== */}
      {/* AVATAR PICKER MODAL (3D ANIMOJI)                               */}
      {/* ============================================================== */}
      <AvatarPickerModal />
    </div>
  );
}