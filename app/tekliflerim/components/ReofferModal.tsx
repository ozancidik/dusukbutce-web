"use client";
import React, { useState } from "react";
import ModalBase from "./ModalBase";

interface ReofferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (note: string) => void;
  isMobile?: boolean;
}

export default function ReofferModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  isMobile = false 
}: ReofferModalProps) {
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (note.trim()) {
      onSubmit(note);
      setNote('');
    }
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="🔄 Yeniden Teklif İste"
      isMobile={isMobile}
    >
      <div style={{
        background: '#eff6ff',
        border: '1px solid #bfdbfe',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#1e40af',
          margin: 0,
          lineHeight: '1.6'
        }}>
          💡 Ürününüz için yeniden değerlendirme talep edebilirsiniz. 
          Lütfen detayları veya talepinizi açıklayın.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Açıklama / Talep *
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Örn: Ürünün durumu yanlış değerlendirildi, orijinal faturası mevcut..."
          required
          rows={5}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical',
            outline: 'none',
            transition: 'border-color 0.2s',
            fontFamily: 'inherit'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          margin: '6px 0 0 0'
        }}>
          Detaylı açıklama yapmanız, teklifin daha doğru değerlendirilmesine yardımcı olur.
        </p>
      </div>

      <div style={{
        background: '#fef3c7',
        border: '1px solid #fde047',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '20px'
      }}>
        <p style={{
          fontSize: '12px',
          color: '#92400e',
          margin: 0,
          lineHeight: '1.5'
        }}>
          ⚠️ Yeniden teklif talebi, admin ekibimiz tarafından en kısa sürede değerlendirilecektir.
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={onClose}
          style={{
            padding: '12px 24px',
            background: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          İptal
        </button>
        <button
          onClick={handleSubmit}
          disabled={!note.trim()}
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: !note.trim() ? 'not-allowed' : 'pointer',
            opacity: !note.trim() ? 0.5 : 1,
            transition: 'all 0.2s'
          }}
        >
          🔄 Gönder
        </button>
      </div>
    </ModalBase>
  );
}





