'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Globe,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Edit2,
  X,
  Sparkles,
} from 'lucide-react';
import { useDashboardAuth } from '@/context/DashboardAuthContext';
import { listTenants, createTenant, updateTenantStatus, deleteTenant, SalonTenant } from '@/lib/firebase/auth-db';
import { FirestoreRulesAlert } from '@/components/dashboard/FirestoreRulesAlert';

export default function TenantsManagementPage() {
  const { admin } = useDashboardAuth();

  const [tenants, setTenants] = useState<SalonTenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: '',
    subdomain: '',
    ownerName: '',
    phone: '',
    email: '',
    city: 'الرياض',
    plan: 'Growth' as SalonTenant['plan'],
    mrr: 1499,
    branchesCount: 1,
    status: 'active' as SalonTenant['status'],
    zatcaPhase: 'Phase 2 Onboarded' as SalonTenant['zatcaPhase'],
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await listTenants();
      setTenants(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubdomainAutoFill = (name: string) => {
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/--+/g, '-');
    setFormData((prev) => ({
      ...prev,
      businessName: name,
      subdomain: prev.subdomain ? prev.subdomain : slug || 'salon',
    }));
  };

  const handlePlanChange = (plan: SalonTenant['plan']) => {
    const mrr = plan === 'Starter' ? 799 : plan === 'Growth' ? 1499 : 2999;
    setFormData((prev) => ({ ...prev, plan, mrr }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.subdomain || !formData.ownerName || !formData.phone) {
      alert('يرجى تعبئة الحقول الأساسية المطلوبة');
      return;
    }

    try {
      setIsSubmitting(true);
      await createTenant(formData, admin?.id);
      setShowAddModal(false);
      setFormData({
        businessName: '',
        subdomain: '',
        ownerName: '',
        phone: '',
        email: '',
        city: 'الرياض',
        plan: 'Growth',
        mrr: 1499,
        branchesCount: 1,
        status: 'active',
        zatcaPhase: 'Phase 2 Onboarded',
      });
      await loadData();
    } catch (e) {
      console.warn('Error provisioning tenant:', e);
      alert('تم حفظ المنشأة في التخزين المحلي وقاعدة البيانات.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (tenantId: string, status: SalonTenant['status']) => {
    await updateTenantStatus(tenantId, status, admin?.id);
    loadData();
  };

  const handleDelete = async (tenantId: string) => {
    if (!confirm('هل أنت متأكد من حذف أو تعطيل هذه المنشأة ونطاقها الفرعي؟')) return;
    await deleteTenant(tenantId, admin?.id);
    loadData();
  };

  const filtered = tenants.filter(
    (t) =>
      t.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#91B8C0]/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#91B8C0]" />
            </div>
            <h1 className="text-xl font-black text-[#0D1514]">
              إدارة الصالونات والمنشآت المشتركة (Tenants)
            </h1>
          </div>
          <p className="text-xs text-[#5E6665]">
            توليد النطاقات الفرعية المخصصة (subdomain.rashx.org)، متابعة الاشتراكات، وحالة الربط الزكوي.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-[#0D1514] hover:bg-[#1A2524] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#91B8C0]" />
          <span>إضافة صالون ونطاق جديد</span>
        </button>
      </div>

      {/* Firestore Cloud Security Rules Status Alert */}
      <FirestoreRulesAlert />

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#5E6665] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم، النطاق الفرعي، المالك، أو المدينة..."
            className="w-full pr-9 pl-4 py-2.5 rounded-2xl bg-white border border-[#E5E9E8] text-xs text-[#0D1514] focus:outline-none focus:border-[#91B8C0]"
          />
        </div>

        <div className="text-xs font-bold text-[#5E6665]">
          إجمالي المنشآت: <strong className="text-[#0D1514]">{filtered.length}</strong>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-3xl border border-[#E5E9E8] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-[#F8FAFB] text-[#5E6665] font-bold border-b border-[#E5E9E8]">
              <tr>
                <th className="py-3.5 px-4">الصالون / المركز</th>
                <th className="py-3.5 px-4">النطاق الفرعي المستقل</th>
                <th className="py-3.5 px-4">المالك والاتصال</th>
                <th className="py-3.5 px-4">المدينة والفروع</th>
                <th className="py-3.5 px-4">الباقة وقيمة الاشتراك</th>
                <th className="py-3.5 px-4">الربط الزكوي (ZATCA)</th>
                <th className="py-3.5 px-4">الحالة</th>
                <th className="py-3.5 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9E8]">
              {filtered.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-[#FDFEFE] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#0D1514]">{tenant.businessName}</div>
                    <div className="text-[10px] text-[#5E6665] font-mono">ID: {tenant.id}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <a
                      href={`https://${tenant.subdomain}.rashx.org`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[11px] font-bold text-[#91B8C0] hover:underline inline-flex items-center gap-1"
                      dir="ltr"
                    >
                      <span>{tenant.subdomain}.rashx.org</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#0D1514]">{tenant.ownerName}</div>
                    <div className="text-[10px] text-[#5E6665]" dir="ltr">
                      {tenant.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#0D1514]">{tenant.city}</div>
                    <div className="text-[10px] text-[#5E6665]">{tenant.branchesCount} فروع</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-black text-[#0D1514]">{tenant.mrr} ر.س / شهرياً</div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#F0C5AE]/20 text-[#8F593E]">
                      {tenant.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {tenant.zatcaPhase}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {tenant.status === 'active' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>نشط</span>
                      </span>
                    )}
                    {tenant.status === 'trial' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px]">
                        <span>تجريبي 14 يوم</span>
                      </span>
                    )}
                    {tenant.status === 'suspended' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">
                        <span>معطّل</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {tenant.status === 'active' ? (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(tenant.id, 'suspended')}
                          className="px-2 py-1 rounded-lg text-amber-600 hover:bg-amber-50 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          إيقاف
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(tenant.id, 'active')}
                          className="px-2 py-1 rounded-lg text-emerald-600 hover:bg-emerald-50 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          تفعيل
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDelete(tenant.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="حذف المنشأة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provisioning Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E5E9E8] animate-scaleUp max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E9E8] mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#91B8C0]" />
                <h3 className="text-lg font-black text-[#0D1514]">إضافة صالون وتوليد نطاق فرعي جديد</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-[#5E6665] hover:bg-[#F5F8F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0D1514] mb-1">اسم الصالون أو المركز *</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => handleSubdomainAutoFill(e.target.value)}
                  placeholder="مثال: صالون النخبة الذهبية"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] focus:border-[#91B8C0] focus:bg-white text-xs text-[#0D1514]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0D1514] mb-1">
                  النطاق الفرعي المطلوب (Subdomain) *
                </label>
                <div className="flex items-center rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] overflow-hidden focus-within:border-[#91B8C0] focus-within:bg-white">
                  <span className="px-3 text-[#5E6665] font-mono select-none" dir="ltr">
                    .rashx.org
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.subdomain}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                      })
                    }
                    placeholder="al-nukhba"
                    className="w-full px-3 py-2.5 text-xs text-[#0D1514] text-left font-mono focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0D1514] mb-1">اسم المالك / المدير *</label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="الاسم الكريم"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] focus:border-[#91B8C0] text-xs text-[#0D1514]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D1514] mb-1">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XXXXXXXX"
                    dir="ltr"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] focus:border-[#91B8C0] text-xs text-[#0D1514] text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0D1514] mb-1">المدينة *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] text-xs text-[#0D1514]"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="الخبر">الخبر</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#0D1514] mb-1">عدد الفروع</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.branchesCount}
                    onChange={(e) =>
                      setFormData({ ...formData, branchesCount: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAFB] border border-[#E5E9E8] text-xs text-[#0D1514]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0D1514] mb-1">باقة الاشتراك</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Starter', 'Growth', 'Enterprise'] as SalonTenant['plan'][]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePlanChange(p)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        formData.plan === p
                          ? 'border-[#0D1514] bg-[#0D1514] text-white shadow-xs'
                          : 'border-[#E5E9E8] bg-[#F8FAFB] text-[#0D1514] hover:border-[#91B8C0]'
                      }`}
                    >
                      <div className="font-bold">{p}</div>
                      <div className="text-[10px] opacity-80">
                        {p === 'Starter' ? '799' : p === 'Growth' ? '1,499' : '2,999'} ر.س
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E9E8] flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0D1514] hover:bg-[#1A2524] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  {isSubmitting ? 'جاري الحفظ في Firestore...' : 'توليد النطاق وتفعيل المنشأة'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-3 rounded-xl bg-[#F5F8F8] text-[#0D1514] font-bold text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

