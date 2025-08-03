"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const router = useRouter();

  useEffect(() => {
    // localStorage'dan kullanıcı bilgilerini al
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn !== 'true') {
      router.push('/login');
      return;
    }

    const userData = {
      id: localStorage.getItem('userId'),
      email: localStorage.getItem('userEmail'),
      name: localStorage.getItem('userName'),
      isAdmin: localStorage.getItem('adminLoggedIn') === 'true'
    };

    setUserInfo(userData);
    
    // İsim ve soyisimi ayır
    const nameParts = userData.name?.split(' ') || ['', ''];
    setEditForm({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: userData.email || '',
      phone: '' // Telefon bilgisi localStorage'da yok
    });
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
    setMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    const nameParts = userInfo.name?.split(' ') || ['', ''];
    setEditForm({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: userInfo.email || '',
      phone: ''
    });
  };

  const handleSave = async () => {
    try {
      // API'ye güncelleme gönder
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userInfo.id,
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          email: editForm.email,
          phone: editForm.phone
        })
      });

      if (response.ok) {
        // localStorage'ı güncelle
        const newName = `${editForm.firstName} ${editForm.lastName}`.trim();
        localStorage.setItem('userName', newName);
        localStorage.setItem('userEmail', editForm.email);
        
        setUserInfo({
          ...userInfo,
          name: newName,
          email: editForm.email
        });
        
        setIsEditing(false);
        setMessage('Profil başarıyla güncellendi!');
        setMessageType('success');
      } else {
        setMessage('Güncelleme sırasında bir hata oluştu.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Bağlantı hatası oluştu.');
      setMessageType('error');
    }
  };

  const handleLogout = () => {
    // Tüm localStorage'ı temizle
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    
    router.push('/');
  };

  if (!userInfo) {
    return (
      <div style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div>Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '40px' 
        }}>
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Düşük Bütçe" 
              width={150} 
              height={50} 
              style={{ objectFit: 'contain', cursor: 'pointer' }} 
            />
          </Link>
        </div>

        {/* Ana Profil Kartı */}
        <div style={{ 
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          {/* Profil Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            padding: '32px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '32px'
            }}>
              {userInfo.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600' }}>
              {userInfo.name || 'Kullanıcı'}
            </h1>
            <p style={{ margin: '0', opacity: '0.9', fontSize: '16px' }}>
              {userInfo.email}
            </p>
            {userInfo.isAdmin && (
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                marginTop: '8px',
                display: 'inline-block'
              }}>
                Admin
              </div>
            )}
          </div>

          {/* Profil İçeriği */}
          <div style={{ padding: '32px' }}>
            {isEditing ? (
              /* Düzenleme Formu */
              <div>
                <h3 style={{ margin: '0 0 24px 0', color: '#1e293b', fontSize: '20px' }}>
                  Profil Bilgilerini Düzenle
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                      Ad
                    </label>
                    <input
                      type="text"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                      Soyad
                    </label>
                    <input
                      type="text"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    placeholder="0 (5XX) XXX XX XX"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: '16px'
                    }}
                  />
                </div>

                {message && (
                  <div style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    marginBottom: '16px',
                    background: messageType === 'success' ? '#dcfce7' : '#fee2e2',
                    color: messageType === 'success' ? '#166534' : '#dc2626',
                    border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`
                  }}>
                    {message}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleSave}
                    style={{
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={handleCancel}
                    style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    İptal
                  </button>
                </div>
              </div>
            ) : (
              /* Görüntüleme Modu */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ margin: '0', color: '#1e293b', fontSize: '20px' }}>
                    Hesap Bilgileri
                  </h3>
                  <button
                    onClick={handleEdit}
                    style={{
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Düzenle
                  </button>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ 
                    padding: '16px', 
                    background: '#f8fafc', 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Ad Soyad</div>
                    <div style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>
                      {userInfo.name || 'Belirtilmemiş'}
                    </div>
                  </div>

                  <div style={{ 
                    padding: '16px', 
                    background: '#f8fafc', 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>E-posta</div>
                    <div style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>
                      {userInfo.email || 'Belirtilmemiş'}
                    </div>
                  </div>

                  <div style={{ 
                    padding: '16px', 
                    background: '#f8fafc', 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Kullanıcı ID</div>
                    <div style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500', fontFamily: 'monospace' }}>
                      {userInfo.id || 'Belirtilmemiş'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hızlı Erişim Kartları */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          <Link href="/orders" style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '1px solid #e2e8f0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
            >
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>📦</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Siparişlerim</h4>
              <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>
                Geçmiş siparişlerinizi görüntüleyin
              </p>
            </div>
          </Link>

          <Link href="/notifications" style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: '1px solid #e2e8f0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
            >
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🔔</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Bildirimler</h4>
              <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>
                Bildirimlerinizi kontrol edin
              </p>
            </div>
          </Link>

          {userInfo.isAdmin && (
            <Link href="/admin" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #e2e8f0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
              >
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚙️</div>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Admin Paneli</h4>
                <p style={{ margin: '0', color: '#64748b', fontSize: '14px' }}>
                  Yönetim panelini açın
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* Çıkış Yap Butonu */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleLogout}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#dc2626';
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
} 