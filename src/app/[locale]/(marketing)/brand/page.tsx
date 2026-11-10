/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  FolderArchive,
  Palette,
  Type,
  ImageIcon,
  Smartphone,
  Share2,
  FileText,
  Mail,
  Layers,
  ArrowLeft,
  Search,
} from 'lucide-react';
import { Header, Footer } from '@/components/ui';
import { BrandHeader } from '@/components/brand/BrandHeader';

interface PortalSection {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  zipUrl: string;
  zipFilename: string;
  count: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  previewItems: string[];
}

const PORTAL_SECTIONS: PortalSection[] = [
  {
    id: 'logos',
    title: 'الشعارات والرموز الرسمية',
    subtitle: 'الشعار النصي اللاتيني، الشعار العربي، رمز Rx المختصر، والشعار المزدوج بنسخ شفافة مفرغة وبخلفيات متعددة.',
    href: '/brand/logos',
    zipUrl: '/brand/rashx-logos.zip',
    zipFilename: 'rashx-logos.zip',
    count: '23 ملف فيكتور SVG',
    icon: ImageIcon,
    badge: 'SVG مسارات أصلية',
    previewItems: [
      '/brand/logo/wordmark/wordmark-black.svg',
      '/brand/logo/wordmark-arabic/wordmark-arabic-black.svg',
      '/brand/logo/symbol-rx/symbol-rx-black.svg',
    ],
  },
  {
    id: 'colors',
    title: 'لوحة الألوان الرسمية',
    subtitle: 'الألوان الستة المعتمدة مع نسب التباين ومعايير إمكانية الوصول WCAG. نسخ أكواد HEX وRGB ومتغيرات CSS بنقرة.',
    href: '/brand/colors',
    zipUrl: '/brand/rashx-brand-kit.zip',
    zipFilename: 'rashx-brand-kit.zip',
    count: '6 ألوان معتمدة',
    icon: Palette,
    badge: 'معتمدة بالكامل',
    previewItems: ['#91B8C0', '#F0C5AE', '#FFFFFF', '#E5E9E8', '#000000', '#5E6665'],
  },
  {
    id: 'typography',
    title: 'الخط والتايبوغرافي (Ping AR + LT)',
    subtitle: 'الخط الرسمي بأوزانه الأربعة مع مختبر تفاعلي، ملف fonts.css، وكود @font-face الجاهز للمشاريع.',
    href: '/brand/typography',
    zipUrl: '/brand/rashx-fonts-kit.zip',
    zipFilename: 'rashx-fonts-kit.zip',
    count: '4 أوزان متكاملة',
    icon: Type,
    badge: 'مختبر تفاعلي حي',
    previewItems: ['Regular 400', 'Medium 500', 'Bold 700', 'ExtraBold 800'],
  },
  {
    id: 'icons',
    title: 'أيقونات التطبيقات والفافيكون',
    subtitle: 'أيقونات Squircle للهواتف الذكية ورموز الفافيكون للمتصفح مع محاكاة بيئة الاستخدام الحقيقية.',
    href: '/brand/icons',
    zipUrl: '/brand/rashx-icons.zip',
    zipFilename: 'rashx-icons.zip',
    count: '8 أيقونات وفافيكون',
    icon: Smartphone,
    badge: 'شاشات الهاتف والويب',
    previewItems: [
      '/brand/icons/app-icon-rx-black-on-blue.svg',
      '/brand/icons/app-icon-rx-black-on-peach.svg',
      '/brand/icons/favicon-black-on-blue.svg',
    ],
  },
  {
    id: 'social',
    title: 'الهوية الرقمية والشبكات الاجتماعية',
    subtitle: 'الصور الرمزية (Avatars)، أغلفة القنوات والصفحات، وبطاقات مشاركة الروابط (OG Share).',
    href: '/brand/social',
    zipUrl: '/brand/rashx-social.zip',
    zipFilename: 'rashx-social.zip',
    count: '16 تصميماً رقمياً',
    icon: Share2,
    badge: 'أبعاد قياسية 1200×630',
    previewItems: [
      '/brand/social/avatar-rx-black-on-blue.svg',
      '/brand/social/avatar-rx-black-on-peach.svg',
      '/brand/social/og-share-blue.svg',
    ],
  },
  {
    id: 'documents',
    title: 'المستندات والنماذج المكتبية الرسمية',
    subtitle: 'عروض تقديمية 16:9، كروت شخصية، خطابات A4 عربي وإنجليزي، فاتورة ضريبية، ومظاريف.',
    href: '/brand/documents',
    zipUrl: '/brand/rashx-documents.zip',
    zipFilename: 'rashx-documents.zip',
    count: '9 نماذج مكتبية',
    icon: FileText,
    badge: 'جاهزة للطباعة والعرض',
    previewItems: [
      '/brand/documents/presentation-cover-16x9.svg',
      '/brand/documents/business-card-front.svg',
      '/brand/documents/invoice-a4.svg',
    ],
  },
  {
    id: 'email',
    title: 'قوالب وتوقيعات البريد الإلكتروني',
    subtitle: 'توقيعات HTML بنقرة واحدة، قوالب رسائل عربية وإنجليزية، وأصول PNG ريتينا عالية الدقة.',
    href: '/brand/email',
    zipUrl: '/brand/rashx-email-templates.zip',
    zipFilename: 'rashx-email-templates.zip',
    count: '9 أصول وقوالب',
    icon: Mail,
    badge: 'متوافقة مع Gmail وOutlook',
    previewItems: [
      '/brand/email/images/logo-wordmark@2x.png',
      '/brand/email/images/logo-symbol-rx@2x.png',
      '/brand/email/images/email-header@2x.png',
    ],
  },
  {
    id: 'guidelines',
    title: 'دليل الإرشادات الشامل وضوابط الاستخدام',
    subtitle: 'بوستر الهوية الفيكتور 1600 × 2620 بكسل مع الضوابط الصارمة للحفاظ على هوية العلامة.',
    href: '/brand/guidelines',
    zipUrl: '/brand/guidelines.svg',
    zipFilename: 'guidelines.svg',
    count: "بوستر كامل + Do's & Don'ts",
    icon: Layers,
    badge: 'معايير النشر المعتمدة',
    previewItems: ['/brand/guidelines.svg'],
  },
];

const DOWNLOADS = [
  { name: 'الشعارات', meta: '23 ملف · SVG', url: '/brand/rashx-logos.zip' },
  { name: 'الأيقونات', meta: '8 ملفات · SVG', url: '/brand/rashx-icons.zip' },
  { name: 'السوشيال ميديا', meta: '16 تصميماً · SVG', url: '/brand/rashx-social.zip' },
  { name: 'المستندات والنماذج', meta: '9 ملفات · SVG', url: '/brand/rashx-documents.zip' },
  { name: 'البريد والتوقيع', meta: 'HTML · PNG', url: '/brand/rashx-email-templates.zip' },
  { name: 'الخط الطباعي', meta: 'CSS · MD', url: '/brand/rashx-fonts-kit.zip' },
];

export default function BrandOverviewPage() {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredSections = PORTAL_SECTIONS.filter((section) => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return section.title.toLowerCase().includes(q) || section.subtitle.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col font-sans selection:bg-warm-peach selection:text-ink">
      <Header variant="marketing" />

      <BrandHeader
        badge="الهوية الرسمية المعتمدة · RASHX Brand Kit"
        title="بوابة الهوية البصرية والأصول الرقمية"
        subtitle="مكتبة الأصول الرقمية المتكاملة لمنصة راش إكس. تصفح الأقسام لتحميل الشعارات، نسخ الألوان، تجربة الخطوط، ومعاينة المستندات."
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
          {/* Index list (main) */}
          <section className="lg:col-span-8 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-3xl font-bold sm:font-black">فهرس الأقسام</h2>
                <p className="text-xs text-ink-muted mt-0.5 sm:mt-1 font-normal">8 أقسام متخصصة لتسهيل الوصول والتنزيل</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-ink-muted absolute right-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="ابحث عن قسم أو أصل..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 sm:py-2.5 text-xs bg-white border border-mist-gray rounded-xl focus:outline-hidden focus:border-ink"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden divide-y divide-mist-gray/60 shadow-sm">
              {filteredSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <article key={section.id} className="p-4 sm:p-7 grid grid-cols-12 gap-3 sm:gap-6 items-start">
                    <div className="col-span-2 sm:col-span-1 text-2xl sm:text-4xl font-extrabold sm:font-black font-mono text-ink-muted/30">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="col-span-10 sm:col-span-11 space-y-3 sm:space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <span className={`p-2 sm:p-2.5 rounded-xl ${index % 2 === 0 ? 'bg-dusty-blue/20 text-[#1e464e]' : 'bg-warm-peach/30 text-[#7c3814]'} shrink-0`}>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                          <div>
                            <h3 className="text-sm sm:text-lg font-bold sm:font-black">{section.title}</h3>
                            <span className="text-[11px] sm:text-xs font-mono font-medium text-ink-muted">{section.count}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] font-semibold bg-mist-gray/50 text-ink-muted">
                          {section.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-normal">{section.subtitle}</p>

                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {section.id === 'colors'
                          ? section.previewItems.map((hex, i) => (
                              <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-2xs" style={{ backgroundColor: hex }} />
                            ))
                          : section.id === 'typography'
                          ? section.previewItems.map((w, i) => (
                              <span key={i} className="font-mono text-[10px] sm:text-[11px] font-semibold bg-mist-gray/40 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-ink-muted">
                                {w}
                              </span>
                            ))
                          : section.previewItems.map((item, i) => (
                              <div key={i} className="h-12 w-16 sm:h-14 sm:w-20 flex items-center justify-center p-1.5 sm:p-2 bg-mist-gray/30 rounded-lg">
                                <img src={item} alt="" className="max-h-full max-w-full object-contain" />
                              </div>
                            ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Link
                          href={section.href}
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-ink text-white text-xs font-bold hover:bg-ink/85 transition-colors shadow-xs"
                        >
                          <span>فتح الصفحة</span>
                          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Link>
                        <a
                          href={section.zipUrl}
                          download={section.zipFilename}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-mist-gray/40 text-ink text-xs font-bold hover:bg-mist-gray/70 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>تحميل</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
              {filteredSections.length === 0 && (
                <div className="p-12 text-center text-sm font-bold text-ink-muted">لا توجد أقسام مطابقة للبحث</div>
              )}
            </div>
          </section>

          {/* Download center (sticky aside) */}
          <aside className="lg:col-span-4 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-warm-peach/25 rounded-3xl p-6 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-warm-peach/50 flex items-center justify-center mb-4">
                  <FolderArchive className="w-6 h-6 text-[#7c3814]" />
                </div>
                <h3 className="text-lg font-black text-ink">الحزمة الكاملة</h3>
                <p className="text-xs text-ink-muted leading-relaxed mt-1 mb-5">كل الشعارات والألوان والنماذج في ملف واحد جاهز للتنزيل المباشر.</p>
                <a
                  href="/brand/rashx-brand-kit.zip"
                  download="rashx-brand-kit.zip"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ink text-white text-sm font-bold hover:bg-ink/85 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 text-warm-peach" />
                  <span>تحميل Full Brand Kit</span>
                </a>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm">
                <h3 className="text-sm font-black mb-3">مركز التحميل السريع</h3>
                <ul className="divide-y divide-mist-gray/60">
                  {DOWNLOADS.map((d) => (
                    <li key={d.url} className="py-3 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold">{d.name}</div>
                        <div className="text-[11px] text-ink-muted font-mono">{d.meta}</div>
                      </div>
                      <a
                        href={d.url}
                        download
                        aria-label={`تحميل ${d.name}`}
                        className="p-2 rounded-lg bg-mist-gray/40 hover:bg-ink hover:text-white transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer bgVariant="mist" />
    </div>
  );
}