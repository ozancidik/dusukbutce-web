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
      <div className="grid-cols-1 md:grid-cols-2" style={{
        display: 'grid',
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
                        <option value="İyi">İyi (Normal kullanım izleri, küçük çizikler)</option>
            <option value="Orta">Orta (Belirgin çizikler, küçük ezikler)</option>
            <option value="Kötü">Kötü (Çalışır durumda ancak büyük kozmetik kusurlar)</option>
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
            Hesap Kilidi (iCloud / Google)
          </label>
          <select
            value={formData.accountLock}
            onChange={(e) => onInputChange('accountLock', e.target.value)}
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
            <option value="">Seçin</option>
            <option value="Kapalı">Kapalı</option>
            <option value="Açık">Açık</option>
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
            Ekran / Parça Değişimi Yapıldı mı?
          </label>
          <select
            value={formData.partReplaced}
            onChange={(e) => onInputChange('partReplaced', e.target.value)}
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
            <option value="">Seçin</option>
            <option value="Hayır">Hayır</option>
            <option value="Evet, orijinal parça">Evet, orijinal parça</option>
            <option value="Evet, yan sanayi parça">Evet, yan sanayi parça</option>
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
            Face ID / Touch ID Çalışıyor mu?
          </label>
          <select
            value={formData.biometricWorking}
            onChange={(e) => onInputChange('biometricWorking', e.target.value)}
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
            <option value="">Seçin</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
            <option value="Cihazda yok">Cihazda yok</option>
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
      </div>
      <div className="grid-cols-1 md:grid-cols-3" style={{
        display: 'grid',
        gap: '16px',
        marginTop: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <input
            type="checkbox"
            checked={formData.hasBox}
            onChange={(e) => onInputChange('hasBox', e.target.checked)}
            style={{
              width: '24px',
              height: '24px'
            }}
          />
          <label style={{
            fontSize: '16px',
            color: '#374151'
          }}>
            Kutusu var
          </label>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <input
            type="checkbox"
            checked={formData.hasInvoice}
            onChange={(e) => onInputChange('hasInvoice', e.target.checked)}
            style={{
              width: '24px',
              height: '24px'
            }}
          />
          <label style={{
            fontSize: '16px',
            color: '#374151'
          }}>
            Faturası var
          </label>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <input
            type="checkbox"
            checked={formData.hasWarranty}
            onChange={(e) => onInputChange('hasWarranty', e.target.checked)}
            style={{
              width: '24px',
              height: '24px'
            }}
          />
          <label style={{
            fontSize: '16px',
            color: '#374151'
          }}>
            Garanti
          </label>
          {formData.hasWarranty && (
            <select
              value={formData.warrantyDuration}
              onChange={(e) => onInputChange('warrantyDuration', e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: isMobile ? '8px' : '12px',
                outline: 'none'
              }}
            >
              <option value="">Süre seçin</option>
              <option value="1 yıl">1 yıl</option>
              <option value="2 yıl">2 yıl</option>
              <option value="3 yıl">3 yıl</option>
              <option value="4 yıl">4 yıl</option>
            </select>
          )}
        </div>
      </div>
      {formData.hasInvoice && (
        <div className="grid-cols-1 md:grid-cols-3" style={{
          display: 'grid',
          gap: '16px',
          marginTop: '16px'
        }}>
          <div></div>
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
          <div></div>
        </div>
      )}
    </div>
  );
}
