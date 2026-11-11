import React from 'react';
import { Skeleton } from '@/components/ui';

export default function LeadsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <Skeleton className="h-28 rounded-3xl" />

      {/* Search Input Skeleton */}
      <Skeleton className="h-10 w-72 rounded-2xl" />

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

