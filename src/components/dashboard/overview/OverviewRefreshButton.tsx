'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

export function OverviewRefreshButton({ isAr }: { isAr: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={isPending}
      aria-label={isAr ? 'تحديث البيانات' : 'Refresh data'}
      title={isAr ? 'تحديث البيانات' : 'Refresh data'}
      className="grid place-items-center w-9 h-9 rounded-xl border border-neutral text-ink-muted hover:text-ink hover:bg-primary/10 hover:border-primary/50 disabled:opacity-60 transition-colors"
    >
      <RefreshCw className={`w-4 h-4 ${isPending ? 'animate-spin' : ''}`} />
    </button>
  );
}

