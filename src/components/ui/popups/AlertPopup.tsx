'use client';

import React from 'react';
import { PopupBase } from './PopupBase';
import { Button } from '../Button';

export interface AlertPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  message?: React.ReactNode;
  children?: React.ReactNode;
  buttonText?: string;
  playSound?: boolean;
  className?: string;
}

export const AlertPopup: React.FC<AlertPopupProps> = ({
  isOpen,
  onClose,
  title = 'تنبيه ومعلومة هامة',
  message = 'نود إحاطتكم علماً بتحديث وتأكيد العمليات وفق المعايير المعتمدة في منصة راش اكس.',
  children,
  buttonText = 'حسناً، تم الاطلاع',
  playSound = true,
  className = '',
}) => {
  return (
    <PopupBase
      isOpen={isOpen}
      onClose={onClose}
      type="alert"
      title={title}
      message={message}
      playSound={playSound}
      className={className}
      actions={
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={onClose}
        >
          {buttonText}
        </Button>
      }
    >
      {children}
    </PopupBase>
  );
};

export default AlertPopup;

