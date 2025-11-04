interface ImageModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  isMobile: boolean;
}

export default function ImageModal({ 
  images, 
  currentIndex, 
  onClose, 
  isMobile 
}: ImageModalProps) {
  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    // Bu fonksiyon parent component'ten gelecek
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    // Bu fonksiyon parent component'ten gelecek
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '10px' : '20px'
    }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: isMobile ? '10px' : '20px',
          right: isMobile ? '10px' : '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: isMobile ? '40px' : '50px',
          height: isMobile ? '40px' : '50px',
          fontSize: isMobile ? '18px' : '24px',
          fontWeight: 'bold',
          color: '#333',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        ✕
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          {/* Previous Arrow */}
          <button
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: isMobile ? '10px' : '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: isMobile ? '40px' : '50px',
              height: isMobile ? '40px' : '50px',
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: 'bold',
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ‹
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: isMobile ? '10px' : '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: isMobile ? '40px' : '50px',
              height: isMobile ? '40px' : '50px',
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: 'bold',
              color: '#333',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001,
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Image Container */}
      <div style={{
        position: 'relative',
        maxWidth: isMobile ? '95vw' : '95vw',
        maxHeight: isMobile ? '85vh' : '95vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}>
        <img
          src={currentImage}
          alt={`Ürün resmi ${currentIndex + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            WebkitTransform: 'translateZ(0)'
          }}
          loading="eager"
          decoding="sync"
          onLoad={(e) => {
            // Image yüklendikten sonra kaliteyi optimize et
            e.currentTarget.style.imageRendering = 'auto';
          }}
        />
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '10px' : '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: isMobile ? '8px 12px' : '10px 16px',
          borderRadius: '20px',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '500'
        }}>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}


