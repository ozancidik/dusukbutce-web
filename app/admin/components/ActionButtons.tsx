import { Submission, ModalType } from '../types/Submission';

interface ActionButtonsProps {
  submission: Submission;
  isMobile: boolean;
  onAction: (submission: Submission, action: ModalType) => void;
  onDelete: (submissionId: string) => void;
}

export default function ActionButtons({ submission, isMobile, onAction, onDelete }: ActionButtonsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: isMobile ? '12px' : '16px',
      flexWrap: 'wrap',
      marginTop: '20px'
    }}>
      <button
        onClick={() => onAction(submission, 'offer')}
        disabled={submission.status !== 'pending'}
        style={{
          background: submission.status === 'pending'
            ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
            : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: isMobile ? '12px 16px' : '14px 20px',
          fontSize: isMobile ? '13px' : '14px',
          cursor: submission.status === 'pending' ? 'pointer' : 'not-allowed',
          fontWeight: '600',
          transition: 'all 0.2s',
          opacity: submission.status === 'pending' ? 1 : 0.6,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: submission.status === 'pending'
            ? '0 4px 12px rgba(37, 99, 235, 0.3)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          if (submission.status === 'pending') {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (submission.status === 'pending') {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
          }
        }}
      >
        💰 {submission.status === 'offered' ? 'Teklif Verildi' : 'Teklif Ver'}
      </button>

      <button
        onClick={() => submission.status === 'accepted' ? onAction(submission, 'listing') : null}
        disabled={submission.status !== 'accepted'}
        style={{
          background: submission.status === 'accepted'
            ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
            : submission.status === 'listed'
            ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
            : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: isMobile ? '12px 16px' : '14px 20px',
          fontSize: isMobile ? '13px' : '14px',
          cursor: submission.status === 'accepted' ? 'pointer' : 'not-allowed',
          fontWeight: '600',
          transition: 'all 0.2s',
          opacity: submission.status === 'accepted' ? 1 : 0.6,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: submission.status === 'accepted'
            ? '0 4px 12px rgba(5, 150, 105, 0.3)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          if (submission.status === 'accepted') {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (submission.status === 'accepted') {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
          }
        }}
      >
        📋 {submission.status === 'listed' ? '✅ İlan Oluşturuldu' : 'İlan Oluştur'}
      </button>

      <button
        onClick={() => onAction(submission, 'reject')}
        disabled={submission.status !== 'pending' && submission.status !== 'offered'}
        style={{
          background: (submission.status === 'pending' || submission.status === 'offered')
            ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
            : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: isMobile ? '12px 16px' : '14px 20px',
          fontSize: isMobile ? '13px' : '14px',
          cursor: (submission.status === 'pending' || submission.status === 'offered') ? 'pointer' : 'not-allowed',
          fontWeight: '600',
          transition: 'all 0.2s',
          opacity: (submission.status === 'pending' || submission.status === 'offered') ? 1 : 0.6,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: (submission.status === 'pending' || submission.status === 'offered')
            ? '0 4px 12px rgba(220, 38, 38, 0.3)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          if (submission.status === 'pending' || submission.status === 'offered') {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (submission.status === 'pending' || submission.status === 'offered') {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
          }
        }}
      >
        ❌ {submission.status === 'rejected' ? 'Reddedildi' : 'Reddet'}
      </button>

      <button
        onClick={() => onDelete(submission._id)}
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: isMobile ? '12px 16px' : '14px 20px',
          fontSize: isMobile ? '13px' : '14px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
        }}
      >
        🗑️ Sil
      </button>
    </div>
  );
}
