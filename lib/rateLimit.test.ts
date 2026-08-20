import { describe, it, expect } from 'vitest';
import { checkRateLimit, getClientIp } from './rateLimit';

function makeRequest(ip = '1.2.3.4') {
  return new Request('http://localhost/api/test', {
    headers: { 'x-forwarded-for': ip },
  });
}

describe('getClientIp', () => {
  it('reads the first IP from x-forwarded-for', () => {
    const req = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '9.9.9.9, 10.0.0.1' },
    });
    expect(getClientIp(req)).toBe('9.9.9.9');
  });

  it('falls back to x-real-ip when x-forwarded-for is absent', () => {
    const req = new Request('http://localhost', { headers: { 'x-real-ip': '8.8.8.8' } });
    expect(getClientIp(req)).toBe('8.8.8.8');
  });

  it('falls back to "unknown" when neither header is present', () => {
    expect(getClientIp(new Request('http://localhost'))).toBe('unknown');
  });
});

describe('checkRateLimit', () => {
  it('allows requests up to the limit, then blocks with 429', () => {
    const opts = { name: 'test-basic', limit: 3, windowMs: 60_000 };
    const req = makeRequest('1.1.1.1');

    expect(checkRateLimit(req, opts)).toBeNull();
    expect(checkRateLimit(req, opts)).toBeNull();
    expect(checkRateLimit(req, opts)).toBeNull();

    const blocked = checkRateLimit(req, opts);
    expect(blocked).not.toBeNull();
    expect(blocked?.status).toBe(429);
  });

  it('tracks separate IPs independently under the same limiter name', () => {
    const opts = { name: 'test-per-ip', limit: 1, windowMs: 60_000 };

    expect(checkRateLimit(makeRequest('2.2.2.2'), opts)).toBeNull();
    // Different IP, same name/limit — should NOT be blocked by 2.2.2.2's usage.
    expect(checkRateLimit(makeRequest('3.3.3.3'), opts)).toBeNull();
    // 2.2.2.2 is now over its own limit.
    expect(checkRateLimit(makeRequest('2.2.2.2'), opts)?.status).toBe(429);
  });

  // This is the property that made the shared middleware.ts fix meaningful:
  // two different logical endpoints that pass the SAME limiter `name` must
  // share one counter, since that's what lets one shared limit protect many
  // routes (see middleware.ts's isSubmissionCreateRoute).
  it('shares one counter across calls using the same name (cross-endpoint protection)', () => {
    const name = 'test-shared-endpoint-pool';
    const req = makeRequest('4.4.4.4');

    expect(checkRateLimit(req, { name, limit: 2, windowMs: 60_000 })).toBeNull();
    // Simulate a "different route" call reusing the same limiter name.
    expect(checkRateLimit(req, { name, limit: 2, windowMs: 60_000 })).toBeNull();
    expect(checkRateLimit(req, { name, limit: 2, windowMs: 60_000 })?.status).toBe(429);
  });
});
