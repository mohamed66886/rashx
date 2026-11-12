import type { InvoiceTotals } from '@/lib/types/billing';

export interface ComputeTotalsItemInput {
  quantity: number;
  unitPriceHalalas: number;
}

/**
 * Pure function to compute invoice financial totals in integer halalas.
 * Server-side only, zero external I/O.
 * 
 * Rounding rule: Round half up per invoice, not per line.
 * 
 * @param items List of line items with quantity and unitPriceHalalas
 * @param discountHalalas Discount in halalas (defaults to 0, capped between 0 and subtotal)
 * @param vatPercent VAT percentage (defaults to 15, accepts 0)
 * @returns InvoiceTotals { subtotal, discount, taxable, vat, total }
 */
export function computeTotals(
  items: ComputeTotalsItemInput[],
  discountHalalas: number = 0,
  vatPercent: number = 15
): InvoiceTotals {
  // 1. Calculate Subtotal (sum of quantity * unitPriceHalalas)
  const subtotal = (items || []).reduce((acc, it) => {
    const qty = Math.max(0, Number(it.quantity || 0));
    const unitPrice = Math.max(0, Math.round(Number(it.unitPriceHalalas || 0)));
    return acc + Math.round(qty * unitPrice);
  }, 0);

  // 2. Safe Discount (0 <= discount <= subtotal)
  const safeDiscount = Math.min(
    subtotal,
    Math.max(0, Math.round(Number(discountHalalas || 0)))
  );

  // 3. Taxable Amount
  const taxable = Math.max(0, subtotal - safeDiscount);

  // 4. VAT calculation with Round Half Up per invoice
  const safeVatPercent = Math.max(0, Number(vatPercent || 0));
  const rawVat = safeVatPercent > 0 ? (taxable * safeVatPercent) / 100 : 0;
  const vat = Math.floor(rawVat + 0.5);

  // 5. Total
  const total = taxable + vat;

  return {
    subtotal,
    discount: safeDiscount,
    taxable,
    vat,
    total,
  };
}

