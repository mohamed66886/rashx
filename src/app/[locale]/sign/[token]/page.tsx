import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { AlertCircle, Clock, XCircle, ShieldAlert } from 'lucide-react';
import { verifySigningToken } from '@/server/actions/signing';
import { SigningClientView } from '@/components/signing/SigningClientView';

export const instant = false;

export const metadata: Metadata = {
  title: 'توقيع المستند التجاري | راش إكس',
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  params: Promise<{
    locale: string;
    token: string;
  }>;
}

export default async function SignTokenPage({ params }: PageProps) {
  const { locale, token } = await params;
  const isAr = locale !== 'en';
  const dir = isAr ? 'rtl' : 'ltr';

  const verification = await verifySigningToken(token);

  if (!verification.valid || !verification.invoice) {
    let errorTitle = isAr
      ? 'رابط غير صالح أو منتهي الصلاحية'
      : 'Invalid or Expired Link';
    let errorMessage = isAr
      ? 'عذراً، الرابط المستخدم لتوقيع هذا المستند غير صالح أو قد انتهت صلاحيته. يرجى التواصل مع فريق راش إكس لتزويدكم برابط جديد.'
      : 'Sorry, the link used to review and sign this document is invalid or has expired. Please contact RASHX support for an updated link.';
    let Icon = AlertCircle;

    if (verification.error === 'cancelled') {
      errorTitle = isAr ? 'المستند ملغى' : 'Document Cancelled';
      errorMessage = isAr
        ? 'تم إلغاء هذا المستند التجاري من قبل الإدارة. يرجى مراجعة ممثل المبيعات أو إدارة المنصة لأي استفسارات.'
        : 'This document has been cancelled. Please contact your sales representative or platform support.';
      Icon = XCircle;
    } else if (verification.error === 'expired') {
      errorTitle = isAr ? 'انتهت صلاحية الرابط' : 'Link Expired';
      errorMessage = isAr
        ? 'انتهت فترة صلاحية هذا الرابط الأمني (30 يوماً). يرجى طلب إعادة إرسال رابط توقيع جديد.'
        : 'This secure signing link has expired (30-day validity). Please request a fresh link.';
      Icon = Clock;
    }

    return (
      <div
        dir={dir}
        className="min-h-screen bg-[#F8F9FA] text-[#0D1517] font-sans flex items-center justify-center p-4 selection:bg-[#91B8C0]/30"
      >
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E5E9E8] shadow-xs p-8 text-center space-y-6">
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

          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 mx-auto flex items-center justify-center">
            <Icon className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-lg font-black text-black">{errorTitle}</h1>
            <p className="text-xs text-[#5E6665] leading-relaxed">
              {errorMessage}
            </p>
          </div>

          <div className="pt-4 border-t border-[#E5E9E8] text-[11px] text-[#5E6665] flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-neutral-400" />
            <span>راش إكس لتقنية المعلومات – منصة إدارة المنشآت</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SigningClientView
      invoice={verification.invoice}
      token={token}
      locale={locale}
    />
  );
}
