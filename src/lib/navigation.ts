/**
 * Navigation Definitions & Department Resolver for System Routes & Breadcrumbs
 * قاموس وهيكل الإدارات والأقسام ومسارات التنقل
 */

export interface NavDepartment {
  id: string;
  titleAr: string;
  titleEn: string;
  defaultHref: string;
  icon?: string;
  description?: string;
}

export interface NavSection {
  id: string;
  titleAr: string;
  titleEn: string;
  departments: NavDepartment[];
}

export const NAV_DEPARTMENTS: NavDepartment[] = [
  {
    id: 'operations',
    titleAr: 'إدارة التشغيل والصالون',
    titleEn: 'Salon Operations',
    defaultHref: '/operations/pos',
    description: 'نقاط البيع، الحجوزات، المواعيد وقائمة الانتظار',
  },
  {
    id: 'hr',
    titleAr: 'الموارد البشرية وفريق العمل',
    titleEn: 'HR & Team',
    defaultHref: '/hr/staff',
    description: 'فريق العمل، الرواتب، العمولات وسجل الحضور',
  },
  {
    id: 'crm',
    titleAr: 'إدارة العملاء والتسويق',
    titleEn: 'Clients & Marketing',
    defaultHref: '/crm/customers',
    description: 'دليل وسجل العملاء، برامج الولاء والحملات',
  },
  {
    id: 'finance',
    titleAr: 'الإدارة المالية والمخزون',
    titleEn: 'Finance & Supply',
    defaultHref: '/finance/invoices',
    description: 'الفواتير، الخزينة، المشتريات وجرد المخزون',
  },
  {
    id: 'website',
    titleAr: 'الموقع العام والهوية',
    titleEn: 'Public Site & Brand',
    defaultHref: '/website/appearance',
    description: 'المظهر العام، إعدادات الحجز والهوية البصرية',
  },
  {
    id: 'settings',
    titleAr: 'الإدارة العامة والإعدادات',
    titleEn: 'General Settings',
    defaultHref: '/settings/general',
    description: 'ملف المنشأة، الفروع، المستخدمين والاشتراك',
  },
];

export const NAV_SECTIONS: NavDepartment[] = NAV_DEPARTMENTS;

/**
 * Mapping of sub-paths/tools to their parent department
 */
const TOOL_TO_DEPARTMENT_MAP: Record<string, string> = {
  // Operations
  pos: 'operations',
  bookings: 'operations',
  calendar: 'operations',
  waitlist: 'operations',
  tv: 'operations',
  services: 'operations',

  // HR
  staff: 'hr',
  barbers: 'hr',
  attendance: 'hr',
  shifts: 'hr',
  payroll: 'hr',
  commissions: 'hr',
  advances: 'hr',
  slip: 'hr',
  payouts: 'hr',

  // CRM
  customers: 'crm',
  clients: 'crm',
  loyalty: 'crm',
  marketing: 'crm',
  reviews: 'crm',

  // Finance
  invoices: 'finance',
  'cash-register': 'finance',
  inventory: 'finance',
  products: 'finance',
  purchases: 'finance',
  suppliers: 'finance',
  expenses: 'finance',
  reports: 'finance',

  // Website
  appearance: 'website',
  booking: 'website',
  brand: 'website',

  // Settings
  business: 'settings',
  branches: 'settings',
  users: 'settings',
  subscription: 'settings',
  general: 'settings',
  'audit-logs': 'settings',
  logs: 'settings',
};

/**
 * اشتقاق الإدارة التابعة للمسار المحدد تلقائياً
 */
export function getDepartmentForPath(
  pathname: string,
  locale: string = 'ar'
): NavDepartment | undefined {
  if (!pathname) return undefined;

  const cleaned = pathname
    .replace(new RegExp(`^\\/${locale}`), '')
    .replace(/^\/dashboard/, '');

  const segments = cleaned.split('/').filter(Boolean);
  if (segments.length === 0) return undefined;

  const firstSegment = segments[0];

  // 1. فحص ما إذا كان المسار المباشر يمثل إدارة معتمدة
  const directDept = NAV_DEPARTMENTS.find((d) => d.id === firstSegment);
  if (directDept) return directDept;

  // 2. فحص الأداة أو المسار الفرعي وربطه بإدارته
  const deptId = TOOL_TO_DEPARTMENT_MAP[firstSegment];
  if (deptId) {
    return NAV_DEPARTMENTS.find((d) => d.id === deptId);
  }

  return undefined;
}

