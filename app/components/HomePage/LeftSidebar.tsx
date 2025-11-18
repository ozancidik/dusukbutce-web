"use client";
import React from "react";
import Link from "next/link";

interface LeftSidebarProps {
  isMobile: boolean;
  isIPhoneSE: boolean;
  isIPadPro: boolean;
  isIPadAir: boolean;
}

function LeftSidebar({ isMobile, isIPhoneSE, isIPadPro, isIPadAir }: LeftSidebarProps) {
  return (
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
  );
}

export default LeftSidebar;

