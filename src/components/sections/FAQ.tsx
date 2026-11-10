'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { getFAQPageSchema } from '@/lib/seo';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

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
    <section className="py-16 md:py-24 bg-white" id="faq">
      {/* Inject FAQPage Schema */}
      <JsonLd data={getFAQPageSchema(jsonLdFaqs)} id="faq-schema" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mist-gray text-ink text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-dusty-blue" />
            <span>{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            {isAr
              ? 'كل ما يهمك معرفته عن منصة راش إكس'
              : 'Everything You Need to Know About RashX'}
          </h2>

          <p className="text-sm text-ink-muted">
            {isAr
              ? 'إجابات مباشرة وشفافة حول الفوترة، التسعير، الأمان، والتوافق النظامي.'
              : 'Clear answers regarding invoicing, subscriptions, security, and compliance.'}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-mist-gray bg-[#FAFBFB] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-4 px-6 text-start flex items-center justify-between gap-4 font-bold text-ink text-sm sm:text-base hover:text-dusty-blue transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{isAr ? faq.qAr : faq.qEn}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-ink-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-dusty-blue' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-ink-muted leading-relaxed border-t border-mist-gray/40 animate-in fade-in duration-200">
                    {isAr ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

