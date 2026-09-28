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

describe('durum/arıza alanları (rapor bölüm 3) kaydediliyor', () => {
  const cases: Array<[string, string, Record<string, string>]> = [
    [
      'cep-telefonu',
      'telefon',
      {
        accountLock: 'Kapalı',
        partReplaced: 'Hayır',
        biometricWorking: 'Evet',
        batteryHealth: '91',
      },
    ],
    ['tablet', 'tablet', { accountLock: 'Açık', batteryHealth: '89' }],
    ['islemci', 'işlemci', { pinDamage: 'Evet', socket: 'AM4' }],
    ['ssd', 'ssd', { driveHealth: '%98, 12 TB yazılmış' }],
    ['mouse', 'mouse', { clickIssue: 'Evet' }],
    ['playstation', 'playstation', { controllers: '2', stickDrift: 'Hayır' }],
    ['gamepad', 'gamepad', { stickDrift: 'Evet' }],
    [
      'gaming-wheel',
      'direksiyon',
      {
        pedal: 'Evet',
        shifterIncluded: 'Hayır',
        forceFeedback: 'Desteklemiyor',
        compatibility: 'Bilgisayar+Xbox',
      },
    ],
    ['yazici', 'yazıcı', { pageCount: '25000', printColor: 'Renkli' }],
    ['fotokopi-makinesi', 'fotokopi', { pageCount: '120000' }],
    ['cooler', 'soğutucu', { mountingKit: 'Eksik var', size: '360mm' }],
    ['monitor', 'monitör', { screenStatus: 'Sorunsuz', deadPixelCount: '0' }],
    ['notebook', 'notebook', { screenStatus: 'Hafif çizik / leke', deadPixelCount: '2' }],
  ];
  it.each(cases)('%s (%s): alanlar veritabanına yazılır', async (category, _ad, fields) => {
    const doc = await submit({ category, ...fields });
    expect(doc).toMatchObject(fields);
  });
});

describe('düşük öncelikli durum/aksesuar alanları kaydediliyor', () => {
  const cases: Array<[string, Record<string, string>]> = [
    ['notebook', { chargerIncluded: 'Evet', layout: 'TR-Q', knownIssues: 'menteşe gevşek' }],
    ['desktop', { case: 'NZXT H510', knownIssues: 'yok' }],
    ['processor', { overclocked: 'Hayır' }],
    ['ram', { moduleKit: '2x8GB', ramType: 'DDR4', ramFormFactor: 'DIMM' }],
    ['monitor', { accessories: 'Stand ve kablolar dahil' }],
    ['keyboard', { missingKeys: 'Hayır' }],
    [
      'headphones',
      {
        type: 'TWS (kablosuz kulak içi)',
        micWorking: 'Evet',
        earPadCondition: 'İyi',
        chargingCase: 'Evet',
      },
    ],
    ['cooler', { pumpIssue: 'Hava soğutucu' }],
    ['case', { sidePanelCondition: 'Sağlam', includedFans: '3 adet 120mm' }],
    ['playstation', { jailbreak: 'Hayır', firmware: '9.00' }],
    ['gamepad', { batteryHealth: 'İyi' }],
    ['tablet', { accessories: 'Sadece kalem' }],
    ['audio-system', { power: '60', connectivity: 'Bluetooth', accessories: 'Hiçbiri' }],
    ['yazici', { tonerStatus: 'Dahil, dolu' }],
    ['fotokopi-makinesi', { tonerStatus: 'Dahil, boş / az', adfIncluded: 'Evet' }],
    ['tarayici', { adfIncluded: 'Hayır', usageLevel: 'Orta' }],
  ];
  it.each(cases)('%s: alanlar veritabanına yazılır', async (category, fields) => {
    const doc = await submit({ category, ...fields });
    expect(doc).toMatchObject(fields);
  });
});
