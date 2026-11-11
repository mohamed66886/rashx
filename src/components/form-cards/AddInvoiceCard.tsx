'use client';

import React, { useState } from 'react';
import { Receipt, Sparkles, ShieldCheck } from 'lucide-react';
import {
  Input,
  Select,
  DatePicker,
  Checkbox,
  SarIcon,
} from '@/components/ui';
import { FormCard } from './FormCard';

export interface InvoiceFormData {
  customer: string;
  barber: string;
  invoiceDate: string;
  paymentMethod: string;
  subtotal: number | string;
  discount: number | string;
  sendSms: boolean;
  notes?: string;
}

export interface AddInvoiceCardProps {
  onSave?: (data: InvoiceFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  initialData?: Partial<InvoiceFormData>;
}

export const AddInvoiceCard: React.FC<AddInvoiceCardProps> = ({
  onSave,
  onCancel,
  className = '',
  initialData,
}) => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    customer: initialData?.customer || 'cust-1',
    barber: initialData?.barber || 'barber-1',
    invoiceDate:
      initialData?.invoiceDate || new Date().toISOString().split('T')[0],
    paymentMethod: initialData?.paymentMethod || 'mada',
    subtotal: initialData?.subtotal || '150',
    discount: initialData?.discount || '0',
    sendSms: initialData?.sendSms ?? true,
    notes: initialData?.notes || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const rawSubtotal = parseFloat(String(formData.subtotal)) || 0;
  const rawDiscount = parseFloat(String(formData.discount)) || 0;
  const taxableAmount = Math.max(0, rawSubtotal - rawDiscount);
  const vatAmount = taxableAmount * 0.15;
  const totalAmount = taxableAmount + vatAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rawSubtotal <= 0) {
      alert('يرجى تحديد مبلغ الفاتورة');
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
      title="إنشاء فاتورة ضريبية مبسطة"
      subtitle="إصدار فاتورة إلكترونية معتمدة ومتوافقة 100% مع هيئة الزكاة والضريبة والجمارك (ZATCA)"
      icon={<Receipt className="w-5 h-5" />}
      badge="فوترة فورية"
      accent="primary"
      submitText={`إصدار الفاتورة (${totalAmount.toFixed(2)} ر.س)`}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      className={className}
      footerExtra={
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>توليد كود الاستجابة السريعة (QR Code) المشفر تلقائياً</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Select */}
        <Select
          label="العميل المفوتر"
          value={formData.customer}
          onValueChange={(val) => setFormData({ ...formData, customer: val })}
          options={[
            { value: 'cust-1', label: 'عبدالله بن عبدالعزيز (0551234567)' },
            { value: 'cust-2', label: 'سعود بن فهد التميمي (0509876543)' },
            { value: 'cust-3', label: 'عميل عام / نقطة البيع السريعة' },
          ]}
        />

        {/* Barber / Staff Select */}
        <Select
          label="الحلاق / مقدم الخدمة"
          value={formData.barber}
          onValueChange={(val) => setFormData({ ...formData, barber: val })}
          options={[
            { value: 'barber-1', label: 'أحمد الهاشمي (حلاق رئيسي)' },
            { value: 'barber-2', label: 'كريم المنصور (مصفف شعر)' },
            { value: 'barber-3', label: 'طارق السعيد (خبير عناية)' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Invoice Date */}
        <DatePicker
          label="تاريخ ووقت الفاتورة"
          value={formData.invoiceDate}
          onChange={(e) =>
            setFormData({ ...formData, invoiceDate: e.target.value })
          }
        />

        {/* Payment Method */}
        <Select
          label="طريقة الدفع والتحصيل"
          value={formData.paymentMethod}
          onValueChange={(val) =>
            setFormData({ ...formData, paymentMethod: val })
          }
          options={[
            { value: 'mada', label: 'بطاقة مدى البنكية (Mada)' },
            { value: 'apple-pay', label: 'Apple Pay (سريع عبر الجوال)' },
            { value: 'visa', label: 'بطاقة ائتمانية (Visa / MasterCard)' },
            { value: 'cash', label: 'الدفع النقدي (كاش)' },
            { value: 'points', label: 'نقاط الولاء والمحفظة' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subtotal */}
        <Input
          label="قيمة الخدمات والمنتجات (قبل الضريبة)"
          type="number"
          placeholder="0.00"
          required
          leftIcon={<SarIcon className="w-4 h-4 text-[#5E6665]" />}
          value={formData.subtotal}
          onChange={(e) =>
            setFormData({ ...formData, subtotal: e.target.value })
          }
        />

        {/* Discount */}
        <Input
          label="الخصم الترويجي أو الكوبون (إن وجد)"
          type="number"
          placeholder="0.00"
          leftIcon={<SarIcon className="w-4 h-4 text-[#5E6665]" />}
          value={formData.discount}
          onChange={(e) =>
            setFormData({ ...formData, discount: e.target.value })
          }
        />
      </div>

      {/* Tax Summary Box */}
      <div className="p-4 rounded-xl border border-[#E5E9E8] bg-[#FAFBFB] space-y-2 text-xs">
        <div className="flex items-center justify-between text-[#5E6665]">
          <span>المبلغ الخاضع للضريبة:</span>
          <span className="font-semibold text-black">{taxableAmount.toFixed(2)} ر.س</span>
        </div>
        <div className="flex items-center justify-between text-[#5E6665]">
          <span>ضريبة القيمة المضافة (15%):</span>
          <span className="font-semibold text-black">{vatAmount.toFixed(2)} ر.س</span>
        </div>
        <div className="pt-2 border-t border-[#E5E9E8] flex items-center justify-between font-bold text-sm text-black">
          <span>إجمالي المبلغ المطلوب تحصيله:</span>
          <span className="text-base font-semibold text-[#29545c]">
            {totalAmount.toFixed(2)} ر.س
          </span>
        </div>
      </div>

      {/* Checkbox SMS */}
      <Checkbox
        checked={formData.sendSms}
        onCheckedChange={(checked) =>
          setFormData({ ...formData, sendSms: checked as boolean })
        }
        label="إرسال رابط الفاتورة الضريبية الرقمية وسند القبض إلى جوال العميل فوراً"
        description="يتضمن الرابط الفاتورة المعتمدة ورسم الـ QR Code للامتثال"
      />
    </FormCard>
  );
};

export default AddInvoiceCard;

