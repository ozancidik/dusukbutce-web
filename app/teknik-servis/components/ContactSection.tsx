"use client";
import React from 'react';
import Link from 'next/link';

interface ContactSectionProps {
  isMobile: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ isMobile }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: isMobile ? '20px' : '24px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 16px 0'
      }}>
        Hemen İletişime Geçin
      </h2>
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        margin: '0 0 24px 0'
      }}>
        Teknik servis hizmetlerimiz için hemen bizimle iletişime geçin
      </p>
      <div style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Link href="/iletisim" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
          }}>
            📞 İletişime Geç
          </button>
        </Link>
        <Link href="/bize-sat" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }}>
            🛒 Bize Sat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactSection;









