# RASHX Platform HQ — Performance & Architecture Guide

This document describes the caching strategy, database indexing, regional deployment topology, and implementation rules for the central platform administration dashboard (`admin.rashx.org` / `/[locale]/dashboard`).

---

## 1. Cache Tags & Invalidation Matrix

Every platform read function in `src/server/data/*` uses Next.js 16 `'use cache'`, `cacheLife('minutes')`, and granular cache tags. When mutations occur via Server Actions in `src/server/actions/*`, `updateTag(tag)` is called immediately after the `WriteBatch` or transaction commits.

| Cache Tag | Data Domain | Read Function (`src/server/data/`) | Invalidation Triggers (`src/server/actions/`) |
| :--- | :--- | :--- | :--- |
| **`stats`** | Platform KPI aggregates (`stats/platform`) | `getPlatformStats()` | `createTenant`, `updateTenantStatus`, `deleteTenant`, `updateLeadStatus`, `convertLead` |
| **`tenants`** | Tenant accounts & subscriptions | `getTenantsPage()`, `getTenant()` | `createTenant`, `updateTenantStatus`, `deleteTenant` |
| **`leads`** | Inbound sales pipeline & demo leads | `getLeadsPage()`, `getLead()` | `updateLeadStatus`, `convertLead` |
| **`admins`** | Platform HQ staff directory | `getAdmins()` | Role updates, account promotions (`set-admin-claim.mjs`) |
| **`audit`** | Immutable system audit log trail | `getAuditLogsPage()` | Automatically written by every mutating Server Action |
| **`sessions`** | Active administrative sessions | `getAdminSessions()` | `revokeAdminSessionAction`, session expiry |

---

## 2. Firestore Composite Indexes

Firestore requires composite indexes whenever a query combines `where` filters with `orderBy` on different fields. The required indexes are declared in `firestore.indexes.json`:

```json
{
  "indexes": [
    {
      "collectionGroup": "tenants",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "leads",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "submittedAt", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

### Purpose of Each Index:
1. **`tenants (status ASC, createdAt DESC)`**: Powers filtered tab views (`Active`, `Trial`, `Suspended`) ordered chronologically with cursor-based pagination.
2. **`leads (status ASC, submittedAt DESC)`**: Powers pipeline stage filtering (`New`, `Contacted`, `Converted`) ordered chronologically with cursor-based pagination.

---

## 3. Serverless Function & Database Region Topology

Serverless functions that communicate with Firestore benefit from executing in the Vercel data center closest to your Firestore cluster to minimize network round-trip time.

By default, `vercel.json` omits the `regions` setting to use Vercel's default or dashboard-configured function region:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
```

### Optional Region Alignment:
Once the target Firestore database location is selected in Google Cloud, you may optionally set the closest Vercel Function region (in Vercel Project Settings > Functions, or via `regions` in `vercel.json`):
- **Middle East GCP Clusters**: Select the closest available low-latency Vercel Function region or leave at default.
- **Europe GCP Clusters**: Align with corresponding European function regions (e.g. Frankfurt, London).
- **US GCP Clusters**: Align with corresponding US function regions (e.g. Washington D.C., Cleveland, San Francisco).

---

## 4. Cold-Load Read Budget & Enforcement

The dashboard enforces a strict cold-load read budget to prevent runaway Firestore costs:

- **`dashboard` (Overview)**: **At most 3 reads** on a cold cache:
  1. `getPlatformStats()`: 1 document read (`stats/platform`).
  2. `getTenantsPage({ limit: 5 })`: 1 collection query (5 docs).
  3. `getLeadsPage({ limit: 5 })`: 1 collection query (5 docs).
- **Subsequent Visits**: **0 reads** (served from Next.js `'use cache'` tag layer).
- **`dashboard/tenants`**: 1 query read (limit 25).
- **`dashboard/leads`**: 1 query read (limit 25).
- **`dashboard/admins`**: 1 query read (admins directory without passwords).
- **`dashboard/settings`**: 0 Firestore reads (configuration rendered from environment).
- **`dashboard/login`**: 0 Firestore reads (client-side Firebase Auth ID token acquisition).

---

## 5. Rules for Adding a New Page or Feature

Follow these non-negotiable architectural rules whenever introducing a new dashboard feature:

1. **Server Components by Default**:
   - The route `page.tsx` must be an async Server Component.
   - Restrict `'use client'` strictly to small, self-contained interactive islands (e.g. `NewFeatureClientView.tsx`).
2. **Server-Only Data Reads (`src/server/data/*.ts`)**:
   - File must begin with `import 'server-only';`.
   - Exported functions must declare `'use cache'`, `cacheLife('minutes')`, and `cacheTag('feature_tag')`.
   - Firestore `Timestamp` objects must be converted to ISO strings before crossing into client props.
3. **Server Actions for Mutations (`src/server/actions/*.ts`)**:
   - File must begin with `'use server';`.
   - First line of every action must call `await requireAdmin(['allowed_role'])`.
   - Validate all arguments using `zod`.
   - Perform mutations in a single atomic `WriteBatch` containing:
     1. The resource creation / update / deletion.
     2. An audit log entry into the `audit_logs` collection.
     3. An aggregate counter update (`FieldValue.increment`) on `stats/platform` if relevant.
   - Call `updateTag('feature_tag')` (and `updateTag('stats')` if metrics changed) after committing.
4. **Optimistic UI & Visible Errors**:
   - Client views must combine `useOptimistic` + `useTransition` for instantaneous optimistic UI updates.
   - If an action fails, roll back state and display a real error toast via `useToast()`. Never fail silently to `localStorage`.
5. **Cursor Pagination**:
   - Never load entire collections unbounded.
   - Use `orderBy` + `limit(25)` + cursor (`startAfter`) with a "تحميل المزيد" (Load More) trigger.
6. **Zero Client Firestore Access**:
   - Never import `firebase/firestore` or `@/lib/firebase` inside dashboard pages or components. All database communication runs through `src/server/` using Firebase Admin SDK.

