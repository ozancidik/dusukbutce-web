'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserInfo {
  id: string;
  email: string;
  name: string;
  phone: string;
  birthDate: string;
  isAdmin: boolean;
}

export default function AdreslerimPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showMessage, setShowMessage] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [filteredAddresses, setFilteredAddresses] = useState<any[]>([]);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterDefault, setFilterDefault] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    isDefault: false
  });

  const router = useRouter();

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        
        if (userLoggedIn !== 'true') {
          console.log('🔍 Kullanıcı giriş yapmamış, login sayfasına yönlendiriliyor...');
          router.push('/login');
          return;
        }

        // Profile sayfasındaki gibi detaylı user data oluştur
        const userData = {
          id: localStorage.getItem('userId') || sessionStorage.getItem('userId'),
          email: localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail'),
          name: (() => {
            const name = localStorage.getItem('userName') || sessionStorage.getItem('userName');
            // Türkçe karakterleri düzelt
            if (name && name.includes('Ä±')) {
              return decodeURIComponent(escape(name));
            }
            return name;
          })(),
          phone: localStorage.getItem('userPhone') || sessionStorage.getItem('userPhone') || '',
          birthDate: localStorage.getItem('userBirthDate') || sessionStorage.getItem('userBirthDate') || '',
          isAdmin: localStorage.getItem('adminLoggedIn') === 'true' || sessionStorage.getItem('adminLoggedIn') === 'true'
        };
        
        console.log('🔍 Adreslerim sayfasında userData:', userData);
        
        // Eğer kullanıcı verileri yoksa, localStorage'ı temizle ve login sayfasına yönlendir
        if (!userData.id || !userData.email) {
          console.log('🔍 Kullanıcı verileri bulunamadı, localStorage temizleniyor ve login sayfasına yönlendiriliyor...');
          
          // Tüm localStorage'ı temizle
          localStorage.clear();
          sessionStorage.clear();
          
          // Özellikle userLoggedIn'i temizle
          localStorage.removeItem('userLoggedIn');
          sessionStorage.removeItem('userLoggedIn');
          
          // Sayfayı yenile ve login'e yönlendir
          window.location.href = '/login';
          return;
        }
        
        setUserInfo(userData as UserInfo);
      } catch (error) {
        console.error('Error loading user data:', error);
        router.push('/login');
        return;
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  // MongoDB'den adresleri çek
  useEffect(() => {
    const loadAddresses = async () => {
      if (userInfo?.id) {
        try {
          const response = await fetch(`/api/addresses?userId=${userInfo.id}`);
          if (response.ok) {
            const data = await response.json();
            setAddresses(data.addresses || []);
            setFilteredAddresses(data.addresses || []);
          } else {
            console.error('Adresler yüklenemedi');
          }
        } catch (error) {
          console.error('Adres yükleme hatası:', error);
        }
      }
    };

    loadAddresses();
  }, [userInfo]);

  // Filtreleme fonksiyonu
  useEffect(() => {
    let filtered = addresses;

    // Arama terimi ile filtrele
    if (searchTerm) {
      filtered = filtered.filter(address =>
        address.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Şehir ile filtrele
    if (filterCity) {
      filtered = filtered.filter(address => address.city === filterCity);
    }

    // Varsayılan adres ile filtrele
    if (filterDefault === 'yes') {
      filtered = filtered.filter(address => address.isDefault);
    } else if (filterDefault === 'no') {
      filtered = filtered.filter(address => !address.isDefault);
    }

    setFilteredAddresses(filtered);
  }, [addresses, searchTerm, filterCity, filterDefault]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'phone') {
      // Telefon numarası formatlaması
      const phoneRegex = /^[0-9\s\(\)]*$/;
      if (phoneRegex.test(value)) {
        let digits = value.replace(/\s/g, '').replace(/[\(\)]/g, '');
        digits = digits.substring(0, 10);
        
        let formattedValue = '';
        if (digits.length > 0) {
          if (digits.length > 0 && digits[0] !== '5') {
            return;
          }
          
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
        
        setFormData(prev => ({
          ...prev,
          [name]: formattedValue
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setShowMessage(false);

    // Validation
    if (!formData.title || !formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.district) {
      setMessage('Lütfen tüm zorunlu alanları doldurun.');
      setMessageType('error');
      setShowMessage(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/addresses', {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: userInfo?.id,
          ...(isEditing && { addressId: editingAddress._id })
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isEditing) {
          setMessage('Adres başarıyla güncellendi.');
          // MongoDB'den güncel verileri çek
          const refreshResponse = await fetch(`/api/addresses?userId=${userInfo?.id}`);
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            setAddresses(refreshData.addresses || []);
            setFilteredAddresses(refreshData.addresses || []);
          }
        } else {
          setMessage('Adres başarıyla eklendi.');
          // MongoDB'den güncel verileri çek
          const refreshResponse = await fetch(`/api/addresses?userId=${userInfo?.id}`);
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            setAddresses(refreshData.addresses || []);
            setFilteredAddresses(refreshData.addresses || []);
          }
        }
        
        setMessageType('success');
        setShowMessage(true);
        
        // Form'u temizle
        setFormData({
          title: '',
          fullName: '',
          phone: '',
          address: '',
          city: '',
          district: '',
          postalCode: '',
          isDefault: false
        });
        
        setShowAddForm(false);
        setIsEditing(false);
        setEditingAddress(null);

        // 3 saniye sonra mesajı gizle
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } else {
        setMessage(data.message || 'Adres ekleme işlemi başarısız.');
        setMessageType('error');
        setShowMessage(true);
      }
    } catch (error) {
      setMessage('Bağlantı hatası oluştu.');
      setMessageType('error');
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadAddresses = async () => {
    try {
      const response = await fetch(`/api/addresses?userId=${userInfo?.id}`);
      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      postalCode: '',
      isDefault: false
    });
    setShowAddForm(false);
    setIsEditing(false);
    setEditingAddress(null);
    setMessage('');
    setShowMessage(false);
  };

  const handleEdit = (address: any) => {
    setEditingAddress(address);
    setIsEditing(true);
    setShowAddForm(true);
    setFormData({
      title: address.title,
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      district: address.district,
      postalCode: address.postalCode || '',
      isDefault: address.isDefault || false
    });
  };

  const handleDelete = async (addressId: string) => {
    if (window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/addresses?addressId=${addressId}&userId=${userInfo?.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setMessage('Adres başarıyla silindi.');
          setMessageType('success');
          setShowMessage(true);
          
          // MongoDB'den güncel verileri çek
          const refreshResponse = await fetch(`/api/addresses?userId=${userInfo?.id}`);
          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            setAddresses(refreshData.addresses || []);
            setFilteredAddresses(refreshData.addresses || []);
          }
          
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        } else {
          const data = await response.json();
          setMessage(data.message || 'Adres silinirken hata oluştu.');
          setMessageType('error');
          setShowMessage(true);
        }
      } catch (error) {
        setMessage('Adres silinirken hata oluştu.');
        setMessageType('error');
        setShowMessage(true);
      }
    }
  };

  if (isLoading) {
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

  if (!userInfo) {
    return null;
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: isMobile ? '12px' : '20px'
    }}>
      {/* Breadcrumb */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: isMobile ? '12px 12px 0' : '20px 20px 0',
        marginBottom: isMobile ? '16px' : '20px'
      }}>
        <div style={{ 
          fontSize: isMobile ? '12px' : '16px',
          color: '#64748b'
        }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Anasayfa</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/profile" style={{ color: '#2563eb', textDecoration: 'none' }}>Profil</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>Adreslerim</span>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: isMobile ? '0 12px 20px' : '0 20px 20px'
      }}>
        {/* Ana İçerik */}
        <div style={{ 
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          {/* Başlık */}
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            padding: isMobile ? '20px' : '32px',
            color: 'white'
          }}>
            <h1 style={{
              margin: '0',
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: '700'
            }}>
              📍 Adreslerim
            </h1>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: isMobile ? '14px' : '16px',
              opacity: '0.9'
            }}>
              Kayıtlı adreslerinizi yönetin
            </p>
          </div>

          {/* İçerik */}
          <div style={{ padding: isMobile ? '20px' : '32px' }}>
            {/* Mesaj */}
            {showMessage && (
              <div style={{
                padding: isMobile ? '12px 16px' : '16px 20px',
                borderRadius: '12px',
                marginBottom: '24px',
                background: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`,
                color: messageType === 'success' ? '#166534' : '#dc2626',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '500'
              }}>
                {messageType === 'success' ? '✅' : '❌'} {message}
              </div>
            )}

            {/* Arama ve Filtreleme */}
            {addresses.length > 0 && (
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: isMobile ? '16px' : '20px',
                marginBottom: '24px'
              }}>
                <h4 style={{
                  margin: '0 0 16px 0',
                  fontSize: isMobile ? '16px' : '18px',
                  color: '#1e293b',
                  fontWeight: '600'
                }}>
                  🔍 Arama ve Filtreleme
                </h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Arama
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Başlık, ad soyad, adres ara..."
                      style={{
                        width: '100%',
                        padding: isMobile ? '8px 12px' : '10px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: isMobile ? '14px' : '16px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Şehir
                    </label>
                    <select
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      style={{
                        width: '100%',
                        padding: isMobile ? '8px 12px' : '10px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: isMobile ? '14px' : '16px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="">Tüm Şehirler</option>
                      <option value="İstanbul">İstanbul</option>
                      <option value="Ankara">Ankara</option>
                      <option value="İzmir">İzmir</option>
                      <option value="Bursa">Bursa</option>
                      <option value="Antalya">Antalya</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Varsayılan
                    </label>
                    <select
                      value={filterDefault}
                      onChange={(e) => setFilterDefault(e.target.value)}
                      style={{
                        width: '100%',
                        padding: isMobile ? '8px 12px' : '10px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: isMobile ? '14px' : '16px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="">Tümü</option>
                      <option value="yes">Varsayılan</option>
                      <option value="no">Normal</option>
                    </select>
                  </div>
                </div>
                
                {(searchTerm || filterCity || filterDefault) && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '12px'
                  }}>
                    <span style={{
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#6b7280'
                    }}>
                      {filteredAddresses.length} adres bulundu
                    </span>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilterCity('');
                        setFilterDefault('');
                      }}
                      style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Temizle
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Adres Listesi */}
            {filteredAddresses.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h3 style={{
                    margin: '0',
                    fontSize: isMobile ? '18px' : '20px',
                    color: '#1e293b',
                    fontWeight: '600'
                  }}>
                    Kayıtlı Adreslerim ({filteredAddresses.length})
                  </h3>
                  <button
                    onClick={() => setShowAddForm(true)}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: isMobile ? '8px 16px' : '10px 20px',
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    + Yeni Adres
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px'
                }}>
                  {filteredAddresses.map((address, index) => (
                    <div key={index} style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '20px',
                      position: 'relative'
                    }}>
                      {address.isDefault && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: '#10b981',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          Varsayılan
                        </div>
                      )}
                      
                      <h4 style={{
                        margin: '0 0 12px 0',
                        fontSize: isMobile ? '16px' : '18px',
                        color: '#1e293b',
                        fontWeight: '600'
                      }}>
                        {address.title}
                      </h4>
                      
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#374151' }}>Ad Soyad:</strong>
                        <span style={{ marginLeft: '8px', color: '#6b7280' }}>{address.fullName}</span>
                      </div>
                      
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#374151' }}>Telefon:</strong>
                        <span style={{ marginLeft: '8px', color: '#6b7280' }}>{address.phone}</span>
                      </div>
                      
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#374151' }}>Adres:</strong>
                        <div style={{ marginLeft: '8px', color: '#6b7280', marginTop: '4px' }}>
                          {address.address}
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#374151' }}>Şehir/İlçe:</strong>
                        <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                          {address.district} / {address.city}
                        </span>
                      </div>
                      
                      {address.postalCode && (
                        <div style={{ marginBottom: '12px' }}>
                          <strong style={{ color: '#374151' }}>Posta Kodu:</strong>
                          <span style={{ marginLeft: '8px', color: '#6b7280' }}>{address.postalCode}</span>
                        </div>
                      )}
                      
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '16px'
                      }}>
                        <button 
                          onClick={() => handleEdit(address)}
                          style={{
                            background: '#f3f4f6',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#e5e7eb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f3f4f6';
                          }}
                        >
                          Düzenle
                        </button>
                        <button 
                          onClick={() => handleDelete(address._id)}
                          style={{
                            background: '#fef2f2',
                            color: '#dc2626',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fee2e2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fef2f2';
                          }}
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Adres Ekleme Formu */}
            {showAddForm && (
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: isMobile ? '20px' : '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  margin: '0 0 20px 0',
                  fontSize: isMobile ? '18px' : '20px',
                  color: '#1e293b',
                  fontWeight: '600'
                }}>
                  {isEditing ? 'Adres Düzenle' : 'Yeni Adres Ekle'}
                </h3>

                <form onSubmit={handleSubmit}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Adres Başlığı *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ev, İş, vb."
                        required
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 12px' : '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: isMobile ? '14px' : '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Ad Soyad"
                        required
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 12px' : '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: isMobile ? '14px' : '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Telefon *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(5xx) xxx xx xx"
                        required
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 12px' : '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: isMobile ? '14px' : '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Posta Kodu
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="34000"
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 12px' : '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: isMobile ? '14px' : '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Adres *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Mahalle, sokak, bina no, daire no"
                      required
                      rows={3}
                      style={{
                        width: '100%',
                        padding: isMobile ? '10px 12px' : '12px 16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: isMobile ? '14px' : '16px',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '16px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Şehir *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 12px' : '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: isMobile ? '14px' : '16px',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="">Şehir Seçin</option>
                        <option value="İstanbul">İstanbul</option>
                        <option value="Ankara">Ankara</option>
                        <option value="İzmir">İzmir</option>
                        <option value="Bursa">Bursa</option>
                        <option value="Antalya">Antalya</option>
                        <option value="Adana">Adana</option>
                        <option value="Konya">Konya</option>
                        <option value="Gaziantep">Gaziantep</option>
                        <option value="Mersin">Mersin</option>
                        <option value="Diyarbakır">Diyarbakır</option>
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '6px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        İlçe *
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="İlçe"
                        required
                        style={{
                          width: '100%',
                          padding: isMobile ? '10px 12px' : '12px 16px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: isMobile ? '14px' : '16px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: isMobile ? '14px' : '16px',
                      color: '#374151',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleChange}
                        style={{
                          width: '16px',
                          height: '16px',
                          cursor: 'pointer'
                        }}
                      />
                      <span>Bu adresi varsayılan adres olarak ayarla</span>
                    </label>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      type="button"
                      onClick={handleCancel}
                      style={{
                        background: 'white',
                        color: '#6b7280',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: isMobile ? '10px 20px' : '12px 24px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#9ca3af';
                        e.currentTarget.style.color = '#374151';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.color = '#6b7280';
                      }}
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        background: isSubmitting 
                          ? '#9ca3af' 
                          : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: isMobile ? '10px 20px' : '12px 24px',
                        fontSize: isMobile ? '14px' : '16px',
                        fontWeight: '600',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isSubmitting 
                        ? (isEditing ? 'Güncelleniyor...' : 'Ekleniyor...') 
                        : (isEditing ? 'Adres Güncelle' : 'Adres Ekle')
                      }
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Adres Yoksa Gösterilecek İçerik */}
            {filteredAddresses.length === 0 && !showAddForm && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>📍</div>
                <h3 style={{
                  margin: '0 0 12px 0',
                  fontSize: isMobile ? '18px' : '24px',
                  color: '#1e293b'
                }}>
                  Henüz kayıtlı adresiniz yok
                </h3>
                <p style={{
                  margin: '0 0 24px 0',
                  fontSize: isMobile ? '14px' : '16px'
                }}>
                  İlk adresinizi ekleyerek başlayın
                </p>
                <button 
                  onClick={() => setShowAddForm(true)}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 24px' : '16px 32px',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  + Yeni Adres Ekle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
