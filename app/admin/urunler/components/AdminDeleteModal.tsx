"use client";
import React from 'react';

interface AdminDeleteModalProps {
  isOpen: boolean;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isMobile: boolean;
}

export default function AdminDeleteModal({
  isOpen,
  productName,
  onConfirm,
  onCancel,
  isMobile
}: AdminDeleteModalProps) {
  if (!isOpen) return null;

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
      padding: isMobile ? '16px' : '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: isMobile ? '24px' : '32px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          ⚠️
        </div>
        
        <h2 style={{
          fontSize: isMobile ? '18px' : '20px',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 12px 0'
        }}>
          Ürünü Sil
        </h2>
        
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          color: '#6b7280',
          margin: '0 0 24px 0',
          lineHeight: '1.5'
        }}>
          <strong>"{productName}"</strong> ürününü silmek istediğinizden emin misiniz?
          <br />
          Bu işlem geri alınamaz.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <button
            onClick={onCancel}
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: isMobile ? '10px 20px' : '12px 24px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
          >
            İptal
          </button>
          
          <button
            onClick={onConfirm}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: isMobile ? '10px 20px' : '12px 24px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#dc2626';
            }}
          >
            🗑️ Sil
          </button>
        </div>
      </div>
    </div>
  );
}
