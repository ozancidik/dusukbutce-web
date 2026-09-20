const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const testUsers = [
  { email: 'test@example.com', password: 'password123', name: 'Test User', firstName: 'Test', lastName: 'User', phone: '05551234567', cep_telefonu: '5551234567', birth_date: '1990-01-01', isAdmin: false },
  { email: 'admin@example.com', password: 'admin123', name: 'Admin User', firstName: 'Admin', lastName: 'User', phone: '05559876543', cep_telefonu: '5559876543', birth_date: '1985-05-15', isAdmin: true },
];

const testListings = [
  {
    title: 'Test Listing for E2E',
    description: 'Real listing for testing',
    category: 'ram',
    condition: 'good',
    price: 5000,
    status: 'listed',
    createdAt: new Date()
  },
  {
    title: 'Pending Approval Test',
    description: 'For admin approval endpoint',
    category: 'ssd',
    condition: 'excellent',
    price: 3000,
    status: 'pending',
    createdAt: new Date()
  },
  {
    title: 'Pending Rejection Test',
    description: 'For admin rejection endpoint',
    category: 'gpu',
    condition: 'good',
    price: 8000,
    status: 'pending',
    createdAt: new Date()
  }
];

(async () => {
  try {
    console.log('🌱 Seeding database...');
    const conn = await mongoose.connect(MONGODB_URI);
    const db = conn.connection.db;

    // Clear old test data
    await db.collection('users').deleteMany({ email: { $in: testUsers.map(u => u.email) } });
    console.log('🧹 Cleared old test users');

    // Insert test users
    const userIds = {};
    for (const user of testUsers) {
      const hashed = await bcrypt.hash(user.password, 10);
      const result = await db.collection('users').insertOne({
        ...user,
        password: hashed,
        emailVerified: true,
        createdAt: new Date()
      });
      userIds[user.email] = result.insertedId;
      console.log(`✅ Created: ${user.email} (ID: ${result.insertedId})`);
    }

    // Clear old test listings
    await db.collection('productsubmissions').deleteMany({ title: { $regex: 'Test' } });
    console.log('🧹 Cleared old test listings');

    // Insert test listings
    for (const listing of testListings) {
      const result = await db.collection('productsubmissions').insertOne(listing);
      console.log(`✅ Created listing: ${result.insertedId}`);
    }

    console.log('\n✅ Seeding complete!');
    testUsers.forEach(u => console.log(`  ${u.email} / ${u.password}`));

    process.exit(0);
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
})();
