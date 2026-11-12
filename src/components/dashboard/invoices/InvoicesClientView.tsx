'use client';

import React, { useState, useRef } from 'react';
import {
  FileText,
  FileDown,
  Mail,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  Send,
  Loader2,
  X,
  CreditCard,
  PenTool,
} from 'lucide-react';
import { Button, Input, Select, SarIcon } from '@/components/ui';
import { InvoicePrintableDocument } from './InvoicePrintableDocument';
import { generateInvoicePdf } from '@/lib/pdf-export';
import {
  createInvoiceAction,
  sendInvoiceEmailAction,
  deleteInvoiceAction,
  generateInvoicePdfAction,
} from '@/server/actions/invoices';
import type { PlatformInvoice, SalonTenant } from '@/lib/types/platform';

interface InvoicesClientViewProps {
  initialInvoices: PlatformInvoice[];
  tenants: SalonTenant[];
}

interface FormItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function InvoicesClientView({
  initialInvoices,
  tenants,
}: InvoicesClientViewProps) {
  const [invoices, setInvoices] = useState<PlatformInvoice[]>(initialInvoices);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  // Form State - Dates
  const todayStr = new Date().toISOString().split('T')[0];
  const nextYearDate = new Date();
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
  const nextYearStr = nextYearDate.toISOString().split('T')[0];

  const [invoiceDate, setInvoiceDate] = useState(todayStr);
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(nextYearStr);

  // Form State - Salon / Tenant
  const [facilityName, setFacilityName] = useState('صالون لمسة حرير للتجميل');
  const [facilityAddress, setFacilityAddress] = useState('الرياض، حي النخيل، طريق الملك فهد');
  const [customerName, setCustomerName] = useState('عبدالله بن عبدالعزيز التميمي');
  const [customerPhone, setCustomerPhone] = useState('0551234567');
  const [customerEmail, setCustomerEmail] = useState('');
  const [taxNumber, setTaxNumber] = useState('300000000000003');
  const [commercialReg, setCommercialReg] = useState('1010892011');
  const [selectedTenantId, setSelectedTenantId] = useState('');

  // Plan & Payment
  const [planName, setPlanName] = useState('باقة النمو والسبا (Growth) - اشتراك سنوي');
  const [paymentMethod, setPaymentMethod] = useState<'bank-transfer' | 'mada' | 'apple-pay' | 'visa' | 'cash'>('bank-transfer');
  const [paymentDetails, setPaymentDetails] = useState('مصرف الراجحي · الحساب: مؤسسة راش إكس للاتصالات وتقنية المعلومات · الآيبان (IBAN): SA44 8000 0205 6080 1001 2345');
  const [discount, setDiscount] = useState<number>(0);
  const [notes, setNotes] = useState('يشمل العقد تفعيل المنظومة السحابية وتدريب الفريق والدعم الفني طوال فترة الاشتراك.');

  // Email sending state (prefilled with user's email)
  const [sendEmailOnCreate, setSendEmailOnCreate] = useState(true);
  const [recipientEmail, setRecipientEmail] = useState('mohamedabdouooo28@gmail.com');

  // Items State (Default subscription package items)
  const [items, setItems] = useState<FormItem[]>([
    {
      id: '1',
      description: 'اشتراك منصة راش إكس السحابية (نظام الكاشير POS، إدارة الحجوزات، ملفات العملاء)',
      quantity: 1,
      unitPrice: 12000,
    },
    {
      id: '2',
      description: 'بوابة الربط والتكامل المعتمدة مع هيئة الزكاة والضريبة والجمارك (ZATCA المرحلة 2)',
      quantity: 1,
      unitPrice: 2000,
    },
    {
      id: '3',
      description: 'باقة الرسائل التفاعلية الذكية وتطبيق العملاء (PWA)',
      quantity: 1,
      unitPrice: 990,
    },
  ]);

  // Draft invoice number (static per load)
  const [draftInvoiceNumber] = useState(() => `RX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);

  // Loading & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal Preview State
  const [previewInvoice, setPreviewInvoice] = useState<PlatformInvoice | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  // Hidden print container ref
  const printDocRef = useRef<HTMLDivElement>(null);

  // Handle Tenant selection
  const handleTenantSelect = (tenantId: string) => {
    setSelectedTenantId(tenantId);
    if (!tenantId) return;
    const found = tenants.find((t) => t.id === tenantId);
    if (found) {
      setFacilityName(found.businessName);
      setFacilityAddress(`${found.city}، المملكة العربية السعودية`);
      setCustomerName(found.ownerName || '');
      setCustomerPhone(found.phone || '');
      setCustomerEmail(found.email || '');
    }
  };

  // Preset plans loader
  const applyPlanPreset = (preset: 'starter' | 'growth' | 'enterprise') => {
    if (preset === 'starter') {
      setPlanName('باقة البداية (Starter) - اشتراك سنوي');
      setItems([
        {
          id: '1',
          description: 'اشتراك منصة راش إكس السحابية (نظام الكاشير POS والحجوزات لفرع واحد)',
          quantity: 1,
          unitPrice: 7990,
        },
        {
          id: '2',
          description: 'تفعيل الربط الإلكتروني المعتمد مع ZATCA المرحلة الثانية',
          quantity: 1,
          unitPrice: 1500,
        },
      ]);
    } else if (preset === 'growth') {
      setPlanName('باقة النمو والسبا (Growth) - اشتراك سنوي');
      setItems([
        {
          id: '1',
          description: 'اشتراك منصة راش إكس السحابية (حتى 3 فروع، نظام العمولات، إدارة المخزون)',
          quantity: 1,
          unitPrice: 14990,
        },
        {
          id: '2',
          description: 'بوابة ZATCA المرحلة الثانية + تطبيق العملاء (PWA) وإشعارات الواتساب',
          quantity: 1,
          unitPrice: 2500,
        },
      ]);
    } else {
      setPlanName('باقة المؤسسات الكبرى (Enterprise) - اشتراك سنوي');
      setItems([
        {
          id: '1',
          description: 'ترخيص منصة راش إكس للمؤسسات (فروع غير محدودة، تطبيق خاص بهوية الصالون)',
          quantity: 1,
          unitPrice: 29990,
        },
        {
          id: '2',
          description: 'مدير حساب مخصص، تكامل API كامل، ودعم فني على مدار الساعة 24/7',
          quantity: 1,
          unitPrice: 5000,
        },
      ]);
    }
  };

  // Add Item
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(2, 9),
        description: '',
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update Item
  const handleUpdateItem = (id: string, field: keyof FormItem, val: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [field]: field === 'quantity' || field === 'unitPrice' ? Number(val) : val,
          };
        }
        return item;
      })
    );
  };

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + (Number(it.quantity || 0) * Number(it.unitPrice || 0)), 0);
  const safeDiscount = Math.min(subtotal, Math.max(0, Number(discount) || 0));
  const taxableAmount = Math.max(0, subtotal - safeDiscount);
  const vatRate = 0.15;
  const vatAmount = taxableAmount * vatRate;
  const totalAmount = taxableAmount + vatAmount;

  // Construct current draft invoice
  const currentDraftInvoice: PlatformInvoice = {
    id: 'draft-contract',
    invoiceNumber: draftInvoiceNumber,
    facilityName,
    facilityAddress,
    invoiceDate,
    startDate,
    endDate,
    planName,
    customerName: customerName || 'الصالون المشترك',
    customerPhone,
    customerEmail,
    taxNumber,
    commercialReg,
    items: items.map((it) => ({
      ...it,
      total: it.quantity * it.unitPrice,
    })),
    subtotal,
    discount: safeDiscount,
    taxableAmount,
    vatRate,
    vatAmount,
    totalAmount,
    paymentMethod,
    paymentDetails,
    status: 'paid',
    notes,
    createdAt: new Date().toISOString(),
  };

  // Handle Download PDF directly using vector PDF Action (Guaranteed Zero-Mojibake)
  const handleDownloadPdf = async (invToDownload: PlatformInvoice = currentDraftInvoice) => {
    try {
      setIsPdfLoading(true);
      setStatusMessage(null);

      const res = await generateInvoicePdfAction({
        invoiceNumber: invToDownload.invoiceNumber,
        facilityName: invToDownload.facilityName,
        facilityAddress: invToDownload.facilityAddress,
        invoiceDate: invToDownload.invoiceDate,
        startDate: invToDownload.startDate,
        endDate: invToDownload.endDate,
        customerName: invToDownload.customerName,
        customerPhone: invToDownload.customerPhone,
        taxNumber: invToDownload.taxNumber,
        planName: invToDownload.planName,
        items: invToDownload.items,
        subtotal: invToDownload.subtotal,
        discount: invToDownload.discount,
        vatAmount: invToDownload.vatAmount,
        totalAmount: invToDownload.totalAmount,
        paymentDetails: invToDownload.paymentDetails,
      });

      if (!res.success || !res.data?.pdfBase64) {
        throw new Error(res.error || 'تعذر توليد ملف الـ PDF');
      }

      const byteCharacters = atob(res.data.pdfBase64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-Contract-${invToDownload.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatusMessage({
        type: 'success',
        text: `تم تصدير وتحميل مستند العقد والفاتورة PDF (${invToDownload.invoiceNumber}) بنجاح!`,
      });
    } catch (err: unknown) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'حدث خطأ أثناء تصدير ملف الـ PDF.',
      });
    } finally {
      setIsPdfLoading(false);
    }
  };

  // Handle Send Email for specific invoice
  const handleSendEmail = async (invToSend: PlatformInvoice) => {
    try {
      setIsEmailLoading(true);
      setStatusMessage(null);

      const pdfRes = await generateInvoicePdfAction({
        invoiceNumber: invToSend.invoiceNumber,
        facilityName: invToSend.facilityName,
        facilityAddress: invToSend.facilityAddress,
        invoiceDate: invToSend.invoiceDate,
        startDate: invToSend.startDate,
        endDate: invToSend.endDate,
        customerName: invToSend.customerName,
        customerPhone: invToSend.customerPhone,
        taxNumber: invToSend.taxNumber,
        planName: invToSend.planName,
        items: invToSend.items,
        subtotal: invToSend.subtotal,
        discount: invToSend.discount,
        vatAmount: invToSend.vatAmount,
        totalAmount: invToSend.totalAmount,
        paymentDetails: invToSend.paymentDetails,
      });

      const pdfBase64 = pdfRes.success ? pdfRes.data?.pdfBase64 : undefined;

      const targetEmail = recipientEmail || 'mohamedabdouooo28@gmail.com';
      const res = await sendInvoiceEmailAction({
        invoiceId: invToSend.id,
        recipientEmail: targetEmail,
        pdfBase64,
      });

      if (!res.success) {
        setStatusMessage({
          type: 'error',
          text: res.error || 'فشل في إرسال البريد الإلكتروني.',
        });
        return;
      }

      setStatusMessage({
        type: 'success',
        text: `تم إرسال عقد الاشتراك والفاتورة بنجاح بتصميم راش إكس الرسمي إلى: ${targetEmail}`,
      });

      setInvoices((prev) =>
        prev.map((item) =>
          item.id === invToSend.id
            ? { ...item, sentToEmail: targetEmail, sentAt: new Date().toISOString() }
            : item
        )
      );
    } catch (err: unknown) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'فشل في إرسال العقد بالبريد الإلكتروني.',
      });
    } finally {
      setIsEmailLoading(false);
    }
  };

  // Handle Form Submit (Save Contract Invoice + Optional Email)
  const handleSubmitInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityName.trim()) {
      setStatusMessage({ type: 'error', text: 'يرجى إدخال اسم الصالون / المنشأة' });
      return;
    }
    if (!facilityAddress.trim()) {
      setStatusMessage({ type: 'error', text: 'يرجى إدخال عنوان المنشأة' });
      return;
    }
    if (!startDate.trim() || !endDate.trim()) {
      setStatusMessage({ type: 'error', text: 'يرجى تحديد فترة بداية ونهاية العقد' });
      return;
    }
    if (subtotal <= 0) {
      setStatusMessage({ type: 'error', text: 'يرجى إضافة بند واحد على الأقل بمبلغ صحيح' });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatusMessage(null);

      // Generate Vector PDF Base64 if email enabled
      let pdfBase64: string | undefined;
      if (sendEmailOnCreate) {
        try {
          const pdfRes = await generateInvoicePdfAction({
            invoiceNumber: currentDraftInvoice.invoiceNumber,
            facilityName: currentDraftInvoice.facilityName,
            facilityAddress: currentDraftInvoice.facilityAddress,
            invoiceDate: currentDraftInvoice.invoiceDate,
            startDate: currentDraftInvoice.startDate,
            endDate: currentDraftInvoice.endDate,
            customerName: currentDraftInvoice.customerName,
            customerPhone: currentDraftInvoice.customerPhone,
            taxNumber: currentDraftInvoice.taxNumber,
            planName: currentDraftInvoice.planName,
            items: currentDraftInvoice.items,
            subtotal: currentDraftInvoice.subtotal,
            discount: currentDraftInvoice.discount,
            vatAmount: currentDraftInvoice.vatAmount,
            totalAmount: currentDraftInvoice.totalAmount,
            paymentDetails: currentDraftInvoice.paymentDetails,
          });
          if (pdfRes.success && pdfRes.data?.pdfBase64) {
            pdfBase64 = pdfRes.data.pdfBase64;
          }
        } catch (pdfErr) {
          console.warn('Could not generate PDF base64:', pdfErr);
        }
      }

      const res = await createInvoiceAction({
        facilityName,
        facilityAddress,
        invoiceDate,
        startDate,
        endDate,
        planName,
        paymentDetails,
        customerName: customerName || facilityName,
        customerPhone,
        customerEmail,
        taxNumber,
        commercialReg,
        items: items.map((it) => ({
          ...it,
          total: Number(it.quantity) * Number(it.unitPrice),
        })),
        subtotal,
        discount: safeDiscount,
        paymentMethod,
        status: 'paid',
        notes,
        sendEmailOnCreate,
        recipientEmail: recipientEmail || 'mohamedabdouooo28@gmail.com',
        pdfBase64,
      });

      if (!res.success || !res.data) {
        setStatusMessage({
          type: 'error',
          text: res.error || 'حدث خطأ أثناء حفظ العقد في قاعدة البيانات.',
        });
        return;
      }

      const newCreatedInvoice: PlatformInvoice = {
        ...currentDraftInvoice,
        id: res.data.id,
        invoiceNumber: res.data.invoiceNumber,
        sentToEmail: res.emailSent ? (recipientEmail || 'mohamedabdouooo28@gmail.com') : undefined,
        sentAt: res.emailSent ? new Date().toISOString() : undefined,
      };

      setInvoices((prev) => [newCreatedInvoice, ...prev]);

      setStatusMessage({
        type: 'success',
        text: `تم إصدار وتوثيق العقد بنجاح برقم (${res.data.invoiceNumber})! ${
          res.emailSent ? `وتم إرسال نسخة PDF المعتمدة إلى ${recipientEmail}.` : ''
        }`,
      });

      setPreviewInvoice(newCreatedInvoice);
    } catch (err: unknown) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'حدث خطأ غير متوقع أثناء حفظ العقد.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteInvoice = async (invoiceId: string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذا العقد نهائياً؟')) return;
    try {
      const res = await deleteInvoiceAction({ invoiceId });
      if (res.success) {
        setInvoices((prev) => prev.filter((i) => i.id !== invoiceId));
        setStatusMessage({ type: 'success', text: 'تم حذف العقد بنجاح.' });
      } else {
        setStatusMessage({ type: 'error', text: res.error || 'فشل في الحذف.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'حدث خطأ أثناء الحذف.' });
    }
  };

  const totalInvoicesCount = invoices.length;
  const totalRevenue = invoices.reduce((acc, inv) => acc + (Number(inv.totalAmount) || 0), 0);
  const emailedCount = invoices.filter((i) => Boolean(i.sentToEmail)).length;

  return (
    <div className="space-y-6">
      {/* ───────────────── Top Header ───────────────── */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[#91B8C0]/20 text-[#29545c] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black text-[#0D1514]">
              عقود الاشتراك وعروض الأسعار للصالونات (RASHX Agreements)
            </h1>
          </div>
          <p className="text-xs text-[#5E6665]">
            إصدار عقود وفواتير رسمية باشتراك الصالونات في راش إكس، محددة بالمدة والسعر ومساحة التوقيع والاعتماد، ومصممة طبق الأصل من هوية راش إكس.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 bg-[#FAFBFB] p-1.5 rounded-2xl border border-[#E5E9E8]">
          <button
            type="button"
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'create'
                ? 'bg-[#29545c] text-white shadow-xs'
                : 'text-[#5E6665] hover:text-[#0D1514]'
            }`}
          >
            إنشاء عقد / عرض جديد
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-[#29545c] text-white shadow-xs'
                : 'text-[#5E6665] hover:text-[#0D1514]'
            }`}
          >
            <span>سجل العقود الصادرة</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#E8F2F3] text-[#29545c] font-black">
              {totalInvoicesCount}
            </span>
          </button>
        </div>
      </div>

      {/* ───────────────── KPI Stats Row ───────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E5E9E8] flex items-center justify-between">
          <div>
            <div className="text-xs text-[#5E6665] font-medium">إجمالي العقود الصادرة</div>
            <div className="text-2xl font-black text-[#0D1514] mt-1">{totalInvoicesCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5E9E8] flex items-center justify-between">
          <div>
            <div className="text-xs text-[#5E6665] font-medium">قيمة التعاقدات الإجمالية</div>
            <div className="text-2xl font-black text-[#29545c] mt-1">
              {totalRevenue.toLocaleString('ar-SA', { minimumFractionDigits: 2 })} ر.س
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <SarIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5E9E8] flex items-center justify-between">
          <div>
            <div className="text-xs text-[#5E6665] font-medium">عقود مرسلة عبر الإيميل</div>
            <div className="text-2xl font-black text-indigo-700 mt-1">{emailedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ───────────────── Status Banner ───────────────── */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-[#5E6665] hover:text-[#0D1514] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ───────────────── Tab 1: Create Contract Invoice ───────────────── */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form (7 cols) */}
          <form onSubmit={handleSubmitInvoice} className="lg:col-span-7 space-y-6">
            {/* Quick Presets Bar */}
            <div className="p-4 rounded-2xl bg-white border border-[#91B8C0]/40 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[#0D1514] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#29545c]" />
                <span>تحميل باقة جاهزة سريعة:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => applyPlanPreset('starter')}
                  className="px-3 py-1.5 rounded-xl border border-[#CCD4D3] hover:border-[#29545c] text-[11px] font-bold text-[#0D1514] transition-colors"
                >
                  Starter (7,990 ر.س/سنة)
                </button>
                <button
                  type="button"
                  onClick={() => applyPlanPreset('growth')}
                  className="px-3 py-1.5 rounded-xl bg-[#E8F2F3] text-[#29545c] border border-[#91B8C0] text-[11px] font-bold transition-colors"
                >
                  Growth (14,990 ر.س/سنة) ⭐
                </button>
                <button
                  type="button"
                  onClick={() => applyPlanPreset('enterprise')}
                  className="px-3 py-1.5 rounded-xl border border-[#CCD4D3] hover:border-[#29545c] text-[11px] font-bold text-[#0D1514] transition-colors"
                >
                  Enterprise (29,990 ر.س/سنة)
                </button>
              </div>
            </div>

            {/* Section 1: Salon / Client Info (Billed To) */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F2]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#29545c]" />
                  <h2 className="text-sm font-bold text-[#0D1514]">
                    بيانات الطرف الثاني (الصالون المشترك · BILLED TO)
                  </h2>
                </div>
                {tenants.length > 0 && (
                  <div className="w-48">
                    <Select
                      label=""
                      value={selectedTenantId}
                      onValueChange={handleTenantSelect}
                      options={[
                        { value: '', label: 'استيراد صالون مسجل...' },
                        ...tenants.map((t) => ({ value: t.id, label: t.businessName })),
                      ]}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                    اسم المنشأة / الصالون <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    placeholder="مثال: صالون لمسة حرير للتجميل"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                    عنوان المنشأة <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    leftIcon={<MapPin className="w-4 h-4 text-[#8F9998]" />}
                    value={facilityAddress}
                    onChange={(e) => setFacilityAddress(e.target.value)}
                    placeholder="المدينة، الحي، اسم الشارع"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                    المفوض بالتوقيع / المالك <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="اسم المالك أو المفوض"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">رقم الهاتف / الجوال</label>
                  <Input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="05xxxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">الرقم الضريبي / السجل</label>
                  <Input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    placeholder="300000000000003"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contract Dates & Period */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#F0F2F2]">
                <Calendar className="w-4 h-4 text-[#29545c]" />
                <h2 className="text-sm font-bold text-[#0D1514]">
                  فترة العقد والاشتراك (بداية ونهاية التعاقد)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                    تاريخ إصدار العقد <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="date"
                    required
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                    تاريخ بداية الاشتراك <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                    تاريخ نهاية الاشتراك <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">مسمى الخطة / الباقة</label>
                <Input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="باقة النمو والسبا (Growth) - اشتراك سنوي"
                />
              </div>
            </div>

            {/* Section 3: Items / Services Included in Contract */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F2]">
                <h2 className="text-sm font-bold text-[#0D1514]">
                  بنود العرض والاشتراك (DESCRIPTION & PRICING)
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                  className="text-xs gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة بند جديد</span>
                </Button>
              </div>

              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl bg-[#FAFBFB] border border-[#E5E9E8]"
                  >
                    <div className="w-7 text-center font-bold text-xs text-[#8F9998]">{idx + 1}</div>

                    <div className="flex-1 w-full sm:w-auto">
                      <Input
                        type="text"
                        placeholder="بيان الخدمة أو الترخيص"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        required
                      />
                    </div>

                    <div className="w-24">
                      <Input
                        type="number"
                        min="1"
                        placeholder="الكمية"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                        required
                      />
                    </div>

                    <div className="w-32">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="السعر"
                        leftIcon={<SarIcon className="w-3.5 h-3.5 text-[#8F9998]" />}
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(item.id, 'unitPrice', e.target.value)}
                        required
                      />
                    </div>

                    <div className="w-24 text-left font-mono font-bold text-xs text-[#0D1514]">
                      {(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(2)} ر.س
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length <= 1}
                      className="p-1.5 text-rose-500 hover:text-rose-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="حذف البند"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Discount & Bank Account */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#F0F2F2]">
                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">خصم ترويجي معتمد (ر.س)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    leftIcon={<SarIcon className="w-3.5 h-3.5 text-[#8F9998]" />}
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">طريقة السداد المتفق عليها</label>
                  <Select
                    value={paymentMethod}
                    onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)}
                    options={[
                      { value: 'bank-transfer', label: 'تحويل بنكي رسمي إلى حساب راش إكس' },
                      { value: 'mada', label: 'دفع عبر بطاقة مدى (Mada)' },
                      { value: 'apple-pay', label: 'Apple Pay' },
                      { value: 'visa', label: 'بطاقة ائتمانية (Visa / Master)' },
                      { value: 'cash', label: 'نقدي مع سند قبض رسمي' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">بيانات الحساب البنكي والآيبان</label>
                <Input
                  type="text"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">شروط وملاحظات التعاقد</label>
                <Input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Section 4: Email Dispatch (Template exact match) */}
            <div className="p-6 rounded-3xl bg-[#FAFBFB] border border-[#91B8C0]/50 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="sendEmailCheck"
                  checked={sendEmailOnCreate}
                  onChange={(e) => setSendEmailOnCreate(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#CCD4D3] text-[#29545c] focus:ring-[#29545c]"
                />
                <div className="flex-1">
                  <label htmlFor="sendEmailCheck" className="text-xs font-bold text-[#0D1514] cursor-pointer">
                    إرسال العقد وملف الـ PDF المرفق عبر البريد الإلكتروني فور الحفظ
                  </label>
                  <p className="text-[11px] text-[#5E6665] mt-0.5">
                    يتم الإرسال باستخدام قالب راش إكس المعتمد (<code className="text-[#29545c]">email-template-ar.html</code>) متضمناً تفاصيل العقد وملف PDF مطابق لمخطط <code className="text-[#29545c]">invoice-a4.svg</code>.
                  </p>
                </div>
              </div>

              {sendEmailOnCreate && (
                <div className="pt-3 border-t border-[#E5E9E8]">
                  <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                    البريد الإلكتروني للمستلم <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="email"
                    required={sendEmailOnCreate}
                    leftIcon={<Mail className="w-4 h-4 text-[#8F9998]" />}
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="mohamedabdouooo28@gmail.com"
                  />
                  <div className="mt-1 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>خادم SMTP مهيأ ومتحقق منه عبر حساب Gmail المحدد.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#29545c] hover:bg-[#1E3E44] text-white py-3 rounded-2xl font-black text-sm shadow-sm gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري إصدار العقد وإرساله بالبريد...</span>
                  </>
                ) : (
                  <>
                    <PenTool className="w-4 h-4" />
                    <span>إصدار واعتماد العقد ({totalAmount.toFixed(2)} ر.س)</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setPreviewInvoice(currentDraftInvoice)}
                className="py-3 px-4 rounded-2xl text-xs font-bold gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>معاينة المستند A4</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={isPdfLoading}
                onClick={() => handleDownloadPdf(currentDraftInvoice)}
                className="py-3 px-4 rounded-2xl text-xs font-bold gap-1.5"
              >
                <FileDown className="w-4 h-4 text-[#29545c]" />
                <span>تحميل PDF</span>
              </Button>
            </div>
          </form>

          {/* Right Live Summary / Calculations (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-6 p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F2]">
                <h3 className="font-bold text-sm text-[#0D1514]">ملخص قيمة التعاقد</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F0C5AE] text-[#000000]">
                  {planName.split('-')[0] || 'عقد سنوي'}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#5E6665]">
                  <span>المجموع قبل الضريبة (Subtotal):</span>
                  <span className="font-mono font-bold text-[#0D1514]">{subtotal.toFixed(2)} ر.س</span>
                </div>

                {safeDiscount > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>الخصم المطبق:</span>
                    <span className="font-mono font-bold">-{safeDiscount.toFixed(2)} ر.س</span>
                  </div>
                )}

                <div className="flex justify-between text-[#5E6665]">
                  <span>المبلغ الخاضع للضريبة:</span>
                  <span className="font-mono font-bold text-[#0D1514]">{taxableAmount.toFixed(2)} ر.س</span>
                </div>

                <div className="flex justify-between text-[#5E6665]">
                  <span>ضريبة القيمة المضافة 15%:</span>
                  <span className="font-mono font-bold text-[#0D1514]">{vatAmount.toFixed(2)} ر.س</span>
                </div>

                {/* Brand Peach Total Box */}
                <div className="p-4 rounded-xl bg-[#F0C5AE] text-[#000000] flex justify-between items-baseline">
                  <span className="font-bold text-xs uppercase">المبلغ الإجمالي المستحق:</span>
                  <span className="text-2xl font-black font-mono">
                    {totalAmount.toFixed(2)} ر.س
                  </span>
                </div>
              </div>

              {/* Card Snapshot */}
              <div className="p-4 rounded-2xl bg-[#FAFBFB] border border-[#E5E9E8] space-y-2 text-xs">
                <div className="font-bold text-[#000000] truncate">{facilityName}</div>
                <div className="text-[11px] text-[#5E6665] truncate">{facilityAddress}</div>
                <div className="text-[11px] text-[#29545c] font-bold">
                  فترة العقد: من {startDate} إلى {endDate}
                </div>
                <div className="text-[11px] text-[#5E6665]">
                  المفوض: <strong className="text-[#000000]">{customerName || '—'}</strong>
                </div>
              </div>

              {/* PDF generator quick button */}
              <button
                type="button"
                onClick={() => handleDownloadPdf(currentDraftInvoice)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#29545c] text-white hover:bg-[#1E3E44] text-xs font-bold transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>توليد وتنزيل العقد PDF الآن</span>
              </button>

              <div className="text-[10px] text-center text-[#8F9998] leading-relaxed">
                مستند الـ PDF مهيأ للطباعة على ورق A4 ويتضمن شروط التعاقد ومساحة التوقيع والختم الرسمي للمشترك.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── Tab 2: Invoice & Contract History ───────────────── */}
      {activeTab === 'history' && (
        <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0F2F2]">
            <div>
              <h2 className="text-base font-black text-[#0D1514]">سجل عقود وفواتير الصالونات الصادرة</h2>
              <p className="text-xs text-[#5E6665]">
                عرض كافة العقود الصادرة، مدة وسريان الاشتراك، وتتبع الإرسال عبر البريد الإلكتروني.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setActiveTab('create')}
              className="text-xs bg-[#29545c] text-white gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء عقد جديد</span>
            </Button>
          </div>

          {invoices.length === 0 ? (
            <div className="text-center py-16 text-[#8F9998] space-y-3">
              <FileText className="w-12 h-12 mx-auto text-[#CCD4D3]" />
              <p className="text-sm font-bold text-[#5E6665]">لا توجد عقود صادرة حتى الآن</p>
              <p className="text-xs">ابدأ بإنشاء أول عقد اشتراك لصالون وتصديره بصيغة PDF فوراً.</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('create')}
                className="text-xs mt-2"
              >
                إنشاء عقد الآن
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-[#E5E9E8] text-[#5E6665] font-bold">
                    <th className="py-3 px-3">رقم العقد</th>
                    <th className="py-3 px-3">الصالون المشترك</th>
                    <th className="py-3 px-3">فترة التعاقد</th>
                    <th className="py-3 px-3">المفوض بالتوقيع</th>
                    <th className="py-3 px-3 text-left">قيمة العقد</th>
                    <th className="py-3 px-3 text-center">إرسال البريد</th>
                    <th className="py-3 px-3 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F2F2]">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#FAFBFB] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#0D1514]">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#0D1514]">{inv.facilityName}</div>
                        <div className="text-[10px] text-[#8F9998] truncate max-w-xs">{inv.facilityAddress}</div>
                      </td>
                      <td className="py-3 px-3 text-[#5E6665]">
                        <span className="font-semibold text-[#0D1514]">
                          {inv.startDate || inv.invoiceDate}
                        </span>
                        {inv.endDate && (
                          <span className="text-[10px] text-[#8F9998] block">إلى {inv.endDate}</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-medium text-[#2A3332]">
                        {inv.customerName}
                      </td>
                      <td className="py-3 px-3 text-left font-mono font-black text-[#29545c]">
                        {Number(inv.totalAmount).toFixed(2)} ر.س
                      </td>
                      <td className="py-3 px-3 text-center">
                        {inv.sentToEmail ? (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-200"
                            title={`تم الإرسال إلى: ${inv.sentToEmail}`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>تم الإرسال</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#8F9998]">لم يُرسل</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewInvoice(inv)}
                            className="p-1.5 rounded-lg text-[#5E6665] hover:text-[#0D1514] hover:bg-neutral/40 transition-colors"
                            title="معاينة العقد A4"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadPdf(inv)}
                            className="p-1.5 rounded-lg text-[#29545c] hover:bg-[#E8F2F3] transition-colors"
                            title="تحميل PDF"
                          >
                            <FileDown className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSendEmail(inv)}
                            className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="إرسال إلى البريد الإلكتروني"
                          >
                            <Mail className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteInvoice(inv.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                            title="حذف العقد"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Off-screen container for crisp PDF canvas capture */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '820px',
          zIndex: -100,
          opacity: 1,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <div ref={printDocRef}>
          <InvoicePrintableDocument invoice={previewInvoice || currentDraftInvoice} />
        </div>
      </div>

      {/* Modal Preview */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#CCD4D3] overflow-hidden my-8 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E5E9E8] flex items-center justify-between bg-[#FAFBFB]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#29545c]" />
                <span className="font-bold text-sm text-[#0D1514]">
                  معاينة عقد الاشتراك والفاتورة ({previewInvoice.invoiceNumber}) · A4
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                  className="text-xs gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">طباعة</span>
                </Button>

                <Button
                  type="button"
                  size="sm"
                  disabled={isPdfLoading}
                  onClick={() => handleDownloadPdf(previewInvoice)}
                  className="text-xs bg-[#29545c] text-white gap-1.5"
                >
                  {isPdfLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <FileDown className="w-3.5 h-3.5" />
                  )}
                  <span>تحميل PDF</span>
                </Button>

                <Button
                  type="button"
                  size="sm"
                  disabled={isEmailLoading}
                  onClick={() => handleSendEmail(previewInvoice)}
                  className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
                >
                  {isEmailLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>إرسال للإيميل</span>
                </Button>

                <button
                  type="button"
                  onClick={() => setPreviewInvoice(null)}
                  className="p-1.5 rounded-full hover:bg-neutral/50 text-[#5E6665] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Document exact A4 style */}
            <div className="p-4 sm:p-8 overflow-y-auto bg-[#E5E9E8]">
              <InvoicePrintableDocument invoice={previewInvoice} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
