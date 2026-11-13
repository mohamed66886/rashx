'use server';

import { updateTag } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/server/firebase-admin';
import { requireAdmin } from '@/server/auth/session';
import type { ContractClause } from '@/lib/types/billing';
import {
  saveClauseSchema,
  deleteClauseSchema,
  reorderClausesSchema,
  type SaveClauseInput,
  type DeleteClauseInput,
  type ClauseActionResponse,
} from '@/server/clauses/schemas';

/**
 * Creates or updates a contract clause in contract_clauses/{id}.
 * Uses atomic WriteBatch (clause + platform_audit_logs).
 * Purges 'contract-clauses' tag.
 */
export async function saveClauseAction(
  input: SaveClauseInput
): Promise<ClauseActionResponse<ContractClause>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);

  const validation = saveClauseSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'بيانات البند التعاقدي غير صالحة',
    };
  }

  const data = validation.data;
  const db = getAdminDb();
  const clauseRef = data.id
    ? db.collection('contract_clauses').doc(data.id)
    : db.collection('contract_clauses').doc();
  const clauseId = clauseRef.id;

  try {
    const existingDoc = data.id ? await clauseRef.get() : null;
    const isNew = !existingDoc || !existingDoc.exists;

    const batch = db.batch();

    // 1. Set Clause Document
    batch.set(
      clauseRef,
      {
        id: clauseId,
        title: data.title,
        body: data.body,
        mandatory: data.mandatory,
        order: data.order,
        active: data.active,
        updatedAt: FieldValue.serverTimestamp(),
        ...(isNew && { createdAt: FieldValue.serverTimestamp() }),
      },
      { merge: true }
    );

    // 2. Audit Log
    const auditRef = db.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: isNew ? 'CREATE_CONTRACT_CLAUSE' : 'UPDATE_CONTRACT_CLAUSE',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        clauseId,
        title: data.title,
        mandatory: data.mandatory,
        order: data.order,
        active: data.active,
      },
    });

    await batch.commit();

    try {
      updateTag('contract-clauses');
    } catch {
      // cache fallback
    }

    return {
      success: true,
      data: {
        id: clauseId,
        title: data.title,
        body: data.body,
        mandatory: data.mandatory,
        order: data.order,
        active: data.active,
        createdAt: isNew ? new Date().toISOString() : undefined,
        updatedAt: new Date().toISOString(),
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في حفظ البند التعاقدي';
    console.error('[saveClauseAction] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Deletes a clause unless marked as mandatory.
 */
export async function deleteClauseAction(
  input: DeleteClauseInput
): Promise<ClauseActionResponse<{ deletedId: string }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);

  const validation = deleteClauseSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'معرف البند غير صالح',
    };
  }

  const { clauseId } = validation.data;
  const db = getAdminDb();
  const clauseRef = db.collection('contract_clauses').doc(clauseId);

  try {
    const doc = await clauseRef.get();
    if (!doc.exists) {
      return {
        success: false,
        error: 'البند التعاقدي غير موجود',
      };
    }

    const data = doc.data()!;
    if (data.mandatory) {
      return {
        success: false,
        error: 'لا يمكن حذف بند تعاقدي إلزامي (Mandatory Clause). يمكنك تعديل نصه فقط.',
      };
    }

    const batch = db.batch();

    // 1. Delete Doc
    batch.delete(clauseRef);

    // 2. Audit Log
    const auditRef = db.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'DELETE_CONTRACT_CLAUSE',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        clauseId,
        title: data.title,
      },
    });

    await batch.commit();

    try {
      updateTag('contract-clauses');
    } catch {
      // cache fallback
    }

    return {
      success: true,
      data: { deletedId: clauseId },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في حذف البند التعاقدي';
    console.error('[deleteClauseAction] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Reorders an array of clauses in a single atomic WriteBatch.
 */
export async function reorderClausesAction(
  orderedIds: string[]
): Promise<ClauseActionResponse<{ updatedCount: number }>> {
  const admin = await requireAdmin(['super_admin', 'platform_engineer']);

  const validation = reorderClausesSchema.safeParse({ orderedIds });
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'قائمة البنود غير صالحة',
    };
  }

  try {
    const db = getAdminDb();
    const batch = db.batch();

    orderedIds.forEach((id, index) => {
      const ref = db.collection('contract_clauses').doc(id);
      batch.update(ref, {
        order: index + 1,
        updatedAt: FieldValue.serverTimestamp(),
      });
    });

    const auditRef = db.collection('platform_audit_logs').doc();
    batch.set(auditRef, {
      adminId: admin.uid,
      adminEmail: admin.email,
      action: 'REORDER_CONTRACT_CLAUSES',
      timestamp: FieldValue.serverTimestamp(),
      details: {
        count: orderedIds.length,
      },
    });

    await batch.commit();

    try {
      updateTag('contract-clauses');
    } catch {
      // cache fallback
    }

    return {
      success: true,
      data: { updatedCount: orderedIds.length },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'فشل في إعادة ترتيب البنود التعاقدية';
    console.error('[reorderClausesAction] Error:', error);
    return {
      success: false,
      error: message,
    };
  }
}

