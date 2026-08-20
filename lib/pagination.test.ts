import { describe, it, expect } from 'vitest';
import { parsePagination } from './pagination';

// Regression tests for the 500-crash bug fixed 2026-08-11 (ac3ca8f): negative
// or non-numeric page/limit query params used to go straight into MongoDB's
// `skip`, which rejects negative values and crashed the request.
describe('parsePagination', () => {
  it('defaults to page 1 / defaultLimit when nothing is provided', () => {
    expect(parsePagination(new URLSearchParams(''))).toEqual({ page: 1, limit: 20 });
  });

  it('clamps a negative page to 1', () => {
    expect(parsePagination(new URLSearchParams('page=-5'))).toEqual({ page: 1, limit: 20 });
  });

  it('clamps page=0 to 1', () => {
    expect(parsePagination(new URLSearchParams('page=0'))).toEqual({ page: 1, limit: 20 });
  });

  it('clamps a non-numeric page to 1', () => {
    expect(parsePagination(new URLSearchParams('page=abc'))).toEqual({ page: 1, limit: 20 });
  });

  it('clamps limit=0 to the default limit', () => {
    expect(parsePagination(new URLSearchParams('limit=0'))).toEqual({ page: 1, limit: 20 });
  });

  it('clamps an overly large limit to maxLimit', () => {
    expect(parsePagination(new URLSearchParams('limit=99999'))).toEqual({ page: 1, limit: 100 });
  });

  it('respects a valid page and limit', () => {
    expect(parsePagination(new URLSearchParams('page=3&limit=10'))).toEqual({ page: 3, limit: 10 });
  });
});
