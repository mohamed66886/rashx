'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { DesktopSidebar } from '@/components/dashboard/DesktopSidebar';
import { MobileSidebar } from '@/components/dashboard/MobileSidebar';
import { DesktopHeader } from '@/components/dashboard/DesktopHeader';
import { MobileHeader } from '@/components/dashboard/MobileHeader';
import { ToastProvider } from '@/components/ui/Toast';
import type { AdminUser } from '@/server/auth/session';

const LogoutConfirmModal = dynamic(
  () => import('@/components/dashboard/LogoutConfirmModal').then((m) => m.LogoutConfirmModal),
  { ssr: false }
);

const AvatarPickerModal = dynamic(
  () => import('@/components/dashboard/AvatarPickerModal').then((m) => m.AvatarPickerModal),
  { ssr: false }
);

interface DashboardShellProps {
  children: React.ReactNode;
  admin: AdminUser;
  locale: string;
}

export function DashboardShell({ children, locale }: DashboardShellProps) {
  const { logout } = useDashboardAuth();
  const isAr = locale === 'ar';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handleChange = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const handleLogoutClick = async () => {
    setShowLogoutConfirm(false);
    await logout();
  };

  return (
    <ToastProvider position={isAr ? 'bottom-left' : 'bottom-right'}>
      <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-dvh flex bg-[#F3F5F5] text-ink">
        {/* Navigation: Desktop Sidebar & Mobile Sidebar */}
        <DesktopSidebar onLogoutRequest={() => setShowLogoutConfirm(true)} />
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onOpen={() => setMobileMenuOpen(true)}
          onToggle={() => setMobileMenuOpen((open) => !open)}
          onLogoutRequest={() => setShowLogoutConfirm(true)}
        />

        {/* Main container */}
        <div className="flex-1 flex flex-col min-w-0 min-h-dvh">
          <DesktopHeader onLogoutRequest={() => setShowLogoutConfirm(true)} />
          <MobileHeader
            onMenuToggle={() => setMobileMenuOpen((open) => !open)}
            onLogoutRequest={() => setShowLogoutConfirm(true)}
          />

          <main
            id="main-content"
            className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-8"
          >
            <div className="animate-rx-fade-up">
              {children}
            </div>
          </main>
        </div>

        <LogoutConfirmModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogoutClick}
        />
        <AvatarPickerModal />
      </div>
    </ToastProvider>
  );
}
