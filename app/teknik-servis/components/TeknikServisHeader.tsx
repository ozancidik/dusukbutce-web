"use client";
import React from 'react';

interface TeknikServisHeaderProps {
  isMobile: boolean;
}

const TeknikServisHeader: React.FC<TeknikServisHeaderProps> = ({ isMobile }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: isMobile ? '32px 24px' : '48px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      marginBottom: '32px',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: isMobile ? '28px' : '36px',
        fontWeight: '800',
        color: '#1f2937',
        margin: '0 0 20px 0',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Teknik Servis
      </h1>
      <h2 style={{
        fontSize: isMobile ? '18px' : '22px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 16px 0',
        lineHeight: '1.5',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Uzman teknisyenlerimizle güvenilir onarım hizmeti
      </h2>
      <p style={{
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '500',
        color: '#10b981',
        margin: '0 0 24px 0',
        lineHeight: '1.4',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '12px 20px',
        borderRadius: '12px',
        border: '2px solid #bbf7d0',
        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)'
      }}>
        🚚 İstanbul içi aynı gün gelip teslim alalım
      </p>
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          ✓ Uzman Teknisyen
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          ⚡ Hızlı Servis
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          🛡️ Garanti
        </div>
      </div>
    </div>
  );
};

export default TeknikServisHeader;









