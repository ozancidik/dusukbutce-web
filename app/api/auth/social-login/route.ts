import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { checkRateLimit } from '@/lib/rateLimit';
import { upsertOAuthUser } from '@/lib/oauthUser';

/**
 * Native mobil (Flutter) client'lar için Google/Facebook girişi.
 *
 * Web'deki OAuth akışı (app/api/auth/{google,facebook}/callback) tamamen
 * tarayıcı-popup + postMessage'a göre kurulu ve native bir SDK'dan
 * çağrılamaz. Bu uç, mobil SDK'nın (google_sign_in / Facebook SDK) zaten
 * elde ettiği access token'ı kabul edip aynı upsert mantığını
 * (lib/oauthUser.ts) kullanarak /api/auth/login ile birebir aynı
 * {success, token, user} şeklini döner — web tarafında hiçbir şeyi
 * değiştirmez, sadece paralel bir giriş kapısı açar.
 */
export async function POST(request: NextRequest) {
  try {
    const limited = checkRateLimit(request, { name: 'social-login', limit: 10, windowMs: 5 * 60_000 });
    if (limited) return limited;

    const body = await request.json().catch(() => ({}));
    const { provider, accessToken } = body;

    if (!accessToken || (provider !== 'google' && provider !== 'facebook')) {
      return NextResponse.json(
        { success: false, message: 'provider ("google" veya "facebook") ve accessToken gerekli' },
        { status: 400 }
      );
    }

    let providerId: string;
    let email: string;
    let name: string;

    if (provider === 'google') {
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!userResponse.ok) {
        return NextResponse.json({ success: false, message: 'Geçersiz Google access token' }, { status: 401 });
      }
      const userData = await userResponse.json();
      if (!userData.email || !userData.id) {
        return NextResponse.json({ success: false, message: 'Google hesabından email alınamadı' }, { status: 400 });
      }
      providerId = userData.id;
      email = userData.email;
      name = userData.name || '';
    } else {
      const userResponse = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(accessToken)}`
      );
      const userData = await userResponse.json();
      if (userData.error || !userData.id) {
        return NextResponse.json({ success: false, message: 'Geçersiz Facebook access token' }, { status: 401 });
      }
      providerId = userData.id;
      // Facebook her zaman email dönmeyebilir — web'deki callback ile aynı fallback deseni.
      email = userData.email || `fb_${userData.id}@dusukbutce.com`;
      name = userData.name || '';
    }

    if (!process.env.JWT_SECRET) {
      console.error('Social login error: JWT_SECRET is not configured');
      return NextResponse.json({ success: false, message: 'Sunucu yapılandırma hatası' }, { status: 500 });
    }

    await connectDB();
    const { user } = await upsertOAuthUser(email, name, providerId, provider);

    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error('Social login error:', error);
    return NextResponse.json({ success: false, message: 'Sunucu hatası' }, { status: 500 });
  }
}
