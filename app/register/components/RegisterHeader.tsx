"use client";
import React from 'react';

interface RegisterHeaderProps {
  isMobile: boolean;
}

export default function RegisterHeader({ isMobile }: RegisterHeaderProps) {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: isMobile ? '24px' : '32px'
    }}>
      <h1 style={{
        fontSize: isMobile ? '24px' : '32px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 8px 0'
      }}>
        Hesap Oluştur
      </h1>
      <p style={{
        fontSize: isMobile ? '14px' : '16px',
        color: '#6b7280',
        margin: 0
      }}>
        Düşük Bütçe ailesine katılın ve en iyi fiyatları keşfedin
      </p>
    </div>
  );
}
