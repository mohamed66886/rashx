'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModalPortal } from './ModalPortal';
import { useModalPresence } from './useModalPresence';

export interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showHandle?: boolean;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  maxHeight?: string;
  maxWidth?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  zIndex?: number;
  dir?: 'rtl' | 'ltr';
  duration?: number;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showHandle = true,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  maxHeight = 'max-h-[85vh]',
  maxWidth = 'max-w-2xl',
  className = '',
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  zIndex = 9999,
  dir = 'rtl',
  duration = 300,
}) => {
  const { isMounted, isVisible } = useModalPresence({
    isOpen,
    onClose,
    duration,
    closeOnEsc,
    lockScroll: true,
  });

  if (!isMounted) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 overflow-hidden flex items-end justify-center"
        style={{ zIndex }}
        dir={dir}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 ease-out cursor-pointer',
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={() => closeOnOutsideClick && onClose()}
          aria-hidden="true"
        />

        {/* Bottom Sheet Container */}
        <div
          className={cn(
            'relative w-full bg-white rounded-t-3xl border-t border-x border-[#E5E9E8] shadow-2xl flex flex-col z-10 transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)',
            maxWidth,
            maxHeight,
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0 pointer-events-none',
            className
          )}
          style={{ backgroundColor: '#ffffff' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Grab Handle Pill */}
          {showHandle && (
            <div className="w-full flex items-center justify-center pt-3 pb-1 shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-[#E5E9E8] hover:bg-[#91B8C0] transition-colors" />
            </div>
          )}

          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={cn(
                'flex items-center justify-between px-6 py-4 border-b border-[#E5E9E8] bg-white shrink-0',
                headerClassName
              )}
            >
              <div className="space-y-0.5 min-w-0 pr-1">
                {title && (
                  <h3 className="text-base sm:text-lg font-bold text-black tracking-tight truncate">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-xs text-[#5E6665] truncate">
                    {description}
                  </p>
                )}
              </div>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/70 active:bg-[#E5E9E8] transition-colors cursor-pointer shrink-0"
                  aria-label="إغلاق اللوحة"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Body Content */}
          <div
            className={cn(
              'p-6 text-black overflow-y-auto flex-1 select-text',
              contentClassName
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className={cn(
                'flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E5E9E8] bg-[#FAFBFB] shrink-0 pb-safe',
                footerClassName
              )}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default BottomSheetModal;

