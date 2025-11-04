"use client";
import React from 'react';

interface AdminProductsFiltersProps {
  isMobile: boolean;
  selectedCategory: string;
  searchTerm: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (term: string) => void;
}

export default function AdminProductsFilters({
  isMobile,
  selectedCategory,
  searchTerm,
  onCategoryChange,
  onSearchChange
}: AdminProductsFiltersProps) {
  return (
    <div style={{
      maxWidth: isMobile ? '100%' : '1400px',
      margin: '0 auto 24px auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: isMobile ? '16px' : '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
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
            Kategori:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: isMobile ? '14px' : '16px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="notebook">Dizüstü Bilgisayar</option>
            <option value="desktop">Masaüstü Bilgisayar</option>
            <option value="graphics-card">Ekran Kartı</option>
            <option value="processor">İşlemci</option>
            <option value="monitor">Monitör</option>
            <option value="keyboard">Klavye</option>
            <option value="mouse">Fare</option>
            <option value="headphones">Kulaklık</option>
            <option value="ram">RAM</option>
            <option value="ssd">SSD</option>
            <option value="tablet">Tablet</option>
            <option value="audio-system">Ses Sistemi</option>
            <option value="case">Kasa</option>
            <option value="cooler">Soğutucu</option>
            <option value="gaming-wheel">Gaming Direksiyon</option>
            <option value="printer">Yazıcı</option>
            <option value="scanner">Tarayıcı</option>
            <option value="copier">Fotokopi Makinesi</option>
            <option value="phone">Cep Telefonu</option>
          </select>
          
          <div style={{
            flex: 1,
            minWidth: '200px',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 40px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: isMobile ? '14px' : '16px',
                background: 'white'
              }}
            />
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '16px',
              color: '#6b7280'
            }}>
              🔍
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
