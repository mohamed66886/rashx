'use client';

import React, { useId, useEffect, useRef } from 'react';
import { Check, Minus } from 'lucide-react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: CheckboxSize;
  error?: string;
  containerClassName?: string;
}

const sizeConfig: Record<
  CheckboxSize,
  {
    box: string;
    icon: string;
    text: string;
    desc: string;
  }
> = {
  sm: {
    box: 'w-4 h-4 rounded-md',
    icon: 'w-3 h-3',
    text: 'text-xs',
    desc: 'text-[10px]',
  },
  md: {
    box: 'w-5 h-5 rounded-md',
    icon: 'w-3.5 h-3.5',
    text: 'text-sm',
    desc: 'text-xs',
  },
  lg: {
    box: 'w-6 h-6 rounded-lg',
    icon: 'w-4.5 h-4.5',
    text: 'text-base',
    desc: 'text-xs',
  },
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      indeterminate = false,
      onCheckedChange,
      onChange,
      label,
      description,
      size = 'md',
      disabled = false,
      error,
      className = '',
      containerClassName = '',
      id: customId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = customId || generatedId;
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;
    const config = sizeConfig[size];

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onCheckedChange?.(e.target.checked);
      onChange?.(e);
    };

    const isChecked = checked ?? defaultChecked ?? false;

    return (
      <div className={`flex flex-col gap-1 text-right select-none ${containerClassName}`}>
        <label
          htmlFor={checkboxId}
          className={`inline-flex items-start gap-3 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {/* Custom Checkbox Container */}
          <div className="relative inline-flex items-center shrink-0 mt-0.5">
            <input
              ref={resolvedRef}
              type="checkbox"
              id={checkboxId}
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              disabled={disabled}
              className="sr-only peer"
              {...props}
            />

            {/* Checkbox Box */}
            <div
              className={`${config.box} border transition-all duration-150 flex items-center justify-center ${
                error
                  ? 'border-red-500 bg-white'
                  : isChecked || indeterminate
                  ? 'bg-[#91B8C0] border-[#91B8C0] text-black shadow-2xs'
                  : 'bg-white border-[#E5E9E8] hover:border-[#91B8C0]'
              } peer-focus-visible:ring-2 peer-focus-visible:ring-[#91B8C0]/40 ${className}`}
            >
              {indeterminate ? (
                <Minus className={`${config.icon} text-black stroke-[3]`} />
              ) : isChecked ? (
                <Check className={`${config.icon} text-black stroke-[3]`} />
              ) : null}
            </div>
          </div>

          {/* Label & Description */}
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span className={`font-semibold text-black ${config.text}`}>
                  {label}
                </span>
              )}
              {description && (
                <span className={`text-[#5E6665] mt-0.5 ${config.desc}`}>
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {error && <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;

