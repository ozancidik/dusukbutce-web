"use client";
import React from 'react';

interface ImageStats {
  totalProducts: number;
  totalImages: number;
  productsWithImages: number;
  productsWithoutImages: number;
  averageImagesPerProduct: number;
}

interface ImagesStatsProps {
  stats: ImageStats | null;
}

const ImagesStats: React.FC<ImagesStatsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <span className="text-2xl">📦</span>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Toplam Ürün</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <span className="text-2xl">🖼️</span>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Toplam Görsel</p>
            <p className="text-2xl font-bold text-green-600">{stats.totalImages}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <span className="text-2xl">✅</span>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Görselli Ürün</p>
            <p className="text-2xl font-bold text-purple-600">{stats.productsWithImages}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-orange-100 rounded-lg">
            <span className="text-2xl">❌</span>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Görselsiz Ürün</p>
            <p className="text-2xl font-bold text-orange-600">{stats.productsWithoutImages}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <span className="text-2xl">📊</span>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">Ortalama</p>
            <p className="text-2xl font-bold text-indigo-600">
              {stats.averageImagesPerProduct.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesStats;









