"use client";
import React from 'react';

interface XboxImagesProps {
  isMobile: boolean;
  formData: {
    images: string[];
  };
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export default function XboxImages({ isMobile, formData, handleImageUpload, removeImage }: XboxImagesProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{
        fontSize: isMobile ? '18px' : '20px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📸 Fotoğraflar
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(5, 1fr)',
        gridTemplateRows: isMobile ? 'repeat(2, 1fr)' : 'auto',
        gap: isMobile ? '8px' : '12px',
        marginBottom: '16px'
      }}>
        {formData.images?.map((image: string, index: number) => (
          <div key={index} style={{
            position: 'relative',
            aspectRatio: '1',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e5e7eb',
            background: '#f9fafb',
            width: isMobile ? '60px' : 'auto',
            height: isMobile ? '60px' : 'auto',
            minWidth: isMobile ? '60px' : 'auto',
            minHeight: isMobile ? '60px' : 'auto'
          }}>
            <img
              src={image}
              alt={`Fotoğraf ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: 'rgba(220, 38, 38, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: isMobile ? '18px' : '24px',
                height: isMobile ? '18px' : '24px',
                fontSize: isMobile ? '10px' : '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 1)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✕
            </button>
          </div>
        ))}
        
        {Array.from({ length: Math.max(0, 10 - (formData.images?.length || 0)) }).map((_, index) => (
          <div key={`empty-${index}`} style={{
            aspectRatio: '1',
            borderRadius: '8px',
            border: '2px dashed #d1d5db',
            background: '#f9fafb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            width: isMobile ? '60px' : 'auto',
            height: isMobile ? '60px' : 'auto',
            minWidth: isMobile ? '60px' : 'auto',
            minHeight: isMobile ? '60px' : 'auto'
          }}
          onClick={() => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.multiple = true;
            fileInput.onchange = (e) => {
              const target = e.target as HTMLInputElement;
              if (target.files) {
                handleImageUpload({ target } as React.ChangeEvent<HTMLInputElement>);
              }
            };
            fileInput.click();
          }}
          >
            <div style={{
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{
                fontSize: isMobile ? '16px' : '24px',
                marginBottom: '2px'
              }}>
                📷
              </div>
              <div style={{
                fontSize: isMobile ? '8px' : '12px',
                fontWeight: '500'
              }}>
                {isMobile ? 'Ekle' : 'Fotoğraf Ekle'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p style={{
        fontSize: isMobile ? '8px' : '12px',
        color: '#6b7280',
        margin: '8px 0 0 0',
        textAlign: 'center'
      }}>
        Maksimum 10 fotoğraf ekleyebilirsiniz. Her kareye tıklayarak fotoğraf seçebilirsiniz.
      </p>
    </div>
  );
}
