"use client";
import React, { useState, useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import TechnicalService from "./TechnicalService";
import ProductSlider from "./ProductSlider";

export default function HomePageMain() {
  const [isMobile, setIsMobile] = useState(false);
  const [isIPhoneSE, setIsIPhoneSE] = useState(false);
  const [isIPadPro, setIsIPadPro] = useState(false);
  const [isIPadAir, setIsIPadAir] = useState(false);

  useEffect(() => {
    // useEffect'i daha güvenli hale getir
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      try {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // iPad Pro (1024x1366), iPad Air (820x1180), iPad Mini (768x1024), Surface Duo (540x720) için özel kontrol
        const isTablet = (width === 1024 && height === 1366) || 
                        (width === 820 && height === 1180) || 
                        (width === 768 && height === 1024) || 
                        (width === 540 && height === 720);
        
        const mobile = width <= 1024 || isTablet;
        
        // 1024px ve altı veya tablet boyutları için mobile layout
        setIsMobile(mobile);
        
        // iPhone SE için özel kontrol
        setIsIPhoneSE(mobile && width === 375 && height === 667);
        
        // iPad Pro (1024x1366) için özel kontrol
        setIsIPadPro(mobile && width === 1024 && height === 1366);
        
        // iPad Air (820x1180) için özel kontrol
        setIsIPadAir(mobile && width === 820 && height === 1180);
      } catch (error) {
        console.error('checkMobile error:', error);
      }
    };
    
    // Biraz gecikmeyle çalıştır (hydration tamamlanması için)
    const timeoutId = setTimeout(checkMobile, 100);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
        <LeftSidebar isMobile={isMobile} isIPhoneSE={isIPhoneSE} isIPadPro={isIPadPro} isIPadAir={isIPadAir} />
        
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
            <TechnicalService isMobile={isMobile} isIPhoneSE={isIPhoneSE} isIPadPro={isIPadPro} isIPadAir={isIPadAir} />
            <ProductSlider isMobile={isMobile} isIPhoneSE={isIPhoneSE} isIPadPro={isIPadPro} isIPadAir={isIPadAir} />
          </div>
        </div>
      </div>
    </div>
  );
}
