'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  isMobile: boolean;
}

export default function EmptyState({ isMobile }: EmptyStateProps) {
  const router = useRouter();
  
  return (
    <div style={{
      textAlign: 'center',
      padding: isMobile ? '40px 20px' : '60px 40px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        fontSize: isMobile ? '48px' : '64px',
        marginBottom: '16px'
      }}>
        📝
      </div>
      <h3 style={{
        fontSize: isMobile ? '18px' : '20px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px'
      }}>
        Henüz talebiniz yok
      </h3>
      <p style={{
        fontSize: isMobile ? '14px' : '16px',
        color: '#6b7280',
        marginBottom: '24px'
      }}>
        Satış talebi oluşturmak için aşağıdaki butona tıklayın
      </p>
      <button
        onClick={() => router.push('/bize-sat')}
        style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: isMobile ? '12px 24px' : '16px 32px',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
        }}
      >
        Satış Talebi Oluştur
      </button>
    </div>
  );
}











