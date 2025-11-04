"use client";
import React from 'react';
import Link from 'next/link';

interface LoginRequiredCardProps {
  isMobile: boolean;
}

export default function LoginRequiredCard({ isMobile }: LoginRequiredCardProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      borderRadius: '12px',
      padding: isMobile ? '12px' : '20px',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.1)',
      marginBottom: '24px',
      border: '1px solid #fecaca',
      textAlign: 'center',
      marginLeft: isMobile ? '0' : '0',
      marginRight: isMobile ? '0' : '0'
    }}>
      <h3 style={{
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '600',
        color: '#dc2626',
        margin: '0 0 8px 0'
      }}>
        Giriş Yapmanız Gerekiyor
      </h3>
      <p style={{
        fontSize: isMobile ? '12px' : '14px',
        color: '#991b1b',
        margin: '0 0 16px 0',
        lineHeight: '1.4'
      }}>
        Ürün satışı için önce giriş yapmanız gerekiyor.
      </p>
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Link href="/login" style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          color: 'white',
          padding: isMobile ? '8px 16px' : '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: '600',
          transition: 'all 0.2s ease',
          display: 'inline-block'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          Giriş Yap
        </Link>
        <Link href="/register" style={{
          background: 'transparent',
          color: '#dc2626',
          padding: isMobile ? '8px 16px' : '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: '600',
          border: '2px solid #dc2626',
          transition: 'all 0.2s ease',
          display: 'inline-block'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#dc2626';
          e.currentTarget.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = '#dc2626';
        }}>
          Hesap Oluştur
        </Link>
      </div>
    </div>
  );
}
