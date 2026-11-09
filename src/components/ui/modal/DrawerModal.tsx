'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModalPortal } from './ModalPortal';
import { useModalPresence } from './useModalPresence';

export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';

export interface DrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: DrawerPlacement;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  width?: string;
  fullScreenMobile?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  zIndex?: number;
  dir?: 'rtl' | 'ltr';
  duration?: number;
}

export const DrawerModal: React.FC<DrawerModalProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  width = 'max-w-md',
  fullScreenMobile = true,
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

  const isVertical = placement === 'top' || placement === 'bottom';

  // Animation & placement coordinates
  let positionClasses = '';
  let transformClasses = '';

  switch (placement) {
    case 'right':
      positionClasses = 'top-0 right-0 bottom-0 h-full';
      transformClasses = isVisible
        ? 'translate-x-0 opacity-100'
        : 'translate-x-full opacity-0 pointer-events-none';
      break;
    case 'left':
      positionClasses = 'top-0 left-0 bottom-0 h-full';
      transformClasses = isVisible
        ? 'translate-x-0 opacity-100'
        : '-translate-x-full opacity-0 pointer-events-none';
      break;
    case 'top':
      positionClasses = 'top-0 left-0 right-0 w-full max-h-[85vh]';
      transformClasses = isVisible
        ? 'translate-y-0 opacity-100'
        : '-translate-y-full opacity-0 pointer-events-none';
      break;
    case 'bottom':
      positionClasses = 'bottom-0 left-0 right-0 w-full max-h-[85vh]';
      transformClasses = isVisible
        ? 'translate-y-0 opacity-100'
        : 'translate-y-full opacity-0 pointer-events-none';
      break;
  }

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 overflow-hidden"
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

        {/* Drawer Panel Container */}
        <div
          className={cn(
            'fixed bg-white shadow-2xl flex flex-col z-10 transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)',
            positionClasses,
            !isVertical && width,
            !isVertical && 'w-full',
            fullScreenMobile &&
              'max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:max-w-none max-sm:rounded-none max-sm:border-none',
            placement === 'right' && 'border-l border-[#E5E9E8]',
            placement === 'left' && 'border-r border-[#E5E9E8]',
            placement === 'top' && 'border-b border-[#E5E9E8] rounded-b-2xl',
            placement === 'bottom' && 'border-t border-[#E5E9E8] rounded-t-2xl',
            transformClasses,
            className
          )}
          style={{ backgroundColor: '#ffffff' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={cn(
                'flex items-center justify-between px-6 py-5 border-b border-[#E5E9E8] bg-white shrink-0',
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
                  aria-label="إغلاق اللوحة الجانبية"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
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
                'flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E5E9E8] bg-[#FAFBFB] shrink-0',
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

export default DrawerModal;

