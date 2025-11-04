"use client";
import React from 'react';
import Link from 'next/link';

const AdminUsersAccessDenied: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '80px 20px 20px 20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: '56px',
          marginBottom: '12px'
        }}>
          🚫
        </div>
        <h1 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#dc2626',
          margin: '0 0 12px 0'
        }}>
          Erişim Engellendi
        </h1>
        <p style={{
          fontSize: '15px',
          color: '#6b7280',
          margin: '0 0 20px 0',
          lineHeight: '1.5'
        }}>
          Bu sayfaya erişim yetkiniz bulunmamaktadır. Sadece yönetici hesapları bu alana erişebilir.
        </p>
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3b82f6';
            }}>
              🏠 Anasayfaya Dön
            </button>
          </Link>
          <button 
            onClick={() => {
              // Sadece admin bilgilerini temizle
              localStorage.removeItem('adminLoggedIn');
              localStorage.removeItem('adminEmail');
              sessionStorage.removeItem('adminLoggedIn');
              sessionStorage.removeItem('adminEmail');
              
              // Custom event'i tetikle
              window.dispatchEvent(new Event('localStorageChange'));
              
              // Header'a logout mesajı gönder
              window.dispatchEvent(new CustomEvent('logout'));
              
              // Admin-users sayfasında kal (ana sayfaya yönlendirme yok)
              // Sayfayı yenile
              window.location.reload();
            }}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#dc2626';
            }}>
            🚪 Çıkış Yap
          </button>
        </div>
        <div style={{
          marginTop: '20px',
          padding: '14px',
          background: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{
            fontSize: '13px',
            color: '#6b7280',
            margin: '0 0 6px 0',
            fontWeight: '500'
          }}>
            💡 Yardım
          </p>
          <p style={{
            fontSize: '12px',
            color: '#9ca3af',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Eğer yönetici hesabınız olduğunu düşünüyorsanız, lütfen çıkış yapıp tekrar giriş yapın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersAccessDenied;
