import React from 'react';
import { Skeleton } from '@/components/ui';

export default function BillingSettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <Skeleton className="h-24 rounded-3xl" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <Skeleton className="h-80 rounded-3xl" />
          <Skeleton className="h-56 rounded-3xl" />
          <Skeleton className="h-64 rounded-3xl" />
        </div>
        <div className="lg:col-span-5">
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

