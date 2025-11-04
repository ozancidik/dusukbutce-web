'use client';
import React from 'react';
import { Submission } from '../../utils/types';

interface ReofferModalProps {
  show: boolean;
  submission: Submission | null;
  reofferNote: string;
  isMobile: boolean;
  onClose: () => void;
  onNoteChange: (note: string) => void;
  onSubmit: () => void;
}

export default function ReofferModal({
  show,
  submission,
  reofferNote,
  isMobile,
  onClose,
  onNoteChange,
  onSubmit
}: ReofferModalProps) {
  if (!show || !submission) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: isMobile ? '24px' : '32px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        border: '1px solid #e5e7eb',
        animation: 'slideInUp 0.3s ease-out'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(220, 38, 38, 0.9)',
            border: '2px solid white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            color: 'white',
            transition: 'all 0.2s',
            zIndex: 1001
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(185, 28, 28, 1)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.9)';
            e.currentTarget.style.color = 'white';
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          paddingTop: '8px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '36px',
            boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
            border: '3px solid #ffffff'
          }}>
            🔄
          </div>
          <h2 style={{
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '700',
            color: '#1e40af',
            margin: '0 0 12px 0'
          }}>
            Yeniden Teklif Al
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#3b82f6',
            margin: '0',
            lineHeight: '1.5'
          }}>
            Bu ürün için yeniden teklif talebinde bulunun
          </p>
        </div>

        {/* Product Info */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#334155',
            margin: '0 0 16px 0',
            textAlign: 'center'
          }}>
            Ürün Bilgileri
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#64748b', fontWeight: '500' }}>Marka & Model:</span>
              <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: '#1e293b' }}>
                {submission.brand} {submission.model}
              </div>
            </div>
            <div>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#64748b', fontWeight: '500' }}>Önceki Durum:</span>
              <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: '#dc2626' }}>
                Reddedildi
              </div>
            </div>
          </div>
        </div>

        {/* Note Input */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            marginBottom: '12px',
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Açıklama/Talep:
          </label>
          <textarea
            value={reofferNote}
            onChange={(e) => onNoteChange(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box',
              minHeight: '120px',
              resize: 'vertical',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit'
            }}
            placeholder="Neden yeniden teklif almak istediğinizi açıklayın..."
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: isMobile ? '14px 24px' : '16px 32px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '120px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            İptal
          </button>
          <button
            onClick={onSubmit}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '14px 24px' : '16px 32px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '120px',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
          >
            🔄 Yeniden Teklif Al
          </button>
        </div>
      </div>
    </div>
  );
}











