// Script to make a user admin
// Usage: node scripts/make-admin.js <email>

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI bulunamadı! .env.local dosyasını kontrol edin.');
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  updatedAt: { type: Date, default: Date.now }
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function makeAdmin(email) {
  try {
    console.log('🔗 MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    const userEmail = email.toLowerCase();
    console.log(`\n🔍 Kullanıcı aranıyor: ${userEmail}`);

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.error(`\n❌ Kullanıcı bulunamadı: ${userEmail}`);
      console.log('\n💡 Önce bu email ile kayıt olmanız gerekiyor.');
      process.exit(1);
    }

    if (user.isAdmin) {
      console.log(`\n✅ ${userEmail} zaten admin!`);
      console.log(`   İsim: ${user.name}`);
      console.log(`   Kayıt: ${user.createdAt}`);
      process.exit(0);
    }

    // Admin yap
    user.isAdmin = true;
    user.updatedAt = new Date();
    await user.save();

    console.log(`\n✅ BAŞARILI! ${userEmail} artık admin!`);
    console.log(`   İsim: ${user.name}`);
    console.log(`   Kayıt: ${user.createdAt}`);
    console.log(`   Admin yapıldı: ${user.updatedAt}`);

    console.log('\n🔐 Artık şu bilgilerle admin paneline giriş yapabilirsiniz:');
    console.log(`   E-posta: ${user.email}`);
    console.log(`   Şifre: [kayıt olurken kullandığınız şifre]`);
    
  } catch (error) {
    console.error('\n❌ Hata:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 MongoDB bağlantısı kapatıldı');
  }
}

// Komut satırından email al
const email = process.argv[2];

if (!email) {
  console.error('❌ Email adresi belirtilmedi!');
  console.log('\n📝 Kullanım:');
  console.log('   node scripts/make-admin.js <email>');
  console.log('\n📚 Örnek:');
  console.log('   node scripts/make-admin.js ozancidik@gmail.com');
  process.exit(1);
}

makeAdmin(email);

