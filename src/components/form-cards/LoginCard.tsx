'use client';

import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Lock, KeyRound } from 'lucide-react';
import {
  EmailInput,
  Input,
  Checkbox,
  Button,
} from '@/components/ui';
import { FormCard } from './FormCard';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginCardProps {
  onLogin?: (data: LoginFormData) => void | Promise<void>;
  onRegisterClick?: () => void;
  onForgotPasswordClick?: () => void;
  className?: string;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  onLogin,
  onRegisterClick,
  onForgotPasswordClick,
  className = '',
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    try {
      setIsSubmitting(true);
      if (onLogin) {
        await onLogin(formData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormCard
      title="تسجيل الدخول إلى المنظومة"
      subtitle="أدخل بيانات حسابك للمتابعة وإدارة الصالون، نقطة البيع، والتقارير المالية"
      icon={<LogIn className="w-5 h-5" />}
      badge="بوابة آمنة"
      accent="primary"
      submitText="تسجيل الدخول"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      className={`max-w-md mx-auto ${className}`}
      footerExtra={
        onRegisterClick ? (
          <div className="text-xs text-[#5E6665]">
            ليس لديك حساب بعد؟{' '}
            <button
              type="button"
              onClick={onRegisterClick}
              className="text-[#91B8C0] font-bold hover:underline cursor-pointer"
            >
              سجل صالونك الآن
            </button>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-4">
        {/* Email */}
        <EmailInput
          label="البريد الإلكتروني المسجل"
          placeholder="admin@hlaqa.sa"
          required
          value={formData.email}
          onValueChange={(val) => setFormData({ ...formData, email: val })}
        />

        {/* Password */}
        <div>
          <Input
            label="كلمة المرور"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#5E6665] hover:text-black transition-colors cursor-pointer p-1"
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
          />
        </div>

        {/* Options Row: Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <Checkbox
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, rememberMe: checked as boolean })
            }
            label="تذكرني على هذا الجهاز"
          />

          {onForgotPasswordClick && (
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="text-[#5E6665] hover:text-black hover:underline cursor-pointer font-medium"
            >
              نسيت كلمة المرور؟
            </button>
          )}
        </div>

        {/* Quick Access Helper */}
        <div className="p-3 rounded-xl border border-[#E5E9E8] bg-[#FAFBFB] text-xs text-[#5E6665] flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#91B8C0] shrink-0" />
          <span>يدعم النظام الدخول الموحد (SSO) والمصادقة الثنائية (2FA) للأمان.</span>
        </div>
      </div>
    </FormCard>
  );
};

export default LoginCard;

