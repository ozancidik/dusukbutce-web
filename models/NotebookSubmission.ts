import mongoose from 'mongoose';

const notebookSubmissionSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  processor: { type: String, required: true },
  graphicsCard: { type: String, required: true },
  wattValue: { type: String, required: true },
  storage: { type: String, required: true },
  ram: { type: String, required: true },
  refreshRate: { type: String, required: true },
  screenSize: { type: String, required: true },
  batteryHealth: { type: String, required: true },
  cosmeticCondition: { type: String, required: true },
  screenStatus: { type: String, required: true },
  deadPixelCount: { type: String, required: true },
  hasBox: { type: Boolean, default: false },
  hasInvoice: { type: Boolean, default: false },
  invoiceDate: { type: String },
  images: [{ type: String }], // Base64 encoded images
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminNotes: { type: String },
});

export default mongoose.models.NotebookSubmission || mongoose.model('NotebookSubmission', notebookSubmissionSchema); 