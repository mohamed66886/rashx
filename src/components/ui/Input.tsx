'use client';

import React, { useId } from 'react';
import { X } from 'lucide-react';
import { GridIcon, WandIcon } from './InputActionIcon';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  sizeVariant?: InputSize;
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  actionIconType?: 'grid' | 'wand';
  actionIcon?: React.ReactNode;
  onActionClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  actionPosition?: 'left' | 'right';
  actionTitle?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const sizeStyles: Record<InputSize, { input: string; icon: string }> = {
  sm: {
    input: 'px-2.5 py-1 text-xs rounded-lg h-8',
    icon: 'w-3.5 h-3.5',
  },
  md: {
    input: 'px-3 py-1.5 text-sm rounded-xl h-9.5',
    icon: 'w-4 h-4',
  },
  lg: {
    input: 'px-4 py-2.5 text-base rounded-xl h-11',
    icon: 'w-5 h-5',
  },
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      leftIcon: leftIconProp,
      rightIcon,
      icon,
      sizeVariant = 'md',
      fullWidth = true,
      clearable = false,
      onClear,
      actionIconType = 'grid',
      actionIcon,
      onActionClick,
      actionPosition = 'left',
      actionTitle = 'تنفيذ إجراء',
      containerClassName = '',
      labelClassName = '',
      className = '',
      value,
      disabled,
      id: customId,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const hasValue = value !== undefined && value !== null && value !== '';
    const leftIcon = leftIconProp || icon;

    let defaultIcon: React.ReactNode = null;
    if (onActionClick) {
      const iconClass = sizeStyles[sizeVariant].icon;
      if (actionIconType === 'wand') {
        defaultIcon = <WandIcon className={iconClass} />;
      } else {
        defaultIcon = <GridIcon className={iconClass} />;
      }
    }

    const activeIcon = actionIcon || defaultIcon;
    const hasLeftAction = activeIcon && actionPosition === 'left';
    const hasRightAction = activeIcon && actionPosition === 'right';

    return (
      <div
        className={`flex flex-col gap-1 text-right ${
          fullWidth ? 'w-full' : ''
        } ${containerClassName}`}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={`text-xs font-semibold text-black flex items-center gap-1 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {/* Left Icon or Left Action Button */}
          {hasLeftAction ? (
            <button
              type="button"
              onClick={onActionClick}
              disabled={disabled}
              title={actionTitle}
              className="absolute left-2.5 inset-y-0 my-auto flex items-center justify-center text-[#5E6665] hover:text-[#91B8C0] bg-transparent transition-colors focus:outline-none z-10"
            >
              {activeIcon}
            </button>
          ) : leftIcon ? (
            <div className="absolute left-2.5 inset-y-0 flex items-center justify-center text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          ) : null}

          <input
            ref={ref}
            id={inputId}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className={`w-full text-right transition-all duration-150 outline-none placeholder:text-[#5E6665]/60 font-normal
              ${sizeStyles[sizeVariant].input}
              ${leftIcon || hasLeftAction ? 'pl-8' : ''}
              ${rightIcon || hasRightAction || (clearable && hasValue) ? 'pr-8' : ''}
              ${
                disabled
                  ? 'bg-[#f5f7f7] border border-[#E5E9E8] text-gray-400 cursor-not-allowed font-medium'
                  : error
                  ? 'bg-white border border-red-500 text-black focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                  : 'bg-white border border-[#E5E9E8] text-black focus:border-[#91B8C0] focus:ring-2 focus:ring-[#91B8C0]/25'
              }
              ${className}`}
            {...props}
          />

          {/* Clear Button */}
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              onClick={onClear}
              className={`absolute inset-y-0 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors p-1 ${
                hasLeftAction ? 'left-9' : 'left-2.5'
              }`}
              tabIndex={-1}
            >
              <X className={sizeStyles[sizeVariant].icon} />
            </button>
          )}

          {/* Right Icon or Right Action Button */}
          {hasRightAction ? (
            <button
              type="button"
              onClick={onActionClick}
              disabled={disabled}
              title={actionTitle}
              className="absolute right-2.5 inset-y-0 my-auto flex items-center justify-center text-[#5E6665] hover:text-[#91B8C0] bg-transparent transition-colors focus:outline-none z-10"
            >
              {activeIcon}
            </button>
          ) : rightIcon && !clearable ? (
            <div className="absolute right-3 inset-y-0 flex items-center justify-center text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>
        )}

        {!error && helperText && (
          <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;

