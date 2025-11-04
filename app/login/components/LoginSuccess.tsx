"use client";
import React from 'react';

interface LoginSuccessProps {
  isAdminForm: boolean;
  redirectMessage: string;
}

const LoginSuccess: React.FC<LoginSuccessProps> = ({ isAdminForm, redirectMessage }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>
          {isAdminForm ? "⚙️" : "✅"}
        </div>
        <h2 style={{ 
          color: isAdminForm ? "#7c3aed" : "#10b981", 
          fontSize: "24px", 
          fontWeight: "600", 
          margin: "0 0 16px 0" 
        }}>
          {isAdminForm ? "Admin Giriş Başarılı!" : "Giriş Başarılı!"}
        </h2>
        <p style={{ 
          color: "#64748b", 
          margin: "0 0 24px 0",
          fontSize: "16px"
        }}>
          {redirectMessage}
        </p>
        <div style={{
          width: "40px",
          height: "40px",
          border: `3px solid ${isAdminForm ? "#7c3aed" : "#10b981"}`,
          borderTop: "3px solid transparent",
          borderRadius: "50%",
          margin: "0 auto",
          animation: "spin 1s linear infinite"
        }}></div>
      </div>
    </div>
  );
};

export default LoginSuccess;
