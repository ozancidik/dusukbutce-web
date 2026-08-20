import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Trafiğin tamamını izlemek maliyetli olabileceğinden düşük bir oran
  // seçildi; ilk verilerle birlikte gerektikçe artırılabilir.
  tracesSampleRate: 0.1,
  // Prod olmayan ortamlarda konsolu Sentry log'larıyla kirletmemek için kapalı.
  debug: false,
});
