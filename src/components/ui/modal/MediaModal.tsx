'use client';

import React from 'react';
import { X, ZoomIn, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModalPortal } from './ModalPortal';
import { useModalPresence } from './useModalPresence';

export interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  src?: string;
  type?: 'image' | 'video' | 'custom';
  alt?: string;
  title?: string;
  caption?: string;
  children?: React.ReactNode;
  showDownload?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  zIndex?: number;
  duration?: number;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  src,
  type = 'image',
  alt = 'Media preview',
  title,
  caption,
  children,
  showDownload = false,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  zIndex = 99999,
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
        className="fixed inset-0 flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none"
        style={{ zIndex }}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-260 ease-out cursor-pointer',
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={() => closeOnOutsideClick && onClose()}
          aria-hidden="true"
        />

        {/* Top Control Bar */}
        <div
          className={cn(
            'fixed top-4 left-4 right-4 flex items-center justify-between z-20 text-white transition-opacity duration-260',
            isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors cursor-pointer backdrop-blur-md"
              aria-label="إغلاق المعاينة"
            >
              <X className="w-6 h-6" />
            </button>
            {title && (
              <span className="text-sm font-semibold tracking-wide text-white/90">
                {title}
              </span>
            )}
          </div>

          {showDownload && src && (
            <a
              href={src}
              download
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white transition-colors cursor-pointer backdrop-blur-md"
              aria-label="تحميل الوسائط"
            >
              <Download className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Media Container with Smooth Zoom In & Out */}
        <div
          className={cn(
            'relative z-10 max-w-5xl max-h-[85vh] flex flex-col items-center justify-center transition-all duration-260 cubic-bezier(0.16, 1, 0.3, 1)',
            isVisible
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90 pointer-events-none'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {type === 'image' && src && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={src}
              alt={alt}
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          )}

          {type === 'video' && src && (
            <video
              src={src}
              controls
              autoPlay
              className="max-h-[75vh] max-w-full rounded-xl shadow-2xl bg-black"
            />
          )}

          {type === 'custom' && children}

          {caption && (
            <p className="mt-3 text-xs sm:text-sm text-center text-white/80 max-w-lg">
              {caption}
            </p>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default MediaModal;

