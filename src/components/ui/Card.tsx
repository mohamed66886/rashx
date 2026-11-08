'use client';

import React from 'react';

export type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  accent?: 'none' | 'primary' | 'secondary';
  rounded?: CardRounded;
  bordered?: boolean;
  shadow?: 'none' | '2xs' | 'xs' | 'sm' | 'md';
}

const roundedMap: Record<CardRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

const shadowMap: Record<NonNullable<CardProps['shadow']>, string> = {
  none: 'shadow-none',
  '2xs': 'shadow-2xs',
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = '',
      hoverable = false,
      accent = 'none',
      rounded = 'xl',
      bordered = true,
      shadow = 'none',
      children,
      ...props
    },
    ref
  ) => {
    const accentBorder =
      accent === 'primary'
        ? 'border-t-2 border-t-[#91B8C0]'
        : accent === 'secondary'
        ? 'border-t-2 border-t-[#F0C5AE]'
        : '';

    const roundedClass = roundedMap[rounded] || 'rounded-xl';
    const shadowClass = shadowMap[shadow] || 'shadow-none';
    const borderClass = bordered ? 'border border-[#E5E9E8]/70' : '';

    return (
      <div
        ref={ref}
        className={`${roundedClass} ${borderClass} bg-white text-black ${shadowClass} transition-all overflow-hidden ${
          hoverable ? 'hover:border-[#91B8C0]/60 hover:shadow-xs' : ''
        } ${accentBorder} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`p-5 border-b border-[#E5E9E8]/60 flex flex-col gap-1 ${className}`}
    {...props}
  >
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = '', children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-base font-bold text-black tracking-tight leading-none ${className}`}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', children, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-xs text-[#5E6665] leading-relaxed ${className}`}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`p-5 ${className}`} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`p-5 border-t border-[#E5E9E8]/60 bg-[#E5E9E8]/10 flex items-center justify-between ${className}`}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

export default Card;

