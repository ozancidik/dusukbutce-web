import { ToastType } from '../types/Submission';

interface ToastProps {
  isMobile: boolean;
  show: boolean;
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ isMobile, show, message, type, onClose }: ToastProps) {
  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: isMobile ? '20px' : '40px',
      right: isMobile ? '20px' : '40px',
      background: type === 'success' 
        ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
        : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
      color: 'white',
      padding: isMobile ? '16px 20px' : '20px 24px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)',
      zIndex: 10000,
      maxWidth: isMobile ? 'calc(100vw - 40px)' : '400px',
      transform: 'translateX(0)',
      animation: 'slideInRight 0.3s ease-out',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        {type === 'success' ? '✓' : '✕'}
      </div>
      <div>
        <div style={{
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
          marginBottom: '2px'
        }}>
          {type === 'success' ? 'Başarılı!' : 'Hata!'}
        </div>
        <div style={{
          fontSize: isMobile ? '13px' : '14px',
          opacity: 0.9,
          lineHeight: '1.4'
        }}>
          {message}
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          marginLeft: 'auto'
        }}
      >
        ✕
      </button>
    </div>
  );
}
