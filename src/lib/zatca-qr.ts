/**
 * ZATCA E-Invoicing Phase 1 & 2 TLV (Tag-Length-Value) Base64 Generator.
 * Conforms to Zakat, Tax and Customs Authority (ZATCA) standards for Simplified Tax Invoices.
 */

export interface ZatcaQrFields {
  sellerName: string;
  vatNumber: string;
  timestamp: string;
  totalWithVat: string | number;
  vatAmount: string | number;
}

/**
 * Encodes a single TLV field into a Uint8Array.
 */
function encodeTlvField(tagNum: number, valueStr: string): Uint8Array {
  const encoder = new TextEncoder();
  const valueBytes = encoder.encode(valueStr);
  const tag = tagNum;
  const length = valueBytes.length;

  const result = new Uint8Array(2 + length);
  result[0] = tag;
  result[1] = length;
  result.set(valueBytes, 2);
  return result;
}

/**
 * Combines all TLV fields and returns a standard Base64 string.
 */
export function generateZatcaTlvBase64(fields: ZatcaQrFields): string {
  const f1 = encodeTlvField(1, fields.sellerName || 'منشأة معتمدة');
  const f2 = encodeTlvField(2, fields.vatNumber || '300000000000003');
  const f3 = encodeTlvField(3, fields.timestamp || new Date().toISOString());
  const f4 = encodeTlvField(4, Number(fields.totalWithVat || 0).toFixed(2));
  const f5 = encodeTlvField(5, Number(fields.vatAmount || 0).toFixed(2));

  const totalLength = f1.length + f2.length + f3.length + f4.length + f5.length;
  const combined = new Uint8Array(totalLength);

  let offset = 0;
  [f1, f2, f3, f4, f5].forEach((arr) => {
    combined.set(arr, offset);
    offset += arr.length;
  });

  // Convert Uint8Array to Base64 in isomorphic environment
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(combined).toString('base64');
  }

  let binary = '';
  const len = combined.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(combined[i]);
  }
  return btoa(binary);
}

