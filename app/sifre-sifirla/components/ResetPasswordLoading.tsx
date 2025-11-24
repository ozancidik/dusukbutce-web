"use client";
import React from 'react';

const ResetPasswordLoading: React.FC = () => {
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
          width: '60px',
          height: '60px',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #2563eb',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
          animation: 'spin 1s linear infinite'
        }} />
        <h2 style={{ color: '#374151', margin: '0 0 16px 0' }}>
          Şifre Sıfırlama Sayfası Yükleniyor...
        </h2>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Lütfen bekleyin, sayfa hazırlanıyor.
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordLoading;













