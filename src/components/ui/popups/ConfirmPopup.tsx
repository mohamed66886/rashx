'use client';

import React from 'react';
import { PopupBase } from './PopupBase';
import { Button, ButtonVariant } from '../Button';

export interface ConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: ButtonVariant;
  isLoading?: boolean;
  playSound?: boolean;
  className?: string;
}

export const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأكيد الإجراء',
  message = 'هل أنت متأكد من رغبتك في متابعة هذا الإجراء؟ لا يمكن التراجع عن بعض الخطوات.',
  children,
  confirmText = 'تأكيد ومتابعة',
  cancelText = 'إلغاء الأمر',
  confirmVariant = 'primary',
  isLoading = false,
  playSound = true,
  className = '',
}) => {
  return (
    <PopupBase
      isOpen={isOpen}
      onClose={onClose}
      type="confirm"
      title={title}
      message={message}
      playSound={playSound}
      className={className}
      actions={
        <>
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>

          <Button
            variant={confirmVariant}
            size="md"
            fullWidth
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      {children}
    </PopupBase>
  );
};

export default ConfirmPopup;

