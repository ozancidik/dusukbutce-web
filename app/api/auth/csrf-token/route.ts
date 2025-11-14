import { NextRequest, NextResponse } from 'next/server';
import { generateCSRFToken } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    // CSRF token oluştur
    const csrfToken = generateCSRFToken();
    
    // Token'ı response header'ında döndür (güvenli cookie olarak da set edilebilir)
    const response = NextResponse.json({ 
      success: true, 
      csrfToken 
    });
    
    // HttpOnly cookie olarak da set et (daha güvenli)
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 saat
      path: '/'
    });
    
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('CSRF token generation error:', errorMessage);
    return NextResponse.json(
      { success: false, error: 'CSRF token oluşturulamadı' },
      { status: 500 }
    );
  }
}

