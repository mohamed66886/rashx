'use client';

import React, { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Check, AlertCircle, ShieldCheck, Sun, Moon, Clock } from 'lucide-react';
import { Locale, DEFAULT_LOCALE } from '@/i18n/config';

/**
 * RASHX lead form — simplified.
 * Brand colors only: dusty-blue, warm-peach, mist-gray, ink, ink-muted.
 * Submit logic, validation, honeypot and props are unchanged.
 * New: every label is tied to its field (clicking a label focuses the input).
 */

interface LeadFormProps {
  locale?: Locale;
  defaultPlan?: string;
  redirectToThankYou?: boolean;
  title?: string;
  subtitle?: string;
  showPreferredTime?: boolean;
}

type PreferredTime = 'morning' | 'evening' | 'any';

const inputClass =
  'w-full rounded-xl border border-mist-gray bg-neutral/40 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-ink focus:bg-white focus:outline-none focus:ring-2 focus:ring-dusty-blue';

const Field: React.FC<{ label: string; htmlFor: string; children: React.ReactNode }> = ({
  label,
  htmlFor,
  children,
}) => (
  <div className="space-y-1.5">
    <label htmlFor={htmlFor} className="block text-xs font-bold text-ink">
      {label}
    </label>
    {children}
  </div>
);

const TIMES: { id: PreferredTime; icon: typeof Sun; ar: string; en: string }[] = [
  { id: 'morning', icon: Sun, ar: 'صباحًا (10 ص - 2 م)', en: 'Morning (10AM - 2PM)' },
  { id: 'evening', icon: Moon, ar: 'مساءً (4 م - 9 م)', en: 'Evening (4PM - 9PM)' },
  { id: 'any', icon: Clock, ar: 'أي وقت متاح', en: 'Any time' },
];

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
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    facilityName: '',
    facilityType: 'salon_women',
    city: 'riyadh',
    branches: '1',
    preferredTime: 'morning' as PreferredTime,
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

    // Honeypot: bots fill it, humans never see it. Fail silently.
    if (formData.websiteUrlHoneypot) {
      if (redirectToThankYou) {
        router.push(`/${locale}/demo/thank-you`);
      } else {
        setStatus('success');
      }
      return;
    }

    if (!validateSaudiPhone(formData.phone)) {
      setStatus('error');
      setErrorMessage(
        isAr
          ? 'يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 أو +9665 (مثال: 05xxxxxxxx)'
          : 'Please enter a valid Saudi mobile number starting with 05 or +9665 (e.g. 05xxxxxxxx)'
      );
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
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

  const resetForm = () => {
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
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="mx-auto w-full max-w-2xl rounded-3xl border border-mist-gray bg-white p-6 sm:p-9"
    >
      {status === 'success' ? (
        <div className="space-y-4 py-10 text-center" role="status">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dusty-blue text-ink">
            <Check className="h-9 w-9" strokeWidth={2.5} aria-hidden="true" />
          </div>

          <h3 className="text-xl font-extrabold text-ink sm:text-2xl">
            {isAr ? 'تم استلام طلبك بنجاح!' : 'Your request has been received!'}
          </h3>

          <p className="mx-auto max-w-md text-sm leading-relaxed text-ink-muted">
            {isAr
              ? 'شكرًا لاهتمامك بمنصة راش إكس. سيتواصل معك أحد مستشارينا في السعودية خلال أقل من ساعتي عمل لجدولة العرض الحي وتجهيز نطاقك التجريبي.'
              : 'Thank you for choosing RashX. A Saudi specialist will contact you within two business hours to schedule your walkthrough.'}
          </p>

          <div className="pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl bg-mist-gray px-5 py-2.5 text-xs font-bold text-ink transition-colors hover:bg-mist-gray/70"
            >
              {isAr ? 'إرسال طلب لمنشأة أخرى' : 'Submit another request'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-ink sm:text-xl md:text-2xl">
              {title || (isAr ? 'احجز عرضًا تجريبيًا مخصصًا لمنشأتك' : 'Book a tailored demo for your facility')}
            </h3>
            <p className="text-sm text-ink-muted">
              {subtitle ||
                (isAr
                  ? 'استكشف لوحة التحكم وموقع المنشأة وتطبيق العميل مع مستشار سعودي متمرس.'
                  : 'Explore the dashboard, salon website and client app with our consultant.')}
            </p>
          </div>

          {/* Honeypot anti-spam (hidden) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={id('honeypot')}>Website</label>
            <input
              type="text"
              id={id('honeypot')}
              name="websiteUrlHoneypot"
              value={formData.websiteUrlHoneypot}
              onChange={(e) => setFormData({ ...formData, websiteUrlHoneypot: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Error banner */}
          {status === 'error' && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-2xl border border-warm-peach bg-warm-peach/30 p-3.5 text-xs font-medium text-ink"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={isAr ? 'الاسم الكامل *' : 'Full name *'} htmlFor={id('name')}>
              <input
                id={id('name')}
                type="text"
                required
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={isAr ? 'مثال: سارة العتيبي' : 'e.g. Sarah Al-Otaibi'}
                className={inputClass}
              />
            </Field>

            <Field label={isAr ? 'رقم الجوال (سعودي) *' : 'Mobile number (Saudi) *'} htmlFor={id('phone')}>
              <input
                id={id('phone')}
                type="tel"
                required
                dir="ltr"
                autoComplete="tel"
                inputMode="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05xxxxxxxx"
                className={`${inputClass} text-start`}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={isAr ? 'اسم المنشأة / الصالون *' : 'Facility / salon name *'} htmlFor={id('facility')}>
              <input
                id={id('facility')}
                type="text"
                required
                autoComplete="organization"
                value={formData.facilityName}
                onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                placeholder={isAr ? 'مثال: صالون لمسة حرير' : 'e.g. Silk Touch Salon'}
                className={inputClass}
              />
            </Field>

            <Field label={isAr ? 'نوع المنشأة *' : 'Facility type *'} htmlFor={id('type')}>
              <select
                id={id('type')}
                value={formData.facilityType}
                onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                className={inputClass}
              >
                <option value="salon_women">{isAr ? 'صالون نسائي / مشغل' : 'Women salon / studio'}</option>
                <option value="salon_men">{isAr ? 'صالون رجالي / حلاقة' : 'Men barbershop'}</option>
                <option value="beauty_center">{isAr ? 'مركز تجميل متكامل' : 'Full beauty complex'}</option>
                <option value="spa">{isAr ? 'مركز سبا واستجمام' : 'Spa & wellness'}</option>
                <option value="clinic">{isAr ? 'عيادة جلدية وتجميل' : 'Derma & aesthetic clinic'}</option>
                <option value="other">{isAr ? 'أخرى' : 'Other'}</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={isAr ? 'المدينة *' : 'City *'} htmlFor={id('city')}>
              <select
                id={id('city')}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={inputClass}
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
                <option value="other">{isAr ? 'مدينة أخرى' : 'Other city'}</option>
              </select>
            </Field>

            <Field label={isAr ? 'عدد الفروع *' : 'Number of branches *'} htmlFor={id('branches')}>
              <select
                id={id('branches')}
                value={formData.branches}
                onChange={(e) => setFormData({ ...formData, branches: e.target.value })}
                className={inputClass}
              >
                <option value="1">{isAr ? 'فرع واحد' : '1 branch'}</option>
                <option value="2_3">{isAr ? '2 - 3 فروع' : '2 - 3 branches'}</option>
                <option value="4_10">{isAr ? '4 - 10 فروع' : '4 - 10 branches'}</option>
                <option value="more_10">
                  {isAr ? 'أكثر من 10 فروع (سلسلة)' : 'More than 10 branches (chain)'}
                </option>
              </select>
            </Field>
          </div>

          {/* Preferred demo time */}
          {showPreferredTime && (
            <div className="space-y-1.5" role="group" aria-labelledby={id('time-label')}>
              <span id={id('time-label')} className="block text-xs font-bold text-ink">
                {isAr ? 'الموعد المفضل للعرض التجريبي *' : 'Preferred demo time *'}
              </span>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {TIMES.map((t, i) => {
                  const Icon = t.icon;
                  const selected = formData.preferredTime === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setFormData({ ...formData, preferredTime: t.id })}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-2.5 text-xs transition-colors ${
                        i === 2 ? 'col-span-2 sm:col-span-1' : ''
                      } ${
                        selected
                          ? 'border-ink bg-dusty-blue/25 font-bold text-ink'
                          : 'border-mist-gray bg-neutral/40 font-medium text-ink hover:border-ink/40'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{isAr ? t.ar : t.en}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Field
            label={isAr ? 'ملاحظات أو متطلبات خاصة (اختياري)' : 'Special requirements (optional)'}
            htmlFor={id('message')}
          >
            <textarea
              id={id('message')}
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={
                isAr
                  ? 'أخبرنا بأهم أولوياتك (مثل: ضبط العمولات، جرد المخزون، الفوترة الإلكترونية)...'
                  : 'Tell us your top operational priorities...'
              }
              className={inputClass}
            />
          </Field>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-warm-peach px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-warm-peach/80 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
          >
            {status === 'loading' ? (
              <span>{isAr ? 'جاري الإرسال وتأكيد الطلب...' : 'Submitting...'}</span>
            ) : (
              <>
                <span>{isAr ? 'تأكيد حجز العرض التجريبي' : 'Confirm demo booking'}</span>
                <Send className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-ink-muted">
            <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {isAr
                ? 'نحمي بياناتك وفق ضوابط نظام حماية البيانات الشخصية السعودي (PDPL)'
                : 'Your data is handled in line with the Saudi Personal Data Protection Law (PDPL)'}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default LeadForm;