'use client';
import React, { useState } from 'react';
import { Submission } from '../utils/types';
import { formatDate, formatPrice, getStatusInfo, getStatusText } from '../utils/helpers';

// "Ürün Özellikleri" bölümünde gösterilecek EK alanlar. Marka/model, işlemci,
// ekran kartı, ram, depolama ve durum zaten ayrıca gösteriliyor; burada geri kalan
// (kategoriye özel) alanlardan dolu olanlar otomatik listelenir.
const EXTRA_SPEC_FIELDS: [string, string][] = [
  ['capacity', 'KAPASİTE'],
  ['speed', 'HIZ'],
  ['type', 'TİP'],
  ['latency', 'GECİKME'],
  ['size', 'BOYUT'],
  ['screenSize', 'EKRAN BOYUTU'],
  ['resolution', 'ÇÖZÜNÜRLÜK'],
  ['refreshRate', 'YENİLEME HIZI'],
  ['panelType', 'PANEL'],
  ['responseTime', 'TEPKİ SÜRESİ'],
  ['processorBrand', 'İŞLEMCİ MARKASI'],
  ['graphicsCardWatt', 'EKRAN KARTI WATT'],
  ['ramType', 'RAM TİPİ'],
  ['storageType', 'DEPOLAMA TİPİ'],
  ['storageCapacity', 'DEPOLAMA KAPASİTESİ'],
  ['batteryHealth', 'PİL SAĞLIĞI'],
  ['socket', 'SOKET'],
  ['cache', 'ÖNBELLEK'],
  ['stokFan', 'STOK FAN'],
  ['memory', 'BELLEK'],
  ['memoryType', 'BELLEK TİPİ'],
  ['coreClock', 'ÇEKİRDEK HIZI'],
  ['boostClock', 'BOOST HIZI'],
  ['powerConsumption', 'GÜÇ TÜKETİMİ'],
  ['ports', 'PORTLAR'],
  ['interface', 'ARAYÜZ'],
  ['chipSet', 'CHIPSET'],
  ['connectivity', 'BAĞLANTI'],
  ['switchType', 'SWITCH TİPİ'],
  ['layout', 'DÜZEN'],
  ['dpi', 'DPI'],
  ['power', 'GÜÇ'],
  ['wattValue', 'WATT'],
  ['manufacturingYear', 'ÜRETİM YILI'],
  ['accessories', 'AKSESUARLAR'],
  ['condition', 'KONDİSYON'],
  ['screenStatus', 'EKRAN DURUMU'],
  ['deadPixelCount', 'ÖLÜ PİKSEL'],
  ['quantity', 'ADET'],
  ['warrantyDuration', 'GARANTİ SÜRESİ (AY)'],
  ['invoiceDate', 'FATURA TARİHİ'],
];

interface SubmissionCardFullProps {
  submission: Submission;
  isMobile: boolean;
  onAccept: (submission: Submission) => void;
  onReject: (submission: Submission) => void;
  onDelete: (submission: Submission) => void;
  onReoffer: (submission: Submission) => void;
}

export default function SubmissionCardFull({ 
  submission, 
  isMobile, 
  onAccept, 
  onReject, 
  onDelete,
  onReoffer 
}: SubmissionCardFullProps) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div key={submission._id} style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '20px' : '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <h3 style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 4px 0'
          }}>
            {submission.brand} {submission.model}
          </h3>
          <div style={{ marginBottom: '4px' }}>
            {submission.submissionNumber && (
              <p style={{
                fontSize: isMobile ? '11px' : '13px',
                color: '#6b21a8',
                margin: '0 0 2px 0',
                fontWeight: '500'
              }}>
                🎫 Talep No: {submission.submissionNumber}
              </p>
            )}
            {submission.offerNumber && (
              <p style={{
                fontSize: isMobile ? '11px' : '13px',
                color: '#3b82f6',
                margin: '0 0 2px 0',
                fontWeight: '500'
              }}>
                📋 Teklif No: {submission.offerNumber}
              </p>
            )}
            {submission.orderNumber && (
              <p style={{
                fontSize: isMobile ? '11px' : '13px',
                color: '#10b981',
                margin: '0 0 2px 0',
                fontWeight: '500'
              }}>
                🛒 Sipariş No: {submission.orderNumber}
              </p>
            )}
          </div>
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#6b7280',
            margin: 0
          }}>
            Talep Tarihi: {formatDate(submission.createdAt)}
          </p>
        </div>
        <div style={{
          background: getStatusInfo(submission.status).color,
          color: 'white',
          padding: isMobile ? '6px 12px' : '8px 16px',
          borderRadius: '20px',
          fontSize: isMobile ? '12px' : '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>{getStatusInfo(submission.status).icon}</span>
          <span>{getStatusText(submission.status)}</span>
        </div>
      </div>

      {/* Product Details */}
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '8px',
        padding: isMobile ? '16px' : '20px',
        marginBottom: '16px',
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
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            marginRight: '10px'
          }}>
            💻
          </div>
          <h4 style={{
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#334155',
            margin: 0
          }}>
            Ürün Özellikleri
          </h4>
          <button
            onClick={() => setShowDetails(v => !v)}
            style={{
              marginLeft: 'auto',
              padding: isMobile ? '6px 12px' : '6px 14px',
              fontSize: isMobile ? '12px' : '13px',
              fontWeight: 600,
              color: '#2563eb',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {showDetails ? 'Detayı Gizle ▲' : 'Detay ▼'}
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: isMobile ? '12px' : '16px'
        }}>
          {/* Marka & Model - En Önemli */}
          <div style={{
            background: 'white',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>MARKA & MODEL</span>
            <div style={{ 
              fontSize: isMobile ? '15px' : '16px', 
              fontWeight: '600', 
              color: '#1e293b',
              marginTop: '4px'
            }}>
              {submission.brand} {submission.model}
            </div>
          </div>

          {showDetails && (
          <>
          {/* İşlemci - Kritik */}
          {submission.processor && (
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>İŞLEMCİ</span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '15px', 
                fontWeight: '500', 
                color: '#1e293b',
                marginTop: '4px'
              }}>
                {submission.processor}
              </div>
            </div>
          )}

          {/* Ekran Kartı - Kritik */}
          {submission.graphicsCard && (
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>EKRAN KARTI</span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '15px', 
                fontWeight: '500', 
                color: '#1e293b',
                marginTop: '4px'
              }}>
                {submission.graphicsCard}
              </div>
            </div>
          )}

          {/* RAM - Önemli */}
          {submission.ram && (
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>RAM</span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '15px', 
                fontWeight: '500', 
                color: '#1e293b',
                marginTop: '4px'
              }}>
                {submission.ram}
              </div>
            </div>
          )}

          {/* Depolama - Önemli */}
          {submission.storage && (
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>DEPOLAMA</span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '15px', 
                fontWeight: '500', 
                color: '#1e293b',
                marginTop: '4px'
              }}>
                {submission.storage}
              </div>
            </div>
          )}

          {/* Diğer dolu alanlar (kategoriye göre otomatik) */}
          {EXTRA_SPEC_FIELDS.map(([key, label]) => {
            const value = (submission as any)[key];
            if (value === undefined || value === null || value === '') return null;
            return (
              <div key={key} style={{ background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>{label}</span>
                <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: '500', color: '#1e293b', marginTop: '4px' }}>
                  {String(value)}
                </div>
              </div>
            );
          })}

          {/* Kutu / Fatura / Garanti */}
          {([['hasBox', 'KUTU'], ['hasInvoice', 'FATURA'], ['hasWarranty', 'GARANTİ']] as [string, string][]).map(([key, label]) => {
            const val = (submission as any)[key];
            if (val === undefined || val === null) return null;
            return (
              <div key={key} style={{ background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>{label}</span>
                <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: '500', color: val ? '#16a34a' : '#94a3b8', marginTop: '4px' }}>
                  {val ? 'Var' : 'Yok'}
                </div>
              </div>
            );
          })}
          </>
          )}

          {/* Durum - Kritik */}
          <div style={{
            background: 'white',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>DURUM</span>
            <div style={{ 
              fontSize: isMobile ? '14px' : '15px', 
              fontWeight: '500', 
              color: '#1e293b',
              marginTop: '4px'
            }}>
              {submission.cosmeticCondition}
            </div>
          </div>
        </div>

        {/* Açıklama */}
        {showDetails && (submission as any).description && (
          <div style={{ marginTop: isMobile ? '12px' : '16px', background: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>AÇIKLAMA</span>
            <div style={{ fontSize: isMobile ? '14px' : '15px', color: '#1e293b', marginTop: '4px', whiteSpace: 'pre-wrap' }}>
              {(submission as any).description}
            </div>
          </div>
        )}

        {/* Fotoğraflar */}
        {showDetails && Array.isArray((submission as any).images) && (submission as any).images.length > 0 && (
          <div style={{ marginTop: isMobile ? '12px' : '16px' }}>
            <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>
              FOTOĞRAFLAR ({(submission as any).images.length})
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {(submission as any).images.map((img: string, i: number) => (
                <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                  <img
                    src={img}
                    alt={`Fotoğraf ${i + 1}`}
                    style={{ width: isMobile ? '64px' : '80px', height: isMobile ? '64px' : '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Offer Section */}
      {submission.status === 'offered' && (
        <div style={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          borderRadius: '8px',
          padding: isMobile ? '16px' : '20px',
          marginBottom: '16px',
          border: '1px solid #93c5fd'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              background: '#2563eb',
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
              💰
            </div>
            <div>
              <h4 style={{
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#1e40af',
                margin: 0
              }}>
                💰 Teklifiniz
              </h4>
              <p style={{
                fontSize: isMobile ? '12px' : '14px',
                color: '#1e40af',
                margin: '4px 0 0 0',
                opacity: 0.8
              }}>
                Size özel fiyat teklifimiz
              </p>
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#1e40af', fontWeight: '600' }}>Teklif Tutarı:</span>
              <div style={{ 
                fontSize: isMobile ? '20px' : '24px', 
                fontWeight: '700', 
                color: '#1e40af',
                marginTop: '8px',
                background: 'rgba(255, 255, 255, 0.3)',
                padding: '12px 16px',
                borderRadius: '8px',
                textAlign: 'center',
                border: '2px solid rgba(255, 255, 255, 0.5)'
              }}>
                {submission.offer?.amount ? formatPrice(submission.offer.amount) : 'Belirtilmemiş'}
              </div>
            </div>
            <div>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#1e40af', fontWeight: '600' }}>Teklif Tarihi:</span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                fontWeight: '500', 
                color: '#1e40af',
                marginTop: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 12px',
                borderRadius: '6px'
              }}>
                {formatDate(submission.createdAt)}
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#1e40af', fontWeight: '600' }}>Teklif Notları:</span>
            <div style={{ 
              fontSize: isMobile ? '14px' : '16px', 
              color: '#1e40af',
              marginTop: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '16px',
              borderRadius: '8px',
              lineHeight: '1.6',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              {submission.offer?.notes || 'Not bulunmuyor'}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => submission.status === 'offered' ? onAccept(submission) : null}
              disabled={submission.status !== 'offered'}
              style={{
                background: submission.status === 'offered' 
                  ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                  : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '12px 20px' : '14px 24px',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: submission.status === 'offered' ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: submission.status === 'offered' 
                  ? '0 4px 12px rgba(5, 150, 105, 0.3)'
                  : '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: submission.status === 'offered' ? 1 : 0.6
              }}
              onMouseEnter={(e) => {
                if (submission.status === 'offered') {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (submission.status === 'offered') {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                }
              }}
            >
              ✅ Teklifi Kabul Et
            </button>
            <button
              onClick={() => submission.status === 'offered' ? onReject(submission) : null}
              disabled={submission.status !== 'offered'}
              style={{
                background: submission.status === 'offered' 
                  ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                  : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '12px 20px' : '14px 24px',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: submission.status === 'offered' ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: submission.status === 'offered' 
                  ? '0 4px 12px rgba(220, 38, 38, 0.3)'
                  : '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: submission.status === 'offered' ? 1 : 0.6
              }}
              onMouseEnter={(e) => {
                if (submission.status === 'offered') {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (submission.status === 'offered') {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                }
              }}
            >
              ❌ Teklifi Reddet
            </button>
          </div>
          
          {/* Status Info */}
          {submission.status !== 'offered' && (
            <div style={{
              marginTop: '12px',
              padding: '12px 16px',
              background: submission.status === 'customer_accepted' 
                ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
                : submission.status === 'customer_rejected'
                ? 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
                : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              borderRadius: '8px',
              border: submission.status === 'customer_accepted' 
                ? '1px solid #6ee7b7'
                : submission.status === 'customer_rejected'
                ? '1px solid #fca5a5'
                : '1px solid #d1d5db',
              textAlign: 'center'
            }}>
              <p style={{
                margin: 0,
                fontSize: isMobile ? '14px' : '16px',
                color: submission.status === 'customer_accepted' 
                  ? '#047857'
                  : submission.status === 'customer_rejected'
                  ? '#b91c1c'
                  : '#6b7280',
                fontWeight: '500'
              }}>
                {submission.status === 'customer_accepted' 
                  ? '✅ Bu teklif zaten kabul edilmiş'
                  : submission.status === 'customer_rejected'
                  ? '❌ Bu teklif zaten reddedilmiş'
                  : '⏳ Bu teklif henüz değerlendirilmedi'}
              </p>
            </div>
          )}
          
          {/* Customer Response Section */}
          {submission.customerResponse && (
            <div style={{
              background: submission.customerResponse.action === 'accepted' 
                ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
                : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
              borderRadius: '8px',
              padding: isMobile ? '16px' : '20px',
              marginTop: '16px',
              border: submission.customerResponse.action === 'accepted' 
                ? '1px solid #6ee7b7'
                : '1px solid #fca5a5'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{
                  background: submission.customerResponse.action === 'accepted' ? '#059669' : '#dc2626',
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
                  {submission.customerResponse.action === 'accepted' ? '✅' : '❌'}
                </div>
                <h4 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                  margin: 0
                }}>
                  {submission.customerResponse.action === 'accepted' ? 'Teklif Kabul Edildi' : 'Teklif Reddedildi'}
                </h4>
              </div>
              
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                color: submission.customerResponse.action === 'accepted' ? '#047857' : '#b91c1c',
                marginBottom: '8px'
              }}>
                <strong>Tarih:</strong> {formatDate(submission.customerResponse.date)}
              </div>
              
              {submission.customerResponse.note && (
                <div style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: submission.customerResponse.action === 'accepted' ? '#047857' : '#b91c1c',
                  marginBottom: '8px'
                }}>
                  <strong>Not:</strong> {submission.customerResponse.note}
                </div>
              )}
              
              {submission.customerResponse.reason && (
                <div style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: submission.customerResponse.action === 'accepted' ? '#047857' : '#b91c1c'
                }}>
                  <strong>Sebep:</strong> {submission.customerResponse.reason}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Listing Section */}
      {submission.listing && (
        <div style={{
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          borderRadius: '8px',
          padding: isMobile ? '16px' : '20px',
          marginBottom: '16px',
          border: '1px solid #6ee7b7'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              background: '#059669',
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
              📋
            </div>
            <h4 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#065f46',
              margin: 0
            }}>
              İlan Detayları
            </h4>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#065f46' }}>İlan Başlığı:</span>
              <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '500', color: '#065f46' }}>
                {submission.listing.title}
              </div>
            </div>
            <div>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#065f46' }}>İlan Fiyatı:</span>
              <div style={{ 
                fontSize: isMobile ? '18px' : '20px', 
                fontWeight: '700', 
                color: '#065f46',
                marginTop: '4px'
              }}>
                {formatPrice(submission.listing.price)}
              </div>
            </div>
          </div>
          {submission.listing.description && (
            <div style={{ marginTop: '12px' }}>
              <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#065f46' }}>Açıklama:</span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#065f46',
                marginTop: '4px'
              }}>
                {submission.listing.description}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rejection Section */}
      {submission.rejectionReason && (
        <div style={{
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          borderRadius: '8px',
          padding: isMobile ? '16px' : '20px',
          marginBottom: '16px',
          border: '1px solid #fca5a5'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              background: '#dc2626',
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
              ❌
            </div>
            <h4 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#991b1b',
              margin: 0
            }}>
              Reddetme Sebebi
            </h4>
          </div>
          <div style={{ 
            fontSize: isMobile ? '14px' : '16px', 
            color: '#991b1b',
            marginBottom: '16px'
          }}>
            {submission.rejectionReason}
          </div>
          
          {/* Action Buttons for Rejected Submissions */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => onDelete(submission)}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '10px 20px' : '12px 24px',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
              }}
            >
              🗑️ Teklifi Sil
            </button>
            <button
              onClick={() => onReoffer(submission)}
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '10px 20px' : '12px 24px',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
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
              🔄 Yeniden Teklif Al
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

