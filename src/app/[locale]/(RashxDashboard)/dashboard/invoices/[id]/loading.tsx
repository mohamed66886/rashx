import React from 'react';
import { Skeleton } from '@/components/ui';

export default function InvoiceDetailsLoading() {
  return (
    <div className="space-y-6 animate-pulse" dir="rtl">
      {/* Top Bar Skeleton */}
      <Skeleton className="h-16 w-full rounded-2xl" />

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Skeleton className="h-[900px] w-full rounded-2xl" />
        </div>
        <div className="lg:col-span-4 space-y-4">
          <Skeleton className="h-56 rounded-2xl" />
          <Skeleton className="h-44 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

