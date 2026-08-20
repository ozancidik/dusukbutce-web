import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Bu oturumda iki kez aynı bug'a takıldık: Mongoose'un varsayılan strict
// schema modu, ALLOWED_FIELDS/schema'ya sonradan eklenen bir alanı (önce
// powerSupply/motherboard/case, sonra payment) sessizce düşürüyordu — 200
// dönüyor ama alan DB'ye hiç yazılmıyordu, hata da fırlatılmıyordu.
// models/ProductSubmission.test.ts (unit) sadece schema.paths'in alanı
// TANIMLADIĞINI kontrol ediyor; bu test ise gerçek bir DB'ye karşı asıl
// admin/action route'unun kullandığı findByIdAndUpdate ile yazıp geri
// okuyarak alanın GERÇEKTEN KALICI olduğunu doğruluyor.

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  const { default: connectDB } = await import('@/lib/mongodb');
  await connectDB();
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

async function createBaseSubmission() {
  const { default: ProductSubmission } = await import('@/models/ProductSubmission');
  return ProductSubmission.create({
    userId: new mongoose.Types.ObjectId(),
    category: 'desktop',
    brand: 'Test Brand',
    model: 'Test Model',
    cosmeticCondition: 'İyi',
  });
}

describe('ProductSubmission — payment field persistence (regression)', () => {
  it('persists a payment sub-document written via findByIdAndUpdate (same path as admin/action route)', async () => {
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');
    const submission = await createBaseSubmission();

    await ProductSubmission.findByIdAndUpdate(submission._id, {
      status: submission.status,
      adminNotes: submission.adminNotes,
      updatedAt: new Date(),
      payment: {
        status: 'paid',
        amount: 5000,
        method: 'Banka Havalesi/EFT',
        paidAt: new Date(),
        paidBy: 'qa@example.com',
        note: 'test',
      },
    }, { new: true });

    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded?.payment?.status).toBe('paid');
    expect(reloaded?.payment?.amount).toBe(5000);
    expect(reloaded?.payment?.method).toBe('Banka Havalesi/EFT');
    expect(reloaded?.payment?.paidBy).toBe('qa@example.com');
  });
});

describe('ProductSubmission — desktop-only field persistence (regression)', () => {
  it('persists powerSupply/motherboard/case written at creation time', async () => {
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');
    const submission = await ProductSubmission.create({
      userId: new mongoose.Types.ObjectId(),
      category: 'desktop',
      brand: 'Test Brand',
      model: 'Test Model',
      cosmeticCondition: 'İyi',
      powerSupply: '650W Bronze',
      motherboard: 'B550M',
      case: 'Mid Tower',
    });

    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded?.powerSupply).toBe('650W Bronze');
    expect(reloaded?.motherboard).toBe('B550M');
    expect(reloaded?.case).toBe('Mid Tower');
  });
});

describe('ProductSubmission — submissionNumber assignment', () => {
  it('is settable and persists once assigned at creation time', async () => {
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');
    const { generateSubmissionNumber } = await import('@/lib/numberGenerator');

    const number = await generateSubmissionNumber();
    const submission = await ProductSubmission.create({
      userId: new mongoose.Types.ObjectId(),
      category: 'desktop',
      brand: 'Test Brand',
      model: 'Test Model',
      cosmeticCondition: 'İyi',
      submissionNumber: number,
    });

    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded?.submissionNumber).toBe(number);
  });

  it('is fully removed from the DB when the submission is deleted, and never reissued', async () => {
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');
    const { generateSubmissionNumber } = await import('@/lib/numberGenerator');

    const firstNumber = await generateSubmissionNumber();
    const submission = await ProductSubmission.create({
      userId: new mongoose.Types.ObjectId(),
      category: 'desktop',
      brand: 'Test Brand',
      model: 'Test Model',
      cosmeticCondition: 'İyi',
      submissionNumber: firstNumber,
    });

    await ProductSubmission.findByIdAndDelete(submission._id);
    const deleted = await ProductSubmission.findById(submission._id).lean() as any;
    expect(deleted).toBeNull();

    const secondNumber = await generateSubmissionNumber();
    expect(secondNumber).not.toBe(firstNumber);

    const firstSeq = parseInt(firstNumber.split('-')[2], 10);
    const secondSeq = parseInt(secondNumber.split('-')[2], 10);
    expect(secondSeq).toBeGreaterThan(firstSeq);
  });
});
