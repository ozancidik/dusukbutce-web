"use client";
import React, { useEffect } from 'react';

interface ErrorPopupProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  isMobile: boolean;
}

export default function ErrorPopup({ isOpen, message, onClose, isMobile }: ErrorPopupProps) {
  useEffect(() => {
    const styleId = 'register-error-popup-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes slideInDown {
          from {
            transform: translateY(-30px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
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
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: isMobile ? '16px' : '20px',
        backdropFilter: 'blur(6px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: isMobile ? '36px 28px' : '48px 40px',
          maxWidth: isMobile ? '90%' : '550px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          animation: 'slideInDown 0.4s ease-out',
          border: '4px solid #dc2626',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div style={{
          width: isMobile ? '100px' : '120px',
          height: isMobile ? '100px' : '120px',
          margin: '0 auto 24px',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '50px' : '60px',
          boxShadow: '0 10px 30px rgba(220, 38, 38, 0.5)',
          animation: 'shake 0.6s ease-out',
          color: 'white',
          fontWeight: 'bold'
        }}>
          ✕
        </div>
        
        <h2 style={{
          fontSize: isMobile ? '28px' : '36px',
          fontWeight: '800',
          color: '#1f2937',
          margin: '0 0 20px 0',
          lineHeight: '1.2'
        }}>
          ❌ Kayıt Başarısız!
        </h2>
        
        <div style={{
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          border: '3px solid #fca5a5',
          borderRadius: '16px',
          padding: isMobile ? '20px' : '24px',
          marginBottom: '28px',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
        }}>
          <p style={{
            margin: 0,
            fontSize: isMobile ? '18px' : '20px',
            color: '#991b1b',
            fontWeight: '700',
            lineHeight: '1.6',
            textAlign: 'left',
            whiteSpace: 'pre-line' // \n karakterlerini satır sonu olarak işle
          }}>
            {message}
          </p>
        </div>
        
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '16px 32px' : '18px 40px',
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
            width: '100%'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(220, 38, 38, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
          }}
        >
          Tamam
        </button>
      </div>
    </div>
  );
}

