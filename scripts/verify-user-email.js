/**
 * Kullanıcı email'ini manuel olarak doğrulamak için script
 * 
 * Kullanım: 
 * node scripts/verify-user-email.js kullanici@email.com
 * 
 * veya tüm doğrulanmamış kullanıcıları listele:
 * node scripts/verify-user-email.js --list
 */

const mongoose = require('mongoose');

// MongoDB bağlantısı
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment değişkeni tanımlı değil');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  }
};

// User Schema (models/User.ts'den kopyalandı)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  phone: { type: String },
  dogum_tarihi: { type: Date },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: { type: String },
  emailVerificationExpires: { type: Date },
  authProviders: [{
    provider: String,
    providerId: String,
    connectedAt: Date
  }],
  acceptNewsletter: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Doğrulanmamış kullanıcıları listele
async function listUnverifiedUsers() {
  const users = await User.find({ 
    emailVerified: false 
  }).select('email name createdAt').sort({ createdAt: -1 });

  if (users.length === 0) {
    console.log('✅ Doğrulanmamış kullanıcı bulunamadı. Tüm kullanıcılar doğrulanmış!');
    return;
  }

  console.log(`📋 Doğrulanmamış Kullanıcılar (${users.length} adet):\n`);
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.email}`);
    console.log(`   İsim: ${user.name}`);
    console.log(`   Kayıt Tarihi: ${user.createdAt.toLocaleString('tr-TR')}`);
    console.log('');
  });
}

// Kullanıcıyı doğrula
async function verifyUserEmail(email) {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    console.error(`❌ Hata: ${email} adresli kullanıcı bulunamadı`);
    return false;
  }

  if (user.emailVerified) {
    console.log(`ℹ️  ${email} adresi zaten doğrulanmış`);
    return true;
  }

  // Email'i doğrula
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  user.updatedAt = new Date();
  await user.save();

  console.log(`✅ ${email} adresi başarıyla doğrulandı!`);
  console.log(`   Kullanıcı: ${user.name}`);
  console.log(`   Telefon: ${user.phone || 'Belirtilmemiş'}`);
  console.log(`   Kayıt Tarihi: ${user.createdAt.toLocaleString('tr-TR')}`);
  
  return true;
}

// Main fonksiyon
async function main() {
  try {
    await connectDB();

    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log('❌ Kullanım:');
      console.log('   node scripts/verify-user-email.js kullanici@email.com');
      console.log('   node scripts/verify-user-email.js --list');
      console.log('');
      process.exit(1);
    }

    const command = args[0];

    if (command === '--list' || command === '-l') {
      await listUnverifiedUsers();
    } else {
      const email = command;
      await verifyUserEmail(email);
    }

    await mongoose.connection.close();
    console.log('\n✅ İşlem tamamlandı');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Hata:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Script'i çalıştır
main();

