"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function OrdersPage() {
  // Siparişler örnek
  const orders: any[] = [];
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 32, background: '#f8fafc', borderRadius: 16, boxShadow: '0 4px 32px #0001', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} style={{ objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        <h2 style={{ margin: '16px 0 0 0', color: '#2563eb' }}>Siparişlerim</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>Geçmiş siparişlerinizi görüntüleyin.</p>
      </div>
      {orders.length === 0 ? (
        <div style={{ color: '#64748b', textAlign: 'center' }}>Henüz siparişiniz yok.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map((order) => (
            <li key={order.id} style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
              <div><b>Sipariş No:</b> {order.id}</div>
              <div><b>Tarih:</b> {order.date}</div>
              <div><b>Toplam:</b> {order.total} TL</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 