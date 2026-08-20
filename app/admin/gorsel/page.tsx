'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  brand: string;
  productModel: string;
  category: string;
  images: string[];
}

interface ImageStats {
  totalProducts: number;
  totalImages: number;
  productsWithImages: number;
  productsWithoutImages: number;
  averageImagesPerProduct: number;
}

function getAdminToken(): string | null {
  return localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
}

export default function ImagesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<ImageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterHasImages, setFilterHasImages] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [uploadedBy, setUploadedBy] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ürünleri yükle
  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });
      
      const response = await fetch(`/api/admin/images?${params}`, {
        headers: { 'Authorization': `Bearer ${getAdminToken()}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
        setStats(data.stats);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Ürün yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  // Filtrelenmiş ürünler
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productModel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    const matchesHasImages = filterHasImages === 'all' ||
                           (filterHasImages === 'with' && product.images.length > 0) ||
                           (filterHasImages === 'without' && product.images.length === 0);
    
    return matchesSearch && matchesCategory && matchesHasImages;
  });

  // Kategoriler
  const categories = [...new Set(products.map(p => p.category))];

  // Dosya yükleme
  const handleFileUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Lütfen geçerli resim dosyaları seçin');
      return;
    }
    
    if (imageFiles.length > 10) {
      alert('Maksimum 10 dosya seçebilirsiniz');
      return;
    }
    
    // Base64'e çevir
    const promises = imageFiles.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(promises).then(base64Images => {
      handleImageUpload(base64Images);
    });
  };

  // Görsel yükleme
  const handleImageUpload = async (images: string[]) => {
    if (!selectedProduct) return;
    
    try {
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAdminToken()}`
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          images,
          uploadedBy: uploadedBy || 'Admin'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowUploadModal(false);
        setUploadedBy('');
        loadProducts();
        alert(`${data.product.newImages} görsel başarıyla yüklendi!`);
      } else {
        alert('Hata: ' + data.message);
      }
    } catch (error) {
      console.error('Görsel yükleme hatası:', error);
      alert('Görseller yüklenirken hata oluştu!');
    }
  };

  // Görsel silme
  const handleImageDelete = async (productId: string, imageIndex: number) => {
    if (!confirm('Bu görseli silmek istediğinizden emin misiniz?')) return;
    
    try {
      const response = await fetch(`/api/admin/images/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAdminToken()}`
        },
        body: JSON.stringify({
          action: 'remove',
          imageIndex,
          uploadedBy: 'Admin'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        loadProducts();
        alert('Görsel silindi!');
      } else {
        alert('Hata: ' + data.message);
      }
    } catch (error) {
      console.error('Görsel silme hatası:', error);
      alert('Görsel silinirken hata oluştu!');
    }
  };

  // Tüm görselleri sil
  const handleDeleteAllImages = async (productId: string) => {
    if (!confirm('Bu ürünün tüm görsellerini silmek istediğinizden emin misiniz?')) return;
    
    try {
      const response = await fetch(`/api/admin/images/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getAdminToken()}` }
      });
      
      const data = await response.json();
      
      if (data.success) {
        loadProducts();
        alert('Tüm görseller silindi!');
      } else {
        alert('Hata: ' + data.message);
      }
    } catch (error) {
      console.error('Görsel silme hatası:', error);
      alert('Görseller silinirken hata oluştu!');
    }
  };

  // Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* İstatistikler */}
        {stats && (
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
        )}

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arama</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ürün ara..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Görsel Durumu</label>
              <select
                value={filterHasImages}
                onChange={(e) => setFilterHasImages(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tümü</option>
                <option value="with">Görselli</option>
                <option value="without">Görselsiz</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={loadProducts}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Yenile
              </button>
            </div>
          </div>
        </div>

        {/* Ürün Listesi */}
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
                {filteredProducts.map((product) => (
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
                            onClick={() => {
                              setSelectedProduct(product);
                              setSelectedImageIndex(index);
                              setShowImageModal(true);
                            }}
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
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowUploadModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Görsel Ekle
                        </button>
                        {product.images.length > 0 && (
                          <button
                            onClick={() => handleDeleteAllImages(product._id)}
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
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">Ürün bulunamadı</div>
            </div>
          )}
        </div>

        {/* Sayfalama */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Önceki
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sonraki
              </button>
            </div>
          </div>
        )}

        {/* Görsel Yükleme Modal */}
        {showUploadModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold mb-4">Görsel Yükle</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Ürün:</p>
                <p className="font-medium">{selectedProduct.brand} {selectedProduct.productModel}</p>
                <p className="text-sm text-gray-500">Mevcut görsel sayısı: {selectedProduct.images.length} / 20</p>
              </div>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
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
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
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
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Görsel Görüntüleme Modal */}
        {showImageModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-full p-4">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
              >
                ✕
              </button>
              
              <div className="text-center mb-4">
                <h3 className="text-white text-lg font-semibold">
                  {selectedProduct.brand} {selectedProduct.productModel}
                </h3>
                <p className="text-gray-300 text-sm">
                  {selectedImageIndex + 1} / {selectedProduct.images.length}
                </p>
              </div>
              
              <div className="relative">
                <img
                  src={selectedProduct.images[selectedImageIndex]}
                  alt={`Görsel ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-96 object-contain mx-auto"
                />
                
                {selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => 
                        prev > 0 ? prev - 1 : selectedProduct.images.length - 1
                      )}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => 
                        prev < selectedProduct.images.length - 1 ? prev + 1 : 0
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
                  onClick={() => handleImageDelete(selectedProduct._id, selectedImageIndex)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Bu Görseli Sil
                </button>
              </div>
              
              {/* Küçük resimler */}
              {selectedProduct.images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {selectedProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Görsel ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
                        index === selectedImageIndex ? 'border-white' : 'border-gray-400'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
