import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  MessageSquare,
  Mail,
  Clock,
  MapPin,
  Globe2,
  ShieldCheck,
  Send,
  Building2,
  PhoneCall,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import {
  generatePageMetadata,
  getContactPageSchema,
  getOrganizationSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { LeadForm } from '@/components/sections/LeadForm';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'تواصل مع فريق راش إكس | RashX'
      : 'Contact RashX Team | Smart Salon Management',
    description: isAr
      ? 'تواصل مع مستشاري راش إكس في السعودية عبر واتساب، الهاتف، تيليجرام أو البريد. استشارات ودعم فني متخصص لإدارة الصالونات ومراكز التجميل والسبا.'
      : 'Get in touch with RashX specialists in Saudi Arabia via WhatsApp, phone, Telegram, or email. Expert salon & spa management support.',
    pathname: '/contact',
    noIndex: false,
  });
}

// Brand SVG Icons for Social Channels
const SocialChannelIcon: React.FC<{ type: string; className?: string }> = ({
  type,
  className = 'w-5 h-5',
}) => {
  switch (type) {
    case 'telegram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
        </svg>
      );
    case 'x':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 005.73 2.29V11.9a4.85 4.85 0 01-3.77-1.44 4.84 4.84 0 01-.03-3.77z" />
        </svg>
      );
    case 'snapchat':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.002 2C9.4 2 7.7 3.5 7.7 5.7c0 .6.1 1.2.3 1.8-.8.1-1.6.4-2.1.8-.6.5-.8 1.1-.6 1.7.3.7 1.1 1 2 1 .3 0 .6 0 .9-.1-.1.4-.2.8-.2 1.3 0 2.2 1.5 4.1 4 4.1s4-1.9 4-4.1c0-.5-.1-.9-.2-1.3.3.1.6.1.9.1.9 0 1.7-.3 2-1 .2-.6 0-1.2-.6-1.7-.5-.4-1.3-.7-2.1-.8.2-.6.3-1.2.3-1.8 0-2.2-1.7-3.7-4.3-3.7z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z" />
        </svg>
      );
    default:
      return null;
  }
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'تواصل معنا' : 'Contact Us', item: `/${locale}/contact` },
  ];

  // Primary Direct Communication Channels
  const primaryChannels = [
    {
      id: 'whatsapp',
      title: isAr ? 'محادثة فورية عبر واتساب' : 'Instant WhatsApp Chat',
      desc: isAr
        ? 'الرد السريع المباشر خلال دقائق لاستفسارات الأنظمة والأسعار وحجز المواعيد'
        : 'Immediate response within minutes for inquiries, pricing, and demo scheduling',
      value: SITE_CONFIG.phone,
      actionText: isAr ? 'ابدأ المحادثة الآن' : 'Start WhatsApp Chat',
      href: `${SITE_CONFIG.whatsappUrl}?text=${encodeURIComponent(
        isAr
          ? 'مرحبًا راش إكس، أود الاستفسار عن نظام إدارة الصالونات ومراكز التجميل.'
          : 'Hello RashX, I would like to inquire about your salon management system.'
      )}`,
      badge: isAr ? 'الأسرع ردًا ⚡' : 'Fastest Response ⚡',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-[#25D366]/15 text-[#128C7E]',
      iconType: 'whatsapp',
      isExternal: true,
    },
    {
      id: 'phone',
      title: isAr ? 'الاتصال الهاتفي المباشر' : 'Direct Phone Call',
      desc: isAr
        ? 'تحدث مباشرة مع مستشارينا المعتمدين في المملكة العربية السعودية'
        : 'Speak directly with our certified software specialists in Saudi Arabia',
      value: SITE_CONFIG.phone,
      actionText: isAr ? 'اتصل الآن' : 'Call Now',
      href: `tel:${SITE_CONFIG.phoneRaw}`,
      badge: isAr ? 'متاح أثناء ساعات العمل' : 'During Business Hours',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-50 text-dusty-blue',
      iconType: 'phone',
      isExternal: false,
    },
    {
      id: 'telegram',
      title: isAr ? 'قناة وتواصل Telegram' : 'Official Telegram Channel',
      desc: isAr
        ? 'تابع آخر التحديثات والمميزات وتواصل مباشرة عبر منصة تيليجرام'
        : 'Follow the latest platform releases and connect via our official Telegram channel',
      value: '@rashxsa',
      actionText: isAr ? 'فتح Telegram' : 'Open Telegram',
      href: SITE_CONFIG.social.telegram,
      badge: isAr ? 'قناة رسمية 📢' : 'Official Channel 📢',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      iconBg: 'bg-[#0088cc]/15 text-[#0088cc]',
      iconType: 'telegram',
      isExternal: true,
    },
    {
      id: 'email',
      title: isAr ? 'البريد الإلكتروني الرسمي' : 'Official Inquiries Email',
      desc: isAr
        ? 'للشراكات، طلبات عروض الأسعار للشركات، والعقود المؤسسية الكبرى'
        : 'For commercial partnerships, enterprise quotes, and corporate RFP inquiries',
      value: SITE_CONFIG.email,
      actionText: isAr ? 'إرسال بريد' : 'Send Email',
      href: `mailto:${SITE_CONFIG.email}`,
      badge: isAr ? 'الشركات والشراكات' : 'Enterprise & RFP',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-50 text-purple-700',
      iconType: 'email',
      isExternal: false,
    },
  ];

  // Official Social Accounts (All 6 verified networks)
  const socialNetworks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'company/rashx',
      href: SITE_CONFIG.social.linkedin,
      descAr: 'شبكة الأعمال والتوظيف وأخبار الشركة',
      descEn: 'Business network & corporate updates',
      color: 'hover:text-[#0077b5]',
      iconType: 'linkedin',
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      handle: '@rashxsa',
      href: SITE_CONFIG.social.x,
      descAr: 'الإعلانات الرسمية والتفاعل اليومي',
      descEn: 'Official announcements & daily news',
      color: 'hover:text-black',
      iconType: 'x',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@rashx.sa',
      href: SITE_CONFIG.social.instagram,
      descAr: 'فيديوهات شرح المنظومة وتجارب الشاشات',
      descEn: 'System demos & UI showcases',
      color: 'hover:text-[#E4405F]',
      iconType: 'instagram',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@rashx.sa',
      href: SITE_CONFIG.social.tiktok,
      descAr: 'مقاطع سريعة لنصائح إدارة الصالونات',
      descEn: 'Quick salon management tips',
      color: 'hover:text-black',
      iconType: 'tiktok',
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      handle: 'rashx.sa',
      href: SITE_CONFIG.social.snapchat,
      descAr: 'تغطيات حية وكواليس المنظومة بالسعودية',
      descEn: 'Behind-the-scenes & live updates in KSA',
      color: 'hover:text-[#FFFC00]',
      iconType: 'snapchat',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'rashx.sa',
      href: SITE_CONFIG.social.facebook,
      descAr: 'المجتمع والمنشورات التثقيفية للمشاغل',
      descEn: 'Community & educational posts',
      color: 'hover:text-[#1877F2]',
      iconType: 'facebook',
    },
  ];

  // Saudi Coverage Cities
  const coveredRegions = isAr
    ? [
        { region: 'المنطقة الوسطى', cities: 'الرياض، الخرج، القصيم، حائل' },
        { region: 'المنطقة الغربية', cities: 'جدة، مكة المكرمة، المدينة المنورة، الطائف' },
        { region: 'المنطقة الشرقية', cities: 'الدمام، الخبر، الظهران، الأحساء، الجبيل' },
        { region: 'المنطقة الجنوبية', cities: 'أبها، خميس مشيط، جازان، نجران، الباحة' },
        { region: 'المنطقة الشمالية', cities: 'تبوك، الجوف، عرعر، القريات' },
      ]
    : [
        { region: 'Central Region', cities: 'Riyadh, Al-Kharj, Qassim, Hail' },
        { region: 'Western Region', cities: 'Jeddah, Makkah, Madinah, Taif' },
        { region: 'Eastern Province', cities: 'Dammam, Khobar, Dhahran, Al-Ahsa, Jubail' },
        { region: 'Southern Region', cities: 'Abha, Khamis Mushait, Jazan, Najran, Al-Baha' },
        { region: 'Northern Region', cities: 'Tabuk, Al-Jouf, Arar, Qurayyat' },
      ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      {/* Structured Data: ContactPage + Organization + Breadcrumbs */}
      <JsonLd data={getContactPageSchema(locale)} id="contact-page-schema" />
      <JsonLd data={getOrganizationSchema()} id="contact-org-schema" />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="contact-breadcrumb-schema" />

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{isAr ? 'تواصل معنا' : 'Contact'}</span>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mist-gray border border-mist-gray text-xs font-semibold text-ink-muted">
            <Sparkles className="w-3.5 h-3.5 text-dusty-blue" />
            <span>
              {isAr ? 'دعم واستشارات تشغيلية متخصصة' : 'Dedicated Salon Operations & Technical Support'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight">
            {isAr ? 'تواصل مع فريق RashX' : 'Connect with the RashX Team'}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-normal">
            {isAr
              ? 'فريقنا المتخصص في إدارة الصالونات والمشاغل ومراكز التجميل والسبا في المملكة العربية السعودية جاهز للإجابة عن كافة استفساراتك الفنية والتشغيلية وتقديم الدعم المباشر لمنشأتك.'
              : 'Our specialists in Saudi beauty salons, styling centers, barbershops, and wellness spas are ready to assist you with onboarding, technical queries, and operational growth.'}
          </p>
        </div>

        {/* Primary Contact Channels Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {primaryChannels.map((channel) => (
            <div
              key={channel.id}
              className="rounded-3xl bg-white p-6 border border-mist-gray shadow-xs hover:shadow-md hover:border-dusty-blue transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${channel.iconBg} transition-transform group-hover:scale-105`}
                  >
                    {channel.iconType === 'whatsapp' && (
                      <SocialChannelIcon type="whatsapp" className="w-6 h-6" />
                    )}
                    {channel.iconType === 'phone' && <PhoneCall className="w-6 h-6" />}
                    {channel.iconType === 'telegram' && (
                      <SocialChannelIcon type="telegram" className="w-6 h-6" />
                    )}
                    {channel.iconType === 'email' && <Mail className="w-6 h-6" />}
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${channel.badgeColor}`}
                  >
                    {channel.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-ink mb-1.5">{channel.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-3 font-normal">
                    {channel.desc}
                  </p>
                  <div className="text-sm font-semibold font-mono text-ink" dir="ltr">
                    {channel.value}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-mist-gray/70 mt-6">
                <a
                  href={channel.href}
                  target={channel.isExternal ? '_blank' : undefined}
                  rel={channel.isExternal ? 'noopener noreferrer' : undefined}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-mist-gray hover:bg-dusty-blue hover:text-black text-ink transition-colors"
                >
                  <span>{channel.actionText}</span>
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column Split: Form (Right) & Working Hours / Location / Saudi Coverage (Left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Right Column (يمين): Interactive Contact & Lead Form */}
          <div className="lg:col-span-7 xl:col-span-7 order-1 lg:order-1">
            <LeadForm
              locale={locale}
              redirectToThankYou={true}
              showPreferredTime={false}
              title={isAr ? 'أرسل لنا رسالة أو استفسارًا' : 'Send Us a Direct Message'}
              subtitle={
                isAr
                  ? 'املأ النموذج وسيقوم مستشار راش إكس بالرد والتواصل معك خلال ساعات العمل'
                  : 'Submit your inquiry and a RashX representative will follow up promptly'
              }
            />
          </div>

          {/* Left Column (يسار): Working Hours, National Coverage, and Headquarters Placeholders */}
          <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-2 space-y-6">
            {/* Working Hours Card (بتوقيت الرياض AST) */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-mist-gray shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-mist-gray">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">
                      {isAr ? 'ساعات العمل الرسمية' : 'Official Business Hours'}
                    </h3>
                    <p className="text-[11px] text-ink-muted">
                      {isAr ? 'بتوقيت المملكة العربية السعودية (AST / الرياض)' : 'Riyadh Time (AST / UTC+3)'}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  {isAr ? 'توقيت الرياض' : 'AST (KSA)'}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Weekdays */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFB] border border-mist-gray/80">
                  <span className="font-semibold text-ink">
                    {isAr ? 'الأحد – الخميس:' : 'Sunday – Thursday:'}
                  </span>
                  <span className="text-ink-muted font-mono font-medium">
                    {isAr
                      ? '[TODO: من 9:00 ص إلى 6:00 م بتوقيت الرياض]'
                      : '[TODO: 9:00 AM – 6:00 PM AST]'}
                  </span>
                </div>

                {/* Saturday */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFB] border border-mist-gray/80">
                  <span className="font-semibold text-ink">
                    {isAr ? 'السبت:' : 'Saturday:'}
                  </span>
                  <span className="text-ink-muted font-medium">
                    {isAr
                      ? '[TODO: من 10:00 ص إلى 4:00 م أو بالموعد المسبق]'
                      : '[TODO: 10:00 AM – 4:00 PM AST / by appointment]'}
                  </span>
                </div>

                {/* Friday */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFBFB] border border-mist-gray/80">
                  <span className="font-semibold text-ink">
                    {isAr ? 'الجمعة:' : 'Friday:'}
                  </span>
                  <span className="text-ink-muted">
                    {isAr ? 'عطلة أسبوعية' : 'Weekly Holiday'}
                  </span>
                </div>

                {/* 24/7 Cloud Support Notice */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-emerald-900 flex items-start gap-2.5 mt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <span className="font-bold">
                      {isAr ? 'دعم الطوارئ والأنظمة السحابية: ' : 'Cloud Infrastructure & Emergency: '}
                    </span>
                    <span>
                      {isAr
                        ? 'مراقبة الخوادم وحماية النطاقات الفرعية وتدفق الحجوزات مؤتمتة وتعمل على مدار الساعة 24/7/365.'
                        : 'Server health, subdomain availability, and booking engine operate 24/7/365.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Saudi Arabia Nationwide Service Coverage Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-mist-gray shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-mist-gray">
                <div className="w-9 h-9 rounded-xl bg-dusty-blue/20 text-black flex items-center justify-center">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">
                    {isAr ? 'التغطية والخدمة داخل المملكة' : 'Service Coverage Across Saudi Arabia'}
                  </h3>
                  <p className="text-[11px] text-ink-muted">
                    {isAr ? 'منظومة سحابية تغطي كافة المدن والمحافظات' : 'Cloud ecosystem serving all KSA regions'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                {isAr
                  ? 'تقدم منصة راش إكس خدماتها وحلولها الرقمية السحابية لكافة صالونات التجميل، المشاغل، مراكز الحلاقة، والسبا في جميع مناطق المملكة، مع تدريب عن بُعد، وإمكانية جدولة زيارات ميدانية منسقة مسبقًا لسلاسل الفروع والمراكز المتكاملة.'
                  : 'RashX empowers beauty salons, wellness centers, and barbershops across all regions of Saudi Arabia with cloud deployment, remote onboarding, and pre-scheduled on-site visits for chain operators.'}
              </p>

              {/* Regions Badge Pill Matrix */}
              <div className="space-y-2 pt-1">
                {coveredRegions.map((reg, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-[#FAFBFB] border border-mist-gray/60"
                  >
                    <span className="font-bold text-ink">{reg.region}</span>
                    <span className="text-[11px] text-ink-muted">{reg.cities}</span>
                  </div>
                ))}
              </div>

              {/* Headquarters Address Placeholder (as requested in prompt) */}
              <div className="p-3.5 rounded-2xl border border-dashed border-mist-gray bg-mist-gray/20 text-[11px] text-ink-muted flex items-start gap-2">
                <MapPin className="w-4 h-4 text-dusty-blue shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-ink block">
                    {isAr ? 'المقر الإداري والعنوان الوطني:' : 'National Address & Headquarters:'}
                  </span>
                  <span>
                    {isAr
                      ? '[TODO: إضافة العنوان الوطني المسجل أو مقر المنشأة في حال اعتماده وتوثيقه، المملكة العربية السعودية]'
                      : '[TODO: Insert registered National Address / official KSA headquarters location upon formal filing]'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Official Social Media Channels Grid */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-mist-gray shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-ink">
              {isAr ? 'تابع راش إكس على منصات التواصل الاجتماعي' : 'Follow RashX Across Official Channels'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              {isAr
                ? 'ابقَ على اطلاع دائم بآخر تحديثات المنظومة، نصائح إدارة المشاغل، وشروحات الفوترة ZATCA عبر قنواتنا الرسمية الموثقة.'
                : 'Stay informed on software updates, beauty management guides, and ZATCA compliance via our official social accounts.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialNetworks.map((net) => (
              <a
                key={net.id}
                href={net.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAFBFB] border border-mist-gray hover:border-dusty-blue hover:bg-white transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-mist-gray flex items-center justify-center text-ink/80 group-hover:bg-dusty-blue group-hover:text-black transition-colors shadow-2xs shrink-0">
                  <SocialChannelIcon type={net.iconType} className="w-5 h-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-ink group-hover:text-dusty-blue transition-colors truncate">
                      {net.name}
                    </span>
                    <span className="text-[11px] font-mono text-ink-muted" dir="ltr">
                      {net.handle}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted truncate mt-0.5">
                    {isAr ? net.descAr : net.descEn}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

