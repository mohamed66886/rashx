'use client';

import React, { useState } from 'react';
import { UserCheck, Sparkles, Scissors } from 'lucide-react';
import {
  Input,
  PhoneInput,
  EmailInput,
  Select,
  DatePicker,
  Switch,
  SarIcon,
} from '@/components/ui';
import { FormCard } from './FormCard';

export interface StaffFormData {
  fullName: string;
  role: string;
  phone: string;
  email: string;
  branch: string;
  commissionRate: string;
  baseSalary: string;
  joinDate: string;
  shift: string;
  isActive: boolean;
}

export interface AddStaffCardProps {
  onSave?: (data: StaffFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  initialData?: Partial<StaffFormData>;
}

export const AddStaffCard: React.FC<AddStaffCardProps> = ({
  onSave,
  onCancel,
  className = '',
  initialData,
}) => {
  const [formData, setFormData] = useState<StaffFormData>({
    fullName: initialData?.fullName || '',
    role: initialData?.role || 'master-barber',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    branch: initialData?.branch || 'main',
    commissionRate: initialData?.commissionRate || '30',
    baseSalary: initialData?.baseSalary || '',
    joinDate: initialData?.joinDate || new Date().toISOString().split('T')[0],
    shift: initialData?.shift || 'full-time',
    isActive: initialData?.isActive ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('يرجى كتابة اسم الحلاق ورقم جواله');
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
      title="إضافة موظف / حلاق جديد"
      subtitle="تسجيل الحلاق في المنظومة وربطه بالورديات ونظام احتساب العمولات الآلي"
      icon={<Scissors className="w-5 h-5" />}
      badge="فريق العمل"
      accent="primary"
      submitText="إضافة الموظف واعتماد الصلاحيات"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      className={className}
      footerExtra={
        <div className="flex items-center gap-1.5 text-xs text-[#5E6665]">
          <Sparkles className="w-3.5 h-3.5 text-[#91B8C0]" />
          <span>يتم إنشاء حساب كاشير ومسير عمولات تلقائي لكل حلاق</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <Input
          label="اسم الحلاق / الموظف الثلاثي"
          placeholder="مثال: أحمد مصطفى الهاشمي"
          required
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        {/* Role */}
        <Select
          label="المسمى الوظيفي والتخصص"
          value={formData.role}
          onValueChange={(val) => setFormData({ ...formData, role: val })}
          options={[
            { value: 'master-barber', label: 'حلاق رئيسي محترف (Master Barber)' },
            { value: 'stylist', label: 'مصفف شعر وخبير صبغات (Stylist)' },
            { value: 'skin-specialist', label: 'أخصائي بشرة وعناية VIP' },
            { value: 'junior-barber', label: 'حلاق مبتدئ (Junior Barber)' },
            { value: 'receptionist', label: 'موظف استقبال وكاشير' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <PhoneInput
          label="رقم الجوال الخاص بالموظف"
          defaultCountry="SA"
          required
          value={formData.phone}
          onValueChange={(val) => setFormData({ ...formData, phone: val })}
        />

        {/* Email */}
        <EmailInput
          label="البريد الإلكتروني للعمل"
          placeholder="staff@hlaqa.sa"
          value={formData.email}
          onValueChange={(val) => setFormData({ ...formData, email: val })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Branch */}
        <Select
          label="الفرع المخصص"
          value={formData.branch}
          onValueChange={(val) => setFormData({ ...formData, branch: val })}
          options={[
            { value: 'main', label: 'الفرع الرئيسي (طريق الملك فهد)' },
            { value: 'tahlia', label: 'فرع التحلية سنتر' },
            { value: 'nakheel', label: 'فرع النخيل مول' },
          ]}
        />

        {/* Commission Rate (%) */}
        <Input
          label="نسبة العمولة (%)"
          placeholder="30"
          type="number"
          value={formData.commissionRate}
          onChange={(e) =>
            setFormData({ ...formData, commissionRate: e.target.value })
          }
          helperText="نسبة مئوية تُحتسب على كل خدمة ينجزها"
        />

        {/* Base Salary */}
        <Input
          label="الراتب الأساسي الثابت (إن وجد)"
          placeholder="3000"
          type="number"
          leftIcon={<SarIcon className="w-4 h-4 text-[#5E6665]" />}
          value={formData.baseSalary}
          onChange={(e) =>
            setFormData({ ...formData, baseSalary: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shift */}
        <Select
          label="وردية العمل المعتمدة"
          value={formData.shift}
          onValueChange={(val) => setFormData({ ...formData, shift: val })}
          options={[
            { value: 'morning', label: 'وردية صباحية (09:00 ص - 04:00 م)' },
            { value: 'evening', label: 'وردية مسائية (04:00 م - 12:00 ص)' },
            { value: 'full-time', label: 'دوام كامل (مع ساعة راحة)' },
            { value: 'weekend', label: 'عطلة نهاية الأسبوع فقط' },
          ]}
        />

        {/* Join Date */}
        <DatePicker
          label="تاريخ بدء العمل والتعاقد"
          value={formData.joinDate}
          onChange={(e) =>
            setFormData({ ...formData, joinDate: e.target.value })
          }
        />
      </div>

      {/* Active Status Switch */}
      <div className="pt-2 border-t border-[#E5E9E8]/60">
        <Switch
          checked={formData.isActive}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isActive: checked })
          }
          label="تفعيل الحساب فوراً وإظهار الحلاق في شاشة الحجوزات ونقطة البيع"
          description="يمكن للحلاق تسجيل الدخول عبر رقمه لمتابعة عمولاته اليومية"
        />
      </div>
    </FormCard>
  );
};

export default AddStaffCard;

