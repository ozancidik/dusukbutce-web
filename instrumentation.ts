import type { Instrumentation } from 'next';

// Next.js instrumentation hook — sunucu/edge runtime başlarken bir kez çalışır.
// NEXT_PUBLIC_SENTRY_DSN tanımlı değilse Sentry.init() no-op olur (SDK'nın
// belgelenmiş davranışı) — yani bu dosya DSN eklenene kadar tamamen etkisiz.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError: Instrumentation.onRequestError = async (...args) => {
  const Sentry = await import('@sentry/nextjs');
  Sentry.captureRequestError(...args);
};
