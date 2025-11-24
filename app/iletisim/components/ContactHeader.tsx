"use client";
import React from 'react';

const ContactHeader: React.FC = () => {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '40px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e5e7eb'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 16px 0'
      }}>
        İletişim
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#6b7280',
        margin: 0,
        lineHeight: '1.6'
      }}>
        Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız
      </p>
    </div>
  );
};

export default ContactHeader;













