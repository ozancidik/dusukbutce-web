"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const router = useRouter();

  // Sepeti güncelle
  const fetchCart = () => {
    fetch("http://localhost:3000/cart/1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCart(data);
        else setCart([]);
      })
      .catch(() => setCart([]));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Adet artır
  const handleIncrease = async (item: any) => {
    await fetch("http://localhost:3000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, productId: item.product.id, quantity: 1 }),
    });
    fetchCart();
  };

  // Adet azalt veya sil
  const handleDecrease = async (item: any) => {
    if (item.quantity <= 1) {
      await handleRemove(item);
      return;
    }
    await fetch("http://localhost:3000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, productId: item.product.id, quantity: -1 }),
    });
    fetchCart();
  };

  // Ürün sil
  const handleRemove = async (item: any) => {
    await fetch(`http://localhost:3000/cart/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1, productId: item.product.id }),
    });
    fetchCart();
  };

  // Ödeme sayfasına yönlendir
  const handleOrder = async () => {
    if (cart.length === 0) {
      setOrderMessage("Sepetiniz boş.");
      return;
    }
    router.push("/payment-stripe"); // veya "/payment-iyzico"
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 32, background: '#f8fafc', borderRadius: 16, boxShadow: '0 4px 32px #0001', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} style={{ objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        <h2 style={{ margin: '16px 0 0 0', color: '#2563eb' }}>Sepet</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>Sepetinizdeki ürünleri görüntüleyin ve yönetin.</p>
      </div>
      {cart.length === 0 ? (
        <div style={{ color: '#64748b', textAlign: 'center' }}>Sepetiniz boş.</div>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{item.product.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => handleDecrease(item)} style={{ background: '#e5e7eb', border: 'none', borderRadius: 6, width: 28, height: 28, fontWeight: 700, fontSize: 18, cursor: 'pointer' }}>-</button>
                  <span style={{ minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)} style={{ background: '#e5e7eb', border: 'none', borderRadius: 6, width: 28, height: 28, fontWeight: 700, fontSize: 18, cursor: 'pointer' }}>+</button>
                  <button onClick={() => handleRemove(item)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '4px 10px', marginLeft: 8, cursor: 'pointer', fontWeight: 600 }}>Sil</button>
                </span>
              </li>
            ))}
          </ul>
          <button onClick={handleOrder} style={{ marginTop: 24, background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer', width: '100%' }}>Satın Al / Siparişi Tamamla</button>
          {orderMessage && <div style={{ color: orderMessage.startsWith('Sipariş başarıyla') ? 'green' : 'red', marginTop: 16 }}>{orderMessage}</div>}
        </>
      )}
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
} 