import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { adminDb, getAdminStorageBucket } from '@/server/firebase-admin';
import { toIsoString } from '@/server/data/utils';
import type { PlatformBillingSettings, BillingSettings } from '@/lib/types/platform';

/**
 * Fetches the platform billing and seller settings from Firestore.
 * Cached with 'billing-settings' tag.
 */
export async function getBillingSettings(): Promise<PlatformBillingSettings | null> {
  'use cache';
  cacheLife('hours');
  cacheTag('billing-settings');

  const doc = await adminDb.collection('platform_settings').doc('billing').get();
  if (!doc.exists) {
    return null;
  }

  const data = doc.data()!;
  return {
    seller: {
      nameAr: data.seller?.nameAr || '',
      nameEn: data.seller?.nameEn || '',
      commercialRegNumber: data.seller?.commercialRegNumber || '',
      vatNumber: data.seller?.vatNumber || '',
      address: data.seller?.address || '',
      email: data.seller?.email || '',
      phone: data.seller?.phone || '',
      bankName: data.seller?.bankName || '',
      accountName: data.seller?.accountName || '',
      iban: data.seller?.iban || '',
    },
    signaturePath: data.signaturePath || null,
    stampPath: data.stampPath || null,
    invoicePrefix: data.invoicePrefix || 'INV',
    quotePrefix: data.quotePrefix || 'QUO',
    disclaimerLine: data.disclaimerLine || 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.',
    defaultDueDays: Number(data.defaultDueDays) || 14,
    updatedAt: data.updatedAt ? toIsoString(data.updatedAt) : undefined,
    updatedBy: data.updatedBy || undefined,
  };
}

/**
 * Converts PlatformBillingSettings to simple BillingSettings for invoices.
 */
export function toBillingSettings(settings: PlatformBillingSettings | null): BillingSettings | null {
  if (!settings || !settings.seller) return null;
  const s = settings.seller;
  if (!s.iban || !s.bankName) return null;

  return {
    facilityName: s.nameAr || s.nameEn,
    accountName: s.accountName,
    bankName: s.bankName,
    iban: s.iban,
    taxNumber: s.vatNumber || undefined,
    commercialReg: s.commercialRegNumber,
    address: s.address,
    disclaimerLine: settings.disclaimerLine || 'هذا المستند عقد وفاتورة تجارية ولا يُغني عن الفاتورة الضريبية الرسمية عند الاقتضاء.',
    signatureUrl: settings.signaturePath ? '/api/dashboard/billing/asset?type=signature' : undefined,
    stampUrl: settings.stampPath ? '/api/dashboard/billing/asset?type=stamp' : undefined,
  };
}

export interface BillingAssets {
  signatureBuffer: Buffer | null;
  stampBuffer: Buffer | null;
}

let cachedAssets: BillingAssets | null = null;
let lastCacheTime = 0;
const ASSETS_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function purgeBillingAssetsCache() {
  cachedAssets = null;
  lastCacheTime = 0;
}

/**
 * Loads private signature and stamp image buffers from Firebase Storage (cached in module memory)
 * for crisp, embedded PDF generation.
 */
export async function loadBillingAssets(): Promise<BillingAssets> {
  const now = Date.now();
  if (cachedAssets && (now - lastCacheTime < ASSETS_CACHE_TTL_MS)) {
    return cachedAssets;
  }

  const settings = await getBillingSettings();
  const bucket = getAdminStorageBucket();

  let signatureBuffer: Buffer | null = null;
  let stampBuffer: Buffer | null = null;

  if (settings?.signaturePath) {
    try {
      const file = bucket.file(settings.signaturePath);
      const [exists] = await file.exists();
      if (exists) {
        const [buf] = await file.download();
        signatureBuffer = buf;
      }
    } catch (err) {
      console.warn('[loadBillingAssets] Error downloading signature asset:', err);
    }
  }

  if (settings?.stampPath) {
    try {
      const file = bucket.file(settings.stampPath);
      const [exists] = await file.exists();
      if (exists) {
        const [buf] = await file.download();
        stampBuffer = buf;
      }
    } catch (err) {
      console.warn('[loadBillingAssets] Error downloading stamp asset:', err);
    }
  }

  cachedAssets = {
    signatureBuffer,
    stampBuffer,
  };
  lastCacheTime = now;

  return cachedAssets;
}

