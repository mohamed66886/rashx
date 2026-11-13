import React, { Suspense } from 'react';
import { requireAdmin } from '@/server/auth/session';
import { getInvoicesPage, getInvoiceStats } from '@/server/data/invoices';
import {
  InvoicesHero,
  InvoicesStatsCards,
  InvoicesTable,
} from '@/components/dashboard/invoices/InvoicesListClientView';
import { SectionErrorBoundary } from '@/components/dashboard/SectionErrorBoundary';
import { Skeleton } from '@/components/ui';
import type { InvoiceStatus } from '@/lib/types/billing';
import InvoicesLoading from './loading';

const InvoicesListSkeleton = InvoicesLoading;

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

function InvoiceStatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 animate-pulse">
      <Skeleton className="h-24 rounded-2xl" />
      <Skeleton className="h-24 rounded-2xl" />
      <Skeleton className="h-24 rounded-2xl" />
      <Skeleton className="h-24 rounded-2xl" />
      <Skeleton className="h-24 rounded-2xl" />
    </div>
  );
}

function InvoicesTableSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E8] p-4 shadow-2xs space-y-4 animate-pulse">
      <div className="flex justify-between gap-3">
        <Skeleton className="h-10 w-72 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
      <div className="flex gap-2 border-b border-[#E5E9E8] pb-3">
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
        <Skeleton className="h-8 w-20 rounded-xl" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

/* ──────────────── Independent Async Stats Section ──────────────── */
async function InvoicesStatsCardsSection({ searchParams }: InvoicesPageProps) {
  const resolvedParams = await searchParams;
  const stats = await getInvoiceStats();
  return <InvoicesStatsCards stats={stats} currentStatus={resolvedParams.status || 'all'} />;
}

/* ──────────────── Independent Async Invoices Table Section ──────────────── */
async function InvoicesTableSection({ searchParams }: InvoicesPageProps) {
  const resolvedParams = await searchParams;
  const statusParam = resolvedParams.status;
  const qParam = resolvedParams.q;

  const validStatus = statusParam && VALID_STATUSES.has(statusParam)
    ? (statusParam as InvoiceStatus)
    : undefined;

  const invoicesData = await getInvoicesPage({
    status: validStatus,
    q: qParam,
    limit: 25,
  });

  return (
    <InvoicesTable
      initialInvoices={invoicesData.items}
      initialNextCursor={invoicesData.nextCursor}
      initialHasMore={invoicesData.hasMore}
      currentStatus={statusParam || 'all'}
      currentQuery={qParam || ''}
    />
  );
}

/* ──────────────── Content Wrapper (Async Server Component) ──────────────── */
async function InvoicesContent({ searchParams }: InvoicesPageProps) {
  await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* Top Hero / Actions */}
      <InvoicesHero />

      {/* KPI Statistics Cards - Independent Async Section */}
      <SectionErrorBoundary fallbackTitle="تعذر تحميل إحصائيات الفواتير">
        <Suspense fallback={<InvoiceStatsCardsSkeleton />}>
          <InvoicesStatsCardsSection searchParams={searchParams} />
        </Suspense>
      </SectionErrorBoundary>

      {/* Invoices Table - Independent Async Section */}
      <SectionErrorBoundary fallbackTitle="تعذر تحميل قائمة الفواتير">
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <InvoicesTableSection searchParams={searchParams} />
        </Suspense>
      </SectionErrorBoundary>
    </div>
  );
}

/* ──────────────── Synchronous Shell Default Export ──────────────── */
export default function InvoicesPage({ searchParams }: InvoicesPageProps) {
  return (
    <Suspense fallback={<InvoicesListSkeleton />}>
      <InvoicesContent searchParams={searchParams} />
    </Suspense>
  );
}
