import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
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
  
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  // Debug bilgileri
  console.log('Google OAuth Debug:');
  console.log('Client ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'MISSING');
  console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'MISSING');
  console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL || 'NOT SET');
  console.log('VERCEL:', process.env.VERCEL || 'NOT SET');
  console.log('VERCEL_ENV:', process.env.VERCEL_ENV || 'NOT SET');
  console.log('Base URL:', baseUrl);
  console.log('Redirect URI:', redirectUri);

  if (!process.env.GOOGLE_CLIENT_ID) {
    return new Response(`
      <html>
        <body>
          <h1>Google OAuth Konfigürasyon Hatası</h1>
          <p>GOOGLE_CLIENT_ID environment variable tanımlanmamış.</p>
          <p>Lütfen .env.local dosyasında GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET değerlerini tanımlayın.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Google OAuth URL'ini oluştur
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid')}&` +
    `access_type=offline&` +
    `prompt=consent`;

  console.log('Google Auth URL:', googleAuthUrl);

  return NextResponse.redirect(googleAuthUrl);
} 