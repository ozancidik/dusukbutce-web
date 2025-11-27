"use client";
import React from 'react';
import FavoriteProductCard from './FavoriteProductCard';

interface FavoriteProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  brand: string;
  image: string;
  isInStock: boolean;
  addedDate: string;
}

interface FavoritesGridProps {
  products: FavoriteProduct[];
  onRemove: (productId: number) => void;
  formatDate: (dateString: string) => string;
  getDiscountPercentage: (originalPrice: number, currentPrice: number) => number;
}

const FavoritesGrid: React.FC<FavoritesGridProps> = ({
  products,
  onRemove,
  formatDate,
  getDiscountPercentage
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    }}>
      {products.map((product) => (
        <FavoriteProductCard
          key={product.id}
          product={product}
          onRemove={onRemove}
          formatDate={formatDate}
          getDiscountPercentage={getDiscountPercentage}
        />
      ))}
    </div>
  );
};

export default FavoritesGrid;

















