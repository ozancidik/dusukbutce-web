"use client";
import React from 'react';

interface SuccessModalProps {
  isMobile: boolean;
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
  handleAddressRedirect: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isMobile, 
  showSuccessModal, 
  setShowSuccessModal, 
  handleAddressRedirect 
}) => {
  if (!showSuccessModal) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '32px 24px' : '48px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        position: 'relative',
        animation: 'modalSlideIn 0.3s ease-out'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px'
        }}>
          ✅
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: isMobile ? '24px' : '28px',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 16px 0'
        }}>
          Talebiniz Alındı!
        </h2>

        {/* Message */}
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#6b7280',
          margin: '0 0 32px 0',
          lineHeight: '1.6'
        }}>
          Teknik servis talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.
        </p>

        {/* Additional Info */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '20px',
          margin: '0 0 32px 0',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#374151',
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            📞 İletişim Bilgileri
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Telefon: 0212 XXX XX XX<br />
            E-posta: info@dusukbutce.com
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <button
            onClick={handleAddressRedirect}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              flex: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
          >
            📍 Adres Bilgilerini Güncelle
          </button>
          <button
            onClick={() => setShowSuccessModal(false)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              flex: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;