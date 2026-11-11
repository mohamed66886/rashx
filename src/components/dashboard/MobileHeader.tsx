'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Database,
  Settings,
  Users,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { DropdownButton, DropdownButtonItem } from '@/components/ui/DropdownButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { usePresence } from '@/hooks/usePresence';

interface MobileHeaderProps {
  onMenuToggle?: () => void;
  onLogoutRequest: () => void;
}

/**
 * MobileHeader (< lg): Matches the exact visual identity, tokens, and features of DesktopHeader:
 *  - Mobile (< sm)   : User Avatar + Name/Title on start, Search + Bell + Language on end.
 *                      Full-width search overlay with smooth rx-drop-in / rx-drop-out animation.
 *  - Tablet (sm - lg): Inline search bar + Language + Bell + full Account pill.
 */
export function MobileHeader({ onLogoutRequest }: MobileHeaderProps) {
  const { admin, openAvatarPicker } = useDashboardAuth();
  const params = useParams();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const { mounted: searchMounted, visible: searchVisible } = usePresence(searchOpen, 200);

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
      menuClassName="start-0 end-auto max-w-[calc(100vw-2rem)]"
      menuWidth="w-72"
      items={userMenuItems}
    />
  );

  const searchField = (extra: string, autoFocus = false) => (
    <div className={`relative ${extra}`}>
      <Search className="w-4 h-4 text-ink-muted absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="search"
        autoFocus={autoFocus}
        placeholder={searchPlaceholder}
        onKeyDown={(e) => autoFocus && e.key === 'Escape' && setSearchOpen(false)}
        className="w-full h-10 ps-10 pe-4 rounded-xl bg-neutral/40 border border-transparent text-sm text-ink placeholder:text-ink-muted/70 hover:bg-neutral/60 focus:outline-none focus:bg-base focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all"
      />
    </div>
  );

  return (
    <header className="lg:hidden sticky top-0 z-20 w-full bg-base border-b border-neutral">
      {/* ════════ MOBILE (< sm) ════════ */}
      <div className="sm:hidden relative h-14 flex items-center justify-between gap-2 px-3">
        {/* Start: account */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {avatar}
          <div className="flex flex-col min-w-0">
            <span className="truncate text-xs font-bold text-ink leading-tight">
              {admin.name}
            </span>
            <span className="truncate text-[10px] text-ink-muted leading-tight">
              {admin.title}
            </span>
          </div>
        </div>

        {/* End: actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className={`${iconBtn} w-9 h-9`}
            aria-label={isAr ? 'بحث' : 'Search'}
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
          {bell('w-9 h-9')}
          <LanguageToggle size="sm" variant="button" currentLanguage={locale} />
        </div>

        {/* Full-width search overlay */}
        {searchMounted && (
          <div
            data-state={searchVisible ? 'open' : 'closed'}
            className="absolute inset-0 z-10 flex items-center gap-2 px-3 bg-base data-[state=open]:animate-rx-drop-in data-[state=closed]:animate-rx-drop-out"
          >
            {searchField('flex-1', true)}
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="grid place-items-center w-10 h-10 shrink-0 rounded-xl text-ink-muted hover:text-ink hover:bg-neutral/60 transition-colors"
              aria-label={isAr ? 'إغلاق البحث' : 'Close search'}
            >
              <X className="w-[18px] h-[18px]" />
            </button>
          </div>
        )}
      </div>

      {/* ════════ TABLET (sm - lg) ════════ */}
      <div className="hidden sm:flex h-16 items-center justify-between gap-4 px-6">
        {searchField('flex-1 max-w-sm')}
        <div className="flex items-center gap-2.5 shrink-0">
          <LanguageToggle size="sm" variant="button" currentLanguage={locale} />
          {bell('w-10 h-10')}
          <span className="w-px h-7 bg-neutral" aria-hidden="true" />
          <div className="flex items-center gap-2.5 ps-3 pe-1.5 py-1.5 rounded-2xl bg-neutral/40 border border-neutral">
            <div className="flex flex-col items-start min-w-0 max-w-[150px]">
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
