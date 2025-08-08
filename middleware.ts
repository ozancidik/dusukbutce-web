import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { 
  securityHeaders, 
  checkSQLInjection, 
  sanitizeInput,
  verifyJWTToken,
  validateCSRFToken
} from './lib/security';

// İzin verilen IP adresleri (admin panel için)
const ALLOWED_IPS = [
  '127.0.0.1',        // Localhost
  '::1',              // IPv6 localhost
  '212.154.23.66',    // Kullanıcının IP adresi
  '162.158.14.228',   // Cloudflare IP
  '164.92.73.53',     // Gerçek istemci IP (logdan tespit)
  '172.68.213.148',   // Vercel log'dan tespit edilen IP
  '172.68.213.166',   // Vercel log'dan tespit edilen IP
  // Buraya kendi IP adresinizi ekleyin
  // Örnek: '192.168.1.100',
  // Örnek: '203.0.113.0/24', // IP aralığı
];

// IP adresinin izin verilen listede olup olmadığını kontrol et
function isIPAllowed(ip: string): boolean {
  // IP adresini temizle (port numarasını kaldır)
  const cleanIP = ip.split(':')[0];
  
  return ALLOWED_IPS.some(allowedIP => {
    if (allowedIP.includes('/')) {
      // CIDR notasyonu (IP aralığı)
      return isIPInRange(cleanIP, allowedIP);
    }
    return cleanIP === allowedIP;
  });
}

// CIDR notasyonu kontrolü
function isIPInRange(ip: string, cidr: string): boolean {
  const [range, bits = "32"] = cidr.split("/");
  const mask = ~((2 ** (32 - parseInt(bits))) - 1);
  const ipLong = ipToLong(ip);
  const rangeLong = ipToLong(range);
  return (ipLong & mask) === (rangeLong & mask);
}

// IP adresini long integer'a çevir
function ipToLong(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

// Gelişmiş Input Validation
function validateRequestInput(request: NextRequest): boolean {
  const url = request.url;
  const searchParams = request.nextUrl.searchParams;
  
  // URL parametrelerini kontrol et
  for (const [key, value] of searchParams.entries()) {
    if (checkSQLInjection(value) || checkSQLInjection(key)) {
      console.log(`🚫 SQL Injection tespit edildi - Param: ${key}, Value: ${value}`);
      return false;
    }
  }
  
  // URL path'ini kontrol et
  if (checkSQLInjection(url)) {
    console.log(`🚫 SQL Injection tespit edildi - URL: ${url}`);
    return false;
  }
  
  return true;
}

// JWT Token Doğrulama
function validateAuthToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return true; // Auth gerektirmeyen endpoint'ler için
  
  const token = authHeader.replace('Bearer ', '');
  return verifyJWTToken(token);
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // API endpoint'lerini ve OAuth callback'leri EN ERKEN muaf tut
  if (pathname.startsWith('/api/') || 
      pathname.includes('/callback') || 
      pathname.includes('/auth') ||
      pathname.includes('google') ||
      pathname.includes('facebook') ||
      pathname.includes('oauth')) {
    console.log(`🔓 API/OAuth endpoint muaf tutuldu - Path: ${pathname}`);
    
    // CORS headers ekle
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // OPTIONS request için erken dön
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { 
        status: 200,
        headers: response.headers
      });
    }
    
    return response;
  }

  // Güvenlik headers ekle
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Gelişmiş Input Validation
  if (!validateRequestInput(request)) {
    return NextResponse.json(
      { error: 'Geçersiz istek tespit edildi' },
      { status: 400 }
    );
  }

  // Rate limiting için basit kontrol
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const realIP = request.headers.get('x-real-ip') || '';
  const connectionIP = request.headers.get('x-connection-ip') || '';
  
  // IP adresini belirle (localhost için özel kontrol)
  let ip = 'unknown';
  if (forwardedFor) {
    ip = forwardedFor.split(',')[0].trim();
  } else if (realIP) {
    ip = realIP;
  } else if (connectionIP) {
    ip = connectionIP;
  }
  
  // Localhost kontrolü
  if (ip === 'unknown' || ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
    ip = '127.0.0.1';
  }
  
  const userAgent = request.headers.get('user-agent') || '';
  
  // DEBUG: IP adresini ve diğer bilgileri logla
  console.log('DEBUG IP:', ip, 'Forwarded-For:', forwardedFor, 'Real-IP:', realIP, 'Path:', pathname, new Date().toISOString());
  
  // Bot koruması
  if (userAgent.includes('bot') || userAgent.includes('crawler')) {
    return NextResponse.json(
      { error: 'Bot erişimi engellendi' },
      { status: 403 }
    );
  }

  // JWT Token Doğrulama (sadece korumalı endpoint'ler için)
  if (pathname.startsWith('/admin') || pathname.startsWith('/profile') || pathname.startsWith('/orders')) {
    if (!validateAuthToken(request)) {
      console.log(`🚫 Geçersiz JWT token - Path: ${pathname}`);
      return NextResponse.json(
        { error: 'Geçersiz oturum' },
        { status: 401 }
      );
    }
  }

  // Admin panel IP kısıtlaması (sadece sayfa route'ları için, API değil)
  if (pathname.startsWith('/admin') || pathname.startsWith('/admin-users')) {
    if (!isIPAllowed(ip)) {
      console.log(`🚫 Admin panel erişim engellendi - IP: ${ip}, Path: ${pathname}`);
      return NextResponse.json(
        { 
          error: 'Erişim engellendi',
          message: 'Bu sayfaya erişim yetkiniz bulunmamaktadır.',
          code: 'ADMIN_ACCESS_DENIED'
        },
        { status: 403 }
      );
    }
    console.log(`✅ Admin panel erişim izni - IP: ${ip}, Path: ${pathname} - ${new Date().toISOString()} - FINAL FIX`);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 