"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ProductSliderProps {
  isMobile: boolean;
  isIPhoneSE: boolean;
  isIPadPro: boolean;
  isIPadAir: boolean;
}

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

function ProductSlider({ isMobile, isIPhoneSE, isIPadPro, isIPadAir }: ProductSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    // Sadece kullanıcı etkileşimde bulunmadığında otomatik geçiş
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrent((prev) => (prev + 1) % sliderItems.length);
      }
    }, 3000);
    
    return () => {
      clearInterval(timer);
    };
  }, [isDragging]);

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
            }}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductSlider;
