import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { adminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type {
  PlatformInvoice,
  PlatformInvoiceSummary,
  InvoiceStats,
  InvoiceStatus,
  InvoiceDocKind,
  InvoiceEvent,
} from '@/lib/types/billing';
import type { PaginatedResult } from '@/lib/types/platform';

export interface GetInvoicesPageParams {
  cursor?: string;
  limit?: number;
  status?: InvoiceStatus;
  q?: string;
}

/**
 * Fetches a paginated slice of invoices using .select() for lightweight summary fields only.
 * Specifically excludes heavy arrays (items, terms) to keep payload small and fast.
 * Cached with 'invoices' tag.
 */
export async function getInvoicesPage({
  cursor,
  limit = 25,
  status,
  q,
}: GetInvoicesPageParams = {}): Promise<PaginatedResult<PlatformInvoiceSummary>> {
  'use cache';
  cacheLife('minutes');
  cacheTag('invoices');

  let query: FirebaseFirestore.Query = adminDb.collection('platform_invoices');

  // Filter by status if requested
  if (status) {
    query = query.where('status', '==', status);
  }

  // Order by createdAt descending
  query = query.orderBy('createdAt', 'desc');

  // Use .select() summary fields only (no items/terms)
  query = query.select(
    'number',
    'docKind',
    'customer',
    'totals',
    'vatRatePercent',
    'status',
    'issueDate',
    'dueDate',
    'createdAt',
    'createdBy'
  );

  if (cursor) {
    const cursorSnap = await adminDb.collection('platform_invoices').doc(cursor).get();
    if (cursorSnap.exists) {
      query = query.startAfter(cursorSnap);
    }
  }

  // Fetch limit + 1 to detect hasMore
  const snapshot = await query.limit(limit + 1).get();
  const rawDocs = snapshot.docs;

  let filteredDocs = rawDocs;
  if (q && q.trim().length > 0) {
    const term = q.trim().toLowerCase();
    filteredDocs = rawDocs.filter((doc) => {
      const data = doc.data();
      const num = String(data.number || '').toLowerCase();
      const facility = String(data.customer?.facilityName || '').toLowerCase();
      const custName = String(data.customer?.name || '').toLowerCase();
      return num.includes(term) || facility.includes(term) || custName.includes(term);
    });
  }

  const hasMore = filteredDocs.length > limit;
  const docs = hasMore ? filteredDocs.slice(0, limit) : filteredDocs;
  const nextCursor = hasMore && docs.length > 0 ? docs[docs.length - 1].id : null;

  const items: PlatformInvoiceSummary[] = docs.map((doc) => {
    const data = doc.data();
    const totalHalalas = Number(data.totals?.total) || 0;
    return {
      id: doc.id,
      number: data.number || null,
      invoiceNumber: data.number || `RX-${doc.id.slice(-4).toUpperCase()}`,
      docKind: (data.docKind as InvoiceDocKind) || 'contract_invoice',
      customer: {
        facilityName: data.customer?.facilityName || '',
        name: data.customer?.name || '',
        phone: data.customer?.phone || undefined,
        email: data.customer?.email || undefined,
        address: data.customer?.address || '',
      },
      facilityName: data.customer?.facilityName || '',
      facilityAddress: data.customer?.address || '',
      customerName: data.customer?.name || '',
      totals: {
        subtotal: Number(data.totals?.subtotal) || 0,
        discount: Number(data.totals?.discount) || 0,
        taxable: Number(data.totals?.taxable) || 0,
        vat: Number(data.totals?.vat) || 0,
        total: totalHalalas,
      },
      totalAmount: totalHalalas / 100, // converted to SAR for UI display
      vatRatePercent: Number(data.vatRatePercent) || 0,
      status: (data.status as InvoiceStatus) || 'draft',
      issueDate: data.issueDate || toIsoString(data.createdAt),
      invoiceDate: data.issueDate || toIsoString(data.createdAt),
      startDate: data.issueDate || toIsoString(data.createdAt),
      endDate: data.dueDate || undefined,
      dueDate: data.dueDate || undefined,
      createdAt: toIsoString(data.createdAt),
      createdBy: data.createdBy || '',
      sentToEmail: data.signing?.sentTo || undefined,
    };
  });

  return {
    items,
    nextCursor,
    hasMore,
  };
}

/**
 * Fetches the complete, full document of an invoice including items, terms, and seller.
 * Cached with 'invoices' and 'invoice:${id}' tags.
 */
export async function getInvoice(id: string): Promise<PlatformInvoice | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('invoices', `invoice:${id}`);

  const doc = await adminDb.collection('platform_invoices').doc(id).get();
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  if (!data) return null;

  return {
    id: doc.id,
    number: data.number || null,
    docKind: (data.docKind as InvoiceDocKind) || 'contract_invoice',
    customer: {
      facilityName: data.customer?.facilityName || '',
      commercialRegNumber: data.customer?.commercialRegNumber || undefined,
      name: data.customer?.name || '',
      address: data.customer?.address || '',
      email: data.customer?.email || undefined,
      phone: data.customer?.phone || undefined,
    },
    items: Array.isArray(data.items)
      ? data.items.map((it: Record<string, unknown>) => ({
          id: String(it.id || ''),
          description: String(it.description || ''),
          quantity: Number(it.quantity) || 1,
          unitPriceHalalas: Number(it.unitPriceHalalas) || 0,
        }))
      : [],
    totals: {
      subtotal: Number(data.totals?.subtotal) || 0,
      discount: Number(data.totals?.discount) || 0,
      taxable: Number(data.totals?.taxable) || 0,
      vat: Number(data.totals?.vat) || 0,
      total: Number(data.totals?.total) || 0,
    },
    vatRatePercent: Number(data.vatRatePercent) || 0,
    currency: 'SAR',
    issueDate: data.issueDate || toIsoString(data.createdAt),
    dueDate: data.dueDate || undefined,
    terms: Array.isArray(data.terms) ? data.terms : [],
    notes: data.notes || undefined,
    seller: data.seller
      ? {
          nameAr: data.seller.nameAr || '',
          nameEn: data.seller.nameEn || '',
          commercialRegNumber: data.seller.commercialRegNumber || '',
          vatNumber: data.seller.vatNumber || undefined,
          address: data.seller.address || '',
          email: data.seller.email || '',
          phone: data.seller.phone || '',
          bankName: data.seller.bankName || '',
          accountName: data.seller.accountName || '',
          iban: data.seller.iban || '',
          disclaimerLine: data.seller.disclaimerLine || undefined,
        }
      : undefined,
    status: (data.status as InvoiceStatus) || 'draft',
    signing: data.signing || undefined,
    pdf: data.pdf || undefined,
    createdAt: toIsoString(data.createdAt),
    updatedAt: toIsoString(data.updatedAt || data.createdAt),
    createdBy: data.createdBy || '',
  };
}

/**
 * Backward compatibility alias for getInvoice(id)
 */
export async function getInvoiceById(id: string): Promise<PlatformInvoice | null> {
  return getInvoice(id);
}

/**
 * Retrieves global invoice statistics from stats/invoices doc.
 * Cached with 'invoices' tag.
 */
export async function getInvoiceStats(): Promise<InvoiceStats> {
  'use cache';
  cacheLife('minutes');
  cacheTag('invoices', 'invoice-stats');

  const doc = await adminDb.collection('stats').doc('invoices').get();
  if (!doc.exists) {
    return {
      totalCount: 0,
      totalAmountHalalas: 0,
      outstandingAmount: 0,
      paidAmountThisMonth: 0,
      draftCount: 0,
      issuedCount: 0,
      sentCount: 0,
      viewedCount: 0,
      uploadedCount: 0,
      signedCount: 0,
      paidCount: 0,
      cancelledCount: 0,
      counts: {
        draft: 0,
        issuing: 0,
        issued: 0,
        sent: 0,
        viewed: 0,
        uploaded: 0,
        signed: 0,
        paid: 0,
        cancelled: 0,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  const data = doc.data()!;
  const rawCounts = (data.counts || {}) as Record<string, number>;

  const draftCount = Number(data.draftCount ?? rawCounts.draft) || 0;
  const issuedCount = Number(data.issuedCount ?? rawCounts.issued) || 0;
  const sentCount = Number(data.sentCount ?? rawCounts.sent) || 0;
  const viewedCount = Number(data.viewedCount ?? rawCounts.viewed) || 0;
  const uploadedCount = Number(data.uploadedCount ?? rawCounts.uploaded) || 0;
  const signedCount = Number(data.signedCount ?? rawCounts.signed) || 0;
  const paidCount = Number(data.paidCount ?? rawCounts.paid) || 0;
  const cancelledCount = Number(data.cancelledCount ?? rawCounts.cancelled) || 0;

  return {
    totalCount: Number(data.totalCount) || 0,
    totalAmountHalalas: Number(data.totalAmountHalalas) || 0,
    outstandingAmount: Number(data.outstandingAmount) || 0,
    paidAmountThisMonth: Number(data.paidAmountThisMonth) || 0,
    currentMonth: data.currentMonth ? String(data.currentMonth) : undefined,
    draftCount,
    issuedCount,
    sentCount,
    viewedCount,
    uploadedCount,
    signedCount,
    paidCount,
    cancelledCount,
    counts: {
      draft: draftCount,
      issuing: 0,
      issued: issuedCount,
      sent: sentCount,
      viewed: viewedCount,
      uploaded: uploadedCount,
      signed: signedCount,
      paid: paidCount,
      cancelled: cancelledCount,
    },
    updatedAt: data.updatedAt ? toIsoString(data.updatedAt) : new Date().toISOString(),
  };
}

/**
 * Retrieves the event timeline for an invoice from platform_invoices/{id}/events.
 * Cached with 'invoices' and `invoice-events:${id}` tags.
 */
export async function getInvoiceEvents(id: string): Promise<InvoiceEvent[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('invoices', `invoice:${id}`, `invoice-events:${id}`);

  const snapshot = await adminDb
    .collection('platform_invoices')
    .doc(id)
    .collection('events')
    .orderBy('at', 'asc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      type: String(data.type || 'UNKNOWN'),
      at: toIsoString(data.at),
      by: String(data.by || 'system'),
      meta: (data.meta as Record<string, unknown>) || undefined,
    };
  });
}
