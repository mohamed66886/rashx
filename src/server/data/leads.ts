import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { getAdminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type { PlatformLead, PaginatedResult, LeadStatus } from '@/lib/types/platform';

export interface GetLeadsPageParams {
  cursor?: string;
  limit?: number;
  status?: LeadStatus;
}

/**
 * Fetches a paginated slice of inbound platform leads ordered by submission time descending.
 * Cached with 'leads' tag and minutes lifetime.
 * Throws on failure to prevent caching transient error states.
 */
export async function getLeadsPage({
  cursor,
  limit = 25,
  status,
}: GetLeadsPageParams = {}): Promise<PaginatedResult<PlatformLead>> {
  'use cache';
  cacheLife('minutes');
  cacheTag('leads');

  let query: FirebaseFirestore.Query = getAdminDb().collection('leads');

  if (status) {
    query = query.where('status', '==', status);
  }

  query = query.orderBy('submittedAt', 'desc').limit(limit + 1);

  if (cursor) {
    const cursorSnap = await getAdminDb().collection('leads').doc(cursor).get();
    if (cursorSnap.exists) {
      query = query.startAfter(cursorSnap);
    }
  }

  const snapshot = await query.get();
  const hasMore = snapshot.docs.length > limit;
  const docs = hasMore ? snapshot.docs.slice(0, limit) : snapshot.docs;
  const nextCursor = hasMore && docs.length > 0 ? docs[docs.length - 1].id : null;

  const items: PlatformLead[] = docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      salonName: (data.salonName as string) || '',
      ownerName: (data.ownerName as string) || '',
      phone: (data.phone as string) || '',
      email: (data.email as string) || '',
      city: (data.city as string) || '',
      status: (data.status as LeadStatus) || 'new',
      source: (data.source as string) || 'Website',
      submittedAt: toIsoString(data.submittedAt),
    };
  });

  return {
    items,
    nextCursor,
    hasMore,
  };
}
