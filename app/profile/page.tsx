"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  console.log('🔍 ProfilePage component loaded!');
  console.log('🔍 React version:', React.version);
  console.log('🔍 useState available:', typeof useState);
  
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [canEditBirthDate, setCanEditBirthDate] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Mobil responsive kontrol
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Güvenli Türkçe karakter decode fonksiyonu
  const safeDecodeName = (name: string): string => {
    if (!name) return '';
    
    // Eğer isim zaten düzeltilmişse (Türkçe karakterler doğru), direkt döndür
    if (!name.includes('Ä±') && !name.includes('Ä°') && !name.includes('Ä±')) {
      return name;
    }
    
    try {
      // Sadece bozuk karakterler varsa decode et
      return decodeURIComponent(escape(name));
    } catch (error) {
      console.warn('Karakter decode hatası:', error);
      // Hata durumunda orijinal ismi döndür
      return name;
    }
  };

  // Telefon numarasını formatlayan yardımcı fonksiyon
  const formatPhoneNumber = (phone: string): string => {
    if (!phone) return '';
    
    // Sadece rakamları al
    let digits = phone.replace(/\D/g, '');
    
    if (digits.length === 0) return '';
    
    // Eğer 0 ile başlıyorsa (05123543233), 0'ı kaldır
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    
    // (5xx) xxx xx xx formatına çevir
    let formattedValue = '';
    
    if (digits.length > 0) {
      // İlk rakam 5 olmalı
      if (digits[0] !== '5') {
        return '';
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
    
    return formattedValue;
  };

  // Doğum tarihi düzenlenebilir mi kontrol fonksiyonu
  const isBirthDateEditable = (): boolean => {
    // userInfo yoksa, düzenlenemez
    if (!userInfo) {
      return false;
    }
    
    // Çoklu kontrol: userInfo.birthDateEdited, localStorage, authProviders, birthDate
    const birthDateEditedFromStorage = localStorage.getItem('birthDateEdited') === 'true' || 
                                        sessionStorage.getItem('birthDateEdited') === 'true';
    const birthDateEditedFromUserInfo = (userInfo as any)?.birthDateEdited === true;
    const birthDate = (userInfo as any)?.birthDate || '';
    
    // OAuth kullanıcısı kontrolü (authProviders'dan)
    const authProviders = (userInfo as any)?.authProviders || [];
    const hasSocialProvider = authProviders.some((provider: any) => 
      provider.provider === 'google' || provider.provider === 'facebook'
    );
    const hasLocalProvider = authProviders.some((provider: any) => 
      provider.provider === 'local'
    );
    
    // Local authentication kullanıcıları için doğum tarihi düzenlenemez
    if (hasLocalProvider) {
      return false;
    }
    
    // Eğer OAuth kullanıcısı ise ve zaten bir doğum tarihi varsa, düzenlenemez (migration için)
    // Bu, eski kayıtlar için geçerli - zaten bir doğum tarihi varsa, artık düzenlenemez
    if (hasSocialProvider && birthDate && !hasLocalProvider) {
      console.log('🔒 isBirthDateEditable: OAuth kullanıcısı ve zaten doğum tarihi var, düzenlenemez');
      return false;
    }
    
    // Eğer herhangi biri true ise, düzenlenemez
    if (birthDateEditedFromUserInfo || birthDateEditedFromStorage) {
      return false;
    }
    
    // Sadece OAuth kullanıcıları, daha önce düzenlenmemişse ve doğum tarihi yoksa düzenlenebilir
    return hasSocialProvider && !birthDateEditedFromUserInfo && !birthDateEditedFromStorage && !birthDate;
  };

  // Kullanıcı verilerini yükleme fonksiyonu
  const loadUserData = async () => {
    // localStorage'dan kullanıcı bilgilerini al
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn !== 'true') {
      console.log('🔍 Kullanıcı giriş yapmamış, login sayfasına yönlendiriliyor...');
      router.push('/login');
      return;
    }

    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    const userName = (() => {
      const name = localStorage.getItem('userName') || sessionStorage.getItem('userName');
      // Türkçe karakterleri düzelt
      if (name && name.includes('Ä±')) {
        return decodeURIComponent(escape(name));
      }
      return name;
    })();
    
    // Eğer kullanıcı verileri yoksa, localStorage'ı temizle ve login sayfasına yönlendir
    if (!userId || !userEmail) {
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

    // API'den kullanıcı bilgilerini çek (authProviders ve birthDateEdited bilgisi için)
    try {
      const response = await fetch(`/api/auth/update-profile?userId=${userId}`);
      const data = await response.json();
      
      if (data.success && data.user) {
        const apiUserData = data.user;
        const authProviders = apiUserData.authProviders || [];
        let birthDateEdited = apiUserData.birthDateEdited || false;
        
        // MIGRATION: Eğer OAuth kullanıcısı ise ve zaten bir birthDate değeri varsa
        // ama birthDateEdited false ise, bunu true yap (eski kayıtlar için)
        const hasSocialProvider = authProviders.some((provider: any) => 
          provider.provider === 'google' || provider.provider === 'facebook'
        );
        const hasLocalProvider = authProviders.some((provider: any) => 
          provider.provider === 'local'
        );
        
        const birthDate = apiUserData.birthDate || localStorage.getItem('userBirthDate') || sessionStorage.getItem('userBirthDate') || '';
        
        // Eğer OAuth kullanıcısı ise ve zaten bir doğum tarihi varsa ama birthDateEdited false ise
        // Frontend'de de bunu true olarak kabul et (API migration yapacak ama frontend'de de kontrol et)
        if (hasSocialProvider && !hasLocalProvider && birthDate && !birthDateEdited) {
          console.log('🔄 MIGRATION (Frontend): OAuth kullanıcısı için birthDateEdited flag\'i set ediliyor');
          console.log('🔄 birthDate:', birthDate);
          console.log('🔄 birthDateEdited (önceki):', birthDateEdited);
          
          // Frontend'de geçici olarak true yap (API bir sonraki çağrıda düzeltecek)
          birthDateEdited = true;
          
          // localStorage'a da kaydet
          localStorage.setItem('birthDateEdited', 'true');
          sessionStorage.setItem('birthDateEdited', 'true');
          
          console.log('✅ MIGRATION (Frontend): birthDateEdited=true yapıldı');
        }
        
        const userData = {
          id: userId,
          email: apiUserData.email || userEmail,
          name: apiUserData.name || userName,
          phone: apiUserData.phone || localStorage.getItem('userPhone') || sessionStorage.getItem('userPhone') || '',
          birthDate: birthDate,
          isAdmin: apiUserData.isAdmin || localStorage.getItem('adminLoggedIn') === 'true' || sessionStorage.getItem('adminLoggedIn') === 'true',
          authProviders: authProviders,
          birthDateEdited: birthDateEdited
        };
        
        // localStorage'a authProviders ve birthDateEdited bilgisini kaydet
        localStorage.setItem('userBirthDate', userData.birthDate);
        localStorage.setItem('birthDateEdited', birthDateEdited.toString());
        if (birthDateEdited) {
          sessionStorage.setItem('birthDateEdited', 'true');
        } else {
          sessionStorage.removeItem('birthDateEdited');
        }
        
        // Doğum tarihi düzenleme kuralları:
        // 1. Normal kayıt (local) → düzenlenemez
        // 2. Sosyal medya (google/facebook) + daha önce düzenlenmemişse → 1 seferlik düzenlenebilir
        // 3. Sosyal medya + daha önce düzenlenmişse → düzenlenemez
        // 4. Sosyal medya + zaten bir doğum tarihi varsa → düzenlenemez (migration)
        const canEdit = hasSocialProvider && !birthDateEdited && !birthDate;
        
        console.log('🔍 Doğum tarihi düzenleme kontrolü:');
        console.log('🔍 authProviders:', authProviders);
        console.log('🔍 hasSocialProvider:', hasSocialProvider);
        console.log('🔍 hasLocalProvider:', hasLocalProvider);
        console.log('🔍 birthDateEdited:', birthDateEdited);
        console.log('🔍 birthDate:', birthDate);
        console.log('🔍 canEditBirthDate:', canEdit);
        console.log('🔍 userData.birthDate:', userData.birthDate);
        
        setIsSocialLogin(hasSocialProvider);
        setCanEditBirthDate(canEdit);
        
        setUserInfo(userData);
        
        // İsim ve soyisimi ayır
        const nameParts = userData.name ? safeDecodeName(userData.name).split(' ') : ['', ''];
        setEditForm({
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: userData.email || '',
          phone: formatPhoneNumber(userData.phone || ''),
          birthDate: userData.birthDate || ''
        });
      } else {
        // API hatası durumunda localStorage'dan devam et
        console.warn('⚠️ API\'den kullanıcı bilgileri alınamadı, localStorage\'dan devam ediliyor');
        const userData = {
          id: userId,
          email: userEmail,
          name: userName,
          phone: localStorage.getItem('userPhone') || sessionStorage.getItem('userPhone') || '',
          birthDate: localStorage.getItem('userBirthDate') || sessionStorage.getItem('userBirthDate') || '',
          isAdmin: localStorage.getItem('adminLoggedIn') === 'true' || sessionStorage.getItem('adminLoggedIn') === 'true',
          authProviders: [],
          birthDateEdited: false
        };
        
        setUserInfo(userData);
        const nameParts = userData.name ? safeDecodeName(userData.name).split(' ') : ['', ''];
        setEditForm({
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: userData.email || '',
          phone: formatPhoneNumber(userData.phone || ''),
          birthDate: userData.birthDate || ''
        });
      }
    } catch (error) {
      console.error('❌ Kullanıcı bilgileri yüklenirken hata:', error);
      // Hata durumunda localStorage'dan devam et
      const userData = {
        id: userId,
        email: userEmail,
        name: userName,
        phone: localStorage.getItem('userPhone') || sessionStorage.getItem('userPhone') || '',
        birthDate: localStorage.getItem('userBirthDate') || sessionStorage.getItem('userBirthDate') || '',
        isAdmin: localStorage.getItem('adminLoggedIn') === 'true' || sessionStorage.getItem('adminLoggedIn') === 'true',
        authProviders: [],
        birthDateEdited: false
      };
      
      setUserInfo(userData);
      const nameParts = userData.name ? safeDecodeName(userData.name).split(' ') : ['', ''];
      setEditForm({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: userData.email || '',
        phone: formatPhoneNumber(userData.phone || ''),
        birthDate: userData.birthDate || ''
      });
    }
  };

  useEffect(() => {
    loadUserData();
    
    // Multi-tab synchronization için event listener'lar
    const handleStorageChange = () => {
      loadUserData();
    };
    
    const handleLocalStorageChange = () => {
      loadUserData();
    };
    
    const handleProfileUpdated = () => {
      loadUserData();
    };
    
    // Event listener'ları ekle
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleLocalStorageChange);
    window.addEventListener('profileUpdated', handleProfileUpdated);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleLocalStorageChange);
      window.removeEventListener('profileUpdated', handleProfileUpdated);
    };
  }, [router]);

  const handleEdit = async () => {
    setIsEditing(true);
    setMessage('');
    const currentEmail = userInfo?.email || '';
    setOriginalEmail(currentEmail);
    setIsEmailChanged(false);
    setEmailVerificationCode('');
    
    // Önce localStorage'dan birthDateEdited bilgisini kontrol et (hızlı kontrol)
    const birthDateEditedFromStorage = localStorage.getItem('birthDateEdited') === 'true' || 
                                        sessionStorage.getItem('birthDateEdited') === 'true';
    
    // userInfo'dan authProviders kontrolü
    const authProviders = (userInfo as any)?.authProviders || [];
    const hasSocialProvider = authProviders.some((provider: any) => 
      provider.provider === 'google' || provider.provider === 'facebook'
    );
    const hasLocalProvider = authProviders.some((provider: any) => 
      provider.provider === 'local'
    );
    
    // Eğer localStorage'da birthDateEdited true ise, hemen state'i güncelle (API çağrısı yapmadan önce)
    if (birthDateEditedFromStorage) {
      console.log('🔒 handleEdit: localStorage birthDateEdited=true, input disabled olacak');
      setCanEditBirthDate(false);
      setIsSocialLogin(hasSocialProvider);
      // userInfo'yu güncelle
      setUserInfo(prev => ({
        ...prev,
        birthDateEdited: true,
        authProviders: authProviders
      }));
    } else if (hasSocialProvider && !hasLocalProvider) {
      // OAuth kullanıcısı ve daha önce düzenlenmemişse, düzenlenebilir
      console.log('🔓 handleEdit: OAuth kullanıcısı, düzenlenebilir');
      setCanEditBirthDate(true);
      setIsSocialLogin(true);
    } else {
      // Local authentication kullanıcısı veya bilinmeyen durum
      console.log('🔒 handleEdit: Local kullanıcı veya bilinmeyen durum, düzenlenemez');
      setCanEditBirthDate(false);
      setIsSocialLogin(hasSocialProvider);
    }
    
    // Güncel kullanıcı bilgilerini API'den çek (birthDateEdited durumunu kontrol etmek için)
    if (userInfo?.id) {
      try {
        const response = await fetch(`/api/auth/update-profile?userId=${userInfo.id}`);
        const data = await response.json();
        
        if (data.success && data.user) {
          const apiUserData = data.user;
          const authProviders = apiUserData.authProviders || [];
          const birthDateEdited = apiUserData.birthDateEdited || false;
          
          console.log('🔍 API response: birthDateEdited=', birthDateEdited);
          
          const hasSocialProvider = authProviders.some((provider: any) => 
            provider.provider === 'google' || provider.provider === 'facebook'
          );
          
          // canEditBirthDate state'ini güncelle (API'den gelen bilgi kesin)
          const canEdit = hasSocialProvider && !birthDateEdited;
          console.log('🔍 canEditBirthDate=', canEdit, '(hasSocialProvider:', hasSocialProvider, ', birthDateEdited:', birthDateEdited, ')');
          setCanEditBirthDate(canEdit);
          setIsSocialLogin(hasSocialProvider);
          
          // localStorage'a kaydet (API'den gelen bilgi kesin olduğu için)
          if (birthDateEdited) {
            localStorage.setItem('birthDateEdited', 'true');
            sessionStorage.setItem('birthDateEdited', 'true');
            console.log('💾 localStorage\'a birthDateEdited=true kaydedildi');
          } else {
            localStorage.removeItem('birthDateEdited');
            sessionStorage.removeItem('birthDateEdited');
            console.log('💾 localStorage\'dan birthDateEdited kaldırıldı');
          }
          
          // userInfo'yu güncelle
          setUserInfo(prev => ({
            ...prev,
            birthDate: apiUserData.birthDate || prev.birthDate,
            birthDateEdited: birthDateEdited,
            authProviders: authProviders
          }));
          
          // EditForm'u güncelle
          setEditForm(prev => ({
            ...prev,
            email: currentEmail,
            birthDate: apiUserData.birthDate || prev.birthDate
          }));
        } else {
          // API'den bilgi alınamazsa, localStorage'dan kontrol et
          console.warn('⚠️ API\'den bilgi alınamadı, localStorage\'dan kontrol ediliyor');
          const hasSocialProvider = (userInfo as any)?.authProviders?.some((provider: any) => 
            provider.provider === 'google' || provider.provider === 'facebook'
          ) || false;
          
          if (hasSocialProvider) {
            const canEdit = !birthDateEditedFromStorage;
            setCanEditBirthDate(canEdit);
            setIsSocialLogin(true);
          }
          
          // EditForm'u güncelle
          setEditForm(prev => ({
            ...prev,
            email: currentEmail
          }));
        }
      } catch (error) {
        console.error('❌ Kullanıcı bilgileri yüklenirken hata:', error);
        // Hata durumunda localStorage'dan kontrol et
        const hasSocialProvider = (userInfo as any)?.authProviders?.some((provider: any) => 
          provider.provider === 'google' || provider.provider === 'facebook'
        ) || false;
        
        if (hasSocialProvider) {
          const canEdit = !birthDateEditedFromStorage;
          setCanEditBirthDate(canEdit);
          setIsSocialLogin(true);
        }
        
        // EditForm'u güncelle
        setEditForm(prev => ({
          ...prev,
          email: currentEmail
        }));
      }
    } else {
      // EditForm'u güncelle
      setEditForm(prev => ({
        ...prev,
        email: currentEmail
      }));
    }
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
    } else if (name === 'birthDate') {
      // Doğum tarihi düzenlenebilir mi kontrol et
      if (!isBirthDateEditable()) {
        return; // Düzenlenemezse, değişiklik yapma
      }
      // Doğum tarihi için sadece geçerli tarih formatına izin ver
      if (value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        setEditForm({ ...editForm, [name]: value });
      }
    } else {
      setEditForm({ ...editForm, [name]: value });
      
      // Email değişikliğini tespit et
      if (name === 'email') {
        const isChanged = value !== originalEmail;
        setIsEmailChanged(isChanged);
        if (!isChanged) {
          setEmailVerificationCode('');
        }
      }
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Sadece rakam girişine izin ver ve maksimum 6 karakter
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setEmailVerificationCode(numericValue);
    
    // Kod değiştiğinde hata durumunu sıfırla
    if (isCodeInvalid) {
      setIsCodeInvalid(false);
    }
  };

  const handleSendEmailVerification = async () => {
    if (!editForm.email || editForm.email === originalEmail) {
      setMessage('Lütfen yeni email adresini girin.');
      setMessageType('error');
      return;
    }

    setIsVerifyingEmail(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/send-email-change-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: userInfo.id,
          newEmail: editForm.email 
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Doğrulama kodu yeni email adresinize gönderildi. Lütfen kodu girin.');
        setMessageType('success');
        setIsEmailChanged(true);
      } else {
        setMessage(data.error || 'Doğrulama kodu gönderilemedi.');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Bağlantı hatası oluştu.');
      setMessageType('error');
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!emailVerificationCode || emailVerificationCode.length !== 6) {
      setMessage('Lütfen 6 haneli doğrulama kodunu girin.');
      setMessageType('error');
      return;
    }

    setIsVerifyingEmail(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userInfo.id,
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          email: editForm.email,
          phone: editForm.phone,
          birthDate: isSocialLogin ? editForm.birthDate : undefined,
          emailVerificationCode: emailVerificationCode
        })
      });

      const data = await response.json();

      if (data.success) {
        const newName = `${editForm.firstName} ${editForm.lastName}`;
        
        // localStorage'ı güncelle
        localStorage.setItem('userName', newName);
        localStorage.setItem('userEmail', editForm.email);
        localStorage.setItem('userPhone', editForm.phone);
        
        // Sadece sosyal medya girişi için doğum tarihini güncelle
        if (isSocialLogin) {
          localStorage.setItem('userBirthDate', editForm.birthDate);
          localStorage.setItem('birthDateEdited', 'true');
        }
        
        // Telefon bilgisini formatlanmış halde localStorage'a kaydet
        const formattedPhone = formatPhoneNumber(editForm.phone);
        if (formattedPhone) {
          localStorage.setItem('userPhone', formattedPhone);
        }
        
        // sessionStorage'ı da güncelle (çoklu sekme senkronizasyonu için)
        sessionStorage.setItem('userName', newName);
        sessionStorage.setItem('userEmail', editForm.email);
        sessionStorage.setItem('userPhone', formattedPhone || editForm.phone);
        if (canEditBirthDate) {
          sessionStorage.setItem('userBirthDate', editForm.birthDate);
        }
        
        // JSON user objesini güncelle
        const updatedUser = {
          id: userInfo.id,
          email: editForm.email,
          name: newName,
          phone: formattedPhone || editForm.phone,
          birthDate: canEditBirthDate ? editForm.birthDate : userInfo.birthDate
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        
        setUserInfo({
          ...userInfo,
          name: newName,
          email: editForm.email,
          phone: editForm.phone,
          birthDate: canEditBirthDate ? editForm.birthDate : userInfo.birthDate
        });
        
        // Doğum tarihi düzenlendiyse sosyal medya girişi flag'ini güncelle
        if (isSocialLogin && editForm.birthDate) {
          setIsSocialLogin(false);
        }
        
        setIsEditing(false);
        setMessage('✅ Mail adresiniz başarıyla değiştirildi!');
        setMessageType('success');
        setShowSuccessPopup(true);
        setIsEmailChanged(false);
        setEmailVerificationCode('');
        
        console.log('🔍 Setting showSuccessPopup to true for email change');
        
        // 3 saniye sonra popup'ı kapat
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
        
        // Tüm sekmelere bildirim gönder (storage event tetikle)
        window.dispatchEvent(new CustomEvent('localStorageChange', {
          detail: {
            key: 'userName',
            value: newName
          }
        }));
        
        window.dispatchEvent(new CustomEvent('localStorageChange', {
          detail: {
            key: 'userEmail',
            value: editForm.email
          }
        }));
        
        // Admin-users sayfasına bildirim gönder
        window.dispatchEvent(new CustomEvent('profileUpdated', {
          detail: {
            userId: userInfo.id,
            newName: newName,
            newEmail: editForm.email
          }
        }));
      } else {
        setMessage(data.error || 'Doğrulama kodu geçersiz.');
        setMessageType('error');
        setIsCodeInvalid(true);
      }
    } catch (err) {
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      setMessageType('error');
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsEmailChanged(false);
    setEmailVerificationCode('');
    setIsCodeInvalid(false);
    if (!userInfo) return;
    
    const nameParts = userInfo.name ? safeDecodeName(userInfo.name).split(' ') : ['', ''];
    setEditForm({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: userInfo.email || '',
      phone: formatPhoneNumber(userInfo.phone || ''),
      birthDate: userInfo.birthDate || ''
    });
  };


  const handleSave = async () => {
    setMessage('');
    setMessageType('error');

    // userInfo null kontrolü
    if (!userInfo) {
      setMessage('Kullanıcı bilgileri bulunamadı. Lütfen tekrar giriş yapın.');
      setMessageType('error');
      return;
    }

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

    // Email değişikliği kontrolü - handleVerifyEmailCode fonksiyonu bu işlemi yapıyor
    if (editForm.email !== originalEmail) {
      setMessage('Email adresini değiştirmek için önce "Kod Gönder" butonuna basın ve doğrulama kodunu girin.');
      setMessageType('error');
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

    // Doğum tarihi validasyonu - sadece düzenlenebilirse
    if (editForm.birthDate.trim() && canEditBirthDate) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(editForm.birthDate)) {
        setMessage('Geçerli bir doğum tarihi giriniz. Örn: 1990-01-15');
        return;
      }
      
      // Tarih geçerli mi kontrol et
      const birthDate = new Date(editForm.birthDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Bugünün başlangıcı
      
      // Debug logları
      console.log('🔍 Doğum tarihi validasyonu:');
      console.log('🔍 editForm.birthDate:', editForm.birthDate);
      console.log('🔍 birthDate:', birthDate);
      console.log('🔍 today:', today);
      console.log('🔍 birthDate > today:', birthDate > today);
      
      if (isNaN(birthDate.getTime())) {
        setMessage('Geçerli bir doğum tarihi giriniz.');
        return;
      }
      
      if (birthDate > today) {
        console.log('❌ Gelecek tarih tespit edildi!');
        setMessage('Doğum tarihi bugünden sonra olamaz.');
        return;
      }
      
      // Minimum 13 yaş kontrolü
      const thirteenYearsAgo = new Date();
      thirteenYearsAgo.setFullYear(today.getFullYear() - 13);
      thirteenYearsAgo.setHours(0, 0, 0, 0);
      
      console.log('🔍 Yaş kontrolü:');
      console.log('🔍 thirteenYearsAgo:', thirteenYearsAgo);
      console.log('🔍 birthDate > thirteenYearsAgo:', birthDate > thirteenYearsAgo);
      
      if (birthDate > thirteenYearsAgo) {
        console.log('❌ 13 yaşından küçük tespit edildi!');
        setMessage('En az 13 yaşında olmalısınız.');
        return;
      }
      
      // Çok eski tarih kontrolü (1900'den önce)
      const minDate = new Date('1900-01-01');
      if (birthDate < minDate) {
        setMessage('Doğum tarihi 1900\'den önce olamaz.');
        return;
      }
    }

    // userId kontrolü
    if (!userInfo?.id) {
      console.error('❌ userInfo.id bulunamadı:', userInfo);
      setMessage('Kullanıcı ID bulunamadı. Lütfen tekrar giriş yapın.');
      setMessageType('error');
      return;
    }

    try {
      console.log('🔍 Profile update request data:', {
        userId: userInfo.id,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        phone: editForm.phone
      });
      
      // Doğum tarihi düzenlenebilir mi kontrol et (çoklu kontrol)
      const birthDateEditedFromStorage = localStorage.getItem('birthDateEdited') === 'true' || 
                                          sessionStorage.getItem('birthDateEdited') === 'true';
      const birthDateEditedFromUserInfo = (userInfo as any)?.birthDateEdited === true;
      const canEdit = isBirthDateEditable();
      
      console.log('🔍 handleSave: Doğum tarihi kontrolü:');
      console.log('🔍 canEditBirthDate state:', canEditBirthDate);
      console.log('🔍 birthDateEditedFromStorage:', birthDateEditedFromStorage);
      console.log('🔍 birthDateEditedFromUserInfo:', birthDateEditedFromUserInfo);
      console.log('🔍 isBirthDateEditable():', canEdit);
      console.log('🔍 editForm.birthDate:', editForm.birthDate);
      console.log('🔍 userInfo.birthDate:', userInfo.birthDate);
      
      // API'ye güncelleme gönder
      const updateData: any = {
        userId: userInfo.id,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        phone: editForm.phone ? '0' + editForm.phone.replace(/\s/g, '').replace(/[\(\)]/g, '') : ''
      };
      
      // Doğum tarihi gönderme mantığı - KESIN KONTROL
      // 1. Eğer düzenlenebilirse ve değer değiştiyse → yeni değeri gönder
      // 2. Eğer düzenlenemezse → HİÇBİR ŞEKİLDE YENİ DEĞER GÖNDERME, sadece mevcut değeri gönder
      // 3. API tarafında da kontrol var, ama frontend'de de kesin kontrol yapıyoruz
      
      if (canEdit) {
        // Düzenlenebilirse, değer değiştiyse yeni değeri gönder
        if (editForm.birthDate && editForm.birthDate !== userInfo.birthDate) {
          updateData.birthDate = editForm.birthDate;
          console.log('✅ handleSave: Yeni doğum tarihi gönderiliyor (düzenlenebilir):', editForm.birthDate);
        } else if (editForm.birthDate) {
          // Aynı değer, normal güncelleme
          updateData.birthDate = editForm.birthDate;
          console.log('✅ handleSave: Doğum tarihi aynı (düzenlenebilir):', editForm.birthDate);
        }
      } else {
        // DÜZENLENEMEZSE - Kesin kontrol
        if (editForm.birthDate && editForm.birthDate !== userInfo.birthDate) {
          // Değer değişmiş ama düzenlenemez → HATA
          console.error('❌ handleSave: Doğum tarihi düzenlenemez ama değer değişmiş!');
          console.error('❌ editForm.birthDate:', editForm.birthDate);
          console.error('❌ userInfo.birthDate:', userInfo.birthDate);
          console.error('❌ birthDateEditedFromStorage:', birthDateEditedFromStorage);
          console.error('❌ birthDateEditedFromUserInfo:', birthDateEditedFromUserInfo);
          
          // Frontend'de hata göster ve API çağrısı yapma
          setMessage('Doğum tarihi daha önce belirlenmiş. Artık değiştirilemez.');
          setMessageType('error');
          setErrorMessage('Doğum tarihi daha önce belirlenmiş. Artık değiştirilemez.');
          setShowErrorPopup(true);
          
          // EditForm'daki birthDate'i mevcut değere geri al
          setEditForm(prev => ({
            ...prev,
            birthDate: userInfo.birthDate || prev.birthDate
          }));
          
          return; // API çağrısı yapma
        } else if (editForm.birthDate) {
          // Aynı değer, mevcut değeri gönder (normal güncelleme, diğer alanlar için)
          updateData.birthDate = userInfo.birthDate || editForm.birthDate;
          console.log('✅ handleSave: Doğum tarihi aynı (düzenlenemez, mevcut değer gönderiliyor):', updateData.birthDate);
        }
        // Eğer editForm.birthDate yoksa, birthDate gönderme (API mevcut değeri koruyacak)
      }

      // Email değişikliği için doğrulama kodu gönder
      if (editForm.email !== originalEmail) {
        updateData.emailVerificationCode = emailVerificationCode;
      }
      
      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const data = await response.json();
        
        // localStorage'ı güncelle
        const newName = `${editForm.firstName} ${editForm.lastName}`.trim();
        localStorage.setItem('userName', newName);
        localStorage.setItem('userEmail', editForm.email);
        localStorage.setItem('userPhone', editForm.phone);
        
        // API'den gelen kullanıcı bilgilerini kullan
        const updatedUserData = data.user || {};
        const birthDateEdited = updatedUserData.birthDateEdited || false;
        const authProviders = updatedUserData.authProviders || (userInfo as any).authProviders || [];
        
        // Doğum tarihini güncelle - API'den gelen bilgiyi kullan
        if (updatedUserData.birthDate) {
          localStorage.setItem('userBirthDate', updatedUserData.birthDate);
          sessionStorage.setItem('userBirthDate', updatedUserData.birthDate);
        } else if (canEditBirthDate && editForm.birthDate) {
          localStorage.setItem('userBirthDate', editForm.birthDate);
          sessionStorage.setItem('userBirthDate', editForm.birthDate);
        }
        
        // birthDateEdited flag'ini güncelle (API'den gelen bilgi kesin)
        if (birthDateEdited) {
          localStorage.setItem('birthDateEdited', 'true');
          sessionStorage.setItem('birthDateEdited', 'true');
          setCanEditBirthDate(false); // Artık düzenlenemez
          console.log('💾 handleSave: birthDateEdited=true, localStorage\'a kaydedildi');
        } else {
          // Eğer API'den false gelirse, localStorage'dan kaldır (temizlik)
          localStorage.removeItem('birthDateEdited');
          sessionStorage.removeItem('birthDateEdited');
          console.log('💾 handleSave: birthDateEdited=false, localStorage\'dan kaldırıldı');
        }
        
        // Telefon bilgisini formatlanmış halde localStorage'a kaydet
        const formattedPhone = formatPhoneNumber(editForm.phone);
        if (formattedPhone) {
          localStorage.setItem('userPhone', formattedPhone);
        }
        
        // sessionStorage'ı da güncelle (çoklu sekme senkronizasyonu için)
        sessionStorage.setItem('userName', newName);
        sessionStorage.setItem('userEmail', editForm.email);
        sessionStorage.setItem('userPhone', formattedPhone || editForm.phone);
        
        // JSON user objesini güncelle
        const updatedUser = {
          id: userInfo.id,
          email: editForm.email,
          name: newName,
          phone: formattedPhone || editForm.phone,
          birthDate: updatedUserData.birthDate || (canEditBirthDate ? editForm.birthDate : userInfo.birthDate),
          birthDateEdited: birthDateEdited,
          authProviders: authProviders,
          isAdmin: updatedUserData.isAdmin || userInfo.isAdmin
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        
        // OAuth kullanıcısı kontrolü güncelle
        const hasSocialProvider = authProviders.some((provider: any) => 
          provider.provider === 'google' || provider.provider === 'facebook'
        );
        
        // Doğum tarihi düzenlendiyse flag'leri güncelle
        if (birthDateEdited) {
          console.log('🔒 handleSave: birthDateEdited=true, state güncelleniyor');
          setIsSocialLogin(hasSocialProvider); // Hala sosyal medya kullanıcısı ama artık düzenlenemez
          // canEditBirthDate state'ini kesinlikle false yap (hemen, localStorage'dan önce)
          setCanEditBirthDate(false);
          console.log('✅ handleSave: canEditBirthDate=false yapıldı');
        }
        
        // userInfo'yu güncelle (birthDateEdited dahil)
        // Doğum tarihini belirle: API'den gelen değer varsa onu kullan, yoksa mevcut değeri koru
        const finalBirthDate = updatedUserData.birthDate || userInfo.birthDate || editForm.birthDate || '';
        setUserInfo({
          ...userInfo,
          name: newName,
          email: editForm.email,
          phone: editForm.phone,
          birthDate: finalBirthDate,
          birthDateEdited: birthDateEdited, // API'den gelen değer (kesin)
          authProviders: authProviders,
          isAdmin: updatedUserData.isAdmin || userInfo.isAdmin
        });
        
        console.log('✅ handleSave: userInfo güncellendi, birthDateEdited=', birthDateEdited);
        console.log('✅ handleSave: localStorage birthDateEdited=', localStorage.getItem('birthDateEdited'));
        
        setIsEditing(false);
        setMessage('Profil başarıyla güncellendi!');
        setMessageType('success');
        setShowSuccessPopup(true);
        
        // 3 saniye sonra popup'ı kapat
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
        
        // Tüm sekmelere bildirim gönder (storage event tetikle)
        window.dispatchEvent(new CustomEvent('localStorageChange', {
          detail: {
            key: 'userName',
            value: newName
          }
        }));
        
        window.dispatchEvent(new CustomEvent('localStorageChange', {
          detail: {
            key: 'userEmail',
            value: editForm.email
          }
        }));
        
        // Admin-users sayfasına bildirim gönder
        window.dispatchEvent(new CustomEvent('profileUpdated', {
          detail: {
            userId: userInfo.id,
            newName: newName,
            newEmail: editForm.email
          }
        }));
      } else {
        const data = await response.json();
        const errorMsg = data.message || 'Güncelleme sırasında bir hata oluştu.';
        
        // Doğum tarihi düzenlenemez hatası kontrolü
        if (errorMsg.includes('Doğum tarihi daha önce belirlenmiş') || 
            errorMsg.includes('Artık değiştirilemez')) {
          // canEditBirthDate state'ini false yap
          setCanEditBirthDate(false);
          // userInfo'yu güncelle
          setUserInfo({
            ...userInfo,
            birthDateEdited: true
          });
          // EditForm'daki birthDate'i güncelle (mevcut değeri koru)
          setEditForm(prev => ({
            ...prev,
            birthDate: userInfo.birthDate || prev.birthDate
          }));
        }
        
        // Doğrulama kodu hatası kontrolü
        if (errorMsg.includes('Geçersiz doğrulama kodu') || 
            errorMsg.includes('doğrulama kodu') || 
            errorMsg.includes('Doğrulama kodu')) {
          setIsCodeInvalid(true);
        }
        
        setMessage(errorMsg);
        setMessageType('error');
        setErrorMessage(errorMsg);
        setShowErrorPopup(true);
        
        // 5 saniye sonra hata popup'ını kapat
        setTimeout(() => {
          setShowErrorPopup(false);
        }, 5000);
      }
    } catch (error) {
      const errorMsg = 'Bağlantı hatası oluştu.';
      setMessage(errorMsg);
      setMessageType('error');
      setErrorMessage(errorMsg);
      setShowErrorPopup(true);
      
      // 5 saniye sonra hata popup'ını kapat
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
    }
  };

  const handleLogout = () => {
    // userInfo null kontrolü
    if (!userInfo) {
      console.error('❌ handleLogout: userInfo is null');
      return;
    }
    
    // Remember Me değerlerini sakla
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberMe = localStorage.getItem('rememberMe');
    
    // Tüm localStorage ve sessionStorage'ı temizle
    localStorage.clear();
    sessionStorage.clear();
    
    // Remember Me değerlerini geri yükle
    if (rememberedEmail && rememberMe === 'true') {
      localStorage.setItem('rememberedEmail', rememberedEmail);
      localStorage.setItem('rememberMe', rememberMe);
    }
    
    // Custom event'i tetikle
    window.dispatchEvent(new Event('localStorageChange'));
    
    // Header'a logout mesajı gönder
    window.dispatchEvent(new CustomEvent('logout'));
    
    // Profile sayfasında kal (ana sayfaya yönlendirme yok)
    // Sayfayı yenile
    window.location.reload();
  };

  if (!userInfo) {
    console.log('🔍 ProfilePage: userInfo is null, showing loading...');
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

  console.log('🔍 ProfilePage component rendering...');
  
  console.log('🔍 ProfilePage: About to render...');
  
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
          <span>Profil</span>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: isMobile ? '0 12px 20px' : '0 20px 20px',
        display: 'flex',
        gap: '24px',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        {/* Sol Sütun - Panelim Menüsü */}
        <div style={{ 
          flex: isMobile ? '1' : '0 0 280px',
          height: 'fit-content'
        }}>
          <div style={{ 
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            {/* Panelim Başlığı */}
            <div style={{
              background: '#f8fafc',
              padding: isMobile ? '16px' : '20px',
              borderBottom: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                margin: '0',
                color: '#1e293b',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '600'
              }}>
                Panelim
              </h3>
            </div>
            
            {/* Menü Öğeleri */}
            <div style={{ 
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Link href="/adreslerim" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: isMobile ? '12px 20px' : '16px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                >
                  <div style={{ fontSize: '18px' }}>📍</div>
                  <span style={{ 
                    color: '#1e293b', 
                    fontSize: isMobile ? '14px' : '15px',
                    fontWeight: '500'
                  }}>
                    Adreslerim
                  </span>
                </div>
              </Link>

              <Link href="/sifre-degistir" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: isMobile ? '12px 20px' : '16px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                >
                  <div style={{ fontSize: '18px' }}>🔐</div>
                  <span style={{ 
                    color: '#1e293b', 
                    fontSize: isMobile ? '14px' : '15px',
                    fontWeight: '500'
                  }}>
                    Şifre Değiştir
                  </span>
                </div>
              </Link>

              <Link href="/siparisler" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: isMobile ? '12px 20px' : '16px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                >
                  <div style={{ fontSize: '18px' }}>📦</div>
                  <span style={{ 
                    color: '#1e293b', 
                    fontSize: isMobile ? '14px' : '15px',
                    fontWeight: '500'
                  }}>
                    Siparişlerim
                  </span>
                </div>
              </Link>

              <Link href="/tekliflerim" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: isMobile ? '12px 20px' : '16px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                >
                  <div style={{ fontSize: '18px' }}>💰</div>
                  <span style={{ 
                    color: '#1e293b', 
                    fontSize: isMobile ? '14px' : '15px',
                    fontWeight: '500'
                  }}>
                    Tekliflerim
                  </span>
                </div>
              </Link>

              <Link href="/iptal-iade-islemlerim" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: isMobile ? '12px 20px' : '16px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                >
                  <div style={{ fontSize: '18px' }}>🔄</div>
                  <span style={{ 
                    color: '#1e293b', 
                    fontSize: isMobile ? '14px' : '15px',
                    fontWeight: '500'
                  }}>
                    İptal ve İade İşlemlerim
                  </span>
                </div>
              </Link>

              <Link href="/bildirimler" style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: isMobile ? '12px 20px' : '16px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                >
                  <div style={{ fontSize: '18px' }}>🔔</div>
                  <span style={{ 
                    color: '#1e293b', 
                    fontSize: isMobile ? '14px' : '15px',
                    fontWeight: '500'
                  }}>
                    Bildirimler
                  </span>
                </div>
              </Link>

              {userInfo.isAdmin && (
                <Link href="/admin" style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    padding: isMobile ? '12px 20px' : '16px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                  >
                    <div style={{ fontSize: '18px' }}>⚙️</div>
                    <span style={{ 
                      color: '#1e293b', 
                      fontSize: isMobile ? '14px' : '15px',
                      fontWeight: '500'
                    }}>
                      Admin Paneli
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Sağ Sütun - Ana İçerik */}
        <div style={{ 
          flex: '1',
          minWidth: 0
        }}>
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
            padding: isMobile ? '24px 16px' : '32px',
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
              {userInfo.name ? safeDecodeName(userInfo.name) : 'Kullanıcı'}
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
            
                            {/* Çıkış Yap Butonu */}
                <div style={{ marginTop: '20px' }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: '2px solid #b91c1c',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#b91c1c';
                      e.currentTarget.style.borderColor = '#991b1b';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#dc2626';
                      e.currentTarget.style.borderColor = '#b91c1c';
                    }}
                  >
                    🚪 Çıkış Yap
                  </button>
                </div>
          </div>

          {/* Profil İçeriği */}
          <div style={{ padding: isMobile ? '20px 16px' : '32px' }}>
            {isEditing ? (
              /* Düzenleme Formu */
              <form onSubmit={(e) => { e.preventDefault(); console.log('Form submitted!'); handleSave(); }}>
                <h3 style={{ margin: '0 0 24px 0', color: '#1e293b', fontSize: isMobile ? '18px' : '20px' }}>
                  Profil Bilgilerini Düzenle
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '12px' : '16px', marginBottom: isMobile ? '12px' : '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
                      Ad
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: isMobile ? '10px' : '12px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: isMobile ? '14px' : '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
                      Soyad
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: isMobile ? '10px' : '12px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: isMobile ? '14px' : '16px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: isMobile ? '20px' : '24px' }}>
                  <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: isMobile ? '10px' : '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: isMobile ? '14px' : '16px'
                    }}
                  />
                  
                  {editForm.email !== originalEmail && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        marginBottom: '8px',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'stretch' : 'center'
                      }}>
                        <input
                          type="text"
                          placeholder="Doğrulama kodu (6 rakam)"
                          value={emailVerificationCode}
                          onChange={handleCodeChange}
                          maxLength={6}
                          style={{
                            flex: 1,
                            padding: isMobile ? '10px' : '12px',
                            borderRadius: '8px',
                            border: isCodeInvalid ? '2px solid #dc2626' : '1px solid #d1d5db',
                            fontSize: isMobile ? '14px' : '16px',
                            backgroundColor: isCodeInvalid ? '#fef2f2' : '#ffffff',
                            color: isCodeInvalid ? '#dc2626' : '#374151'
                          }}
                        />
                        <button
                          type="button"
                          onClick={isEmailChanged ? handleVerifyEmailCode : handleSendEmailVerification}
                          disabled={isVerifyingEmail || !editForm.email || (isEmailChanged && (!emailVerificationCode || emailVerificationCode.length !== 6))}
                          style={{
                            padding: isMobile ? '10px 16px' : '12px 20px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: isVerifyingEmail || !editForm.email || (isEmailChanged && (!emailVerificationCode || emailVerificationCode.length !== 6)) ? '#9ca3af' : '#3b82f6',
                            color: 'white',
                            fontSize: isMobile ? '14px' : '16px',
                            cursor: isVerifyingEmail || !editForm.email || (isEmailChanged && (!emailVerificationCode || emailVerificationCode.length !== 6)) ? 'not-allowed' : 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {isVerifyingEmail ? (isEmailChanged ? 'Doğrulanıyor...' : 'Gönderiliyor...') : (isEmailChanged ? 'Doğrula' : 'Kod Gönder')}
                        </button>
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#6b7280',
                        fontStyle: 'italic',
                        marginBottom: '4px'
                      }}>
                        Email adresini değiştirmek için doğrulama kodu gerekli.
                      </div>
                      {isCodeInvalid && (
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#dc2626',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          ⚠️ Geçersiz doğrulama kodu. Lütfen tekrar deneyin.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: isMobile ? '12px' : '16px' }}>
                  <label style={{ display: 'block', marginBottom: isMobile ? '6px' : '8px', fontWeight: '500', color: '#374151', fontSize: isMobile ? '13px' : '14px' }}>
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
                      padding: isMobile ? '10px' : '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: isMobile ? '14px' : '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: isMobile ? '20px' : '24px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: isMobile ? '6px' : '8px', 
                    fontWeight: '500', 
                    color: isSocialLogin ? '#6b7280' : '#374151', 
                    fontSize: isMobile ? '13px' : '14px' 
                  }}>
                    Doğum Tarihi
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={editForm.birthDate}
                    onChange={handleChange}
                    disabled={!isBirthDateEditable()}
                    readOnly={!isBirthDateEditable()}
                    style={{
                      width: '100%',
                      padding: isMobile ? '10px' : '12px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      fontSize: isMobile ? '14px' : '16px',
                      backgroundColor: isBirthDateEditable() ? '#ffffff' : '#f9fafb',
                      color: isBirthDateEditable() ? '#374151' : '#9ca3af',
                      cursor: isBirthDateEditable() ? 'text' : 'not-allowed',
                      pointerEvents: isBirthDateEditable() ? 'auto' : 'none'
                    }}
                    onKeyDown={(e) => {
                      // Eğer düzenlenemezse, klavye girişlerini engelle
                      if (!isBirthDateEditable()) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    onFocus={(e) => {
                      // Eğer düzenlenemezse, focus'u engelle
                      if (!isBirthDateEditable()) {
                        e.target.blur();
                      }
                    }}
                  />
                  {isSocialLogin && (
                    <div style={{ 
                      marginTop: '8px',
                      fontSize: '12px', 
                      color: isBirthDateEditable() ? '#f59e0b' : '#9ca3af',
                      fontStyle: 'italic',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {isBirthDateEditable() ? (
                        <>
                          ⚠️ Doğum tarihi sadece 1 kez değiştirilebilir. Lütfen dikkatli seçin.
                        </>
                      ) : (
                        <>
                          🔒 Doğum tarihi daha önce belirlenmiş. Artık değiştirilemez.
                        </>
                      )}
                    </div>
                  )}
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

                <div style={{ display: 'flex', gap: '12px', flexDirection: isMobile ? 'column' : 'row' }}>
                  <button
                    type="button"
                    onClick={() => { console.log('Kaydet clicked!'); handleSave(); }}
                    style={{
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      flex: isMobile ? 'none' : 1
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
                      flex: isMobile ? 'none' : 1
                    }}
                  >
                    İptal
                  </button>
                </div>
              </form>
            ) : (
              /* Görüntüleme Modu */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? '16px' : '24px' }}>
                  <h3 style={{ margin: '0', color: '#1e293b', fontSize: isMobile ? '18px' : '20px' }}>
                    Hesap Bilgileri
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={handleEdit}
                      style={{
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: isMobile ? '6px 12px' : '8px 16px',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Düzenle
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: isMobile ? '12px' : '16px' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                    gap: isMobile ? '12px' : '16px' 
                  }}>
                    <div style={{ 
                      padding: isMobile ? '12px' : '16px', 
                      background: '#f8fafc', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', marginBottom: isMobile ? '2px' : '4px' }}>Ad</div>
                      <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#1e293b', fontWeight: '500' }}>
                        {userInfo.name ? safeDecodeName(userInfo.name).split(' ')[0] : 'Belirtilmemiş'}
                      </div>
                    </div>
                    <div style={{ 
                      padding: isMobile ? '12px' : '16px', 
                      background: '#f8fafc', 
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', marginBottom: isMobile ? '2px' : '4px' }}>Soyad</div>
                      <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#1e293b', fontWeight: '500' }}>
                        {userInfo.name ? safeDecodeName(userInfo.name).split(' ').slice(1).join(' ') : 'Belirtilmemiş'}
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    padding: isMobile ? '12px' : '16px', 
                    background: '#f8fafc', 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', marginBottom: isMobile ? '2px' : '4px' }}>E-posta</div>
                    <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#1e293b', fontWeight: '500' }}>
                      {userInfo.email || 'Belirtilmemiş'}
                    </div>
                  </div>

                  <div style={{ 
                    padding: isMobile ? '12px' : '16px', 
                    background: '#f8fafc', 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', marginBottom: isMobile ? '2px' : '4px' }}>Cep Telefonu</div>
                    <div style={{ fontSize: isMobile ? '14px' : '16px', color: '#1e293b', fontWeight: '500' }}>
                      {userInfo.phone ? formatPhoneNumber(userInfo.phone) : 'Belirtilmemiş'}
                    </div>
                  </div>

                  <div style={{ 
                    padding: isMobile ? '12px' : '16px', 
                    background: isSocialLogin ? '#f8fafc' : '#f9fafb', 
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ 
                      fontSize: isMobile ? '11px' : '12px', 
                      color: isSocialLogin ? '#64748b' : '#9ca3af', 
                      marginBottom: isMobile ? '2px' : '4px' 
                    }}>
                      Doğum Tarihi
                    </div>
                    <div style={{ 
                      fontSize: isMobile ? '14px' : '16px', 
                      color: isSocialLogin ? '#1e293b' : '#9ca3af', 
                      fontWeight: '500' 
                    }}>
                      {userInfo.birthDate ? new Date(userInfo.birthDate).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                    </div>
                    {isSocialLogin && (
                      <div style={{ 
                        marginTop: '8px',
                        fontSize: '11px', 
                        color: (userInfo as any).birthDateEdited ? '#9ca3af' : '#f59e0b',
                        fontStyle: 'italic',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {(userInfo as any).birthDateEdited ? (
                          <>
                            🔒 Doğum tarihi daha önce belirlenmiş. Artık değiştirilemez.
                          </>
                        ) : (
                          <>
                            ⚠️ Doğum tarihi sadece 1 kez değiştirilebilir. Profil düzenleme modunda değiştirebilirsiniz.
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>

      </div>
      
      {/* Başarı Popup'ı */}
      {showSuccessPopup && (
        <div>
          <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '20px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
          zIndex: 1000,
          minWidth: '320px',
          animation: 'slideInRight 0.3s ease-out',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ✅
            </div>
            <div>
              <h4 style={{
                margin: '0 0 4px 0',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Başarıyla Kaydedildi!
              </h4>
              <p style={{
                margin: '0',
                fontSize: '14px',
                opacity: '0.9'
              }}>
                Profil bilgileriniz güncellendi
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowSuccessPopup(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ✕
          </button>
        </div>
        </div>
      )}
      
      {/* Hata Popup'ı */}
      {showErrorPopup && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: 'white',
          padding: '20px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
          zIndex: 1000,
          minWidth: '320px',
          animation: 'slideInRight 0.3s ease-out',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ❌
            </div>
            <div>
              <h4 style={{
                margin: '0 0 4px 0',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Hata Oluştu!
              </h4>
              <p style={{
                margin: '0',
                fontSize: '14px',
                opacity: '0.9',
                maxWidth: '250px',
                wordWrap: 'break-word'
              }}>
                {errorMessage}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowErrorPopup(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ✕
          </button>
        </div>
      )}
      
      {/* CSS Animasyonları */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
} 