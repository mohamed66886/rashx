'use client';

import React, { useState } from 'react';
import { UserPlus2, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import {
  Input,
  PhoneInput,
  EmailInput,
  Select,
  Checkbox,
  Button,
} from '@/components/ui';
import { FormCard } from './FormCard';

export interface RegisterFormData {
  businessName: string;
  crNumber?: string;
  ownerName: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  salonScale: string;
  acceptTerms: boolean;
}

export interface RegisterAccountCardProps {
  onRegister?: (data: RegisterFormData) => void | Promise<void>;
  onLoginClick?: () => void;
  className?: string;
}

export const RegisterAccountCard: React.FC<RegisterAccountCardProps> = ({
  onRegister,
  onLoginClick,
  className = '',
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    businessName: '',
    crNumber: '',
    ownerName: '',
    phone: '',
    email: '',
    password: '',
    city: 'riyadh',
    salonScale: 'single-branch',
    acceptTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.ownerName || !formData.phone || !formData.password) {
      alert('يرجى استيفاء الحقول الإلزامية المطلوبة');
      return;
    }
    if (!formData.acceptTerms) {
      alert('يرجى الموافقة على الشروط والأحكام لإتمام التسجيل');
      return;
    }

    try {
      setIsSubmitting(true);
      if (onRegister) {
        await onRegister(formData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormCard
      title="إنشاء حساب منشأة جديد"
      subtitle="سجل صالونك أو مركزك في منظومة HLAQA للتشغيل والفوترة الرقمية بامتياز"
      icon={<UserPlus2 className="w-5 h-5" />}
      badge="تجربة مجانية 14 يوم"
      accent="primary"
      submitText="إنشاء الحساب وبدء التشغيل فوراً"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      className={className}
      stepIndicator={{
        current: 1,
        total: 2,
        stepTitle: 'بيانات المنشأة والمالك',
      }}
      footerExtra={
        onLoginClick ? (
          <div className="text-xs text-[#5E6665]">
            لديك حساب مسجل بالفعل؟{' '}
            <button
              type="button"
              onClick={onLoginClick}
              className="text-[#91B8C0] font-bold hover:underline cursor-pointer"
            >
              تسجيل الدخول هنا
            </button>
          </div>
        ) : undefined
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Name */}
        <Input
          label="اسم الصالون أو المركز التجاري"
          placeholder="مثال: صالون النخبة الراقي للحلاقة"
          required
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
        />

        {/* Commercial Registration */}
        <Input
          label="رقم السجل التجاري أو وثيقة العمل الحر"
          placeholder="1010XXXXXX"
          value={formData.crNumber}
          onChange={(e) =>
            setFormData({ ...formData, crNumber: e.target.value })
          }
          helperText="للربط التلقائي المباشر مع منصة زاتكا وسدايا"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Owner Name */}
        <Input
          label="اسم المالك أو المسؤول المفوض"
          placeholder="مثال: خالد بن سلطان المنصور"
          required
          value={formData.ownerName}
          onChange={(e) =>
            setFormData({ ...formData, ownerName: e.target.value })
          }
        />

        {/* Mobile Phone */}
        <PhoneInput
          label="رقم جوال المسؤول (لتلقي رمز التحقق OTP)"
          defaultCountry="SA"
          required
          value={formData.phone}
          onValueChange={(val) => setFormData({ ...formData, phone: val })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <EmailInput
          label="البريد الإلكتروني الرسمي للمنشأة"
          placeholder="admin@hlaqa.sa"
          required
          value={formData.email}
          onValueChange={(val) => setFormData({ ...formData, email: val })}
        />

        {/* Password */}
        <div className="relative">
          <Input
            label="كلمة المرور المشفرة"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            helperText="8 خانات على الأقل تتضمن أحرف وأرقام"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City */}
        <Select
          label="المدينة والمنطقة"
          value={formData.city}
          onValueChange={(val) => setFormData({ ...formData, city: val })}
          options={[
            { value: 'riyadh', label: 'الرياض (منطقة الرياض)' },
            { value: 'jeddah', label: 'جدة (منطقة مكة المكرمة)' },
            { value: 'makkah', label: 'مكة المكرمة' },
            { value: 'dammam', label: 'الدمام والخبر (المنطقة الشرقية)' },
            { value: 'madinah', label: 'المدينة المنورة' },
            { value: 'other', label: 'مدينة أخرى بالمملكة' },
          ]}
        />

        {/* Salon Scale */}
        <Select
          label="حجم ونطاق الصالون"
          value={formData.salonScale}
          onValueChange={(val) => setFormData({ ...formData, salonScale: val })}
          options={[
            { value: 'single-branch', label: 'فرع واحد (1 - 4 كراسي حلاقة)' },
            { value: 'medium-salon', label: 'صالون متوسط (5 - 10 كراسي حلاقة)' },
            { value: 'multi-branch', label: 'سلسلة فروع ومراكز متعددة' },
          ]}
        />
      </div>

      {/* Terms & Conditions */}
      <div className="pt-2 border-t border-[#E5E9E8]/60">
        <Checkbox
          checked={formData.acceptTerms}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, acceptTerms: checked as boolean })
          }
          label={
            <span className="text-xs">
              أقر بصحة البيانات وأوافق على{' '}
              <a href="#terms" className="text-[#91B8C0] font-bold hover:underline">
                شروط الاستخدام
              </a>{' '}
              و{' '}
              <a href="#privacy" className="text-[#91B8C0] font-bold hover:underline">
                سياسة حماية البيانات
              </a>{' '}
              المعتمدة في المملكة العربية السعودية.
            </span>
          }
          description="تخضع جميع الحسابات لحماية التشفير القياسي AES-256"
        />
      </div>
    </FormCard>
  );
};

export default RegisterAccountCard;

