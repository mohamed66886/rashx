'use client';

import React from 'react';

export type ModalSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | 'full';

export type ModalAnimation =
  | 'scale'
  | 'slide-up'
  | 'slide-down'
  | 'fade'
  | 'drawer-right'
  | 'drawer-left'
  | 'drawer-bottom';

export type ModalPosition = 'center' | 'top' | 'bottom';

export type ModalBackdropVariant = 'blur' | 'dim' | 'dark' | 'transparent';

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerIcon?: React.ReactNode;
  size?: ModalSize;
  animation?: ModalAnimation;
  position?: ModalPosition;
  backdropVariant?: ModalBackdropVariant;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  zIndex?: number;
  dir?: 'rtl' | 'ltr';
  duration?: number;
}

