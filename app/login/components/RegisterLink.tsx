"use client";
import React from 'react';
import Link from 'next/link';

const RegisterLink: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "16px" }}>
      <p style={{ 
        color: "#64748b", 
        margin: "0 0 8px 0",
        fontSize: "15px"
      }}>
        Hesabınız yok mu?
      </p>
      <Link
        href="/register"
        style={{
          color: "#2563eb",
          textDecoration: "underline",
          fontWeight: "700",
          fontSize: "16px",
          display: "inline-block"
        }}
      >
        Kayıt olun
      </Link>
    </div>
  );
};

export default RegisterLink;
