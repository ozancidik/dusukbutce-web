"use client";
import React from 'react';

interface Listing {
  _id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  condition: string;
  location: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface ListingCardProps {
  listing: Listing;
  isMobile: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, isMobile }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '16px' : '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }}
    >
      {listing.images && listing.images.length > 0 && (
        <div style={{
          width: '100%',
          height: isMobile ? '150px' : '200px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          <img
            src={listing.images[0]}
            alt={listing.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      
      <h3 style={{
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '600',
        color: '#1f2937',
        margin: '0 0 8px 0',
        lineHeight: '1.4'
      }}>
        {listing.title}
      </h3>
      
      <p style={{
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '700',
        color: '#059669',
        margin: '0 0 8px 0'
      }}>
        ₺{listing.price.toLocaleString()}
      </p>
      
      <p style={{
        fontSize: isMobile ? '12px' : '14px',
        color: '#6b7280',
        margin: '0 0 8px 0',
        lineHeight: '1.4',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {listing.description}
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '12px'
      }}>
        <span style={{
          fontSize: isMobile ? '11px' : '12px',
          color: '#6b7280',
          background: '#f3f4f6',
          padding: '4px 8px',
          borderRadius: '6px'
        }}>
          {listing.category}
        </span>
        
        <span style={{
          fontSize: isMobile ? '11px' : '12px',
          color: '#6b7280'
        }}>
          {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
        </span>
      </div>
    </div>
  );
};

export default ListingCard;