'use client';

import React from 'react';
import type { ButtonVariant } from '@/components/ui/Button';

export interface FormCardBaseProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  headerAction?: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  submitVariant?: ButtonVariant;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  onCancel?: () => void;
  className?: string;
  children?: React.ReactNode;
}

