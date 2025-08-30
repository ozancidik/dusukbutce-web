const mongoose = require('mongoose');
require('dotenv').config();

// User model'ini import et
const User = require('../models/User');

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
