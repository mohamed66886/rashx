/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import { Download, Copy, Check, Search, ZoomIn, X, FolderArchive, Info } from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';
import { LOGOS, LogoCategory, LogoBgFilter } from '@/components/brand/brand-data';

const TABS: { id: LogoCategory; label: string }[] = [
  { id: 'all', label: 'الكل (23)' },
  { id: 'wordmark', label: 'الشعار اللاتيني (RASHX)' },
  { id: 'wordmark-arabic', label: 'الشعار العربي (راش اكس)' },
  { id: 'symbol-rx', label: 'رمز Rx المختصر' },
  { id: 'lockup-bilingual', label: 'الشعار المزدوج' },
];

const BGS: { id: LogoBgFilter; label: string; swatch?: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'transparent', label: 'شفاف' },
  { id: 'white', label: 'أبيض', swatch: '#FFFFFF' },
  { id: 'black', label: 'أسود', swatch: '#000000' },
  { id: 'blue', label: 'أزرق', swatch: '#91B8C0' },
  { id: 'peach', label: 'خوخي', swatch: '#F0C5AE' },
  { id: 'mist', label: 'ميست', swatch: '#E5E9E8' },
];

export default function BrandLogosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLogoTab, setActiveLogoTab] = useState<LogoCategory>('all');
  const [logoBgFilter, setLogoBgFilter] = useState<LogoBgFilter>('all');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [modalFile, setModalFile] = useState<{ title: string; url: string } | null>(null);

  const handleCopy = (text: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(id);
      setTimeout(() => setCopiedItem((prev) => (prev === id ? null : prev)), 2000);
    }
  };

  const filteredLogos = useMemo(() => {
    return LOGOS.filter((item) => {
      const matchTab = activeLogoTab === 'all' || item.category === activeLogoTab;
      const matchBg = logoBgFilter === 'all' || item.bgType === logoBgFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || item.nameAr.toLowerCase().includes(q) || item.nameEn.toLowerCase().includes(q);
      return matchTab && matchBg && matchSearch;
    });
  }, [activeLogoTab, logoBgFilter, searchQuery]);

  const resetFilters = () => {
    setActiveLogoTab('all');
    setLogoBgFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="أصول فيكتور أصلية 100%"
        title="الشعارات والرموز الرسمية"
        subtitle="23 ملف فيكتور أصلي بدقة غير محدودة. الشعار اللاتيني، الشعار العربي، رمز Rx المختصر، والشعار المزدوج، بنسخ شفافة وعلى خلفيات ملونة."
      >
        <a
          href="/brand/rashx-logos.zip"
          download="rashx-logos.zip"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-ink font-bold text-xs hover:bg-mist-gray/40 transition-colors shadow-xs shrink-0"
        >
          <FolderArchive className="w-3.5 h-3.5 text-dusty-blue" />
          <span>تحميل الشعارات (ZIP)</span>
        </a>
      </BrandHeader>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar filters */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="relative">
                <Search className="w-4 h-4 text-ink-muted absolute right-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="بحث في الشعارات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-9 py-2.5 text-xs bg-white border border-mist-gray rounded-xl focus:outline-hidden focus:border-ink"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-3 text-ink-muted hover:text-ink"
                    aria-label="مسح"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl p-3 shadow-xs">
                <div className="text-[11px] font-black text-ink-muted px-2 pb-2">النوع</div>
                <div className="flex flex-col gap-1">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveLogoTab(tab.id)}
                      className={`text-right px-3 py-2 text-xs font-bold rounded-lg transition-colors ${
                        activeLogoTab === tab.id ? 'bg-ink text-white shadow-xs' : 'text-ink hover:bg-mist-gray/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 shadow-xs">
                <div className="text-[11px] font-black text-ink-muted px-2 pb-2">الخلفية</div>
                <div className="flex flex-wrap gap-1.5">
                  {BGS.map((bg) => (
                    <button
                      key={bg.id}
                      type="button"
                      onClick={() => setLogoBgFilter(bg.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        logoBgFilter === bg.id ? 'bg-ink text-white shadow-xs' : 'bg-mist-gray/40 text-ink hover:bg-mist-gray/80'
                      }`}
                    >
                      {bg.swatch && <span className="w-3 h-3 rounded-full shadow-2xs" style={{ backgroundColor: bg.swatch }} />}
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-dusty-blue/20 rounded-2xl p-4 space-y-2 text-xs leading-relaxed text-ink shadow-xs">
                <div className="flex items-center gap-2 font-black text-sm text-[#1e464e]">
                  <Info className="w-4 h-4" /> قواعد الاستخدام
                </div>
                <p>• كل الملفات مسارات فيكتور أصلية ولا تحتاج خطاً خارجياً.</p>
                <p>• <strong>مساحة الأمان:</strong> لا تقل عن ارتفاع الحرف (R).</p>
                <p>• <strong>رمز Rx:</strong> للأيقونات والصور الرمزية فقط.</p>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <section className="lg:col-span-9">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black">النتائج</h2>
              <span className="text-xs font-mono font-bold bg-ink text-white px-3 py-1 rounded-full">{filteredLogos.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredLogos.map((logo) => (
                <div key={logo.id} className="group bg-white rounded-2xl shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                  <div className={`h-44 p-6 flex items-center justify-center relative ${logo.previewBg}`}>
                    <img
                      src={logo.filePath}
                      alt={logo.nameAr}
                      className="max-h-24 max-w-[80%] object-contain select-none"
                    />
                    <button
                      type="button"
                      onClick={() => setModalFile({ title: logo.nameAr, url: logo.filePath })}
                      className="absolute top-3 left-3 p-2 rounded-lg bg-white text-ink shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                      title="تكبير ومعاينة بالحجم الكامل"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col gap-3">
                    <div>
                      <h3 className="text-sm font-bold leading-snug">{logo.nameAr}</h3>
                      <p className="text-[11px] text-ink-muted font-mono mt-0.5">{logo.nameEn}</p>
                      <p className="text-[11px] text-ink-muted/80 mt-0.5">{logo.dimensions}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      <a
                        href={logo.filePath}
                        download
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-ink text-white text-xs font-bold hover:bg-ink/85 transition-colors shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-warm-peach" />
                        <span>SVG</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy((typeof window !== 'undefined' ? window.location.origin : '') + logo.filePath, logo.id)}
                        className="p-2 rounded-xl bg-mist-gray/40 hover:bg-mist-gray text-ink transition-colors"
                        title="نسخ رابط الملف"
                      >
                        {copiedItem === logo.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredLogos.length === 0 && (
              <div className="text-center py-16 rounded-2xl bg-mist-gray/30">
                <p className="text-sm text-ink-muted font-bold">لا توجد شعارات مطابقة للفلتر المحدد</p>
                <button type="button" onClick={resetFilters} className="mt-2 text-xs font-bold underline">
                  إعادة ضبط الفلاتر
                </button>
              </div>
            )}
          </section>
        </div>
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
            <div className="flex-1 overflow-auto p-12 flex items-center justify-center bg-mist-gray/30">
              <img src={modalFile.url} alt={modalFile.title} className="max-w-full max-h-[60vh] object-contain" />
            </div>
          </div>
        </div>
      )}

      <Footer bgVariant="mist" />
    </div>
  );
}