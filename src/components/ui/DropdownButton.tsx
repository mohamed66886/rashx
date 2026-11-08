'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonVariant, ButtonSize, ButtonRounded } from './Button';
import { DropdownIcon } from './DropdownIcon';

export interface DropdownButtonItem {
  label: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

export interface DropdownButtonProps {
  label: React.ReactNode;
  items: DropdownButtonItem[];
  onPrimaryClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  split?: boolean;
  className?: string;
  menuClassName?: string;
  menuWidth?: string;
}

const variantStyles: Record<ButtonVariant, { bg: string; divider: string }> = {
  primary: {
    bg: 'bg-[#91B8C0] hover:bg-[#7fa4ac] text-black font-bold shadow-xs focus:ring-[#91B8C0]/40',
    divider: 'border-r border-black/20',
  },
  secondary: {
    bg: 'bg-[#F0C5AE] hover:bg-[#e0b59e] text-black font-semibold focus:ring-[#F0C5AE]/40',
    divider: 'border-r border-black/20',
  },
  outline: {
    bg: 'border border-[#E5E9E8] bg-white hover:bg-[#E5E9E8]/60 text-black focus:ring-[#91B8C0]/20',
    divider: 'border-r border-[#E5E9E8]',
  },
  danger: {
    bg: 'bg-red-600 hover:bg-red-700 text-white shadow-xs focus:ring-red-500/30',
    divider: 'border-r border-white/30',
  },
  destructive: {
    bg: 'bg-red-600 hover:bg-red-700 text-white shadow-xs focus:ring-red-500/30',
    divider: 'border-r border-white/30',
  },
  success: {
    bg: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs focus:ring-emerald-500/30',
    divider: 'border-r border-white/30',
  },
  warning: {
    bg: 'bg-[#F0C5AE] hover:bg-[#e0b59e] text-black border border-[#e0b59e] focus:ring-[#F0C5AE]/30',
    divider: 'border-r border-black/20',
  },
  ghost: {
    bg: 'bg-transparent hover:bg-[#E5E9E8]/60 text-black focus:ring-[#91B8C0]/20',
    divider: 'border-r border-[#E5E9E8]',
  },
  link: {
    bg: 'bg-transparent text-black hover:text-[#91B8C0] hover:underline shadow-none',
    divider: 'border-r border-[#E5E9E8]',
  },
};

const sizeStyles: Record<ButtonSize, { text: string; padding: string; icon: string }> = {
  sm: {
    text: 'text-xs',
    padding: 'px-3 py-1.5',
    icon: 'w-3.5 h-3.5',
  },
  md: {
    text: 'text-sm',
    padding: 'px-4 py-2',
    icon: 'w-4 h-4',
  },
  lg: {
    text: 'text-base',
    padding: 'px-5 py-2.5',
    icon: 'w-5 h-5',
  },
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

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  items = [],
  onPrimaryClick,
  variant = 'primary',
  size = 'md',
  rounded = 'xl',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  split = true,
  className = '',
  menuClassName = '',
  menuWidth = 'w-56',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const styles = variantStyles[variant];
  const sStyles = sizeStyles[size];

  // Close on Outside Click
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

  const handleMainClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (split) {
      if (onPrimaryClick) {
        onPrimaryClick();
      } else {
        setIsOpen(!isOpen);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex text-right select-none ${className}`}
      dir="rtl"
    >
      {/* Attached Split / Single Button Container */}
      <div
        className={`inline-flex items-stretch ${roundedStyles[rounded]} overflow-hidden transition-all duration-150 ${styles.bg} ${
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        }`}
      >
        {/* Main Action Button (Text / Label) */}
        <button
          type="button"
          disabled={disabled || isLoading}
          onClick={handleMainClick}
          className={`inline-flex items-center gap-2 font-medium transition-colors focus:outline-none ${sStyles.padding} ${sStyles.text}`}
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
          {!isLoading && rightIcon}
          <span>{label}</span>
          {!isLoading && leftIcon}
        </button>

        {/* Attached Dropdown Arrow Toggle Button */}
        {split ? (
          <button
            type="button"
            disabled={disabled || isLoading}
            onClick={handleToggleClick}
            className={`inline-flex items-center justify-center px-2.5 transition-colors focus:outline-none ${styles.divider} hover:bg-black/10`}
            title="خيارات إضافية"
          >
            <DropdownIcon className={`${sStyles.icon} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <button
            type="button"
            disabled={disabled || isLoading}
            onClick={handleToggleClick}
            className="inline-flex items-center justify-center pl-2.5 pr-1 focus:outline-none"
          >
            <DropdownIcon className={`${sStyles.icon} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Floating Dropdown Popup Menu matching Screenshot */}
      {isOpen && !disabled && (
        <div
          className={`absolute top-full left-0 z-[99999] mt-1.5 bg-white border border-[#E5E9E8] rounded-xl shadow-xl py-1.5 overflow-hidden animate-fadeIn ${menuWidth} ${menuClassName}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              disabled={item.disabled}
              onClick={() => {
                setIsOpen(false);
                item.onClick();
              }}
              className={`w-full text-right flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors border-b border-[#E5E9E8]/60 last:border-b-0 cursor-pointer ${
                item.disabled
                  ? 'opacity-50 cursor-not-allowed text-[#5E6665]/50 bg-gray-50'
                  : item.danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-black hover:bg-[#E5E9E8]/60'
              }`}
            >
              {item.icon && <span className="text-gray-500">{item.icon}</span>}
              <span className="truncate flex-1">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;

