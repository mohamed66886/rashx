import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { adminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type { PlatformStats } from '@/lib/types/platform';

const DEFAULT_STATS: PlatformStats = {
  tenantsTotal: 0,
  tenantsActive: 0,
  tenantsTrial: 0,
  tenantsSuspended: 0,
  mrrTotal: 0,
  leadsTotal: 0,
  leadsNew: 0,
  leadsConverted: 0,
  updatedAt: new Date(0).toISOString(),
};

/**
 * Fetches the aggregated platform statistics document (stats/platform).
 * Cached with 'stats' tag and minutes lifetime.
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  'use cache';
  cacheLife('minutes');
  cacheTag('stats');

  try {
    const doc = await adminDb.collection('stats').doc('platform').get();
    if (!doc.exists) {
      return DEFAULT_STATS;
    }

    const data = doc.data()!;
    return {
      tenantsTotal: Number(data.tenantsTotal) || 0,
      tenantsActive: Number(data.tenantsActive) || 0,
      tenantsTrial: Number(data.tenantsTrial) || 0,
      tenantsSuspended: Number(data.tenantsSuspended) || 0,
      mrrTotal: Number(data.mrrTotal) || 0,
      leadsTotal: Number(data.leadsTotal) || 0,
      leadsNew: Number(data.leadsNew) || 0,
      leadsConverted: Number(data.leadsConverted) || 0,
      updatedAt: toIsoString(data.updatedAt) || new Date().toISOString(),
    };
  } catch (err) {
    console.warn('[getPlatformStats fallback]:', err);
    return DEFAULT_STATS;
  }
}

