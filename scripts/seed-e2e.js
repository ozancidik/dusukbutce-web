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
// NOT: 'Listing' modeli bu projede hiç yok (models/ klasörü doğrulandı) —
// önceki script bu modeli require ediyordu ve bu yüzden HİÇ ÇALIŞMIYORDU
// (MODULE_NOT_FOUND). Admin panel (/admin) ve "tekliflerim" akışı
// ProductSubmission koleksiyonunu okur, gerçek satış akışı bu.
// Modeller `export default` kullanıyor — CJS require() ile alınan modül
// objesi { default: Model } şeklinde gelir, .default ile açığa çıkarılmalı.
const User = require('../models/User').default;
const ProductSubmission = require('../models/ProductSubmission').default;

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

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    // Parolayı konsola/loglara basmamak için connection string'i maskele
    // (CWE-532: sensitive info in log file) — sadece host kısmını göster.
    const maskedUri = MONGODB_URI.replace(/\/\/[^@]+@/, '//***:***@');
    console.log(`📍 Connecting to: ${maskedUri}`);

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing test data
    console.log('🧹 Clearing existing test data...');
    await User.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
    await ProductSubmission.deleteMany({ submissionNumber: { $regex: '^TEST-' } });
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

    // Admin panel (/admin) ve tekliflerim akışı ProductSubmission okur —
    // farklı durumlarda kayıtlar oluşturuyoruz ki her admin aksiyonu
    // (teklif ver, reddet, ödeme onayla) ve kullanıcı tarafı (kabul/red)
    // gerçek veriyle E2E test edilebilsin.
    console.log('📦 Creating test product submissions...');
    const testUser = createdUsers.find(u => u.email === 'test@example.com');
    const testSubmissions = [
      {
        userId: testUser._id,
        category: 'ram',
        submissionNumber: 'TEST-PENDING-001',
        brand: 'Corsair',
        model: 'Vengeance 16GB',
        cosmeticCondition: 'Mükemmel',
        status: 'pending',
        customerInfo: { firstName: 'Test', lastName: 'User', email: testUser.email, phone: testUser.phone }
      },
      {
        userId: testUser._id,
        category: 'notebook',
        submissionNumber: 'TEST-OFFERED-001',
        brand: 'Dell',
        model: 'XPS 13',
        cosmeticCondition: 'İyi',
        status: 'offered',
        offer: { amount: 15000, notes: 'Test teklifi', date: new Date() },
        customerInfo: { firstName: 'Test', lastName: 'User', email: testUser.email, phone: testUser.phone }
      },
      {
        userId: testUser._id,
        category: 'monitor',
        submissionNumber: 'TEST-REJECTED-001',
        brand: 'LG',
        model: '27UL500',
        cosmeticCondition: 'Orta',
        status: 'rejected',
        rejectionReason: 'Test red nedeni',
        rejectedAt: new Date(),
        customerInfo: { firstName: 'Test', lastName: 'User', email: testUser.email, phone: testUser.phone }
      }
    ];
    for (const submissionData of testSubmissions) {
      const submission = await ProductSubmission.create(submissionData);
      console.log(`  ✅ Created submission: ${submission.submissionNumber} (${submission.status})`);
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
