"use client";
import React, { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  productModel: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface StockUpdateModalProps {
  product: Product | null;
  onClose: () => void;
  onUpdate: (data: any) => void;
  isMobile: boolean;
}

export default function StockUpdateModal({ 
  product, 
  onClose, 
  onUpdate, 
  isMobile 
}: StockUpdateModalProps) {
  const [formData, setFormData] = useState({
    changeType: 'add',
    changeAmount: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;
    
    if (!formData.changeAmount || parseInt(formData.changeAmount) <= 0) {
      alert('Geçerli bir miktar girin');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const updateData = {
        productId: product._id,
        changeType: formData.changeType,
        changeAmount: parseInt(formData.changeAmount),
        reason: formData.reason || 'Stok güncellendi'
      };

      await onUpdate(updateData);
      onClose();
    } catch (error) {
      console.error('Stok güncelleme hatası:', error);
      alert('Stok güncellenirken bir hata oluştu');
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

  if (!product) return null;

  const calculateNewStock = () => {
    const amount = parseInt(formData.changeAmount) || 0;
    switch (formData.changeType) {
      case 'add':
        return product.stock + amount;
      case 'remove':
        return Math.max(0, product.stock - amount);
      case 'set':
        return Math.max(0, amount);
      default:
        return product.stock;
    }
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
            Stok Güncelle
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

        {/* Ürün Bilgileri */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: isMobile ? '16px' : '20px',
          marginBottom: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 12px 0'
          }}>
            {product.name}
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '8px',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            <div>
              <strong style={{ color: '#6b7280' }}>Marka:</strong> {product.brand}
            </div>
            <div>
              <strong style={{ color: '#6b7280' }}>Model:</strong> {product.productModel}
            </div>
            <div>
              <strong style={{ color: '#6b7280' }}>Mevcut Stok:</strong> 
              <span style={{ 
                color: product.stock > 0 ? '#059669' : '#dc2626',
                fontWeight: '600',
                marginLeft: '4px'
              }}>
                {product.stock} adet
              </span>
            </div>
            <div>
              <strong style={{ color: '#6b7280' }}>Fiyat:</strong> 
              <span style={{ color: '#059669', fontWeight: '600', marginLeft: '4px' }}>
                {product.price.toLocaleString('tr-TR')} TL
              </span>
            </div>
          </div>
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

          {/* Yeni Stok Önizlemesi */}
          {formData.changeAmount && (
            <div style={{
              background: '#f0f9ff',
              borderRadius: '8px',
              padding: isMobile ? '12px' : '16px',
              marginBottom: '20px',
              border: '1px solid #0ea5e9'
            }}>
              <h4 style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                color: '#0369a1',
                margin: '0 0 8px 0'
              }}>
                Yeni Stok Miktarı:
              </h4>
              <div style={{
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '700',
                color: calculateNewStock() > product.stock ? '#059669' : 
                       calculateNewStock() < product.stock ? '#f59e0b' : '#6b7280'
              }}>
                {calculateNewStock()} adet
                {calculateNewStock() !== product.stock && (
                  <span style={{
                    fontSize: isMobile ? '14px' : '16px',
                    marginLeft: '8px',
                    color: '#6b7280'
                  }}>
                    ({calculateNewStock() > product.stock ? '+' : ''}{calculateNewStock() - product.stock})
                  </span>
                )}
              </div>
            </div>
          )}

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
                background: isSubmitting || !formData.changeAmount ? '#9ca3af' : 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
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
              {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}