'use server';

import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { adminDb } from '@/server/firebase-admin';
import { requireAdmin } from '@/server/auth/session';
import type { ActionResponse } from './tenants';
import type { LeadStatus } from '@/lib/types/platform';

const updateLeadStatusSchema = z.object({
  leadId: z.string().trim().min(1, 'معرف الطلب مطلوب'),
  status: z.enum(['new', 'contacted', 'demo_scheduled', 'converted', 'lost'] as const),
});

const convertLeadSchema = z.object({
  leadId: z.string().trim().min(1, 'معرف الطلب مطلوب'),
  subdomain: z
    .string()
    .trim()
    .min(2, 'النطاق الفرعي يجب أن يكون حرفين على الأقل')
    .max(40, 'النطاق الفرعي يجب ألا يتجاوز 40 حرفاً')
    .regex(/^[a-z0-9-]+$/, 'النطاق الفرعي يجب أن يحتوي على أحرف إنجليزية وأرقام وشرطات فقط'),
  plan: z.enum(['Starter', 'Growth', 'Enterprise'] as const).default('Growth'),
  mrr: z.coerce.number().nonnegative().default(1500),
  city: z.string().trim().optional(),
});

export type UpdateLeadStatusInput = z.infer<typeof updateLeadStatusSchema>;
export type ConvertLeadInput = z.infer<typeof convertLeadSchema>;

/**
 * Updates the pipeline status of an inbound lead.
 * Enforces admin authorization, validates inputs with Zod, and atomically writes the status
 * change + audit log in a single WriteBatch.
 */
export async function updateLeadStatus(
  input: UpdateLeadStatusInput
): Promise<ActionResponse<void>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'support_lead', 'sales_director']);

  const validation = updateLeadStatusSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات حالة الطلب غير صالحة',
    };
  }

  const { leadId, status } = validation.data;
  const leadRef = adminDb.collection('leads').doc(leadId);
  const leadSnap = await leadRef.get();

  if (!leadSnap.exists) {
    return { success: false, error: 'الطلب غير موجود في قاعدة البيانات' };
  }

  try {
    const batch = adminDb.batch();

    batch.update(leadRef, {
      status,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'UPDATE_LEAD_STATUS',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        leadId,
        newStatus: status,
      },
      device: 'Platform Server Action',
    });

    const oldStatus = leadSnap.data()?.status as LeadStatus | undefined;
    if (oldStatus !== status) {
      const statsRef = adminDb.collection('stats').doc('platform');
      const statsUpdate: Record<string, unknown> = {
        updatedAt: FieldValue.serverTimestamp(),
      };

      if (oldStatus === 'new') statsUpdate.leadsNew = FieldValue.increment(-1);
      else if (oldStatus === 'converted') statsUpdate.leadsConverted = FieldValue.increment(-1);

      if (status === 'new') statsUpdate.leadsNew = FieldValue.increment(1);
      else if (status === 'converted') statsUpdate.leadsConverted = FieldValue.increment(1);

      batch.set(statsRef, statsUpdate, { merge: true });
    }

    await batch.commit();

    updateTag('leads');
    updateTag('audit');
    updateTag('stats');

    return { success: true };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[Action updateLeadStatus error]:', error);
    return {
      success: false,
      error: error.message || 'فشل تحديث حالة الطلب في قاعدة البيانات',
    };
  }
}

/**
 * Converts a qualified lead into an active Platform tenant.
 * Atomically creates the new salon tenant, updates the lead status to 'converted',
 * and logs the audit event within a single WriteBatch.
 */
export async function convertLead(
  input: ConvertLeadInput
): Promise<ActionResponse<{ tenantId: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer', 'sales_director']);

  const validation = convertLeadSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات تحويل الطلب غير صالحة',
    };
  }

  const { leadId, subdomain, plan, mrr, city } = validation.data;
  const leadRef = adminDb.collection('leads').doc(leadId);
  const leadSnap = await leadRef.get();

  if (!leadSnap.exists) {
    return { success: false, error: 'الطلب المطلوب تحويله غير موجود في قاعدة البيانات' };
  }

  const leadData = leadSnap.data();
  if (!leadData) {
    return { success: false, error: 'تعذر قراءة بيانات الطلب' };
  }

  const cleanSubdomain = subdomain.toLowerCase();
  const tenantId = `tnt_${cleanSubdomain}`;
  const tenantRef = adminDb.collection('tenants').doc(tenantId);

  // 1. Uniqueness check for target subdomain
  const existingDoc = await tenantRef.get();
  if (existingDoc.exists) {
    return {
      success: false,
      error: `النطاق الفرعي (${cleanSubdomain}) محجوز مسبقاً لصالون آخر`,
    };
  }

  const existingQuery = await adminDb
    .collection('tenants')
    .where('subdomain', '==', cleanSubdomain)
    .limit(1)
    .get();

  if (!existingQuery.empty) {
    return {
      success: false,
      error: `النطاق الفرعي (${cleanSubdomain}) محجوز مسبقاً لصالون آخر`,
    };
  }

  try {
    // 2. Atomic WriteBatch: Tenant Creation + Lead Conversion + Audit Log + Stats Hook
    const batch = adminDb.batch();

    // Mark Lead converted
    batch.update(leadRef, {
      status: 'converted',
      convertedTenantId: tenantId,
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Create Tenant
    batch.set(tenantRef, {
      id: tenantId,
      businessName: (leadData.salonName as string) || 'صالون جديد',
      subdomain: cleanSubdomain,
      ownerName: (leadData.ownerName as string) || 'المالك',
      phone: (leadData.phone as string) || '',
      email: (leadData.email as string) || '',
      city: city || (leadData.city as string) || 'الرياض',
      plan,
      mrr,
      branchesCount: 1,
      status: 'active',
      zatcaPhase: 'Pending CSID',
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      sourceLeadId: leadId,
    });

    // Record Audit
    const auditRef = adminDb.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'CONVERT_LEAD',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        leadId,
        tenantId,
        subdomain: cleanSubdomain,
        businessName: leadData.salonName,
        plan,
        mrr,
      },
      device: 'Platform Server Action',
    });

    const oldLeadStatus = leadData?.status as LeadStatus | undefined;
    const statsRef = adminDb.collection('stats').doc('platform');
    const statsUpdate: Record<string, unknown> = {
      tenantsTotal: FieldValue.increment(1),
      tenantsActive: FieldValue.increment(1),
      mrrTotal: FieldValue.increment(mrr),
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (oldLeadStatus === 'new') statsUpdate.leadsNew = FieldValue.increment(-1);
    if (oldLeadStatus !== 'converted') statsUpdate.leadsConverted = FieldValue.increment(1);

    batch.set(statsRef, statsUpdate, { merge: true });

    await batch.commit();

    updateTag('leads');
    updateTag('tenants');
    updateTag('audit');
    updateTag('stats');

    return { success: true, data: { tenantId } };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('[Action convertLead error]:', error);
    return {
      success: false,
      error: error.message || 'فشل تحويل الطلب إلى صالون جديد في قاعدة البيانات',
    };
  }
}

/**
 * Server action to fetch a page of leads with cursor pagination from the data layer.
 */
export async function fetchLeadsPageAction(params?: {
  cursor?: string;
  limit?: number;
  status?: LeadStatus;
}) {
  await requireAdmin();
  const { getLeadsPage } = await import('@/server/data/leads');
  return getLeadsPage(params);
}
