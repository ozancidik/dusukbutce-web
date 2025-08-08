import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  // Environment'a göre redirect URI belirle
  const isLocalhost = request.headers.get('host')?.includes('localhost');
  const redirectUri = isLocalhost 
    ? 'http://localhost:3000/api/auth/google/callback'
    : 'https://dusukbutce.com/api/auth/google/callback';

  // Google OAuth URL'ini oluştur
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid')}&` +
    `access_type=offline&` +
    `prompt=consent`;

  return NextResponse.redirect(googleAuthUrl);
} 