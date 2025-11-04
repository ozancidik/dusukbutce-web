"use client";
import React from 'react';

interface AdminUsersErrorProps {
  error: string;
  onRetry: () => void;
}

const AdminUsersError: React.FC<AdminUsersErrorProps> = ({ error, onRetry }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Hata: {error}</h2>
      <button 
        onClick={onRetry}
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
};

export default AdminUsersError;
