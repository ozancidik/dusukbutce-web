"use client";
import React, { useState } from 'react';
import { ModalType } from '../types/Teklif';

interface ActionModalProps {
  modal: ModalType;
  onClose: () => void;
  onConfirm: (data?: any) => void;
}

export default function ActionModal({ modal, onClose, onConfirm }: ActionModalProps) {
  const [counterPrice, setCounterPrice] = useState('');
  const [counterMessage, setCounterMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modal.action === 'counter') {
      onConfirm({
        counterOffer: {
          price: parseFloat(counterPrice),
          message: counterMessage
        }
      });
    } else {
      onConfirm();
    }
  };

  const getTitle = () => {
    switch (modal.action) {
      case 'accept': return 'Teklifi Kabul Et';
      case 'reject': return 'Teklifi Reddet';
      case 'counter': return 'Karşı Teklif Yap';
      default: return 'İşlem';
    }
  };

  const getMessage = () => {
    switch (modal.action) {
      case 'accept': return 'Bu teklifi kabul etmek istediğinizden emin misiniz?';
      case 'reject': return 'Bu teklifi reddetmek istediğinizden emin misiniz?';
      case 'counter': return 'Karşı teklif yapmak için fiyat ve mesaj girin:';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {getTitle()}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {getMessage()}
        </p>

        {modal.action === 'counter' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Karşı Teklif Fiyatı
              </label>
              <input
                type="number"
                value={counterPrice}
                onChange={(e) => setCounterPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Fiyat girin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mesaj
              </label>
              <textarea
                value={counterMessage}
                onChange={(e) => setCounterMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mesajınızı yazın"
                rows={3}
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Karşı Teklif Yap
              </button>
            </div>
          </form>
        )}

        {modal.action !== 'counter' && (
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              İptal
            </button>
            <button
              onClick={() => onConfirm()}
              className={`px-4 py-2 text-white rounded-lg ${
                modal.action === 'accept' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {modal.action === 'accept' ? 'Kabul Et' : 'Reddet'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}