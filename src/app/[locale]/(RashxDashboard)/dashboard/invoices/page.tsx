import React, { Suspense } from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getInvoicesPage, getInvoiceStats } from '@/server/data/invoices';
import { InvoicesListClientView } from '@/components/dashboard/invoices/InvoicesListClientView';
import type { InvoiceStatus } from '@/lib/types/billing';
import InvoicesLoading from './loading';

interface InvoicesPageProps {
  searchParams: Promise<{
    status?: string;
    q?: string;
  }>;
}

const VALID_STATUSES = new Set<string>([
  'draft',
  'issued',
  'sent',
  'viewed',
  'uploaded',
  'signed',
  'paid',
  'cancelled',
]);

async function InvoicesContent({ searchParams }: InvoicesPageProps) {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const resolvedParams = await searchParams;
  const statusParam = resolvedParams.status;
  const qParam = resolvedParams.q;

  const validStatus = statusParam && VALID_STATUSES.has(statusParam)
    ? (statusParam as InvoiceStatus)
    : undefined;

  const [stats, invoicesData] = await Promise.all([
    getInvoiceStats(),
    getInvoicesPage({
      status: validStatus,
      q: qParam,
      limit: 25,
    }),
  ]);

  return (
    <InvoicesListClientView
      stats={stats}
      initialInvoices={invoicesData.items}
      initialNextCursor={invoicesData.nextCursor}
      initialHasMore={invoicesData.hasMore}
      currentStatus={statusParam || 'all'}
      currentQuery={qParam || ''}
    />
  );
}

export default function InvoicesPage({ searchParams }: InvoicesPageProps) {
  return (
    <Suspense fallback={<InvoicesLoading />}>
      <InvoicesContent searchParams={searchParams} />
    </Suspense>
  );
}
