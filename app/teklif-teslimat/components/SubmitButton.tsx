"use client";
import React from 'react';

interface SubmitButtonProps {
  isMobile: boolean;
  selectedMethod: 'kargo' | 'evden' | null;
  formData: any;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function SubmitButton({ isMobile, selectedMethod, formData, onSubmit, isSubmitting }: SubmitButtonProps) {
  const isFormValid = selectedMethod && 
    formData.firstName && 
    formData.lastName && 
    formData.email && 
    formData.phone && 
    formData.address && 
    formData.city && 
    formData.district;

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '20px' : '24px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    }}>
      <button
        type="button"
        onClick={onSubmit}
        disabled={!isFormValid || isSubmitting}
        style={{
          width: '100%',
          background: isFormValid && !isSubmitting ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : '#9ca3af',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s',
          boxShadow: isFormValid && !isSubmitting ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
        }}
        onMouseEnter={(e) => {
          if (isFormValid && !isSubmitting) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (isFormValid && !isSubmitting) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }
        }}
      >
        {isSubmitting ? 'İşleniyor...' : 'Teslimat Bilgilerini Gönder'}
      </button>
      
      {!isFormValid && (
        <p style={{
          fontSize: '12px',
          color: '#dc2626',
          margin: '8px 0 0 0',
          textAlign: 'center'
        }}>
          Lütfen tüm gerekli alanları doldurun
        </p>
      )}
    </div>
  );
}
