/**
 * ============================================================================
 * RashX (راش إكس) | Official Firebase Firestore SDK Integration
 * ============================================================================
 * Uses the official Firebase Web SDK (firebase/app & firebase/firestore)
 * connected to project: aya2-a5057.
 * Includes local persistence mirror & diagnostic permission checks.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection as firestoreCollection,
  doc,
  setDoc as firestoreSetDoc,
  getDoc as firestoreGetDoc,
  getDocs,
  updateDoc as firestoreUpdateDoc,
  deleteDoc as firestoreDeleteDoc,
  query,
  where,
  limit as firestoreLimit,
} from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Official Firebase SDK singleton
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface FirestoreMeta {
  id: string;
  createTime?: string;
  updateTime?: string;
  _source?: 'live_firestore' | 'local_cached';
}

// ----------------------------------------------------------------------
// Local Resilient Mirror
// ----------------------------------------------------------------------

const LOCAL_STORAGE_PREFIX = 'rashx_real_db_';

export function getLocalCollection<T>(collectionName: string): Record<string, T> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${collectionName}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveLocalCollection<T>(collectionName: string, items: Record<string, T>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${collectionName}`, JSON.stringify(items));
  } catch (e) {
    console.warn('[RashX DB] Local mirror write error:', e);
  }
}

export function saveLocalDoc<T extends { id: string }>(collectionName: string, documentData: T) {
  const all = getLocalCollection<T>(collectionName);
  all[documentData.id] = { ...documentData, _source: 'local_cached' } as any;
  saveLocalCollection(collectionName, all);
}

export function getLocalDoc<T>(collectionName: string, id: string): (T & FirestoreMeta) | null {
  const all = getLocalCollection<T>(collectionName);
  return (all[id] as any) || null;
}

// ----------------------------------------------------------------------
// Firestore API Operations with Official SDK
// ----------------------------------------------------------------------

export type FirestorePermissionStatus = 'unknown' | 'permitted' | 'permission_denied';
let globalPermissionStatus: FirestorePermissionStatus = 'unknown';

export function getFirestorePermissionStatus(): FirestorePermissionStatus {
  return globalPermissionStatus;
}

/**
 * Probes Firestore to verify if Security Rules allow read/write
 */
export async function checkFirestoreWritePermission(): Promise<{
  permitted: boolean;
  error?: string;
}> {
  try {
    const testDocRef = doc(db, 'platform_admins', 'connection_probe');
    await firestoreSetDoc(
      testDocRef,
      { probe: true, timestamp: new Date().toISOString() },
      { merge: true }
    );
    globalPermissionStatus = 'permitted';
    return { permitted: true };
  } catch (err: any) {
    if (err.code === 'permission-denied' || String(err.message).includes('permission')) {
      globalPermissionStatus = 'permission_denied';
      return { permitted: false, error: 'permission-denied' };
    }
    return { permitted: false, error: err.message };
  }
}

/**
 * Fetches a single document by ID from Firestore (with local mirror fallback)
 */
export async function getDoc<T = Record<string, any>>(
  collectionName: string,
  docId: string
): Promise<(T & FirestoreMeta) | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const snap = await firestoreGetDoc(docRef);

    if (snap.exists()) {
      const data = { id: snap.id, ...snap.data(), _source: 'live_firestore' } as T & FirestoreMeta;
      saveLocalDoc(collectionName, data);
      globalPermissionStatus = 'permitted';
      return data;
    }
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      globalPermissionStatus = 'permission_denied';
    }
    console.warn(`[RashX Firestore] Live getDoc (${collectionName}/${docId}):`, err.code || err.message);
  }

  return getLocalDoc<T>(collectionName, docId);
}

/**
 * Sets (creates or updates) a document by ID in Firestore
 */
export async function setDoc<T extends Record<string, any>>(
  collectionName: string,
  docId: string,
  data: T
): Promise<T & FirestoreMeta> {
  const payload = {
    ...data,
    id: docId,
    updatedAt: new Date().toISOString(),
  };

  // Always mirror locally
  saveLocalDoc(collectionName, payload);

  try {
    const docRef = doc(db, collectionName, docId);
    await firestoreSetDoc(docRef, data, { merge: true });
    globalPermissionStatus = 'permitted';
    return { ...payload, _source: 'live_firestore' } as T & FirestoreMeta;
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      globalPermissionStatus = 'permission_denied';
    }
    console.warn(
      `[RashX Firestore] Live setDoc error in (${collectionName}/${docId}):`,
      err.code || err.message
    );
    return { ...payload, _source: 'local_cached' } as T & FirestoreMeta;
  }
}

/**
 * Updates specific fields of an existing document in Firestore
 */
export async function updateDoc<T extends Record<string, any>>(
  collectionName: string,
  docId: string,
  partialData: Partial<T>
): Promise<boolean> {
  const existing = await getDoc<T>(collectionName, docId);
  const merged = { ...(existing || {}), ...partialData, id: docId, updatedAt: new Date().toISOString() };
  saveLocalDoc(collectionName, merged);

  try {
    const docRef = doc(db, collectionName, docId);
    await firestoreUpdateDoc(docRef, partialData as Record<string, any>);
    globalPermissionStatus = 'permitted';
    return true;
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      globalPermissionStatus = 'permission_denied';
    }
    console.warn(`[RashX Firestore] Live updateDoc (${collectionName}/${docId}):`, err.code || err.message);
    return true;
  }
}

/**
 * Runs a query on a collection
 */
export async function queryCollection<T = Record<string, any>>(
  collectionName: string,
  field: string,
  op: 'EQUAL' | 'GREATER_THAN' | 'LESS_THAN' | 'ARRAY_CONTAINS',
  val: any
): Promise<(T & FirestoreMeta)[]> {
  const opMap: Record<string, any> = {
    EQUAL: '==',
    GREATER_THAN: '>',
    LESS_THAN: '<',
    ARRAY_CONTAINS: 'array-contains',
  };

  try {
    const colRef = firestoreCollection(db, collectionName);
    const q = query(colRef, where(field, opMap[op] || '==', val));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const items: (T & FirestoreMeta)[] = [];
      snap.forEach((d) => {
        const item = { id: d.id, ...d.data(), _source: 'live_firestore' } as T & FirestoreMeta;
        items.push(item);
        saveLocalDoc(collectionName, item);
      });
      globalPermissionStatus = 'permitted';
      return items;
    }
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      globalPermissionStatus = 'permission_denied';
    }
    console.warn(`[RashX Firestore] Live queryCollection (${collectionName}):`, err.code || err.message);
  }

  // Fallback to local mirror
  const localItems = Object.values(getLocalCollection<any>(collectionName));
  return localItems.filter((item: any) => {
    if (op === 'EQUAL') return item[field] === val;
    return true;
  }) as (T & FirestoreMeta)[];
}

/**
 * Lists all documents in a collection
 */
export async function listCollection<T = Record<string, any>>(
  collectionName: string,
  maxLimit = 50
): Promise<(T & FirestoreMeta)[]> {
  try {
    const colRef = firestoreCollection(db, collectionName);
    const q = query(colRef, firestoreLimit(maxLimit));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const items: (T & FirestoreMeta)[] = [];
      snap.forEach((d) => {
        const item = { id: d.id, ...d.data(), _source: 'live_firestore' } as T & FirestoreMeta;
        items.push(item);
        saveLocalDoc(collectionName, item);
      });
      globalPermissionStatus = 'permitted';
      return items;
    }
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      globalPermissionStatus = 'permission_denied';
    }
    console.warn(`[RashX Firestore] Live listCollection (${collectionName}):`, err.code || err.message);
  }

  return Object.values(getLocalCollection<any>(collectionName)) as (T & FirestoreMeta)[];
}

/**
 * Deletes a document from Firestore
 */
export async function deleteFirestoreDoc(collectionName: string, docId: string): Promise<boolean> {
  const all = getLocalCollection(collectionName);
  delete all[docId];
  saveLocalCollection(collectionName, all);

  try {
    const docRef = doc(db, collectionName, docId);
    await firestoreDeleteDoc(docRef);
    globalPermissionStatus = 'permitted';
    return true;
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      globalPermissionStatus = 'permission_denied';
    }
    console.warn(`[RashX Firestore] Live deleteDoc (${collectionName}/${docId}):`, err.code || err.message);
    return true;
  }
}

/**
 * Syncs all locally cached collections to live Firestore cloud
 */
export async function syncAllLocalDataToFirestore(): Promise<{
  success: boolean;
  syncedCounts: Record<string, number>;
  error?: string;
}> {
  const collections = ['platform_admins', 'admin_sessions', 'tenants', 'leads', 'platform_audit_logs'];
  const counts: Record<string, number> = {};

  try {
    for (const col of collections) {
      const items = Object.values(getLocalCollection<any>(col));
      counts[col] = items.length;
      for (const item of items) {
        if (item.id) {
          const docRef = doc(db, col, item.id);
          const cleanItem = { ...item };
          delete cleanItem._source;
          await firestoreSetDoc(docRef, cleanItem, { merge: true });
        }
      }
    }
    globalPermissionStatus = 'permitted';
    return { success: true, syncedCounts: counts };
  } catch (err: any) {
    if (err.code === 'permission-denied') {
      globalPermissionStatus = 'permission_denied';
    }
    return { success: false, syncedCounts: counts, error: err.code || err.message };
  }
}
