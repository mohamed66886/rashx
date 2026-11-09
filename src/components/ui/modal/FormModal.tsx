'use client';

import React, { useState } from 'react';
import { ModalBase } from './ModalBase';
import { Button, type ButtonVariant } from '@/components/ui/Button';
import type { ModalSize } from './types';

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  submitVariant?: ButtonVariant;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  size?: ModalSize;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  contentClassName?: string;
  zIndex?: number;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  children,
  submitText = 'حفظ البيانات',
  cancelText = 'إلغاء',
  submitVariant = 'primary',
  isSubmitting: propSubmitting,
  submitDisabled = false,
  size = 'md',
  closeOnOutsideClick = false,
  closeOnEsc = true,
  className = '',
  contentClassName = '',
  zIndex = 9999,
}) => {
  const [internalSubmitting, setInternalSubmitting] = useState(false);
  const isSubmitting =
    propSubmitting !== undefined ? propSubmitting : internalSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = onSubmit(e);
      if (result instanceof Promise) {
        setInternalSubmitting(true);
        await result;
      }
    } finally {
      setInternalSubmitting(false);
    }
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
      animation="scale"
      closeOnOutsideClick={!isSubmitting && closeOnOutsideClick}
      closeOnEsc={!isSubmitting && closeOnEsc}
      showCloseButton={!isSubmitting}
      className={className}
      contentClassName={contentClassName}
      zIndex={zIndex}
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {cancelText}
          </Button>

          <Button
            type="submit"
            form="modal-form"
            variant={submitVariant}
            size="md"
            isLoading={isSubmitting}
            disabled={submitDisabled || isSubmitting}
            className="font-bold"
          >
            {submitText}
          </Button>
        </div>
      }
    >
      <form id="modal-form" onSubmit={handleSubmit} className="space-y-4">
        {children}
      </form>
    </ModalBase>
  );
};

export default FormModal;

