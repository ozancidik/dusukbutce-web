"use client";
import React from 'react';

interface GraphicsCardBasicInfoProps {
  formData: {
    brand: string;
    chipSet: string;
    model: string;
    memory: string;
    memoryType: string;
    ports: string;
    dviOutput: string;
  };
  isMobile: boolean;
  handleInputChange: (field: string, value: any) => void;
}

export default function GraphicsCardBasicInfo({ formData, isMobile, handleInputChange }: GraphicsCardBasicInfoProps) {
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
        🎮 Temel Bilgiler
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        {/* Marka */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Marka *
          </label>
          <select
            value={formData.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Marka seçin</option>
            <option value="NVIDIA">NVIDIA</option>
            <option value="AMD">AMD</option>
            <option value="Intel">Intel</option>
          </select>
        </div>

        {/* Chipset */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Chipset *
          </label>
          <input
            type="text"
            value={formData.chipSet}
            onChange={(e) => handleInputChange('chipSet', e.target.value)}
            placeholder="Örn: RTX 4080, RX 7800 XT"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Model */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Model *
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            placeholder="Örn: ASUS ROG Strix, MSI Gaming X"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Bellek */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Bellek (GB) *
          </label>
          <select
            value={formData.memory}
            onChange={(e) => handleInputChange('memory', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Bellek seçin</option>
            <option value="2">2 GB</option>
            <option value="4">4 GB</option>
            <option value="6">6 GB</option>
            <option value="8">8 GB</option>
            <option value="12">12 GB</option>
            <option value="16">16 GB</option>
            <option value="24">24 GB</option>
          </select>
        </div>

        {/* Bellek Tipi */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Bellek Tipi *
          </label>
          <select
            value={formData.memoryType}
            onChange={(e) => handleInputChange('memoryType', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">Bellek tipi seçin</option>
            <option value="GDDR6">GDDR6</option>
            <option value="GDDR6X">GDDR6X</option>
            <option value="GDDR5">GDDR5</option>
            <option value="GDDR5X">GDDR5X</option>
            <option value="HBM2">HBM2</option>
            <option value="HBM2E">HBM2E</option>
          </select>
        </div>

        {/* Portlar */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Portlar *
          </label>
          <input
            type="text"
            value={formData.ports}
            onChange={(e) => handleInputChange('ports', e.target.value)}
            placeholder="Örn: 3x DisplayPort, 1x HDMI"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* DVI Çıkışı */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            DVI Çıkışı
          </label>
          <select
            value={formData.dviOutput}
            onChange={(e) => handleInputChange('dviOutput', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="">DVI çıkışı var mı?</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
          </select>
        </div>
      </div>
    </div>
  );
}
