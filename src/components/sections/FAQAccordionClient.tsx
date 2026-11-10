'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  Sparkles,
  PhoneCall,
  ArrowRight,
  ChevronDown,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { Locale } from '@/i18n/config';
import { RASHX_FAQS, FAQ_CATEGORIES, FAQItem } from '@/data/faqs';

interface FAQAccordionClientProps {
  locale: Locale;
}

export function FAQAccordionClient({ locale }: FAQAccordionClientProps) {
  const isAr = locale === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('gen-1');

  const filteredFaqs = useMemo(() => {
    return RASHX_FAQS.filter((faq) => {
      const matchCategory =
        activeCategory === 'all' || faq.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchCategory;

      const textToSearch = isAr
        ? `${faq.questionAr} ${faq.answerAr} ${faq.categoryAr}`.toLowerCase()
        : `${faq.questionEn} ${faq.answerEn} ${faq.categoryEn}`.toLowerCase();

      return matchCategory && textToSearch.includes(query);
    });
  }, [activeCategory, searchQuery, isAr]);

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
          <HelpCircle className="w-4 h-4 text-dusty-blue" />
          <span>{isAr ? 'مركز الإجابات الموثوقة' : 'Knowledge & Answers Hub'}</span>
        </div>

        {/* Mandatory Exact H1 */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight">
          {isAr ? 'الأسئلة الشائعة عن RashX' : 'Frequently Asked Questions about RashX'}
        </h1>

        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
          {isAr
            ? 'إجابات دقيقة ومختصرة حول منظومة راش إكس السحابية لإدارة الصالونات ومراكز التجميل في السعودية: الأسعار، الفوترة الإلكترونية ZATCA، أمان البيانات، التفعيل، وتخصيص White Label.'
            : 'Concise, transparent answers regarding RashX cloud salon management in Saudi Arabia: pricing, ZATCA e-invoicing Phase 2, security, onboarding, and White Label custom subdomains.'}
        </p>

        {/* Real-Time In-Page Search Bar */}
        <div className="pt-4 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isAr
                  ? 'ابحث في الأسئلة (مثال: أسعار، زاتكا، حجب الأرقام، تفعيل، White Label...)'
                  : 'Search questions (e.g. pricing, ZATCA, phone masking, setup, White Label...)'
              }
              className="w-full ps-12 pe-4 py-3.5 rounded-2xl bg-white border-2 border-mist-gray focus:border-dusty-blue focus:outline-hidden text-sm text-ink placeholder:text-ink-muted/60 shadow-sm transition-all"
            />
            <Search className="w-5 h-5 text-ink-muted absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {FAQ_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-ink text-white shadow-sm'
                  : 'bg-white border border-mist-gray text-ink hover:bg-mist-gray/40'
              }`}
            >
              {isAr ? cat.nameAr : cat.nameEn}
            </button>
          );
        })}
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs text-ink-muted px-1">
        <span>
          {isAr
            ? `عرض ${filteredFaqs.length} سؤالاً`
            : `Showing ${filteredFaqs.length} questions`}
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-dusty-blue font-bold hover:underline"
          >
            {isAr ? 'إعادة ضبط البحث' : 'Clear search'}
          </button>
        )}
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-3xl bg-white border border-mist-gray space-y-3">
            <HelpCircle className="w-10 h-10 text-dusty-blue mx-auto" />
            <h3 className="text-base font-bold text-ink">
              {isAr ? 'لم نعثر على نتائج مطابقة لبحثك' : 'No matching questions found'}
            </h3>
            <p className="text-xs text-ink-muted max-w-md mx-auto">
              {isAr
                ? 'جرب البحث بكلمات أخرى أو تواصل معنا مباشرة عبر واتساب للإجابة عن استفسارك فوراً.'
                : 'Try different keywords or message us directly via WhatsApp for instant clarification.'}
            </p>
            <div className="pt-2">
              <a
                href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  isAr
                    ? `مرحبًا راش إكس، لدي سؤال: ${searchQuery}`
                    : `Hello RashX, I have an inquiry: ${searchQuery}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ink text-white text-xs font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                <span>{isAr ? 'اسألنا عبر واتساب' : 'Ask on WhatsApp'}</span>
              </a>
            </div>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-mist-gray overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 hover:bg-mist-gray/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-mist-gray/60 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4 text-dusty-blue" />
                    </span>
                    <div>
                      <span className="text-sm sm:text-base font-bold text-ink block">
                        {isAr ? faq.questionAr : faq.questionEn}
                      </span>
                      <span className="text-[10px] font-semibold text-dusty-blue mt-0.5 inline-block">
                        {isAr ? faq.categoryAr : faq.categoryEn}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-ink-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-dusty-blue' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-ink-muted leading-relaxed border-t border-mist-gray/40">
                    <p className="pe-4 ps-10">{isAr ? faq.answerAr : faq.answerEn}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Section: Unanswered Inquiries Callout */}
      <div className="rounded-3xl bg-white border-2 border-mist-gray p-8 sm:p-10 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-ink">
          {isAr ? 'هل لديك سؤال آخر لم تجد إجابته هنا؟' : 'Have another question not answered here?'}
        </h2>
        <p className="text-xs sm:text-sm text-ink-muted max-w-lg mx-auto">
          {isAr
            ? 'فريق الدعم الفني والاستشاري متواجد للإجابة على كافة تساؤلاتك ومساعدتك في تهيئة حساب صالونك بتوقيت الرياض.'
            : 'Our technical and consulting team is ready to answer questions during Saudi business hours (AST).'}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
              isAr
                ? 'مرحبًا راش إكس، اطلعت على صفحة الأسئلة الشائعة ولدي استفسار إضافي.'
                : 'Hello RashX, I checked your FAQ and have an additional question.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-ink text-white hover:bg-ink/90 text-xs font-bold transition-all"
          >
            <PhoneCall className="w-4 h-4 text-[#25D366]" />
            <span>{isAr ? 'تحدث معنا عبر واتساب' : 'Chat on WhatsApp'}</span>
          </a>

          <Link
            href={`/${locale}/demo`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-mist-gray hover:bg-mist-gray/40 text-xs font-bold text-ink transition-colors"
          >
            <span>{isAr ? 'احجز عرضًا تجريبيًا (20 دقيقة)' : 'Book 20-Min Demo'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180 text-dusty-blue" />
          </Link>
        </div>
      </div>
    </div>
  );
}

