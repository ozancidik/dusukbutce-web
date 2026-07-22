import jwt from "jsonwebtoken";
import { AUTH_COOKIE } from "@/lib/cookies";

/**
 * İsteğin JWT'sini İMZASIYLA doğrular. Token ÖNCE httpOnly `auth-token`
 * cookie'sinden, yoksa geriye uyumluluk için `Authorization: Bearer` header'ından
 * okunur. Token yoksa/geçersizse/süresi dolmuşsa null döner.
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
 * İstekten JWT'yi çıkarır: önce httpOnly `auth-token` cookie'si, yoksa
 * `Authorization: Bearer` header'ı.
 */
export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const match = cookieHeader.match(
      new RegExp(`(?:^|;\\s*)${AUTH_COOKIE}=([^;]+)`)
    );
    if (match) return decodeURIComponent(match[1]);
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }

  return null;
}

/**
 * Token'ı imzasıyla doğrular ve { userId, isAdmin } döndürür. Token yoksa,
 * geçersizse, süresi dolmuşsa veya userId içermiyorsa null döner.
 */
export function getVerifiedUser(request: Request): VerifiedUser | null {
  try {
    const token = getTokenFromRequest(request);
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
