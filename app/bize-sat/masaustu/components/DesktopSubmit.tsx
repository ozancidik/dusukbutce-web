"use client";
import React from 'react';

interface DesktopSubmitProps {
  isMobile: boolean;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function DesktopSubmit({ 
  isMobile, 
  isSubmitting, 
  onSubmit 
}: DesktopSubmitProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '32px'
    }}>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitting}
        style={{
          background: isSubmitting 
            ? '#9ca3af' 
            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: isMobile ? '14px 28px' : '16px 32px',
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '600',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isSubmitting 
            ? 'none' 
            : '0 4px 12px rgba(59, 130, 246, 0.3)',
          transform: isSubmitting ? 'none' : 'translateY(0)',
          minWidth: '200px'
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }
        }}
      >
        {isSubmitting ? 'Gönderiliyor...' : 'Teklif Al'}
      </button>
    </div>
  );
}
