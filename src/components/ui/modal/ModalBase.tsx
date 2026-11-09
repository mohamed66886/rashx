'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModalPortal } from './ModalPortal';
import { useModalPresence } from './useModalPresence';
import type {
  ModalBaseProps,
  ModalSize,
  ModalAnimation,
  ModalPosition,
  ModalBackdropVariant,
} from './types';

const sizeClasses: Record<ModalSize, string> = {
  xs: 'max-w-sm',
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  '2xl': 'max-w-5xl',
  '3xl': 'max-w-6xl',
  '4xl': 'max-w-7xl',
  full: 'max-w-[96vw] h-[92vh]',
};

const positionClasses: Record<ModalPosition, string> = {
  center: 'items-center justify-center p-4 sm:p-6',
  top: 'items-start justify-center p-4 pt-8 sm:pt-16 sm:px-6',
  bottom: 'items-end justify-center p-4 pb-6 sm:pb-10 sm:px-6',
};

const backdropClasses: Record<ModalBackdropVariant, string> = {
  blur: 'bg-black/45 backdrop-blur-xs',
  dim: 'bg-black/60',
  dark: 'bg-black/80 backdrop-blur-sm',
  transparent: 'bg-black/20',
};

function getAnimationClasses(
  animation: ModalAnimation,
  isVisible: boolean
): string {
  switch (animation) {
    case 'slide-up':
      return cn(
        'transition-all duration-260 cubic-bezier(0.16, 1, 0.3, 1)',
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-98 pointer-events-none'
      );
    case 'slide-down':
      return cn(
        'transition-all duration-260 cubic-bezier(0.16, 1, 0.3, 1)',
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-8 scale-98 pointer-events-none'
      );
    case 'fade':
      return cn(
        'transition-opacity duration-220 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      );
    case 'drawer-right':
      return cn(
        'transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)',
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-full pointer-events-none'
      );
    case 'drawer-left':
      return cn(
        'transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)',
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-full pointer-events-none'
      );
    case 'drawer-bottom':
      return cn(
        'transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-full pointer-events-none'
      );
    case 'scale':
    default:
      return cn(
        'transition-all duration-260 cubic-bezier(0.16, 1, 0.3, 1)',
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 translate-y-3 pointer-events-none'
      );
  }
}

export const ModalBase: React.FC<ModalBaseProps> = ({
  isOpen,
  onClose,
  title,
  description,
  headerIcon,
  size = 'md',
  animation = 'scale',
  position = 'center',
  backdropVariant = 'blur',
  children,
  footer,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  className = '',
  contentClassName = '',
  headerClassName = '',
  footerClassName = '',
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
          'fixed inset-0 flex overflow-y-auto overflow-x-hidden',
          positionClasses[position]
        )}
        style={{ zIndex }}
        dir={dir}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
      >
        {/* Backdrop With Smooth Enter & Exit */}
        <div
          className={cn(
            'fixed inset-0 transition-opacity duration-260 ease-out cursor-pointer',
            backdropClasses[backdropVariant],
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={() => closeOnOutsideClick && onClose()}
          aria-hidden="true"
        />

        {/* Modal Window Container With Smooth Enter & Exit */}
        <div
          className={cn(
            'relative w-full bg-white rounded-2xl border border-[#E5E9E8] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[calc(100vh-3rem)]',
            sizeClasses[size],
            getAnimationClasses(animation, isVisible),
            className
          )}
          style={{ backgroundColor: '#ffffff' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton || headerIcon) && (
            <div
              className={cn(
                'flex items-center justify-between px-6 py-5 border-b border-[#E5E9E8] bg-white shrink-0',
                headerClassName
              )}
            >
              <div className="flex items-center gap-3 min-w-0 pr-1">
                {headerIcon && (
                  <div className="shrink-0 p-2 rounded-xl bg-[#91B8C0]/15 text-[#305a63]">
                    {headerIcon}
                  </div>
                )}
                <div className="min-w-0">
                  {title && (
                    <h3 className="text-base sm:text-lg font-bold text-black tracking-tight truncate">
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p className="text-xs text-[#5E6665] mt-0.5 truncate">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/70 active:bg-[#E5E9E8] transition-colors cursor-pointer shrink-0"
                  aria-label="إغلاق النافذة"
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

export default ModalBase;

