'use server';

import { updateTag } from 'next/cache';
import { requireAdmin } from '@/server/auth/session';
import { getAdminDb } from '@/server/firebase-admin';

export async function checkDbHealthAction(): Promise<{
  success: boolean;
  latencyMs: number;
  projectId: string;
}> {
  await requireAdmin();
  const start = Date.now();
  try {
    await getAdminDb().collection('platform_admins').limit(1).get();
    const latencyMs = Date.now() - start;
    return {
      success: true,
      latencyMs,
      projectId: process.env.FIREBASE_PROJECT_ID || '',
    };
  } catch {
    const latencyMs = Date.now() - start;
    return {
      success: false,
      latencyMs,
      projectId: process.env.FIREBASE_PROJECT_ID || '',
    };
  }
}

export async function revokeAdminSessionAction(
  sessionId: string
): Promise<{ success: boolean; error?: string }> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);
  try {
    const sessionRef = getAdminDb().collection('admin_sessions').doc(sessionId);
    await sessionRef.set(
      {
        isActive: false,
        revokedAt: new Date().toISOString(),
        revokedBy: admin.email,
      },
      { merge: true }
    );
    updateTag('sessions');
    return { success: true };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return { success: false, error: error.message };
  }
}

