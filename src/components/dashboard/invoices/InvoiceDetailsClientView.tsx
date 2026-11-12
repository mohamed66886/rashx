'use client';

import React, { useState, useTransition, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Printer,
  Mail,
  Link2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Receipt,
  Download,
  UploadCloud,
  FileCheck2,
  Send,
  Edit,
  Loader2,
  Calendar,
  User,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Copy,
  ChevronDown,
  ChevronUp,
  Eye,
} from 'lucide-react';
import { Button, SarIcon } from '@/components/ui';
import { InvoicePrintableDocument } from './InvoicePrintableDocument';
import type {
  PlatformInvoice,
  InvoiceEvent,
  InvoiceStatus,
} from '@/lib/types/billing';
import { formatHalalasAsSar } from '@/lib/types/billing';
import type { BillingSettings } from '@/lib/types/platform';
import {
  markPaid,
  cancelInvoice,
  sendInvoiceEmailAction,
  uploadSignedFileAction,
  generateSigningLinkAction,
  approveSignedFile,
  rejectSignedFile,
} from '@/server/actions/invoices';

interface InvoiceDetailsClientViewProps {
  invoice: PlatformInvoice;
  events: InvoiceEvent[];
  billingSettings?: BillingSettings | null;
}

export function InvoiceDetailsClientView({
  invoice: initialInvoice,
  events: initialEvents,
  billingSettings,
}: InvoiceDetailsClientViewProps) {
  const router = useRouter();

  const [invoice, setInvoice] = useState<PlatformInvoice>(initialInvoice);
  const [events] = useState<InvoiceEvent[]>(initialEvents);

  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Email sending modal/dialog state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(
    invoice.customer.email || ''
  );
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // File upload input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [expandedEvidence, setExpandedEvidence] = useState<Record<number, boolean>>({});
  const [copiedSha, setCopiedSha] = useState<string | null>(null);
  const [previewFileIdx, setPreviewFileIdx] = useState<number | null>(null);

  // Print / View PDF
  const handlePrint = () => {
    window.open(`/api/dashboard/invoices/${invoice.id}/pdf`, '_blank');
  };

  // Copy Signing Link
  const handleCopySigningLink = async () => {
    try {
      const res = await generateSigningLinkAction(invoice.id);
      if (res.success && res.data?.signingUrl) {
        await navigator.clipboard.writeText(res.data.signingUrl);
        setStatusMessage({
          type: 'success',
          text: 'تم توليد ونسخ رابط توقيع العقد بنجاح إلى الحافظة.',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'تعذر توليد رابط التوقيع.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'حدث خطأ أثناء نسخ رابط التوقيع.',
      });
    }
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Send Email Action
  const handleSendEmail = async () => {
    if (!recipientEmail.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'يرجى إدخال البريد الإلكتروني للمستلم.',
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const res = await sendInvoiceEmailAction({
        invoiceId: invoice.id,
        recipientEmail: recipientEmail.trim(),
      });

      if (res.success) {
        setShowEmailModal(false);
        setStatusMessage({
          type: 'success',
          text: `تم إرسال المستند بنجاح إلى البريد الإلكتروني: ${recipientEmail.trim()}`,
        });
        if (invoice.status === 'issued') {
          setInvoice((prev) => ({ ...prev, status: 'sent' }));
        }
        router.refresh();
      } else {
        setStatusMessage({
          type: 'error',
          text: res.error || 'فشل في إرسال البريد الإلكتروني.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'حدث خطأ غير متوقع أثناء إرسال البريد.',
      });
    } finally {
      setIsSendingEmail(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  // Mark as Paid
  const handleMarkPaid = () => {
    if (invoice.status === 'paid') return;
    if (!confirm('هل أنت متأكد من تأكيد سداد هذا العقد / الفاتورة وتسجيل الدفعة؟'))
      return;

    startTransition(async () => {
      try {
        const res = await markPaid({
          invoiceId: invoice.id,
          paymentMethod: 'bank-transfer',
        });
        if (res.success) {
          setInvoice((prev) => ({ ...prev, status: 'paid' }));
          setStatusMessage({
            type: 'success',
            text: 'تم تحديث حالة الفاتورة إلى "مدفوعة" بنجاح.',
          });
          router.refresh();
        } else {
          setStatusMessage({
            type: 'error',
            text: res.error || 'فشل في تحديث حالة الفاتورة.',
          });
        }
      } catch {
        setStatusMessage({
          type: 'error',
          text: 'حدث خطأ أثناء تسجيل السداد.',
        });
      }
      setTimeout(() => setStatusMessage(null), 4000);
    });
  };

  // Cancel Invoice
  const handleCancel = () => {
    if (invoice.status === 'cancelled') return;
    const reason = prompt('يرجى كتابة سبب إلغاء هذا المستند:');
    if (reason === null) return;
    if (!reason.trim()) {
      alert('سبب الإلغاء مطلوب لإتمام العملية.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await cancelInvoice({
          invoiceId: invoice.id,
          reason: reason.trim(),
        });
        if (res.success) {
          setInvoice((prev) => ({ ...prev, status: 'cancelled' }));
          setStatusMessage({
            type: 'success',
            text: 'تم إلغاء المستند وتوثيق سبب الإلغاء بنجاح.',
          });
          router.refresh();
        } else {
          setStatusMessage({
            type: 'error',
            text: res.error || 'فشل في إلغاء المستند.',
          });
        }
      } catch {
        setStatusMessage({
          type: 'error',
          text: 'حدث خطأ أثناء إلغاء المستند.',
        });
      }
      setTimeout(() => setStatusMessage(null), 4000);
    });
  };

  // Approve Signed Contract File
  const handleApproveSignedFile = () => {
    if (!confirm('هل أنت متأكد من اعتماد ومطابقة النسخة الموقعة والمختومة رسمياً؟')) {
      return;
    }
    startTransition(async () => {
      try {
        const res = await approveSignedFile({ invoiceId: invoice.id });
        if (res.success) {
          setInvoice((prev) => ({
            ...prev,
            status: 'signed',
            signing: {
              ...prev.signing,
              files: prev.signing?.files || [],
              signedAt: new Date().toISOString(),
            },
          }));
          setStatusMessage({
            type: 'success',
            text: 'تم اعتماد وتوثيق العقد والمستند بنجاح.',
          });
          router.refresh();
        } else {
          setStatusMessage({
            type: 'error',
            text: res.error || 'فشل في اعتماد النسخة الموقعة.',
          });
        }
      } catch {
        setStatusMessage({
          type: 'error',
          text: 'حدث خطأ أثناء اعتماد النسخة الموقعة.',
        });
      }
      setTimeout(() => setStatusMessage(null), 5000);
    });
  };

  // Reject Signed Contract File (Reason required, customer notified)
  const handleRejectSignedFile = () => {
    const reason = prompt('يرجى كتابة سبب عدم قبول النسخة الموقعة (سيتم إرساله للعميل بالبريد لإعادة الرفع):');
    if (reason === null) return;
    if (!reason.trim()) {
      alert('سبب الرفض مطلوب لإشعار العميل.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await rejectSignedFile({
          invoiceId: invoice.id,
          reason: reason.trim(),
        });
        if (res.success) {
          setInvoice((prev) => ({
            ...prev,
            status: 'sent',
          }));
          setStatusMessage({
            type: 'success',
            text: 'تم رفض النسخة وإعادة حالة المستند إلى "مرسل" وإشعار العميل بالبريد.',
          });
          router.refresh();
        } else {
          setStatusMessage({
            type: 'error',
            text: res.error || 'فشل في رفض النسخة الموقعة.',
          });
        }
      } catch {
        setStatusMessage({
          type: 'error',
          text: 'حدث خطأ أثناء رفض النسخة الموقعة.',
        });
      }
      setTimeout(() => setStatusMessage(null), 5000);
    });
  };

  // Upload Signed Document (Admin attachment)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('الحد الأقصى لحجم الملف المرفق هو 10 ميجابايت.');
      return;
    }

    setIsUploadingFile(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await uploadSignedFileAction({
          invoiceId: invoice.id,
          fileName: file.name,
          fileBase64: base64,
          contentType: file.type || 'application/pdf',
        });

        if (res.success) {
          setStatusMessage({
            type: 'success',
            text: 'تم رفع نسخة العقد الموقعة بنجاح.',
          });
          setInvoice((prev) => ({
            ...prev,
            status: 'uploaded',
            signing: {
              ...prev.signing,
              files: [
                ...(prev.signing?.files || []),
                {
                  name: file.name,
                  path: res.data?.path || '',
                  uploadedAt: new Date().toISOString(),
                },
              ],
            },
          }));
          router.refresh();
        } else {
          setStatusMessage({
            type: 'error',
            text: res.error || 'فشل في رفع نسخة العقد.',
          });
        }
        setIsUploadingFile(false);
        setTimeout(() => setStatusMessage(null), 4000);
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploadingFile(false);
      setStatusMessage({
        type: 'error',
        text: 'حدث خطأ أثناء قراءة الملف.',
      });
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  // Status Badge Rendering Helper
  const renderStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-700 border border-neutral-300">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>مسودة</span>
          </span>
        );
      case 'issued':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <Receipt className="w-3.5 h-3.5 text-sky-600" />
            <span>مصدرة</span>
          </span>
        );
      case 'sent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Send className="w-3.5 h-3.5 text-blue-600" />
            <span>مرسلة للعميل</span>
          </span>
        );
      case 'viewed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>بانتظار التوقيع</span>
          </span>
        );
      case 'uploaded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <UploadCloud className="w-3.5 h-3.5 text-amber-600" />
            <span>تم رفع العقد الموقع</span>
          </span>
        );
      case 'signed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>موقع ومعتمد</span>
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-[#29545c] border border-[#91B8C0]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#29545c]" />
            <span>مدفوع ومسدد</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>ملغي</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-neutral-100 text-neutral-600">
            <span>{status}</span>
          </span>
        );
    }
  };

  const isQuote = invoice.docKind === 'quote';
  const docNumber = invoice.number || 'مسودة غير مصدرة';

  const latestEmailFailedEvent = events.find((ev) => ev.type === 'email_failed');
  const hasEmailFailed = Boolean(
    latestEmailFailedEvent || invoice.signing?.emailFailed
  );

  return (
    <div className="space-y-6 pb-16" dir="rtl">
      {/* ──────────────── Top Navigation & Actions Bar ──────────────── */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5E9E8] shadow-2xs space-y-4 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/invoices"
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-black font-mono">
                  {docNumber}
                </h1>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    isQuote
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-teal-50 text-[#29545c] border border-teal-200'
                  }`}
                >
                  {isQuote ? 'عرض سعر وعقد' : 'عقد وفاتورة تجارية'}
                </span>
                {renderStatusBadge(invoice.status)}
              </div>
              <p className="text-xs text-[#5E6665] mt-0.5">
                المنشأة: {invoice.customer.facilityName} · المسؤول: {invoice.customer.name}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* If Draft: Edit Button */}
            {invoice.status === 'draft' && (
              <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
                <Button
                  variant="outline"
                  className="text-xs font-bold gap-1.5 h-9 border-[#29545c] text-[#29545c]"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>تعديل المسودة</span>
                </Button>
              </Link>
            )}

            {/* Print / Download */}
            <Button
              variant="outline"
              onClick={handlePrint}
              className="text-xs font-bold gap-1.5 h-9"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة / حفظ PDF</span>
            </Button>

            {/* Send / Resend Email */}
            <Button
              variant="outline"
              onClick={() => setShowEmailModal(true)}
              className="text-xs font-bold gap-1.5 h-9"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>إرسال بالبريد</span>
            </Button>

            {/* Copy Signing Link */}
            <Button
              variant="outline"
              onClick={handleCopySigningLink}
              className="text-xs font-bold gap-1.5 h-9"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>نسخ رابط التوقيع</span>
            </Button>

            {/* Mark as Paid */}
            {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
              <Button
                variant="primary"
                onClick={handleMarkPaid}
                disabled={isPending}
                className="text-xs font-bold gap-1.5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>تحديد كمدفوع</span>
              </Button>
            )}

            {/* Cancel Document */}
            {invoice.status !== 'cancelled' && invoice.status !== 'paid' && (
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isPending}
                className="text-xs font-bold gap-1.5 h-9 border-rose-300 text-rose-700 hover:bg-rose-50"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>إلغاء المستند</span>
              </Button>
            )}
          </div>
        </div>

        {/* Status Message Alert */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Email Failed Alert Banner with Resend Button */}
        {hasEmailFailed && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs font-bold">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <p className="text-rose-950 font-bold">تعذر إرسال المستند بالبريد الإلكتروني للعميل</p>
                <p className="text-[11px] text-rose-700 font-normal mt-0.5">
                  {latestEmailFailedEvent?.meta && typeof latestEmailFailedEvent.meta === 'object' && 'error' in latestEmailFailedEvent.meta
                    ? String((latestEmailFailedEvent.meta as { error?: string }).error)
                    : 'حدث خطأ أثناء محاولة إرسال البريد للعميل. يمكنك إعادة المحاولة الآن.'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEmailModal(true)}
              className="text-xs font-bold gap-1.5 h-8 border-rose-300 text-rose-800 hover:bg-rose-100 bg-white shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-rose-600" />
              <span>إعادة إرسال البريد</span>
            </Button>
          </div>
        )}
      </div>

      {/* ──────────────── Main Grid: Document & Side Panels ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rendered Document Column (8 cols) */}
        <div className="lg:col-span-8 print:w-full print:col-span-12">
          <div className="bg-white rounded-2xl border border-[#E5E9E8] shadow-xs p-4 sm:p-6 overflow-x-auto print:border-none print:shadow-none print:p-0">
            <InvoicePrintableDocument
              invoice={invoice}
              billingSettings={billingSettings}
            />
          </div>
        </div>

        {/* Side Details Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6 print:hidden">
          {/* Quick Summary Card */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-[#5E6665] uppercase tracking-wider">
              ملخص المطالبة المالية
            </h3>

            <div className="p-4 rounded-xl bg-[#FAFBFB] border border-[#E5E9E8] space-y-2">
              <div className="flex justify-between items-center text-xs text-[#5E6665]">
                <span>المجموع الأساسي:</span>
                <span className="font-mono text-black">
                  {formatHalalasAsSar(invoice.totals.subtotal)} ر.س
                </span>
              </div>

              {invoice.totals.discount > 0 && (
                <div className="flex justify-between items-center text-xs text-amber-700">
                  <span>الخصم المطبق:</span>
                  <span className="font-mono">
                    -{formatHalalasAsSar(invoice.totals.discount)} ر.س
                  </span>
                </div>
              )}

              {invoice.totals.vat > 0 && (
                <div className="flex justify-between items-center text-xs text-[#5E6665]">
                  <span>ضريبة القيمة المضافة ({invoice.vatRatePercent}%):</span>
                  <span className="font-mono text-black">
                    {formatHalalasAsSar(invoice.totals.vat)} ر.س
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-[#E5E9E8] flex justify-between items-center">
                <span className="text-xs font-bold text-black">الإجمالي المستحق:</span>
                <div className="flex items-baseline gap-1 font-mono font-black text-base text-[#29545c]">
                  <span>{formatHalalasAsSar(invoice.totals.total)}</span>
                  <SarIcon className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#5E6665]">
                <Calendar className="w-3.5 h-3.5" />
                <span>تاريخ الإصدار: {invoice.issueDate ? invoice.issueDate.split('T')[0] : '—'}</span>
              </div>
              {invoice.dueDate && (
                <div className="flex items-center gap-2 text-[#5E6665]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>الاستحقاق: {invoice.dueDate.split('T')[0]}</span>
                </div>
              )}
              {invoice.customer.phone && (
                <div className="flex items-center gap-2 text-[#5E6665]">
                  <User className="w-3.5 h-3.5" />
                  <span>الهاتف: {invoice.customer.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Signed Files & Upload Section */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-black flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#29545c]" />
                <span>النسخ والعقود الموقعة</span>
              </h3>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,image/png,image/jpeg"
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingFile}
                className="text-[11px] h-7 px-2.5 gap-1 border-dashed text-[#29545c]"
              >
                {isUploadingFile ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <UploadCloud className="w-3 h-3" />
                )}
                <span>رفع نسخة موقعة</span>
              </Button>
            </div>

            {/* Admin Review Action Banner for Uploaded Documents */}
            {invoice.status === 'uploaded' && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>نسخة موقعة بانتظار المراجعة والاعتماد</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  قام العميل برفع نسخة موقعة ومختومة عبر الرابط الآمن. يرجى مراجعة التوقيع والختم أدناه، ثم اعتماد العقد أو رفضه مع تحديد السبب.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleApproveSignedFile}
                    disabled={isPending}
                    className="text-xs font-bold gap-1.5 h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    )}
                    <span>اعتماد التوقيع والعقد</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectSignedFile}
                    disabled={isPending}
                    className="text-xs font-bold gap-1.5 h-8 border-rose-300 text-rose-700 hover:bg-rose-50"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>رفض النسخة الموقعة</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Approved Signed Status Banner */}
            {invoice.status === 'signed' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تم اعتماد وتوثيق النسخة الموقعة رسمياً</span>
                </div>
                {invoice.signing?.signedAt && (
                  <span className="text-[10px] text-emerald-700 font-mono">
                    {invoice.signing.signedAt.split('T')[0]}
                  </span>
                )}
              </div>
            )}

            {invoice.signing?.files && invoice.signing.files.length > 0 ? (
              <div className="space-y-3">
                {invoice.signing.files.map((file, idx) => {
                  const uploadEvent = events.find(
                    (ev) =>
                      ev.type === 'UPLOADED' &&
                      ((ev.meta as Record<string, unknown>)?.storagePath === file.path ||
                        (ev.meta as Record<string, unknown>)?.fileName === file.name ||
                        (ev.meta as Record<string, unknown>)?.fileName === file.name.split('/').pop())
                  );
                  const meta = (uploadEvent?.meta || {}) as {
                    ip?: string;
                    userAgent?: string;
                    fileSha256?: string;
                    fileSize?: number;
                    timestamp?: string;
                  };
                  const isExpanded = !!expandedEvidence[idx];
                  const isPreviewOpen = previewFileIdx === idx;
                  const isPdf =
                    file.name.toLowerCase().endsWith('.pdf') ||
                    file.path.toLowerCase().endsWith('.pdf');
                  const assetUrl = `/api/dashboard/billing/asset?path=${encodeURIComponent(
                    file.path
                  )}`;

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#E5E9E8] bg-[#FAFBFB] space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-[#29545c] shrink-0" />
                          <div className="truncate">
                            <div className="font-bold text-black truncate">
                              {file.name}
                            </div>
                            <div className="text-[10px] text-[#5E6665] flex items-center gap-2 font-mono">
                              <span>{file.uploadedAt ? file.uploadedAt.split('T')[0] : '—'}</span>
                              {meta.fileSize && (
                                <span>• {(meta.fileSize / 1024).toFixed(1)} KB</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Toggle Preview Button */}
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewFileIdx(isPreviewOpen ? null : idx)
                            }
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1 border ${
                              isPreviewOpen
                                ? 'bg-[#29545c] text-white border-[#29545c]'
                                : 'text-[#29545c] bg-white border-[#E5E9E8] hover:bg-[#E5E9E8]/40'
                            }`}
                            title="معاينة الملف المرفوع مباشرة"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isPreviewOpen ? 'إخفاء المعاينة' : 'معاينة'}</span>
                          </button>

                          {/* Toggle Audit Evidence Button */}
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedEvidence((prev) => ({
                                ...prev,
                                [idx]: !prev[idx],
                              }))
                            }
                            className="px-2 py-1 rounded-lg text-[10px] font-bold text-[#29545c] bg-white hover:bg-[#E5E9E8]/40 transition-colors flex items-center gap-1 border border-[#E5E9E8]"
                            title="عرض الأدلة الرقمية الموثقة"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>الأدلة</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>

                          {/* Download Button */}
                          <a
                            href={assetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white border border-[#E5E9E8] hover:bg-neutral-100 text-neutral-700 transition-colors"
                            title="تحميل الملف"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Authenticated Inline Preview (Streamed securely from Storage) */}
                      {isPreviewOpen && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-[#E5E9E8] bg-white shadow-2xs">
                          <div className="flex items-center justify-between px-3 py-1.5 bg-[#FAFBFB] border-b border-[#E5E9E8] text-[11px] font-semibold text-[#5E6665]">
                            <span className="flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5 text-[#29545c]" />
                              <span>معاينة المستند عبر اتصال آمن</span>
                            </span>
                            <a
                              href={assetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#29545c] hover:underline flex items-center gap-1"
                            >
                              <span>فتح في نافذة كاملة</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <div className="p-2 flex items-center justify-center bg-neutral-50/50">
                            {isPdf ? (
                              <iframe
                                src={assetUrl}
                                title={file.name}
                                className="w-full h-80 rounded-lg border border-[#E5E9E8] bg-white"
                              />
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={assetUrl}
                                alt={file.name}
                                className="max-h-72 w-auto object-contain rounded-lg border border-[#E5E9E8] bg-white"
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {/* Expandable Digital Evidence Block */}
                      {isExpanded && (
                        <div className="pt-2.5 mt-2 border-t border-[#E5E9E8] space-y-2 bg-white p-3 rounded-lg border border-[#E5E9E8]">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-[#29545c] flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              توثيق الأدلة الرقمية (Audit Evidence)
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-normal bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {uploadEvent?.by === 'customer'
                                ? 'رفع العميل عبر الرابط'
                                : `بواسطة: ${uploadEvent?.by || 'الإدارة'}`}
                            </span>
                          </div>

                          {meta.fileSha256 && (
                            <div className="space-y-1">
                              <span className="text-[10px] text-neutral-400 block font-medium">
                                البصمة الرقمية للملف (SHA-256):
                              </span>
                              <div className="flex items-center justify-between gap-1.5 bg-[#FAFBFB] p-1.5 rounded-md border border-[#E5E9E8] font-mono text-[10px] break-all">
                                <span className="text-black select-all">
                                  {meta.fileSha256}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(meta.fileSha256!);
                                    setCopiedSha(meta.fileSha256!);
                                    setTimeout(() => setCopiedSha(null), 3000);
                                  }}
                                  title="نسخ البصمة"
                                  className="p-1 hover:bg-neutral-200 rounded text-neutral-600 shrink-0"
                                >
                                  {copiedSha === meta.fileSha256 ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                            {meta.ip && (
                              <div className="p-1.5 rounded bg-[#FAFBFB] border border-[#E5E9E8]">
                                <span className="text-neutral-400 block">عنوان IP:</span>
                                <span className="font-mono text-black font-semibold">
                                  {meta.ip}
                                </span>
                              </div>
                            )}

                            {meta.fileSize && (
                              <div className="p-1.5 rounded bg-[#FAFBFB] border border-[#E5E9E8]">
                                <span className="text-neutral-400 block">حجم الملف:</span>
                                <span className="font-mono text-black font-semibold">
                                  {(meta.fileSize / 1024).toFixed(1)} KB
                                </span>
                              </div>
                            )}
                          </div>

                          {meta.userAgent && (
                            <div className="space-y-0.5 text-[10px]">
                              <span className="text-neutral-400 block">
                                متصفح ونظام الرافع (User-Agent):
                              </span>
                              <div className="bg-[#FAFBFB] p-1.5 rounded border border-[#E5E9E8] font-mono text-[9px] text-neutral-600 break-all leading-tight">
                                {meta.userAgent}
                              </div>
                            </div>
                          )}

                          {(meta.timestamp || uploadEvent?.at) && (
                            <div className="text-[10px] text-neutral-400 pt-1 flex justify-between items-center border-t border-neutral-100">
                              <span>توقيت التسجيل:</span>
                              <span className="font-mono text-neutral-600">
                                {(meta.timestamp || uploadEvent?.at || '')
                                  .replace('T', ' ')
                                  .slice(0, 19)}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 text-center text-xs text-[#5E6665]">
                لم يتم رفع أي نسخ موقعة ومختومة بعد
              </div>
            )}
          </div>

          {/* Status Timeline Card */}
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-black flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#29545c]" />
              <span>سجل الحالات والعمليات (Timeline)</span>
            </h3>

            {events.length === 0 ? (
              <div className="text-xs text-[#5E6665] text-center py-4">
                لا توجد أحداث مسجلة حتى الآن
              </div>
            ) : (
              <div className="relative pl-2 pr-4 space-y-4 before:absolute before:right-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E9E8]">
                {events.map((ev) => {
                  return (
                    <div key={ev.id} className="relative flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#29545c] ring-4 ring-white shrink-0 mt-1" />
                      <div className="text-xs space-y-0.5">
                        <div className="font-bold text-black">
                          {ev.type === 'DRAFT_CREATED' && 'إنشاء المسودة'}
                          {ev.type === 'DRAFT_UPDATED' && 'تحديث المسودة'}
                          {ev.type === 'ISSUED' && 'إصدار واعتماد المستند'}
                          {ev.type === 'SENT' && 'إرسال بريد إلكتروني للعميل'}
                          {ev.type === 'VIEWED' && 'معاينة العقد من الرابط'}
                          {ev.type === 'UPLOADED' && 'رفع نسخة موقعة'}
                          {ev.type === 'SIGNED' && 'توقيع العقد إلكترونياً'}
                          {ev.type === 'PAID' && 'تسجيل سداد الفاتورة'}
                          {ev.type === 'CANCELLED' && 'إلغاء المستند'}
                          {!['DRAFT_CREATED', 'DRAFT_UPDATED', 'ISSUED', 'SENT', 'VIEWED', 'UPLOADED', 'SIGNED', 'PAID', 'CANCELLED'].includes(ev.type) && ev.type}
                        </div>
                        <div className="text-[11px] text-[#5E6665]">
                          بواسطة: {ev.by}
                        </div>
                        <div className="text-[10px] text-neutral-400 font-mono">
                          {ev.at ? ev.at.replace('T', ' ').slice(0, 16) : '—'}
                        </div>
                        {ev.meta && typeof ev.meta === 'object' && Object.keys(ev.meta).length > 0 && (
                          <div className="text-[10px] text-neutral-500 bg-neutral-50 p-1.5 rounded-md mt-1">
                            {JSON.stringify(ev.meta)}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Send Email Modal Dialog */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5E9E8] p-6 max-w-md w-full shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-black">
              إرسال العقد والفاتورة بالبريد الإلكتروني
            </h3>
            <p className="text-xs text-[#5E6665]">
              سيتم إرسال نسخة رسمية معتمدة ورابط المستند مباشرة إلى عنوان البريد التالي:
            </p>
            <div>
              <label className="block text-xs font-bold text-[#5E6665] mb-1">
                البريد الإلكتروني للمستلم
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="client@example.com"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E5E9E8] focus:border-[#29545c] focus:outline-none font-sans"
                dir="ltr"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                onClick={() => setShowEmailModal(false)}
                className="text-xs"
              >
                إلغاء
              </Button>
              <Button
                variant="primary"
                onClick={handleSendEmail}
                disabled={isSendingEmail}
                className="text-xs font-bold gap-1.5 bg-[#29545c]"
              >
                {isSendingEmail ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>إرسال الآن</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
