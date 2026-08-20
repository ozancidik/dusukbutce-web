"use client";
import React, { useEffect } from 'react';

interface SubmissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
  duration?: number;
  redirectPath?: string;
  referenceNumber?: string;
}

export default function SubmissionPopup({
  isOpen,
  onClose,
  type,
  title,
  message,
  duration = 5000,
  redirectPath,
  referenceNumber
}: SubmissionPopupProps) {
  // Timer kaldırıldı - kullanıcı manuel olarak kapatacak
  // useEffect(() => {
  //   if (isOpen) {
  //     const timer = setTimeout(() => {
  //       onClose();
  //       // Redirect if success and redirectPath is provided
  //       if (type === 'success' && redirectPath) {
  //         window.location.href = redirectPath;
  //       }
  //     }, duration);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen, onClose, duration, type, redirectPath]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isSuccess ? 'border-green-200' : 'border-red-200';
  const iconColor = isSuccess ? 'text-green-600' : 'text-red-600';
  const titleColor = isSuccess ? 'text-green-800' : 'text-red-800';
  const messageColor = isSuccess ? 'text-green-700' : 'text-red-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className={`
        relative w-full max-w-md mx-auto transform transition-all duration-300 ease-out
        ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        <div className={`
          ${bgColor} ${borderColor} border-2 rounded-2xl shadow-2xl p-6
          animate-slideInUp
        `}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white">
            {isSuccess ? (
              <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold text-center mb-2 ${titleColor}`}>
            {title}
          </h3>

          {/* Message */}
          <p className={`text-center ${referenceNumber ? 'mb-3' : 'mb-6'} ${messageColor}`}>
            {message}
          </p>

          {/* Reference Number */}
          {referenceNumber && (
            <p className="text-center mb-6 font-semibold text-gray-700">
              Takip Numaranız: {referenceNumber}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isSuccess && (
              <button
                onClick={() => {
                  onClose();
                  if (redirectPath) {
                    window.location.href = redirectPath;
                  } else {
                    window.location.href = '/tekliflerim';
                  }
                }}
                className="flex-1 py-3 px-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Tekliflerim
              </button>
            )}
            
            <button
              onClick={() => {
                onClose();
                if (isSuccess) {
                  window.location.href = '/';
                }
              }}
              className={`
                flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200
                ${isSuccess 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
                }
                transform hover:scale-105 active:scale-95
              `}
            >
              {isSuccess ? 'Anasayfaya Git' : 'Tamam'}
            </button>
          </div>

          {/* Progress Bar kaldırıldı - timer yok */}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
