import mongoose from 'mongoose';

const productSubmissionSchema = new mongoose.Schema({
  category: { type: String, required: true }, // notebook, desktop, graphics-card, etc.
  brand: { type: String, required: true },
  model: { type: String, required: true },
  type: { type: String }, // For specific categories
  manufacturingYear: { type: String },
  size: { type: String }, // For monitors, cases, etc.
  processor: { type: String },
  graphicsCard: { type: String },
  wattValue: { type: String },
  storage: { type: String },
  ram: { type: String },
  refreshRate: { type: String },
  screenSize: { type: String },
  batteryHealth: { type: String },
  cosmeticCondition: { type: String, required: true },
  screenStatus: { type: String },
  deadPixelCount: { type: String },
  hasBox: { type: Boolean, default: false },
  hasInvoice: { type: Boolean, default: false },
  invoiceDate: { type: String },
  images: [{ type: String }], // Base64 encoded images
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'offered', 'listed', 'rejected', 'approved', 'accepted', 'customer_rejected'], default: 'pending' },
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
  }
});

export default mongoose.models.ProductSubmission || mongoose.model('ProductSubmission', productSubmissionSchema); 