"use client";
import React from 'react';

interface GraphicsCardConditionProps {
  formData: {
    furmarkResult: string;
    opened: string;
    thermalPadChanged: string;
    miningUsed: string;
    miningDuration: string;
    warrantySticker: string;
    coilWhine: string;
    oxidation: string;
    description: string;
    cosmeticCondition: string;
    hasBox: boolean;
    hasInvoice: boolean;
    hasWarranty: boolean;
    warrantyDuration: string;
    invoiceDate: string;
    quantity: number;
  };
  isMobile: boolean;
  showFurmarkHelp: boolean;
  showCoilWhineHelp: boolean;
  showOxidationHelp: boolean;
  handleInputChange: (field: string, value: any) => void;
  setShowFurmarkHelp: (show: boolean) => void;
  setShowCoilWhineHelp: (show: boolean) => void;
  setShowOxidationHelp: (show: boolean) => void;
}

export default function GraphicsCardCondition({
  formData,
  isMobile,
  showFurmarkHelp,
  showCoilWhineHelp,
  showOxidationHelp,
  handleInputChange,
  setShowFurmarkHelp,
  setShowCoilWhineHelp,
  setShowOxidationHelp
}: GraphicsCardConditionProps) {
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
        📋 Durum Bilgileri
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        {/* Furmark Sonucu */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Furmark Sonucu *
            <span
              style={{
                marginLeft: '4px',
                cursor: 'pointer',
                color: '#3b82f6',
                fontSize: '12px'
              }}
              onClick={() => setShowFurmarkHelp(!showFurmarkHelp)}
            >
              ❓
            </span>
          </label>
          <select
            value={formData.furmarkResult}
            onChange={(e) => handleInputChange('furmarkResult', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Furmark sonucu seçin</option>
            <option value="Mükemmel">Mükemmel (80°C altı)</option>
            <option value="İyi">İyi (80-85°C)</option>
            <option value="Orta">Orta (85-90°C)</option>
            <option value="Kötü">Kötü (90°C üstü)</option>
            <option value="Test Edilmedi">Test Edilmedi</option>
          </select>
        </div>

        {/* Açılmış mı */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Açılmış mı? *
          </label>
          <select
            value={formData.opened}
            onChange={(e) => handleInputChange('opened', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Açılmış mı?</option>
            <option value="Hayır">Hayır, hiç açılmadı</option>
            <option value="Evet">Evet, açıldı</option>
          </select>
        </div>

        {/* Termal Pad Değiştirildi mi */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Termal Pad Değiştirildi mi?
          </label>
          <select
            value={formData.thermalPadChanged}
            onChange={(e) => handleInputChange('thermalPadChanged', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Termal pad değiştirildi mi?</option>
            <option value="Hayır">Hayır</option>
            <option value="Evet">Evet</option>
          </select>
        </div>

        {/* Mining Kullanıldı mı */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Mining Kullanıldı mı? *
          </label>
          <select
            value={formData.miningUsed}
            onChange={(e) => handleInputChange('miningUsed', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Mining kullanıldı mı?</option>
            <option value="Hayır">Hayır</option>
            <option value="Evet">Evet</option>
          </select>
        </div>

        {/* Mining Süresi */}
        {formData.miningUsed === 'Evet' && (
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Mining Süresi *
            </label>
            <select
              value={formData.miningDuration}
              onChange={(e) => handleInputChange('miningDuration', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="">Mining süresi seçin</option>
              <option value="1-6 ay">1-6 ay</option>
              <option value="6-12 ay">6-12 ay</option>
              <option value="1-2 yıl">1-2 yıl</option>
              <option value="2+ yıl">2+ yıl</option>
            </select>
          </div>
        )}

        {/* Garanti Sticker'ı */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Garanti Sticker'ı *
          </label>
          <select
            value={formData.warrantySticker}
            onChange={(e) => handleInputChange('warrantySticker', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Garanti sticker'ı durumu</option>
            <option value="Sağlam">Sağlam</option>
            <option value="Yırtılmış">Yırtılmış</option>
            <option value="Yok">Yok</option>
          </select>
        </div>

        {/* Coil Whine */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Coil Whine *
            <span
              style={{
                marginLeft: '4px',
                cursor: 'pointer',
                color: '#3b82f6',
                fontSize: '12px'
              }}
              onClick={() => setShowCoilWhineHelp(!showCoilWhineHelp)}
            >
              ❓
            </span>
          </label>
          <select
            value={formData.coilWhine}
            onChange={(e) => handleInputChange('coilWhine', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="Yok">Yok</option>
            <option value="Hafif">Hafif</option>
            <option value="Orta">Orta</option>
            <option value="Şiddetli">Şiddetli</option>
          </select>
        </div>

        {/* Oksidasyon */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Oksidasyon *
            <span
              style={{
                marginLeft: '4px',
                cursor: 'pointer',
                color: '#3b82f6',
                fontSize: '12px'
              }}
              onClick={() => setShowOxidationHelp(!showOxidationHelp)}
            >
              ❓
            </span>
          </label>
          <select
            value={formData.oxidation}
            onChange={(e) => handleInputChange('oxidation', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="Yok">Yok</option>
            <option value="Hafif">Hafif</option>
            <option value="Orta">Orta</option>
            <option value="Şiddetli">Şiddetli</option>
          </select>
        </div>

        {/* Kozmetik Durum */}
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
            value={formData.cosmeticCondition}
            onChange={(e) => handleInputChange('cosmeticCondition', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="Mükemmel">Mükemmel</option>
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
            min="1"
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Açıklama */}
      <div style={{ marginTop: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px'
        }}>
          Açıklama
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Ekran kartı hakkında ek bilgiler..."
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Yardım Modal'ları */}
      {showFurmarkHelp && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxWidth: '400px',
          width: '90%'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Furmark Testi</h3>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px', lineHeight: '1.5' }}>
            Furmark, ekran kartının stres testini yapan bir programdır. 
            Test sırasında kartın sıcaklığını ölçerek performansını değerlendirir.
          </p>
          <button
            onClick={() => setShowFurmarkHelp(false)}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Anladım
          </button>
        </div>
      )}

      {showCoilWhineHelp && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxWidth: '400px',
          width: '90%'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Coil Whine</h3>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px', lineHeight: '1.5' }}>
            Coil whine, ekran kartındaki bobinlerin titreşiminden kaynaklanan 
            yüksek frekanslı ses çıkışıdır. Genellikle yüksek yük altında duyulur.
          </p>
          <button
            onClick={() => setShowCoilWhineHelp(false)}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Anladım
          </button>
        </div>
      )}

      {showOxidationHelp && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxWidth: '400px',
          width: '90%'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Oksidasyon</h3>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px', lineHeight: '1.5' }}>
            Oksidasyon, metal yüzeylerin oksijenle temas etmesi sonucu 
            oluşan korozyondur. Ekran kartında yeşilimsi lekeler olarak görülür.
          </p>
          <button
            onClick={() => setShowOxidationHelp(false)}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Anladım
          </button>
        </div>
      )}
    </div>
  );
}
