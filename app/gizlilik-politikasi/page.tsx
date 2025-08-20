"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicyPage() {
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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "white",
        borderRadius: "20px",
        padding: isMobile ? "30px 20px" : "50px",
        boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: "50px",
          paddingBottom: "30px",
          borderBottom: "2px solid #f1f5f9"
        }}>
          <Link href="/" style={{ display: "inline-block" }}>
            <Image 
              src="/logo.png" 
              alt="Düşük Bütçe" 
              width={180} 
              height={60} 
              style={{ 
                objectFit: "contain", 
                cursor: "pointer",
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))"
              }} 
            />
          </Link>
          
          <div style={{
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px"
          }}>
            <div style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)"
            }}>
              🔒
            </div>
            <div>
              <h1 style={{ 
                color: "#1e293b", 
                fontSize: isMobile ? "28px" : "36px", 
                fontWeight: "800", 
                margin: "0 0 8px 0",
                letterSpacing: "-0.025em"
              }}>
                Gizlilik Politikası
              </h1>
              <p style={{
                color: "#64748b",
                fontSize: isMobile ? "14px" : "16px",
                margin: 0,
                fontWeight: "500"
              }}>
                Kişisel verilerinizin güvenliği bizim için önemli
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          lineHeight: "1.7", 
          color: "#334155",
          fontSize: isMobile ? "15px" : "16px"
        }}>
          {/* Section 1 */}
          <div style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
            border: "1px solid #e2e8f0"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
              }}>
                📊
              </div>
              <h2 style={{ 
                color: "#065f46", 
                margin: 0,
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "700"
              }}>
                1. Bilgi Toplama
              </h2>
            </div>
            <p style={{ 
              margin: 0,
              fontSize: isMobile ? "15px" : "16px",
              color: "#374151"
            }}>
              Düşük Bütçe olarak, kullanıcılarımızın gizliliğini korumaya önem veriyoruz. 
              Sadece hizmet kalitemizi artırmak ve size daha iyi deneyim sunmak için gerekli 
              bilgileri topluyoruz. Bu süreç şeffaf ve güvenli bir şekilde yürütülmektedir.
            </p>
          </div>

          {/* Section 2 */}
          <div style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
            border: "1px solid #f59e0b"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
              }}>
                📋
              </div>
              <h2 style={{ 
                color: "#92400e", 
                margin: 0,
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "700"
              }}>
                2. Toplanan Bilgiler
              </h2>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "16px",
              marginBottom: "20px"
            }}>
              <div style={{
                background: "white",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #fbbf24",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{ fontSize: "20px" }}>👤</span>
                <span style={{ fontWeight: "600", color: "#92400e" }}>Ad ve Soyad</span>
              </div>
              <div style={{
                background: "white",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #fbbf24",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{ fontSize: "20px" }}>📧</span>
                <span style={{ fontWeight: "600", color: "#92400e" }}>E-posta Adresi</span>
              </div>
              <div style={{
                background: "white",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #fbbf24",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{ fontSize: "20px" }}>📱</span>
                <span style={{ fontWeight: "600", color: "#92400e" }}>Telefon Numarası</span>
              </div>
              <div style={{
                background: "white",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #fbbf24",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{ fontSize: "20px" }}>⚙️</span>
                <span style={{ fontWeight: "600", color: "#92400e" }}>Profil Bilgileri</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div style={{
            background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
            border: "1px solid #3b82f6"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
              }}>
                🎯
              </div>
              <h2 style={{ 
                color: "#1e40af", 
                margin: 0,
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "700"
              }}>
                3. Bilgi Kullanımı
              </h2>
            </div>
            <p style={{ 
              margin: 0,
              fontSize: isMobile ? "15px" : "16px",
              color: "#1e40af"
            }}>
              Topladığımız bilgiler sadece hesap yönetimi, iletişim ve hizmet iyileştirme 
              amaçlarıyla kullanılır. Bu bilgiler hiçbir zaman üçüncü taraflarla paylaşılmaz 
              ve sadece yasal zorunluluklar çerçevesinde işlenir.
            </p>
          </div>

          {/* Section 4 */}
          <div style={{
            background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "30px",
            border: "1px solid #ec4899"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
              }}>
                🛡️
              </div>
              <h2 style={{ 
                color: "#be185d", 
                margin: 0,
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "700"
              }}>
                4. Bilgi Güvenliği
              </h2>
            </div>
            <p style={{ 
              margin: 0,
              fontSize: isMobile ? "15px" : "16px",
              color: "#be185d"
            }}>
              Kullanıcı bilgileriniz güvenli sunucularda saklanır ve üçüncü taraflarla 
              paylaşılmaz. En son güvenlik teknolojileri kullanılarak verileriniz 
              şifrelenir ve korunur.
            </p>
          </div>

          {/* Section 5 */}
          <div style={{
            background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
            padding: "30px",
            borderRadius: "16px",
            marginBottom: "40px",
            border: "1px solid #10b981"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
              }}>
                📞
              </div>
              <h2 style={{ 
                color: "#065f46", 
                margin: 0,
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "700"
              }}>
                5. İletişim
              </h2>
            </div>
            <p style={{ 
              margin: 0,
              fontSize: isMobile ? "15px" : "16px",
              color: "#065f46"
            }}>
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <div style={{
              marginTop: "16px",
              padding: "16px",
              background: "white",
              borderRadius: "12px",
              border: "1px solid #10b981",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{ fontSize: "20px" }}>📧</span>
              <a href="mailto:info@dusukbutce.com" style={{
                color: "#065f46",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: isMobile ? "14px" : "16px"
              }}>
                info@dusukbutce.com
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            textAlign: "center", 
            marginTop: "40px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            justifyContent: "center"
          }}>
            <Link href="/" style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              color: "white",
              padding: "16px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: isMobile ? "14px" : "16px",
              transition: "all 0.2s",
              boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
              display: "inline-block"
            }}>
              🏠 Ana Sayfaya Dön
            </Link>
            <Link href="/iletisim" style={{
              background: "white",
              color: "#3b82f6",
              padding: "16px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: isMobile ? "14px" : "16px",
              border: "2px solid #3b82f6",
              transition: "all 0.2s",
              display: "inline-block"
            }}>
              📞 İletişime Geç
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 