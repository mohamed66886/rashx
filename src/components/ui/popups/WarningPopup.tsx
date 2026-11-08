'use client';

import React from 'react';
import { PopupBase } from './PopupBase';
import { Button, ButtonVariant } from '../Button';

export interface WarningPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
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

export const WarningPopup: React.FC<WarningPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'تحذير أمني ونظامي',
  message = 'يرجى الانتباه: هذا الإجراء حساس وقد يترتب عليه تعديلات جوهرية على السجلات المسجلة.',
  children,
  confirmText = 'فهمت، واستمرار',
  cancelText = 'تراجع',
  confirmVariant = 'warning',
  isLoading = false,
  playSound = true,
  className = '',
}) => {
  return (
    <PopupBase
      isOpen={isOpen}
      onClose={onClose}
      type="warning"
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

          {onConfirm && (
            <Button
              variant={confirmVariant}
              size="md"
              fullWidth
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmText}
            </Button>
          )}
        </>
      }
    >
      {children}
    </PopupBase>
  );
};

export default WarningPopup;

