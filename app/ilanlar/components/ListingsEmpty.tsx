"use client";
import React from 'react';

interface ListingsEmptyProps {
  search: string;
}

const ListingsEmpty: React.FC<ListingsEmptyProps> = ({ search }) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: 40, 
      color: '#64748b' 
    }}>
      {search ? 'Arama kriterlerine uygun ilan bulunamadı' : 'Henüz ilan bulunmuyor'}
    </div>
  );
};

export default ListingsEmpty;













