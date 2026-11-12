'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { getPlatformNavItems } from './nav-data';

interface DesktopSidebarProps {
  onLogoutRequest: () => void;
}

/**
 * Desktop sidebar — simplified.
 * Logo, the nav list, and one profile row with sign-out. Brand tokens only.
 * Removed: version tag, database/session box, fake "Live" green badges,
 * staggered entrance animation, red sign-out button.
 */
export function DesktopSidebar({ onLogoutRequest }: DesktopSidebarProps) {
  const { admin, openAvatarPicker } = useDashboardAuth();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  const isAr = locale === 'ar';

  const navItems = getPlatformNavItems(locale);

  if (!admin) return null;

  return (
    <aside className="sticky top-0 z-30 hidden h-screen w-60 shrink-0 flex-col border-e border-neutral bg-base text-ink lg:flex">
      {/* Brand */}
      <div className="shrink-0 border-b border-neutral p-4">
        <Link
          href={`/${locale}/dashboard`}
          aria-label="RashX"
          className="inline-flex items-center rounded-lg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Image
            src="/brand/logo/lockup-bilingual/lockup-bilingual-black.svg"
            alt="RashX"
            width={140}
            height={32}
            priority
            className="h-7 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav
        aria-label={isAr ? 'القائمة الرئيسية' : 'Main navigation'}
        className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-3"
      >
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${
                isActive ? 'bg-primary text-ink' : 'text-ink-muted hover:bg-neutral/50 hover:text-ink'
              }`}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{isAr ? item.title : item.titleEn}</span>
              </span>

              {item.badge && (
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-ink ${
                    isActive ? 'bg-base' : 'bg-warm-peach'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile + sign out */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-t border-neutral p-3">
        <button
          type="button"
          onClick={openAvatarPicker}
          title={isAr ? 'تغيير الصورة الشخصية' : 'Change avatar'}
          className="-m-1 flex min-w-0 flex-1 items-center gap-2.5 rounded-xl p-1 text-start transition-colors hover:bg-neutral/40"
        >
          <Avatar name={admin.name} animojiId={admin.avatarId || 1} size="sm" status="online" />
          <span className="min-w-0">
            <span className="block truncate text-xs font-bold text-ink">{admin.name}</span>
            <span className="block truncate text-[10px] text-ink-muted">{admin.title}</span>
          </span>
        </button>

        <button
          type="button"
          onClick={onLogoutRequest}
          title={isAr ? 'تسجيل الخروج' : 'Sign out'}
          aria-label={isAr ? 'تسجيل الخروج' : 'Sign out'}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-warm-peach/40 hover:text-ink"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}