#!/usr/bin/env node
/**
 * Test Data Seed Script (TypeScript)
 * Creates test users, listings, and offers for E2E and API testing
 */

import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Models - import directly from compiled paths
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  cep_telefonu: String,
  birth_date: String,
  isAdmin: Boolean,
  emailVerified: Boolean,
  createdAt: { type: Date, default: Date.now }
}));

const Listing = mongoose.model('Listing', new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  condition: String,
  price: Number,
  seller: mongoose.Schema.Types.ObjectId,
  images: [String],
  status: String,
  createdAt: { type: Date, default: Date.now }
}));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dusukbutce';

const testUsers = [
  {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    cep_telefonu: '5551234567',
    birth_date: '1990-01-01',
    isAdmin: false,
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    cep_telefonu: '5559876543',
    birth_date: '1985-05-15',
    isAdmin: true,
  },
];

const testListings = [
  {
    title: 'Test Laptop - Dell XPS 13',
    description: 'Laptop test ürünü - RAM 16GB, SSD 512GB',
    category: 'notebook',
    condition: 'like-new',
    price: 25000,
    images: [],
    status: 'active',
  },
  {
    title: 'Test Monitor - LG 4K',
    description: 'Monitor test ürünü - 4K, 27 inç',
    category: 'monitor',
    condition: 'good',
    price: 8000,
    images: [],
    status: 'active',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    console.log(`📍 Connecting to: ${MONGODB_URI}`);

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log('✅ Connected to MongoDB');

    // Clear existing test data
    console.log('🧹 Clearing existing test data...');
    await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
    await Listing.deleteMany({ title: { $regex: 'Test' } });
    console.log('✅ Cleared old test data');

    // Create test users
    console.log('👤 Creating test users...');
    const createdUsers = [];
    for (const userData of testUsers) {
      const hashedPassword = await bcryptjs.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
        emailVerified: true,
      });
      createdUsers.push(user);
      console.log(`  ✅ Created: ${userData.email}`);
    }

    // Create test listings
    console.log('📋 Creating test listings...');
    const sellerUser = createdUsers[0];
    for (const listingData of testListings) {
      const listing = await Listing.create({
        ...listingData,
        seller: sellerUser._id,
      });
      console.log(`  ✅ Created: ${listing.title}`);
    }

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('────────────────────────────────────────');
    testUsers.forEach(user => {
      console.log(`📧 ${user.email}`);
      console.log(`🔑 Password: ${user.password}`);
      console.log(`👤 Name: ${user.firstName} ${user.lastName}`);
      if (user.isAdmin) console.log(`⚙️  Admin: YES`);
      console.log('');
    });

    console.log('Ready for testing! 🚀');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
