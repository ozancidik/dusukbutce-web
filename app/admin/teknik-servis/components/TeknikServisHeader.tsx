"use client";
import React from 'react';

interface TeknikServisHeaderProps {
  isMobile: boolean;
}

export default function TeknikServisHeader({ isMobile }: TeknikServisHeaderProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: isMobile ? '24px' : '32px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '32px',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: isMobile ? '24px' : '32px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 8px 0'
      }}>
        🔧 Teknik Servis Yönetimi
      </h1>
      <p style={{
        fontSize: isMobile ? '14px' : '16px',
        color: '#6b7280',
        margin: 0
      }}>
        Teknik servis başvurularını yönetin ve takip edin
      </p>
    </div>
  );
}
