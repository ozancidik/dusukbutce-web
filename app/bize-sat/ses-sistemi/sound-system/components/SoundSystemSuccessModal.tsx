import React from 'react';

interface SoundSystemSuccessModalProps {
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
}

const SoundSystemSuccessModal: React.FC<SoundSystemSuccessModalProps> = ({ showSuccessModal, setShowSuccessModal }) => {
  if (!showSuccessModal) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: 'white',
          margin: '0 auto 16px'
        }}>
          ✅
        </div>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 8px 0'
        }}>
          Başarıyla Gönderildi!
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '0 0 16px 0',
          lineHeight: '1.5'
        }}>
          Ses sisteminiz için teklif talebiniz alındı. En kısa sürede size ulaşacağız.
        </p>
        <p style={{
          fontSize: '13px',
          color: '#059669',
          margin: '0 0 24px 0',
          lineHeight: '1.5',
          fontWeight: '500',
          background: '#f0fdf4',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #bbf7d0'
        }}>
          💡 Teklif durumunuzu <strong>Tekliflerim</strong> sayfasından takip edebilirsiniz.
        </p>
        <button
          onClick={() => setShowSuccessModal(false)}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Tamam
        </button>
      </div>
    </div>
  );
};

export default SoundSystemSuccessModal;
