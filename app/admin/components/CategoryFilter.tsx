"use client";
import React from 'react';

interface CategoryFilterProps {
  isMobile: boolean;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  submissionCount: number;
}

export default function CategoryFilter({ 
  isMobile, 
  selectedCategory, 
  onCategoryChange, 
  submissionCount 
}: CategoryFilterProps) {
  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'notebook', label: 'Dizüstü Bilgisayar' },
    { value: 'desktop', label: 'Masaüstü Bilgisayar' },
    { value: 'monitor', label: 'Monitör' },
    { value: 'graphics-card', label: 'Ekran Kartı' },
    { value: 'processor', label: 'İşlemci' },
    { value: 'ram', label: 'RAM' },
    { value: 'ssd', label: 'SSD' },
    { value: 'keyboard', label: 'Klavye' },
    { value: 'mouse', label: 'Mouse' },
    { value: 'headphones', label: 'Kulaklık' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'playstation', label: 'PlayStation' },
    { value: 'xbox', label: 'Xbox' },
    { value: 'nintendo', label: 'Nintendo' },
    { value: 'gaming-wheel', label: 'Gaming Direksiyon' },
    { value: 'gamepad', label: 'Gamepad' },
    { value: 'case', label: 'Kasa' },
    { value: 'cooler', label: 'Soğutucu' },
    { value: 'sound-system', label: 'Ses Sistemi' },
    { value: 'audio-system', label: 'Ses Sistemi' }
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: isMobile ? '20px' : '24px',
      marginBottom: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? '16px' : '24px'
      }}>
        {/* Kategori Filtresi */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? '12px' : '16px',
          flex: 1
        }}>
          <label style={{
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151',
            whiteSpace: 'nowrap'
          }}>
            Kategori Filtresi:
          </label>
          
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              background: 'white',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: isMobile ? '10px 12px' : '12px 16px',
              fontSize: isMobile ? '14px' : '16px',
              color: '#374151',
              cursor: 'pointer',
              transition: 'all 0.2s',
              minWidth: isMobile ? '100%' : '200px',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Talep Sayısı */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          padding: isMobile ? '8px 12px' : '10px 16px',
          borderRadius: '8px',
          border: '1px solid #d1d5db'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#6b7280" strokeWidth="2"/>
          </svg>
          <span style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {submissionCount} talep bulundu
          </span>
        </div>
      </div>
    </div>
  );
}