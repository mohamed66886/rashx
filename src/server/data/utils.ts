import 'server-only';

import { Timestamp } from 'firebase-admin/firestore';

/**
 * Converts Firestore Timestamps, Dates, or numbers to standard serializable ISO 8601 strings.
 */
export function toIsoString(value: unknown): string {
  if (!value) return new Date().toISOString();
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof (value as { toDate: () => unknown }).toDate === 'function'
  ) {
    try {
      const d = (value as { toDate: () => unknown }).toDate();
      if (d instanceof Date) return d.toISOString();
    } catch {
      // ignore
    }
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return new Date(value).toISOString();
  }
  return new Date().toISOString();
}

