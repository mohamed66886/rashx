'use server';

import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { getAdminDb } from '@/server/firebase-admin';
import { requireAdmin } from '@/server/auth/session';

const createTenantSchema = z.object({
  businessName: z.string().trim().min(2, 'اسم المنشأة يجب أن يكون حرفين على الأقل'),
  subdomain: z
    .string()
    .trim()
    .min(2, 'النطاق الفرعي يجب أن يكون حرفين على الأقل')
    .max(40, 'النطاق الفرعي يجب ألا يتجاوز 40 حرفاً')
    .regex(/^[a-z0-9-]+$/, 'النطاق الفرعي يجب أن يحتوي على أحرف إنجليزية وأرقام وشرطات فقط'),
  ownerName: z.string().trim().min(2, 'اسم المالك يجب أن يكون حرفين على الأقل'),
  phone: z.string().trim().min(5, 'رقم الهاتف غير صالح'),
  email: z.string().trim().email('البريد الإلكتروني غير صالح'),
  city: z.string().trim().min(2, 'المدينة مطلوبة'),
  plan: z.enum(['Starter', 'Growth', 'Enterprise'] as const).default('Starter'),
  mrr: z.coerce.number().nonnegative().default(0),
  branchesCount: z.coerce.number().int().positive().default(1),
  status: z.enum(['active', 'trial', 'suspended'] as const).default('trial'),
  zatcaPhase: z.enum(['Phase 2 Onboarded', 'Pending CSID', 'Exempt'] as const).default('Exempt'),
});

const updateTenantStatusSchema = z.object({
  tenantId: z.string().trim().min(1, 'معرف الصالون مطلوب'),
  status: z.enum(['active', 'trial', 'suspended'] as const),
});

const deleteTenantSchema = z.object({
  tenantId: z.string().trim().min(1, 'معرف الصالون مطلوب'),
});

export type CreateTenantInput = z.infer<typeof createTenantSchema>;
export type UpdateTenantStatusInput = z.infer<typeof updateTenantStatusSchema>;
export type DeleteTenantInput = z.infer<typeof deleteTenantSchema>;

export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Provisions a new salon tenant.
 * Enforces admin authorization, validates inputs with Zod, checks subdomain uniqueness,
 * and atomically writes the tenant + audit log + stats hook in a single WriteBatch.
 */
export async function createTenant(input: CreateTenantInput): Promise<ActionResponse<{ id: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const validation = createTenantSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات الصالون المدخلة غير صالحة',
    };
  }

  const data = validation.data;
  const cleanSubdomain = data.subdomain.toLowerCase();
  const tenantId = `tnt_${cleanSubdomain}`;
  const tenantRef = getAdminDb().collection('tenants').doc(tenantId);

  // 1. Server-side tenant subdomain uniqueness check
  const existingDoc = await tenantRef.get();
  if (existingDoc.exists) {
    return {
      success: false,
      error: `النطاق الفرعي (${cleanSubdomain}) محجوز مسبقاً لصالون آخر`,
    };
  }

  const existingByQuery = await getAdminDb()
    .collection('tenants')
    .where('subdomain', '==', cleanSubdomain)
    .limit(1)
    .get();

  if (!existingByQuery.empty) {
    return {
      success: false,
      error: `النطاق الفرعي (${cleanSubdomain}) محجوز مسبقاً لصالون آخر`,
    };
  }

  try {
    // 2. Atomic WriteBatch: Tenant + Audit Log + Stats Hook
    const batch = getAdminDb().batch();

    batch.set(tenantRef, {
      id: tenantId,
      businessName: data.businessName,
      subdomain: cleanSubdomain,
      ownerName: data.ownerName,
      phone: data.phone,
      email: data.email,
      city: data.city,
      plan: data.plan,
      mrr: data.mrr,
      branchesCount: data.branchesCount,
      status: data.status,
      zatcaPhase: data.zatcaPhase,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    const auditRef = getAdminDb().collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'PROVISION_TENANT',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        tenantId,
        subdomain: cleanSubdomain,
        businessName: data.businessName,
        plan: data.plan,
        mrr: data.mrr,
      },
      device: 'Platform Server Action',
    });

    // 3. Platform stats aggregation update
    const statsRef = getAdminDb().collection('stats').doc('platform');
    const statusField =
      data.status === 'active'
        ? 'tenantsActive'
        : data.status === 'trial'
        ? 'tenantsTrial'
        : 'tenantsSuspended';

    batch.set(
      statsRef,
      {
        tenantsTotal: FieldValue.increment(1),
        [statusField]: FieldValue.increment(1),
        mrrTotal: FieldValue.increment(data.mrr),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await batch.commit();

    updateTag('tenants');
    updateTag('audit');
    updateTag('stats');

    return { success: true, data: { id: tenantId } };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[Action createTenant error]:', error);
    return {
      success: false,
      error: error.message || 'فشل حفظ الصالون في قاعدة البيانات',
    };
  }
}

/**
 * Updates a tenant's lifecycle status.
 * Enforces admin authorization, validates inputs with Zod, and atomically writes the status
 * change + audit log in a single WriteBatch.
 */
export async function updateTenantStatus(
  input: UpdateTenantStatusInput
): Promise<ActionResponse<void>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);

  const validation = updateTenantStatusSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات الحالة المدخلة غير صالحة',
    };
  }

  const { tenantId, status } = validation.data;
  const tenantRef = getAdminDb().collection('tenants').doc(tenantId);
  const tenantSnap = await tenantRef.get();

  if (!tenantSnap.exists) {
    return { success: false, error: 'الصالون المطلوب غير موجود في قاعدة البيانات' };
  }

  try {
    const batch = getAdminDb().batch();

    batch.update(tenantRef, {
      status,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const auditRef = getAdminDb().collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: status === 'suspended' ? 'SUSPEND_TENANT' : 'UPDATE_TENANT',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        tenantId,
        newStatus: status,
      },
      device: 'Platform Server Action',
    });

    const oldStatus = tenantSnap.data()?.status as 'active' | 'trial' | 'suspended' | undefined;
    if (oldStatus !== status) {
      const statsRef = getAdminDb().collection('stats').doc('platform');
      const statsUpdate: Record<string, unknown> = {
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (oldStatus === 'active') statsUpdate.tenantsActive = FieldValue.increment(-1);
      else if (oldStatus === 'trial') statsUpdate.tenantsTrial = FieldValue.increment(-1);
      else if (oldStatus === 'suspended') statsUpdate.tenantsSuspended = FieldValue.increment(-1);

      if (status === 'active') statsUpdate.tenantsActive = FieldValue.increment(1);
      else if (status === 'trial') statsUpdate.tenantsTrial = FieldValue.increment(1);
      else if (status === 'suspended') statsUpdate.tenantsSuspended = FieldValue.increment(1);

      batch.set(statsRef, statsUpdate, { merge: true });
    }

    await batch.commit();

    updateTag('tenants');
    updateTag('audit');
    updateTag('stats');

    return { success: true };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[Action updateTenantStatus error]:', error);
    return {
      success: false,
      error: error.message || 'فشل تحديث حالة الصالون في قاعدة البيانات',
    };
  }
}

/**
 * Deletes a tenant from the platform.
 * Enforces admin authorization, validates inputs with Zod, and atomically removes the record
 * while writing the audit log in a single WriteBatch.
 */
export async function deleteTenant(input: DeleteTenantInput): Promise<ActionResponse<void>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);

  const validation = deleteTenantSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'معرف الصالون غير صالح',
    };
  }

  const { tenantId } = validation.data;
  const tenantRef = getAdminDb().collection('tenants').doc(tenantId);
  const tenantSnap = await tenantRef.get();

  if (!tenantSnap.exists) {
    return { success: false, error: 'الصالون المطلوب غير موجود في قاعدة البيانات' };
  }

  const tenantData = tenantSnap.data();

  try {
    const batch = getAdminDb().batch();

    batch.delete(tenantRef);

    const auditRef = getAdminDb().collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'DELETE_TENANT',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        tenantId,
        subdomain: tenantData?.subdomain,
        businessName: tenantData?.businessName,
      },
      device: 'Platform Server Action',
    });

    const oldStatus = tenantData?.status as 'active' | 'trial' | 'suspended' | undefined;
    const oldMrr = Number(tenantData?.mrr) || 0;

    const statsRef = getAdminDb().collection('stats').doc('platform');
    const statsUpdate: Record<string, unknown> = {
      tenantsTotal: FieldValue.increment(-1),
      mrrTotal: FieldValue.increment(-oldMrr),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (oldStatus === 'active') statsUpdate.tenantsActive = FieldValue.increment(-1);
    else if (oldStatus === 'trial') statsUpdate.tenantsTrial = FieldValue.increment(-1);
    else if (oldStatus === 'suspended') statsUpdate.tenantsSuspended = FieldValue.increment(-1);

    batch.set(statsRef, statsUpdate, { merge: true });

    await batch.commit();

    updateTag('tenants');
    updateTag('audit');
    updateTag('stats');

    return { success: true };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[Action deleteTenant error]:', error);
    return {
      success: false,
      error: error.message || 'فشل حذف الصالون من قاعدة البيانات',
    };
  }
}

/**
 * Server action to fetch a page of tenants with cursor pagination from the data layer.
 */
export async function fetchTenantsPageAction(params?: {
  cursor?: string;
  limit?: number;
  status?: 'active' | 'trial' | 'suspended';
}) {
  await requireAdmin();
  const { getTenantsPage } = await import('@/server/data/tenants');
  return getTenantsPage(params);
}
