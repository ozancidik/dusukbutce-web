"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/register", label: "Kayıt Ol" },
  { href: "/login", label: "Giriş Yap" },
  { href: "/products", label: "Ürünler" },
  { href: "/cart", label: "Sepet" },
  { href: "/orders", label: "Siparişler" },
  { href: "/profile", label: "Profil" },
  { href: "/forgot-password", label: "Şifremi Unuttum" },
  { href: "/notifications", label: "Bildirimler" },
];

// Arama kategorileri
const searchCategories = [
  { name: "Dizüstü (Notebook)", path: "/bize-sat/notebook", keywords: ["laptop", "notebook", "dizüstü", "bilgisayar", "asus", "lenovo", "hp", "dell", "acer"] },
  { name: "Masaüstü (Kasa)", path: "/bize-sat/desktop", keywords: ["masaüstü", "kasa", "desktop", "pc", "bilgisayar", "gaming", "oyun"] },
  { name: "Ekran Kartı", path: "/bize-sat/graphics-card", keywords: ["ekran kartı", "gpu", "nvidia", "amd", "rtx", "gtx", "radeon", "graphics"] },
  { name: "İşlemci", path: "/bize-sat/processor", keywords: ["işlemci", "cpu", "intel", "amd", "ryzen", "core", "processor"] },
  { name: "RAM", path: "/bize-sat/ram", keywords: ["ram", "bellek", "memory", "ddr4", "ddr5", "8gb", "16gb", "32gb"] },
  { name: "SSD", path: "/bize-sat/ssd", keywords: ["ssd", "disk", "hdd", "depolama", "storage", "nvme", "sata"] },
  { name: "Soğutucu", path: "/bize-sat/cooler", keywords: ["soğutucu", "cooler", "fan", "ısı", "thermal", "cpu cooler"] },
  { name: "Boş Kasa", path: "/bize-sat/case", keywords: ["kasa", "case", "atx", "itx", "mid tower", "full tower"] },
  { name: "Monitör", path: "/bize-sat/monitor", keywords: ["monitör", "monitor", "ekran", "display", "ips", "tn", "va", "144hz", "4k"] },
  { name: "Klavye", path: "/bize-sat/keyboard", keywords: ["klavye", "keyboard", "mekanik", "mechanical", "rgb", "gaming"] },
  { name: "Mouse", path: "/bize-sat/mouse", keywords: ["mouse", "fare", "gaming", "wireless", "kablosuz", "rgb"] },
  { name: "Tablet", path: "/bize-sat/tablet", keywords: ["tablet", "ipad", "samsung", "huawei", "android", "ios"] },
  { name: "Kulaklık", path: "/bize-sat/headphones", keywords: ["kulaklık", "headphone", "headset", "gaming", "bluetooth", "kablosuz"] },
  { name: "Ses Sistemi", path: "/bize-sat/audio-system", keywords: ["ses sistemi", "speaker", "hoparlör", "subwoofer", "audio", "sound"] },
  { name: "Oyuncu Direksiyonu", path: "/bize-sat/gaming-wheel", keywords: ["direksiyon", "steering wheel", "gaming", "racing", "simulator"] },
];

const sliderItems = [
  {
    title: "iPhone 13 128 GB Siyah",
    price: "33.999 TL",
    img: "/logo.png",
  },
  {
    title: "Asus Vivobook 15",
    price: "12.999 TL",
    img: "/logo.png",
  },
  {
    title: "Samsung 75\" Neo QLED",
    price: "69.959 TL",
    img: "/logo.png",
  },
  {
    title: "Lenovo Tab Plus 2",
    price: "11.949 TL",
    img: "/logo.png",
  },
  {
    title: "Monster Abra A5",
    price: "29.999 TL",
    img: "/logo.png",
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{name: string, path: string, keywords: string[]}>>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderItems.length);
    }, 3000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Arama fonksiyonu
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = searchCategories.filter(category => {
      const searchLower = searchTerm.toLowerCase();
      return category.name.toLowerCase().includes(searchLower) ||
             category.keywords.some(keyword => 
               keyword.toLowerCase().includes(searchLower)
             );
    });

    setSearchResults(results);
    setShowResults(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  // Arama sonuçlarını kapat
  const closeSearchResults = () => {
    setShowResults(false);
  };

  return (
    <div
      onClick={closeSearchResults}
      style={{
        width: "100%",
        maxWidth: "1600px",
        minWidth: "320px",
        minHeight: "90vh",
        margin: isMobile ? "10px auto" : "20px auto",
        padding: isMobile ? "12px" : "16px",
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
        borderRadius: isMobile ? "12px" : "16px",
        boxShadow: "0 4px 32px #0001",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo ve başlık */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        marginBottom: "24px",
        textAlign: "center"
      }}>
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={isMobile ? 120 : 160} 
          height={isMobile ? 45 : 60} 
          style={{ objectFit: "contain" }} 
        />
        <h1 style={{ 
          margin: isMobile ? "12px 0 0 0" : "16px 0 0 0", 
          color: "#2563eb",
          fontSize: isMobile ? "20px" : "28px",
        }}>
          Düşük Bütçe, Yüksek Performans
        </h1>
        <p style={{ 
          color: "#64748b", 
          marginTop: "8px",
          fontSize: isMobile ? "14px" : "16px",
        }}>
          En uygun fiyatlı ürünleri keşfet!
        </p>
      </div>

      {/* Search alanı */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "24px",
          gap: isMobile ? "12px" : "8px",
          width: "100%",
          maxWidth: "400px",
          position: "relative",
        }}
      >
        <input
          type="text"
          placeholder="Ürün, kategori veya marka ara..."
          value={search}
          onChange={handleSearchChange}
          style={{
            padding: isMobile ? "14px" : "12px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            width: "100%",
            fontSize: "16px",
            boxShadow: "0 1px 4px #0001",
          }}
        />
        
        {/* Arama sonuçları */}
        {showResults && searchResults.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              boxShadow: "0 4px 16px #0002",
              zIndex: 1000,
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {searchResults.map((result, index) => (
              <Link key={index} href={result.path}>
                <div
                  style={{
                    padding: "12px 16px",
                    borderBottom: index < searchResults.length - 1 ? "1px solid #e2e8f0" : "none",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  <div style={{ fontWeight: "600", color: "#2563eb", marginBottom: "4px" }}>
                    {result.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {result.keywords.slice(0, 3).join(", ")}...
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {showResults && searchResults.length === 0 && search.trim() && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "white",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              boxShadow: "0 4px 16px #0002",
              zIndex: 1000,
              padding: "16px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            Sonuç bulunamadı
          </div>
        )}
      </div>

      {/* BİZE SAT butonu */}
      <Link href="/bize-sat" style={{ width: "100%", maxWidth: "400px" }}>
        <button
          style={{
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: isMobile ? "20px 0" : "24px 0",
            fontWeight: "800",
            fontSize: isMobile ? "24px" : "32px",
            width: "100%",
            marginBottom: "32px",
            cursor: "pointer",
            boxShadow: "0 4px 16px #0001",
            letterSpacing: isMobile ? "1px" : "2px",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          BİZE SAT
        </button>
      </Link>

      {/* Buton şeklinde linkler */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(120px, 1fr))",
          gap: isMobile ? "10px" : "12px",
          justifyContent: "center",
          marginBottom: "32px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <button
              style={{
                background: "#fff",
                color: "#2563eb",
                border: "1px solid #2563eb",
                borderRadius: "8px",
                padding: isMobile ? "8px 6px" : "10px 12px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: isMobile ? "12px" : "14px",
                boxShadow: "0 2px 8px #0001",
                transition: "background 0.2s, color 0.2s",
                width: "100%",
              }}
            >
              {link.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Slider */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: isMobile ? "280px" : "320px",
        width: "100%",
        maxWidth: isMobile ? "320px" : "400px",
      }}>
        <div
          style={{
            width: "100%",
            height: isMobile ? "280px" : "320px",
            position: "relative",
            overflow: "hidden",
            borderRadius: isMobile ? "12px" : "16px",
            boxShadow: "0 4px 24px #0002",
            background: "#fff",
          }}
        >
          {sliderItems.map((item, idx) => (
            <div
              key={item.title}
              style={{
                position: "absolute",
                top: 0,
                left: idx === current ? 0 : "100%",
                width: "100%",
                height: "100%",
                opacity: idx === current ? 1 : 0,
                transition: "all 0.6s cubic-bezier(.4,0,.2,1)",
                zIndex: idx === current ? 2 : 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                padding: isMobile ? "16px" : "20px",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{ 
                  width: isMobile ? "140px" : "180px", 
                  height: isMobile ? "140px" : "180px", 
                  objectFit: "contain", 
                  marginBottom: isMobile ? "12px" : "16px", 
                  borderRadius: "12px",
                }} 
              />
              <div style={{ 
                fontSize: isMobile ? "16px" : "20px", 
                fontWeight: "700", 
                marginBottom: isMobile ? "6px" : "8px",
                textAlign: "center",
              }}>
                {item.title}
              </div>
              <div style={{ 
                fontSize: isMobile ? "16px" : "18px", 
                color: "#2563eb", 
                fontWeight: "600",
              }}>
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider altı noktalar */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "8px", 
        marginTop: "16px" 
      }}>
        {sliderItems.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: isMobile ? "10px" : "12px",
              height: isMobile ? "10px" : "12px",
              borderRadius: "50%",
              background: idx === current ? "#2563eb" : "#cbd5e1",
              display: "inline-block",
              transition: "background 0.2s",
              cursor: "pointer",
            }}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>

      {/* Footer */}
      <footer style={{ 
        marginTop: isMobile ? "24px" : "40px", 
        textAlign: "center", 
        color: "#64748b", 
        fontSize: isMobile ? "12px" : "14px",
      }}>
        © {new Date().getFullYear()} Düşük Bütçe. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
