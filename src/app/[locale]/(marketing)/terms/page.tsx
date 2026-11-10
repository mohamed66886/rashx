import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Clock,
  Globe,
  Mail,
  PhoneCall,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  BookOpen,
  Lock,
  UserCheck,
  Building,
  Gavel,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import { generatePageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'شروط استخدام الموقع والخدمة | RashX'
      : 'Terms of Website & Service Usage | RashX',
    description: isAr
      ? 'شروط استخدام منصة راش إكس السحابية لإدارة الصالونات في السعودية: الاشتراكات بالريال السعودي (SAR)، ضريبة القيمة المضافة 15%، الاستخدام المقبول، وحدود المسؤولية.'
      : 'Terms of Service for RashX salon & spa cloud platform: subscriptions in SAR, 15% VAT, acceptable use, liability limitations, and Saudi governing law.',
    keywords: [
      'شروط استخدام راش إكس',
      'اتفاقية خدمة الصالونات',
      'شروط اشتراك منصة راش إكس',
      'الاشتراكات بالريال السعودي صالونات',
      'حقوق الملكية الفكرية راش إكس',
      'RashX terms of service',
    ],
    pathname: '/terms',
    noIndex: false,
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'شروط الاستخدام' : 'Terms of Service', item: `/${locale}/terms` },
  ];

  const tableOfContents = [
    { id: 'legal-disclaimer', titleAr: 'تنويه المراجعة القانونية', titleEn: 'Important Legal Advisory' },
    { id: 'definitions', titleAr: '1. التعريفات ونطاق الاتفاقية', titleEn: '1. Definitions & Scope' },
    { id: 'accounts', titleAr: '2. إنشاء الحسابات والأهلية والأمان', titleEn: '2. Accounts, Eligibility & Credentials' },
    { id: 'subscriptions', titleAr: '3. الاشتراك والفوترة (الريال السعودي وضريبة 15%)', titleEn: '3. Subscriptions, Fees (SAR & 15% VAT)' },
    { id: 'acceptable-use', titleAr: '4. سياسة الاستخدام المقبول والمحظورات', titleEn: '4. Acceptable Use & Prohibitions' },
    { id: 'intellectual-property', titleAr: '5. حقوق الملكية الفكرية والعلامة التجارية', titleEn: '5. Intellectual Property Rights' },
    { id: 'limitation-of-liability', titleAr: '6. إخلاء الضمانات وحدود المسؤولية', titleEn: '6. Disclaimer of Warranties & Liability' },
    { id: 'termination', titleAr: '7. تعليق وإنهاء الخدمة وسياسة الإلغاء', titleEn: '7. Termination, Suspension & Cancellation' },
    { id: 'governing-law', titleAr: '8. القانون الواجب التطبيق والاختصاص القضائي', titleEn: '8. Governing Law & Dispute Resolution' },
    { id: 'contact', titleAr: '9. الاستفسارات التعاقدية والتواصل', titleEn: '9. Contractual Inquiries & Contact' },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="terms-breadcrumb-schema" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? 'شروط الاستخدام' : 'Terms of Service'}
          </span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 border-b border-mist-gray pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <Scale className="w-4 h-4 text-dusty-blue" />
            <span>
              {isAr
                ? 'اتفاقية استخدام ملزمة • الأنظمة المعمول بها في المملكة'
                : 'Binding Legal Terms • Governed by Saudi Arabian Law'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight">
            {isAr ? 'شروط استخدام الموقع والخدمة' : 'Terms of Website & Service Usage'}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-dusty-blue" />
              <span>{isAr ? 'تاريخ التحديث: نوفمبر 2026 م' : 'Last Updated: November 2026'}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'}</span>
            </div>
            <span>•</span>
            <div className="text-ink font-semibold">
              {isAr ? 'منصة راش إكس (RashX)' : 'RashX Platform'}
            </div>
          </div>
        </div>

        {/* ===================================================================
           MANDATORY LEGAL DISCLAIMER
           =================================================================== */}
        <div id="legal-disclaimer" className="p-6 rounded-3xl bg-[#FEF3C7]/40 border-2 border-[#F59E0B]/30 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-[#92400E]">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />
            <span>{isAr ? 'تنويه المراجعة القانونية الإلزامي' : 'Mandatory Legal Review Advisory'}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
            {isAr
              ? 'تنويه: تم إعداد وثيقة شروط الاستخدام هذه كنموذج استرشادي وتشغيلي لمنصة راش إكس. يجب مراجعة هذا النص وتدقيقه واعتماده رسمياً من قِبل مستشار قانوني مرخص ومؤهل في المملكة العربية السعودية قبل اعتماده كعقد إلكتروني نهائي ملزم للمنشآت والمستخدمين.'
              : 'Legal Notice: These Terms of Service serve as an operational model agreement for the RashX platform. This text must be reviewed, adapted, and formally ratified by qualified, licensed legal counsel in Saudi Arabia prior to definitive commercial deployment as a legally binding electronic agreement.'}
          </p>
        </div>

        {/* ===================================================================
           TABLE OF CONTENTS
           =================================================================== */}
        <div className="p-6 rounded-3xl bg-white border border-mist-gray shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-dusty-blue" />
            <span>{isAr ? 'فهرس بنود شروط الاستخدام' : 'Table of Contents'}</span>
          </div>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-ink-muted hover:text-dusty-blue hover:underline py-1 flex items-center gap-1.5 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-dusty-blue/60 shrink-0" />
                <span>{isAr ? item.titleAr : item.titleEn}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* ===================================================================
           MAIN TERMS CONTENT
           =================================================================== */}
        <div className="space-y-12 text-xs sm:text-sm text-ink-muted leading-relaxed">
          {/* Section 1: Definitions */}
          <section id="definitions" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">1</span>
              <span>{isAr ? 'التعريفات ونطاق سريان الاتفاقية' : '1. Definitions & Scope'}</span>
            </h2>
            <p>
              {isAr
                ? 'تحكم هذه الاتفاقية استخدام الموقع الإلكتروني الرئيسي (rashx.org)، والنطاقات الفرعية المخصصة (*.rashx.org)، وكافة الخدمات السحابية والبرمجية التابعة لمنصة راش إكس (RashX). يُقصد بالمصطلحات التالية المعاني الموضحة قرين كل منها ما لم يقتضِ السياق خلاف ذلك:'
                : 'These Terms of Service govern access to and usage of the primary marketing portal (rashx.org), dedicated subdomains (*.rashx.org), and all associated cloud applications operated by RashX. Key terms are defined as follows:'}
            </p>
            <div className="space-y-2 p-4 rounded-2xl bg-white border border-mist-gray">
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong className="text-ink">{isAr ? '«المنصة» أو «راش إكس»:' : '"The Platform" or "RashX":'}</strong> {isAr ? 'منظومة إدارة منشآت التجميل والسبا السحابية بما تشمله من برمجيات وخوادم وواجهات برمجية.' : 'The proprietary beauty, salon, and spa cloud management platform, its APIs, and associated infrastructure.'}</li>
                <li><strong className="text-ink">{isAr ? '«المنشأة» أو «العميل المشترك»:' : '"The Facility" or "Subscribing Client":'}</strong> {isAr ? 'أي صالون نسائي، مشغل، صالون حلاقة رجالي، مركز سبا، أو عيادة تجميل يشترك في المنصة ويدير أعماله عبرها.' : 'Any beauty salon, styling studio, barbershop, wellness spa, or aesthetic clinic contracting to use the platform.'}</li>
                <li><strong className="text-ink">{isAr ? '«النطاق الفرعي المستقل»:' : '"The Dedicated Subdomain":'}</strong> {isAr ? 'النطاق المخصص لكل منشأة بصيغة (*.rashx.org) الذي يفصل منطقياً بواباتها عن المنشآت الأخرى.' : 'The isolated tenant URL (*.rashx.org) logically segregating facility portals from other subscribers.'}</li>
                <li><strong className="text-ink">{isAr ? '«البوابات الأربع»:' : '"The Four Portals":'}</strong> {isAr ? 'بوابة الموقع التسويقي للمنشأة، لوحة الإدارة، تطبيق العميل للويب التقدمي (PWA)، وواجهة مقدم الخدمة.' : 'The Public Facility Site, Admin Dashboard, Client PWA, and Specialist Portal.'}</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Accounts & Credentials */}
          <section id="accounts" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">2</span>
              <span>{isAr ? 'إنشاء الحسابات، الأهلية، وأمان بيانات الدخول' : '2. Accounts, Eligibility & Security Credentials'}</span>
            </h2>
            <p>
              {isAr
                ? 'يشترط لإنشاء حساب واستخدام منصة راش إكس أن يكون الممثل عن المنشأة ذا أهلية نظامية كاملة لإبرام العقود ومرخصاً بموجب الأنظمة السارية في المملكة العربية السعودية. يلتزم العميل بتقديم بيانات دقيقة ومحدثة (بما يشمل السجل التجاري والرقم الضريبي).'
                : 'To establish an account, facility representatives must possess full legal capacity to enter binding contracts under the laws of Saudi Arabia. Clients warrant the absolute accuracy of all submitted business records, commercial registrations, and tax credentials.'}
            </p>
            <p>
              {isAr
                ? 'تتحمل المنشأة المسؤولية الحصرية عن الحفاظ على سرية بيانات تسجيل الدخول وتوثيق الحسابات، وتوزيع الصلاحيات المناسبة على الموظفين، وتعتبر المنشأة مسؤولة نظامياً عن أي تصرف أو حركة مالية أو حجز يتم من خلال حسابها.'
                : 'The facility bears sole responsibility for safeguarding administrative credentials, maintaining role-based access hygiene, and assuming legal accountability for all transactions executed under its account.'}
            </p>
          </section>

          {/* Section 3: Subscriptions & Billing (SAR & 15% VAT) */}
          <section id="subscriptions" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">3</span>
              <span>{isAr ? 'الاشتراك، الفوترة، والدفع (بالريال السعودي وضريبة 15%)' : '3. Subscriptions, Fees (SAR & 15% VAT)'}</span>
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-2">
                <div className="font-bold text-ink text-xs flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-dusty-blue" />
                  <span>{isAr ? 'العملة وضريبة القيمة المضافة:' : 'Currency & 15% Value Added Tax:'}</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {isAr
                    ? 'تُسعّر وتُسدد كافة الاشتراكات حصرياً بالريال السعودي (SAR). تخضع جميع الخدمات السحابية لضريبة القيمة المضافة المطبقة في المملكة العربية السعودية بنسبة (15%)، وتُضاف هذه الضريبة إلى قيمة الباقة عند إصدار الفاتورة الضريبية وفق اشتراطات هيئة الزكاة والضريبة والجمارك (ZATCA).'
                    : 'All platform subscriptions are billed and payable strictly in Saudi Riyals (SAR). Subscription fees are subject to the statutory 15% Value Added Tax (VAT) in Saudi Arabia, which is itemized on official ZATCA tax invoices.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-2">
                <div className="font-bold text-ink text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>{isAr ? 'سياسة صفر عمولة على الحجوزات والمبيعات:' : 'Zero Booking Commission Guarantee:'}</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {isAr
                    ? 'تعتمد راش إكس نموذج اشتراك ثابت شفاف؛ ولا تقتطع المنصة أي نسبة أو عمولة من مبيعات الخدمات، باقات الجلسات، أو منتجات الصالون، وتعود 100% من إيرادات الصالون للمنشأة المشتركة مباشرة.'
                    : 'RashX enforces a flat, predictable subscription model. The platform levies zero percentage cuts or booking fees on appointment revenues; 100% of sales turnover remains with the facility.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-2">
                <div className="font-bold text-ink text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 text-dusty-blue" />
                  <span>{isAr ? 'فترة التجربة المجانية (14 يوماً) والتجديد:' : '14-Day Free Trial & Renewal Terms:'}</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {isAr
                    ? 'تمنح المنصة للمنشآت الجديدة فترة تجربة مجانية كاملة المزايا لمدة 14 يوماً دون الحاجة لإدخال بيانات بطاقة بنكية. تتجدد الاشتراكات المدفوعة تلقائياً في نهاية كل دورة فوترة (شهرية أو سنوية) ما لم تقم المنشأة بإلغاء التجديد قبل نهاية الفترة السارية.'
                    : 'New facilities enjoy an unrestricted 14-day free trial with no credit card requirement. Paid plans renew automatically at the conclusion of each billing cycle unless cancelled prior to the renewal date.'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Acceptable Use */}
          <section id="acceptable-use" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">4</span>
              <span>{isAr ? 'سياسة الاستخدام المقبول والمحظورات' : '4. Acceptable Use Policy & Prohibitions'}</span>
            </h2>
            <p>
              {isAr
                ? 'يلتزم العميل باستخدام المنصة حصرياً لأغراض إدارة نشاطه التجميلي أو الصحي المشروع، ويُحظر تماماً ارتكاب أي من الأفعال التالية تحت طائلة المسؤولية المدنية والجنائية:'
                : 'Clients warrant that platform usage will be restricted strictly to legitimate beauty and wellness operations. Prohibited conduct includes, without limitation:'}
            </p>
            <ul className="list-disc list-inside space-y-1.5 ps-2">
              <li>{isAr ? 'محاولة اختراق النظام الأمني أو تجاوز عزل النطاقات الفرعية للوصول إلى بيانات أي منشأة أخرى.' : 'Attempting to breach security perimeters, bypass tenant isolation, or access other facilities’ databases.'}</li>
              <li>{isAr ? 'استخدام المنظومة في إرسال رسائل دعائية اقتحامية (Spam) أو مخالفة لنظام حماية البيانات الشخصية السعودي (PDPL).' : 'Transmitting unsolicited bulk marketing (spam) or violating Saudi PDPL privacy directives.'}</li>
              <li>{isAr ? 'الهندسة العكسية للكود المصدري لراش إكس أو فك تجميعه أو نسخه أو إنشاء برمجيات مشتقة منه.' : 'Reverse engineering, decompiling, cloning, or creating derivative software from RashX proprietary code.'}</li>
              <li>{isAr ? 'إدخال أي برمجيات خبيثة أو فيروسات أو التسبب في تعطيل أو إثقال البنية التحتية السحابية للمنصة.' : 'Injecting malicious scripts, malware, or orchestrating denial-of-service traffic across our infrastructure.'}</li>
            </ul>
          </section>

          {/* Section 5: Intellectual Property */}
          <section id="intellectual-property" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">5</span>
              <span>{isAr ? 'حقوق الملكية الفكرية والعلامة التجارية' : '5. Intellectual Property Rights'}</span>
            </h2>
            <div className="space-y-2 p-4 rounded-2xl bg-white border border-mist-gray">
              <div>
                <strong className="text-ink block mb-0.5">
                  {isAr ? 'أ) حقوق راش إكس (RashX IP):' : 'A) RashX Intellectual Property:'}
                </strong>
                <span>
                  {isAr
                    ? 'كافة حقوق الملكية الفكرية، التصاميم، الكود البرمجي، الواجهات، العلامات التجارية، والخوارزميات الخاصة بالمنظومة تظل ملكاً حصرياً لمنصة راش إكس، ولا يترتب على الاشتراك أي نقل لملكية البرمجيات بل يمنح ترخيصاً محدوداً بالاستخدام السحابي.'
                    : 'All patents, source code, UI architecture, algorithms, and brand trademarks remain the exclusive property of RashX; subscriptions confer a limited, revocable SaaS usage license.'}
                </span>
              </div>
              <div className="pt-2 border-t border-mist-gray">
                <strong className="text-ink block mb-0.5">
                  {isAr ? 'ب) حقوق المنشأة على بياناتها وعلامتها (Client IP & Data):' : 'B) Client Data & Brand Ownership:'}
                </strong>
                <span>
                  {isAr
                    ? 'تحتفظ المنشأة المشتركة بالملكية الكاملة والحصرية (100%) لبيانات عملائها، فواتيرها، شعاراتها، وهويتها البصرية. وتمنح المنشأة لراش إكس ترخيصاً تشغيلياً فقط لمعالجة البيانات بالقدر اللازم لتقديم الخدمة السحابية.'
                    : 'The subscribing facility retains 100% exclusive ownership of its customer databases, sales invoices, brand assets, and logos. RashX holds only operational processing licenses necessary to deliver the SaaS service.'}
                </span>
              </div>
            </div>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section id="limitation-of-liability" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">6</span>
              <span>{isAr ? 'إخلاء الضمانات وحدود المسؤولية' : '6. Disclaimer of Warranties & Limitation of Liability'}</span>
            </h2>
            <p>
              {isAr
                ? 'تُقدم المنصة والخدمات السحابية وفق المعايير التجارية المقبولة وبنسبة استهداف توافر سنوية تبلغ 99.9%. وإلى الحد الأقصى الذي تسمح به الأنظمة السارية في المملكة العربية السعودية:'
                : 'The platform is provided in accordance with recognized industry standards targeting a 99.9% availability SLA. To the maximum extent permitted under Saudi law:'}
            </p>
            <ul className="list-disc list-inside space-y-1.5 ps-2">
              <li>{isAr ? 'لا تتحمل راش إكس المسؤولية عن أي خسائر غير مباشرة أو أرباح فائتة ناتجة عن انقطاع شبكات الاتصالات المحلية أو خطأ المشغل البشري في إدخال الأسعار أو المواعيد.' : 'RashX shall not be liable for indirect damages, lost profits, or business interruptions stemming from local ISP failures or human receptionist data entry errors.'}</li>
              <li>{isAr ? 'تقع المسؤولية القانونية الكاملة عن صحة ودقة البيانات المسجلة في الفواتير الضريبية والإقرارات على عاتق المنشأة المشتركة بصفتها المكلف الضريبي المباشر أمام هيئة الزكاة (ZATCA).' : 'The facility remains solely liable for the statutory accuracy and tax declarations filed via ZATCA Phase 2 e-invoices as the registered taxpayer.'}</li>
              <li>{isAr ? 'تقتصر المسؤولية المالية الإجمالية لراش إكس عن أي مطالبات تعاقدية على إجمالي المبالغ الفعلية التي دفعتها المنشأة للمنصة خلال الثلاثة أشهر السابقة للواقعة المنشئة للمطالبة.' : 'RashX aggregate contractual liability for any claim shall not exceed the actual fees paid by the facility in the 3 months preceding the event giving rise to liability.'}</li>
            </ul>
          </section>

          {/* Section 7: Termination & Cancellation */}
          <section id="termination" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">7</span>
              <span>{isAr ? 'تعليق وإنهاء الخدمة وسياسة الإلغاء' : '7. Termination, Suspension & Data Export'}</span>
            </h2>
            <p>
              {isAr
                ? 'يجوز للمنشأة إلغاء اشتراكها في أي وقت من خلال لوحة التحكم الإدارية، ويظل الحساب نشطاً حتى نهاية الدورة التعاقدية المدفوعة. تتيح راش إكس للمنشأة تصدير سجلات عملائها وفواتيرها ومخزونها بصيغة قياسية (CSV/Excel) قبل إغلاق الحساب.'
                : 'Facilities may cancel subscriptions at any time via the admin dashboard, retaining access through the conclusion of their paid term. RashX equips facilities with self-service tools to export customer databases and financial ledgers prior to account closure.'}
            </p>
            <p>
              {isAr
                ? 'تحتفظ راش إكس بالحق في تعليق أو إنهاء وصول المنشأة فورياً ودون إشعار مسبق في حال ارتكاب مخالفة جسيمة لهذه الشروط، أو استخدام المنصة في أنشطة غير مشروعة، أو التخلف غير المبرر عن سداد مستحقات الاشتراك.'
                : 'RashX reserves the right to suspend or terminate accounts with immediate effect in instances of material terms breaches, illegal activity, or persistent failure to settle subscription fees.'}
            </p>
          </section>

          {/* Section 8: Governing Law [TODO] */}
          <section id="governing-law" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">8</span>
              <span>{isAr ? 'القانون الواجب التطبيق والاختصاص القضائي' : '8. Governing Law & Dispute Resolution'}</span>
            </h2>
            <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-2">
              <p>
                {isAr
                  ? 'تخضع هذه الشروط وكافة الاتفاقيات المنبثقة عنها وتُفسر حصرياً وفقاً للأنظمة واللوائح السارية في المملكة العربية السعودية (بما في ذلك نظام التجارة الإلكترونية ونظام المعاملات المدنية).'
                  : 'These Terms of Service and any associated contractual disputes are governed by and construed strictly in accordance with the statutory laws of the Kingdom of Saudi Arabia.'}
              </p>
              <p className="pt-1">
                <strong className="text-ink">{isAr ? 'الجهة القضائية المختصة:' : 'Competent Judicial Forum:'}</strong>{' '}
                <span className="font-semibold text-dusty-blue">
                  {isAr
                    ? '[TODO: الجهة القضائية المختصة بنظر النزاعات - تُحدد وفق المحكمة المختصة بمدينة الرياض في المملكة العربية السعودية]'
                    : '[TODO: Designated Judicial Authority - To be specified under the competent court in Riyadh, Kingdom of Saudi Arabia]'}
                </span>
              </p>
            </div>
          </section>

          {/* Section 9: Contractual Inquiries & Contact */}
          <section id="contact" className="space-y-4 scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white border-2 border-mist-gray shadow-xs">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                <Mail className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'الاستفسارات التعاقدية والتواصل القانوني' : 'Contractual Inquiries & Legal Contact'}</span>
              </h2>
              <p className="text-xs text-ink-muted leading-relaxed">
                {isAr
                  ? 'لأي استفسارات قانونية، طلبات عقود مخصصة لسلاسل الفروع، أو إشعارات رسمية، يرجى التواصل مع الإدارة القانونية والتعاقدية عبر القنوات المعتمدة:'
                  : 'For contractual inquiries, enterprise multi-branch agreements, or formal legal notices, reach our compliance team at:'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-ink-muted">{isAr ? 'البريد القانوني المعتمد:' : 'Designated Legal Email:'}</div>
                <div className="font-bold text-ink font-mono">legal@rashx.org</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-ink-muted">{isAr ? 'الدعم التعاقدي وخدمة العملاء:' : 'Contract Support Phone:'}</div>
                <div className="font-bold text-ink font-mono" dir="ltr">{SITE_CONFIG.phone}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-ink-muted">{isAr ? 'المقر المسجل والاختصاص:' : 'Operating Base:'}</div>
                <div className="font-bold text-ink">{isAr ? 'المملكة العربية السعودية، مدينة الرياض' : 'Riyadh, Kingdom of Saudi Arabia'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-ink-muted">{isAr ? 'الوثائق ذات الصلة:' : 'Related Documents:'}</div>
                <div className="font-bold text-ink flex items-center gap-2">
                  <Link href={`/${locale}/privacy`} className="text-dusty-blue hover:underline">
                    {isAr ? 'سياسة الخصوصية (PDPL)' : 'Privacy Policy (PDPL)'}
                  </Link>
                  <span>•</span>
                  <Link href={`/${locale}/security`} className="text-dusty-blue hover:underline">
                    {isAr ? 'الأمان والامتثال' : 'Security'}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
