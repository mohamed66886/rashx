'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Scissors, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  Input,
  PhoneInput,
  Select,
  DatePicker,
  TimePicker,
  TextArea,
  Checkbox,
  SarIcon,
} from '@/components/ui';
import { FormCard } from './FormCard';

export interface BookingFormData {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  sendReminder: boolean;
}

export interface AppointmentBookingCardProps {
  onBook?: (data: BookingFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  initialData?: Partial<BookingFormData>;
}

export const AppointmentBookingCard: React.FC<AppointmentBookingCardProps> = ({
  onBook,
  onCancel,
  className = '',
  initialData,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: initialData?.serviceId || 'hair-beard-vip',
    barberId: initialData?.barberId || 'barber-1',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    time: initialData?.time || '17:30',
    customerName: initialData?.customerName || '',
    customerPhone: initialData?.customerPhone || '',
    notes: initialData?.notes || '',
    sendReminder: initialData?.sendReminder ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone) {
      alert('يرجى ملء اسم العميل ورقم جواله لتأكيد الحجز');
      return;
    }

    try {
      setIsSubmitting(true);
      if (onBook) {
        await onBook(formData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormCard
      title="حجز موعد جديد في الصالون"
      subtitle="تسجيل وتثبيت حجز موعد مؤكد مع اختيار الحلاق، الخدمة، والوقت المناسب"
      icon={<Calendar className="w-5 h-5" />}
      badge="حجز إلكتروني"
      accent="secondary"
      submitText="تأكيد حجز الموعد الآن"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      className={className}
      footerExtra={
        <div className="flex items-center gap-1.5 text-xs text-[#5E6665]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>لا يتم خصم أي مبالغ حتى الحضور إلى الصالون (الدفع عند الكاشير)</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Select */}
        <Select
          label="الخدمة المطلوبة"
          value={formData.serviceId}
          onValueChange={(val) => setFormData({ ...formData, serviceId: val })}
          options={[
            { value: 'hair-beard-vip', label: 'باقة VIP: حلاقة شعر + ذقن + غسيل (140 ر.س)' },
            { value: 'haircut-classic', label: 'حلاقة وقص شعر كلاسيكي (60 ر.س)' },
            { value: 'beard-grooming', label: 'تحديد وتشذيب الذقن بالبخار (50 ر.س)' },
            { value: 'facial-care', label: 'جلسة تنظيف بشرة ملكية عميقة (180 ر.س)' },
            { value: 'groom-package', label: 'باقة العريس المتكاملة (350 ر.س)' },
          ]}
        />

        {/* Barber Select */}
        <Select
          label="الحلاق المفضل (أو أقرب متاح)"
          value={formData.barberId}
          onValueChange={(val) => setFormData({ ...formData, barberId: val })}
          options={[
            { value: 'any', label: 'أي حلاق متاح في الوقت المحدد (أسرع موعد)' },
            { value: 'barber-1', label: 'أحمد الهاشمي (حلاق رئيسي VIP)' },
            { value: 'barber-2', label: 'كريم المنصور (خبير تسريحات)' },
            { value: 'barber-3', label: 'طارق السعيد (أخصائي عناية)' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Picker */}
        <DatePicker
          label="تاريخ الموعد"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        {/* Time Picker */}
        <TimePicker
          label="وقت الموعد المحدد"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Name */}
        <Input
          label="اسم العميل"
          placeholder="مثال: تركي بن عبدالرحمن"
          required
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
        />

        {/* Customer Phone */}
        <PhoneInput
          label="رقم جوال العميل (لتلقي رابط التأكيد والموقع)"
          defaultCountry="SA"
          required
          value={formData.customerPhone}
          onValueChange={(val) =>
            setFormData({ ...formData, customerPhone: val })
          }
        />
      </div>

      {/* Notes */}
      <TextArea
        label="ملاحظات إضافية للحلاق (اختياري)"
        placeholder="أدخل أي رغبات مسبقة أو ملاحظات خاصة..."
        rows={2}
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />

      {/* Reminder Checkbox */}
      <div className="pt-2 border-t border-[#E5E9E8]/60">
        <Checkbox
          checked={formData.sendReminder}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, sendReminder: checked as boolean })
          }
          label="إرسال تذكير آلي عبر تطبيق الواتساب والرسائل القصيرة قبل الموعد بساعتين"
        />
      </div>
    </FormCard>
  );
};

export default AppointmentBookingCard;

