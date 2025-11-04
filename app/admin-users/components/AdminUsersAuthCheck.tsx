"use client";
import React from 'react';

const AdminUsersAuthCheck: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          🔒
        </div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 8px 0'
        }}>
          Yetki Kontrol Ediliyor
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: 0
        }}>
          Lütfen bekleyin...
        </p>
      </div>
    </div>
  );
};

export default AdminUsersAuthCheck;
