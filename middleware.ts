import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityHeaders } from './lib/security';

// İzin verilen IP adresleri (admin panel için)
const ALLOWED_IPS = [
  '127.0.0.1',        // Localhost
  '::1',              // IPv6 localhost
  '212.154.23.66',    // Kullanıcının IP adresi
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

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Güvenlik headers ekle
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Rate limiting için basit kontrol
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || '';
  
  // Bot koruması
  if (userAgent.includes('bot') || userAgent.includes('crawler')) {
    return NextResponse.json(
      { error: 'Bot erişimi engellendi' },
      { status: 403 }
    );
  }

  // SQL Injection kontrolü
  const url = request.url;
  if (url.includes('SELECT') || url.includes('INSERT') || url.includes('DROP')) {
    return NextResponse.json(
      { error: 'Geçersiz istek' },
      { status: 400 }
    );
  }

  // Admin panel IP kısıtlaması (sadece sayfa route'ları için, API değil)
  const pathname = request.nextUrl.pathname;
  if ((pathname.startsWith('/admin') || pathname.startsWith('/admin-users')) && !pathname.startsWith('/api/')) {
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
    console.log(`✅ Admin panel erişim izni - IP: ${ip}, Path: ${pathname}`);
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