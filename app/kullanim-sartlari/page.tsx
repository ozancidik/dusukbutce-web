"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function TermsPage() {
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
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)",
      padding: isMobile ? "12px" : "20px"
    }}>
      <div style={{
        maxWidth: isMobile ? "100%" : "900px",
        margin: "0 auto",
        background: "white",
        borderRadius: isMobile ? "16px" : "20px",
        padding: isMobile ? "24px" : "60px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 25px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: isMobile ? "32px" : "60px",
          paddingBottom: isMobile ? "24px" : "40px",
          borderBottom: "2px solid #f1f5f9"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
            width: isMobile ? "60px" : "80px",
            height: isMobile ? "60px" : "80px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)"
          }}>
            <span style={{ fontSize: isMobile ? "24px" : "32px", color: "white" }}>📋</span>
          </div>
          <h1 style={{ 
            color: "#1e293b", 
            fontSize: isMobile ? "28px" : "42px", 
            fontWeight: "800", 
            margin: "0 0 16px 0",
            letterSpacing: "-0.025em"
          }}>
            Kullanım Şartları
          </h1>
          <p style={{
            color: "#64748b",
            fontSize: isMobile ? "16px" : "18px",
            fontWeight: "500",
            margin: "0 auto",
            maxWidth: isMobile ? "100%" : "500px"
          }}>
            Düşük Bütçe platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız
          </p>
        </div>

        <div style={{ 
          lineHeight: isMobile ? "1.6" : "1.8", 
          color: "#475569",
          fontSize: isMobile ? "15px" : "16px"
        }}>
          <div style={{
            background: "#f8fafc",
            padding: isMobile ? "20px" : "32px",
            borderRadius: isMobile ? "12px" : "16px",
            marginBottom: isMobile ? "20px" : "32px",
            border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ 
              color: "#1e293b", 
              marginBottom: isMobile ? "16px" : "20px",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px"
            }}>
              <span style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                color: "white",
                width: isMobile ? "28px" : "32px",
                height: isMobile ? "28px" : "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "700"
              }}>1</span>
              Hizmet Kullanımı
            </h2>
            <p style={{ marginBottom: "0", fontSize: isMobile ? "15px" : "16px" }}>
              Düşük Bütçe platformunu kullanarak bu şartları kabul etmiş sayılırsınız. 
              Platform üzerinden ürün alım-satım işlemleri yapabilir, güvenli ve hızlı 
              bir şekilde işlemlerinizi gerçekleştirebilirsiniz.
            </p>
          </div>

          <div style={{
            background: "#f8fafc",
            padding: isMobile ? "20px" : "32px",
            borderRadius: isMobile ? "12px" : "16px",
            marginBottom: isMobile ? "20px" : "32px",
            border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ 
              color: "#1e293b", 
              marginBottom: isMobile ? "16px" : "20px",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px"
            }}>
              <span style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                color: "white",
                width: isMobile ? "28px" : "32px",
                height: isMobile ? "28px" : "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "700"
              }}>2</span>
              Kullanıcı Sorumlulukları
            </h2>
            <ul style={{ 
              marginBottom: "0", 
              paddingLeft: isMobile ? "20px" : "24px",
              fontSize: isMobile ? "15px" : "16px"
            }}>
              <li style={{ marginBottom: "8px" }}>Doğru ve güncel bilgi vermek</li>
              <li style={{ marginBottom: "8px" }}>Güvenli ve güçlü şifre kullanmak</li>
              <li style={{ marginBottom: "8px" }}>Platform kurallarına ve yasal düzenlemelere uymak</li>
              <li style={{ marginBottom: "8px" }}>Yasal ve etik işlemler yapmak</li>
              <li style={{ marginBottom: "8px" }}>Hesap güvenliğini korumak</li>
            </ul>
          </div>

          <div style={{
            background: "#f8fafc",
            padding: isMobile ? "20px" : "32px",
            borderRadius: isMobile ? "12px" : "16px",
            marginBottom: isMobile ? "20px" : "32px",
            border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ 
              color: "#1e293b", 
              marginBottom: isMobile ? "16px" : "20px",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px"
            }}>
              <span style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                color: "white",
                width: isMobile ? "28px" : "32px",
                height: isMobile ? "28px" : "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "700"
              }}>3</span>
              Ürün Satışı ve Alımı
            </h2>
            <p style={{ marginBottom: "16px", fontSize: isMobile ? "15px" : "16px" }}>
              Satışa sunduğunuz ürünlerin doğru bilgilerini vermekle sorumlusunuz. 
              Yanıltıcı bilgi vermek, sahte ürün satmak veya yasadışı işlemler yapmak kesinlikle yasaktır.
            </p>
            <p style={{ marginBottom: "0", fontSize: isMobile ? "15px" : "16px" }}>
              Alım yaparken ürün detaylarını dikkatlice incelemeli, satıcı bilgilerini 
              kontrol etmeli ve güvenli ödeme yöntemlerini tercih etmelisiniz.
            </p>
          </div>

          <div style={{
            background: "#f8fafc",
            padding: isMobile ? "20px" : "32px",
            borderRadius: isMobile ? "12px" : "16px",
            marginBottom: isMobile ? "20px" : "32px",
            border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ 
              color: "#1e293b", 
              marginBottom: isMobile ? "16px" : "20px",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px"
            }}>
              <span style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                color: "white",
                width: isMobile ? "28px" : "32px",
                height: isMobile ? "28px" : "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "700"
              }}>4</span>
              Ödeme ve Teslimat
            </h2>
            <p style={{ marginBottom: "16px", fontSize: isMobile ? "15px" : "16px" }}>
              Ödeme işlemleri güvenli ödeme sistemleri üzerinden yapılır. 
              Tüm finansal işlemleriniz SSL şifreleme ile korunmaktadır.
            </p>
            <p style={{ marginBottom: "0", fontSize: "16px" }}>
              Teslimat süreleri ürün türü, konum ve seçilen kargo firmasına göre 
              değişiklik gösterir. Teslimat sırasında ürünü kontrol etmeyi unutmayın.
            </p>
          </div>

          <div style={{
            background: "#f8fafc",
            padding: isMobile ? "20px" : "32px",
            borderRadius: isMobile ? "12px" : "16px",
            marginBottom: isMobile ? "20px" : "32px",
            border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ 
              color: "#1e293b", 
              marginBottom: isMobile ? "16px" : "20px",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px"
            }}>
              <span style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                color: "white",
                width: isMobile ? "28px" : "32px",
                height: isMobile ? "28px" : "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "700"
              }}>5</span>
              Gizlilik ve Güvenlik
            </h2>
            <p style={{ marginBottom: "16px", fontSize: isMobile ? "15px" : "16px" }}>
              Kişisel verileriniz KVKK kapsamında korunmaktadır. 
              Platform güvenliği için gerekli tüm önlemler alınmıştır.
            </p>
            <p style={{ marginBottom: "0", fontSize: isMobile ? "15px" : "16px" }}>
              Hesap bilgilerinizi kimseyle paylaşmayın ve düzenli olarak 
              şifrenizi değiştirmeyi unutmayın.
            </p>
          </div>

          <div style={{
            background: "#f8fafc",
            padding: isMobile ? "20px" : "32px",
            borderRadius: isMobile ? "12px" : "16px",
            marginBottom: isMobile ? "32px" : "40px",
            border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ 
              color: "#1e293b", 
              marginBottom: isMobile ? "16px" : "20px",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px"
            }}>
              <span style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                color: "white",
                width: isMobile ? "28px" : "32px",
                height: isMobile ? "28px" : "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "12px" : "14px",
                fontWeight: "700"
              }}>6</span>
              İletişim ve Destek
            </h2>
            <p style={{ marginBottom: "16px", fontSize: isMobile ? "15px" : "16px" }}>
              Kullanım şartları hakkında sorularınız veya önerileriniz için 
              aşağıdaki iletişim kanallarından bize ulaşabilirsiniz:
            </p>
            <div style={{
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
              color: "white",
              padding: isMobile ? "12px 16px" : "16px 20px",
              borderRadius: isMobile ? "10px" : "12px",
              display: "inline-block",
              fontWeight: "600",
              fontSize: isMobile ? "14px" : "16px"
            }}>
              📧 info@dusukbutce.com
            </div>
          </div>

          <div style={{ 
            textAlign: "center", 
            marginTop: isMobile ? "24px" : "40px",
            paddingTop: isMobile ? "24px" : "40px",
            borderTop: "2px solid #f1f5f9"
          }}>
            <Link href="/" style={{
              background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
              color: "white",
              padding: isMobile ? "14px 24px" : "16px 32px",
              borderRadius: isMobile ? "10px" : "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: isMobile ? "15px" : "16px",
              display: "inline-block",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(37, 99, 235, 0.3)";
            }}>
              🏠 Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 