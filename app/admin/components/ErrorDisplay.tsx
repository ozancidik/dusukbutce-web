interface ErrorDisplayProps {
  error: string;
  isMobile: boolean;
  onRetry: () => void;
}

export default function ErrorDisplay({ error, isMobile, onRetry }: ErrorDisplayProps) {
  return (
    <div style={{ 
      padding: isMobile ? '20px' : '40px', 
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #4b5563 100%)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '16px'
        }}>
          ❌
        </div>
        <h2 style={{
          fontSize: isMobile ? '20px' : '24px',
          color: '#dc2626',
          margin: '0 0 16px 0'
        }}>
          Veri Yüklenirken Hata Oluştu
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0 0 24px 0',
          lineHeight: '1.5'
        }}>
          {error}
        </p>
        <button 
          onClick={onRetry}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#3b82f6';
          }}
        >
          🔄 Tekrar Dene
        </button>
      </div>
    </div>
  );
}
