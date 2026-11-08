'use client';

import React, { useState, useEffect, useRef, useId, useMemo, useCallback } from 'react';
import { Mail, Check, X, Sparkles } from 'lucide-react';
import { type InputSize } from './Input';
import { GridIcon, WandIcon } from './InputActionIcon';

export interface EmailInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | any) => void;
  onValueChange?: (value: string, isValid: boolean) => void;
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  required?: boolean;
  sizeVariant?: InputSize;
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  showValidationStatus?: boolean;
  leftIcon?: React.ReactNode;
  icon?: React.ReactNode;
  actionIconType?: 'grid' | 'wand';
  actionIcon?: React.ReactNode;
  onActionClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  actionTitle?: string;
  customDomains?: string[];
  containerClassName?: string;
  labelClassName?: string;
}

const COMMON_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
  'yahoo.com',
  'hlaqa.sa',
];

// RFC 5322 standard practical email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const sizeStyles: Record<
  InputSize,
  {
    container: string;
    input: string;
    icon: string;
    badge: string;
  }
> = {
  sm: {
    container: 'h-8 rounded-lg',
    input: 'px-2.5 py-1 text-xs',
    icon: 'w-3.5 h-3.5',
    badge: 'w-4 h-4 text-[10px]',
  },
  md: {
    container: 'h-9.5 rounded-xl',
    input: 'px-3 py-1.5 text-sm',
    icon: 'w-4 h-4',
    badge: 'w-4.5 h-4.5 text-xs',
  },
  lg: {
    container: 'h-11 rounded-xl',
    input: 'px-4 py-2.5 text-base',
    icon: 'w-5 h-5',
    badge: 'w-5 h-5 text-sm',
  },
};

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      value = '',
      onChange,
      onValueChange,
      label,
      helperText,
      error,
      required = false,
      sizeVariant = 'md',
      fullWidth = true,
      clearable = true,
      onClear,
      showValidationStatus = true,
      leftIcon: leftIconProp,
      icon: iconProp,
      actionIconType = 'grid',
      actionIcon,
      onActionClick,
      actionTitle = 'تنفيذ إجراء',
      customDomains = COMMON_DOMAINS,
      placeholder = 'name@example.com',
      disabled = false,
      containerClassName = '',
      labelClassName = '',
      className = '',
      id: customId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const [inputValue, setInputValue] = useState<string>(value);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Sync from outer value
    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Validation
    const isValid = useMemo(() => {
      if (!inputValue) return false;
      return EMAIL_REGEX.test(inputValue.trim());
    }, [inputValue]);

    // Compute domain suggestions when user types '@'
    const suggestions = useMemo(() => {
      if (!inputValue || !inputValue.includes('@')) return [];
      const [username, typedDomain = ''] = inputValue.split('@');
      if (!username) return [];

      // If domain already has a full valid suffix, stop showing
      if (typedDomain.includes('.') && typedDomain.split('.')[1]?.length >= 2) {
        return [];
      }

      return customDomains
        .filter((d) => d.toLowerCase().startsWith(typedDomain.toLowerCase()))
        .map((d) => `${username}@${d}`);
    }, [inputValue, customDomains]);

    // Click outside to dismiss dropdown
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setShowSuggestions(false);
          setActiveSuggestionIndex(-1);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const triggerChange = useCallback(
      (newVal: string) => {
        setInputValue(newVal);
        const valid = EMAIL_REGEX.test(newVal.trim());
        onValueChange?.(newVal, valid);

        if (onChange) {
          const syntheticEvent = {
            target: { value: newVal },
            currentTarget: { value: newVal },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      },
      [onChange, onValueChange]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      const valid = EMAIL_REGEX.test(val.trim());
      onChange?.(e);
      onValueChange?.(val, valid);

      if (val.includes('@') && !val.endsWith('.com') && !val.endsWith('.sa')) {
        setShowSuggestions(true);
        setActiveSuggestionIndex(-1);
      } else {
        setShowSuggestions(false);
      }
    };

    const handleSelectSuggestion = (suggestedEmail: string) => {
      triggerChange(suggestedEmail);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      inputRef.current?.focus();
    };

    const handleClear = () => {
      triggerChange('');
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      onClear?.();
      inputRef.current?.focus();
    };

    // Keyboard navigation in suggestions list
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (showSuggestions && suggestions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveSuggestionIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveSuggestionIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
          return;
        }
        if ((e.key === 'Enter' || e.key === 'Tab') && activeSuggestionIndex >= 0) {
          e.preventDefault();
          handleSelectSuggestion(suggestions[activeSuggestionIndex]);
          return;
        }
        if (e.key === 'Escape') {
          setShowSuggestions(false);
          setActiveSuggestionIndex(-1);
          return;
        }
      }
      props.onKeyDown?.(e);
    };

    const currentSize = sizeStyles[sizeVariant];
    const hasValue = Boolean(inputValue);

    let defaultIcon: React.ReactNode = null;
    if (onActionClick) {
      const iconClass = currentSize.icon;
      if (actionIconType === 'wand') {
        defaultIcon = <WandIcon className={iconClass} />;
      } else {
        defaultIcon = <GridIcon className={iconClass} />;
      }
    }

    const activeIcon = actionIcon || defaultIcon;
    const startIcon = leftIconProp || iconProp || <Mail className={currentSize.icon} />;

    // Determine how many badges/buttons are placed on the right (in LTR)
    let rightElementsCount = 0;
    if (showValidationStatus && hasValue && isValid) rightElementsCount++;
    if (clearable && hasValue && !disabled) rightElementsCount++;
    if (activeIcon) rightElementsCount++;

    let rightPaddingClass = 'pr-3';
    if (rightElementsCount === 1) {
      rightPaddingClass = 'pr-8';
    } else if (rightElementsCount === 2) {
      rightPaddingClass = 'pr-14';
    } else if (rightElementsCount >= 3) {
      rightPaddingClass = 'pr-20';
    }

    return (
      <div
        ref={containerRef}
        className={`relative flex flex-col gap-1 text-right ${
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

        <div
          dir="ltr"
          className={`relative flex items-center w-full transition-all duration-150 ${
            currentSize.container
          } ${
            disabled
              ? 'bg-[#f5f7f7] border border-[#E5E9E8] text-gray-400 cursor-not-allowed font-medium'
              : error
              ? 'bg-white border border-red-500 text-black focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/20'
              : 'bg-white border border-[#E5E9E8] text-black hover:border-[#91B8C0]/60 focus-within:border-[#91B8C0] focus-within:ring-2 focus-within:ring-[#91B8C0]/25'
          }`}
        >
          {/* Start Icon */}
          <div className="ps-2.5 pe-1.5 flex items-center justify-center text-[#5E6665] pointer-events-none shrink-0">
            {startIcon}
          </div>

          {/* Email input field */}
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }}
            id={inputId}
            type="email"
            dir="ltr"
            value={inputValue}
            disabled={disabled}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (inputValue.includes('@') && suggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder={placeholder}
            className={`w-full h-full bg-transparent outline-none text-left text-black placeholder:text-[#5E6665]/60 font-normal ${
              currentSize.input
            } ${rightPaddingClass} ${
              disabled ? 'cursor-not-allowed text-gray-400' : ''
            } ${className}`}
            {...props}
          />

          {/* End Action Badges (Validation Status, Clear, & Action Button) */}
          <div className="absolute right-2.5 inset-y-0 flex items-center gap-1.5 shrink-0">
            {showValidationStatus && hasValue && isValid && (
              <span
                title="بريد إلكتروني صالح ✓"
                className={`flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 ${currentSize.badge}`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}

            {clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="مسح البريد الإلكتروني"
                title="مسح"
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-sm focus:outline-none cursor-pointer"
                tabIndex={-1}
              >
                <X className={currentSize.icon} />
              </button>
            )}

            {activeIcon && (
              <button
                type="button"
                onClick={onActionClick}
                disabled={disabled}
                title={actionTitle}
                className="flex items-center justify-center text-[#5E6665] hover:text-[#91B8C0] bg-transparent transition-colors focus:outline-none cursor-pointer"
              >
                {activeIcon}
              </button>
            )}
          </div>
        </div>

        {/* Domain Auto-Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && !disabled && (
          <div
            dir="rtl"
            className="absolute z-50 top-full mt-1.5 start-0 end-0 bg-white border border-[#E5E9E8] rounded-xl shadow-lg overflow-hidden py-1.5 animate-in fade-in zoom-in-95"
          >
            <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-[#5E6665] border-b border-[#E5E9E8]/60 select-none mb-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#91B8C0]" />
                اقتراحات إكمال النطاق الذكي
              </span>
              <span className="text-[10px] text-[#5E6665] font-normal">اضغط للتعبئة</span>
            </div>

            <div className="max-h-44 overflow-y-auto space-y-0.5 px-1">
              {suggestions.map((sug, idx) => {
                const isSelected = idx === activeSuggestionIndex;
                return (
                  <button
                    key={sug}
                    type="button"
                    dir="ltr"
                    onMouseEnter={() => setActiveSuggestionIndex(idx)}
                    onClick={() => handleSelectSuggestion(sug)}
                    className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                      isSelected
                        ? 'bg-[#91B8C0]/15 text-[#1e464e] font-bold'
                        : 'text-black hover:bg-[#E5E9E8]/50'
                    }`}
                  >
                    <span className="font-mono text-black">{sug}</span>
                    <span className="text-[10px] text-[#5E6665]">إكمال تلقائي</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>
        )}

        {/* Helper text */}
        {!error && helperText && (
          <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
        )}
      </div>
    );
  }
);

EmailInput.displayName = 'EmailInput';
export default EmailInput;
