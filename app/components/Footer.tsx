"use client";
import React, { useState, useEffect } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <footer style={{
      background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
      color: "white",
      marginTop: "auto"
    }}>
      {/* Üst Footer - Özellikler */}
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
              😊 <span style={{ fontSize: "20px" }}>⭐⭐⭐⭐⭐</span>
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
                <div>Atakent Mah. Yasemin Sokağı No:4</div>
                <div>34760 Ümraniye/İstanbul</div>
              </div>
            </div>
            
            {/* Sosyal Medya */}
            <div style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px"
            }}>
              <a href="https://www.facebook.com/dusukbutce/" target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#1877f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textDecoration: "none",
                transition: "transform 0.2s"
              }}>
                <img 
                  src="/facebook-svgrepo-com.svg" 
                  alt="Facebook" 
                  style={{ 
                    width: "28px", 
                    height: "28px"
                  }} 
                />
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
                transition: "transform 0.2s"
              }}>
                <img 
                  src="/Instagram_logo_2022.svg (1).webp" 
                  alt="Instagram" 
                  style={{ 
                    width: "28px", 
                    height: "28px"
                  }} 
                />
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
                transition: "transform 0.2s"
              }}>
                <img 
                  src="/youtube-svgrepo-com.svg" 
                  alt="YouTube" 
                  style={{ 
                    width: "32px", 
                    height: "32px"
                  }} 
                />
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
  );
}
