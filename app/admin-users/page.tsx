"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log('🔍 Kullanıcılar getiriliyor...');
      const response = await fetch('/api/admin/users');
      console.log('📡 API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 API Response data:', data);
      
      if (data.success) {
        setUsers(data.users);
        console.log(`✅ ${data.users.length} kullanıcı yüklendi`);
      } else {
        setError(data.message || 'Bilinmeyen hata');
        console.error('❌ API Error:', data.message);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      setError('Kullanıcılar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Kullanıcılar yükleniyor...</h2>
        <p>Lütfen bekleyin...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Hata: {error}</h2>
        <button 
          onClick={fetchUsers}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ color: "#2563eb", margin: 0 }}>Kullanıcı Yönetimi</h1>
        <Link href="/admin" style={{ 
          background: "#64748b", 
          color: "white", 
          padding: "10px 20px", 
          borderRadius: "8px", 
          textDecoration: "none" 
        }}>
          Geri Dön
        </Link>
      </div>

      <div style={{ 
        background: "white", 
        borderRadius: "12px", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden"
      }}>
        <div style={{ 
          padding: "20px", 
          borderBottom: "1px solid #e2e8f0",
          background: "#f8fafc"
        }}>
          <h2 style={{ margin: 0, color: "#374151" }}>
            Toplam {users.length} Kullanıcı
          </h2>
        </div>

        {users.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
            <h3>Henüz kullanıcı bulunmuyor</h3>
            <p>Kullanıcılar kayıt oldukça burada görünecek.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse",
              fontSize: "14px"
            }}>
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Ad Soyad</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Email</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Telefon</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Admin</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Kayıt Tarihi</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Durum</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px" }}>{user.name}</td>
                    <td style={{ padding: "12px" }}>{user.email}</td>
                    <td style={{ padding: "12px" }}>{user.phone || "-"}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        background: user.isAdmin ? "#dc2626" : "#059669",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px"
                      }}>
                        {user.isAdmin ? "Admin" : "Kullanıcı"}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        background: user.isActive ? "#059669" : "#dc2626",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px"
                      }}>
                        {user.isActive ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 