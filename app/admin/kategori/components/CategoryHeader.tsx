"use client";
import React from 'react';
import Link from 'next/link';

interface CategoryHeaderProps {
  onAddClick: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kategori Yönetimi</h1>
          <p className="text-gray-600 mt-2">Ürün kategorilerini yönetin</p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/admin"
            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Admin Paneli
          </Link>
          <button
            onClick={onAddClick}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Yeni Kategori
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;









