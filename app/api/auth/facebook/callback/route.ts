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
    
    return new Response(`
      <html>
        <head>
          <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups">
        </head>
        <body>
          <script>
            console.log('🔐 Facebook OAuth Callback: Starting...');
            console.log('📍 Current origin:', window.location.origin);
            console.log('📍 Current URL:', window.location.href);
            console.log('📍 Window opener exists:', !!window.opener);
            
            const fallbackData = {
              token: '${String(token)}',
              user: {
                id: '${String(user._id)}',
                email: '${String(user.email)}',
                name: ${JSON.stringify(String(user.name || ''))},
                isAdmin: ${user.isAdmin}
              }
            };
            
            // Önce localStorage'a yaz (her durumda fallback için)
            try {
              localStorage.setItem('facebook_oauth_token', fallbackData.token);
              localStorage.setItem('facebook_oauth_user', JSON.stringify(fallbackData.user));
              console.log('✅ Data saved to localStorage as fallback (always)');
            } catch (e) {
              console.error('❌ Error saving to localStorage:', e);
            }
            
            // Mesajı göndermeden önce kısa bir bekleme - popup'un hazır olması için
            setTimeout(() => {
              if (window.opener) {
                console.log('✅ Window opener exists, preparing message...');
                try {
                  const messageData = {
                    type: 'FACEBOOK_LOGIN_SUCCESS',
                    user: fallbackData.user,
                    token: fallbackData.token
                  };
                  
                  console.log('📤 Message data prepared:', {
                    type: messageData.type,
                    userEmail: messageData.user.email,
                    userId: messageData.user.id,
                    hasToken: !!messageData.token
                  });
                  
                  // Güvenlik: Spesifik origin'e mesaj gönder (wildcard yerine)
                  // www ve non-www için her iki origin'i de dene
                  const allowedOrigins = ['${targetOrigin}', '${targetOriginWithWww}'].filter((v, i, a) => a.indexOf(v) === i);
                  
                  console.log('📤 Allowed origins for postMessage:', allowedOrigins);
                  
                  // Her allowed origin'e mesaj gönder
                  allowedOrigins.forEach((allowedOrigin, index) => {
                    try {
                      window.opener.postMessage(messageData, allowedOrigin);
                      console.log('✅ Message sent successfully to ' + allowedOrigin + ' (attempt ' + (index + 1) + ')');
                    } catch (e) {
                      console.error('❌ Error sending message to ' + allowedOrigin + ' (attempt ' + (index + 1) + '):', e);
                    }
                  });
                  
                  // Retry mekanizması - birkaç kez tekrarla
                  setTimeout(() => {
                    allowedOrigins.forEach((allowedOrigin, index) => {
                      try {
                        if (window.opener) {
                          window.opener.postMessage(messageData, allowedOrigin);
                          console.log('✅ Message sent successfully to ' + allowedOrigin + ' (retry ' + (index + 1) + ')');
                        }
                      } catch (e) {
                        console.error('❌ Error sending message to ' + allowedOrigin + ' (retry ' + (index + 1) + '):', e);
                      }
                    });
                  }, 200);
                  
                  setTimeout(() => {
                    allowedOrigins.forEach((allowedOrigin, index) => {
                      try {
                        if (window.opener) {
                          window.opener.postMessage(messageData, allowedOrigin);
                          console.log('✅ Message sent successfully to ' + allowedOrigin + ' (retry ' + (index + 2) + ')');
                        }
                      } catch (e) {
                        console.error('❌ Error sending message to ' + allowedOrigin + ' (retry ' + (index + 2) + '):', e);
                      }
                    });
                  }, 400);
                  
                  // Mesaj gönderildikten sonra kapat
                  setTimeout(() => {
                    console.log('🔒 Closing popup window...');
                    try {
                      window.close();
                    } catch (e) {
                      console.error('❌ Error closing window:', e);
                    }
                  }, 2000);
                } catch (error) {
                  console.error('❌ Error in callback script:', error);
                  console.error('❌ Error details:', error.message, error.stack);
                  setTimeout(() => {
                    try {
                      window.close();
                    } catch (e) {
                      // Ignore
                    }
                  }, 500);
                }
              } else {
                console.error('❌ Window opener is null - popup may have been closed or opened in same window');
                console.log('🔄 Fallback mechanism will be used (localStorage already saved)');
                
                // Ana pencereye mesaj gönder (eğer parent window varsa)
                if (window.parent && window.parent !== window) {
                  try {
                    window.parent.postMessage({
                      type: 'FACEBOOK_OAUTH_FALLBACK',
                      token: fallbackData.token,
                      user: fallbackData.user
                    }, '*');
                    console.log('✅ Message sent to parent window');
                  } catch (e) {
                    console.error('❌ Error sending message to parent:', e);
                  }
                }
                
                // Popup'ı kapat
                setTimeout(() => {
                  try {
                    console.log('🔒 Attempting to close popup window...');
                    window.close();
                    console.log('✅ Popup close() called');
                  } catch (e) {
                    console.error('❌ Error closing window:', e);
                    // Eğer kapatılamazsa, basit bir mesaj göster
                    document.body.innerHTML = '<div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;"><h2>✅ Giriş başarılı!</h2><p>Bu pencereyi kapatabilirsiniz.</p></div>';
                  }
                }, 200);
              }
            }, 300);
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