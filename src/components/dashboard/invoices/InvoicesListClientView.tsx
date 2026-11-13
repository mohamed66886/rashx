'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDashboardHref } from '@/lib/dashboard-links';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Send,
  PenTool,
  UploadCloud,
  FileCheck2,
  XCircle,
  TrendingUp,
  Receipt,
  Loader2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Button, SarIcon } from '@/components/ui';
import type { PlatformInvoiceSummary, InvoiceStats, InvoiceStatus } from '@/lib/types/billing';
import { formatHalalasAsSar } from '@/lib/types/billing';
import { getInvoicesPageAction } from '@/server/actions/invoices';

const STATUS_TABS: { label: string; value: string; icon: React.ElementType }[] = [
  { label: 'الكل', value: 'all', icon: FileText },
  { label: 'مسودة', value: 'draft', icon: Clock },
  { label: 'مصدرة', value: 'issued', icon: Receipt },
  { label: 'مرسلة', value: 'sent', icon: Send },
  { label: 'بانتظار التوقيع', value: 'viewed', icon: PenTool },
  { label: 'مرفوع', value: 'uploaded', icon: UploadCloud },
  { label: 'موقع', value: 'signed', icon: FileCheck2 },
  { label: 'مدفوع', value: 'paid', icon: CheckCircle2 },
  { label: 'ملغي', value: 'cancelled', icon: XCircle },
];

/* ──────────────── Top Hero / Actions ──────────────── */
export function InvoicesHero() {
  const dHref = useDashboardHref();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#29545c] via-[#1f3f45] to-[#152a2e] text-white p-6 sm:p-8 shadow-sm">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur-xs text-[#91B8C0]">
            <Receipt className="w-3.5 h-3.5" />
            <span>منظومة العقود والفوترة السحابية التجارية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            الفواتير والعقود
          </h1>
          <p className="text-xs sm:text-sm text-neutral-200/80 max-w-xl leading-relaxed">
            إدارة دورة التعاقد والفوترة التجارية للصالونات المشتركة، إصدار عروض الأسعار،
            وتتبع حالات التوقيع والسداد.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href={dHref('/invoices/new')}>
            <Button
              variant="primary"
              className="gap-2 bg-[#F0C5AE] hover:bg-[#e4b59c] text-black font-bold shadow-md text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء عقد أو فاتورة جديدة</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── KPI Statistics Cards ──────────────── */
export function InvoicesStatsCards({
  stats,
  currentStatus = 'all',
}: {
  stats: InvoiceStats;
  currentStatus?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status && status !== 'all') {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {/* Total & Outstanding Value */}
      <div
        onClick={() => handleFilterChange('all')}
        className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs hover:border-[#91B8C0] transition-all cursor-pointer ${
          currentStatus === 'all' ? 'ring-2 ring-[#29545c] border-[#29545c]' : 'border-[#E5E9E8]'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-bold text-[#5E6665]">المستحقات غير المسددة</span>
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#29545c] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-black text-black font-mono">
            {formatHalalasAsSar(stats.outstandingAmount || stats.totalAmountHalalas)}
          </span>
          <SarIcon className="w-3.5 h-3.5 text-neutral-500" />
        </div>
        <div className="text-[10px] text-[#5E6665] mt-1 truncate">
          من إجمالي {formatHalalasAsSar(stats.totalAmountHalalas)} ر.س
        </div>
      </div>

      {/* Signed (موقعة) */}
      <div
        onClick={() => handleFilterChange('signed')}
        className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs hover:border-[#91B8C0] transition-all cursor-pointer ${
          currentStatus === 'signed' ? 'ring-2 ring-[#29545c] border-[#29545c]' : 'border-[#E5E9E8]'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-bold text-[#5E6665]">العقود الموقّعة</span>
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#29545c] flex items-center justify-center">
            <FileCheck2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-[#29545c] font-mono">
          {stats.signedCount ?? stats.counts?.signed ?? 0}
        </div>
        <div className="text-[10px] text-[#29545c]/80 mt-1 truncate">
          معتمدة وبانتظار السداد
        </div>
      </div>

      {/* Uploaded (مرفوعة للمراجعة) */}
      <div
        onClick={() => handleFilterChange('uploaded')}
        className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs hover:border-[#91B8C0] transition-all cursor-pointer ${
          currentStatus === 'uploaded' ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/20' : 'border-[#E5E9E8]'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-bold text-amber-900">مرفوعة للمراجعة</span>
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <UploadCloud className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-amber-700 font-mono">
          {stats.uploadedCount ?? stats.counts?.uploaded ?? 0}
        </div>
        <div className="text-[10px] text-amber-700/80 mt-1 truncate">
          تتطلب اعتماد الإدارة
        </div>
      </div>

      {/* Paid (مدفوعة) */}
      <div
        onClick={() => handleFilterChange('paid')}
        className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs hover:border-[#91B8C0] transition-all cursor-pointer ${
          currentStatus === 'paid' ? 'ring-2 ring-emerald-600 border-emerald-600' : 'border-[#E5E9E8]'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-bold text-[#5E6665]">المسددة والمدفوعة</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
          {stats.paidCount}
        </div>
        <div className="text-[10px] text-emerald-700/80 mt-1 truncate">
          عقود وفواتير تم تسويتها
        </div>
      </div>

      {/* Drafts (مسودات) */}
      <div
        onClick={() => handleFilterChange('draft')}
        className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-2xs hover:border-[#91B8C0] transition-all cursor-pointer ${
          currentStatus === 'draft' ? 'ring-2 ring-neutral-700 border-neutral-700' : 'border-[#E5E9E8]'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] sm:text-xs font-bold text-[#5E6665]">المسودات</span>
          <div className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-neutral-900 font-mono">
          {stats.draftCount}
        </div>
        <div className="text-[10px] text-[#5E6665] mt-1 truncate">
          مسودات جاهزة للإصدار
        </div>
      </div>
    </div>
  );
}

/* ──────────────── Invoices Table & Filter Section ──────────────── */
export function InvoicesTable({
  initialInvoices,
  initialNextCursor,
  initialHasMore,
  currentStatus = 'all',
  currentQuery = '',
}: {
  initialInvoices: PlatformInvoiceSummary[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
  currentStatus?: string;
  currentQuery?: string;
}) {
  const router = useRouter();
  const dHref = useDashboardHref();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [invoices, setInvoices] = useState<PlatformInvoiceSummary[]>(initialInvoices);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [searchVal, setSearchVal] = useState(currentQuery);

  const [isLoadingMore, startLoadingMore] = useTransition();

  const handleFilterChange = (status: string, query?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status && status !== 'all') {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    const q = query !== undefined ? query : searchVal;
    if (q && q.trim().length > 0) {
      params.set('q', q.trim());
    } else {
      params.delete('q');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLoadMore = () => {
    if (!nextCursor || isLoadingMore) return;

    startLoadingMore(async () => {
      try {
        const res = await getInvoicesPageAction({
          cursor: nextCursor,
          limit: 25,
          status: currentStatus !== 'all' ? (currentStatus as InvoiceStatus) : undefined,
          q: currentQuery,
        });

        if (res && res.items) {
          setInvoices((prev) => [...prev, ...res.items]);
          setNextCursor(res.nextCursor || null);
          setHasMore(res.hasMore);
        }
      } catch (err) {
        console.error('Failed to load more invoices:', err);
      }
    });
  };

  const renderStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700 border border-neutral-300">
            <Clock className="w-3 h-3 text-neutral-500" />
            <span>مسودة</span>
          </span>
        );
      case 'issued':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Receipt className="w-3 h-3 text-sky-600" />
            <span>مصدرة</span>
          </span>
        );
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Send className="w-3 h-3 text-blue-600" />
            <span>مرسلة</span>
          </span>
        );
      case 'viewed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <PenTool className="w-3 h-3 text-indigo-600" />
            <span>بانتظار التوقيع</span>
          </span>
        );
      case 'uploaded':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <UploadCloud className="w-3 h-3 text-amber-600" />
            <span>مرفوع</span>
          </span>
        );
      case 'signed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FileCheck2 className="w-3 h-3 text-emerald-600" />
            <span>موقع</span>
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-[#29545c] border border-[#91B8C0]">
            <CheckCircle2 className="w-3 h-3 text-[#29545c]" />
            <span>مدفوع</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>ملغي</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-600">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* ──────────────── Filter Bar & Status Tabs ──────────────── */}
      <div className="bg-white rounded-2xl border border-[#E5E9E8] p-4 shadow-2xs space-y-4">
        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleFilterChange(currentStatus, searchVal);
                }
              }}
              placeholder="البحث برقم العقد، اسم المنشأة، أو اسم العميل..."
              className="w-full pl-3 pr-10 py-2 text-xs rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none focus:ring-1 focus:ring-[#29545c]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handleFilterChange(currentStatus, searchVal)}
              className="text-xs gap-1.5 h-9"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>تطبيق البحث</span>
            </Button>
            {currentQuery && (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchVal('');
                  handleFilterChange(currentStatus, '');
                }}
                className="text-xs text-rose-600 h-9"
              >
                إلغاء البحث
              </Button>
            )}
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-neutral-100 pt-3">
          {STATUS_TABS.map((tab) => {
            const isActive = currentStatus === tab.value || (!currentStatus && tab.value === 'all');
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                onClick={() => handleFilterChange(tab.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#29545c] text-white shadow-2xs'
                    : 'bg-neutral-50 text-[#5E6665] hover:bg-neutral-100 hover:text-black'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#91B8C0]' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ──────────────── Invoices Table ──────────────── */}
      <div className="bg-white rounded-2xl border border-[#E5E9E8] shadow-2xs overflow-hidden">
        {invoices.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-black mb-1">لا توجد عقود أو فواتير مطابقة</h3>
            <p className="text-xs text-[#5E6665] max-w-sm mx-auto mb-4">
              لم نتمكن من العثور على أي سجلات فوترة بالحالة أو معايير البحث المحددة.
            </p>
            <Link href={dHref('/invoices/new')}>
              <Button variant="primary" className="text-xs gap-1.5 bg-[#29545c]">
                <Plus className="w-3.5 h-3.5" />
                <span>إنشاء عقد جديد الآن</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-[#E5E9E8] bg-[#FAFBFB] text-[#5E6665] font-bold">
                  <th className="py-3.5 px-4">رقم المستند</th>
                  <th className="py-3.5 px-4">النوع</th>
                  <th className="py-3.5 px-4">المنشأة والعميل</th>
                  <th className="py-3.5 px-4">الإجمالي المستحق</th>
                  <th className="py-3.5 px-4">الحالة</th>
                  <th className="py-3.5 px-4">تاريخ الإصدار</th>
                  <th className="py-3.5 px-4">الاستحقاق</th>
                  <th className="py-3.5 px-4 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9E8]">
                {invoices.map((inv) => {
                  const isQuote = inv.docKind === 'quote';
                  const docNum = inv.number || 'مسودة';
                  return (
                    <tr
                      key={inv.id}
                      onClick={() => router.push(dHref(`/invoices/${inv.id}`))}
                      className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Number */}
                      <td className="py-3.5 px-4 font-mono font-bold text-[#29545c]">
                        {docNum}
                      </td>

                      {/* Doc Kind */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            isQuote
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-teal-50 text-[#29545c] border border-teal-200'
                          }`}
                        >
                          {isQuote ? 'عرض سعر' : 'عقد وفاتورة'}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-black">{inv.customer.facilityName || '—'}</div>
                        <div className="text-[11px] text-[#5E6665]">{inv.customer.name || ''}</div>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-baseline gap-1 font-mono font-bold text-black text-sm">
                          <span>{formatHalalasAsSar(inv.totals.total)}</span>
                          <SarIcon className="w-3 h-3 text-neutral-500" />
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {renderStatusBadge(inv.status)}
                      </td>

                      {/* Issue Date */}
                      <td className="py-3.5 px-4 text-[#5E6665] font-mono text-[11px]">
                        {inv.issueDate ? inv.issueDate.split('T')[0] : '—'}
                      </td>

                      {/* Due Date */}
                      <td className="py-3.5 px-4 text-[#5E6665] font-mono text-[11px]">
                        {inv.dueDate ? inv.dueDate.split('T')[0] : '—'}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center text-xs font-bold text-[#29545c] group-hover:underline">
                          عرض
                          <ArrowRight className="w-3.5 h-3.5 ms-1 rotate-180" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="p-4 border-t border-[#E5E9E8] text-center bg-[#FAFBFB]">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="text-xs font-bold gap-2"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>جارٍ تحميل المزيد...</span>
                </>
              ) : (
                <span>تحميل المزيد من الفواتير</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────── Combined View for backward compatibility ──────────────── */
export interface InvoicesListClientViewProps {
  stats: InvoiceStats;
  initialInvoices: PlatformInvoiceSummary[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
  currentStatus?: string;
  currentQuery?: string;
}

export function InvoicesListClientView(props: InvoicesListClientViewProps) {
  return (
    <div className="space-y-6 pb-12" dir="rtl">
      <InvoicesHero />
      <InvoicesStatsCards stats={props.stats} currentStatus={props.currentStatus} />
      <InvoicesTable
        initialInvoices={props.initialInvoices}
        initialNextCursor={props.initialNextCursor}
        initialHasMore={props.initialHasMore}
        currentStatus={props.currentStatus}
        currentQuery={props.currentQuery}
      />
    </div>
  );
}
