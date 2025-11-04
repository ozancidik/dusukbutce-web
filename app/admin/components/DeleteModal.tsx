"use client";
import React from 'react';

interface DeleteModalProps {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isMobile: boolean;
  deleteModalType: 'single' | 'all' | null;
  submissionTitle?: string;
}

export default function DeleteModal({ 
  showModal, 
  onClose, 
  onConfirm, 
  isMobile, 
  deleteModalType,
  submissionTitle 
}: DeleteModalProps) {
  if (!showModal) return null;

  const getModalContent = () => {
    if (deleteModalType === 'all') {
      return {
        title: 'Tüm İlanları Sil',
        message: 'Tüm satış taleplerini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
        icon: '🗑️',
        confirmText: 'Evet, Tümünü Sil',
        confirmColor: '#ef4444'
      };
    } else if (deleteModalType === 'single') {
      return {
        title: 'İlanı Sil',
        message: `"${submissionTitle || 'Bu ilan'}" adlı satış talebini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
        icon: '⚠️',
        confirmText: 'Evet, Sil',
        confirmColor: '#ef4444'
      };
    }
    return {
      title: 'Silme Onayı',
      message: 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?',
      icon: '❓',
      confirmText: 'Evet',
      confirmColor: '#ef4444'
    };
  };

  const content = getModalContent();

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
      padding: isMobile ? '20px' : '40px'
    }}
    onClick={onClose}
    >
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '24px' : '32px',
        maxWidth: isMobile ? '100%' : '500px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #e5e7eb'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        {/* İkon ve Başlık */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: isMobile ? '48px' : '64px',
            marginBottom: '16px'
          }}>
            {content.icon}
          </div>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 8px 0'
          }}>
            {content.title}
          </h2>
        </div>

        {/* Uyarı Mesajı */}
        <div style={{
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          border: '1px solid #fecaca',
          borderRadius: '12px',
          padding: isMobile ? '16px' : '20px',
          marginBottom: '24px'
        }}>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#991b1b',
            margin: '0',
            lineHeight: '1.5',
            textAlign: 'center'
          }}>
            {content.message}
          </p>
        </div>

        {/* Butonlar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* İptal Butonu */}
          <button
            onClick={onClose}
            style={{
              background: 'white',
              color: '#6b7280',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: isMobile ? '12px 24px' : '14px 28px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flex: isMobile ? '1' : 'none',
              minWidth: isMobile ? 'auto' : '120px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            İptal
          </button>

          {/* Onay Butonu */}
          <button
            onClick={onConfirm}
            style={{
              background: `linear-gradient(135deg, ${content.confirmColor} 0%, ${content.confirmColor}dd 100%)`,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: isMobile ? '12px 24px' : '14px 28px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flex: isMobile ? '1' : 'none',
              minWidth: isMobile ? 'auto' : '120px',
              boxShadow: `0 4px 12px ${content.confirmColor}40`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = `0 6px 16px ${content.confirmColor}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${content.confirmColor}40`;
            }}
          >
            {content.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}