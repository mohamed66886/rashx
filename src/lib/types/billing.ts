/**
 * Types for the Billing, Contract Clauses, and Invoices Domain.
 * Strictly adheres to AGENTS.md rules: pure TypeScript types, NO Firebase imports.
 * Money is represented as integer halalas everywhere (1 SAR = 100 Halalas).
 */

export type InvoiceStatus =
  | 'draft'
  | 'issued'
  | 'sent'
  | 'viewed'
  | 'uploaded'
  | 'signed'
  | 'paid'
  | 'cancelled';

export type InvoiceDocKind = 'contract_invoice' | 'quote';

/**
 * Contract clauses collection: contract_clauses/{id}
 */
export interface ContractClause {
  id: string;
  title: string;
  body: string;
  mandatory: boolean;
  order: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Customer billing profile
 */
export interface InvoiceCustomer {
  facilityName: string;
  commercialRegNumber?: string;
  name: string;
  address: string;
  email?: string;
  phone?: string;
}

/**
 * Line item in an invoice (unit price in integer halalas)
 */
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceHalalas: number; // integer halalas
}

/**
 * Financial breakdown in integer halalas
 */
export interface InvoiceTotals {
  subtotal: number; // halalas
  discount: number; // halalas
  taxable: number;  // halalas
  vat: number;      // halalas
  total: number;    // halalas
}

/**
 * Frozen copy of seller billing settings at issue time
 */
export interface InvoiceSeller {
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
  disclaimerLine?: string;
}

/**
 * Signing lifecycle and attached contract copies
 */
export interface InvoiceSigningFile {
  id?: string;
  name: string;
  path: string;
  size?: number;
  mimeType?: string;
  sha256?: string;
  uploadedAt: string;
  uploaderIp?: string;
  uploaderUserAgent?: string;
}

export interface InvoiceSigning {
  tokenHash?: string;
  expiresAt?: string;
  sentTo?: string;
  sentAt?: string;
  viewedAt?: string;
  signedAt?: string;
  reviewedBy?: string;
  rejectReason?: string;
  rejectedAt?: string;
  files: InvoiceSigningFile[];
}

/**
 * Server-generated immutable PDF metadata
 */
export interface InvoicePdf {
  path: string;
  sha256?: string;
}

/**
 * Subcollection event: platform_invoices/{id}/events/{eventId}
 */
export interface InvoiceEvent {
  id: string;
  type: string;
  at: string;
  by: string;
  meta?: Record<string, unknown>;
}

/**
 * Full Firestore invoice document: platform_invoices/{id}
 */
export interface PlatformInvoice {
  id: string;
  number: string | null; // e.g. INV-2026-0001 (assigned when issued, null in draft)
  docKind?: InvoiceDocKind;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  totals: InvoiceTotals;
  vatRatePercent: number; // default 15, allow 0
  currency: 'SAR';
  issueDate: string;
  dueDate?: string;
  terms: ContractClause[]; // frozen copy of clauses used at issue time
  notes?: string;
  seller?: InvoiceSeller; // frozen copy of billing settings at issue time
  status: InvoiceStatus;
  signing?: InvoiceSigning;
  pdf?: InvoicePdf;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

/**
 * Summary view returned by getInvoicesPage using .select()
 * (Omit heavy nested items and terms arrays)
 */
export interface PlatformInvoiceSummary {
  id: string;
  number: string | null;
  invoiceNumber?: string;
  docKind?: InvoiceDocKind;
  customer: {
    facilityName: string;
    name: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  facilityName?: string;
  facilityAddress?: string;
  customerName?: string;
  totals: InvoiceTotals;
  totalAmount?: number; // In SAR for UI display
  vatRatePercent: number;
  status: InvoiceStatus;
  issueDate: string;
  invoiceDate?: string;
  startDate?: string;
  endDate?: string;
  dueDate?: string;
  createdAt: string;
  createdBy: string;
  sentToEmail?: string;
}

/**
 * Global invoice stats document: stats/invoices
 */
export interface InvoiceStats {
  totalCount: number;
  totalAmountHalalas: number;
  outstandingAmount: number; // halalas: issued + sent + viewed + uploaded + signed (unpaid)
  paidAmountThisMonth: number; // halalas: paid in current month
  currentMonth?: string; // e.g. '2026-11'
  counts?: Record<InvoiceStatus, number>;
  draftCount: number;
  issuedCount: number;
  sentCount?: number;
  viewedCount?: number;
  uploadedCount?: number;
  signedCount?: number;
  paidCount: number;
  cancelledCount: number;
  updatedAt: string;
}

/**
 * Financial conversion utility functions (pure math)
 */
export function halalasToSar(halalas: number): number {
  return Number((Number(halalas || 0) / 100).toFixed(2));
}

export function sarToHalalas(sar: number): number {
  return Math.round(Number(sar || 0) * 100);
}

export function formatHalalasAsSar(halalas: number, locale = 'en-US'): string {
  const sar = halalasToSar(halalas);
  return sar.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
