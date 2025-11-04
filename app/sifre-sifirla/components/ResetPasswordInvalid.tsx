"use client";
import React from 'react';
import Link from 'next/link';

interface ResetPasswordInvalidProps {
  message: string;
}

const ResetPasswordInvalid: React.FC<ResetPasswordInvalidProps> = ({ message }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: '#ef4444',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          <span style={{ fontSize: '36px', color: 'white' }}>❌</span>
        </div>
        
        <h2 style={{ color: '#dc2626', margin: '0 0 16px 0' }}>
          Geçersiz Bağlantı
        </h2>
        
        <p style={{ color: '#6b7280', margin: '0 0 24px 0', lineHeight: '1.6' }}>
          {message}
        </p>
        
        <Link href="/sifremi-unuttum" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 24px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
          }}
          >
            Yeni Şifre Sıfırlama Talebi
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordInvalid;









