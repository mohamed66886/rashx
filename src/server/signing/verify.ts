import 'server-only';

import crypto from 'crypto';
import { getAdminDb } from '@/server/firebase-admin';
import type { PlatformInvoice, InvoiceSigningFile } from '@/lib/types/billing';
import { toIsoString } from '@/server/data/utils';

export interface VerifyTokenResult {
  valid: boolean;
  error?: 'invalid_token' | 'not_found' | 'cancelled' | 'expired' | 'missing_token';
  invoice?: PlatformInvoice;
  invoiceId?: string;
  token?: string;
}

/**
 * Timing-Safe String Comparison Helper
 */
function timingSafeEqualHex(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  try {
    const bufA = Buffer.from(a, 'hex');
    const bufB = Buffer.from(b, 'hex');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Validates the public customer signing token with timing-safe comparison,
 * ensuring document exists, is not cancelled, and token has not expired.
 * Sanitizes returned payload to ensure no tokenHash, rawToken, or internal
 * storage paths are ever disclosed to the client.
 */
export async function verifySigningToken(fullToken: string): Promise<VerifyTokenResult> {
  if (!fullToken || typeof fullToken !== 'string') {
    return { valid: false, error: 'missing_token' };
  }

  const dotIndex = fullToken.indexOf('.');
  if (dotIndex <= 0 || dotIndex >= fullToken.length - 1) {
    return { valid: false, error: 'invalid_token' };
  }

  const invoiceId = fullToken.substring(0, dotIndex);
  const rawToken = fullToken.substring(dotIndex + 1);

  const docSnap = await getAdminDb().collection('platform_invoices').doc(invoiceId).get();
  if (!docSnap.exists) {
    return { valid: false, error: 'not_found' };
  }

  const data = docSnap.data()!;

  // Must not be cancelled
  if (data.status === 'cancelled') {
    return { valid: false, error: 'cancelled' };
  }

  const storedHash = data.signing?.tokenHash;
  const expiresAt = data.signing?.expiresAt;

  if (!storedHash || !expiresAt) {
    return { valid: false, error: 'invalid_token' };
  }

  // Timing-safe compare of SHA-256 hash
  const computedHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  if (!timingSafeEqualHex(computedHash, storedHash)) {
    return { valid: false, error: 'invalid_token' };
  }

  // Check expiration
  const expTime = new Date(expiresAt).getTime();
  if (isNaN(expTime) || expTime < Date.now()) {
    return { valid: false, error: 'expired' };
  }

  // Sanitize signing and pdf to prevent leaking tokenHash or internal storage paths to public client
  const sanitizedSigning = data.signing
    ? {
        expiresAt: data.signing.expiresAt,
        sentTo: data.signing.sentTo,
        sentAt: data.signing.sentAt,
        viewedAt: data.signing.viewedAt,
        signedAt: data.signing.signedAt,
        reviewedBy: data.signing.reviewedBy,
        files: (data.signing.files || []).map((f: InvoiceSigningFile) => ({
          id: f.id,
          name: f.name,
          size: f.size,
          mimeType: f.mimeType,
          sha256: f.sha256,
          uploadedAt: f.uploadedAt,
          path: '', // stripped for public response
        })),
      }
    : undefined;

  const sanitizedPdf = data.pdf
    ? {
        sha256: data.pdf.sha256,
        path: '', // stripped for public response
      }
    : undefined;

  const invoice: PlatformInvoice = {
    id: docSnap.id,
    number: data.number || null,
    docKind: data.docKind || 'contract_invoice',
    locale: data.locale || 'ar',
    customer: data.customer || { facilityName: '', name: '', address: '' },
    items: data.items || [],
    totals: data.totals || { subtotal: 0, discount: 0, taxable: 0, vat: 0, total: 0 },
    vatRatePercent: Number(data.vatRatePercent) || 0,
    currency: 'SAR',
    issueDate: data.issueDate || toIsoString(data.createdAt),
    dueDate: data.dueDate,
    selectedClauseIds: data.selectedClauseIds || [],
    terms: data.terms || [],
    notes: data.notes,
    seller: data.seller,
    status: data.status,
    signing: sanitizedSigning,
    pdf: sanitizedPdf,
    createdAt: toIsoString(data.createdAt),
    updatedAt: toIsoString(data.updatedAt || data.createdAt),
    createdBy: data.createdBy || '',
  };

  return {
    valid: true,
    invoice,
    invoiceId,
    token: rawToken,
  };
}

