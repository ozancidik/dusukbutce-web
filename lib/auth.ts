import jwt from "jsonwebtoken";

/**
 * `Authorization: Bearer <token>` başlığındaki JWT'yi İMZASIYLA doğrular ve
 * içindeki userId'yi döndürür. Token yoksa, geçersizse veya süresi dolmuşsa
 * null döner (istek anonim olarak ele alınır; ne yapılacağına çağıran karar verir).
 *
 * ÖNEMLİ: İmza `jwt.verify` ile doğrulanır. Böylece bir client, sahte bir JWT
 * payload'ı ile başka bir kullanıcının userId'sini taklit ederek onun adına
 * işlem yapamaz. (Eski kod imzayı doğrulamadan payload'ı base64 çözüyordu.)
 */
export interface VerifiedUser {
  userId: string;
  isAdmin: boolean;
}

/**
 * Token'ı imzasıyla doğrular ve { userId, isAdmin } döndürür. Token yoksa,
 * geçersizse, süresi dolmuşsa veya userId içermiyorsa null döner.
 */
export function getVerifiedUser(request: Request): VerifiedUser | null {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.slice(7).trim();
    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("getVerifiedUser: JWT_SECRET tanımlı değil");
      return null;
    }

    const decoded = jwt.verify(token, secret) as {
      userId?: string;
      isAdmin?: boolean;
    };
    if (!decoded.userId) return null;
    return { userId: decoded.userId, isAdmin: Boolean(decoded.isAdmin) };
  } catch {
    // Geçersiz / süresi dolmuş token.
    return null;
  }
}

/** Yalnızca doğrulanmış userId'yi döndüren kısayol (yoksa null). */
export function getVerifiedUserId(request: Request): string | null {
  return getVerifiedUser(request)?.userId ?? null;
}
