"use client";
import React, { useRef } from 'react';

interface Product {
  _id: string;
  name: string;
  brand: string;
  productModel: string;
  category: string;
  images: string[];
}

interface ImagesUploadModalProps {
  isOpen: boolean;
  product: Product | null;
  uploadedBy: string;
  setUploadedBy: (value: string) => void;
  dragOver: boolean;
  setDragOver: (value: boolean) => void;
  onClose: () => void;
  onFileUpload: (files: FileList) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const ImagesUploadModal: React.FC<ImagesUploadModalProps> = ({
  isOpen,
  product,
  uploadedBy,
  setUploadedBy,
  dragOver,
  setDragOver,
  onClose,
  onFileUpload,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4">Görsel Yükle</h3>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Ürün:</p>
          <p className="font-medium">{product.brand} {product.productModel}</p>
          <p className="text-sm text-gray-500">Mevcut görsel sayısı: {product.images.length} / 20</p>
        </div>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className="space-y-4">
            <div className="text-4xl">📁</div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Dosyaları buraya sürükleyin veya seçin
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, JPEG formatları desteklenir (Maksimum 10 dosya)
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Dosya Seç
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && onFileUpload(e.target.files)}
              className="hidden"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yükleyen
          </label>
          <input
            type="text"
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Admin email"
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagesUploadModal;









