'use client';

import React, { useState } from 'react';
import { Plus, HelpCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFAQPageSchema } from '@/lib/seo';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX FAQ — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 * Questions and answers are unchanged: they also feed the FAQPage schema.
 */

interface FAQProps {
  locale?: Locale;
}

export const FAQ: React.FC<FAQProps> = ({ locale = DEFAULT_LOCALE }) => {
  const isAr = locale === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qAr: 'كيف تدعم منصة راش إكس متطلبات الفوترة الإلكترونية (ZATCA)؟',
      qEn: 'How does RashX support ZATCA E-Invoicing requirements?',
      aAr:
        'تدعم منصة راش إكس متطلبات الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة المنشأة ومتطلبات الربط والتفعيل الصادرة عن هيئة الزكاة والضريبة والجمارك (ZATCA)، مع إصدار الفواتير الضريبية المبسطة وتضمين رمز الاستجابة السريع (QR Code) المتوافق.',
      aEn:
        'RashX supports ZATCA Phase 2 (Integration) E-Invoicing requirements subject to facility onboarding status and integration criteria, generating compliant simplified tax invoices with cryptographic QR codes.',
    },
    {
      qAr: 'ما المقصود بأن لكل منشأة منظومة مستقلة بنطاق فرعي (Subdomain)؟',
      qEn: 'What does having an independent subdomain mean for each salon?',
      aAr:
        'تحصل منشأتك على نطاق فرعي سحابي مخصص (مثل yourname.rashx.org) يجمع موقع المنشأة التسويقي، لوحة التحكم الإدارية، تطبيق وواجهة حجز العميل، وشاشة مصففي الشعر والخبراء، مما يمنحك استقلالية تامة وهوية تجارية فريدة.',
      aEn:
        'Your facility receives a dedicated subdomain (e.g. yourname.rashx.org) encompassing your branded website, management dashboard, client booking portal, and specialist interface, ensuring complete brand autonomy.',
    },
    {
      qAr: 'هل الأسعار المعروضة شاملة لضريبة القيمة المضافة 15%؟',
      qEn: 'Do displayed subscription prices include 15% VAT?',
      aAr:
        'جميع الأسعار المعروضة في باقات راش إكس غير شاملة لضريبة القيمة المضافة (15%)، ويتم احتساب الضريبة النظامية وإضافتها في فاتورة الاشتراك عند السداد.',
      aEn:
        'All displayed subscription prices exclude 15% Value Added Tax (VAT), which is computed and added to your billing invoice upon checkout.',
    },
    {
      qAr: 'كيف تعمل التجربة المجانية لمدة 14 يومًا؟',
      qEn: 'How does the 14-day free trial work?',
      aAr:
        'تمنحك التجربة المجانية وصولاً كاملاً وغير مقيد لجميع الأنظمة العشرة لتجربة إدخال الخدمات، إصدار فواتير تجريبية، وجدولة المواعيد، دون الحاجة لإدخال أي بطاقة ائتمان أو التزام مالي مسبق.',
      aEn:
        'The free trial gives you unrestricted access to all 10 management systems to test appointments, mock checkout, and inventory setup without requiring any credit card or prior commitment.',
    },
    {
      qAr: 'هل أحتاج إلى شراء أجهزة ونقاط بيع باهظة لتشغيل راش إكس؟',
      qEn: 'Do I need expensive proprietary POS hardware?',
      aAr:
        'لا، راش إكس نظام سحابي مرن يعمل مباشرة عبر المتصفح على أي جهاز حاسوب، لابتوب، آيباد، أو تابلت، ويتوافق مع طابعات الإيصالات الحرارية، قارئات الباركود، وأجهزة الدفع عبر مدى وApple Pay.',
      aEn:
        'No, RashX is a cloud platform operating smoothly via web browser on desktop, laptop, iPad, or tablet, connecting seamlessly to standard receipt printers and barcode scanners.',
    },
    {
      qAr: 'كيف يضمن النظام حماية وسرية بيانات عميلات الصالون؟',
      qEn: 'How does RashX protect client data and privacy?',
      aAr:
        'نلتزم التزاماً كاملاً بضوابط نظام حماية البيانات الشخصية السعودي (PDPL)، مع تطبيق عزل منطقي صارم بين بيانات كل منشأة على حدة، وتحديد صلاحيات وأدوار متقدمة تمنع وصول أي موظف لمعلومات غير مصرح له بها.',
      aEn:
        'We strictly comply with the Saudi Personal Data Protection Law (PDPL), enforcing strict logical multi-tenant isolation, data encryption, and role-based permissions.',
    },
  ];

  const jsonLdFaqs = faqs.map((f) => ({
    question: isAr ? f.qAr : f.qEn,
    answer: isAr ? f.aAr : f.aEn,
  }));

  return (
    <section dir={isAr ? 'rtl' : 'ltr'} id="faq" className="bg-white py-16 md:py-24">
      {/* FAQPage schema */}
      <JsonLd data={getFAQPageSchema(jsonLdFaqs)} id="faq-schema" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Intro: centered on small screens, sticky side column on desktop */}
        <div className="space-y-4 text-center lg:sticky lg:top-24 lg:col-span-5 lg:self-start lg:text-start">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-mist-gray/60 px-3 py-1 text-xs font-medium text-ink">
            <HelpCircle className="h-3.5 w-3.5 text-dusty-blue" aria-hidden="true" />
            <span>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
          </div>

          <h2 className="text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl md:text-4xl">
            {isAr ? 'كل ما يهمك معرفته عن منصة راش إكس' : 'Everything you need to know about RashX'}
          </h2>

          <p className="text-xs font-normal leading-relaxed text-ink-muted sm:text-sm md:text-base">
            {isAr
              ? 'إجابات مباشرة وشفافة حول الفوترة والتسعير والأمان والتوافق النظامي.'
              : 'Clear answers on invoicing, pricing, security and compliance.'}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 lg:col-span-7">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? 'border-ink bg-white' : 'border-mist-gray bg-white hover:border-ink/40'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-xs font-semibold text-ink sm:px-6 sm:text-sm md:text-base"
                  >
                    <span>{isAr ? faq.qAr : faq.qEn}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition-colors ${
                        isOpen ? 'bg-warm-peach' : 'bg-dusty-blue/30'
                      }`}
                    >
                      <Plus
                        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                        strokeWidth={2.5}
                      />
                    </span>
                  </button>
                </h3>

                {/* Grid-rows trick: smooth open/close without measuring height */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-xs font-normal leading-relaxed text-ink-muted sm:px-6 sm:text-sm">
                      {isAr ? faq.aAr : faq.aEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;