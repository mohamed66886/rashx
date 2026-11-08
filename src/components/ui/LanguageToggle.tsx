'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export type LanguageCode = 'ar' | 'en' | string;

export interface LanguageOption {
  code: LanguageCode;
  label: string; // e.g. "العربية" or "English"
  shortLabel: string; // e.g. "AR" or "EN"
  nativeName?: string;
  flagSvg?: React.ReactNode;
  dir: 'rtl' | 'ltr';
}

export type LanguageToggleVariant = 'button' | 'dropdown' | 'segmented' | 'ghost';
export type LanguageToggleSize = 'sm' | 'md' | 'lg';
export type LanguageDisplayMode = 'target' | 'current';

export interface LanguageToggleProps {
  variant?: LanguageToggleVariant;
  size?: LanguageToggleSize;
  displayMode?: LanguageDisplayMode;
  currentLanguage?: LanguageCode;
  defaultLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode, option: LanguageOption) => void;
  languages?: LanguageOption[];
  autoApplyDirAndLang?: boolean;
  persistPreference?: boolean;
  showFullName?: boolean;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  title?: string;
}

/* =========================================================================
   1. HIGH-PRECISION SVG FLAGS (أعلام متجهة عالية الدقة بصيغة SVG)
   ========================================================================= */

/**
 * Official Vector SVG Flag for Saudi Arabia (علم المملكة العربية السعودية)
 */
export const SaudiFlagSvg: React.FC<{ className?: string }> = ({
  className = 'w-5 h-3.5',
}) => (
  <svg
    viewBox="0 0 640 480"
    className={`inline-block shrink-0 rounded-xs overflow-hidden shadow-2xs border border-black/10 ${className}`}
    aria-label="علم المملكة العربية السعودية"
    role="img"
  >
    <rect width="640" height="480" fill="#007A3D" />
    <g fill="#FFFFFF">
      {/* Arabic Script Shahada representation */}
      <path
        d="M208 238h14v48h-14zm24 12h14v36h-14zm24-12h14v48h-14zm24 8h14v40h-14zm24-16h14v56h-14zm24 12h14v44h-14zm24-8h14v52h-14zm24 4h14v48h-14zm24-10h14v58h-14zm24 6h14v52h-14zm24-4h14v56h-14z"
        opacity="0.95"
      />
      {/* Traditional curved ceremonial sword */}
      <path d="M192 328h256v8H192z" />
      <path d="M192 324l-22 8 22 8v-16z" />
      <path d="M448 320v24l20-12z" />
      <circle cx="204" cy="332" r="5" />
    </g>
  </svg>
);

/**
 * Official Vector SVG Flag for the United States (علم الولايات المتحدة الأمريكية)
 */
export const UsFlagSvg: React.FC<{ className?: string }> = ({
  className = 'w-5 h-3.5',
}) => (
  <svg
    viewBox="0 0 640 480"
    className={`inline-block shrink-0 rounded-xs overflow-hidden shadow-2xs border border-black/10 ${className}`}
    aria-label="United States Flag"
    role="img"
  >
    <rect width="640" height="480" fill="#B22234" />
    <path
      stroke="#FFFFFF"
      strokeWidth="37"
      d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 424.5h640"
    />
    <rect width="260" height="259" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      <circle cx="36" cy="32" r="9" />
      <circle cx="94" cy="32" r="9" />
      <circle cx="152" cy="32" r="9" />
      <circle cx="210" cy="32" r="9" />
      <circle cx="65" cy="65" r="9" />
      <circle cx="123" cy="65" r="9" />
      <circle cx="181" cy="65" r="9" />
      <circle cx="36" cy="98" r="9" />
      <circle cx="94" cy="98" r="9" />
      <circle cx="152" cy="98" r="9" />
      <circle cx="210" cy="98" r="9" />
      <circle cx="65" cy="131" r="9" />
      <circle cx="123" cy="131" r="9" />
      <circle cx="181" cy="131" r="9" />
      <circle cx="36" cy="164" r="9" />
      <circle cx="94" cy="164" r="9" />
      <circle cx="152" cy="164" r="9" />
      <circle cx="210" cy="164" r="9" />
      <circle cx="65" cy="197" r="9" />
      <circle cx="123" cy="197" r="9" />
      <circle cx="181" cy="197" r="9" />
      <circle cx="36" cy="230" r="9" />
      <circle cx="94" cy="230" r="9" />
      <circle cx="152" cy="230" r="9" />
      <circle cx="210" cy="230" r="9" />
    </g>
  </svg>
);

/**
 * Official Vector SVG Flag for Great Britain / UK (علم المملكة المتحدة)
 */
export const UkFlagSvg: React.FC<{ className?: string }> = ({
  className = 'w-5 h-3.5',
}) => (
  <svg
    viewBox="0 0 640 480"
    className={`inline-block shrink-0 rounded-xs overflow-hidden shadow-2xs border border-black/10 ${className}`}
    aria-label="United Kingdom Flag"
    role="img"
  >
    <clipPath id="uk-flag-clip">
      <rect width="640" height="480" />
    </clipPath>
    <g clipPath="url(#uk-flag-clip)">
      <rect width="640" height="480" fill="#012169" />
      <path stroke="#FFFFFF" strokeWidth="60" d="M0 0l640 480M640 0L0 480" />
      <path stroke="#C8102E" strokeWidth="40" d="M0 0l640 480M640 0L0 480" />
      <path stroke="#FFFFFF" strokeWidth="100" d="M320 0v480M0 240h640" />
      <path stroke="#C8102E" strokeWidth="60" d="M320 0v480M0 240h640" />
    </g>
  </svg>
);

/* =========================================================================
   2. DEFAULT LANGUAGE OPTIONS
   ========================================================================= */

export const DEFAULT_LANGUAGES: LanguageOption[] = [
  {
    code: 'ar',
    label: 'العربية',
    shortLabel: 'AR',
    nativeName: 'Arabic',
    flagSvg: <SaudiFlagSvg className="w-5 h-3.5" />,
    dir: 'rtl',
  },
  {
    code: 'en',
    label: 'English',
    shortLabel: 'EN',
    nativeName: 'English',
    flagSvg: <UsFlagSvg className="w-5 h-3.5" />,
    dir: 'ltr',
  },
];

/* =========================================================================
   3. SIZES & STYLING
   ========================================================================= */

const sizeStyles: Record<
  LanguageToggleSize,
  {
    button: string;
    flag: string;
    code: string;
    name: string;
    segmentedContainer: string;
    segmentItem: string;
    dropdownItem: string;
  }
> = {
  sm: {
    button: 'h-8 px-2.5 text-xs gap-1.5 rounded-lg',
    flag: 'w-4.5 h-3',
    code: 'text-xs font-mono font-bold tracking-wider',
    name: 'text-xs font-medium',
    segmentedContainer: 'p-0.5 rounded-lg h-8',
    segmentItem: 'px-2.5 py-1 text-xs rounded-md gap-1.5',
    dropdownItem: 'px-3 py-1.5 text-xs gap-2',
  },
  md: {
    button: 'h-9.5 px-3 text-sm gap-2 rounded-xl',
    flag: 'w-5 h-3.5',
    code: 'text-xs font-mono font-bold tracking-wider',
    name: 'text-sm font-medium',
    segmentedContainer: 'p-1 rounded-xl h-9.5',
    segmentItem: 'px-3 py-1.5 text-sm rounded-lg gap-2',
    dropdownItem: 'px-3.5 py-2 text-sm gap-2.5',
  },
  lg: {
    button: 'h-11 px-4 text-base gap-2.5 rounded-xl',
    flag: 'w-6 h-4',
    code: 'text-sm font-mono font-bold tracking-wider',
    name: 'text-base font-medium',
    segmentedContainer: 'p-1.5 rounded-xl h-11',
    segmentItem: 'px-4 py-2 text-base rounded-lg gap-2.5',
    dropdownItem: 'px-4 py-2.5 text-base gap-3',
  },
};

/* =========================================================================
   4. MAIN COMPONENT: LanguageToggle
   ========================================================================= */

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  variant = 'button',
  size = 'md',
  displayMode = 'target',
  currentLanguage: controlledLang,
  defaultLanguage = 'ar',
  onLanguageChange,
  languages = DEFAULT_LANGUAGES,
  autoApplyDirAndLang = true,
  persistPreference = true,
  showFullName = false,
  className = '',
  buttonClassName = '',
  menuClassName = '',
  title,
}) => {
  const [internalLang, setInternalLang] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rashx_locale');
      if (saved && languages.some((l) => l.code === saved)) return saved;
      const htmlLang = document.documentElement.lang;
      if (htmlLang && languages.some((l) => l.code === htmlLang)) return htmlLang;
    }
    return defaultLanguage;
  });

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLangCode = controlledLang !== undefined ? controlledLang : internalLang;

  const currentOption = useMemo(
    () =>
      languages.find((l) => l.code === activeLangCode) ||
      languages.find((l) => l.code === defaultLanguage) ||
      languages[0],
    [languages, activeLangCode, defaultLanguage]
  );

  const alternateOption = useMemo(() => {
    if (languages.length === 2) {
      return languages.find((l) => l.code !== currentOption.code) || languages[1];
    }
    const currIdx = languages.findIndex((l) => l.code === currentOption.code);
    const nextIdx = (currIdx + 1) % languages.length;
    return languages[nextIdx];
  }, [languages, currentOption]);

  const displayedOption = displayMode === 'current' ? currentOption : alternateOption;

  // Apply attributes to document
  const applyLanguage = useCallback(
    (option: LanguageOption) => {
      if (typeof window !== 'undefined') {
        if (autoApplyDirAndLang) {
          document.documentElement.lang = option.code;
          document.documentElement.dir = option.dir;
        }
        if (persistPreference) {
          try {
            localStorage.setItem('rashx_locale', option.code);
            document.cookie = `NEXT_LOCALE=${option.code}; path=/; max-age=31536000; SameSite=Lax`;
          } catch {
            // ignore
          }
        }
        window.dispatchEvent(
          new CustomEvent('rashx:languageChange', {
            detail: { lang: option.code, option },
          })
        );
      }
    },
    [autoApplyDirAndLang, persistPreference]
  );

  // Selection handler
  const handleSelectLanguage = (option: LanguageOption) => {
    if (controlledLang === undefined) {
      setInternalLang(option.code);
    }
    applyLanguage(option);
    onLanguageChange?.(option.code, option);
    setIsOpen(false);
  };

  // Quick toggle (for 'button' and 'ghost')
  const handleToggle = () => {
    handleSelectLanguage(alternateOption);
  };

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const currentSize = sizeStyles[size];

  // -------------------------------------------------------------
  // VARIANT: SEGMENTED PILLS [ SVG العلم + AR | SVG العلم + EN ]
  // -------------------------------------------------------------
  if (variant === 'segmented') {
    return (
      <div
        ref={containerRef}
        role="group"
        aria-label="اختيار لغة العرض"
        dir="ltr"
        className={`inline-flex items-center bg-[#f5f7f7] border border-[#E5E9E8] ${currentSize.segmentedContainer} select-none ${className}`}
      >
        {languages.map((lang) => {
          const isSelected = lang.code === currentOption.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang)}
              aria-pressed={isSelected}
              className={`inline-flex items-center justify-center transition-all duration-150 cursor-pointer ${
                currentSize.segmentItem
              } ${
                isSelected
                  ? 'bg-white text-black font-bold shadow-xs border border-[#E5E9E8]/80'
                  : 'text-[#5E6665] hover:text-black hover:bg-black/5 font-medium'
              }`}
            >
              {lang.flagSvg && <span className="shrink-0">{lang.flagSvg}</span>}
              <span className={currentSize.code}>{lang.shortLabel}</span>
              {showFullName && <span className={currentSize.name}>{lang.label}</span>}
            </button>
          );
        })}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT: DROPDOWN MENU
  // -------------------------------------------------------------
  if (variant === 'dropdown') {
    return (
      <div
        ref={containerRef}
        className={`relative inline-block text-right ${className}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          title={title || `اللغة: ${currentOption.label}`}
          dir="ltr"
          className={`inline-flex items-center justify-between border border-[#E5E9E8] bg-white hover:bg-[#E5E9E8]/40 hover:border-[#91B8C0]/60 text-black font-semibold transition-all duration-150 cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#91B8C0]/30 active:scale-[0.98] ${
            currentSize.button
          } ${buttonClassName}`}
        >
          <div className="flex items-center gap-1.5">
            {currentOption.flagSvg && (
              <span className="shrink-0">{currentOption.flagSvg}</span>
            )}
            <span className={currentSize.code}>{currentOption.shortLabel}</span>
            {showFullName && (
              <span className="text-xs text-[#5E6665] font-normal">
                {currentOption.label}
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#5E6665] transition-transform duration-200 shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className={`absolute top-full mt-1.5 z-50 min-w-[160px] bg-white border border-[#E5E9E8] rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in zoom-in-95 start-0 ${menuClassName}`}
          >
            {languages.map((lang) => {
              const isSelected = lang.code === currentOption.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full flex items-center justify-between text-right transition-colors cursor-pointer ${
                    currentSize.dropdownItem
                  } ${
                    isSelected
                      ? 'bg-[#91B8C0]/15 text-[#1e464e] font-bold'
                      : 'text-black hover:bg-[#E5E9E8]/50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {lang.flagSvg && <span className="shrink-0">{lang.flagSvg}</span>}
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-semibold text-black leading-snug">
                        {lang.label}
                      </span>
                      {lang.nativeName && (
                        <span className="text-[10px] text-[#5E6665] font-normal leading-none">
                          {lang.nativeName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5" dir="ltr">
                    <span className="text-[11px] font-mono font-bold text-[#5E6665]">
                      {lang.shortLabel}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#1e464e] stroke-[2.5]" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT: QUICK TOGGLE BUTTON (Default) & GHOST
  // -------------------------------------------------------------
  const isGhost = variant === 'ghost';

  return (
    <button
      type="button"
      onClick={handleToggle}
      dir="ltr"
      title={
        title ||
        (displayMode === 'target'
          ? `التحويل إلى ${alternateOption.label} (${alternateOption.shortLabel})`
          : `اللغة الحالية: ${currentOption.label} (${currentOption.shortLabel})`)
      }
      className={`inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer select-none active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-[#91B8C0]/30 ${
        isGhost
          ? 'bg-transparent hover:bg-[#E5E9E8]/60 text-black'
          : 'bg-white border border-[#E5E9E8] hover:bg-[#E5E9E8]/40 hover:border-[#91B8C0]/60 text-black shadow-2xs'
      } ${currentSize.button} ${buttonClassName} ${className}`}
    >
      {/* SVG Vector Flag (علم الفيكتور SVG) */}
      {displayedOption.flagSvg && (
        <span className="shrink-0 flex items-center justify-center">
          {displayedOption.flagSvg}
        </span>
      )}

      {/* Language Abbreviation (اختصار اللغة) */}
      <span className={currentSize.code}>
        {displayedOption.shortLabel}
      </span>

      {/* Optional full name */}
      {showFullName && (
        <span className="text-xs text-[#5E6665] font-normal ms-1">
          {displayedOption.label}
        </span>
      )}
    </button>
  );
};

export default LanguageToggle;
