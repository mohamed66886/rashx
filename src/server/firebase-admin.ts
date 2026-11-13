import 'server-only';

import { getApps, initializeApp, cert, getApp, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage, type Storage } from 'firebase-admin/storage';

export function formatPrivateKey(key?: string): string | undefined {
  if (!key) return undefined;
  let formatted = key.trim();
  while (
    (formatted.startsWith('"') && formatted.endsWith('"')) ||
    (formatted.startsWith("'") && formatted.endsWith("'"))
  ) {
    formatted = formatted.slice(1, -1).trim();
  }
  return formatted.replace(/\r/g, '').replace(/\\n/g, '\n');
}

let adminAppInstance: App | null = null;
let adminAuthInstance: Auth | null = null;
let adminDbInstance: Firestore | null = null;
let adminStorageInstance: Storage | null = null;

export function getAdminApp(): App {
  if (adminAppInstance) {
    return adminAppInstance;
  }
  if (getApps().length > 0) {
    adminAppInstance = getApp();
    return adminAppInstance;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (projectId && clientEmail && privateKey) {
    adminAppInstance = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
    return adminAppInstance;
  }

  const missing: string[] = [];
  if (!projectId) missing.push('FIREBASE_PROJECT_ID');
  if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
  if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY');

  throw new Error(
    `[Firebase Admin] Missing required credentials: ${missing.join(', ')}. Configure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in your environment.`
  );
}

export function getAdminAuth(): Auth {
  if (!adminAuthInstance) {
    adminAuthInstance = getAuth(getAdminApp());
  }
  return adminAuthInstance;
}

let code14HintLogged = false;

/**
 * Development-only helper: when FIRESTORE_PREFER_REST is not set and a read
 * fails with code 14, logs one console hint:
 * "Set FIRESTORE_PREFER_REST=true in .env.local and restart the dev server"
 */
export function handleFirestoreDevError(err: unknown) {
  if (process.env.NODE_ENV !== 'production' && !process.env.FIRESTORE_PREFER_REST) {
    const error = err as { code?: number | string; message?: string };
    if (
      (error?.code === 14 || error?.code === '14' || String(error?.message).includes('14 UNAVAILABLE')) &&
      !code14HintLogged
    ) {
      code14HintLogged = true;
      console.warn('\n[Firestore Hint] Set FIRESTORE_PREFER_REST=true in .env.local and restart the dev server.\n');
    }
  }
}

export function getAdminDb(): Firestore {
  if (!adminDbInstance) {
    adminDbInstance = getFirestore(getAdminApp());
    if (process.env.FIRESTORE_PREFER_REST === 'true') {
      adminDbInstance.settings({ preferRest: true });
    } else if (process.env.NODE_ENV !== 'production') {
      const dbAny = adminDbInstance as unknown as {
        request?: (...args: unknown[]) => Promise<unknown>;
        requestStream?: (...args: unknown[]) => { on: (event: string, handler: (err: unknown) => void) => void };
      };
      if (typeof dbAny.request === 'function') {
        const origRequest = dbAny.request.bind(adminDbInstance);
        dbAny.request = function (...args: unknown[]) {
          return origRequest(...args).catch((err: unknown) => {
            handleFirestoreDevError(err);
            throw err;
          });
        };
      }
      if (typeof dbAny.requestStream === 'function') {
        const origRequestStream = dbAny.requestStream.bind(adminDbInstance);
        dbAny.requestStream = function (...args: unknown[]) {
          const stream = origRequestStream(...args);
          if (typeof stream?.on === 'function') {
            stream.on('error', (err: unknown) => {
              handleFirestoreDevError(err);
            });
          }
          return stream;
        };
      }
    }
  }
  return adminDbInstance;
}

export function getAdminStorage(): Storage {
  if (!adminStorageInstance) {
    adminStorageInstance = getStorage(getAdminApp());
  }
  return adminStorageInstance;
}

export function getAdminStorageBucket() {
  const bucketName =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    (process.env.FIREBASE_PROJECT_ID ? `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app` : undefined);
  return getAdminStorage().bucket(bucketName);
}

export type { App, Auth, Firestore, Storage };
