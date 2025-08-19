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
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // iPad Mini (768x1024) ve Surface Duo (540x720) için özel kontrol
      const isTablet = (width === 768 && height === 1024) || (width === 540 && height === 720);
      
      // 768px ve altı veya tablet boyutları için mobile layout
      setIsMobile(width <= 768 || isTablet);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Sadece kullanıcı etkileşimde bulunmadığında otomatik geçiş
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrent((prev) => (prev + 1) % sliderItems.length);
      }
    }, 3000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isDragging]);

  // iPhone SE için özel kontrol
  const isIPhoneSE = isMobile && window.innerWidth === 375 && window.innerHeight === 667;


  // Slider fonksiyonları
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
    setDragOffset(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50; // Minimum kaydırma mesafesi
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Sağa kaydırma - önceki slide
        setCurrent((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
      } else {
        // Sola kaydırma - sonraki slide
        setCurrent((prev) => (prev + 1) % sliderItems.length);
      }
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
    setDragOffset(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 30; // Mobil için daha küçük threshold
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Sağa kaydırma - önceki slide
        setCurrent((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
      } else {
        // Sola kaydırma - sonraki slide
        setCurrent((prev) => (prev + 1) % sliderItems.length);
      }
    }
    setDragOffset(0);
  };

  // Slider'ı sıfırla
  const resetSlider = () => {
    setDragOffset(0);
    setIsDragging(false);
  };

  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      
      {/* Ana İçerik */}
      <div
        style={{
          width: "100%",
          maxWidth: "1600px",
          minWidth: "320px",
          minHeight: isIPhoneSE ? "100vh" : "90vh",
          margin: isIPhoneSE ? "0 auto" : (isMobile ? "10px auto" : "20px auto"),
          paddingTop: isIPhoneSE ? "0" : (isMobile ? "12px" : "16px"),
          paddingRight: isIPhoneSE ? "0" : (isMobile ? "12px" : "16px"),
          paddingBottom: isIPhoneSE ? "0" : (isMobile ? "12px" : "16px"),
          paddingLeft: isIPhoneSE ? "0" : (isMobile ? "12px" : "16px"),
          fontFamily: "sans-serif",
          background: isIPhoneSE ? "transparent" : "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)",
          borderRadius: isIPhoneSE ? "0" : (isMobile ? "12px" : "16px"),
          boxShadow: isIPhoneSE ? "none" : "0 4px 32px #0001",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: isIPhoneSE ? "flex-start" : "center"
        }}
      >


        {/* Ana başlık */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          marginTop: isIPhoneSE ? "0" : (isMobile ? "10px" : "0"),
          marginBottom: isIPhoneSE ? "0" : "32px",
          textAlign: "center",
          position: "relative",
          zIndex: 9999,
          backgroundColor: isIPhoneSE ? "transparent" : (isMobile ? "rgba(255,255,255,0.9)" : "transparent"),
          padding: isIPhoneSE ? "0" : (isMobile ? "10px" : "0"),
          borderRadius: isIPhoneSE ? "0" : (isMobile ? "8px" : "0"),
          width: isIPhoneSE ? "100%" : "auto",
          border: isIPhoneSE ? "none" : "none",
          boxShadow: isIPhoneSE ? "none" : "none"
        }}>
          
          {!isIPhoneSE && (
            <h1 style={{ 
              margin: 0, 
              color: "#2563eb",
              fontSize: isMobile ? "20px" : "32px",
              fontWeight: "700",
              lineHeight: isMobile ? "1.2" : "1.1",
              position: "relative",
              zIndex: 9999,
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              backgroundColor: isMobile ? "rgba(255,255,255,0.8)" : "transparent",
              padding: isMobile ? "5px 10px" : "0",
              borderRadius: isMobile ? "4px" : "0",
              border: isMobile ? "1px solid #2563eb" : "none",
              marginTop: "0",
              marginBottom: "0",
              width: "auto"
            }}>
              {isMobile ? (
                <>
                  <div>Düşük Bütçe,</div>
                  <div>Yüksek Performans</div>
                </>
              ) : (
                "Düşük Bütçe, Yüksek Performans"
              )}
            </h1>
          )}
        <p style={{ 
          color: "#64748b", 
          marginTop: "12px",
          fontSize: isMobile ? "16px" : "18px",
        }}>
          En uygun fiyatlı ürünleri keşfet!
        </p>
      </div>



      {/* Butonlar yan yana */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "16px" : "24px",
        width: "100%",
        maxWidth: isMobile ? "400px" : "800px",
        justifyContent: "center",
        alignItems: "stretch",
        marginBottom: "32px",
        margin: "0 auto 32px auto"
      }}>
        {/* BİZE SAT butonu */}
        <Link href="/bize-sat" style={{ flex: 1, maxWidth: isMobile ? "100%" : "350px" }}>
          <button
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: isMobile ? "20px 0" : "20px 0",
              fontWeight: "800",
              fontSize: isMobile ? "20px" : "24px",
              width: "100%",
              cursor: "pointer",
              boxShadow: "0 4px 16px #0001",
              letterSpacing: isMobile ? "1px" : "2px",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            BİZE SAT
          </button>
        </Link>

        {/* SATILIK İLANLAR butonu */}
        <Link href="/satilik-ilanlar" style={{ flex: 1, maxWidth: isMobile ? "100%" : "350px" }}>
          <button
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: isMobile ? "20px 0" : "20px 0",
              fontWeight: "800",
              fontSize: isMobile ? "20px" : "24px",
              width: "100%",
              cursor: "pointer",
              boxShadow: "0 4px 16px #0001",
              letterSpacing: isMobile ? "1px" : "2px",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            SATILIK İLANLAR
          </button>
        </Link>
      </div>

      {/* Hızlı Teslimat ve Anında Ödeme Kutucukları */}
      <div style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "16px" : "24px",
        width: "100%",
        maxWidth: isMobile ? "400px" : "800px",
        justifyContent: "center",
        alignItems: "stretch",
        marginBottom: "32px",
        margin: "0 auto 32px auto"
      }}>
        {/* Hızlı Teslimat Bilgisi */}
        <div style={{
          flex: 1,
          textAlign: "center",
          padding: isMobile ? "16px" : "20px",
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          borderRadius: "12px",
          border: "2px solid #bbf7d0",
          boxShadow: "0 4px 12px rgba(34, 197, 94, 0.15)",
          maxWidth: isMobile ? "100%" : "350px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "8px"
          }}>
            <span style={{ fontSize: "24px" }}>🚚</span>
            <h3 style={{
              margin: 0,
              color: "#059669",
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "700"
            }}>
              Hızlı Teslimat
            </h3>
          </div>
          <p style={{
            margin: 0,
            color: "#047857",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "600",
            lineHeight: "1.4"
          }}>
            İstanbul içi ürününü aynı gün gelip teslim alalım
          </p>
        </div>

        {/* Anında Ödeme Bilgisi */}
        <div style={{
          flex: 1,
          textAlign: "center",
          padding: isMobile ? "16px" : "20px",
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          borderRadius: "12px",
          border: "2px solid #fbbf24",
          boxShadow: "0 4px 12px rgba(251, 191, 36, 0.15)",
          maxWidth: isMobile ? "100%" : "350px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "8px"
          }}>
            <span style={{ fontSize: "24px" }}>💰</span>
            <h3 style={{
              margin: 0,
              color: "#d97706",
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "700"
            }}>
              Anında Ödeme
            </h3>
          </div>
          <p style={{
            margin: 0,
            color: "#b45309",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "600",
            lineHeight: "1.4"
          }}>
            Paran anında hesabına yatsın
          </p>
        </div>
      </div>

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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={resetSlider}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            width: "100%",
            height: isMobile ? "280px" : "320px",
            position: "relative",
            overflow: "hidden",
            borderRadius: isMobile ? "12px" : "16px",
            boxShadow: "0 4px 24px #0002",
            background: "#fff",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "pan-y",
          }}
        >
          {sliderItems.map((item, idx) => {
            const isActive = idx === current;
            const isNext = idx === (current + 1) % sliderItems.length;
            const isPrev = idx === (current - 1 + sliderItems.length) % sliderItems.length;
            
            let transform = "translateX(100%)";
            if (isActive) {
              transform = `translateX(${dragOffset}px)`;
            } else if (isNext) {
              transform = "translateX(100%)";
            } else if (isPrev) {
              transform = "translateX(-100%)";
            } else {
              transform = "translateX(100%)";
            }

            return (
              <div
                key={item.title}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: isActive ? 1 : 0,
                  transform: transform,
                  transition: isDragging ? "none" : "all 0.6s cubic-bezier(.4,0,.2,1)",
                  zIndex: isActive ? 2 : 1,
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
          );
        })}
        </div>
        
        {/* Slider ok butonları */}
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + sliderItems.length) % sliderItems.length)}
          style={{
            position: "absolute",
            left: isMobile ? "-40px" : "-50px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(37, 99, 235, 0.8)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: isMobile ? "32px" : "40px",
            height: isMobile ? "32px" : "40px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? "16px" : "20px",
            zIndex: 10,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(37, 99, 235, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(37, 99, 235, 0.8)";
          }}
        >
          ‹
        </button>
        

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
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
        maxWidth: "100%",
        width: "100%",
        overflow: "hidden"
      }}>
        
        {/* Hizmet Garantileri */}
        <div style={{
          padding: isMobile ? "24px 16px" : "32px 24px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? (window.innerWidth < 480 ? "1fr" : "repeat(2, 1fr)") : "repeat(4, 1fr)",
            gap: isMobile ? (window.innerWidth < 480 ? "12px" : "16px") : "24px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            
            {/* Güvenilir Gönderim */}
            <div style={{
              textAlign: "center",
              padding: "20px 16px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <div style={{
                fontSize: "32px",
                marginBottom: "12px",
                color: "#fbbf24"
              }}>
                🚚
              </div>
              <h3 style={{
                margin: "0 0 8px 0",
                color: "#fbbf24",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                Güvenilir Gönderim
              </h3>
              <p style={{
                margin: 0,
                color: "#e5e7eb",
                fontSize: isMobile ? "12px" : "14px",
                lineHeight: "1.4"
              }}>
                Hızlı ve güvenli gönderim
              </p>
            </div>

            {/* Müşteri Memnuniyeti */}
            <div style={{
              textAlign: "center",
              padding: "20px 16px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <div style={{
                fontSize: "32px",
                marginBottom: "12px",
                color: "#fbbf24"
              }}>
                😊 ⭐⭐⭐⭐⭐
              </div>
              <h3 style={{
                margin: "0 0 8px 0",
                color: "#fbbf24",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                Müşteri Memnuniyeti
              </h3>
              <p style={{
                margin: 0,
                color: "#e5e7eb",
                fontSize: isMobile ? "12px" : "14px",
                lineHeight: "1.4"
              }}>
                Memnuniyetiniz önceliğimiz
              </p>
            </div>

            {/* Güvenli Ödeme */}
            <div style={{
              textAlign: "center",
              padding: "20px 16px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <div style={{
                fontSize: "32px",
                marginBottom: "12px",
                color: "#fbbf24"
              }}>
                💳🛡️
              </div>
              <h3 style={{
                margin: "0 0 8px 0",
                color: "#fbbf24",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                Güvenli Ödeme
              </h3>
              <p style={{
                margin: 0,
                color: "#e5e7eb",
                fontSize: isMobile ? "12px" : "14px",
                lineHeight: "1.4"
              }}>
                %100 güvenli ödeme altyapısı
              </p>
            </div>

            {/* Kaliteli Markalar */}
            <div style={{
              textAlign: "center",
              padding: "20px 16px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <div style={{
                fontSize: "32px",
                marginBottom: "12px",
                color: "#fbbf24"
              }}>
                ✅
              </div>
              <h3 style={{
                margin: "0 0 8px 0",
                color: "#fbbf24",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                Kaliteli Markalar
              </h3>
              <p style={{
                margin: 0,
                color: "#e5e7eb",
                fontSize: isMobile ? "12px" : "14px",
                lineHeight: "1.4"
              }}>
                Sadece bilinen kaliteli markalar
              </p>
            </div>
          </div>
        </div>

        {/* Ana Footer İçeriği */}
        <div style={{
          padding: isMobile ? "24px 16px" : "32px 24px"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? (window.innerWidth < 480 ? "1fr" : "repeat(2, 1fr)") : "repeat(4, 1fr)",
            gap: isMobile ? (window.innerWidth < 480 ? "20px" : "24px") : "32px",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            
            {/* Kurumsal */}
            <div>
              <h4 style={{
                margin: "0 0 16px 0",
                color: "white",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                KURUMSAL
              </h4>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <a href="/hakkimizda" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Hakkımızda</a>
                <a href="/banka-hesaplari" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Banka Hesaplarımız</a>
                <a href="/iletisim" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>İletişim</a>
                <a href="/blog" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Blog</a>
                <a href="/markalar" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Markalar</a>
              </div>
            </div>

            {/* Site Kullanımı */}
            <div>
              <h4 style={{
                margin: "0 0 16px 0",
                color: "white",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                SİTE KULLANIMI
              </h4>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <a href="/gizlilik-politikasi" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>KVKK Bilgilendirme</a>
                <a href="/satis-sozlesmesi" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Satış Sözleşmesi</a>
                <a href="/kullanim-sartlari" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Şartlar ve Koşullar</a>
                <a href="/sss" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Sık Sorulan Sorular</a>
              </div>
            </div>

            {/* Hesap Bilgileri */}
            <div>
              <h4 style={{
                margin: "0 0 16px 0",
                color: "white",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                HESAP BİLGİLERİ
              </h4>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px"
              }}>
                <a href="/profile" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Hesabım</a>
                <a href="/siparisler" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Sipariş Takibi</a>
                <a href="/karsilastir" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Karşılaştırma Listem</a>
                <a href="/favoriler" style={{
                  color: "#e5e7eb",
                  textDecoration: "none",
                  fontSize: isMobile ? "12px" : "14px",
                  transition: "color 0.2s",
                  padding: isMobile ? "8px 0" : "4px 0",
                  display: "block",
                  minHeight: isMobile ? "32px" : "auto"
                }}>Favori Ürünlerim</a>
              </div>
            </div>

            {/* Mağaza Adresi */}
            <div>
              <h4 style={{
                margin: "0 0 16px 0",
                color: "white",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "700",
                textTransform: "uppercase"
              }}>
                MAĞAZA ADRESİMİZ
              </h4>
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                marginBottom: "16px"
              }}>
                <div style={{
                  fontSize: "24px",
                  color: "#ef4444"
                }}>
                  📍
                </div>
                <div style={{
                  color: "#e5e7eb",
                  fontSize: isMobile ? "12px" : "14px",
                  lineHeight: "1.4"
                }}>
                  <div>Ihlamurkuyu Mahallesi</div>
                  <div>Malazgirt Caddesi, No:32/A</div>
                  <div>34771, Ümraniye / İstanbul</div>
                </div>
              </div>
              
              {/* Sosyal Medya */}
              <div style={{
                display: "flex",
                gap: "12px",
                marginTop: "16px"
              }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#1877f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "transform 0.2s"
                }}>
                  f
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "18px",
                  transition: "transform 0.2s"
                }}>
                  📷
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#0077b5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "bold",
                  transition: "transform 0.2s"
                }}>
                  in
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#ff0000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "18px",
                  transition: "transform 0.2s"
                }}>
                  ▶️
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div style={{
          padding: isMobile ? "20px 16px" : "24px 24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "16px" : "24px"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "700"
            }}>
              DB
            </div>
            <span style={{
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "700",
              color: "white"
            }}>
              Düşük Bütçe
            </span>
          </div>
          
          <div style={{
            fontSize: isMobile ? "12px" : "14px",
            color: "#e5e7eb",
            textAlign: isMobile ? "center" : "right"
          }}>
            © {new Date().getFullYear()} Düşük Bütçe. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}
