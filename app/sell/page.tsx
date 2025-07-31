"use client";
import React from "react";
import { useRouter } from "next/navigation";

const categories = [
  { label: "Dizüstü(Notebook)", value: "notebook" },
  { label: "Masaüstü(Kasa)", value: "desktop" },
  { label: "Monitör", value: "monitor" },
  { label: "Klavye", value: "keyboard" },
  { label: "Mouse", value: "mouse" },
  { label: "Tablet", value: "tablet" },
];

export default function BizeSatPage() {
  const router = useRouter();

  const handleCategoryClick = (catValue: string) => {
    router.push(`/buy/${catValue}`);
  };

  return (
    <div style={{
      maxWidth: 600,
      margin: "40px auto",
      padding: 32,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 4px 32px #0001",
      fontFamily: "sans-serif",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#2563eb", marginBottom: 24 }}>Bilgisayarını/parçanı bize sat</h1>
      <p style={{ color: "#64748b", marginBottom: 32 }}>
        Satmak istediğin ürün kategorisini seç:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "16px 0",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 2px 8px #0001",
              transition: "background 0.2s"
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
} 