const mongoose = require('mongoose');
require('dotenv').config();

// User model'ini manuel olarak tanımla (TypeScript import sorunu için)
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

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function migrateUsers() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB\'ye bağlandı');

    // Tüm kullanıcıları bul
    const users = await User.find({});
    console.log(`${users.length} kullanıcı bulundu`);

    let updatedCount = 0;

    for (const user of users) {
      // Eğer authProviders yoksa ekle
      if (!user.authProviders || user.authProviders.length === 0) {
        // Şifre varsa local provider, yoksa oauth provider
        const provider = user.password && user.password.length > 0 ? 'local' : 'unknown';
        
        user.authProviders = [{
          provider: provider,
          providerId: null,
          connectedAt: user.createdAt || new Date()
        }];
        
        await user.save();
        updatedCount++;
        console.log(`Kullanıcı güncellendi: ${user.email} (${provider})`);
      }
    }

    console.log(`Toplam ${updatedCount} kullanıcı güncellendi`);
    
  } catch (error) {
    console.error('Migration hatası:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

migrateUsers();
