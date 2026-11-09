'use client';

import React from 'react';
import { ModalBase } from './ModalBase';
import type { ModalBaseProps } from './types';

export interface ModalProps extends ModalBaseProps {}

/**
 * Standard Modal Component with ultra-smooth enter & exit transitions.
 */
export const Modal: React.FC<ModalProps> = (props) => {
  return <ModalBase {...props} />;
};

export default Modal;

