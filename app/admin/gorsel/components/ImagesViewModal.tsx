"use client";
import React from 'react';

interface Product {
  _id: string;
  name: string;
  brand: string;
  productModel: string;
  category: string;
  images: string[];
}

interface ImagesViewModalProps {
  isOpen: boolean;
  product: Product | null;
  selectedImageIndex: number;
  onClose: () => void;
  onImageDelete: (productId: string, imageIndex: number) => void;
  onImageIndexChange: (index: number) => void;
}

const ImagesViewModal: React.FC<ImagesViewModalProps> = ({
  isOpen,
  product,
  selectedImageIndex,
  onClose,
  onImageDelete,
  onImageIndexChange
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-full p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        >
          ✕
        </button>
        
        <div className="text-center mb-4">
          <h3 className="text-white text-lg font-semibold">
            {product.brand} {product.productModel}
          </h3>
          <p className="text-gray-300 text-sm">
            {selectedImageIndex + 1} / {product.images.length}
          </p>
        </div>
        
        <div className="relative">
          <img
            src={product.images[selectedImageIndex]}
            alt={`Görsel ${selectedImageIndex + 1}`}
            className="max-w-full max-h-96 object-contain mx-auto"
          />
          
          {product.images.length > 1 && (
            <>
              <button
                onClick={() => onImageIndexChange(
                  selectedImageIndex > 0 ? selectedImageIndex - 1 : product.images.length - 1
                )}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
              >
                ‹
              </button>
              <button
                onClick={() => onImageIndexChange(
                  selectedImageIndex < product.images.length - 1 ? selectedImageIndex + 1 : 0
                )}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
              >
                ›
              </button>
            </>
          )}
        </div>
        
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => onImageDelete(product._id, selectedImageIndex)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Bu Görseli Sil
          </button>
        </div>
        
        {/* Küçük resimler */}
        {product.images.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Görsel ${index + 1}`}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                  index === selectedImageIndex ? 'border-white' : 'border-gray-400'
                }`}
                onClick={() => onImageIndexChange(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesViewModal;









