import { NextResponse } from "next/server";

/**
 * httpOnly auth cookie yardımcıları.
 *
 * JWT'yi httpOnly bir cookie'de tutarız; böylece tarayıcıdaki JavaScript (ve
 * dolayısıyla XSS) token'a erişemez. Cookie same-origin isteklerde otomatik
 * gönderildiği için client'ın Authorization header'ı elle eklemesine gerek kalmaz.
 */

export const AUTH_COOKIE = "auth-token";

// Token'ın ömrüyle aynı (jwt.sign expiresIn: '7d').
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

const baseOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/** Verilen response'a httpOnly auth cookie'sini ekler. */
export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set(AUTH_COOKIE, token, {
    ...baseOptions,
    maxAge: MAX_AGE_SECONDS,
  });
}

/** Auth cookie'sini siler (logout). */
export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set(AUTH_COOKIE, "", {
    ...baseOptions,
    maxAge: 0,
  });
}

/**
 * Düz `Response` (NextResponse değil) nesneleri için `Set-Cookie` başlık değeri.
 * OAuth callback'leri gibi elle Response döndüren yerlerde kullanılır.
 */
export function authCookieString(token: string): string {
  const parts = [
    `${AUTH_COOKIE}=${token}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${MAX_AGE_SECONDS}`,
    "SameSite=Lax",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}
