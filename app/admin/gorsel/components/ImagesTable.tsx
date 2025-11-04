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

interface ImagesTableProps {
  products: Product[];
  onImageClick: (product: Product, index: number) => void;
  onUploadClick: (product: Product) => void;
  onDeleteAllClick: (productId: string) => void;
}

const ImagesTable: React.FC<ImagesTableProps> = ({
  products,
  onImageClick,
  onUploadClick,
  onDeleteAllClick
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Ürünler ve Görselleri</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ürün
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Görsel Sayısı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Önizleme
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {product.brand} {product.productModel}
                    </div>
                    <div className="text-sm text-gray-500">{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.images.length > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.images.length} / 20
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {product.images.slice(0, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Görsel ${index + 1}`}
                        className="w-12 h-12 object-cover rounded border cursor-pointer"
                        onClick={() => onImageClick(product, index)}
                      />
                    ))}
                    {product.images.length > 3 && (
                      <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500">
                        +{product.images.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onUploadClick(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Görsel Ekle
                    </button>
                    {product.images.length > 0 && (
                      <button
                        onClick={() => onDeleteAllClick(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Tümünü Sil
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Ürün bulunamadı</div>
        </div>
      )}
    </div>
  );
};

export default ImagesTable;









