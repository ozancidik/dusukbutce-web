import React from 'react';

interface PhoneSubmitProps {
  isSubmitting: boolean;
}

export default function PhoneSubmit({ isSubmitting }: PhoneSubmitProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      style={{
        width: '100%',
        padding: '14px 24px',
        background: isSubmitting ? '#93c5fd' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: isSubmitting ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
      }}
      onMouseEnter={(e) => {
        if (!isSubmitting) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSubmitting) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
        }
      }}
    >
      {isSubmitting ? 'Gönderiliyor...' : 'TEKLİF AL'}
    </button>
  );
}
