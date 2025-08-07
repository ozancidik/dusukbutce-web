import { NextRequest, NextResponse } from 'next/server';

// Rate Limiting - DDoS Koruması (Next.js uyumlu)
export const rateLimiter = {
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // IP başına maksimum 100 istek
  message: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.',
};

// CSRF Token Oluşturma ve Doğrulama (Edge Runtime uyumlu)
export const generateCSRFToken = (): string => {
  // Edge Runtime için basit token oluşturma
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}-${random}`;
};

export const validateCSRFToken = (token: string, sessionToken: string): boolean => {
  if (!token || !sessionToken) return false;
  return token === sessionToken;
};

// JWT Token Doğrulama (Edge Runtime uyumlu)
export const verifyJWTToken = (token: string): boolean => {
  try {
    // JWT token formatını kontrol et
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Token'ın geçerlilik süresini kontrol et (basit kontrol)
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      return false; // Token süresi dolmuş
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

// Şifre Güvenliği Kontrolü (Edge Runtime uyumlu)
export const validatePasswordStrength = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter olmalıdır');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermelidir');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermelidir');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Şifre en az bir rakam içermelidir');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Şifre en az bir özel karakter içermelidir');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Güvenli Şifre Hash'leme (Server-side only)
export const hashPassword = async (password: string): Promise<string> => {
  // Bu fonksiyon sadece server-side API route'larda kullanılmalı
  if (typeof window !== 'undefined') {
    throw new Error('hashPassword sadece server-side kullanılabilir');
  }
  
  const crypto = await import('crypto');
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  // Bu fonksiyon sadece server-side API route'larda kullanılmalı
  if (typeof window !== 'undefined') {
    throw new Error('verifyPassword sadece server-side kullanılabilir');
  }
  
  const crypto = await import('crypto');
  const [salt, hash] = hashedPassword.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
};

// Input Validation Schema
export const validateInput = (schema: any) => {
  return (req: NextRequest) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return NextResponse.json(
        { error: 'Geçersiz veri formatı' },
        { status: 400 }
      );
    }
    return null;
  };
};

// XSS Koruması
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// SQL Injection Koruması
export const checkSQLInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
    /(\b(OR|AND)\b\s+['"]\w+['"]\s*=\s*['"]\w+['"])/i,
    /(--|\/\*|\*\/|xp_|sp_)/i,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
};

// Dosya Upload Güvenliği
export const validateFileUpload = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Geçersiz dosya türü' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Dosya boyutu çok büyük (maksimum 5MB)' };
  }
  
  return { isValid: true };
};

// Güvenli Oturum Yönetimi (Edge Runtime uyumlu)
export const generateSessionToken = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
};

export const validateSession = (sessionToken: string, userId: string): boolean => {
  // Session token'ın geçerliliğini kontrol et
  if (!sessionToken || !userId) return false;
  
  // Burada veritabanından session kontrolü yapılabilir
  // Şimdilik basit bir kontrol
  return sessionToken.length > 20 && userId.length > 0;
};

// Güvenlik Headers
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
}; 