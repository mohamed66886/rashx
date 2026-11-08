'use client';

import React, { useState, useRef, useEffect, useId } from 'react';
import { Search, Check, X } from 'lucide-react';
import { DropdownIcon } from './DropdownIcon';

export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps {
  label?: React.ReactNode;
  options?: SelectOption[];
  value?: string | number | (string | number)[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement> | { target: { value: any; name?: string } } | any) => void;
  onValueChange?: (value: any) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  sizeVariant?: SelectSize;
  fullWidth?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  name?: string;
  id?: string;
  containerClassName?: string;
  labelClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

const sizeStyles: Record<SelectSize, { trigger: string; icon: string; text: string }> = {
  sm: {
    trigger: 'px-2.5 py-1 text-xs rounded-lg h-8',
    icon: 'w-3.5 h-3.5',
    text: 'text-xs',
  },
  md: {
    trigger: 'px-3 py-1.5 text-sm rounded-xl h-9.5',
    icon: 'w-4 h-4',
    text: 'text-sm',
  },
  lg: {
    trigger: 'px-4 py-2.5 text-base rounded-xl h-11',
    icon: 'w-5 h-5',
    text: 'text-base',
  },
};

export const Select: React.FC<SelectProps> = ({
  label,
  options = [],
  value,
  onChange,
  onValueChange,
  placeholder = 'اختر من القائمة...',
  helperText,
  error,
  required = false,
  leftIcon,
  sizeVariant = 'md',
  fullWidth = true,
  searchable = true,
  disabled = false,
  multiple = false,
  name = '',
  id: customId,
  containerClassName = '',
  labelClassName = '',
  className = '',
  children,
}) => {
  const generatedId = useId();
  const selectId = customId || generatedId;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Parse options if children (e.g. <option>) passed instead of options array
  const parsedOptions: SelectOption[] = React.useMemo(() => {
    if (options && options.length > 0) return options;
    if (children) {
      const opts: SelectOption[] = [];
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === 'option') {
          const props = child.props as React.OptionHTMLAttributes<HTMLOptionElement>;
          opts.push({
            label: String(props.children || props.value || ''),
            value: String(props.value ?? ''),
            disabled: props.disabled,
          });
        }
      });
      return opts;
    }
    return [];
  }, [options, children]);

  // Selected Option Objects
  const selectedOptions = React.useMemo(() => {
    if (multiple) {
      const valArray = Array.isArray(value)
        ? value.map(String)
        : value !== undefined && value !== null && value !== ''
        ? [String(value)]
        : [];
      return parsedOptions.filter((opt) => valArray.includes(String(opt.value)));
    }
    const singleOpt = parsedOptions.find(
      (opt) => String(opt.value) === String(value)
    );
    return singleOpt ? [singleOpt] : [];
  }, [parsedOptions, value, multiple]);

  const triggerLabelText = React.useMemo(() => {
    if (selectedOptions.length === 0) return placeholder;
    if (multiple) {
      return selectedOptions.map((opt) => opt.label).join('، ');
    }
    return selectedOptions[0]?.label || placeholder;
  }, [selectedOptions, multiple, placeholder]);

  // Filtered Options for Search
  const filteredOptions = parsedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // Handle Close on Outside Click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Auto Focus Search Input on Open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleSelectOption = (opt: SelectOption) => {
    if (opt.disabled) return;
    if (multiple) {
      const currentValues = Array.isArray(value)
        ? value.map(String)
        : value !== undefined && value !== null && value !== ''
        ? [String(value)]
        : [];
      const optValStr = String(opt.value);
      const exists = currentValues.includes(optValStr);
      const nextValues = exists
        ? currentValues.filter((v) => v !== optValStr)
        : [...currentValues, optValStr];

      if (onValueChange) {
        onValueChange(nextValues);
      }
      if (onChange) {
        onChange({
          target: { value: nextValues, name },
        } as unknown as React.ChangeEvent<HTMLSelectElement>);
      }
    } else {
      setIsOpen(false);
      if (onValueChange) {
        onValueChange(opt.value);
      }
      if (onChange) {
        onChange({
          target: { value: opt.value, name },
        } as React.ChangeEvent<HTMLSelectElement>);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col gap-1 text-right ${
        fullWidth ? 'w-full' : ''
      } ${containerClassName}`}
    >
      {label && (
        <label
          htmlFor={selectId}
          className={`text-xs font-semibold text-gray-700 flex items-center gap-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      {/* Trigger Control */}
      <div className="relative flex items-center w-full">
        <button
          id={selectId}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-right flex items-center justify-between transition-colors duration-150 outline-none pr-2.5 pl-6 select-none
            ${sizeStyles[sizeVariant].trigger}
            ${leftIcon ? 'pl-8' : ''}
            ${
              disabled
                ? 'bg-[#f5f7f7] border border-[#E5E9E8] text-gray-400 cursor-not-allowed font-medium'
                : error
                ? 'bg-white border border-red-500 text-black focus:border-red-500'
                : isOpen
                ? 'bg-white border border-[#91B8C0] ring-2 ring-[#91B8C0]/25 text-black'
                : 'bg-white border border-[#E5E9E8] text-black hover:border-[#91B8C0]/60 focus:border-[#91B8C0]'
            }
            ${className}`}
        >
          <span
            className={`truncate ${
              selectedOptions.length > 0
                ? 'text-gray-800 font-normal'
                : 'text-gray-400 font-normal'
            }`}
          >
            {triggerLabelText}
          </span>
        </button>

        {/* Left Caret Arrow Icon matching SVG */}
        <div className="absolute left-2.5 inset-y-0 flex items-center justify-center text-gray-500 pointer-events-none">
          <DropdownIcon
            className={`${sizeStyles[sizeVariant].icon} transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Dropdown Popup Menu */}
      {isOpen && !disabled && (
        <div className="absolute top-full right-0 z-[99999] mt-1.5 min-w-full min-w-[140px] bg-white border border-[#E5E9E8] rounded-xl shadow-xl p-1.5 animate-fadeIn text-right">
          {/* Top Search Input inside Dropdown */}
          {searchable && (
            <div className="relative mb-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في القائمة..."
                className="w-full px-3 py-1.5 text-xs text-right bg-white border border-[#E5E9E8] rounded-lg outline-none focus:border-[#91B8C0] focus:ring-1 focus:ring-[#91B8C0]/20 text-black"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              )}
            </div>
          )}

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto space-y-1 scrollbar-thin">
            {placeholder && !searchQuery && (
              <div className="px-3 py-1.5 text-xs text-amber-600 font-medium border-b border-gray-100">
                اختر
              </div>
            )}

            {filteredOptions.length === 0 ? (
              <div className="px-3 py-3 text-xs text-center text-gray-400">
                لا توجد نتائج مطابقة
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = multiple
                  ? (Array.isArray(value) ? value.map(String) : []).includes(String(opt.value))
                  : String(opt.value) === String(value);
                return (
                  <div
                    key={String(opt.value)}
                    onClick={() => handleSelectOption(opt)}
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer select-none ${
                      opt.disabled
                        ? 'opacity-50 cursor-not-allowed bg-gray-50 text-[#5E6665]'
                        : isSelected
                        ? 'bg-[#91B8C0] text-black font-bold shadow-xs'
                        : 'text-black hover:bg-[#E5E9E8]/60'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>
      )}

      {!error && helperText && (
        <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
      )}
    </div>
  );
};

Select.displayName = 'Select';
export default Select;

