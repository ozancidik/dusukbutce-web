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

describe('POST /api/admin/action — cancellation approve/reject (real DB)', () => {
  async function createCancelRequested(previousStatus: string) {
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');
    return ProductSubmission.create({
      userId: new mongoose.Types.ObjectId(),
      category: 'desktop',
      brand: 'Test Brand',
      model: 'Test Model',
      cosmeticCondition: 'İyi',
      status: 'cancel_requested',
      cancellation: {
        reason: 'artık istemiyorum',
        requestedAt: new Date(),
        previousStatus,
      },
    });
  }

  it('approve_cancellation finalizes the submission as cancelled', async () => {
    const { POST } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const submission = await createCancelRequested('pending');
    const fullToken = signAdminToken('full');

    const response = await POST(postAction(fullToken, {
      submissionId: submission._id.toString(),
      action: 'approve_cancellation',
      notes: 'onaylandı',
    }));

    expect(response.status).toBe(200);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded.status).toBe('cancelled');
    expect(reloaded.cancellation.adminNote).toBe('onaylandı');
    expect(reloaded.cancellation.resolvedBy).toBe('qa@example.com');
  });

  it('reject_cancellation reverts the submission back to its previous status', async () => {
    const { POST } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const submission = await createCancelRequested('offered');
    const fullToken = signAdminToken('full');

    const response = await POST(postAction(fullToken, {
      submissionId: submission._id.toString(),
      action: 'reject_cancellation',
      notes: 'kargoya verildi',
    }));

    expect(response.status).toBe(200);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded.status).toBe('offered');
    expect(reloaded.cancellation.adminNote).toBe('kargoya verildi');
  });

  it('a viewer token cannot approve or reject a cancellation request', async () => {
    const { POST } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const submission = await createCancelRequested('pending');
    const viewerToken = signAdminToken('viewer');

    const response = await POST(postAction(viewerToken, {
      submissionId: submission._id.toString(),
      action: 'approve_cancellation',
    }));

    expect(response.status).toBe(403);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded.status).toBe('cancel_requested');
  });

  it('refuses to resolve a submission that is not currently cancel_requested', async () => {
    const { POST } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const submission = await createSubmission(); // status: 'pending'
    const fullToken = signAdminToken('full');

    const response = await POST(postAction(fullToken, {
      submissionId: submission._id.toString(),
      action: 'approve_cancellation',
    }));

    expect(response.status).toBe(400);
  });
});
