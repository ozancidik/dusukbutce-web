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
  isAdmin: Boolean,
  emailVerified: Boolean,
  authProviders: Array,
  createdAt: Date,
  updatedAt: Date
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function updateUserPassword() {
  try {
    console.log('🔗 MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    const email = 'ozancidik@gmail.com';
    const newPassword = 'Ywe3nj123*';

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`❌ Kullanıcı bulunamadı: ${email}`);
      process.exit(1);
    }

    console.log('🔍 Kullanıcı bulundu:', user.email);
    console.log('🔧 Şifre güncelleniyor...\n');
    
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    user.password = hashedPassword;
    user.updatedAt = new Date();
    
    await user.save();
    
    console.log('✅ Kullanıcı şifresi başarıyla güncellendi!');
    console.log('\n' + '='.repeat(50));
    console.log('🎉 YENİ GİRİŞ BİLGİLERİ');
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

updateUserPassword();












