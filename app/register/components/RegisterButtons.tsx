"use client";
import React from 'react';
import Link from 'next/link';

interface RegisterButtonsProps {
  isMobile: boolean;
  isLoading: boolean;
  isFormValid: boolean;
  acceptNewsletter: boolean;
  onNewsletterChange: (checked: boolean) => void;
  acceptKVKK: boolean;
  onKVKKChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function RegisterButtons({
  isMobile,
  isLoading,
  isFormValid,
  acceptNewsletter,
  onNewsletterChange,
  acceptKVKK,
  onKVKKChange,
  onSubmit
}: RegisterButtonsProps) {
  return (
    <div>
      {/* Newsletter Checkbox */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        padding: '12px',
        background: acceptNewsletter ? '#f0f9ff' : '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px'
      }}>
        <input
          type="checkbox"
          id="newsletter"
          checked={acceptNewsletter}
          onChange={(e) => onNewsletterChange(e.target.checked)}
          style={{
            width: '16px',
            height: '16px',
            cursor: 'pointer'
          }}
        />
        <label
          htmlFor="newsletter"
          style={{
            fontSize: '14px',
            color: '#374151',
            cursor: 'pointer',
            flex: 1
          }}
        >
          E-posta ile kampanya ve duyuruları almak istiyorum
        </label>
      </div>

      {/* KVKK Checkbox */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        marginBottom: '24px',
        padding: '12px',
        background: acceptKVKK ? '#f0fdf4' : '#f9fafb',
        border: acceptKVKK ? '1px solid #86efac' : '1px solid #e5e7eb',
        borderRadius: '8px'
      }}>
        <input
          type="checkbox"
          id="kvkk"
          checked={acceptKVKK}
          onChange={(e) => onKVKKChange(e.target.checked)}
          style={{
            width: '16px',
            height: '16px',
            cursor: 'pointer',
            marginTop: '2px',
            flexShrink: 0
          }}
        />
        <label
          htmlFor="kvkk"
          style={{
            fontSize: '14px',
            color: '#374151',
            cursor: 'pointer',
            flex: 1,
            lineHeight: '1.5'
          }}
        >
          <Link
            href="/gizlilik-politikasi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#3b82f6',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            KVKK Aydınlatma Metni
          </Link>
          {' '}ve{' '}
          <Link
            href="/satis-sozlesmesi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#3b82f6',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Satış Sözleşmesi
          </Link>
          {' '}'ni okudum, anladım ve kabul ediyorum. *
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isLoading || !isFormValid}
        style={{
          width: '100%',
          background: (isLoading || !isFormValid)
            ? '#9ca3af' 
            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: isMobile ? '14px' : '16px',
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '600',
          cursor: (isLoading || !isFormValid) ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: (isLoading || !isFormValid)
            ? 'none' 
            : '0 4px 12px rgba(59, 130, 246, 0.3)',
          transform: (isLoading || !isFormValid) ? 'none' : 'translateY(0)',
          marginBottom: '16px',
          opacity: (!isLoading && !isFormValid) ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (!isLoading && isFormValid) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading && isFormValid) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }
        }}
      >
        {isLoading ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}
      </button>

      {/* Login Link */}
      <div style={{
        textAlign: 'center',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        Zaten hesabınız var mı?{' '}
        <Link
          href="/login"
          style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Giriş yapın
        </Link>
      </div>
    </div>
  );
}
