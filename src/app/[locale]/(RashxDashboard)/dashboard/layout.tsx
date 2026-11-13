import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { requireAdmin } from '@/server/auth/session';
import { getInvoiceStats } from '@/server/data/invoices';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { DashboardAuthProvider } from '@/context/DashboardAuthContext';

interface PlatformAdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

async function InvoicesBadge() {
  const stats = await getInvoiceStats();
  const count = stats.uploadedCount || 0;
  if (count <= 0) return null;
  return (
    <span className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-ink bg-warm-peach">
      {count}
    </span>
  );
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

  return (
    <DashboardAuthProvider initialAdmin={admin}>
      <DashboardShell
        admin={admin}
        locale={locale || 'ar'}
        invoicesBadge={
          <Suspense fallback={null}>
            <InvoicesBadge />
          </Suspense>
        }
      >
        <DashboardAuthProvider initialAdmin={admin}>
          {children}
        </DashboardAuthProvider>
      </DashboardShell>
    </DashboardAuthProvider>
  );
}
