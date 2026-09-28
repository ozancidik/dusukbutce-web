import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// .env.local gerçek SMTP bilgisi içeriyor — bu testte ASLA e-posta gitmemeli.
vi.mock('@/lib/email', () => ({
  sendNewSubmissionNotificationToAdmin: vi.fn().mockResolvedValue(undefined),
}));

// bize-sat formlarının gönderdiği alanların ALLOWED_FIELDS + şema zincirinden
// geçip gerçekten kaydedildiğini (ve formdan çıkarılan alanların kaydedilmediğini)
// gerçek bir MongoDB'ye (bellekte, izole) karşı doğrular. Alan hem ALLOWED_FIELDS'ta
// hem şemada değilse sessizce atılır — bu test o sessiz kaybı yakalar.

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

async function submit(body: Record<string, unknown>) {
  const { handleProductSubmission } = await import('@/lib/handleProductSubmission');
  const { default: ProductSubmission } = await import('@/models/ProductSubmission');
  const res = await handleProductSubmission(
    new Request('http://localhost/api/submissions', {
      method: 'POST',
      body: JSON.stringify({ brand: 'Marka', model: 'Model', cosmeticCondition: 'İyi', ...body }),
    }),
    'test'
  );
  expect(res.status).toBe(200);
  const { id } = await res.json();
  return ProductSubmission.findById(id).lean<Record<string, unknown>>();
}

describe('bize-sat alanları kaydediliyor', () => {
  it('yazıcı: printColor ve connectivity kaydedilir, printSpeed/color atılır', async () => {
    const doc = await submit({
      category: 'yazici',
      printColor: 'Renkli',
      connectivity: 'WiFi',
      printSpeed: '30ppm',
      color: 'Siyah',
    });
    expect(doc).toMatchObject({ printColor: 'Renkli', connectivity: 'WiFi' });
    expect(doc).not.toHaveProperty('printSpeed');
    expect(doc).not.toHaveProperty('color');
  });

  it('fotokopi: speed ve connectivity kaydedilir', async () => {
    const doc = await submit({
      category: 'fotokopi-makinesi',
      speed: '25 ppm',
      connectivity: 'Ethernet',
    });
    expect(doc).toMatchObject({ speed: '25 ppm', connectivity: 'Ethernet' });
  });

  it('tarayıcı: connectivity kaydedilir, scanSpeed atılır', async () => {
    const doc = await submit({ category: 'tarayici', connectivity: 'USB', scanSpeed: '10ppm' });
    expect(doc).toMatchObject({ connectivity: 'USB' });
    expect(doc).not.toHaveProperty('scanSpeed');
  });

  it('kasa: powerSupply (Var/Yok) ve wattValue kaydedilir', async () => {
    const doc = await submit({ category: 'kasa', powerSupply: 'Var', wattValue: '650' });
    expect(doc).toMatchObject({ powerSupply: 'Var', wattValue: '650' });
  });

  it('soğutucu: size (fan/radyatör boyutu) kaydedilir', async () => {
    const doc = await submit({ category: 'sogutucu', size: '360mm' });
    expect(doc).toMatchObject({ size: '360mm' });
  });
});
