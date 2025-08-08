import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
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
              type: 'GOOGLE_LOGIN_ERROR',
              error: 'Google ile giriş yapılırken bir hata oluştu.'
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
              type: 'GOOGLE_LOGIN_ERROR',
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
        redirect_uri: 'https://dusukbutce.com/api/auth/google/callback',
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

    // MongoDB'ye bağlan
    await connectDB();

    // Kullanıcıyı bul veya oluştur
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      // Yeni kullanıcı oluştur
      user = new User({
        email: userData.email,
        name: userData.name,
        password: 'google-oauth-' + Math.random().toString(36).substr(2, 9), // Geçici şifre
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
              type: 'GOOGLE_LOGIN_SUCCESS',
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
    console.error('Google OAuth error:', error);
    return new Response(`
      <html>
        <body>
          <script>
            window.opener.postMessage({
              type: 'GOOGLE_LOGIN_ERROR',
              error: 'Google ile giriş yapılırken bir hata oluştu.'
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