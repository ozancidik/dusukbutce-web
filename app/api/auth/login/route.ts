import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Email veya şifre hatalı' },
        { status: 401 }
      );
    }
    
    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Email veya şifre hatalı' },
        { status: 401 }
      );
    }
    
    // Son giriş tarihini güncelle
    user.lastLogin = new Date();
    await user.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Giriş başarılı',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { success: false, message: 'Giriş yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 