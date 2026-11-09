'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModalPortal } from './ModalPortal';
import { useModalPresence } from './useModalPresence';

export interface FullscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  zIndex?: number;
  dir?: 'rtl' | 'ltr';
  duration?: number;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  actions,
  showCloseButton = true,
  closeOnEsc = true,
  className = '',
  contentClassName = '',
  headerClassName = '',
  zIndex = 9999,
  dir = 'rtl',
  duration = 260,
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
        className={cn(
          'fixed inset-0 bg-white flex flex-col z-[9999] transition-all duration-260 cubic-bezier(0.16, 1, 0.3, 1)',
          isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-98 pointer-events-none',
          className
        )}
        style={{ zIndex, backgroundColor: '#ffffff' }}
        dir={dir}
        role="dialog"
        aria-modal="true"
      >
        {/* Top App Bar */}
        <div
          className={cn(
            'flex items-center justify-between px-6 py-4 border-b border-[#E5E9E8] bg-white shrink-0 shadow-2xs',
            headerClassName
          )}
        >
          <div className="flex items-center gap-4 min-w-0">
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/70 active:bg-[#E5E9E8] transition-colors cursor-pointer"
                aria-label="إغلاق الشاشة الكاملة"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-black tracking-tight truncate">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-[#5E6665] truncate">{subtitle}</p>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex items-center gap-3 shrink-0">{actions}</div>
          )}
        </div>

        {/* Content Area */}
        <div
          className={cn(
            'flex-1 overflow-y-auto p-6 lg:p-8 text-black',
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default FullscreenModal;

