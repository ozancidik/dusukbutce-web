import mongoose from 'mongoose';

const TechnicalServiceSubmissionSchema = new mongoose.Schema({
  // Kişisel Bilgiler
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  
  // Adres Bilgileri
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  
  // Hizmet Bilgileri
  serviceType: {
    type: String,
    required: true, // PC Onarım, Laptop Tamiri, vb.
  },
  deliveryMethod: {
    type: String,
    required: true,
    enum: ['evimden-al', 'kargo-ile-gonder'],
  },
  
  // Cihaz Bilgileri
  deviceInfo: {
    type: String,
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
  
  // Randevu Bilgileri (sadece evimden-al için)
  preferredDate: {
    type: String,
    required: false,
  },
  preferredTime: {
    type: String,
    required: false,
  },
  
  // Kargo Bilgileri (sadece kargo-ile-gonder için)
  shippingMethod: {
    type: String,
    required: false, // aras, mng, yurtici, ptt
  },
  
  // Ek Bilgiler
  notes: {
    type: String,
    required: false,
  },
  
  // Durum
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  
  // Admin Notları
  adminNotes: {
    type: String,
    required: false,
  },
  
  // Tariçler
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// updatedAt'ı otomatik güncelle
TechnicalServiceSubmissionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const TechnicalServiceSubmission = mongoose.models.TechnicalServiceSubmission || 
  mongoose.model('TechnicalServiceSubmission', TechnicalServiceSubmissionSchema);

export default TechnicalServiceSubmission;

