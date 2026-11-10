/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Download, ZoomIn, X, FolderArchive, Printer } from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';
import { DOCUMENTS } from '@/components/brand/brand-data';

const PRINT_TIPS = [
  { n: '01', text: 'جميع المستندات بأبعاد قياسية دولية: A4، كروت 90×50 مم، ومظاريف DL 220×110 مم.' },
  { n: '02', text: 'قبل الإرسال للمطابع حوّل النصوص إلى مسارات (Create Outlines) لتجنب استبدال الخطوط.' },
  { n: '03', text: 'كل الملفات فيكتور SVG، يمكن تكبيرها وطباعتها بأي مقاس دون فقدان في الجودة.' },
];

export default function BrandDocumentsPage() {
  const [modalFile, setModalFile] = useState<{ title: string; url: string } | null>(null);

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="النماذج والمستندات الرسمية"
        title="المستندات المكتبية والمطبوعات (Official Stationery & Docs)"
        subtitle="العروض التقديمية 16:9، كروت العمل، أوراق الخطابات A4، الفاتورة الضريبية، ومظاريف المراسلات. جاهزة للطباعة والتعديل المباشر."
      >
        <a
          href="/brand/rashx-documents.zip"
          download="rashx-documents.zip"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-ink font-bold text-xs hover:bg-mist-gray/40 transition-colors shadow-xs shrink-0"
        >
          <FolderArchive className="w-3.5 h-3.5 text-dusty-blue" />
          <span>تحميل المستندات (ZIP)</span>
        </a>
      </BrandHeader>

      <main className="flex-1 w-full">
        {/* Print tips strip */}
        <section className="bg-[#FDF4EE] py-6 sm:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 font-bold sm:font-black text-sm sm:text-base text-ink">
              <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
              <span>نصائح الطباعة التجارية</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {PRINT_TIPS.map((t) => (
                <div key={t.n} className="flex gap-2.5 sm:gap-3 items-start bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-xs">
                  <span className="text-xl sm:text-2xl font-extrabold sm:font-black font-mono leading-none text-ink">{t.n}</span>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternating editorial rows */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold sm:font-black">قوالب النماذج والمستندات ({DOCUMENTS.length} ملفات)</h2>
            <span className="text-xs text-ink-muted font-medium hidden sm:block">انقر على المعاينة للتكبير</span>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {DOCUMENTS.map((doc, i) => (
              <article
                key={doc.id}
                className={`bg-white rounded-2xl sm:rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm ${
                  i % 2 === 1 ? 'lg:[direction:ltr]' : ''
                }`}
              >
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setModalFile({ title: doc.nameAr, url: doc.filePath })}
                    className={`group relative w-full h-56 sm:h-72 md:h-80 p-4 sm:p-6 flex items-center justify-center ${
                      i % 2 === 0 ? 'bg-dusty-blue/20' : 'bg-mist-gray/40'
                    }`}
                    aria-label="معاينة بالحجم الكامل"
                  >
                    <img
                      src={doc.filePath}
                      alt={doc.nameAr}
                      className="max-h-full max-w-full object-contain bg-white rounded-lg shadow-2xs"
                    />
                    <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-ink text-white text-[11px] sm:text-xs font-bold shadow-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> معاينة بالحجم الكامل
                    </span>
                  </button>
                </div>

                <div className={`lg:col-span-5 p-4 sm:p-6 md:p-8 flex flex-col justify-between gap-4 sm:gap-6 ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="text-2xl sm:text-3xl font-extrabold sm:font-black font-mono text-ink-muted/30">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[10px] sm:text-[11px] font-mono font-medium bg-mist-gray/60 text-ink-muted px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">{doc.dimensions}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold sm:font-black leading-snug">{doc.nameAr}</h3>
                    <p className="text-[11px] sm:text-xs text-ink-muted font-mono mt-0.5">{doc.nameEn}</p>
                    <p className="text-xs sm:text-sm text-ink-muted mt-2 sm:mt-3 leading-relaxed font-normal">{doc.description}</p>
                  </div>

                  <div className="pt-3 sm:pt-4 flex items-center justify-between gap-3">
                    <span className="text-[10px] sm:text-[11px] font-semibold bg-mist-gray/60 px-2.5 py-1 rounded-md text-ink-muted">{doc.format}</span>
                    <a
                      href={doc.filePath}
                      download
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-ink text-white rounded-xl text-xs font-bold hover:bg-ink/85 transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-warm-peach" />
                      <span>تحميل SVG</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {modalFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 px-6 border-b border-mist-gray">
              <h3 className="text-base font-bold">{modalFile.title}</h3>
              <div className="flex items-center gap-2">
                <a
                  href={modalFile.url}
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ink text-white text-xs font-bold hover:bg-ink/85 transition-colors"
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
            <div className="flex-1 overflow-auto p-6 sm:p-10 flex items-center justify-center bg-mist-gray/30">
              <img src={modalFile.url} alt={modalFile.title} className="max-w-full max-h-[75vh] object-contain bg-white rounded-lg shadow-sm" />
            </div>
          </div>
        </div>
      )}

      <Footer bgVariant="mist" />
    </div>
  );
}