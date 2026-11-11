'use client';

import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Globe, LayoutDashboard, Smartphone, UserCheck, Sparkles, ShieldCheck, Check, Lock } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX 4 Portals — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 * No mock screens: each portal is one clean card (icon, title, route, features).
 */

interface FourPillarsSubdomainProps {
  locale?: Locale;
}

interface Portal {
  id: string;
  icon: LucideIcon;
  tone: 'blue' | 'peach';
  path: string;
  tag: [string, string];
  title: [string, string];
  desc: [string, string];
  features: [string, string][];
}

const TONES = {
  blue: { tile: 'bg-dusty-blue text-ink', check: 'bg-dusty-blue/30', pill: 'bg-dusty-blue/20' },
  peach: { tile: 'bg-warm-peach text-ink', check: 'bg-warm-peach/50', pill: 'bg-warm-peach/30' },
} as const;

const PORTALS: Portal[] = [
  {
    id: 'website',
    icon: Globe,
    tone: 'blue',
    path: '',
    tag: ['الواجهة الأولى: الموقع', 'Portal 01: Website'],
    title: ['موقع المنشأة الإلكتروني', 'Branded Facility Website'],
    desc: [
      'واجهة بهوية صالونك تعرض الخدمات والأسعار وتقييمات العميلات، وتحول الزوار مباشرة إلى حجوزات.',
      'A site in your brand showing services, prices and reviews, turning visitors straight into bookings.',
    ],
    features: [
      ['كتالوج خدمات وأسعار تفاعلي', 'Interactive service & price menu'],
      ['معرض أعمال قبل/بعد', 'Before/After gallery'],
      ['ملفات تعريف الأخصائيات', 'Specialist profiles'],
      ['جاهز لمحركات البحث SEO', 'Local SEO ready'],
    ],
  },
  {
    id: 'admin',
    icon: LayoutDashboard,
    tone: 'peach',
    path: '/admin',
    tag: ['الواجهة الثانية: الإدارة', 'Portal 02: Admin'],
    title: ['لوحة التحكم ونقاط البيع', 'Admin HQ & Fast POS'],
    desc: [
      'غرفة عمليات للمالك والمدير: كاشير سريع، متابعة الإيرادات لحظيًا، إغلاق الصندوق، وتقارير الضريبة.',
      'One command center for owners: fast POS, live revenue, cash drawer closing and ZATCA tax reports.',
    ],
    features: [
      ['كاشير سريع يدعم تقسيم الدفع', 'Split-payment POS'],
      ['تقارير الضريبة والأرباح', 'VAT & profit reports'],
      ['إدارة المخزون والمواد', 'Stock control'],
      ['صلاحيات لكل موظف', 'Role-based permissions'],
    ],
  },
  {
    id: 'client',
    icon: Smartphone,
    tone: 'blue',
    path: '/book',
    tag: ['الواجهة الثالثة: العميلة', 'Portal 03: Client'],
    title: ['تطبيق حجز العميلة (PWA)', 'Client Booking App (PWA)'],
    desc: [
      'يفتح فورًا على جوال العميلة بدون تحميل من المتاجر، لتختار الأخصائية وتدفع العربون وتتابع نقاطها.',
      'Opens instantly on any phone with no app store, so clients pick a stylist, pay a deposit and track points.',
    ],
    features: [
      ['حجز ذاتي 24/7', '24/7 self-booking'],
      ['دفع عربون فوري', 'Instant deposits'],
      ['محفظة ولاء رقمية', 'Loyalty wallet'],
    ],
  },
  {
    id: 'staff',
    icon: UserCheck,
    tone: 'peach',
    path: '/staff',
    tag: ['الواجهة الرابعة: الأخصائية', 'Portal 04: Stylist'],
    title: ['بوابة الأخصائية', 'Stylist Portal'],
    desc: [
      'شاشة خاصة لكل موظفة لمتابعة مواعيدها وتسجيل استهلاك المواد وحساب عمولتها بشفافية تمنع أي خلاف.',
      'A personal workspace to follow the daily queue, log product usage and see commissions transparently.',
    ],
    features: [
      ['جدول مواعيد لحظي', 'Live daily queue'],
      ['خصم مواد الجلسة', 'Product usage log'],
      ['شفافية العمولات', 'Commission transparency'],
    ],
  },
];

const SAMPLE_SLUGS = [
  { labelAr: 'فيلفيت سبا', labelEn: 'Velvet Spa', slug: 'velvet-spa' },
  { labelAr: 'لافندر بيوتي', labelEn: 'Lavender Beauty', slug: 'lavender' },
  { labelAr: 'إيليت باربر', labelEn: 'Elite Barber', slug: 'elite-cut' },
];

export const FourPillarsSubdomain: React.FC<FourPillarsSubdomainProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const i = isAr ? 0 : 1;
  const [salonSlug, setSalonSlug] = useState('velvet-spa');

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} className="bg-neutral/40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        {/* Header + subdomain switcher */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink">
              <Sparkles className="h-4 w-4 text-dusty-blue" aria-hidden="true" />
              <span>{isAr ? '4 واجهات في نطاق واحد' : '4 Portals, 1 Subdomain'}</span>
            </div>
            <h2 className="text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl lg:text-4xl">
              {isAr ? 'نظام مستقل لكل فرد في صالونك' : 'One independent system for every role'}
            </h2>
            <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
              {isAr
                ? 'يمنحك راش إكس نطاقًا خاصًا بصالونك يربط 4 شاشات تعمل معًا لحظيًا، بدل أن تكون ضمن تطبيق مزدحم بالمنافسين.'
                : 'RashX gives your salon its own subdomain linking 4 live screens, instead of a crowded directory full of competitors.'}
            </p>
          </div>

          <div className="w-full space-y-3 rounded-2xl border border-mist-gray bg-white p-4 lg:w-[380px]">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-medium text-ink-muted">
                {isAr ? 'جرّب اسم النطاق:' : 'Try a subdomain:'}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-dusty-blue/30 px-2.5 py-1 text-[11px] font-medium text-ink">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {isAr ? 'بيانات معزولة' : 'Isolated data'}
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-neutral/40 px-3.5 py-2.5" dir="ltr">
              <Lock className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
              <div className="truncate font-mono text-xs text-ink-muted sm:text-sm">
                https://
                <span className="rounded bg-dusty-blue/30 px-1.5 py-0.5 font-semibold text-ink">{salonSlug}</span>
                .rashx.org
              </div>
            </div>

            <div className="flex items-center gap-2">
              {SAMPLE_SLUGS.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSalonSlug(item.slug)}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors ${
                    salonSlug === item.slug
                      ? 'bg-ink text-white'
                      : 'bg-neutral/60 text-ink-muted hover:text-ink'
                  }`}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portals */}
        <div className="grid gap-6 md:grid-cols-2">
          {PORTALS.map((portal) => {
            const tone = TONES[portal.tone];
            const Icon = portal.icon;
            return (
              <article
                key={portal.id}
                className="flex flex-col gap-5 rounded-3xl border border-mist-gray bg-white p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone.tile}`}>
                    <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium text-ink-muted">{portal.tag[i]}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-ink sm:text-xl lg:text-2xl">{portal.title[i]}</h3>
                  <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm">{portal.desc[i]}</p>
                </div>

                <div
                  dir="ltr"
                  className={`inline-flex w-fit max-w-full items-center truncate rounded-xl px-4 py-2 font-mono text-xs text-ink ${tone.pill}`}
                >
                  {salonSlug}.rashx.org{portal.path}
                </div>

                <ul className="grid gap-3 pt-1 sm:grid-cols-2">
                  {portal.features.map((feat) => (
                    <li key={feat[0]} className="flex items-center gap-2 text-xs font-medium text-ink">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg ${tone.check}`}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <span>{feat[i]}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FourPillarsSubdomain;