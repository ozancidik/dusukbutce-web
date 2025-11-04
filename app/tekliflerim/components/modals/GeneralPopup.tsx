'use client';
import React from 'react';

interface GeneralPopupProps {
  show: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  isMobile: boolean;
  onClose: () => void;
}

export default function GeneralPopup({
  show,
  type,
  title,
  message,
  isMobile,
  onClose
}: GeneralPopupProps) {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '24px' : '32px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        border: '1px solid #e5e7eb'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(220, 38, 38, 0.9)',
            border: '2px solid white',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            color: 'white',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(185, 28, 28, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.9)';
          }}
        >
          ✕
        </button>

        <div style={{
          textAlign: 'center',
          paddingTop: '8px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: type === 'success' 
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '24px',
            boxShadow: type === 'success' 
              ? '0 8px 16px rgba(16, 185, 129, 0.3)'
              : '0 8px 16px rgba(239, 68, 68, 0.3)'
          }}>
            {type === 'success' ? '✅' : '❌'}
          </div>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '700',
            color: type === 'success' ? '#065f46' : '#991b1b',
            margin: '0 0 8px 0'
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: type === 'success' ? '#047857' : '#b91c1c',
            margin: 0,
            lineHeight: '1.5'
          }}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}











