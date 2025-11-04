"use client";
import React from 'react';

interface ProfileDisplayProps {
  userInfo: any;
  isMobile: boolean;
  safeDecodeName: (name: string) => string;
  formatPhoneNumber: (phone: string) => string;
}

export default function ProfileDisplay({ userInfo, isMobile, safeDecodeName, formatPhoneNumber }: ProfileDisplayProps) {
  return (
    <div>
      <h3 style={{ margin: '0 0 24px 0', color: '#1e293b', fontSize: isMobile ? '18px' : '20px' }}>
        Profil Bilgileri
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '12px' : '16px', marginBottom: isMobile ? '12px' : '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
            Ad
          </label>
          <div style={{
            padding: isMobile ? '10px' : '12px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: isMobile ? '14px' : '16px',
            background: '#f9fafb',
            color: '#374151'
          }}>
            {userInfo?.name ? safeDecodeName(userInfo.name).split(' ')[0] : '-'}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
            Soyad
          </label>
          <div style={{
            padding: isMobile ? '10px' : '12px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: isMobile ? '14px' : '16px',
            background: '#f9fafb',
            color: '#374151'
          }}>
            {userInfo?.name ? safeDecodeName(userInfo.name).split(' ').slice(1).join(' ') : '-'}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
        <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
          E-posta
        </label>
        <div style={{
          padding: isMobile ? '10px' : '12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          fontSize: isMobile ? '14px' : '16px',
          background: '#f9fafb',
          color: '#374151'
        }}>
          {userInfo?.email || '-'}
        </div>
      </div>

      <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
        <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
          Telefon
        </label>
        <div style={{
          padding: isMobile ? '10px' : '12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          fontSize: isMobile ? '14px' : '16px',
          background: '#f9fafb',
          color: '#374151'
        }}>
          {userInfo?.phone ? formatPhoneNumber(userInfo.phone) : '-'}
        </div>
      </div>

      <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
        <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
          Doğum Tarihi
        </label>
        <div style={{
          padding: isMobile ? '10px' : '12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          fontSize: isMobile ? '14px' : '16px',
          background: '#f9fafb',
          color: '#374151'
        }}>
          {userInfo?.birthDate ? new Date(userInfo.birthDate).toLocaleDateString('tr-TR') : '-'}
        </div>
      </div>
    </div>
  );
}
