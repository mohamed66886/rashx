'use server';

import { redirect } from 'next/navigation';
import { createSession, destroySession, type AdminUser } from '@/server/auth/session';

export async function loginAction(
  idToken: string
): Promise<{ success: boolean; error?: string; admin?: AdminUser }> {
  try {
    if (!idToken) {
      return { success: false, error: 'Missing ID token' };
    }
    const admin = await createSession(idToken);
    return { success: true, admin };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[Platform Auth] loginAction failed:', error.message);
    return {
      success: false,
      error:
        error.message ||
        'فشل تسجيل الدخول. تأكد من صحة البريد الإلكتروني وامتلاك صلاحيات الإدارة.',
    };
  }
}

export async function logoutAction(): Promise<{ success: boolean }> {
  await destroySession();
  redirect('/ar/dashboard/login');
}
