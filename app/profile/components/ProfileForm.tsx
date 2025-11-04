"use client";
import React from 'react';

interface ProfileFormProps {
  editForm: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
  };
  isMobile: boolean;
  isEmailChanged: boolean;
  emailVerificationCode: string;
  isCodeInvalid: boolean;
  isVerifyingEmail: boolean;
  isSendingCode: boolean;
  isCodeSent: boolean;
  canEditBirthDate: boolean;
  isSocialLogin: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendEmailVerification: () => void;
  handleVerifyEmailCode: () => void;
  message: string;
  messageType: 'success' | 'error';
}

export default function ProfileForm({
  editForm,
  isMobile,
  isEmailChanged,
  emailVerificationCode,
  isCodeInvalid,
  isVerifyingEmail,
  isSendingCode,
  isCodeSent,
  canEditBirthDate,
  isSocialLogin,
  handleChange,
  handleSendEmailVerification,
  handleVerifyEmailCode,
  message,
  messageType
}: ProfileFormProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); }}>
      <h3 style={{ margin: '0 0 24px 0', color: '#1e293b', fontSize: isMobile ? '18px' : '20px' }}>
        Profil Bilgilerini Düzenle
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '12px' : '16px', marginBottom: isMobile ? '12px' : '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
            Ad
          </label>
          <input
            type="text"
            name="firstName"
            value={editForm.firstName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: isMobile ? '14px' : '16px'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
            Soyad
          </label>
          <input
            type="text"
            name="lastName"
            value={editForm.lastName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: isMobile ? '14px' : '16px'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
        <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
          E-posta
        </label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="email"
            name="email"
            value={editForm.email}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: isMobile ? '10px' : '12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: isMobile ? '14px' : '16px'
            }}
          />
          {isEmailChanged && !isCodeSent && (
            <button
              type="button"
              onClick={handleSendEmailVerification}
              disabled={isSendingCode || !editForm.email || editForm.email.trim() === ''}
              style={{
                background: isSendingCode || !editForm.email || editForm.email.trim() === '' ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '10px 16px' : '12px 20px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '500',
                cursor: isSendingCode || !editForm.email || editForm.email.trim() === '' ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {isSendingCode ? 'Gönderiliyor...' : 'Kod Gönder'}
            </button>
          )}
        </div>
      </div>

      <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
        <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
          Telefon
        </label>
        <input
          type="tel"
          name="phone"
          value={editForm.phone}
          onChange={handleChange}
          placeholder="(5xx) xxx xx xx"
          style={{
            width: '100%',
            padding: isMobile ? '10px' : '12px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: isMobile ? '14px' : '16px'
          }}
        />
      </div>

      {canEditBirthDate && (
        <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
          <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
            Doğum Tarihi
          </label>
          <input
            type="date"
            name="birthDate"
            value={editForm.birthDate}
            onChange={handleChange}
            max="9999-12-31"
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: isMobile ? '14px' : '16px'
            }}
          />
        </div>
      )}

      {isEmailChanged && isCodeSent && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ margin: '0 0 12px 0', color: '#92400e', fontSize: '14px' }}>
            E-posta adresinizi değiştirdiniz. Yeni e-posta adresinize gönderilen doğrulama kodunu girin:
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={emailVerificationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                e.target.value = value;
                // Bu değeri parent component'e göndermek için handleChange kullan
                const syntheticEvent = {
                  ...e,
                  target: {
                    ...e.target,
                    name: 'emailVerificationCode',
                    value: value
                  }
                } as React.ChangeEvent<HTMLInputElement>;
                handleChange(syntheticEvent);
              }}
              placeholder="6 haneli kod"
              style={{
                flex: 1,
                minWidth: '150px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: `1px solid ${isCodeInvalid ? '#dc2626' : '#d1d5db'}`,
                fontSize: '14px',
                textAlign: 'center',
                letterSpacing: '2px'
              }}
            />
            <button
              type="button"
              onClick={handleVerifyEmailCode}
              disabled={isVerifyingEmail || !emailVerificationCode || emailVerificationCode.length !== 6}
              style={{
                background: isVerifyingEmail || !emailVerificationCode || emailVerificationCode.length !== 6 ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: isVerifyingEmail || !emailVerificationCode || emailVerificationCode.length !== 6 ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {isVerifyingEmail ? 'Doğrulanıyor...' : 'Doğrula'}
            </button>
            <button
              type="button"
              onClick={handleSendEmailVerification}
              disabled={isSendingCode || isVerifyingEmail}
              style={{
                background: isSendingCode || isVerifyingEmail ? '#9ca3af' : '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: isSendingCode || isVerifyingEmail ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {isSendingCode ? 'Gönderiliyor...' : 'Kodu Yeniden Gönder'}
            </button>
          </div>
          {isCodeInvalid && (
            <p style={{ margin: '8px 0 0 0', color: '#dc2626', fontSize: '12px' }}>
              Geçersiz doğrulama kodu. Lütfen tekrar deneyin.
            </p>
          )}
        </div>
      )}
      
      {isEmailChanged && !isCodeSent && (
        <div style={{
          background: '#fef3c7',
          border: '1px solid #f59e0b',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <p style={{ margin: '0 0 0 0', color: '#92400e', fontSize: '14px' }}>
            E-posta adresinizi değiştirdiniz. Değişikliği onaylamak için yukarıdaki "Kod Gönder" butonuna tıklayın.
          </p>
        </div>
      )}

      {message && (
        <div style={{
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '16px',
          background: messageType === 'success' ? '#dcfce7' : '#fee2e2',
          color: messageType === 'success' ? '#166534' : '#dc2626',
          border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`
        }}>
          {message}
        </div>
      )}
    </form>
  );
}
