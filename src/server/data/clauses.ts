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

  const snapshot = await query.get();

  const clauses = snapshot.docs.map((doc) => {
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

  // Sort by order ascending in-memory (collection contains ~6-10 clauses total)
  // to avoid requiring a composite index on (active ASC, order ASC).
  return clauses.sort((a, b) => a.order - b.order);
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

