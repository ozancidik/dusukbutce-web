import { NextResponse } from "next/server";

/**
 * Basit bellek-içi sliding-window rate limiter.
 *
 * Brute-force (login denemesi, e-posta spam'i) saldırılarını yavaşlatmak için
 * hassas auth endpoint'lerinde kullanılır.
 *
 * NOT (serverless): Sayaçlar süreç belleğinde tutulur. Vercel'de her warm
 * lambda örneği kendi sayacını tutar; bu yüzden koruma "kesin" değil ama tek
 * IP'den gelen hızlı denemeleri ciddi şekilde yavaşlatır. Kesin/global limit
 * gerekirse Redis tabanlı bir çözüm (ör. Upstash) veya Cloudflare WAF
 * (bkz. cloudflare-waf-rules.md) eklenmelidir.
 */

interface WindowEntry {
  timestamps: number[]; // istek zamanları (ms)
}

const store = new Map<string, WindowEntry>();

// Belleğin sınırsız büyümesini önle: her 5 dakikada bir eski kayıtları temizle.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(now: number, maxWindowMs: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter(t => now - t < maxWindowMs);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

/** İstemci IP'sini proxy başlıklarından çıkarır. */
export function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export interface RateLimitOptions {
  /** Sayacı ayrıştıran isim (genelde endpoint adı). */
  name: string;
  /** Pencere içindeki maksimum istek sayısı. */
  limit: number;
  /** Pencere süresi (ms). */
  windowMs: number;
}

/**
 * İstek limiti aşıyorsa 429 yanıtı döndürür, aşmıyorsa null.
 * Kullanım (route handler'ın başında):
 *   const limited = checkRateLimit(request, { name: "login", limit: 10, windowMs: 5 * 60_000 });
 *   if (limited) return limited;
 */
export function checkRateLimit(
  request: Request,
  { name, limit, windowMs }: RateLimitOptions
): NextResponse | null {
  const now = Date.now();
  cleanup(now, windowMs);

  const key = `${name}:${getClientIp(request)}`;
  const entry = store.get(key) ?? { timestamps: [] };

  // Pencere dışına düşen eski istekleri at.
  entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);

  if (entry.timestamps.length >= limit) {
    const oldest = entry.timestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return NextResponse.json(
      {
        success: false,
        message: "Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  entry.timestamps.push(now);
  store.set(key, entry);
  return null;
}
