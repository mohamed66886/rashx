import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { adminDb } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type { ContractClause } from '@/lib/types/billing';

/**
 * Fetches contract terms & clauses from collection: contract_clauses
 * Cached with 'contract-clauses' tag.
 * 
 * @param includeInactive When true, returns inactive clauses as well (for admin editor)
 */
export async function getClauses(includeInactive = false): Promise<ContractClause[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('contract-clauses');

  let query: FirebaseFirestore.Query = adminDb.collection('contract_clauses');

  if (!includeInactive) {
    query = query.where('active', '==', true);
  }

  query = query.orderBy('order', 'asc');

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || '',
      body: data.body || '',
      mandatory: Boolean(data.mandatory),
      order: Number(data.order) || 0,
      active: data.active !== false,
      createdAt: data.createdAt ? toIsoString(data.createdAt) : undefined,
      updatedAt: data.updatedAt ? toIsoString(data.updatedAt) : undefined,
    };
  });
}

/**
 * Fetches a single clause by ID.
 */
export async function getClauseById(id: string): Promise<ContractClause | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('contract-clauses');

  const doc = await adminDb.collection('contract_clauses').doc(id).get();
  if (!doc.exists) return null;

  const data = doc.data()!;
  return {
    id: doc.id,
    title: data.title || '',
    body: data.body || '',
    mandatory: Boolean(data.mandatory),
    order: Number(data.order) || 0,
    active: data.active !== false,
    createdAt: data.createdAt ? toIsoString(data.createdAt) : undefined,
    updatedAt: data.updatedAt ? toIsoString(data.updatedAt) : undefined,
  };
}

