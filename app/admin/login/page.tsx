"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basit doğrulama (gerçek uygulamada API'den kontrol edilir)
      if (email === 'admin@dusukbutce.com' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        router.push('/admin');
      } else {
        setError('Geçersiz email veya şifre!');
      }
    } catch (error) {
      setError('Giriş yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #4b5563 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: isMobile ? '12px' : '16px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.1)',
        padding: isMobile ? '24px 20px' : '48px 40px',
        width: '100%',
        maxWidth: isMobile ? '100%' : '400px',
        fontFamily: 'sans-serif'
      }}>
        <h1 style={{
          color: '#2563eb',
          fontSize: isMobile ? '24px' : '32px',
          textAlign: 'center',
          marginBottom: isMobile ? '24px' : '32px',
          fontWeight: 'bold'
        }}>
          Admin Girişi
        </h1>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: isMobile ? '16px' : '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: isMobile ? '16px' : '18px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? '20px' : '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: isMobile ? '16px' : '18px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          {error && (
            <div style={{
              background: '#fef2f2',
              color: '#dc2626',
              padding: isMobile ? '12px' : '16px',
              borderRadius: '8px',
              marginBottom: isMobile ? '16px' : '20px',
              fontSize: isMobile ? '14px' : '16px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: isMobile ? '14px' : '16px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        
        <div style={{
          marginTop: isMobile ? '24px' : '32px',
          padding: isMobile ? '16px' : '20px',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#374151',
            marginBottom: isMobile ? '8px' : '12px',
            fontWeight: '600'
          }}>
            Test bilgileri:
          </p>
          <p style={{
            fontSize: isMobile ? '13px' : '15px',
            color: '#6b7280',
            marginBottom: '4px'
          }}>
            <strong>Email:</strong> admin@dusukbutce.com
          </p>
          <p style={{
            fontSize: isMobile ? '13px' : '15px',
            color: '#6b7280',
            marginBottom: '0'
          }}>
            <strong>Şifre:</strong> admin123
          </p>
        </div>
      </div>
    </div>
  );
} 