interface LoadingSpinnerProps {
  isMobile: boolean;
}

export default function LoadingSpinner({ isMobile }: LoadingSpinnerProps) {
  return (
    <div style={{ 
      padding: isMobile ? '20px' : '40px', 
      textAlign: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #4b5563 100%)'
    }}>
      <h2 style={{
        fontSize: isMobile ? '20px' : '24px',
        color: '#374151'
      }}>
        Yükleniyor...
      </h2>
    </div>
  );
}