import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password, name, phone, address } = await request.json();
    
    // Email kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Bu email adresi zaten kayıtlı' },
        { status: 400 }
      );
    }
    
    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Yeni kullanıcı oluştur
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      address
    });
    
    await user.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Kullanıcı başarıyla kayıt oldu',
      userId: user._id 
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { success: false, message: 'Kayıt olurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 