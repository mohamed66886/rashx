'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  useEffect,
} from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { playPopupSound, PopupSoundType } from './popups/sound';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: React.ReactNode;
  message?: React.ReactNode;
  duration?: number;
  playSound?: boolean;
}

export interface ToastOptions {
  message?: React.ReactNode;
  duration?: number;
  playSound?: boolean;
}

interface ToastContextValue {
  showToast: (type: ToastType, title: React.ReactNode, options?: ToastOptions) => void;
  success: (title: React.ReactNode, options?: ToastOptions) => void;
  error: (title: React.ReactNode, options?: ToastOptions) => void;
  warning: (title: React.ReactNode, options?: ToastOptions) => void;
  info: (title: React.ReactNode, options?: ToastOptions) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return context;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const typeConfig: Record<
  ToastType,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    sound: PopupSoundType;
    border: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    color: 'text-black bg-[#91B8C0]',
    sound: 'success',
    border: 'border-[#91B8C0]',
  },
  error: {
    icon: AlertCircle,
    color: 'text-white bg-red-600',
    sound: 'error',
    border: 'border-red-400',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-black bg-[#F0C5AE]',
    sound: 'warning',
    border: 'border-[#F0C5AE]',
  },
  info: {
    icon: Info,
    color: 'text-black bg-[#E5E9E8]',
    sound: 'alert',
    border: 'border-[#d2d9d7]',
  },
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-left',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idPrefix = useId();

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, title: React.ReactNode, options?: ToastOptions) => {
      const id = `${idPrefix}-${Date.now()}-${Math.random()}`;
      const duration = options?.duration ?? 4500;
      const playSound = options?.playSound ?? true;

      if (playSound) {
        playPopupSound(typeConfig[type].sound);
      }

      const newToast: ToastItem = {
        id,
        type,
        title,
        message: options?.message,
        duration,
        playSound,
      };

      setToasts((prev) => [...prev, newToast]);
    },
    [idPrefix]
  );

  const success = useCallback(
    (title: React.ReactNode, options?: ToastOptions) =>
      showToast('success', title, options),
    [showToast]
  );

  const error = useCallback(
    (title: React.ReactNode, options?: ToastOptions) =>
      showToast('error', title, options),
    [showToast]
  );

  const warning = useCallback(
    (title: React.ReactNode, options?: ToastOptions) =>
      showToast('warning', title, options),
    [showToast]
  );

  const info = useCallback(
    (title: React.ReactNode, options?: ToastOptions) =>
      showToast('info', title, options),
    [showToast]
  );

  const positionClasses = {
    'top-left': 'top-5 start-5',
    'top-right': 'top-5 end-5',
    'bottom-left': 'bottom-5 start-5',
    'bottom-right': 'bottom-5 end-5',
  };

  return (
    <ToastContext.Provider
      value={{ showToast, success, error, warning, info, dismiss }}
    >
      {children}

      {/* Floating Toast Notification Stack */}
      <div
        className={`fixed z-[999999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none p-4 ${positionClasses[position]}`}
        dir="rtl"
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const config = typeConfig[toast.type];
  const IconComponent = config.icon;

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(toast.id);
      }, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-2xl border ${config.border} shadow-xl text-right animate-in fade-in slide-in-from-top-3 duration-200 select-none`}
    >
      <div
        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${config.color}`}
      >
        <IconComponent className="w-4 h-4 stroke-[2.5]" />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className="text-xs font-bold text-black leading-snug">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-[11px] text-[#5E6665] mt-1 leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-lg text-[#5E6665] hover:text-black hover:bg-[#E5E9E8]/60 transition-colors cursor-pointer shrink-0 -me-1 -mt-1"
        aria-label="إغلاق التنبيه"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastProvider;

