"use client";
import React from 'react';

interface AddressSectionProps {
  isMobile: boolean;
  formData: any;
  handleInputChange: (e: any) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({ isMobile, formData, handleInputChange }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 16px 0',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '8px'
      }}>
        Adres Bilgileri
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: '16px'
      }}>
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Şehir *
            <div style={{
              position: 'relative',
              display: 'inline-block'
            }}>
              <div 
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'help',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const tooltip = document.createElement('div');
                  tooltip.id = 'tooltip-city';
                  tooltip.style.cssText = `
                    position: fixed;
                    background: #1f2937;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    z-index: 9999;
                    pointer-events: none;
                    white-space: nowrap;
                    top: ${e.clientY - 40}px;
                    left: ${e.clientX - 100}px;
                  `;
                  tooltip.textContent = 'Sadece İstanbul içinde hizmet vermekteyiz';
                  document.body.appendChild(tooltip);
                }}
                onMouseLeave={() => {
                  const tooltip = document.getElementById('tooltip-city');
                  if (tooltip) tooltip.remove();
                }}
              >
                ?
              </div>
            </div>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#10b981'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="">Şehir Seçin</option>
            <option value="istanbul">İstanbul</option>
          </select>
        </div>
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            İlçe *
            <div style={{
              position: 'relative',
              display: 'inline-block'
            }}>
              <div 
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'help',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  const tooltip = document.createElement('div');
                  tooltip.id = 'tooltip-district';
                  tooltip.style.cssText = `
                    position: fixed;
                    background: #1f2937;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    z-index: 9999;
                    pointer-events: none;
                    white-space: nowrap;
                    top: ${e.clientY - 40}px;
                    left: ${e.clientX - 120}px;
                  `;
                  tooltip.textContent = 'Bazı ilçeler hizmet kapsamı dışındadır (çok uzak mesafe)';
                  document.body.appendChild(tooltip);
                }}
                onMouseLeave={() => {
                  const tooltip = document.getElementById('tooltip-district');
                  if (tooltip) tooltip.remove();
                }}
              >
                ?
              </div>
            </div>
          </label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#10b981'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            <option value="">İlçe Seçin</option>
            <option value="atasehir">Ataşehir</option>
            <option value="avcilar">Avcılar</option>
            <option value="bagcilar">Bağcılar</option>
            <option value="bahcelievler">Bahçelievler</option>
            <option value="bakirkoy">Bakırköy</option>
            <option value="basaksehir">Başakşehir</option>
            <option value="bayrampasa">Bayrampaşa</option>
            <option value="besiktas">Beşiktaş</option>
            <option value="beykoz">Beykoz</option>
            <option value="beylikduzu">Beylikdüzü</option>
            <option value="beyoglu">Beyoğlu</option>
            <option value="cekmekoy">Çekmeköy</option>
            <option value="esenler">Esenler</option>
            <option value="esenler">Esenyurt</option>
            <option value="fatih">Fatih</option>
            <option value="gaziosmanpasa">Gaziosmanpaşa</option>
            <option value="gungoren">Güngören</option>
            <option value="kadikoy">Kadıköy</option>
            <option value="kagithane">Kağıthane</option>
            <option value="kartal">Kartal</option>
            <option value="kucukcekmece">Küçükçekmece</option>
            <option value="maltepe">Maltepe</option>
            <option value="pendik">Pendik</option>
            <option value="sancaktepe">Sancaktepe</option>
            <option value="sariyer">Sarıyer</option>
            <option value="sultanbeyli">Sultanbeyli</option>
            <option value="sultangazi">Sultangazi</option>
            <option value="tuzla">Tuzla</option>
            <option value="umraniye">Ümraniye</option>
            <option value="uskudar">Üsküdar</option>
            <option value="zeytinburnu">Zeytinburnu</option>
          </select>
        </div>
        <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Detaylı Adres *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              resize: 'vertical'
            }}
            onFocus={(e) => e.target.style.borderColor = '#10b981'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
