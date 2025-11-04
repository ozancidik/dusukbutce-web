import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    await connectDB();
    
    const { email, password } = await request.json();
    console.log('Login attempt for email:', email);
    
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    console.log('User found:', !!user);
    if (!user) {
      console.log('User not found for email:', email);
      return NextResponse.json(
        { success: false, message: 'Email veya şifre hatalı' },
        { status: 401 }
      );
    }
    
    // Kullanıcının local auth provider'ı var mı kontrol et
    const hasLocalProvider = user.authProviders?.some((p: any) => p.provider === 'local');
    console.log('Has local provider:', hasLocalProvider);
    console.log('Auth providers:', user.authProviders);
    if (!hasLocalProvider) {
      console.log('No local provider found');
      return NextResponse.json(
        { success: false, message: 'Bu email adresi ile şifreli giriş yapılamaz. Google veya Facebook ile giriş yapın.' },
        { status: 401 }
      );
    }
    
    // Email doğrulama kontrolü
    console.log('Email verified:', user.emailVerified);
    if (!user.emailVerified) {
      console.log('Email not verified');
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
    console.log('Checking password...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json(
        { success: false, message: 'Email veya şifre hatalı' },
        { status: 401 }
      );
    }
    
    // JWT token oluştur
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
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