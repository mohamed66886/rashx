import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { LOCALES } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const marketingRoutes = [
    '',
    '/features',
    '/zatca',
    '/pricing',
    '/demo',
    '/contact',
    '/about',
    '/founder',
    '/security',
    '/faq',
    '/privacy',
    '/terms',
    '/changelog',
    '/news',
    '/solutions/booking-system',
    '/solutions/pos-billing',
    '/solutions/crm-loyalty',
    '/solutions/staff-hr',
    '/solutions/inventory-purchasing',
    '/solutions/analytics-ai',
    '/for/beauty-salons',
    '/for/barbershops',
    '/for/spas',
    '/for/clinics',
    '/cities/riyadh',
    '/cities/jeddah',
    '/cities/dammam',
    '/cities/khobar',
    '/cities/makkah',
    '/cities/madinah',
    '/cities/taif',
    '/cities/abha',
    '/blog',
    '/blog/how-to-choose-salon-management-software',
    '/blog/zatca-phase-2-salon-guide',
    '/blog/how-to-increase-salon-customer-loyalty',
    '/blog/ramadan-eid-salon-rush-management',
    '/blog/saudi-pdpl-compliance-for-salons',
    '/blog/salon-staff-commissions-best-practices',
    '/blog/barbershop-chair-turnover-queue',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of marketingRoutes) {
    for (const locale of LOCALES) {
      const path = `/${locale}${route}`;
      const url = `${baseUrl}${path}`;

      sitemapEntries.push({
        url,
        lastModified: new Date('2026-11-10'),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.startsWith('/solutions') || route === '/pricing' ? 0.9 : 0.8,
        alternates: {
          languages: {
            'ar-SA': `${baseUrl}/ar${route}`,
            'en-US': `${baseUrl}/en${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}

