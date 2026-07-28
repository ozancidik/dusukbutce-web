import mongoose from 'mongoose';

const productSubmissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true }, // notebook, desktop, graphics-card, etc.
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
  status: { type: String, enum: ['pending', 'offered', 'listed', 'rejected', 'approved', 'accepted', 'customer_accepted', 'customer_rejected', 'delivery_confirmed'], default: 'pending' },
  offerNumber: { type: String }, // Teklif numarası (OFFER-2024-001234)
  orderNumber: { type: String }, // Sipariş numarası (ORDER-2024-001234)
  adminNotes: { type: String },
  offer: {
    amount: { type: Number },
    notes: { type: String },
    date: { type: Date }
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
  power: { type: String }
});

export default mongoose.models.ProductSubmission || mongoose.model('ProductSubmission', productSubmissionSchema); 