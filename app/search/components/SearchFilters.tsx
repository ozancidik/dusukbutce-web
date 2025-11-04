"use client";
import React from 'react';

interface SearchFiltersProps {
  isMobile: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
}

export default function SearchFilters({ 
  isMobile, 
  selectedCategory, 
  setSelectedCategory, 
  selectedType, 
  setSelectedType, 
  priceRange, 
  setPriceRange 
}: SearchFiltersProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '20px' : '24px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '24px',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        🔧 Filtreler
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
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
            Kategori
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="">Tüm Kategoriler</option>
            <option value="Telefon">Telefon</option>
            <option value="Laptop">Laptop</option>
            <option value="TV">TV</option>
            <option value="Tablet">Tablet</option>
            <option value="Kulaklık">Kulaklık</option>
            <option value="Klavye">Klavye</option>
            <option value="Mouse">Mouse</option>
            <option value="Monitor">Monitor</option>
            <option value="SSD">SSD</option>
            <option value="RAM">RAM</option>
            <option value="İşlemci">İşlemci</option>
            <option value="Ekran Kartı">Ekran Kartı</option>
            <option value="Kasa">Kasa</option>
            <option value="Soğutucu">Soğutucu</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Gamepad">Gamepad</option>
            <option value="Direksiyon">Direksiyon</option>
            <option value="Ses Sistemi">Ses Sistemi</option>
            <option value="Yazıcı">Yazıcı</option>
            <option value="Fotokopi Makinesi">Fotokopi Makinesi</option>
            <option value="Tarayıcı">Tarayıcı</option>
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
            Tip
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="">Tüm Tipler</option>
            <option value="product">Ürün</option>
            <option value="satilik-ilanlar">Satılık İlan</option>
            <option value="bize-sat">Bize Sat</option>
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
            Fiyat Aralığı
          </label>
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min || ''}
              onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <span style={{
              color: '#6b7280',
              fontSize: '14px'
            }}>
              -
            </span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max || ''}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
