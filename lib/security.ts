// CSRF Token Oluşturma ve Doğrulama (Edge Runtime uyumlu)
export const generateCSRFToken = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}-${random}`;
};

export const validateCSRFToken = (token: string, sessionToken: string): boolean => {
  if (!token || !sessionToken) return false;
  return token === sessionToken;
};

// XSS Koruması — girdideki HTML özel karakterlerini kaçış diziler ile değiştirir.
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Basit SQL-injection kalıp kontrolü.
// NOT: Bu proje MongoDB (NoSQL) kullanıyor; bu kontrol NoSQL injection'a karşı
// koruma SAĞLAMAZ ve "SELECT/OR/AND" gibi kelimeler içeren geçerli girdileri
// (isim, açıklama vb.) yanlışlıkla reddedebilir. Gerçek koruma için şema tabanlı
// doğrulama (ör. Joi) ve Mongoose'un tip zorlaması tercih edilmelidir.
export const checkSQLInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
    /(\b(OR|AND)\b\s+['"]\w+['"]\s*=\s*['"]\w+['"])/i,
    /(--|\/\*|\*\/|xp_|sp_)/i,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
};
