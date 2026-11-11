'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  Globe,
  UserPlus,
  ShieldCheck,
  Sparkles,
  Plus,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Database,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  Inbox,
} from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { listTenants, listLeads, SalonTenant, PlatformLead } from '@/lib/firebase/auth-db';
import { FirestoreRulesAlert } from '@/components/dashboard/FirestoreRulesAlert';
import { useParams } from 'next/navigation';

export default function PlatformOverviewPage() {
  const { admin } = useDashboardAuth();
  const params = useParams();
  const locale = (params?.locale as string) || 'ar';
  const isAr = locale === 'ar';

  const [tenants, setTenants] = useState<SalonTenant[]>([]);
  const [leads, setLeads] = useState<PlatformLead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [t, l] = await Promise.all([listTenants(), listLeads()]);
      setTenants(t);
      setLeads(l);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalMRR = tenants.reduce((acc, t) => acc + (Number(t.mrr) || 0), 0);
  const activeTenantsCount = tenants.filter((t) => t.status === 'active').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ------------------------------------------------------------------ */}
      {/* 1. EXECUTIVE WELCOME BANNER */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-l from-[#080D0C] via-[#0E1716] to-[#152321] text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#91B8C0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F0C5AE]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#91B8C0]" />
              <span>لوحة القيادة المركزية لمنصة راش إكس • admin.rashx.org</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              أهلاً بك، {admin?.name} 👋
            </h1>
            <p className="text-sm text-[#E5E9E8]/80 mt-1">
              {admin?.title} • التحكم المركزي في الصالونات والنطاقات وقاعدة البيانات
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/dashboard/tenants?action=new`}
              className="px-4 py-2.5 rounded-2xl bg-[#91B8C0] text-[#0D1514] font-black text-xs hover:bg-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>توليد صالون ونطاق جديد</span>
            </Link>

            <Link
              href={`/${locale}/dashboard/database`}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-md transition-all flex items-center gap-2 border border-white/10"
            >
              <Database className="w-4 h-4 text-[#91B8C0]" />
              <span>فحص قاعدة بيانات فايربيز</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Firestore Cloud Security Rules Status Alert */}
      <FirestoreRulesAlert />
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#5E6665]">المنشآت المسجلة في DB</span>
            <div className="w-9 h-9 rounded-2xl bg-[#91B8C0]/15 text-[#91B8C0] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0D1514] tracking-tight">
            {tenants.length} {tenants.length === 1 ? 'منشأة' : 'منشآت'}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#5E6665] font-semibold mt-2">
            <span>{activeTenantsCount} نشط في الخدمة</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#5E6665]">الإيراد الشهري الفعلي (MRR)</span>
            <div className="w-9 h-9 rounded-2xl bg-[#F0C5AE]/20 text-[#8F593E] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0D1514] tracking-tight">
            {totalMRR.toLocaleString('ar-SA')} ر.س
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>مجموع اشتراكات الصالونات النشطة</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#5E6665]">النطاقات الفرعية المخصصة</span>
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0D1514] tracking-tight">
            {tenants.length} Subdomains
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#5E6665] font-semibold mt-2 font-mono">
            <span>*.rashx.org</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#5E6665]">بوابة الفوترة المركزية (ZATCA)</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#0D1514] tracking-tight">Phase 2 Ready</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ربط وتشفير إلكتروني مركزي</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. REAL DATA TABLES */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Client Salons (Tenants) Table (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#0D1514]">
                الصالونات والمنشآت المسجلة في Firestore ({tenants.length})
              </h2>
              <p className="text-xs text-[#5E6665]">
                البيانات الحية الموثقة في مجموعة <code className="bg-[#F5F8F8] px-1 py-0.5 rounded text-[#0D1514]">tenants</code>
              </p>
            </div>
            <Link
              href={`/${locale}/dashboard/tenants`}
              className="text-xs font-bold text-[#91B8C0] hover:underline flex items-center gap-1"
            >
              <span>إدارة النطاقات والمنشآت</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-[#E5E9E8] overflow-hidden shadow-xs">
            {tenants.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#91B8C0]/10 text-[#91B8C0] flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-sm text-[#0D1514] mb-1">
                  لا توجد صالونات مسجلة في قاعدة البيانات حالياً
                </h3>
                <p className="text-xs text-[#5E6665] max-w-sm mx-auto mb-4">
                  ابدأ بإضافة أول صالون مشترك في راش إكس لتوليد نطاقه الفرعي وتفعيله على الفور.
                </p>
                <Link
                  href={`/${locale}/dashboard/tenants?action=new`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D1514] hover:bg-[#1A2524] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#91B8C0]" />
                  <span>إضافة أول صالون الآن</span>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#F8FAFB] text-[#5E6665] font-bold border-b border-[#E5E9E8]">
                    <tr>
                      <th className="py-3.5 px-4">المنشأة والمالك</th>
                      <th className="py-3.5 px-4">النطاق الفرعي (Subdomain)</th>
                      <th className="py-3.5 px-4">المدينة</th>
                      <th className="py-3.5 px-4">الباقة والاشتراك</th>
                      <th className="py-3.5 px-4">الحالة</th>
                      <th className="py-3.5 px-4 text-center">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E9E8]">
                    {tenants.map((t) => (
                      <tr key={t.id} className="hover:bg-[#FDFEFE] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#0D1514]">{t.businessName}</div>
                          <div className="text-[10px] text-[#5E6665]">{t.ownerName}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`https://${t.subdomain}.rashx.org`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[11px] text-[#91B8C0] font-bold hover:underline inline-flex items-center gap-1"
                            dir="ltr"
                          >
                            <span>{t.subdomain}.rashx.org</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="py-3.5 px-4 text-[#5E6665]">{t.city}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-black text-[#0D1514]">{t.mrr} ر.س / شهرياً</div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#F0C5AE]/20 text-[#8F593E]">
                            باقة {t.plan}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {t.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>نشط</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px]">
                              <span>تجريبي</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <Link
                            href={`/${locale}/dashboard/tenants`}
                            className="px-2.5 py-1 rounded-xl bg-[#F8FAFB] hover:bg-[#E5E9E8] text-[#0D1514] text-[10px] font-bold transition-colors inline-block"
                          >
                            إدارة
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Inbound Leads Pipeline (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5E9E8] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#91B8C0]" />
                <h3 className="font-black text-sm text-[#0D1514]">طلبات الانضمام والعروض (Leads)</h3>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold">
                {leads.length} طلبات
              </span>
            </div>

            <p className="text-xs text-[#5E6665] leading-relaxed mb-4">
              طلبات أصحاب الصالونات الواردة من الموقع الرسمي أو روبوت الواتساب:
            </p>

            {leads.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#5E6665]">
                <Inbox className="w-8 h-8 mx-auto text-[#5E6665]/50 mb-2" />
                <span>لا توجد طلبات واردة جديدة مسجلة حالياً</span>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                {leads.slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3.5 rounded-2xl bg-[#F8FAFB] border border-[#E5E9E8] text-xs hover:border-[#91B8C0] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-[#0D1514]">{lead.salonName}</div>
                        <div className="text-[11px] text-[#5E6665]">
                          المسؤول: {lead.ownerName} • {lead.city}
                        </div>
                        <div className="text-[10px] font-mono text-[#91B8C0] mt-1" dir="ltr">
                          {lead.phone}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[9px] font-bold">
                        {lead.status === 'new' ? 'جديد' : 'قيد التواصل'}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#E5E9E8] flex items-center justify-between">
                      <span className="text-[10px] text-[#5E6665]">{lead.source}</span>
                      <Link
                        href={`/${locale}/dashboard/tenants?action=new&name=${encodeURIComponent(
                          lead.salonName
                        )}&owner=${encodeURIComponent(lead.ownerName)}&phone=${encodeURIComponent(
                          lead.phone
                        )}&city=${encodeURIComponent(lead.city)}`}
                        className="text-[10px] font-bold text-[#0D1514] hover:text-[#91B8C0]"
                      >
                        تحويل لمنشأة مشتركة ←
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Link
              href={`/${locale}/dashboard/leads`}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F5F8F8] hover:bg-[#E5E9E8] text-[#0D1514] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span>عرض سجل طلبات الانضمام الكامل</span>
            </Link>
          </div>

          {/* Cloud Database Live Session Info */}
          <div className="p-6 rounded-3xl bg-[#0E1514] text-white border border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#91B8C0]">قاعدة بيانات Firebase Firestore</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="font-mono text-sm font-bold text-white mb-2">aya2-a5057.firebaseapp.com</div>
            <p className="text-[11px] text-[#E5E9E8]/70 leading-relaxed mb-4">
              المسؤول الحالي: <strong>{admin?.name}</strong> • تم توثيق الجلسة في Firestore (`admin_sessions`).
            </p>
            <Link
              href={`/${locale}/dashboard/database`}
              className="inline-flex items-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              <span>فتح مركز فحص قاعدة البيانات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
