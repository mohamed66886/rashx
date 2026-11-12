import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { adminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type { PlatformInvoice, PaginatedResult } from '@/lib/types/platform';

export interface GetInvoicesPageParams {
  cursor?: string;
  limit?: number;
  status?: 'paid' | 'unpaid' | 'draft' | 'cancelled';
}

/**
 * Fetches a paginated slice of issued invoices ordered by creation timestamp descending.
 * Cached with 'invoices' tag and minutes lifetime.
 */
export async function getInvoicesPage({
  cursor,
  limit = 25,
  status,
}: GetInvoicesPageParams = {}): Promise<PaginatedResult<PlatformInvoice>> {
  'use cache';
  cacheLife('minutes');
  cacheTag('invoices');

  let query: FirebaseFirestore.Query = adminDb.collection('platform_invoices');

  if (status) {
    query = query.where('status', '==', status);
  }

  query = query.orderBy('createdAt', 'desc').limit(limit + 1);

  if (cursor) {
    const cursorSnap = await adminDb.collection('platform_invoices').doc(cursor).get();
    if (cursorSnap.exists) {
      query = query.startAfter(cursorSnap);
    }
  }

  const snapshot = await query.get();
  const hasMore = snapshot.docs.length > limit;
  const docs = hasMore ? snapshot.docs.slice(0, limit) : snapshot.docs;
  const nextCursor = hasMore && docs.length > 0 ? docs[docs.length - 1].id : null;

  const items: PlatformInvoice[] = docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      invoiceNumber: data.invoiceNumber || `RX-${doc.id.slice(-4).toUpperCase()}`,
      facilityName: data.facilityName || '',
      facilityAddress: data.facilityAddress || '',
      invoiceDate: data.invoiceDate || toIsoString(data.createdAt),
      startDate: data.startDate || data.invoiceDate || toIsoString(data.createdAt),
      endDate: data.endDate || '',
      planName: data.planName || 'باقة راش إكس المتكاملة لإدارة الصالونات',
      paymentDetails: data.paymentDetails || '',
      dueDate: data.dueDate,
      tenantId: data.tenantId,
      customerName: data.customerName || '',
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      taxNumber: data.taxNumber || '300000000000003',
      commercialReg: data.commercialReg || '',
      items: Array.isArray(data.items) ? data.items : [],
      subtotal: Number(data.subtotal) || 0,
      discount: Number(data.discount) || 0,
      taxableAmount: Number(data.taxableAmount) || 0,
      vatRate: Number(data.vatRate) || 0.15,
      vatAmount: Number(data.vatAmount) || 0,
      totalAmount: Number(data.totalAmount) || 0,
      paymentMethod: data.paymentMethod || 'mada',
      status: data.status || 'paid',
      notes: data.notes || '',
      sentToEmail: data.sentToEmail,
      sentAt: data.sentAt ? toIsoString(data.sentAt) : undefined,
      createdAt: toIsoString(data.createdAt),
      updatedAt: data.updatedAt ? toIsoString(data.updatedAt) : undefined,
    };
  });

  return {
    items,
    nextCursor,
    hasMore,
  };
}

/**
 * Retrieves a single invoice document by ID.
 */
export async function getInvoiceById(id: string): Promise<PlatformInvoice | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('invoices');

  const doc = await adminDb.collection('platform_invoices').doc(id).get();
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  if (!data) return null;

  return {
    id: doc.id,
    invoiceNumber: data.invoiceNumber || `RX-${doc.id.slice(-4).toUpperCase()}`,
    facilityName: data.facilityName || '',
    facilityAddress: data.facilityAddress || '',
    invoiceDate: data.invoiceDate || toIsoString(data.createdAt),
    startDate: data.startDate || data.invoiceDate || toIsoString(data.createdAt),
    endDate: data.endDate || '',
    planName: data.planName || 'باقة راش إكس المتكاملة لإدارة الصالونات',
    paymentDetails: data.paymentDetails || '',
    dueDate: data.dueDate,
    tenantId: data.tenantId,
    customerName: data.customerName || '',
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail,
    taxNumber: data.taxNumber || '300000000000003',
    commercialReg: data.commercialReg || '',
    items: Array.isArray(data.items) ? data.items : [],
    subtotal: Number(data.subtotal) || 0,
    discount: Number(data.discount) || 0,
    taxableAmount: Number(data.taxableAmount) || 0,
    vatRate: Number(data.vatRate) || 0.15,
    vatAmount: Number(data.vatAmount) || 0,
    totalAmount: Number(data.totalAmount) || 0,
    paymentMethod: data.paymentMethod || 'mada',
    status: data.status || 'paid',
    notes: data.notes || '',
    sentToEmail: data.sentToEmail,
    sentAt: data.sentAt ? toIsoString(data.sentAt) : undefined,
    createdAt: toIsoString(data.createdAt),
    updatedAt: data.updatedAt ? toIsoString(data.updatedAt) : undefined,
  };
}

