"use client";
import React from 'react';

interface DesktopConditionProps {
  isMobile: boolean;
  formData: {
    cosmeticCondition: string;
    quantity: number;
    hasBox: boolean;
    hasInvoice: boolean;
    hasWarranty: boolean;
    warrantyDuration: string;
    invoiceDate: string;
  };
  onInputChange: (field: string, value: string | number | boolean) => void;
}

export default function DesktopCondition({ 
  isMobile, 
  formData, 
  onInputChange 
}: DesktopConditionProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{
        fontSize: isMobile ? '18px' : '20px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📦 Durum Bilgileri
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        {/* Fiziksel Durum */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Fiziksel Durum *
          </label>
          <select
            required
            value={formData.cosmeticCondition}
            onChange={(e) => onInputChange('cosmeticCondition', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              backgroundColor: 'white'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="Mükemmel">Mükemmel</option>
            <option value="Çok İyi">Çok İyi</option>
            <option value="İyi">İyi</option>
            <option value="Orta">Orta</option>
            <option value="Kötü">Kötü</option>
          </select>
        </div>

        {/* Miktar */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Miktar *
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.quantity}
            onChange={(e) => onInputChange('quantity', parseInt(e.target.value) || 1)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        {/* Kutu */}
        <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={formData.hasBox}
              onChange={(e) => onInputChange('hasBox', e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#3b82f6'
              }}
            />
            Orijinal kutusu mevcut
          </label>
        </div>

        {/* Fatura */}
        <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={formData.hasInvoice}
              onChange={(e) => onInputChange('hasInvoice', e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#3b82f6'
              }}
            />
            Faturası mevcut
          </label>
        </div>

        {/* Garanti */}
        <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={formData.hasWarranty}
              onChange={(e) => onInputChange('hasWarranty', e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#3b82f6'
              }}
            />
            Garantisi mevcut
          </label>
        </div>

        {/* Garanti Süresi */}
        {formData.hasWarranty && (
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Garanti Süresi
            </label>
            <select
              value={formData.warrantyDuration}
              onChange={(e) => onInputChange('warrantyDuration', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="">Seçiniz</option>
              <option value="1 yıl">1 yıl</option>
              <option value="2 yıl">2 yıl</option>
              <option value="3 yıl">3 yıl</option>
              <option value="5 yıl">5 yıl</option>
              <option value="Sınırsız">Sınırsız</option>
            </select>
          </div>
        )}

        {/* Fatura Tarihi */}
        {formData.hasInvoice && (
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Fatura Tarihi
            </label>
            <input
              type="date"
              value={formData.invoiceDate}
              onChange={(e) => onInputChange('invoiceDate', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        )}
      </div>
    </div>
  );
}
