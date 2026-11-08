'use client';

import React, { useState, useEffect, useRef, useId, useMemo } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import {
  AsYouType,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  isSupportedCountry,
  getCountries,
  type CountryCode,
} from 'libphonenumber-js';
import { type InputSize } from './Input';
import { GridIcon, WandIcon } from './InputActionIcon';

export interface Country {
  code: string;
  dialCode: string;
  nameAr: string;
  nameEn: string;
  flagSvg: string;
}

export interface PhoneValue {
  countryCode: string;
  dialCode: string;
  nationalNumber: string;
  fullNumber: string;
  isPossible: boolean;
  isValid: boolean;
}

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (fullNumber: string, isValid: boolean, phoneValue: PhoneValue) => void;
  defaultCountry?: string;
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  required?: boolean;
  sizeVariant?: InputSize;
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  showValidationStatus?: boolean;
  actionIconType?: 'grid' | 'wand';
  actionIcon?: React.ReactNode;
  onActionClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  actionTitle?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const PRIORITY_COUNTRIES = ['SA', 'AE', 'KW', 'BH', 'QA', 'OM', 'EG', 'JO'];

function getLocalCountryName(code: string, locale: string): string {
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code;
  } catch {
    return code;
  }
}

function loadCountries(): Country[] {
  const mapped = getCountries()
    .map((code): Country => {
      let dialCode = '';
      try {
        dialCode = `+${getCountryCallingCode(code)}`;
      } catch {
        // Skip invalid calling code
      }

      return {
        code,
        dialCode,
        nameAr: getLocalCountryName(code, 'ar'),
        nameEn: getLocalCountryName(code, 'en'),
        flagSvg: `https://flagcdn.com/${code.toLowerCase()}.svg`,
      };
    })
    .filter((country) => country.dialCode.startsWith('+'));

  mapped.sort((a, b) => {
    const aPriority = PRIORITY_COUNTRIES.indexOf(a.code);
    const bPriority = PRIORITY_COUNTRIES.indexOf(b.code);

    if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;

    return a.nameAr.localeCompare(b.nameAr, 'ar');
  });

  return mapped;
}

function CountryFlag({ country, className = '' }: { country: Country; className?: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    if (country.code === 'SA') return <span className={`text-sm select-none ${className}`}>🇸🇦</span>;
    if (country.code === 'AE') return <span className={`text-sm select-none ${className}`}>🇦🇪</span>;
    if (country.code === 'KW') return <span className={`text-sm select-none ${className}`}>🇰🇼</span>;
    if (country.code === 'BH') return <span className={`text-sm select-none ${className}`}>🇧🇭</span>;
    if (country.code === 'QA') return <span className={`text-sm select-none ${className}`}>🇶🇦</span>;
    if (country.code === 'OM') return <span className={`text-sm select-none ${className}`}>🇴🇲</span>;
    if (country.code === 'EG') return <span className={`text-sm select-none ${className}`}>🇪🇬</span>;
    if (country.code === 'JO') return <span className={`text-sm select-none ${className}`}>🇯🇴</span>;

    return (
      <span
        className={`inline-flex items-center justify-center text-[10px] font-bold bg-[#E5E9E8] text-[#5E6665] rounded px-1 select-none ${className}`}
      >
        {country.code}
      </span>
    );
  }

  return (
    <img
      src={country.flagSvg}
      alt={`${country.nameEn} flag`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`inline-block shrink-0 object-cover rounded-xs shadow-xs ${className}`}
    />
  );
}

const sizeStyles: Record<
  InputSize,
  {
    container: string;
    input: string;
    flag: string;
    icon: string;
    badge: string;
  }
> = {
  sm: {
    container: 'h-8 rounded-lg',
    input: 'pl-2.5 py-1 text-xs',
    flag: 'w-4 h-3',
    icon: 'w-3.5 h-3.5',
    badge: 'w-4 h-4 text-[10px]',
  },
  md: {
    container: 'h-9.5 rounded-xl',
    input: 'pl-3 py-1.5 text-sm',
    flag: 'w-5 h-3.5',
    icon: 'w-4 h-4',
    badge: 'w-4.5 h-4.5 text-xs',
  },
  lg: {
    container: 'h-11 rounded-xl',
    input: 'pl-4 py-2.5 text-base',
    flag: 'w-6 h-4',
    icon: 'w-5 h-5',
    badge: 'w-5 h-5 text-sm',
  },
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value = '',
      onChange,
      onValueChange,
      defaultCountry = 'SA',
      label,
      helperText,
      error,
      required = false,
      sizeVariant = 'md',
      fullWidth = true,
      clearable = true,
      onClear,
      showValidationStatus = true,
      actionIconType = 'grid',
      actionIcon,
      onActionClick,
      actionTitle = 'تنفيذ إجراء',
      placeholder = '50 000 0000',
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

    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCode, setSelectedCode] = useState(defaultCountry.toUpperCase());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [nationalNumber, setNationalNumber] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Load country metadata locally
    useEffect(() => {
      const list = loadCountries();
      setCountries(list);
    }, []);

    const selectedCountry = useMemo(
      () =>
        countries.find((c) => c.code === selectedCode) ||
        countries.find((c) => c.code === defaultCountry.toUpperCase()) || {
          code: 'SA',
          dialCode: '+966',
          nameAr: 'المملكة العربية السعودية',
          nameEn: 'Saudi Arabia',
          flagSvg: 'https://flagcdn.com/sa.svg',
        },
      [countries, selectedCode, defaultCountry]
    );

    // Parse incoming value
    useEffect(() => {
      if (!value) {
        setNationalNumber('');
        return;
      }

      if (value.startsWith('+')) {
        const parsed = parsePhoneNumberFromString(value);
        if (parsed?.country) {
          setSelectedCode(parsed.country);
          setNationalNumber(parsed.nationalNumber);
        } else {
          // If starts with dial code of selected country
          if (value.startsWith(selectedCountry.dialCode)) {
            setNationalNumber(value.slice(selectedCountry.dialCode.length).trim());
          } else {
            setNationalNumber(value.replace(/\D/g, ''));
          }
        }
      } else {
        setNationalNumber(value.replace(/\D/g, ''));
      }
    }, [value, selectedCountry.dialCode]);

    // Validation
    const phoneValue: PhoneValue = useMemo(() => {
      const full = nationalNumber
        ? `${selectedCountry.dialCode}${nationalNumber.replace(/^0+/, '')}`
        : '';
      let isPossible = false;
      let isValid = false;

      if (nationalNumber && isSupportedCountry(selectedCountry.code)) {
        try {
          const parsed = parsePhoneNumberFromString(
            nationalNumber,
            selectedCountry.code as CountryCode
          );
          if (parsed) {
            isPossible = parsed.isPossible();
            isValid = parsed.isValid();
          }
        } catch {
          // ignore
        }
      }

      return {
        countryCode: selectedCountry.code,
        dialCode: selectedCountry.dialCode,
        nationalNumber,
        fullNumber: full,
        isPossible,
        isValid,
      };
    }, [nationalNumber, selectedCountry]);

    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsDropdownOpen(false);
          setSearchQuery('');
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when popover opens
    useEffect(() => {
      if (isDropdownOpen) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    }, [isDropdownOpen]);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const digits = raw.replace(/\D/g, '');

      // Check if user pasted an international number starting with '+'
      if (raw.startsWith('+')) {
        const parsed = parsePhoneNumberFromString(raw);
        if (parsed?.country) {
          setSelectedCode(parsed.country);
          const asYouType = new AsYouType(parsed.country as CountryCode);
          const formatted = asYouType.input(parsed.nationalNumber);
          setNationalNumber(formatted);
          const full = parsed.number;
          const valid = parsed.isValid();
          onValueChange?.(full, valid, {
            countryCode: parsed.country,
            dialCode: `+${parsed.countryCallingCode}`,
            nationalNumber: parsed.nationalNumber,
            fullNumber: full,
            isPossible: parsed.isPossible(),
            isValid: valid,
          });
          return;
        }
      }

      // Format as you type for current country
      let formatted = digits;
      if (isSupportedCountry(selectedCountry.code)) {
        try {
          const asYouType = new AsYouType(selectedCountry.code as CountryCode);
          formatted = asYouType.input(digits);
        } catch {
          formatted = digits;
        }
      }

      setNationalNumber(formatted);
      const cleanDigits = digits.replace(/^0+/, '');
      const full = cleanDigits ? `${selectedCountry.dialCode}${cleanDigits}` : '';

      let valid = false;
      let possible = false;
      if (cleanDigits && isSupportedCountry(selectedCountry.code)) {
        const parsed = parsePhoneNumberFromString(cleanDigits, selectedCountry.code as CountryCode);
        valid = parsed?.isValid() || false;
        possible = parsed?.isPossible() || false;
      }

      const pVal: PhoneValue = {
        countryCode: selectedCountry.code,
        dialCode: selectedCountry.dialCode,
        nationalNumber: digits,
        fullNumber: full,
        isPossible: possible,
        isValid: valid,
      };

      onValueChange?.(full, valid, pVal);

      if (onChange) {
        const synthetic = {
          target: { value: full },
          currentTarget: { value: full },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(synthetic);
      }
    };

    const handleSelectCountry = (country: Country) => {
      setSelectedCode(country.code);
      setIsDropdownOpen(false);
      setSearchQuery('');

      const cleanDigits = nationalNumber.replace(/\D/g, '').replace(/^0+/, '');
      const full = cleanDigits ? `${country.dialCode}${cleanDigits}` : '';

      let valid = false;
      let possible = false;
      if (cleanDigits && isSupportedCountry(country.code)) {
        const parsed = parsePhoneNumberFromString(cleanDigits, country.code as CountryCode);
        valid = parsed?.isValid() || false;
        possible = parsed?.isPossible() || false;
      }

      onValueChange?.(full, valid, {
        countryCode: country.code,
        dialCode: country.dialCode,
        nationalNumber: cleanDigits,
        fullNumber: full,
        isPossible: possible,
        isValid: valid,
      });

      inputRef.current?.focus();
    };

    const handleClear = () => {
      setNationalNumber('');
      onValueChange?.('', false, {
        countryCode: selectedCountry.code,
        dialCode: selectedCountry.dialCode,
        nationalNumber: '',
        fullNumber: '',
        isPossible: false,
        isValid: false,
      });
      onClear?.();
      inputRef.current?.focus();
    };

    const filteredCountries = useMemo(() => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return countries;
      return countries.filter(
        (c) =>
          c.nameAr.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q) ||
          c.dialCode.includes(q) ||
          c.code.toLowerCase().includes(q)
      );
    }, [countries, searchQuery]);

    const currentSize = sizeStyles[sizeVariant];
    const hasValue = Boolean(nationalNumber);

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

    // Determine how many badges/buttons are placed on the right (in LTR)
    let rightElementsCount = 0;
    if (showValidationStatus && hasValue && phoneValue.isValid) rightElementsCount++;
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

        {/* Input Wrapper */}
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
          {/* Country Trigger Button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 h-full border-r border-[#E5E9E8] hover:bg-[#E5E9E8]/40 transition-colors focus:outline-none shrink-0 ${
              sizeVariant === 'sm' ? 'rounded-l-lg' : 'rounded-l-xl'
            } ${
              disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-black'
            }`}
            title={`${selectedCountry.nameAr} (${selectedCountry.dialCode})`}
          >
            <CountryFlag country={selectedCountry} className={currentSize.flag} />
            <span className="text-xs font-mono font-semibold text-black">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown
              className={`${currentSize.icon} text-[#5E6665] transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* National phone input */}
          <input
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }}
            id={inputId}
            type="tel"
            dir="ltr"
            value={nationalNumber}
            disabled={disabled}
            onChange={handleNumberChange}
            placeholder={placeholder}
            className={`w-full h-full bg-transparent outline-none text-left text-black placeholder:text-[#5E6665]/60 font-normal ${
              currentSize.input
            } ${rightPaddingClass} ${
              disabled ? 'cursor-not-allowed text-gray-400' : ''
            } ${className}`}
            {...props}
          />

          {/* Action End Badges (Validation Status, Clear, & Action Button) */}
          <div className="absolute right-2.5 inset-y-0 flex items-center gap-1.5 shrink-0">
            {showValidationStatus && hasValue && phoneValue.isValid && (
              <span
                title="رقم هاتف صالح ✓"
                className={`flex items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 ${currentSize.badge}`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}

            {clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="مسح رقم الهاتف"
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

        {/* Country Selector Popover */}
        {isDropdownOpen && !disabled && (
          <div
            dir="rtl"
            className="absolute z-50 top-full mt-1.5 start-0 w-72 sm:w-80 bg-white border border-[#E5E9E8] rounded-xl shadow-lg overflow-hidden py-1.5 animate-in fade-in zoom-in-95"
          >
            {/* Search Input */}
            <div className="p-2 border-b border-[#E5E9E8]">
              <div className="relative flex items-center">
                <Search className="absolute right-2.5 w-3.5 h-3.5 text-[#5E6665] pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالدولة أو الرمز الدولي..."
                  className="w-full h-8 pr-8 pl-3 text-xs bg-white border border-[#E5E9E8] rounded-lg outline-none text-black placeholder:text-[#5E6665]/60 focus:border-[#91B8C0] focus:ring-1 focus:ring-[#91B8C0]/20 transition-all duration-150"
                />
              </div>
            </div>

            {/* Country List */}
            <div className="max-h-56 overflow-y-auto space-y-0.5 p-1">
              {filteredCountries.length === 0 ? (
                <div className="py-4 text-center text-xs text-[#5E6665]">
                  لا توجد نتائج مطابقة للبحث
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const isSelected = c.code === selectedCountry.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleSelectCountry(c)}
                      className={`flex w-full items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#91B8C0]/15 text-[#1e464e] font-bold'
                          : 'text-black hover:bg-[#E5E9E8]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <CountryFlag country={c} className="w-5 h-3.5" />
                        <span className="truncate text-black">
                          {c.nameAr}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0" dir="ltr">
                        <span className="font-mono text-[11px] text-[#5E6665]">
                          {c.dialCode}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#1e464e]" />}
                      </div>
                    </button>
                  );
                })
              )}
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

PhoneInput.displayName = 'PhoneInput';
export default PhoneInput;
