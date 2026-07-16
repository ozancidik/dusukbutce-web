import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined');
}

// Bağlantı ayarları (öncekiyle aynı).
const CONNECT_OPTIONS: mongoose.ConnectOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  bufferCommands: false,
  connectTimeoutMS: 30000,
};

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Hot-reload (dev) ve serverless invocation'ları arasında tek bir bağlantıyı
// paylaşmak için global cache. Aksi halde her istek yeni bağlantı açıp
// bağlantı havuzunu tüketebilir.
const globalForMongoose = global as typeof globalThis & {
  _mongooseCache?: MongooseCache;
};

const cached: MongooseCache =
  globalForMongoose._mongooseCache ?? { conn: null, promise: null };
globalForMongoose._mongooseCache = cached;

async function connectDB(): Promise<typeof mongoose> {
  // Zaten bağlıysa mevcut bağlantıyı döndür.
  if (cached.conn) {
    return cached.conn;
  }

  // Bağlantı kuruluyorsa aynı promise'i bekle (eşzamanlı istekler için).
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, CONNECT_OPTIONS);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Başarısız olursa promise'i sıfırla ki sonraki istek yeniden denesin.
    cached.promise = null;
    console.error('❌ MongoDB bağlantı hatası:', error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;
