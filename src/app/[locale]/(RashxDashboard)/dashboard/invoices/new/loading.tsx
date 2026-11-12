import React from 'react';
import { Skeleton } from '@/components/ui';

export default function NewInvoiceLoading() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      {/* Top Bar Skeleton */}
      <Skeleton className="h-16 w-full rounded-2xl" />

      {/* Editor & Preview Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
        <div className="lg:col-span-5">
          <Skeleton className="h-[750px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

