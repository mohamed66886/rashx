import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { computeTotals } from './compute-totals.ts';

describe('computeTotals (Pure Function)', () => {
  test('returns all zeroes when items array is empty', () => {
    const res = computeTotals([], 0, 15);
    assert.deepStrictEqual(res, {
      subtotal: 0,
      discount: 0,
      taxable: 0,
      vat: 0,
      total: 0,
    });
  });

  test('calculates correct totals for single item with default 15% VAT and no discount', () => {
    // 10,000 Halalas = 100.00 SAR
    const res = computeTotals([{ quantity: 1, unitPriceHalalas: 10000 }]);
    assert.strictEqual(res.subtotal, 10000);
    assert.strictEqual(res.discount, 0);
    assert.strictEqual(res.taxable, 10000);
    assert.strictEqual(res.vat, 1500); // 15% of 10000 = 1500
    assert.strictEqual(res.total, 11500);
  });

  test('calculates multiple items with quantities', () => {
    const items = [
      { quantity: 2, unitPriceHalalas: 5000 }, // 10,000
      { quantity: 3, unitPriceHalalas: 1000 }, // 3,000
    ];
    const res = computeTotals(items, 1000, 15);
    assert.strictEqual(res.subtotal, 13000);
    assert.strictEqual(res.discount, 1000);
    assert.strictEqual(res.taxable, 12000);
    assert.strictEqual(res.vat, 1800); // 15% of 12000
    assert.strictEqual(res.total, 13800);
  });

  test('applies round-half-up per invoice on fraction halalas (>= 0.5 rounds up, < 0.5 rounds down)', () => {
    // 110 Halalas * 15% = 16.5 -> round half up = 17 Halalas
    const res1 = computeTotals([{ quantity: 1, unitPriceHalalas: 110 }], 0, 15);
    assert.strictEqual(res1.taxable, 110);
    assert.strictEqual(res1.vat, 17);
    assert.strictEqual(res1.total, 127);

    // 101 Halalas * 15% = 15.15 -> rounds down to 15 Halalas
    const res2 = computeTotals([{ quantity: 1, unitPriceHalalas: 101 }], 0, 15);
    assert.strictEqual(res2.taxable, 101);
    assert.strictEqual(res2.vat, 15);
    assert.strictEqual(res2.total, 116);

    // 105 Halalas * 15% = 15.75 -> rounds up to 16 Halalas
    const res3 = computeTotals([{ quantity: 1, unitPriceHalalas: 105 }], 0, 15);
    assert.strictEqual(res3.taxable, 105);
    assert.strictEqual(res3.vat, 16);
    assert.strictEqual(res3.total, 121);
  });

  test('allows 0% VAT', () => {
    const res = computeTotals([{ quantity: 1, unitPriceHalalas: 5000 }], 0, 0);
    assert.strictEqual(res.subtotal, 5000);
    assert.strictEqual(res.discount, 0);
    assert.strictEqual(res.taxable, 5000);
    assert.strictEqual(res.vat, 0);
    assert.strictEqual(res.total, 5000);
  });

  test('caps discount at subtotal (cannot produce negative taxable or total)', () => {
    const res = computeTotals([{ quantity: 1, unitPriceHalalas: 4000 }], 8000, 15);
    assert.strictEqual(res.subtotal, 4000);
    assert.strictEqual(res.discount, 4000);
    assert.strictEqual(res.taxable, 0);
    assert.strictEqual(res.vat, 0);
    assert.strictEqual(res.total, 0);
  });

  test('ignores negative discount', () => {
    const res = computeTotals([{ quantity: 1, unitPriceHalalas: 4000 }], -500, 15);
    assert.strictEqual(res.discount, 0);
    assert.strictEqual(res.taxable, 4000);
    assert.strictEqual(res.vat, 600);
    assert.strictEqual(res.total, 4600);
  });
});

