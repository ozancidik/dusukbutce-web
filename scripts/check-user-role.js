// Kullanıcı rolünü kontrol etme scripti
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

async function checkUserRole() {
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

    console.log('�� Kullanıcı bilgileri:');
    console.log('='.repeat(50));
    console.log(`📧 Email:        ${user.email}`);
    console.log(`👤 Name:         ${user.name || 'Belirtilmemiş'}`);
    console.log(`🔑 Admin:        ${user.isAdmin ? '✅ EVET' : '❌ HAYIR'}`);
    console.log(`📧 Email Verified: ${user.emailVerified ? '✅ EVET' : '❌ HAYIR'}`);
    console.log(`📱 Phone:        ${user.phone || 'Belirtilmemiş'}`);
    console.log(`📅 Created:      ${user.createdAt || 'Belirtilmemiş'}`);
    console.log(`🔄 Updated:      ${user.updatedAt || 'Belirtilmemiş'}`);
    console.log('='.repeat(50));
    
    if (user.isAdmin) {
      console.log('🎉 Bu kullanıcı ADMIN yetkisine sahip!');
    } else {
      console.log('ℹ️  Bu kullanıcı normal kullanıcı.');
    }
    
  } catch (error) {
    console.error('\n❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 MongoDB bağlantısı kapatıldı');
  }
}

checkUserRole();
