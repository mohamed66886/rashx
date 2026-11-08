'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { ConfirmPopup } from './ConfirmPopup';
import { WarningPopup } from './WarningPopup';
import { AlertPopup } from './AlertPopup';
import { SuccessPopup } from './SuccessPopup';
import { ErrorPopup } from './ErrorPopup';
import { PopupType } from './AnimatedSvgIcon';

export interface PopupConfig {
  title?: React.ReactNode;
  message?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  buttonText?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export interface PopupContextValue {
  show: (type: PopupType, config: PopupConfig | string) => void;
  alert: (message: React.ReactNode, title?: React.ReactNode) => void;
  confirm: (
    messageOrConfig: React.ReactNode | PopupConfig,
    onConfirm?: () => void
  ) => void;
  warning: (
    messageOrConfig: React.ReactNode | PopupConfig,
    onConfirm?: () => void
  ) => void;
  success: (message: React.ReactNode, title?: React.ReactNode) => void;
  error: (message: React.ReactNode, title?: React.ReactNode) => void;
  close: () => void;
}

const PopupContext = createContext<PopupContextValue | null>(null);

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a <PopupProvider>');
  }
  return context;
}

export interface PopupProviderProps {
  children: React.ReactNode;
  interceptNativeAlert?: boolean;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({
  children,
  interceptNativeAlert = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<PopupType>('alert');
  const [config, setConfig] = useState<PopupConfig>({});

  const close = useCallback(() => {
    setIsOpen(false);
    config.onClose?.();
  }, [config]);

  const show = useCallback((popupType: PopupType, cfg: PopupConfig | string) => {
    setType(popupType);
    if (typeof cfg === 'string') {
      setConfig({ message: cfg });
    } else {
      setConfig(cfg);
    }
    setIsOpen(true);
  }, []);

  const alert = useCallback(
    (message: React.ReactNode, title: React.ReactNode = 'تنبيه من المنظومة') => {
      show('alert', { title, message });
    },
    [show]
  );

  const success = useCallback(
    (message: React.ReactNode, title: React.ReactNode = 'تمت العملية بنجاح') => {
      show('success', { title, message });
    },
    [show]
  );

  const error = useCallback(
    (message: React.ReactNode, title: React.ReactNode = 'حدث خطأ في النظام') => {
      show('error', { title, message });
    },
    [show]
  );

  const confirm = useCallback(
    (
      messageOrConfig: React.ReactNode | PopupConfig,
      onConfirm?: () => void
    ) => {
      if (
        typeof messageOrConfig === 'string' ||
        React.isValidElement(messageOrConfig)
      ) {
        show('confirm', {
          title: 'تأكيد الإجراء',
          message: messageOrConfig,
          onConfirm,
        });
      } else {
        show('confirm', messageOrConfig as PopupConfig);
      }
    },
    [show]
  );

  const warning = useCallback(
    (
      messageOrConfig: React.ReactNode | PopupConfig,
      onConfirm?: () => void
    ) => {
      if (
        typeof messageOrConfig === 'string' ||
        React.isValidElement(messageOrConfig)
      ) {
        show('warning', {
          title: 'تحذير نظامي',
          message: messageOrConfig,
          onConfirm,
        });
      } else {
        show('warning', messageOrConfig as PopupConfig);
      }
    },
    [show]
  );

  // Intercept native browser window.alert so that ANY alert(...) uses RASHX popup with sound & animated SVG!
  useEffect(() => {
    if (typeof window === 'undefined' || !interceptNativeAlert) return;

    const originalAlert = window.alert;

    window.alert = (message?: unknown) => {
      alert(String(message ?? ''));
    };

    return () => {
      window.alert = originalAlert;
    };
  }, [alert, interceptNativeAlert]);

  const handleConfirm = () => {
    setIsOpen(false);
    config.onConfirm?.();
  };

  return (
    <PopupContext.Provider
      value={{ show, alert, confirm, warning, success, error, close }}
    >
      {children}

      {/* Render matching active popup */}
      {isOpen && (
        <>
          {type === 'confirm' && (
            <ConfirmPopup
              isOpen={isOpen}
              onClose={close}
              onConfirm={handleConfirm}
              title={config.title || 'تأكيد الإجراء'}
              message={config.message}
              confirmText={config.confirmText}
              cancelText={config.cancelText}
            />
          )}

          {type === 'warning' && (
            <WarningPopup
              isOpen={isOpen}
              onClose={close}
              onConfirm={config.onConfirm ? handleConfirm : undefined}
              title={config.title || 'تحذير أمني ونظامي'}
              message={config.message}
              confirmText={config.confirmText}
              cancelText={config.cancelText}
            />
          )}

          {type === 'alert' && (
            <AlertPopup
              isOpen={isOpen}
              onClose={close}
              title={config.title || 'تنبيه ومعلومة هامة'}
              message={config.message}
              buttonText={config.buttonText}
            />
          )}

          {type === 'success' && (
            <SuccessPopup
              isOpen={isOpen}
              onClose={close}
              title={config.title || 'تمت العملية بنجاح تام'}
              message={config.message}
              buttonText={config.buttonText}
            />
          )}

          {type === 'error' && (
            <ErrorPopup
              isOpen={isOpen}
              onClose={close}
              onRetry={config.onConfirm ? handleConfirm : undefined}
              title={config.title || 'تعذر إكمال العملية'}
              message={config.message}
            />
          )}
        </>
      )}
    </PopupContext.Provider>
  );
};

export default PopupProvider;

