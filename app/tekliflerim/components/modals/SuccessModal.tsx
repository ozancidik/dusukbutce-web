'use client';
import React from 'react';

interface SuccessModalProps {
  show: boolean;
  isMobile: boolean;
  deliveryMethod: 'kargo' | 'evden' | null;
  currentSubmissionId: string | null;
  onClose: () => void;
  onDeliveryChange: (method: 'kargo' | 'evden') => void;
  onConfirm: () => void;
}

export default function SuccessModal({
  show,
  isMobile,
  deliveryMethod,
  currentSubmissionId,
  onClose,
  onDeliveryChange,
  onConfirm
}: SuccessModalProps) {
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
        borderRadius: '20px',
        padding: isMobile ? '24px' : '32px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        border: '1px solid #e5e7eb'
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
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '36px',
            boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)',
            border: '3px solid #ffffff'
          }}>
            ✅
          </div>
          <h2 style={{
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '700',
            color: '#065f46',
            margin: '0 0 12px 0'
          }}>
            Tebrikler! 🎉
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#047857',
            margin: '0',
            lineHeight: '1.5'
          }}>
            Teklifiniz başarıyla kabul edildi!
          </p>
        </div>

        {/* Delivery Options */}
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid #bbf7d0'
        }}>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#065f46',
            margin: '0 0 16px 0',
            textAlign: 'center'
          }}>
            Teslimat Seçenekleri
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {/* Kargo Option */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              background: deliveryMethod === 'kargo' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
              borderRadius: '12px',
              border: deliveryMethod === 'kargo' ? '2px solid #10b981' : '2px solid #bbf7d0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: deliveryMethod === 'kargo' ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
            }}>
              <input
                type="radio"
                name="delivery"
                value="kargo"
                checked={deliveryMethod === 'kargo'}
                onChange={(e) => onDeliveryChange(e.target.value as 'kargo')}
                style={{
                  marginRight: '12px',
                  width: '18px',
                  height: '18px',
                  accentColor: '#10b981'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  color: '#065f46',
                  marginBottom: '4px'
                }}>
                  📦 Kargo ile göndereceğim
                </div>
                <div style={{
                  fontSize: isMobile ? '14px' : '15px',
                  color: '#047857'
                }}>
                  Ürününüzü kargo ile gönderin, kargo ücreti tarafımızca karşılanır
                </div>
              </div>
            </label>

            {/* Evden Teslim Option */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              background: deliveryMethod === 'evden' ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
              borderRadius: '12px',
              border: deliveryMethod === 'evden' ? '2px solid #10b981' : '2px solid #bbf7d0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: deliveryMethod === 'evden' ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
            }}>
              <input
                type="radio"
                name="delivery"
                value="evden"
                checked={deliveryMethod === 'evden'}
                onChange={(e) => onDeliveryChange(e.target.value as 'evden')}
                style={{
                  marginRight: '12px',
                  width: '18px',
                  height: '18px',
                  accentColor: '#10b981'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  color: '#065f46',
                  marginBottom: '4px'
                }}>
                  🏠 Evimden teslim alınsın
                </div>
                <div style={{
                  fontSize: isMobile ? '14px' : '15px',
                  color: '#047857'
                }}>
                  İstanbul için geçerli - Adresinizden ürünü teslim alırız
                </div>
              </div>
            </label>
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
            Kapat
          </button>
          <button
            onClick={() => {
              if (deliveryMethod) {
                // Teslimat seçimi yapıldı, işlemi tamamla
                onConfirm();
                
                if (deliveryMethod === 'kargo' || deliveryMethod === 'evden') {
                  // Teklif teslimat sayfasına yönlendir
                  window.location.href = `/teklif-teslimat?submissionId=${currentSubmissionId}&status=accepted`;
                }
              } else {
                alert('Lütfen bir teslimat seçeneği seçin');
              }
            }}
            style={{
              background: deliveryMethod ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '14px 24px' : '16px 32px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: deliveryMethod ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              minWidth: '120px',
              boxShadow: deliveryMethod ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (deliveryMethod) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (deliveryMethod) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
              }
            }}
          >
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
}











