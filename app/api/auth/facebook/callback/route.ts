import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  // Environment'a göre redirect URI belirle
  const isLocalhost = request.headers.get('host')?.includes('localhost');
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (isLocalhost ? 'http://localhost:3000' : 'https://www.dusukbutce.com');
  const redirectUri = `${baseUrl}/api/auth/facebook/callback`;

  // Facebook OAuth yapılandırmasını kontrol et
  const facebookAppId = process.env.FACEBOOK_APP_ID;
  const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;
  
  // Debug bilgileri
  console.log('Facebook OAuth Callback Debug:');
  console.log('App ID:', facebookAppId ? 'SET' : 'MISSING');
  console.log('App Secret:', facebookAppSecret ? 'SET' : 'MISSING');
  console.log('Redirect URI:', redirectUri);
  console.log('Is Localhost:', isLocalhost);
  
  if (!facebookAppId || facebookAppId === 'your-facebook-app-id') {
    console.error('Facebook OAuth Error: FACEBOOK_APP_ID environment variable is not set');
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_LOGIN_ERROR',
                error: 'Facebook OAuth yapılandırılmamış. Lütfen .env.local dosyasında FACEBOOK_APP_ID ve FACEBOOK_APP_SECRET değerlerini tanımlayın.'
              }, window.location.origin);
            }
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html',
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    });
  }
  
  if (!facebookAppSecret || facebookAppSecret === 'your-facebook-app-secret') {
    console.error('Facebook OAuth Error: FACEBOOK_APP_SECRET environment variable is not set');
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_LOGIN_ERROR',
                error: 'Facebook OAuth yapılandırılmamış. Lütfen .env.local dosyasında FACEBOOK_APP_ID ve FACEBOOK_APP_SECRET değerlerini tanımlayın.'
              }, window.location.origin);
            }
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html',
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');
  
  // State'den returnUrl'i al
  let returnUrl = '/profile';
  if (state) {
    try {
      const stateData = JSON.parse(decodeURIComponent(state));
      returnUrl = stateData.returnUrl || '/profile';
    } catch (e) {
      console.error('State parse error:', e);
    }
  }

  if (error) {
    console.error('Facebook OAuth error from Facebook:', error);
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_LOGIN_ERROR',
                error: 'Facebook ile giriş yapılırken bir hata oluştu: ${error}'
              }, window.location.origin);
            }
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html',
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    });
  }

  if (!code) {
    console.error('Facebook OAuth error: No authorization code received');
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_LOGIN_ERROR',
                error: 'Yetkilendirme kodu bulunamadı.'
              }, window.location.origin);
            }
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html',
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    });
  }

  try {
    console.log('Facebook OAuth: Exchanging code for access token...');
    
    // Facebook'dan access token al
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: facebookAppId,
        client_secret: facebookAppSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log('Facebook OAuth: Token response received:', { success: !!tokenData.access_token, error: tokenData.error });

    if (!tokenData.access_token) {
      throw new Error(`Access token alınamadı: ${tokenData.error?.message || 'Bilinmeyen hata'}`);
    }

    console.log('Facebook OAuth: Fetching user data...');
    
    // Facebook'dan kullanıcı bilgilerini al (sadece id ve name)
    const userResponse = await fetch(`https://graph.facebook.com/v18.0/me?fields=id,name&access_token=${tokenData.access_token}`);

    const userData = await userResponse.json();
    console.log('Facebook OAuth: User data received:', { id: userData.id, name: userData.name });

    // Türkçe karakterleri güvenli şekilde işle
    let userName = userData.name;
    try {
      // Eğer name encode edilmişse decode et
      if (userName && userName.includes('%')) {
        userName = decodeURIComponent(userName);
      }
    } catch (error) {
      console.warn('Facebook OAuth: Name decode hatası, orijinal isim kullanılıyor:', error);
      userName = userData.name;
    }
    
    // Facebook'tan email bilgisi al (eğer varsa)
    let userEmail = `fb_${userData.id}@dusukbutce.com`;
    
    // Email fields'ı ekleyerek tekrar deneyelim
    try {
      const emailResponse = await fetch(`https://graph.facebook.com/v18.0/me?fields=id,name,email&access_token=${tokenData.access_token}`);
      const emailData = await emailResponse.json();
      if (emailData.email) {
        userEmail = emailData.email;
        console.log('Facebook OAuth: Email found:', userEmail);
      }
    } catch (error) {
      console.warn('Facebook OAuth: Email fetch failed, using fallback:', error);
    }

    // MongoDB'ye bağlan
    await connectDB();

    // Kullanıcıyı email ile bul
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log('Facebook OAuth: Creating new user...');
      // Yeni kullanıcı oluştur (OAuth kullanıcıları için password gerekli değil)
      user = new User({
        email: userEmail,
        name: userName,
        // password alanı set edilmiyor - OAuth kullanıcıları için gerekli değil
        authProviders: [{
          provider: 'facebook',
          providerId: userData.id,
          connectedAt: new Date()
        }],
        emailVerified: true // Facebook OAuth ile gelen email'ler zaten doğrulanmış
      });
      await user.save();
      console.log('Facebook OAuth: New user created successfully');
    } else {
      console.log('Facebook OAuth: Existing user found');
      // Mevcut kullanıcıya Facebook provider'ı ekle (eğer yoksa)
      const hasFacebookProvider = user.authProviders?.some((p: any) => p.provider === 'facebook');
      if (!hasFacebookProvider) {
        if (!user.authProviders) user.authProviders = [];
        user.authProviders.push({
          provider: 'facebook',
          providerId: userData.id,
          connectedAt: new Date()
        });
        await user.save();
      }
    }

    // JWT token oluştur
    if (!process.env.JWT_SECRET) {
      console.error('Facebook auth error: JWT_SECRET is not configured');
      return NextResponse.json(
        { success: false, message: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Facebook OAuth: Login successful, sending success message');
    
    // Başarılı giriş sayfası
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_LOGIN_SUCCESS',
                user: {
                  id: '${user._id}',
                  email: '${user.email}',
                  name: '${user.name}',
                  isAdmin: ${user.isAdmin}
                },
                token: '${token}'
              }, window.location.origin);
            }
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html',
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    });

  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_LOGIN_ERROR',
                error: 'Facebook ile giriş yapılırken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}'
              }, window.location.origin);
            }
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html',
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
      }
    });
  }
} 