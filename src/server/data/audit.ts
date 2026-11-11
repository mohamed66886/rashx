import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { adminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type { PlatformAuditLog, PaginatedResult } from '@/lib/types/platform';

export interface GetAuditLogsPageParams {
  cursor?: string;
  limit?: number;
}

/**
 * Fetches a paginated slice of platform audit trail records ordered by timestamp descending.
 * Cached with 'audit' tag and minutes lifetime.
 * Throws on failure to prevent caching transient error states.
 */
export async function getAuditLogsPage({
  cursor,
  limit = 25,
}: GetAuditLogsPageParams = {}): Promise<PaginatedResult<PlatformAuditLog>> {
  'use cache';
  cacheLife('minutes');
  cacheTag('audit');

  let query: FirebaseFirestore.Query = adminDb
    .collection('platform_audit_logs')
    .orderBy('timestamp', 'desc')
    .limit(limit + 1);

  if (cursor) {
    const cursorSnap = await adminDb.collection('platform_audit_logs').doc(cursor).get();
    if (cursorSnap.exists) {
      query = query.startAfter(cursorSnap);
    }
  }

  const snapshot = await query.get();
  const hasMore = snapshot.docs.length > limit;
  const docs = hasMore ? snapshot.docs.slice(0, limit) : snapshot.docs;
  const nextCursor = hasMore && docs.length > 0 ? docs[docs.length - 1].id : null;

  const items: PlatformAuditLog[] = docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      adminId: (data.adminId as string) || '',
      adminEmail: (data.adminEmail as string) || '',
      action: data.action as PlatformAuditLog['action'],
      timestamp: toIsoString(data.timestamp),
      details: (data.details as Record<string, unknown>) || {},
      device: (data.device as string) || 'Admin Gateway',
    };
  });

  return {
    items,
    nextCursor,
    hasMore,
  };
}
