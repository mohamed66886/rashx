'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error caught an unhandled exception:', error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#F8FAFB] text-[#0D1514] font-sans antialiased flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-neutral-200/80 rounded-2xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-amber-500/5">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#0D1514] mb-2">
            حدث خطأ غير متوقع في النظام
          </h2>

          <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
            واجه الخادم مشكلة أثناء معالجة الطلب. تم تسجيل هذا الخطأ ويمكنك محاولة إعادة التحميل.
          </p>

          {error.digest && (
            <div className="mb-6 px-3 py-2 rounded-lg bg-neutral-100 text-xs font-mono text-neutral-600 break-all select-all">
              <span className="font-semibold text-neutral-700">Digest:</span> {error.digest}
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D1514] text-white text-sm font-bold shadow-sm hover:bg-neutral-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة المحاولة</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

