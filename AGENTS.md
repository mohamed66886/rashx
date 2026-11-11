<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# RASHX Platform HQ — Non-Negotiable Project Rules

1. **Server-Only Firestore Access**: The browser must NEVER talk to Firestore for platform collections. All reads/writes go through `src/server/` using Firebase Admin SDK.
2. **Server Components by Default**: Pages are Server Components by default. `'use client'` only on the smallest interactive island.
3. **Strict Data & Action Layer**:
   - **Every read** = a function in `src/server/data/*.ts` using `'use cache'` + `cacheLife` + `cacheTag`.
   - **Every write** = a Server Action in `src/server/actions/*.ts` that calls `requireAdmin(role)` first, uses a single `WriteBatch` (data + audit log), then `updateTag()` for affected tags.
4. **Secrets & Credentials**: No secrets, passwords, or default credentials in code. Env vars only.
5. **Error Surfacing**: No silent `localStorage` fallback. If a write fails, surface a real error to the user.
6. **Dates & Pagination**: Dates are stored as Firestore `Timestamp` (`serverTimestamp` on write), converted to ISO strings only at the server/client boundary. Queries use `orderBy` + `limit` + cursor pagination.
7. **Asset Optimization**: Images over 50KB must be converted to WebP before entering `/public`.
8. **Build & Quality Gates**: Before finishing any task run `npm run lint` and `npm run build` and fix all errors.
