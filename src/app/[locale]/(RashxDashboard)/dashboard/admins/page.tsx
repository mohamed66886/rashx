import React, { Suspense } from 'react';
import {
  Users,
  ShieldCheck,
  Mail,
  Phone,
} from 'lucide-react';
import { getAdmins } from '@/server/data/admins';
import { requireAdmin } from '@/server/auth/session';
import AdminsLoading from './loading';

async function AdminsContent() {
  await requireAdmin(['super_admin', 'platform_engineer']);
  const admins = await getAdmins();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#91B8C0]/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#91B8C0]" />
            </div>
            <h1 className="text-xl font-black text-[#0D1514]">
              فريق عمل إدارة راش إكس (Platform HQ Team)
            </h1>
          </div>
          <p className="text-xs text-[#5E6665]">
            المسؤولون المصرح لهم بالدخول إلى لوحة التحكم المركزية (admin.rashx.org).
          </p>
        </div>

        <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>المصادقة تدار عبر Firebase Admin Session</span>
        </div>
      </div>

      {/* Admins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {admins.map((adm) => (
          <div
            key={adm.id}
            className="p-5 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#91B8C0]/20 text-[#0D1514]">
                  {adm.department}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>نشط</span>
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-[#0D1514] text-white flex items-center justify-center font-bold text-sm">
                  {adm.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-xs text-[#0D1514]">{adm.name}</h3>
                  <div className="text-[10px] text-[#5E6665]">{adm.title}</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-[#F5F8F8] text-xs text-[#5E6665]">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#91B8C0]" />
                  <span className="font-mono text-[11px] text-[#0D1514]">{adm.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#91B8C0]" />
                  <span dir="ltr" className="text-[11px]">
                    {adm.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5E9E8] flex justify-between text-[10px] text-[#5E6665]">
              <span>آخر دخول:</span>
              <span>{adm.lastLoginAt ? new Date(adm.lastLoginAt).toLocaleString('ar-SA') : '—'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminsManagementPage() {
  return (
    <Suspense fallback={<AdminsLoading />}>
      <AdminsContent />
    </Suspense>
  );
}
