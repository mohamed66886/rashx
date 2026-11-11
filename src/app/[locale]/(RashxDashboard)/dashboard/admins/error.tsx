'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Admins Error Boundary]:', error);
  }, [error]);

  return (
    <div className="p-8 my-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs text-center flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-black text-[#0D1514] mb-1">
        تعذر تحميل بيانات فريق الإدارة
      </h3>
      <p className="text-xs text-[#5E6665] max-w-sm mb-4">
        حدث خطأ أثناء جلب قائمة مسؤولي المنظومة. يرجى المحاولة مرة أخرى.
      </p>
      {error.digest && (
        <div className="mb-4 px-2.5 py-1 rounded-md bg-neutral-100 text-[11px] font-mono text-[#5E6665]">
          Digest: {error.digest}
        </div>
      )}
      <Button
        variant="primary"
        onClick={() => reset()}
        className="gap-2 text-xs font-bold shadow-xs"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>إعادة المحاولة (Retry)</span>
      </Button>
    </div>
  );
}

