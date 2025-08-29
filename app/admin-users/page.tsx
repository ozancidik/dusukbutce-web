"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAdminStatus();
    
    // Profile güncelleme event'ini dinle
    const handleProfileUpdate = () => {
      console.log('🔄 Profile güncellendi, kullanıcı listesi yenileniyor...');
      fetchUsers();
    };
    
    // Event listener ekle
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    // Cleanup
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  const checkAdminStatus = () => {
    try {
      // localStorage ve sessionStorage'dan admin bilgisini kontrol et
      const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
      
      if (adminLoggedIn === "true") {
        setIsAdmin(true);
        setCheckingAuth(false);
        fetchUsers(); // Admin ise kullanıcıları getir
      } else {
        setIsAdmin(false);
        setCheckingAuth(false);
      }
    } catch (error) {
      console.error('Admin kontrol hatası:', error);
      setIsAdmin(false);
      setCheckingAuth(false);
    }
  };

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

  // Kullanıcının online olup olmadığını kontrol et
  const isUserOnline = (lastLogin: string | Date) => {
    if (!lastLogin) return false;
    
    const lastLoginTime = new Date(lastLogin).getTime();
    const now = Date.now();
    const timeDiff = now - lastLoginTime;
    
    // Son 15 dakika içinde giriş yapmışsa online kabul et
    const fifteenMinutes = 15 * 60 * 1000;
    return timeDiff < fifteenMinutes;
  };

  const deleteAdminUser = async (userId: string) => {
    try {
      setDeletingUser(userId);
      console.log('🗑️ Admin kullanıcı siliniyor:', userId);
      
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Admin kullanıcı başarıyla silindi');
        // Kullanıcı listesinden sil
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
        setShowDeleteConfirm(null);
      } else {
        throw new Error(data.message || 'Kullanıcı silinirken hata oluştu');
      }
    } catch (error) {
      console.error('❌ Delete error:', error);
      setError(error instanceof Error ? error.message : 'Kullanıcı silinirken hata oluştu');
    } finally {
      setDeletingUser(null);
    }
  };

  // Admin kontrolü yapılıyor
  if (checkingAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            🔒
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 8px 0'
          }}>
            Yetki Kontrol Ediliyor
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Lütfen bekleyin...
          </p>
        </div>
      </div>
    );
  }

  // Admin değilse erişim engellendi sayfasını göster
  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '80px 20px 20px 20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            fontSize: '56px',
            marginBottom: '12px'
          }}>
            🚫
          </div>
          <h1 style={{
            fontSize: '22px',
            fontWeight: '700',
            color: '#dc2626',
            margin: '0 0 12px 0'
          }}>
            Erişim Engellendi
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#6b7280',
            margin: '0 0 20px 0',
            lineHeight: '1.5'
          }}>
            Bu sayfaya erişim yetkiniz bulunmamaktadır. Sadece yönetici hesapları bu alana erişebilir.
          </p>
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3b82f6';
              }}>
                🏠 Anasayfaya Dön
              </button>
            </Link>
            <button 
              onClick={() => {
                // Sadece admin bilgilerini temizle
                localStorage.removeItem('adminLoggedIn');
                localStorage.removeItem('adminEmail');
                sessionStorage.removeItem('adminLoggedIn');
                sessionStorage.removeItem('adminEmail');
                
                // Custom event'i tetikle
                window.dispatchEvent(new Event('localStorageChange'));
                
                // Header'a logout mesajı gönder
                window.dispatchEvent(new CustomEvent('logout'));
                
                // Admin-users sayfasında kal (ana sayfaya yönlendirme yok)
                // Sayfayı yenile
                window.location.reload();
              }}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#dc2626';
              }}>
                🚪 Çıkış Yap
              </button>
          </div>
          <div style={{
            marginTop: '20px',
            padding: '14px',
            background: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#6b7280',
              margin: '0 0 6px 0',
              fontWeight: '500'
            }}>
              💡 Yardım
            </p>
            <p style={{
              fontSize: '12px',
              color: '#9ca3af',
              margin: 0,
              lineHeight: '1.4'
            }}>
              Eğer yönetici hesabınız olduğunu düşünüyorsanız, lütfen çıkış yapıp tekrar giriş yapın.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button 
            onClick={fetchUsers}
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
          <>
            {/* Desktop Tablo Görünümü */}
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
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Son Giriş</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Online Durumu</th>
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
                                  onClick={() => deleteAdminUser(user._id)}
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
                                  onClick={() => setShowDeleteConfirm(null)}
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
                                onClick={() => setShowDeleteConfirm(user._id)}
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


          </>
        )}
      </div>
    </div>
  );
} 