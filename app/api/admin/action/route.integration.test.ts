import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// admin/role ayrımı (ensureFullAdminRequest) sadece bir JWT alan kontrolü
// değil, "viewer" bir admin gerçekten submission'ı DEĞİŞTİREMESİN" garantisi.
// Bu test, unit seviyesinde requireAdmin.ts'i izole test etmek yerine,
// gerçek POST /api/admin/action handler'ını gerçek bir DB'ye karşı çağırarak
// uçtan uca doğruluyor — auth kontrolü route içinde yanlışlıkla kaldırılır
// veya bypass edilirse bu test kırılır.

let mongod: MongoMemoryServer;
const JWT_SECRET = process.env.JWT_SECRET as string;

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

function signAdminToken(adminRole: 'full' | 'viewer' | undefined) {
  const payload: Record<string, unknown> = {
    email: 'qa@example.com',
    role: 'admin',
    name: 'QA',
  };
  if (adminRole) payload.adminRole = adminRole;
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '10m' });
}

async function createSubmission() {
  const { default: ProductSubmission } = await import('@/models/ProductSubmission');
  return ProductSubmission.create({
    userId: new mongoose.Types.ObjectId(),
    category: 'desktop',
    brand: 'Test Brand',
    model: 'Test Model',
    cosmeticCondition: 'İyi',
    status: 'pending',
  });
}

function postAction(token: string, body: Record<string, unknown>) {
  return new NextRequest('http://localhost/api/admin/action', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

describe('POST /api/admin/action — viewer role write protection (real DB)', () => {
  it('rejects a viewer token with 403 and leaves the submission unchanged', async () => {
    const { POST } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const submission = await createSubmission();
    const viewerToken = signAdminToken('viewer');

    const response = await POST(postAction(viewerToken, {
      submissionId: submission._id.toString(),
      action: 'reject',
      reason: 'test',
    }));

    expect(response.status).toBe(403);

    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded?.status).toBe('pending');
  });

  it('allows a full-admin token to reject the submission', async () => {
    const { POST } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const submission = await createSubmission();
    const fullToken = signAdminToken('full');

    const response = await POST(postAction(fullToken, {
      submissionId: submission._id.toString(),
      action: 'reject',
      reason: 'test',
    }));

    expect(response.status).toBe(200);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded?.status).toBe('rejected');
  });

  it('allows a legacy token without an adminRole claim (pre-existing admins keep full access)', async () => {
    const { POST } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const submission = await createSubmission();
    const legacyToken = signAdminToken(undefined);

    const response = await POST(postAction(legacyToken, {
      submissionId: submission._id.toString(),
      action: 'reject',
      reason: 'test',
    }));

    expect(response.status).toBe(200);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded?.status).toBe('rejected');
  });

  it('persists the payment sub-document for a real confirm_payment call', async () => {
    const { POST } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const submission = await createSubmission();
    const fullToken = signAdminToken('full');

    const response = await POST(postAction(fullToken, {
      submissionId: submission._id.toString(),
      action: 'confirm_payment',
      amount: 3500,
      paymentMethod: 'Banka Havalesi/EFT',
    }));

    expect(response.status).toBe(200);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded?.payment?.status).toBe('paid');
    expect(reloaded?.payment?.amount).toBe(3500);
  });
});
