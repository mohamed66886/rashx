'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Database,
  Settings,
  Users,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { DropdownButton, DropdownButtonItem } from '@/components/ui/DropdownButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

interface DesktopHeaderProps {
  onLogoutRequest: () => void;
}

/**
 * Three dedicated layouts:
 *  - Mobile  (< md)     : compact app bar - account on the start side, actions on the end side,
 *                         search opens as a full-width overlay.
 *  - Tablet  (md - lg)  : inline search + icon actions + avatar only.
 *  - Desktop (>= lg)    : wide search, language, bell, and a full account pill (name + title).
 */
export function DesktopHeader({ onLogoutRequest }: DesktopHeaderProps) {
  const { admin, openAvatarPicker } = useDashboardAuth();
  const params = useParams();
  const router = useRouter();

  const locale = (params?.locale as string) || 'ar';
  const isAr = locale === 'ar';

  if (!admin) return null;

  const searchPlaceholder = isAr
    ? 'بحث في الصالونات، النطاقات، أو الطلبات...'
    : 'Search salons, subdomains, or leads...';

  const userMenuItems: DropdownButtonItem[] = [
    {
      label: isAr ? 'تخصيص الأفاتار (3D Animoji)' : 'Customize Avatar (3D Animoji)',
      icon: <Sparkles className="w-4 h-4 text-primary" />,
      onClick: () => openAvatarPicker(),
    },
    {
      label: isAr ? 'مركز قاعدة بيانات فايربيز والجلسات' : 'Firebase DB & Sessions Console',
      icon: <Database className="w-4 h-4 text-primary" />,
      onClick: () => router.push(`/${locale}/dashboard/database`),
    },
    {
      label: isAr ? 'إعدادات المنظومة والنطاقات' : 'Platform Settings & DNS',
      icon: <Settings className="w-4 h-4 text-ink-muted" />,
      onClick: () => router.push(`/${locale}/dashboard/settings`),
    },
    {
      label: isAr ? 'مسؤولو المنصة والصلاحيات' : 'RashX Team & Admins',
      icon: <Users className="w-4 h-4 text-ink-muted" />,
      onClick: () => router.push(`/${locale}/dashboard/admins`),
    },
    {
      label: isAr ? 'تسجيل الخروج من إدارة راش إكس' : 'Sign out from RashX HQ',
      danger: true,
      icon: <LogOut className="w-4 h-4 text-red-600" />,
      onClick: () => onLogoutRequest(),
    },
  ];

  /* ───────── Shared pieces ───────── */

  const iconBtn =
    'relative grid place-items-center shrink-0 rounded-xl border border-neutral bg-base text-ink-muted hover:text-ink hover:bg-primary/10 hover:border-primary/50 transition-colors';

  const bell = (size: string) => (
    <button
      type="button"
      onClick={() => router.push(`/${locale}/dashboard/leads`)}
      className={`group ${iconBtn} ${size}`}
      aria-label={isAr ? 'الإشعارات والطلبات الجديدة' : 'Notifications & inbound leads'}
      title={isAr ? 'الإشعارات والطلبات الجديدة' : 'Notifications & inbound leads'}
    >
      <Bell className="w-[18px] h-[18px] origin-top group-hover:animate-rx-ring" />
      <span
        aria-hidden="true"
        className="absolute top-1.5 end-1.5 h-2.5 w-2.5 rounded-full bg-warm-peach border border-ink-muted/40 ring-2 ring-base"
      />
    </button>
  );

  const avatar = (
    <DropdownButton
      label={
        <Avatar
          name={admin.name}
          animojiId={admin.avatarId || 1}
          size="sm"
          status="online"
          className="hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-base transition-all"
        />
      }
      variant="ghost"
      size="sm"
      items={userMenuItems}
    />
  );

  const searchField = (extra: string) => (
    <div className={`relative ${extra}`}>
      <Search className="w-4 h-4 text-ink-muted absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="search"
        placeholder={searchPlaceholder}
        className="w-full h-10 ps-10 pe-4 rounded-xl bg-neutral/40 border border-transparent text-sm text-ink placeholder:text-ink-muted/70 hover:bg-neutral/60 focus:outline-none focus:bg-base focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
      />
    </div>
  );

  return (
    <header className="hidden lg:block sticky top-0 z-20 w-full bg-base border-b border-neutral">
      {/* ════════ DESKTOP (>= lg) ════════ */}
      <div className="h-[72px] flex items-center justify-between gap-6 px-8">
        {searchField('flex-1 max-w-lg')}

        <div className="flex items-center gap-3 shrink-0">
          <LanguageToggle size="sm" variant="button" currentLanguage={locale} />
          {bell('w-10 h-10')}

          {/* Account pill */}
          <div className="flex items-center gap-3 ps-4 pe-1.5 py-1.5 rounded-2xl bg-neutral/40 border border-neutral">
            <div className="flex flex-col items-start min-w-0 max-w-[200px]">
              <span className="w-full truncate text-xs font-bold text-ink leading-tight">
                {admin.name}
              </span>
              <span className="w-full truncate text-[11px] text-ink-muted leading-tight mt-0.5">
                {admin.title}
              </span>
            </div>
            {avatar}
          </div>
        </div>
      </div>
    </header>
  );
}