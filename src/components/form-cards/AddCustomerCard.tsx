'use client';

import React, { useState } from 'react';
import { UserPlus, Sparkles } from 'lucide-react';
import {
  Input,
  PhoneInput,
  EmailInput,
  Select,
  DatePicker,
  TextArea,
  Switch,
} from '@/components/ui';
import { FormCard } from './FormCard';

export interface CustomerFormData {
  fullName: string;
  nationalId?: string;
  phone: string;
  email: string;
  category: string;
  birthDate?: string;
  notes?: string;
  smsNotifications: boolean;
}

export interface AddCustomerCardProps {
  onSave?: (data: CustomerFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  initialData?: Partial<CustomerFormData>;
}

export const AddCustomerCard: React.FC<AddCustomerCardProps> = ({
  onSave,
  onCancel,
  className = '',
  initialData,
}) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    fullName: initialData?.fullName || '',
    nationalId: initialData?.nationalId || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    category: initialData?.category || 'regular',
    birthDate: initialData?.birthDate || '',
    notes: initialData?.notes || '',
    smsNotifications: initialData?.smsNotifications ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName) {
      alert('يرجى كتابة اسم العميل');
      return;
    }

    try {
      setIsSubmitting(true);
      if (onSave) {
        await onSave(formData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormCard
      title="إضافة عميل جديد"
      subtitle="تسجيل بيانات العميل وربطه بملف العملاء وبرنامج الولاء المعتمد"
      icon={<UserPlus className="w-5 h-5" />}
      badge="سجل فوري"
      accent="primary"
      submitText="إضافة العميل وتأكيد الملف"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      className={className}
      footerExtra={
        <div className="flex items-center gap-1.5 text-xs text-[#5E6665]">
          <Sparkles className="w-3.5 h-3.5 text-[#91B8C0]" />
          <span>يتم إنشاء بطاقة ولاء رقمية تلقائياً للعميل</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <Input
          label="اسم العميل الكامل"
          placeholder="مثال: عبدالله بن عبدالعزيز التميمي"
          required
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        {/* National ID / Resident ID */}
        <Input
          label="رقم الهوية الوطنية / الإقامة (اختياري)"
          placeholder="10XXXXXXXX"
          value={formData.nationalId}
          onChange={(e) =>
            setFormData({ ...formData, nationalId: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone Input with Country Code */}
        <PhoneInput
          label="رقم الجوال الشخصي"
          defaultCountry="SA"
          required
          value={formData.phone}
          onValueChange={(val) => setFormData({ ...formData, phone: val })}
        />

        {/* Email Input with domain autocomplete */}
        <EmailInput
          label="البريد الإلكتروني"
          placeholder="client@domain.sa"
          value={formData.email}
          onValueChange={(val) => setFormData({ ...formData, email: val })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Category */}
        <Select
          label="تصنيف العميل"
          value={formData.category}
          onValueChange={(val) => setFormData({ ...formData, category: val })}
          options={[
            { value: 'vip', label: 'عميل مميز (VIP Club)' },
            { value: 'regular', label: 'عميل دوري معتاد (Regular)' },
            { value: 'corporate', label: 'عميل شركات وقطاع أعمال (Corporate)' },
            { value: 'new', label: 'عميل جديد للمرة الأولى' },
          ]}
        />

        {/* Date of Birth / Anniversary */}
        <DatePicker
          label="تاريخ الميلاد (للعروض السنوية والهدايا)"
          value={formData.birthDate}
          onChange={(e) =>
            setFormData({ ...formData, birthDate: e.target.value })
          }
        />
      </div>

      {/* Notes */}
      <TextArea
        label="ملاحظات وتفضيلات العميل (الحلاقة، الحساسية، التفضيلات)"
        placeholder="أدخل أي ملاحظات هامة أو تسريحة الحلاقة والمنتجات المفضلة لديه..."
        rows={3}
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />

      {/* Switch Notification */}
      <div className="pt-2 border-t border-[#E5E9E8]/60">
        <Switch
          checked={formData.smsNotifications}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, smsNotifications: checked })
          }
          label="إرسال رسائل تذكير بالمواعيد وعروض النقاط عبر الرسائل القصيرة (SMS)"
          description="تفعيل الإشعار التلقائي بالموعد قبل 24 ساعة وساعة من الموعد"
        />
      </div>
    </FormCard>
  );
};

export default AddCustomerCard;

