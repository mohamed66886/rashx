import React from 'react';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  Globe,
  UserPlus,
  ShieldCheck,
  Sparkles,
  Plus,
  ExternalLink,
  Database,
  ChevronRight,
  ArrowLeft,
  Inbox,
} from 'lucide-react';
import { getTenantsPage } from '@/server/data/tenants';
import { getLeadsPage } from '@/server/data/leads';
import { getPlatformStats } from '@/server/data/stats';
import { getAdmin } from '@/server/auth/session';
import type { SalonTenant, PlatformLead } from '@/lib/types/platform';
import {
  Button,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui';
import { OverviewRefreshButton } from '@/components/dashboard/overview/OverviewRefreshButton';

export const instant = false;

const delay = (ms: number): React.CSSProperties => ({ animationDelay: `${ms}ms` });

interface MetricProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string | number;
  hint?: string;
  badge?: React.ReactNode;
  delayMs: number;
}

function Metric({ icon, iconBg, title, value, hint, badge, delayMs }: MetricProps) {
  return (
    <div
      style={delay(delayMs)}
      className="animate-rx-fade-up flex flex-col gap-2 p-3.5 sm:p-4 lg:p-5 rounded-2xl border border-neutral bg-base transition-[border-color,box-shadow] duration-200 ease-smooth hover:border-primary/60 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={`grid place-items-center w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded-xl text-ink ${iconBg}`}
        >
          {icon}
        </div>
        {badge}
      </div>

      <div className="min-w-0">
        <div className="text-[11px] lg:text-xs font-bold text-ink-muted leading-snug line-clamp-2">
          {title}
        </div>
        <div className="mt-0.5 text-lg sm:text-xl lg:text-2xl font-black text-ink tracking-tight truncate">
          {value}
        </div>
        {hint && (
          <div className="mt-0.5 text-[10px] lg:text-[11px] text-ink-muted truncate">{hint}</div>
        )}
      </div>
    </div>
  );
}

interface PlatformOverviewPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PlatformOverviewPage({ params }: PlatformOverviewPageProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale || 'ar';
  const isAr = locale === 'ar';

  const [admin, stats, tenantsData, leadsData] = await Promise.all([
    getAdmin(),
    getPlatformStats(),
    getTenantsPage({ limit: 5 }).catch(() => ({ items: [] as SalonTenant[], hasMore: false })),
    getLeadsPage({ limit: 5 }).catch(() => ({ items: [] as PlatformLead[], hasMore: false })),
  ]);

  const tenants = tenantsData.items;
  const leads = leadsData.items;

  const totalMRR = stats.mrrTotal;
  const activeTenantsCount = stats.tenantsActive;
  const totalTenantsCount = stats.tenantsTotal;
  const totalLeadsCount = stats.leadsTotal;

  const subdomainLink = (t: SalonTenant) => (
    <a
      href={`https://${t.subdomain}.rashx.org`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-ink underline decoration-primary decoration-2 underline-offset-4 hover:decoration-warm-peach transition-colors"
      dir="ltr"
    >
      <span>{t.subdomain}.rashx.org</span>
      <ExternalLink className="w-3 h-3 shrink-0" />
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
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* ================================================================ */}
      {/* 1. WELCOME BANNER                                                 */}
      {/* ================================================================ */}
      <section
        style={delay(0)}
        className="animate-rx-fade-up relative overflow-hidden rounded-2xl sm:rounded-3xl bg-primary text-ink p-5 sm:p-6 lg:p-8"
      >
        <span
          aria-hidden="true"
          className="absolute -top-16 -end-16 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-warm-peach"
        />
        <span
          aria-hidden="true"
          className="absolute top-3 end-12 sm:top-4 sm:end-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-base"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 lg:gap-8">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-3 rounded-full bg-base text-ink text-[10px] sm:text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {isAr
                  ? 'لوحة القيادة المركزية • admin.rashx.org'
                  : 'RashX Central HQ • admin.rashx.org'}
              </span>
            </span>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-ink">
              {isAr
                ? `أهلاً بك، ${admin?.name || 'المشرف'} 👋`
                : `Welcome, ${admin?.name || 'Admin'} 👋`}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-ink/80">
              {admin?.title || (isAr ? 'المشرف العام' : 'Super Admin')} •{' '}
              {isAr
                ? 'التحكم المركزي في الصالونات والنطاقات وقاعدة البيانات'
                : 'Centralized control of tenants, subdomains & database'}
            </p>
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            <Link href={`/${locale}/dashboard/tenants?action=new`} className="block">
              <Button
                variant="outline"
                size="md"
                leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
                className="w-full sm:w-auto bg-ink text-base border-ink hover:bg-ink/85 font-black text-xs"
              >
                {isAr ? 'توليد صالون ونطاق جديد' : 'Provision New Salon'}
              </Button>
            </Link>

            <Link href={`/${locale}/dashboard/database`} className="block">
              <Button
                variant="outline"
                size="md"
                leftIcon={<Database className="w-4 h-4" />}
                className="w-full sm:w-auto bg-base text-ink border-base hover:bg-warm-peach hover:border-warm-peach font-bold text-xs"
              >
                {isAr ? 'فحص قاعدة بيانات فايربيز' : 'Inspect Firestore DB'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. METRICS                                                        */}
      {/* ================================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Metric
          delayMs={60}
          icon={<Building2 className="w-[18px] h-[18px]" />}
          iconBg="bg-primary"
          title={isAr ? 'المنشآت المسجلة' : 'Registered Salons'}
          value={totalTenantsCount}
          hint={
            isAr ? `${activeTenantsCount} نشط في الخدمة` : `${activeTenantsCount} active tenants`
          }
        />
        <Metric
          delayMs={110}
          icon={<TrendingUp className="w-[18px] h-[18px]" />}
          iconBg="bg-warm-peach"
          title={isAr ? 'الإيراد الشهري (MRR)' : 'Monthly Revenue (MRR)'}
          value={`${totalMRR.toLocaleString(isAr ? 'ar-SA' : 'en-US')} ${isAr ? 'ر.س' : 'SAR'}`}
          hint={isAr ? 'اشتراكات الصالونات النشطة' : 'Active salon subscriptions'}
        />
        <Metric
          delayMs={160}
          icon={<Globe className="w-[18px] h-[18px]" />}
          iconBg="bg-neutral"
          title={isAr ? 'النطاقات الفرعية' : 'Custom Subdomains'}
          value={totalTenantsCount}
          hint="*.rashx.org"
        />
        <Metric
          delayMs={210}
          icon={<ShieldCheck className="w-[18px] h-[18px]" />}
          iconBg="bg-emerald-100"
          title={isAr ? 'الفوترة المركزية (ZATCA)' : 'Central Invoicing (ZATCA)'}
          value="Phase 2"
          hint={isAr ? 'ربط وتشفير إلكتروني مركزي' : 'Central encrypted integration'}
          badge={
            <Badge variant="success" size="sm" dot>
              {isAr ? 'معتمد' : 'Certified'}
            </Badge>
          }
        />
      </div>

      {/* ================================================================ */}
      {/* 3. LEADS / TENANTS / DB                                           */}
      {/* ================================================================ */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:grid-rows-[auto_1fr] lg:gap-6">
        {/* Inbound leads */}
        <section
          style={delay(240)}
          className="animate-rx-fade-up rounded-2xl lg:rounded-3xl border border-neutral bg-base overflow-hidden lg:col-start-3 lg:row-start-1"
        >
          <div className="flex items-center justify-between gap-3 p-4 sm:p-5 lg:p-6 pb-3 sm:pb-3 lg:pb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-primary text-ink">
                <UserPlus className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-black text-ink truncate">
                {isAr ? 'طلبات الانضمام (Leads)' : 'Inbound Leads'}
              </h2>
            </div>
            <Badge variant="primary" size="sm">
              {totalLeadsCount} {isAr ? 'طلبات' : 'Leads'}
            </Badge>
          </div>

          <p className="hidden sm:block px-5 lg:px-6 pb-3 text-xs text-ink-muted leading-relaxed">
            {isAr
              ? 'طلبات أصحاب الصالونات الواردة من الموقع الرسمي أو روبوت الواتساب:'
              : 'Salon requests submitted via the landing page or WhatsApp bot:'}
          </p>

          <div className="px-4 sm:px-5 lg:px-6 pb-4">
            {leads.length === 0 ? (
              <div className="text-center py-8 text-xs text-ink-muted">
                <Inbox className="w-8 h-8 mx-auto mb-2 text-ink-muted" />
                <span>{isAr ? 'لا توجد طلبات واردة جديدة حالياً' : 'No new leads found'}</span>
              </div>
            ) : (
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-1 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-3 lg:grid-cols-1">
                {leads.slice(0, 3).map((lead, index) => (
                  <div
                    key={lead.id}
                    style={delay(280 + index * 50)}
                    className="animate-rx-fade-up min-w-[78%] snap-start sm:min-w-0 p-3.5 rounded-2xl bg-neutral/30 border border-neutral text-xs transition-colors duration-200 hover:border-primary"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold text-ink truncate">{lead.salonName}</div>
                        <div className="text-[11px] text-ink-muted mt-0.5 truncate">
                          {lead.ownerName} • {lead.city}
                        </div>
                        <div className="text-[11px] font-mono font-bold text-ink mt-1" dir="ltr">
                          {lead.phone}
                        </div>
                      </div>
                      <Badge variant={lead.status === 'new' ? 'primary' : 'neutral'} size="sm">
                        {lead.status === 'new'
                          ? isAr
                            ? 'جديد'
                            : 'New'
                          : isAr
                          ? 'قيد التواصل'
                          : 'In Touch'}
                      </Badge>
                    </div>

                    <div className="mt-3 pt-2 border-t border-neutral flex items-center justify-between gap-2">
                      <span className="text-[10px] text-ink-muted truncate">{lead.source}</span>
                      <Link
                        href={`/${locale}/dashboard/tenants?action=new&name=${encodeURIComponent(
                          lead.salonName
                        )}&owner=${encodeURIComponent(lead.ownerName)}&phone=${encodeURIComponent(
                          lead.phone
                        )}&city=${encodeURIComponent(lead.city)}`}
                        className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-ink underline decoration-primary decoration-2 underline-offset-4"
                      >
                        <span>{isAr ? 'تحويل لمنشأة' : 'Convert'}</span>
                        <ArrowLeft className="w-3 h-3 ltr:rotate-180" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 bg-neutral/20 border-t border-neutral">
            <Link href={`/${locale}/dashboard/leads`} className="block">
              <Button variant="ghost" size="sm" fullWidth className="text-xs font-bold text-ink">
                {isAr ? 'عرض سجل طلبات الانضمام الكامل' : 'View All Inbound Leads'}
              </Button>
            </Link>
          </div>
        </section>

        {/* Tenants */}
        <section
          style={delay(300)}
          className="animate-rx-fade-up rounded-2xl lg:rounded-3xl border border-neutral bg-base overflow-hidden lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1"
        >
          <div className="flex items-center justify-between gap-3 p-4 sm:p-5 lg:p-6">
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base lg:text-lg font-black text-ink leading-snug">
                {isAr ? 'الصالونات المسجلة' : 'Registered Tenants'} ({totalTenantsCount})
              </h2>
              <p className="hidden sm:block mt-1 text-xs text-ink-muted">
                {isAr ? 'البيانات الحية من مجموعة ' : 'Live data from collection '}
                <code className="bg-neutral/60 px-1 py-0.5 rounded text-ink font-mono">tenants</code>
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <OverviewRefreshButton isAr={isAr} />

              <Link href={`/${locale}/dashboard/tenants`}>
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon={<ChevronRight className="w-4 h-4 ltr:rotate-180" />}
                >
                  {isAr ? 'إدارة المنشآت' : 'Manage Tenants'}
                </Button>
              </Link>
            </div>
          </div>

          {tenants.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="grid place-items-center w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary text-ink">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-sm text-ink mb-1">
                {isAr
                  ? 'لا توجد صالونات مسجلة في قاعدة البيانات حالياً'
                  : 'No salons registered in database yet'}
              </h3>
              <p className="text-xs text-ink-muted max-w-sm mx-auto mb-4">
                {isAr
                  ? 'ابدأ بإضافة أول صالون مشترك في راش إكس لتوليد نطاقه الفرعي وتفعيله على الفور.'
                  : 'Get started by creating your first salon tenant to provision a custom subdomain.'}
              </p>
              <Link href={`/${locale}/dashboard/tenants?action=new`}>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus className="w-4 h-4 stroke-[2.5]" />}
                >
                  {isAr ? 'إضافة أول صالون الآن' : 'Add First Salon Now'}
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Mobile: card list */}
              <ul className="md:hidden divide-y divide-neutral border-t border-neutral">
                {tenants.map((t, index) => (
                  <li
                    key={t.id}
                    style={delay(340 + Math.min(index, 8) * 40)}
                    className="animate-rx-fade-up p-4 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-ink text-sm truncate">{t.businessName}</div>
                        <div className="text-[11px] text-ink-muted truncate">
                          {t.ownerName} • {t.city}
                        </div>
                      </div>
                      {statusBadge(t)}
                    </div>

                    <div>{subdomainLink(t)}</div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono font-bold text-ink text-xs">
                          {t.mrr} {isAr ? 'ر.س' : 'SAR'}
                        </span>
                        <Badge variant="secondary" size="sm">
                          {isAr ? `باقة ${t.plan}` : `${t.plan} Plan`}
                        </Badge>
                      </div>
                      <Link href={`/${locale}/dashboard/tenants`}>
                        <Button variant="outline" size="sm" className="text-[11px] px-3 h-8">
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
                      <TableHead>{isAr ? 'المنشأة والمالك' : 'Salon & Owner'}</TableHead>
                      <TableHead>{isAr ? 'النطاق الفرعي' : 'Subdomain'}</TableHead>
                      <TableHead className="hidden lg:table-cell">{isAr ? 'المدينة' : 'City'}</TableHead>
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
                          <div className="font-bold text-ink text-xs">{t.businessName}</div>
                          <div className="text-[10px] text-ink-muted">{t.ownerName}</div>
                        </TableCell>
                        <TableCell>{subdomainLink(t)}</TableCell>
                        <TableCell className="hidden lg:table-cell text-ink-muted text-xs">
                          {t.city}
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-ink text-xs font-mono">
                            {t.mrr} {isAr ? 'ر.س' : 'SAR'}
                          </div>
                          <Badge variant="secondary" size="sm" className="mt-0.5">
                            {isAr ? `باقة ${t.plan}` : `${t.plan} Plan`}
                          </Badge>
                        </TableCell>
                        <TableCell>{statusBadge(t)}</TableCell>
                        <TableCell align="center" className="hidden lg:table-cell">
                          <Link href={`/${locale}/dashboard/tenants`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[10px] px-2.5 py-1 h-7"
                            >
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

        {/* Database session */}
        <section
          style={delay(360)}
          className="animate-rx-fade-up rounded-2xl lg:rounded-3xl border border-neutral bg-base p-4 sm:p-5 lg:p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between lg:flex-col lg:items-stretch lg:col-start-3 lg:row-start-2"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-primary text-ink">
                <Database className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-black text-ink truncate">
                  {isAr ? 'قاعدة بيانات Firebase Firestore' : 'Firebase Firestore Live DB'}
                </span>
                <span className="w-2 h-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="font-mono text-sm font-bold text-ink break-all" dir="ltr">
              aya2-a5057.firebaseapp.com
            </div>
            <p className="mt-1.5 text-[11px] text-ink-muted leading-relaxed">
              {isAr ? 'المسؤول الحالي: ' : 'Current session: '}
              <strong className="text-ink">{admin?.name}</strong>
              {isAr ? ' • الجلسة موثقة في ' : ' • active session in '}
              <code className="bg-neutral/60 px-1 py-0.5 rounded text-ink font-mono">
                admin_sessions
              </code>
            </p>
          </div>

          <Link href={`/${locale}/dashboard/database`} className="block shrink-0">
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ArrowLeft className="w-3.5 h-3.5 ltr:rotate-180" />}
              className="w-full md:w-auto lg:w-full text-xs font-bold"
            >
              {isAr ? 'فتح مركز فحص قاعدة البيانات' : 'Open DB Health Console'}
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
