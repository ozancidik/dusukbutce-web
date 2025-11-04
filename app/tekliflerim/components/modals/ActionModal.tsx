'use client';
import React from 'react';
import { Submission } from '../../utils/types';
import { formatPrice } from '../../utils/helpers';

interface ActionModalProps {
  show: boolean;
  submission: Submission | null;
  actionType: 'accept' | 'reject' | 'delete' | null;
  actionNote: string;
  isMobile: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onNoteChange: (note: string) => void;
}

export default function ActionModal({
  show,
  submission,
  actionType,
  actionNote,
  isMobile,
  onClose,
  onSubmit,
  onNoteChange
}: ActionModalProps) {
  if (!show || !submission || !actionType) return null;

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
        borderRadius: '16px',
        padding: isMobile ? '24px' : '32px',
        width: '100%',
        maxWidth: isMobile ? '100%' : '550px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15)',
        animation: 'slideInUp 0.3s ease-out',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#6b7280',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#e5e7eb';
            e.currentTarget.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.color = '#6b7280';
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          paddingTop: '8px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: actionType === 'accept' 
              ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
              : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '28px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
          }}>
            {actionType === 'accept' ? '✅' : '❌'}
          </div>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 8px 0'
          }}>
            {actionType === 'accept' ? 'Teklifi Kabul Et' : 'Teklifi Reddet'}
          </h2>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.5'
          }}>
            {actionType === 'accept' 
              ? 'Bu teklifi kabul etmek istediğinizden emin misiniz?' 
              : 'Bu teklifi reddetmek istediğinizden emin misiniz?'}
          </p>
        </div>

        {/* Product Info */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              background: '#64748b',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              marginRight: '12px'
            }}>
              💻
            </div>
            <h3 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#334155',
              margin: 0
            }}>
              Ürün Bilgileri
            </h3>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#64748b', fontWeight: '500' }}>Marka & Model:</span>
              <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: '#1e293b' }}>
                {submission.brand} {submission.model}
              </div>
            </div>
            <div>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#64748b', fontWeight: '500' }}>Teklif Tutarı:</span>
              <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: '#1e293b' }}>
                {submission.offer?.amount ? formatPrice(submission.offer.amount) : 'Belirtilmemiş'}
              </div>
            </div>
          </div>
        </div>

        {/* Note Input */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            marginBottom: '12px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            {actionType === 'accept' ? 'Kabul Notu (Opsiyonel):' : 'Reddetme Sebebi:'}
          </label>
          <textarea
            value={actionNote}
            onChange={(e) => onNoteChange(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box',
              minHeight: '100px',
              resize: 'vertical',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit'
            }}
            placeholder={actionType === 'accept' 
              ? 'Kabul notunuzu yazabilirsiniz (opsiyonel)...' 
              : 'Reddetme sebebinizi yazın...'}
            onFocus={(e) => {
              e.target.style.borderColor = actionType === 'accept' ? '#10b981' : '#ef4444';
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
              background: actionType === 'accept' 
                ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '14px 24px' : '16px 32px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: actionType === 'accept' 
                ? '0 4px 12px rgba(5, 150, 105, 0.3)'
                : '0 4px 12px rgba(220, 38, 38, 0.3)',
              minWidth: '120px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = actionType === 'accept' 
                ? '0 6px 20px rgba(5, 150, 105, 0.4)'
                : '0 6px 20px rgba(220, 38, 38, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = actionType === 'accept' 
                ? '0 4px 12px rgba(5, 150, 105, 0.3)'
                : '0 4px 12px rgba(220, 38, 38, 0.3)';
            }}
          >
            {actionType === 'accept' ? '✅ Kabul Et' : '❌ Reddet'}
          </button>
        </div>
      </div>
    </div>
  );
}

