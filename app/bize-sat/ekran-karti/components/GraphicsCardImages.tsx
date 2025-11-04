"use client";
import React from 'react';

interface GraphicsCardImagesProps {
  formData: {
    images: string[];
  };
  isMobile: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export default function GraphicsCardImages({ formData, isMobile, handleImageUpload, removeImage }: GraphicsCardImagesProps) {
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
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <input
          type="file"
          id="imageUpload"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <label
          htmlFor="imageUpload"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#3b82f6';
          }}
        >
          📷 Fotoğraf Ekle
        </label>
        <p style={{
          margin: '8px 0 0 0',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          Maksimum 5 fotoğraf yükleyebilirsiniz
        </p>
      </div>

      {/* Yüklenen Fotoğraflar */}
      {formData.images.length > 0 && (
        <div style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '12px'
        }}>
          {formData.images.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb'
              }}
            >
              <img
                src={image}
                alt={`Ekran kartı ${index + 1}`}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: 'rgba(220, 38, 38, 0.8)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(220, 38, 38, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(220, 38, 38, 0.8)';
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
