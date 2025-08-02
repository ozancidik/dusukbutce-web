import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Google OAuth URL'ini oluştur
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent('https://dusukbutce.com/api/auth/google/callback')}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid')}&` +
    `access_type=offline&` +
    `prompt=consent`;

  return NextResponse.redirect(googleAuthUrl);
} 