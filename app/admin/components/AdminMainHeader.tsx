import React from 'react';

interface AdminMainHeaderProps {
  isMobile: boolean;
  filteredSubmissions: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onDeleteAll: () => void;
  isDeletingAll: boolean;
}

export default function AdminMainHeader({
  isMobile,
  filteredSubmissions,
  selectedCategory,
  setSelectedCategory,
  onDeleteAll,
  isDeletingAll
}: AdminMainHeaderProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: isMobile ? '24px' : '32px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '32px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}>
              💻
            </div>
            Admin Paneli
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: isMobile ? '14px' : '16px',
            margin: '0',
            fontWeight: '500'
          }}>
            {filteredSubmissions.length} ilan bulundu
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Kategori Filtresi */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              background: 'white',
              cursor: 'pointer',
              minWidth: '140px',
              outline: 'none',
              transition: 'all 0.2s'
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
            <option value="all">Tüm Kategoriler</option>
            <option value="notebook">Notebook</option>
            <option value="graphics-card">Ekran Kartı</option>
            <option value="processor">İşlemci</option>
            <option value="ram">RAM</option>
            <option value="ssd">SSD</option>
            <option value="monitor">Monitor</option>
            <option value="mouse">Mouse</option>
            <option value="keyboard">Klavye</option>
            <option value="case">Kasa</option>
            <option value="desktop">Masaüstü</option>
            <option value="gaming-wheel">Gaming Direksiyon</option>
            <option value="steering-wheel">Direksiyon</option>
            <option value="xbox">Xbox</option>
            <option value="playstation">PlayStation</option>
            <option value="tablet">Tablet</option>
            <option value="headphones">Kulaklık</option>
            <option value="sound-system">Ses Sistemi</option>
            <option value="audio-system">Ses Sistemi</option>
            <option value="cooler">Soğutucu</option>
          </select>

          {/* Tümünü Sil Butonu */}
          <button
            onClick={onDeleteAll}
            disabled={isDeletingAll || filteredSubmissions.length === 0}
            style={{
              background: filteredSubmissions.length === 0 ? '#f3f4f6' : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              color: filteredSubmissions.length === 0 ? '#9ca3af' : 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: filteredSubmissions.length === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              opacity: filteredSubmissions.length === 0 ? 0.6 : 1,
              boxShadow: filteredSubmissions.length === 0 ? 'none' : '0 4px 12px rgba(220, 38, 38, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (filteredSubmissions.length > 0) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (filteredSubmissions.length > 0) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
              }
            }}
          >
            {isDeletingAll ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Siliniyor...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Tümünü Sil
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
