'use server';

import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { adminDb, adminAuth } from '@/server/firebase-admin';
import { requireAdmin } from '@/server/auth/session';

const updateAdminAvatarSchema = z.object({
  avatarId: z.coerce.number().int().min(1, 'معرف الأفاتار يجب أن يكون 1 على الأقل').max(200, 'معرف الأفاتار غير صالح'),
  customUrl: z.string().trim().optional(),
});

export type UpdateAdminAvatarInput = z.infer<typeof updateAdminAvatarSchema>;

export interface UpdateAdminAvatarResponse {
  success: boolean;
  avatarId?: number;
  avatar?: string;
  error?: string;
}

/**
 * Updates the administrator's avatar in Firestore collection 'platform_admins',
 * persists custom user claims in Firebase Auth, logs the change in 'platform_audit_logs',
 * and purges the 'admins' cache tag.
 */
export async function updateAdminAvatarAction(
  input: UpdateAdminAvatarInput
): Promise<UpdateAdminAvatarResponse> {
  const admin = await requireAdmin();

  const validation = updateAdminAvatarSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات الأفاتار غير صالحة',
    };
  }

  const { avatarId, customUrl } = validation.data;
  const avatarUrl = customUrl?.trim() || `/avatars/animoji-${avatarId}.webp`;

  try {
    // 1. Locate the admin record in Firestore
    const adminRef = adminDb.collection('platform_admins').doc(admin.uid);
    const docSnap = await adminRef.get();
    let targetRef = adminRef;

    if (!docSnap.exists) {
      const querySnap = await adminDb
        .collection('platform_admins')
        .where('email', '==', admin.email)
        .limit(1)
        .get();

      if (!querySnap.empty) {
        targetRef = querySnap.docs[0].ref;
      }
    }

    // 2. Atomic WriteBatch: Update Admin Record + Audit Log
    const batch = adminDb.batch();

    batch.set(
      targetRef,
      {
        id: admin.uid,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        avatarId,
        avatar: avatarUrl,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'UPDATE_ADMIN_AVATAR',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        previousAvatarId: admin.avatarId,
        newAvatarId: avatarId,
        avatarUrl,
      },
      device: 'Platform HQ Session',
    });

    await batch.commit();

    // 3. Update Firebase Auth Custom Claims for instant token session synchronization
    try {
      const userRecord = await adminAuth.getUser(admin.uid);
      await adminAuth.setCustomUserClaims(admin.uid, {
        ...(userRecord.customClaims || {}),
        avatarId,
        picture: avatarUrl,
      });
    } catch (claimErr) {
      console.warn('[updateAdminAvatarAction] Notice: Custom claims update bypassed:', claimErr);
    }

    // 4. Invalidate server cache tag
    updateTag('admins');

    return {
      success: true,
      avatarId,
      avatar: avatarUrl,
    };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[Platform Actions] updateAdminAvatarAction failed:', error.message);
    return {
      success: false,
      error: 'فشل حفظ الأفاتار في قاعدة البيانات. يرجى المحاولة مرة أخرى.',
    };
  }
}

