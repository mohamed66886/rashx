'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Database,
  Users,
  Key,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Activity,
  FileText,
  Lock,
  Building2,
} from 'lucide-react';
import type { RashxAdmin, SalonTenant, PlatformAuditLog } from '@/lib/types/platform';
import type { AdminSessionRecord } from '@/server/data/sessions';
import { checkDbHealthAction, revokeAdminSessionAction } from '@/server/actions/database';
import { useToast } from '@/components/ui/Toast';

interface DatabaseClientViewProps {
  initialSessions: AdminSessionRecord[];
  initialTenants: SalonTenant[];
  initialAdmins: RashxAdmin[];
  initialAuditLogs: PlatformAuditLog[];
  projectId: string;
}

export function DatabaseClientView({
  initialSessions,
  initialTenants,
  initialAdmins,
  initialAuditLogs,
  projectId,
}: DatabaseClientViewProps) {
  const router = useRouter();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'sessions' | 'tenants' | 'admins' | 'audit' | 'config'>('sessions');
  const [sessions, setSessions] = useState<AdminSessionRecord[]>(initialSessions);
  const [isRefreshing, startRefreshTransition] = useTransition();

  // Ping State
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success' | 'warning'>('idle');
  const [pingLatency, setPingLatency] = useState<number | null>(null);

  const handleRefresh = () => {
    startRefreshTransition(() => {
      router.refresh();
      toast.info('جاري تحديث بيانات قاعدة البيانات...');
    });
  };

  const handlePingTest = async () => {
    setPingStatus('testing');
    try {
      const res = await checkDbHealthAction();
      setPingLatency(res.latencyMs);
      setPingStatus(res.success ? 'success' : 'warning');
    } catch {
      setPingLatency(null);
      setPingStatus('warning');
    }
  };

  const handleRevoke = async (sessionId: string) => {
    if (!confirm('هل أنت متأكد من إنهاء هذه الجلسة الإدارية عن بعد؟')) return;

    try {
      const res = await revokeAdminSessionAction(sessionId);
      if (res.success) {
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? { ...s, isActive: false } : s))
        );
        toast.success(`تم إنهاء الجلسة (${sessionId.substring(0, 10)}...) بنجاح.`);
      } else {
        toast.error(res.error || 'تعذر إنهاء الجلسة في قاعدة البيانات.');
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      toast.error(error.message || 'فشل الاتصال بالخادم.');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#91B8C0]/20 text-[#0D1514] flex items-center justify-center">
              <Database className="w-4 h-4 text-[#91B8C0]" />
            </div>
            <h1 className="text-xl font-black text-[#0D1514]">
              مركز فحص وإدارة قاعدة بيانات Firebase المركزية
            </h1>
          </div>
          <p className="text-xs text-[#5E6665]">
            مراقبة مجموعات Firestore (`platform_admins`, `admin_sessions`, `tenants`, `platform_audit_logs`) والتحكم الفوري في جلسات المشرفين عبر Admin SDK.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-[#F8FAFB] hover:bg-[#E5E9E8] text-[#0D1514] text-xs font-bold border border-[#E5E9E8] flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>تحديث البيانات</span>
          </button>

          <button
            type="button"
            onClick={handlePingTest}
            disabled={pingStatus === 'testing'}
            className="px-3.5 py-2 rounded-xl bg-[#0D1514] hover:bg-[#1A2524] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-colors disabled:opacity-60"
          >
            <Activity className="w-3.5 h-3.5 text-[#91B8C0]" />
            <span>فحص استجابة فايربيز الحية</span>
          </button>
        </div>
      </div>

      {/* Ping Result Banner */}
      {pingStatus !== 'idle' && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center justify-between animate-fadeIn ${
            pingStatus === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : pingStatus === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            {pingStatus === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            {pingStatus === 'warning' && <AlertCircle className="w-4 h-4 text-amber-600" />}
            {pingStatus === 'testing' && <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />}
            <span>
              {pingStatus === 'testing'
                ? 'جاري قياس الاتصال المباشر بقاعدة بيانات Firebase Admin...'
                : pingStatus === 'success'
                ? `الاتصال بقاعدة بيانات ${projectId} نشط تماماً! سرعة الاستجابة: ${pingLatency}ms`
                : `تم الاتصال بالخادم (${pingLatency ?? '—'}ms). الاتصال السحابي يخضع للرقابة.`}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold">{projectId}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#E5E9E8] space-x-reverse space-x-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('sessions')}
          className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'sessions'
              ? 'border-[#0D1514] text-[#0D1514]'
              : 'border-transparent text-[#5E6665] hover:text-[#0D1514]'
          }`}
        >
          <Key className="w-4 h-4 text-[#91B8C0]" />
          <span>الجلسات الإدارية النشطة ({sessions.filter((s) => s.isActive).length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tenants')}
          className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'tenants'
              ? 'border-[#0D1514] text-[#0D1514]'
              : 'border-transparent text-[#5E6665] hover:text-[#0D1514]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#F0C5AE]" />
          <span>المنشآت المشتركة في DB ({initialTenants.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('admins')}
          className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'admins'
              ? 'border-[#0D1514] text-[#0D1514]'
              : 'border-transparent text-[#5E6665] hover:text-[#0D1514]'
          }`}
        >
          <Users className="w-4 h-4 text-blue-500" />
          <span>مسؤولو المنصة ({initialAdmins.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'audit'
              ? 'border-[#0D1514] text-[#0D1514]'
              : 'border-transparent text-[#5E6665] hover:text-[#0D1514]'
          }`}
        >
          <FileText className="w-4 h-4 text-indigo-500" />
          <span>سجل التدقيق الأمني ({initialAuditLogs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('config')}
          className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'config'
              ? 'border-[#0D1514] text-[#0D1514]'
              : 'border-transparent text-[#5E6665] hover:text-[#0D1514]'
          }`}
        >
          <Lock className="w-4 h-4 text-emerald-500" />
          <span>إعدادات الاتصال بفايربيز</span>
        </button>
      </div>

      {/* TAB 1: SESSIONS */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-3xl border border-[#E5E9E8] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#F8FAFB] text-[#5E6665] font-bold border-b border-[#E5E9E8]">
                <tr>
                  <th className="py-3.5 px-4">رمز الجلسة (Token)</th>
                  <th className="py-3.5 px-4">المسؤول الإداري</th>
                  <th className="py-3.5 px-4">الجهاز / النظام</th>
                  <th className="py-3.5 px-4">تاريخ البدء</th>
                  <th className="py-3.5 px-4">تنتهي في</th>
                  <th className="py-3.5 px-4">الحالة</th>
                  <th className="py-3.5 px-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9E8]">
                {sessions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-ink-muted">
                      لا توجد جلسات مسجلة حالياً
                    </td>
                  </tr>
                ) : (
                  sessions.map((sess) => (
                    <tr key={sess.id} className="hover:bg-[#FDFEFE]">
                      <td className="py-3 px-4 font-mono text-[11px]">
                        <span className="truncate block max-w-[140px] text-[#0D1514]" title={sess.id}>
                          {sess.id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#0D1514]">{sess.name}</div>
                        <div className="text-[10px] text-[#5E6665] font-mono">{sess.email}</div>
                      </td>
                      <td className="py-3 px-4 text-[#5E6665]">{sess.device}</td>
                      <td className="py-3 px-4 text-[11px] text-[#5E6665]">
                        {sess.createdAt ? new Date(sess.createdAt).toLocaleString('ar-SA') : '—'}
                      </td>
                      <td className="py-3 px-4 text-[11px] text-[#5E6665]">
                        {sess.expiresAt ? new Date(sess.expiresAt).toLocaleDateString('ar-SA') : '—'}
                      </td>
                      <td className="py-3 px-4">
                        {sess.isActive ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            نشطة
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">
                            منتهية
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {sess.isActive && (
                          <button
                            type="button"
                            onClick={() => handleRevoke(sess.id)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="إنهاء الجلسة فوراً"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: TENANTS */}
      {activeTab === 'tenants' && (
        <div className="bg-white rounded-3xl border border-[#E5E9E8] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#F8FAFB] text-[#5E6665] font-bold border-b border-[#E5E9E8]">
                <tr>
                  <th className="py-3.5 px-4">اسم المنشأة</th>
                  <th className="py-3.5 px-4">النطاق الفرعي (Subdomain)</th>
                  <th className="py-3.5 px-4">المالك</th>
                  <th className="py-3.5 px-4">المدينة</th>
                  <th className="py-3.5 px-4">الباقة</th>
                  <th className="py-3.5 px-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9E8]">
                {initialTenants.map((t) => (
                  <tr key={t.id} className="hover:bg-[#FDFEFE]">
                    <td className="py-3.5 px-4 font-bold text-[#0D1514]">{t.businessName}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#91B8C0] font-bold" dir="ltr">
                      {t.subdomain}.rashx.org
                    </td>
                    <td className="py-3.5 px-4 text-[#0D1514]">{t.ownerName}</td>
                    <td className="py-3.5 px-4 text-[#5E6665]">{t.city}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0D1514]">{t.plan}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ADMINS */}
      {activeTab === 'admins' && (
        <div className="bg-white rounded-3xl border border-[#E5E9E8] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#F8FAFB] text-[#5E6665] font-bold border-b border-[#E5E9E8]">
                <tr>
                  <th className="py-3.5 px-4">الاسم</th>
                  <th className="py-3.5 px-4">البريد الإلكتروني الإداري</th>
                  <th className="py-3.5 px-4">المسمى والإدارة</th>
                  <th className="py-3.5 px-4">الدور</th>
                  <th className="py-3.5 px-4">تاريخ الإنشاء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9E8]">
                {initialAdmins.map((adm) => (
                  <tr key={adm.id} className="hover:bg-[#FDFEFE]">
                    <td className="py-3.5 px-4 font-bold text-[#0D1514]">{adm.name}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#0D1514]">{adm.email}</td>
                    <td className="py-3.5 px-4 text-[#5E6665]">{adm.title}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-[#91B8C0]/20 text-[#0D1514] font-black text-[10px]">
                        {adm.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5E6665] text-[11px]">
                      {adm.createdAt ? new Date(adm.createdAt).toLocaleDateString('ar-SA') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-[#E5E9E8] overflow-hidden shadow-xs">
          <div className="divide-y divide-[#E5E9E8]">
            {initialAuditLogs.length === 0 ? (
              <div className="p-8 text-center text-xs text-ink-muted">
                لا توجد سجلات تدقيق أمني مسجلة
              </div>
            ) : (
              initialAuditLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-[#FDFEFE] flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                      LOG
                    </div>
                    <div>
                      <div className="font-bold text-[#0D1514]">{log.action}</div>
                      <div className="text-[11px] text-[#5E6665]">
                        المسؤول: {log.adminEmail} • {log.device || 'Admin Gateway'}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#5E6665] font-mono">
                    {log.timestamp ? new Date(log.timestamp).toLocaleString('ar-SA') : '—'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: CONFIG */}
      {activeTab === 'config' && (
        <div className="bg-white rounded-3xl border border-[#E5E9E8] p-6 space-y-4 shadow-xs">
          <h3 className="font-black text-sm text-[#0D1514]">
            بيانات تكوين اتصال Firebase Admin السحابي
          </h3>
          <div className="bg-[#0D1514] text-[#E5E9E8] p-4 rounded-2xl font-mono text-xs overflow-x-auto" dir="ltr">
            <pre>
              {JSON.stringify(
                {
                  firebaseAdmin: 'active',
                  projectId,
                  authDomain: `${projectId}.firebaseapp.com`,
                  database: 'Google Cloud Firestore (aya2-a5057)',
                  accessModel: 'Server-Only Admin SDK (no client Firestore)',
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

