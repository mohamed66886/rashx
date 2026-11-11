import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { adminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type { SalonTenant, PaginatedResult } from '@/lib/types/platform';

export interface GetTenantsPageParams {
  cursor?: string;
  limit?: number;
  status?: 'active' | 'trial' | 'suspended';
}

/**
 * Fetches a paginated slice of registered salon tenants ordered by creation time descending.
 * Cached with 'tenants' tag and minutes lifetime.
 */
export async function getTenantsPage({
  cursor,
  limit = 25,
  status,
}: GetTenantsPageParams = {}): Promise<PaginatedResult<SalonTenant>> {
  'use cache';
  cacheLife('minutes');
  cacheTag('tenants');

  try {
    let query: FirebaseFirestore.Query = adminDb.collection('tenants');

    if (status) {
      query = query.where('status', '==', status);
    }

    query = query.orderBy('createdAt', 'desc').limit(limit + 1);

    if (cursor) {
      const cursorSnap = await adminDb.collection('tenants').doc(cursor).get();
      if (cursorSnap.exists) {
        query = query.startAfter(cursorSnap);
      }
    }

    const snapshot = await query.get();
    const hasMore = snapshot.docs.length > limit;
    const docs = hasMore ? snapshot.docs.slice(0, limit) : snapshot.docs;
    const nextCursor = hasMore && docs.length > 0 ? docs[docs.length - 1].id : null;

    const items: SalonTenant[] = docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        businessName: (data.businessName as string) || '',
        subdomain: (data.subdomain as string) || '',
        ownerName: (data.ownerName as string) || '',
        phone: (data.phone as string) || '',
        email: (data.email as string) || '',
        city: (data.city as string) || '',
        plan: (data.plan as SalonTenant['plan']) || 'Starter',
        mrr: Number(data.mrr) || 0,
        branchesCount: Number(data.branchesCount) || 1,
        status: (data.status as SalonTenant['status']) || 'trial',
        zatcaPhase: (data.zatcaPhase as SalonTenant['zatcaPhase']) || 'Exempt',
        createdAt: toIsoString(data.createdAt),
        updatedAt: toIsoString(data.updatedAt),
      };
    });

    return {
      items,
      nextCursor,
      hasMore,
    };
  } catch (err) {
    console.warn('[getTenantsPage fallback]:', err);
    return {
      items: [],
      nextCursor: null,
      hasMore: false,
    };
  }
}

/**
 * Fetches a single tenant document by ID.
 * Cached with 'tenants' tag and minutes lifetime.
 */
export async function getTenant(id: string): Promise<SalonTenant | null> {
  'use cache';
  cacheLife('minutes');
  cacheTag('tenants');

  try {
    const doc = await adminDb.collection('tenants').doc(id).get();
    if (!doc.exists) {
      return null;
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      businessName: (data.businessName as string) || '',
      subdomain: (data.subdomain as string) || '',
      ownerName: (data.ownerName as string) || '',
      phone: (data.phone as string) || '',
      email: (data.email as string) || '',
      city: (data.city as string) || '',
      plan: (data.plan as SalonTenant['plan']) || 'Starter',
      mrr: Number(data.mrr) || 0,
      branchesCount: Number(data.branchesCount) || 1,
      status: (data.status as SalonTenant['status']) || 'trial',
      zatcaPhase: (data.zatcaPhase as SalonTenant['zatcaPhase']) || 'Exempt',
      createdAt: toIsoString(data.createdAt),
      updatedAt: toIsoString(data.updatedAt),
    };
  } catch (err) {
    console.warn('[getTenant fallback]:', err);
    return null;
  }
}
