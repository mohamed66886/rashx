import React from 'react';
import { Skeleton } from '@/components/ui';

export default function InvoicesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <Skeleton className="h-28 rounded-3xl" />

      {/* KPI Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
      </div>

      {/* Form or Table Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5E9E8] p-6 space-y-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E5E9E8] p-6 space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

