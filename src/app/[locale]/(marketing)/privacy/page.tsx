import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  FileText,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  PhoneCall,
  Mail,
  Building,
  Globe,
  Clock,
  EyeOff,
  Database,
  UserCheck,
  Server,
  ArrowRight,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES, Locale, isSupportedLocale } from '@/i18n/config';
import { generatePageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  return generatePageMetadata({
    locale,
    title: isAr
      ? 'سياسة الخصوصية وحماية البيانات الشخصية (PDPL) | RashX'
      : 'Privacy Policy & Personal Data Protection (PDPL) | RashX',
    description: isAr
      ? 'سياسة الخصوصية الرسمية لمنصة راش إكس متوافقة مع نظام حماية البيانات الشخصية السعودي (PDPL). تفاصيل البيانات التي نجمعها، الأساس النظامي، وحقوق صاحب البيانات.'
      : 'Official RashX Privacy Policy compliant with the Saudi Personal Data Protection Law (PDPL). Clear details on data collection, legal basis, retention, and subject rights.',
    keywords: [
      'سياسة الخصوصية راش إكس',
      'نظام حماية البيانات الشخصية السعودي',
      'حقوق صاحب البيانات PDPL',
      'خصوصية بيانات الصالونات في السعودية',
      'مسؤول حماية البيانات راش إكس',
      'Saudi PDPL privacy policy',
    ],
    pathname: '/privacy',
    noIndex: false,
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale: rawLocale } = await params;
  const locale = (isSupportedLocale(rawLocale) ? rawLocale : 'ar') as Locale;
  const isAr = locale === 'ar';

  const breadcrumbs = [
    { name: isAr ? 'الرئيسية' : 'Home', item: `/${locale}` },
    { name: isAr ? 'سياسة الخصوصية' : 'Privacy Policy', item: `/${locale}/privacy` },
  ];

  const tableOfContents = [
    { id: 'legal-disclaimer', titleAr: 'تنويه قانوني هام', titleEn: 'Important Legal Notice' },
    { id: 'intro', titleAr: '1. مقدمة ونطاق سريان السياسة', titleEn: '1. Introduction & Scope' },
    { id: 'roles', titleAr: '2. الصفة النظامية لراش إكس (متحكم / معالج)', titleEn: '2. Legal Roles (Controller vs. Processor)' },
    { id: 'data-collected', titleAr: '3. البيانات الشخصية التي نجمعها', titleEn: '3. Categories of Personal Data Collected' },
    { id: 'purposes', titleAr: '4. الأغراض التشغيلية لمعالجة البيانات', titleEn: '4. Operational Purposes of Processing' },
    { id: 'legal-basis', titleAr: '5. الأساس النظامي للمعالجة بموجب PDPL', titleEn: '5. Lawful Legal Basis Under Saudi PDPL' },
    { id: 'sharing', titleAr: '6. مشاركة البيانات والإفصاح لأطراف ثالثة', titleEn: '6. Data Sharing & Third-Party Disclosures' },
    { id: 'sovereignty', titleAr: '7. السيادة الرقمية ونقل البيانات', titleEn: '7. Digital Sovereignty & Data Transfers' },
    { id: 'security', titleAr: '8. التدابير الأمنية وحجب أرقام الجوالات', titleEn: '8. Security Safeguards & Phone Masking' },
    { id: 'retention', titleAr: '9. مدة الاحتفاظ بالبيانات وإتلافها الآمن', titleEn: '9. Data Retention & Secure Destruction' },
    { id: 'rights', titleAr: '10. حقوق صاحب البيانات الشخصية', titleEn: '10. Statutory Data Subject Rights' },
    { id: 'cookies', titleAr: '11. ملفات تعريف الارتباط (الكوكيز)', titleEn: '11. Cookies & Tracking Technologies' },
    { id: 'dpo-contact', titleAr: '12. التواصل مع مسؤول حماية البيانات', titleEn: '12. Contacting the Data Protection Officer' },
  ];

  return (
    <div className="w-full bg-[#FAFBFB] min-h-screen">
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} id="privacy-breadcrumb-schema" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <Link href={`/${locale}`} className="hover:text-ink transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </span>
        </div>

        {/* Page Header */}
        <div className="space-y-4 border-b border-mist-gray pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist-gray border border-mist-gray text-xs font-bold text-ink">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>
              {isAr
                ? 'متوافقة مع نظام حماية البيانات الشخصية السعودي (PDPL)'
                : 'Compliant with Saudi Personal Data Protection Law (PDPL)'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight">
            {isAr ? 'سياسة الخصوصية وحماية البيانات الشخصية' : 'Privacy & Personal Data Protection Policy'}
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
            <span>{isAr ? 'تنويه قانوني هام ومحدد' : 'Important Legal Notice & Advisory'}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
            {isAr
              ? 'تنويه: تم إعداد هذه السياسة كنموذج استرشادي متوافق مع المبادئ العامة لنظام حماية البيانات الشخصية في المملكة العربية السعودية (الصادر بالمرسوم الملكي م/19) ولائحته التنفيذية. يجب مراجعة هذا النص وتدقيقه واعتماده رسمياً من قِبل مستشار قانوني مرخص ومؤهل في المملكة العربية السعودية قبل نشره كوثيقة قانونية نهائية ملزمة للمنشأة.'
              : 'Legal Notice: This policy is drafted as an operational model framework aligned with the statutory provisions of the Saudi Personal Data Protection Law (PDPL, Royal Decree M/19) and its Implementing Regulations. This text must be reviewed, tailored, and formally ratified by licensed legal counsel in Saudi Arabia prior to definitive enactment.'}
          </p>
        </div>

        {/* ===================================================================
           TABLE OF CONTENTS
           =================================================================== */}
        <div className="p-6 rounded-3xl bg-white border border-mist-gray shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-ink uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-dusty-blue" />
            <span>{isAr ? 'فهرس بنود سياسة الخصوصية' : 'Table of Contents'}</span>
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
           MAIN POLICY SECTIONS
           =================================================================== */}
        <div className="space-y-12 text-xs sm:text-sm text-ink-muted leading-relaxed">
          {/* Section 1: Introduction */}
          <section id="intro" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">1</span>
              <span>{isAr ? 'مقدمة ونطاق سريان السياسة' : '1. Introduction & Scope'}</span>
            </h2>
            <p>
              {isAr
                ? 'تلتزم منصة راش إكس (RashX)، المسجلة في المملكة العربية السعودية، بحماية خصوصية وأمان البيانات الشخصية لزوار موقعنا الإلكتروني، والعملاء المهتمين، والمنشآت الشريكة (الصالونات والمشاغل ومراكز السبا والعيادات)، وعملائهم النهائيين. توضح هذه السياسة بشفافية الأسس التي يتم بموجبها جمع البيانات الشخصية ومعالجتها وحفظها وحمايتها وفقاً لأحكام نظام حماية البيانات الشخصية السعودي (PDPL).'
                : 'RashX, operating in the Kingdom of Saudi Arabia, is strictly dedicated to safeguarding the privacy and security of personal data entrusted by website visitors, prospective partners, subscribing facilities (salons, studios, spas, and clinics), and end consumers. This policy sets out the transparent framework governing our personal data processing under the Saudi Personal Data Protection Law (PDPL).'}
            </p>
            <p>
              {isAr
                ? 'تسري هذه السياسة على كافة قنوات التواصل والمواقع التابعة لراش إكس، بما يشمل الموقع الرئيسي (rashx.org)، والنطاقات الفرعية المخصصة (*.rashx.org)، ونماذج التواصل وحجز العروض التجريبية، وتطبيقات الويب التقدمية (PWA).'
                : 'This policy governs all digital channels operated by RashX, including the primary domain (rashx.org), dedicated subdomains (*.rashx.org), contact and live demo lead forms, and client progressive web apps (PWAs).'}
            </p>
          </section>

          {/* Section 2: Roles */}
          <section id="roles" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">2</span>
              <span>{isAr ? 'الصفة النظامية لراش إكس (متحكم / معالج بيانات)' : '2. Legal Roles (Data Controller vs. Data Processor)'}</span>
            </h2>
            <p>
              {isAr
                ? 'وفقاً لتعريفات نظام حماية البيانات الشخصية السعودي:'
                : 'Pursuant to statutory definitions under the Saudi PDPL:'}
            </p>
            <div className="space-y-2 p-4 rounded-2xl bg-white border border-mist-gray">
              <div>
                <strong className="text-ink block mb-0.5">
                  {isAr ? 'أ) راش إكس بصفتها «متحكماً بالبيانات» (Data Controller):' : 'A) RashX as a "Data Controller":'}
                </strong>
                <span>
                  {isAr
                    ? 'نعمل بصفتنا متحكماً بالبيانات فيما يتعلق ببيانات زوار الموقع التسويقي، وبيانات مسؤولي الصالونات الذين يقومون بملء نماذج الاستفسار وحجز العروض، وبيانات مديري الحسابات التعاقدية وسجلات الفوترة المباشرة لاشتراكات المنصة.'
                    : 'We act as a Data Controller regarding website visitors, salon representatives submitting lead inquiry forms, and administrative subscription account holders.'}
                </span>
              </div>
              <div className="pt-2 border-t border-mist-gray">
                <strong className="text-ink block mb-0.5">
                  {isAr ? 'ب) راش إكس بصفتها «معالج بيانات» (Data Processor):' : 'B) RashX as a "Data Processor":'}
                </strong>
                <span>
                  {isAr
                    ? 'نعمل بصفتنا معالجاً للبيانات نيابة عن المنشأة المشتركة (الصالون أو العيادة) فيما يتعلق بسجلات عميلات وزبائن الصالون والمواعيد المسجلة في لوحة تحكم المنشأة، حيث تظل المنشأة المشتركة هي «المتحكم بالبيانات» صاحب المسؤولية عن شرعية الجمع وإشعار العميل.'
                    : 'We act as a Data Processor on behalf of the subscribing facility regarding their client booking records and specialist logs; the facility remains the primary Data Controller determining processing parameters.'}
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: Data Collected */}
          <section id="data-collected" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">3</span>
              <span>{isAr ? 'البيانات الشخصية التي نجمعها' : '3. Categories of Personal Data Collected'}</span>
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-1.5">
                <h3 className="font-bold text-ink text-xs sm:text-sm">
                  {isAr ? 'أ) بيانات زوار الموقع الإلكتروني وتصفح المنصة:' : 'A) Website Visitors & Browsing Analytics Data:'}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {isAr
                    ? 'عناوين بروتوكول الإنترنت (IP Addresses)، نوع المتصفح وإصدار نظام التشغيل، الصفحات التي تتم زيارتها، مدة الزيارة، وسجلات التفاعل الفني لأغراض تأمين الموقع وتحسين تجربة التصفح.'
                    : 'IP addresses, browser signatures, operating system specifications, viewed URLs, interaction duration, and telemetry logs for security monitoring and platform optimization.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-1.5">
                <h3 className="font-bold text-ink text-xs sm:text-sm">
                  {isAr ? 'ب) بيانات نماذج التواصل، طلب العروض، وتجربة المنصة:' : 'B) Contact Forms & Demo Lead Inquiries:'}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {isAr
                    ? 'الاسم الكامل، رقم الجوال السعودي (للتواصل أو رسائل واتساب)، اسم المنشأة أو الصالون، نوع النشاط (مشغل نسائي، حلاق، سبا، عيادة)، المدينة، وعدد الفروع، والوقت المفضل للاتصال.'
                    : 'Full name, verified Saudi mobile number (phone/WhatsApp), facility trading name, business classification, city, branch count, and preferred consultation schedule.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-1.5">
                <h3 className="font-bold text-ink text-xs sm:text-sm">
                  {isAr ? 'ج) بيانات الحسابات التعاقدية والاشتراكات:' : 'C) Contractual & Subscription Account Information:'}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {isAr
                    ? 'اسم المنشأة التجاري، السجل التجاري، الرقم الضريبي، اسم المالك المعتمد، البريد الإلكتروني للمراسلات المالية، وسجلات الفواتير الإلكترونية ZATCA لاشتراك المنصة (ولا نقوم إطلاقاً بتخزين أرقام البطاقات الائتمانية الحساسة).'
                    : 'Commercial registration, VAT identification number, authorized representative name, billing email, and ZATCA tax invoice logs (raw credit card numbers are never stored locally).'}
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Purposes */}
          <section id="purposes" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">4</span>
              <span>{isAr ? 'الأغراض التشغيلية لمعالجة البيانات' : '4. Operational Purposes of Processing'}</span>
            </h2>
            <p>
              {isAr
                ? 'نعالج البيانات الشخصية حصرياً للأغراض المشروعة والمحددة التالية وفق مبدأ الحد الأدنى من البيانات (Data Minimization):'
                : 'Personal data is strictly processed for the following delimited lawful purposes under the principle of data minimization:'}
            </p>
            <ul className="list-disc list-inside space-y-1.5 ps-2">
              <li>{isAr ? 'التواصل مع مسؤولي المنشآت لترتيب العروض التجريبية المباشرة (20 دقيقة) والإجابة عن الاستفسارات.' : 'Communicating with salon decision-makers to schedule 20-minute tailored live demos.'}</li>
              <li>{isAr ? 'تهيئة النطاق الفرعي المستقل وتفعيل البوابات الأربع للمنشأة المشتركة.' : 'Provisioning dedicated subdomains and configuring the 4 facility portals.'}</li>
              <li>{isAr ? 'تقديم خدمات الدعم الفني، التدريب، والاستشارات التشغيلية بتوقيت المملكة العربية السعودية.' : 'Delivering responsive technical support and onboarding aligned with Saudi business hours.'}</li>
              <li>{isAr ? 'إصدار الفواتير الضريبية وتوثيق المعاملات المالية تماشياً مع متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA).' : 'Generating compliant tax receipts in adherence to ZATCA regulations.'}</li>
              <li>{isAr ? 'حماية أمن المنظومة، رصد ومنع الاحتيال، وضمان استمرارية الأعمال وعدم تداخل البيانات.' : 'Safeguarding infrastructure integrity, detecting security breaches, and preventing tenant collisions.'}</li>
            </ul>
          </section>

          {/* Section 5: Legal Basis */}
          <section id="legal-basis" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">5</span>
              <span>{isAr ? 'الأساس النظامي للمعالجة بموجب نظام PDPL' : '5. Lawful Legal Basis Under Saudi PDPL'}</span>
            </h2>
            <p>
              {isAr
                ? 'تستند راش إكس في معالجة البيانات الشخصية إلى الأسس النظامية المنصوص عليها في المادة السادسة من نظام حماية البيانات الشخصية السعودي ولائحته التنفيذية:'
                : 'RashX grounds its processing activities upon legitimate lawful bases established under Article 6 of the Saudi PDPL:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-1">
                <span className="font-bold text-ink text-xs block">
                  {isAr ? '1. الموافقة الصريحة (Consent):' : '1. Explicit Lawful Consent:'}
                </span>
                <span className="text-[11px] text-ink-muted">
                  {isAr ? 'عند إرسال نموذج التواصل أو طلب العرض التجريبي أو الاشتراك في التحديثات.' : 'When submitting lead inquiry forms or subscribing to product communications.'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-1">
                <span className="font-bold text-ink text-xs block">
                  {isAr ? '2. إبرام أو تنفيذ العقد (Contract Performance):' : '2. Contractual Performance:'}
                </span>
                <span className="text-[11px] text-ink-muted">
                  {isAr ? 'لتوفير الخدمة السحابية وإدارة اشتراك المنشأة وتشغيل النطاق الفرعي.' : 'Delivering cloud software services and operating facility subdomain infrastructure.'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-1">
                <span className="font-bold text-ink text-xs block">
                  {isAr ? '3. الامتثال لالتزام نظامي (Statutory Obligation):' : '3. Statutory Legal Obligations:'}
                </span>
                <span className="text-[11px] text-ink-muted">
                  {isAr ? 'لحفظ سجلات الفواتير الضريبية وفق متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA).' : 'Preserving tax invoices and fiscal archives as required by ZATCA directives.'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-1">
                <span className="font-bold text-ink text-xs block">
                  {isAr ? '4. المصلحة المشروعة (Legitimate Interests):' : '4. Legitimate Business Interests:'}
                </span>
                <span className="text-[11px] text-ink-muted">
                  {isAr ? 'لحماية أمن الشبكات والبيانات ومنع محاولات الاختراق دون المساس بحقوق صاحب البيانات.' : 'Preserving cybersecurity defenses and preventing unauthorized access without overriding subject rights.'}
                </span>
              </div>
            </div>
          </section>

          {/* Section 6: Sharing */}
          <section id="sharing" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">6</span>
              <span>{isAr ? 'مشاركة البيانات والإفصاح لأطراف ثالثة' : '6. Data Sharing & Third-Party Disclosures'}</span>
            </h2>
            <p>
              {isAr
                ? 'نؤكد التزامنا الصارم بعدم بيع، تأجير، أو المتاجرة بالبيانات الشخصية لأي جهة كانت. ولا تتم مشاركة البيانات إلا في الحالات المحدودة التالية:'
                : 'We unconditionally affirm that personal data is never sold, leased, or commercialized. Disclosures occur exclusively in the following limited circumstances:'}
            </p>
            <ul className="list-disc list-inside space-y-1 ps-2">
              <li>{isAr ? 'مع مزودي الخدمات السحابية التقنية الموثوقين وبوابات الدفع المرخصة من البنك المركزي السعودي (ساما) لتنفيذ المعاملات.' : 'Authorized cloud hosting and payment processing partners licensed by SAMA.'}</li>
              <li>{isAr ? 'مع الجهات الحكومية والتنظيمية في المملكة العربية السعودية عند وجود إلزام نظامي صريح أو أمر قضائي واجب النفاذ.' : 'Statutory regulatory authorities in Saudi Arabia when mandated by law or judicial decrees.'}</li>
            </ul>
          </section>

          {/* Section 7: Sovereignty */}
          <section id="sovereignty" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">7</span>
              <span>{isAr ? 'السيادة الرقمية ونقل البيانات' : '7. Digital Sovereignty & Data Transfers'}</span>
            </h2>
            <p>
              {isAr
                ? 'تلتزم راش إكس بضوابط نقل ومعالجة البيانات الشخصية الصادرة عن الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا - SDAIA)؛ وتُعطى الأولوية لمعالجة وتخزين البيانات داخل النطاق الجغرافي للمملكة العربية السعودية، وفي حال الاستعانة بأي خدمات سحابية عالمية تطبق راش إكس كافة الضمانات الفنية والتعاقدية المقررة نظاماً.'
                : 'RashX adheres to cross-border transfer directives established by the Saudi Data and AI Authority (SDAIA). Primary processing prioritizes sovereign Saudi cloud zones, backing any ancillary cross-border transmissions with statutory contractual standard clauses.'}
            </p>
          </section>

          {/* Section 8: Security & Phone Masking */}
          <section id="security" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">8</span>
              <span>{isAr ? 'التدابير الأمنية وحجب أرقام الجوالات (Phone Masking)' : '8. Security Safeguards & Client Phone Masking'}</span>
            </h2>
            <p>
              {isAr
                ? 'نطبق تدابير تقنية وإدارية مشددة تشمل التشفير ببروتوكول TLS 1.3 أثناء النقل والتشفير بنظام AES-256 أثناء التخزين، بالإضافة إلى الفصل المنطقي التام بين قواعد بيانات المنشآت.'
                : 'We enforce stringent technical controls including TLS 1.3 in-transit and AES-256 at-rest encryption alongside multi-tenant database compartmentalization.'}
            </p>
            <div className="p-4 rounded-2xl bg-white border border-mist-gray space-y-1.5">
              <div className="font-bold text-ink text-xs flex items-center gap-1.5">
                <EyeOff className="w-4 h-4 text-[#8B5CF6]" />
                <span>{isAr ? 'ميزة حجب أرقام الهواتف التلقائي (Phone Masking):' : 'Automated Client Phone Masking Protection:'}</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                {isAr
                  ? 'لحماية خصوصية عميلات المشاغل ومنع تسريب بياناتهن أو سرقة قوائم العملاء من قِبل الموظفين، تُخفي المنظومة أرقام الجوالات تلقائياً على شاشات الاستقبال ومقدمي الخدمة (تظهر بصيغة 05****1234)، مع قفل خاصية تصدير القوائم على المالك الرئيسي فقط.'
                  : 'To safeguard client contact privacy and prevent customer database theft by staff, contact numbers are automatically masked (05****1234) on reception screens, while data export features are hard-locked to primary account owners.'}
              </p>
            </div>
          </section>

          {/* Section 9: Retention */}
          <section id="retention" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">9</span>
              <span>{isAr ? 'مدة الاحتفاظ بالبيانات وإتلافها الآمن' : '9. Data Retention & Secure Destruction'}</span>
            </h2>
            <p>
              {isAr
                ? 'نحتفظ بالبيانات الشخصية فقط للمدة اللازمة لتحقيق الأغراض التي جُمعت من أجلها، أو للالتزام بالمتطلبات النظامية والضريبية المقررة في المملكة (مثل الاحتفاظ بسجلات الفواتير الضريبية للمدة المحددة من قِبل هيئة الزكاة والضريبة والجمارك ZATCA). وفور انتهاء الغرض النظامي، يتم إتلاف البيانات أو تعميتها بشكل دائم وغير قابل للاسترجاع.'
                : 'Personal data is retained solely for the duration required to satisfy collection purposes or statutory compliance periods (such as ZATCA tax invoice retention mandates). Upon expiration of legitimate retention grounds, records are securely expunged or permanently anonymized.'}
            </p>
          </section>

          {/* Section 10: Rights */}
          <section id="rights" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">10</span>
              <span>{isAr ? 'حقوق صاحب البيانات الشخصية بموجب نظام PDPL' : '10. Statutory Data Subject Rights'}</span>
            </h2>
            <p>
              {isAr
                ? 'يمنح نظام حماية البيانات الشخصية السعودي أصحاب البيانات حزمة من الحقوق النظامية التي نلتزم بتمكينهم من ممارستها بكل يسر:'
                : 'The Saudi PDPL grants individuals statutory rights which RashX is fully dedicated to facilitating:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white border border-mist-gray space-y-1">
                <span className="font-bold text-ink text-xs block">{isAr ? '1. حق العلم والإحاطة:' : '1. Right to be Informed:'}</span>
                <span className="text-[11px] text-ink-muted">{isAr ? 'معرفة المسوغ النظامي والغرض من جمع البيانات وكيفية معالجتها.' : 'Clarity on legal grounds, processing purposes, and storage durations.'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-mist-gray space-y-1">
                <span className="font-bold text-ink text-xs block">{isAr ? '2. حق الوصول والاطلاع:' : '2. Right of Access & Portability:'}</span>
                <span className="text-[11px] text-ink-muted">{isAr ? 'طلب الاطلاع على بياناتك الشخصية والحصول على نسخة منها بصيغة مقروءة.' : 'Requesting access and obtaining portable readable copies of personal records.'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-mist-gray space-y-1">
                <span className="font-bold text-ink text-xs block">{isAr ? '3. حق التصحيح والتحديث:' : '3. Right to Rectification:'}</span>
                <span className="text-[11px] text-ink-muted">{isAr ? 'طلب تصحيح أو تحديث أي بيانات غير دقيقة أو غير مكتملة.' : 'Requesting correction or completion of inaccurate personal information.'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-mist-gray space-y-1">
                <span className="font-bold text-ink text-xs block">{isAr ? '4. حق الإتلاف والمحو:' : '4. Right to Erasure / Destruction:'}</span>
                <span className="text-[11px] text-ink-muted">{isAr ? 'طلب مسح أو إتلاف البيانات عند انتهاء الغرض منها وفق الأصول النظامية.' : 'Requesting data destruction when statutory retention grounds lapse.'}</span>
              </div>
            </div>
            <p className="text-xs text-ink-muted pt-1">
              {isAr
                ? 'للتقدم بأي طلب لممارسة حقوقك، يمكنك مراسلتنا عبر البريد الإلكتروني لمسؤول حماية البيانات، ويتم البت في الطلبات خلال 30 يوماً دون فرض أي رسوم مالية.'
                : 'To exercise any statutory right, submit an inquiry to our Data Protection Officer; requests are reviewed within 30 statutory days free of charge.'}
            </p>
          </section>

          {/* Section 11: Cookies */}
          <section id="cookies" className="space-y-3 scroll-mt-24">
            <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-mist-gray flex items-center justify-center text-xs font-bold text-dusty-blue font-mono">11</span>
              <span>{isAr ? 'ملفات تعريف الارتباط (الكوكيز) والتقنيات المشابهة' : '11. Cookies & Tracking Technologies'}</span>
            </h2>
            <p>
              {isAr
                ? 'يستخدم موقع راش إكس ملفات تعريف الارتباط الضرورية لضمان أمان تصفح الموقع، وحفظ تفضيلات اللغة (العربية/الإنجليزية)، بالإضافة إلى ملفات تحليلية مجهولة الهوية لتحسين استجابة الخوادم. يمكنك في أي وقت تعديل إعدادات متصفحك لحظر أو تقييد الكوكيز، مع ملاحظة أن بعض وظائف المنظومة قد تتأثر بذلك.'
                : 'RashX utilizes essential cookies for session security, language preferences (Arabic/English), and privacy-preserving telemetry. You may adjust browser controls to block or restrict cookies at any time, noting that certain platform utilities may require essential cookies.'}
            </p>
          </section>

          {/* Section 12: DPO Contact */}
          <section id="dpo-contact" className="space-y-4 scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-white border-2 border-mist-gray shadow-xs">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                <Mail className="w-4 h-4 text-dusty-blue" />
                <span>{isAr ? 'التواصل مع مسؤول حماية البيانات (DPO)' : 'Contacting the Data Protection Officer (DPO)'}</span>
              </h2>
              <p className="text-xs text-ink-muted leading-relaxed">
                {isAr
                  ? 'لأي استفسارات أو ملاحظات تتعلق بسياسة الخصوصية، أو لتقديم طلبات ممارسة حقوق صاحب البيانات بموجب نظام حماية البيانات الشخصية السعودي، يرجى التواصل مع فريق الخصوصية لدينا عبر القنوات الرسمية التالية:'
                  : 'For privacy inquiries, regulatory compliance queries, or to exercise your statutory rights under the Saudi PDPL, contact our Data Protection Office:'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-ink-muted">{isAr ? 'مسؤول حماية البيانات (DPO):' : 'Data Protection Officer (DPO):'}</div>
                <div className="font-bold text-ink">
                  {isAr
                    ? '[TODO: اسم وتفاصيل مسؤول حماية البيانات (Data Protection Officer - DPO) المعين من قِبل المنشأة]'
                    : '[TODO: Designated Data Protection Officer (DPO) Contact & Representative Details]'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-ink-muted">{isAr ? 'البريد الإلكتروني المخصص للخصوصية:' : 'Dedicated Privacy Email:'}</div>
                <div className="font-bold text-ink font-mono">privacy@rashx.org</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-ink-muted">{isAr ? 'هاتف وواتساب الدعم المعتمد:' : 'Verified Support Phone & WhatsApp:'}</div>
                <div className="font-bold text-ink font-mono" dir="ltr">{SITE_CONFIG.phone}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-mist-gray space-y-1">
                <div className="text-ink-muted">{isAr ? 'المقر المستهدف والاختصاص:' : 'Target Market & Jurisdiction:'}</div>
                <div className="font-bold text-ink">{isAr ? 'المملكة العربية السعودية، مدينة الرياض' : 'Riyadh, Kingdom of Saudi Arabia'}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
