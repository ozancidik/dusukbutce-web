"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function DataDeletionPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "white",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1)"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Düşük Bütçe" 
              width={150} 
              height={50} 
              style={{ objectFit: "contain", cursor: "pointer" }} 
            />
          </Link>
          <h1 style={{ color: "#2563eb", fontSize: "32px", fontWeight: "700", margin: "20px 0" }}>
            Veri Silme Talimatları
          </h1>
        </div>

        <div style={{ lineHeight: "1.6", color: "#374151" }}>
          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>Hesabınızı Silme</h2>
          <p style={{ marginBottom: "20px" }}>
            Düşük Bütçe hesabınızı ve tüm verilerinizi silmek için aşağıdaki adımları takip edin:
          </p>

          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>1. Otomatik Silme</h2>
          <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
            <li>Profil sayfanıza gidin</li>
            <li>"Çıkış Yap" butonuna tıklayın</li>
            <li>Hesabınız otomatik olarak 30 gün sonra silinir</li>
          </ul>

          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>2. Manuel Silme</h2>
          <p style={{ marginBottom: "20px" }}>
            Hemen silmek istiyorsanız, aşağıdaki e-posta adresine "Hesabımı Sil" 
            konulu bir e-posta gönderin:
          </p>

          <div style={{
            background: "#f3f4f6",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            <strong>ozancidik@gmail.com</strong>
          </div>

          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>3. Silinen Veriler</h2>
          <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
            <li>Profil bilgileri</li>
            <li>E-posta adresi</li>
            <li>Telefon numarası</li>
            <li>Satış geçmişi</li>
            <li>Ürün bilgileri</li>
          </ul>

          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>4. İşlem Süresi</h2>
          <p style={{ marginBottom: "20px" }}>
            Veri silme işlemi 24-48 saat içinde tamamlanır. 
            İşlem tamamlandığında size e-posta ile bilgi verilir.
          </p>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/" style={{
              background: "#2563eb",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600"
            }}>
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 