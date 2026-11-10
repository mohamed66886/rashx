import type { Metadata } from 'next';
import './globals.css';
import { PopupProvider } from '@/components/ui/popups';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'راش إكس | نظام إدارة الصالونات ومراكز التجميل والسبا في السعودية',
    template: '%s | راش إكس – RashX',
  },
  description:
    'منصة راش إكس: نظام إدارة ذكي وسحابي متكامل للصالونات، المشاغل، مراكز التجميل، والسبا في المملكة العربية السعودية. نطاق فرعي مخصص، 10 أنظمة متكاملة، ودعم متطلبات الفوترة الإلكترونية المرحلة الثانية.',
  icons: {
    icon: '/brand/icons/favicon-black-on-blue.svg',
    apple: '/brand/icons/app-icon-rx-black-on-blue.svg',
  },
  openGraph: {
    title: 'راش إكس | RashX – أكثر من مجرد إدارة، تجربة رقمية متكاملة.',
    description:
      'نظام إدارة سحابي للصالونات والمشاغل والسبا في السعودية. نطاق فرعي خاص، 10 أنظمة متكاملة، ودعم متطلبات الفوترة الإلكترونية.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/brand/social/og-share-blue.svg`,
        width: 1200,
        height: 630,
        alt: 'RashX – راش إكس',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rashxsa',
    creator: '@rashxsa',
    title: 'راش إكس | RashX',
    description: SITE_CONFIG.slogan.ar,
    images: [`${SITE_CONFIG.url}/brand/social/og-share-blue.svg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-white text-ink selection:bg-dusty-blue/30 selection:text-black">
        <PopupProvider>{children}</PopupProvider>
      </body>
    </html>
  );
}
