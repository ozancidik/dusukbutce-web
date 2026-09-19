import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { validateCSRFToken } from '@/lib/security';
import { checkRateLimit } from '@/lib/rateLimit';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Brute-force koruması: IP başına 15 dakikada en fazla 5 giriş denemesi
    // (admin hesapları normal kullanıcıdan çok daha yüksek yetkiye sahip).
    const limited = checkRateLimit(request, { name: 'admin-login', limit: 5, windowMs: 15 * 60_000 });
    if (limited) return limited;

    if (!JWT_SECRET) {
      console.error('Admin auth error: JWT_SECRET is not configured');
      return NextResponse.json(
        { success: false, error: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    const { email, password, csrfToken } = await request.json();
    
    // CSRF token doğrulama
    const cookieToken = request.cookies.get('csrf-token')?.value;
    if (!csrfToken || !cookieToken || !validateCSRFToken(csrfToken, cookieToken)) {
      return NextResponse.json(
        { success: false, error: 'Güvenlik hatası: Geçersiz istek' },
        { status: 403 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'E-posta ve şifre gerekli' },
        { status: 400 }
      );
    }

    // MongoDB'ye bağlan
    try {
      await connectDB();
    } catch (dbError: any) {
      console.error('MongoDB connection error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.' },
        { status: 503 }
      );
    }

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
    const adminRole = adminUser.adminRole === 'viewer' ? 'viewer' : 'full';
    const token = jwt.sign(
      {
        email: adminUser.email,
        userId: adminUser._id.toString(),
        role: 'admin',
        adminRole,
        name: adminUser.name
      },
      JWT_SECRET,
      { expiresIn: '48h' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        email: adminUser.email,
        name: adminUser.name,
        role: 'admin',
        adminRole
      }
    });

  } catch (error) {
    // Hassas bilgileri loglamadan sadece hata tipini logla
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Admin auth error:', errorMessage);
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
    
    if (!JWT_SECRET) {
      console.error('Token verification error: JWT_SECRET is not configured');
      return NextResponse.json(
        { success: false, error: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }
    
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
    // Hassas bilgileri loglamadan sadece hata tipini logla
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Token verification error:', errorMessage);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}


