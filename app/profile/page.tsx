"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [edit, setEdit] = useState({ full_name: '', email: '', cep_telefonu: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;
    if (!userId) return;
    fetch(`http://localhost:3000/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setEdit({
          full_name: data.full_name || '',
          email: data.email || '',
          cep_telefonu: data.cep_telefonu || ''
        });
      })
      .catch(() => setProfile(null));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const userId = typeof window !== "undefined" ? localStorage.getItem('userId') : null;
    if (!userId) return;
    setMessage('');
    const res = await fetch(`http://localhost:3000/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: edit.full_name,
        email: edit.email,
        cep_telefonu: edit.cep_telefonu
      })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Profil başarıyla güncellendi.');
      setProfile({ ...profile, ...edit });
    } else {
      setMessage(data.error || 'Güncelleme başarısız.');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 32, background: '#f8fafc', borderRadius: 16, boxShadow: '0 4px 32px #0001', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={120} height={40} style={{ objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        <h2 style={{ margin: '16px 0 0 0', color: '#2563eb' }}>Profil</h2>
        <p style={{ color: '#64748b', marginTop: 8 }}>Kullanıcı bilgilerinizi görüntüleyin ve güncelleyin.</p>
      </div>
      {profile ? (
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px #0001', color: '#334155' }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Ad Soyad:</label>
            <input
              name="full_name"
              value={edit.full_name}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', marginTop: 4, marginBottom: 10 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Email:</label>
            <input
              name="email"
              value={edit.email}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', marginTop: 4, marginBottom: 10 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 600 }}>Telefon:</label>
            <input
              name="cep_telefonu"
              value={edit.cep_telefonu}
              onChange={handleChange}
              style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', marginTop: 4, marginBottom: 10 }}
            />
          </div>
          <button onClick={handleSave} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer', width: '100%' }}>Kaydet</button>
          {message && <div style={{ color: message.startsWith('Profil') ? 'green' : 'red', marginTop: 14 }}>{message}</div>}
        </div>
      ) : (
        <div style={{ color: '#64748b', textAlign: 'center' }}>Kullanıcı bilgileri yüklenemedi.</div>
      )}
    </div>
  );
} 