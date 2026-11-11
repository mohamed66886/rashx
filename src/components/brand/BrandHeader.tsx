'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderArchive,
  ChevronLeft,
  ChevronDown,
  X,
  Palette,
  Type,
  ImageIcon,
  Smartphone,
  Share2,
  FileText,
  Mail,
  Layers,
  LayoutGrid,
} from 'lucide-react';

interface BrandTab {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: string;
}

const BRAND_TABS: BrandTab[] = [
  { id: 'overview', label: 'نظرة عامة', shortLabel: 'الرئيسية', href: '/brand', icon: LayoutGrid },
  { id: 'logos', label: 'الشعارات والرموز', shortLabel: 'الشعارات', href: '/brand/logos', icon: ImageIcon, count: '23' },
  { id: 'colors', label: 'لوحة الألوان', shortLabel: 'الألوان', href: '/brand/colors', icon: Palette, count: '6' },
  { id: 'typography', label: 'الخط والتايبوغرافي', shortLabel: 'الخط', href: '/brand/typography', icon: Type, count: '4' },
  { id: 'icons', label: 'الأيقونات والفافيكون', shortLabel: 'الأيقونات', href: '/brand/icons', icon: Smartphone, count: '8' },
  { id: 'social', label: 'السوشيال والويب', shortLabel: 'السوشيال', href: '/brand/social', icon: Share2, count: '16' },
  { id: 'documents', label: 'المستندات والنماذج', shortLabel: 'المستندات', href: '/brand/documents', icon: FileText, count: '9' },
  { id: 'email', label: 'البريد والتوقيع', shortLabel: 'البريد', href: '/brand/email', icon: Mail, count: '9' },
  { id: 'guidelines', label: 'دليل الإرشادات والضوابط', shortLabel: 'الإرشادات', href: '/brand/guidelines', icon: Layers },
];

export interface BrandHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}

function isTabActive(tab: BrandTab, pathname: string | null) {
  if (tab.href === '/brand') return pathname === '/brand';
  return !!pathname?.startsWith(tab.href);
}

export function BrandHeader({ title, subtitle, badge, children }: BrandHeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentTab = BRAND_TABS.find((tab) => isTabActive(tab, pathname)) || BRAND_TABS[0];
  const CurrentIcon = currentTab.icon;

  return (
    <header className="w-full">
      {/* =========================================================================
          1. DESKTOP DESIGN (شاشات الكمبيوتر والتابلت - md فما فوق)
          - تصميم أفقي أنيق، خفيف، ومضغوط
          - يقلل الارتفاع للنصف حتى يظهر المحتوى الرئيسي فوراً
          - تنظيم كامل للمسارات، الشارة، العنوان، وأزرار التحميل
          ========================================================================= */}
      <div className="hidden md:block bg-[#F8FAFA] border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-6">
          {/* Top micro-row: Breadcrumb */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Link href="/" className="hover:text-ink transition-colors">
                الرئيسية
              </Link>
              <ChevronLeft className="w-3 h-3 text-ink-muted/50" />
              <Link href="/brand" className="hover:text-ink transition-colors">
                الهوية والعلامة
              </Link>
              {currentTab.href !== '/brand' && (
                <>
                  <ChevronLeft className="w-3 h-3 text-ink-muted/50" />
                  <span className="font-semibold text-ink">{currentTab.label}</span>
                </>
              )}
            </nav>
          </div>

          {/* Main Content Row: Title/Subtitle on right, Actions on left (RTL) */}
          <div className="flex items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-xl lg:text-2xl font-semibold text-ink tracking-tight">
                {title || 'هوية راش إكس الرسمية'}
              </h1>
              {subtitle && (
                <p className="mt-1 text-xs lg:text-sm text-ink-muted leading-relaxed font-normal">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Actions group */}
            <div className="flex items-center gap-2 shrink-0">
              {children}
              <a
                href="/brand/rashx-brand-kit.zip"
                download="rashx-brand-kit.zip"
                title="تحميل حزمة الهوية كاملة (ZIP)"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ink text-white font-bold text-xs hover:bg-ink/85 transition-colors shadow-xs"
              >
                <FolderArchive className="w-3.5 h-3.5 text-warm-peach" />
                <span>حزمة الهوية (ZIP)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP STICKY NAVIGATION TABS */}
      <div className="hidden md:block sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-2xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {BRAND_TABS.map((tab) => {
                const active = isTabActive(tab, pathname);
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs whitespace-nowrap rounded-xl transition-all ${
                      active
                        ? 'bg-ink text-white font-bold shadow-xs'
                        : 'text-ink-muted font-medium hover:text-ink hover:bg-mist-gray/40'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-md font-mono ${
                          active ? 'bg-white/20 text-white' : 'bg-mist-gray/70 text-ink-muted'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MOBILE DESIGN (شاشات الهواتف المحمولة - أقل من md)
          - تصميم فائق الخفة والملاءمة لقبضة اليد الواحدة
          - لا يهدر مساحة الشاشة؛ العنوان ومختصر القسم يظهر بأقل من 100 بكسل
          - منتقي ذكي للأقسام (قائمة سفلية بلمسة واحدة + شريط سحب فوري)
          ========================================================================= */}
      <div className="md:hidden bg-[#F8FAFA] border-b border-black/5 px-4 py-3">
        {/* Top mini-bar: Breadcrumb */}
        <div className="flex items-center justify-between text-[11px] text-ink-muted mb-1">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-medium">
            <Link href="/" className="hover:text-ink">
              الرئيسية
            </Link>
            <ChevronLeft className="w-2.5 h-2.5 text-ink-muted/50" />
            <Link href="/brand" className="hover:text-ink">
              الهوية
            </Link>
            {currentTab.href !== '/brand' && (
              <>
                <ChevronLeft className="w-2.5 h-2.5 text-ink-muted/50" />
                <span className="font-bold text-ink truncate max-w-[140px]">{currentTab.shortLabel}</span>
              </>
            )}
          </nav>
        </div>

        {/* Title + Quick Download Action */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-ink leading-tight truncate">
              {title || 'هوية راش إكس الرسمية'}
            </h1>
            {subtitle && (
              <p className="mt-0.5 text-[11px] text-ink-muted leading-relaxed line-clamp-2 font-normal">
                {subtitle}
              </p>
            )}
          </div>

          <a
            href="/brand/rashx-brand-kit.zip"
            download="rashx-brand-kit.zip"
            title="تحميل حزمة الهوية كاملة (ZIP)"
            className="shrink-0 p-2 rounded-xl bg-ink text-white shadow-xs hover:bg-ink/85 transition-colors"
            aria-label="تحميل حزمة الهوية"
          >
            <FolderArchive className="w-4 h-4 text-warm-peach" />
          </a>
        </div>

        {/* Page-specific action (if passed as children) */}
        {children && (
          <div className="mt-2 pt-2 border-t border-black/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {children}
          </div>
        )}
      </div>

      {/* MOBILE STICKY NAVIGATION BAR */}
      <div className="md:hidden sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-2xs">
        {/* Row 1: Section Switcher Drawer Trigger */}
        <div className="px-3 pt-2 pb-1.5">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-mist-gray/40 text-ink text-xs font-bold hover:bg-mist-gray/60 transition-colors"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="flex items-center gap-2 truncate">
              <CurrentIcon className="w-3.5 h-3.5 text-ink shrink-0" />
              <span className="truncate">{currentTab.label}</span>
              {currentTab.count && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-ink text-white font-mono">
                  {currentTab.count}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-ink-muted shrink-0">
              <span>تغيير القسم</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Row 2: Fast Swipe Horizontal Micro-Pills */}
        <div className="px-3 pb-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {BRAND_TABS.map((tab) => {
            const active = isTabActive(tab, pathname);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg shrink-0 transition-all ${
                  active
                    ? 'bg-ink text-white font-bold shadow-xs'
                    : 'text-ink-muted font-medium hover:text-ink hover:bg-mist-gray/40'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* MOBILE SECTIONS DRAWER / BOTTOM SHEET */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative bg-white rounded-t-3xl max-h-[82vh] flex flex-col shadow-2xl p-4 z-10 animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-black/5 mb-2">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-ink" />
                <span className="text-sm font-bold text-ink">أقسام الهوية والعلامة التجارية</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg text-ink-muted hover:text-ink hover:bg-mist-gray/40"
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sections list */}
            <div className="overflow-y-auto space-y-1 py-1">
              {BRAND_TABS.map((tab) => {
                const active = isTabActive(tab, pathname);
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                      active ? 'bg-ink text-white font-bold' : 'hover:bg-mist-gray/40 text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`p-1.5 rounded-lg ${
                          active ? 'bg-white/20 text-white' : 'bg-mist-gray/50 text-ink'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-semibold">{tab.label}</span>
                    </div>
                    {tab.count && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                          active ? 'bg-white/20 text-white' : 'bg-mist-gray/70 text-ink-muted'
                        }`}
                      >
                        {tab.count} ملف
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Quick Kit Download in Drawer */}
            <div className="pt-3 border-t border-black/5 mt-2">
              <a
                href="/brand/rashx-brand-kit.zip"
                download="rashx-brand-kit.zip"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-warm-peach text-ink font-bold text-xs hover:bg-warm-peach/85 transition-colors shadow-xs"
              >
                <FolderArchive className="w-4 h-4 text-ink" />
                <span>تحميل حزمة الهوية كاملة (ZIP)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
