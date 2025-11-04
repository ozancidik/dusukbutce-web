import React from 'react';

interface ImageUploadSectionProps {
  images: File[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  openPreview: (image: File) => void;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  images,
  handleImageUpload,
  removeImage,
  openPreview
}) => {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: "#000", fontSize: 20, marginBottom: 16 }}>Görsel Ekle</h3>
      <p style={{ color: "#64748b", marginBottom: 16 }}>En fazla 10 fotoğraf ekleyebilirsiniz</p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        style={{
          display: "inline-block",
          background: "#2563eb",
          color: "white",
          padding: "12px 24px",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 16
        }}
      >
        Fotoğraf Seç
      </label>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 16 }}>
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            onClick={() => document.getElementById('image-upload')?.click()}
            style={{
              width: "100%",
              height: 120,
              border: "2px dashed #cbd5e1",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              background: images[index] ? "white" : "#f8fafc"
            }}
          >
            {images[index] ? (
              <>
                <img
                  src={URL.createObjectURL(images[index])}
                  alt={`Fotoğraf ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 6,
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openPreview(images[index]);
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    cursor: "pointer",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  ×
                </button>
              </>
            ) : (
              <div style={{ fontSize: 32, color: "#cbd5e1" }}>+</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadSection;
