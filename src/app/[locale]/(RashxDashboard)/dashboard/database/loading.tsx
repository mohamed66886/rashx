import React from 'react';
import { Skeleton } from '@/components/ui';

export default function DatabaseLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <Skeleton className="h-28 rounded-3xl" />

      {/* Tabs Skeleton */}
      <div className="flex gap-4 border-b border-[#E5E9E8] pb-3">
        <Skeleton className="h-6 w-36 rounded-lg" />
        <Skeleton className="h-6 w-36 rounded-lg" />
        <Skeleton className="h-6 w-36 rounded-lg" />
      </div>

      {/* Content Skeleton */}
      <div className="bg-white rounded-3xl border border-[#E5E9E8] p-6 space-y-4">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  );
}

