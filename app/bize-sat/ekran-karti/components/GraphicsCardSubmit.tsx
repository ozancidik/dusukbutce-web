"use client";
import React from 'react';

interface GraphicsCardSubmitProps {
  formData: {
    hasBox: boolean;
    hasInvoice: boolean;
    hasWarranty: boolean;
    warrantyDuration: string;
    invoiceDate: string;
  };
  isMobile: boolean;
  isSubmitting: boolean;
  handleInputChange: (field: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function GraphicsCardSubmit({ formData, isMobile, isSubmitting, handleInputChange, handleSubmit }: GraphicsCardSubmitProps) {
  return (
    <div>
      {/* Ek Bilgiler */}
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
          📦 Ek Bilgiler
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          {/* Kutusu Var mı */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            backgroundColor: formData.hasBox ? '#f0f9ff' : 'white'
          }}>
            <input
              type="checkbox"
              id="hasBox"
              checked={formData.hasBox}
              onChange={(e) => handleInputChange('hasBox', e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />
            <label
              htmlFor="hasBox"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Orijinal kutusu var
            </label>
          </div>

          {/* Faturası Var mı */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            backgroundColor: formData.hasInvoice ? '#f0f9ff' : 'white'
          }}>
            <input
              type="checkbox"
              id="hasInvoice"
              checked={formData.hasInvoice}
              onChange={(e) => handleInputChange('hasInvoice', e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />
            <label
              htmlFor="hasInvoice"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Faturası var
            </label>
          </div>

          {/* Garantisi Var mı */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            backgroundColor: formData.hasWarranty ? '#f0f9ff' : 'white'
          }}>
            <input
              type="checkbox"
              id="hasWarranty"
              checked={formData.hasWarranty}
              onChange={(e) => handleInputChange('hasWarranty', e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                cursor: 'pointer'
              }}
            />
            <label
              htmlFor="hasWarranty"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Garantisi var
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
                onChange={(e) => handleInputChange('warrantyDuration', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Garanti süresi seçin</option>
                <option value="6 ay">6 ay</option>
                <option value="1 yıl">1 yıl</option>
                <option value="2 yıl">2 yıl</option>
                <option value="3 yıl">3 yıl</option>
                <option value="5 yıl">5 yıl</option>
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
                onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Gönder Butonu */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
          style={{
            background: isSubmitting 
              ? '#9ca3af' 
              : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '16px 32px' : '20px 40px',
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isSubmitting 
              ? 'none' 
              : '0 4px 12px rgba(59, 130, 246, 0.3)',
            transform: isSubmitting ? 'none' : 'translateY(0)',
            minWidth: '200px'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }
          }}
        >
          {isSubmitting ? (
            <>
              <span style={{ marginRight: '8px' }}>⏳</span>
              Gönderiliyor...
            </>
          ) : (
            <>
              <span style={{ marginRight: '8px' }}>🚀</span>
              Teklif Al
            </>
          )}
        </button>
      </div>
    </div>
  );
}
