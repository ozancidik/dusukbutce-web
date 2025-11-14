import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: false, // OAuth kullanıcıları için password gerekli değil
    default: ''
  },
  name: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String,
    unique: true,
    sparse: true
  },
  address: { 
    type: String 
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: { 
    type: Date 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  authProviders: [{
    provider: { type: String, enum: ['local', 'google', 'facebook'], required: true },
    providerId: { type: String },
    connectedAt: { type: Date, default: Date.now }
  }],
  resetPasswordToken: { 
    type: String 
  },
  resetPasswordExpires: { 
    type: Date 
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String
  },
  emailVerificationExpires: {
    type: Date
  },
  dogum_tarihi: {
    type: Date
  },
  birthDate: {
    type: String
  },
  birthDateEdited: {
    type: Boolean,
    default: false
  },
  acceptNewsletter: {
    type: Boolean,
    default: false
  },
  emailChangeVerificationCode: {
    type: String
  },
  emailChangeVerificationExpiry: {
    type: Date
  },
  pendingEmailChange: {
    type: String,
    lowercase: true,
    trim: true
  },
  addresses: [{
    title: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    postalCode: { type: String, default: '' },
    isDefault: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }]
});

export default mongoose.models.User || mongoose.model('User', userSchema); 