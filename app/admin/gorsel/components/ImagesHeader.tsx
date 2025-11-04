"use client";
import React from 'react';
import Link from 'next/link';

const ImagesHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Görsel Yönetimi</h1>
          <p className="text-gray-600 mt-2">Ürün fotoğraflarını yönetin ve çoklu resim yükleyin</p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/admin"
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Admin Paneli
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImagesHeader;









