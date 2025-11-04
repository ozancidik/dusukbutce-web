// Script to add local provider to a user who registered with Google/Facebook
// Usage: node scripts/add-local-provider.js <email> <new-password>

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI bulunamadı! .env.local dosyasını kontrol edin.');
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  authProviders: [{
    provider: { type: String, enum: ['local', 'google', 'facebook'], required: true },
    providerId: { type: String },
    connectedAt: { type: Date, default: Date.now }
  }],
  isActive: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function addLocalProvider(email, newPassword) {
  try {
    console.log('🔗 MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    const userEmail = email.toLowerCase();
    console.log(`\n🔍 Kullanıcı aranıyor: ${userEmail}`);

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.error(`\n❌ Kullanıcı bulunamadı: ${userEmail}`);
      process.exit(1);
    }

    console.log(`\n👤 Kullanıcı bulundu: ${user.name}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🔑 Mevcut Providers:`, user.authProviders?.map(p => p.provider).join(', ') || 'Yok');

    // Local provider var mı kontrol et
    const hasLocalProvider = user.authProviders?.some(p => p.provider === 'local');

    if (hasLocalProvider) {
      console.log('\n⚠️  Bu kullanıcıda zaten local provider var!');
      console.log('ℹ️  Şifre güncellenecek...');
    }

    // Yeni şifreyi hashle
    console.log('\n🔐 Şifre hashleniyor...');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Local provider ekle veya güncelle
    if (!hasLocalProvider) {
      if (!user.authProviders) {
        user.authProviders = [];
      }
      user.authProviders.push({
        provider: 'local',
        providerId: 'local',
        connectedAt: new Date()
      });
    }

    user.password = hashedPassword;
    user.updatedAt = new Date();
    await user.save();

    console.log('\n✅ BAŞARILI! Local provider eklendi/güncellendi');
    console.log(`\n🔐 Artık şu bilgilerle giriş yapabilirsiniz:`);
    console.log(`   E-posta: ${user.email}`);
    console.log(`   Şifre: ${newPassword}`);
    
  } catch (error) {
    console.error('\n❌ Hata:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 MongoDB bağlantısı kapatıldı');
  }
}

// Komut satırından email ve password al
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('❌ Email veya şifre belirtilmedi!');
  console.log('\n📝 Kullanım:');
  console.log('   node scripts/add-local-provider.js <email> <new-password>');
  console.log('\n📚 Örnek:');
  console.log('   node scripts/add-local-provider.js ozancidik@gmail.com YeniSifre123!');
  process.exit(1);
}

if (password.length < 6) {
  console.error('❌ Şifre en az 6 karakter olmalıdır!');
  process.exit(1);
}

addLocalProvider(email, password);

