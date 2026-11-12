'use client';

import React, { useState, useEffect, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LogIn,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Globe,
} from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client-auth';
import { loginAction } from '@/server/actions/auth';

/**
 * Platform admin sign-in — redesigned.
 * One form, two layouts:
 *  - Mobile: brand header on top, white sheet with the form rising over it, thumb-sized controls.
 *  - Desktop (lg+): split screen, calm brand panel beside a centered form.
 * Brand tokens only. All auth logic (Firebase -> loginAction -> redirect) is unchanged.
 */

interface PlatformAdminLoginClientProps {
  locale: string;
}

const INPUT =
  'h-12 w-full rounded-2xl border border-mist-gray bg-neutral/40 text-base font-medium text-ink transition-colors placeholder:text-ink-muted/60 focus:border-dusty-blue focus:bg-white focus:outline-none focus:ring-4 focus:ring-dusty-blue/25';

export function PlatformAdminLoginClient({ locale }: PlatformAdminLoginClientProps) {
  const router = useRouter();
  const isAr = locale === 'ar';
  const otherLocale = isAr ? 'en' : 'ar';
  const BackArrow = isAr ? ArrowLeft : ArrowRight;

  const emailId = useId();
  const passwordId = useId();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const email = loginEmail.trim();
    if (!email || !loginPassword) {
      setErrorMessage(
        isAr ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password'
      );
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Authenticate with Firebase Client Auth ONLY to get an ID token
      const userCredential = await signInWithEmailAndPassword(auth, email, loginPassword);
      const idToken = await userCredential.user.getIdToken();

      // 2. Server action verifies the token and sets the HttpOnly session cookie
      const res = await loginAction(idToken);

      if (!res.success) {
        setErrorMessage(
          res.error ||
            (isAr
              ? 'فشل تسجيل الدخول. تأكد من أن الحساب يمتلك صلاحيات إدارية معتمدة.'
              : 'Login failed. Verify your administrator permissions.')
        );
        return;
      }

      setSuccessMessage(
        isAr
          ? 'تم تسجيل الدخول بنجاح، جاري التحويل إلى لوحة التحكم...'
          : 'Signed in successfully. Redirecting to the dashboard...'
      );

      // 3. Go to the dashboard
      router.replace(`/${locale}/dashboard`);
      router.refresh();
    } catch (err: unknown) {
      console.error('[Admin Login Error]:', err);
      let msg = isAr
        ? 'فشل تسجيل الدخول. تحقق من صحة البريد الإلكتروني وكلمة المرور.'
        : 'Failed to sign in. Please verify your credentials.';

      const authError = err as { code?: string; message?: string };
      if (
        authError.code === 'auth/invalid-credential' ||
        authError.code === 'auth/wrong-password' ||
        authError.code === 'auth/user-not-found'
      ) {
        msg = isAr ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'Invalid email or password.';
      } else if (authError.code === 'auth/too-many-requests') {
        msg = isAr
          ? 'تم تعليق المحاولات مؤقتاً بسبب تكرار المحاولات غير الصحيحة. يرجى الانتظار والمحاولة لاحقاً.'
          : 'Too many unsuccessful attempts. Please try again later.';
      } else if (authError.message) {
        msg = authError.message;
      }

      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="flex min-h-screen flex-col bg-dusty-blue/25 font-brand text-ink selection:bg-dusty-blue/40 lg:grid lg:grid-cols-12 lg:bg-white"
    >
      {/* ===================== Brand panel (mobile header / desktop side) ===================== */}
      <aside className="relative flex flex-col px-5 pb-14 pt-5 lg:col-span-5 lg:justify-between lg:bg-dusty-blue/25 lg:p-12 xl:p-16">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            aria-label={isAr ? 'العودة للموقع الرئيسي' : 'Back to the main site'}
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/brand/logo/lockup-bilingual/lockup-bilingual-black.svg"
              alt="RashX"
              width={190}
              height={42}
              priority
              className="h-8 w-auto object-contain lg:h-10"
            />
          </Link>

          {/* Language switch — mobile only (desktop has it in the form column) */}
          <Link
            href={`/${otherLocale}/dashboard/login`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-bold text-ink lg:hidden"
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </Link>
        </div>

        <div className="mt-8 lg:my-auto lg:max-w-md">
          <h1 className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl lg:text-5xl lg:leading-[1.15]">
            {isAr ? 'لوحة إدارة راش إكس' : 'RashX admin console'}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted lg:mt-5 lg:text-base">
            {isAr
              ? 'دخول مخصص لفريق إدارة المنصة.'
              : 'Sign-in for the platform administration team.'}
          </p>
        </div>

        <p className="hidden text-xs text-ink-muted lg:block">© 2026 RashX</p>
      </aside>

      {/* ================================ Form column ================================ */}
      <main className="relative -mt-8 flex flex-1 flex-col rounded-t-[2rem] bg-white px-5 pb-6 pt-8 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.12)] sm:px-10 lg:col-span-7 lg:mt-0 lg:rounded-none lg:px-12 lg:py-12 lg:shadow-none xl:px-16">
        {/* Desktop top bar */}
        <div className="mb-10 hidden items-center justify-between lg:flex">
          <Link
            href={`/${otherLocale}/dashboard/login`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-mist-gray/60 px-3.5 text-xs font-bold text-ink transition-colors hover:bg-mist-gray"
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </Link>

          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-muted transition-colors hover:text-ink"
          >
            <span>{isAr ? 'الموقع العام' : 'Public site'}</span>
            <BackArrow className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <h2 className="text-2xl font-extrabold lg:text-3xl">
            {isAr ? 'تسجيل الدخول' : 'Sign in'}
          </h2>
          <p className="mt-1.5 text-sm text-ink-muted">
            {isAr ? 'أدخل بيانات حسابك الإداري للمتابعة.' : 'Enter your administrator account details to continue.'}
          </p>

          {errorMessage && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-2xl bg-warm-peach/40 p-4 text-xs font-medium leading-relaxed text-ink"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <div>{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div
              role="status"
              className="mt-6 flex items-start gap-3 rounded-2xl bg-dusty-blue/30 p-4 text-xs font-medium leading-relaxed text-ink"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <div>{successMessage}</div>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor={emailId} className="mb-1.5 block text-xs font-bold">
                {isAr ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute inset-y-0 start-3.5 my-auto h-4 w-4 text-ink-muted"
                  aria-hidden="true"
                />
                <input
                  id={emailId}
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@rashx.org"
                  dir="ltr"
                  className={`${INPUT} ps-10 pe-4 text-start`}
                />
              </div>
            </div>

            <div>
              <label htmlFor={passwordId} className="mb-1.5 block text-xs font-bold">
                {isAr ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute inset-y-0 start-3.5 my-auto h-4 w-4 text-ink-muted"
                  aria-hidden="true"
                />
                <input
                  id={passwordId}
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  dir="ltr"
                  className={`${INPUT} ps-10 pe-12 text-start`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword
                      ? isAr ? 'إخفاء كلمة المرور' : 'Hide password'
                      : isAr ? 'إظهار كلمة المرور' : 'Show password'
                  }
                  className="absolute inset-y-0 end-0 flex w-12 items-center justify-center text-ink-muted transition-colors hover:text-ink"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer select-none items-center gap-2.5 py-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-mist-gray accent-dusty-blue"
              />
              <span className="text-xs font-medium text-ink-muted">
                {isAr ? 'ابقني مسجلاً لمدة 5 أيام' : 'Keep me signed in for 5 days'}
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-warm-peach text-sm font-extrabold text-ink transition-colors hover:bg-warm-peach/80 disabled:pointer-events-none disabled:opacity-50 lg:h-12"
            >
              {isSubmitting ? (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
                    aria-hidden="true"
                  />
                  <span>{isAr ? 'جاري التحقق...' : 'Signing in...'}</span>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  <span>{isAr ? 'دخول' : 'Sign in'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Mobile footer */}
        <div className="mt-8 flex items-center justify-between text-xs text-ink-muted lg:hidden">
          <Link href={`/${locale}`} className="inline-flex items-center gap-1.5 font-bold hover:text-ink">
            <BackArrow className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
            <span>{isAr ? 'الموقع العام' : 'Public site'}</span>
          </Link>
          <span>© 2026 RashX</span>
        </div>
      </main>
    </div>
  );
}