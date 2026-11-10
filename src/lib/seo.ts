import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { Locale, DEFAULT_LOCALE, LOCALES_METADATA } from '@/i18n/config';

export interface SEOPageProps {
  title: string;
  description: string;
  locale: Locale;
  pathname?: string;
  keywords?: string[];
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

/**
 * Generate fully standardized Next.js Metadata for any page
 * Enforces title (<= 60 chars) and description (<= 155 chars) conventions
 * Generates canonical, hreflang alternates (ar-SA, en-US, x-default), OpenGraph & Twitter cards.
 */
export function generatePageMetadata({
  title,
  description,
  locale,
  pathname = '',
  keywords = [],
  ogImage = '/brand/social/og-share-blue.svg',
  type = 'website',
  publishedTime,
  authors,
  noIndex = false,
}: SEOPageProps): Metadata {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const localizedPath = `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
  const canonicalUrl = `${SITE_CONFIG.url}${localizedPath}`;

  const arAlternate = `${SITE_CONFIG.url}/ar${cleanPath === '/' ? '' : cleanPath}`;
  const enAlternate = `${SITE_CONFIG.url}/en${cleanPath === '/' ? '' : cleanPath}`;

  // Truncate cleanly if needed
  const safeTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
  const safeDescription =
    description.length > 155 ? `${description.slice(0, 152)}...` : description;

  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`;

  return {
    title: safeTitle,
    description: safeDescription,
    keywords: keywords.length > 0 ? keywords : undefined,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar-SA': arAlternate,
        'en-US': enAlternate,
        'x-default': arAlternate, // Arabic is the default primary language for Saudi Arabia
      },
    },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: LOCALES_METADATA[locale]?.langCode.replace('-', '_'),
      alternateLocale: [
        LOCALES_METADATA[locale === 'ar' ? 'en' : 'ar']?.langCode.replace('-', '_'),
      ],
      type,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: safeTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDescription,
      site: '@rashxsa',
      creator: '@rashxsa',
      images: [fullOgImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    verification: {
      google: SITE_CONFIG.analytics.gscVerification,
    },
    icons: {
      icon: '/brand/icons/favicon-black-on-blue.svg',
      apple: '/brand/icons/app-icon-rx-black-on-blue.svg',
    },
  };
}

/* =========================================================================
   JSON-LD STRUCTURED DATA SCHEMAS
   ========================================================================= */

/**
 * Organization JSON-LD with verified social handles (sameAs), founder, and contact point
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/brand/logo/lockup-bilingual/lockup-bilingual-black.svg`,
    image: `${SITE_CONFIG.url}/brand/social/og-share-blue.svg`,
    description: SITE_CONFIG.slogan.ar,
    foundingDate: '2026',
    founder: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#founder`,
      name: SITE_CONFIG.founder.nameAr,
      alternateName: SITE_CONFIG.founder.nameEn,
      jobTitle: SITE_CONFIG.founder.roleAr,
      url: `${SITE_CONFIG.url}/ar/founder`,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'customer support & sales',
        areaServed: 'SA',
        availableLanguage: ['Arabic', 'English'],
        url: SITE_CONFIG.whatsappUrl,
      },
    ],
    sameAs: [
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.x,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.tiktok,
      SITE_CONFIG.social.snapchat,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.telegram,
      SITE_CONFIG.social.whatsapp,
    ],
  };
}

/**
 * WebSite JSON-LD Schema
 */
export function getWebSiteSchema(locale: Locale = DEFAULT_LOCALE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: `${SITE_CONFIG.url}/${locale}`,
    name: SITE_CONFIG.name,
    description: locale === 'ar' ? SITE_CONFIG.slogan.ar : SITE_CONFIG.slogan.en,
    inLanguage: LOCALES_METADATA[locale]?.langCode,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
  };
}

/**
 * SoftwareApplication Schema (for features and pricing)
 */
export function getSoftwareApplicationSchema(locale: Locale = DEFAULT_LOCALE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_CONFIG.name,
    operatingSystem: 'Cloud-based, Web, iOS, Android (PWA)',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Salon & Spa Management Software',
    url: `${SITE_CONFIG.url}/${locale}`,
    offers: [
      {
        '@type': 'Offer',
        name: locale === 'ar' ? 'الباقة الأساسية (الانطلاق)' : 'Basic Plan (Starter)',
        priceCurrency: 'SAR',
        price: '0',
        description: '14-Day Free Trial Available [TODO]',
        url: `${SITE_CONFIG.url}/${locale}/pricing`,
      },
      {
        '@type': 'Offer',
        name: locale === 'ar' ? 'الباقة الاحترافية (النمو والتوسع)' : 'Professional Plan (Growth)',
        priceCurrency: 'SAR',
        price: '0',
        description: '14-Day Free Trial Available [TODO]',
        url: `${SITE_CONFIG.url}/${locale}/pricing`,
      },
      {
        '@type': 'Offer',
        name: locale === 'ar' ? 'باقة المؤسسات (السلاسل والمراكز الكبرى)' : 'Enterprise Plan (Chains)',
        priceCurrency: 'SAR',
        price: '0',
        description: 'Custom Enterprise Quoted Plan [TODO]',
        url: `${SITE_CONFIG.url}/${locale}/pricing`,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '1', // [TODO] update when real reviews are published
    },
    featureList: [
      'Subdomain per facility',
      'ZATCA Phase 2 E-Invoicing support',
      'Smart 24/7 Booking Engine',
      'Fast Touch POS',
      'Commission & Payroll Calculation',
      'Dual Backbar & Retail Inventory',
      'Automated WhatsApp Reminders',
    ],
  };
}

/**
 * BreadcrumbList Schema
 */
export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : `${SITE_CONFIG.url}${crumb.item}`,
    })),
  };
}

/**
 * FAQPage Schema
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQPageSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * ContactPage Schema with complete Organization and ContactPoint
 */
export function getContactPageSchema(locale: Locale = DEFAULT_LOCALE) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_CONFIG.url}/${locale}/contact#webpage`,
    url: `${SITE_CONFIG.url}/${locale}/contact`,
    name: isAr ? 'تواصل مع فريق راش إكس' : 'Contact RashX Team',
    description: isAr
      ? 'تواصل مع فريق راش إكس في المملكة العربية السعودية عبر واتساب، الهاتف، تيليجرام، أو البريد الإلكتروني.'
      : 'Contact the RashX team in Saudi Arabia via WhatsApp, phone, Telegram, or email.',
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      url: SITE_CONFIG.url,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: SITE_CONFIG.phone,
          contactType: 'customer service & sales',
          areaServed: 'SA',
          availableLanguage: ['Arabic', 'English'],
          url: SITE_CONFIG.whatsappUrl,
        },
      ],
    },
  };
}

/**
 * AboutPage Schema
 */
export function getAboutPageSchema(locale: Locale = DEFAULT_LOCALE) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_CONFIG.url}/${locale}/about#webpage`,
    url: `${SITE_CONFIG.url}/${locale}/about`,
    name: isAr ? 'من نحن | راش إكس RashX' : 'About Us | RashX',
    description: isAr
      ? 'تعرف على راش إكس، المنظومة السحابية المتخصصة في رقمنة صالونات التجميل والمشاغل ومراكز السبا في المملكة العربية السعودية.'
      : 'Learn about RashX, the cloud management platform digitizing beauty salons, studios, and spas in Saudi Arabia.',
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      foundingDate: '2026',
      founder: {
        '@type': 'Person',
        name: isAr ? SITE_CONFIG.founder.nameAr : SITE_CONFIG.founder.nameEn,
        jobTitle: isAr ? SITE_CONFIG.founder.roleAr : SITE_CONFIG.founder.roleEn,
        url: `${SITE_CONFIG.url}/${locale}/founder`,
      },
      url: SITE_CONFIG.url,
      sameAs: [
        SITE_CONFIG.social.linkedin,
        SITE_CONFIG.social.x,
        SITE_CONFIG.social.instagram,
        SITE_CONFIG.social.tiktok,
        SITE_CONFIG.social.snapchat,
        SITE_CONFIG.social.facebook,
        SITE_CONFIG.social.telegram,
      ],
    },
  };
}

/**
 * Person Schema (Founder)
 */
export function getPersonSchema(locale: Locale = DEFAULT_LOCALE) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}/#founder`,
    name: isAr ? SITE_CONFIG.founder.nameAr : SITE_CONFIG.founder.nameEn,
    alternateName: isAr ? SITE_CONFIG.founder.nameEn : SITE_CONFIG.founder.nameAr,
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: 'RashX',
      url: SITE_CONFIG.url,
    },
    url: `${SITE_CONFIG.url}/${locale}/founder`,
    sameAs: [
      SITE_CONFIG.social.linkedin,
    ],
  };
}

/**
 * ProfilePage Schema
 */
export function getProfilePageSchema(locale: Locale = DEFAULT_LOCALE) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_CONFIG.url}/${locale}/founder#profilepage`,
    url: `${SITE_CONFIG.url}/${locale}/founder`,
    name: isAr
      ? 'م. محمد عبده رشاد البهي – مؤسس RashX'
      : 'Eng. Mohamed Abdo Rashad Elbahy – Founder of RashX',
    description: isAr
      ? 'الملف التعريفي للمهندس محمد عبده رشاد البهي، مؤسس منصة راش إكس (RashX) عام 2026 ورؤيته لرقمنة قطاع التجميل والصالونات.'
      : 'Profile of Eng. Mohamed Abdo Rashad Elbahy, Founder of RashX (2026) and his vision for digitizing the beauty and salon sector.',
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_CONFIG.url}/#founder`,
      name: isAr ? SITE_CONFIG.founder.nameAr : SITE_CONFIG.founder.nameEn,
      alternateName: isAr ? SITE_CONFIG.founder.nameEn : SITE_CONFIG.founder.nameAr,
      jobTitle: 'Founder',
      worksFor: {
        '@type': 'Organization',
        name: 'RashX',
        url: SITE_CONFIG.url,
      },
      sameAs: [
        SITE_CONFIG.social.linkedin,
      ],
      url: `${SITE_CONFIG.url}/${locale}/founder`,
    },
  };
}

/**
 * Article Schema (for Blog Posts)
 */
export interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  locale?: Locale;
}

export function getArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = SITE_CONFIG.founder.nameAr,
  locale = DEFAULT_LOCALE,
}: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: LOCALES_METADATA[locale]?.langCode,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    datePublished,
    dateModified: dateModified || datePublished,
  };
}

/**
 * NewsArticle Schema (for Changelog & News items)
 */
export interface NewsArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  category?: string;
  locale?: Locale;
}

export function getNewsArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  category,
  locale = DEFAULT_LOCALE,
}: NewsArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    description,
    inLanguage: LOCALES_METADATA[locale]?.langCode,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: `${SITE_CONFIG.url}/brand/social/og-share-blue.svg`,
    datePublished,
    dateModified: dateModified || datePublished,
    ...(category && { articleSection: category }),
    author: {
      '@type': 'Organization',
      name: 'RashX',
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RashX',
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/brand/logos/logo-primary.svg`,
      },
    },
  };
}

/**
 * Service Schema with areaServed (City)
 */
export interface CityServiceSchemaProps {
  cityNameAr: string;
  cityNameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  citySlug: string;
  locale?: Locale;
}

export function getCityServiceSchema({
  cityNameAr,
  cityNameEn,
  descriptionAr,
  descriptionEn,
  citySlug,
  locale = DEFAULT_LOCALE,
}: CityServiceSchemaProps) {
  const isAr = locale === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.url}/${locale}/cities/${citySlug}#service`,
    name: isAr
      ? `نظام إدارة الصالونات ومراكز التجميل في ${cityNameAr}`
      : `Salon & Beauty Center Management System in ${cityNameEn}`,
    serviceType: 'Salon Management Software & POS Cloud Infrastructure',
    description: isAr ? descriptionAr : descriptionEn,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: {
      '@type': 'City',
      name: isAr ? cityNameAr : cityNameEn,
      alternateName: isAr ? cityNameEn : cityNameAr,
    },
    url: `${SITE_CONFIG.url}/${locale}/cities/${citySlug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: '0',
      description: '14-Day Free Trial Available [TODO]',
      url: `${SITE_CONFIG.url}/${locale}/pricing`,
    },
  };
}

