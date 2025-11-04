"use client";
import React from 'react';

interface NotesSectionProps {
  formData: any;
  handleInputChange: (e: any) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ formData, handleInputChange }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '8px'
      }}>
        Ek Notlar
      </label>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleInputChange}
        rows={3}
        placeholder="Eklemek istediğiniz notlar..."
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s',
          resize: 'vertical'
        }}
        onFocus={(e) => e.target.style.borderColor = '#10b981'}
        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
      />
    </div>
  );
};

export default NotesSection;
