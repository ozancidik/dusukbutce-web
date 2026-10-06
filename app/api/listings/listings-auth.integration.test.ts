import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// POST /api/listings ile PATCH/DELETE /api/listings/[id] eskiden KİMLİK KONTROLÜ
// OLMADAN çalışıyordu: herkes herhangi bir kaydı (teklif/ödeme alanları dahil)
// değiştirebilir, silebilir veya body'deki her alanla yeni kayıt oluşturabiliyordu.
// Bu test, yetkisiz isteklerin reddedildiğini ve kaydın DEĞİŞMEDİĞİNİ kanıtlar.

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

const userToken = () =>
  jwt.sign({ userId: new mongoose.Types.ObjectId().toString(), isAdmin: false }, JWT_SECRET, {
    expiresIn: '10m',
  });
const adminToken = () =>
  jwt.sign({ userId: new mongoose.Types.ObjectId().toString(), isAdmin: true }, JWT_SECRET, {
    expiresIn: '10m',
  });

async function createListing() {
  const { default: ProductSubmission } = await import('@/models/ProductSubmission');
  return ProductSubmission.create({
    userId: new mongoose.Types.ObjectId(),
    category: 'desktop',
    brand: 'Marka',
    model: 'Model',
    cosmeticCondition: 'İyi',
    status: 'listed',
    description: 'ilk açıklama',
  });
}

function req(method: string, url: string, token?: string, body?: unknown) {
  return new NextRequest(`http://localhost${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const newDoc = {
  userId: new mongoose.Types.ObjectId().toString(),
  category: 'desktop',
  brand: 'Sahte',
  model: 'Ilan',
  cosmeticCondition: 'İyi',
};

describe('PATCH /api/listings/[id]', () => {
  it('kimliksiz istek 401 döner ve kayıt değişmez', async () => {
    const { PATCH } = await import('./[id]/route');
    const { default: PS } = await import('@/models/ProductSubmission');
    const l = await createListing();
    const res = await PATCH(
      req('PATCH', `/api/listings/${l._id}`, undefined, {
        description: 'ele geçirildi',
        status: 'accepted',
      }),
      ctx(String(l._id))
    );
    expect(res.status).toBe(401);
    const after = await PS.findById(l._id).lean<Record<string, unknown>>();
    expect(after).toMatchObject({ description: 'ilk açıklama', status: 'listed' });
  });

  it('admin olmayan kullanıcı 403 alır ve kayıt değişmez', async () => {
    const { PATCH } = await import('./[id]/route');
    const { default: PS } = await import('@/models/ProductSubmission');
    const l = await createListing();
    const res = await PATCH(
      req('PATCH', `/api/listings/${l._id}`, userToken(), { description: 'ele geçirildi' }),
      ctx(String(l._id))
    );
    expect(res.status).toBe(403);
    expect((await PS.findById(l._id).lean<Record<string, unknown>>())?.description).toBe(
      'ilk açıklama'
    );
  });

  it('sahte (yanlış imzalı) token reddedilir', async () => {
    const { PATCH } = await import('./[id]/route');
    const l = await createListing();
    const fake = jwt.sign({ userId: 'x', isAdmin: true }, 'baska-bir-secret');
    const res = await PATCH(
      req('PATCH', `/api/listings/${l._id}`, fake, { description: 'x' }),
      ctx(String(l._id))
    );
    expect(res.status).toBe(401);
  });

  it('admin güncelleyebilir', async () => {
    const { PATCH } = await import('./[id]/route');
    const l = await createListing();
    const res = await PATCH(
      req('PATCH', `/api/listings/${l._id}`, adminToken(), { description: 'güncel' }),
      ctx(String(l._id))
    );
    expect(res.status).toBe(200);
  });

  it('admin için geçersiz id 400 döner (500 değil)', async () => {
    const { PATCH } = await import('./[id]/route');
    const res = await PATCH(
      req('PATCH', '/api/listings/gecersiz', adminToken(), { description: 'x' }),
      ctx('gecersiz')
    );
    expect(res.status).toBe(400);
  });
});

describe('DELETE /api/listings/[id]', () => {
  it('kimliksiz istek 401 döner ve kayıt silinmez', async () => {
    const { DELETE } = await import('./[id]/route');
    const { default: PS } = await import('@/models/ProductSubmission');
    const l = await createListing();
    const res = await DELETE(req('DELETE', `/api/listings/${l._id}`), ctx(String(l._id)));
    expect(res.status).toBe(401);
    expect(await PS.findById(l._id)).not.toBeNull();
  });

  it('admin olmayan kullanıcı 403 alır ve kayıt silinmez', async () => {
    const { DELETE } = await import('./[id]/route');
    const { default: PS } = await import('@/models/ProductSubmission');
    const l = await createListing();
    const res = await DELETE(
      req('DELETE', `/api/listings/${l._id}`, userToken()),
      ctx(String(l._id))
    );
    expect(res.status).toBe(403);
    expect(await PS.findById(l._id)).not.toBeNull();
  });

  it('admin silebilir', async () => {
    const { DELETE } = await import('./[id]/route');
    const { default: PS } = await import('@/models/ProductSubmission');
    const l = await createListing();
    const res = await DELETE(
      req('DELETE', `/api/listings/${l._id}`, adminToken()),
      ctx(String(l._id))
    );
    expect(res.status).toBe(200);
    expect(await PS.findById(l._id)).toBeNull();
  });
});

describe('POST /api/listings', () => {
  it('kimliksiz istek 401 döner ve kayıt oluşmaz', async () => {
    const { POST } = await import('./route');
    const { default: PS } = await import('@/models/ProductSubmission');
    const before = await PS.countDocuments({ brand: 'Sahte' });
    const res = await POST(req('POST', '/api/listings', undefined, newDoc));
    expect(res.status).toBe(401);
    expect(await PS.countDocuments({ brand: 'Sahte' })).toBe(before);
  });

  it('admin olmayan kullanıcı 403 alır', async () => {
    const { POST } = await import('./route');
    const res = await POST(req('POST', '/api/listings', userToken(), newDoc));
    expect(res.status).toBe(403);
  });

  it('admin oluşturabilir', async () => {
    const { POST } = await import('./route');
    const res = await POST(req('POST', '/api/listings', adminToken(), newDoc));
    expect(res.status).toBe(201);
  });
});

describe('GET /api/listings hâlâ herkese açık (web ve mobile bunu kullanıyor)', () => {
  it('kimliksiz GET 200 döner', async () => {
    const { GET } = await import('./route');
    const res = await GET(req('GET', '/api/listings'));
    expect(res.status).toBe(200);
  });
});
