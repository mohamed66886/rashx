/**
 * ============================================================================
 * RashX (راش إكس) | Platform HQ Core Domain Types
 * ============================================================================
 * Pure serializable TypeScript domain models for Platform HQ.
 * Zero client or server Firebase dependencies.
 */

export type PlatformRole =
  | 'super_admin'
  | 'platform_engineer'
  | 'support_lead'
  | 'sales_director';

export type TenantPlan = 'Starter' | 'Growth' | 'Enterprise';

export type TenantStatus = 'active' | 'trial' | 'suspended';

export type TenantZatcaPhase = 'Phase 2 Onboarded' | 'Pending CSID' | 'Exempt';

export type LeadStatus = 'new' | 'contacted' | 'demo_scheduled' | 'converted' | 'lost';

export type AuditAction =
  | 'ADMIN_LOGIN'
  | 'ADMIN_LOGOUT'
  | 'PROVISION_TENANT'
  | 'UPDATE_TENANT'
  | 'SUSPEND_TENANT'
  | 'DELETE_TENANT'
  | 'REVOKE_SESSION'
  | 'CONVERT_LEAD'
  | 'UPDATE_LEAD_STATUS'
  | 'CREATE_INVOICE'
  | 'SEND_INVOICE_EMAIL'
  | 'DELETE_INVOICE';

export interface RashxAdmin {
  id: string;
  email: string;
  name: string;
  title: string;
  department: 'Executive' | 'Product' | 'Engineering' | 'Support' | 'Sales';
  role: PlatformRole;
  status: 'active' | 'suspended';
  phone: string;
  avatar?: string;
  avatarId?: number;
  lastLoginAt: string;
  createdAt: string;
}

export interface RashxAdminSession {
  id: string; // Token
  adminId: string;
  email: string;
  name: string;
  title: string;
  role: string;
  avatar?: string;
  avatarId?: number;
  device: string;
  ip: string;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
  lastActivityAt: string;
  endedAt?: string | null;
}

export interface SalonTenant {
  id: string;
  businessName: string;
  subdomain: string; // e.g. "lamsat-hareer" -> lamsat-hareer.rashx.org
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  plan: TenantPlan;
  mrr: number; // SAR
  branchesCount: number;
  status: TenantStatus;
  zatcaPhase: TenantZatcaPhase;
  createdAt: string;
  updatedAt?: string;
}

export interface PlatformLead {
  id: string;
  salonName: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  status: LeadStatus;
  source: string;
  submittedAt: string;
}

export interface PlatformAuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: AuditAction;
  timestamp: string;
  details?: Record<string, unknown>;
  device?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total?: number;
}

export interface PlatformStats {
  tenantsTotal: number;
  tenantsActive: number;
  tenantsTrial: number;
  tenantsSuspended: number;
  mrrTotal: number;
  leadsTotal: number;
  leadsNew: number;
  leadsConverted: number;
  updatedAt: string;
}

export interface PlatformInvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PlatformInvoice {
  id: string;
  invoiceNumber: string;
  docKind?: 'contract_invoice' | 'quote';
  facilityName: string;
  facilityAddress: string;
  invoiceDate: string;
  startDate?: string;
  endDate?: string;
  planName?: string;
  dueDate?: string;
  tenantId?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  taxNumber?: string;
  commercialReg?: string;
  items: PlatformInvoiceItem[];
  subtotal: number;
  discount: number;
  taxableAmount: number;
  vatEnabled?: boolean;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  paymentMethod: 'cash' | 'mada' | 'apple-pay' | 'visa' | 'bank-transfer';
  paymentDetails?: string;
  status: 'paid' | 'unpaid' | 'draft' | 'cancelled';
  notes?: string;
  sentToEmail?: string;
  sentAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BillingSettings {
  facilityName: string;
  accountName: string;
  bankName: string;
  iban: string;
  taxNumber?: string;
  commercialReg?: string;
  address?: string;
  disclaimerLine?: string;
  signatureUrl?: string;
  stampUrl?: string;
}

export interface BillingSellerSettings {
  nameAr: string;
  nameEn: string;
  commercialRegNumber: string;
  vatNumber?: string;
  address: string;
  email: string;
  phone: string;
  bankName: string;
  accountName: string;
  iban: string;
}

export interface PlatformBillingSettings {
  seller: BillingSellerSettings;
  signaturePath?: string | null;
  stampPath?: string | null;
  invoicePrefix: string;
  quotePrefix?: string;
  disclaimerLine?: string;
  defaultDueDays: number;
  updatedAt?: string;
  updatedBy?: string;
}

