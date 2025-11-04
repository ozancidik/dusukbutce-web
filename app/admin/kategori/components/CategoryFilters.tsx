"use client";
import React from 'react';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategory?: {
    _id: string;
    name: string;
    slug: string;
  };
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterParent: string;
  setFilterParent: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  rootCategories: Category[];
  onRefresh: () => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterParent,
  setFilterParent,
  filterStatus,
  setFilterStatus,
  rootCategories,
  onRefresh
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Kategori ara..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ana Kategori</label>
          <select
            value={filterParent}
            onChange={(e) => setFilterParent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tümü</option>
            <option value="root">Ana Kategoriler</option>
            {rootCategories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tümü</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={onRefresh}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Yenile
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;









