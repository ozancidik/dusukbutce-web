"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminUsersHeader from './components/AdminUsersHeader';
import AdminUsersStats from './components/AdminUsersStats';
import AdminUsersTable from './components/AdminUsersTable';
import AdminUsersEmpty from './components/AdminUsersEmpty';
import AdminUsersLoading from './components/AdminUsersLoading';
import AdminUsersError from './components/AdminUsersError';
import AdminUsersAccessDenied from './components/AdminUsersAccessDenied';
import AdminUsersAuthCheck from './components/AdminUsersAuthCheck';

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

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
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
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const response = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
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

      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
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

  const toggleAdminRole = async (userId: string, currentRole: 'full' | 'viewer' | undefined) => {
    const nextRole = currentRole === 'viewer' ? 'full' : 'viewer';
    try {
      setUpdatingRole(userId);
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ adminRole: nextRole }),
      });
      const data = await response.json();
      if (data.success) {
        setUsers(prevUsers => prevUsers.map(user =>
          user._id === userId ? { ...user, adminRole: nextRole } : user
        ));
      } else {
        setError(data.message || 'Rol güncellenirken hata oluştu');
      }
    } catch (error) {
      console.error('❌ Role update error:', error);
      setError('Rol güncellenirken hata oluştu');
    } finally {
      setUpdatingRole(null);
    }
  };

  // Admin kontrolü yapılıyor
  if (checkingAuth) {
    return <AdminUsersAuthCheck />;
  }

  // Admin değilse erişim engellendi sayfasını göster
  if (!isAdmin) {
    return <AdminUsersAccessDenied />;
  }

  if (loading) {
    return <AdminUsersLoading />;
  }

  if (error) {
    return <AdminUsersError error={error} onRetry={fetchUsers} />;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <AdminUsersHeader users={users} onRefresh={fetchUsers} />

      <div style={{ 
        background: "white", 
        borderRadius: "12px", 
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden"
      }}>
        <AdminUsersStats users={users} />

        {users.length === 0 ? (
          <AdminUsersEmpty />
        ) : (
          <AdminUsersTable
            users={users}
            isUserOnline={isUserOnline}
            showDeleteConfirm={showDeleteConfirm}
            deletingUser={deletingUser}
            onDeleteConfirm={setShowDeleteConfirm}
            onDeleteCancel={() => setShowDeleteConfirm(null)}
            onDeleteUser={deleteAdminUser}
            updatingRole={updatingRole}
            onToggleAdminRole={toggleAdminRole}
          />
        )}
      </div>
    </div>
  );
} 