import React from 'react';
import { Skeleton } from '@/components/ui';

export default function DashboardLoading() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-pulse">
      {/* 1. Welcome Banner Skeleton */}
      <div className="h-44 sm:h-48 rounded-2xl sm:rounded-3xl bg-neutral-200" />

      {/* 2. Metrics 4-tile Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Skeleton className="h-28 sm:h-32 rounded-2xl" />
        <Skeleton className="h-28 sm:h-32 rounded-2xl" />
        <Skeleton className="h-28 sm:h-32 rounded-2xl" />
        <Skeleton className="h-28 sm:h-32 rounded-2xl" />
      </div>

      {/* 3. Main Content Grid Skeleton */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2 space-y-3">
          <Skeleton className="h-80 sm:h-96 rounded-2xl lg:rounded-3xl" />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <Skeleton className="h-64 rounded-2xl lg:rounded-3xl" />
          <Skeleton className="h-36 rounded-2xl lg:rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

