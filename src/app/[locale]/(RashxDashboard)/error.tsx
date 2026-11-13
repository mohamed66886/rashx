'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDashboardHref } from '@/lib/dashboard-links';

export default function DashboardRootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dHref = useDashboardHref();
  useEffect(() => {
    console.error('Dashboard root error boundary caught an exception:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4 ring-8 ring-amber-500/5">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-ink mb-2">
        تعذر تحميل لوحة التحكم
      </h2>

      <p className="text-sm text-ink-muted max-w-md mb-6 leading-relaxed">
        حدث خطأ أثناء تحميل لوحة التحكم المركزية أو التحقق من هوية المسؤول. يرجى إعادة المحاولة أو العودة لصفحة تسجيل الدخول.
      </p>

      {error.digest && (
        <div className="mb-6 px-3 py-1.5 rounded-lg bg-neutral-100 text-xs font-mono text-ink-muted break-all select-all max-w-md">
          <span className="font-semibold text-ink">Digest:</span> {error.digest}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="primary"
          onClick={() => reset()}
          className="gap-2 font-bold shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>إعادة المحاولة</span>
        </Button>

        <Link href={dHref('/login')}>
          <Button variant="outline" className="gap-2">
            <LayoutDashboard className="w-4 h-4" />
            <span>تسجيل الدخول</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

