import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateCSRFToken } from '@/lib/security';
import { checkRateLimit } from '@/lib/rateLimit';
import { setAuthCookie } from '@/lib/cookies';
import { validateBody, loginSchema } from '@/lib/validate';

export async function POST(request: NextRequest) {
  try {
    // Brute-force koruması: IP başına 5 dakikada en fazla 10 giriş denemesi.
    const limited = checkRateLimit(request, { name: 'login', limit: 10, windowMs: 5 * 60_000 });
    if (limited) return limited;

    await connectDB();
    
    const body = await request.json();
    const v = validateBody(loginSchema, body);
    if (v.error) return v.error;
    const { email, password, csrfToken } = body;

    // CSRF token doğrulama
    const cookieToken = request.cookies.get('csrf-token')?.value;
    if (!csrfToken || !cookieToken || !validateCSRFToken(csrfToken, cookieToken)) {
      return NextResponse.json(
        { success: false, message: 'Güvenlik hatası: Geçersiz istek' },
        { status: 403 }
      );
    }
    
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
    
    // Eğer local provider yoksa ama kullanıcının şifresi varsa, şifreyi kontrol et
    // Şifre doğruysa local provider'ı otomatik olarak ekle (Google/Facebook ile giriş yapanlar için)
    if (!hasLocalProvider) {
      // Kullanıcının şifresi var mı kontrol et
      if (!user.password || user.password.trim() === '') {
        // OAuth ile giriş yapan kullanıcı için şifre oluşturma yönlendirmesi
        const hasOAuthProvider = user.authProviders?.some((p: any) => p.provider === 'google' || p.provider === 'facebook');
        return NextResponse.json(
          { 
            success: false, 
            message: hasOAuthProvider 
              ? 'Bu hesap Google veya Facebook ile oluşturulmuş. Şifre ile giriş yapmak için önce şifre oluşturmanız gerekiyor.' 
              : 'Bu email adresi ile şifreli giriş yapılamaz. Google veya Facebook ile giriş yapın.',
            requiresPasswordSetup: hasOAuthProvider
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
      
      // Şifre doğruysa local provider'ı ekle
      if (!user.authProviders) {
        user.authProviders = [];
      }
      user.authProviders.push({
        provider: 'local',
        providerId: 'local',
        connectedAt: new Date()
      });
      await user.save();
    } else {
      // Local provider varsa normal şifre kontrolü yap
      // Şifreyi kontrol et
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, message: 'Email veya şifre hatalı' },
          { status: 401 }
        );
      }
    }
    
    // Email doğrulama kontrolü (her iki durum için de)
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
    
    const response = NextResponse.json({
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
    // JWT'yi httpOnly cookie olarak da yaz (client Authorization header'ı olmadan
    // kimlik doğrulayabilsin; XSS token'a erişemesin).
    setAuthCookie(response, token);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json(
      { success: false, message: 'Giriş yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 