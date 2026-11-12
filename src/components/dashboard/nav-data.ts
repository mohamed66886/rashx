import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Receipt,
  UserPlus,
  Database,
  Users,
  Settings,
  LucideIcon,
} from 'lucide-react';

export interface PlatformNavItem {
  title: string;
  titleEn: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  exact?: boolean;
}

export function getPlatformNavItems(locale: string): PlatformNavItem[] {
  return [
    {
      title: 'نظرة عامة على المنصة',
      titleEn: 'Platform Overview',
      href: `/${locale}/dashboard`,
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: 'الصالونات والمنشآت (Tenants)',
      titleEn: 'Salons & Facilities',
      href: `/${locale}/dashboard/tenants`,
      icon: Building2,
    },
    {
      title: 'الاشتراكات والإيرادات (MRR)',
      titleEn: 'Subscriptions & MRR',
      href: `/${locale}/dashboard/subscriptions`,
      icon: CreditCard,
    },
    {
      title: 'إصدار الفواتير الضريبية (Invoices)',
      titleEn: 'Tax Invoices & Billing',
      href: `/${locale}/dashboard/invoices`,
      icon: Receipt,
      badge: 'ZATCA',
    },
    {
      title: 'طلبات الانضمام والعروض (Leads)',
      titleEn: 'Leads & Inquiries',
      href: `/${locale}/dashboard/leads`,
      icon: UserPlus,
      badge: 'جديد',
    },
    {
      title: 'مركز قاعدة البيانات والجلسات',
      titleEn: 'Firebase DB & Sessions',
      href: `/${locale}/dashboard/database`,
      icon: Database,
      badge: 'Live',
    },
    {
      title: 'مسؤولو المنصة والصلاحيات',
      titleEn: 'RashX Team & Admins',
      href: `/${locale}/dashboard/admins`,
      icon: Users,
    },
    {
      title: 'إعدادات المنظومة والنطاقات',
      titleEn: 'Platform Settings & DNS',
      href: `/${locale}/dashboard/settings`,
      icon: Settings,
    },
  ];
}

