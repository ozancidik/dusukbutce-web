import { useState } from 'react';

interface Submission {
  _id: string;
  brand: string;
  model: string;
  status: string;
  // Diğer özellikler...
}

interface ActionModalProps {
  showModal: boolean;
  selectedSubmission: Submission | null;
  modalType: 'offer' | 'listing' | 'reject' | 'delivery_completed' | 'confirm_payment' | 'approve_cancellation' | 'reject_cancellation' | null;
  isMobile: boolean;
  loading?: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ActionModal({
  showModal,
  selectedSubmission,
  modalType,
  isMobile,
  loading = false,
  onSubmit,
  onCancel
}: ActionModalProps) {
  if (!showModal || !selectedSubmission || !modalType) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: isMobile ? '20px' : '32px',
        width: '100%',
        maxWidth: isMobile ? '100%' : '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{
          fontSize: isMobile ? '20px' : '24px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {modalType === 'offer' && 'Teklif Ver'}
          {modalType === 'listing' && 'İlan Oluştur'}
          {modalType === 'reject' && 'Talebi Reddet'}
          {modalType === 'confirm_payment' && '💸 Ödeme Onayla'}
          {modalType === 'approve_cancellation' && '✅ İptal Talebini Onayla'}
          {modalType === 'reject_cancellation' && '❌ İptal Talebini Reddet'}
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <strong>Ürün:</strong> {selectedSubmission.brand} {selectedSubmission.model}
        </div>

        <ActionForm 
          type={modalType} 
          onSubmit={onSubmit}
          onCancel={onCancel}
          isMobile={isMobile}
          loading={loading}
        />
      </div>
    </div>
  );
}

// Action Form Component
function ActionForm({ type, onSubmit, onCancel, isMobile, loading = false }: {
  type: 'offer' | 'listing' | 'reject' | 'delivery_completed' | 'confirm_payment' | 'approve_cancellation' | 'reject_cancellation';
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isMobile: boolean;
  loading?: boolean;
}) {
  const [formData, setFormData] = useState({
    amount: '',
    notes: '',
    price: '',
    reason: '',
    paymentMethod: 'Banka Havalesi/EFT'
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (type === 'offer') {
      if (!formData.amount || formData.amount.trim() === '') {
        newErrors.amount = 'Teklif miktarı gerekli';
      }
      // Teklif notları artık opsiyonel
    } else if (type === 'listing') {
      if (!formData.price || formData.price.trim() === '') {
        newErrors.price = 'İlan fiyatı gerekli';
      }
    } else if (type === 'reject') {
      if (!formData.reason || formData.reason.trim() === '') {
        newErrors.reason = 'Reddetme sebebi gerekli';
      }
    } else if (type === 'confirm_payment') {
      if (!formData.amount || formData.amount.trim() === '') {
        newErrors.amount = 'Ödeme tutarı gerekli';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submit attempt:', { type, formData, errors });
    
    if (validateForm()) {
      console.log('Form validation passed, calling onSubmit');
      onSubmit(formData);
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'offer' && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Teklif Miktarı (TL)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '16px',
              border: `2px solid ${errors.amount ? '#dc2626' : '#e5e7eb'}`,
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              background: '#f9fafb',
              transition: 'border-color 0.2s'
            }}
            placeholder="Örn: 15000"
          />
          {errors.amount && (
            <p style={{
              color: '#dc2626',
              fontSize: '12px',
              margin: '4px 0 0 0'
            }}>
              {errors.amount}
            </p>
          )}
        </div>
      )}

      {type === 'offer' && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Teklif Notları (Opsiyonel)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              background: '#f9fafb',
              transition: 'border-color 0.2s',
              resize: 'vertical'
            }}
            placeholder="Teklif hakkında ek notlar..."
          />
        </div>
      )}

      {type === 'listing' && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            İlan Fiyatı (TL)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              background: '#f9fafb',
              transition: 'border-color 0.2s'
            }}
            placeholder="Örn: 18000"
          />
        </div>
      )}

      {type === 'reject' && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Reddetme Sebebi
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
            rows={4}
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              background: '#f9fafb',
              transition: 'border-color 0.2s',
              resize: 'vertical'
            }}
            placeholder="Reddetme sebebini açıklayın..."
          />
        </div>
      )}

      {type === 'confirm_payment' && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Ödenen Tutar (TL)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: `2px solid ${errors.amount ? '#dc2626' : '#e5e7eb'}`,
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                background: '#f9fafb',
                transition: 'border-color 0.2s'
              }}
              placeholder="Örn: 15000"
            />
            {errors.amount && (
              <p style={{ color: '#dc2626', fontSize: '12px', margin: '4px 0 0 0' }}>
                {errors.amount}
              </p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Ödeme Yöntemi
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                background: '#f9fafb'
              }}
            >
              <option value="Banka Havalesi/EFT">Banka Havalesi/EFT</option>
              <option value="Elden">Elden</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Not (Opsiyonel)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={2}
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                background: '#f9fafb',
                resize: 'vertical'
              }}
              placeholder="Örn: IBAN son 4 hane, dekont no vb."
            />
          </div>
        </>
      )}

      {(type === 'approve_cancellation' || type === 'reject_cancellation') && (
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Not (Opsiyonel) — müşteriye gönderilecek
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={3}
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '16px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              background: '#f9fafb',
              transition: 'border-color 0.2s',
              resize: 'vertical'
            }}
            placeholder={type === 'approve_cancellation' ? 'Örn: Talebiniz iptal edildi.' : 'Örn: Ürün zaten kargoya verildiği için iptal edilemiyor.'}
          />
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '24px'
      }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          style={{
            background: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? '14px' : '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s',
            opacity: loading ? 0.6 : 1
          }}
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: (type === 'reject' || type === 'reject_cancellation') ? '#dc2626' : (type === 'confirm_payment' || type === 'approve_cancellation') ? '#059669' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? '14px' : '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s',
            opacity: loading ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {loading && (
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: '2px solid currentColor',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          )}
          {loading ? 'İşleniyor...' : (
            <>
              {type === 'offer' && 'Teklif Ver'}
              {type === 'listing' && 'İlan Oluştur'}
              {type === 'reject' && 'Reddet'}
              {type === 'confirm_payment' && 'Ödeme Onayla'}
              {type === 'approve_cancellation' && 'İptali Onayla'}
              {type === 'reject_cancellation' && 'İptali Reddet'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}