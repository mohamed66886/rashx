'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sun,
  Moon,
  Clock,
} from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

interface LeadFormProps {
  locale?: Locale;
  defaultPlan?: string;
  redirectToThankYou?: boolean;
  title?: string;
  subtitle?: string;
  showPreferredTime?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  locale = DEFAULT_LOCALE,
  defaultPlan,
  redirectToThankYou = false,
  title,
  subtitle,
  showPreferredTime = true,
}) => {
  const router = useRouter();
  const isAr = locale === 'ar';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    facilityName: '',
    facilityType: 'salon_women',
    city: 'riyadh',
    branches: '1',
    preferredTime: 'morning' as 'morning' | 'evening' | 'any',
    message: defaultPlan ? `مهتم بالاشتراك في باقة: ${defaultPlan}` : '',
    // Honeypot field (must stay empty)
    websiteUrlHoneypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Saudi phone validator: accepts 05xxxxxxxx, +9665xxxxxxxx, 9665xxxxxxxx, 5xxxxxxxx
  const validateSaudiPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s-]/g, '');
    const saudiRegex = /^(?:(?:\+?966)|0)?5\d{8}$/;
    return saudiRegex.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check Honeypot for bot detection
    if (formData.websiteUrlHoneypot) {
      // Silently fail for bots
      if (redirectToThankYou) {
        router.push(`/${locale}/demo/thank-you`);
      } else {
        setStatus('success');
      }
      return;
    }

    // Validate phone
    if (!validateSaudiPhone(formData.phone)) {
      setStatus('error');
      setErrorMessage(
        isAr
          ? 'يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 أو +9665 (مثال: 0548082945)'
          : 'Please enter a valid Saudi mobile number starting with 05 or +9665 (e.g. 0548082945)'
      );
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit lead');
      }

      if (redirectToThankYou) {
        router.push(`/${locale}/demo/thank-you`);
      } else {
        setStatus('success');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : isAr
          ? 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مجددًا أو مراسلتنا واتساب مباشرة.'
          : 'An error occurred while submitting your request. Please try again or WhatsApp us directly.'
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white p-6 sm:p-9 border border-mist-gray shadow-xl">
      {status === 'success' ? (
        <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-ink">
            {isAr ? 'تم استلام طلبك بنجاح!' : 'Your Request Has Been Received!'}
          </h3>

          <p className="text-xs sm:text-sm font-normal text-ink-muted max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'شكرًا لاهتمامك بمنصة راش إكس. سيتواصل معك أحد مستشارينا في السعودية خلال أقل من ساعتي عمل لجدولة العرض الحي وتجهيز نطاقك التجريبي.'
              : 'Thank you for choosing RashX. A Saudi specialist will contact you within two business hours to schedule your walkthrough.'}
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setFormData({
                  fullName: '',
                  phone: '',
                  facilityName: '',
                  facilityType: 'salon_women',
                  city: 'riyadh',
                  branches: '1',
                  preferredTime: 'morning',
                  message: '',
                  websiteUrlHoneypot: '',
                });
              }}
              className="px-5 py-2.5 text-xs font-medium text-ink bg-mist-gray hover:bg-mist-gray/80 rounded-xl transition-colors"
            >
              {isAr ? 'إرسال طلب لمنشأة أخرى' : 'Submit Another Request'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-ink">
              {title || (isAr ? 'احجز عرضًا تجريبيًا مخصصًا لمنشأتك' : 'Book a Tailored Demo for Your Facility')}
            </h3>
            <p className="text-xs sm:text-sm font-normal text-ink-muted">
              {subtitle ||
                (isAr
                  ? 'استكشف لوحة التحكم، موقع المنشأة، وتطبيق العميل مع مستشار سعودي متمرس.'
                  : 'Explore the dashboard, salon website, and client app with our consultant.')}
            </p>
          </div>

          {/* Honeypot anti-spam (visually hidden) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="websiteUrlHoneypot">Website</label>
            <input
              type="text"
              id="websiteUrlHoneypot"
              name="websiteUrlHoneypot"
              value={formData.websiteUrlHoneypot}
              onChange={(e) =>
                setFormData({ ...formData, websiteUrlHoneypot: e.target.value })
              }
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Error Banner */}
          {status === 'error' && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                {isAr ? 'الاسم الكامل *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={isAr ? 'مثال: سارة العتيبي' : 'e.g. Sarah Al-Otaibi'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-mist-gray bg-[#FAFBFB] text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-dusty-blue focus:bg-white transition-all font-normal"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                {isAr ? 'رقم الجوال (سعودي) *' : 'Mobile Number (Saudi) *'}
              </label>
              <input
                type="tel"
                required
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05xxxxxxxx"
                className="w-full px-3.5 py-2.5 rounded-xl border border-mist-gray bg-[#FAFBFB] text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-dusty-blue focus:bg-white text-start transition-all font-normal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Facility Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                {isAr ? 'اسم المنشأة / الصالون *' : 'Facility / Salon Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.facilityName}
                onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                placeholder={isAr ? 'مثال: صالون لمسة حرير' : 'e.g. Silk Touch Salon'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-mist-gray bg-[#FAFBFB] text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-dusty-blue focus:bg-white transition-all font-normal"
              />
            </div>

            {/* Facility Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                {isAr ? 'نوع المنشأة *' : 'Facility Type *'}
              </label>
              <select
                value={formData.facilityType}
                onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-mist-gray bg-[#FAFBFB] text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-dusty-blue focus:bg-white transition-all font-normal"
              >
                <option value="salon_women">
                  {isAr ? 'صالون نسائي / مشغل' : 'Women Salon / Studio'}
                </option>
                <option value="salon_men">
                  {isAr ? 'صالون رجالي / حلاقة' : 'Men Barbershop'}
                </option>
                <option value="beauty_center">
                  {isAr ? 'مركز تجميل متكامل' : 'Full Beauty Complex'}
                </option>
                <option value="spa">{isAr ? 'مركز سبا واستجمام' : 'Spa & Wellness'}</option>
                <option value="clinic">{isAr ? 'عيادة جلدية وتجميل' : 'Derma & Aesthetic Clinic'}</option>
                <option value="other">{isAr ? 'أخرى' : 'Other'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                {isAr ? 'المدينة *' : 'City *'}
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-mist-gray bg-[#FAFBFB] text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-dusty-blue focus:bg-white transition-all font-normal"
              >
                <option value="riyadh">{isAr ? 'الرياض' : 'Riyadh'}</option>
                <option value="jeddah">{isAr ? 'جدة' : 'Jeddah'}</option>
                <option value="dammam">{isAr ? 'الدمام' : 'Dammam'}</option>
                <option value="khobar">{isAr ? 'الخبر' : 'Khobar'}</option>
                <option value="makkah">{isAr ? 'مكة المكرمة' : 'Makkah'}</option>
                <option value="madinah">{isAr ? 'المدينة المنورة' : 'Madinah'}</option>
                <option value="dhahran">{isAr ? 'الظهران' : 'Dhahran'}</option>
                <option value="ahsa">{isAr ? 'الأحساء' : 'Al-Ahsa'}</option>
                <option value="abha">{isAr ? 'أبها / خميس مشيط' : 'Abha / Khamis'}</option>
                <option value="tabuk">{isAr ? 'تبوك' : 'Tabuk'}</option>
                <option value="qassim">{isAr ? 'القصيم (بريدة/عنيزة)' : 'Qassim'}</option>
                <option value="taif">{isAr ? 'الطائف' : 'Taif'}</option>
                <option value="other">{isAr ? 'مدينة أخرى' : 'Other City'}</option>
              </select>
            </div>

            {/* Branches Count */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                {isAr ? 'عدد الفروع *' : 'Number of Branches *'}
              </label>
              <select
                value={formData.branches}
                onChange={(e) => setFormData({ ...formData, branches: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-mist-gray bg-[#FAFBFB] text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-dusty-blue focus:bg-white transition-all font-normal"
              >
                <option value="1">{isAr ? 'فرع واحد' : '1 Branch'}</option>
                <option value="2_3">{isAr ? '2 - 3 فروع' : '2 - 3 Branches'}</option>
                <option value="4_10">{isAr ? '4 - 10 فروع' : '4 - 10 Branches'}</option>
                <option value="more_10">
                  {isAr ? 'أكثر من 10 فروع (سلسلة)' : 'More than 10 Branches (Chain)'}
                </option>
              </select>
            </div>
          </div>

          {/* Preferred Demo Time (Morning / Evening / Any) */}
          {showPreferredTime && (
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                {isAr ? 'الموعد المفضل للعرض التجريبي *' : 'Preferred Demo Time *'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredTime: 'morning' })}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    formData.preferredTime === 'morning'
                      ? 'bg-dusty-blue/20 border-dusty-blue text-black shadow-2xs font-semibold'
                      : 'bg-[#FAFBFB] border-mist-gray text-ink hover:bg-mist-gray/40'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{isAr ? 'صباحًا (10 ص - 2 م)' : 'Morning (10AM - 2PM)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredTime: 'evening' })}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    formData.preferredTime === 'evening'
                      ? 'bg-dusty-blue/20 border-dusty-blue text-black shadow-2xs font-semibold'
                      : 'bg-[#FAFBFB] border-mist-gray text-ink hover:bg-mist-gray/40'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{isAr ? 'مساءً (4 م - 9 م)' : 'Evening (4PM - 9PM)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredTime: 'any' })}
                  className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    formData.preferredTime === 'any'
                      ? 'bg-dusty-blue/20 border-dusty-blue text-black shadow-2xs font-semibold'
                      : 'bg-[#FAFBFB] border-mist-gray text-ink hover:bg-mist-gray/40'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                  <span>{isAr ? 'أي وقت متاح' : 'Any Time'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Notes / Message */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-ink">
              {isAr ? 'ملاحظات أو متطلبات خاصة (اختياري)' : 'Special Requirements (Optional)'}
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={
                isAr
                  ? 'أخبرنا بأهم أولوياتك (مثل: ضبط العمولات، جرد المخزون، الفوترة الإلكترونية)...'
                  : 'Tell us your top operational priorities...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-mist-gray bg-[#FAFBFB] text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-dusty-blue focus:bg-white transition-all font-normal"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold sm:text-sm md:text-base text-black bg-dusty-blue hover:bg-dusty-blue/90 disabled:opacity-50 rounded-2xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            {status === 'loading' ? (
              <span>{isAr ? 'جاري الإرسال وتأكيد الطلب...' : 'Submitting...'}</span>
            ) : (
              <>
                <span>{isAr ? 'تأكيد حجز العرض التجريبي' : 'Confirm Demo Booking'}</span>
                <Send className="w-4 h-4 rtl:rotate-180" />
              </>
            )}
          </button>

          {/* PDPL Privacy Assurance */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-ink-muted pt-1">
            <ShieldCheck className="w-4 h-4 text-dusty-blue shrink-0" />
            <span>
              {isAr
                ? 'بياناتك محمية ومشفرة وفق نظام حماية البيانات الشخصية السعودي (PDPL)'
                : 'Protected and encrypted under the Saudi Personal Data Protection Law (PDPL)'}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default LeadForm;
