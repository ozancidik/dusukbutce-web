"use client";
import React from 'react';

interface ProfileHeaderProps {
  userInfo: any;
  isMobile: boolean;
  safeDecodeName: (name: string) => string;
}

export default function ProfileHeader({ userInfo, isMobile, safeDecodeName }: ProfileHeaderProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '24px 16px' : '32px',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        width: isMobile ? '80px' : '100px',
        height: isMobile ? '80px' : '100px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        fontSize: isMobile ? '32px' : '40px',
        border: '3px solid rgba(255, 255, 255, 0.3)'
      }}>
        {userInfo?.name ? safeDecodeName(userInfo.name).charAt(0).toUpperCase() : '👤'}
      </div>
      
      <h1 style={{
        margin: '0 0 8px 0',
        fontSize: isMobile ? '20px' : '24px',
        fontWeight: '700'
      }}>
        {userInfo?.name ? safeDecodeName(userInfo.name) : 'Kullanıcı'}
      </h1>
      
      <p style={{
        margin: '0',
        fontSize: isMobile ? '14px' : '16px',
        opacity: 0.9
      }}>
        {userInfo?.email || 'email@example.com'}
      </p>
    </div>
  );
}
