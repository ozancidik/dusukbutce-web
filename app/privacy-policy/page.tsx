"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicyPage() {
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
            Gizlilik Politikası
          </h1>
        </div>

        <div style={{ lineHeight: "1.6", color: "#374151" }}>
          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>1. Bilgi Toplama</h2>
          <p style={{ marginBottom: "20px" }}>
            Düşük Bütçe olarak, kullanıcılarımızın gizliliğini korumaya önem veriyoruz. 
            Sadece hizmet kalitemizi artırmak için gerekli bilgileri topluyoruz.
          </p>

          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>2. Toplanan Bilgiler</h2>
          <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
            <li>Ad ve soyad</li>
            <li>E-posta adresi</li>
            <li>Telefon numarası</li>
            <li>Profil bilgileri</li>
          </ul>

          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>3. Bilgi Kullanımı</h2>
          <p style={{ marginBottom: "20px" }}>
            Topladığımız bilgiler sadece hesap yönetimi, iletişim ve hizmet iyileştirme 
            amaçlarıyla kullanılır.
          </p>

          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>4. Bilgi Güvenliği</h2>
          <p style={{ marginBottom: "20px" }}>
            Kullanıcı bilgileriniz güvenli sunucularda saklanır ve üçüncü taraflarla 
            paylaşılmaz.
          </p>

          <h2 style={{ color: "#1f2937", marginBottom: "16px" }}>5. İletişim</h2>
          <p style={{ marginBottom: "20px" }}>
            Gizlilik politikamız hakkında sorularınız için: ozancidik@gmail.com
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