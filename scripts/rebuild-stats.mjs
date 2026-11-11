#!/usr/bin/env node

/**
 * ============================================================================
 * RashX (راش إكس) | Platform HQ Stats Rebuilder
 * ============================================================================
 * Recomputes the aggregated platform statistics (stats/platform) document
 * from scratch by scanning the `tenants` and `leads` collections.
 *
 * Usage:
 *   node scripts/rebuild-stats.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// 1. Attempt loading environment variables from .env.local or .env
const envFiles = ['.env.local', '.env'];
for (const envFile of envFiles) {
  const fullPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(fullPath) && typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(fullPath);
    } catch {
      // ignore
    }
  }
}

function formatPrivateKey(key) {
  if (!key) return undefined;
  return key.replace(/\\n/g, '\n');
}

function getAdminFirestore() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('⚠️  [Warning] Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY.');
    console.warn('   Ensure these are defined in your .env.local or environment when running in production.\n');
  }

  if (getApps().length === 0) {
    if (projectId && clientEmail && privateKey) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      });
    } else {
      initializeApp(projectId ? { projectId } : {});
    }
  }
  return getFirestore();
}

async function rebuildStats() {
  console.log('🔄 [RashX HQ] Starting platform stats rebuild...');
  const db = getAdminFirestore();

  // A. Scan tenants collection
  console.log('📦 Scanning `tenants` collection...');
  const tenantsSnap = await db.collection('tenants').get();
  let tenantsTotal = 0;
  let tenantsActive = 0;
  let tenantsTrial = 0;
  let tenantsSuspended = 0;
  let mrrTotal = 0;

  for (const doc of tenantsSnap.docs) {
    tenantsTotal++;
    const data = doc.data();
    const status = data.status;
    const mrr = Number(data.mrr) || 0;

    mrrTotal += mrr;
    if (status === 'active') {
      tenantsActive++;
    } else if (status === 'trial') {
      tenantsTrial++;
    } else if (status === 'suspended') {
      tenantsSuspended++;
    }
  }

  // B. Scan leads collection
  console.log('📥 Scanning `leads` collection...');
  const leadsSnap = await db.collection('leads').get();
  let leadsTotal = 0;
  let leadsNew = 0;
  let leadsConverted = 0;

  for (const doc of leadsSnap.docs) {
    leadsTotal++;
    const data = doc.data();
    const status = data.status;

    if (status === 'new') {
      leadsNew++;
    } else if (status === 'converted') {
      leadsConverted++;
    }
  }

  const payload = {
    tenantsTotal,
    tenantsActive,
    tenantsTrial,
    tenantsSuspended,
    mrrTotal,
    leadsTotal,
    leadsNew,
    leadsConverted,
    updatedAt: FieldValue.serverTimestamp(),
  };

  console.log('💾 Writing aggregated stats to `stats/platform` document:');
  console.table({
    'Total Tenants': tenantsTotal,
    'Active Tenants': tenantsActive,
    'Trial Tenants': tenantsTrial,
    'Suspended Tenants': tenantsSuspended,
    'Total MRR (SAR)': `${mrrTotal.toLocaleString()} SAR`,
    'Total Leads': leadsTotal,
    'New Leads': leadsNew,
    'Converted Leads': leadsConverted,
  });

  const statsRef = db.collection('stats').doc('platform');
  await statsRef.set(payload, { merge: true });

  console.log('✅ [RashX HQ] `stats/platform` document rebuilt successfully!');
}

rebuildStats().catch((err) => {
  console.error('❌ Failed to rebuild stats:', err);
  process.exit(1);
});
