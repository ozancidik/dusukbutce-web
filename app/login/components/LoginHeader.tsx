"use client";
import React from 'react';

interface LoginHeaderProps {
  isAdminForm: boolean;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ isAdminForm }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "24px", marginTop: "-20px" }}>
      <h1 style={{ 
        color: isAdminForm ? "#7c3aed" : "#2563eb", 
        fontSize: "28px", 
        fontWeight: "700", 
        margin: "0 0 8px 0" 
      }}>
        {isAdminForm ? "⚙️ Admin Girişi" : "Giriş Yap"}
      </h1>
      <p style={{ color: "#64748b", margin: 0 }}>
        {isAdminForm ? "Admin hesabınıza giriş yapın" : "Hesabınıza giriş yapın"}
      </p>
      {isAdminForm && (
        <div style={{
          background: "rgba(124, 58, 237, 0.1)",
          border: "1px solid rgba(124, 58, 237, 0.3)",
          borderRadius: "8px",
          padding: "12px",
          marginTop: "16px",
          fontSize: "14px",
          color: "#7c3aed"
        }}>
          🔒 Admin girişi tespit edildi - Güvenlik kontrolleri aktif
        </div>
      )}
    </div>
  );
};

export default LoginHeader;
