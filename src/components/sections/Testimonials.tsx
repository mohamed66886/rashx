'use client';

import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface TestimonialsProps {
  locale?: Locale;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';

  const placeholders = [
    {
      id: 1,
      quoteAr:
        '[TODO: سيتم إدراج تقييم حقيقي لمالك/مدير صالون نسائي في الرياض بعد انتهاء مرحلة الإطلاق التجريبي]',
      quoteEn:
        '[TODO: Verified testimonial from a Riyadh salon manager will be inserted here post-launch]',
      nameAr: '[TODO: اسم مالك المنشأة]',
      nameEn: '[TODO: Client Name]',
      facilityAr: '[TODO: اسم الصالون / المشغل - الرياض]',
      facilityEn: '[TODO: Salon Name - Riyadh]',
    },
    {
      id: 2,
      quoteAr:
        '[TODO: سيتم إدراج تقييم حقيقي لمدير مركز سبا واستجمام في جدة بعد انتهاء مرحلة الإطلاق التجريبي]',
      quoteEn:
        '[TODO: Verified testimonial from a Jeddah spa manager will be inserted here post-launch]',
      nameAr: '[TODO: اسم مدير المركز]',
      nameEn: '[TODO: Center Director]',
      facilityAr: '[TODO: مركز سبا واستجمام - جدة]',
      facilityEn: '[TODO: Spa Center - Jeddah]',
    },
    {
      id: 3,
      quoteAr:
        '[TODO: سيتم إدراج تقييم حقيقي لسلسلة صالونات حلاقة في الشرقية بعد انتهاء مرحلة الإطلاق التجريبي]',
      quoteEn:
        '[TODO: Verified testimonial from an Eastern Province barbershop chain will be inserted here]',
      nameAr: '[TODO: اسم المستثمر / المالك]',
      nameEn: '[TODO: Franchise Owner]',
      facilityAr: '[TODO: سلسلة صالونات حلاقة - الدمام]',
      facilityEn: '[TODO: Barbershop Chain - Dammam]',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAFBFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'تجارب المنشآت الشريكة' : 'Partner Facilities'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            {isAr ? 'آراء وتجارب شركاء النجاح' : 'Feedback from Our Partners'}
          </h2>

          <p className="text-xs sm:text-sm text-ink-muted">
            {isAr
              ? 'نحرص في راش إكس على توثيق تجارب عملائنا الحقيقية بشفافية ومصداقية تامة [TODO].'
              : 'At RashX, we uphold absolute transparency by featuring only verified client reviews [TODO].'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-dashed border-mist-gray space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-dusty-blue/40" />
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed italic">
                  {isAr ? item.quoteAr : item.quoteEn}
                </p>
              </div>

              <div className="pt-4 border-t border-mist-gray/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mist-gray flex items-center justify-center text-xs font-bold text-ink">
                  [TODO]
                </div>
                <div className="text-xs">
                  <div className="font-bold text-ink">{isAr ? item.nameAr : item.nameEn}</div>
                  <div className="text-[11px] text-ink-muted">
                    {isAr ? item.facilityAr : item.facilityEn}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

