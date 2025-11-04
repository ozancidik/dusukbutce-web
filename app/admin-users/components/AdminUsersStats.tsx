"use client";
import React from 'react';

interface AdminUsersStatsProps {
  users: any[];
}

const AdminUsersStats: React.FC<AdminUsersStatsProps> = ({ users }) => {
  return (
    <div style={{ 
      padding: "20px", 
      borderBottom: "1px solid #e2e8f0",
      background: "#f8fafc"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <h2 style={{ margin: 0, color: "#374151" }}>
          Toplam {users.length} Kullanıcı
        </h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <div style={{
            background: "#eff6ff",
            border: "1px solid #93c5fd",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "13px",
            color: "#1e40af",
            fontWeight: "600"
          }}>
            📧 Newsletter: {users.filter(u => u.acceptNewsletter).length} abone
          </div>
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "13px",
            color: "#166534",
            fontWeight: "600"
          }}>
            ✅ Doğrulanmış: {users.filter(u => u.emailVerified).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersStats;
