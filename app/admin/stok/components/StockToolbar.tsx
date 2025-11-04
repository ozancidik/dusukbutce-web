"use client";
import React from 'react';

interface StockToolbarProps {
  isMobile: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  stockFilter: string;
  setStockFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onBulkUpdate: () => void;
}

export default function StockToolbar({ 
  isMobile, 
  selectedCategory, 
  setSelectedCategory, 
  stockFilter, 
  setStockFilter, 
  searchTerm, 
  setSearchTerm, 
  onBulkUpdate 
}: StockToolbarProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '16px' : '24px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '24px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
        gap: isMobile ? '12px' : '16px',
        alignItems: 'end'
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
            <option value="all">Tüm Kategoriler</option>
            <option value="notebook">Notebook</option>
            <option value="masaustu">Masaüstü</option>
            <option value="cep-telefonu">Cep Telefonu</option>
            <option value="tablet">Tablet</option>
            <option value="monitor">Monitor</option>
            <option value="klavye">Klavye</option>
            <option value="mouse">Mouse</option>
            <option value="kulaklik">Kulaklık</option>
            <option value="ssd">SSD</option>
            <option value="ram">RAM</option>
            <option value="islemci">İşlemci</option>
            <option value="ekran-karti">Ekran Kartı</option>
            <option value="kasa">Kasa</option>
            <option value="sogutucu">Soğutucu</option>
            <option value="playstation">PlayStation</option>
            <option value="xbox">Xbox</option>
            <option value="gamepad">Gamepad</option>
            <option value="direksiyon">Direksiyon</option>
            <option value="gaming-direksiyon">Gaming Direksiyon</option>
            <option value="ses-sistemi">Ses Sistemi</option>
            <option value="yazici">Yazıcı</option>
            <option value="fotokopi-makinesi">Fotokopi Makinesi</option>
            <option value="tarayici">Tarayıcı</option>
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
            Stok Durumu
          </label>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="all">Tümü</option>
            <option value="in-stock">Stokta Var</option>
            <option value="low-stock">Az Stok</option>
            <option value="out-of-stock">Stokta Yok</option>
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
            Arama
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ürün ara..."
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>
        
        <div>
          <button
            onClick={onBulkUpdate}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Toplu Güncelle
          </button>
        </div>
      </div>
    </div>
  );
}
