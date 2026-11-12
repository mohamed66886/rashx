/**
 * Script: Rebuild Invoice Statistics (stats/invoices)
 * Run with: node scripts/rebuild-invoice-stats.mjs
 *
 * Scans all platform_invoices documents, computes:
 * - Counts per status (draft, issued, sent, viewed, uploaded, signed, paid, cancelled)
 * - Total count
 * - Total invoiced amount (halalas)
 * - Outstanding unpaid amount (issued + sent + viewed + uploaded + signed)
 * - Paid amount this month (halalas)
 * Writes consolidated payload to stats/invoices.
 */

import fs from 'node:fs';
import path from 'node:path';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// 1. Load environment variables
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(envPath);
}

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'aya2-a5057';
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (privateKey && privateKey.includes('\\n')) {
  privateKey = privateKey.replace(/\\n/g, '\n');
}

if (!getApps().length) {
  if (clientEmail && privateKey) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  } else {
    initializeApp({
      projectId,
    });
  }
}

const db = getFirestore();

async function rebuildInvoiceStats() {
  console.log('🔄 Rebuilding invoice stats from platform_invoices collection...\n');

  const snapshot = await db.collection('platform_invoices').get();
  console.log(`Found ${snapshot.size} total invoice documents.`);

  const counts = {
    draft: 0,
    issued: 0,
    sent: 0,
    viewed: 0,
    uploaded: 0,
    signed: 0,
    paid: 0,
    cancelled: 0,
  };

  let totalCount = 0;
  let totalAmountHalalas = 0;
  let outstandingAmount = 0;
  let paidAmountThisMonth = 0;

  const currentMonth = new Date().toISOString().slice(0, 7); // e.g. '2026-11'
  const UNPAID_STATUSES = new Set(['issued', 'sent', 'viewed', 'uploaded', 'signed']);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const status = data.status || 'draft';
    const total = Number(data.totals?.total) || 0;

    totalCount += 1;
    if (Object.prototype.hasOwnProperty.call(counts, status)) {
      counts[status] += 1;
    } else {
      counts[status] = 1;
    }

    // Cumulative issued amount
    if (status !== 'draft' && status !== 'cancelled') {
      totalAmountHalalas += total;
    }

    // Outstanding unpaid active contracts
    if (UNPAID_STATUSES.has(status)) {
      outstandingAmount += total;
    }

    // Paid amount this month
    if (status === 'paid') {
      const paidAtStr = data.paidAt ? (data.paidAt.toDate ? data.paidAt.toDate().toISOString() : String(data.paidAt)) : '';
      const updatedAtStr = data.updatedAt ? (data.updatedAt.toDate ? data.updatedAt.toDate().toISOString() : String(data.updatedAt)) : '';
      const dateToCheck = paidAtStr || updatedAtStr;

      if (dateToCheck && dateToCheck.startsWith(currentMonth)) {
        paidAmountThisMonth += total;
      }
    }
  });

  const statsPayload = {
    totalCount,
    totalAmountHalalas,
    outstandingAmount,
    paidAmountThisMonth,
    currentMonth,
    counts,
    draftCount: counts.draft,
    issuedCount: counts.issued,
    sentCount: counts.sent,
    viewedCount: counts.viewed,
    uploadedCount: counts.uploaded,
    signedCount: counts.signed,
    paidCount: counts.paid,
    cancelledCount: counts.cancelled,
    updatedAt: FieldValue.serverTimestamp(),
  };

  await db.collection('stats').doc('invoices').set(statsPayload, { merge: true });

  console.log('\n📊 Rebuilt Stats Summary:');
  console.log('----------------------------------------------------');
  console.log(`Total Invoices:           ${totalCount}`);
  console.log(`Total Invoiced (SAR):     ${(totalAmountHalalas / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR`);
  console.log(`Outstanding Unpaid (SAR): ${(outstandingAmount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR`);
  console.log(`Paid This Month (SAR):    ${(paidAmountThisMonth / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR`);
  console.log('Status Breakdown:');
  Object.entries(counts).forEach(([st, cnt]) => {
    console.log(`  - ${st.padEnd(12)}: ${cnt}`);
  });
  console.log('----------------------------------------------------');
  console.log('✅ Document stats/invoices successfully updated.\n');
}

rebuildInvoiceStats().catch((err) => {
  console.error('❌ Failed to rebuild invoice stats:', err);
  process.exit(1);
});

