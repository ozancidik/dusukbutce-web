import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return new Response(`
      <html>
        <body>
          <script>
            window.opener.postMessage({
              type: 'FACEBOOK_LOGIN_ERROR',
              error: 'Facebook ile giriş yapılırken bir hata oluştu.'
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
    // Facebook'dan access token al
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID || 'your-facebook-app-id',
        client_secret: process.env.FACEBOOK_APP_SECRET || 'your-facebook-app-secret',
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/api/auth/facebook/callback',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Access token alınamadı');
    }

    // Facebook'dan kullanıcı bilgilerini al
    const userResponse = await fetch(`https://graph.facebook.com/v18.0/me?fields=id,name,email&access_token=${tokenData.access_token}`);

    const userData = await userResponse.json();

    if (!userData.email) {
      throw new Error('Email bilgisi alınamadı');
    }

    // MongoDB'ye bağlan
    await connectDB();

    // Kullanıcıyı bul veya oluştur
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      // Yeni kullanıcı oluştur
      user = new User({
        email: userData.email,
        name: userData.name,
        password: 'facebook-oauth-' + Math.random().toString(36).substr(2, 9), // Geçici şifre
        isAdmin: false,
        isActive: true,
      });
      await user.save();
    }

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
              error: 'Facebook ile giriş yapılırken bir hata oluştu.'
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