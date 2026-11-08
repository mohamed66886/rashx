'use client';

import React, { createContext, useContext, useId } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name: customName,
      value: controlledValue,
      defaultValue,
      onValueChange,
      size = 'md',
      disabled = false,
      orientation = 'vertical',
      label,
      description,
      error,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const generatedName = useId();
    const groupName = customName || generatedName;
    const [internalValue, setInternalValue] = React.useState<string>(
      defaultValue || ''
    );

    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : internalValue;

    const handleChange = (val: string) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      onValueChange?.(val);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          name: groupName,
          value: activeValue,
          onChange: handleChange,
          size,
          disabled,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={`flex flex-col gap-2 text-right ${className}`}
          {...props}
        >
          {(label || description) && (
            <div className="mb-1">
              {label && (
                <span className="text-xs font-semibold text-black block">
                  {label}
                </span>
              )}
              {description && (
                <span className="text-[11px] text-[#5E6665] block mt-0.5">
                  {description}
                </span>
              )}
            </div>
          )}

          <div
            className={`flex ${
              orientation === 'horizontal'
                ? 'flex-wrap items-center gap-4'
                : 'flex-col gap-2.5'
            }`}
          >
            {children}
          </div>

          {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  size?: RadioSize;
}

const sizeConfig: Record<
  RadioSize,
  {
    outer: string;
    inner: string;
    text: string;
    desc: string;
  }
> = {
  sm: {
    outer: 'w-4 h-4',
    inner: 'w-2 h-2',
    text: 'text-xs',
    desc: 'text-[10px]',
  },
  md: {
    outer: 'w-5 h-5',
    inner: 'w-2.5 h-2.5',
    text: 'text-sm',
    desc: 'text-xs',
  },
  lg: {
    outer: 'w-6 h-6',
    inner: 'w-3 h-3',
    text: 'text-base',
    desc: 'text-xs',
  },
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      description,
      size: itemSize,
      disabled: itemDisabled,
      className = '',
      id: customId,
      ...props
    },
    ref
  ) => {
    const context = useContext(RadioGroupContext);
    const generatedId = useId();
    const radioId = customId || generatedId;

    const size = itemSize || context?.size || 'md';
    const disabled = itemDisabled ?? context?.disabled ?? false;
    const isChecked = context ? context.value === value : props.checked;
    const config = sizeConfig[size];

    const handleChange = () => {
      if (disabled) return;
      context?.onChange?.(value);
    };

    return (
      <label
        htmlFor={radioId}
        className={`inline-flex items-start gap-3 select-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <div className="relative inline-flex items-center shrink-0 mt-0.5">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            name={context?.name}
            value={value}
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />

          {/* Outer Ring */}
          <div
            className={`${config.outer} rounded-full border transition-all duration-150 flex items-center justify-center ${
              isChecked
                ? 'border-[#91B8C0] bg-white ring-2 ring-[#91B8C0]/25'
                : 'border-[#E5E9E8] bg-white hover:border-[#91B8C0]'
            } peer-focus-visible:ring-2 peer-focus-visible:ring-[#91B8C0]/40 ${className}`}
          >
            {/* Inner Dot */}
            {isChecked && (
              <div
                className={`${config.inner} rounded-full bg-[#91B8C0] transition-transform duration-150 scale-100`}
              />
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col text-right">
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
    );
  }
);
Radio.displayName = 'Radio';

export default Radio;

