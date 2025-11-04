"use client";
import React, { useEffect } from 'react';

interface SuccessPopupProps {
  isOpen: boolean;
  countdown: number;
  onClose: () => void;
  isMobile: boolean;
}

export default function SuccessPopup({ isOpen, countdown, onClose, isMobile }: SuccessPopupProps) {
  useEffect(() => {
    // CSS animasyonlarını dinamik olarak ekle
    const styleId = 'register-success-popup-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes slideInUp {
          from {
            transform: translateY(30px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: isMobile ? '16px' : '20px',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: isMobile ? '36px 28px' : '56px 48px',
          maxWidth: isMobile ? '90%' : '600px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
          animation: 'slideInUp 0.4s ease-out',
          border: '4px solid #10b981',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div style={{
          width: isMobile ? '120px' : '140px',
          height: isMobile ? '120px' : '140px',
          margin: '0 auto 32px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '60px' : '70px',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.5)',
          animation: 'scaleIn 0.5s ease-out',
          color: 'white',
          fontWeight: 'bold'
        }}>
          ✓
        </div>
        
        <h2 style={{
          fontSize: isMobile ? '32px' : '40px',
          fontWeight: '800',
          color: '#1f2937',
          margin: '0 0 24px 0',
          lineHeight: '1.2'
        }}>
          ✅ Kayıt Başarılı!
        </h2>
        
        <p style={{
          fontSize: isMobile ? '20px' : '24px',
          color: '#1f2937',
          margin: '0 0 28px 0',
          lineHeight: '1.5',
          fontWeight: '600'
        }}>
          Kullanıcı başarıyla oluşturuldu!
        </p>
        
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '3px solid #f59e0b',
          borderRadius: '16px',
          padding: isMobile ? '20px' : '24px',
          marginBottom: '32px',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
        }}>
          <p style={{
            margin: 0,
            fontSize: isMobile ? '18px' : '22px',
            color: '#92400e',
            fontWeight: '700',
            lineHeight: '1.6'
          }}>
            📧 Email adresinizi kontrol edin!
          </p>
          <p style={{
            margin: '12px 0 0 0',
            fontSize: isMobile ? '16px' : '18px',
            color: '#78350f',
            fontWeight: '500',
            lineHeight: '1.5'
          }}>
            Hesabınızı aktifleştirmek için e-posta doğrulama linkine tıklayın.
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            border: '2px solid #3b82f6',
            borderRadius: '12px',
            padding: isMobile ? '14px' : '16px',
            marginBottom: '20px'
          }}>
            <p style={{
              margin: 0,
              fontSize: isMobile ? '16px' : '18px',
              color: '#1e40af',
              fontWeight: '600'
            }}>
              ⏰ {countdown} saniye sonra otomatik yönlendirileceksiniz
            </p>
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '16px 32px' : '18px 40px',
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
            }}
          >
            Şimdi Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
}
