"use client";
import React from "react";
import Link from "next/link";

interface Brand {
  name: string;
  logo: string;
  description: string;
  category: string;
  website?: string;
}

const brands: Brand[] = [
  {
    name: "Apple",
    logo: "🍎",
    description: "iPhone, iPad, MacBook ve diğer Apple ürünleri",
    category: "mobil",
    website: "https://apple.com"
  },
  {
    name: "Samsung",
    logo: "📱",
    description: "Android telefonlar, tabletler ve akıllı saatler",
    category: "mobil",
    website: "https://samsung.com"
  },
  {
    name: "ASUS",
    logo: "💻",
    description: "Notebook, masaüstü bilgisayar ve anakartlar",
    category: "bilgisayar",
    website: "https://asus.com"
  },
  {
    name: "MSI",
    logo: "🎮",
    description: "Gaming notebook, masaüstü ve ekran kartları",
    category: "bilgisayar",
    website: "https://msi.com"
  },
  {
    name: "Lenovo",
    logo: "💻",
    description: "İş ve ev kullanımı için notebook ve masaüstü",
    category: "bilgisayar",
    website: "https://lenovo.com"
  },
  {
    name: "HP",
    logo: "🖥️",
    description: "Yazıcı, notebook ve masaüstü bilgisayarlar",
    category: "bilgisayar",
    website: "https://hp.com"
  },
  {
    name: "Dell",
    logo: "💻",
    description: "İş odaklı notebook ve masaüstü çözümleri",
    category: "bilgisayar",
    website: "https://dell.com"
  },
  {
    name: "Intel",
    logo: "🔧",
    description: "İşlemci ve anakart teknolojileri",
    category: "donanim",
    website: "https://intel.com"
  },
  {
    name: "AMD",
    logo: "⚡",
    description: "İşlemci ve ekran kartı çözümleri",
    category: "donanim",
    website: "https://amd.com"
  },
  {
    name: "NVIDIA",
    logo: "🎯",
    description: "Gaming ve profesyonel ekran kartları",
    category: "donanim",
    website: "https://nvidia.com"
  },
  {
    name: "Corsair",
    logo: "💾",
    description: "RAM, SSD ve gaming aksesuarları",
    category: "donanim",
    website: "https://corsair.com"
  },
  {
    name: "Kingston",
    logo: "💿",
    description: "RAM, SSD ve USB bellek çözümleri",
    category: "donanim",
    website: "https://kingston.com"
  },
  {
    name: "Logitech",
    logo: "🖱️",
    description: "Mouse, klavye ve ses sistemleri",
    category: "aksesuar",
    website: "https://logitech.com"
  },
  {
    name: "Razer",
    logo: "🐍",
    description: "Gaming mouse, klavye ve kulaklıklar",
    category: "aksesuar",
    website: "https://razer.com"
  },
  {
    name: "SteelSeries",
    logo: "🎧",
    description: "Gaming kulaklık ve mouse pad",
    category: "aksesuar",
    website: "https://steelseries.com"
  },
  {
    name: "LG",
    logo: "📺",
    description: "Monitör, TV ve ev elektroniği",
    category: "ekran",
    website: "https://lg.com"
  },
  {
    name: "AOC",
    logo: "🖥️",
    description: "Gaming ve iş monitörleri",
    category: "ekran",
    website: "https://aoc.com"
  },
  {
    name: "BenQ",
    logo: "👁️",
    description: "Gaming ve profesyonel monitörler",
    category: "ekran",
    website: "https://benq.com"
  }
];

const categories = [
  { id: "all", name: "Tümü", icon: "📋" },
  { id: "mobil", name: "Mobil", icon: "📱" },
  { id: "bilgisayar", name: "Bilgisayar", icon: "💻" },
  { id: "donanim", name: "Donanım", icon: "🔧" },
  { id: "aksesuar", name: "Aksesuar", icon: "🖱️" },
  { id: "ekran", name: "Ekran", icon: "🖥️" }
];

export default function BrandsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredBrands = brands.filter(brand => {
    const matchesCategory = selectedCategory === "all" || brand.category === selectedCategory;
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
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
            Markalar
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Güvenilir markaların kaliteli ürünlerini keşfedin
          </p>
        </div>

        {/* Arama ve Filtreler */}
        <div style={{
          marginBottom: '32px',
          padding: '24px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          {/* Arama Kutusu */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Marka ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          {/* Kategori Filtreleri */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 16px 0',
              textAlign: 'center'
            }}>
              🔍 Kategorilere Göre Filtrele
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id ? '#2563eb' : 'white',
                    color: selectedCategory === category.id ? 'white' : '#374151',
                    border: `1px solid ${selectedCategory === category.id ? '#2563eb' : '#d1d5db'}`,
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Marka Sayısı */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '16px',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #0ea5e9'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#0c4a6e',
            margin: 0,
            fontWeight: '500'
          }}>
            📊 {filteredBrands.length} marka bulundu
          </p>
        </div>

        {/* Markalar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {filteredBrands.map((brand, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Marka Logo ve İsmi */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
                gap: '12px'
              }}>
                <div style={{
                  fontSize: '32px',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  {brand.logo}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    {brand.name}
                  </h3>
                  <span style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    background: '#e5e7eb',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    fontWeight: '500'
                  }}>
                    {brand.category}
                  </span>
                </div>
              </div>

              {/* Açıklama */}
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 16px 0',
                lineHeight: '1.5'
              }}>
                {brand.description}
              </p>

              {/* Website Link */}
              {brand.website && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#2563eb';
                  }}
                >
                  🌐 Resmi Site
                  <span style={{ fontSize: '12px' }}>↗</span>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Boş Durum */}
        {filteredBrands.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 12px 0'
            }}>
              Marka bulunamadı
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: 0
            }}>
              Arama kriterlerinizi değiştirerek tekrar deneyin
            </p>
          </div>
        )}

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
