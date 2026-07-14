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
export function getVerifiedUserId(request: Request): string | null {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.slice(7).trim();
    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("getVerifiedUserId: JWT_SECRET tanımlı değil");
      return null;
    }

    const decoded = jwt.verify(token, secret) as { userId?: string };
    return decoded.userId ?? null;
  } catch {
    // Geçersiz / süresi dolmuş token — anonim istek olarak devam edilir.
    return null;
  }
}
