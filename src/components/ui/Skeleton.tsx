'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className = '', rounded = 'xl', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`animate-pulse bg-[#E5E9E8] ${roundedMap[rounded]} ${className}`}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';

export interface SkeletonTextProps {
  lines?: number;
  gap?: string;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  gap = 'gap-2',
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${gap} w-full ${className}`}>
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={`h-3.5 ${
            idx === lines - 1 && lines > 1 ? 'w-3/5' : 'w-full'
          }`}
          rounded="md"
        />
      ))}
    </div>
  );
};

export default Skeleton;

