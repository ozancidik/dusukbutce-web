import React from 'react';

interface PhoneConditionProps {
  isMobile: boolean;
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

export default function PhoneCondition({ isMobile, formData, onInputChange }: PhoneConditionProps) {
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
        ✨ Durum Bilgileri
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Kozmetik Durum *
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
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="Mükemmel">Mükemmel (Sıfır gibi, çizik/hasar yok)</option>
            <option value="Çok İyi">Çok İyi (Çok hafif kullanım izleri)</option>
            <option value="İyi">İyi (Normal kullanım izleri, küçük çizikler)</option>
            <option value="Kabul Edilebilir">Kabul Edilebilir (Belirgin çizikler, küçük ezikler)</option>
            <option value="Hasarlı">Hasarlı (Çalışır durumda ancak büyük kozmetik kusurlar)</option>
          </select>
        </div>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Adet *
          </label>
          <input
            type="number"
            required
            value={formData.quantity}
            onChange={(e) => onInputChange('quantity', parseInt(e.target.value))}
            min="1"
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <input
            type="checkbox"
            id="hasBox"
            checked={formData.hasBox}
            onChange={(e) => onInputChange('hasBox', e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              accentColor: '#3b82f6'
            }}
          />
          <label htmlFor="hasBox" style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151'
          }}>
            Kutusu Var
          </label>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <input
            type="checkbox"
            id="hasInvoice"
            checked={formData.hasInvoice}
            onChange={(e) => onInputChange('hasInvoice', e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              accentColor: '#3b82f6'
            }}
          />
          <label htmlFor="hasInvoice" style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151'
          }}>
            Faturası Var
          </label>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <input
            type="checkbox"
            id="hasWarranty"
            checked={formData.hasWarranty}
            onChange={(e) => onInputChange('hasWarranty', e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              accentColor: '#3b82f6'
            }}
          />
          <label htmlFor="hasWarranty" style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151'
          }}>
            Garantisi Var
          </label>
        </div>
        {formData.hasWarranty && (
          <>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
              }}>
                Garanti Süresi (Ay)
              </label>
              <input
                type="number"
                value={formData.warrantyDuration}
                onChange={(e) => onInputChange('warrantyDuration', parseInt(e.target.value))}
                placeholder="Örn: 12"
                min="0"
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
          </>
        )}
      </div>
    </div>
  );
}
