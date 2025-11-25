import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';
import jwt from 'jsonwebtoken';

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
  console.log('Facebook OAuth Callback Debug:');
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

    console.log('✅ Facebook OAuth callback: User saved, preparing response');
    console.log('✅ User ID:', String(user._id));
    console.log('✅ User Email:', user.email);
    console.log('✅ Token created:', token ? 'YES' : 'NO');
    
    // Başarılı giriş sayfası
    const origin = request.headers.get('origin') || request.nextUrl.origin;
    const protocol = request.nextUrl.protocol;
    const host = request.headers.get('host') || request.nextUrl.host;
    
    // Güvenlik: Sadece kendi domain'imizden gelen istekleri kabul et
    const allowedHosts = ['www.dusukbutce.com', 'dusukbutce.com', 'localhost:3000', 'dusukbutce-web.vercel.app'];
    const isAllowedHost = allowedHosts.some(allowed => host.includes(allowed));
    
    if (!isAllowedHost) {
      console.error('❌ Unauthorized host:', host);
      return new Response('Unauthorized', { status: 403 });
    }
    
    // Target origin belirle - www ve non-www için normalize et
    let targetOrigin = `${protocol}//${host}`;
    let targetOriginWithWww = targetOrigin;
    
    // Production için www ekle (eğer yoksa)
    if (process.env.VERCEL_ENV === 'production' && !host.includes('localhost') && !host.includes('www.')) {
      targetOriginWithWww = `${protocol}//www.${host}`;
    } else if (host.includes('www.')) {
      // Eğer www varsa, non-www versiyonunu da hazırla
      targetOriginWithWww = targetOrigin;
      targetOrigin = targetOrigin.replace('www.', '');
    }
    
    // State parametresinden returnUrl'i al
    const searchParams = request.nextUrl.searchParams;
    const stateParam = searchParams.get('state');
    let returnUrl = '/';
    if (stateParam) {
      try {
        const state = JSON.parse(decodeURIComponent(stateParam));
        returnUrl = state.returnUrl || '/';
      } catch (e) {
        console.warn('⚠️ Could not parse state parameter:', e);
      }
    }

    // Popup için HTML response - postMessage ile ana pencereye mesaj gönder
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            const userData = {
              id: '${String(user._id)}',
              email: '${String(user.email)}',
              name: ${JSON.stringify(String(user.name || ''))},
              phone: '${String(user.phone || '')}',
              birthDate: '${String(user.birthDate || '')}',
              isAdmin: ${user.isAdmin}
            };
            
            const token = '${String(token)}';
            
            // localStorage'a fallback olarak kaydet (gizli sekme için)
            try {
              localStorage.setItem('facebook_oauth_token', token);
              localStorage.setItem('facebook_oauth_user', JSON.stringify(userData));
            } catch (e) {
              console.error('localStorage error:', e);
            }
            
            // Ana pencereye mesaj gönder
            if (window.opener) {
              const messageData = {
                type: 'FACEBOOK_LOGIN_SUCCESS',
                user: userData,
                token: token
              };
              
              // Spesifik origin'e gönder
              const allowedOrigins = ['${targetOrigin}'];
              if (targetOrigin.includes('www.')) {
                allowedOrigins.push(targetOrigin.replace('www.', ''));
              } else {
                allowedOrigins.push(targetOrigin.replace('://', '://www.'));
              }
              
              allowedOrigins.forEach(origin => {
                try {
                  window.opener.postMessage(messageData, origin);
                } catch (e) {
                  console.warn('postMessage error:', e);
                }
              });
              
              // Retry mekanizması
              setTimeout(() => {
                allowedOrigins.forEach(origin => {
                  try {
                    if (window.opener) {
                      window.opener.postMessage(messageData, origin);
                    }
                  } catch (e) {}
                });
              }, 200);
              
              // Wildcard fallback (son çare)
              setTimeout(() => {
                try {
                  if (window.opener) {
                    window.opener.postMessage(messageData, '*');
                  }
                } catch (e) {}
              }, 400);
              
              // Popup'ı kapat
              setTimeout(() => {
                try {
                  window.close();
                } catch (e) {
                  document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>✅ Giriş başarılı!</h2><p>Bu pencereyi kapatabilirsiniz.</p></div>';
                }
              }, 1000);
            } else {
              // Opener yoksa, localStorage fallback kullanılacak
              document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>✅ Giriş başarılı!</h2><p>Bu pencereyi kapatabilirsiniz.</p></div>';
            }
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
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    const loginUrl = `${request.nextUrl.origin}/login?error=${encodeURIComponent('Facebook ile giriş yapılırken bir hata oluştu: ' + errorMessage)}`;
    return NextResponse.redirect(loginUrl);
  }
} 