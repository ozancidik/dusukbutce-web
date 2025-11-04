const mongoose = require('mongoose');
require('dotenv').config();

async function updateUserPhone() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    
    const User = mongoose.model('User', new mongoose.Schema({
      email: String,
      phone: String,
      name: String
    }));
    
    // murzererti@necub.com kullanıcısını bul ve telefon numarasını güncelle
    const user = await User.findOne({ email: 'murzererti@necub.com' });
    
    if (user) {
      console.log('User found:', user.name, user.email);
      console.log('Current phone:', user.phone);
      
      // Telefon numarasını güncelle (örnek: 05555555555)
      user.phone = '05555555555';
      await user.save();
      
      console.log('Phone updated to:', user.phone);
    } else {
      console.log('User not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateUserPhone();
