import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { getAdminDb } from '@/server/firebase-admin';
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

  const snapshot = await getAdminDb()
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

export interface AdminProfileData {
  name?: string;
  title?: string;
  avatar?: string;
  avatarId?: number;
}

/**
 * Fetches an individual admin profile from Firestore by UID.
 * Cached per-admin with 'admin:${uid}' tag to minimize Firestore reads during navigation.
 */
export async function getAdminProfileCached(
  uid: string
): Promise<AdminProfileData | null> {
  'use cache';
  cacheLife('minutes');
  cacheTag(`admin:${uid}`);

  try {
    const db = getAdminDb();
    const docSnap = await db.collection('platform_admins').doc(uid).get();
    if (docSnap.exists) {
      const data = docSnap.data();
      return {
        name: data?.name as string | undefined,
        title: data?.title as string | undefined,
        avatar: (data?.avatar as string) || undefined,
        avatarId: typeof data?.avatarId === 'number' ? data.avatarId : undefined,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetches an individual admin profile from Firestore by UID or email.
 * Cached with 'admins' tag to minimize Firestore reads during navigation.
 */
export async function getAdminProfile(
  uid: string,
  email: string
): Promise<AdminProfileData | null> {
  'use cache';
  cacheLife('minutes');
  cacheTag('admins');

  try {
    const db = getAdminDb();
    const docSnap = await db.collection('platform_admins').doc(uid).get();
    if (docSnap.exists) {
      const data = docSnap.data();
      return {
        name: data?.name as string | undefined,
        title: data?.title as string | undefined,
        avatar: (data?.avatar as string) || undefined,
        avatarId: typeof data?.avatarId === 'number' ? data.avatarId : undefined,
      };
    }

    if (email) {
      const querySnap = await db
        .collection('platform_admins')
        .where('email', '==', email)
        .limit(1)
        .get();

      if (!querySnap.empty) {
        const data = querySnap.docs[0].data();
        return {
          name: data?.name as string | undefined,
          title: data?.title as string | undefined,
          avatar: (data?.avatar as string) || undefined,
          avatarId: typeof data?.avatarId === 'number' ? data.avatarId : undefined,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

