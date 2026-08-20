import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  // Session Replay şimdilik kapalı — DSN eklendikten sonra ihtiyaç
  // duyulursa integrations: [Sentry.replayIntegration()] ile açılabilir.
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
