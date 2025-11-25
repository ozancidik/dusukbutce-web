import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            console.log('❌ Google OAuth Error:', '${error}');
            if (window.opener) {
              window.opener.postMessage({
                type: 'GOOGLE_LOGIN_ERROR',
                error: 'Google ile giriş yapılırken bir hata oluştu.'
              }, '*');
            }
            setTimeout(() => window.close(), 100);
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
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            console.log('❌ Google OAuth Error: No authorization code');
            if (window.opener) {
              window.opener.postMessage({
                type: 'GOOGLE_LOGIN_ERROR',
                error: 'Yetkilendirme kodu bulunamadı.'
              }, '*');
            }
            setTimeout(() => window.close(), 100);
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

    // Google'dan access token al
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    console.log('Token Response:', JSON.stringify(tokenData, null, 2));
    console.log('Response Status:', tokenResponse.status);
    console.log('Response Headers:', Object.fromEntries(tokenResponse.headers.entries()));

    if (!tokenData.access_token) {
      console.error('Token Error Details:', JSON.stringify(tokenData, null, 2));
      console.error('Client ID:', process.env.GOOGLE_CLIENT_ID);
      console.error('Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? '***' : 'MISSING');
      console.error('Redirect URI:', 'https://dusukbutce.com/api/auth/google/callback');
      throw new Error('Access token alınamadı');
    }

    // Google'dan kullanıcı bilgilerini al
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();

    // Telefon numarası şimdilik kaldırıldı (Google doğrulama sorunu)
    let phoneNumber = '';

    // MongoDB'ye bağlan
    await connectDB();

    // Kullanıcıyı email ile bul
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      // Yeni kullanıcı oluştur (OAuth kullanıcıları için password gerekli değil)
      user = new User({
        email: userData.email,
        name: decodeURIComponent(escape(userData.name)), // Türkçe karakterleri düzelt
        phone: phoneNumber, // Google'dan gelen telefon numarası
        // password alanı set edilmiyor - OAuth kullanıcıları için gerekli değil
        authProviders: [{
          provider: 'google',
          providerId: userData.id,
          connectedAt: new Date()
        }],
        emailVerified: true // Google OAuth ile gelen email'ler zaten doğrulanmış
      });
    } else {
      // Mevcut kullanıcıya Google provider'ı ekle (eğer yoksa)
      const hasGoogleProvider = user.authProviders?.some((p: any) => p.provider === 'google');
      if (!hasGoogleProvider) {
        if (!user.authProviders) user.authProviders = [];
        user.authProviders.push({
          provider: 'google',
          providerId: userData.id,
          connectedAt: new Date()
        });
      }
      
      // Telefon numarasını güncelle (eğer Google'dan geldiyse)
      if (phoneNumber && phoneNumber !== user.phone) {
        user.phone = phoneNumber;
        await user.save();
      }
    }

    // JWT token oluştur
    if (!process.env.JWT_SECRET) {
      console.error('Google auth error: JWT_SECRET is not configured');
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

    // Kullanıcıyı kaydet
    await user.save();

    // Başarılı giriş sayfası
    const origin = request.headers.get('origin') || request.nextUrl.origin;
    const protocol = request.nextUrl.protocol;
    const host = request.headers.get('host') || request.nextUrl.host;
    const targetOrigin = `${protocol}//${host}`;
    
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            console.log('🔐 Google OAuth Callback: Starting...');
            console.log('📍 Current origin:', window.location.origin);
            console.log('📍 Window opener exists:', !!window.opener);
            
            // Mesajı göndermeden önce kısa bir bekleme - popup'un hazır olması için
            setTimeout(() => {
              if (window.opener && !window.opener.closed) {
                console.log('✅ Window opener exists, sending message...');
                try {
                  const messageData = {
                    type: 'GOOGLE_LOGIN_SUCCESS',
                    user: {
                      id: '${String(user._id)}',
                      email: '${String(user.email)}',
                      name: ${JSON.stringify(String(user.name || ''))},
                      isAdmin: ${user.isAdmin}
                    },
                    token: '${String(token)}'
                  };
                  
                  console.log('📤 Sending message to opener:', JSON.stringify(messageData, null, 2));
                  
                  // Mesajı gönder - '*' origin kullanarak tüm origin'lere gönder
                  window.opener.postMessage(messageData, '*');
                  console.log('✅ Message sent successfully (attempt 1)');
                  
                  // Mesajı birkaç kez gönder (güvenlik için)
                  setTimeout(() => {
                    if (window.opener && !window.opener.closed) {
                      window.opener.postMessage(messageData, '*');
                      console.log('✅ Message sent successfully (attempt 2)');
                    }
                  }, 200);
                  
                  setTimeout(() => {
                    if (window.opener && !window.opener.closed) {
                      window.opener.postMessage(messageData, '*');
                      console.log('✅ Message sent successfully (attempt 3)');
                    }
                  }, 400);
                  
                  setTimeout(() => {
                    if (window.opener && !window.opener.closed) {
                      window.opener.postMessage(messageData, '*');
                      console.log('✅ Message sent successfully (attempt 4)');
                    }
                  }, 600);
                  
                  // Mesaj gönderildikten sonra kapat
                  setTimeout(() => {
                    console.log('🔒 Closing popup window...');
                    try {
                      window.close();
                    } catch (e) {
                      console.error('❌ Error closing window:', e);
                    }
                  }, 1500);
                } catch (error) {
                  console.error('❌ Error sending message:', error);
                  console.error('❌ Error details:', error.message);
                  setTimeout(() => {
                    try {
                      window.close();
                    } catch (e) {
                      // Ignore
                    }
                  }, 500);
                }
              } else {
                console.error('❌ Window opener is null or closed - popup may have been closed');
                setTimeout(() => {
                  try {
                    window.close();
                  } catch (e) {
                    // Ignore
                  }
                }, 500);
              }
            }, 500);
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
    console.error('Google OAuth error:', error);
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            console.error('❌ Google OAuth Exception:', '${error instanceof Error ? error.message : 'Unknown error'}');
            if (window.opener) {
              window.opener.postMessage({
                type: 'GOOGLE_LOGIN_ERROR',
                error: 'Google ile giriş yapılırken bir hata oluştu.'
              }, '*');
            }
            setTimeout(() => window.close(), 100);
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