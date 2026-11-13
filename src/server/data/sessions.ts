import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { getAdminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';

export interface AdminSessionRecord {
  id: string;
  name: string;
  email: string;
  device: string;
  isActive: boolean;
  createdAt: string;
  expiresAt: string;
}

/**
 * Fetches active administrative sessions.
 * Cached with 'sessions' tag and minutes lifetime.
 * Throws on failure to prevent caching transient error states.
 */
export async function getAdminSessions(): Promise<AdminSessionRecord[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('sessions');

  const snap = await getAdminDb()
    .collection('admin_sessions')
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();

  return snap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: (data.name as string) || (data.email as string)?.split('@')[0] || 'Administrator',
      email: (data.email as string) || '',
      device: (data.device as string) || 'Admin Gateway',
      isActive: data.isActive !== false,
      createdAt: toIsoString(data.createdAt),
      expiresAt: toIsoString(data.expiresAt),
    };
  });
}
