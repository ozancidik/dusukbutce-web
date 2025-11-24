import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined');
}

let isConnected = false;

async function connectDB() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    // MongoDB URI'yi log'la (şifreyi gizle)
    const maskedUri = MONGODB_URI.replace(/:[^:@]+@/, ':****@');
    console.log('🔗 MongoDB bağlantı URI (masked):', maskedUri);
    console.log('🔗 MongoDB URI uzunluğu:', MONGODB_URI.length);
    console.log('🔗 NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
    
    // Eğer zaten bağlıysa, mevcut bağlantıyı kullan
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if ((mongoose.connection.readyState as number) === 1) {
      isConnected = true;
      console.log('✅ MongoDB zaten bağlı');
      return;
    }
    
    // Eğer bağlantı kuruluyorsa bekle
    if ((mongoose.connection.readyState as number) === 2) {
      console.log('⏳ MongoDB bağlantısı bekleniyor...');
      let waitCount = 0;
      while ((mongoose.connection.readyState as number) === 2 && waitCount < 100) {
        await new Promise(resolve => setTimeout(resolve, 100));
        waitCount++;
      }
      if ((mongoose.connection.readyState as number) === 1) {
        isConnected = true;
        console.log('✅ MongoDB bağlantısı hazır');
        return;
      }
    }
    
    console.log('🔄 MongoDB bağlantısı kuruluyor...');
    // Yeni bağlantı kur - notebook endpoint ile aynı timeout ayarları
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000, // 30 saniye timeout (Artırıldı)
      socketTimeoutMS: 45000,
      bufferCommands: false,
      connectTimeoutMS: 30000 // 30 saniye (Artırıldı)
    });
    
    console.log('✅ MongoDB connect() resolve oldu, readyState:', mongoose.connection.readyState);
    
    // Bağlantının hazır olduğundan emin ol
    let retries = 0;
    const maxRetries = 100; // 10 saniye (100 * 100ms) - Artırıldı
    while ((mongoose.connection.readyState as number) !== 1 && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries++;
      if (retries % 10 === 0) {
        console.log(`⏳ MongoDB readyState bekleniyor... (${retries}/100)`);
      }
    }

    if ((mongoose.connection.readyState as number) !== 1) {
      console.error('❌ MongoDB readyState:', mongoose.connection.readyState);
      throw new Error(`MongoDB connection not ready after connect. readyState: ${mongoose.connection.readyState}`);
    }
    
    isConnected = true;
    console.log('✅ MongoDB bağlantısı tamamlandı');
    
  } catch (error: any) {
    isConnected = false;
    console.error('❌ MongoDB bağlantı hatası:', error);
    
    // Authentication hatası için detaylı bilgi
    if (error?.code === 8000 || error?.codeName === 'AtlasError' || error?.message?.includes('authentication failed')) {
      console.error('🔐 MongoDB Authentication Hatası Detayları:');
      console.error('  - Hata Kodu:', error?.code);
      console.error('  - Hata Adı:', error?.codeName);
      console.error('  - Hata Mesajı:', error?.message);
      console.error('💡 Çözüm Önerileri:');
      console.error('  1. Vercel Dashboard > Settings > Environment Variables');
      console.error('  2. MONGODB_URI değerini kontrol edin');
      console.error('  3. MongoDB Atlas > Database Access > Kullanıcı şifresini kontrol edin');
      console.error('  4. MongoDB Atlas > Network Access > IP whitelist kontrol edin');
      console.error('  5. Connection string formatı: mongodb+srv://username:password@cluster.mongodb.net/dbname');
      
      // URI formatını kontrol et (şifreyi gizle)
      if (MONGODB_URI) {
        const uriParts = MONGODB_URI.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@(.+)/);
        if (uriParts) {
          console.error('  - Kullanıcı adı:', uriParts[1]);
          console.error('  - Şifre uzunluğu:', uriParts[2].length, 'karakter');
          console.error('  - Cluster:', uriParts[3]);
        } else {
          console.error('  ⚠️ Connection string formatı beklenen formatta değil!');
        }
      }
    }
    
    throw error;
  }
}

export default connectDB; 