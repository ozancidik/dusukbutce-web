"use client";
import React from "react";
import Link from "next/link";

interface TechnicalServiceProps {
  isMobile: boolean;
  isIPhoneSE: boolean;
  isIPadPro: boolean;
  isIPadAir: boolean;
}

function TechnicalService({ isMobile, isIPhoneSE, isIPadPro, isIPadAir }: TechnicalServiceProps) {
  return (
    <Link href="/teknik-servis" style={{ textDecoration: 'none', width: isMobile ? '100%' : '450px' }}>
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
  );
}

export default TechnicalService;
