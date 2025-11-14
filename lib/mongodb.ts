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
    
    // Eğer zaten bağlıysa, mevcut bağlantıyı kullan
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
      return;
    }
    
    // Yeni bağlantı kur
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // 10 saniye timeout
      socketTimeoutMS: 45000,
      bufferCommands: false,
      connectTimeoutMS: 10000
    });
    
    // mongoose.connect() promise resolve olduğunda bağlantı hazır olmalı
    // Ancak emin olmak için kısa bir kontrol yap
    let retries = 0;
    const maxRetries = 10;
    // readyState: 1 = connected
    while ((mongoose.connection.readyState as number) !== 1 && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries++;
    }

    if ((mongoose.connection.readyState as number) !== 1) {
      throw new Error('MongoDB connection not ready after connect');
    }
    
    isConnected = true;
  } catch (error) {
    isConnected = false;
    throw error;
  }
}

export default connectDB; 