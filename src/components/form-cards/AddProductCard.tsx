'use client';

import React, { useState } from 'react';
import { PackagePlus, Sparkles } from 'lucide-react';
import {
  Input,
  Select,
  TextArea,
  Switch,
  SarIcon,
  FileUpload,
} from '@/components/ui';
import { FormCard } from './FormCard';

export interface ProductFormData {
  name: string;
  type: 'service' | 'product';
  category: string;
  price: number | string;
  cost?: number | string;
  durationOrStock: string;
  sku?: string;
  description?: string;
  isActive: boolean;
}

export interface AddProductCardProps {
  onSave?: (data: ProductFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  initialData?: Partial<ProductFormData>;
}

export const AddProductCard: React.FC<AddProductCardProps> = ({
  onSave,
  onCancel,
  className = '',
  initialData,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || '',
    type: initialData?.type || 'service',
    category: initialData?.category || 'haircut',
    price: initialData?.price || '',
    cost: initialData?.cost || '',
    durationOrStock: initialData?.durationOrStock || '30',
    sku: initialData?.sku || '',
    description: initialData?.description || '',
    isActive: initialData?.isActive ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('يرجى ملء اسم الصنف وسعر البيع');
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

  const isService = formData.type === 'service';

  return (
    <FormCard
      title="إضافة خدمة أو منتج جديد"
      subtitle="إدراج صنف جديد في قائمة الخدمات ونقطة البيع (POS) وتحديد الأسعار"
      icon={<PackagePlus className="w-5 h-5" />}
      badge="دليل الأسعار"
      accent="secondary"
      submitText="إضافة الصنف وتحديث القائمة"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      className={className}
      footerExtra={
        <div className="flex items-center gap-1.5 text-xs text-[#5E6665]">
          <Sparkles className="w-3.5 h-3.5 text-[#F0C5AE]" />
          <span>تخضع جميع الأسعار لضريبة القيمة المضافة 15% تلقائياً</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <Input
          label="اسم الخدمة / المنتج"
          placeholder="مثال: حلاقة ملكية VIP مع غسيل وسشوار"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        {/* Type: Service or Retail Product */}
        <Select
          label="نوع الصنف"
          value={formData.type}
          onValueChange={(val) =>
            setFormData({
              ...formData,
              type: val as 'service' | 'product',
              durationOrStock: val === 'service' ? '30' : '10',
            })
          }
          options={[
            { value: 'service', label: 'خدمة صالون (Salon Service)' },
            { value: 'product', label: 'منتج تجزئة وعناية (Retail Product)' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category */}
        <Select
          label="التصنيف والقسم"
          value={formData.category}
          onValueChange={(val) => setFormData({ ...formData, category: val })}
          options={
            isService
              ? [
                  { value: 'haircut', label: 'حلاقة وقص الشعر' },
                  { value: 'beard', label: 'تحديد وتشذيب اللحية' },
                  { value: 'facial', label: 'تنظيف وعناية بالبشرة' },
                  { value: 'color', label: 'صبغات وتلوين الشعر' },
                  { value: 'vip-package', label: 'باقات العريس والـ VIP' },
                ]
              : [
                  { value: 'oils', label: 'زيوت وسيروم اللحية' },
                  { value: 'shampoo', label: 'شامبو وبلسم عناية' },
                  { value: 'wax', label: 'واكس وجل تثبيت' },
                  { value: 'tools', label: 'أدوات وماكينات حلاقة' },
                ]
          }
        />

        {/* Selling Price with SAR icon */}
        <Input
          label="سعر البيع (شامل الضريبة)"
          placeholder="0.00"
          type="number"
          required
          leftIcon={<SarIcon className="w-4 h-4 text-[#5E6665]" />}
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        {/* Cost Price */}
        <Input
          label="سعر التكلفة التقديري (اختياري)"
          placeholder="0.00"
          type="number"
          leftIcon={<SarIcon className="w-4 h-4 text-[#5E6665]" />}
          value={formData.cost}
          onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Duration (if service) or Stock (if product) */}
        <Input
          label={
            isService
              ? 'المدة المتوقعة للتنفيذ (بالدقائق)'
              : 'الكمية المتوفرة حالياً في المخزن'
          }
          placeholder={isService ? '30' : '10'}
          type="number"
          value={formData.durationOrStock}
          onChange={(e) =>
            setFormData({ ...formData, durationOrStock: e.target.value })
          }
          helperText={
            isService
              ? 'تُستخدم لحساب أوقات الحجوزات بدقة في التقويم'
              : 'سيتم خصم وحدة واحدة مع كل عملية بيع في الكاشير'
          }
        />

        {/* Barcode / SKU */}
        <Input
          label="كود الصنف / الباركود (SKU)"
          placeholder="SRV-2026-001"
          value={formData.sku}
          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
        />
      </div>

      {/* Image Upload */}
      <FileUpload
        label="صورة الخدمة / المنتج الرسمية (اختياري)"
        description="اسحب صورة الصنف هنا أو انقر للاختيار (PNG, JPG, WebP)"
        helperText="أقصى حجم 3 ميجابايت، تظهر في شاشة الـ POS وشاشة الحجز الإلكتروني"
        multiple={false}
        maxSizeMB={3}
        accept="image/*"
      />

      {/* Description */}
      <TextArea
        label="وصف تفصيلي للخدمة أو المنتج"
        placeholder="أدخل تفاصيل ومميزات الخدمة، المواد المستخدمة، والملاحظات للعملاء..."
        rows={2}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      {/* Switch */}
      <div className="pt-2 border-t border-[#E5E9E8]/60">
        <Switch
          checked={formData.isActive}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isActive: checked })
          }
          label="إتاحة الصنف فوراً في نقطة البيع (POS) ونظام الحجوزات"
          description="يمكنك تعطيل الصنف مؤقتاً في أي وقت دون حذفه من المنظومة"
        />
      </div>
    </FormCard>
  );
};

export default AddProductCard;

