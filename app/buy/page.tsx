import React from "react";

export default function BuyPage() {
  return (
    <div style={{
      maxWidth: 600,
      margin: "40px auto",
      padding: 32,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 32px #0001",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ color: "#2563eb", marginBottom: 16 }}>2. El Ürün Satın Al</h1>
      <p style={{ color: "#64748b", marginBottom: 24 }}>
        Uygun fiyatlı, güvenilir 2. el elektronik ürünleri buradan inceleyip satın alabilirsin! Aşağıdaki formu doldur, ekibimiz seninle iletişime geçsin veya sana özel fırsatları paylaşsın.
      </p>
      <form onSubmit={e => { e.preventDefault(); alert('Talebiniz alındı!'); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input type="text" placeholder="Ad Soyad" required style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1" }} />
        <input type="email" placeholder="E-posta" required style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1" }} />
        <input type="tel" placeholder="Telefon" required style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1" }} />
        <textarea placeholder="Satın almak istediğin ürün veya ürün tipi (Marka, Model, Bütçe vb.)" required style={{ padding: 12, borderRadius: 8, border: "1px solid #cbd5e1", minHeight: 80 }} />
        <button type="submit" style={{ background: "#2563eb", color: "white", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
          Gönder
        </button>
      </form>
    </div>
  );
} 