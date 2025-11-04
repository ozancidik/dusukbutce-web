"use client";
import React from 'react';

interface TechnicalServiceSubmission {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  district: string;
  serviceType: string;
  deliveryMethod: 'evimden-al' | 'kargo-ile-gonder';
  deviceInfo: string;
  problemDescription: string;
  preferredDate?: string;
  preferredTime?: string;
  shippingMethod?: string;
  notes?: string;
  status: 'pending' | 'contacted' | 'in-progress' | 'completed' | 'cancelled';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface TeknikServisDetailModalProps {
  isMobile: boolean;
  submission: TechnicalServiceSubmission | null;
  onClose: () => void;
}

export default function TeknikServisDetailModal({ isMobile, submission, onClose }: TeknikServisDetailModalProps) {
  if (!submission) return null;

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
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '32px',
        maxWidth: isMobile ? '100%' : '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
          }}>
            🔧 Teknik Servis Detayları
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px',
              borderRadius: '4px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            ✕
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Müşteri Adı
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.name}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Telefon
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.phone}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              E-posta
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.email || 'Belirtilmemiş'}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Servis Tipi
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.serviceType}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Teslimat Yöntemi
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.deliveryMethod === 'evimden-al' ? 'Evden Al' : 'Kargo ile Gönder'}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Durum
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500',
                background: submission.status === 'pending' ? '#fef3c7' : 
                            submission.status === 'contacted' ? '#dbeafe' : 
                            submission.status === 'in-progress' ? '#fef2f2' : 
                            submission.status === 'completed' ? '#dcfce7' : '#f3f4f6',
                color: submission.status === 'pending' ? '#92400e' : 
                       submission.status === 'contacted' ? '#1e40af' : 
                       submission.status === 'in-progress' ? '#dc2626' : 
                       submission.status === 'completed' ? '#166534' : '#374151'
              }}>
                {submission.status === 'pending' ? 'Beklemede' : 
                 submission.status === 'contacted' ? 'İletişim Kuruldu' : 
                 submission.status === 'in-progress' ? 'Devam Ediyor' : 
                 submission.status === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}
              </span>
            </div>
          </div>
          
          <div style={{ gridColumn: isMobile ? 'auto' : 'span 2' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Adres
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.address}, {submission.district}, {submission.city}
            </div>
          </div>
          
          <div style={{ gridColumn: isMobile ? 'auto' : 'span 2' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Cihaz Bilgisi
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.deviceInfo}
            </div>
          </div>
          
          <div style={{ gridColumn: isMobile ? 'auto' : 'span 2' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Problem Açıklaması
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937',
              minHeight: '80px',
              whiteSpace: 'pre-wrap'
            }}>
              {submission.problemDescription}
            </div>
          </div>
          
          {submission.preferredDate && (
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Tercih Edilen Tarih
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#1f2937'
              }}>
                {submission.preferredDate}
              </div>
            </div>
          )}
          
          {submission.preferredTime && (
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Tercih Edilen Saat
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#1f2937'
              }}>
                {submission.preferredTime}
              </div>
            </div>
          )}
          
          {submission.shippingMethod && (
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Kargo Yöntemi
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#1f2937'
              }}>
                {submission.shippingMethod}
              </div>
            </div>
          )}
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Başvuru Tarihi
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {new Date(submission.createdAt).toLocaleDateString('tr-TR')}
            </div>
          </div>
          
          {submission.notes && (
            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Müşteri Notları
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#1f2937',
                minHeight: '60px',
                whiteSpace: 'pre-wrap'
              }}>
                {submission.notes}
              </div>
            </div>
          )}
          
          {submission.adminNotes && (
            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Admin Notları
              </label>
              <div style={{
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#1f2937',
                minHeight: '60px',
                whiteSpace: 'pre-wrap'
              }}>
                {submission.adminNotes}
              </div>
            </div>
          )}
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '24px',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
