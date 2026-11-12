'use client';

import React, { useState, useTransition, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Save,
  Send,
  AlertCircle,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Building2,
  Calendar,
  ArrowRight,
  Eye,
  Percent,
  Search,
  Lock,
  Loader2,
  Receipt,
  FileCheck2,
} from 'lucide-react';
import { Button } from '@/components/ui';
import type {
  PlatformInvoice,
  ContractClause,
  InvoiceDocKind,
} from '@/lib/types/billing';
import { halalasToSar, sarToHalalas } from '@/lib/types/billing';
import type { BillingSettings } from '@/lib/types/platform';
import {
  saveDraftInvoice,
  issueInvoice,
  issueAndSendInvoiceAction,
  searchTenantsForInvoiceAction,
  type TenantAutocompleteItem,
} from '@/server/actions/invoices';

// Lazy-load the printable document preview
const InvoicePrintableDocument = dynamic(
  () =>
    import('./InvoicePrintableDocument').then(
      (mod) => mod.InvoicePrintableDocument
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[700px] bg-white rounded-2xl border border-[#E5E9E8] flex flex-col items-center justify-center p-8 animate-pulse text-center shadow-xs">
        <Loader2 className="w-8 h-8 animate-spin text-[#29545c] mb-3" />
        <p className="text-xs font-bold text-[#5E6665]">
          جارٍ تجهيز المعاينة الحية للمستند...
        </p>
      </div>
    ),
  }
);

interface EditorItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceSar: number;
}

interface InvoiceEditorClientViewProps {
  initialInvoice?: PlatformInvoice | null;
  billingSettings?: BillingSettings | null;
  clauses?: ContractClause[];
  isEdit?: boolean;
}

export function InvoiceEditorClientView({
  initialInvoice,
  billingSettings,
  clauses = [],
  isEdit = false,
}: InvoiceEditorClientViewProps) {
  const router = useRouter();

  // Document Kind
  const [docKind, setDocKind] = useState<InvoiceDocKind>(
    initialInvoice?.docKind || 'contract_invoice'
  );

  // Customer State
  const [facilityName, setFacilityName] = useState(
    initialInvoice?.customer?.facilityName || ''
  );
  const [commercialRegNumber, setCommercialRegNumber] = useState(
    initialInvoice?.customer?.commercialRegNumber || ''
  );
  const [customerName, setCustomerName] = useState(
    initialInvoice?.customer?.name || ''
  );
  const [address, setAddress] = useState(
    initialInvoice?.customer?.address || ''
  );
  const [email, setEmail] = useState(
    initialInvoice?.customer?.email || ''
  );
  const [phone, setPhone] = useState(
    initialInvoice?.customer?.phone || ''
  );

  // Autocomplete State
  const [tenantSuggestions, setTenantSuggestions] = useState<TenantAutocompleteItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingTenants, setIsSearchingTenants] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dates
  const todayStr = new Date().toISOString().split('T')[0];
  const nextMonthDate = new Date();
  nextMonthDate.setDate(nextMonthDate.getDate() + 30);
  const nextMonthStr = nextMonthDate.toISOString().split('T')[0];

  const [issueDate, setIssueDate] = useState(
    initialInvoice?.issueDate ? initialInvoice.issueDate.split('T')[0] : todayStr
  );
  const [dueDate, setDueDate] = useState(
    initialInvoice?.dueDate ? initialInvoice.dueDate.split('T')[0] : nextMonthStr
  );

  // Items State
  const [items, setItems] = useState<EditorItem[]>(
    initialInvoice?.items && initialInvoice.items.length > 0
      ? initialInvoice.items.map((it) => ({
          id: it.id,
          description: it.description,
          quantity: it.quantity,
          unitPriceSar: halalasToSar(it.unitPriceHalalas),
        }))
      : [
          {
            id: '1',
            description:
              'اشتراك منصة راش إكس السحابية (نظام الكاشير POS، إدارة الحجوزات، ملفات العملاء)',
            quantity: 1,
            unitPriceSar: 12000,
          },
        ]
  );

  // Financials: Discount & VAT
  const initialDiscountSar = initialInvoice?.totals?.discount
    ? halalasToSar(initialInvoice.totals.discount)
    : 0;
  const [discountSar, setDiscountSar] = useState<number>(initialDiscountSar);

  const initialVatRate = initialInvoice?.vatRatePercent !== undefined
    ? initialInvoice.vatRatePercent
    : 15;
  const [vatEnabled, setVatEnabled] = useState<boolean>(initialVatRate > 0);
  const [vatRatePercent, setVatRatePercent] = useState<number>(
    initialVatRate > 0 ? initialVatRate : 15
  );

  // Terms / Clauses Picker
  // Mandatory clauses are always selected; optional clauses can be selected.
  const [selectedClauseIds, setSelectedClauseIds] = useState<Set<string>>(() => {
    const set = new Set<string>();
    // Preload all mandatory clauses
    clauses.forEach((c) => {
      if (c.mandatory) set.add(c.id);
    });
    // If editing, preload existing terms or selectedClauseIds
    if (initialInvoice?.selectedClauseIds) {
      initialInvoice.selectedClauseIds.forEach((id) => set.add(id));
    } else if (initialInvoice?.terms) {
      initialInvoice.terms.forEach((t) => set.add(t.id));
    }
    return set;
  });

  // Notes
  const [notes, setNotes] = useState(
    initialInvoice?.notes ||
      'يشمل العقد تفعيل المنظومة السحابية وتدريب الفريق والدعم الفني طوال فترة الاشتراك.'
  );

  // Validation errors & Action Status
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Mobile / Desktop View Mode for side-by-side vs preview tab
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  // Handle Tenant Autocomplete Search
  const handleFacilityNameChange = (val: string) => {
    setFacilityName(val);
    if (fieldErrors.facilityName) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.facilityName;
        return next;
      });
    }

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (val.trim().length >= 2) {
      setIsSearchingTenants(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchTenantsForInvoiceAction(val);
          setTenantSuggestions(results);
          setShowSuggestions(results.length > 0);
        } catch (err) {
          console.error('Error fetching tenant autocomplete:', err);
        } finally {
          setIsSearchingTenants(false);
        }
      }, 300);
    } else {
      setTenantSuggestions([]);
      setShowSuggestions(false);
      setIsSearchingTenants(false);
    }
  };

  const handleSelectTenant = (tenant: TenantAutocompleteItem) => {
    setFacilityName(tenant.name);
    if (tenant.commercialRegNumber) setCommercialRegNumber(tenant.commercialRegNumber);
    if (tenant.ownerName) setCustomerName(tenant.ownerName);
    if (tenant.address) setAddress(tenant.address);
    if (tenant.ownerEmail) setEmail(tenant.ownerEmail);
    if (tenant.ownerPhone) setPhone(tenant.ownerPhone);
    setShowSuggestions(false);
  };

  // Item management
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        description: '',
        quantity: 1,
        unitPriceSar: 0,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleUpdateItem = (
    id: string,
    field: 'description' | 'quantity' | 'unitPriceSar',
    val: string | number
  ) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  // Live Totals Computation (Round-half-up on Halalas)
  const subtotalHalalas = items.reduce(
    (sum, it) => sum + Math.round(Number(it.quantity || 1) * sarToHalalas(Number(it.unitPriceSar || 0))),
    0
  );
  const discountHalalas = Math.min(subtotalHalalas, Math.max(0, sarToHalalas(discountSar || 0)));
  const taxableHalalas = Math.max(0, subtotalHalalas - discountHalalas);
  const effectiveVatPercent = vatEnabled ? vatRatePercent : 0;
  const vatHalalas = effectiveVatPercent > 0
    ? Math.floor(((taxableHalalas * effectiveVatPercent) / 100) + 0.5)
    : 0;
  const totalHalalas = taxableHalalas + vatHalalas;

  // Selected Terms (Mandatory are always included)
  const activeSelectedClauses: ContractClause[] = clauses.filter(
    (c) => c.mandatory || selectedClauseIds.has(c.id)
  );

  // Validate form before submit
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!facilityName.trim()) errors.facilityName = 'اسم المنشأة مطلوب';
    if (!customerName.trim()) errors.customerName = 'اسم العميل / المفوض مطلوب';
    if (!address.trim()) errors.address = 'العنوان مطلوب';
    if (!issueDate.trim()) errors.issueDate = 'تاريخ الإصدار مطلوب';

    if (items.length === 0) {
      errors.items = 'يجب إضافة بند واحد على الأقل';
    } else {
      items.forEach((it, idx) => {
        if (!it.description.trim()) {
          errors[`item_${idx}_description`] = 'وصف البند مطلوب';
        }
        if (it.quantity <= 0) {
          errors[`item_${idx}_quantity`] = 'الكمية يجب أن تكون أكبر من صفر';
        }
      });
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Action: Save Draft
  const handleSaveDraft = () => {
    if (!validateForm()) return;
    setFormError(null);

    startTransition(async () => {
      try {
        const payload = {
          id: initialInvoice?.id,
          docKind,
          locale: 'ar' as const,
          customer: {
            facilityName: facilityName.trim(),
            commercialRegNumber: commercialRegNumber.trim() || undefined,
            name: customerName.trim(),
            address: address.trim(),
            email: email.trim() || undefined,
            phone: phone.trim() || undefined,
          },
          items: items.map((it) => ({
            id: it.id,
            description: it.description.trim(),
            quantity: Number(it.quantity) || 1,
            unitPriceHalalas: sarToHalalas(Number(it.unitPriceSar) || 0),
          })),
          discountHalalas,
          vatRatePercent: effectiveVatPercent,
          issueDate,
          dueDate: dueDate || undefined,
          selectedClauseIds: Array.from(selectedClauseIds),
          notes: notes.trim() || undefined,
        };

        const res = await saveDraftInvoice(payload);
        if (res.success && res.data) {
          router.push(`/dashboard/invoices/${res.data.id}`);
        } else {
          setFormError(res.error || 'فشل في حفظ المسودة.');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء حفظ المسودة.';
        setFormError(msg);
      }
    });
  };

  // Action: Issue
  const handleIssue = (sendEmail: boolean = false) => {
    if (!validateForm()) return;
    setFormError(null);

    startTransition(async () => {
      try {
        const payload = {
          id: initialInvoice?.id,
          docKind,
          locale: 'ar' as const,
          customer: {
            facilityName: facilityName.trim(),
            commercialRegNumber: commercialRegNumber.trim() || undefined,
            name: customerName.trim(),
            address: address.trim(),
            email: email.trim() || undefined,
            phone: phone.trim() || undefined,
          },
          items: items.map((it) => ({
            id: it.id,
            description: it.description.trim(),
            quantity: Number(it.quantity) || 1,
            unitPriceHalalas: sarToHalalas(Number(it.unitPriceSar) || 0),
          })),
          discountHalalas,
          vatRatePercent: effectiveVatPercent,
          issueDate,
          dueDate: dueDate || undefined,
          selectedClauseIds: Array.from(selectedClauseIds),
          notes: notes.trim() || undefined,
        };

        const draftRes = await saveDraftInvoice(payload);
        if (!draftRes.success || !draftRes.data) {
          setFormError(draftRes.error || 'فشل في حفظ بيانات المستند.');
          return;
        }

        const invoiceId = draftRes.data.id;

        const res = sendEmail
          ? await issueAndSendInvoiceAction({
              invoiceId,
              recipientEmail: email.trim() || undefined,
            })
          : await issueInvoice({ invoiceId, selectedClauseIds: Array.from(selectedClauseIds) });

        if (res.success && res.data) {
          router.push(`/dashboard/invoices/${invoiceId}`);
        } else {
          setFormError(res.error || 'فشل في إصدار المستند.');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء إصدار المستند.';
        setFormError(msg);
      }
    });
  };

  // Construct virtual invoice object for the live preview
  const previewInvoiceData: PlatformInvoice = {
    id: initialInvoice?.id || 'preview-id',
    number: initialInvoice?.number || null,
    docKind,
    currency: 'SAR',
    customer: {
      facilityName: facilityName || 'اسم المنشأة المشتركة',
      commercialRegNumber,
      name: customerName || 'المسؤول المفوض',
      address: address || 'المملكة العربية السعودية',
      email,
      phone,
    },
    items: items.map((it) => ({
      id: it.id,
      description: it.description || 'بند تجريبي',
      quantity: Number(it.quantity) || 1,
      unitPriceHalalas: sarToHalalas(Number(it.unitPriceSar) || 0),
    })),
    totals: {
      subtotal: subtotalHalalas,
      discount: discountHalalas,
      taxable: taxableHalalas,
      vat: vatHalalas,
      total: totalHalalas,
    },
    vatRatePercent: effectiveVatPercent,
    issueDate,
    dueDate,
    selectedClauseIds: Array.from(selectedClauseIds),
    terms: activeSelectedClauses,
    notes,
    seller: initialInvoice?.seller, // if already frozen
    status: initialInvoice?.status || 'draft',
    createdAt: initialInvoice?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: initialInvoice?.createdBy || 'admin',
  };

  return (
    <div className="space-y-6 pb-16" dir="rtl">
      {/* ──────────────── Top Navigation & Action Buttons ──────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E9E8] shadow-2xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/invoices"
            className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg font-black text-black">
              {isEdit ? 'تعديل مسودة العقد والفاتورة' : 'إنشاء عقد وفاتورة تجارية جديدة'}
            </h1>
            <p className="text-xs text-[#5E6665]">
              أدخل بيانات المنشأة والبنود، وراجع المعاينة الحية فورياً قبل الاعتماد
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Save Draft */}
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isPending}
            className="text-xs font-bold gap-1.5 h-10 border-neutral-300"
          >
            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>حفظ كمسودة</span>
          </Button>

          {/* Issue */}
          <Button
            variant="primary"
            onClick={() => handleIssue(false)}
            disabled={isPending}
            className="text-xs font-bold gap-1.5 h-10 bg-[#29545c] hover:bg-[#1f3f45]"
          >
            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Receipt className="w-3.5 h-3.5" />}
            <span>إصدار واعتماد</span>
          </Button>

          {/* Issue & Send */}
          <Button
            variant="primary"
            onClick={() => handleIssue(true)}
            disabled={isPending}
            className="text-xs font-bold gap-1.5 h-10 bg-[#F0C5AE] hover:bg-[#e4b59c] text-black shadow-xs"
          >
            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>إصدار وإرسال بالبريد</span>
          </Button>
        </div>
      </div>

      {/* Form Error Banner */}
      {formError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Mobile Tab Toggle */}
      <div className="flex lg:hidden bg-neutral-100 p-1 rounded-xl">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mobileTab === 'editor' ? 'bg-white text-black shadow-2xs' : 'text-[#5E6665]'
          }`}
        >
          بيانات العقد والفاتورة
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mobileTab === 'preview' ? 'bg-white text-black shadow-2xs' : 'text-[#5E6665]'
          }`}
        >
          المعاينة الحية (Live Preview)
        </button>
      </div>

      {/* ──────────────── Main Grid: Editor on Right (RTL), Live Preview on Left ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Form Column (7 cols) */}
        <div className={`lg:col-span-6 xl:col-span-7 space-y-6 ${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
          {/* Section 1: Document Settings */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#29545c]" />
              <span>نوع المستند وصيغة التعاقد</span>
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDocKind('contract_invoice')}
                className={`p-3 rounded-xl border text-right transition-all ${
                  docKind === 'contract_invoice'
                    ? 'border-[#29545c] bg-teal-50/50 text-[#29545c] ring-1 ring-[#29545c]'
                    : 'border-[#E5E9E8] bg-white text-[#5E6665] hover:border-neutral-300'
                }`}
              >
                <div className="text-xs font-bold">عقد وفاتورة تجارية</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  عقد اشتراك رسمي ملزم مرفق به مطالبة مالية
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDocKind('quote')}
                className={`p-3 rounded-xl border text-right transition-all ${
                  docKind === 'quote'
                    ? 'border-amber-600 bg-amber-50/50 text-amber-900 ring-1 ring-amber-600'
                    : 'border-[#E5E9E8] bg-white text-[#5E6665] hover:border-neutral-300'
                }`}
              >
                <div className="text-xs font-bold">عرض سعر وعقد مبدئي</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  عرض أسعار رسمي مقيد بمدة سريان للتفاوض
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Customer / Tenant Details */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-black flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#29545c]" />
                <span>بيانات المنشأة المشتركة (الطرف الثاني)</span>
              </h2>
              {isSearchingTenants && (
                <span className="text-[11px] text-[#5E6665] flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin text-[#29545c]" />
                  <span>بحث في الصالونات...</span>
                </span>
              )}
            </div>

            <div className="relative">
              <label className="block text-xs font-bold text-[#5E6665] mb-1">
                اسم المنشأة أو الصالون <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={facilityName}
                  onChange={(e) => handleFacilityNameChange(e.target.value)}
                  onFocus={() => {
                    if (tenantSuggestions.length > 0) setShowSuggestions(true);
                  }}
                  placeholder="ابحث عن صالون مسجل أو اكتب اسماً جديداً..."
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                    fieldErrors.facilityName ? 'border-rose-400 bg-rose-50/30' : 'border-[#E5E9E8]'
                  } focus:border-[#29545c] focus:outline-none focus:ring-1 focus:ring-[#29545c]`}
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
              {fieldErrors.facilityName && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.facilityName}</p>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && tenantSuggestions.length > 0 && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-[#CCD4D3] shadow-lg max-h-56 overflow-y-auto divide-y divide-neutral-100">
                  <div className="p-2 text-[10px] font-bold text-[#5E6665] bg-neutral-50">
                    صالونات مسجلة في المنظومة (اختر للتعبئة التلقائية):
                  </div>
                  {tenantSuggestions.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTenant(t)}
                      className="w-full text-right p-3 hover:bg-teal-50/60 transition-colors flex flex-col gap-0.5 text-xs"
                    >
                      <span className="font-bold text-black">{t.name}</span>
                      <span className="text-[11px] text-[#5E6665]">
                        المسؤول: {t.ownerName || '—'} · الهاتف: {t.ownerPhone || '—'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#5E6665] mb-1">
                  رقم السجل التجاري / الرقم الضريبي (اختياري)
                </label>
                <input
                  type="text"
                  value={commercialRegNumber}
                  onChange={(e) => setCommercialRegNumber(e.target.value)}
                  placeholder="مثال: 1010XXXXXX"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5E6665] mb-1">
                  اسم المسؤول المفوض بالتوقيع <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (fieldErrors.customerName) {
                      setFieldErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.customerName;
                        return copy;
                      });
                    }
                  }}
                  placeholder="الاسم الكامل للشخص المفوض"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                    fieldErrors.customerName ? 'border-rose-400 bg-rose-50/30' : 'border-[#E5E9E8]'
                  } focus:border-[#29545c] focus:outline-none`}
                />
                {fieldErrors.customerName && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.customerName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5E6665] mb-1">
                العنوان والمدينة <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (fieldErrors.address) {
                    setFieldErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.address;
                      return copy;
                    });
                  }
                }}
                placeholder="مثال: الرياض، حي العليا، طريق الملك فهد"
                className={`w-full text-xs px-3.5 py-2.5 rounded-xl border ${
                  fieldErrors.address ? 'border-rose-400 bg-rose-50/30' : 'border-[#E5E9E8]'
                } focus:border-[#29545c] focus:outline-none`}
              />
              {fieldErrors.address && (
                <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#5E6665] mb-1">
                  البريد الإلكتروني للعميل
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="salon@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none font-sans"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5E6665] mb-1">
                  رقم الهاتف أو الجوال
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none font-mono"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Items Editor */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-black flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#29545c]" />
                <span>بنود الاشتراك والخدمات المقدمة</span>
              </h2>
              <Button
                variant="outline"
                onClick={handleAddItem}
                className="text-xs gap-1.5 h-8 border-dashed border-[#29545c] text-[#29545c]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة بند جديد</span>
              </Button>
            </div>

            {fieldErrors.items && (
              <p className="text-[11px] text-rose-600">{fieldErrors.items}</p>
            )}

            <div className="space-y-3">
              {items.map((it, idx) => (
                <div
                  key={it.id}
                  className="p-3.5 rounded-xl border border-[#E5E9E8] bg-[#FAFBFB] space-y-3 relative group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#29545c]">
                      البند #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveItem(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded-md text-neutral-400 hover:text-black disabled:opacity-30"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveItem(idx, 'down')}
                        disabled={idx === items.length - 1}
                        className="p-1 rounded-md text-neutral-400 hover:text-black disabled:opacity-30"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(it.id)}
                        disabled={items.length <= 1}
                        className="p-1 rounded-md text-neutral-400 hover:text-rose-600 disabled:opacity-30 ms-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={it.description}
                      onChange={(e) => handleUpdateItem(it.id, 'description', e.target.value)}
                      placeholder="اسم الخدمة، الباقة، أو تفاصيل البند التعاقدي..."
                      className="w-full text-xs px-3 py-2 rounded-lg border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none bg-white"
                    />
                    {fieldErrors[`item_${idx}_description`] && (
                      <p className="text-[11px] text-rose-600 mt-1">
                        {fieldErrors[`item_${idx}_description`]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#5E6665] mb-1">الكمية</label>
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) =>
                          handleUpdateItem(it.id, 'quantity', parseInt(e.target.value) || 1)
                        }
                        className="w-full text-xs px-3 py-1.5 rounded-lg border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#5E6665] mb-1">
                        سعر الوحدة (ر.س)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={it.unitPriceSar}
                          onChange={(e) =>
                            handleUpdateItem(it.id, 'unitPriceSar', parseFloat(e.target.value) || 0)
                          }
                          className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none bg-white font-mono text-left"
                          dir="ltr"
                        />
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 font-bold">
                          ر.س
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Discount & VAT Toggle */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-black flex items-center gap-2">
              <Percent className="w-4 h-4 text-[#29545c]" />
              <span>الخصومات والضريبة الإضافية</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Discount Input */}
              <div>
                <label className="block text-xs font-bold text-[#5E6665] mb-1">
                  قيمة الخصم الترويجي (ر.س)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discountSar}
                    onChange={(e) => setDiscountSar(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="w-full text-xs pl-8 pr-3.5 py-2.5 rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none font-mono text-left"
                    dir="ltr"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-bold">
                    ر.س
                  </span>
                </div>
              </div>

              {/* VAT Toggle & Rate */}
              <div className="p-3 rounded-xl border border-[#E5E9E8] bg-[#FAFBFB] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black">تطبيق ضريبة القيمة المضافة</span>
                  <input
                    type="checkbox"
                    checked={vatEnabled}
                    onChange={(e) => setVatEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-[#29545c] focus:ring-[#29545c]"
                  />
                </div>
                {vatEnabled && (
                  <div className="flex items-center gap-2 pt-1 border-t border-neutral-200">
                    <span className="text-[11px] text-[#5E6665]">نسبة الضريبة:</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={vatRatePercent}
                      onChange={(e) => setVatRatePercent(parseFloat(e.target.value) || 0)}
                      className="w-16 text-xs px-2 py-1 rounded-md border border-neutral-300 font-mono text-center"
                    />
                    <span className="text-xs font-bold text-neutral-600">%</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Dates */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-black flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#29545c]" />
              <span>تواريخ العقد وفترة السداد</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#5E6665] mb-1">
                  تاريخ إصدار المستند <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5E6665] mb-1">
                  تاريخ الاستحقاق أو نهاية الفترة
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Terms & Conditions Picker */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-black flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#29545c]" />
                <span>بنود وشروط التعاقد القانونية</span>
              </h2>
              <span className="text-[11px] text-[#5E6665]">
                {activeSelectedClauses.length} بنود محددة للعقد
              </span>
            </div>

            <div className="space-y-2">
              {clauses.map((clause) => {
                const isMandatory = clause.mandatory;
                const isChecked = isMandatory || selectedClauseIds.has(clause.id);

                return (
                  <div
                    key={clause.id}
                    className={`p-3 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                      isChecked
                        ? 'border-[#29545c]/30 bg-teal-50/20'
                        : 'border-[#E5E9E8] bg-white opacity-60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isMandatory}
                      onChange={(e) => {
                        if (isMandatory) return;
                        setSelectedClauseIds((prev) => {
                          const copy = new Set(prev);
                          if (e.target.checked) copy.add(clause.id);
                          else copy.delete(clause.id);
                          return copy;
                        });
                      }}
                      className="mt-0.5 rounded text-[#29545c] focus:ring-[#29545c]"
                    />

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">{clause.title}</span>
                        {isMandatory && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                            <Lock className="w-2.5 h-2.5" />
                            <span>بند إلزامي</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5E6665] leading-relaxed line-clamp-2">
                        {clause.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 7: Notes */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-2">
            <label className="block text-xs font-bold text-[#5E6665]">
              ملاحظات أو شروط إضافية في الفاتورة
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي تفاصيل خاصة بتدريب الفريق، الدعم، أو شروط الاسترجاع..."
              className="w-full text-xs p-3 rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none"
            />
          </div>
        </div>

        {/* Live Preview Column (5 cols) */}
        <div
          className={`lg:col-span-6 xl:col-span-5 sticky top-6 ${
            mobileTab === 'editor' ? 'hidden lg:block' : ''
          }`}
        >
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2 text-xs font-bold text-black">
                <Eye className="w-4 h-4 text-[#29545c]" />
                <span>المعاينة المباشرة للمستند (Live Preview)</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#29545c] border border-teal-200">
                تحديث حي فوري
              </span>
            </div>

            {/* Scale preview document to fit nicely in the column */}
            <div className="overflow-x-auto max-h-[820px] overflow-y-auto rounded-xl border border-neutral-200 bg-neutral-100 p-2">
              <div className="origin-top transform scale-80 sm:scale-90 xl:scale-95 transition-transform duration-200">
                <InvoicePrintableDocument
                  invoice={previewInvoiceData}
                  billingSettings={billingSettings}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
