'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Building2,
  CreditCard,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Save,
  PenTool,
  Stamp,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { saveBillingSettingsAction } from '@/server/actions/billing-settings';
import type { PlatformBillingSettings } from '@/lib/types/platform';

interface BillingSettingsClientViewProps {
  initialSettings: PlatformBillingSettings | null;
  locale?: string;
}

export function BillingSettingsClientView({
  initialSettings,
  locale = 'ar',
}: BillingSettingsClientViewProps) {
  const isAr = locale === 'ar';

  // Seller organization fields
  const [nameAr, setNameAr] = useState(initialSettings?.seller?.nameAr || '');
  const [nameEn, setNameEn] = useState(initialSettings?.seller?.nameEn || '');
  const [commercialRegNumber, setCommercialRegNumber] = useState(
    initialSettings?.seller?.commercialRegNumber || ''
  );
  const [vatNumber, setVatNumber] = useState(initialSettings?.seller?.vatNumber || '');
  const [address, setAddress] = useState(initialSettings?.seller?.address || '');
  const [email, setEmail] = useState(initialSettings?.seller?.email || '');
  const [phone, setPhone] = useState(initialSettings?.seller?.phone || '');

  // Banking fields
  const [bankName, setBankName] = useState(initialSettings?.seller?.bankName || '');
  const [accountName, setAccountName] = useState(initialSettings?.seller?.accountName || '');
  const [iban, setIban] = useState(initialSettings?.seller?.iban || '');

  // Invoicing preferences
  const [invoicePrefix, setInvoicePrefix] = useState(initialSettings?.invoicePrefix || 'INV');
  const [quotePrefix, setQuotePrefix] = useState(initialSettings?.quotePrefix || 'QUO');
  const [disclaimerLine, setDisclaimerLine] = useState(
    initialSettings?.disclaimerLine || 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.'
  );
  const [defaultDueDays, setDefaultDueDays] = useState<number>(
    initialSettings?.defaultDueDays || 14
  );

  // Asset paths and preview timestamps
  const [signaturePath, setSignaturePath] = useState<string | null>(
    initialSettings?.signaturePath || null
  );
  const [stampPath, setStampPath] = useState<string | null>(
    initialSettings?.stampPath || null
  );
  const [sigVersion, setSigVersion] = useState<number>(0);
  const [stampVersion, setStampVersion] = useState<number>(0);

  // Uploading state
  const [isUploadingSig, setIsUploadingSig] = useState(false);
  const [isUploadingStamp, setIsUploadingStamp] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Feedback message
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const sigFileInputRef = useRef<HTMLInputElement>(null);
  const stampFileInputRef = useRef<HTMLInputElement>(null);

  // Upload handler for signature / stamp
  const handleUploadAsset = async (
    file: File,
    type: 'signature' | 'stamp'
  ) => {
    setStatusMessage(null);

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setStatusMessage({
        type: 'error',
        text: 'حجم الملف يتجاوز 2 ميجابايت. يرجى اختيار ملف أصغر.',
      });
      return;
    }

    const isSig = type === 'signature';
    if (isSig) setIsUploadingSig(true);
    else setIsUploadingStamp(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const res = await fetch('/api/dashboard/billing/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'فشل في رفع الملف');
      }

      if (isSig) {
        setSignaturePath(data.path);
        setSigVersion((v) => v + 1);
        setStatusMessage({
          type: 'success',
          text: 'تم رفع ومعالجة التوقيع الرسمي المعتمد بنجاح!',
        });
      } else {
        setStampPath(data.path);
        setStampVersion((v) => v + 1);
        setStatusMessage({
          type: 'success',
          text: 'تم رفع ومعالجة الختم الرسمي للمنشأة بنجاح!',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء رفع الملف';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      if (isSig) setIsUploadingSig(false);
      else setIsUploadingStamp(false);
    }
  };

  // Form submission handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Sanitize & format IBAN
    const cleanIban = iban.replace(/\s+/g, '').toUpperCase();

    // Client-side quick assertions
    if (!cleanIban.startsWith('SA') || cleanIban.length !== 24) {
      setStatusMessage({
        type: 'error',
        text: 'صيغة الآيبان غير صحيحة. يجب أن يبدأ بـ SA متبوعاً بـ 22 رقماً (24 خانة إجمالاً).',
      });
      return;
    }

    if (!/^\d{10}$/.test(commercialRegNumber.trim())) {
      setStatusMessage({
        type: 'error',
        text: 'رقم السجل التجاري يجب أن يتكون من 10 أرقام.',
      });
      return;
    }

    if (vatNumber.trim().length > 0 && !/^\d{15}$/.test(vatNumber.trim())) {
      setStatusMessage({
        type: 'error',
        text: 'الرقم الضريبي للمنشأة يجب أن يتكون من 15 رقماً (أو اتركه فارغاً إذا لم تكن المنشأة مسجلة بالضريبة).',
      });
      return;
    }

    try {
      setIsSaving(true);

      const res = await saveBillingSettingsAction({
        seller: {
          nameAr: nameAr.trim(),
          nameEn: nameEn.trim(),
          commercialRegNumber: commercialRegNumber.trim(),
          vatNumber: vatNumber.trim(),
          address: address.trim(),
          email: email.trim(),
          phone: phone.trim(),
          bankName: bankName.trim(),
          accountName: accountName.trim(),
          iban: cleanIban,
        },
        signaturePath,
        stampPath,
        invoicePrefix: invoicePrefix.trim().toUpperCase() || 'INV',
        quotePrefix: quotePrefix.trim().toUpperCase() || 'QUO',
        disclaimerLine: disclaimerLine.trim() || 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.',
        defaultDueDays: Number(defaultDueDays) || 14,
      });

      if (!res.success) {
        setStatusMessage({
          type: 'error',
          text: res.error || 'فشل في حفظ إعدادات الفوترة.',
        });
        return;
      }

      setStatusMessage({
        type: 'success',
        text: 'تم حفظ وتحديث إعدادات الفوترة والبيانات البنكية الرسمية بنجاح!',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* ───────────────── Top Header ───────────────── */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/${locale}/dashboard/settings`}
              className="p-1.5 rounded-lg text-[#5E6665] hover:bg-[#F0F2F2] transition-colors"
              title="العودة للإعدادات العامة"
            >
              <ArrowRight className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
            </Link>
            <div className="w-8 h-8 rounded-xl bg-[#29545c]/10 text-[#29545c] flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-black text-[#0D1514]">
              إعدادات الفوترة والبيانات البنكية الرسمية (Billing Settings)
            </h1>
          </div>
          <p className="text-xs text-[#5E6665] ms-9">
            إدارة بيانات الطرف الأول (المنشأة المصدرة للفواتير)، الحساب البنكي المعتمد، والأختام والتواقيع الرقمية لعقود راش إكس.
          </p>
        </div>

        <div className="flex items-center gap-3 ms-9 md:ms-0">
          <Link
            href={`/${locale}/dashboard/invoices`}
            className="px-4 py-2 rounded-xl bg-[#F0F2F2] hover:bg-[#E5E9E8] text-xs font-bold text-[#0D1514] transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#29545c]" />
            <span>عرض الفواتير والعقود</span>
          </Link>
        </div>
      </div>

      {/* ───────────────── Feedback Alert ───────────────── */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border animate-fadeIn ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* ───────────────── Main Layout: Form + Live Preview ───────────────── */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Official Seller Info */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F0F2F2]">
              <Building2 className="w-4 h-4 text-[#29545c]" />
              <h2 className="text-sm font-bold text-[#0D1514]">
                بيانات المنشأة الرسمية (الطرف الأول - مُصدر الفاتورة)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  الاسم الرسمي للمنشأة (بالعربية) <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مؤسسة راش إكس للاتصالات وتقنية المعلومات"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  الاسم الرسمي (بالإنجليزية) <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="RASHX Information Technology Est."
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  رقم السجل التجاري (10 أرقام) <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  maxLength={10}
                  value={commercialRegNumber}
                  onChange={(e) => setCommercialRegNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="1010xxxxxx"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  الرقم الضريبي للمنشأة (VAT Number - 15 رقماً إن وجد)
                </label>
                <Input
                  type="text"
                  maxLength={15}
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="300xxxxxxxxxxxx (اختياري)"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                العنوان الوطني الرسمي <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="الرياض، طريق الملك فهد، المملكة العربية السعودية"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  البريد الإلكتروني للفوترة <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="billing@rashx.org"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  رقم هاتف المنشأة الرسمي <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 11 xxxx xxx"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Bank Account & IBAN */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F0F2F2]">
              <CreditCard className="w-4 h-4 text-[#29545c]" />
              <h2 className="text-sm font-bold text-[#0D1514]">
                الحساب البنكي المعتمد لتحويل الاشتراكات (Official Bank Account)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  اسم البنك المعتمد <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="مصرف الراجحي (Al Rajhi Bank)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  اسم صاحب الحساب الرسمي <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="مؤسسة راش إكس للاتصالات وتقنية المعلومات"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                رقم الآيبان البنكي (IBAN) <span className="text-rose-500">*</span>
              </label>
              <Input
                type="text"
                required
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                placeholder="SA44 8000 0000 0000 0000 0000"
                dir="ltr"
                className="font-mono text-sm tracking-wide"
              />
              <span className="text-[11px] text-[#5E6665] mt-1 block">
                يجب أن يبدأ بـ SA متبوعاً بـ 22 رقماً (صيغة الحسابات البنكية في المملكة).
              </span>
            </div>
          </div>

          {/* Section 3: Invoicing Defaults */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F0F2F2]">
              <Calendar className="w-4 h-4 text-[#29545c]" />
              <h2 className="text-sm font-bold text-[#0D1514]">
                خيارات ترقيم الفواتير وعروض الأسعار والاستحقاق
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  بادئة ترقيم الفواتير والعقود <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={invoicePrefix}
                  onChange={(e) => setInvoicePrefix(e.target.value.toUpperCase())}
                  placeholder="INV"
                  dir="ltr"
                  className="font-mono"
                />
                <span className="text-[11px] text-[#5E6665] mt-1 block">
                  مثال: INV-2026-1045
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  بادئة عروض الأسعار (Quote) <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  value={quotePrefix}
                  onChange={(e) => setQuotePrefix(e.target.value.toUpperCase())}
                  placeholder="QUO"
                  dir="ltr"
                  className="font-mono"
                />
                <span className="text-[11px] text-[#5E6665] mt-1 block">
                  مثال: QUO-2026-1045
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                  مدة الاستحقاق الافتراضية (بالأيام) <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="number"
                  min="1"
                  max="90"
                  required
                  value={defaultDueDays}
                  onChange={(e) => setDefaultDueDays(Number(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2A3332] mb-1.5">
                سطر التنويه القانوني في أسفل المستندات (PDF Disclaimer Line) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={disclaimerLine}
                onChange={(e) => setDisclaimerLine(e.target.value)}
                className="w-full text-xs rounded-xl border border-[#CCD4D3] bg-white p-3 text-[#0D1514] focus:outline-hidden focus:ring-2 focus:ring-[#29545c]"
                placeholder="هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء."
              />
              <span className="text-[11px] text-[#5E6665] mt-1 block">
                يظهر هذا السطر ثابتاً في تذييل ملف الـ PDF لجميع الفواتير وعروض الأسعار الصادرة.
              </span>
            </div>
          </div>

          {/* Section 4: Signature & Stamp Assets */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F0F2F2]">
              <ShieldCheck className="w-4 h-4 text-[#29545c]" />
              <h2 className="text-sm font-bold text-[#0D1514]">
                التوقيع المعتمد والختم الرسمي (تخزين خاص ومشفر عبر Admin SDK)
              </h2>
            </div>

            <p className="text-xs text-[#5E6665]">
              يقبل النظام ملفات PNG أو WebP بخلفية شفافة حتى 2 ميجابايت. تتم إزالة الحواف الشفافة آلياً وضبط الأبعاد لتظهر بدقة متناهية على الفواتير والعقود المولدة.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Box 1: Signature Upload */}
              <div className="p-4 rounded-2xl border border-dashed border-[#CCD4D3] bg-[#FAFBFB] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#0D1514] flex items-center gap-1.5">
                      <PenTool className="w-3.5 h-3.5 text-[#29545c]" />
                      التوقيع المعتمد (Signature)
                    </span>
                    {signaturePath && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        مرفوع
                      </span>
                    )}
                  </div>

                  <div className="h-28 bg-white rounded-xl border border-[#E5E9E8] flex items-center justify-center p-2 relative overflow-hidden mb-3">
                    {signaturePath ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/dashboard/billing/asset?type=signature&v=${sigVersion}`}
                        alt="Signature Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-[11px] text-[#8F9998]">لم يتم رفع التوقيع بعد</span>
                    )}
                  </div>
                </div>

                <input
                  type="file"
                  ref={sigFileInputRef}
                  accept="image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadAsset(file, 'signature');
                  }}
                />

                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploadingSig}
                  onClick={() => sigFileInputRef.current?.click()}
                  className="w-full text-xs font-bold gap-1.5"
                >
                  {isUploadingSig ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>جاري المعالجة والرفع...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>{signaturePath ? 'تغيير التوقيع' : 'رفع التوقيع (PNG/WebP)'}</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Box 2: Stamp Upload */}
              <div className="p-4 rounded-2xl border border-dashed border-[#CCD4D3] bg-[#FAFBFB] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#0D1514] flex items-center gap-1.5">
                      <Stamp className="w-3.5 h-3.5 text-[#29545c]" />
                      الختم الرسمي (Official Stamp)
                    </span>
                    {stampPath && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        مرفوع
                      </span>
                    )}
                  </div>

                  <div className="h-28 bg-white rounded-xl border border-[#E5E9E8] flex items-center justify-center p-2 relative overflow-hidden mb-3">
                    {stampPath ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/dashboard/billing/asset?type=stamp&v=${stampVersion}`}
                        alt="Stamp Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-[11px] text-[#8F9998]">لم يتم رفع الختم بعد</span>
                    )}
                  </div>
                </div>

                <input
                  type="file"
                  ref={stampFileInputRef}
                  accept="image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUploadAsset(file, 'stamp');
                  }}
                />

                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploadingStamp}
                  onClick={() => stampFileInputRef.current?.click()}
                  className="w-full text-xs font-bold gap-1.5"
                >
                  {isUploadingStamp ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>جاري المعالجة والرفع...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>{stampPath ? 'تغيير الختم' : 'رفع الختم (PNG/WebP)'}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-[#0D1514] hover:bg-[#1A2524] text-white text-xs font-bold flex items-center gap-2 rounded-xl shadow-xs cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#91B8C0]" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#91B8C0]" />
                  <span>حفظ إعدادات الفوترة</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* ───────────────── Right: Live Preview of Sample Invoice Footer (5 cols on lg) ───────────────── */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="p-4 rounded-2xl bg-[#91B8C0]/10 border border-[#91B8C0]/30 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#29545c]" />
            <span className="text-xs font-bold text-[#0D1514]">
              معاينة حية ومباشرة لتذييل الفاتورة والعقد (Live Invoice Footer)
            </span>
          </div>

          {/* Sample Invoice Footer Document Box */}
          <div
            dir="rtl"
            className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-md space-y-6 text-xs text-[#000000]"
            style={{
              fontFamily: "'Ping AR + LT', 'PingAR+LT', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {/* Header of preview */}
            <div className="pb-3 border-b border-[#91B8C0] flex justify-between items-center text-[11px]">
              <span className="font-bold text-[#29545c]">نموذج معاينة التذييل الرسمي</span>
              <span className="font-mono text-[10px] text-[#5E6665]">{invoicePrefix}-2026-0001</span>
            </div>

            {/* Live Bank Payment Details */}
            <div className="text-xs leading-relaxed space-y-1">
              <div className="text-[10px] font-bold text-[#5E6665] tracking-widest uppercase">
                PAYMENT DETAILS · تفاصيل الحساب البنكي المعتمد
              </div>
              {bankName && iban ? (
                <div className="p-3 rounded-xl bg-[#FAFBFB] border border-[#E5E9E8] space-y-0.5">
                  <div className="font-bold text-[#0D1514]">{bankName}</div>
                  <div className="text-[11px] text-[#5E6665]">الحساب: {accountName || '—'}</div>
                  <div className="text-xs font-mono font-bold text-[#0D1514]" dir="ltr">
                    {iban}
                  </div>
                  {vatNumber && (
                    <div className="text-[10px] text-[#5E6665] pt-0.5">
                      الرقم الضريبي للمنشأة: <span className="font-mono">{vatNumber}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-[11px] font-medium border border-rose-200">
                  خطأ: لم يتم ضبط إعدادات الفوترة البنكية (Missing billing settings)
                </div>
              )}
            </div>

            {/* Live Acceptance & Signature Section */}
            <div className="p-4 rounded-xl border border-[#CCD4D3] bg-[#FAFBFB] text-xs space-y-3">
              <div className="text-[10px] font-bold text-[#000000] flex justify-between items-center">
                <span>إقرار واعتماد العقد (CONTRACT ACCEPTANCE)</span>
                <span className="text-[9px] text-[#5E6665]">سريان العقد: سنة واحدة</span>
              </div>

              <p className="text-[10px] text-[#5E6665] leading-relaxed">
                يُعتبر هذا المستند عقداً ملزماً ونافذاً بمجرد التوقيع والختم المعتمد من الطرفين.
              </p>

              {/* Two Signature Boxes */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Party 1: RASHX Platform (Seller) */}
                <div className="border border-dashed border-[#CCD4D3] rounded-lg p-2.5 bg-white text-center relative overflow-hidden min-h-[110px] flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-bold text-[#5E6665] uppercase">
                      الطرف الأول (المنشأة المعتمدة)
                    </div>
                    <div className="text-[10px] font-bold text-[#000000] truncate">
                      {nameAr || 'منصة راش إكس (RASHX)'}
                    </div>
                  </div>

                  {/* Middle area with Stamp & Signature Overlays */}
                  <div className="h-14 relative flex items-center justify-center my-0.5">
                    {stampPath && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/dashboard/billing/asset?type=stamp&v=${stampVersion}`}
                        alt="Official Stamp"
                        className="absolute h-14 w-auto object-contain opacity-75 pointer-events-none transform -rotate-6"
                      />
                    )}
                    {signaturePath ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/dashboard/billing/asset?type=signature&v=${sigVersion}`}
                        alt="Authorized Signature"
                        className="relative z-10 h-10 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-[9px] font-bold text-[#29545c] border-b border-[#29545c] px-2 py-0.5 z-10">
                        معتمد رسمياً · RASHX HQ
                      </span>
                    )}
                  </div>

                  <div className="text-[9px] text-[#5E6665]">
                    التاريخ: {initialSettings?.updatedAt ? initialSettings.updatedAt.split('T')[0] : '2026-11-12'}
                  </div>
                </div>

                {/* Party 2: Client */}
                <div className="border border-dashed border-[#000000] rounded-lg p-2.5 bg-white text-center min-h-[110px] flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-bold text-[#000000] uppercase">
                      الطرف الثاني (الصالون المشترك)
                    </div>
                    <div className="text-[10px] font-bold text-[#000000]">المفوض بالتوقيع</div>
                  </div>
                  <div className="h-14 flex items-center justify-center border-y border-dashed border-neutral/60 text-[8px] text-[#8F9998] my-0.5">
                    [ توقيع وختم العميل ]
                  </div>
                  <div className="text-[8px] text-[#5E6665]">
                    التوقيع: ..... الختم: .....
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Line & Legal Disclaimer */}
            <div className="pt-2 border-t border-[#91B8C0] space-y-1.5">
              <div className="text-[9px] text-[#5E6665] text-center leading-relaxed">
                {disclaimerLine || 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.'}
              </div>
              <div className="border-t border-[#E5E9E8] pt-1.5 flex justify-between items-center text-[10px] text-[#5E6665]">
                <span>Thank you for your business · شكراً لتعاملكم مع راش إكس</span>
                <span className="font-bold text-[#0D1514]">RASHX</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
