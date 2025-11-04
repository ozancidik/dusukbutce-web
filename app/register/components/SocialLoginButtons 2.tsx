"use client";
import React from 'react';

interface SocialLoginButtonsProps {
  isMobile: boolean;
}

export default function SocialLoginButtons({ isMobile }: SocialLoginButtonsProps) {
  return (
    <div style={{
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        <span style={{
          fontSize: '14px',
          color: '#6b7280',
          background: 'white',
          padding: '0 12px'
        }}>
          veya
        </span>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Google */}
        <button
          type="button"
          style={{
            width: '100%',
            background: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f9fafb';
            e.currentTarget.style.borderColor = '#9ca3af';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
        >
          <span style={{ fontSize: '18px' }}>🔍</span>
          Google ile Devam Et
        </button>
        
        {/* Facebook */}
        <button
          type="button"
          style={{
            width: '100%',
            background: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f9fafb';
            e.currentTarget.style.borderColor = '#9ca3af';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
        >
          <span style={{ fontSize: '18px' }}>📘</span>
          Facebook ile Devam Et
        </button>
        
        {/* Apple */}
        <button
          type="button"
          style={{
            width: '100%',
            background: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f9fafb';
            e.currentTarget.style.borderColor = '#9ca3af';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
        >
          <span style={{ fontSize: '18px' }}>🍎</span>
          Apple ile Devam Et
        </button>
      </div>
    </div>
  );
}
