# RASHX Platform HQ — Server Architecture & Data Layer Rules

All platform data access must strictly follow these rules:

### 1. Server-Only Firestore Access
- The browser must **NEVER** interact directly with Firestore.
- All Firestore queries and mutations execute exclusively on the server using the **Firebase Admin SDK** (`adminDb`, `adminAuth`).
- Every data access file starts with `import 'server-only';`.

### 2. Read Layer (`src/server/data/*.ts`)
- **Directives & Caching**: Every exported query function must use:
  - `'use cache';`
  - `cacheLife('minutes')` (or domain-specific cache profile)
  - `cacheTag('tag-name')`
- **Pagination & Ordering**: Queries enforce `orderBy` + `limit` + cursor-based pagination.
- **Date Serialization**: Stored Firestore `Timestamp` instances are converted to ISO 8601 strings (`toIsoString()`) before crossing the server/client boundary.

### 3. Mutation Layer (`src/server/actions/*.ts`)
- **Directives**: Every action file starts with `'use server';`.
- **Authorization**: Every Server Action MUST call `await requireAdmin(allowedRoles)` at the very beginning.
- **Input Validation**: All arguments are validated using `zod` schemas.
- **Atomic Batches**: Every write mutation executes within a single `WriteBatch` containing:
  1. The primary data mutation (with `FieldValue.serverTimestamp()`).
  2. The audit log entry in `platform_audit_logs`.
  3. The stats aggregation update hook.
- **Cache Invalidation**: On successful commit, call `updateTag('tag-name')` (and `revalidateTag`) for affected tags.

