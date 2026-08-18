"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { safeDecodeName, formatPhoneNumber, isBirthDateEditable } from "./utils/helpers";
import ProfileHeader from "./components/ProfileHeader";
import ProfileDisplay from "./components/ProfileDisplay";
import ProfileForm from "./components/ProfileForm";
import ProfileNavigation from "./components/ProfileNavigation";
import ProfileActions from "./components/ProfileActions";
import ProfileModals from "./components/ProfileModals";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [canEditBirthDate, setCanEditBirthDate] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');
  // Doğum tarihi input'unu bilerek "uncontrolled" tutuyoruz (bkz. aşağıdaki
  // yorum) — bu key değiştikçe input remount olup editForm.birthDate'teki
  // güncel değeri defaultValue olarak alır.
  const [birthDateKey, setBirthDateKey] = useState(0);
  // Kaydet'e tıklama ile onBlur'un sıralamasına güvenmemek için: kaydetme
  // anında inputun DOM'daki canlı değerini doğrudan bu ref'ten okuyoruz.
  const birthDateInputRef = useRef<HTMLInputElement>(null);
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

  // Doğum tarihi state'i (editForm.birthDate) sadece onBlur'da güncelleniyor.
  // Kaydetme sırasında blur'un click'ten önce işlenmiş olduğuna güvenmek yerine,
  // inputun o anki DOM değerini doğrudan okuyup kullanıyoruz — böylece
  // kaydetme, blur/click sıralamasından tamamen bağımsız hale geliyor.
  const getEffectiveBirthDate = () => {
    const liveValue = birthDateInputRef.current?.value;
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (canEditBirthDate && liveValue && dateFormatRegex.test(liveValue)) {
      return liveValue;
    }
    return editForm.birthDate;
  };

  // Doğum tarihi seçilebilir aralığı: en az 13 yaş (handleSave'deki kontrolle
  // aynı kural), en fazla 1930. Native date input'un min/max'ına veriliyor.
  const maxBirthDateForInput = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 13);
    return d.toISOString().split('T')[0];
  })();

  // Mobil responsive kontrol
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


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
    // Doğum tarihi input'u uncontrolled — düzenleme her başladığında güncel
    // değeri defaultValue olarak alsın diye remount ettiriyoruz.
    setBirthDateKey(k => k + 1);
    const currentEmail = userInfo?.email || '';
    setOriginalEmail(currentEmail);
    setIsEmailChanged(false);
    setEmailVerificationCode('');
    
    // userInfo'dan authProviders kontrolü
    const authProviders = (userInfo as any)?.authProviders || [];
    const hasSocialProvider = authProviders.some((provider: any) =>
      provider.provider === 'google' || provider.provider === 'facebook'
    );

    // İlk (API yanıtı gelmeden önceki) tahmin: elimizdeki mevcut userInfo ile
    // TEK doğru kaynak olan isBirthDateEditable() kullanılıyor — burada ayrı
    // ve eksik bir "hasSocialProvider && !birthDateEdited" mantığı YOK, çünkü
    // böyle bir kopya "doğum tarihi zaten dolu mu" kontrolünü unutup, aslında
    // kilitli olması gereken bir hesapta alanı yanlışlıkla açık gösterebilir.
    setCanEditBirthDate(isBirthDateEditable(userInfo));
    setIsSocialLogin(hasSocialProvider);
    
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

          // canEditBirthDate state'ini güncelle (API'den gelen bilgi kesin) —
          // tek doğru kaynak isBirthDateEditable(), taze API verisiyle çağrılıyor.
          const canEdit = isBirthDateEditable({
            birthDate: apiUserData.birthDate,
            birthDateEdited,
            authProviders
          });
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
          setUserInfo((prev: any) => ({
            ...prev,
            birthDate: apiUserData.birthDate || prev.birthDate,
            birthDateEdited: birthDateEdited,
            authProviders: authProviders
          }));
          
          // EditForm'u güncelle
          setEditForm((prev: any) => ({
            ...prev,
            email: currentEmail,
            birthDate: apiUserData.birthDate || prev.birthDate
          }));
        } else {
          // API'den bilgi alınamazsa, elimizdeki userInfo ile en iyi tahmini yap
          console.warn('⚠️ API\'den bilgi alınamadı, mevcut userInfo ile kontrol ediliyor');
          setCanEditBirthDate(isBirthDateEditable(userInfo));
          setIsSocialLogin((userInfo as any)?.authProviders?.some((provider: any) =>
            provider.provider === 'google' || provider.provider === 'facebook'
          ) || false);

          // EditForm'u güncelle
          setEditForm((prev: any) => ({
            ...prev,
            email: currentEmail
          }));
        }
      } catch (error) {
        console.error('❌ Kullanıcı bilgileri yüklenirken hata:', error);
        // Hata durumunda elimizdeki userInfo ile en iyi tahmini yap
        setCanEditBirthDate(isBirthDateEditable(userInfo));
        setIsSocialLogin((userInfo as any)?.authProviders?.some((provider: any) =>
          provider.provider === 'google' || provider.provider === 'facebook'
        ) || false);

        // EditForm'u güncelle
        setEditForm((prev: any) => ({
          ...prev,
          email: currentEmail
        }));
      }
    } else {
      // EditForm'u güncelle
      setEditForm((prev: any) => ({
        ...prev,
        email: currentEmail
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'emailVerificationCode') {
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setEmailVerificationCode(numericValue);
      if (isCodeInvalid) {
        setIsCodeInvalid(false);
      }
    } else if (name === 'firstName' || name === 'lastName') {
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
        // Email değişikliğini tespit et
        const isChanged = value.toLowerCase() !== originalEmail;
        setIsEmailChanged(isChanged);
        setIsCodeSent(false);
        if (!isChanged) {
          setEmailVerificationCode('');
        }
      }
    } else if (name === 'phone') {
      // Telefon numarası formatlama
      const formatted = formatPhoneNumber(value);
      setEditForm({ ...editForm, [name]: formatted });
    } else if (name === 'birthDate') {
      // Doğum tarihi kasıtlı olarak burada YOK SAYILIYOR — bkz. handleBirthDateBlur.
      // Native <input type="date">, yazma sırasında (özellikle yıl hanesi
      // tamamlanmadan) tarayıcıya göre değişen, güvenilmez ara değerler
      // bildirebiliyor: bazı tarayıcılarda "" , bazılarında ise TAM
      // formatlı ama YANLIŞ bir tarih (ör. "2222-02-02" — canlı testte
      // gözlemlendi, kullanıcı 17.12 girmişken). İkisi de state'e yazılırsa
      // controlled input her yeniden render'da DOM'u ezip kullanıcının o ana
      // kadar yazdığı gün/ay'ı görsel olarak siler. Bu yüzden bu alan
      // "uncontrolled" tutuluyor (bkz. ProfileForm: defaultValue + key) ve
      // state sadece kullanıcı alandan çıktığında (onBlur) güncellenir.
      return;
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleBirthDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isBirthDateEditable(userInfo)) return;
    const { value } = e.target;
    // Kullanıcı alandan çıktı — artık ara-adım tuhaflıkları söz konusu değil,
    // tarayıcının o an raporladığı değer input'un gerçek nihai durumudur.
    if (value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      setEditForm(prev => ({ ...prev, birthDate: value }));
    }
  };


  const handleSendEmailVerification = async () => {
    if (!editForm.email || editForm.email === originalEmail) {
      setMessage('Lütfen yeni email adresini girin.');
      setMessageType('error');
      return;
    }

    setIsSendingCode(true);
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
        setIsCodeSent(true);
      } else {
        setMessage(data.error || 'Doğrulama kodu gönderilemedi.');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Bağlantı hatası oluştu.');
      setMessageType('error');
    } finally {
      setIsSendingCode(false);
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

    const currentBirthDate = getEffectiveBirthDate();

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
          birthDate: isSocialLogin ? currentBirthDate : undefined,
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
          localStorage.setItem('userBirthDate', currentBirthDate);
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
          sessionStorage.setItem('userBirthDate', currentBirthDate);
        }

        // JSON user objesini güncelle
        const updatedUser = {
          id: userInfo.id,
          email: editForm.email,
          name: newName,
          phone: formattedPhone || editForm.phone,
          birthDate: canEditBirthDate ? currentBirthDate : userInfo.birthDate
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        sessionStorage.setItem('user', JSON.stringify(updatedUser));

        setUserInfo({
          ...userInfo,
          name: newName,
          email: editForm.email,
          phone: editForm.phone,
          birthDate: canEditBirthDate ? currentBirthDate : userInfo.birthDate
        });
        
        // Doğum tarihi düzenlendiyse sosyal medya girişi flag'ini güncelle
        if (isSocialLogin && currentBirthDate) {
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
    setIsCodeSent(false);
    setEmailVerificationCode('');
    setIsCodeInvalid(false);
    setBirthDateKey(k => k + 1);
    if (!userInfo) return;
    
    const nameParts = userInfo.name ? safeDecodeName(userInfo.name).split(' ') : ['', ''];
    setEditForm({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: userInfo.email || '',
      phone: formatPhoneNumber(userInfo.phone || ''),
      birthDate: userInfo.birthDate || ''
    });
    setOriginalEmail(userInfo.email || '');
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

    // onBlur'un Kaydet tıklamasından önce işlenmiş olduğuna güvenmek yerine,
    // inputun DOM'daki güncel değerini burada tek seferde okuyup sabitliyoruz.
    const currentBirthDate = getEffectiveBirthDate();

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
    if (currentBirthDate.trim() && canEditBirthDate) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(currentBirthDate)) {
        setMessage('Geçerli bir doğum tarihi giriniz. Örn: 1990-01-15');
        return;
      }

      // Tarih geçerli mi kontrol et
      const birthDate = new Date(currentBirthDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Bugünün başlangıcı

      // Debug logları
      console.log('🔍 Doğum tarihi validasyonu:');
      console.log('🔍 currentBirthDate:', currentBirthDate);
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

      // Çok eski / saçma tarih kontrolü (1930'dan önce olamaz)
      const minDate = new Date('1930-01-01');
      if (birthDate < minDate) {
        setMessage('Doğum tarihi 1930\'dan önce olamaz.');
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
      const canEdit = isBirthDateEditable(userInfo);
      
      console.log('🔍 handleSave: Doğum tarihi kontrolü:');
      console.log('🔍 canEditBirthDate state:', canEditBirthDate);
      console.log('🔍 birthDateEditedFromStorage:', birthDateEditedFromStorage);
      console.log('🔍 birthDateEditedFromUserInfo:', birthDateEditedFromUserInfo);
      console.log('🔍 isBirthDateEditable():', canEdit);
      console.log('🔍 currentBirthDate:', currentBirthDate);
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
        if (currentBirthDate && currentBirthDate !== userInfo.birthDate) {
          updateData.birthDate = currentBirthDate;
          console.log('✅ handleSave: Yeni doğum tarihi gönderiliyor (düzenlenebilir):', currentBirthDate);
        } else if (currentBirthDate) {
          // Aynı değer, normal güncelleme
          updateData.birthDate = currentBirthDate;
          console.log('✅ handleSave: Doğum tarihi aynı (düzenlenebilir):', currentBirthDate);
        }
      } else {
        // DÜZENLENEMEZSE - Kesin kontrol
        if (currentBirthDate && currentBirthDate !== userInfo.birthDate) {
          // Değer değişmiş ama düzenlenemez → beklenen bir engelleme (kullanıcıya
          // mesaj gösterilip return ediliyor), gerçek bir hata değil — bu yüzden
          // Next.js dev overlay'i tetiklememesi için console.warn kullanılıyor.
          console.warn('⚠️ handleSave: Doğum tarihi düzenlenemez ama değer değişmiş!');
          console.warn('⚠️ currentBirthDate:', currentBirthDate);
          console.warn('⚠️ userInfo.birthDate:', userInfo.birthDate);
          console.warn('⚠️ birthDateEditedFromStorage:', birthDateEditedFromStorage);
          console.warn('⚠️ birthDateEditedFromUserInfo:', birthDateEditedFromUserInfo);

          // Frontend'de hata göster ve API çağrısı yapma
          // isSocialLogin=false ise (saf local hesap) bu özellik hesap için hiç
          // kullanılamıyor demektir — "daha önce belirlenmiş" mesajı bu durumda
          // yanıltıcı olur, gerçek sebebi söyleyen ayrı bir mesaj gösteriyoruz.
          const birthDateBlockedMessage = isSocialLogin
            ? 'Doğum tarihi daha önce belirlenmiş. Artık değiştirilemez.'
            : 'Doğum tarihi bu hesap için düzenlenemez.';
          setMessage(birthDateBlockedMessage);
          setMessageType('error');
          setErrorMessage(birthDateBlockedMessage);
          setShowErrorPopup(true);

          // EditForm'daki birthDate'i mevcut değere geri al
          setEditForm((prev: any) => ({
            ...prev,
            birthDate: userInfo.birthDate || prev.birthDate
          }));

          return; // API çağrısı yapma
        } else if (currentBirthDate) {
          // Aynı değer, mevcut değeri gönder (normal güncelleme, diğer alanlar için)
          updateData.birthDate = userInfo.birthDate || currentBirthDate;
          console.log('✅ handleSave: Doğum tarihi aynı (düzenlenemez, mevcut değer gönderiliyor):', updateData.birthDate);
        }
        // Eğer currentBirthDate yoksa, birthDate gönderme (API mevcut değeri koruyacak)
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
        } else if (canEditBirthDate && currentBirthDate) {
          localStorage.setItem('userBirthDate', currentBirthDate);
          sessionStorage.setItem('userBirthDate', currentBirthDate);
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
          birthDate: updatedUserData.birthDate || (canEditBirthDate ? currentBirthDate : userInfo.birthDate),
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
        const finalBirthDate = updatedUserData.birthDate || userInfo.birthDate || currentBirthDate || '';
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
          setEditForm((prev: any) => ({
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
            <ProfileNavigation isMobile={isMobile} isAdmin={userInfo.isAdmin} />
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
          <ProfileHeader userInfo={userInfo} isMobile={isMobile} safeDecodeName={safeDecodeName} />

          {/* Profil İçeriği */}
          <div style={{ padding: isMobile ? '20px 16px' : '32px' }}>
            {isEditing ? (
              <>
                <ProfileForm
                  editForm={editForm}
                  isMobile={isMobile}
                  isEmailChanged={isEmailChanged}
                  emailVerificationCode={emailVerificationCode}
                  isCodeInvalid={isCodeInvalid}
                  isVerifyingEmail={isVerifyingEmail}
                  isSendingCode={isSendingCode}
                  isCodeSent={isCodeSent}
                  canEditBirthDate={canEditBirthDate}
                  isSocialLogin={isSocialLogin}
                  birthDateKey={birthDateKey}
                  birthDateInputRef={birthDateInputRef}
                  maxBirthDate={maxBirthDateForInput}
                  handleChange={handleChange}
                  handleBirthDateBlur={handleBirthDateBlur}
                  handleSendEmailVerification={handleSendEmailVerification}
                  handleVerifyEmailCode={handleVerifyEmailCode}
                  message={message}
                  messageType={messageType}
                />
                <ProfileActions
                  isMobile={isMobile}
                  isEditing={isEditing}
                  handleSave={handleSave}
                  handleCancel={handleCancel}
                  handleEdit={handleEdit}
                  handleLogout={handleLogout}
                />
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? '16px' : '24px' }}>
                  <h3 style={{ margin: '0', color: '#1e293b', fontSize: isMobile ? '18px' : '20px' }}>
                    Hesap Bilgileri
                  </h3>
                </div>
                <ProfileDisplay
                  userInfo={userInfo}
                  isMobile={isMobile}
                  safeDecodeName={safeDecodeName}
                  formatPhoneNumber={formatPhoneNumber}
                />
                <ProfileActions
                  isMobile={isMobile}
                  isEditing={isEditing}
                  handleSave={handleSave}
                  handleCancel={handleCancel}
                  handleEdit={handleEdit}
                  handleLogout={handleLogout}
                />
              </>
            )}
          </div>
        </div>
        </div>

      </div>
      
      <ProfileModals
        showSuccessPopup={showSuccessPopup}
        showErrorPopup={showErrorPopup}
        errorMessage={errorMessage}
        successMessage="✅ Profil bilgileriniz güncellendi"
      />
    </div>
  );
}
