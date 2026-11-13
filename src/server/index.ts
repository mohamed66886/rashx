import 'server-only';

/**
 * ============================================================================
 * RASHX Platform HQ — Server Data & Mutation Layer
 * ============================================================================
 * Architectural Read/Write Rules:
 *
 * 1. Server-Only Firestore Access:
 *    The browser must NEVER talk to Firestore directly. All operations run on
 *    the server via Firebase Admin SDK (`getAdminDb()`).
 *
 * 2. Strict Read Conventions (`src/server/data/*.ts`):
 *    - Must declare `'use cache';`
 *    - Must configure `cacheLife('minutes')`
 *    - Must assign a domain `cacheTag('tag')`
 *    - Must convert Firestore Timestamps to ISO 8601 strings
 *    - Must use `orderBy` + `limit` + cursor pagination
 *
 * 3. Strict Write Conventions (`src/server/actions/*.ts`):
 *    - Must declare `'use server';`
 *    - Must call `await requireAdmin(roles)` at the beginning
 *    - Must validate inputs with `zod`
 *    - Must use a single atomic `WriteBatch` (mutation + audit log + stats hook)
 *    - Must call `updateTag('tag')` and `revalidateTag('tag')` on commit
 * ============================================================================
 */

export * from './firebase-admin';
export * from './auth/session';
export * from './actions/auth';
export * from './actions/tenants';
export * from './actions/leads';
export * from './actions/invoices';
export * from './data/tenants';
export * from './data/leads';
export * from './data/admins';
export * from './data/audit';
export * from './data/invoices';
export * from './data/utils';
