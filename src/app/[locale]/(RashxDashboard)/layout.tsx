import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, Locale, isSupportedLocale, getDirection } from '@/i18n/config';
import { DashboardAuthProvider } from '@/context/DashboardAuthContext';
import { getAdmin } from '@/server/auth/session';

export const instant = false;

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'الإدارة العامة لمنصة راش إكس | RashX Platform HQ (admin.rashx.org)',
  description:
    'لوحة القيادة المركزية لمنصة راش إكس: إدارة الصالونات المشتركة، توليد النطاقات الفرعية، متابعة الاشتراكات السحابية، والرقابة الفنية والأمنية.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/brand/icons/app-icon-rx-black-on-blue.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'RashX HQ',
  },
  robots: {
    index: false,
    follow: false,
  },
};

interface DashboardRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function DashboardRootLayout({
  children,
  params,
}: DashboardRootLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dir = getDirection(locale);
  const admin = await getAdmin();

  return (
    <div lang={locale} dir={dir} className="min-h-screen bg-[#F8FAFB] text-[#0D1514] font-sans antialiased selection:bg-[#91B8C0]/30 selection:text-black">
      <DashboardAuthProvider initialAdmin={admin}>{children}</DashboardAuthProvider>
    </div>
  );
}

