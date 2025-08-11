#!/bin/bash

# Fix syntax errors in all bize-sat pages
echo "Fixing syntax errors in bize-sat pages..."

# Function to fix a page
fix_page() {
    local file=$1
    local title=$2
    local fields=$3
    
    echo "Fixing $file..."
    
    cat > "$file" << 'EOF'
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

export default function Page() {
  const router = useRouter();
  const { 
    isLoggedIn, 
    isLoading, 
    showLoginModal, 
    setShowLoginModal,
    pendingFormData,
    setPendingFormData
  } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    description: '',
    cosmeticCondition: 'İyi',
    hasBox: false,
    hasInvoice: false,
    invoiceDate: '',
    quantity: 1,
    images: [] as string[]
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (pendingFormData && Object.keys(pendingFormData).length > 0) {
      setFormData(prev => ({ ...prev, ...pendingFormData }));
      setPendingFormData(null);
    }
  }, [pendingFormData, setPendingFormData]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = e.target.checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setPendingFormData(formData);
      setShowLoginModal(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({
          brand: '',
          model: '',
          description: '',
          cosmeticCondition: 'İyi',
          hasBox: false,
          hasInvoice: false,
          invoiceDate: '',
          quantity: 1,
          images: []
        });
      } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">$title</h1>
            <p className="text-gray-600">Ürününüzü güvenle satın, en iyi fiyatı alın</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marka *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Marka adı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Model adı"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ürün hakkında detaylı bilgi verin..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kozmetik Durum</label>
                <select
                  name="cosmeticCondition"
                  value={formData.cosmeticCondition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Mükemmel">Mükemmel</option>
                  <option value="Çok İyi">Çok İyi</option>
                  <option value="İyi">İyi</option>
                  <option value="Orta">Orta</option>
                  <option value="Kötü">Kötü</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adet</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasBox"
                  checked={formData.hasBox}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Orijinal kutusu var</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasInvoice"
                  checked={formData.hasInvoice}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Faturası var</label>
              </div>
            </div>

            {formData.hasInvoice && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fatura Tarihi</label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Teklif Gönder'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Başarılı!</h3>
            <p className="text-gray-600 mb-6">Teklifiniz başarıyla gönderildi.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
EOF

    # Replace title placeholder
    sed -i '' "s/\$title/$title/g" "$file"
    
    # Replace function name
    local func_name=$(echo "$title" | sed 's/ //g' | sed 's/ı/i/g' | sed 's/ğ/g/g' | sed 's/ü/u/g' | sed 's/ş/s/g' | sed 's/ö/o/g' | sed 's/ç/c/g')
    sed -i '' "s/function Page/function ${func_name}Page/g" "$file"
}

# Fix all pages
fix_page "app/bize-sat/desktop/page.tsx" "Desktop Sat"
fix_page "app/bize-sat/gaming-wheel/page.tsx" "Gaming Wheel Sat"
fix_page "app/bize-sat/graphics-card/page.tsx" "Ekran Kartı Sat"
fix_page "app/bize-sat/headphones/page.tsx" "Kulaklık Sat"
fix_page "app/bize-sat/keyboard/page.tsx" "Klavye Sat"
fix_page "app/bize-sat/monitor/page.tsx" "Monitör Sat"
fix_page "app/bize-sat/mouse/page.tsx" "Mouse Sat"
fix_page "app/bize-sat/notebook/page.tsx" "Notebook Sat"
fix_page "app/bize-sat/processor/page.tsx" "İşlemci Sat"
fix_page "app/bize-sat/ram/page.tsx" "RAM Sat"
fix_page "app/bize-sat/sound-system/page.tsx" "Ses Sistemi Sat"
fix_page "app/bize-sat/ssd/page.tsx" "SSD Sat"
fix_page "app/bize-sat/steering-wheel/page.tsx" "Direksiyon Sat"
fix_page "app/bize-sat/tablet/page.tsx" "Tablet Sat"
fix_page "app/bize-sat/case/page.tsx" "Kasa Sat"
fix_page "app/bize-sat/audio-system/page.tsx" "Ses Sistemi Sat"

echo "All syntax errors fixed!" 