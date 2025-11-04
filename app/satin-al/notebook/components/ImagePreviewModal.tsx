import React from 'react';

interface ImagePreviewModalProps {
  previewImage: File | null;
  setPreviewImage: (image: File | null) => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ previewImage, setPreviewImage }) => {
  if (!previewImage) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000
    }}>
      <div style={{
        position: "relative",
        width: "600px",
        height: "600px",
        background: "white",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
      }}>
        <button
          onClick={() => setPreviewImage(null)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 28,
            height: 28,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1
          }}
        >
          ×
        </button>
        <img
          src={URL.createObjectURL(previewImage)}
          alt="Önizleme"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: 8
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreviewModal;
