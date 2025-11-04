"use client";
import React from 'react';

interface DesktopHeaderProps {
  isMobile: boolean;
}

export default function DesktopHeader({ isMobile }: DesktopHeaderProps) {
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
        Masaüstü Bilgisayar Sat
      </h1>
      <p style={{
        fontSize: isMobile ? '14px' : '16px',
        color: '#6b7280',
        margin: 0
      }}>
        Masaüstü bilgisayarınızı satın, en iyi fiyatı alın
      </p>
    </div>
  );
}
