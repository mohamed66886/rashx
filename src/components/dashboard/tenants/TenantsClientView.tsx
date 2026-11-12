'use client';

import React, { useState, useTransition, useOptimistic, useEffect, useId } from 'react';
import {
  Building2,
  Plus,
  ExternalLink,
  Search,
  Trash2,
  X,
  Loader2,
  PauseCircle,
  PlayCircle,
} from 'lucide-react';
import type { SalonTenant } from '@/lib/types/platform';
import {
  createTenant,
  updateTenantStatus,
  deleteTenant,
  fetchTenantsPageAction,
} from '@/server/actions/tenants';
import { useToast } from '@/components/ui/Toast';

/**
 * Tenants management — simplified.
 * Brand tokens only. Desktop: table. Mobile: one card per salon.
 * The add-salon form is a proper dialog (labels, Esc to close, scroll-safe).
 * All data logic (optimistic updates, server actions, cursor paging) is unchanged.
 */

interface TenantsClientViewProps {
  initialTenants: SalonTenant[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
}

type OptimisticAction =
  | { type: 'ADD'; tenant: SalonTenant }
  | { type: 'UPDATE_STATUS'; tenantId: string; status: SalonTenant['status'] }
  | { type: 'DELETE'; tenantId: string };

const INITIAL_FORM = {
  businessName: '',
  subdomain: '',
  ownerName: '',
  phone: '',
  email: '',
  city: 'الرياض',
  plan: 'Growth' as SalonTenant['plan'],
  mrr: 1499,
  branchesCount: 1,
  status: 'active' as SalonTenant['status'],
  zatcaPhase: 'Phase 2 Onboarded' as SalonTenant['zatcaPhase'],
};

const PLAN_PRICES: Record<SalonTenant['plan'], number> = {
  Starter: 799,
  Growth: 1499,
  Enterprise: 2999,
};

const CITIES = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'الخبر'];

const FIELD =
  'h-11 w-full rounded-xl border border-mist-gray bg-neutral/40 px-3 text-sm text-ink transition-colors placeholder:text-ink-muted/60 focus:border-dusty-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-dusty-blue/25';

function StatusBadge({ status }: { status: SalonTenant['status'] }) {
  if (status === 'active')
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-dusty-blue/30 px-2.5 py-0.5 text-[11px] font-bold text-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />
        نشط
      </span>
    );
  if (status === 'trial')
    return (
      <span className="inline-flex rounded-full bg-warm-peach/40 px-2.5 py-0.5 text-[11px] font-bold text-ink">
        تجريبي 14 يوم
      </span>
    );
  return (
    <span className="inline-flex rounded-full bg-mist-gray px-2.5 py-0.5 text-[11px] font-bold text-ink-muted">
      معطّل
    </span>
  );
}

export function TenantsClientView({
  initialTenants,
  initialNextCursor,
  initialHasMore,
}: TenantsClientViewProps) {
  const toast = useToast();
  const uid = useId();
  const [tenantsList, setTenantsList] = useState<SalonTenant[]>(initialTenants);
  const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [optimisticTenants, setOptimisticTenants] = useOptimistic(
    tenantsList,
    (state: SalonTenant[], action: OptimisticAction) => {
      switch (action.type) {
        case 'ADD':
          return [action.tenant, ...state];
        case 'UPDATE_STATUS':
          return state.map((t) =>
            t.id === action.tenantId ? { ...t, status: action.status } : t
          );
        case 'DELETE':
          return state.filter((t) => t.id !== action.tenantId);
        default:
          return state;
      }
    }
  );

  const [formData, setFormData] = useState(INITIAL_FORM);

  // Close the dialog with Esc
  useEffect(() => {
    if (!showAddModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAddModal(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showAddModal]);

  const handleSubdomainAutoFill = (name: string) => {
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/--+/g, '-');
    setFormData((prev) => ({
      ...prev,
      businessName: name,
      subdomain: prev.subdomain ? prev.subdomain : slug || 'salon',
    }));
  };

  const handlePlanChange = (plan: SalonTenant['plan']) => {
    setFormData((prev) => ({ ...prev, plan, mrr: PLAN_PRICES[plan] }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.subdomain || !formData.ownerName || !formData.phone) {
      toast.warning('يرجى تعبئة الحقول الأساسية المطلوبة');
      return;
    }

    const payload = {
      ...formData,
      email: formData.email.trim() || `${formData.subdomain}@rashx.org`,
    };

    const tempId = `temp_${Date.now()}`;
    const optimisticNewTenant: SalonTenant = {
      id: tempId,
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setShowAddModal(false);

    startTransition(async () => {
      setOptimisticTenants({ type: 'ADD', tenant: optimisticNewTenant });
      try {
        const res = await createTenant(payload);
        if (res.success && res.data) {
          const finalTenant = { ...optimisticNewTenant, id: res.data.id };
          setTenantsList((prev) => [finalTenant, ...prev.filter((t) => t.id !== tempId)]);
          toast.success('تم توليد النطاق وتفعيل الصالون بنجاح');
          setFormData(INITIAL_FORM);
        } else {
          toast.error(res.error || 'تعذر إنشاء المنشأة في قاعدة البيانات');
        }
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        toast.error(error.message || 'فشل الاتصال بالخادم المركزي');
      }
    });
  };

  const handleStatusChange = (tenantId: string, status: SalonTenant['status']) => {
    startTransition(async () => {
      setOptimisticTenants({ type: 'UPDATE_STATUS', tenantId, status });
      try {
        const res = await updateTenantStatus({ tenantId, status });
        if (res.success) {
          setTenantsList((prev) => prev.map((t) => (t.id === tenantId ? { ...t, status } : t)));
          toast.success('تم تحديث حالة الصالون');
        } else {
          toast.error(res.error || 'تعذر تحديث الحالة');
        }
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        toast.error(error.message || 'فشل الاتصال بالخادم');
      }
    });
  };

  const handleDelete = (tenantId: string) => {
    if (!confirm('هل أنت متأكد من حذف أو تعطيل هذه المنشأة ونطاقها الفرعي؟')) return;

    startTransition(async () => {
      setOptimisticTenants({ type: 'DELETE', tenantId });
      try {
        const res = await deleteTenant({ tenantId });
        if (res.success) {
          setTenantsList((prev) => prev.filter((t) => t.id !== tenantId));
          toast.success('تم حذف الصالون بنجاح');
        } else {
          toast.error(res.error || 'تعذر حذف الصالون');
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
      const page = await fetchTenantsPageAction({ cursor: nextCursor, limit: 25 });
      setTenantsList((prev) => [...prev, ...page.items]);
      setNextCursor(page.nextCursor || null);
      setHasMore(page.hasMore);
    } catch {
      toast.error('تعذر جلب المزيد من الصالونات');
    } finally {
      setIsLoadingMore(false);
    }
  };

  const q = searchQuery.toLowerCase();
  const filtered = optimisticTenants.filter(
    (t) =>
      t.businessName.toLowerCase().includes(q) ||
      t.subdomain.toLowerCase().includes(q) ||
      t.ownerName.toLowerCase().includes(q) ||
      t.city.toLowerCase().includes(q)
  );

  const subdomainLink = (t: SalonTenant) => (
    <a
      href={`https://${t.subdomain}.rashx.org`}
      target="_blank"
      rel="noreferrer"
      dir="ltr"
      className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-ink underline decoration-dusty-blue decoration-2 underline-offset-4 transition-colors hover:decoration-warm-peach"
    >
      <span>{t.subdomain}.rashx.org</span>
      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
    </a>
  );

  const actions = (t: SalonTenant) => (
    <div className="flex items-center gap-1.5">
      {t.status === 'active' ? (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleStatusChange(t.id, 'suspended')}
          className="inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-[11px] font-bold text-ink transition-colors hover:bg-warm-peach/40 disabled:opacity-50"
        >
          <PauseCircle className="h-3.5 w-3.5" aria-hidden="true" />
          إيقاف
        </button>
      ) : (
        <button
          type="button"
          disabled={isPending}
          onClick={() => handleStatusChange(t.id, 'active')}
          className="inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-[11px] font-bold text-ink transition-colors hover:bg-dusty-blue/30 disabled:opacity-50"
        >
          <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
          تفعيل
        </button>
      )}
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleDelete(t.id)}
        aria-label={`حذف ${t.businessName}`}
        className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-warm-peach/40 hover:text-ink disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <div dir="rtl" className="space-y-5 sm:space-y-6">
      {/* ============================== Header ============================== */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold text-ink sm:text-2xl">الصالونات والمنشآت</h1>
          <p className="mt-1 text-sm text-ink-muted">
            إضافة الصالونات وتوليد نطاقاتها الفرعية، ومتابعة الاشتراكات والحالة.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-2xl bg-warm-peach px-5 text-sm font-bold text-ink transition-colors hover:bg-warm-peach/80"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          <span>إضافة صالون</span>
        </button>
      </header>

      {/* ============================== Search ============================== */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search
            className="pointer-events-none absolute inset-y-0 start-3.5 my-auto h-4 w-4 text-ink-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو النطاق أو المالك أو المدينة"
            aria-label="بحث في الصالونات"
            className={`${FIELD} ps-10`}
          />
        </div>

        <div className="shrink-0 text-xs font-bold text-ink-muted">
          <strong className="text-ink">{filtered.length}</strong> منشأة
        </div>
      </div>

      {/* ============================== List ============================== */}
      <section className="overflow-hidden rounded-2xl border border-neutral bg-base sm:rounded-3xl">
        {filtered.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-dusty-blue/30 text-ink">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-bold text-ink">لا توجد صالونات مطابقة للبحث</p>
          </div>
        ) : (
          <>
            {/* Mobile: cards */}
            <ul className="divide-y divide-neutral md:hidden">
              {filtered.map((t) => (
                <li key={t.id} className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-ink">{t.businessName}</div>
                      <div className="truncate text-[11px] text-ink-muted">
                        {t.ownerName} • {t.city} • {t.branchesCount} فروع
                      </div>
                    </div>
                    <StatusBadge status={t.status} />
                  </div>

                  <div>{subdomainLink(t)}</div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-extrabold text-ink">{t.mrr} ر.س / شهرياً</span>
                    <span className="rounded-md bg-warm-peach/30 px-2 py-0.5 text-[10px] font-bold text-ink">
                      {t.plan}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-neutral pt-3">
                    <span className="text-[11px] text-ink-muted" dir="ltr">
                      {t.phone}
                    </span>
                    {actions(t)}
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop: table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-start text-xs">
                <thead className="bg-neutral/40 font-bold text-ink-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3.5 text-start">الصالون</th>
                    <th scope="col" className="px-4 py-3.5 text-start">النطاق الفرعي</th>
                    <th scope="col" className="px-4 py-3.5 text-start">المالك</th>
                    <th scope="col" className="hidden px-4 py-3.5 text-start lg:table-cell">المدينة</th>
                    <th scope="col" className="px-4 py-3.5 text-start">الباقة</th>
                    <th scope="col" className="hidden px-4 py-3.5 text-start xl:table-cell">ZATCA</th>
                    <th scope="col" className="px-4 py-3.5 text-start">الحالة</th>
                    <th scope="col" className="px-4 py-3.5 text-start">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral">
                  {filtered.map((t) => (
                    <tr key={t.id} className="transition-colors hover:bg-neutral/20">
                      <td className="px-4 py-3.5 font-bold text-ink">{t.businessName}</td>
                      <td className="px-4 py-3.5">{subdomainLink(t)}</td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-ink">{t.ownerName}</div>
                        <div className="text-[10px] text-ink-muted" dir="ltr">
                          {t.phone}
                        </div>
                      </td>
                      <td className="hidden px-4 py-3.5 lg:table-cell">
                        <div className="font-medium text-ink">{t.city}</div>
                        <div className="text-[10px] text-ink-muted">{t.branchesCount} فروع</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-extrabold text-ink">{t.mrr} ر.س</div>
                        <span className="mt-0.5 inline-block rounded-md bg-warm-peach/30 px-2 py-0.5 text-[10px] font-bold text-ink">
                          {t.plan}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3.5 text-[11px] text-ink-muted xl:table-cell">
                        {t.zatcaPhase}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={t.status} />
                      </td>
                      <td className="px-4 py-3.5">{actions(t)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {hasMore && (
          <div className="flex justify-center border-t border-neutral bg-neutral/20 p-4">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex h-10 items-center gap-2 rounded-2xl border border-mist-gray bg-white px-5 text-xs font-bold text-ink transition-colors hover:border-ink disabled:opacity-60"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  <span>جاري التحميل...</span>
                </>
              ) : (
                <span>تحميل المزيد</span>
              )}
            </button>
          </div>
        )}
      </section>

      {/* ============================ Add dialog ============================ */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 sm:items-center sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowAddModal(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 sm:rounded-3xl sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 id={`${uid}-title`} className="text-lg font-extrabold text-ink">
                إضافة صالون جديد
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                aria-label="إغلاق"
                className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-mist-gray hover:text-ink"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label htmlFor={`${uid}-name`} className="mb-1.5 block text-xs font-bold text-ink">
                  اسم الصالون أو المركز *
                </label>
                <input
                  id={`${uid}-name`}
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleSubdomainAutoFill(e.target.value)}
                  placeholder="مثال: صالون النخبة"
                  className={FIELD}
                />
              </div>

              <div>
                <label htmlFor={`${uid}-sub`} className="mb-1.5 block text-xs font-bold text-ink">
                  النطاق الفرعي *
                </label>
                <div
                  dir="ltr"
                  className="flex h-11 items-center overflow-hidden rounded-xl border border-mist-gray bg-neutral/40 transition-colors focus-within:border-dusty-blue focus-within:bg-white focus-within:ring-4 focus-within:ring-dusty-blue/25"
                >
                  <input
                    id={`${uid}-sub`}
                    type="text"
                    required
                    value={formData.subdomain}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                      })
                    }
                    placeholder="al-nukhba"
                    className="h-full min-w-0 flex-1 bg-transparent px-3 font-mono text-sm text-ink focus:outline-none"
                  />
                  <span className="select-none px-3 font-mono text-xs text-ink-muted">.rashx.org</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-owner`} className="mb-1.5 block text-xs font-bold text-ink">
                    اسم المالك / المدير *
                  </label>
                  <input
                    id={`${uid}-owner`}
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-xs font-bold text-ink">
                    رقم الجوال *
                  </label>
                  <input
                    id={`${uid}-phone`}
                    type="tel"
                    required
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                    dir="ltr"
                    className={`${FIELD} text-start`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`${uid}-city`} className="mb-1.5 block text-xs font-bold text-ink">
                    المدينة
                  </label>
                  <select
                    id={`${uid}-city`}
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={FIELD}
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`${uid}-branches`} className="mb-1.5 block text-xs font-bold text-ink">
                    عدد الفروع
                  </label>
                  <input
                    id={`${uid}-branches`}
                    type="number"
                    min="1"
                    max="50"
                    value={formData.branchesCount}
                    onChange={(e) =>
                      setFormData({ ...formData, branchesCount: parseInt(e.target.value, 10) || 1 })
                    }
                    className={FIELD}
                  />
                </div>
              </div>

              <fieldset>
                <legend className="mb-1.5 text-xs font-bold text-ink">باقة الاشتراك</legend>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(PLAN_PRICES) as SalonTenant['plan'][]).map((p) => {
                    const selected = formData.plan === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => handlePlanChange(p)}
                        className={`rounded-xl border p-2.5 text-center transition-colors ${
                          selected
                            ? 'border-ink bg-dusty-blue/30 text-ink'
                            : 'border-mist-gray bg-white text-ink hover:border-ink/50'
                        }`}
                      >
                        <div className="text-xs font-bold">{p}</div>
                        <div className="text-[10px] text-ink-muted">
                          {PLAN_PRICES[p].toLocaleString('en-US')} ر.س
                        </div>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="flex items-center gap-3 border-t border-neutral pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="h-12 flex-1 rounded-2xl bg-warm-peach text-sm font-bold text-ink transition-colors hover:bg-warm-peach/80 disabled:opacity-60"
                >
                  {isPending ? 'جاري الحفظ...' : 'إضافة وتفعيل الصالون'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="h-12 rounded-2xl bg-mist-gray/60 px-5 text-sm font-bold text-ink transition-colors hover:bg-mist-gray"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}