"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', cep_telefonu: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password,
          phone: form.cep_telefonu
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.');
        setForm({ fullName: '', email: '', password: '', cep_telefonu: '' });
      } else {
        setError(data.message || 'Bir hata oluştu.');
      }
    } catch (error) {
      setError('Bağlantı hatası oluştu.');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #4b5563 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: 420, 
        width: '100%',
        padding: 32, 
        background: 'white', 
        borderRadius: 16, 
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', 
        fontFamily: 'sans-serif' 
      }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} style={{ objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        <h2 style={{ margin: '16px 0 0 0', color: '#2563eb' }}>Kayıt Ol</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>Hesabını oluştur, avantajları kaçırma!</p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input name="fullName" placeholder="Ad Soyad" onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }} />
        <input name="email" type="email" placeholder="E-posta" onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }} />
        <input name="cep_telefonu" placeholder="Telefon (+905xx...)" onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }} />
        <input name="password" type="password" placeholder="Şifre" onChange={handleChange} required style={{ padding: 10, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 16 }} />
        <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Kayıt Ol</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 12 }}>{success}</div>}
      <div style={{ marginTop: 18, textAlign: 'center', color: '#64748b', fontSize: 15 }}>
        Zaten hesabın var mı? <Link href="/login" style={{ color: '#2563eb', fontWeight: 600 }}>Giriş Yap</Link>
      </div>
      </div>
    </div>
  );
} 