"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  specs: Record<string, string>;
  image: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "ASUS ROG Strix G15",
    category: "Gaming Laptop",
    price: 25999,
    brand: "ASUS",
    image: "💻",
    specs: {
      "İşlemci": "AMD Ryzen 7 5800H",
      "RAM": "16GB DDR4",
      "Depolama": "512GB SSD",
      "Ekran Kartı": "RTX 3060 6GB",
      "Ekran": "15.6\" 144Hz",
      "İşletim Sistemi": "Windows 11"
    }
  },
  {
    id: 2,
    name: "MSI Katana GF66",
    category: "Gaming Laptop",
    price: 28999,
    brand: "MSI",
    image: "🎮",
    specs: {
      "İşlemci": "Intel i7-12700H",
      "RAM": "16GB DDR4",
      "Depolama": "1TB SSD",
      "Ekran Kartı": "RTX 3070 8GB",
      "Ekran": "15.6\" 144Hz",
      "İşletim Sistemi": "Windows 11"
    }
  },
  {
    id: 3,
    name: "Lenovo Legion 5",
    category: "Gaming Laptop",
    price: 23999,
    brand: "Lenovo",
    image: "💻",
    specs: {
      "İşlemci": "AMD Ryzen 5 5600H",
      "RAM": "8GB DDR4",
      "Depolama": "256GB SSD",
      "Ekran Kartı": "GTX 1650 4GB",
      "Ekran": "15.6\" 120Hz",
      "İşletim Sistemi": "Windows 11"
    }
  }
];

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showProductSelector, setShowProductSelector] = useState(false);

  const addToComparison = (product: Product) => {
    if (selectedProducts.length >= 4) {
      alert('En fazla 4 ürün karşılaştırabilirsiniz!');
      return;
    }
    if (selectedProducts.find(p => p.id === product.id)) {
      alert('Bu ürün zaten karşılaştırma listesinde!');
      return;
    }
    setSelectedProducts([...selectedProducts, product]);
  };

  const removeFromComparison = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setSelectedProducts([]);
  };

  const getAllSpecs = () => {
    const specs = new Set<string>();
    selectedProducts.forEach(product => {
      Object.keys(product.specs).forEach(spec => specs.add(spec));
    });
    return Array.from(specs);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Ürün Karşılaştırma
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Ürünleri detaylı olarak karşılaştırın ve en uygun olanı seçin
          </p>
        </div>

        {/* Karşılaştırma Kontrolleri */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 8px 0'
            }}>
              📊 Karşılaştırma Listesi
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              {selectedProducts.length}/4 ürün seçildi
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowProductSelector(!showProductSelector)}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {showProductSelector ? '✕ Kapat' : '➕ Ürün Ekle'}
            </button>
            
            {selectedProducts.length > 0 && (
              <button
                onClick={clearComparison}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                🗑️ Temizle
              </button>
            )}
          </div>
        </div>

        {/* Ürün Seçici */}
        {showProductSelector && (
          <div style={{
            marginBottom: '32px',
            padding: '24px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0'
            }}>
              🔍 Karşılaştırmak İstediğiniz Ürünleri Seçin
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {sampleProducts.map(product => (
                <div
                  key={product.id}
                  style={{
                    padding: '20px',
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div style={{ fontSize: '32px' }}>{product.image}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: '0 0 4px 0'
                    }}>
                      {product.name}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '0 0 8px 0'
                    }}>
                      {product.brand} • {product.category}
                    </p>
                    <p style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#059669',
                      margin: 0
                    }}>
                      {product.price.toLocaleString('tr-TR')} ₺
                    </p>
                  </div>
                  
                  {selectedProducts.find(p => p.id === product.id) ? (
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      style={{
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Çıkar
                    </button>
                  ) : (
                    <button
                      onClick={() => addToComparison(product)}
                      style={{
                        background: '#059669',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Ekle
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Karşılaştırma Tablosu */}
        {selectedProducts.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
            }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{
                    padding: '20px',
                    textAlign: 'left',
                    borderBottom: '1px solid #e5e7eb',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    minWidth: '200px'
                  }}>
                    Özellik
                  </th>
                  {selectedProducts.map(product => (
                    <th key={product.id} style={{
                      padding: '20px',
                      textAlign: 'center',
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#374151',
                      minWidth: '250px'
                    }}>
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>{product.image}</div>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1f2937',
                          margin: '0 0 4px 0'
                        }}>
                          {product.name}
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          margin: '0 0 8px 0'
                        }}>
                          {product.brand}
                        </p>
                        <p style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#059669',
                          margin: '0 0 8px 0'
                        }}>
                          {product.price.toLocaleString('tr-TR')} ₺
                        </p>
                        <button
                          onClick={() => removeFromComparison(product.id)}
                          style={{
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          ✕ Çıkar
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getAllSpecs().map(spec => (
                  <tr key={spec} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{
                      padding: '16px 20px',
                      background: '#f8fafc',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      borderRight: '1px solid #e5e7eb'
                    }}>
                      {spec}
                    </td>
                    {selectedProducts.map(product => (
                      <td key={product.id} style={{
                        padding: '16px 20px',
                        textAlign: 'center',
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        {product.specs[spec] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Boş Durum */
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '2px dashed #d1d5db'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔍</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 16px 0'
            }}>
              Henüz ürün seçilmedi
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0 0 24px 0',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Karşılaştırmak istediğiniz ürünleri seçmek için "Ürün Ekle" butonuna tıklayın
            </p>
            <button
              onClick={() => setShowProductSelector(true)}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              ➕ Ürün Ekle
            </button>
          </div>
        )}

        {/* Yardım */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid #0ea5e9',
          marginTop: '32px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#0369a1',
            margin: '0 0 12px 0'
          }}>
            💡 Karşılaştırma Hakkında
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#0c4a6e',
            margin: '0 0 20px 0'
          }}>
            En fazla 4 ürünü aynı anda karşılaştırabilirsiniz. Ürün özelliklerini detaylı olarak inceleyerek 
            size en uygun olanı seçebilirsiniz.
          </p>
        </div>

        {/* Geri Dön Butonu */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              ← Anasayfaya Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
