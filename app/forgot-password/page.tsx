"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch('http://localhost:3000/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) setMessage('Şifre sıfırlama bağlantısı gönderildi.');
    else setMessage(data.error || 'Bir hata oluştu.');
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 32, background: '#f8fafc', borderRadius: 16, boxShadow: '0 4px 32px #0001', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} style={{ objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        <h2 style={{ margin: '16px 0 0 0', color: '#2563eb' }}>Şifremi Unuttum</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>E-posta adresinizi girin, sıfırlama bağlantısı gönderelim.</p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }}
        />
        <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Gönder</button>
      </form>
      {message && <div style={{ color: message.startsWith('Şifre') ? 'green' : 'red', marginTop: 12 }}>{message}</div>}
    </div>
  );
} 