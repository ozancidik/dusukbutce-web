// Admin yetkisini kaldırma scripti
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI bulunamadı!');
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
  isAdmin: Boolean,
  emailVerified: Boolean,
  authProviders: Array,
  createdAt: Date,
  updatedAt: Date
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function removeAdminRole() {
  try {
    console.log('🔗 MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    const email = 'ozancidik@gmail.com';

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('❌ Kullanıcı bulunamadı:', email);
      process.exit(1);
    }

    console.log('🔍 Kullanıcı bulundu:', user.email);
    console.log('🔧 Admin yetkisi kaldırılıyor...\n');
    
    // Admin yetkisini kaldır
    user.isAdmin = false;
    user.updatedAt = new Date();
    
    await user.save();
    
    console.log('✅ Admin yetkisi başarıyla kaldırıldı!');
    console.log('\n' + '='.repeat(50));
    console.log('🎉 GÜNCEL KULLANICI BİLGİLERİ');
    console.log('='.repeat(50));
    console.log(`📧 Email:   ${user.email}`);
    console.log(`👤 Name:    ${user.name}`);
    console.log(`🔑 Admin:   ❌ HAYIR (Normal kullanıcı)`);
    console.log(`🔑 Şifre:   NewPassword123!`);
    console.log(`🌐 URL:     http://localhost:3000/login`);
    console.log('='.repeat(50) + '\n');
    
  } catch (error) {
    console.error('\n❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı\n');
  }
}

removeAdminRole();
