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
    if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
      isConnected = true;
      console.log('MongoDB already connected');
      return;
    }
    
    // Eğer bağlantı kuruluyorsa, bekle
    if (mongoose.connection.readyState === mongoose.ConnectionStates.connecting) {
      console.log('MongoDB connection in progress, waiting...');
      await new Promise(resolve => {
        mongoose.connection.once('connected', resolve);
        mongoose.connection.once('error', resolve);
      });
      
      if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
        isConnected = true;
        console.log('MongoDB connection completed');
        return;
      }
    }
    
    // Yeni bağlantı kur
    if (mongoose.connection.readyState === mongoose.ConnectionStates.disconnected) {
      console.log('Establishing new MongoDB connection...');
      await mongoose.connect(MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        bufferCommands: true
      });
      
      isConnected = true;
      console.log('MongoDB connected successfully');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }
}

export default connectDB; 