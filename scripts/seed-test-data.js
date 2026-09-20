#!/usr/bin/env node
/**
 * Test Data Seed Script
 * Creates test users, listings, and offers for E2E and API testing
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dusukbutce';

// Models
const User = require('../models/User');
const Listing = require('../models/Listing');

const testUsers = [
  {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    phone: '5551234567',
    isAdmin: false,
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    phone: '5559876543',
    isAdmin: true,
  },
  {
    email: 'seller@example.com',
    password: 'seller123',
    name: 'Seller User',
    phone: '5559998888',
    isAdmin: false,
  },
  {
    email: 'buyer@example.com',
    password: 'buyer123',
    name: 'Buyer User',
    phone: '5550001111',
    isAdmin: false,
  },
];

const testListings = [
  {
    title: 'Test Laptop - Dell XPS 13',
    description: 'Laptop test ürünü - RAM 16GB, SSD 512GB',
    category: 'notebook',
    condition: 'like-new',
    price: 25000,
    seller: null, // Will be filled with test@example.com userId
    images: [],
    status: 'active',
  },
  {
    title: 'Test Monitor - LG 4K',
    description: 'Monitor test ürünü - 4K, 27 inç',
    category: 'monitor',
    condition: 'good',
    price: 8000,
    seller: null,
    images: [],
    status: 'active',
  },
  {
    title: 'Test RAM - Corsair 32GB',
    description: 'RAM test ürünü - DDR4, 3200MHz',
    category: 'ram',
    condition: 'excellent',
    price: 4500,
    seller: null,
    images: [],
    status: 'pending',
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    console.log(`📍 Connecting to: ${MONGODB_URI}`);

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
      const hashedPassword = await bcrypt.hash(userData.password, 10);
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
    const sellerUser = createdUsers.find(u => u.email === 'seller@example.com');
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
      console.log(`👤 Name: ${user.name}`);
      if (user.isAdmin) console.log(`⚙️  Admin: YES`);
      console.log('');
    });

    console.log('Ready for testing! 🚀');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
