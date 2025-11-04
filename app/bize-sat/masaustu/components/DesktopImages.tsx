"use client";
import React from 'react';

interface DesktopImagesProps {
  isMobile: boolean;
  images: string[];
  onImageChange: (images: string[]) => void;
  showImageSizeWarning: boolean;
  onCloseImageSizeWarning: () => void;
}

export default function DesktopImages({ 
  isMobile, 
  images, 
  onImageChange,
  showImageSizeWarning,
  onCloseImageSizeWarning
}: DesktopImagesProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const maxSize = 5 * 1024 * 1024; // 5MB
    let hasOversizedImage = false;

    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        hasOversizedImage = true;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        newImages.push(base64String);
        
        if (newImages.length === Array.from(files).filter(f => f.size <= maxSize).length) {
          onImageChange([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (hasOversizedImage) {
      onCloseImageSizeWarning();
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImageChange(newImages);
  };

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
        📸 Resimler
      </h2>
      
      <div style={{
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        padding: '24px',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
        transition: 'border-color 0.2s'
      }}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          style={{
            display: 'block',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#6b7280'
          }}
        >
          <div style={{
            fontSize: '32px',
            marginBottom: '8px'
          }}>
            📷
          </div>
          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
            Resim yüklemek için tıklayın
          </div>
          <div style={{ fontSize: '12px' }}>
            Maksimum 5MB, JPG/PNG formatında
          </div>
        </label>
      </div>

      {images.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '12px',
          marginTop: '16px'
        }}>
          {images.map((image, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={image}
                alt={`Resim ${index + 1}`}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb'
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {showImageSizeWarning && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px' }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '500', color: '#dc2626', fontSize: '14px' }}>
              Resim boyutu çok büyük
            </div>
            <div style={{ color: '#991b1b', fontSize: '12px' }}>
              Lütfen 5MB'dan küçük resimler seçin
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseImageSizeWarning}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#dc2626'
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
