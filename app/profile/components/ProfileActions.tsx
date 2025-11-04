"use client";
import React from 'react';

interface ProfileActionsProps {
  isMobile: boolean;
  isEditing: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  handleEdit: () => void;
  handleLogout: () => void;
}

export default function ProfileActions({
  isMobile,
  isEditing,
  handleSave,
  handleCancel,
  handleEdit,
  handleLogout
}: ProfileActionsProps) {
  if (isEditing) {
    return (
      <div style={{ display: 'flex', gap: '12px', flexDirection: isMobile ? 'column' : 'row' }}>
        <button
          type="button"
          onClick={handleSave}
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            flex: isMobile ? 'none' : 1
          }}
        >
          Kaydet
        </button>
        <button
          onClick={handleCancel}
          style={{
            background: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            flex: isMobile ? 'none' : 1
          }}
        >
          İptal
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '12px', flexDirection: isMobile ? 'column' : 'row' }}>
      <button
        onClick={handleEdit}
        style={{
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          flex: isMobile ? 'none' : 1
        }}
      >
        ✏️ Düzenle
      </button>
      <button
        onClick={handleLogout}
        style={{
          background: '#dc2626',
          color: 'white',
          border: '1px solid #b91c1c',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          flex: isMobile ? 'none' : 1,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#b91c1c';
          e.currentTarget.style.borderColor = '#991b1b';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#dc2626';
          e.currentTarget.style.borderColor = '#b91c1c';
        }}
      >
        🚪 Çıkış Yap
      </button>
    </div>
  );
}
