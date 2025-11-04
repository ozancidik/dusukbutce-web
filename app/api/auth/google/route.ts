import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  // Environment'a göre redirect URI belirle
  const isLocalhost = request.headers.get('host')?.includes('localhost');
  const redirectUri = isLocalhost 
    ? 'http://localhost:3000/api/auth/google/callback'
    : 'https://dusukbutce.com/api/auth/google/callback';

  // Debug bilgileri
  console.log('Google OAuth Debug:');
  console.log('Client ID:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'MISSING');
  console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'MISSING');
  console.log('Redirect URI:', redirectUri);
  console.log('Is Localhost:', isLocalhost);

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