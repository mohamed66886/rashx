import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck2,
  FileCheck,
  Laptop2,
  Headphones,
  ArrowLeft,
  ArrowRight,
  PhoneCall,
  Check,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import { generatePageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { LeadForm } from '@/components/sections/LeadForm';

interface DemoPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'احجز عرضًا تجريبيًا مجانيًا | راش إكس RashX'
      : 'Book a Free Demo | RashX Management System',
    description: isAr
      ? 'شاهد كيف تعمل راش إكس على صالونك أو مركز التجميل والسبا خلال 20 دقيقة. استكشف الحجوزات والفوترة ZATCA مع مستشار معتمد في السعودية.'
      : 'See RashX live on your salon, clinic, or spa within 20 minutes. Explore booking, staff, and ZATCA Phase 2 compliance with our team.',
    pathname: '/demo',
    noIndex: false,
  });
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'حجز عرض تجريبي' : 'Book a Demo', item: `/${locale}/demo` },
  ];

  const benefits = [
    {
      icon: Sparkles,
      title: isAr
        ? 'جلسة تفاعلية مخصصة 100% لنوع منشأتك'
        : '100% Tailored to Your Specific Facility',
      description: isAr
        ? 'نستعرض سيناريوهات العمل اليومية المطابقة لنشاطك، سواء كنت تدير صالونًا نسائيًا، مشغل خياطة وتجميل، صالون حلاقة رجالي، أو مركز سبا واستجمام.'
        : 'Live walkthrough mapped to your exact workflow, whether you operate a beauty studio, ladies salon, barbershop, or wellness spa complex.',
    },
    {
      icon: Laptop2,
      title: isAr
        ? 'استكشاف حي لمنظومة النطاق الفرعي والواجهات الأربع'
        : 'Live Walkthrough of All 4 Subdomain Portals',
      description: isAr
        ? 'شاهد عمليًا كيف يعمل موقع صالونك الخاص، لوحة التحكم الإدارية، تطبيق حجز العميل، وواجهة مقدم الخدمة بشكل متناغم وبكامل هويتك التجارية.'
        : 'Experience the dedicated facility website, management dashboard, client booking web-app, and staff portal under your private subdomain.',
    },
    {
      icon: FileCheck,
      title: isAr
        ? 'إجابة وافية لمتطلبات الفوترة ZATCA والأسعار'
        : 'Clear Guidance on ZATCA Phase 2 & Pricing',
      description: isAr
        ? 'شرح دقيق لكيفية دعم الفوترة الإلكترونية (المرحلة الثانية - الربط والتكامل) وفق حالة منشأتك ومتطلبات الهيئة، مع تحديد الباقة الأنسب لك دون أي التزام.'
        : 'Detailed explanation of ZATCA Phase 2 integration readiness for your facility, along with clear pricing guidance with zero commitment.',
    },
  ];

  const trustHighlights = isAr
    ? [
        'تجربة مجانية لمدة 14 يومًا لكافة الأنظمة العشرة',
        'لا نطلب أي بطاقة بنكية للتسجيل أو التجربة',
        'امتثال تام لنظام حماية البيانات الشخصية السعودي (PDPL)',
        'فريق استشاري ودعم فني متواجد داخل المملكة',
        'مساعدة كاملة في نقل بيانات خدماتك وقوائم أسعارك',
      ]
    : [
        '14-day full free trial of all 10 management systems',
        'No credit card required for booking or trial',
        'Fully compliant with Saudi Personal Data Protection Law (PDPL)',
        'Dedicated onboarding and support specialists in Saudi Arabia',
        'Free migration assistance for existing services and price lists',
      ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      {/* Structured Data: Breadcrumbs */}
      <JsonLd
        data={getBreadcrumbSchema(breadcrumbs)}
        id="demo-breadcrumb-schema"
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-16">
        {/* Breadcrumb Bar */}
        <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{isAr ? 'حجز عرض تجريبي' : 'Book Demo'}</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-10 lg:mb-14 space-y-4">
          {/* Response Time Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>
              {isAr
                ? 'نرد خلال ساعات العمل (خلال ساعتين كحد أقصى)'
                : 'We respond within business hours (under 2 hours)'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight leading-tight">
            {isAr ? 'شاهد RashX تعمل على صالونك خلال 20 دقيقة' : 'See RashX Live on Your Salon in 20 Minutes'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal">
            {isAr
              ? 'احجز جلسة تفاعلية مباشرة عبر زووم أو جوجل ميت مع مستشار متخصص في قطاع التجميل السعودي. نوضح لك كيف تدير الحجوزات والموظفين والمخزون وفواتير ZATCA بكفاءة عالية وبدون تعقيد.'
              : 'Schedule a tailored live session with our Saudi beauty and wellness specialist. We will show you how to streamline appointments, staff commissions, inventory, and ZATCA e-invoicing effortlessly.'}
          </p>
        </div>

        {/* 2-Column Split CRO Layout: Form on Right, Benefits on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Right Column (يمين): The Complete Saudi LeadForm with Preferred Time & Redirect */}
          <div className="lg:col-span-7 xl:col-span-7 order-1 lg:order-1">
            <LeadForm
              locale={locale}
              redirectToThankYou={true}
              showPreferredTime={true}
              title={isAr ? 'بيانات حجز العرض التجريبي' : 'Demo Booking Information'}
              subtitle={
                isAr
                  ? 'املأ بيانات منشأتك لنجهز لك بيئة تجريبية مطابقة لنشاطك قبل موعد الجلسة'
                  : 'Provide your facility details so we can configure your sandbox environment'
              }
            />
          </div>

          {/* Left Column (يسار): 3 Benefits + Fast WhatsApp Link + Trust Points */}
          <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-2 space-y-6">
            {/* 3 Key Benefits Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-mist-gray shadow-md space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-mist-gray">
                <CalendarCheck2 className="w-5 h-5 text-dusty-blue shrink-0" />
                <h2 className="text-base sm:text-lg font-bold text-ink">
                  {isAr ? 'ماذا ستحصل في جلسة العرض (20 دقيقة)؟' : 'What You Get in 20 Minutes'}
                </h2>
              </div>

              <div className="space-y-5">
                {benefits.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3.5 group">
                      <div className="w-10 h-10 rounded-2xl bg-mist-gray/70 border border-mist-gray flex items-center justify-center text-ink shrink-0 group-hover:bg-dusty-blue group-hover:text-black transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-ink leading-snug">
                          {benefit.title}
                        </h3>
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Direct WhatsApp Instant Escalation */}
              <div className="pt-4 border-t border-mist-gray">
                <div className="p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#128C7E]">
                      {isAr ? 'هل تفضل المحادثة المباشرة الآن؟' : 'Prefer Immediate WhatsApp Chat?'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white font-mono text-ink-muted" dir="ltr">
                      {SITE_CONFIG.phone}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {isAr
                      ? 'يمكنك التحدث مباشرة مع فريق راش إكس في السعودية للإجابة الفورية عن استفساراتك أو لتحديد موعد عبر الواتساب.'
                      : 'Chat instantly with our Saudi team to get quick answers or coordinate a demo time via WhatsApp.'}
                  </p>
                  <a
                    href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                      isAr
                        ? 'مرحبًا راش إكس، أود الاستفسار عن حجز عرض تجريبي لمنشأتي.'
                        : 'Hello RashX, I would like to inquire about booking a demo for my facility.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl shadow-xs transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{isAr ? 'تحدث مع مستشار عبر واتساب' : 'Chat with Specialist on WhatsApp'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Points Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 border border-mist-gray shadow-xs space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'ضمانات راش إكس وراحة بالك' : 'RashX Commitments & Peace of Mind'}</span>
              </h3>

              <ul className="space-y-2.5">
                {trustHighlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-ink">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Proof Placeholder (as per rules: strict [TODO]) */}
            <div className="rounded-2xl border border-dashed border-mist-gray p-4 text-center text-xs text-ink-muted bg-mist-gray/20">
              <p className="font-semibold text-ink">
                {isAr
                  ? 'منظومة مصممة خصيصًا للسوق السعودي ومعاييره'
                  : 'Engineered specifically for the Saudi beauty market standards'}
              </p>
              <p className="text-[11px] text-ink-muted/80 mt-1">
                {isAr
                  ? '[TODO: إضافة شعارات الصالونات والمراكز الشريكة في المملكة وقصص نجاحهم]'
                  : '[TODO: Insert verified partner salon logos and customer case studies across KSA]'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
