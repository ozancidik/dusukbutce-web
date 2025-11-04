// Admin şifresini güncelleme scripti
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

async function updateAdminPassword() {
  try {
    console.log('🔗 MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    const email = 'admin@dusukbutce.com';
    const newPassword = 'Admin123*';

    // Admin kullanıcısını bul
    const adminUser = await User.findOne({ email });
    
    if (!adminUser) {
      console.log('❌ Admin kullanıcısı bulunamadı!');
      console.log('💡 Önce create-admin.js scriptini çalıştırın.');
      process.exit(1);
    }

    console.log('🔍 Admin kullanıcısı bulundu:', adminUser.email);
    console.log('🔧 Şifre güncelleniyor...\n');
    
    // Yeni şifreyi hash'le
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Şifreyi güncelle
    adminUser.password = hashedPassword;
    adminUser.updatedAt = new Date();
    
    await adminUser.save();
    
    console.log('✅ Admin şifresi başarıyla güncellendi!');
    console.log('\n' + '='.repeat(50));
    console.log('🎉 GÜNCEL ADMIN GİRİŞ BİLGİLERİ');
    console.log('='.repeat(50));
    console.log(`📧 Email:   ${email}`);
    console.log(`🔑 Şifre:   ${newPassword}`);
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

updateAdminPassword();




