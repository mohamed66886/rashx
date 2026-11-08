'use client';

import React from 'react';
import { PopupBase } from './PopupBase';
import { Button } from '../Button';

export interface ErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  title?: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  retryText?: string;
  closeText?: string;
  isLoading?: boolean;
  playSound?: boolean;
  className?: string;
}

export const ErrorPopup: React.FC<ErrorPopupProps> = ({
  isOpen,
  onClose,
  onRetry,
  title = 'تعذر إكمال العملية',
  message = 'حدث خطأ غير متوقع أثناء معالجة البيانات، يرجى مراجعة المدخلات أو المحاولة مرة أخرى.',
  children,
  retryText = 'إعادة المحاولة',
  closeText = 'إغلاق',
  isLoading = false,
  playSound = true,
  className = '',
}) => {
  return (
    <PopupBase
      isOpen={isOpen}
      onClose={onClose}
      type="error"
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
            {closeText}
          </Button>

          {onRetry && (
            <Button
              variant="danger"
              size="md"
              fullWidth
              onClick={onRetry}
              isLoading={isLoading}
            >
              {retryText}
            </Button>
          )}
        </>
      }
    >
      {children}
    </PopupBase>
  );
};

export default ErrorPopup;

