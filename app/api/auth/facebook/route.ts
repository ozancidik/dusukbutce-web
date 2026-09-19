import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  // Base URL belirleme - production ve localhost için ayrı
  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  
  // Production'da localhost içeren NEXT_PUBLIC_SITE_URL'i ignore et
  if (process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production') {
    if (baseUrl && !baseUrl.includes('localhost')) {
      // Production'da ve localhost değilse kullan
    } else {
      // Production'da localhost içeriyorsa ignore et
      baseUrl = 'https://www.dusukbutce.com';
    }
  } else if (!baseUrl || baseUrl.includes('localhost')) {
    // NEXT_PUBLIC_SITE_URL yoksa veya localhost içeriyorsa
    const isLocalhost = request.headers.get('host')?.includes('localhost');
    if (isLocalhost) {
      baseUrl = 'http://localhost:3000';
    } else if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://www.dusukbutce.com';
    } else {
      baseUrl = 'http://localhost:3000';
    }
  }
  
  const redirectUri = `${baseUrl}/api/auth/facebook/callback`;

  // Facebook OAuth yapılandırmasını kontrol et
  const facebookAppId = process.env.FACEBOOK_APP_ID;
  const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;
  
  // Debug bilgileri
  console.log('Facebook OAuth Debug:');
  console.log('App ID:', facebookAppId ? 'SET' : 'MISSING');
  console.log('App Secret:', facebookAppSecret ? 'SET' : 'MISSING');
  console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL || 'NOT SET');
  console.log('VERCEL:', process.env.VERCEL || 'NOT SET');
  console.log('VERCEL_ENV:', process.env.VERCEL_ENV || 'NOT SET');
  console.log('Base URL:', baseUrl);
  console.log('Redirect URI:', redirectUri);
  
  if (!facebookAppId || facebookAppId === 'your-facebook-app-id') {
    console.error('Facebook OAuth Error: FACEBOOK_APP_ID environment variable is not set');
    return new Response(`
      <html>
        <body>
          <h1>Facebook OAuth Konfigürasyon Hatası</h1>
          <p>FACEBOOK_APP_ID environment variable tanımlanmamış.</p>
          <p>Lütfen .env.local dosyasında FACEBOOK_APP_ID ve FACEBOOK_APP_SECRET değerlerini tanımlayın.</p>
          <p>Facebook OAuth'u kullanmak istemiyorsanız, bu özelliği frontend'de gizleyebilirsiniz.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const returnUrl = searchParams.get('returnUrl') || '/profile';

  // State'e returnUrl'i ekle; nonce sunucu tarafında üretilir ve callback'te
  // aynı isimli httpOnly cookie ile karşılaştırılır (login-CSRF koruması).
  const oauthNonce = crypto.randomBytes(16).toString('hex');
  const state = JSON.stringify({
    nonce: oauthNonce,
    returnUrl: returnUrl
  });

  // Facebook OAuth URL'ini oluştur (sadece public_profile - email için ayrı izin gerekiyor)
  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${facebookAppId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('public_profile')}&` +
    `state=${encodeURIComponent(state)}`;

  console.log('Facebook OAuth URL created:', facebookAuthUrl);

  const response = NextResponse.redirect(facebookAuthUrl);
  response.cookies.set('facebook_oauth_nonce', oauthNonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 10 * 60,
    path: '/',
  });
  return response;
} 