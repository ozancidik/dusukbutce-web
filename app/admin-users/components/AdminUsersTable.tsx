"use client";
import React from 'react';

interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  isAdmin: boolean;
  adminRole?: 'full' | 'viewer';
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  acceptNewsletter?: boolean;
  emailVerified?: boolean;
}

interface AdminUsersTableProps {
  users: User[];
  isUserOnline: (lastLogin: string | Date) => boolean;
  showDeleteConfirm: string | null;
  deletingUser: string | null;
  onDeleteConfirm: (userId: string) => void;
  onDeleteCancel: () => void;
  onDeleteUser: (userId: string) => void;
  updatingRole: string | null;
  onToggleAdminRole: (userId: string, currentRole: 'full' | 'viewer' | undefined) => void;
}

const AdminUsersTable: React.FC<AdminUsersTableProps> = ({
  users,
  isUserOnline,
  showDeleteConfirm,
  deletingUser,
  onDeleteConfirm,
  onDeleteCancel,
  onDeleteUser,
  updatingRole,
  onToggleAdminRole
}) => {
  return (
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
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Yetki Seviyesi</th>
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Email Doğrulama</th>
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Newsletter</th>
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Kayıt Tarihi</th>
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Son Giriş</th>
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Online</th>
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Durum</th>
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>İşlemler</th>
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
                {user.isAdmin ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{
                      background: user.adminRole === 'viewer' ? "#9ca3af" : "#2563eb",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px"
                    }}>
                      {user.adminRole === 'viewer' ? "Salt Okunur" : "Tam Yetki"}
                    </span>
                    <button
                      onClick={() => onToggleAdminRole(user._id, user.adminRole)}
                      disabled={updatingRole === user._id}
                      style={{
                        background: "transparent",
                        color: "#2563eb",
                        border: "1px solid #2563eb",
                        borderRadius: "4px",
                        padding: "3px 8px",
                        fontSize: "11px",
                        cursor: updatingRole === user._id ? "not-allowed" : "pointer",
                        opacity: updatingRole === user._id ? 0.6 : 1
                      }}
                    >
                      {updatingRole === user._id
                        ? "⏳"
                        : user.adminRole === 'viewer' ? "Tam Yetki Yap" : "Salt Okunur Yap"}
                    </button>
                  </div>
                ) : (
                  <span style={{ color: "#9ca3af", fontSize: "12px" }}>-</span>
                )}
              </td>
              <td style={{ padding: "12px" }}>
                <span style={{
                  background: user.emailVerified ? "#059669" : "#dc2626",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  {user.emailVerified ? "✅ Doğrulandı" : "❌ Doğrulanmadı"}
                </span>
              </td>
              <td style={{ padding: "12px" }}>
                <span style={{
                  background: user.acceptNewsletter ? "#2563eb" : "#9ca3af",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  {user.acceptNewsletter ? "📧 Abone" : "📭 Değil"}
                </span>
              </td>
              <td style={{ padding: "12px" }}>
                {new Date(user.createdAt).toLocaleDateString('tr-TR')}
              </td>
              <td style={{ padding: "12px" }}>
                {user.lastLogin ? (
                  <div>
                    <div style={{ fontSize: "12px", color: "#374151", marginBottom: "2px" }}>
                      {new Date(user.lastLogin).toLocaleDateString('tr-TR')}
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280" }}>
                      {new Date(user.lastLogin).toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ) : (
                  <span style={{ color: "#9ca3af", fontSize: "12px" }}>Hiç giriş yapmamış</span>
                )}
              </td>
              <td style={{ padding: "12px" }}>
                {user.lastLogin ? (
                  <span style={{
                    background: isUserOnline(user.lastLogin) ? "#059669" : "#6b7280",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    {isUserOnline(user.lastLogin) ? "🟢" : "⚫"} 
                    {isUserOnline(user.lastLogin) ? "Online" : "Offline"}
                  </span>
                ) : (
                  <span style={{
                    background: "#6b7280",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    ⚫ Offline
                  </span>
                )}
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
              <td style={{ padding: "12px" }}>
                {user.isAdmin && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    {showDeleteConfirm === user._id ? (
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        <button
                          onClick={() => onDeleteUser(user._id)}
                          disabled={deletingUser === user._id}
                          style={{
                            background: "#dc2626",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            fontSize: "11px",
                            cursor: deletingUser === user._id ? "not-allowed" : "pointer",
                            opacity: deletingUser === user._id ? 0.6 : 1,
                            transition: "background 0.2s"
                          }}
                          onMouseEnter={(e) => {
                            if (deletingUser !== user._id) {
                              e.currentTarget.style.background = "#b91c1c";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (deletingUser !== user._id) {
                              e.currentTarget.style.background = "#dc2626";
                            }
                          }}
                        >
                          {deletingUser === user._id ? "⏳" : "✅"}
                        </button>
                        <button
                          onClick={onDeleteCancel}
                          style={{
                            background: "#6b7280",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            fontSize: "11px",
                            cursor: "pointer",
                            transition: "background 0.2s"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#4b5563";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#6b7280";
                          }}
                        >
                          ❌
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onDeleteConfirm(user._id)}
                        style={{
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          fontSize: "11px",
                          cursor: "pointer",
                          transition: "background 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#b91c1c";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#dc2626";
                        }}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;
