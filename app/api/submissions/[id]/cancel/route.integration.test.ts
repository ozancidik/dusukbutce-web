import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

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

function signUserToken(userId: string) {
  return jwt.sign({ userId, isAdmin: false }, JWT_SECRET, { expiresIn: '10m' });
}

async function createSubmission(userId: mongoose.Types.ObjectId, status: string, extra: Record<string, unknown> = {}) {
  const { default: ProductSubmission } = await import('@/models/ProductSubmission');
  return ProductSubmission.create({
    userId,
    category: 'desktop',
    brand: 'Test Brand',
    model: 'Test Model',
    cosmeticCondition: 'İyi',
    status,
    ...extra,
  });
}

function putCancel(id: string, token: string, body: Record<string, unknown> = {}) {
  return new NextRequest(`http://localhost/api/submissions/${id}/cancel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

describe('PUT /api/submissions/[id]/cancel', () => {
  it('moves a pending submission to cancel_requested and records the reason + previousStatus', async () => {
    const { PUT } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const userId = new mongoose.Types.ObjectId();
    const submission = await createSubmission(userId, 'pending');
    const token = signUserToken(userId.toString());

    const response = await PUT(putCancel(submission._id.toString(), token, { reason: 'vazgeçtim' }), {
      params: Promise.resolve({ id: submission._id.toString() }),
    });

    expect(response.status).toBe(200);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded.status).toBe('cancel_requested');
    expect(reloaded.cancellation.reason).toBe('vazgeçtim');
    expect(reloaded.cancellation.previousStatus).toBe('pending');
  });

  it('rejects a cancellation request from a user who does not own the submission', async () => {
    const { PUT } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const ownerId = new mongoose.Types.ObjectId();
    const attackerId = new mongoose.Types.ObjectId();
    const submission = await createSubmission(ownerId, 'pending');
    const attackerToken = signUserToken(attackerId.toString());

    const response = await PUT(putCancel(submission._id.toString(), attackerToken), {
      params: Promise.resolve({ id: submission._id.toString() }),
    });

    expect(response.status).toBe(403);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded.status).toBe('pending');
  });

  it('refuses to cancel a submission that is already listed', async () => {
    const { PUT } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const userId = new mongoose.Types.ObjectId();
    const submission = await createSubmission(userId, 'listed');
    const token = signUserToken(userId.toString());

    const response = await PUT(putCancel(submission._id.toString(), token), {
      params: Promise.resolve({ id: submission._id.toString() }),
    });

    expect(response.status).toBe(400);
    const reloaded = await ProductSubmission.findById(submission._id).lean() as any;
    expect(reloaded.status).toBe('listed');
  });

  it('refuses to cancel a submission whose payment is already paid', async () => {
    const { PUT } = await import('./route');
    const { default: ProductSubmission } = await import('@/models/ProductSubmission');

    const userId = new mongoose.Types.ObjectId();
    const submission = await createSubmission(userId, 'offered', {
      payment: { status: 'paid', amount: 100 },
    });
    const token = signUserToken(userId.toString());

    const response = await PUT(putCancel(submission._id.toString(), token), {
      params: Promise.resolve({ id: submission._id.toString() }),
    });

    expect(response.status).toBe(400);
  });
});
