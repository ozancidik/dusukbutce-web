"use client";
import React, { useState } from "react";

export default function SellNotebookPage() {
  const [hasBox, setHasBox] = useState(false);
  const [hasInvoice, setHasInvoice] = useState(false);

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
      <h1 style={{ color: "#2563eb", marginBottom: 24 }}>Dizüstü (Notebook) Sat</h1>
      <div style={{ marginBottom: 32, display: "flex", justifyContent: "center", gap: 32 }}>
        <label style={{ fontSize: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={hasBox} onChange={() => setHasBox(v => !v)} />
          Kutu
        </label>
        <label style={{ fontSize: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={hasInvoice} onChange={() => setHasInvoice(v => !v)} />
          Fatura
        </label>
      </div>
      {/* İleride detay formu buraya eklenebilir */}
    </div>
  );
} 