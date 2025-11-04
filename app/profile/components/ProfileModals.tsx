"use client";
import React, { useEffect } from 'react';

interface ProfileModalsProps {
  showSuccessPopup: boolean;
  showErrorPopup: boolean;
  errorMessage: string;
  successMessage?: string;
}

export default function ProfileModals({ showSuccessPopup, showErrorPopup, errorMessage, successMessage = '✅ İşlem başarıyla tamamlandı!' }: ProfileModalsProps) {
  useEffect(() => {
    // CSS animasyonunu dinamik olarak ekle
    const styleId = 'profile-modals-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        .profile-success-popup {
          animation: slideInRight 0.3s ease-out !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <>
      {/* Başarı Popup'ı */}
      {showSuccessPopup && (
        <div 
          className="profile-success-popup"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#10b981',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 99999,
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: '300px',
            maxWidth: '400px',
            pointerEvents: 'auto',
            transform: 'translateX(0)',
            transition: 'all 0.3s ease-out'
          }}
        >
          <span style={{ fontSize: '18px', flexShrink: 0 }}>✅</span>
          <span style={{ flex: 1 }}>{successMessage}</span>
        </div>
      )}

      {/* Hata Popup'ı */}
      {showErrorPopup && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#ef4444',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 99999,
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: '300px',
          maxWidth: '400px',
          pointerEvents: 'auto'
        }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>❌</span>
          <span style={{ flex: 1 }}>{errorMessage}</span>
        </div>
      )}
    </>
  );
}
