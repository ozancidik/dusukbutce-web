"use client";
import React from 'react';

interface PasswordValidationProps {
  password: string;
  passwordErrors: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    special: boolean;
  };
  isMobile: boolean;
}

export default function PasswordValidation({ password, passwordErrors, isMobile }: PasswordValidationProps) {
  if (!password) return null;

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '16px'
    }}>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 8px 0'
      }}>
        Şifre Gereksinimleri:
      </h4>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '6px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px'
        }}>
          <span style={{ color: passwordErrors.length ? '#10b981' : '#6b7280' }}>
            {passwordErrors.length ? '✅' : '❌'}
          </span>
          <span style={{ color: passwordErrors.length ? '#10b981' : '#6b7280' }}>
            En az 8 karakter
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px'
        }}>
          <span style={{ color: passwordErrors.uppercase ? '#10b981' : '#6b7280' }}>
            {passwordErrors.uppercase ? '✅' : '❌'}
          </span>
          <span style={{ color: passwordErrors.uppercase ? '#10b981' : '#6b7280' }}>
            Büyük harf (A-Z)
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px'
        }}>
          <span style={{ color: passwordErrors.lowercase ? '#10b981' : '#6b7280' }}>
            {passwordErrors.lowercase ? '✅' : '❌'}
          </span>
          <span style={{ color: passwordErrors.lowercase ? '#10b981' : '#6b7280' }}>
            Küçük harf (a-z)
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px'
        }}>
          <span style={{ color: passwordErrors.special ? '#10b981' : '#6b7280' }}>
            {passwordErrors.special ? '✅' : '❌'}
          </span>
          <span style={{ color: passwordErrors.special ? '#10b981' : '#6b7280' }}>
            Özel karakter (!@#$%^&*)
          </span>
        </div>
      </div>
    </div>
  );
}
