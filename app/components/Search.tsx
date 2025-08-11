'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  url: string;
  type?: 'product' | 'bizden-al' | 'bize-sat';
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock data - gerçek uygulamada API'den gelecek
  const mockProducts: SearchResult[] = [
    {
      id: '1',
      title: 'iPhone 13 128 GB Siyah',
      category: 'Telefon',
      price: 33999,
      image: '/logo.png',
      url: '/products/iphone-13'
    },
    {
      id: '2',
      title: 'Asus Vivobook 15',
      category: 'Laptop',
      price: 12999,
      image: '/logo.png',
      url: '/products/asus-vivobook'
    },
    {
      id: '3',
      title: 'Samsung 75" Neo QLED',
      category: 'TV',
      price: 69959,
      image: '/logo.png',
      url: '/products/samsung-tv'
    },
    {
      id: '4',
      title: 'Lenovo Tab Plus 2',
      category: 'Tablet',
      price: 11949,
      image: '/logo.png',
      url: '/products/lenovo-tab'
    },
    {
      id: '5',
      title: 'Monster Abra A5',
      category: 'Laptop',
      price: 29999,
      image: '/logo.png',
      url: '/products/monster-abra'
    }
  ];

  // Bize Sat ve Bizden Al kategorileri
  const bizdenAlCategories = [
    { name: 'Dizüstü Bilgisayar', path: '/bizden-al', icon: '💻' },
    { name: 'Masaüstü Bilgisayar', path: '/bizden-al', icon: '🖥️' },
    { name: 'İşlemci', path: '/bizden-al', icon: '⚡' },
    { name: 'Ekran Kartı', path: '/bizden-al', icon: '🎮' },
    { name: 'RAM', path: '/bizden-al', icon: '🧠' },
    { name: 'SSD', path: '/bizden-al', icon: '💾' }
  ];

  const bizeSatCategories = [
    { name: 'Dizüstü Bilgisayar', path: '/bize-sat/notebook', icon: '💻' },
    { name: 'Masaüstü Bilgisayar', path: '/bize-sat/desktop', icon: '🖥️' },
    { name: 'İşlemci', path: '/bize-sat/processor', icon: '⚡' },
    { name: 'Ekran Kartı', path: '/bize-sat/graphics-card', icon: '🎮' },
    { name: 'RAM', path: '/bize-sat/ram', icon: '🧠' },
    { name: 'SSD', path: '/bize-sat/ssd', icon: '💾' }
  ];

  // Search functionality
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Ürün araması
      const filteredProducts = mockProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Kategori araması
      const filteredBizdenAl = bizdenAlCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredBizeSat = bizeSatCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Sonuçları birleştir
      const allResults: SearchResult[] = [
        ...filteredProducts.map(product => ({
          ...product,
          type: 'product' as const
        })),
        ...filteredBizdenAl.map(category => ({
          id: `bizden-al-${category.name}`,
          title: `${category.name} (Bizden Al)`,
          category: 'Kategori',
          price: 0,
          image: category.icon,
          url: category.path,
          type: 'bizden-al' as const
        })),
        ...filteredBizeSat.map(category => ({
          id: `bize-sat-${category.name}`,
          title: `${category.name} (Bize Sat)`,
          category: 'Kategori',
          price: 0,
          image: category.icon,
          url: category.path,
          type: 'bize-sat' as const
        }))
      ];
      
      setResults(allResults);
      setIsOpen(true);
      setLoading(false);
    }, 300);
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Ürün, kategori veya marka ara..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            padding: '12px 16px',
            paddingRight: '40px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '16px',
            background: 'white',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            outline: 'none'
          }}
        />
        
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#64748b'
        }}>
          {loading ? '⏳' : '🔍'}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          maxHeight: '400px',
          overflowY: 'auto',
          marginTop: '4px'
        }}>
          {results.map((result) => (
            <a
              key={result.id}
              href={result.url}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                textDecoration: 'none',
                color: 'inherit',
                borderBottom: '1px solid #f1f5f9',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                borderRadius: '4px',
                fontSize: '24px'
              }}>
                {result.type === 'product' ? (
                  <img
                    src={result.image}
                    alt={result.title}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  result.image
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '2px'
                }}>
                  {result.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  {result.category}
                </div>
              </div>
              <div style={{
                fontWeight: '700',
                fontSize: '14px',
                color: result.type === 'bizden-al' ? '#dc2626' : 
                       result.type === 'bize-sat' ? '#22c55e' : '#2563eb'
              }}>
                {result.type === 'product' ? 
                  `${result.price.toLocaleString('tr-TR')} ₺` : 
                  result.type === 'bizden-al' ? 'Bizden Al' : 'Bize Sat'
                }
              </div>
            </a>
          ))}
          
          {/* View All Results */}
          <div style={{
            padding: '12px 16px',
            textAlign: 'center',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc'
          }}>
            <a
              href={`/search?q=${encodeURIComponent(query)}`}
              style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Tüm sonuçları görüntüle ({results.length})
            </a>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          padding: '20px',
          textAlign: 'center',
          marginTop: '4px'
        }}>
          <div style={{ color: '#64748b', marginBottom: '8px' }}>
            "🔍"
          </div>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>
            Sonuç bulunamadı
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            "{query}" için ürün bulunamadı
          </div>
        </div>
      )}
    </div>
  );
} 