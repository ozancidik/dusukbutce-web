const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const testUsers = [
  { email: 'test@example.com', password: 'password123', name: 'Test User', firstName: 'Test', lastName: 'User', phone: '05551234567', cep_telefonu: '5551234567', birth_date: '1990-01-01', isAdmin: false },
  { email: 'admin@example.com', password: 'admin123', name: 'Admin User', firstName: 'Admin', lastName: 'User', phone: '05559876543', cep_telefonu: '5559876543', birth_date: '1985-05-15', isAdmin: true },
];

(async () => {
  try {
    console.log('🌱 Seeding database...');
    const conn = await mongoose.connect(MONGODB_URI);
    const db = conn.connection.db;
    
    // Clear old test data
    await db.collection('users').deleteMany({ email: { $in: testUsers.map(u => u.email) } });
    console.log('🧹 Cleared old test users');
    
    // Insert test users with hashed passwords
    for (const user of testUsers) {
      const hashed = await bcrypt.hash(user.password, 10);
      await db.collection('users').insertOne({
        ...user,
        password: hashed,
        emailVerified: true,
        createdAt: new Date()
      });
      console.log(`✅ Created: ${user.email}`);
    }
    
    console.log('\n✅ Seeding complete!');
    testUsers.forEach(u => console.log(`  ${u.email} / ${u.password}`));
    
    process.exit(0);
  } catch (e) {
    console.error('❌ Error:', e.message);
    process.exit(1);
  }
})();
