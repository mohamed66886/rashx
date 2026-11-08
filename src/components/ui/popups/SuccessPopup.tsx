'use client';

import React from 'react';
import { PopupBase } from './PopupBase';
import { Button } from '../Button';

export interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  buttonText?: string;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  playSound?: boolean;
  className?: string;
}

export const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  onClose,
  title = 'تمت العملية بنجاح تام',
  message = 'تم تسجيل واعتماد كافة البيانات والعمليات المالية بنجاح داخل منظومة راش اكس.',
  children,
  buttonText = 'رائع، استمرار',
  secondaryActionText,
  onSecondaryAction,
  playSound = true,
  className = '',
}) => {
  return (
    <PopupBase
      isOpen={isOpen}
      onClose={onClose}
      type="success"
      title={title}
      message={message}
      playSound={playSound}
      className={className}
      actions={
        <>
          {secondaryActionText && onSecondaryAction && (
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={onSecondaryAction}
            >
              {secondaryActionText}
            </Button>
          )}

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={onClose}
          >
            {buttonText}
          </Button>
        </>
      }
    >
      {children}
    </PopupBase>
  );
};

export default SuccessPopup;

