import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Google OAuth URL'ini oluştur
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID || 'your-google-client-id'}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback')}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('email profile')}&` +
    `access_type=offline&` +
    `prompt=consent`;

  return NextResponse.redirect(googleAuthUrl);
} 