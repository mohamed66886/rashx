'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import {
  Input,
  PhoneInput,
  EmailInput,
  Select,
  TextArea,
  Switch,
} from '@/components/ui';
import { FormCard } from './FormCard';

export interface SettingsFormData {
  businessName: string;
  taxNumber: string;
  crNumber: string;
  phone: string;
  email: string;
  defaultCurrency: string;
  vatRate: string;
  invoiceFooterNote: string;
  zatcaQrAuto: boolean;
  loyaltyAuto: boolean;
  dailyReports: boolean;
}

export interface SettingsFormCardProps {
  onSave?: (data: SettingsFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  initialData?: Partial<SettingsFormData>;
}

export const SettingsFormCard: React.FC<SettingsFormCardProps> = ({
  onSave,
  onCancel,
  className = '',
  initialData,
}) => {
  const [formData, setFormData] = useState<SettingsFormData>({
    businessName: initialData?.businessName || 'صالون راش اكس رويال للحلاقة',
    taxNumber: initialData?.taxNumber || '310123456700003',
    crNumber: initialData?.crNumber || '1010987654',
    phone: initialData?.phone || '+966551234567',
    email: initialData?.email || 'finance@hlaqa.sa',
    defaultCurrency: initialData?.defaultCurrency || 'SAR',
    vatRate: initialData?.vatRate || '15',
    invoiceFooterNote:
      initialData?.invoiceFooterNote ||
      'نشكركم لزيارتكم! الفاتورة معتمدة ومطابقة لمتطلبات هيئة الزكاة والضريبة والجمارك.',
    zatcaQrAuto: initialData?.zatcaQrAuto ?? true,
    loyaltyAuto: initialData?.loyaltyAuto ?? true,
    dailyReports: initialData?.dailyReports ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      title="إعدادات المنشأة والامتثال الضريبي"
      subtitle="تخصيص البيانات الرسمية للصنف، الرقم الضريبي، وتفضيلات الفوترة والتقارير اليومية"
      icon={<Building2 className="w-5 h-5" />}
      badge="الامتثال المالي"
      accent="primary"
      submitText="حفظ وتحديث الإعدادات"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      className={className}
      footerExtra={
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>مطابق 100% لمعايير المرحلة الثانية من الفوترة الإلكترونية (ZATCA)</span>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Name */}
        <Input
          label="الاسم التجاري الرسمي للمنشأة"
          required
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
        />

        {/* Tax Number */}
        <Input
          label="الرقم التعريفي الضريبي (15 رقم)"
          required
          placeholder="3XXXXXXXXXXXX03"
          value={formData.taxNumber}
          onChange={(e) =>
            setFormData({ ...formData, taxNumber: e.target.value })
          }
          helperText="الرقم الصادر من هيئة الزكاة والضريبة والجمارك"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CR */}
        <Input
          label="رقم السجل التجاري"
          value={formData.crNumber}
          onChange={(e) =>
            setFormData({ ...formData, crNumber: e.target.value })
          }
        />

        {/* Currency */}
        <Select
          label="العملة الأساسية للنظام"
          value={formData.defaultCurrency}
          onValueChange={(val) =>
            setFormData({ ...formData, defaultCurrency: val })
          }
          options={[
            { value: 'SAR', label: 'ريال سعودي (SAR)' },
            { value: 'USD', label: 'دولار أمريكي (USD)' },
          ]}
        />

        {/* VAT Rate */}
        <Input
          label="نسبة ضريبة القيمة المضافة (%)"
          type="number"
          value={formData.vatRate}
          onChange={(e) =>
            setFormData({ ...formData, vatRate: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Official Phone */}
        <PhoneInput
          label="رقم الهاتف الموحد للمنشأة"
          defaultCountry="SA"
          value={formData.phone}
          onValueChange={(val) => setFormData({ ...formData, phone: val })}
        />

        {/* Official Email */}
        <EmailInput
          label="البريد الإلكتروني للفوترة والإشعارات"
          value={formData.email}
          onValueChange={(val) => setFormData({ ...formData, email: val })}
        />
      </div>

      {/* Invoice Note */}
      <TextArea
        label="الرسالة الترحيبية أسفل الفواتير المطبوعة والرقمية"
        rows={2}
        value={formData.invoiceFooterNote}
        onChange={(e) =>
          setFormData({ ...formData, invoiceFooterNote: e.target.value })
        }
      />

      {/* Switches Grid */}
      <div className="pt-2 border-t border-[#E5E9E8]/60 space-y-3">
        <Switch
          checked={formData.zatcaQrAuto}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, zatcaQrAuto: checked })
          }
          label="توليد وتشفير كود QR الضريبي تلقائياً في كل عملية بيع"
          description="تطبيق خوارزمية التشفير القياسية المتوافقة مع قارئات الهيئة"
        />

        <Switch
          checked={formData.loyaltyAuto}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, loyaltyAuto: checked })
          }
          label="إيداع نقاط الولاء تلقائياً في محفظة العميل عند كل سداد"
          description="1 نقطة لكل 10 ريالات من الإنفاق"
        />

        <Switch
          checked={formData.dailyReports}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, dailyReports: checked })
          }
          label="إرسال تقرير إغلاق الوردية والدرج المالي اليومي تلقائياً لبريد الإدارة"
          description="يتم الإرسال فور إغلاق آخر وردية عند منتصف الليل"
        />
      </div>
    </FormCard>
  );
};

export default SettingsFormCard;

