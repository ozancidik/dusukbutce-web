import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Facebook OAuth URL'ini oluştur
  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${process.env.FACEBOOK_APP_ID || 'your-facebook-app-id'}&` +
    `redirect_uri=${encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/auth/facebook/callback')}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('public_profile')}&` +
    `state=${Math.random().toString(36).substr(2, 9)}`;

  return NextResponse.redirect(facebookAuthUrl);
} 