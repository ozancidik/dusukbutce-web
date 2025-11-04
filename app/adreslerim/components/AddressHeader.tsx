"use client";
import React from 'react';

interface AddressHeaderProps {
  isMobile: boolean;
  addressCount: number;
  onAddAddress: () => void;
}

export default function AddressHeader({ isMobile, addressCount, onAddAddress }: AddressHeaderProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      borderRadius: '16px',
      padding: isMobile ? '24px' : '32px',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      marginBottom: '32px'
    }}>
      <h1 style={{
        fontSize: isMobile ? '24px' : '32px',
        fontWeight: '700',
        margin: '0 0 8px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        <span style={{ fontSize: isMobile ? '32px' : '40px' }}>📍</span>
        Adreslerim
      </h1>
      
      <p style={{
        fontSize: isMobile ? '14px' : '16px',
        margin: '0 0 24px 0',
        opacity: 0.9
      }}>
        {addressCount} adres kayıtlı
      </p>
      
      <button
        onClick={onAddAddress}
        style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: isMobile ? '12px 24px' : '16px 32px',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          transform: 'translateY(0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #047857 0%, #059669 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
        }}
      >
        ➕ Yeni Adres Ekle
      </button>
    </div>
  );
}
