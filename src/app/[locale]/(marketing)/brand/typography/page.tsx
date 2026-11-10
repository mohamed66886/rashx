'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, FileCode } from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';
import { FONT_CSS_SNIPPET } from '@/components/brand/brand-data';

const SCHEMES = [
  { bg: '#FFFFFF', text: '#000000', label: 'أبيض' },
  { bg: '#E5E9E8', text: '#000000', label: 'ميست' },
  { bg: '#91B8C0', text: '#000000', label: 'أزرق' },
  { bg: '#F0C5AE', text: '#000000', label: 'خوخي' },
  { bg: '#000000', text: '#FFFFFF', label: 'أسود' },
];

const WEIGHTS = [
  {
    weight: 'Regular 400',
    titleAr: 'عادي (Regular)',
    usage: 'نصوص الفقرات والمقالات والمحتوى التحريري العام.',
    sample: 'الفوترة الإلكترونية المتطورة والربط مع هيئة الزكاة.',
    numeric: 400,
  },
  {
    weight: 'Medium 500',
    titleAr: 'متوسط (Medium)',
    usage: 'عناصر واجهات الاستخدام، التسميات، والقوائم المنسدلة.',
    sample: 'إدارة الفواتير والمخزون وحسابات العملاء.',
    numeric: 500,
  },
  {
    weight: 'Bold 700',
    titleAr: 'عريض (Bold)',
    usage: 'عناوين الأقسام الرئيسية، أسماء الشركات والمنتجات.',
    sample: 'منظومة الأعمال الرائدة في المملكة.',
    numeric: 700,
  },
  {
    weight: 'Extra Bold 800',
    titleAr: 'فائق العرض (Extra Bold)',
    usage: 'العناوين الضخمة (Hero)، الإعلانات والشعارات الترويجية.',
    sample: 'أسرع حل فوترة رقمية في ثوانٍ.',
    numeric: 800,
  },
];

export default function BrandTypographyPage() {
  const [sampleText, setSampleText] = useState('راش إكس RASHX — منظومة الأعمال الذكية والفوترة السريعة');
  const [fontSize, setFontSize] = useState<number>(48);
  const [fontWeight, setFontWeight] = useState<number>(700);
  const [fontColor, setFontColor] = useState<string>('#FFFFFF');
  const [fontBg, setFontBg] = useState<string>('#000000');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(id);
      setTimeout(() => setCopiedItem((prev) => (prev === id ? null : prev)), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="الخط الطباعي الرسمي"
        title="التايبوغرافي وخط Ping AR + LT"
        subtitle="الخط الرسمي المعتمد لجميع واجهات منصة راش إكس ومطبوعاتها. بأربعة أوزان تلبي كافة الاحتياجات من نصوص المقالات حتى العناوين الضخمة."
      >
        <a
          href="/brand/fonts/fonts.css"
          download="fonts.css"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-ink font-bold text-xs hover:bg-mist-gray/40 transition-colors shadow-xs shrink-0"
        >
          <FileCode className="w-3.5 h-3.5 text-dusty-blue" />
          <span>fonts.css</span>
        </a>
        <a
          href="/brand/rashx-fonts-kit.zip"
          download="rashx-fonts-kit.zip"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-ink text-white font-bold text-xs hover:bg-ink/85 transition-colors shadow-xs shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-warm-peach" />
          <span>حزمة الخط (ZIP)</span>
        </a>
      </BrandHeader>

      <main className="flex-1 w-full">
        {/* Full-width stage tester */}
        <section>
          <div
            className="min-h-[220px] sm:min-h-[340px] flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16 text-center transition-colors"
            style={{ backgroundColor: fontBg, color: fontColor }}
          >
            <p
              className="max-w-5xl break-words leading-snug px-2"
              style={{
                fontSize: `clamp(20px, 6vw, ${fontSize}px)`,
                fontWeight,
                lineHeight: 1.3,
                fontFamily: 'var(--font-brand)',
              }}
            >
              {sampleText || 'راش إكس RASHX'}
            </p>
          </div>

          {/* Toolbar */}
          <div className="bg-white shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:grid md:grid-cols-12 gap-3 sm:gap-4 items-stretch md:items-center">
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="اكتب هنا لتجربة الخط..."
                className="md:col-span-4 w-full px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm bg-mist-gray/30 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-ink"
              />

              <div className="md:col-span-3 flex items-center gap-2.5 sm:gap-3">
                <span className="text-[11px] sm:text-xs text-ink-muted font-bold shrink-0">الحجم</span>
                <input
                  type="range"
                  min="16"
                  max="96"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1 accent-ink h-1.5"
                />
                <span className="text-xs font-mono font-bold w-10 text-left">{fontSize}px</span>
              </div>

              <div className="md:col-span-3 flex items-center gap-1 bg-mist-gray/30 p-1 rounded-xl">
                {[400, 500, 700, 800].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setFontWeight(w)}
                    className={`flex-1 py-1.5 text-xs font-semibold sm:font-bold rounded-lg transition-colors ${
                      fontWeight === w ? 'bg-ink text-white shadow-2xs' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>

              <div className="md:col-span-2 flex items-center justify-center md:justify-end gap-2 pt-1 md:pt-0">
                {SCHEMES.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    title={s.label}
                    aria-label={s.label}
                    onClick={() => {
                      setFontBg(s.bg);
                      setFontColor(s.text);
                    }}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-2xs transition-transform hover:scale-110 ${
                      fontBg === s.bg ? 'ring-2 ring-ink ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: s.bg }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Weights as specimen rows */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
          <h2 className="text-xl sm:text-2xl font-bold sm:font-black mb-4 sm:mb-6">أوزان الخط ودور كل وزن</h2>
          <div className="bg-white rounded-2xl sm:rounded-3xl divide-y divide-mist-gray/50 overflow-hidden shadow-sm">
            {WEIGHTS.map((item, idx) => (
              <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-2 sm:gap-4 md:gap-6 p-4 sm:p-6 md:p-7 md:items-center">
                <div className="md:col-span-3 flex items-center md:flex-col gap-2 md:gap-1 md:items-start">
                  <span className="text-[10px] sm:text-xs font-mono font-bold bg-ink text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md w-fit">{item.weight}</span>
                  <span className="text-xs sm:text-sm font-bold text-ink">{item.titleAr}</span>
                </div>
                <div
                  className="md:col-span-6 text-base sm:text-2xl md:text-3xl leading-snug break-words my-1 md:my-0"
                  style={{ fontWeight: item.numeric, fontFamily: 'var(--font-brand)' }}
                >
                  {item.sample}
                </div>
                <p className="md:col-span-3 text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">{item.usage}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code + license split */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 w-full grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="lg:col-span-3 bg-ink text-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 border-b border-white/10">
              <div>
                <h4 className="text-xs sm:text-sm font-bold">@font-face CSS</h4>
                <p className="text-[10px] sm:text-[11px] text-white/70 font-normal">الصق الكود في ملف CSS لتفعيل الخط</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(FONT_CSS_SNIPPET, 'font-css-snippet')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-warm-peach text-ink rounded-lg text-[11px] sm:text-xs font-bold hover:bg-warm-peach/85 transition-colors"
              >
                {copiedItem === 'font-css-snippet' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedItem === 'font-css-snippet' ? 'تم النسخ!' : 'نسخ الكود'}</span>
              </button>
            </div>
            <pre dir="ltr" className="p-4 sm:p-5 text-[11px] sm:text-xs font-mono overflow-x-auto leading-relaxed text-left">{FONT_CSS_SNIPPET}</pre>
          </div>

          <div className="lg:col-span-2 bg-warm-peach/25 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-2.5 sm:space-y-3 self-start shadow-sm">
            <span className="font-bold sm:font-black block text-sm sm:text-base text-ink">إرشادات الترخيص والطباعة</span>
            <p className="text-xs sm:text-sm leading-relaxed text-ink-muted font-normal">
              خط <strong>Ping AR + LT</strong> مرخص للاستخدام. الشعارات مسارات فيكتور أصلية ولا تعتمد على تثبيت الخط.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-ink-muted font-normal">
              قبل الطباعة التجارية حوّل النصوص إلى مسارات (Create Outlines في Illustrator / Convert to Path في Inkscape) لضمان ثبات الخط.
            </p>
          </div>
        </section>
      </main>

      <Footer bgVariant="mist" />
    </div>
  );
}