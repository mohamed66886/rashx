'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  NAV_SECTIONS,
  NAV_DEPARTMENTS,
  getDepartmentForPath,
  type NavDepartment,
} from '@/lib/navigation';

export interface BreadcrumbItemData {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

export type BreadcrumbItem = BreadcrumbItemData;

export type BreadcrumbVariant = 'primary' | 'secondary' | 'neutral' | 'dark';

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'div'> {
  items?: BreadcrumbItemData[];
  separator?: React.ReactNode;
  locale?: string;
  variant?: BreadcrumbVariant;
}

interface BilingualTerm {
  ar: string;
  en: string;
}

/**
 * قاموس شامل ومزدوج اللغة (عربي / إنجليزي) لكافة أقسام ومسارات وأدوات المنظومة
 */
const ROUTE_DICTIONARY: Record<string, BilingualTerm> = {
  // الجذور الرئيسية
  dashboard: { ar: 'الرئيسية', en: 'Dashboard' },
  app: { ar: 'الرئيسية', en: 'Dashboard' },

  // الإدارات الست الرئيسية لنظام حلاقة HLAQA
  operations: { ar: 'إدارة التشغيل والصالون', en: 'Salon Operations' },
  hr: { ar: 'الموارد البشرية وفريق العمل', en: 'HR & Team' },
  crm: { ar: 'إدارة العملاء والتسويق', en: 'Clients & Marketing' },
  finance: { ar: 'الإدارة المالية والمخزون', en: 'Finance & Supply' },
  website: { ar: 'الموقع العام والهوية', en: 'Public Site & Brand' },
  settings: { ar: 'الإدارة العامة والإعدادات', en: 'General Settings' },

  // إدارة التشغيل والصالون (Operations)
  pos: { ar: 'نقطة البيع السريعة (POS)', en: 'Point of Sale (POS)' },
  bookings: { ar: 'جدول الحجوزات والمواعيد', en: 'Bookings & Appointments' },
  calendar: { ar: 'تقويم الصالون والمواعيد', en: 'Salon Calendar' },
  waitlist: { ar: 'قائمة الانتظار الحية', en: 'Live Waitlist' },
  tv: { ar: 'شاشة صالة الانتظار (TV)', en: 'Waiting Room TV' },
  services: { ar: 'دليل الخدمات والتصنيفات', en: 'Services & Categories' },

  // إدارة الموارد البشرية (HR)
  staff: { ar: 'فريق العمل والحلاقين', en: 'Staff & Barbers' },
  barbers: { ar: 'دليل الحلاقين', en: 'Barbers Directory' },
  attendance: { ar: 'سجل الحضور والدوام', en: 'Attendance & Clock-in' },
  shifts: { ar: 'الورديات ومواعيد العمل', en: 'Shifts & Schedules' },
  payroll: { ar: 'مسير الرواتب الشهري', en: 'Monthly Payroll' },
  commissions: { ar: 'مركز عمولات الحلاقين', en: 'Barber Commissions' },
  advances: { ar: 'السلف والمستحقات والخصومات', en: 'Advances & Deductions' },
  slip: { ar: 'قسيمة الراتب', en: 'Salary Slip' },
  payouts: { ar: 'صرف المستحقات', en: 'Disbursements' },

  // إدارة العملاء والتسويق (CRM)
  customers: { ar: 'دليل وسجل العملاء', en: 'Clients Directory' },
  clients: { ar: 'دليل وسجل العملاء', en: 'Clients Directory' },
  loyalty: { ar: 'برنامج نقاط الولاء', en: 'Loyalty Program' },
  marketing: { ar: 'الحملات والعروض التسويقية', en: 'Marketing Campaigns' },
  reviews: { ar: 'تقييمات وآراء العملاء', en: 'Client Reviews' },

  // الإدارة المالية والمخزون (Finance)
  invoices: { ar: 'الفواتير الضريبية', en: 'Tax Invoices' },
  'cash-register': { ar: 'الخزينة والدرج والورديات', en: 'Cash Register & Till' },
  inventory: { ar: 'جرد المخزون والمنتجات', en: 'Inventory & Stock' },
  products: { ar: 'دليل المنتجات', en: 'Products Directory' },
  purchases: { ar: 'فواتير المشتريات والموردين', en: 'Purchases & Bills' },
  suppliers: { ar: 'دليل الموردين', en: 'Suppliers Directory' },
  expenses: { ar: 'المصروفات والتكاليف', en: 'Expenses & Overhead' },
  reports: { ar: 'التقارير والإحصائيات المالية', en: 'Financial Reports' },

  // الموقع العام والهوية (Website)
  appearance: { ar: 'تخصيص الموقع والثيم', en: 'Website Theme & Style' },
  booking: { ar: 'إعدادات الحجز الإلكتروني', en: 'Online Booking Config' },
  brand: { ar: 'الهوية البصرية واللوجو', en: 'Branding & Logo' },

  // الإدارة العامة والإعدادات (Settings)
  business: { ar: 'ملف المنشأة والبيانات', en: 'Salon Profile' },
  branches: { ar: 'إدارة الفروع', en: 'Branches Management' },
  users: { ar: 'المستخدمون والصلاحيات', en: 'Users & Permissions' },
  subscription: { ar: 'باقة الاشتراك والفوترة', en: 'Subscription & Plan' },
  general: { ar: 'الإعدادات العامة والضريبة', en: 'General Settings & Tax' },
  'audit-logs': { ar: 'سجل العمليات والرقابة', en: 'Audit Logs' },
  logs: { ar: 'سجل النشاطات', en: 'Activity Logs' },

  // العمليات والإجراءات الفرعية (Sub-actions)
  new: { ar: 'إضافة جديد', en: 'Add New' },
  add: { ar: 'إضافة جديد', en: 'Add New' },
  create: { ar: 'إنشاء جديد', en: 'Create' },
  edit: { ar: 'تعديل البيانات', en: 'Edit' },
  view: { ar: 'عرض التفاصيل', en: 'Details' },
  details: { ar: 'التفاصيل', en: 'Details' },
  history: { ar: 'السجل التاريخي', en: 'History' },
  print: { ar: 'طباعة', en: 'Print' },
  preview: { ar: 'معاينة', en: 'Preview' },
  categories: { ar: 'التصنيفات', en: 'Categories' },
  units: { ar: 'وحدات القياس', en: 'Units' },
  checkout: { ar: 'إتمام العملية', en: 'Checkout' },
  refund: { ar: 'استرجاع', en: 'Refund' },
  statement: { ar: 'كشف حساب', en: 'Account Statement' },

  // مسارات قديمة وتوافقية (Legacy Compatibility)
  'center-management': { ar: 'إدارة الصالون', en: 'Center Management' },
  CenterFile: { ar: 'ملف المنشأة', en: 'Facility File' },
  AcademicStages: { ar: 'المراحل', en: 'Stages' },
  CenterCommission: { ar: 'نسبة العمولة', en: 'Commission Rate' },
  CenterStatement: { ar: 'كشف الحساب', en: 'Statement' },
  Certificates: { ar: 'الشهادات', en: 'Certificates' },
  Prices: { ar: 'قائمة الأسعار', en: 'Price List' },
  StudentReceipts: { ar: 'سندات القبض', en: 'Receipts' },
  Students: { ar: 'دليل العملاء', en: 'Directory' },
  UnpaidStudents: { ar: 'المستحقات المعلقة', en: 'Unpaid' },
  Subjects: { ar: 'الخدمات', en: 'Services' },
  TeacherBalances: { ar: 'أرصدة الحلاقين', en: 'Staff Balances' },
  TeacherDisbursements: { ar: 'صرف المستحقات', en: 'Disbursements' },
  TeacherStatement: { ar: 'كشف حساب الحلاق', en: 'Staff Statement' },
  Teachers: { ar: 'دليل الحلاقين', en: 'Staff Directory' },
};

/**
 * فحص ما إذا كان المقطع عبارة عن معرف ديناميكي (UUID، رقم، أو كود Firestore)
 */
function isDynamicIdentifier(segment: string): boolean {
  if (!segment) return false;
  // UUID صيغة قياسية
  if (
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      segment
    )
  ) {
    return true;
  }
  // رقم تسلسلي
  if (/^\d+$/.test(segment)) return true;
  // بادئات المعرفات مثل cust_..., inv_..., staff_...
  if (
    /^(?:cust|inv|staff|barber|ord|serv|prod|branch|user|shift|exp|sub)_[a-zA-Z0-9]+$/i.test(
      segment
    )
  ) {
    return true;
  }
  // كود عشوائي أو توكن طويل أكثر من 18 محرف
  if (
    segment.length >= 18 &&
    /^[a-zA-Z0-9_-]+$/.test(segment) &&
    !ROUTE_DICTIONARY[segment]
  ) {
    return true;
  }
  return false;
}

/**
 * اشتقاق عنوان ذكي وسياقي للمقطع بناءً على سياق الصفحة واللغة الحالية
 */
function resolveSmartSegmentLabel(
  segment: string,
  isAr: boolean,
  prevSegment?: string,
  isLastItem?: boolean
): string {
  // 1. فحص القاموس الثنائي
  const dictEntry = ROUTE_DICTIONARY[segment];
  if (dictEntry) {
    // تخصيص ذكي لأزرار "إضافة جديد" أو "تعديل" بناءً على الصفحة السابقة
    if (segment === 'new' || segment === 'create' || segment === 'add') {
      if (prevSegment === 'customers') {
        return isAr ? 'إضافة عميل جديد' : 'New Client';
      }
      if (prevSegment === 'staff') {
        return isAr ? 'إضافة موظف / حلاق' : 'New Staff Member';
      }
      if (prevSegment === 'services') {
        return isAr ? 'إضافة خدمة جديدة' : 'New Service';
      }
      if (prevSegment === 'products') {
        return isAr ? 'إضافة منتج جديد' : 'New Product';
      }
      if (prevSegment === 'invoices') {
        return isAr ? 'إنشاء فاتورة جديدة' : 'New Invoice';
      }
      if (prevSegment === 'expenses') {
        return isAr ? 'تسجيل مصروف جديد' : 'New Expense';
      }
      if (prevSegment === 'purchases') {
        return isAr ? 'فاتورة مشتريات جديدة' : 'New Purchase Bill';
      }
      if (prevSegment === 'bookings') {
        return isAr ? 'حجز موعد جديد' : 'New Booking';
      }
    }

    if (segment === 'edit') {
      if (prevSegment === 'customers') {
        return isAr ? 'تعديل بيانات العميل' : 'Edit Client';
      }
      if (prevSegment === 'staff') {
        return isAr ? 'تعديل بيانات الموظف' : 'Edit Staff Member';
      }
      if (prevSegment === 'services') {
        return isAr ? 'تعديل بيانات الخدمة' : 'Edit Service';
      }
      if (prevSegment === 'products') {
        return isAr ? 'تعديل بيانات المنتج' : 'Edit Product';
      }
    }

    return isAr ? dictEntry.ar : dictEntry.en;
  }

  // 2. إذا كان معرف ديناميكي وهو العنصر الأخير
  if (isDynamicIdentifier(segment)) {
    if (isLastItem) {
      const shortId = segment.length > 8 ? segment.slice(0, 8) : segment;
      return isAr ? `تفاصيل السجل #${shortId}` : `Record #${shortId}`;
    }
    return isAr ? 'التفاصيل' : 'Details';
  }

  // 3. تنسيق الكلمات المركبة المنفصلة بـ - أو _
  const cleaned = segment
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return cleaned;
}

const ribbonVariantStyles: Record<BreadcrumbVariant, string> = {
  primary: 'bg-[#91B8C0] hover:bg-[#7fa4ac] text-black font-bold shadow-2xs',
  secondary: 'bg-[#F0C5AE] hover:bg-[#e0b59e] text-black font-bold shadow-2xs',
  neutral: 'bg-[#E5E9E8] hover:bg-[#dcdcdc] text-black font-semibold',
  dark: 'bg-black hover:bg-zinc-800 text-white font-semibold',
};

/**
 * مكون الشريط الشريطي للتنقل (Ribbon Breadcrumb) بتصميم مسطح وسلس
 */
export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  function Breadcrumb(
    { items, className, locale: propLocale, variant = 'secondary', ...props },
    ref
  ) {
    const pathname = usePathname() ?? '';
    const detectedLocale = useLocale();
    const locale = propLocale || detectedLocale || 'ar';
    const isAr = locale === 'ar';

    // توليد ذكي تلقائي من المسار إذا لم تُمرر عناصر جاهزة
    const autoItems: BreadcrumbItemData[] = [];

    if (!items || items.length === 0) {
      if (pathname) {
        const rawSegments = pathname
          .replace(new RegExp(`^\\/${locale}`), '')
          .split('/')
          .filter(Boolean);

        const contentSegments =
          rawSegments[0] === 'dashboard' ? rawSegments.slice(1) : rawSegments;

        const firstSeg = contentSegments[0];
        const knownDepartment = NAV_DEPARTMENTS.find((d) => d.id === firstSeg);

        if (!knownDepartment && contentSegments.length > 0) {
          const inferredDept = getDepartmentForPath(pathname, locale);
          if (inferredDept && inferredDept.id !== 'dashboard') {
            autoItems.push({
              label: isAr ? inferredDept.titleAr : inferredDept.titleEn,
              href: `/${locale}${inferredDept.defaultHref}`,
            });
          }
        }

        let accumulatedPath = `/${locale}/dashboard`;

        contentSegments.forEach((segment, idx) => {
          accumulatedPath += `/${segment}`;

          const isLast = idx === contentSegments.length - 1;
          const prev = idx > 0 ? contentSegments[idx - 1] : undefined;

          // إذا كان المعرف ديناميكي وليس الأخير (مثلاً يليه /edit) نتخطى إضافة كارت مكرر
          if (isDynamicIdentifier(segment) && !isLast) {
            return;
          }

          const label = resolveSmartSegmentLabel(segment, isAr, prev, isLast);

          autoItems.push({
            label,
            href: isLast ? undefined : accumulatedPath,
          });
        });
      }
    }

    const baseItems = items && items.length > 0 ? items : autoItems;

    // التأكد من أن "الرئيسية" هي العنصر الأول دائماً
    const homeLabel = isAr ? 'الرئيسية' : 'Home';
    const homeHref = `/${locale}/dashboard`;

    const allItems: BreadcrumbItemData[] = [
      { label: homeLabel, href: homeHref },
      ...baseItems.filter((i) => i.label !== 'الرئيسية' && i.label !== 'Home'),
    ];

    return (
      <div
        ref={ref}
        dir={isAr ? 'rtl' : 'ltr'}
        {...props}
        className={cn(
          'bg-white dark:bg-white w-full border-none shadow-none ring-0 outline-none mb-4 rounded-lg select-none',
          className
        )}
        style={{
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          ...props.style,
          backgroundColor: '#ffffff',
        }}
      >
        <div className="flex overflow-x-auto hl-scroll items-center py-0.5 scrollbar-none">
          {allItems.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === allItems.length - 1;
            const zIndex = 50 - index;

            if (isLast) {
              return (
                <div
                  key={index}
                  className={cn(
                    'flex items-center shrink-0 text-black font-extrabold text-xs sm:text-sm whitespace-nowrap',
                    isAr ? 'pr-3 pl-4' : 'pl-3 pr-4'
                  )}
                  style={{ zIndex }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        variant === 'secondary'
                          ? 'bg-[#91B8C0]'
                          : 'bg-[#F0C5AE]'
                      }`}
                    />
                    {item.label}
                  </span>
                </div>
              );
            }

            // قص الشريط الشريطي بالأسهم المتداخلة (Polygons):
            // في الواجهة العربية RTL: السهم يتجه نحو اليسار
            // في الواجهة الإنجليزية LTR: السهم يتجه نحو اليمين
            const clipPath = isAr
              ? isFirst
                ? 'polygon(100% 0%, 100% 100%, 20px 100%, 0% 50%, 20px 0%)'
                : 'polygon(100% 0%, calc(100% - 20px) 50%, 100% 100%, 20px 100%, 0% 50%, 20px 0%)'
              : isFirst
              ? 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 0% 100%)'
              : 'polygon(0% 0%, 20px 50%, 0% 100%, calc(100% - 20px) 100%, 100% 50%, calc(100% - 20px) 0%)';

            const marginClass = isFirst
              ? ''
              : isAr
              ? '-mr-[18px]'
              : '-ml-[18px]';

            const paddingClass = isAr
              ? isFirst
                ? 'pr-5 pl-10'
                : 'pr-10 pl-10'
              : isFirst
              ? 'pl-5 pr-10'
              : 'pl-10 pr-10';

            const content = (
              <div
                className={cn(
                  'relative flex items-center justify-center h-[34px] transition-colors cursor-pointer select-none',
                  ribbonVariantStyles[variant] || ribbonVariantStyles.primary,
                  paddingClass
                )}
                style={{ clipPath }}
              >
                <span className="text-xs sm:text-sm whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );

            return (
              <div
                key={index}
                className={`flex items-center shrink-0 ${marginClass}`}
                style={{ zIndex }}
              >
                {item.href ? <Link href={item.href}>{content}</Link> : content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;

/* ───────────────────────── SmartBreadcrumb (شامل وذكي بالكامل) ───────────────────────── */

export interface SmartBreadcrumbProps {
  className?: string;
  crumb?: { section?: string; title?: string };
  homeLabel?: string;
  homeHref?: string;
  items?: BreadcrumbItemData[];
  showHomeIcon?: boolean;
  locale?: string;
  variant?: BreadcrumbVariant;
}

/**
 * مكون مسار التنقل الذكي:
 * - يتعرف على الإدارة التابعة للأداة تلقائياً ويضيفها في المسار
 * - يتفادى إظهار المعرفات العشوائية الطويلة ويستبدلها بسياق ذكي
 * - يخفي الشريط تلقائياً في الصفحة الرئيسية (/dashboard) لمنع التكرار
 * - يدعم اللغتين العربية والإنجليزية بشكل ديناميكي كامل
 */
export const SmartBreadcrumb = React.memo(function SmartBreadcrumb({
  className,
  crumb,
  homeLabel,
  homeHref,
  items: overrideItems,
  locale: propLocale,
  variant = 'secondary',
}: SmartBreadcrumbProps) {
  const pathname = usePathname() ?? '';
  const detectedLocale = useLocale();
  const locale = propLocale || detectedLocale || 'ar';
  const isAr = locale === 'ar';

  const resolvedItems = React.useMemo<BreadcrumbItemData[]>(() => {
    if (overrideItems && overrideItems.length > 0) {
      return overrideItems;
    }

    const defaultHomeLabel = homeLabel || (isAr ? 'الرئيسية' : 'Home');
    const defaultHomeHref = homeHref || `/${locale}/dashboard`;

    // 1. التحليل الذكي من مسار الصفحة الفعلي في المتصفح (URL Path is the ultimate truth)
    const segments = pathname
      .replace(new RegExp(`^\\/${locale}`), '')
      .split('/')
      .filter(Boolean);

    // إذا كانت الصفحة الرئيسية للداشبورد مباشرة
    if (
      segments.length === 0 ||
      (segments.length === 1 && segments[0] === 'dashboard')
    ) {
      return [{ label: defaultHomeLabel, href: defaultHomeHref }];
    }

    const trail: BreadcrumbItemData[] = [
      { label: defaultHomeLabel, href: defaultHomeHref },
    ];

    // إزالة مقطع dashboard المبدئي لتسهيل معالجة الإدارات والأدوات
    const contentSegments =
      segments[0] === 'dashboard' ? segments.slice(1) : segments;

    // فحص ما إذا كان أول مقطع يمثل إدارة من الإدارات الست
    const firstSeg = contentSegments[0];
    const knownDepartment = NAV_DEPARTMENTS.find((d) => d.id === firstSeg);

    // إذا كان المستخدم في مسار مباشر بدون بادئة إدارة (مثل /dashboard/invoices أو /dashboard/pos)
    // نقوم بحقن الإدارة التابعة لها ذكياً في المسار
    if (!knownDepartment && contentSegments.length > 0) {
      const inferredDept = getDepartmentForPath(pathname, locale);
      if (inferredDept && inferredDept.id !== 'dashboard') {
        trail.push({
          label: isAr ? inferredDept.titleAr : inferredDept.titleEn,
          href: `/${locale}${inferredDept.defaultHref}`,
        });
      }
    }

    let accumulatedPath = `/${locale}/dashboard`;

    contentSegments.forEach((seg, index) => {
      accumulatedPath += `/${seg}`;

      const isLast = index === contentSegments.length - 1;
      const prev = index > 0 ? contentSegments[index - 1] : undefined;

      // تخطي المعرفات الديناميكية إن لم تكن هي النهاية
      if (isDynamicIdentifier(seg) && !isLast) {
        return;
      }

      let label = resolveSmartSegmentLabel(seg, isAr, prev, isLast);

      // إذا كان هذا هو العنصر الأخير وهناك عنوان دقيق مخصص من crumb
      if (
        isLast &&
        crumb?.title &&
        crumb.title !== 'الرئيسية' &&
        crumb.title !== 'Home' &&
        crumb.title !== 'Dashboard' &&
        crumb.title !== 'RASHX'
      ) {
        if (isDynamicIdentifier(seg) || seg === 'view' || seg === 'details') {
          label = crumb.title;
        }
      }

      trail.push({
        label,
        href: isLast ? undefined : accumulatedPath,
      });
    });

    return trail;
  }, [overrideItems, homeLabel, isAr, homeHref, locale, crumb, pathname]);

  // لا يتم عرض البريدكرامب إذا كان يحتوي على عنصر واحد فقط (مثل الصفحة الرئيسية للداشبورد)
  if (!resolvedItems || resolvedItems.length <= 1) {
    return null;
  }

  return (
    <Breadcrumb
      items={resolvedItems}
      className={className}
      locale={locale}
      variant={variant}
    />
  );
});

SmartBreadcrumb.displayName = 'SmartBreadcrumb';

/* ───────────────────────── Legacy Sub-components (Backward compatibility) ───────────────────────── */

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex min-w-0 flex-nowrap items-center gap-2 text-sm text-slate-500',
      className
    )}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex min-w-0 items-center', className)}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(
      'font-medium hover:text-slate-900 transition-colors',
      className
    )}
    {...props}
  />
));
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-bold text-black', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children || '/'}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(
      'flex size-9 items-center justify-center',
      className
    )}
    {...props}
  >
    ...
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

// Export NAV utilities for convenience
export { NAV_SECTIONS, NAV_DEPARTMENTS, getDepartmentForPath, type NavDepartment };

