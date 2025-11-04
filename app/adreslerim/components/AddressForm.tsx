"use client";
import React from 'react';

interface AddressFormProps {
  formData: {
    title: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    postalCode: string;
    isDefault: boolean;
  };
  isMobile: boolean;
  isSubmitting: boolean;
  isEditing: boolean;
  onFormChange: (name: string, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function AddressForm({
  formData,
  isMobile,
  isSubmitting,
  isEditing,
  onFormChange,
  onSubmit,
  onCancel
}: AddressFormProps) {
  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: '12px',
      padding: isMobile ? '20px' : '24px',
      border: '1px solid #e2e8f0',
      marginBottom: '24px'
    }}>
      <h3 style={{
        fontSize: isMobile ? '18px' : '20px',
        fontWeight: '600',
        color: '#1f2937',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {isEditing ? '✏️ Adresi Düzenle' : '➕ Yeni Adres Ekle'}
      </h3>
      
      <form onSubmit={onSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '16px' : '20px',
          marginBottom: '20px'
        }}>
          {/* Adres Başlığı */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Adres Başlığı *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => onFormChange('title', e.target.value)}
              placeholder="Örn: Ev, İş, Yazlık"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white'
              }}
            />
          </div>

          {/* Ad Soyad */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Ad Soyad *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => onFormChange('fullName', e.target.value)}
              placeholder="Ad Soyad"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white'
              }}
            />
          </div>

          {/* Telefon */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Telefon *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => onFormChange('phone', e.target.value)}
              placeholder="(5xx) xxx xx xx"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white'
              }}
            />
          </div>

          {/* Şehir */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Şehir *
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={(e) => onFormChange('city', e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">Şehir seçin</option>
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
              <option value="Bursa">Bursa</option>
              <option value="Antalya">Antalya</option>
              <option value="Adana">Adana</option>
              <option value="Konya">Konya</option>
              <option value="Gaziantep">Gaziantep</option>
              <option value="Mersin">Mersin</option>
              <option value="Diyarbakır">Diyarbakır</option>
              <option value="Kayseri">Kayseri</option>
              <option value="Eskişehir">Eskişehir</option>
              <option value="Samsun">Samsun</option>
              <option value="Denizli">Denizli</option>
              <option value="Malatya">Malatya</option>
              <option value="Kahramanmaraş">Kahramanmaraş</option>
              <option value="Erzurum">Erzurum</option>
              <option value="Van">Van</option>
              <option value="Batman">Batman</option>
            </select>
          </div>

          {/* İlçe */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              İlçe *
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={(e) => onFormChange('district', e.target.value)}
              placeholder="İlçe"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white'
              }}
            />
          </div>

          {/* Posta Kodu */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Posta Kodu
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={(e) => onFormChange('postalCode', e.target.value)}
              placeholder="34000"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white'
              }}
            />
          </div>
        </div>

        {/* Adres */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Adres *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={(e) => onFormChange('address', e.target.value)}
            placeholder="Mahalle, sokak, bina no, daire no..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              background: 'white',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Varsayılan Adres */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          padding: '12px',
          background: formData.isDefault ? '#f0f9ff' : '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px'
        }}>
          <input
            type="checkbox"
            id="isDefault"
            checked={formData.isDefault}
            onChange={(e) => onFormChange('isDefault', e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              cursor: 'pointer'
            }}
          />
          <label
            htmlFor="isDefault"
            style={{
              fontSize: '14px',
              color: '#374151',
              cursor: 'pointer',
              flex: 1
            }}
          >
            Bu adresi varsayılan adres olarak ayarla
          </label>
        </div>

        {/* Butonlar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: isMobile ? '12px 20px' : '14px 24px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
          >
            İptal
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: isSubmitting 
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: isMobile ? '12px 20px' : '14px 24px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isSubmitting ? (
              <>
                <span style={{ marginRight: '8px' }}>⏳</span>
                {isEditing ? 'Güncelleniyor...' : 'Ekleniyor...'}
              </>
            ) : (
              <>
                <span style={{ marginRight: '8px' }}>💾</span>
                {isEditing ? 'Güncelle' : 'Ekle'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
