"use client";
import React from 'react';

interface ListingsHeaderProps {
  isMobile: boolean;
}

const ListingsHeader: React.FC<ListingsHeaderProps> = ({ isMobile }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: isMobile ? '8px' : '12px',
      padding: isMobile ? '12px' : '16px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: isMobile ? '16px' : '20px',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        margin: 0, 
        color: '#2563eb',
        fontSize: isMobile ? '28px' : '44px',
        fontWeight: '700'
      }}>
        Satılık İlanlar
      </h1>
    </div>
  );
};

export default ListingsHeader;











