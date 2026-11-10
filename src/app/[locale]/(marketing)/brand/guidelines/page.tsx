/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Download, ZoomIn, X, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';

const DOS = [
  { title: 'الحفاظ على هوامش الأمان', text: 'اترك مسافة فارغة حول الشعار تعادل على الأقل ارتفاع حرف (R) من جميع الجهات.' },
  { title: 'استخدام النسخ الأصلية فقط', text: 'اعتمد ملفات الـ SVG المتوفرة هنا بدلاً من قص الشعار أو إعادة رسمه يدوياً.' },
  { title: 'وضوح التباين', text: 'ضع الشعار باللون الأسود فوق الخلفيات الفاتحة (الأزرق، الخوخي، الرمادي، والأبيض).' },
  { title: 'الرمز المختصر Rx', text: 'يُستخدم كعلامة مصغرة في الأيقونات والصور الرمزية للحسابات ونقاط البيع.' },
];

const DONTS = [
  { title: 'لا تشوّه أو تمط الشعار', text: 'حافظ دائماً على النسب المتناسقة (Aspect Ratio) عند التحجيم.' },
  { title: 'لا تغيّر الألوان المعتمدة', text: 'لا تستخدم ألواناً أو تدرجات غير مدرجة في لوحة الألوان الرسمية.' },
  { title: 'لا تضع الشعار الأبيض على خلفيات فاتحة', text: 'تباين الأزرق والخوخي مع الأبيض ضعيف، لذلك لا تضع لوجو أبيض فوقهما.' },
  { title: 'لا تضف تأثيرات خارجية', text: 'تجنب الظلال الكثيفة (Drop Shadows) والتظليلات ثلاثية الأبعاد والحدود غير المعتمدة.' },
];

export default function BrandGuidelinesPage() {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="الإرشادات الفنية وضوابط الهوية"
        title="دليل الإرشادات الشامل وضوابط الاستخدام"
        subtitle="بوستر الإرشادات بدقة 1600 × 2620 بكسل، يوضح مسافات حماية الشعار، لوحة الألوان وقواعد التباين، وضوابط الاستخدام المسموحة والممنوعة."
      >
        <a
          href="/brand/guidelines.svg"
          download="guidelines.svg"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-ink font-bold text-xs hover:bg-mist-gray/40 transition-colors shadow-xs shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-dusty-blue" />
          <span>تحميل guidelines.svg</span>
        </a>
      </BrandHeader>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
        {/* Rules column */}
        <section className="lg:col-span-7 space-y-6 sm:space-y-10 order-2 lg:order-1">
          <div className="flex items-center gap-3">
            <span className="p-2 sm:p-2.5 rounded-xl bg-dusty-blue/20 text-[#1e464e] shadow-xs">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold sm:font-black">ضوابط وقواعد الاستخدام</h2>
              <p className="text-xs text-ink-muted font-normal mt-0.5">للحفاظ على هوية راش إكس متماسكة واحترافية</p>
            </div>
          </div>

          {/* Dos */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 bg-dusty-blue/20 text-[#1e464e] font-bold sm:font-black text-sm sm:text-base">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <span>المسموح به دائماً (Do&apos;s)</span>
            </div>
            <ol className="divide-y divide-mist-gray/50">
              {DOS.map((r, i) => (
                <li key={i} className="flex gap-3 sm:gap-4 p-3.5 sm:p-5 sm:px-6">
                  <span className="text-2xl sm:text-3xl font-extrabold sm:font-black font-mono leading-none text-ink-muted/30">{i + 1}</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold">{r.title}</h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mt-0.5 sm:mt-1 font-normal">{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Don'ts */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 bg-warm-peach/30 text-[#854524] font-bold sm:font-black text-sm sm:text-base">
              <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
              <span>الممنوع تماماً (Don&apos;ts)</span>
            </div>
            <ol className="divide-y divide-mist-gray/50">
              {DONTS.map((r, i) => (
                <li key={i} className="flex gap-3 sm:gap-4 p-3.5 sm:p-5 sm:px-6">
                  <span className="text-2xl sm:text-3xl font-extrabold sm:font-black font-mono leading-none text-ink-muted/30">{i + 1}</span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold">{r.title}</h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mt-0.5 sm:mt-1 font-normal">{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sticky poster */}
        <aside className="lg:col-span-5 order-1 lg:order-2">
          <div className="lg:sticky lg:top-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 bg-mist-gray/30">
              <div>
                <h2 className="text-xs sm:text-sm font-bold sm:font-black">بوستر دليل الهوية (Vector)</h2>
                <p className="text-[10px] sm:text-[11px] text-ink-muted font-normal">قابل للطباعة حتى مقاس A0 دون فقدان للجودة</p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl text-xs font-bold hover:bg-mist-gray/50 transition-colors shrink-0 shadow-xs"
              >
                <ZoomIn className="w-4 h-4" />
                <span>تكبير</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              className="block w-full bg-mist-gray/40 max-h-[640px] overflow-y-auto cursor-zoom-in"
              aria-label="تكبير البوستر"
            >
              <img src="/brand/guidelines.svg" alt="RASHX Brand Guidelines Poster" className="w-full object-contain" />
            </button>
          </div>
        </aside>
      </main>

      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 px-6 border-b border-mist-gray">
              <h3 className="text-base font-bold">بوستر إرشادات العلامة التجارية</h3>
              <div className="flex items-center gap-2">
                <a
                  href="/brand/guidelines.svg"
                  download="guidelines.svg"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ink text-white text-xs font-bold hover:bg-ink/85 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-warm-peach" />
                  <span>تحميل SVG</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  aria-label="إغلاق"
                  className="p-1.5 rounded-lg hover:bg-mist-gray text-ink-muted hover:text-ink transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6 flex items-start justify-center bg-mist-gray/30">
              <img src="/brand/guidelines.svg" alt="Guidelines Poster Full" className="max-w-full object-contain" />
            </div>
          </div>
        </div>
      )}

      <Footer bgVariant="mist" />
    </div>
  );
}