"use client";
import React from 'react';

interface DeliveryMethodProps {
  isMobile: boolean;
  selectedMethod: 'kargo' | 'evden' | null;
  setSelectedMethod: (method: 'kargo' | 'evden' | null) => void;
}

export default function DeliveryMethod({ isMobile, selectedMethod, setSelectedMethod }: DeliveryMethodProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '20px' : '24px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '24px',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: isMobile ? '18px' : '20px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🚚 Teslimat Yöntemi
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        <div
          onClick={() => setSelectedMethod('kargo')}
          style={{
            padding: '20px',
            border: selectedMethod === 'kargo' ? '2px solid #3b82f6' : '2px solid #e5e7eb',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: selectedMethod === 'kargo' ? '#eff6ff' : 'white'
          }}
          onMouseEnter={(e) => {
            if (selectedMethod !== 'kargo') {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.background = '#f8fafc';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedMethod !== 'kargo') {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              fontSize: '24px'
            }}>
              📦
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0
            }}>
              Kargo ile Teslimat
            </h3>
          </div>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Ürününüzü adresinize kargo ile gönderiyoruz. Güvenli paketleme ve takip numarası ile.
          </p>
        </div>
        
        <div
          onClick={() => setSelectedMethod('evden')}
          style={{
            padding: '20px',
            border: selectedMethod === 'evden' ? '2px solid #3b82f6' : '2px solid #e5e7eb',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: selectedMethod === 'evden' ? '#eff6ff' : 'white'
          }}
          onMouseEnter={(e) => {
            if (selectedMethod !== 'evden') {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.background = '#f8fafc';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedMethod !== 'evden') {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'white';
            }
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              fontSize: '24px'
            }}>
              🏠
            </div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0
            }}>
              Evden Teslim
            </h3>
          </div>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Ürününüzü evinizden teslim alıyoruz. Randevu sistemi ile uygun zamanınızda.
          </p>
        </div>
      </div>
    </div>
  );
}
