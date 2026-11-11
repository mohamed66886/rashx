'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  LogIn,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Database,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Server,
  Globe,
  Radio,
} from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { useParams } from 'next/navigation';

export default function PlatformAdminLoginPage() {
  const { login, isLoading, dbStatus } = useDashboardAuth();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  const isAr = locale === 'ar';

  const [loginEmail, setLoginEmail] = useState('mohamed@rashx.org');
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

    if (!loginEmail || !loginPassword) {
      setErrorMessage(isAr ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await login(loginEmail, loginPassword, rememberMe);
      if (!res.success) {
        setErrorMessage(
          res.error ||
            (isAr
              ? 'فشل تسجيل الدخول. تأكد من أن الحساب مصرح له بالدخول لإدارة راش إكس.'
              : 'Login failed. Check admin permissions.')
        );
      }
    } catch {
      setErrorMessage(isAr ? 'حدث خطأ في الاتصال بقاعدة البيانات' : 'Database connection error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#080D0C] via-[#0D1514] to-[#121E1C] text-white">
      {/* Background Decorative Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#91B8C0]/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#F0C5AE]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-[radial-gradient(circle_at_center,rgba(145,184,192,0.05)_0,transparent_70%)]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Top Branding Header */}
        <div className="text-center mb-6">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-3.5 group transition-transform hover:scale-105 mb-3"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#142322] border border-[#91B8C0]/30 flex items-center justify-center p-3 shadow-2xl ring-4 ring-[#91B8C0]/10">
              <Image
                src="/brand/icons/app-icon-rx-black-on-blue.svg"
                alt="RashX Platform Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">
                  راش إكس <span className="text-[#91B8C0]">.HQ</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#91B8C0]/20 text-[#91B8C0] text-[10px] font-black tracking-wider uppercase border border-[#91B8C0]/30">
                  Super Admin
                </span>
              </div>
              <span className="block text-xs font-medium text-[#E5E9E8]/70 mt-0.5">
                لوحة الإدارة المركزية والتحكم السحابي (admin.rashx.org)
              </span>
            </div>
          </Link>

          {/* Subdomain & DB Live Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-xs text-xs font-semibold text-[#E5E9E8] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Globe className="w-3.5 h-3.5 text-[#91B8C0]" />
            <span className="font-mono text-[11px] text-[#91B8C0]">admin.rashx.org</span>
            <span className="text-white/30">•</span>
            <span className="text-[11px] text-[#E5E9E8]/80">Firestore (aya2-a5057)</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#101A19]/90 rounded-3xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-xl">
          {/* Card Header Pill */}
          <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between text-xs">
            <span className="font-bold text-[#E5E9E8] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#91B8C0]" />
              <span>بوابة الدخول للمسؤولين المعتمدين فقط</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">Encrypted DB Auth</span>
          </div>

          <div className="p-6 sm:p-8">
            {/* Feedback Notifications */}
            {errorMessage && (
              <div className="mb-5 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{successMessage}</div>
              </div>
            )}

            {/* Official Login Credentials Notice */}
            <div className="mb-6 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#91B8C0]/20 text-[#91B8C0] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-white">تسجيل الدخول المركزي لإدارة راش إكس</div>
                <div className="text-[11px] text-[#E5E9E8]/70">
                  الحساب الرئيسي: <span className="font-mono text-[#91B8C0]">mohamed@rashx.org</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#E5E9E8] mb-1.5">
                  البريد الإلكتروني الإداري المعتمد
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#91B8C0]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@rashx.org"
                    className="w-full pr-10 pl-3.5 py-3 rounded-2xl bg-black/40 border border-white/10 focus:border-[#91B8C0] focus:bg-black/60 focus:outline-none focus:ring-4 focus:ring-[#91B8C0]/15 text-sm text-white transition-all placeholder:text-[#5E6665]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-[#E5E9E8]">كلمة المرور المشفرة</label>
                  <span className="text-[10px] text-[#91B8C0]">SHA-256 Verified</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#91B8C0]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pr-10 pl-11 py-3 rounded-2xl bg-black/40 border border-white/10 focus:border-[#91B8C0] focus:bg-black/60 focus:outline-none focus:ring-4 focus:ring-[#91B8C0]/15 text-sm text-white transition-all placeholder:text-[#5E6665] font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#5E6665] hover:text-white cursor-pointer"
                    title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md border-white/20 bg-black/40 text-[#91B8C0] focus:ring-[#91B8C0] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#E5E9E8]/70">
                    تثبيت جلسة العمل الإدارية (30 يوماً)
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#91B8C0] to-[#7EA8B0] hover:from-[#A2C7CE] hover:to-[#91B8C0] text-[#0D1514] font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#91B8C0]/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0D1514]/30 border-t-[#0D1514] rounded-full animate-spin" />
                    <span>التحقق من صلاحيات الإدارة في Firestore...</span>
                  </span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>الدخول إلى إدارة راش إكس (RashX HQ)</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Database & Architecture Notice Footer */}
          <div className="px-6 py-4 bg-white/5 border-t border-white/5 text-xs text-[#E5E9E8]/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#91B8C0] shrink-0" />
              <span>مربوط بفاير بيز مباشرة (`platform_admins` / `admin_sessions`)</span>
            </div>
            <Link
              href={`/${locale}`}
              className="font-bold text-[#91B8C0] hover:text-white flex items-center gap-1"
            >
              <span>الموقع الرئيسي</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        </div>

        {/* Bottom Security Info */}
        <div className="text-center mt-6 text-xs text-[#5E6665]">
          منظومة راش إكس المركزية © 2026 • الإدارة العامة والتحكم السحابي في النطاقات والمنشآت.
        </div>
      </div>
    </div>
  );
}
