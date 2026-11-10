'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Users, Server, ArrowRight, ArrowLeft } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface SecuritySnapshotProps {
  locale?: Locale;
}

export const SecuritySnapshot: React.FC<SecuritySnapshotProps> = ({
  locale = DEFAULT_LOCALE,
}) => {
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const securityPillars = [
    {
      icon: Server,
      titleAr: 'عزل منطقي تام بين بيانات المنشآت',
      titleEn: 'Logical Multi-Tenant Isolation',
      descAr: 'فصل رقمي صارم يضمن بقاء بيانات صالونك وفواتيرك وقوائم عملائك في بيئة سحابية معزولة تمامًا.',
      descEn: 'Strict data partitioning ensuring your salon’s financials and client logs remain private and isolated.',
    },
    {
      icon: Users,
      titleAr: 'صلاحيات وأدوار متقدمة لكل موظف',
      titleEn: 'Granular Role-Based Permissions',
      descAr: 'تحديد دقيق لما يراه كل موظف (استقبال، محاسب، أخصائية)، مع سجل تدقيق كامل لكل حركة بالنظام.',
      descEn: 'Define precise staff visibility per shift (reception, accountant, stylist) with complete audit trail logs.',
    },
    {
      icon: Lock,
      titleAr: 'تشفير عالي المستوى للبيانات',
      titleEn: 'End-to-End Data Encryption',
      descAr: 'تشفير كامل لكافة المعاملات المالية ومعلومات الاتصال الحساسة أثناء النقل والتخزين السحابي.',
      descEn: 'Bank-grade TLS and rest encryption safeguarding all transactions and client phone numbers.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'التزام تام بنظام PDPL السعودي',
      titleEn: 'Full Saudi PDPL Compliance',
      descAr: 'احترام كامل لضوابط نظام حماية البيانات الشخصية الصادر في المملكة العربية السعودية ولوائحه.',
      descEn: 'Fully adhering to the official guidelines and standards of the Saudi Personal Data Protection Law.',
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-white border-t border-mist-gray" id="security-brief">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-b from-[#FAFBFB] to-white border border-mist-gray">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-bold">
                <Lock className="w-3.5 h-3.5 text-dusty-blue" />
                <span>{isAr ? 'أمان وسرية البيانات' : 'Data Privacy & Security'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                {isAr
                  ? 'بيانات صالونك وعميلاتك في أيدٍ أمينة ومشفرة'
                  : 'Your Salon & Client Records: Secure, Isolated & Encrypted'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {isAr
                  ? 'نولي أمان البيانات وسيادتها الأولوية القصوى من خلال بنية تحتية سحابية مصممة للالتزام الصارم بالأنظمة السعودية.'
                  : 'We prioritize data sovereignty through cloud architecture designed around strict Saudi compliance standards.'}
              </p>
            </div>

            <Link
              href={`/${locale}/security`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-dusty-blue transition-colors shrink-0"
            >
              <span>{isAr ? 'استعرض سياسة الأمان والامتثال' : 'Explore Full Security Architecture'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-mist-gray/80 shadow-2xs space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-mist-gray/60 flex items-center justify-center text-ink shrink-0">
                    <Icon className="w-5 h-5 text-dusty-blue" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-ink">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
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

