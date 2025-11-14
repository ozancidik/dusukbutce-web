import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      // Hassas bilgi loglanmıyor - sadece genel hata
      return NextResponse.json(
        { success: false, message: 'Email veya şifre hatalı' },
        { status: 401 }
      );
    }
    
    // Kullanıcının local auth provider'ı var mı kontrol et
    const hasLocalProvider = user.authProviders?.some((p: any) => p.provider === 'local');
    if (!hasLocalProvider) {
      return NextResponse.json(
        { success: false, message: 'Bu email adresi ile şifreli giriş yapılamaz. Google veya Facebook ile giriş yapın.' },
        { status: 401 }
      );
    }
    
    // Email doğrulama kontrolü
    if (!user.emailVerified) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email adresinizi doğrulamanız gerekiyor. Email kutunuzu kontrol edin.',
          requiresVerification: true 
        },
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
    
    if (!process.env.JWT_SECRET) {
      console.error('Login error: JWT_SECRET is not configured');
      return NextResponse.json(
        { success: false, message: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    // JWT token oluştur
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Son giriş tarihini güncelle
    user.lastLogin = new Date();
    await user.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Giriş başarılı',
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        birthDate: user.birthDate || '',
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