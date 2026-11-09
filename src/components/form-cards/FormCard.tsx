'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
} from '@/components/ui';
import type { FormCardBaseProps } from './types';

export interface FormCardProps extends FormCardBaseProps {
  onSubmit?: (e: React.FormEvent) => void | Promise<void>;
  footerExtra?: React.ReactNode;
  showFooter?: boolean;
  accent?: 'none' | 'primary' | 'secondary';
  rounded?: 'lg' | 'xl' | '2xl' | '3xl';
  stepIndicator?: {
    current: number;
    total: number;
    stepTitle?: string;
  };
}

export const FormCard: React.FC<FormCardProps> = ({
  title,
  subtitle,
  icon,
  badge,
  headerAction,
  submitText = 'حفظ البيانات',
  cancelText = 'إلغاء',
  submitVariant = 'primary',
  isSubmitting = false,
  submitDisabled = false,
  onCancel,
  onSubmit,
  footerExtra,
  showFooter = true,
  accent = 'primary',
  rounded = '2xl',
  stepIndicator,
  className = '',
  children,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <Card
      rounded={rounded}
      accent={accent}
      className={`bg-white border border-[#E5E9E8] shadow-xs hover:border-[#91B8C0]/50 transition-all ${className}`}
      dir="rtl"
    >
      <form onSubmit={handleSubmit}>
        {/* Header */}
        {(title || subtitle || icon || badge || headerAction || stepIndicator) && (
          <CardHeader className="p-6 border-b border-[#E5E9E8]/70 bg-white">
            {stepIndicator && (
              <div className="flex items-center justify-between mb-3 text-xs text-[#5E6665] font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#91B8C0]" />
                  <span>
                    الخطوة {stepIndicator.current} من {stepIndicator.total}
                    {stepIndicator.stepTitle ? ` — ${stepIndicator.stepTitle}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: stepIndicator.total }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx < stepIndicator.current
                          ? 'w-6 bg-[#91B8C0]'
                          : 'w-3 bg-[#E5E9E8]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                {icon && (
                  <div className="shrink-0 p-2.5 rounded-xl bg-[#91B8C0]/15 text-[#2c555e] border border-[#91B8C0]/30">
                    {icon}
                  </div>
                )}
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {title && (
                      <CardTitle className="text-lg sm:text-xl font-bold text-black tracking-tight">
                        {title}
                      </CardTitle>
                    )}
                    {badge && (
                      typeof badge === 'string' ? (
                        <Badge variant="primary" size="sm">
                          {badge}
                        </Badge>
                      ) : (
                        badge
                      )
                    )}
                  </div>
                  {subtitle && (
                    <CardDescription className="text-xs text-[#5E6665] leading-relaxed">
                      {subtitle}
                    </CardDescription>
                  )}
                </div>
              </div>

              {headerAction && <div className="shrink-0">{headerAction}</div>}
            </div>
          </CardHeader>
        )}

        {/* Form Body */}
        <CardContent className="p-6 space-y-5 text-black">
          {children}
        </CardContent>

        {/* Footer Actions */}
        {showFooter && (
          <CardFooter className="p-6 border-t border-[#E5E9E8]/70 bg-[#FAFBFB] flex flex-wrap items-center justify-between gap-3">
            <div>{footerExtra}</div>
            <div className="flex items-center gap-3 mr-auto">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  {cancelText}
                </Button>
              )}
              <Button
                type="submit"
                variant={submitVariant}
                size="md"
                isLoading={isSubmitting}
                disabled={submitDisabled || isSubmitting}
                className="font-bold min-w-32"
              >
                {submitText}
              </Button>
            </div>
          </CardFooter>
        )}
      </form>
    </Card>
  );
};

export default FormCard;

