import React from 'react';
import type { Metadata } from 'next';
import { PlatformAdminLoginClient } from '@/components/dashboard/login/PlatformAdminLoginClient';

export const metadata: Metadata = {
  title: 'تسجيل الدخول المركزي | راش إكس Platform HQ',
  description: 'بوابة تسجيل دخول مسؤولي ومشرفي منصة راش إكس المركزية السحابية',
};

export const instant = false;

interface PlatformAdminLoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlatformAdminLoginPage({
  params,
}: PlatformAdminLoginPageProps) {
  const { locale } = await params;
  return <PlatformAdminLoginClient locale={locale || 'ar'} />;
}
