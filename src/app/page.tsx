'use client';

import React, { useState } from 'react';
import {
  Button,
  DropdownButton,
  Input,
  TextArea,
  Select,
  DatePicker,
  TimePicker,
  EmailInput,
  PhoneInput,
  AlertBanner,
  CalendarIcon,
  ClockIcon,
  DropdownIcon,
  GridIcon,
  WandIcon,
  DataTable,
  DataTableColumn,
  SarIcon,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Switch,
  Checkbox,
  Modal,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  ConfirmPopup,
  WarningPopup,
  AlertPopup,
  SuccessPopup,
  ErrorPopup,
  StatCard,
  Tooltip,
  Avatar,
  AvatarGroup,
  Radio,
  RadioGroup,
  FileUpload,
  AvatarPicker,
  AvatarCustomization,
  LanguageToggle,
  CookieConsent,
  useCookieConsent,
  FloatingAIAssistant,
  Breadcrumb,
  SmartBreadcrumb,
  Header,
  Footer,
} from '@/components/ui';
import {
  Cookie,
  ShieldCheck,
  SlidersHorizontal,
  CheckCircle2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface TransactionItem {
  id: string;
  client: string;
  email: string;
  amount: number;
  date: string;
  method: string;
  status: 'completed' | 'pending' | 'canceled';
  avatarId: number;
}

const SAMPLE_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'TRX-1092',
    client: 'شركة الأفق الرقمي للتجارة',
    email: 'info@alofoq-tech.sa',
    amount: 14850,
    date: '2026-11-07',
    method: 'مدى (Mada)',
    status: 'completed',
    avatarId: 2,
  },
  {
    id: 'TRX-1091',
    client: 'مؤسسة الحلول الذكية',
    email: 'contact@smart-sol.com',
    amount: 5200,
    date: '2026-11-06',
    method: 'Apple Pay',
    status: 'completed',
    avatarId: 5,
  },
  {
    id: 'TRX-1090',
    client: 'سعود بن فهد التميمي',
    email: 'saud.f@gmail.com',
    amount: 1250,
    date: '2026-11-06',
    method: 'بطاقة فيزا',
    status: 'pending',
    avatarId: 8,
  },
  {
    id: 'TRX-1089',
    client: 'منصة نماء للاستشارات',
    email: 'billing@namaa-consult.sa',
    amount: 28400,
    date: '2026-11-05',
    method: 'تحويل سداد',
    status: 'completed',
    avatarId: 12,
  },
  {
    id: 'TRX-1088',
    client: 'عبدالرحمن العتيبي',
    email: 'a.otaibi@outlook.sa',
    amount: 890,
    date: '2026-11-05',
    method: 'مدى (Mada)',
    status: 'canceled',
    avatarId: 16,
  },
  {
    id: 'TRX-1087',
    client: 'شركة المدار العالمية',
    email: 'ops@almadar-global.com',
    amount: 42100,
    date: '2026-11-04',
    method: 'حوالة مصرفية',
    status: 'completed',
    avatarId: 21,
  },
  {
    id: 'TRX-1086',
    client: 'ريما عبدالله الشمري',
    email: 'reema.sh@gmail.com',
    amount: 3400,
    date: '2026-11-03',
    method: 'Apple Pay',
    status: 'pending',
    avatarId: 27,
  },
];

export default function Home() {
  // Navigation / Filter Tab
  type TabKey =
    | 'forms'
    | 'buttons'
    | 'tables'
    | 'popups'
    | 'alerts'
    | 'avatars'
    | 'upload'
    | 'cookies';
  const [activeTab, setActiveTab] = useState<TabKey>('forms');
  const [selectedTrxIds, setSelectedTrxIds] = useState<(string | number)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [cookieVariant, setCookieVariant] = useState<
    'modal' | 'banner' | 'floating' | 'bottom-sheet'
  >('floating');
  const [isCookieConsentOpen, setIsCookieConsentOpen] = useState(false);
  const { consent: liveCookieConsent, resetConsent: resetCookieConsent } =
    useCookieConsent();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // User Profile Avatar State
  const [userAvatar, setUserAvatar] = useState<AvatarCustomization>({
    type: 'animoji',
    animojiId: 2,
    bgColor: 'bg-[#91B8C0]/25',
    status: 'online',
    rounded: 'xl',
  });

  // Popups Demo State (Audio + Animated SVG)
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isWarningPopupOpen, setIsWarningPopupOpen] = useState(false);
  const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  // Interactive Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('developer');
  const [date, setDate] = useState('2026-11-07');
  const [time, setTime] = useState('10:30');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Alert State
  const [showAlert, setShowAlert] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessPopupOpen(true);
      setToastMessage('تم إرسال وحفظ بيانات النموذج بنجاح في منظومة راش اكس!');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-black font-sans selection:bg-[#F0C5AE] selection:text-black flex flex-col">
      {/* Reusable Header Component */}
      <Header
        announcement={
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span>منظومة مكتبة مكونات RASHX UI — تم تشغيل واستخدام كافة المكونات تفاعلياً</span>
          </div>
        }
        badgeText="مكتبة المكونات UI"
        primaryAction={{
          label: 'إنشاء فاتورة ZATCA',
          href: '/invoices/new',
        }}
        user={{
          name: 'محمد رشاد',
          role: 'مدير المنظومة',
          avatarId: userAvatar.type === 'animoji' ? userAvatar.animojiId : undefined,
          avatarSrc: userAvatar.type === 'custom' ? userAvatar.customSrc : undefined,
          status: userAvatar.status,
        }}
        onAvatarClick={() => setIsAvatarModalOpen(true)}
        userMenuItems={[
          { label: 'تخصيص الأفاتار (3D Animoji)', onClick: () => setIsAvatarModalOpen(true) },
          { label: 'الملف الشخصي', onClick: () => alert('الملف الشخصي') },
          { label: 'إعدادات المنظومة', onClick: () => alert('الإعدادات') },
          { label: 'تسجيل الخروج', danger: true, onClick: () => alert('تم تسجيل الخروج') },
        ]}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-8">
        {/* Ribbon Breadcrumb Component */}
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الإدارة المالية والمخزون', href: '/finance' },
            { label: 'الفواتير الضريبية', href: '/finance/invoices' },
            { label: 'إنشاء فاتورة جديدة' },
          ]}
        />

        {/* Dynamic Alert Banner */}
        {showAlert && (
          <AlertBanner
            variant="info"
            title="مرحباً بك في واجهة مكونات راش اكس التفاعلية"
            message="تم ربط واستخدام جميع المكونات (حقول الإدخال، التقويم، الوقت، أرقام الجوال الدولية، القوائم، والأزرار) بنجاح."
            onClose={() => setShowAlert(false)}
          />
        )}

        {toastMessage && (
          <AlertBanner
            variant="success"
            title="تم الحفظ بنجاح"
            message={toastMessage}
            onClose={() => setToastMessage(null)}
          />
        )}

        {/* KPI Metrics Summary (StatCards with SarIcon) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="إجمالي الإيرادات المعتمدة"
            value="1,280,450"
            isCurrency
            trend="+18.4%"
            trendDirection="up"
            trendLabel="مقارنة بالشهر الماضي"
            accent="primary"
          />

          <StatCard
            title="المعاملات المالية المنجزة"
            value="14,892"
            trend="+12.2%"
            trendDirection="up"
            trendLabel="خلال الـ 30 يوماً الأخيرة"
          />

          <StatCard
            title="المنشآت والعملاء النشطين"
            value="3,240"
            trend="+8.6%"
            trendDirection="up"
            trendLabel="نمو شهري مستمر"
            badge={
              <AvatarGroup max={4} size="xs">
                <Avatar animojiId={3} name="سعود فهد" />
                <Avatar animojiId={6} name="ريما علي" />
                <Avatar animojiId={10} name="أحمد عمر" />
                <Avatar animojiId={14} name="خالد ناصر" />
                <Avatar animojiId={18} name="سارة محمد" />
              </AvatarGroup>
            }
          />

          <StatCard
            title="نسبة الامتثال المالي (ZATCA)"
            value="99.8%"
            trend="متوافق 100%"
            trendDirection="neutral"
            trendLabel="وفق معايير الهيئة"
            accent="secondary"
          />
        </div>

        {/* Navigation Tabs Component */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as TabKey)}
          variant="pills"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E5E9E8] pb-6">
            <TabsList>
              <TabsTrigger value="forms">النماذج والحقول (Forms & Inputs)</TabsTrigger>
              <TabsTrigger value="avatars">اختيار الأفاتار (3D Animoji)</TabsTrigger>
              <TabsTrigger value="upload">رفع الملفات (File Upload)</TabsTrigger>
              <TabsTrigger value="buttons">الأزرار والقوائم (Buttons & Dropdowns)</TabsTrigger>
              <TabsTrigger value="tables">الجداول وقوائم البيانات (Data Tables)</TabsTrigger>
              <TabsTrigger value="popups">النوافذ المنبثقة التفاعلية (Popups & Sound)</TabsTrigger>
              <TabsTrigger value="alerts">شرائط التنبيهات (Alert Banners)</TabsTrigger>
              <TabsTrigger value="cookies">موديل الكوكيز (Cookie Modal)</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm" data-cursor-text="RASHX">
                مؤشر ماوس مخصص
              </Badge>
              <Badge variant="secondary" size="sm">
                Ping AR + LT
              </Badge>
              <Badge variant="neutral" size="sm">
                TypeScript & Tailwind
              </Badge>
            </div>
          </div>

          {/* SECTION 1: FORMS & INPUTS */}
          <TabsContent value="forms">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-8 rounded-xl border border-[#E5E9E8]/70 bg-white p-8 shadow-none">
              <div className="border-b border-[#E5E9E8] pb-5 mb-6">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  نموذج إدخال البيانات الموحد
                </h2>
                <p className="text-sm text-[#5E6665] mt-1">
                  استعراض حي وتفاعلي يدمج حقول Input، EmailInput، PhoneInput، Select، DatePicker، TimePicker و TextArea.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name Input with Action Icon */}
                  <Input
                    label="الاسم الكامل"
                    placeholder="أدخل اسمك الكريم"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    clearable
                    onClear={() => setName('')}
                    actionIconType="wand"
                    onActionClick={() => setName('محمد رشاد')}
                    actionTitle="توليد اسم تجريبي"
                    required
                  />

                  {/* Select Component */}
                  <Select
                    label="نوع الصلاحية / الدور"
                    placeholder="اختر الدور..."
                    value={selectedRole}
                    onValueChange={(val) => setSelectedRole(val)}
                    options={[
                      { label: 'مطور واجهات (Frontend)', value: 'developer' },
                      { label: 'مدير منتج (Product Manager)', value: 'pm' },
                      { label: 'مصمم هوية (Brand Designer)', value: 'designer' },
                      { label: 'مسؤول تنفيذي (Executive)', value: 'executive' },
                    ]}
                    searchable
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* EmailInput with suggestions */}
                  <EmailInput
                    label="البريد الإلكتروني المعتمد"
                    placeholder="user@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    clearable
                    onClear={() => setEmail('')}
                    showValidationStatus
                    required
                  />

                  {/* PhoneInput with flags */}
                  <PhoneInput
                    label="رقم الجوال الدولي"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    defaultCountry="SA"
                    clearable
                    onClear={() => setPhone('')}
                    showValidationStatus
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* DatePicker */}
                  <DatePicker
                    label="تاريخ الاستحقاق أو الموعد"
                    placeholder="اختر التاريخ..."
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    clearable
                    onClear={() => setDate('')}
                    showTodayButton
                  />

                  {/* TimePicker */}
                  <TimePicker
                    label="توقيت العملية"
                    placeholder="اختر الوقت..."
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    clearable
                    onClear={() => setTime('')}
                    showNowButton
                  />
                </div>

                {/* TextArea */}
                <TextArea
                  label="ملاحظات وتفاصيل إضافية"
                  placeholder="أدخل أي ملاحظات حول الطلب..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  helperText="الحد الأقصى 500 حرف."
                />

                {/* File Upload in Form */}
                <FileUpload
                  label="المستندات والوثائق المرفقة (اختياري)"
                  description="اسحب وأفلت السجل التجاري، العقد، أو الهوية الوطنية هنا"
                  helperText="الصيغ المدعومة: PDF, PNG, JPG, ZIP بحجم أقصى 10 ميجابايت"
                  multiple
                  maxFiles={3}
                  maxSizeMB={10}
                />

                {/* Switch & Checkbox Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-[#E5E9E8]">
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    label="تفعيل الإشعارات الفورية"
                    description="إرسال تنبيهات الرسائل النصية والبريد عند كل عملية"
                  />

                  <Checkbox
                    checked={termsAccepted}
                    onCheckedChange={setTermsAccepted}
                    label={
                      <span>
                        أوافق على{' '}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(true);
                          }}
                          className="text-[#91B8C0] font-bold hover:underline"
                        >
                          الشروط والأحكام
                        </button>{' '}
                        وسياسة الخصوصية
                      </span>
                    }
                    description="المعتمدة لدى منظومة راش اكس للتقنية المالية"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5E9E8]">
                  <div className="flex items-center gap-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isSubmitting}
                    >
                      إرسال وحفظ النموذج
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={() => {
                        setName('');
                        setEmail('');
                        setPhone('');
                        setNotes('');
                      }}
                    >
                      تفريغ الحقول
                    </Button>
                  </div>

                  <DropdownButton
                    label="إجراءات إضافية"
                    variant="secondary"
                    size="md"
                    split
                    onPrimaryClick={() => alert('إجراء سريع')}
                    items={[
                      { label: 'تصدير بصيغة PDF', onClick: () => alert('PDF') },
                      { label: 'إرسال عبر البريد الإلكتروني', onClick: () => alert('Mail') },
                      { label: 'نسخ الرابط المباشر', onClick: () => alert('Copy') },
                    ]}
                  />
                </div>
              </form>
            </div>

            {/* Sidebar Live Preview */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-6 shadow-none">
                <div className="flex items-center justify-between border-b border-[#E5E9E8] pb-4 mb-4">
                  <h3 className="font-bold text-base text-black">معاينة البيانات الحية</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#91B8C0]/25 text-[#1e464e]">
                    Live
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#E5E9E8]/50 space-y-3 font-mono text-xs">
                  <div>
                    <span className="font-bold text-black block mb-0.5">الاسم:</span>
                    <span className="text-[#5E6665]">{name || '—'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-black block mb-0.5">البريد الإلكتروني:</span>
                    <span className="text-[#5E6665]">{email || '—'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-black block mb-0.5">رقم الجوال:</span>
                    <span className="text-[#5E6665]">{phone || '—'}</span>
                  </div>
                  <div>
                    <span className="font-bold text-black block mb-0.5">الدور:</span>
                    <span className="text-[#5E6665]">{selectedRole}</span>
                  </div>
                  <div>
                    <span className="font-bold text-black block mb-0.5">التاريخ والوقت:</span>
                    <span className="text-[#5E6665]">{date} · {time}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E9E8] flex items-center justify-between">
                  <span className="text-xs text-[#5E6665]">حالة الربط البرمجي:</span>
                  <span className="text-xs font-bold text-emerald-600">نشط ومتزامن</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-6 shadow-none flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-black">الامتثال والدفع المعتمد</h4>
                  <p className="text-xs text-[#5E6665] mt-1">مدى، Apple Pay، سدايا وزاتكا</p>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  متوافق
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SECTION 2: BUTTONS & DROPDOWNS */}
        <TabsContent value="buttons">
          <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-8 shadow-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-black tracking-tight">
                مكتبة الأزرار والقوائم (Buttons & DropdownButtons)
              </h2>
              <p className="text-sm text-[#5E6665] mt-1">
                تشكيلة كاملة من الأنماط والأحجام المعتمدة للمنظومة
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-[#5E6665] uppercase tracking-wider mb-3">
                  1. الأنماط الأساسية (Variants)
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">رئيسي (Primary)</Button>
                  <Button variant="secondary">ثانوي (Secondary)</Button>
                  <Button variant="outline">حدود (Outline)</Button>
                  <Button variant="success">نجاح (Success)</Button>
                  <Button variant="warning">تحذير (Warning)</Button>
                  <Button variant="danger">حذف / خطر (Danger)</Button>
                  <Button variant="ghost">شفاف (Ghost)</Button>
                  <Button variant="link">رابط (Link)</Button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#5E6665] uppercase tracking-wider mb-3">
                  2. الأحجام المختلفة (Sizes)
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="lg">كبير (Large · lg)</Button>
                  <Button variant="primary" size="md">متوسط (Medium · md)</Button>
                  <Button variant="primary" size="sm">صغير (Small · sm)</Button>
                  <Button variant="primary" size="md" isLoading>قيد التحميل</Button>
                  <Button variant="primary" size="md" disabled>معطل (Disabled)</Button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#5E6665] uppercase tracking-wider mb-3">
                  3. الأزرار المنسدلة (DropdownButton & Split)
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <DropdownButton
                    label="زر منسدل رئيسي"
                    variant="primary"
                    items={[
                      { label: 'إضافة عنصر جديد', onClick: () => alert('إضافة') },
                      { label: 'تعديل البيانات', onClick: () => alert('تعديل') },
                      { label: 'حذف العنصر', danger: true, onClick: () => alert('حذف') },
                    ]}
                  />

                  <DropdownButton
                    label="زر مقسوم (Split Button)"
                    variant="secondary"
                    split
                    onPrimaryClick={() => alert('الضغط على الزر الأساسي')}
                    items={[
                      { label: 'خيار رقم 1', onClick: () => alert('1') },
                      { label: 'خيار رقم 2', onClick: () => alert('2') },
                    ]}
                  />

                  <DropdownButton
                    label="قائمة حدود (Outline)"
                    variant="outline"
                    items={[
                      { label: 'تصدير جدول Excel', onClick: () => alert('Excel') },
                      { label: 'طباعة التقرير الشامل', onClick: () => alert('Print') },
                    ]}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#5E6665] uppercase tracking-wider mb-3">
                  4. الأيقونات المساعدة (UI Action Icons)
                </h3>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#E5E9E8]/40 border border-[#E5E9E8]">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-black" />
                    <span className="text-xs font-semibold">CalendarIcon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-black" />
                    <span className="text-xs font-semibold">ClockIcon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownIcon className="w-5 h-5 text-black" />
                    <span className="text-xs font-semibold">DropdownIcon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GridIcon className="w-5 h-5 text-black" />
                    <span className="text-xs font-semibold">GridIcon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <WandIcon className="w-5 h-5 text-black" />
                    <span className="text-xs font-semibold">WandIcon</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-[#5E6665] uppercase tracking-wider">
                    5. أزرار تحويل اللغة (Language Toggle & Switcher)
                  </h3>
                  <Badge variant="primary" size="sm">
                    يدعم RTL / LTR تلقائياً
                  </Badge>
                </div>
                <div className="p-5 rounded-2xl bg-[#E5E9E8]/30 border border-[#E5E9E8] space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Default Button Variant */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-semibold text-[#5E6665]">زر تبديل سريع (Button)</span>
                      <LanguageToggle variant="button" size="md" />
                    </div>

                    {/* Dropdown Variant */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-semibold text-[#5E6665]">قائمة منسدلة (Dropdown)</span>
                      <LanguageToggle variant="dropdown" size="md" />
                    </div>

                    {/* Segmented Variant */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-semibold text-[#5E6665]">شريط مقسم (Segmented)</span>
                      <LanguageToggle variant="segmented" size="md" />
                    </div>

                    {/* Ghost Variant */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-semibold text-[#5E6665]">زر شفاف (Ghost)</span>
                      <LanguageToggle variant="ghost" size="md" />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E9E8]/70 flex flex-wrap items-center gap-3">
                    <span className="text-[11px] font-semibold text-[#5E6665]">المقاسات المتاحة:</span>
                    <LanguageToggle variant="button" size="sm" />
                    <LanguageToggle variant="button" size="md" />
                    <LanguageToggle variant="button" size="lg" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-[#5E6665] uppercase tracking-wider">
                    6. مكتبة صور الأفاتار ثلاثية الأبعاد (3D Animoji Avatars)
                  </h3>
                  <Badge variant="secondary" size="sm">
                    237 أفاتار أصلي بدقة عالية
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3.5 p-5 rounded-2xl bg-[#E5E9E8]/30 border border-[#E5E9E8]">
                  {[2, 4, 6, 8, 10, 14, 18, 22, 26, 30, 35, 42, 50, 60].map((id) => (
                    <Tooltip key={id} content={`Animoji #${id}`}>
                      <Avatar
                        animojiId={id}
                        size="lg"
                        className="shadow-xs hover:scale-115 transition-all cursor-pointer bg-white"
                        status={id % 4 === 0 ? 'online' : id % 6 === 0 ? 'busy' : undefined}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SECTION 3: DATA TABLES */}
        <TabsContent value="tables">
          <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-8 shadow-none space-y-6">
            <DataTable<TransactionItem>
              data={SAMPLE_TRANSACTIONS}
              keyExtractor={(item) => item.id}
              title="سجل المعاملات والعمليات المالية"
              description="جدول بيانات متقدم وتفاعلي يدعم البحث الفوري، الفرز، التحديد المتعدد، والترقيم التلقائي (Pagination)."
              searchable
              selectable
              selectedIds={selectedTrxIds}
              onSelectionChange={setSelectedTrxIds}
              pageSize={5}
              columns={[
                {
                  key: 'id',
                  header: 'رقم المعاملة',
                  sortable: true,
                  accessor: (row) => (
                    <span className="font-mono text-xs font-bold text-black">{row.id}</span>
                  ),
                },
                {
                  key: 'client',
                  header: 'العميل / المنشأة',
                  sortable: true,
                  accessor: (row) => (
                    <div className="flex items-center gap-3">
                      <Avatar
                        animojiId={row.avatarId}
                        size="sm"
                        name={row.client}
                        className="bg-white shadow-2xs shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-black text-xs">{row.client}</div>
                        <div className="text-[11px] text-[#5E6665] font-mono">{row.email}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'amount',
                  header: 'المبلغ الإجمالي',
                  sortable: true,
                  align: 'left',
                  accessor: (row) => (
                    <div className="inline-flex items-center gap-1.5 font-mono font-bold text-black text-xs">
                      <span>{row.amount.toLocaleString('ar-SA')}</span>
                      <SarIcon className="w-3.5 h-3.5 text-black inline-block" />
                    </div>
                  ),
                },
                {
                  key: 'method',
                  header: 'وسيلة الدفع',
                  align: 'center',
                  accessor: (row) => (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#E5E9E8] text-black">
                      {row.method}
                    </span>
                  ),
                },
                {
                  key: 'date',
                  header: 'التاريخ',
                  sortable: true,
                  align: 'center',
                  accessor: (row) => (
                    <span className="text-xs text-[#5E6665] font-mono">{row.date}</span>
                  ),
                },
                {
                  key: 'status',
                  header: 'حالة العملية',
                  align: 'center',
                  accessor: (row) => {
                    if (row.status === 'completed') {
                      return (
                        <Badge variant="primary" size="sm" dot>
                          مكتملة
                        </Badge>
                      );
                    }
                    if (row.status === 'pending') {
                      return (
                        <Badge variant="secondary" size="sm" dot>
                          قيد المراجعة
                        </Badge>
                      );
                    }
                    return (
                      <Badge variant="danger" size="sm" dot>
                        ملغاة
                      </Badge>
                    );
                  },
                },
                {
                  key: 'actions',
                  header: 'إجراءات',
                  align: 'center',
                  accessor: (row) => (
                    <div className="flex items-center justify-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[11px] py-1 px-3 h-7 rounded-lg"
                        onClick={() => alert(`عرض تفاصيل المعاملة: ${row.id}`)}
                      >
                        تفاصيل
                      </Button>
                    </div>
                  ),
                },
              ]}
              actions={
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => alert('إضافة معاملة جديدة')}
                  >
                    + إضافة معاملة
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => alert('تصدير البيانات')}
                  >
                    تصدير CSV
                  </Button>
                </div>
              }
            />
          </div>
        </TabsContent>

        {/* SECTION 4: INTERACTIVE POPUPS (Audio + Animated SVG) */}
        <TabsContent value="popups">
          <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-8 shadow-none space-y-8">
            <div className="border-b border-[#E5E9E8] pb-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  منظومة النوافذ المنبثقة التفاعلية (RASHX Popups)
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#91B8C0]/25 text-black border border-[#91B8C0]/40">
                  مؤثرات صوتية + رسم SVG
                </span>
              </div>
              <p className="text-sm text-[#5E6665] mt-2">
                نوافذ منبثقة تصدر نغمات صوتية مركبة ونقية (Web Audio API) بدون أي ملفات خارجية، وتقوم برسم أيقونات الـ SVG بحركة انسيابية مميزة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {/* 1. Success Popup Card */}
              <div className="rounded-2xl border border-[#E5E9E8] p-6 bg-white hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#91B8C0]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-black">✓</span>
                </div>
                <h3 className="font-bold text-black text-base mb-1">بوب إتمام (Success)</h3>
                <p className="text-xs text-[#5E6665] mb-5">
                  رسم علامة الإنجاز مع نغمة صاعدة ثلاثية مبهجة.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  className="mt-auto"
                  onClick={() => setIsSuccessPopupOpen(true)}
                >
                  فتح بوب إتمام
                </Button>
              </div>

              {/* 2. Warning Popup Card */}
              <div className="rounded-2xl border border-[#E5E9E8] p-6 bg-white hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#F0C5AE]/30 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-black">!</span>
                </div>
                <h3 className="font-bold text-black text-base mb-1">بوب تحذير (Warning)</h3>
                <p className="text-xs text-[#5E6665] mb-5">
                  رسم علامة التعجب مع نغمة تحذيرية مزدوجة.
                </p>
                <Button
                  variant="warning"
                  size="sm"
                  fullWidth
                  className="mt-auto"
                  onClick={() => setIsWarningPopupOpen(true)}
                >
                  فتح بوب تحذير
                </Button>
              </div>

              {/* 3. Alert Popup Card */}
              <div className="rounded-2xl border border-[#E5E9E8] p-6 bg-white hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#91B8C0]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-black">ℹ</span>
                </div>
                <h3 className="font-bold text-black text-base mb-1">بوب تنبيه (Alert)</h3>
                <p className="text-xs text-[#5E6665] mb-5">
                  رسم علامة المعلومات مع نغمة إشعار رقيقة.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="mt-auto"
                  onClick={() => setIsAlertPopupOpen(true)}
                >
                  فتح بوب تنبيه
                </Button>
              </div>

              {/* 4. Confirm Popup Card */}
              <div className="rounded-2xl border border-[#E5E9E8] p-6 bg-white hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#E5E9E8] flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-black">?</span>
                </div>
                <h3 className="font-bold text-black text-base mb-1">بوب تأكيد (Confirm)</h3>
                <p className="text-xs text-[#5E6665] mb-5">
                  رسم علامة الاستفهام مع نغمة استفسار وزري تأكيد وإلغاء.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  className="mt-auto"
                  onClick={() => setIsConfirmPopupOpen(true)}
                >
                  فتح بوب تأكيد
                </Button>
              </div>

              {/* 5. Error Popup Card */}
              <div className="rounded-2xl border border-[#E5E9E8] p-6 bg-white hover:shadow-md transition-all flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-red-600">✕</span>
                </div>
                <h3 className="font-bold text-black text-base mb-1">بوب خطأ (Error)</h3>
                <p className="text-xs text-[#5E6665] mb-5">
                  رسم علامة الخطأ المتقاطعة مع نغمة تنبيه صوتية فورية.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  fullWidth
                  className="mt-auto"
                  onClick={() => setIsErrorPopupOpen(true)}
                >
                  فتح بوب خطأ
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SECTION 5: ALERT BANNERS */}
        <TabsContent value="alerts">
          <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-8 shadow-none space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-black tracking-tight">
                شرائط التنبيهات (AlertBanner Variants)
              </h2>
              <p className="text-sm text-[#5E6665] mt-1">
                تنبيهات حالة النظام الملونة مع أيقونات واضحة وخاصية الإغلاق التلقائي
              </p>
            </div>

            <div className="space-y-4">
              <AlertBanner
                variant="success"
                title="تمت العملية بنجاح"
                message="تم اعتماد الربط وتأكيد الامتثال الضريبي بنجاح عبر منصة زاتكا (ZATCA)."
              />

              <AlertBanner
                variant="info"
                title="معلومة هامة للمستخدم"
                message="تم تفعيل خط Ping AR + LT و IBM Plex Sans Arabic بالكامل مع Tailwind CSS."
              />

              <AlertBanner
                variant="warning"
                title="تنبيه يتطلب الانتباه"
                message="يرجى مراجعة إعدادات أرقام الجوال الدولية للتأكد من وصول رسائل التحقق (OTP)."
              />

              <AlertBanner
                variant="error"
                title="فشل في معالجة الطلب"
                message="حدث خطأ أثناء معالجة البيانات، يرجى ملء الحقول الإلزامية والمحاولة لاحقاً."
              />
            </div>
          </div>
        </TabsContent>

        {/* SECTION: 3D ANIMOJI & AVATAR PICKER */}
        <TabsContent value="avatars">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E5E9E8] pb-5">
              <div>
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  اختيار وتخصيص الأفاتار (3D Animoji Avatars)
                </h2>
                <p className="text-sm text-[#5E6665] mt-1">
                  مكتبة متكاملة تضم 237 شخصية 3D Animoji عالية الدقة مع إمكانية رفع صورة شخصية واختيار ألوان الخلفية وحالة الاتصال.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="md">
                  237 شخصية ثلاثية الأبعاد
                </Badge>
                <Badge variant="secondary" size="md">
                  Figma Community Library
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Customizer Component */}
              <div className="lg:col-span-7">
                <AvatarPicker
                  defaultValue={userAvatar}
                  onSave={(custom) => {
                    setUserAvatar(custom);
                    setToastMessage('تم تحديث وحفظ إعدادات الأفاتار بنجاح!');
                  }}
                />
              </div>

              {/* Showcase & Previews */}
              <div className="lg:col-span-5 space-y-6">
                {/* Active Profile Card Preview */}
                <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-6 shadow-none">
                  <div className="flex items-center justify-between border-b border-[#E5E9E8] pb-4 mb-5">
                    <h3 className="font-bold text-base text-black">بطاقة الملف الشخصي الحي</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      معاينة نشطة
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Avatar
                      animojiId={userAvatar.type === 'animoji' ? userAvatar.animojiId : undefined}
                      src={userAvatar.type === 'custom' ? userAvatar.customSrc : undefined}
                      size="xl"
                      status={userAvatar.status}
                      rounded={userAvatar.rounded}
                      className={userAvatar.bgColor}
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg text-black">محمد رشاد</h4>
                        <Badge variant="primary" size="sm">
                          {userAvatar.type === 'animoji' ? `Animoji #${userAvatar.animojiId}` : 'مخصص'}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#5E6665]">مهندس واجهات ومصمم نظم هوية RASHX</p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[11px] text-[#5E6665]">الرياض، المملكة العربية السعودية</span>
                      </div>
                    </div>
                  </div>

                  {/* Size Variants Showcase */}
                  <div className="mt-6 pt-5 border-t border-[#E5E9E8]">
                    <span className="text-xs font-bold text-black block mb-3">
                      أحجام الأفاتار المتاحة في النظام (Avatar Sizes)
                    </span>
                    <div className="flex items-end gap-3 p-3 rounded-2xl bg-[#E5E9E8]/30">
                      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                        <div key={sz} className="flex flex-col items-center gap-1">
                          <Avatar
                            animojiId={userAvatar.type === 'animoji' ? userAvatar.animojiId : undefined}
                            src={userAvatar.type === 'custom' ? userAvatar.customSrc : undefined}
                            size={sz}
                            rounded={userAvatar.rounded}
                            className={userAvatar.bgColor}
                          />
                          <span className="text-[10px] text-[#5E6665] font-mono">{sz}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stacked Group Showcase */}
                  <div className="mt-5 pt-4 border-t border-[#E5E9E8] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-black block">مجموعات الأفاتار (AvatarGroup)</span>
                      <span className="text-[11px] text-[#5E6665]">عرض أعضاء الفريق والمشاركين</span>
                    </div>
                    <AvatarGroup max={4} size="sm">
                      <Avatar animojiId={2} name="أحمد" />
                      <Avatar animojiId={18} name="سارة" />
                      <Avatar animojiId={42} name="فيصل" />
                      <Avatar animojiId={85} name="منى" />
                      <Avatar animojiId={120} name="عبدالله" />
                      <Avatar animojiId={200} name="هند" />
                    </AvatarGroup>
                  </div>
                </div>

                {/* Popular Avatars Quick Picks */}
                <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-6 shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-base text-black">نماذج مختارة سريعة (Quick Select)</h3>
                    <span className="text-xs text-[#5E6665]">انقر للتطبيق الفوري</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2.5">
                    {[4, 12, 28, 44, 60, 76, 92, 108, 124, 140, 156, 172].map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setUserAvatar((prev) => ({ ...prev, type: 'animoji', animojiId: id }));
                          setToastMessage(`تم اختيار الأفاتار رقم #${id}`);
                        }}
                        className={`p-1.5 rounded-xl border transition-all hover:scale-110 flex items-center justify-center ${
                          userAvatar.animojiId === id && userAvatar.type === 'animoji'
                            ? 'border-[#91B8C0] bg-[#91B8C0]/15 shadow-xs'
                            : 'border-[#E5E9E8] hover:border-[#91B8C0]/50 bg-white'
                        }`}
                        title={`أفاتار #${id}`}
                      >
                        <Avatar animojiId={id} size="sm" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SECTION: FILE UPLOAD & ATTACHMENTS */}
        <TabsContent value="upload">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E5E9E8] pb-5">
              <div>
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  مكون رفع الملفات والوثائق (File Upload Component)
                </h2>
                <p className="text-sm text-[#5E6665] mt-1">
                  يدعم السحب والإفلات (Drag & Drop)، المعاينة الفورية، محاكاة مؤشر التقدم، والتحقق من الأحجام والصيغ المعتمدة.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="md">
                  Drag & Drop
                </Badge>
                <Badge variant="secondary" size="md">
                  HTML5 File API
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Primary Demo - Multi-file Upload */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-8 shadow-none space-y-6">
                  <div>
                    <h3 className="font-bold text-lg text-black">رفع مستندات المنشأة والسجل التجاري</h3>
                    <p className="text-xs text-[#5E6665] mt-1">
                      يدعم رفع عدة وثائق دفعة واحدة مع تتبع تقدم الرفع وإمكانية الحذف
                    </p>
                  </div>

                  <FileUpload
                    label="ملفات التوثيق والامتثال التجاري"
                    description="اسحب وأفلت العقود، الشهادات الضريبية، والسجل التجاري هنا"
                    helperText="الحد الأقصى 5 ملفات بحجم 15 ميجابايت لكل ملف (PDF, DOCX, XLSX, PNG, JPG, ZIP)"
                    multiple
                    maxFiles={5}
                    maxSizeMB={15}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
                    onFilesChange={(files) => {
                      if (files.length > 0) {
                        setToastMessage(`تم إدراج ${files.length} ملف/ملفات بنجاح`);
                      }
                    }}
                  />
                </div>

                <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-8 shadow-none space-y-6">
                  <div>
                    <h3 className="font-bold text-lg text-black">رفع صورة واحدة فقط (Single File Upload)</h3>
                    <p className="text-xs text-[#5E6665] mt-1">
                      مناسب لرفع الشعار الرسمي أو صورة الهوية الشخصية مع المعاينة
                    </p>
                  </div>

                  <FileUpload
                    label="شعار المنشأة أو الأيقونة الرسمية"
                    description="اسحب صورة الشعار هنا بصيغة PNG أو JPG أو SVG"
                    helperText="حجم أقصى 5 ميجابايت، يفضل خلفية شفافة"
                    multiple={false}
                    maxSizeMB={5}
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Sidebar Feature Guide */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-6 shadow-none space-y-4">
                  <h3 className="font-bold text-base text-black border-b border-[#E5E9E8] pb-3">
                    مزايا مكون الرفع RASHX FileUpload
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#E5E9E8]/30">
                      <div className="w-8 h-8 rounded-xl bg-[#91B8C0]/30 flex items-center justify-center shrink-0 font-bold text-xs text-black">
                        1
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-black">السحب والإفلات التفاعلي</h4>
                        <p className="text-xs text-[#5E6665] mt-0.5">
                          تغيير لون الإطار إلى لون الهوية (#91B8C0) عند سحب الملفات فوق منطقة الرفع.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F0C5AE]/40 flex items-center justify-center shrink-0 font-bold text-xs text-black">
                      <div className="w-8 h-8 rounded-xl bg-[#F0C5AE]/40 flex items-center justify-center shrink-0 font-bold text-xs text-black">
                        2
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-black">فحص الأحجام والامتدادات تلقائياً</h4>
                        <p className="text-xs text-[#5E6665] mt-0.5">
                          رفض أي ملف يتجاوز الحجم المحدد أو لا يطابق الصيغ المسموح بها مع إشعار خطأ فوري.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#E5E9E8]/30">
                      <div className="w-8 h-8 rounded-xl bg-[#91B8C0]/30 flex items-center justify-center shrink-0 font-bold text-xs text-black">
                        3
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-black">محاكاة مؤشر التقدم الحي (Progress Bar)</h4>
                        <p className="text-xs text-[#5E6665] mt-0.5">
                          شريط تقدم بلون الهوية (#91B8C0) يحاكي رفع الملف بنسبة مئوية حتى 100%.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#E5E9E8]/30">
                      <div className="w-8 h-8 rounded-xl bg-[#E5E9E8] flex items-center justify-center shrink-0 font-bold text-xs text-black">
                        4
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-black">أيقونات مخصصة حسب نوع الملف</h4>
                        <p className="text-xs text-[#5E6665] mt-0.5">
                          تمييز ملفات PDF، الصور، والمستندات بأيقونات متناسقة مع إمكانية مسح الملفات الفردية أو تفريغ القائمة.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* State Demo Card */}
                <div className="rounded-xl border border-[#E5E9E8]/70 bg-white p-6 shadow-none space-y-3">
                  <h3 className="font-bold text-base text-black">حالة الحظر أو التعطيل (Disabled State)</h3>
                  <p className="text-xs text-[#5E6665]">
                    معاينة شكل المكون عندما تكون إمكانية الرفع معطلة من النظام:
                  </p>
                  <FileUpload
                    label="مرفق مقفل"
                    description="الرفع غير متاح حالياً"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 8: Cookie Consent & Modal Showcase */}
        <TabsContent value="cookies">
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header info card */}
            <div className="rounded-2xl border border-[#E5E9E8] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5E9E8]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F0C5AE]/40 to-[#91B8C0]/30 border border-[#F0C5AE]/60 flex items-center justify-center shrink-0">
                    <Cookie className="w-6 h-6 text-[#9E6540]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold text-black tracking-tight">
                        موديل وإشعار الكوكيز والخصوصية — Cookie Consent Component
                      </h2>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EAF6F0] text-emerald-800 border border-[#9CD3BE]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        نظام حماية البيانات الشخصية (PDPL & GDPR)
                      </span>
                    </div>
                    <p className="text-sm text-[#5E6665] leading-relaxed max-w-3xl">
                      مكون واجهة مستخدم متكامل وشامل لإدارة موافقات ملفات تعريف الارتباط وسياسات الخصوصية. يوفر واجهة شفافة وممتثلة تتيح للزوار قبول أو رفض أو تخصيص الفئات (الضرورية، الوظائف والتفضيلات، الأداء والتحليلات، والتسويق) مع تفاصيل دقيقة لكل ملف.
                    </p>
                  </div>
                </div>

                {/* Reset button */}
                <div className="shrink-0 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      resetCookieConsent();
                      setToastMessage('تمت إعادة ضبط موافقات الكوكيز في المتصفح بنجاح!');
                    }}
                    leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    إعادة ضبط الموافقة
                  </Button>
                </div>
              </div>

              {/* Live Interactive Trigger Controls */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-black">
                    تجربة أشكال وعرض الموديل (Display Variants):
                  </span>
                  <span className="text-xs text-[#5E6665]">
                    اختر النمط المناسب للتجربة ومعاينته مباشرة
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCookieVariant('modal');
                      setIsCookieConsentOpen(true);
                    }}
                    className={`p-4 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      cookieVariant === 'modal' && isCookieConsentOpen
                        ? 'border-[#91B8C0] bg-[#91B8C0]/15 ring-2 ring-[#91B8C0]/30'
                        : 'border-[#E5E9E8] hover:border-[#91B8C0] bg-white hover:bg-[#FAFBFB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-black">نافذة حوار منبثقة (Modal)</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black text-white">
                        Dialog
                      </span>
                    </div>
                    <p className="text-xs text-[#5E6665] leading-relaxed">
                      نافذة مركزية بتركيز تام وخلفية ضبابية، ملائمة للمواقع التي تتطلب موافقة إلزامية وصريحة.
                    </p>
                    <span className="text-xs font-semibold text-[#91B8C0] mt-1 inline-flex items-center gap-1">
                      فتح الموديل ←
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCookieVariant('floating');
                      setIsCookieConsentOpen(true);
                    }}
                    className={`p-4 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      cookieVariant === 'floating' && isCookieConsentOpen
                        ? 'border-[#91B8C0] bg-[#91B8C0]/15 ring-2 ring-[#91B8C0]/30'
                        : 'border-[#E5E9E8] hover:border-[#91B8C0] bg-white hover:bg-[#FAFBFB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-black">كارت عائم (Floating Card)</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#91B8C0] text-black">
                        الافتراضي
                      </span>
                    </div>
                    <p className="text-xs text-[#5E6665] leading-relaxed">
                      بطاقة أنيقة في الزاوية السفلية لا تحجب المحتوى، مثالية للتطبيقات والمنصات الحديثة.
                    </p>
                    <span className="text-xs font-semibold text-[#91B8C0] mt-1 inline-flex items-center gap-1">
                      عرض الكارت ←
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCookieVariant('banner');
                      setIsCookieConsentOpen(true);
                    }}
                    className={`p-4 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      cookieVariant === 'banner' && isCookieConsentOpen
                        ? 'border-[#91B8C0] bg-[#91B8C0]/15 ring-2 ring-[#91B8C0]/30'
                        : 'border-[#E5E9E8] hover:border-[#91B8C0] bg-white hover:bg-[#FAFBFB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-black">شريط سفلي ممتد (Banner)</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E5E9E8] text-black">
                        Bottom Bar
                      </span>
                    </div>
                    <p className="text-xs text-[#5E6665] leading-relaxed">
                      شريط أفقي عريض مثبت في أسفل الشاشة يعرض ملخص السياسة وإجراءات القبول السريعة.
                    </p>
                    <span className="text-xs font-semibold text-[#91B8C0] mt-1 inline-flex items-center gap-1">
                      عرض الشريط ←
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCookieVariant('bottom-sheet');
                      setIsCookieConsentOpen(true);
                    }}
                    className={`p-4 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      cookieVariant === 'bottom-sheet' && isCookieConsentOpen
                        ? 'border-[#91B8C0] bg-[#91B8C0]/15 ring-2 ring-[#91B8C0]/30'
                        : 'border-[#E5E9E8] hover:border-[#91B8C0] bg-white hover:bg-[#FAFBFB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-black">درج سفلي (Bottom Sheet)</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F0C5AE] text-black">
                        Mobile First
                      </span>
                    </div>
                    <p className="text-xs text-[#5E6665] leading-relaxed">
                      ينبثق من الأسفل للأعلى بنمط الأجهزة الذكية، سلس للغاية في تجربة تصفح الجوال.
                    </p>
                    <span className="text-xs font-semibold text-[#91B8C0] mt-1 inline-flex items-center gap-1">
                      فتح اللوحة ←
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Consent Inspection Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Consent State Box */}
              <div className="md:col-span-2 rounded-2xl border border-[#E5E9E8] bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E9E8]">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-black" />
                    <h3 className="font-bold text-sm text-black">
                      حالة الموافقة المخزنة للمستخدم (Live Consent State)
                    </h3>
                  </div>
                  {liveCookieConsent ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF6F0] text-emerald-800 border border-[#9CD3BE]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      تم تسجيل التفضيلات بنجاح
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FDF3ED] text-[#8C4A27] border border-[#F0C5AE]">
                      بانتظار تفاعل الزائر
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Category 1: Necessary */}
                  <div className="p-3.5 rounded-xl border border-[#91B8C0]/40 bg-[#91B8C0]/10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-black">الكوكيز الضرورية (Necessary)</div>
                      <div className="text-[11px] text-[#5E6665]">الأمان وتسجيل الدخول</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black text-white">
                      مفعلة دائماً
                    </span>
                  </div>

                  {/* Category 2: Preferences */}
                  <div
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      liveCookieConsent?.categories?.preferences ?? true
                        ? 'border-[#9CD3BE] bg-[#EAF6F0]'
                        : 'border-[#E5E9E8] bg-[#FAFBFB]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-black">الوظائف والتفضيلات (Preferences)</div>
                      <div className="text-[11px] text-[#5E6665]">اللغة والمظهر والواجهة</div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        liveCookieConsent?.categories?.preferences ?? true
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#E5E9E8] text-[#5E6665]'
                      }`}
                    >
                      {liveCookieConsent?.categories?.preferences ?? true ? 'مفعلة' : 'معطلة'}
                    </span>
                  </div>

                  {/* Category 3: Analytics */}
                  <div
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      liveCookieConsent?.categories?.analytics
                        ? 'border-[#9CD3BE] bg-[#EAF6F0]'
                        : 'border-[#E5E9E8] bg-[#FAFBFB]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-black">الأداء والتحليلات (Analytics)</div>
                      <div className="text-[11px] text-[#5E6665]">مؤشرات السرعة والزيارات</div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        liveCookieConsent?.categories?.analytics
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#E5E9E8] text-[#5E6665]'
                      }`}
                    >
                      {liveCookieConsent?.categories?.analytics ? 'مفعلة' : 'معطلة'}
                    </span>
                  </div>

                  {/* Category 4: Marketing */}
                  <div
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      liveCookieConsent?.categories?.marketing
                        ? 'border-[#9CD3BE] bg-[#EAF6F0]'
                        : 'border-[#E5E9E8] bg-[#FAFBFB]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-black">التسويق والإعلانات (Marketing)</div>
                      <div className="text-[11px] text-[#5E6665]">تخصيص الحملات والشركاء</div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        liveCookieConsent?.categories?.marketing
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#E5E9E8] text-[#5E6665]'
                      }`}
                    >
                      {liveCookieConsent?.categories?.marketing ? 'مفعلة' : 'معطلة'}
                    </span>
                  </div>
                </div>

                {liveCookieConsent && (
                  <div className="text-[11px] text-[#5E6665] flex items-center gap-3 pt-2">
                    <span>تاريخ الحفظ: {new Date(liveCookieConsent.timestamp).toLocaleString('ar-SA')}</span>
                    <span>•</span>
                    <span>الإصدار: v{liveCookieConsent.version}</span>
                  </div>
                )}
              </div>

              {/* Quick Info & Compliance Points */}
              <div className="rounded-2xl border border-[#E5E9E8] bg-white p-6 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#91B8C0]" />
                    <h3 className="font-bold text-sm text-black">المزايا التقنية المدمجة</h3>
                  </div>

                  <ul className="text-xs text-[#5E6665] space-y-2 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#91B8C0] shrink-0 mt-1.5" />
                      <span>
                        <strong>تزامن React 19 نقي:</strong> يعتمد على <code className="font-mono text-[10px] bg-[#E5E9E8] px-1 rounded">useSyncExternalStore</code> لمنع وميض SSR وإعادة التصيير غير الضرورية.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#91B8C0] shrink-0 mt-1.5" />
                      <span>
                        <strong>زر عائم ذكي دائم:</strong> بعد إغلاق الإشعار يظهر زر عائم صغير بأسفل الشاشة لتمكين الزائر من تعديل خياراته بأي لحظة.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#91B8C0] shrink-0 mt-1.5" />
                      <span>
                        <strong>جدول الكوكيز التفصيلي:</strong> إمكانية استعراض أسماء الملفات ومدتها والجهة المصدرة بدقة.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#E5E9E8]">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      setCookieVariant('floating');
                      setIsCookieConsentOpen(true);
                    }}
                  >
                    تعديل تفضيلات الكوكيز الآن
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Interactive Modal Component Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="الشروط والأحكام المعتمدة — RASHX"
        description="يرجى قراءة بنود وضوابط الاستخدام لمنظومة راش اكس للتقنية المالية."
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setTermsAccepted(true);
                setIsModalOpen(false);
              }}
            >
              موافق ومتابعة
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-sm leading-relaxed text-[#5E6665]">
          <p>
            أهلاً بك في منصة راش اكس (RASHX). باستخدامك لهذه المنظومة فإنك تقر وتوافق على الالتزام بكافة الشروط والأحكام واللوائح المعتمدة بالمملكة العربية السعودية.
          </p>
          <p>
            تلتزم المنظومة بتطبيق أعلى معايير التشفير وحماية البيانات وتخضع كافة العمليات للاشتراطات التنظيمية ذات الصلة.
          </p>
        </div>
      </Modal>

      {/* Avatar Customization Modal */}
      <Modal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        title="تخصيص الأفاتار وصورة الملف الشخصي"
        description="اختر من بين 237 شخصية 3D Animoji أو قم برفع صورتك الخاصة وتخصيص الألوان والحالة"
        size="lg"
      >
        <AvatarPicker
          value={userAvatar}
          onSave={(custom) => {
            setUserAvatar(custom);
            setIsAvatarModalOpen(false);
            setToastMessage('تم تحديث الأفاتار الشخصي بنجاح!');
          }}
        />
      </Modal>

      {/* 4 Specialized Popups (With Audio & Animated SVG) */}
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={() => setIsSuccessPopupOpen(false)}
        title="تم اعتماد العملية بنجاح!"
        message="تم حفظ بيانات النموذج وتسجيلها في المنظومة وإصدار السند الرقمي المعتمد."
      />

      <WarningPopup
        isOpen={isWarningPopupOpen}
        onClose={() => setIsWarningPopupOpen(false)}
        onConfirm={() => {
          setIsWarningPopupOpen(false);
          alert('تم المتابعة وتجاوز التحذير');
        }}
        title="تحذير أمني ونظامي"
        message="أنت على وشك تعديل صلاحيات وصول هامة، يرجى التأكد من هوية المستخدم قبل الاستمرار."
        confirmText="نعم، متأكد من الاستمرار"
        cancelText="تراجع للخلف"
      />

      <AlertPopup
        isOpen={isAlertPopupOpen}
        onClose={() => setIsAlertPopupOpen(false)}
        title="تنبيه: تحديث السياسات والامتثال"
        message="تم تحديث متطلبات الربط مع منصة زاتكا وسدايا، تأكد من استيفاء البيانات المالية."
        buttonText="حسناً، تم الاطلاع"
      />

      <ConfirmPopup
        isOpen={isConfirmPopupOpen}
        onClose={() => setIsConfirmPopupOpen(false)}
        onConfirm={() => {
          setIsConfirmPopupOpen(false);
          setIsSuccessPopupOpen(true);
        }}
        title="تأكيد اعتماد التقرير المالي"
        message="هل ترغب في تصدير واعتماد التقرير المالي الحالي وإرساله مباشرة إلى الإدارة المالية؟"
        confirmText="نعم، اعتمد التقرير"
        cancelText="إلغاء الأمر"
      />

      <ErrorPopup
        isOpen={isErrorPopupOpen}
        onClose={() => setIsErrorPopupOpen(false)}
        onRetry={() => {
          setIsErrorPopupOpen(false);
          setIsSuccessPopupOpen(true);
        }}
        title="فشل في إتمام العملية المالية"
        message="تعذر الاتصال ببوابة الدفع المعتمدة، يرجى التحقق من الرصيد والاتصال بالشبكة والمحاولة لاحقاً."
        retryText="إعادة المحاولة الآن"
        closeText="إغلاق التنبيه"
      />

      {/* Cookie Consent Modal & Banner */}
      <CookieConsent
        isOpen={isCookieConsentOpen}
        onOpenChange={setIsCookieConsentOpen}
        variant={cookieVariant}
        triggerPosition="bottom-left"
        privacyPolicyUrl="#privacy"
        cookiePolicyUrl="#cookies"
        onAcceptAll={() => {
          setToastMessage('تم قبول جميع ملفات تعريف الارتباط بنجاح!');
        }}
        onRejectAll={() => {
          setToastMessage('تم رفض ملفات تعريف الارتباط غير الأساسية.');
        }}
        onSavePreferences={() => {
          setToastMessage('تم حفظ تفضيلات ملفات تعريف الارتباط بنجاح.');
        }}
      />

      {/* Floating AI Avatar #138 on the right side with speech bubble only (no header) */}
      <FloatingAIAssistant
        animojiId={138}
        position="bottom-right"
        message="أهلاً بك في راش إكس! 🚀 جاهز لمساعدتك في أي استفسار حول الفواتير والامتثال المالي."
      />
      </main>

      {/* Reusable Footer Component */}
      <Footer
        variant="detailed"
        vatNumber="310489201900003"
        onNewsletterSubmit={(email) => {
          setToastMessage(`تم اشتراك البريد ${email} في النشرة الدورية لـ RASHX بنجاح!`);
        }}
      />
    </div>
  );
}
