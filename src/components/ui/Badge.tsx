'use client';

import React from 'react';
import { X } from 'lucide-react';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-[#91B8C0] text-black font-bold shadow-2xs',
  secondary: 'bg-[#F0C5AE] text-black font-bold shadow-2xs',
  neutral: 'bg-[#E5E9E8] text-black font-medium',
  success: 'bg-emerald-100 text-emerald-800 font-semibold',
  warning: 'bg-amber-100 text-amber-800 font-semibold',
  danger: 'bg-red-100 text-red-700 font-semibold',
  outline: 'border border-[#E5E9E8] bg-white text-black font-medium',
};

const dotColors: Record<BadgeVariant, string> = {
  primary: 'bg-black',
  secondary: 'bg-black',
  neutral: 'bg-[#5E6665]',
  success: 'bg-emerald-600',
  warning: 'bg-amber-600',
  danger: 'bg-red-600',
  outline: 'bg-[#91B8C0]',
};

const sizeStyles: Record<BadgeSize, { badge: string; icon: string; dot: string }> = {
  sm: {
    badge: 'px-2 py-0.5 text-[10px] gap-1',
    icon: 'w-2.5 h-2.5',
    dot: 'w-1.5 h-1.5',
  },
  md: {
    badge: 'px-2.5 py-1 text-xs gap-1.5',
    icon: 'w-3 h-3',
    dot: 'w-2 h-2',
  },
  lg: {
    badge: 'px-3.5 py-1.5 text-sm gap-2',
    icon: 'w-3.5 h-3.5',
    dot: 'w-2.5 h-2.5',
  },
};

const roundedStyles = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  dotColor,
  removable = false,
  onRemove,
  rounded = 'full',
  className = '',
  children,
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center select-none transition-all ${
        variantStyles[variant]
      } ${sizeStyles[size].badge} ${roundedStyles[rounded]} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`rounded-full shrink-0 ${sizeStyles[size].dot} ${
            dotColor || dotColors[variant]
          }`}
        />
      )}
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="hover:opacity-75 focus:outline-none transition-opacity cursor-pointer -me-0.5"
          aria-label="إزالة"
        >
          <X className={sizeStyles[size].icon} />
        </button>
      )}
    </span>
  );
};

export default Badge;

