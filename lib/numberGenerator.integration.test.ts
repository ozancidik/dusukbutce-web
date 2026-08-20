import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// generateSubmissionNumber/generateOfferNumber/generateOrderNumber eskiden
// "en son kaydı bul, +1 yap" ile numara üretiyordu — eşzamanlı isteklerde
// aynı numara iki kez üretilebiliyordu (gerçek race condition, bu oturumda
// bulunup Counter koleksiyonu + atomik $inc ile düzeltildi). Bu test, gerçek
// bir MongoDB'ye (bellekte, izole) karşı eşzamanlı çağrılar yaparak fixin
// kalıcı olduğunu doğruluyor — saf unit test bunu kanıtlayamaz çünkü
// atomiklik ancak gerçek bir veritabanı üzerinde test edilebilir.

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('generateSubmissionNumber (atomic counter, real DB)', () => {
  it('never produces a duplicate number under concurrent calls', async () => {
    const { generateSubmissionNumber } = await import('@/lib/numberGenerator');

    const results = await Promise.all(
      Array.from({ length: 25 }, () => generateSubmissionNumber())
    );

    const unique = new Set(results);
    expect(unique.size).toBe(results.length);
    expect(results.every((n) => /^TLP-\d{4}-\d{6}$/.test(n))).toBe(true);
  });

  it('assigns strictly sequential numbers, none skipped or reused', async () => {
    const { generateSubmissionNumber } = await import('@/lib/numberGenerator');

    const results = await Promise.all(
      Array.from({ length: 15 }, () => generateSubmissionNumber())
    );
    const sequences = results
      .map((n) => parseInt(n.split('-')[2], 10))
      .sort((a, b) => a - b);

    for (let i = 1; i < sequences.length; i++) {
      expect(sequences[i]).toBe(sequences[i - 1] + 1);
    }
  });
});

describe('generateOfferNumber / generateOrderNumber (independent counters)', () => {
  it('keeps separate sequences per counter name (no cross-contamination)', async () => {
    const { generateOfferNumber, generateOrderNumber } = await import('@/lib/numberGenerator');

    const [offer1, order1, offer2] = await Promise.all([
      generateOfferNumber(),
      generateOrderNumber(),
      generateOfferNumber(),
    ]);

    expect(offer1).toMatch(/^OFFER-\d{4}-\d{6}$/);
    expect(order1).toMatch(/^ORDER-\d{4}-\d{6}$/);
    expect(offer2).toMatch(/^OFFER-\d{4}-\d{6}$/);
    expect(offer1).not.toBe(offer2);
  });
});
