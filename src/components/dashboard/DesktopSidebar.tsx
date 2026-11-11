'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Globe, LogOut, Sparkles } from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { getPlatformNavItems } from './nav-data';

interface DesktopSidebarProps {
  onLogoutRequest: () => void;
}

/**
 * Compact desktop sidebar (240px, was 296px).
 * Solid background, RASHX palette, smooth hover + staggered entrance.
 */
export function DesktopSidebar({ onLogoutRequest }: DesktopSidebarProps) {
  const { admin, session, openAvatarPicker } = useDashboardAuth();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  const isAr = locale === 'ar';

  const navItems = getPlatformNavItems(locale);

  if (!admin) return null;

  return (
    <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 sticky top-0 z-30 h-screen bg-base text-ink border-e border-neutral">
      {/* ───────── Brand ───────── */}
      <div className="shrink-0 p-4 border-b border-neutral">
        <Link
          href={`/${locale}/dashboard`}
          className="group inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="RASHX"
        >
          <Image
            src="/brand/logo/lockup-bilingual/lockup-bilingual-black.svg"
            alt="RASHX Brand Logo"
            width={140}
            height={32}
            priority
            className="h-7 w-auto transition-transform duration-300 ease-smooth group-hover:scale-[1.03]"
          />
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl bg-neutral/40 border border-neutral">
          <div className="flex items-center gap-2 min-w-0">
            <Globe className="w-3.5 h-3.5 text-ink-muted shrink-0" />
            <span className="font-bold text-ink text-[11px] truncate">
              {isAr ? 'الإدارة السحابية المركزية' : 'Cloud Central HQ'}
            </span>
          </div>
          <span className="shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            v2.6
          </span>
        </div>
      </div>

      {/* ───────── Navigation ───────── */}
      <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-0.5">
        <div className="px-2.5 pt-1 pb-1.5 text-[10px] font-bold text-ink-muted tracking-wider uppercase">
          {isAr ? 'إدارة المنصة والعملاء' : 'Platform & Tenants'}
        </div>

        {navItems.map((item, index) => {
          const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              style={{ animationDelay: `${Math.min(index * 35, 350)}ms` }}
              className={`group animate-rx-fade-up flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-bold transition-[background-color,color,box-shadow] duration-200 ease-smooth active:scale-[0.98] ${
                isActive
                  ? 'bg-primary text-ink shadow-sm'
                  : 'text-ink-muted hover:text-ink hover:bg-neutral/50'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ease-smooth group-hover:scale-110 ${
                    isActive ? 'text-ink' : 'text-ink-muted group-hover:text-ink'
                  }`}
                />
                <span className="truncate">{isAr ? item.title : item.titleEn}</span>
              </div>

              {item.badge && (
                <span
                  className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-base text-ink'
                      : item.badge === 'Live'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-warm-peach text-ink'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ───────── Footer ───────── */}
      <div className="shrink-0 p-3 border-t border-neutral bg-base space-y-2.5">
        {/* Database / session */}
        <div className="px-2.5 py-2 rounded-xl bg-neutral/40 border border-neutral">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="text-ink font-bold flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="truncate">{isAr ? 'قاعدة بيانات فايربيز' : 'Firebase Database'}</span>
            </span>
            <span className="font-mono text-[10px] text-ink-muted shrink-0">aya2-a5057</span>
          </div>
          <div className="mt-0.5 text-[10px] text-ink-muted font-mono truncate" title={session?.id}>
            {isAr ? 'جلسة:' : 'Session:'} {session?.id?.substring(0, 14)}...
          </div>
        </div>

        {/* Profile + logout */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={openAvatarPicker}
            className="group flex items-center gap-2.5 min-w-0 flex-1 text-start rounded-xl p-1 -m-1 hover:bg-neutral/40 transition-colors duration-200"
            title={
              isAr
                ? 'انقر لتغيير وتخصيص الأفاتار (3D Animoji)'
                : 'Click to customize avatar (3D Animoji)'
            }
          >
            <div className="relative shrink-0">
              <Avatar
                name={admin.name}
                animojiId={admin.avatarId || 1}
                size="sm"
                status="online"
                className="group-hover:ring-2 group-hover:ring-primary transition-all"
              />
              <span className="absolute -top-1 -end-1 grid place-items-center w-3.5 h-3.5 rounded-full bg-primary text-ink opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-spring">
                <Sparkles className="w-2 h-2" />
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-ink truncate">{admin.name}</div>
              <div className="text-[10px] text-ink-muted truncate flex items-center gap-1">
                <span className="truncate">{admin.title}</span>
                <span className="shrink-0 text-[9px] font-bold text-ink underline decoration-primary decoration-2 underline-offset-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isAr ? 'تغيير' : 'Change'}
                </span>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={onLogoutRequest}
            title={isAr ? 'تسجيل الخروج من الجلسة' : 'Sign Out Session'}
            aria-label={isAr ? 'تسجيل الخروج من الجلسة' : 'Sign Out Session'}
            className="grid place-items-center w-8 h-8 shrink-0 rounded-lg text-red-600 hover:bg-rose-50 active:scale-95 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}