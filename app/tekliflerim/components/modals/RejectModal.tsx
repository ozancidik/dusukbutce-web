'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface RejectModalProps {
  show: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export default function RejectModal({ show, isMobile, onClose }: RejectModalProps) {
  const router = useRouter();
  
  if (!show) return null;

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
        maxWidth: '500px',
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
          marginBottom: '32px',
          paddingTop: '8px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '36px',
            boxShadow: '0 8px 16px rgba(239, 68, 68, 0.3)',
            border: '3px solid #ffffff'
          }}>
            ❌
          </div>
          <h2 style={{
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '700',
            color: '#991b1b',
            margin: '0 0 12px 0'
          }}>
            Teklif Reddedildi
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#b91c1c',
            margin: '0',
            lineHeight: '1.5'
          }}>
            Teklifiniz başarıyla reddedildi!
          </p>
        </div>

        {/* Info Message */}
        <div style={{
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid #fecaca'
        }}>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#991b1b',
            margin: '0 0 16px 0',
            textAlign: 'center'
          }}>
            Ne Olacak?
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#dc2626',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#991b1b',
                fontWeight: '500'
              }}>
                Bu teklif artık geçerli değil
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#dc2626',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#991b1b',
                fontWeight: '500'
              }}>
                Yeniden teklif almak için tekrar form doldurabilirsiniz
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#dc2626',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#991b1b',
                fontWeight: '500'
              }}>
                Başka ürünlerinizi de satabilirsiniz
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: 'none',
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
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Tamam
          </button>
          <button
            onClick={() => {
              onClose();
              router.push('/bize-sat');
            }}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '14px 24px' : '16px 32px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: '120px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
          >
            Yeni Ürün Sat
          </button>
        </div>
      </div>
    </div>
  );
}











