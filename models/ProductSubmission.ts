import mongoose from 'mongoose';

const productSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true }, // notebook, desktop, graphics-card, etc.
  submissionNumber: { type: String }, // Talep numarası (TLP-2024-000123) - oluşturma anında atanır
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String }, // For specific categories
  manufacturingYear: { type: String },
  size: { type: String }, // For monitors, cases, etc.
  processor: { type: String },
  processorBrand: { type: String }, // Notebook için
  graphicsCard: { type: String },
  graphicsCardWatt: { type: String }, // Notebook için
  wattValue: { type: String },
  storage: { type: String },
  storageType: { type: String }, // Notebook için
  ram: { type: String },
  ramType: { type: String }, // Notebook için
  refreshRate: { type: String },
  screenSize: { type: String },
  batteryHealth: { type: String },
  condition: { type: String }, // Durum (Sıfır, İkinci El, vb.)
  cosmeticCondition: { type: String, required: true },
  accessories: { type: String }, // Aksesuarlar
  storageCapacity: { type: String }, // Depolama kapasitesi
  hasWarranty: { type: Boolean, default: false }, // Garanti var mı
  warrantyDuration: { type: String }, // Garanti süresi
  description: { type: String }, // Açıklama
  screenStatus: { type: String },
  deadPixelCount: { type: String },
  hasBox: { type: Boolean, default: false },
  hasInvoice: { type: Boolean, default: false },
  invoiceDate: { type: String },
  images: [{ type: String }], // Base64 encoded images
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'offered', 'listed', 'rejected', 'approved', 'accepted', 'customer_accepted', 'customer_rejected', 'delivery_confirmed', 'delivery_completed', 'cancel_requested', 'cancelled'], default: 'pending' },
  offerNumber: { type: String }, // Teklif numarası (OFFER-2024-001234)
  orderNumber: { type: String }, // Sipariş numarası (ORDER-2024-001234)
  adminNotes: { type: String },
  offer: {
    amount: { type: Number },
    notes: { type: String },
    date: { type: Date }
  },
  // Ödeme teyidi — müşteriye banka transferiyle para gönderildiğinde admin
  // işaretler. status'tan bağımsız ayrı bir alan: "kabul edildi" ile
  // "ödeme yapıldı" farklı olaylar, biri diğerini otomatik takip etmez.
  payment: {
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    amount: { type: Number },
    method: { type: String }, // Örn. "Banka Havalesi/EFT"
    paidAt: { type: Date },
    paidBy: { type: String }, // İşlemi yapan admin e-postası
    note: { type: String }
  },
  // Müşterinin iptal talebi — status 'cancel_requested' iken bekleniyor,
  // admin onaylarsa status 'cancelled' olur, reddederse previousStatus'a
  // geri döner. offer/payment ile aynı desende ayrı bir alt-nesne.
  cancellation: {
    reason: { type: String },
    requestedAt: { type: Date },
    previousStatus: { type: String },
    resolvedAt: { type: Date },
    resolvedBy: { type: String }, // İşlemi yapan admin e-postası
    adminNote: { type: String }
  },
  listing: {
    price: { type: Number },
    title: { type: String },
    description: { type: String },
    date: { type: Date }
  },
  rejectionReason: { type: String },
  rejectedAt: { type: Date },
  customerResponse: {
    action: { type: String, enum: ['accepted', 'rejected'] },
    note: { type: String },
    reason: { type: String },
    date: { type: Date }
  },
  deliveryMethod: { type: String, enum: ['kargo', 'evden'] },
  customerInfo: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    district: { type: String },
    notes: { type: String }
  },
  // İşlemci özel alanları
  stokFan: { type: String },
  cache: { type: String },
  socket: { type: String },
  // Ekran kartı özel alanları
  memory: { type: String },
  memoryType: { type: String },
  coreClock: { type: String },
  boostClock: { type: String },
  powerConsumption: { type: String },
  ports: { type: String },
  interface: { type: String },
  chipSet: { type: String },
  dviOutput: { type: String },
  furmarkResult: { type: String },
  opened: { type: String },
  thermalPadChanged: { type: String },
  miningUsed: { type: String },
  miningDuration: { type: String },
  warrantySticker: { type: String },
  coilWhine: { type: String },
  oxidation: { type: String },
  // RAM / SSD
  capacity: { type: String },
  speed: { type: String },
  latency: { type: String },
  // Mouse
  dpi: { type: String },
  // Genel bağlantı türü (mouse, klavye, tablet, kulaklık, ses sistemi)
  connectivity: { type: String },
  // Klavye
  switchType: { type: String },
  layout: { type: String },
  // Monitör
  resolution: { type: String },
  panelType: { type: String },
  responseTime: { type: String },
  // Ses sistemi
  power: { type: String },
  // Masaüstü bilgisayar özel alanları
  powerSupply: { type: String },
  motherboard: { type: String },
  case: { type: String },
  // Kasa güç kaynağı markası (brand alanıyla karışmaması için ayrı alan)
  psuBrand: { type: String },
  // Cep telefonu kayıt türü (Yurtiçi/Yurtdışı)
  registrationType: { type: String },
  // Yazıcı baskı rengi (Siyah-Beyaz / Renkli)
  printColor: { type: String },
  // Durum/arıza alanları (bize-sat raporu bölüm 3)
  pinDamage: { type: String }, // İşlemci: soket pinlerinde eğiklik/hasar (Hayır/Evet)
  driveHealth: { type: String }, // SSD sağlık yüzdesi / yazılan veri
  clickIssue: { type: String }, // Mouse çift tıklama / tık sorunu (Hayır/Evet)
  controllers: { type: String }, // PlayStation/Xbox kol sayısı
  stickDrift: { type: String }, // Kol/gamepad stick drift (Hayır/Evet)
  pedal: { type: String }, // Direksiyon: pedal seti dahil mi (Evet/Hayır)
  shifterIncluded: { type: String }, // Direksiyon: vites kolu dahil mi (Evet/Hayır)
  forceFeedback: { type: String }, // Direksiyon: force feedback (Evet/Hayır/Desteklemiyor)
  accountLock: { type: String }, // Telefon/tablet hesap kilidi (Kapalı/Açık)
  partReplaced: { type: String }, // Telefon ekran/parça değişimi
  biometricWorking: { type: String }, // Telefon Face ID / Touch ID çalışıyor mu
  pageCount: { type: String }, // Yazıcı/fotokopi sayfa sayacı
  mountingKit: { type: String }, // Soğutucu montaj aparatları dahil mi
  // Düşük öncelikli durum/aksesuar alanları (bize-sat raporu bölüm 3)
  chargerIncluded: { type: String }, // Notebook şarj adaptörü dahil mi
  knownIssues: { type: String }, // Notebook/masaüstü bilinen arıza
  overclocked: { type: String }, // İşlemci overclock/delid
  moduleKit: { type: String }, // RAM kit / modül sayısı
  missingKeys: { type: String }, // Klavye eksik tuş
  micWorking: { type: String }, // Kulaklık mikrofon
  earPadCondition: { type: String }, // Kulaklık kulak pedi
  chargingCase: { type: String }, // TWS şarj kutusu
  pumpIssue: { type: String }, // Sıvı soğutucu pompa/sızıntı
  sidePanelCondition: { type: String }, // Kasa yan panel
  includedFans: { type: String }, // Kasa dahil fanlar
  jailbreak: { type: String }, // PlayStation jailbreak/modlu
  firmware: { type: String }, // PlayStation firmware
  tonerStatus: { type: String }, // Yazıcı/fotokopi toner-kartuş-drum durumu
  adfIncluded: { type: String }, // Fotokopi/tarayıcı ADF dahil mi
  usageLevel: { type: String }, // Tarayıcı kullanım yoğunluğu
  multifunction: { type: String }, // Yazıcı/fotokopi: çok işlevli mi (Evet/Hayır)
  paperSize: { type: String }, // Yazıcı/fotokopi: A4/A3
  usageType: { type: String }, // Yazıcı/fotokopi: kullanım tipi (Ev/Büro/Taşınabilir/Endüstriyel)
  // Gaming direksiyon / direksiyon uyumluluk (PC/PlayStation/Xbox)
  compatibility: { type: String },
  // RAM form faktörü (Masaüstü/DIMM vs Notebook/SO-DIMM) — itopya.com'daki
  // "Ram Uyumluluğu" alanına karşılık gelir, farklı ürün gruplarını ayırır.
  ramFormFactor: { type: String },
  // Ekran kartı bellek nesli (GDDR6/GDDR6X/GDDR7). "memoryType" alanı
  // burada tarihsel olarak bellek arayüzü (bit genişliği) için kullanılıyor,
  // ikisini karıştırmamak için ayrı bir alan.
  memoryGeneration: { type: String }
});

export default mongoose.models.ProductSubmission || mongoose.model('ProductSubmission', productSubmissionSchema); 