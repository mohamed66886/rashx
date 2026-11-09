'use client';

import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react';
import { ModalBase } from './ModalBase';
import { Button } from '@/components/ui/Button';

export type AlertModalType = 'info' | 'success' | 'warning' | 'error';

export interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: AlertModalType;
  title: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  buttonText?: string;
  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  zIndex?: number;
}

const typeConfigs: Record<
  AlertModalType,
  {
    icon: React.ElementType;
    iconClass: string;
    buttonVariant:
      | 'primary'
      | 'secondary'
      | 'danger'
      | 'warning'
      | 'success';
  }
> = {
  success: {
    icon: CheckCircle2,
    iconClass:
      'bg-emerald-50 text-emerald-600 border border-emerald-100 ring-4 ring-emerald-50',
    buttonVariant: 'success',
  },
  warning: {
    icon: AlertTriangle,
    iconClass:
      'bg-amber-50 text-amber-600 border border-amber-100 ring-4 ring-amber-50',
    buttonVariant: 'warning',
  },
  error: {
    icon: XCircle,
    iconClass:
      'bg-red-50 text-red-600 border border-red-100 ring-4 ring-red-50',
    buttonVariant: 'danger',
  },
  info: {
    icon: Info,
    iconClass:
      'bg-[#91B8C0]/15 text-[#2a5058] border border-[#91B8C0]/30 ring-4 ring-[#91B8C0]/10',
    buttonVariant: 'primary',
  },
};

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  type = 'info',
  title,
  message,
  children,
  buttonText = 'حسناً، فهمت ذلك',
  secondaryButtonText,
  onSecondaryClick,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  zIndex = 9999,
}) => {
  const config = typeConfigs[type];
  const IconComponent = config.icon;

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      animation="scale"
      closeOnOutsideClick={closeOnOutsideClick}
      closeOnEsc={closeOnEsc}
      showCloseButton={true}
      zIndex={zIndex}
    >
      <div className="text-center pt-2 pb-1">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform hover:scale-105 ${config.iconClass}`}
          >
            <IconComponent className="w-7 h-7" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-black tracking-tight mb-2">
          {title}
        </h3>

        {/* Message */}
        {message && (
          <p className="text-xs sm:text-sm text-[#5E6665] leading-relaxed max-w-sm mx-auto mb-4">
            {message}
          </p>
        )}

        {/* Optional Custom Content */}
        {children && <div className="mt-4 mb-2 text-right">{children}</div>}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {secondaryButtonText && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onSecondaryClick || onClose}
              className="flex-1"
            >
              {secondaryButtonText}
            </Button>
          )}

          <Button
            type="button"
            variant={config.buttonVariant}
            size="md"
            onClick={onClose}
            className="flex-1 font-bold"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default AlertModal;

