import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';

export async function GET(request: NextRequest) {
  // Facebook OAuth yapılandırmasını kontrol et
  const facebookAppId = process.env.FACEBOOK_APP_ID;
  const facebookAppSecret = process.env.FACEBOOK_APP_SECRET;
  const facebookRedirectUri = process.env.FACEBOOK_REDIRECT_URI;
  
  if (!facebookAppId || facebookAppId === 'your-facebook-app-id') {
    console.error('Facebook OAuth Error: FACEBOOK_APP_ID environment variable is not set');
    return new Response(`
      <html>
        <body>
          <script>
            window.opener.postMessage({
              type: 'FACEBOOK_LOGIN_ERROR',
              error: 'Facebook OAuth yapılandırılmamış. Lütfen sistem yöneticisi ile iletişime geçin.'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  if (!facebookAppSecret || facebookAppSecret === 'your-facebook-app-secret') {
    console.error('Facebook OAuth Error: FACEBOOK_APP_SECRET environment variable is not set');
    return new Response(`
      <html>
        <body>
          <script>
            window.opener.postMessage({
              type: 'FACEBOOK_LOGIN_ERROR',
              error: 'Facebook OAuth yapılandırılmamış. Lütfen sistem yöneticisi ile iletişime geçin.'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  if (!facebookRedirectUri) {
    console.error('Facebook OAuth Error: FACEBOOK_REDIRECT_URI environment variable is not set');
    return new Response(`
      <html>
        <body>
          <script>
            window.opener.postMessage({
              type: 'FACEBOOK_LOGIN_ERROR',
              error: 'Facebook OAuth yapılandırılmamış. Lütfen sistem yöneticisi ile iletişime geçin.'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
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
        <body>
          <script>
            window.opener.postMessage({
              type: 'FACEBOOK_LOGIN_ERROR',
              error: 'Facebook ile giriş yapılırken bir hata oluştu: ${error}'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  if (!code) {
    console.error('Facebook OAuth error: No authorization code received');
    return new Response(`
      <html>
        <body>
          <script>
            window.opener.postMessage({
              type: 'FACEBOOK_LOGIN_ERROR',
              error: 'Yetkilendirme kodu bulunamadı.'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
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
        redirect_uri: facebookRedirectUri,
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
    
    // Email bilgisi olmadığı için geçici email oluştur
    const userEmail = `fb_${userData.id}@dusukbutce.com`;

    // MongoDB'ye bağlan (cache ile)
    await connectDB();

    // Kullanıcıyı bul veya oluştur
    let user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log('Facebook OAuth: Creating new user...');
      // Yeni kullanıcı oluştur
      user = new User({
        email: userEmail,
        name: userName,
        password: 'facebook-oauth-' + Math.random().toString(36).substr(2, 9), // Geçici şifre
        isAdmin: false,
        isActive: true,
      });
      await user.save();
      console.log('Facebook OAuth: New user created successfully');
    } else {
      console.log('Facebook OAuth: Existing user found');
    }

    console.log('Facebook OAuth: Login successful, sending success message');
    
    // Başarılı giriş sayfası
    return new Response(`
      <html>
        <body>
          <script>
            window.opener.postMessage({
              type: 'FACEBOOK_LOGIN_SUCCESS',
              user: {
                id: '${user._id}',
                email: '${user.email}',
                name: '${user.name}',
                isAdmin: ${user.isAdmin}
              }
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return new Response(`
      <html>
        <body>
          <script>
            window.opener.postMessage({
              type: 'FACEBOOK_LOGIN_ERROR',
              error: 'Facebook ile giriş yapılırken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}'
            }, window.location.origin);
            window.close();
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
} 