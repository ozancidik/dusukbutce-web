"use client";
import React, { useState } from 'react';

interface BulkStockUpdateModalProps {
  onClose: () => void;
  onUpdate: (data: any) => void;
  isMobile: boolean;
  categories: string[];
}

export default function BulkStockUpdateModal({ 
  onClose, 
  onUpdate, 
  isMobile,
  categories 
}: BulkStockUpdateModalProps) {
  const [formData, setFormData] = useState({
    category: 'all',
    changeType: 'add',
    changeAmount: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.changeAmount || parseInt(formData.changeAmount) <= 0) {
      alert('Geçerli bir miktar girin');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const updateData = {
        category: formData.category,
        changeType: formData.changeType,
        changeAmount: parseInt(formData.changeAmount),
        reason: formData.reason || 'Toplu stok güncelleme'
      };

      await onUpdate(updateData);
      onClose();
    } catch (error) {
      console.error('Toplu stok güncelleme hatası:', error);
      alert('Toplu stok güncelleme sırasında bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '20px' : '40px'
    }}
    onClick={onClose}
    >
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '24px' : '32px',
        maxWidth: isMobile ? '100%' : '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'slideInRight 0.3s ease-out'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: 0
          }}>
            Toplu Stok Güncelleme
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
          >
            ✕
          </button>
        </div>

        <div style={{
          background: '#fef3c7',
          borderRadius: '8px',
          padding: isMobile ? '12px' : '16px',
          marginBottom: '24px',
          border: '1px solid #f59e0b'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <div style={{ fontSize: '20px' }}>⚠️</div>
            <h4 style={{
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#92400e',
              margin: 0
            }}>
              Dikkat!
            </h4>
          </div>
          <p style={{
            fontSize: isMobile ? '13px' : '14px',
            color: '#92400e',
            margin: 0,
            lineHeight: '1.4'
          }}>
            Bu işlem seçilen kategorideki tüm ürünlerin stok miktarını etkileyecektir. 
            İşlem geri alınamaz, lütfen dikkatli olun.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Kategori *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'graphics-card' ? 'Ekran Kartı' :
                   category === 'notebook' ? 'Dizüstü Bilgisayar' :
                   category === 'desktop' ? 'Masaüstü Bilgisayar' :
                   category === 'processor' ? 'İşlemci' :
                   category === 'monitor' ? 'Monitör' :
                   category === 'keyboard' ? 'Klavye' :
                   category === 'mouse' ? 'Fare' :
                   category === 'headphones' ? 'Kulaklık' :
                   category === 'ram' ? 'RAM' :
                   category === 'ssd' ? 'SSD' :
                   category === 'tablet' ? 'Tablet' :
                   category === 'audio-system' ? 'Ses Sistemi' :
                   category === 'case' ? 'Kasa' :
                   category === 'cooler' ? 'Soğutucu' :
                   category === 'gaming-wheel' ? 'Gaming Direksiyon' :
                   category}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Güncelleme Türü *
            </label>
            <select
              value={formData.changeType}
              onChange={(e) => handleInputChange('changeType', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="add">Stok Ekle (+)</option>
              <option value="remove">Stok Çıkar (-)</option>
              <option value="set">Stok Miktarını Belirle (=)</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Miktar *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.changeAmount}
              onChange={(e) => handleInputChange('changeAmount', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Miktar girin"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Açıklama
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="Güncelleme nedeni (opsiyonel)"
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: isMobile ? '10px 16px' : '12px 20px',
                background: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
            >
              İptal
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting || !formData.changeAmount}
              style={{
                padding: isMobile ? '10px 16px' : '12px 20px',
                background: isSubmitting || !formData.changeAmount ? '#9ca3af' : 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: isSubmitting || !formData.changeAmount ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isSubmitting && (
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              )}
              {isSubmitting ? 'Güncelleniyor...' : 'Toplu Güncelle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}