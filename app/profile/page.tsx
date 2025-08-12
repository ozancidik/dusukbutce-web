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
      phone: localStorage.getItem('userPhone') || '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'firstName' || name === 'lastName') {
      // Sadece Türkçe harfler, boşluk ve tire (-) karakterine izin ver
      const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s-]*$/;
      
      // 20 karakter sınırı (her alan için)
      if (value.length <= 20 && (nameRegex.test(value) || value === '')) {
        setEditForm({ ...editForm, [name]: value });
      }
    } else if (name === 'email') {
      // Email için sadece geçerli karakterlere izin ver
      const emailRegex = /^[a-zA-Z0-9@._-]*$/;
      if (emailRegex.test(value) || value === '') {
        setEditForm({ ...editForm, [name]: value.toLowerCase() });
      }
    } else if (name === 'phone') {
      // Sadece rakam, parantez ve boşluk karakterlerine izin ver
      const phoneRegex = /^[0-9\s\(\)]*$/;
      if (phoneRegex.test(value)) {
        // Sadece rakamları al
        let digits = value.replace(/\s/g, '').replace(/[\(\)]/g, '');
        
        // Maksimum 10 rakam (alan kodu + 7 rakam)
        digits = digits.substring(0, 10);
        
        let formattedValue = '';
        
        if (digits.length > 0) {
          // İlk rakam 5 olmalı
          if (digits.length > 0 && digits[0] !== '5') {
            return; // 5 ile başlamıyorsa güncelleme yapma
          }
          
          // (5xx) xxx xx xx formatına çevir
          formattedValue = '(' + digits.substring(0, 3);
          
          if (digits.length > 3) {
            formattedValue += ') ' + digits.substring(3, 6);
          }
          
          if (digits.length > 6) {
            formattedValue += ' ' + digits.substring(6, 8);
          }
          
          if (digits.length > 8) {
            formattedValue += ' ' + digits.substring(8, 10);
          }
        }
        
        setEditForm({ ...editForm, [name]: formattedValue });
      }
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
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
    setMessage('');
    setMessageType('error');

    // Ad validasyonu
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s-]+$/;
    if (!nameRegex.test(editForm.firstName.trim())) {
      setMessage('Ad sadece harf, boşluk ve tire (-) içerebilir.');
      return;
    }
    
    if (editForm.firstName.trim().length < 2) {
      setMessage('Ad en az 2 karakter olmalıdır.');
      return;
    }
    
    if (editForm.firstName.trim().length > 20) {
      setMessage('Ad en fazla 20 karakter olabilir.');
      return;
    }
    
    // Soyad validasyonu
    if (!nameRegex.test(editForm.lastName.trim())) {
      setMessage('Soyad sadece harf, boşluk ve tire (-) içerebilir.');
      return;
    }
    
    if (editForm.lastName.trim().length < 2) {
      setMessage('Soyad en az 2 karakter olmalıdır.');
      return;
    }
    
    if (editForm.lastName.trim().length > 20) {
      setMessage('Soyad en fazla 20 karakter olabilir.');
      return;
    }
    
    // Email validasyonu
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(editForm.email.trim())) {
      setMessage('Geçerli bir email adresi giriniz.');
      return;
    }
    
    // Email uzunluk kontrolü
    if (editForm.email.trim().length > 100) {
      setMessage('Email adresi çok uzun.');
      return;
    }
    
    // Telefon validasyonu - (5xx) xxx xx xx formatı
    if (editForm.phone.trim()) {
      const phoneRegex = /^\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/;
      if (!phoneRegex.test(editForm.phone)) {
        setMessage('Geçerli bir telefon numarası giriniz. Örn: (555) 123 45 67');
        return;
      }
      
      // Alan kodu 5 ile başlamalı
      const areaCode = editForm.phone.substring(1, 4); // Parantez içindeki 3 rakam
      if (!areaCode.startsWith('5')) {
        setMessage('Telefon numarası 5 ile başlamalıdır. Örn: (555) 123 45 67');
        return;
      }
    }

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
          phone: editForm.phone ? '0' + editForm.phone.replace(/\s/g, '').replace(/[\(\)]/g, '') : ''
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // localStorage'ı güncelle
        const newName = `${editForm.firstName} ${editForm.lastName}`.trim();
        localStorage.setItem('userName', newName);
        localStorage.setItem('userEmail', editForm.email);
        localStorage.setItem('userPhone', editForm.phone);
        
        setUserInfo({
          ...userInfo,
          name: newName,
          email: editForm.email,
          phone: editForm.phone
        });
        
        setIsEditing(false);
        setMessage('Profil başarıyla güncellendi!');
        setMessageType('success');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Güncelleme sırasında bir hata oluştu.');
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
    
    // useAuth hook için gerekli alanları da temizle
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Custom event'i tetikle
    window.dispatchEvent(new Event('localStorageChange'));
    
    // Header'a logout mesajı gönder
    window.dispatchEvent(new CustomEvent('logout'));
    
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
                       name="firstName"
                       value={editForm.firstName}
                       onChange={handleChange}
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
                       name="lastName"
                       value={editForm.lastName}
                       onChange={handleChange}
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
                     name="email"
                     value={editForm.email}
                     onChange={handleChange}
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
                     name="phone"
                     value={editForm.phone}
                     onChange={handleChange}
                     placeholder="(5XX) XXX XX XX"
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
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '16px' 
                  }}>
                    <div style={{ 
                      padding: '16px', 
                      background: '#f8fafc', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Ad</div>
                      <div style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>
                        {userInfo.name?.split(' ')[0] || 'Belirtilmemiş'}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '16px', 
                      background: '#f8fafc', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Soyad</div>
                      <div style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>
                        {userInfo.name?.split(' ').slice(1).join(' ') || 'Belirtilmemiş'}
                      </div>
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
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Cep Telefonu</div>
                    <div style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500' }}>
                      {userInfo.phone ? userInfo.phone : 'Belirtilmemiş'}
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