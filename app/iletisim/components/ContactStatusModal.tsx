"use client";
import React from 'react';

interface ContactStatusModalProps {
  submitStatus: {
    type: 'success' | 'error' | null;
    message: string;
  };
  onClose: () => void;
}

const ContactStatusModal: React.FC<ContactStatusModalProps> = ({ submitStatus, onClose }) => {
  if (!submitStatus.type) return null;

  return (
    <>
      {/* Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        {/* Modal */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          animation: 'slideIn 0.3s ease-out',
          position: 'relative'
        }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#9ca3af',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.color = '#6b7280';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            ×
          </button>

          {/* Icon */}
          <div style={{
            fontSize: '64px',
            marginBottom: '24px',
            animation: 'bounceIn 0.6s ease-out'
          }}>
            {submitStatus.type === 'success' ? '🎉' : '⚠️'}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: submitStatus.type === 'success' ? '#059669' : '#dc2626'
          }}>
            {submitStatus.type === 'success' ? 'Mesaj Gönderildi!' : 'Hata Oluştu'}
          </h3>

          {/* Message */}
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: '0 0 32px 0',
            lineHeight: '1.6'
          }}>
            {submitStatus.message}
          </p>

          {/* Action Button */}
          <button
            onClick={onClose}
            style={{
              background: submitStatus.type === 'success' 
                ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px 0 rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(0, 0, 0, 0.1)';
            }}
          >
            {submitStatus.type === 'success' ? 'Tamam' : 'Tekrar Dene'}
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ContactStatusModal;









