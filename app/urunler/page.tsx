"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [showGoToCart, setShowGoToCart] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
      })
      .catch(() => setProducts([]));
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      }),
    });
    if (res.ok) {
      setNewProduct({ name: "", price: "" });
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setProducts(data);
          else setProducts([]);
        })
        .catch(() => setProducts([]));
    } else {
      setError("Ürün eklenemedi.");
    }
  };

  const handleAddToCart = async (productId: number) => {
    const res = await fetch('http://localhost:3000/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, productId, quantity: 1 }),
    });
    if (res.ok) {
      setShowGoToCart(true);
      setTimeout(() => setShowGoToCart(false), 4000);
    } else {
      alert('Sepete eklenemedi.');
    }
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((p) =>
        ((p.name || p.title || "") as string)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32, background: '#f8fafc', borderRadius: 16, boxShadow: '0 4px 32px #0001', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} style={{ objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        <h2 style={{ margin: '16px 0 0 0', color: '#2563eb' }}>Ürünler</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>Yeni ürün ekle, mevcut ürünleri ara ve listele.</p>
      </div>
      <form onSubmit={handleAddProduct} style={{ marginBottom: 18, display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Ürün adı"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
          style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }}
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
          style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, width: 100 }}
        />
        <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Ekle</button>
      </form>
      <input
        type="text"
        placeholder="Ürün ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16, padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16, width: '100%' }}
      />
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredProducts.map((p) => (
          <li key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><b>{p.name || p.title}</b></span>
            <span style={{ color: '#2563eb', fontWeight: 600 }}>{p.price} TL</span>
            <button
              style={{ marginLeft: 12, background: '#22c55e', color: 'white', border: 'none', borderRadius: 8, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => handleAddToCart(p.id)}
            >
              Sepete Ekle
            </button>
          </li>
        ))}
      </ul>
      {filteredProducts.length === 0 && <div style={{ color: '#64748b', marginTop: 16 }}>Ürün bulunamadı.</div>}
      {showGoToCart && (
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Link href="/cart">
            <button style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0001' }}>
              Sepete Git
            </button>
          </Link>
        </div>
      )}
    </div>
  );
} 