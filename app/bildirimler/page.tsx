"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotificationsPage() {
  // Bildirimler örnek
  const notifications: any[] = [];
  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 32, background: '#f8fafc', borderRadius: 16, boxShadow: '0 4px 32px #0001', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} style={{ objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        <h2 style={{ margin: '16px 0 0 0', color: '#2563eb' }}>Bildirimler</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>Tüm bildirimlerinizi burada görüntüleyin.</p>
      </div>
      {notifications.length === 0 ? (
        <div style={{ color: '#64748b', textAlign: 'center' }}>Henüz bildiriminiz yok.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((n) => (
            <li key={n.id} style={{ padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
              <div><b>{n.title}</b></div>
              <div>{n.message}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{n.date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 