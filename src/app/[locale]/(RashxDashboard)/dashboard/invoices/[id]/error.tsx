'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function InvoiceDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Invoice Details Error]:', error);
  }, [error]);

  return (
    <div className="p-8 my-6 rounded-3xl bg-white border border-[#E5E9E8] text-center flex flex-col items-center justify-center" dir="rtl">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-black text-black mb-1">
        تعذر تحميل تفاصيل العقد والفاتورة
      </h3>
      <p className="text-xs text-[#5E6665] max-w-sm mb-4">
        حدث خطأ أثناء جلب بيانات المستند أو سجل الأحداث. يرجى إعادة المحاولة.
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          onClick={() => reset()}
          className="gap-2 text-xs font-bold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة المحاولة</span>
        </Button>
        <Link href="/dashboard/invoices">
          <Button variant="outline" className="text-xs gap-1.5">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للفواتير</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

