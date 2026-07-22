import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { authCookieString } from '@/lib/cookies';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return new Response(`
      <!DOCTYPE html>
      <html lang="tr">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Cross-Origin-Opener-Policy" content="unsafe-none">
          <meta http-equiv="Cross-Origin-Embedder-Policy" content="unsafe-none">
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
        'Content-Type': 'text/html; charset=utf-8',
        'Cross-Origin-Opener-Policy': 'unsafe-none',
        'Cross-Origin-Embedder-Policy': 'unsafe-none'
      }
    });
  }

  if (!code) {
    return new Response(`
      <!DOCTYPE html>
      <html lang="tr">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Cross-Origin-Opener-Policy" content="unsafe-none">
          <meta http-equiv="Cross-Origin-Embedder-Policy" content="unsafe-none">
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
        'Content-Type': 'text/html; charset=utf-8',
        'Cross-Origin-Opener-Policy': 'unsafe-none',
        'Cross-Origin-Embedder-Policy': 'unsafe-none'
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
    console.log('🔄 [CALLBACK] MongoDB bağlantısı başlatılıyor...');
    try {
      await connectDB();
      console.log('✅ [CALLBACK] MongoDB bağlantısı başarılı');
    } catch (dbError: any) {
      console.error('❌ [CALLBACK] MongoDB bağlantı hatası:', dbError?.message || dbError);
      throw dbError;
    }

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
    
    console.log('✅ [CALLBACK] Google OAuth callback: User saved, preparing response');
    console.log('✅ [CALLBACK] User ID:', String(user._id));
    console.log('✅ [CALLBACK] User Email:', user.email);
    console.log('✅ [CALLBACK] Token created:', token ? 'YES' : 'NO');

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
    console.log('✅ [CALLBACK] Target origin:', targetOrigin);
    // Production için www ekle (eğer yoksa)
    let targetOriginWithWww = targetOrigin;
    if (process.env.VERCEL_ENV === 'production' && !host.includes('localhost') && !host.includes('www.')) {
      targetOriginWithWww = `${protocol}//www.${host}`;
    } else if (host.includes('www.')) {
      // Eğer www varsa, non-www versiyonunu da hazırla
      targetOriginWithWww = targetOrigin;
      targetOrigin = targetOrigin.replace('www.', '');
    }
    
    // State parametresinden returnUrl'i al
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
      <!DOCTYPE html>
      <html lang="tr">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Cross-Origin-Opener-Policy" content="unsafe-none">
          <meta http-equiv="Cross-Origin-Embedder-Policy" content="unsafe-none">
          <title>Giriş Başarılı</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background: #f0f0f0; margin: 0;">
          <div style="background: white; padding: 30px; border-radius: 8px; max-width: 400px; margin: 50px auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #4CAF50; margin-bottom: 20px; margin-top: 0;">✅ Giriş Başarılı!</h2>
            <p style="color: #666; margin-bottom: 30px;">Giriş işlemi tamamlandı. Bu pencereyi kapatabilirsiniz.</p>
            <button onclick="window.close()" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; font-size: 16px;">
              Pencereyi Kapat
            </button>
          </div>
          <script>
            console.log('🚀 [CALLBACK] Script started');
            console.log('🚀 [CALLBACK] window.location:', window.location.href);
            console.log('🚀 [CALLBACK] window.opener:', window.opener);
            
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
            // ÖNCE localStorage'a yaz, sonra postMessage gönder
            try {
              localStorage.setItem('google_oauth_token', token);
              localStorage.setItem('google_oauth_user', JSON.stringify(userData));
              console.log('✅ [CALLBACK] Data saved to localStorage');
              console.log('✅ [CALLBACK] Token saved:', token.substring(0, 20) + '...');
              console.log('✅ [CALLBACK] User saved:', userData.email);
              
              // Custom event tetikle (ana pencere için)
              try {
                window.dispatchEvent(new Event('storage'));
                window.dispatchEvent(new Event('localStorageChange'));
                console.log('✅ [CALLBACK] Storage events dispatched');
              } catch (e) {
                console.warn('⚠️ [CALLBACK] Could not dispatch storage events:', e);
              }
            } catch (e) {
              console.error('❌ [CALLBACK] localStorage error:', e);
            }
            
            // Ana pencereye mesaj gönder
            const messageData = {
              type: 'GOOGLE_LOGIN_SUCCESS',
              user: userData,
              token: token
            };
            
            // window.opener kontrolü - ChatGPT önerisi
            console.log('🔍 [CALLBACK] window.opener check:', window.opener);
            console.log('🔍 [CALLBACK] window.location.origin:', window.location.origin);
            console.log('🔍 [CALLBACK] targetOrigin:', '${targetOrigin}');
            console.log('🔍 [CALLBACK] window.location.href:', window.location.href);
            
            // window.opener kontrolü ve postMessage
            const sendMessage = () => {
              if (!window.opener) {
                console.error('❌ [CALLBACK] window.opener is null - COOP may be blocking');
                console.error('❌ [CALLBACK] This means postMessage will NOT work');
                console.error('❌ [CALLBACK] Relying on localStorage fallback only');
                // window.opener null olsa bile localStorage'a yazıldı, bu yeterli
                return false;
              }
              
              console.log('✅ [CALLBACK] window.opener exists, sending message...');
              
              try {
                // Önce spesifik origin'e gönder
                const allowedOrigins = ['${targetOrigin}'];
                if (targetOrigin.includes('www.')) {
                  allowedOrigins.push(targetOrigin.replace('www.', ''));
                } else {
                  allowedOrigins.push(targetOrigin.replace('://', '://www.'));
                }
                
                console.log('📤 [CALLBACK] Sending to origins:', allowedOrigins);
                
                // Her origin'e gönder
                let successCount = 0;
                allowedOrigins.forEach(origin => {
                  try {
                    window.opener.postMessage(messageData, origin);
                    console.log('✅ [CALLBACK] postMessage sent to:', origin);
                    successCount++;
                  } catch (e) {
                    console.warn('⚠️ [CALLBACK] postMessage error for origin:', origin, e);
                  }
                });
                
                // Wildcard fallback (güvenlik riski var ama gerekli)
                try {
                  window.opener.postMessage(messageData, '*');
                  console.log('✅ [CALLBACK] postMessage sent to wildcard');
                  successCount++;
                } catch (e) {
                  console.warn('⚠️ [CALLBACK] postMessage wildcard error:', e);
                }
                
                console.log('📊 [CALLBACK] Total successful sends:', successCount);
                return successCount > 0;
              } catch (e) {
                console.error('❌ [CALLBACK] postMessage failed:', e);
                return false;
              }
            };
            
            // Hemen gönder
            console.log('🚀 [CALLBACK] Attempting to send message...');
            const initialSuccess = sendMessage();
            console.log('📊 [CALLBACK] Initial send result:', initialSuccess);
            
            // Retry mekanizması - 5 kez dene
            if (!initialSuccess) {
              console.warn('⚠️ [CALLBACK] Initial send failed, starting retry mechanism...');
              let retryCount = 0;
              const retryInterval = setInterval(() => {
                retryCount++;
                console.log('🔄 [CALLBACK] Retry attempt:', retryCount);
                
                if (retryCount > 5) {
                  console.error('❌ [CALLBACK] Max retries reached, giving up');
                  clearInterval(retryInterval);
                  return;
                }
                
                if (sendMessage()) {
                  console.log('✅ [CALLBACK] Retry successful!');
                  clearInterval(retryInterval);
                }
              }, 300);
            }
            
            // Popup'ı kapatmayı dene (ama zorunlu değil)
            // Kullanıcı manuel olarak da kapatabilir
            const closePopup = () => {
              try {
                console.log('🔒 [CALLBACK] Attempting to close popup...');
                if (window.opener) {
                  window.opener.focus();
                }
                window.close();
              } catch (e) {
                console.warn('⚠️ [CALLBACK] Close popup error:', e);
              }
            };
            
            // 3 saniye sonra otomatik kapatmayı dene (ama zorunlu değil)
            setTimeout(() => {
              closePopup();
            }, 3000);
          </script>
        </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cross-Origin-Opener-Policy': 'unsafe-none',
        'Cross-Origin-Embedder-Policy': 'unsafe-none',
        'Set-Cookie': authCookieString(String(token))
      }
    });
  } catch (error: any) {
    console.error('❌ Google OAuth error:', error);
    
    // MongoDB authentication hatası için özel mesaj
    let errorMessage = 'Google ile giriş yapılırken bir hata oluştu.';
    if (error?.code === 8000 || error?.codeName === 'AtlasError' || error?.message?.includes('authentication failed') || error?.message?.includes('bad auth')) {
      errorMessage = 'Veritabanı bağlantı hatası. Lütfen MongoDB şifrenizi kontrol edin.';
      console.error('🔐 MongoDB Authentication Hatası - .env.local dosyasındaki MONGODB_URI şifresini kontrol edin');
    }
    
    return new Response(`
      <!DOCTYPE html>
      <html lang="tr">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Cross-Origin-Opener-Policy" content="unsafe-none">
          <meta http-equiv="Cross-Origin-Embedder-Policy" content="unsafe-none">
        </head>
        <body>
          <script>
            console.error('❌ [CALLBACK] Google OAuth Exception:', ${JSON.stringify(error?.message || 'Unknown error')});
            console.error('❌ [CALLBACK] Error details:', ${JSON.stringify({
              code: error?.code,
              codeName: error?.codeName,
              name: error?.name
            })});
            if (window.opener) {
              window.opener.postMessage({
                type: 'GOOGLE_LOGIN_ERROR',
                error: ${JSON.stringify(errorMessage)}
              }, '*');
              console.log('✅ [CALLBACK] Error message sent to opener');
            } else {
              console.error('❌ [CALLBACK] window.opener is null, cannot send error message');
            }
            setTimeout(() => {
              try {
                window.close();
              } catch (e) {
                console.warn('⚠️ [CALLBACK] Cannot close popup:', e);
              }
            }, 100);
          </script>
        </body>
      </html>
    `, {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cross-Origin-Opener-Policy': 'unsafe-none',
        'Cross-Origin-Embedder-Policy': 'unsafe-none'
      }
    });
  }
} 