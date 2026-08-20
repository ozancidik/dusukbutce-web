'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

// Next.js App Router'ın en üst seviye hata sınırı — root layout içinde
// yakalanamayan hatalar buraya düşer. DSN tanımlı değilse captureException
// no-op olur.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="tr">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h1 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#1e293b' }}>
            Bir şeyler ters gitti
          </h1>
          <p style={{ color: '#64748b', margin: '0 0 24px 0' }}>
            Beklenmedik bir hata oluştu. Lütfen sayfayı yenileyin.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Sayfayı Yenile
          </button>
        </div>
      </body>
    </html>
  );
}
