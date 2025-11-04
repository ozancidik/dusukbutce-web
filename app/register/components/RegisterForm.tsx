"use client";
import React from 'react';

interface RegisterFormProps {
  form: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    cep_telefonu: string;
    dogum_tarihi: string;
  };
  isMobile: boolean;
  showPassword: boolean;
  showPasswordConfirm: boolean;
  passwordMismatch: boolean;
  ageTooYoung: boolean;
  phoneExists: boolean;
  emailExists: boolean;
  onFormChange: (name: string, value: string) => void;
  onTogglePassword: (field: 'password' | 'passwordConfirm') => void;
}

export default function RegisterForm({
  form,
  isMobile,
  showPassword,
  showPasswordConfirm,
  passwordMismatch,
  ageTooYoung,
  phoneExists,
  emailExists,
  onFormChange,
  onTogglePassword
}: RegisterFormProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '16px' : '20px',
      marginBottom: '24px'
    }}>
      {/* Ad */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px'
        }}>
          Ad *
        </label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={(e) => onFormChange('firstName', e.target.value)}
          placeholder="Adınızı girin"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            background: 'white'
          }}
        />
      </div>

      {/* Soyad */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px'
        }}>
          Soyad *
        </label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={(e) => onFormChange('lastName', e.target.value)}
          placeholder="Soyadınızı girin"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            background: 'white'
          }}
        />
      </div>

      {/* E-posta */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px'
        }}>
          E-posta *
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(e) => onFormChange('email', e.target.value)}
          placeholder="ornek@email.com"
          style={{
            width: '100%',
            padding: '12px',
            border: emailExists ? '1px solid #dc2626' : '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            background: 'white'
          }}
        />
        {emailExists && (
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '12px',
            color: '#dc2626'
          }}>
            Bu e-posta adresi zaten kullanılıyor
          </p>
        )}
      </div>

      {/* Telefon */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px'
        }}>
          Cep Telefonu *
        </label>
        <input
          type="tel"
          name="cep_telefonu"
          value={form.cep_telefonu}
          onChange={(e) => onFormChange('cep_telefonu', e.target.value)}
          placeholder="(5xx) xxx xx xx"
          style={{
            width: '100%',
            padding: '12px',
            border: phoneExists ? '1px solid #dc2626' : '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            background: 'white'
          }}
        />
        {phoneExists && (
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '12px',
            color: '#dc2626'
          }}>
            Bu telefon numarası zaten kullanılıyor
          </p>
        )}
      </div>

      {/* Doğum Tarihi - Tam Genişlik */}
      <div style={{
        gridColumn: isMobile ? '1' : '1 / -1'
      }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px'
        }}>
          Doğum Tarihi *
        </label>
        <input
          type="date"
          name="dogum_tarihi"
          value={form.dogum_tarihi}
          onChange={(e) => onFormChange('dogum_tarihi', e.target.value)}
          max="9999-12-31"
          style={{
            width: '100%',
            padding: '12px',
            border: ageTooYoung ? '1px solid #dc2626' : '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            background: 'white'
          }}
        />
        {ageTooYoung && (
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '12px',
            color: '#dc2626'
          }}>
            13 yaşından küçük kullanıcılar kayıt olamaz
          </p>
        )}
      </div>

      {/* Şifre ve Şifre Tekrar - Yan Yana */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '16px' : '20px',
        gridColumn: isMobile ? '1' : '1 / -1'
      }}>
        {/* Şifre */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Şifre *
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={(e) => onFormChange('password', e.target.value)}
              placeholder="En az 8 karakter"
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '12px 40px 12px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white'
              }}
            />
            <button
              type="button"
              onClick={() => onTogglePassword('password')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#6b7280'
              }}
            >
{showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#6b7280" }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#6b7280" }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Şifre Tekrar */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Şifre Tekrar *
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPasswordConfirm ? 'text' : 'password'}
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={(e) => onFormChange('passwordConfirm', e.target.value)}
              placeholder="Şifrenizi tekrar girin"
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '12px 40px 12px 12px',
                border: passwordMismatch ? '1px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white'
              }}
            />
            <button
              type="button"
              onClick={() => onTogglePassword('passwordConfirm')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#6b7280'
              }}
            >
{showPasswordConfirm ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#6b7280" }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#6b7280" }}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </button>
          </div>
          {passwordMismatch && (
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '12px',
              color: '#dc2626'
            }}>
              Şifreler eşleşmiyor
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
