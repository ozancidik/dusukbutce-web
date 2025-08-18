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
    
    const checkAdminStatus = () => {
      const adminLoggedIn = localStorage.getItem('adminLoggedIn');
      const adminEmail = localStorage.getItem('adminEmail');
      
      if (adminLoggedIn === 'true' && adminEmail) {
        console.log("🔒 Admin zaten giriş yapmış, admin paneline yönlendiriliyor...");
        router.push('/admin');
        return;
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // İlk admin durumu kontrolü
    checkAdminStatus();
    
    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      checkAdminStatus();
    };
    
    // Custom event'leri dinle
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basit doğrulama (gerçek uygulamada API'den kontrol edilir)
      if (email === 'admin@dusukbutce.com' && password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        
        // Custom event'i tetikle
        window.dispatchEvent(new Event('localStorageChange'));
        
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
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: isMobile ? '80px 20px 20px 20px' : '120px 40px 40px 40px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: isMobile ? '12px' : '16px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.1)',
        padding: isMobile ? '20px 16px' : '32px 28px',
        width: '100%',
        maxWidth: isMobile ? '100%' : '400px',
        fontFamily: 'sans-serif'
      }}>
        <h1 style={{
          color: '#2563eb',
          fontSize: isMobile ? '22px' : '28px',
          textAlign: 'center',
          marginBottom: isMobile ? '20px' : '24px',
          fontWeight: 'bold'
        }}>
          Admin Girişi
        </h1>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: isMobile ? '14px' : '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: isMobile ? '15px' : '16px',
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
                padding: isMobile ? '10px' : '14px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: isMobile ? '15px' : '16px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          <div style={{ marginBottom: isMobile ? '18px' : '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: isMobile ? '15px' : '16px',
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
                padding: isMobile ? '10px' : '14px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: isMobile ? '15px' : '16px',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          
          {error && (
            <div style={{
              background: '#fef2f2',
              color: '#dc2626',
              padding: isMobile ? '10px' : '14px',
              borderRadius: '8px',
              marginBottom: isMobile ? '14px' : '16px',
              fontSize: isMobile ? '13px' : '15px',
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
              padding: isMobile ? '12px' : '14px',
              fontSize: isMobile ? '15px' : '16px',
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
          marginTop: isMobile ? '20px' : '24px',
          padding: isMobile ? '14px' : '16px',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{
            fontSize: isMobile ? '13px' : '15px',
            color: '#374151',
            marginBottom: isMobile ? '6px' : '8px',
            fontWeight: '600'
          }}>
            Test bilgileri:
          </p>
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#6b7280',
            marginBottom: '3px'
          }}>
            <strong>Email:</strong> admin@dusukbutce.com
          </p>
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
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