import * as Sentry from '@sentry/nextjs';

// middleware.ts edge runtime'da çalıştığı için ayrı bir init gerekiyor —
// Node.js API'lerinin bir kısmı (ör. dosya sistemi) edge'de yok.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  debug: false,
});
