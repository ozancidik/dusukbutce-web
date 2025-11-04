import React from 'react';

interface PhoneImagesProps {
  isMobile: boolean;
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
}

export default function PhoneImages({ isMobile, images, onImageUpload, onImageRemove }: PhoneImagesProps) {
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
        📸 Ürün Görselleri
      </h2>
      <div style={{
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        marginBottom: '20px'
      }}
      onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#3b82f6'; }}
      onDragLeave={(e) => { e.currentTarget.style.borderColor = '#d1d5db'; }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.style.borderColor = '#d1d5db';
        const dataTransfer = new DataTransfer();
        Array.from(e.dataTransfer.files).forEach(file => dataTransfer.items.add(file));
        onImageUpload({ target: { files: dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
      }}
      onClick={() => document.getElementById('imageUpload')?.click()}
      >
        <input
          type="file"
          id="imageUpload"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          style={{ display: 'none' }}
        />
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '0 0 8px 0'
        }}>
          Resimleri buraya sürükleyin veya tıklayarak seçin
        </p>
        <p style={{
          fontSize: '12px',
          color: '#9ca3af'
        }}>
          Maksimum 5 resim, her biri 5MB
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '12px'
      }}>
        {images.map((image, index) => (
          <div key={index} style={{
            position: 'relative',
            width: '100%',
            paddingTop: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              src={image}
              alt={`Ürün Görseli ${index + 1}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onImageRemove(index); }}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
