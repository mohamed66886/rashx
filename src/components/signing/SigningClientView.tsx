'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  FileText,
  Download,
  UploadCloud,
  Camera,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Building2,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import type { PlatformInvoice, InvoiceSigningFile } from '@/lib/types/billing';
import { formatHalalasAsSar } from '@/lib/types/billing';
import {
  recordViewAction,
  requestUploadUrlAction,
  confirmUploadAction,
} from '@/server/actions/signing';

interface SigningClientViewProps {
  invoice: PlatformInvoice;
  token: string;
  locale: string;
}

export function SigningClientView({ invoice, token, locale }: SigningClientViewProps) {
  const isAr = locale !== 'en';
  const dir = isAr ? 'rtl' : 'ltr';

  const [files, setFiles] = useState<InvoiceSigningFile[]>(
    invoice.signing?.files || []
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Record initial view event on mount (evidence: IP, User Agent, timestamp)
  useEffect(() => {
    recordViewAction(token).catch((err) => {
      console.warn('[SigningClientView] recordViewAction failed:', err);
    });
  }, [token]);

  // Handle direct-to-storage upload
  const handleFilesSelected = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    const selectedFiles = Array.from(fileList);

    // Limit check: max 5 files total
    if (files.length + selectedFiles.length > 5) {
      setErrorMessage(
        isAr
          ? 'الحد الأقصى المسموح به هو 5 ملفات لكل مستند.'
          : 'Maximum allowed is 5 files per contract.'
      );
      return;
    }

    const MAX_SIZE = 15 * 1024 * 1024; // 15MB
    const ALLOWED_TYPES = new Set([
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
    ]);

    setIsUploading(true);
    setUploadProgress(10);

    const uploadedNewFiles: InvoiceSigningFile[] = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        // 1. Validate file size
        if (file.size > MAX_SIZE) {
          throw new Error(
            isAr
              ? `الملف "${file.name}" يتجاوز الحد الأقصى المسموح به (15 ميجابايت).`
              : `File "${file.name}" exceeds the maximum 15MB limit.`
          );
        }

        // 2. Validate MIME type
        if (!ALLOWED_TYPES.has(file.type)) {
          throw new Error(
            isAr
              ? `صيغة الملف "${file.name}" غير مدعومة. الصيغ المقبولة: PDF, JPG, PNG, WebP.`
              : `File format for "${file.name}" is not supported. Allowed: PDF, JPG, PNG, WebP.`
          );
        }

        // 3. Request signed direct upload URL
        setUploadStatusText(
          isAr
            ? `جاري تحضير الرفع الآمن (${file.name})...`
            : `Preparing secure direct upload (${file.name})...`
        );
        setUploadProgress(25 + Math.round((i / selectedFiles.length) * 20));

        const uploadUrlRes = await requestUploadUrlAction(token, {
          name: file.name,
          size: file.size,
          type: file.type,
        });

        if (!uploadUrlRes.success || !uploadUrlRes.data) {
          throw new Error(
            uploadUrlRes.error ||
              (isAr
                ? 'تعذر الحصول على رابط الرفع الآمن.'
                : 'Failed to obtain secure upload URL.')
          );
        }

        const { uploadUrl, storagePath } = uploadUrlRes.data;

        // 4. Browser directly PUTs to Storage
        setUploadStatusText(
          isAr
            ? `جاري رفع الملف إلى التخزين الآمن (${file.name})...`
            : `Uploading directly to secure storage (${file.name})...`
        );
        setUploadProgress(50 + Math.round((i / selectedFiles.length) * 25));

        const putResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        if (!putResponse.ok) {
          throw new Error(
            isAr
              ? `فشل رفع الملف "${file.name}" إلى وحدة التخزين.`
              : `Direct upload failed for "${file.name}".`
          );
        }

        // 5. Confirm upload with server (checks existence, magic bytes, SHA-256)
        setUploadStatusText(
          isAr
            ? `جاري التحقق من سلامة المستند والبصمة الرقمية (${file.name})...`
            : `Verifying document integrity and SHA-256 hash (${file.name})...`
        );
        setUploadProgress(85);

        const confirmRes = await confirmUploadAction(token, storagePath, {
          name: file.name,
          size: file.size,
        });

        if (!confirmRes.success) {
          throw new Error(
            confirmRes.error ||
              (isAr
                ? 'فشل التحقق من صحة الملف المرفوع.'
                : 'File integrity verification failed.')
          );
        }

        uploadedNewFiles.push({
          name: file.name,
          path: storagePath,
          uploadedAt: new Date().toISOString(),
        });
      }

      setFiles((prev) => [...prev, ...uploadedNewFiles]);
      setUploadProgress(100);
      setSuccessMessage(
        isAr
          ? 'تم استلام وتوثيق النسخة الموقعة بنجاح! شكراً لتعاملكم مع راش إكس.'
          : 'Signed document uploaded and verified successfully! Thank you for partnering with RASHX.'
      );
    } catch (err: unknown) {
      console.error('[SigningClientView] Upload error:', err);
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsUploading(false);
      setUploadStatusText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }
  };

  const docTitle =
    invoice.docKind === 'quote'
      ? isAr
        ? 'عرض سعر وعقد تجاري'
        : 'Commercial Quotation & Agreement'
      : isAr
      ? 'عقد وفاتورة تجارية'
      : 'Commercial Contract & Invoice';

  const downloadUrl = `/api/sign/download?token=${encodeURIComponent(token)}`;

  return (
    <div
      dir={dir}
      className="min-h-screen bg-[#F8F9FA] text-[#0D1517] font-sans py-8 px-4 sm:px-6 lg:px-8 selection:bg-[#91B8C0]/30"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center justify-center">
            <Image
              src="/brand/logo/lockup-bilingual/lockup-bilingual-black.svg"
              alt="RASHX"
              width={160}
              height={44}
              priority
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#E5E9E8] text-[#29545c]">
              {docTitle}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-black">
              {isAr ? 'مراجعة وتوقيع المستند' : 'Review & Sign Document'}
            </h1>
            <p className="text-xs text-[#5E6665] max-w-md mx-auto">
              {isAr
                ? 'يرجى مراجعة تفاصيل العقد والفاتورة، وتحميل النسخة الرسمية لتوقيعها وختمها، ثم إعادة رفعها هنا لتوثيقها.'
                : 'Please review the contract details, download the PDF to sign and stamp it, then upload the signed copy here.'}
            </p>
          </div>
        </div>

        {/* Invoice Summary Card */}
        <div className="bg-white rounded-3xl border border-[#E5E9E8] shadow-xs p-6 space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#E5E9E8]">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#5E6665] uppercase tracking-wider">
                {isAr ? 'رقم المستند' : 'Document Number'}
              </span>
              <div className="text-lg font-black font-mono text-black">
                {invoice.number || `DRAFT-${invoice.id.slice(0, 8)}`}
              </div>
            </div>

            <div className="text-left sm:text-right space-y-0.5">
              <span className="text-[11px] font-bold text-[#5E6665] uppercase tracking-wider">
                {isAr ? 'الإجمالي المستحق' : 'Total Amount'}
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#29545c] font-mono">
                {formatHalalasAsSar(invoice.totals.total)}{' '}
                <span className="text-xs font-sans text-neutral-500">
                  {isAr ? 'ر.س' : 'SAR'}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-[#E5E9E8] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#E5E9E8] flex items-center justify-center shrink-0 text-[#29545c]">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-[#5E6665] block">
                  {isAr ? 'المنشأة المستفيدة' : 'Facility Name'}
                </span>
                <span className="font-bold text-black truncate block">
                  {invoice.customer.facilityName || '—'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-[#E5E9E8] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#E5E9E8] flex items-center justify-center shrink-0 text-[#29545c]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-[#5E6665] block">
                  {isAr ? 'تاريخ الإصدار' : 'Issue Date'}
                </span>
                <span className="font-bold text-black block">
                  {invoice.issueDate ? invoice.issueDate.split('T')[0] : '—'}
                </span>
              </div>
            </div>

            {invoice.dueDate && (
              <div className="p-3.5 rounded-2xl bg-[#FAFBFB] border border-[#E5E9E8] flex items-center gap-3 sm:col-span-2">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E5E9E8] flex items-center justify-center shrink-0 text-[#29545c]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-[#5E6665] block">
                    {isAr ? 'تاريخ الاستحقاق' : 'Due Date'}
                  </span>
                  <span className="font-bold text-black block">
                    {invoice.dueDate.split('T')[0]}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action 1: Download Contract PDF */}
          <div className="pt-2">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-black hover:bg-neutral-800 text-white font-bold text-sm transition-all shadow-sm active:scale-[0.99]"
            >
              <Download className="w-4 h-4" />
              <span>
                {isAr
                  ? 'تحميل وقراءة المستند المعتمد (PDF)'
                  : 'Download Approved Contract (PDF)'}
              </span>
            </a>
            <p className="text-[11px] text-[#5E6665] text-center mt-2">
              {isAr
                ? 'يحتوي المستند على البنود والشروط والتفاصيل البنكية وتوقيع وخاتم المنصة.'
                : 'Contains terms, conditions, bank details, and official RASHX digital signatures.'}
            </p>
          </div>
        </div>

        {/* Action 2: Upload Signed Copy Section */}
        <div className="bg-white rounded-3xl border border-[#E5E9E8] shadow-xs p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-black flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#29545c]" />
              <span>
                {isAr
                  ? 'رفع النسخة الموقّعة والمختومة'
                  : 'Upload Signed & Stamped Copy'}
              </span>
            </h2>
            <p className="text-xs text-[#5E6665]">
              {isAr
                ? 'بعد طباعة وتوقيع أو ختم المستند، قم بالتقاط صورة بكاميرا هاتفك أو رفع ملف المستند (PDF أو صور JPG/PNG/WebP حتى 15 ميجابايت).'
                : 'After signing or stamping the document, capture a photo or upload files (PDF, JPG, PNG, WebP up to 15MB each).'}
            </p>
          </div>

          {/* Hidden file inputs */}
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="application/pdf,image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => handleFilesSelected(e.target.files)}
          />

          {/* Upload Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl border-2 border-dashed border-[#91B8C0] hover:border-[#29545c] bg-[#FAFBFB] hover:bg-[#F2F6F7] text-[#29545c] font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Camera className="w-4 h-4 text-[#29545c]" />
              <span>
                {isAr ? 'التقاط صورة بكاميرا الجوال' : 'Take a Photo with Camera'}
              </span>
            </button>

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl border-2 border-dashed border-[#91B8C0] hover:border-[#29545c] bg-[#FAFBFB] hover:bg-[#F2F6F7] text-[#29545c] font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="w-4 h-4 text-[#29545c]" />
              <span>
                {isAr ? 'اختيار ملف من جهازك' : 'Choose File from Device'}
              </span>
            </button>
          </div>

          {/* Upload Progress Status */}
          {isUploading && (
            <div className="p-4 rounded-2xl bg-[#F0F5F6] border border-[#91B8C0]/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#29545c]">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{uploadStatusText || (isAr ? 'جاري الرفع...' : 'Uploading...')}</span>
                </div>
                <span className="font-mono">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E9E8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#29545c] transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Alerts: Error & Success */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <h3 className="text-xs font-bold text-black flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {isAr
                    ? `الملفات المرفوعة والموثقة (${files.length})`
                    : `Uploaded & Verified Files (${files.length})`}
                </span>
              </h3>

              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl border border-[#E5E9E8] bg-[#FAFBFB] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-black block truncate">
                          {file.name}
                        </span>
                        <span className="text-[10px] text-[#5E6665] block">
                          {file.uploadedAt ? file.uploadedAt.split('T')[0] : '—'}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      {isAr ? 'تم الاستلام' : 'Received'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security & Authenticity Footer */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5E9E8] flex items-center justify-center gap-2 text-center text-[11px] text-[#5E6665]">
          <ShieldCheck className="w-4 h-4 text-[#29545c] shrink-0" />
          <span>
            {isAr
              ? 'اتصال مشفر وآمن عبر منصة راش إكس – جميع الملفات تُفحص وتُحفظ بأعلى معايير التشفير'
              : 'Encrypted & secure connection by RASHX platform – all files verified and securely stored'}
          </span>
        </div>
      </div>
    </div>
  );
}

