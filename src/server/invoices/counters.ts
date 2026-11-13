import 'server-only';

import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from '@/server/firebase-admin';

/**
 * Generates the next sequential invoice or quote number using an atomic Firestore transaction.
 * Target document: counters/invoices-{year}
 * 
 * Format: `${prefix}-${year}-${String(n).padStart(4, '0')}`
 * Never uses Math.random. Guarantees strictly monotonic, sequential, collision-free numbering.
 * 
 * @param prefix Document prefix (e.g. 'INV' or 'QUO', defaults to 'INV')
 * @param year Financial year (defaults to current calendar year)
 * @returns Monotonic number string, e.g. "INV-2026-0001"
 */
export async function nextInvoiceNumber(
  prefix: string = 'INV',
  year: number = new Date().getFullYear()
): Promise<string> {
  const counterRef = getAdminDb().collection('counters').doc(`invoices-${year}`);

  const nextCount = await getAdminDb().runTransaction(async (transaction) => {
    const doc = await transaction.get(counterRef);
    let currentNumber = 0;

    if (doc.exists) {
      currentNumber = Number(doc.data()?.lastNumber) || 0;
    }

    const next = currentNumber + 1;

    transaction.set(
      counterRef,
      {
        lastNumber: next,
        year,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return next;
  });

  const formattedSequential = String(nextCount).padStart(4, '0');
  const cleanPrefix = (prefix || 'INV').trim().toUpperCase();

  return `${cleanPrefix}-${year}-${formattedSequential}`;
}

