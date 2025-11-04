"use client";
import React from 'react';

const AdminUsersEmpty: React.FC = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
      <h3>Henüz kullanıcı bulunmuyor</h3>
      <p>Kullanıcılar kayıt oldukça burada görünecek.</p>
    </div>
  );
};

export default AdminUsersEmpty;
