"use client";
import React from 'react';
import Link from 'next/link';

const CompareFooter: React.FC = () => {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '40px',
      paddingTop: '20px',
      borderTop: '2px solid #e5e7eb'
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <button style={{
          background: '#6b7280',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}>
          ← Anasayfaya Dön
        </button>
      </Link>
    </div>
  );
};

export default CompareFooter;









