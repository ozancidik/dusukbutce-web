'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // 3 saniye sonra ana sayfaya yönlendir
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <h1 style={{
          fontSize: '6rem',
          margin: '0',
          color: '#1e293b',
          fontWeight: 'bold'
        }}>
          404
        </h1>
        
        <h2 style={{
          fontSize: '2rem',
          margin: '20px 0',
          color: '#475569'
        }}>
          Sayfa Bulunamadı
        </h2>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#64748b',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Aradığınız sayfa mevcut değil. 3 saniye sonra ana sayfaya yönlendirileceksiniz.
        </p>
        
        <button
          onClick={() => router.push('/')}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
          }}
        >
          Ana Sayfaya Git
        </button>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{
            margin: '0',
            color: '#64748b',
            fontSize: '0.9rem'
          }}>
            <strong>Önerilen sayfalar:</strong>
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '15px',
            justifyContent: 'center'
          }}>
            {[
              { name: 'Ana Sayfa', path: '/' },
              { name: 'Bize Sat', path: '/bize-sat' },
              { name: 'Satılık İlanlar', path: '/satilik-ilanlar' },
              { name: 'Ürünler', path: '/products' }
            ].map((page) => (
              <button
                key={page.path}
                onClick={() => router.push(page.path)}
                style={{
                  background: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.color = '#1e293b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
