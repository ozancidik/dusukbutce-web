"use client";
import React from 'react';
import { Teklif } from '../types/Teklif';
import { formatDate, formatPrice, formatStatus } from '../utils/formatUtils';
import { getStatusColor } from '../utils/teklifHelpers';

interface TeklifCardProps {
  teklif: Teklif;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onAction: (action: 'accept' | 'reject' | 'counter', data?: any) => void;
  onDelete: () => void;
  isMobile: boolean;
}

export default function TeklifCard({
  teklif,
  isExpanded,
  onToggleExpanded,
  onAction,
  onDelete,
  isMobile
}: TeklifCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {teklif.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {teklif.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(teklif.status)}`}>
            {formatStatus(teklif.status)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Teklif Fiyatı</p>
            <p className="text-lg font-semibold text-green-600">
              {formatPrice(teklif.price)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tarih</p>
            <p className="text-sm text-gray-900">
              {formatDate(teklif.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={onToggleExpanded}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {isExpanded ? 'Daha Az Göster' : 'Detayları Gör'}
          </button>
          
          <div className="flex space-x-2">
            {teklif.status === 'pending' && (
              <>
                <button
                  onClick={() => onAction('accept')}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Kabul Et
                </button>
                <button
                  onClick={() => onAction('reject')}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Reddet
                </button>
                <button
                  onClick={() => onAction('counter')}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Karşı Teklif
                </button>
              </>
            )}
            <button
              onClick={onDelete}
              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
            >
              Sil
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50">
          <div className="pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Gönderim Detayları</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Orijinal Fiyat</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice(teklif.submission.price)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kategori</p>
                <p className="text-sm font-medium text-gray-900">
                  {teklif.category}
                </p>
              </div>
            </div>
            
            {teklif.counterOffer && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-1">Karşı Teklif</h5>
                <p className="text-sm text-blue-800">
                  {formatPrice(teklif.counterOffer.price)} - {teklif.counterOffer.message}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}