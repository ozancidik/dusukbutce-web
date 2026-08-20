"use client";
import React from 'react';
import { Submission } from '../types';

interface SubmissionCardProps {
  submission: Submission;
  isMobile: boolean;
  onAction: (submission: Submission, action: 'offer' | 'listing' | 'reject' | 'delivery_completed') => void;
  onDelete: (submissionId: string) => void;
  onDetail: (submission: Submission) => void;
  onDeliveryInfo: (submission: Submission) => void;
  onReoffer: (submission: Submission) => void;
  onUserInfo?: (submission: Submission) => void;
  formatDate: (dateString: string) => string;
}

export default function SubmissionCard({ 
  submission, 
  isMobile, 
  onAction, 
  onDelete, 
  onDetail,
  onDeliveryInfo,
  onReoffer,
  onUserInfo,
  formatDate 
}: SubmissionCardProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending': return { text: '⏳ Beklemede', bgColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' };
      case 'offered': return { text: '💰 Teklif Verildi', bgColor: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' };
      case 'listed': return { text: '📋 İlan Oluşturuldu', bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' };
      case 'rejected': return { text: '❌ Reddedildi', bgColor: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' };
      case 'accepted': return { text: '✅ Kabul Edildi', bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' };
      case 'customer_rejected': return { text: '❌ Müşteri Reddetti', bgColor: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' };
      case 'delivery_confirmed': return { text: '🚚 Teslimat Onaylandı', bgColor: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' };
      case 'delivery_completed': return { text: '✅ Teslimat Tamamlandı', bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' };
      default: return { text: status, bgColor: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' };
    }
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'graphics-card': 'Ekran Kartı',
      'notebook': 'Dizüstü Bilgisayar',
      'desktop': 'Masaüstü Bilgisayar',
      'processor': 'İşlemci',
      'monitor': 'Monitör',
      'keyboard': 'Klavye',
      'mouse': 'Fare',
      'headphones': 'Kulaklık',
      'ram': 'RAM',
      'ssd': 'SSD',
      'tablet': 'Tablet',
      'audio-system': 'Ses Sistemi',
      'case': 'Kasa',
      'cooler': 'Soğutucu',
      'gaming-wheel': 'Gaming Direksiyon',
      'sound-system': 'Ses Sistemi'
    };
    return categoryMap[category] || category;
  };

  const statusInfo = getStatusInfo(submission.status);
  const canCreateListing = submission.status === 'delivery_confirmed';

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: isMobile ? '24px' : '32px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)';
    }}
    >
      {/* Status Badge */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: statusInfo.bgColor,
        color: 'white',
        padding: '4px 10px',
        borderRadius: '16px',
        fontSize: isMobile ? '10px' : '11px',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        zIndex: 10
      }}>
        {statusInfo.text}
      </div>

      {/* Başlık ve Tarih */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: isMobile ? '12px' : '16px',
        marginTop: isMobile ? '20px' : '24px',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '8px' : '0'
      }}>
        <div>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 4px 0'
          }}>
            {submission.brand} {submission.model}
          </h3>
          <div style={{ marginBottom: '4px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            {submission.submissionNumber && (
              <span style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#6b21a8',
                background: '#f3e8ff',
                padding: '4px 8px',
                borderRadius: '6px',
                fontWeight: '500'
              }}>
                🎫 {submission.submissionNumber}
              </span>
            )}
            {submission.offerNumber && (
              <span style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#3b82f6',
                background: '#dbeafe',
                padding: '4px 8px',
                borderRadius: '6px',
                fontWeight: '500'
              }}>
                📋 {submission.offerNumber}
              </span>
            )}
            {submission.orderNumber && (
              <span style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#10b981',
                background: '#d1fae5',
                padding: '4px 8px',
                borderRadius: '6px',
                fontWeight: '500'
              }}>
                🛒 {submission.orderNumber}
              </span>
            )}
            <span style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#6b7280',
              background: '#f1f5f9',
              padding: '4px 8px',
              borderRadius: '6px',
              textTransform: 'capitalize'
            }}>
              {getCategoryDisplayName(submission.category)}
            </span>
          </div>
        </div>
        <span style={{
          fontSize: isMobile ? '12px' : '14px',
          color: '#6b7280',
          background: '#f3f4f6',
          padding: isMobile ? '4px 8px' : '6px 12px',
          borderRadius: '6px'
        }}>
          {formatDate(submission.createdAt)}
        </span>
      </div>

      {/* Basit Cihaz Bilgileri */}
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '12px',
        padding: isMobile ? '16px' : '20px',
        marginBottom: isMobile ? '16px' : '20px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: isMobile ? '12px' : '16px'
        }}>
          <div style={{
            background: '#3b82f6',
            color: 'white',
            width: isMobile ? '32px' : '40px',
            height: isMobile ? '32px' : '40px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <span style={{ fontSize: isMobile ? '16px' : '20px' }}>💻</span>
          </div>
          <div>
            <h4 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#1e293b',
              margin: 0
            }}>
              Cihaz Bilgileri
            </h4>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#64748b',
              margin: 0
            }}>
              Ürünün teknik özellikleri ve detayları
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '12px' : '16px'
        }}>
          <div>
            <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
              Marka:
            </strong>
            <span style={{ 
              fontSize: isMobile ? '14px' : '16px', 
              color: '#6b7280',
              marginLeft: '8px'
            }}>
              {submission.brand || 'Belirtilmemiş'}
            </span>
          </div>
          <div>
            <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
              Model:
            </strong>
            <span style={{ 
              fontSize: isMobile ? '14px' : '16px', 
              color: '#6b7280',
              marginLeft: '8px'
            }}>
              {submission.model || 'Belirtilmemiş'}
            </span>
          </div>
          {submission.processor && (
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                İşlemci:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.processor}
              </span>
            </div>
          )}
          {submission.ram && (
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                RAM:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.ram}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Yeniden Teklif Talebi */}
      {submission.adminNotes && submission.adminNotes.includes('YENİDEN TEKLİF TALEBİ:') && (
        <div style={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          padding: '16px',
          borderRadius: '12px',
          border: '2px solid #3b82f6',
          marginTop: '16px',
          marginBottom: '16px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '10px'
          }}>
            <div style={{
              background: '#3b82f6',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              🔄
            </div>
            <div>
              <h5 style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '700',
                color: '#1e40af',
                margin: '0 0 2px 0'
              }}>
                Yeniden Teklif Talebi
              </h5>
              <p style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#1e40af',
                margin: 0,
                opacity: 0.8
              }}>
                Müşteri bu ürün için yeniden teklif talebinde bulundu
              </p>
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <p style={{
              fontSize: isMobile ? '13px' : '14px',
              color: '#1e40af',
              margin: 0,
              lineHeight: '1.5',
              fontStyle: 'italic'
            }}>
              "{submission.adminNotes.replace('YENİDEN TEKLİF TALEBİ: ', '')}"
            </p>
          </div>
        </div>
      )}

      {/* Aksiyon Butonları */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '12px' : '16px',
        marginTop: '20px'
      }}>
        {/* 1. Teklif Ver */}
        <button
          onClick={() => onAction(submission, 'offer')}
          disabled={submission.status !== 'pending'}
          style={{
            background: submission.status === 'pending'
              ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
              : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '12px 16px' : '14px 20px',
            fontSize: isMobile ? '13px' : '14px',
            cursor: submission.status === 'pending' ? 'pointer' : 'not-allowed',
            fontWeight: '600',
            transition: 'all 0.2s',
            opacity: submission.status === 'pending' ? 1 : 0.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: submission.status === 'pending'
              ? '0 4px 12px rgba(37, 99, 235, 0.3)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          💰 {submission.status === 'offered' ? 'Teklif Verildi' : 'Teklif Ver'}
        </button>
        
        {/* 2. Satılık İlana Ekle (Admin Onayı) */}
        <button
          onClick={() => (canCreateListing ? onAction(submission, 'listing') : null)}
          disabled={!canCreateListing && submission.status !== 'listed'}
          style={{
            background: (canCreateListing || submission.status === 'listed')
              ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
              : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '12px 16px' : '14px 20px',
            fontSize: isMobile ? '13px' : '14px',
            cursor: canCreateListing ? 'pointer' : 'not-allowed',
            fontWeight: '600',
            transition: 'all 0.2s',
            opacity: canCreateListing ? 1 : 0.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: canCreateListing
              ? '0 4px 12px rgba(5, 150, 105, 0.3)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          📋 {submission.status === 'listed' ? '✅ İlanda' : 'Satılık İlana Ekle'}
        </button>

        {/* 4. Teslimat - Sadece customerInfo varsa */}
        {(submission as any).customerInfo && (
          <button
            onClick={() => onDeliveryInfo(submission)}
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '12px 16px' : '14px 20px',
              fontSize: isMobile ? '13px' : '14px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(14, 165, 233, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
            }}
          >
            🚚 Teslimat
          </button>
        )}
        
        {/* 5. Detay */}
        <button
          onClick={() => onDetail(submission)}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '12px 16px' : '14px 20px',
            fontSize: isMobile ? '13px' : '14px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
          }}
        >
          🔍 Detay
        </button>
        
        {/* 6. Reddet */}
        <button
          onClick={() => onAction(submission, 'reject')}
          disabled={submission.status !== 'pending' && submission.status !== 'offered'}
          style={{
            background: (submission.status === 'pending' || submission.status === 'offered')
              ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
              : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '12px 16px' : '14px 20px',
            fontSize: isMobile ? '13px' : '14px',
            cursor: (submission.status === 'pending' || submission.status === 'offered') ? 'pointer' : 'not-allowed',
            fontWeight: '600',
            transition: 'all 0.2s',
            opacity: (submission.status === 'pending' || submission.status === 'offered') ? 1 : 0.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: (submission.status === 'pending' || submission.status === 'offered')
              ? '0 4px 12px rgba(220, 38, 38, 0.3)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          ❌ {submission.status === 'rejected' ? 'Reddedildi' : 'Reddet'}
        </button>

        {/* 7. Yeniden Teklif Al - Sadece reddedilen teklifler için */}
        {submission.status === 'rejected' && (
          <button
            onClick={() => onReoffer(submission)}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '12px 16px' : '14px 20px',
              fontSize: isMobile ? '13px' : '14px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
          >
            🔄 Yeniden Teklif Al
          </button>
        )}
        
        {/* 8. Kullanıcı Bilgileri */}
        {submission.userId && onUserInfo && (
          <button
            onClick={() => onUserInfo(submission)}
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '12px 16px' : '14px 20px',
              fontSize: isMobile ? '13px' : '14px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(124, 58, 237, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
            }}
          >
            👤 Kullanıcı Bilgileri
          </button>
        )}
        
        {/* 9. Sil */}
        <button
          onClick={() => onDelete(submission._id)}
          style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '12px 16px' : '14px 20px',
            fontSize: isMobile ? '13px' : '14px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
          }}
        >
          🗑️ Sil
        </button>
      </div>
    </div>
  );
}