import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { adminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type { RashxAdmin } from '@/lib/types/platform';

/**
 * Fetches all registered platform administrators from Firestore.
 * Explicitly sanitizes and strips any sensitive password credentials.
 * Cached with 'admins' tag and minutes lifetime.
 * Throws on failure to prevent caching transient error states.
 */
export async function getAdmins(): Promise<RashxAdmin[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('admins');

  const snapshot = await adminDb
    .collection('platform_admins')
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      email: (data.email as string) || '',
      name: (data.name as string) || '',
      title: (data.title as string) || '',
      department: (data.department as RashxAdmin['department']) || 'Engineering',
      role: (data.role as RashxAdmin['role']) || 'platform_engineer',
      status: (data.status as RashxAdmin['status']) || 'active',
      phone: (data.phone as string) || '',
      avatar: (data.avatar as string) || '/avatars/animoji-1.webp',
      avatarId: Number(data.avatarId) || 1,
      lastLoginAt: toIsoString(data.lastLoginAt),
      createdAt: toIsoString(data.createdAt),
    };
  });
}
