"use client";
import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  isMobile: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isMobile }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Image Grid */}
      <div style={{
        background: '#f8fafc',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '16px'
      }}>
        <h4 style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 12px 0'
        }}>
          📸 Gönderilen Fotoğraflar ({images.length} adet)
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '6px',
          maxWidth: '400px',
          height: '132px'
        }}>
          {images.map((image, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(image)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                height: '60px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={image}
                alt={`Fotoğraf ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '1px 4px',
                borderRadius: '3px',
                fontSize: '8px',
                fontWeight: '600'
              }}>
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '200px 20px 100px 20px'
        }}
        onClick={() => setSelectedImage(null)}
        >
          <div style={{
            width: '100vw',
            height: 'calc(100vh - 300px)',
            position: 'relative'
          }}>
            <img
              src={selectedImage}
              alt="Büyük görünüm"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '0'
              }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '50%',
                transform: 'translateX(680%)',
                background: 'rgba(220, 38, 38, 0.9)',
                border: '2px solid white',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                fontSize: '22px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(185, 28, 28, 1)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.9)';
                e.currentTarget.style.color = 'white';
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};
