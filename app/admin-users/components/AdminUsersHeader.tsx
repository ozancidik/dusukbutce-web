"use client";
import React from 'react';
import Link from 'next/link';

interface AdminUsersHeaderProps {
  users: any[];
  onRefresh: () => void;
}

const AdminUsersHeader: React.FC<AdminUsersHeaderProps> = ({ users, onRefresh }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
      <h1 style={{ color: "#2563eb", margin: 0 }}>Kullanıcı Yönetimi</h1>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button 
          onClick={onRefresh}
          style={{
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#059669";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#10b981";
          }}
        >
          🔄 Yenile
        </button>
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
    </div>
  );
};

export default AdminUsersHeader;
