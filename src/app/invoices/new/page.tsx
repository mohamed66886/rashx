'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Plus,
  Trash2,
  FileCheck2,
  Printer,
  QrCode,
  ShieldCheck,
  Send,
} from 'lucide-react';
import {
  Button,
  Input,
  EmailInput,
  PhoneInput,
  Select,
  DatePicker,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  Badge,
  SarIcon,
  Switch,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  SuccessPopup,
  ConfirmPopup,
  Avatar,
  FileUpload,
} from '@/components/ui';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // percentage (e.g. 15)
}

export default function NewInvoicePage() {
  // Invoice Metadata State
  const [invoiceNumber] = useState('INV-2026-0842');
  const [issueDate, setIssueDate] = useState('2026-11-07');
  const [dueDate, setDueDate] = useState('2026-11-21');
  const [paymentTerms, setPaymentTerms] = useState('net14');

  // Client Details State
  const [clientName, setClientName] = useState('شركة الرؤية المتطورة للاتصالات');
  const [clientEmail, setClientEmail] = useState('billing@al-ruya.sa');
  const [clientPhone, setClientPhone] = useState('0501234567');
  const [clientTaxNumber, setClientTaxNumber] = useState('310245892100003');
  const [clientCrNumber, setClientCrNumber] = useState('1010894215');

  // Settings
  const [isZatcaEnabled, setIsZatcaEnabled] = useState(true);
  const [sendViaWhatsapp, setSendViaWhatsapp] = useState(true);

  // Line Items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'اشتراك منصة RASHX للمدفوعات السحابية (باقة الأعمال السنوية)',
      quantity: 1,
      unitPrice: 12000,
      vatRate: 15,
    },
    {
      id: '2',
      description: 'خدمات الربط البرمجي المباشر مع واجهات API والامتثال الضريبي (ZATCA)',
      quantity: 1,
      unitPrice: 3500,
      vatRate: 15,
    },
    {
      id: '3',
      description: 'تدريب وإعداد فريق المحاسبة والمالية (جلسات مخصصة)',
      quantity: 2,
      unitPrice: 850,
      vatRate: 15,
    },
  ]);

  // Popups
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const totalVat = items.reduce(
    (sum, item) => sum + (item.quantity * item.unitPrice * item.vatRate) / 100,
    0
  );
  const grandTotal = subtotal + totalVat;

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: String(Date.now()),
      description: '',
      quantity: 1,
      unitPrice: 0,
      vatRate: 15,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (
    id: string,
    field: keyof InvoiceItem,
    val: string | number
  ) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: val };
        }
        return item;
      })
    );
  };

  const handleConfirmSubmit = () => {
    setIsConfirmOpen(false);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessOpen(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-black font-sans selection:bg-[#F0C5AE] selection:text-black flex flex-col">
      {/* Top Header */}
      <header className="border-b border-[#E5E9E8] bg-white sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl text-black hover:bg-[#E5E9E8]/60 transition-colors flex items-center gap-2 text-xs font-bold"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للوحة الرئيسية</span>
            </Link>

            <span className="h-5 w-px bg-[#E5E9E8]" />

            <Image
              src="/brand/logo/lockup-bilingual/lockup-bilingual-black.svg"
              alt="RASHX Logo"
              width={140}
              height={32}
              className="h-7 w-auto"
            />
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="primary" size="md">
              فاتورة ضريبية إلكترونية
            </Badge>
            <Avatar animojiId={2} size="sm" status="online" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        {/* Page Title & Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E9E8] pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight font-mono">
                {invoiceNumber}
              </h1>
              <Badge variant="secondary" size="sm">
                مسودة جديدة
              </Badge>
              {isZatcaEnabled && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  مطابق لمعايير ZATCA
                </span>
              )}
            </div>
            <p className="text-xs text-[#5E6665]">
              إنشاء واعتماد فاتورة ضريبية موثقة وفق اشتراطات هيئة الزكاة والضريبة والجمارك بالمملكة العربية السعودية.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Printer className="w-4 h-4" />}
              onClick={() => window.print()}
            >
              طباعة المسودة
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={<Send className="w-4 h-4" />}
              onClick={() => setIsConfirmOpen(true)}
              isLoading={isSubmitting}
            >
              اعتماد وإرسال الفاتورة
            </Button>
          </div>
        </div>

        {/* Invoice Grid: Details + Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Client Information Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>بيانات العميل والمنشأة المستفيدة</CardTitle>
                  <span className="text-xs text-[#5E6665]">طرف المعاملة الأول</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="اسم العميل أو المنشأة"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />

                  <Input
                    label="الرقم الضريبي (VAT ID - 15 رقم)"
                    value={clientTaxNumber}
                    onChange={(e) => setClientTaxNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EmailInput
                    label="البريد الإلكتروني للإشعار"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    required
                  />

                  <PhoneInput
                    label="رقم الجوال لإرسال الرابط"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    defaultCountry="SA"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DatePicker
                    label="تاريخ إصدار الفاتورة"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />

                  <DatePicker
                    label="تاريخ الاستحقاق الأخير"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />

                  <Select
                    label="شروط السداد"
                    value={paymentTerms}
                    onValueChange={setPaymentTerms}
                    options={[
                      { label: 'سداد فوري (Immediate)', value: 'immediate' },
                      { label: 'خلال 14 يوماً (Net 14)', value: 'net14' },
                      { label: 'خلال 30 يوماً (Net 30)', value: 'net30' },
                      { label: 'خلال 60 يوماً (Net 60)', value: 'net60' },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Line Items Table Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>بنود الخدمات والمنتجات المفوترة</CardTitle>
                    <p className="text-xs text-[#5E6665] mt-0.5">
                      حدد الكميات والأسعار وسيتم احتساب ضريبة القيمة المضافة 15% تلقائياً.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Plus className="w-3.5 h-3.5" />}
                    onClick={handleAddItem}
                  >
                    إضافة بند جديد
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Table bordered={false}>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>وصف البند / الخدمة</TableHead>
                      <TableHead className="w-24 text-center">الكمية</TableHead>
                      <TableHead className="w-32 text-center">سعر الوحدة</TableHead>
                      <TableHead className="w-20 text-center">الضريبة</TableHead>
                      <TableHead className="w-32 text-left">الإجمالي</TableHead>
                      <TableHead className="w-12 text-center"></TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {items.map((item, index) => {
                      const lineTotal =
                        item.quantity * item.unitPrice * (1 + item.vatRate / 100);

                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-mono text-xs text-[#5E6665]">
                            {index + 1}
                          </TableCell>

                          <TableCell>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.id,
                                  'description',
                                  e.target.value
                                )
                              }
                              placeholder="أدخل وصف الخدمة..."
                              className="w-full bg-transparent border-b border-transparent focus:border-[#91B8C0] outline-none text-xs text-black font-medium py-1"
                            />
                          </TableCell>

                          <TableCell className="text-center">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.id,
                                  'quantity',
                                  Number(e.target.value) || 1
                                )
                              }
                              className="w-16 text-center bg-[#E5E9E8]/30 rounded-lg py-1 text-xs font-mono font-bold border border-[#E5E9E8] outline-none focus:border-[#91B8C0]"
                            />
                          </TableCell>

                          <TableCell className="text-center">
                            <input
                              type="number"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.id,
                                  'unitPrice',
                                  Number(e.target.value) || 0
                                )
                              }
                              className="w-24 text-center bg-[#E5E9E8]/30 rounded-lg py-1 text-xs font-mono font-bold border border-[#E5E9E8] outline-none focus:border-[#91B8C0]"
                            />
                          </TableCell>

                          <TableCell className="text-center font-mono text-xs text-[#5E6665]">
                            %{item.vatRate}
                          </TableCell>

                          <TableCell className="text-left font-mono font-bold text-xs">
                            <div className="inline-flex items-center gap-1">
                              <span>{lineTotal.toLocaleString('ar-SA')}</span>
                              <SarIcon className="w-3 h-3 text-black" />
                            </div>
                          </TableCell>

                          <TableCell className="text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={items.length <= 1}
                              className="p-1 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              title="حذف البند"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Attachments Card */}
            <Card>
              <CardHeader>
                <CardTitle>المرفقات والوثائق التعاقدية الداعمة</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  label="إرفاق وثائق الفاتورة (أمر الشراء، العقد، أو سند التسليم المعتمد)"
                  description="اسحب وأفلت الملفات هنا أو انقر للاختيار من جهازك"
                  helperText="الصيغ المدعومة: PDF, DOCX, XLSX, PNG, JPG بحجم أقصى 15 ميجابايت لكل ملف"
                  multiple
                  maxFiles={4}
                  maxSizeMB={15}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Summary & ZATCA Compliance (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Financial Totals Card */}
            <Card accent="primary">
              <CardHeader>
                <CardTitle>ملخص المبالغ والضرائب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-[#5E6665]">
                    <span>المجموع الفرعي (قبل الضريبة):</span>
                    <div className="inline-flex items-center gap-1 font-mono font-bold text-black">
                      <span>{subtotal.toLocaleString('ar-SA')}</span>
                      <SarIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[#5E6665]">
                    <span>ضريبة القيمة المضافة (15% VAT):</span>
                    <div className="inline-flex items-center gap-1 font-mono font-bold text-black">
                      <span>{totalVat.toLocaleString('ar-SA')}</span>
                      <SarIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E9E8] flex items-baseline justify-between text-black">
                    <span className="font-extrabold text-sm">المجموع الإجمالي المستحق:</span>
                    <div className="inline-flex items-center gap-1.5 font-mono text-xl font-black text-black">
                      <span>{grandTotal.toLocaleString('ar-SA')}</span>
                      <SarIcon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                </div>

                {/* ZATCA QR Code Preview */}
                <div className="p-4 rounded-2xl bg-[#E5E9E8]/30 border border-[#E5E9E8] flex items-center gap-3 mt-4">
                  <div className="w-14 h-14 bg-white rounded-xl border border-[#E5E9E8] flex items-center justify-center shrink-0 shadow-2xs">
                    <QrCode className="w-10 h-10 text-black stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-black block mb-0.5">
                      رمز الاستجابة السريع (QR Code)
                    </span>
                    <span className="text-[10px] text-[#5E6665] leading-snug block">
                      مشفر بختم إلكتروني ومعتمد حسب مواصفات المرحلة الثانية (ربط وتكامل).
                    </span>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="space-y-3 pt-4 border-t border-[#E5E9E8]">
                  <Switch
                    checked={isZatcaEnabled}
                    onCheckedChange={setIsZatcaEnabled}
                    label="ختم الامتثال المباشر (ZATCA)"
                    description="إرسال إشعار الفاتورة آلياً للهيئة"
                    size="sm"
                  />

                  <Switch
                    checked={sendViaWhatsapp}
                    onCheckedChange={setSendViaWhatsapp}
                    label="إرسال رابط الفاتورة عبر واتساب"
                    description="إشعار رقم الجوال المسجل فور الاعتماد"
                    size="sm"
                  />
                </div>
              </CardContent>

              <div className="p-5 border-t border-[#E5E9E8] bg-[#E5E9E8]/20">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => setIsConfirmOpen(true)}
                  isLoading={isSubmitting}
                >
                  اعتماد وحفظ الفاتورة الآن
                </Button>
              </div>
            </Card>

            {/* Platform Trust & SLA */}
            <div className="p-5 rounded-xl border border-[#E5E9E8]/70 bg-white text-xs text-[#5E6665] space-y-2 shadow-none">
              <div className="flex items-center gap-2 font-bold text-black">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>منظومة RASHX المالية المعتمدة</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                تتم معالجة وتخزين جميع الفواتير وفق معايير الأمان الوطنية داخل مراكز بيانات سحابية سيادية بالمملكة.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Popup with sound and SVG animation */}
      <ConfirmPopup
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmSubmit}
        title="تأكيد اعتماد الفاتورة الضريبية"
        message={`هل أنت متأكد من اعتماد الفاتورة بقيمة إجمالية ${grandTotal.toLocaleString(
          'ar-SA'
        )} ر.س وإصدارها رسمياً؟`}
        confirmText="نعم، اعتمد الفاتورة"
        cancelText="مراجعة الحقول"
        isLoading={isSubmitting}
      />

      {/* Success Popup with chime sound and animated SVG checkmark */}
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="تم إصدار الفاتورة واعتمادها بنجاح!"
        message={`تم توليد الفاتورة الضريبية رقم ${invoiceNumber} وحفظها في المنظومة وإرسال نسخة للعميل.`}
        buttonText="العودة للوحة التحكم"
        secondaryActionText="طباعة الفاتورة الآن"
        onSecondaryAction={() => window.print()}
      />
    </div>
  );
}

