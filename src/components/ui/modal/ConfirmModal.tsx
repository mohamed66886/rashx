'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Trash2,
  HelpCircle,
  Loader2,
} from 'lucide-react';
import { ModalBase } from './ModalBase';
import { Button } from '@/components/ui/Button';

export type ConfirmIntent =
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'primary';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: React.ReactNode;
  description?: React.ReactNode;
  intent?: ConfirmIntent;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  zIndex?: number;
}

const intentConfigs: Record<
  ConfirmIntent,
  {
    icon: React.ElementType;
    iconWrapperClass: string;
    confirmButtonVariant:
      | 'danger'
      | 'warning'
      | 'success'
      | 'primary'
      | 'secondary';
  }
> = {
  danger: {
    icon: Trash2,
    iconWrapperClass:
      'bg-red-50 text-red-600 border border-red-100 ring-4 ring-red-50',
    confirmButtonVariant: 'danger',
  },
  warning: {
    icon: AlertTriangle,
    iconWrapperClass:
      'bg-amber-50 text-amber-600 border border-amber-100 ring-4 ring-amber-50',
    confirmButtonVariant: 'warning',
  },
  success: {
    icon: CheckCircle2,
    iconWrapperClass:
      'bg-emerald-50 text-emerald-600 border border-emerald-100 ring-4 ring-emerald-50',
    confirmButtonVariant: 'success',
  },
  info: {
    icon: Info,
    iconWrapperClass:
      'bg-[#91B8C0]/15 text-[#2c525a] border border-[#91B8C0]/30 ring-4 ring-[#91B8C0]/10',
    confirmButtonVariant: 'primary',
  },
  primary: {
    icon: HelpCircle,
    iconWrapperClass:
      'bg-[#91B8C0]/15 text-[#2c525a] border border-[#91B8C0]/30 ring-4 ring-[#91B8C0]/10',
    confirmButtonVariant: 'primary',
  },
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  intent = 'danger',
  confirmText,
  cancelText = 'إلغاء',
  isLoading: propLoading,
  icon,
  children,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  zIndex = 9999,
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = propLoading !== undefined ? propLoading : internalLoading;

  const config = intentConfigs[intent];
  const IconComponent = config.icon;

  const defaultConfirmText =
    intent === 'danger'
      ? 'تأكيد الحذف'
      : intent === 'warning'
      ? 'متابعة وتأكيد'
      : 'تأكيد';

  const handleConfirm = async () => {
    try {
      const result = onConfirm();
      if (result instanceof Promise) {
        setInternalLoading(true);
        await result;
      }
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      animation="scale"
      closeOnOutsideClick={!isLoading && closeOnOutsideClick}
      closeOnEsc={!isLoading && closeOnEsc}
      showCloseButton={!isLoading}
      zIndex={zIndex}
    >
      <div className="text-center pt-2 pb-1">
        {/* Visual Badge Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-105 ${config.iconWrapperClass}`}
          >
            {icon || <IconComponent className="w-7 h-7" />}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-black tracking-tight mb-2">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs sm:text-sm text-[#5E6665] leading-relaxed max-w-sm mx-auto mb-4">
            {description}
          </p>
        )}

        {/* Optional Extra Body Content */}
        {children && <div className="mt-4 mb-2 text-right">{children}</div>}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant={config.confirmButtonVariant}
            size="md"
            onClick={handleConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            className="flex-1 font-bold"
          >
            {confirmText || defaultConfirmText}
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default ConfirmModal;

