import React, { Suspense } from 'react';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  CheckCircle2,
  UserPlus,
  Plus,
  Receipt,
  ExternalLink,
  Database,
  ChevronRight,
  Inbox,
  PenTool,
  UploadCloud,
} from 'lucide-react';
import { getTenantsPage } from '@/server/data/tenants';
import { getLeadsPage } from '@/server/data/leads';
import { getPlatformStats } from '@/server/data/stats';
import { getInvoiceStats } from '@/server/data/invoices';
import { requireAdmin } from '@/server/auth/session';
import type { SalonTenant } from '@/lib/types/platform';
import {
  Button,
  Badge,
  Skeleton,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import { OverviewRefreshButton } from '@/components/dashboard/overview/OverviewRefreshButton';
import { SectionErrorBoundary } from '@/components/dashboard/SectionErrorBoundary';
import DashboardLoading from './loading';

interface MetricProps {
  icon: React.ReactNode;
  tone: string;
  title: string;
  value: string | number;
  hint?: string;
}

function Metric({ icon, tone, title, value, hint }: MetricProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral bg-base p-4 lg:p-5">
      <div className={`grid h-9 w-9 place-items-center rounded-xl text-ink ${tone}`}>{icon}</div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold leading-snug text-ink-muted lg:text-xs">{title}</div>
        <div className="mt-0.5 truncate text-xl font-extrabold text-ink lg:text-2xl">{value}</div>
        {hint && <div className="mt-0.5 truncate text-[11px] text-ink-muted">{hint}</div>}
      </div>
    </div>
  );
}

function PlatformStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 animate-pulse">
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
    </div>
  );
}

function InvoiceStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 animate-pulse">
      <Skeleton className="h-20 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
    </div>
  );
}

function LatestTenantsSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral bg-base p-6 lg:rounded-3xl animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

function LatestLeadsSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral bg-base p-6 lg:rounded-3xl animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32 rounded-lg" />
        <Skeleton className="h-6 w-12 rounded-lg" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    </div>
  );
}

/* =========================================================================
   Section (a): Platform stats cards
   ========================================================================= */
async function PlatformStatsSection({ isAr }: { isAr: boolean }) {
  const stats = await getPlatformStats();
  const sar = isAr ? 'ر.س' : 'SAR';

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <Metric
        icon={<Building2 className="h-[18px] w-[18px]" aria-hidden="true" />}
        tone="bg-primary"
        title={isAr ? 'المنشآت المسجلة' : 'Registered salons'}
        value={stats.tenantsTotal}
      />
      <Metric
        icon={<CheckCircle2 className="h-[18px] w-[18px]" aria-hidden="true" />}
        tone="bg-neutral"
        title={isAr ? 'المنشآت النشطة' : 'Active salons'}
        value={stats.tenantsActive}
      />
      <Metric
        icon={<TrendingUp className="h-[18px] w-[18px]" aria-hidden="true" />}
        tone="bg-warm-peach"
        title={isAr ? 'الإيراد الشهري (MRR)' : 'Monthly revenue (MRR)'}
        value={`${stats.mrrTotal.toLocaleString(isAr ? 'ar-SA' : 'en-US')} ${sar}`}
      />
      <Metric
        icon={<UserPlus className="h-[18px] w-[18px]" aria-hidden="true" />}
        tone="bg-primary/60"
        title={isAr ? 'طلبات الانضمام' : 'Inbound leads'}
        value={stats.leadsTotal}
      />
    </div>
  );
}

/* =========================================================================
   Section (d): Invoice stats cards (awaiting signature / uploaded for review)
   ========================================================================= */
async function InvoiceStatsSection({ locale, isAr }: { locale: string; isAr: boolean }) {
  const invoiceStats = await getInvoiceStats();
  const awaitingSignatureCount = (invoiceStats.sentCount || 0) + (invoiceStats.viewedCount || 0);
  const uploadedReviewCount = invoiceStats.uploadedCount || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {/* Awaiting signature card */}
      <Link
        href={`/${locale}/dashboard/invoices?status=sent`}
        className="flex items-center justify-between p-4 rounded-2xl border border-neutral bg-base hover:border-primary transition-all group shadow-2xs"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20 text-[#29545c] group-hover:bg-primary/30 transition-colors">
            <PenTool className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink-muted">
              {isAr ? 'بانتظار التوقيع' : 'Awaiting signature'}
            </div>
            <div className="text-lg font-black text-ink">
              {awaitingSignatureCount}{' '}
              <span className="text-xs font-normal text-ink-muted">
                {isAr ? 'مستند مرسل' : 'documents'}
              </span>
            </div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-ink-muted rtl:rotate-180 group-hover:translate-x-[-2px] rtl:group-hover:translate-x-[2px] transition-transform" />
      </Link>

      {/* Uploaded – needs review card */}
      <Link
        href={`/${locale}/dashboard/invoices?status=uploaded`}
        className={`flex items-center justify-between p-4 rounded-2xl border transition-all group shadow-2xs ${
          uploadedReviewCount > 0
            ? 'border-warm-peach/80 bg-warm-peach/10 hover:border-warm-peach'
            : 'border-neutral bg-base hover:border-primary'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${
              uploadedReviewCount > 0
                ? 'bg-warm-peach text-ink'
                : 'bg-neutral text-ink-muted'
            }`}
          >
            <UploadCloud className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink-muted">
              {isAr ? 'نسخ مرفوعة – تحتاج مراجعة' : 'Uploaded – needs review'}
            </div>
            <div className="text-lg font-black text-ink">
              {uploadedReviewCount}{' '}
              <span className="text-xs font-normal text-ink-muted">
                {isAr ? 'نسخة بانتظار الاعتماد' : 'awaiting review'}
              </span>
            </div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-ink-muted rtl:rotate-180 group-hover:translate-x-[-2px] rtl:group-hover:translate-x-[2px] transition-transform" />
      </Link>
    </div>
  );
}

/* =========================================================================
   Section (b): Latest tenants
   ========================================================================= */
async function LatestTenantsSection({ locale, isAr }: { locale: string; isAr: boolean }) {
  const tenantsData = await getTenantsPage({ limit: 5 });
  const tenants = tenantsData.items;
  const sar = isAr ? 'ر.س' : 'SAR';

  const subdomainLink = (t: SalonTenant) => (
    <a
      href={`https://${t.subdomain}.rashx.org`}
      target="_blank"
      rel="noreferrer"
      dir="ltr"
      className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-ink underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:decoration-warm-peach"
    >
      <span>{t.subdomain}.rashx.org</span>
      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
    </a>
  );

  const statusBadge = (t: SalonTenant) =>
    t.status === 'active' ? (
      <Badge variant="success" size="sm" dot>
        {isAr ? 'نشط' : 'Active'}
      </Badge>
    ) : (
      <Badge variant="warning" size="sm">
        {isAr ? 'تجريبي' : 'Trial'}
      </Badge>
    );

  return (
    <section className="overflow-hidden rounded-2xl border border-neutral bg-base lg:rounded-3xl h-full">
      <div className="flex items-center justify-between gap-3 p-4 sm:p-5 lg:p-6">
        <h2 className="text-sm font-extrabold text-ink sm:text-base lg:text-lg">
          {isAr ? 'أحدث الصالونات' : 'Latest salons'}
        </h2>

        <div className="flex shrink-0 items-center gap-1.5">
          <OverviewRefreshButton isAr={isAr} />
          <Link href={`/${locale}/dashboard/tenants`}>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ChevronRight className="h-4 w-4 rtl:rotate-180" />}
            >
              {isAr ? 'عرض الكل' : 'View all'}
            </Button>
          </Link>
        </div>
      </div>

      {tenants.length === 0 ? (
        <div className="border-t border-neutral p-8 text-center sm:p-12">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-ink">
            <Building2 className="h-7 w-7" aria-hidden="true" />
          </div>
          <h3 className="mb-1 text-sm font-bold text-ink">
            {isAr ? 'لا توجد صالونات مسجلة بعد' : 'No salons registered yet'}
          </h3>
          <p className="mx-auto mb-4 max-w-sm text-xs text-ink-muted">
            {isAr
              ? 'أضف أول صالون ليتم إنشاء نطاقه الفرعي وتفعيله.'
              : 'Add the first salon to create and activate its subdomain.'}
          </p>
          <Link href={`/${locale}/dashboard/tenants?action=new`}>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-4 w-4 stroke-[2.5]" />}
            >
              {isAr ? 'إضافة صالون' : 'Add salon'}
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile: cards */}
          <ul className="divide-y divide-neutral border-t border-neutral md:hidden">
            {tenants.map((t) => (
              <li key={t.id} className="space-y-2.5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-ink">{t.businessName}</div>
                    <div className="truncate text-[11px] text-ink-muted">
                      {t.ownerName} • {t.city}
                    </div>
                  </div>
                  {statusBadge(t)}
                </div>

                <div>{subdomainLink(t)}</div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="font-mono text-xs font-bold text-ink">
                      {t.mrr} {sar}
                    </span>
                    <Badge variant="secondary" size="sm">
                      {isAr ? `باقة ${t.plan}` : `${t.plan} plan`}
                    </Badge>
                  </div>
                  <Link href={`/${locale}/dashboard/tenants`}>
                    <Button variant="outline" size="sm" className="h-8 px-3 text-[11px]">
                      {isAr ? 'إدارة' : 'Manage'}
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* Tablet + desktop: table */}
          <div className="hidden md:block">
            <Table bordered={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>{isAr ? 'الصالون والمالك' : 'Salon & owner'}</TableHead>
                  <TableHead>{isAr ? 'النطاق الفرعي' : 'Subdomain'}</TableHead>
                  <TableHead className="hidden xl:table-cell">{isAr ? 'المدينة' : 'City'}</TableHead>
                  <TableHead>{isAr ? 'الباقة والاشتراك' : 'Plan & MRR'}</TableHead>
                  <TableHead>{isAr ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead align="center" className="hidden lg:table-cell">
                    {isAr ? 'إجراء' : 'Action'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="text-xs font-bold text-ink">{t.businessName}</div>
                      <div className="text-[10px] text-ink-muted">{t.ownerName}</div>
                    </TableCell>
                    <TableCell>{subdomainLink(t)}</TableCell>
                    <TableCell className="hidden text-xs text-ink-muted xl:table-cell">
                      {t.city}
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-xs font-bold text-ink">
                        {t.mrr} {sar}
                      </div>
                      <Badge variant="secondary" size="sm" className="mt-0.5">
                        {isAr ? `باقة ${t.plan}` : `${t.plan} plan`}
                      </Badge>
                    </TableCell>
                    <TableCell>{statusBadge(t)}</TableCell>
                    <TableCell align="center" className="hidden lg:table-cell">
                      <Link href={`/${locale}/dashboard/tenants`}>
                        <Button variant="outline" size="sm" className="h-7 px-2.5 py-1 text-[10px]">
                          {isAr ? 'إدارة' : 'Manage'}
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </section>
  );
}

/* =========================================================================
   Section (c): Latest leads
   ========================================================================= */
async function LatestLeadsSection({ locale, isAr }: { locale: string; isAr: boolean }) {
  const leadsData = await getLeadsPage({ limit: 5 });
  const leads = leadsData.items;

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-neutral bg-base lg:rounded-3xl h-full">
      <div className="flex items-center justify-between gap-3 p-4 sm:p-5 lg:p-6">
        <h2 className="text-sm font-extrabold text-ink sm:text-base lg:text-lg">
          {isAr ? 'أحدث طلبات الانضمام' : 'Latest leads'}
        </h2>
        <Badge variant="primary" size="sm">
          {leads.length}
        </Badge>
      </div>

      <div className="flex-1 border-t border-neutral px-4 pb-4 pt-4 sm:px-5 lg:px-6">
        {leads.length === 0 ? (
          <div className="py-8 text-center text-xs text-ink-muted">
            <Inbox className="mx-auto mb-2 h-8 w-8" aria-hidden="true" />
            <span>{isAr ? 'لا توجد طلبات جديدة' : 'No new leads'}</span>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {leads.slice(0, 3).map((lead) => (
              <li
                key={lead.id}
                className="rounded-2xl border border-neutral bg-neutral/30 p-3.5 text-xs transition-colors hover:border-primary"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate font-bold text-ink">{lead.salonName}</div>
                    <div className="mt-0.5 truncate text-[11px] text-ink-muted">
                      {lead.ownerName} • {lead.city}
                    </div>
                    <div dir="ltr" className="mt-1 text-start font-mono text-[11px] font-bold text-ink">
                      {lead.phone}
                    </div>
                  </div>
                  <Badge variant={lead.status === 'new' ? 'primary' : 'neutral'} size="sm">
                    {lead.status === 'new'
                      ? isAr ? 'جديد' : 'New'
                      : isAr ? 'قيد التواصل' : 'In touch'}
                  </Badge>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-neutral pt-2">
                  <span className="truncate text-[10px] text-ink-muted">{lead.source}</span>
                  <Link
                    href={`/${locale}/dashboard/tenants?action=new&name=${encodeURIComponent(
                      lead.salonName
                    )}&owner=${encodeURIComponent(lead.ownerName)}&phone=${encodeURIComponent(
                      lead.phone
                    )}&city=${encodeURIComponent(lead.city)}`}
                    className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-ink underline decoration-primary decoration-2 underline-offset-4"
                  >
                    <span>{isAr ? 'تحويل لمنشأة' : 'Convert'}</span>
                    <ChevronRight className="h-3 w-3 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-neutral bg-neutral/20 p-3 sm:p-4">
        <Link href={`/${locale}/dashboard/leads`} className="block">
          <Button variant="ghost" size="sm" fullWidth className="text-xs font-bold text-ink">
            {isAr ? 'عرض كل الطلبات' : 'View all leads'}
          </Button>
        </Link>
      </div>
    </section>
  );
}

/* =========================================================================
   Overview Content (Async Server Component)
   ========================================================================= */
async function OverviewContent({ params }: PlatformOverviewPageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale || 'ar';
  const isAr = locale === 'ar';
  const admin = await requireAdmin(undefined, { locale });

  return (
    <div className="space-y-5 sm:space-y-6 lg:space-y-8">
      {/* ============================== Header ============================== */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold text-ink sm:text-2xl lg:text-3xl">
            {isAr ? `أهلاً ${admin?.name || 'بك'}` : `Welcome, ${admin?.name || 'Admin'}`}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {isAr ? 'نظرة سريعة على المنصة اليوم.' : 'A quick look at the platform today.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-3 md:flex md:shrink-0">
          <Link href={`/${locale}/dashboard/invoices`} className="block">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Receipt className="h-4 w-4" />}
              className="w-full font-bold md:w-auto text-ink"
            >
              {isAr ? 'إصدار فاتورة' : 'New invoice'}
            </Button>
          </Link>

          <Link href={`/${locale}/dashboard/tenants?action=new`} className="block">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="h-4 w-4 stroke-[2.5]" />}
              className="w-full font-bold md:w-auto"
            >
              {isAr ? 'إضافة صالون جديد' : 'Add salon'}
            </Button>
          </Link>

          <Link href={`/${locale}/dashboard/database`} className="block">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Database className="h-4 w-4" />}
              className="w-full font-bold md:w-auto"
            >
              {isAr ? 'قاعدة البيانات' : 'Database'}
            </Button>
          </Link>
        </div>
      </header>

      {/* ============================== (a) Platform Stats ============================== */}
      <SectionErrorBoundary>
        <Suspense fallback={<PlatformStatsSkeleton />}>
          <PlatformStatsSection isAr={isAr} />
        </Suspense>
      </SectionErrorBoundary>

      {/* ============================== (d) Invoice Stats Cards ============================== */}
      <SectionErrorBoundary>
        <Suspense fallback={<InvoiceStatsSkeleton />}>
          <InvoiceStatsSection locale={locale} isAr={isAr} />
        </Suspense>
      </SectionErrorBoundary>

      {/* ============================== (b) Tenants + (c) Leads ============================== */}
      <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionErrorBoundary>
            <Suspense fallback={<LatestTenantsSkeleton />}>
              <LatestTenantsSection locale={locale} isAr={isAr} />
            </Suspense>
          </SectionErrorBoundary>
        </div>

        <div>
          <SectionErrorBoundary>
            <Suspense fallback={<LatestLeadsSkeleton />}>
              <LatestLeadsSection locale={locale} isAr={isAr} />
            </Suspense>
          </SectionErrorBoundary>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   Light synchronous default export shell
   ========================================================================= */
interface PlatformOverviewPageProps {
  params: Promise<{ locale: string }>;
}

export default function PlatformOverviewPage({ params }: PlatformOverviewPageProps) {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <OverviewContent params={params} />
    </Suspense>
  );
}
