/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Download, Share2, ZoomIn, X, FolderArchive } from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';
import { SOCIAL_GRAPHICS } from '@/components/brand/brand-data';

export default function BrandSocialPage() {
  const [modalFile, setModalFile] = useState<{ title: string; url: string } | null>(null);

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="الهوية الرقمية وشبكات التواصل"
        title="أصول الشبكات الاجتماعية والويب (Social Media Assets)"
        subtitle="الصور الرمزية للحسابات، أغلفة القنوات والصفحات الرسمية، وبطاقات مشاركة الروابط (Open Graph 1200×630)."
      >
        <a
          href="/brand/rashx-social.zip"
          download="rashx-social.zip"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-ink font-bold text-xs hover:bg-mist-gray/40 transition-colors shadow-xs shrink-0"
        >
          <FolderArchive className="w-3.5 h-3.5 text-dusty-blue" />
          <span>تحميل السوشيال (ZIP)</span>
        </a>
      </BrandHeader>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sticky profile simulator */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-ink-muted">
              <Share2 className="w-4 h-4 text-dusty-blue" />
              <span>معاينة حية: بطاقة الحساب الرسمي</span>
            </div>

            <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm">
              <div className="h-28 sm:h-44 w-full bg-dusty-blue/30">
                <img src="/brand/social/cover-blue.svg" alt="Profile Cover" className="w-full h-full object-cover" />
              </div>

              <div className="px-4 sm:px-6 pb-4 sm:pb-6 relative">
                <div className="flex justify-between items-end -mt-8 sm:-mt-12 mb-3 sm:mb-4">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm">
                    <img src="/brand/social/avatar-rx-black-on-blue.svg" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <span className="px-4 py-1 sm:px-5 sm:py-1.5 rounded-full bg-ink text-white text-[11px] sm:text-xs font-bold shadow-xs">متابعة</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold sm:font-black text-ink">راش إكس · RASHX</h3>
                <p className="text-[11px] sm:text-xs text-ink-muted font-mono">@rashx_app</p>
                <p className="text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed text-ink-muted font-normal">
                  منظومة الفوترة الإلكترونية السريعة وإدارة الأعمال الذكية المعتمدة بالمملكة العربية السعودية 🇸🇦.
                </p>
              </div>
            </div>

            <div className="bg-warm-peach/25 rounded-2xl p-3.5 sm:p-4 text-xs leading-relaxed font-semibold text-ink shadow-xs">
              16 تصميماً بأبعاد قياسية مخصصة للنشر الرقمي، جاهزة للتحميل بصيغة SVG.
            </div>
          </div>
        </aside>

        {/* Horizontal cards list */}
        <section className="lg:col-span-7">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold sm:font-black">مكتبة التصاميم الرقمية</h2>
            <span className="text-xs font-mono font-bold bg-ink text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">{SOCIAL_GRAPHICS.length}</span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
            {SOCIAL_GRAPHICS.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl sm:rounded-2xl shadow-xs hover:shadow-md transition-shadow flex overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setModalFile({ title: item.nameAr, url: item.filePath })}
                  className="relative w-32 sm:w-36 shrink-0 bg-mist-gray/40 p-3 flex items-center justify-center"
                  aria-label="معاينة بالحجم الكامل"
                >
                  <img src={item.filePath} alt={item.nameAr} className="max-h-24 max-w-full object-contain" />
                  <span className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </span>
                </button>

                <div className="flex-1 p-4 flex flex-col justify-between gap-3 min-w-0">
                  <div>
                    <h3 className="text-sm font-bold leading-snug">{item.nameAr}</h3>
                    <p className="text-[11px] text-ink-muted font-mono mt-0.5">{item.dimensions}</p>
                  </div>
                  <a
                    href={item.filePath}
                    download
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-mist-gray/40 text-ink text-xs font-bold hover:bg-mist-gray/80 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل SVG</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {modalFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 px-6 border-b border-mist-gray">
              <h3 className="text-base font-bold">{modalFile.title}</h3>
              <div className="flex items-center gap-2">
                <a
                  href={modalFile.url}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink text-white text-xs font-bold hover:bg-ink/85 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل الملف</span>
                </a>
                <button
                  type="button"
                  onClick={() => setModalFile(null)}
                  aria-label="إغلاق"
                  className="p-1.5 rounded-lg hover:bg-mist-gray text-ink-muted hover:text-ink transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-8 flex items-center justify-center bg-mist-gray/30">
              <img src={modalFile.url} alt={modalFile.title} className="max-w-full max-h-[65vh] object-contain" />
            </div>
          </div>
        </div>
      )}

      <Footer bgVariant="mist" />
    </div>
  );
}