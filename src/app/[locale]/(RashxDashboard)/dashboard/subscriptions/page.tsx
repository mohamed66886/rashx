'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  TrendingUp,
  Building2,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { listTenants, SalonTenant } from '@/lib/firebase/auth-db';

export default function SubscriptionsPage() {
  const [tenants, setTenants] = useState<SalonTenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await listTenants();
        setTenants(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const starterTenants = tenants.filter((t) => t.plan === 'Starter');
  const growthTenants = tenants.filter((t) => t.plan === 'Growth');
  const enterpriseTenants = tenants.filter((t) => t.plan === 'Enterprise');

  const totalMRR = tenants.reduce((acc, t) => acc + (Number(t.mrr) || 0), 0);

  const plans = [
    {
      name: 'Starter (باقة البداية)',
      price: 799,
      period: 'شهرياً',
      tenantsCount: starterTenants.length,
      revenue: starterTenants.reduce((acc, t) => acc + (Number(t.mrr) || 799), 0),
      features: ['فرع واحد', 'نقطة بيع POS وحجوزات', 'دعم الفوترة الإلكترونية ZATCA', 'نطاق فرعي مخصص'],
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'Growth (باقة النمو والسبا)',
      price: 1499,
      period: 'شهرياً',
      tenantsCount: growthTenants.length,
      revenue: growthTenants.reduce((acc, t) => acc + (Number(t.mrr) || 1499), 0),
      features: ['حتى 3 فروع', 'نظام الموارد البشرية والعمولات', 'تطبيق العملاء PWA', 'إشعارات واتساب ذكية'],
      popular: true,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'Enterprise (المؤسسات الكبرى)',
      price: 2999,
      period: 'شهرياً',
      tenantsCount: enterpriseTenants.length,
      revenue: enterpriseTenants.reduce((acc, t) => acc + (Number(t.mrr) || 2999), 0),
      features: ['فروع غير محدودة', 'تطبيق خاص بهوية المنشأة', 'مدير حساب مخصص', 'بوابة ZATCA مخصصة'],
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#91B8C0]/20 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-[#91B8C0]" />
            </div>
            <h1 className="text-xl font-black text-[#0D1514]">
              إيرادات واشتراكات المنصة الفعلية (SaaS MRR)
            </h1>
          </div>
          <p className="text-xs text-[#5E6665]">
            تحليل الإيراد الشهري المتكرر، خطط التسعير، ودورات التجديد لصالونات راش إكس المسجلة في Firestore.
          </p>
        </div>

        <div className="text-left">
          <div className="text-xs text-[#5E6665]">إجمالي الإيراد الشهري الفعلي (MRR)</div>
          <div className="text-2xl font-black text-[#0D1514]">
            {totalMRR.toLocaleString('ar-SA')} ر.س
          </div>
        </div>
      </div>

      {/* Plans Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-3xl bg-white border border-[#E5E9E8] shadow-xs relative flex flex-col justify-between ${
              plan.popular ? 'ring-2 ring-[#91B8C0]' : ''
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#91B8C0] text-[#0D1514] font-black text-[10px] shadow-sm">
                الأكثر طلباً
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${plan.color}`}>
                  {plan.tenantsCount} صالونات مشتركة
                </span>
                <span className="text-xs font-bold text-[#5E6665]">
                  {plan.revenue.toLocaleString('ar-SA')} ر.س/ش
                </span>
              </div>

              <h3 className="font-black text-base text-[#0D1514] mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 my-3">
                <span className="text-3xl font-black text-[#0D1514]">{plan.price}</span>
                <span className="text-xs text-[#5E6665]">ر.س / شهرياً</span>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#F5F8F8] text-xs text-[#5E6665]">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E9E8] flex justify-between text-xs">
              <span className="text-[#5E6665]">الصالونات النشطة:</span>
              <span className="font-bold text-emerald-700">{plan.tenantsCount} منشأة</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
