"use client";
import React from 'react';

interface ListingsSearchProps {
  isMobile: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const ListingsSearch: React.FC<ListingsSearchProps> = ({ isMobile, search, setSearch }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: isMobile ? '8px' : '12px',
      padding: isMobile ? '16px' : '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: isMobile ? '16px' : '24px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '8px' : '12px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
          width: isMobile ? '32px' : '40px',
          height: isMobile ? '32px' : '40px',
          borderRadius: isMobile ? '8px' : '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '14px' : '18px',
          color: 'white'
        }}>
          🔍
        </div>
        <input
          type="text"
          placeholder={isMobile ? "Ara..." : "Marka, model veya özellik ara..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            flex: 1,
            padding: isMobile ? '10px 12px' : '12px 16px', 
            borderRadius: isMobile ? '6px' : '8px', 
            border: '1px solid #e5e7eb', 
            fontSize: isMobile ? '14px' : '16px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb';
          }}
        />
      </div>
    </div>
  );
};

export default ListingsSearch;

















