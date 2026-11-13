import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getAdminDb, getAdminStorageBucket } from '@/server/firebase-admin';

export const instant = false;

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

function timingSafeMatch(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function GET(req: NextRequest) {
  // Validate CRON_SECRET authorization header strictly: Bearer ${CRON_SECRET}
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization') || '';

  if (!cronSecret || !authHeader.startsWith('Bearer ')) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const expectedAuth = `Bearer ${cronSecret}`;
  if (!timingSafeMatch(authHeader, expectedAuth)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const bucket = getAdminStorageBucket();
    const now = Date.now();
    let scannedCount = 0;
    let deletedCount = 0;

    // Cache invoice docs to avoid duplicate lookups across pages
    const invoiceFilesCache = new Map<string, Set<string>>();

    let pageToken: string | undefined = undefined;

    do {
      const result = await bucket.getFiles({
        prefix: 'invoices/',
        autoPaginate: false,
        maxResults: 500,
        pageToken,
      });

      const files = result[0];
      const nextQuery = result[1] as { pageToken?: string } | null;

      for (const file of files) {
        // Skip names that do not match /^invoices\/[^/]+\/signed\//
        const match = file.name.match(/^invoices\/([^/]+)\/signed\/.+$/);
        if (!match) continue;

        scannedCount++;
        const invoiceId = match[1];

        // Filter by file timeCreated older than 24h BEFORE any Firestore lookup
        let timeCreated: number;
        try {
          const meta = file.metadata?.timeCreated ? file.metadata : (await file.getMetadata())[0];
          const createdStr = meta?.timeCreated ? String(meta.timeCreated) : undefined;
          timeCreated = createdStr ? new Date(createdStr).getTime() : now;
        } catch {
          continue;
        }

        if (now - timeCreated < TWENTY_FOUR_HOURS_MS) {
          continue; // file is still within the active upload window
        }

        // Check if file is registered in the invoice's signing.files array
        let registeredPaths = invoiceFilesCache.get(invoiceId);
        if (!registeredPaths) {
          registeredPaths = new Set<string>();
          const invoiceDoc = await getAdminDb().collection('platform_invoices').doc(invoiceId).get();
          if (invoiceDoc.exists) {
            const signingFiles = invoiceDoc.data()?.signing?.files;
            if (Array.isArray(signingFiles)) {
              for (const f of signingFiles) {
                if (f?.path) registeredPaths.add(f.path);
              }
            }
          }
          invoiceFilesCache.set(invoiceId, registeredPaths);
        }

        // If not referenced in confirmed files, delete orphan
        if (!registeredPaths.has(file.name)) {
          await file.delete().catch((err) => {
            console.warn(`[cleanup-storage] Failed to delete orphan ${file.name}:`, err);
          });
          deletedCount++;
        }
      }

      pageToken = nextQuery?.pageToken;
    } while (pageToken);

    return NextResponse.json({
      success: true,
      scannedCount,
      deletedCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[cleanup-storage] Error during orphan cleanup:', error);
    return NextResponse.json(
      { success: false, error: 'Internal cleanup error' },
      { status: 500 }
    );
  }
}
