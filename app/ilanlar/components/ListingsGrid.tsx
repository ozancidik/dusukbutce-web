"use client";
import React from 'react';
import ListingCard from './ListingCard';

interface ListingsGridProps {
  listings: any[];
  isMobile: boolean;
  formatDate: (dateString: string) => string;
  formatPrice: (amount: number) => string;
}

const ListingsGrid: React.FC<ListingsGridProps> = ({ listings, isMobile, formatDate, formatPrice }) => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))', 
      gap: isMobile ? 16 : 24 
    }}>
      {listings.map((listing) => (
        <ListingCard
          key={listing._id}
          listing={listing}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

export default ListingsGrid;
