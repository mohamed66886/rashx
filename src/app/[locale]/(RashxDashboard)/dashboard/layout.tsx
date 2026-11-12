import React from 'react';
import { headers } from 'next/headers';
import { requireAdmin } from '@/server/auth/session';
import { getInvoiceStats } from '@/server/data/invoices';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const instant = false;

interface PlatformAdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function PlatformAdminLayout({
  children,
  params,
}: PlatformAdminLayoutProps) {
  const { locale } = await params;
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  // If on login page, render children without dashboard frame
  if (pathname.includes('/dashboard/login')) {
    return <>{children}</>;
  }

  const admin = await requireAdmin(undefined, { locale });
  const invoiceStats = await getInvoiceStats();

  const uploadedCount = invoiceStats.uploadedCount || 0;

  return (
    <DashboardShell
      admin={admin}
      locale={locale || 'ar'}
      uploadedInvoicesCount={uploadedCount}
    >
      {children}
    </DashboardShell>
  );
}
