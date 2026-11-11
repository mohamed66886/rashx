'use client';

import React, { useState, useTransition, useOptimistic } from 'react';
import Link from 'next/link';
import {
  UserPlus,
  MessageSquare,
  Search,
  Loader2,
} from 'lucide-react';
import type { PlatformLead } from '@/lib/types/platform';
import { updateLeadStatus, fetchLeadsPageAction } from '@/server/actions/leads';
import { useToast } from '@/components/ui/Toast';

interface LeadsClientViewProps {
  initialLeads: PlatformLead[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
  locale: string;
}

type OptimisticAction = {
  type: 'UPDATE_STATUS';
  leadId: string;
  status: PlatformLead['status'];
};

export function LeadsClientView({
  initialLeads,
  initialNextCursor,
  initialHasMore,
  locale,
}: LeadsClientViewProps) {
  const toast = useToast();
  const [leadsList, setLeadsList] = useState<PlatformLead[]>(initialLeads);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();

  const [optimisticLeads, setOptimisticLeads] = useOptimistic(
    leadsList,
    (state: PlatformLead[], action: OptimisticAction) => {
      switch (action.type) {
        case 'UPDATE_STATUS':
          return state.map((l) =>
            l.id === action.leadId ? { ...l, status: action.status } : l
          );
        default:
          return state;
      }
    }
  );

  const handleStatusChange = (leadId: string, status: PlatformLead['status']) => {
    startTransition(async () => {
      setOptimisticLeads({ type: 'UPDATE_STATUS', leadId, status });
      try {
        const res = await updateLeadStatus({ leadId, status });
        if (res.success) {
          setLeadsList((prev) =>
            prev.map((l) => (l.id === leadId ? { ...l, status } : l))
          );
          toast.success('تم تحديث حالة طلب الانضمام بنجاح');
        } else {
          toast.error(res.error || 'تعذر تحديث حالة الطلب');
        }
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        toast.error(error.message || 'فشل الاتصال بالخادم');
      }
    });
  };

  const handleLoadMore = async () => {
    if (!nextCursor || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const page = await fetchLeadsPageAction({ cursor: nextCursor, limit: 25 });
      setLeadsList((prev) => [...prev, ...page.items]);
      setNextCursor(page.nextCursor || null);
      setHasMore(page.hasMore);
    } catch {
      toast.error('تعذر جلب المزيد من الطلبات');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const filtered = optimisticLeads.filter(
    (l) =>
      l.salonName.toLowerCase().includes(search.toLowerCase()) ||
      l.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#91B8C0]/20 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-[#91B8C0]" />
            </div>
            <h1 className="text-xl font-black text-[#0D1514]">
              طلبات الانضمام والعروض التجريبية (Leads)
            </h1>
          </div>
          <p className="text-xs text-[#5E6665]">
            الصالونات والمراكز التي أبدت اهتماماً بالنظام عبر موقع راش إكس الرسمي أو روبوت الواتساب.
          </p>
        </div>

        <div className="text-xs font-bold text-[#0D1514] bg-[#F8FAFB] px-3.5 py-2 rounded-2xl border border-[#E5E9E8]">
          إجمالي الطلبات المسجلة: <strong>{optimisticLeads.length}</strong>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-[#5E6665] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث بالصالون، المسؤول، الجوال، أو المدينة..."
          className="w-full pr-9 pl-4 py-2.5 rounded-2xl bg-white border border-[#E5E9E8] text-xs text-[#0D1514] focus:outline-none focus:border-[#91B8C0]"
        />
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-[#E5E9E8] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F8FAFB] text-[#5E6665] font-bold border-b border-[#E5E9E8]">
              <tr>
                <th className="py-3.5 px-4">الصالون المتقدم</th>
                <th className="py-3.5 px-4">المسؤول وبيانات الاتصال</th>
                <th className="py-3.5 px-4">المدينة والمصدر</th>
                <th className="py-3.5 px-4">تاريخ الطلب</th>
                <th className="py-3.5 px-4">مرحلة المتابعة</th>
                <th className="py-3.5 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9E8]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-ink-muted">
                    لا توجد طلبات مطابقة للبحث
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FDFEFE] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0D1514]">{lead.salonName}</div>
                      <div className="text-[10px] text-[#5E6665]">مجموعة leads في Firestore</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#0D1514]">{lead.ownerName}</div>
                      <div className="text-[10px] font-mono text-[#91B8C0]" dir="ltr">
                        {lead.phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#0D1514]">{lead.city}</div>
                      <div className="text-[10px] text-[#5E6665]">{lead.source}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6665] text-[11px]">
                      {lead.submittedAt ? new Date(lead.submittedAt).toLocaleDateString('ar-SA') : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        disabled={isPending}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as PlatformLead['status'])
                        }
                        className="px-2 py-1 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] text-[11px] font-bold text-[#0D1514] disabled:opacity-50"
                      >
                        <option value="new">جديد (New)</option>
                        <option value="contacted">تم التواصل (Contacted)</option>
                        <option value="demo_scheduled">موعد عرض محدد (Demo Scheduled)</option>
                        <option value="converted">تم التحويل لمنشأة (Converted)</option>
                        <option value="lost">غير مهتم (Lost)</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          title="محادثة واتساب سريعة"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          href={`/${locale}/dashboard/tenants?action=new&name=${encodeURIComponent(
                            lead.salonName
                          )}&owner=${encodeURIComponent(lead.ownerName)}&phone=${encodeURIComponent(
                            lead.phone
                          )}&city=${encodeURIComponent(lead.city)}`}
                          className="px-2.5 py-1 rounded-xl bg-[#0D1514] hover:bg-[#1A2524] text-white text-[10px] font-bold transition-colors"
                        >
                          توليد منشأة فورا
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Cursor Pagination Load More */}
        {hasMore && (
          <div className="p-4 border-t border-[#E5E9E8] bg-[#F8FAFB] flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-5 py-2 rounded-2xl bg-white border border-[#E5E9E8] text-xs font-bold text-[#0D1514] hover:bg-neutral-50 flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري تحميل المزيد...</span>
                </>
              ) : (
                <span>تحميل المزيد من الطلبات</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

