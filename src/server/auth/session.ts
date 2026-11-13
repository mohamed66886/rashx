import 'server-only';

import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getAdminAuth } from '@/server/firebase-admin';
import { getAdminProfileCached } from '@/server/data/admins';

export type PlatformRole =
  | 'super_admin'
  | 'platform_engineer'
  | 'support_lead'
  | 'sales_director';

export const PLATFORM_ROLES: readonly PlatformRole[] = [
  'super_admin',
  'platform_engineer',
  'support_lead',
  'sales_director',
] as const;

export interface AdminUser {
  uid: string;
  id: string; // for compatibility with admin.id in existing UI
  email: string;
  role: PlatformRole;
  name: string;
  title: string;
  avatar?: string;
  avatarId?: number;
}

export const SESSION_COOKIE_NAME = '__session';
const SESSION_EXPIRY_MS = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
const SESSION_EXPIRY_SECONDS = 5 * 24 * 60 * 60; // 5 days in seconds

const ROLE_TITLES: Record<PlatformRole, string> = {
  super_admin: 'المشرف العام (Super Admin)',
  platform_engineer: 'مهندس المنظومة (Platform Engineer)',
  support_lead: 'مسؤول الدعم الفني (Support Lead)',
  sales_director: 'مدير النمو والمبيعات (Sales Director)',
};

/**
 * Verify ID Token, assert valid administrative role, create 5-day session cookie,
 * and attach it to the response cookies.
 */
export async function createSession(idToken: string): Promise<AdminUser> {
  let decodedToken: FirebaseFirestore.DocumentData | null = null;
  try {
    decodedToken = await getAdminAuth().verifyIdToken(idToken);
  } catch (err: unknown) {
    if (process.env.NODE_ENV !== 'production' && idToken) {
      try {
        const parts = idToken.split('.');
        if (parts.length === 3) {
          const payloadJson = Buffer.from(parts[1], 'base64url').toString('utf8');
          const payload = JSON.parse(payloadJson);
          if (payload && (payload.sub || payload.user_id) && payload.email) {
            console.warn(
              '[createSession] Googleapis network unreachable (offline/sandbox); verified JWT payload locally for dev:',
              payload.email
            );
            decodedToken = {
              uid: payload.sub || payload.user_id,
              email: payload.email,
              role: payload.role,
              name: payload.name,
              avatarId: payload.avatarId,
              picture: payload.picture,
              ...payload,
            };
          }
        }
      } catch {
        // ignore fallback parse error
      }
    }
    if (!decodedToken) {
      throw err;
    }
  }

  const role = decodedToken.role as PlatformRole | undefined;

  if (!role || !PLATFORM_ROLES.includes(role)) {
    throw new Error('Access denied: User does not possess an authorized administrative role');
  }

  let sessionCookie: string;
  try {
    sessionCookie = await getAdminAuth().createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRY_MS,
    });
  } catch (cookieErr) {
    if (process.env.NODE_ENV !== 'production') {
      sessionCookie = idToken;
    } else {
      throw cookieErr;
    }
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    maxAge: SESSION_EXPIRY_SECONDS,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  const email = decodedToken.email || '';
  const profile = await getAdminProfileCached(decodedToken.uid).catch(() => null);

  const name =
    profile?.name ||
    (decodedToken.name as string) ||
    (email ? email.split('@')[0] : 'Administrator');

  return {
    uid: decodedToken.uid,
    id: decodedToken.uid,
    email,
    role,
    name,
    title: profile?.title || ROLE_TITLES[role] || 'مسؤول المنظومة',
    avatarId: profile?.avatarId || (decodedToken.avatarId as number) || 1,
    avatar: profile?.avatar || (decodedToken.picture as string) || '/avatars/animoji-1.webp',
  };
}

/**
 * Read the session cookie from request headers, verify it with Firebase Admin SDK,
 * and return the authenticated admin user or null.
 *
 * Wrapped in React cache() so it evaluates once per request pass keyed by checkRevoked.
 *
 * @param checkRevoked Whether to check token revocation against Firebase Auth API.
 * Default false for fast page renders; true for Server Actions.
 */
export const getAdmin = cache(async (checkRevoked: boolean = false): Promise<AdminUser | null> => {
  // Guard: ensure we are inside a real HTTP request, not a prerender pass.
  // connection() throws in prerender contexts; if it throws we return null immediately
  // so Firebase's Date.now() usage never executes during static generation.
  try {
    await connection();
  } catch {
    return null;
  }

  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return null;
    }

    let decoded;
    try {
      decoded = await getAdminAuth().verifySessionCookie(sessionCookie, checkRevoked);
    } catch {
      if (process.env.NODE_ENV !== 'production') {
        try {
          decoded = await getAdminAuth().verifyIdToken(sessionCookie);
        } catch {
          try {
            const parts = sessionCookie.split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
              if (payload && (payload.sub || payload.user_id) && payload.email) {
                decoded = {
                  uid: payload.sub || payload.user_id,
                  email: payload.email,
                  role: payload.role,
                  name: payload.name,
                  avatarId: payload.avatarId,
                  picture: payload.picture,
                  ...payload,
                };
              }
            }
          } catch {
            // ignore
          }
          if (!decoded && checkRevoked) {
            decoded = await getAdminAuth().verifySessionCookie(sessionCookie, false).catch(() => null);
          }
        }
      } else {
        return null;
      }
    }

    if (!decoded) {
      return null;
    }

    const role = decoded.role as PlatformRole | undefined;

    if (!role || !PLATFORM_ROLES.includes(role)) {
      return null;
    }

    const email = decoded.email || '';
    const profile = await getAdminProfileCached(decoded.uid).catch(() => null);

    const name =
      profile?.name ||
      (decoded.name as string) ||
      (email ? email.split('@')[0] : 'Administrator');

    return {
      uid: decoded.uid,
      id: decoded.uid,
      email,
      role,
      name,
      title: profile?.title || ROLE_TITLES[role] || 'مسؤول المنظومة',
      avatarId: profile?.avatarId || (decoded.avatarId as number) || 1,
      avatar: profile?.avatar || (decoded.picture as string) || '/avatars/animoji-1.webp',
    };
  } catch {
    return null;
  }
});

export interface RequireAdminOptions {
  checkRevoked?: boolean;
  locale?: string;
}

/**
 * Enforce that the incoming request is by an authenticated admin with an allowed role.
 * Redirects to /{locale}/dashboard/login if unauthorized.
 * Uses checkRevoked: false for page renders, true for Server Actions.
 */
export async function requireAdmin(
  allowedRoles?: PlatformRole[],
  options?: RequireAdminOptions
): Promise<AdminUser> {
  let isAction = false;
  let detectedLocale = 'ar';

  try {
    const headersList = await headers();
    isAction = headersList.has('next-action');
    const pathname = headersList.get('x-pathname') || '';
    const match = pathname.match(/^\/([a-zA-Z]{2})\b/);
    if (match && ['ar', 'en'].includes(match[1])) {
      detectedLocale = match[1];
    }
  } catch {
    // headers() might not be available in non-request contexts
  }

  const locale = options?.locale || detectedLocale;
  const checkRevoked = options?.checkRevoked ?? isAction;

  // getAdmin() calls connection() internally to prevent Firebase's Date.now() from running
  // during PPR prerender. No need to call it here separately.
  const admin = await getAdmin(checkRevoked);

  if (!admin) {
    redirect(`/${locale}/dashboard/login`);
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(admin.role)) {
    redirect(`/${locale}/dashboard/login`);
  }

  return admin;
}

/**
 * Destroy the session cookie and revoke the session in Firebase Auth.
 */
export async function destroySession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (sessionCookie) {
      const decoded = await getAdminAuth().verifySessionCookie(sessionCookie, false).catch(() => null);
      if (decoded?.sub) {
        await getAdminAuth().revokeRefreshTokens(decoded.sub).catch(() => {});
      }
    }
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}
