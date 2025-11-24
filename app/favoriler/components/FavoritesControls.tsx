"use client";
import React from 'react';

interface FavoritesControlsProps {
  favoritesCount: number;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  onClearAll: () => void;
}

const FavoritesControls: React.FC<FavoritesControlsProps> = ({
  favoritesCount,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  onClearAll
}) => {
  const categories = [
    { id: "all", name: "Tümü", icon: "📋" },
    { id: "gaming-laptop", name: "Gaming Laptop", icon: "💻" },
    { id: "ekran-karti", name: "Ekran Kartı", icon: "🎮" },
    { id: "ssd", name: "SSD", icon: "💾" },
    { id: "gaming-mouse", name: "Gaming Mouse", icon: "🖱️" },
    { id: "monitor", name: "Monitör", icon: "🖥️" }
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      padding: '20px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 8px 0'
        }}>
          ❤️ Favori Ürünler
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0
        }}>
          {favoritesCount} ürün favorilerinizde
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {/* Kategori Filtresi */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none'
          }}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>

        {/* Sıralama */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none'
          }}
        >
          <option value="date">📅 Eklenme Tarihi</option>
          <option value="price">💰 Fiyat (Düşük → Yüksek)</option>
          <option value="price-desc">💰 Fiyat (Yüksek → Düşük)</option>
          <option value="name">📝 İsim (A-Z)</option>
        </select>

        {favoritesCount > 0 && (
          <button
            onClick={onClearAll}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            🗑️ Tümünü Temizle
          </button>
        )}
      </div>
    </div>
  );
};

export default FavoritesControls;













