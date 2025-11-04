'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  brand: string;
  productModel: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

interface PriceHistory {
  _id: string;
  productId: {
    _id: string;
    name: string;
    brand: string;
    productModel: string;
    category: string;
  };
  oldPrice: number;
  newPrice: number;
  changeType: string;
  changeReason?: string;
  changedBy: string;
  changedAt: string;
  priceDifference: number;
  percentageChange: number;
  isIncrease: boolean;
  isDecrease: boolean;
}

interface PriceStats {
  totalChanges: number;
  averageChange: number;
  totalIncrease: number;
  totalDecrease: number;
  increaseCount: number;
  decreaseCount: number;
}

export default function PricesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [stats, setStats] = useState<PriceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterChangeType, setFilterChangeType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Form states
  const [bulkForm, setBulkForm] = useState({
    productIds: [] as string[],
    updateType: 'fixed',
    updateValue: '',
    changeReason: '',
    changedBy: ''
  });

  const [singleForm, setSingleForm] = useState({
    newPrice: '',
    changeReason: '',
    changedBy: ''
  });

  // Ürünleri yükle
  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Ürün yükleme hatası:', error);
    }
  };

  // Fiyat geçmişini yükle
  const loadPriceHistory = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });
      
      if (filterChangeType !== 'all') {
        params.append('changeType', filterChangeType);
      }
      
      const response = await fetch(`/api/admin/prices?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setPriceHistory(data.history);
        setStats(data.stats);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Fiyat geçmişi yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadPriceHistory();
  }, [currentPage, filterChangeType]);

  // Filtrelenmiş ürünler
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productModel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Kategoriler
  const categories = [...new Set(products.map(p => p.category))];

  // Toplu fiyat güncelleme
  const handleBulkUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bulkForm.productIds.length === 0) {
      alert('Lütfen en az bir ürün seçin');
      return;
    }
    
    try {
      const response = await fetch('/api/admin/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bulkForm,
          updateValue: parseFloat(bulkForm.updateValue),
          changedBy: bulkForm.changedBy || 'Admin'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowBulkModal(false);
        setBulkForm({
          productIds: [],
          updateType: 'fixed',
          updateValue: '',
          changeReason: '',
          changedBy: ''
        });
        loadPriceHistory();
        alert(`Başarılı: ${data.summary.successful} ürün güncellendi`);
      } else {
        alert('Hata: ' + data.message);
      }
    } catch (error) {
      console.error('Toplu güncelleme hatası:', error);
      alert('Toplu güncelleme başarısız!');
    }
  };

  // Tek ürün fiyat güncelleme
  const handleSingleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;
    
    try {
      const response = await fetch(`/api/admin/prices/${selectedProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...singleForm,
          newPrice: parseFloat(singleForm.newPrice),
          changedBy: singleForm.changedBy || 'Admin'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowSingleModal(false);
        setSelectedProduct(null);
        setSingleForm({
          newPrice: '',
          changeReason: '',
          changedBy: ''
        });
        loadProducts();
        loadPriceHistory();
        alert('Fiyat başarıyla güncellendi!');
      } else {
        alert('Hata: ' + data.message);
      }
    } catch (error) {
      console.error('Fiyat güncelleme hatası:', error);
      alert('Fiyat güncellenirken hata oluştu!');
    }
  };

  // Ürün seçimi
  const toggleProductSelection = (productId: string) => {
    setBulkForm(prev => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter(id => id !== productId)
        : [...prev.productIds, productId]
    }));
  };

  // Tek ürün düzenleme
  const openSingleEdit = (product: Product) => {
    setSelectedProduct(product);
    setSingleForm({
      newPrice: product.price.toString(),
      changeReason: '',
      changedBy: ''
    });
    setShowSingleModal(true);
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
              <h1 className="text-3xl font-bold text-gray-900">Fiyat Yönetimi</h1>
              <p className="text-gray-600 mt-2">Ürün fiyatlarını yönetin ve fiyat geçmişini takip edin</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin"
                className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Admin Paneli
              </Link>
              <button
                onClick={() => setShowBulkModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📊 Toplu Fiyat Güncelleme
              </button>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📈</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Toplam Değişiklik</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalChanges}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">⬆️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Artış Sayısı</p>
                  <p className="text-2xl font-bold text-green-600">{stats.increaseCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <span className="text-2xl">⬇️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Azalış Sayısı</p>
                  <p className="text-2xl font-bold text-red-600">{stats.decreaseCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Ortalama Değişim</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.averageChange > 0 ? '+' : ''}{stats.averageChange.toFixed(2)} TL
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Değişiklik Tipi</label>
              <select
                value={filterChangeType}
                onChange={(e) => setFilterChangeType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tümü</option>
                <option value="manual">Manuel</option>
                <option value="bulk">Toplu</option>
                <option value="campaign">Kampanya</option>
                <option value="auto">Otomatik</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={loadPriceHistory}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Yenile
              </button>
            </div>
          </div>
        </div>

        {/* Ürün Listesi */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Ürünler</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={filteredProducts.length > 0 && bulkForm.productIds.length === filteredProducts.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkForm(prev => ({
                            ...prev,
                            productIds: filteredProducts.map(p => p._id)
                          }));
                        } else {
                          setBulkForm(prev => ({
                            ...prev,
                            productIds: []
                          }));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok
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
                      <input
                        type="checkbox"
                        checked={bulkForm.productIds.includes(product._id)}
                        onChange={() => toggleProductSelection(product._id)}
                        className="rounded border-gray-300"
                      />
                    </td>
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
                      {product.price.toLocaleString('tr-TR')} TL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openSingleEdit(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Fiyat Düzenle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fiyat Geçmişi */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Fiyat Geçmişi</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eski Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yeni Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Değişim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Değiştiren
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {priceHistory.map((history) => (
                  <tr key={history._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {history.productId.brand} {history.productId.productModel}
                        </div>
                        <div className="text-sm text-gray-500">{history.productId.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.oldPrice.toLocaleString('tr-TR')} TL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.newPrice.toLocaleString('tr-TR')} TL
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        history.isIncrease 
                          ? 'bg-green-100 text-green-800' 
                          : history.isDecrease 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {history.isIncrease ? '+' : history.isDecrease ? '' : ''}
                        {(history.newPrice - history.oldPrice).toLocaleString('tr-TR')} TL
                        ({history.percentageChange > 0 ? '+' : ''}{history.percentageChange.toFixed(1)}%)
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {history.changeType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {history.changedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(history.changedAt).toLocaleString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {priceHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">Fiyat geçmişi bulunamadı</div>
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

        {/* Toplu Fiyat Güncelleme Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold mb-4">Toplu Fiyat Güncelleme</h3>
              <form onSubmit={handleBulkUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Güncelleme Tipi
                    </label>
                    <select
                      value={bulkForm.updateType}
                      onChange={(e) => setBulkForm({...bulkForm, updateType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="fixed">Sabit Miktar Ekle/Çıkar</option>
                      <option value="percentage">Yüzde Artır/Azalt</option>
                      <option value="multiply">Çarp</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Değer
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={bulkForm.updateValue}
                      onChange={(e) => setBulkForm({...bulkForm, updateValue: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={bulkForm.updateType === 'percentage' ? '10 (10% artırır)' : '100'}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sebep
                    </label>
                    <textarea
                      value={bulkForm.changeReason}
                      onChange={(e) => setBulkForm({...bulkForm, changeReason: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Fiyat değişikliği sebebi..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Değiştiren
                    </label>
                    <input
                      type="text"
                      value={bulkForm.changedBy}
                      onChange={(e) => setBulkForm({...bulkForm, changedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Admin email"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Seçili ürün sayısı: {bulkForm.productIds.length}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowBulkModal(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Güncelle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tek Ürün Fiyat Güncelleme Modal */}
        {showSingleModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Fiyat Düzenle</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Ürün:</p>
                <p className="font-medium">{selectedProduct.brand} {selectedProduct.productModel}</p>
              </div>
              <form onSubmit={handleSingleUpdate}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yeni Fiyat (TL)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={singleForm.newPrice}
                      onChange={(e) => setSingleForm({...singleForm, newPrice: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sebep
                    </label>
                    <textarea
                      value={singleForm.changeReason}
                      onChange={(e) => setSingleForm({...singleForm, changeReason: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Fiyat değişikliği sebebi..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Değiştiren
                    </label>
                    <input
                      type="text"
                      value={singleForm.changedBy}
                      onChange={(e) => setSingleForm({...singleForm, changedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Admin email"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowSingleModal(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Güncelle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
