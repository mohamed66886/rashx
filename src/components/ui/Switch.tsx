'use client';

import React, { useId } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: SwitchSize;
  error?: string;
  containerClassName?: string;
}

const sizeConfig: Record<
  SwitchSize,
  {
    track: string;
    thumb: string;
    translate: string;
    text: string;
    desc: string;
  }
> = {
  sm: {
    track: 'w-7.5 h-4.5',
    thumb: 'w-3.5 h-3.5',
    translate: 'translate-x-3',
    text: 'text-xs',
    desc: 'text-[10px]',
  },
  md: {
    track: 'w-10 h-6',
    thumb: 'w-4.5 h-4.5',
    translate: 'translate-x-4',
    text: 'text-sm',
    desc: 'text-xs',
  },
  lg: {
    track: 'w-12 h-7',
    thumb: 'w-5.5 h-5.5',
    translate: 'translate-x-5',
    text: 'text-base',
    desc: 'text-xs',
  },
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
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
    const switchId = customId || generatedId;
    const config = sizeConfig[size];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onCheckedChange?.(e.target.checked);
      onChange?.(e);
    };

    return (
      <div className={`flex flex-col gap-1 text-right select-none ${containerClassName}`}>
        <label
          htmlFor={switchId}
          className={`inline-flex items-start gap-3 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {/* Custom Switch Track & Thumb */}
          <div className="relative inline-flex items-center shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={switchId}
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              disabled={disabled}
              className="sr-only peer"
              {...props}
            />

            {/* Track */}
            <div
              className={`${config.track} rounded-full transition-colors duration-200 border border-[#E5E9E8] bg-[#E5E9E8] peer-checked:bg-[#91B8C0] peer-checked:border-[#91B8C0] peer-focus-visible:ring-2 peer-focus-visible:ring-[#91B8C0]/40 ${className}`}
            />

            {/* Thumb */}
            <div
              className={`absolute right-0.5 ${config.thumb} rounded-full bg-white shadow-xs transition-transform duration-200 peer-checked:-translate-x-full peer-checked:translate-x-[-2px] peer-checked:bg-black`}
            />
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

Switch.displayName = 'Switch';
export default Switch;

