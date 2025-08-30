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
    required: true 
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
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema); 