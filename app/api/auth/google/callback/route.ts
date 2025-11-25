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
    
    console.log('✅ Google OAuth callback: User saved, preparing response');
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
    // Production için www ekle (eğer yoksa)
    let targetOriginWithWww = targetOrigin;
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
            console.log('🔐 Google OAuth Callback: Starting...');
            console.log('📍 Current origin:', window.location.origin);
            console.log('📍 Current URL:', window.location.href);
            console.log('📍 Window opener exists:', !!window.opener);
            
            // Mesajı göndermeden önce kısa bir bekleme - popup'un hazır olması için
            setTimeout(() => {
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
              localStorage.setItem('google_oauth_token', fallbackData.token);
              localStorage.setItem('google_oauth_user', JSON.stringify(fallbackData.user));
              console.log('✅ Data saved to localStorage as fallback (always)');
              
              // Gizli sekme desteği: sessionStorage'a da yaz
              try {
                sessionStorage.setItem('google_oauth_token', fallbackData.token);
                sessionStorage.setItem('google_oauth_user', JSON.stringify(fallbackData.user));
                console.log('✅ Data also saved to sessionStorage (incognito support)');
              } catch (e2) {
                console.warn('⚠️ Could not save to sessionStorage (may be incognito):', e2);
              }
              
              // Doğrulama - localStorage'dan oku
              const savedToken = localStorage.getItem('google_oauth_token');
              const savedUser = localStorage.getItem('google_oauth_user');
              console.log('✅ Verification - Token in localStorage:', !!savedToken);
              console.log('✅ Verification - User in localStorage:', !!savedUser);
              
              if (!savedToken || !savedUser) {
                console.error('❌ CRITICAL: Data not found in localStorage after save!');
              }
            } catch (e) {
              console.error('❌ Error saving to localStorage:', e);
              console.error('❌ Error details:', e.message, e.stack);
              
              // localStorage başarısız olursa sessionStorage'ı dene
              try {
                sessionStorage.setItem('google_oauth_token', fallbackData.token);
                sessionStorage.setItem('google_oauth_user', JSON.stringify(fallbackData.user));
                console.log('✅ Fallback: Data saved to sessionStorage instead');
              } catch (e2) {
                console.error('❌ CRITICAL: Could not save to either localStorage or sessionStorage!');
              }
            }
              
              if (window.opener) {
                console.log('✅ Window opener exists, preparing message...');
                try {
                  const messageData = {
                    type: 'GOOGLE_LOGIN_SUCCESS',
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
                console.log('🔄 Attempting fallback mechanism...');
                
                // Eğer opener yoksa, belki aynı pencerede açıldı - localStorage'a yazmayı dene
                try {
                  const fallbackData = {
                    token: '${String(token)}',
                    user: {
                      id: '${String(user._id)}',
                      email: '${String(user.email)}',
                      name: ${JSON.stringify(String(user.name || ''))},
                      isAdmin: ${user.isAdmin}
                    }
                  };
                  
                  localStorage.setItem('google_oauth_token', fallbackData.token);
                  localStorage.setItem('google_oauth_user', JSON.stringify(fallbackData.user));
                  console.log('✅ Data saved to localStorage as fallback');
                  console.log('✅ Fallback data:', {
                    hasToken: !!fallbackData.token,
                    userEmail: fallbackData.user.email,
                    userId: fallbackData.user.id
                  });
                  
                  // Ana pencereye mesaj gönder (eğer parent window varsa)
                  if (window.parent && window.parent !== window) {
                    try {
                      window.parent.postMessage({
                        type: 'GOOGLE_OAUTH_FALLBACK',
                        token: fallbackData.token,
                        user: fallbackData.user
                      }, '*');
                      console.log('✅ Message sent to parent window');
                    } catch (e) {
                      console.error('❌ Error sending message to parent:', e);
                    }
                  }
                  
                  // Popup'ı kapat - Next.js sayfası render etmeye çalışma
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
                } catch (e) {
                  console.error('❌ Error saving to localStorage:', e);
                  console.error('❌ Error details:', e.message, e.stack);
                  // Hata durumunda da kapatmayı dene
                  setTimeout(() => {
                    try {
                      window.close();
                    } catch (e2) {
                      // Ignore
                    }
                  }, 500);
                }
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