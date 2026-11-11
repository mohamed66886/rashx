'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Users, Server, ArrowRight, ArrowLeft } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX Security snapshot — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 */

interface SecuritySnapshotProps {
  locale?: Locale;
}

// Icon tiles alternate between the two brand tints
const TILE_TONES = ['bg-dusty-blue/30', 'bg-warm-peach/40', 'bg-warm-peach/40', 'bg-dusty-blue/30'] as const;

export const SecuritySnapshot: React.FC<SecuritySnapshotProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const securityPillars = [
    {
      icon: Server,
      titleAr: 'عزل تام بين بيانات المنشآت',
      titleEn: 'Isolated data per business',
      descAr: 'فصل رقمي صارم يضمن بقاء بيانات صالونك وفواتيرك وقوائم عميلاتك في بيئة سحابية معزولة.',
      descEn: 'Strict data partitioning keeps your salon’s financials and client records private and isolated.',
    },
    {
      icon: Users,
      titleAr: 'صلاحيات وأدوار لكل موظف',
      titleEn: 'Role-based permissions',
      descAr: 'تحديد دقيق لما يراه كل موظف (استقبال، محاسب، أخصائية)، مع سجل تدقيق لكل حركة بالنظام.',
      descEn: 'Control exactly what each role sees (reception, accountant, stylist), with a full audit trail.',
    },
    {
      icon: Lock,
      titleAr: 'تشفير عالي المستوى للبيانات',
      titleEn: 'Data encryption',
      descAr: 'تشفير المعاملات المالية ومعلومات الاتصال الحساسة أثناء النقل والتخزين السحابي.',
      descEn: 'Financial transactions and client contact details are encrypted in transit and at rest.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'التزام بنظام PDPL السعودي',
      titleEn: 'Saudi PDPL alignment',
      descAr: 'احترام ضوابط نظام حماية البيانات الشخصية الصادر في المملكة العربية السعودية ولوائحه.',
      descEn: 'Built around the guidelines of the Saudi Personal Data Protection Law.',
    },
  ];

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      id="security-brief"
      className="border-t border-mist-gray bg-white py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral/40 p-6 sm:p-10 lg:p-12">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink">
                <Lock className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
                <span>{isAr ? 'أمان وسرية البيانات' : 'Data Privacy & Security'}</span>
              </div>
              <h2 className="text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {isAr
                  ? 'بيانات صالونك وعميلاتك في أيدٍ أمينة ومشفرة'
                  : 'Your salon and client records: secure, isolated & encrypted'}
              </h2>
              <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
                {isAr
                  ? 'نولي أمان البيانات الأولوية القصوى من خلال بنية سحابية مصممة وفق الأنظمة السعودية.'
                  : 'Data security is a top priority, with a cloud architecture designed around Saudi regulations.'}
              </p>
            </div>

            <Link
              href={`/${locale}/security`}
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-warm-peach px-5 py-3 text-xs font-semibold text-ink transition-colors hover:bg-warm-peach/80 sm:text-sm"
            >
              <span>{isAr ? 'سياسة الأمان والامتثال' : 'Security & compliance'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={idx}
                  className="space-y-3 rounded-2xl border border-mist-gray bg-white p-5"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-ink ${TILE_TONES[idx]}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xs font-semibold text-ink sm:text-sm">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-[13px]">
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySnapshot;