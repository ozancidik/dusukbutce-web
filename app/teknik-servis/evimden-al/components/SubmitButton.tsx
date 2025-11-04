"use client";
import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        type="submit"
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '16px 48px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
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
        🏠 Teknik Servis Talebi Gönder
      </button>
    </div>
  );
};

export default SubmitButton;
