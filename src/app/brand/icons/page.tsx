/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { Download, Smartphone, Globe, FolderArchive, X } from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';
import { ICONS } from '@/components/brand/brand-data';

const HOME_ICONS = [
  { src: '/brand/icons/app-icon-rx-black-on-blue.svg', alt: 'App Icon Blue', label: 'راش إكس' },
  { src: '/brand/icons/app-icon-rx-black-on-peach.svg', alt: 'App Icon Peach', label: 'RASHX' },
  { src: '/brand/icons/app-icon-rx-black-on-white.svg', alt: 'App Icon White', label: 'نقاط البيع' },
];

export default function BrandIconsPage() {
  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="الأيقونات ورموز التطبيقات والويب"
        title="أيقونات التطبيقات والفافيكون (App Icons & Favicons)"
        subtitle="مجموعة الأيقونات المربعة المنحنية (Squircle) لتطبيقات الجوال، ورموز الفافيكون المصممة لتبقى واضحة في شريط تبويبات المتصفح."
      >
        <a
          href="/brand/rashx-icons.zip"
          download="rashx-icons.zip"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-ink font-bold text-xs hover:bg-mist-gray/40 transition-colors shadow-xs shrink-0"
        >
          <FolderArchive className="w-3.5 h-3.5 text-dusty-blue" />
          <span>تحميل الأيقونات (ZIP)</span>
        </a>
      </BrandHeader>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left: context previews */}
        <section className="lg:col-span-7 space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold sm:font-black">المعاينة في بيئة الاستخدام</h2>

          {/* Browser mock */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm">
            <div className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-mist-gray/40">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ink-muted" />
              <span className="text-xs font-semibold sm:font-bold">Favicon في شريط تبويبات المتصفح</span>
            </div>
            <div className="p-3.5 sm:p-5 bg-mist-gray/30">
              <div className="flex items-center gap-2 max-w-sm bg-white rounded-t-xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-2xs">
                <img src="/brand/icons/favicon-black-on-blue.svg" alt="Favicon" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-xs shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold truncate">RASHX | راش اكس — الفوترة الرسمية</span>
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-ink-muted shrink-0 mr-auto" />
              </div>
              <div className="h-6 sm:h-8 bg-white/70" />
            </div>
            <p className="text-xs text-ink-muted leading-relaxed p-3.5 sm:p-5 font-normal">
              الفافيكون مصمم ليبقى واضحاً ومقروءاً حتى عند تصغيره إلى 16×16 و32×32 بكسل.
            </p>
          </div>

          {/* Phone mock */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-ink shadow-sm">
            <div className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 border-b border-white/10 text-white">
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-warm-peach" />
              <span className="text-xs font-semibold sm:font-bold">الشاشة الرئيسية للهاتف</span>
            </div>
            <div className="p-5 sm:p-8 flex items-center justify-around gap-2 sm:gap-4">
              {HOME_ICONS.map((it) => (
                <div key={it.src} className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <img src={it.src} alt={it.alt} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl" />
                  <span className="text-[11px] sm:text-xs font-bold text-white">{it.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right: compact list */}
        <section className="lg:col-span-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold sm:font-black">المكتبة (8 ملفات)</h2>
            <span className="text-xs text-ink-muted font-medium">SVG فيكتور</span>
          </div>

          <ul className="bg-white rounded-2xl sm:rounded-3xl divide-y divide-mist-gray/50 overflow-hidden shadow-sm lg:sticky lg:top-24">
            {ICONS.map((icon) => (
              <li key={icon.id} className="flex items-center gap-4 p-4 hover:bg-mist-gray/25 transition-colors">
                <div
                  className="w-16 h-16 rounded-xl p-2.5 flex items-center justify-center shrink-0 shadow-2xs"
                  style={{ backgroundColor: icon.previewBg }}
                >
                  <img src={icon.filePath} alt={icon.nameAr} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{icon.nameAr}</div>
                  <div className="text-[11px] text-ink-muted font-mono truncate">{icon.nameEn}</div>
                </div>
                <a
                  href={icon.filePath}
                  download
                  aria-label={`تحميل ${icon.nameAr}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-mist-gray/40 text-ink text-xs font-bold hover:bg-mist-gray/80 transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>SVG</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer bgVariant="mist" />
    </div>
  );
}