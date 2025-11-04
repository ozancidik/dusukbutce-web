"use client";
import React, { useState } from "react";
import ModalBase from "./ModalBase";

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDelivery: (method: 'kargo' | 'evden') => void;
  isMobile?: boolean;
}

export default function DeliveryModal({ 
  isOpen, 
  onClose, 
  onSelectDelivery,
  isMobile = false 
}: DeliveryModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'kargo' | 'evden' | null>(null);

  const deliveryOptions = [
    {
      method: 'kargo' as const,
      icon: '📦',
      title: 'Kargo ile Gönder',
      description: 'Ürününüzü kargo ile gönderin. Adres bilgilerinizi sonraki adımda gireceksiniz.',
      color: '#3b82f6'
    },
    {
      method: 'evden' as const,
      icon: '🏠',
      title: 'Evden Al',
      description: 'Ürünü evinizden almamızı sağlayın. Adres ve randevu bilgilerini sonraki adımda gireceksiniz.',
      color: '#10b981'
    }
  ];

  const handleSelect = (method: 'kargo' | 'evden') => {
    setSelectedMethod(method);
    onSelectDelivery(method);
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="🎉 Teklif Kabul Edildi!"
      isMobile={isMobile}
    >
      <p style={{
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        Lütfen teslimat yöntemini seçin
      </p>

      <div style={{
        display: 'grid',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {deliveryOptions.map((option) => (
          <button
            key={option.method}
            onClick={() => handleSelect(option.method)}
            style={{
              background: selectedMethod === option.method ? `${option.color}10` : 'white',
              border: `2px solid ${selectedMethod === option.method ? option.color : '#e5e7eb'}`,
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (selectedMethod !== option.method) {
                e.currentTarget.style.borderColor = option.color;
                e.currentTarget.style.background = `${option.color}05`;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedMethod !== option.method) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.background = 'white';
              }
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{
                fontSize: '32px',
                lineHeight: '1'
              }}>
                {option.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 6px 0'
                }}>
                  {option.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {option.description}
                </p>
              </div>
              {selectedMethod === option.method && (
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: option.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div style={{
        background: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px',
        marginTop: '16px'
      }}>
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          margin: 0,
          lineHeight: '1.5'
        }}>
          ℹ️ Teslimat yöntemini seçtikten sonra, ilgili formu dolduracaksınız.
        </p>
      </div>
    </ModalBase>
  );
}





