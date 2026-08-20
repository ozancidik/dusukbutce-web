const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // @vercel/blob -> @vercel/oidc -> @vercel/cli-config -> xdg-app-paths zincirindeki
  // paket, import edilir edilmez require.main.filename'den ad tahmin etmeye çalışıyor.
  // Next'in webpack bundle'ında require.main uygun şekilde set edilmediği için bu,
  // "TypeError: The path argument must be of type string" ile build'i kırıyor.
  // Bu paketi bundle etmeyip gerçek Node ortamında native require ile yükletmek
  // sorunu çözüyor (runtime'da require.main normal davranıyor).
  serverExternalPackages: ['@vercel/blob'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://vercel.live",
              // Sentry ingest: DSN'e göre tam alt domain değişir (ör. o123456.ingest.us.sentry.io),
              // bu yüzden joker karakterle tüm bölgeler kapsanıyor.
              "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://oauth2.googleapis.com https://www.googleapis.com https://api.ipify.org https://ipapi.co https://*.ingest.sentry.io https://*.ingest.us.sentry.io https://*.ingest.de.sentry.io",
              "img-src 'self' data: https: blob:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-src 'self' https://vercel.live",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
          }
        ]
      },
      {
        source: '/api/auth/google/callback',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          }
        ]
      },
      {
        source: '/api/auth/facebook/callback',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          }
        ]
      }
    ];
  },
  compiler: {
    // Production build'inde tüm console.* çağrılarını söker (console.error hariç).
    // Geliştirmede (dev) loglar korunur. 637 elle console.log silmeye gerek kalmaz;
    // ayrıca token/kullanıcı gibi bilgilerin prod loglarına sızmasını önler.
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  images: {
    unoptimized: true
  }
};

// org/project/authToken tanımlı değilse (henüz bir Sentry hesabı yoksa)
// eklenti kaynak haritası yüklemeyi sessizce atlar — build'i kırmaz.
module.exports = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  webpack: {
    treeshake: { removeDebugLogging: true },
  },
});
