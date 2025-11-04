import React from 'react';

interface SuccessModalProps {
  isMobile: boolean;
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
  formData: any;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isMobile, showSuccessModal, setShowSuccessModal, formData }) => {
  const shippingOptions = [
    { value: 'aras', label: 'Aras Kargo', price: '25 TL', time: '1-2 gün' },
    { value: 'mng', label: 'MNG Kargo', price: '30 TL', time: '1-2 gün' },
    { value: 'yurtici', label: 'Yurtiçi Kargo', price: '35 TL', time: '2-3 gün' },
    { value: 'ptt', label: 'PTT Kargo', price: '20 TL', time: '3-5 gün' }
  ];

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
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px'
        }}>
          📦
        </div>

        <h2 style={{
          fontSize: isMobile ? '24px' : '28px',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 16px 0'
        }}>
          Kargo Talebiniz Alındı!
        </h2>

        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#6b7280',
          margin: '0 0 32px 0',
          lineHeight: '1.6'
        }}>
          Kargo ile gönderim talebiniz başarıyla alındı. Kargo bilgileri e-posta ile gönderilecektir.
        </p>

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
            📦 Seçilen Kargo
          </div>
          <div style={{
            fontSize: '16px',
            color: '#1f2937',
            fontWeight: '600'
          }}>
            {shippingOptions.find(opt => opt.value === formData.shippingMethod)?.label || 'Kargo seçilmedi'}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            marginTop: '4px'
          }}>
            {shippingOptions.find(opt => opt.value === formData.shippingMethod)?.price} • {shippingOptions.find(opt => opt.value === formData.shippingMethod)?.time}
          </div>
        </div>

        <button
          onClick={() => setShowSuccessModal(false)}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            width: '100%'
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
          Tamam
        </button>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;
