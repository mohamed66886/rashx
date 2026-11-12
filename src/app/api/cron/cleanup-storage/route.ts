import { NextRequest, NextResponse } from 'next/server';
import { adminDb, getAdminStorageBucket } from '@/server/firebase-admin';

export const instant = false;

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  // Validate CRON_SECRET authorization header or query param
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization');
  const urlSecret = req.nextUrl.searchParams.get('key');

  const isAuthorized =
    Boolean(cronSecret) &&
    (authHeader === `Bearer ${cronSecret}` || urlSecret === cronSecret);

  if (!isAuthorized) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const bucket = getAdminStorageBucket();
    const [files] = await bucket.getFiles({ prefix: 'invoices/' });

    const now = Date.now();
    let scannedCount = 0;
    let deletedCount = 0;

    // Cache invoice docs to avoid duplicate lookups
    const invoiceFilesCache = new Map<string, Set<string>>();

    for (const file of files) {
      // Look only under invoices/{invoiceId}/signed/
      const match = file.name.match(/^invoices\/([^/]+)\/signed\/.+$/);
      if (!match) continue;

      scannedCount++;
      const invoiceId = match[1];

      // Check age > 24 hours
      let timeCreated: number;
      try {
        const [meta] = await file.getMetadata();
        const createdStr = meta.timeCreated ? String(meta.timeCreated) : undefined;
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
        const invoiceDoc = await adminDb.collection('platform_invoices').doc(invoiceId).get();
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

