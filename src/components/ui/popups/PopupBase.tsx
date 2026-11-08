'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatedSvgIcon, PopupType } from './AnimatedSvgIcon';
import { playPopupSound } from './sound';

export interface PopupBaseProps {
  isOpen: boolean;
  onClose: () => void;
  type: PopupType;
  title: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  playSound?: boolean;
  closeOnOutsideClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export const PopupBase: React.FC<PopupBaseProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  children,
  actions,
  playSound = true,
  closeOnOutsideClick = true,
  showCloseButton = true,
  className = '',
}) => {
  // Play synthesized Web Audio sound on popup open
  useEffect(() => {
    if (isOpen && playSound) {
      playPopupSound(type);
    }
  }, [isOpen, type, playSound]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      dir="rtl"
    >
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-200 animate-fadeIn"
        onClick={() => closeOnOutsideClick && onClose()}
        aria-hidden="true"
      />

      {/* Popup Dialog Box */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-md bg-white rounded-xl border border-[#E5E9E8]/70 shadow-xl p-6 sm:p-8 text-center z-10 select-none animate-in fade-in zoom-in-95 duration-200 ${className}`}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 left-5 p-1.5 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* 1. Animated SVG Icon (Draws on Open) */}
        <div className="flex justify-center mb-5">
          <AnimatedSvgIcon type={type} size={80} />
        </div>

        {/* 2. Title & Message */}
        <h3 className="text-xl font-bold text-black tracking-tight mb-2">
          {title}
        </h3>

        {message && (
          <p className="text-xs sm:text-sm text-[#5E6665] leading-relaxed mb-6 px-2">
            {message}
          </p>
        )}

        {/* Additional custom body */}
        {children && <div className="mb-6 text-right text-xs">{children}</div>}

        {/* 3. Actions / Buttons */}
        {actions && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupBase;

