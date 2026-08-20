import { describe, it, expect } from 'vitest';
import ProductSubmission from './ProductSubmission';
import { ALLOWED_FIELDS } from '@/lib/handleProductSubmission';

// Regression tests for a bug class hit twice this session: a field present
// in ALLOWED_FIELDS (or sent by a form) but missing from the Mongoose schema
// gets silently dropped by Mongoose's default strict mode — no error, the
// value just never reaches the database. Once for powerSupply/motherboard/
// case (2026-08-20), once for the new `payment` sub-object shortly after.
// This test fails loudly instead of silently the next time that happens.
describe('ProductSubmission schema', () => {
  const schemaPaths = Object.keys(ProductSubmission.schema.paths);

  it('has schema paths for every field in ALLOWED_FIELDS', () => {
    const missing = ALLOWED_FIELDS.filter((field) => !schemaPaths.includes(field));
    expect(missing).toEqual([]);
  });

  it('has a path for submissionNumber (assigned at creation time)', () => {
    expect(schemaPaths).toContain('submissionNumber');
  });

  it('has nested payment.status/amount/method paths', () => {
    expect(schemaPaths).toContain('payment.status');
    expect(schemaPaths).toContain('payment.amount');
    expect(schemaPaths).toContain('payment.method');
  });

  it('has desktop-specific fields (powerSupply/motherboard/case)', () => {
    expect(schemaPaths).toContain('powerSupply');
    expect(schemaPaths).toContain('motherboard');
    expect(schemaPaths).toContain('case');
  });
});
