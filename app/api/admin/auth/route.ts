import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!JWT_SECRET) {
      console.error('Admin auth error: JWT_SECRET is not configured');
      return NextResponse.json(
        { success: false, error: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'E-posta ve şifre gerekli' },
        { status: 400 }
      );
    }

    // MongoDB'ye bağlan
    await connectDB();

    // Admin kullanıcısını bul (email ile ve isAdmin: true)
    const adminUser = await User.findOne({ 
      email: email.toLowerCase(),
      isAdmin: true,
      isActive: true
    });
    
    if (!adminUser) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz e-posta veya şifre ya da yetkiniz yok' },
        { status: 401 }
      );
    }

    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      );
    }

    // Son giriş tarihini güncelle
    adminUser.lastLogin = new Date();
    await adminUser.save();

    // JWT token oluştur
    const token = jwt.sign(
      { 
        email: adminUser.email,
        userId: adminUser._id.toString(),
        role: 'admin',
        name: adminUser.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: adminUser.email,
        name: adminUser.name,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Token doğrulama endpoint'i
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Token bulunamadı' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      return NextResponse.json({
        success: true,
        user: {
          username: decoded.username,
          role: decoded.role,
          userId: decoded.userId
        }
      });
    } catch (jwtError) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz token' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}


