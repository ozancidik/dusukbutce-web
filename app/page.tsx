"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type ListingSubmission = {
  _id: string;
  brand?: string;
  model?: string;
  images?: string[];
  listing?: {
    price?: number;
    title?: string;
  };
};

type SliderItem = {
  id: string;
  title: string;
  price: string;
  img: string;
};

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isIPhoneSE, setIsIPhoneSE] = useState(false);
  const [isIPadPro, setIsIPadPro] = useState(false);
  const [isIPadAir, setIsIPadAir] = useState(false);
  const [sliderItems, setSliderItems] = useState<SliderItem[]>([]);
  const [sliderLoading, setSliderLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // iPad Pro (1024x1366), iPad Air (820x1180), iPad Mini (768x1024), Surface Duo (540x720) için özel kontrol
      const isTablet = (width === 1024 && height === 1366) || (width === 820 && height === 1180) || (width === 768 && height === 1024) || (width === 540 && height === 720);
      
      // 1024px ve altı veya tablet boyutları için mobile layout
      setIsMobile(width <= 1024 || isTablet);
      
      // iPhone SE için özel kontrol
      setIsIPhoneSE(width === 375 && height === 667);
      
      // iPad Pro (1024x1366) için özel kontrol
      setIsIPadPro(width === 1024 && height === 1366);
      
      // iPad Air (820x1180) için özel kontrol
      setIsIPadAir(width === 820 && height === 1180);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Sadece kullanıcı etkileşimde bulunmadığında otomatik geçiş
    const timer = setInterval(() => {
      if (!isDragging && sliderItems.length > 1) {
        setCurrent((prev) => (prev + 1) % sliderItems.length);
      }
    }, 3000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isDragging, sliderItems.length]);

  useEffect(() => {
    let isMounted = true;
    const loadSliderListings = async () => {
      try {
        setSliderLoading(true);
        const res = await fetch('/api/listings', { cache: 'no-store' });
        if (!res.ok) throw new Error('İlanlar getirilemedi');
        const data = (await res.json()) as ListingSubmission[];
        const items: SliderItem[] = (Array.isArray(data) ? data : [])
          .slice(0, 8)
          .map((l) => {
            const title = l.listing?.title || `${l.brand || ''} ${l.model || ''}`.trim() || 'Satılık İlan';
            const priceValue = l.listing?.price;
            const price = typeof priceValue === 'number'
              ? `${priceValue.toLocaleString('tr-TR')} TL`
              : 'Fiyat bilgisi yok';
            const img = l.images && l.images.length > 0 ? l.images[0] : '/logo.png';
            return { id: l._id, title, price, img };
          });
        if (isMounted) {
          setSliderItems(items);
          setCurrent(0);
        }
      } catch {
        if (isMounted) {
          setSliderItems([]);
        }
      } finally {
        if (isMounted) setSliderLoading(false);
      }
    };
    loadSliderListings();
    return () => {
      isMounted = false;
    };
  }, []);


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
    if (sliderItems.length === 0) return;
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
    if (sliderItems.length === 0) return;
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
    <div style={{ 
      backgroundColor: "#f0f4f8",
      overflowX: "hidden",
      width: "100%",
      maxWidth: "100vw"
    }}>
      
      {/* Ana İçerik */}
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "100vw" : "1600px",
          minWidth: "320px",
          minHeight: isIPhoneSE ? "auto" : (isIPadPro || isIPadAir ? "95vh" : "90vh"),
          margin: isIPhoneSE ? "0" : (isMobile ? "0" : "20px auto"),
          paddingTop: isIPhoneSE ? "0" : (isMobile ? "20px" : "16px"),
          paddingRight: isIPhoneSE ? "0" : (isMobile ? "20px" : "16px"),
          paddingBottom: isIPhoneSE ? "0" : (isMobile ? "20px" : "16px"),
          paddingLeft: isIPhoneSE ? "0" : (isMobile ? "20px" : "16px"),
          fontFamily: "sans-serif",
          background: isIPhoneSE ? "transparent" : "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)",
          borderRadius: isIPhoneSE ? "0" : (isMobile ? "0" : "16px"),
          boxShadow: isIPhoneSE ? "none" : "0 4px 32px #0001",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "center" : "flex-start",
          justifyContent: isIPhoneSE ? "flex-start" : "space-between",
          gap: isMobile ? "20px" : "40px",
          overflow: isMobile ? "hidden" : "hidden"
        }}
      >
        
        {/* Sol Sidebar - BİZE SAT Butonu ve Kategoriler */}
        <div style={{
          width: isMobile ? "100%" : (isIPadPro ? "500px" : isIPadAir ? "480px" : "580px"),
          maxWidth: isMobile ? "100%" : (isIPadPro ? "500px" : isIPadAir ? "480px" : "580px"),
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: "16px",
          padding: isMobile ? (isIPadPro ? "28px" : isIPadAir ? "26px" : "24px") : "32px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          border: "2px solid #e2e8f0",
          position: isMobile ? "static" : "sticky",
          top: isMobile ? "0" : "20px",
          marginBottom: isMobile ? "16px" : "0",
          marginTop: isMobile ? "0" : "24px",
          marginLeft: isMobile ? "0" : "0",
          marginRight: isMobile ? "0" : "0"
        }}>
            {/* 2. El Ürününü Metni - Çerçeveli ve Renkli */}
            <div style={{
              textAlign: "center",
              marginBottom: "20px",
              position: "relative"
            }}>
              <div style={{
                background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)",
                border: "3px solid #f59e0b",
                borderRadius: "16px",
                padding: isMobile ? "20px 16px 30px 16px" : "24px 20px 35px 20px",
                boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
                position: "relative",
                overflow: "visible"
              }}>
                {/* Arka plan deseni */}
                <div style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-20%",
                  width: "100px",
                  height: "100px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  zIndex: 1
                }}></div>
                <div style={{
                  position: "absolute",
                  bottom: "-30%",
                  left: "-10%",
                  width: "60px",
                  height: "60px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  zIndex: 1
                }}></div>
                
                <h2 style={{
                  margin: "0",
                  color: "#92400e",
                  fontSize: isMobile ? (isIPadPro ? "30px" : isIPadAir ? "29px" : "28px") : "32px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  position: "relative",
                  zIndex: 2
                }}>
                  2. El Ürününü
                </h2>
                
                {/* Ok işareti */}
                <div style={{
                  position: "absolute",
                  bottom: "-6px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 3
                }}>
                  <div style={{
                    width: "0",
                    height: "0",
                    borderLeft: "24px solid transparent",
                    borderRight: "24px solid transparent",
                    borderTop: "32px solid #dc2626",
                    filter: "drop-shadow(0 4px 8px rgba(220, 38, 38, 0.4))"
                  }}></div>
                </div>
              </div>
            </div>

            {/* BİZE SAT Butonu */}
            <Link href="/bize-sat" style={{ textDecoration: 'none', display: 'block', marginBottom: '24px' }}>
              <button
                style={{
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px 0",
                  fontWeight: "800",
                  fontSize: "22px",
                  width: "100%",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(34, 197, 94, 0.3)",
                  letterSpacing: "1px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#16a34a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(34, 197, 94, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#22c55e";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(34, 197, 94, 0.3)";
                }}
              >
                BİZE SAT
              </button>
            </Link>

            <h3 style={{
              margin: "0 0 24px 0",
              color: "#1e293b",
              fontSize: "24px",
              fontWeight: "700",
              textAlign: "center",
              borderBottom: "2px solid #e2e8f0",
              paddingBottom: "16px"
            }}>
              Kategoriler
            </h3>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? (isIPadPro || isIPadAir ? "1fr 1fr" : "1fr") : "1fr 1fr",
              gap: isMobile ? (isIPadPro ? "18px" : isIPadAir ? "17px" : "16px") : "16px"
            }}>
              {/* Sol Sütun */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {(isMobile && !isIPadPro && !isIPadAir ? [
                  // Mobil görünümde cep telefonu en üstte
                  { name: 'Cep Telefonu', path: '/bize-sat/cep-telefonu', icon: '📱' },
                  { name: 'Dizüstü (Notebook)', path: '/bize-sat/notebook', icon: '💻' },
                  { name: 'Masaüstü (Kasa)', path: '/bize-sat/masaustu', icon: '🖥️' },
                  { name: 'Monitör', path: '/bize-sat/monitor', icon: '🖥️' },
                  { name: 'Ekran Kartı', path: '/bize-sat/ekran-karti', icon: '/graphic-card.png' },
                  { name: 'İşlemci', path: '/bize-sat/islemci', icon: '/cpu-tower.png' },
                  { name: 'RAM', path: '/bize-sat/ram', icon: '/ram.png' },
                  { name: 'SSD', path: '/bize-sat/ssd', icon: '/ssd.png' },
                  { name: 'Soğutucu', path: '/bize-sat/sogutucu', icon: '/sogutucu.png' },
                  { name: 'Boş Kasa', path: '/bize-sat/kasa', icon: '/case.png' },
                  { name: 'PlayStation', path: '/bize-sat/playstation', icon: '/playstation.png' },
                  { name: 'Gamepad', path: '/bize-sat/gamepad', icon: '/gamepad.png' },
                  { name: 'Xbox', path: '/bize-sat/xbox', icon: '/xbox.png' },
                  { name: 'Klavye', path: '/bize-sat/klavye', icon: '⌨️' },
                  { name: 'Mouse', path: '/bize-sat/mouse', icon: '🖱️' },
                  { name: 'Tablet', path: '/bize-sat/tablet', icon: '/tablet.png' },
                  { name: 'Kulaklık', path: '/bize-sat/kulaklik', icon: '🎧' },
                  { name: 'Ses Sistemi', path: '/bize-sat/ses-sistemi', icon: '/sound-system.png' },
                  // Mobil görünümde en altta alt alta
                  { name: 'Fotokopi Makinesi', path: '/bize-sat/fotokopi-makinesi', icon: '📄' },
                  { name: 'Yazıcı', path: '/bize-sat/yazici', icon: '🖨️' },
                  { name: 'Tarayıcı', path: '/bize-sat/tarayici', icon: '🔍' }
                ] : [
                  { name: 'Dizüstü (Notebook)', path: '/bize-sat/notebook', icon: '💻' },
                  { name: 'Masaüstü (Kasa)', path: '/bize-sat/masaustu', icon: '🖥️' },
                  { name: 'Monitör', path: '/bize-sat/monitor', icon: '🖥️' },
                  { name: 'Ekran Kartı', path: '/bize-sat/ekran-karti', icon: '/graphic-card.png' },
                  { name: 'İşlemci', path: '/bize-sat/islemci', icon: '/cpu-tower.png' },
                  { name: 'RAM', path: '/bize-sat/ram', icon: '/ram.png' },
                  { name: 'SSD', path: '/bize-sat/ssd', icon: '/ssd.png' },
                  { name: 'Soğutucu', path: '/bize-sat/sogutucu', icon: '/sogutucu.png' },
                  { name: 'Boş Kasa', path: '/bize-sat/kasa', icon: '/case.png' },
                  { name: 'Fotokopi Makinesi', path: '/bize-sat/fotokopi-makinesi', icon: '📄' },
                  { name: 'Yazıcı', path: '/bize-sat/yazici', icon: '🖨️' }
                ]).map((category, index) => (
                  <Link key={index} href={category.path} style={{ textDecoration: 'none' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px 20px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#374151',
                      height: '64px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {category.icon.startsWith('/') ? (
                        <img 
                          src={category.icon} 
                          alt={category.name}
                          style={{ 
                            width: '32px',
                            height: '32px',
                            marginRight: '16px',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <span style={{ 
                          fontSize: '24px', 
                          marginRight: '16px' 
                        }}>
                          {category.icon}
                        </span>
                      )}
                      {category.name}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Sağ Sütun - Desktop ve iPad görünümünde gösterilir */}
              {(!isMobile || isIPadPro || isIPadAir) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { name: 'Cep Telefonu', path: '/bize-sat/cep-telefonu', icon: '📱' },
                  { name: 'PlayStation', path: '/bize-sat/playstation', icon: '/playstation.png' },
                  { name: 'Gamepad', path: '/bize-sat/gamepad', icon: '/gamepad.png' },
                  { name: 'Xbox', path: '/bize-sat/xbox', icon: '/xbox.png' },
                  { name: 'Klavye', path: '/bize-sat/klavye', icon: '⌨️' },
                  { name: 'Mouse', path: '/bize-sat/mouse', icon: '🖱️' },
                  { name: 'Tablet', path: '/bize-sat/tablet', icon: '/tablet.png' },
                  { name: 'Kulaklık', path: '/bize-sat/kulaklik', icon: '🎧' },
                  { name: 'Ses Sistemi', path: '/bize-sat/ses-sistemi', icon: '/sound-system.png' },
                  { name: 'Tarayıcı', path: '/bize-sat/tarayici', icon: '🔍' }
                ].map((category, index) => (
                  <Link key={index} href={category.path} style={{ textDecoration: 'none' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px 20px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '18px',
                      fontWeight: '500',
                      color: '#374151',
                      height: '64px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#eff6ff';
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      {category.icon.startsWith('/') ? (
                        <img 
                          src={category.icon} 
                          alt={category.name}
                          style={{ 
                            width: '32px',
                            height: '32px',
                            marginRight: '16px',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <span style={{ 
                          fontSize: '24px', 
                          marginRight: '16px' 
                        }}>
                          {category.icon}
                        </span>
                      )}
                      {category.name}
                    </div>
                  </Link>
                ))}
              </div>
              )}
            </div>
          </div>

        {/* Ana İçerik Alanı */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: isIPhoneSE ? "flex-start" : "center",
          width: isMobile ? "100%" : "100%",
          maxWidth: isMobile ? "100%" : "none",
          marginLeft: isMobile ? "0" : "0",
          marginRight: isMobile ? "0" : "0"
        }}>



        {/* Üç Sütun Yan Yana */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "24px" : "40px",
          marginBottom: "32px",
          marginTop: "0px",
          width: "100%",
          maxWidth: isMobile ? "calc(100% - 40px)" : "1400px",
          justifyContent: isMobile ? "center" : "center",
          alignItems: "flex-start"
        }}>
          
          {/* Teknik Servis Bölümü */}
          <Link href="/teknik-servis" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto', flex: isMobile ? 1 : '1' }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: isMobile ? "20px 16px" : "24px 32px",
            borderRadius: "16px",
            width: isMobile ? "100%" : "100%",
            border: "2px solid #e2e8f0",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            flex: isMobile ? 1 : "1",
            minHeight: isMobile ? "auto" : "400px",
            marginTop: isMobile ? "0" : "24px"
          }}>
            {/* Uzman Ekibimizden Destek Al Metni ve Ok */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              marginTop: "8px",
              position: "relative",
              width: "100%"
            }}>
              <div style={{
                background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 50%, #fde68a 100%)",
                border: "3px solid #f59e0b",
                borderRadius: "16px",
                padding: isMobile ? "20px 16px 30px 16px" : "24px 20px 35px 20px",
                boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
                position: "relative",
                overflow: "visible",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <div style={{
                  color: "#92400e",
                  fontSize: isMobile ? "16px" : "20px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                  textAlign: "center",
                  lineHeight: "1.2"
                }}>
                  Uzman Ekibimizden Destek Al
                </div>
                <div style={{
                  color: "#92400e",
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: "700",
                  letterSpacing: "0.3px",
                  textAlign: "center",
                  marginTop: "4px",
                  opacity: "0.9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}>
                  <span style={{ fontSize: isMobile ? "14px" : "16px" }}>🚚</span>
                  İstanbul içi aynı gün teslim alalım
                </div>
              </div>
              {/* Ok - Metnin altında ve Teknik Servis'e bakıyor */}
                <div style={{
                  marginTop: "-28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <div style={{
                  width: "0",
                  height: "0",
                  borderLeft: "24px solid transparent",
                  borderRight: "24px solid transparent",
                  borderTop: "32px solid #dc2626",
                  filter: "drop-shadow(0 4px 8px rgba(220, 38, 38, 0.4))"
                }}></div>
              </div>
            </div>

            {/* Teknik Servis Başlığı - BİZE SAT butonu gibi */}
            <div style={{
              textAlign: "center",
              marginBottom: "24px",
              background: "linear-gradient(135deg, #faf5ff 0%, #e9d5ff 50%, #d8b4fe 100%)",
              border: "3px solid #8b5cf6",
              borderRadius: "12px",
              padding: isMobile ? "12px 16px" : "16px 20px",
              boxShadow: "0 6px 24px rgba(139, 92, 246, 0.3)",
              position: "relative",
              overflow: "hidden",
              width: "100%"
            }}>
              <button
                style={{
                  background: "transparent",
                  color: "#6b21a8",
                  border: "none",
                  borderRadius: "0",
                  padding: "0",
                  fontWeight: "900",
                  fontSize: isMobile ? "16px" : "18px",
                  width: "100%",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#581c87";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#6b21a8";
                }}
              >
                TEKNİK SERVİS
              </button>
            </div>
            
            <div style={{
              textAlign: "center",
              marginBottom: "24px"
            }}>
              <h3 style={{
                color: "#1e293b",
                margin: "0",
                fontSize: "24px",
                fontWeight: "800",
                letterSpacing: "0.5px",
                paddingBottom: "16px"
              }}>
                Kategoriler
              </h3>
              <div style={{
                width: "calc(100% + 240px)",
                height: "2px",
                background: "#e2e8f0",
                margin: "0 -120px"
              }}></div>
            </div>
            
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "12px" : "16px",
              margin: "0 0 16px 0",
              width: "100%"
            }}>
              {[
                { name: 'PC Onarım', icon: '🖥️' },
                { name: 'Laptop Tamiri', icon: '💻' },
                { name: 'Monitör Tamiri', icon: '🖥️' },
                { name: 'Format Atma', icon: '💾' },
                { name: 'Parça Montajı', icon: '🔧' },
                { name: 'Telefon Onarım', icon: '📱' },
                { name: 'Tablet Tamiri', icon: '📱' },
                { name: 'PC Toplama', icon: '⚙️' },
                { name: 'Veri Kurtarma', icon: '💿' }
              ].map((service, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '18px',
                    fontWeight: '500',
                    color: '#374151',
                    height: '64px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#eff6ff';
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ 
                    fontSize: '24px', 
                    marginRight: '16px' 
                  }}>
                    {service.icon}
                  </span>
                  {service.name}
                </div>
              ))}
            </div>
          </div>
          </Link>

          {/* 2. El Bölümü */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            backgroundColor: "rgba(255,255,255,0.95)",
            padding: isMobile ? "20px 16px" : "24px 32px",
            paddingTop: isMobile ? "20px" : "60px",
            borderRadius: "16px",
            width: isMobile ? "100%" : "100%",
            border: "2px solid #e2e8f0",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            flex: isMobile ? 1 : "1",
            minHeight: isMobile ? "auto" : "400px",
            marginTop: isMobile ? "0" : "24px"
          }}>
            {/* SATILIK İLANLAR butonu - 2. El penceresinin üstünde */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              width: "100%"
            }}>
              <Link href="/satilik-ilanlar" style={{ width: "100%" }}>
                <button
                  style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: isMobile ? "16px 0" : "18px 0",
                    fontWeight: "800",
                    fontSize: isMobile ? "18px" : "20px",
                    width: "100%",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px #0001",
                    letterSpacing: isMobile ? "1px" : "1.5px",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  SATILIK İLANLAR
                </button>
              </Link>
            </div>
            
            {/* Slider */}
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              minHeight: isMobile ? "200px" : "240px",
              width: "100%",
              maxWidth: "100%",
              marginTop: "20px"
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
                  height: isMobile ? "200px" : "240px",
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
                {sliderLoading ? (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    fontWeight: "600"
                  }}>
                    Yükleniyor...
                  </div>
                ) : sliderItems.length === 0 ? (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    gap: "10px",
                    textAlign: "center",
                    padding: "16px"
                  }}>
                    <div style={{ fontSize: "36px" }}>📋</div>
                    <div style={{ fontWeight: "700", color: "#1f2937" }}>Henüz satılık ilan yok</div>
                    <div style={{ fontSize: "14px" }}>Admin panelinden ilan eklendiğinde burada otomatik görünecek.</div>
                  </div>
                ) : sliderItems.map((item, idx) => {
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
                      key={item.id}
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
                      <Link
                        href={`/satilik-ilanlar/${item.id}`}
                        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            style={{ 
                              width: isMobile ? "100px" : "120px", 
                              height: isMobile ? "100px" : "120px", 
                              objectFit: "contain", 
                              marginBottom: isMobile ? "8px" : "12px", 
                              borderRadius: "12px",
                            }} 
                          />
                          <div style={{ 
                            fontSize: isMobile ? "14px" : "16px", 
                            fontWeight: "700", 
                            marginBottom: isMobile ? "4px" : "6px",
                            textAlign: "center",
                          }}>
                            {item.title}
                          </div>
                          <div style={{ 
                            fontSize: isMobile ? "14px" : "16px", 
                            color: "#2563eb", 
                            fontWeight: "600",
                          }}>
                            {item.price}
                          </div>
                        </div>
                      </Link>
                  </div>
                );
              })}
              </div>
              
            </div>

            {/* Slider altı noktalar */}
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: "6px", 
              marginTop: "12px" 
            }}>
              {sliderItems.map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    width: isMobile ? "8px" : "10px",
                    height: isMobile ? "8px" : "10px",
                    borderRadius: "50%",
                    background: idx === current ? "#2563eb" : "#cbd5e1",
                    display: "inline-block",
                    transition: "background 0.2s",
                    cursor: "pointer",
                    opacity: sliderItems.length > 0 ? 1 : 0.4
                  }}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
          </div>
        </div>




      {/* Butonlar yan yana */}





      </div>
    </div>
    </div>
  );
}