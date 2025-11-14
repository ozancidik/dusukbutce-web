import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Sadece API endpoint'leri için CORS headers ekle
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    
    // Origin kontrolü
    const origin = request.headers.get('origin');
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // ÖNEMLİ: Origin yoksa = Same-origin request (kullanıcı aynı siteden istek atıyor)
    // Same-origin istekler CORS kontrolüne tabi değildir, direkt izin ver
    if (!origin) {
      // Same-origin request - CORS kontrolü yapılmaz, direkt izin ver
      return response;
    }
    
    // Origin varsa = Cross-origin request (farklı domain'den istek)
    // Bu durumda CORS kontrolü yapılır
    
    // İzin verilen origin'ler
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
      : isDevelopment 
        ? ['http://localhost:3000', 'http://localhost:3001'] // Development için localhost
        : [process.env.NEXT_PUBLIC_APP_URL || 'https://dusukbutce.com'].filter(Boolean);
    
    // Origin kontrolü
    let allowedOrigin = null;
    // Development'ta localhost'a izin ver
    if (isDevelopment && origin.startsWith('http://localhost')) {
      allowedOrigin = origin;
    } else if (allowedOrigins.includes(origin)) {
      allowedOrigin = origin;
    }
    
    // CORS headers ekle (sadece cross-origin istekler için)
    if (allowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Max-Age', '86400'); // 24 saat
    }
    
    // OPTIONS request için erken dön
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { 
        status: allowedOrigin ? 200 : 403,
        headers: response.headers
      });
    }
    
    // Cross-origin istek ama izin verilmemişse 403 dön
    if (!allowedOrigin) {
      return new NextResponse(
        JSON.stringify({ error: 'CORS policy: Origin not allowed' }),
        { 
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            ...Object.fromEntries(response.headers.entries())
          }
        }
      );
    }
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 