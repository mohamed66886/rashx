'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X, Maximize2 } from 'lucide-react';
import { playPopupSound } from './popups/sound';
import { SuccessPopup } from './popups/SuccessPopup';
import { WarningPopup } from './popups/WarningPopup';
import { AlertPopup } from './popups/AlertPopup';
import { ErrorPopup } from './popups/ErrorPopup';

export type AlertBannerVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertBannerProps {
  show?: boolean;
  variant?: AlertBannerVariant;
  title?: string;
  message?: React.ReactNode;
  onClose?: () => void;
  autoScroll?: boolean;
  className?: string;
  duration?: number;
  playSound?: boolean;
  expandableToPopup?: boolean;
}

const variantStyles: Record<
  AlertBannerVariant,
  {
    container: string;
    titleColor: string;
    titleHex: string;
    messageColor: string;
    messageHex: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    buttonHover: string;
  }
> = {
  success: {
    container: 'bg-[#EAF6F0] border-[#9CD3BE]',
    titleColor: 'text-black',
    titleHex: '#000000',
    messageColor: 'text-[#0F3B28]',
    messageHex: '#0F3B28',
    icon: CheckCircle2,
    iconColor: 'text-emerald-700',
    buttonHover: 'hover:bg-emerald-900/10 text-black',
  },
  info: {
    container: 'bg-[#E8F1F3] border-[#91B8C0]',
    titleColor: 'text-black',
    titleHex: '#000000',
    messageColor: 'text-[#1E464E]',
    messageHex: '#1E464E',
    icon: Info,
    iconColor: 'text-[#1E464E]',
    buttonHover: 'hover:bg-[#133840]/10 text-black',
  },
  warning: {
    container: 'bg-[#FDF3ED] border-[#F0C5AE]',
    titleColor: 'text-black',
    titleHex: '#000000',
    messageColor: 'text-[#6E2E10]',
    messageHex: '#6E2E10',
    icon: AlertTriangle,
    iconColor: 'text-[#8C3A15]',
    buttonHover: 'hover:bg-[#5C240D]/10 text-black',
  },
  error: {
    container: 'bg-[#FDF0ED] border-[#F8B4AB]',
    titleColor: 'text-black',
    titleHex: '#000000',
    messageColor: 'text-[#7F1D1D]',
    messageHex: '#7F1D1D',
    icon: XCircle,
    iconColor: 'text-rose-700',
    buttonHover: 'hover:bg-rose-900/10 text-black',
  },
};

export const AlertBanner: React.FC<AlertBannerProps> = ({
  show = true,
  variant = 'success',
  title,
  message,
  onClose,
  autoScroll = true,
  className = '',
  duration,
  playSound = false,
  expandableToPopup = true,
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (show && autoScroll && bannerRef.current) {
      bannerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [show, autoScroll]);

  useEffect(() => {
    if (show && playSound) {
      const soundType = variant === 'info' ? 'alert' : variant;
      playPopupSound(soundType);
    }
  }, [show, playSound, variant]);

  useEffect(() => {
    if (show && duration && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show || !message) return null;

  const style = variantStyles[variant];
  const IconComponent = style.icon;

  return (
    <>
      <div
        ref={bannerRef}
        role="alert"
        dir="rtl"
        className={`w-full border px-5 py-3.5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-200 ${style.container} ${className}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <IconComponent className={`w-5 h-5 shrink-0 ${style.iconColor}`} />
          <div className="flex flex-col gap-0.5 text-right min-w-0">
            {title && (
              <span
                style={{ color: style.titleHex }}
                className={`font-bold text-sm sm:text-base leading-snug tracking-tight text-black`}
              >
                {title}
              </span>
            )}
            <span
              style={{ color: style.messageHex }}
              className={`text-xs sm:text-sm font-medium leading-relaxed ${style.messageColor}`}
            >
              {message}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {expandableToPopup && (
            <button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${style.buttonHover}`}
              title="عرض في نافذة تفاعلية منبثقة"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تكبير النافذة</span>
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${style.buttonHover}`}
              aria-label="إغلاق التنبيه"
              title="إغلاق التنبيه"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Linked Interactive Popup with Sound & Drawing SVG */}
      {isPopupOpen && (
        <>
          {variant === 'success' && (
            <SuccessPopup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              title={title || 'تمت العملية بنجاح'}
              message={message}
            />
          )}
          {variant === 'warning' && (
            <WarningPopup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              title={title || 'تحذير نظامي هام'}
              message={message}
            />
          )}
          {variant === 'info' && (
            <AlertPopup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              title={title || 'معلومة وتنبيه'}
              message={message}
            />
          )}
          {variant === 'error' && (
            <ErrorPopup
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              title={title || 'حدث خطأ'}
              message={message}
            />
          )}
        </>
      )}
    </>
  );
};

export default AlertBanner;
