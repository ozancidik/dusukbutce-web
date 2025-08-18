"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";

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

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{name: string, path: string, keywords: string[]}>>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Kullanıcı giriş durumunu kontrol et
  useEffect(() => {
    const checkLoginStatus = () => {
      // Önce localStorage'dan kontrol et, yoksa sessionStorage'dan
      let userLoggedIn = localStorage.getItem("userLoggedIn");
      let userName = localStorage.getItem("userName");
      let loginTime = localStorage.getItem("loginTime");
      let adminLoggedIn = localStorage.getItem("adminLoggedIn");
      let adminEmail = localStorage.getItem("adminEmail");
      
      // localStorage'da yoksa sessionStorage'dan al
      if (!userLoggedIn && !adminLoggedIn) {
        userLoggedIn = sessionStorage.getItem("userLoggedIn");
        userName = sessionStorage.getItem("userName");
        loginTime = sessionStorage.getItem("loginTime");
        adminLoggedIn = sessionStorage.getItem("adminLoggedIn");
        adminEmail = sessionStorage.getItem("adminEmail");
      }
      
      // Timeout kontrolü (60 dakika = 3600000 ms)
      const TIMEOUT_DURATION = 60 * 60 * 1000; // 60 dakika
      const isExpired = loginTime && (Date.now() - parseInt(loginTime)) > TIMEOUT_DURATION;
      
      if (isExpired) {
        // Session süresi dolmuş, logout yap
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("loginTime");
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        sessionStorage.removeItem("userLoggedIn");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("loginTime");
        sessionStorage.removeItem("adminLoggedIn");
        sessionStorage.removeItem("adminEmail");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        
        setIsLoggedIn(false);
        setUserName("");
      } else {
        // Hem kullanıcı hem admin giriş durumunu kontrol et
        const isUserLoggedIn = userLoggedIn === "true";
        const isAdminLoggedIn = adminLoggedIn === "true";
        
        setIsLoggedIn(isUserLoggedIn || isAdminLoggedIn);
        setAdminLoggedIn(isAdminLoggedIn);
        
        if (isAdminLoggedIn) {
          setUserName("Admin");
        } else if (isUserLoggedIn) {
          setUserName(userName || "");
        } else {
          setUserName("");
        }
      }
    };

    checkLoginStatus();
    
    // Her 2 saniyede bir kontrol et (Google OAuth için)
    const interval = setInterval(checkLoginStatus, 2000);
    
    // localStorage değişikliklerini dinle
    window.addEventListener('storage', checkLoginStatus);
    
    // Google OAuth callback mesajlarını dinle
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
        // Hemen state'i güncelle
        setIsLoggedIn(true);
        setUserName(event.data.user.name || "");
      }
    };

    // Logout mesajlarını dinle
    const handleLogoutMessage = () => {
      setIsLoggedIn(false);
      setUserName("");
    };

    // Custom logout event listener
    window.addEventListener('logout', handleLogoutMessage);

    window.addEventListener('message', handleMessage);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('logout', handleLogoutMessage);
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
    <header
      onClick={closeSearchResults}
      style={{
        position: "static",
        zIndex: 1000,
        background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: isMobile ? "12px 16px" : "16px 24px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: isMobile ? "12px" : "24px",
        }}
      >
        {/* Üst Satır - Logo ve Arama Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "12px" : "24px",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Image 
              src="/logo.png" 
              alt="Düşük Bütçe" 
              width={isMobile ? 100 : 120} 
              height={isMobile ? 38 : 45} 
              priority
              style={{ 
                objectFit: "contain",
                cursor: "pointer",
                transition: "transform 0.2s",
                width: "auto",
                height: "auto"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </Link>

          {/* Arama Bar */}
          <div
            style={{
              flex: 1,
              maxWidth: isMobile ? "none" : "1200px",
              position: "relative",
            }}
          >
            <Search />
          </div>
        </div>

        {/* Alt Satır - Butonlar (sadece mobilde görünür) */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              width: "100%",
            }}
          >
            {/* Giriş Yap / Kullanıcı Profili Butonu */}
            {isLoggedIn ? (
              <>
                <Link href="/tekliflerim" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#d97706";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f59e0b";
                    }}
                  >
                    💰 Tekliflerim
                  </button>
                </Link>
                <Link href={adminLoggedIn === "true" ? "/admin" : "/profile"} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: adminLoggedIn === "true" ? "#7c3aed" : "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = adminLoggedIn === "true" ? "#6d28d9" : "#059669";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = adminLoggedIn === "true" ? "#7c3aed" : "#10b981";
                    }}
                  >
                    {adminLoggedIn === "true" ? "⚙️" : "👤"} {userName || (adminLoggedIn === "true" ? "Admin" : "Profil")}
                  </button>
                </Link>
              </>
            ) : (
              <Link href="/login" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  👤 Giriş Yap
                </button>
              </Link>
            )}

            {/* İlanlar Butonu */}
            <Link href="/satilik-ilanlar" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap",
                  display: "flex",
                    alignItems: "center",
                    gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#047857";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#059669";
                }}
              >
                📋 İlanlar
              </button>
            </Link>

            {/* Sepet Butonu */}
            <Link href="/cart" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px",
                  transition: "background 0.2s",
                  whiteSpace: "nowrap",
                  display: "flex",
                    alignItems: "center",
                    gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1d4ed8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#2563eb";
                }}
              >
                🛒 Sepet
              </button>
            </Link>
          </div>
        )}

        {/* Sağ taraftaki butonlar (sadece desktop'ta görünür) */}
        {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "6px" : "16px",
            flexShrink: 0,
          }}
        >
          {/* Giriş Yap / Kullanıcı Profili */}
          {isLoggedIn ? (
            <>
              <Link href="/tekliflerim" style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: isMobile ? "6px 8px" : "10px 16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: isMobile ? "12px" : "14px",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "4px" : "6px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#d97706";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f59e0b";
                  }}
                >
                  💰 Tekliflerim
                </button>
              </Link>
              <Link href={adminLoggedIn === "true" ? "/admin" : "/profile"} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    background: adminLoggedIn === "true" ? "#7c3aed" : "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: isMobile ? "6px 8px" : "10px 16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: isMobile ? "12px" : "14px",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "4px" : "6px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = adminLoggedIn === "true" ? "#6d28d9" : "#059669";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = adminLoggedIn === "true" ? "#7c3aed" : "#10b981";
                  }}
                >
                  {adminLoggedIn === "true" ? "⚙️" : "👤"} {userName || (adminLoggedIn === "true" ? "Admin" : "Profil")}
                </button>
              </Link>
            </>
          ) : (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "transparent",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "6px",
                  padding: isMobile ? "6px 8px" : "10px 16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "4px" : "6px",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
              >
                👤 Giriş Yap
              </button>
            </Link>
          )}

          {/* İlanlar */}
          <Link href="/satilik-ilanlar" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#059669",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: isMobile ? "6px 8px" : "10px 16px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: isMobile ? "12px" : "14px",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "4px" : "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#047857";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#059669";
              }}
            >
              📋 İlanlar
            </button>
          </Link>

          {/* Sepet */}
          <Link href="/sepet" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: isMobile ? "6px 8px" : "10px 16px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: isMobile ? "12px" : "14px",
                transition: "background 0.2s",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "4px" : "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2563eb";
              }}
            >
              🛒 Sepet
            </button>
          </Link>
        </div>
        )}
      </div>
    </header>
  );
} 