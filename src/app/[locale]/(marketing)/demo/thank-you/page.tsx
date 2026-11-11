import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  PhoneCall,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
  Laptop2,
  FileCheck2,
  Layers,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import { generatePageMetadata } from '@/lib/seo';
import { ConversionTracker } from '@/components/seo/ConversionTracker';

interface ThankYouPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ThankYouPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'تم تأكيد طلب العرض التجريبي بنجاح | راش إكس RashX'
      : 'Demo Request Confirmed | RashX',
    description: isAr
      ? 'شكرًا لاهتمامك بمنصة راش إكس لإدارة الصالونات ومراكز التجميل. تم استلام طلبك وسيتواصل معك مستشارنا قريبًا.'
      : 'Thank you for requesting a demo with RashX. We will reach out shortly to schedule your personalized session.',
    pathname: '/demo/thank-you',
    noIndex: true, // Strictly noindex as required by SEO specifications
  });
}

export default async function DemoThankYouPage({ params }: ThankYouPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const nextSteps = [
    {
      step: '1',
      icon: Laptop2,
      title: isAr ? 'تهيئة النطاق التجريبي لمنشأتك' : 'Provisioning Your Dedicated Sandbox',
      desc: isAr
        ? 'يقوم فريقنا التقني بإنشاء البيئة التجريبية المخصصة وتجهيز الواجهات الأربع (الموقع، لوحة التحكم، تطبيق العميل، واجهة الموظفين).'
        : 'Our engineering team sets up your private demo sandbox with all 4 ecosystem portals configured for your facility type.',
    },
    {
      step: '2',
      icon: Clock,
      title: isAr ? 'تأكيد الموعد خلال ساعتي عمل' : 'Confirmation Within 2 Business Hours',
      desc: isAr
        ? 'سيتواصل معك أحد مستشارينا في السعودية عبر الهاتف أو الواتساب لتأكيد الموعد المفضل وإرسال رابط الاجتماع الافتراضي.'
        : 'A Saudi beauty software consultant will contact you via phone or WhatsApp to finalize your preferred time and meeting link.',
    },
    {
      step: '3',
      icon: FileCheck2,
      title: isAr ? 'جلسة العرض الحي (20 دقيقة)' : 'Live 20-Minute Tailored Walkthrough',
      desc: isAr
        ? 'استعراض تفاعلي مباشر لكافة الأنظمة، والرد على جميع الاستفسارات الفنية والمالية ومتطلبات الفوترة ZATCA دون أي التزام.'
        : 'An interactive session walking through your operational scenarios, answering ZATCA compliance and pricing questions with zero obligation.',
    },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-[85vh] py-12 sm:py-20">
      {/* Conversion Event Tracker (fires GA4 generate_lead, Meta Lead, Snap SIGN_UP, TikTok SubmitForm) */}
      <ConversionTracker eventName="generate_lead" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Success Confirmation Card */}
        <div className="rounded-3xl bg-white p-8 sm:p-12 border border-mist-gray shadow-xl text-center space-y-6">
          {/* Animated Green Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50">
            <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'تم استلام طلبك بنجاح' : 'Submission Received Successfully'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink tracking-tight">
              {isAr
                ? 'شكرًا لك! سنجهز عرضك التجريبي خلال وقت قياسي'
                : 'Thank You! Your Demo Session is Being Prepared'}
            </h1>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-normal">
              {isAr
                ? 'سعداء باهتمامك بمنظومة راش إكس لإدارة الصالونات ومراكز التجميل والسبا. تم تسجيل بيانات منشأتك وسيتواصل معك مستشارنا المعتمد خلال أقل من ساعتي عمل.'
                : 'We are thrilled by your interest in RashX. Your facility data has been received and our Saudi specialist will reach out within two business hours.'}
            </p>
          </div>

          {/* Instant WhatsApp Quick Escalation */}
          <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 text-start flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-start">
              <div className="text-xs font-bold text-[#128C7E] flex items-center justify-center sm:justify-start gap-1.5">
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>{isAr ? 'تريد تسريع الموعد أو لديك استفسار عاجل؟' : 'Need an Immediate Response?'}</span>
              </div>
              <p className="text-xs text-ink-muted">
                {isAr
                  ? 'تحدث مباشرة الآن مع فريق راش إكس عبر تطبيق واتساب'
                  : 'Connect with our Saudi onboarding team directly via WhatsApp'}
              </p>
            </div>

            <a
              href={`${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                isAr
                  ? 'مرحبًا راش إكس، قمت للتو بطلب عرض تجريبي لمنشأتي وأود التحدث مع مستشاركم مباشرة.'
                  : 'Hello RashX, I just submitted a demo request for my facility and would like to chat directly.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl shadow-xs transition-colors shrink-0"
            >
              <span>{isAr ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp'}</span>
              <span className="font-mono text-[11px] opacity-90" dir="ltr">{SITE_CONFIG.phone}</span>
            </a>
          </div>

          {/* Next Steps 3-Column Timeline */}
          <div className="pt-8 border-t border-mist-gray text-start">
            <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-6 text-center">
              {isAr ? 'ما هي الخطوات التالية؟' : 'What Happens Next?'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextSteps.map((stepItem, idx) => {
                const Icon = stepItem.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-3 relative group hover:border-dusty-blue transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-white border border-mist-gray flex items-center justify-center text-ink group-hover:bg-dusty-blue group-hover:text-black transition-colors shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-ink-muted/50 font-mono">
                        0{stepItem.step}
                      </span>
                    </div>

                    <h3 className="text-xs font-semibold text-ink leading-snug">
                      {stepItem.title}
                    </h3>

                    <p className="text-[11px] text-ink-muted leading-relaxed font-normal">
                      {stepItem.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Links & Return Home */}
          <div className="pt-8 border-t border-mist-gray flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}`}
              className="px-5 py-2.5 text-xs font-bold text-ink bg-mist-gray hover:bg-mist-gray/80 rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <span>{isAr ? 'العودة للصفحة الرئيسية' : 'Return to Home'}</span>
            </Link>

            <Link
              href={`/${locale}/features`}
              className="px-5 py-2.5 text-xs font-bold text-black bg-dusty-blue hover:bg-dusty-blue/90 rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'استكشف المميزات والأنظمة' : 'Explore Platform Features'}</span>
            </Link>

            <Link
              href={`/${locale}/pricing`}
              className="px-5 py-2.5 text-xs font-bold text-ink bg-white border border-mist-gray hover:bg-mist-gray/40 rounded-xl transition-colors"
            >
              <span>{isAr ? 'مراجعة باقات الأسعار' : 'View Pricing Plans'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
