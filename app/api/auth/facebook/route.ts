import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Facebook OAuth yapılandırmasını kontrol et
  const facebookAppId = process.env.FACEBOOK_APP_ID;
  const facebookRedirectUri = process.env.FACEBOOK_REDIRECT_URI;
  
  if (!facebookAppId || facebookAppId === 'your-facebook-app-id') {
    console.error('Facebook OAuth Error: FACEBOOK_APP_ID environment variable is not set');
    return NextResponse.json(
      { error: 'Facebook OAuth yapılandırılmamış. Lütfen sistem yöneticisi ile iletişime geçin.' },
      { status: 500 }
    );
  }
  
  if (!facebookRedirectUri) {
    console.error('Facebook OAuth Error: FACEBOOK_REDIRECT_URI environment variable is not set');
    return NextResponse.json(
      { error: 'Facebook OAuth yapılandırılmamış. Lütfen sistem yöneticisi ile iletişime geçin.' },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const returnUrl = searchParams.get('returnUrl') || '/profile';
  
  // State'e returnUrl'i ekle
  const state = JSON.stringify({
    random: Math.random().toString(36).substr(2, 9),
    returnUrl: returnUrl
  });
  
  // Facebook OAuth URL'ini oluştur
  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${facebookAppId}&` +
    `redirect_uri=${encodeURIComponent(facebookRedirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent('public_profile,email')}&` +
    `state=${encodeURIComponent(state)}`;

  console.log('Facebook OAuth URL created:', facebookAuthUrl);
  
  return NextResponse.redirect(facebookAuthUrl);
} 