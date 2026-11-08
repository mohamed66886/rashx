'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'ghost'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#91B8C0] hover:bg-[#7fa4ac] text-black font-bold shadow-xs focus:ring-[#91B8C0]/40 active:bg-[#70959d]',
  secondary:
    'bg-[#F0C5AE] hover:bg-[#e0b59e] text-black font-semibold shadow-xs focus:ring-[#F0C5AE]/40 active:bg-[#d4a790]',
  outline:
    'border border-[#E5E9E8] bg-white hover:bg-[#E5E9E8]/60 text-black focus:ring-[#91B8C0]/20 active:bg-[#E5E9E8]',
  danger:
    'bg-red-600 hover:bg-red-700 text-white shadow-xs focus:ring-red-500/30 active:bg-red-800',
  destructive:
    'bg-red-600 hover:bg-red-700 text-white shadow-xs focus:ring-red-500/30 active:bg-red-800',
  success:
    'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs focus:ring-emerald-500/30 active:bg-emerald-800',
  warning:
    'bg-[#F0C5AE] hover:bg-[#e0b59e] text-black border border-[#e0b59e] focus:ring-[#F0C5AE]/30 active:bg-[#d4a790]',
  ghost:
    'bg-transparent hover:bg-[#E5E9E8]/60 text-black focus:ring-[#91B8C0]/20 active:bg-[#E5E9E8]',
  link:
    'bg-transparent text-black hover:text-[#91B8C0] hover:underline p-0 focus:ring-0 shadow-none font-semibold',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-4.5 py-2 text-sm gap-2',
  lg: 'px-6 py-2.5 text-base gap-2.5',
};

const roundedStyles: Record<ButtonRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      rounded = 'xl',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      className = '',
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isBtnDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isBtnDisabled}
        className={`inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${
          variantStyles[variant]
        } ${sizeStyles[size]} ${roundedStyles[rounded]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

