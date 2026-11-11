import React from 'react';
import { Skeleton } from '@/components/ui';

export default function TenantsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <Skeleton className="h-28 rounded-3xl" />

      {/* Filter Bar Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-72 rounded-2xl" />
        <Skeleton className="h-6 w-28 rounded-xl" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-3xl border border-[#E5E9E8] p-6 space-y-4">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

