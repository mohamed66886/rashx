'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Settings,
  Globe,
  ShieldCheck,
  Database,
  CheckCircle2,
  Save,
  CreditCard,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface SettingsClientViewProps {
  projectId: string;
  authDomain: string;
}

export function SettingsClientView({ projectId, authDomain }: SettingsClientViewProps) {
  const toast = useToast();
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    wildcardDns: '*.rashx.org',
    adminSubdomain: 'admin.rashx.org',
    baseApiUrl: 'https://api.rashx.org/v1',
    zatcaGatewayMode: 'production',
    zatcaCsidExpiryDays: 365,
    autoProvisionSubdomains: true,
    whatsappGatewayActive: true,
    firestoreProjectId: projectId,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    toast.success('تم حفظ إعدادات المنظومة بنجاح');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#91B8C0]/20 flex items-center justify-center">
              <Settings className="w-4 h-4 text-[#91B8C0]" />
            </div>
            <h1 className="text-xl font-black text-[#0D1514]">
              إعدادات المنظومة والنطاقات السحابية
            </h1>
          </div>
          <p className="text-xs text-[#5E6665]">
            تكوين البنية التحتية، توجيه النطاقات الفرعية (Wildcard DNS)، وبوابة الربط الزكوي المركزي.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="./settings/billing"
            className="px-4 py-2 rounded-xl bg-[#29545c] hover:bg-[#1E3E44] text-white text-xs font-bold transition-colors flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-[#91B8C0]" />
            <span>إعدادات الفوترة والبيانات البنكية</span>
          </Link>
          {saved && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>تم حفظ التعديلات بنجاح</span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Subdomain Routing & DNS */}
        <div className="bg-white rounded-3xl border border-[#E5E9E8] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E9E8]">
            <Globe className="w-4 h-4 text-[#91B8C0]" />
            <h2 className="font-black text-sm text-[#0D1514]">
              توجيه النطاقات الفرعية (Wildcard Subdomains)
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#0D1514] mb-1">نطاق المنصة الرئيسي</label>
              <input
                type="text"
                value="rashx.org"
                disabled
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] text-xs font-mono text-[#5E6665]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0D1514] mb-1">نطاق لوحة الإدارة العامة</label>
              <input
                type="text"
                value={settings.adminSubdomain}
                onChange={(e) => setSettings({ ...settings, adminSubdomain: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] focus:border-[#91B8C0] focus:bg-white text-xs font-mono text-[#0D1514]"
                dir="ltr"
              />
              <span className="text-[10px] text-[#5E6665] mt-1 block">
                توجّه الطلبات عبر Next.js Proxy Middleware مباشرة لتطبيق إدارة راش إكس.
              </span>
            </div>

            <div>
              <label className="block font-bold text-[#0D1514] mb-1">سجل التوجيه العام (Wildcard Record)</label>
              <input
                type="text"
                value={settings.wildcardDns}
                onChange={(e) => setSettings({ ...settings, wildcardDns: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] focus:border-[#91B8C0] focus:bg-white text-xs font-mono text-[#0D1514]"
                dir="ltr"
              />
              <span className="text-[10px] text-[#5E6665] mt-1 block">
                يتيح التوليد التلقائي لأي صالون جديد بصيغة: <strong className="font-mono">salon-name.rashx.org</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: ZATCA Central Gateway */}
        <div className="bg-white rounded-3xl border border-[#E5E9E8] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E9E8]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="font-black text-sm text-[#0D1514]">
              بوابة الفوترة الإلكترونية المركزية (ZATCA Gateway)
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-[#0D1514] mb-1">بيئة تشغيل هيئة الزكاة</label>
              <select
                value={settings.zatcaGatewayMode}
                onChange={(e) => setSettings({ ...settings, zatcaGatewayMode: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] text-xs font-semibold text-[#0D1514]"
              >
                <option value="production">الإنتاج الحي (FATOORA Live Production)</option>
                <option value="simulation">بيئة المحاكاة (Simulation Sandbox)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#0D1514] mb-1">توليد أختام التشفير الرقمية (CSID)</label>
              <input
                type="text"
                value="ECDSA secp256k1 (ZATCA Phase 2 Standard)"
                disabled
                className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] text-xs font-mono text-[#5E6665]"
                dir="ltr"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 text-[11px] border border-emerald-200">
              <span className="font-bold block mb-1">مركزية الفوترة في راش إكس:</span>
              تقوم المنصة بإصدار رمز الاستجابة السريعة (QR Code) وتشفير الفواتير وتوقيعها رقمياً نيابة عن الصالونات المشتركة تلقائياً.
            </div>
          </div>
        </div>

        {/* Section 3: Firebase Central DB */}
        <div className="bg-white rounded-3xl border border-[#E5E9E8] p-6 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5E9E8]">
            <Database className="w-4 h-4 text-[#91B8C0]" />
            <h2 className="font-black text-sm text-[#0D1514]">
              مشروع Firebase Firestore السحابي
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#F8FAFB] border border-[#E5E9E8]">
              <span className="text-[#5E6665] block mb-1">معرّف المشروع (Project ID):</span>
              <strong className="font-mono text-[#0D1514]">{projectId}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F8FAFB] border border-[#E5E9E8]">
              <span className="text-[#5E6665] block mb-1">نطاق المصادقة وقاعدة البيانات:</span>
              <strong className="font-mono text-[#0D1514]">{authDomain}</strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F8FAFB] border border-[#E5E9E8]">
              <span className="text-[#5E6665] block mb-1">حالة الاتصال والبيانات:</span>
              <strong className="text-emerald-700 font-bold">Firebase Admin SDK (Server-Side Only)</strong>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0D1514] hover:bg-[#1A2524] text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Save className="w-4 h-4 text-[#91B8C0]" />
              <span>حفظ الإعدادات</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

