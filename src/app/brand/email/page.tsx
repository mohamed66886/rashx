/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Download, Copy, Check, ExternalLink, FolderArchive, Info } from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';
import { EMAIL_ASSETS, RAW_SIGNATURE_HTML } from '@/components/brand/brand-data';

const TEMPLATES = [
  {
    id: 'ar',
    tag: 'قالب الرسائل العربي (RTL)',
    tagBg: 'bg-dusty-blue',
    title: 'قالب المراسلات والنشرات البريدية العربية',
    desc: 'تصميم نظيف يبرز شعار راش إكس وعناوين الأخبار مع زر دعوة للإجراء (CTA) متناسق.',
    href: '/brand/email/email-template-ar.html',
    file: 'email-template-ar.html',
    open: 'فتح في نافذة كاملة',
    download: 'تحميل القالب العربي',
    iframeTitle: 'Arabic Email Template Preview',
  },
  {
    id: 'en',
    tag: 'قالب الرسائل الإنجليزي (LTR)',
    tagBg: 'bg-warm-peach',
    title: 'International English Email Template',
    desc: 'Clean, responsive layout for international partners, account receipts, and product announcements.',
    href: '/brand/email/email-template-en.html',
    file: 'email-template-en.html',
    open: 'Open in new window',
    download: 'تحميل القالب الإنجليزي',
    iframeTitle: 'English Email Template Preview',
  },
];

export default function BrandEmailPage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(id);
      setTimeout(() => setCopiedItem((prev) => (prev === id ? null : prev)), 2000);
    }
  };

  const pngAssets = EMAIL_ASSETS.filter((a) => a.type === 'png-image');

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="المراسلات وتوقيعات البريد"
        title="قوالب وتوقيعات البريد الإلكتروني (Email & Signatures)"
        subtitle="توقيعات HTML الجاهزة لـ Gmail وOutlook، قوالب النشرات والمراسلات بالعربية والإنجليزية، وأصول PNG عالية الدقة."
      >
        <a
          href="/brand/rashx-email-templates.zip"
          download="rashx-email-templates.zip"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-ink font-bold text-xs hover:bg-mist-gray/40 transition-colors shadow-xs shrink-0"
        >
          <FolderArchive className="w-3.5 h-3.5 text-dusty-blue" />
          <span>تحميل البريد (ZIP)</span>
        </a>
      </BrandHeader>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14 w-full">
        {/* Signature: preview + code side by side */}
        <section>
          <div className="mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-bold sm:font-black">التوقيع الرسمي المعتمد</h2>
            <p className="text-xs text-ink-muted mt-0.5 sm:mt-1 font-normal">
              مبني بالجداول الكلاسيكية (Table-based HTML) مع Inline CSS ليعمل في كل برامج البريد.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-sm">
            <div className="p-4 sm:p-6 md:p-8 bg-mist-gray/40 flex items-center justify-center overflow-x-auto">
              <div
                className="inline-block p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-xs"
                dangerouslySetInnerHTML={{ __html: RAW_SIGNATURE_HTML }}
              />
            </div>

            <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 justify-between">
              <ol className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm leading-relaxed font-normal">
                <li className="flex gap-2.5 sm:gap-3"><span className="font-bold font-mono">01</span><span>انسخ كود HTML للتوقيع.</span></li>
                <li className="flex gap-2.5 sm:gap-3"><span className="font-bold font-mono">02</span><span>افتح إعدادات التوقيع في Gmail أو Outlook والصقه في مربع التحرير.</span></li>
                <li className="flex gap-2.5 sm:gap-3"><span className="font-bold font-mono">03</span><span>استبدل الاسم والبيانات الافتراضية بمعلوماتك.</span></li>
              </ol>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(RAW_SIGNATURE_HTML, 'raw-signature-html')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-ink text-white rounded-xl text-xs font-bold hover:bg-ink/85 transition-colors shadow-xs"
                >
                  {copiedItem === 'raw-signature-html' ? <Check className="w-3.5 h-3.5 text-warm-peach" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedItem === 'raw-signature-html' ? 'تم نسخ كود التوقيع!' : 'نسخ كود HTML للتوقيع'}</span>
                </button>
                <a
                  href="/brand/email/signature.html"
                  download="signature.html"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-mist-gray/40 rounded-xl text-xs font-bold hover:bg-mist-gray/80 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل ملف HTML</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Templates as browser windows */}
        <section>
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-bold sm:font-black">قوالب الرسائل والنشرات</h2>
            <span className="text-xs text-ink-muted font-medium hidden sm:block">متجاوبة مع الهواتف والكمبيوتر</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {TEMPLATES.map((t) => (
              <div key={t.id} className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white flex flex-col shadow-sm">
                <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-mist-gray/40">
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-warm-peach border border-black/10" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-dusty-blue border border-black/10" />
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white border border-black/10" />
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-md ${t.tagBg}`}>{t.tag}</span>
                  <a href={t.href} target="_blank" rel="noreferrer" className="mr-auto text-xs font-bold hover:underline flex items-center gap-1">
                    <span>{t.open}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="h-64 sm:h-80 bg-white overflow-hidden relative">
                  <iframe
                    src={t.href}
                    title={t.iframeTitle}
                    className="w-full h-full border-0 pointer-events-none scale-90 origin-top"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold">{t.title}</h3>
                    <p className="text-[11px] sm:text-xs text-ink-muted leading-relaxed mt-0.5 sm:mt-1 font-normal">{t.desc}</p>
                  </div>
                  <a
                    href={t.href}
                    download={t.file}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-ink text-white text-xs font-bold hover:bg-ink/85 transition-colors shrink-0 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-warm-peach" />
                    <span>{t.download}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PNG assets as table rows */}
        <section className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
          <div className="flex items-start gap-3 p-4 sm:p-6 bg-dusty-blue/20">
            <Info className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 text-[#1e464e]" />
            <div>
              <h3 className="text-sm sm:text-base font-bold sm:font-black">صور PNG عالية الدقة (@2x Retina)</h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mt-0.5 sm:mt-1 font-normal">
                برامج البريد مثل Outlook وGmail قد لا تعرض SVG بشكل موثوق، لذلك نوفر نسخ PNG بدقة الضعف لتبدو حادة على شاشات Retina.
              </p>
            </div>
          </div>

          <ul className="divide-y divide-mist-gray/50">
            {pngAssets.map((png) => (
              <li key={png.id} className="flex items-center gap-4 p-4 sm:px-6">
                <div className="w-28 h-16 bg-mist-gray/40 rounded-lg flex items-center justify-center p-2 shrink-0">
                  <img src={png.filePath} alt={png.nameAr} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1 min-w-0 text-sm font-bold truncate">{png.nameAr}</div>
                <a
                  href={png.filePath}
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-mist-gray/40 rounded-xl text-xs font-bold hover:bg-mist-gray/80 transition-colors shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل PNG</span>
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