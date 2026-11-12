import 'server-only';

import { cookies, headers } from 'next/headers';
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/server/firebase-admin';
import { getAdminProfile } from '@/server/data/admins';

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
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  const role = decodedToken.role as PlatformRole | undefined;

  if (!role || !PLATFORM_ROLES.includes(role)) {
    throw new Error('Access denied: User does not possess an authorized administrative role');
  }

  let sessionCookie: string;
  try {
    sessionCookie = await adminAuth.createSessionCookie(idToken, {
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
  const profile = await getAdminProfile(decodedToken.uid, email).catch(() => null);

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
 * IMPORTANT: Callers MUST await connection() before calling this function to prevent
 * Firebase's verifySessionCookie (which uses Date.now()) from running during PPR prerender.
 *
 * @param checkRevoked Whether to check token revocation against Firebase Auth API.
 * Default false for fast page renders; true for Server Actions.
 */
export async function getAdmin(checkRevoked: boolean = false): Promise<AdminUser | null> {
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
      decoded = await adminAuth.verifySessionCookie(sessionCookie, checkRevoked);
    } catch {
      if (process.env.NODE_ENV !== 'production') {
        try {
          decoded = await adminAuth.verifyIdToken(sessionCookie);
        } catch {
          if (checkRevoked) {
            decoded = await adminAuth.verifySessionCookie(sessionCookie, false).catch(() => null);
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
    const profile = await getAdminProfile(decoded.uid, email).catch(() => null);

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
}

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
      const decoded = await adminAuth.verifySessionCookie(sessionCookie, false).catch(() => null);
      if (decoded?.sub) {
        await adminAuth.revokeRefreshTokens(decoded.sub).catch(() => {});
      }
    }
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  }
}
