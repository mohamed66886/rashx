'use client';

import React, { useState } from 'react';
import { Copy, Check, ShieldCheck } from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';
import { BRAND_COLORS } from '@/components/brand/brand-data';

function luminance(hex: string) {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: string, b: string) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

const BG_OPTIONS = [
  { hex: '#91B8C0', label: 'أزرق' },
  { hex: '#F0C5AE', label: 'خوخي' },
  { hex: '#FFFFFF', label: 'أبيض' },
  { hex: '#E5E9E8', label: 'ميست' },
  { hex: '#000000', label: 'أسود' },
];

const TEXT_OPTIONS = [
  { hex: '#000000', label: 'أسود' },
  { hex: '#5E6665', label: 'رمادي' },
  { hex: '#FFFFFF', label: 'أبيض' },
];

export default function BrandColorsPage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [testBg, setTestBg] = useState('#91B8C0');
  const [testText, setTestText] = useState('#000000');

  const handleCopy = (text: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(id);
      setTimeout(() => setCopiedItem((prev) => (prev === id ? null : prev)), 2000);
    }
  };

  const ratio = contrastRatio(testBg, testText);
  const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA كبير' : 'فاشل';

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="لوحة الألوان الرسمية المعتمدة"
        title="ألوان العلامة التجارية وقواعد التباين"
        subtitle="الألوان الرسمية لمنظومة راش إكس. تم اختيار درجات الألوان لتمنح طابعاً عصرياً وهادئاً مع نسب تباين متوافقة مع معايير WCAG AAA/AA."
      />

      <main className="flex-1 w-full">
        {/* Full-bleed color columns */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 w-full">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold sm:font-black">الألوان الأساسية والمحايدة (6 ألوان)</h2>
            <span className="text-xs text-ink-muted font-medium hidden sm:block">مرّر على اللون لتكبيره · انقر على الأزرار للنسخ</span>
          </div>

          <div className="flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm lg:h-[560px]">
            {BRAND_COLORS.map((color, i) => {
              const light = color.hex === '#FFFFFF' || color.hex === '#E5E9E8';
              return (
                <div
                  key={color.id}
                  className={`group flex-1 lg:hover:flex-[2] transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between gap-4 sm:gap-6 min-h-[170px] sm:min-h-[220px] ${
                    i !== 0 ? 'border-t lg:border-t-0 lg:border-r border-black/10' : ''
                  }`}
                  style={{ backgroundColor: color.hex, color: color.textColor }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold border"
                      style={{ borderColor: color.textColor }}
                    >
                      {color.roleAr}
                    </span>
                    {color.isPrimary && (
                      <span
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold"
                        style={{
                          backgroundColor: light ? '#000000' : '#FFFFFF',
                          color: light ? '#FFFFFF' : '#000000',
                        }}
                      >
                        الأساسي
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold sm:font-black font-mono tracking-wider uppercase">{color.hex}</div>
                      <div className="text-[11px] sm:text-xs font-mono opacity-80">RGB: {color.rgb}</div>
                      <h3 className="text-sm sm:text-base font-bold mt-2 sm:mt-3">{color.nameAr}</h3>
                      <p className="text-[10px] sm:text-[11px] font-mono opacity-80">{color.nameEn} · {color.wcagRating}</p>
                      <p className="text-[11px] leading-relaxed mt-1.5 sm:mt-2 opacity-90 font-normal lg:hidden lg:group-hover:block">{color.usageTips}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'hex', label: 'HEX', value: color.hex },
                        { id: 'rgb', label: 'RGB', value: `rgb(${color.rgb})` },
                        { id: 'var', label: 'CSS', value: color.cssVar },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => handleCopy(b.value, `${color.id}-${b.id}`)}
                          title={`نسخ ${b.label}`}
                          className="inline-flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border text-[10px] sm:text-[11px] font-mono font-semibold hover:bg-black/10"
                          style={{ borderColor: color.textColor }}
                        >
                          {copiedItem === `${color.id}-${b.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedItem === `${color.id}-${b.id}` ? 'تم' : b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Rule + Sandbox */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-warm-peach/25 rounded-3xl p-6 sm:p-8 space-y-3 self-start shadow-sm">
            <span className="inline-flex p-3 rounded-2xl bg-white shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#7c3814]" />
            </span>
            <h3 className="text-lg font-black text-ink">قاعدة التباين الأساسية</h3>
            <p className="text-sm leading-relaxed text-ink-muted">
              الأزرق الهادئ (Dusty Blue) والخوخي الدافئ (Warm Peach) تباينهما منخفض مع الأبيض (حوالي 2:1). لذلك يُستخدمان دائماً <strong>كخلفيات وتفاصيل جمالية</strong>، ويوضع فوقهما الشعار والنص باللون الأسود النقي لتباين يفوق 10:1.
            </p>
          </div>

          <div className="lg:col-span-8 bg-white rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-5 shadow-sm">
            <div className="md:col-span-2 p-6 space-y-6 md:border-l border-b md:border-b-0 border-mist-gray/50">
              <div>
                <h3 className="text-base font-black">مختبر التباين الحي</h3>
                <p className="text-xs text-ink-muted mt-1">اختر الخلفية والنص لقياس التباين مباشرة</p>
              </div>

              <div>
                <div className="text-xs font-bold text-ink-muted mb-2">الخلفية</div>
                <div className="flex flex-wrap gap-2">
                  {BG_OPTIONS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setTestBg(c.hex)}
                      title={c.label}
                      aria-label={c.label}
                      className={`w-9 h-9 rounded-full border border-ink/25 transition-transform hover:scale-110 ${
                        testBg === c.hex ? 'ring-2 ring-ink ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-ink-muted mb-2">النص</div>
                <div className="flex flex-wrap gap-2">
                  {TEXT_OPTIONS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setTestText(c.hex)}
                      title={c.label}
                      aria-label={c.label}
                      className={`w-9 h-9 rounded-full border border-ink/25 transition-transform hover:scale-110 ${
                        testText === c.hex ? 'ring-2 ring-ink ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-mist-gray/40 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-ink-muted font-bold">نسبة التباين</div>
                  <div className="text-2xl font-black font-mono">{ratio.toFixed(2)}:1</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black ${ratio >= 4.5 ? 'bg-dusty-blue/20 text-[#1e464e]' : 'bg-warm-peach/30 text-[#7c3814]'}`}>
                  {grade}
                </span>
              </div>
            </div>

            <div
              className="md:col-span-3 p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-3 min-h-[300px] transition-colors"
              style={{ backgroundColor: testBg, color: testText }}
            >
              <div className="text-2xl sm:text-3xl font-black">راش إكس RASHX — الفوترة الإلكترونية السريعة</div>
              <p className="max-w-md text-sm sm:text-base leading-relaxed">
                نموذج نصي لتوضيح التباين وقابلية القراءة على الواجهات الرقمية والمطبوعات الرسمية.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer bgVariant="mist" />
    </div>
  );
}