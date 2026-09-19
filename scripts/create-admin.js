// Admin hesabı oluşturma scripti
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

async function createAdmin() {
  try {
    console.log('🔗 MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    const email = process.env.ADMIN_EMAIL || 'admin@dusukbutce.com';
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Admin Düşük Bütçe';

    if (!password) {
      console.error('❌ ADMIN_PASSWORD ortam değişkeni gerekli (sabit/zayıf bir şifre kodlanmıyor).');
      console.error('   Kullanım: ADMIN_PASSWORD="GüçlüBirŞifre123!" node scripts/create-admin.js');
      process.exit(1);
    }
    if (password.length < 12) {
      console.error('❌ ADMIN_PASSWORD en az 12 karakter olmalı.');
      process.exit(1);
    }

    // Mevcut admin var mı kontrol et
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('⚠️  Bu email ile zaten bir kullanıcı var!');
      console.log('🔧 Mevcut kullanıcıyı admin yapıp şifresini güncelliyorum...\n');
      
      const hashedPassword = await bcrypt.hash(password, 12);
      existingUser.password = hashedPassword;
      existingUser.isAdmin = true;
      existingUser.emailVerified = true;
      existingUser.updatedAt = new Date();
      
      // authProviders yoksa ekle
      if (!existingUser.authProviders || existingUser.authProviders.length === 0) {
        existingUser.authProviders = [{
          provider: 'local',
          providerId: null,
          connectedAt: new Date()
        }];
      }
      
      await existingUser.save();
      
      console.log('✅ Kullanıcı güncellendi!');
    } else {
      console.log('🆕 Yeni admin hesabı oluşturuluyor...\n');
      
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const admin = new User({
        email,
        password: hashedPassword,
        name,
        phone: '05551234567',
        isAdmin: true,
        emailVerified: true,
        acceptNewsletter: false,
        authProviders: [{
          provider: 'local',
          providerId: null,
          connectedAt: new Date()
        }],
        createdAt: new Date(),
        updatedAt: new Date()
      });

      await admin.save();
      console.log('✅ Admin hesabı oluşturuldu!');
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎉 ADMIN GİRİŞ BİLGİLERİ');
    console.log('='.repeat(50));
    console.log(`📧 Email:   ${email}`);
    console.log(`🔑 Şifre:   ${password}`);
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

createAdmin();



