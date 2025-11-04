import React from 'react';
import Link from 'next/link';

const BackButton: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <Link href="/teknik-servis" style={{ textDecoration: 'none' }}>
        <button style={{
          background: 'transparent',
          color: '#6b7280',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f9fafb';
          e.currentTarget.style.borderColor = '#9ca3af';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = '#d1d5db';
        }}>
          ← Teknik Servise Geri Dön
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
