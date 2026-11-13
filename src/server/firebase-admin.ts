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

export function getAdminDb(): Firestore {
  if (!adminDbInstance) {
    adminDbInstance = getFirestore(getAdminApp());
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
