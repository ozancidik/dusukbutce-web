"use client";
import React from 'react';

interface GamepadSubmitProps {
  isLoggedIn: boolean;
  isSubmitting: boolean;
}

export default function GamepadSubmit({ isLoggedIn, isSubmitting }: GamepadSubmitProps) {
  return (
    <>
      {isLoggedIn && (
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }
          }}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Gamepad Teklifi Al'}
        </button>
      )}
    </>
  );
}
