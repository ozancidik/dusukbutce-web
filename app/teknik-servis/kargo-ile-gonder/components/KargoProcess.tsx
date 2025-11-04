import React from 'react';

interface KargoProcessProps {
  isMobile: boolean;
}

const KargoProcess: React.FC<KargoProcessProps> = ({ isMobile }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      marginBottom: '32px',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: isMobile ? '20px' : '24px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 24px 0',
        textAlign: 'center'
      }}>
        Kargo Süreci
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: '16px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '24px',
            color: 'white'
          }}>
            1
          </div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Form Doldur</h4>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Bilgilerinizi girin</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '24px',
            color: 'white'
          }}>
            2
          </div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Kargo Bilgisi</h4>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Kargo detayları gönderilir</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '24px',
            color: 'white'
          }}>
            3
          </div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Onarım</h4>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Cihazınız onarılır</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '24px',
            color: 'white'
          }}>
            4
          </div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Teslimat</h4>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Adresinize teslim</p>
        </div>
      </div>
    </div>
  );
};

export default KargoProcess;
