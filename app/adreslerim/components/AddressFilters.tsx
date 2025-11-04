"use client";
import React from 'react';

interface AddressFiltersProps {
  isMobile: boolean;
  filterCity: string;
  filterDefault: string;
  onCityChange: (city: string) => void;
  onDefaultChange: (defaultFilter: string) => void;
  onClearFilters: () => void;
}

export default function AddressFilters({
  isMobile,
  filterCity,
  filterDefault,
  onCityChange,
  onDefaultChange,
  onClearFilters
}: AddressFiltersProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '16px' : '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      marginBottom: '24px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <span style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
          color: '#374151'
        }}>
          Filtreler:
        </span>
        
        {/* Şehir Filtresi */}
        <select
          value={filterCity}
          onChange={(e) => onCityChange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: isMobile ? '14px' : '16px',
            background: 'white',
            cursor: 'pointer',
            minWidth: '120px'
          }}
        >
          <option value="">Tüm Şehirler</option>
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
        
        {/* Varsayılan Filtresi */}
        <select
          value={filterDefault}
          onChange={(e) => onDefaultChange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: isMobile ? '14px' : '16px',
            background: 'white',
            cursor: 'pointer',
            minWidth: '120px'
          }}
        >
          <option value="">Tüm Adresler</option>
          <option value="true">Varsayılan Adresler</option>
          <option value="false">Diğer Adresler</option>
        </select>
        
        {/* Filtreleri Temizle */}
        <button
          onClick={onClearFilters}
          style={{
            background: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: isMobile ? '12px' : '14px',
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
          🔄 Temizle
        </button>
      </div>
    </div>
  );
}
