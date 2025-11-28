"use client";

// Güvenli Türkçe karakter decode fonksiyonu
export const safeDecodeName = (name: string): string => {
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
export const formatPhoneNumber = (phone: string): string => {
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
export const isBirthDateEditable = (userInfo: any): boolean => {
  // userInfo yoksa, düzenlenemez
  if (!userInfo) {
    return false;
  }
  
  // Çoklu kontrol: userInfo.birthDateEdited, localStorage, authProviders, birthDate
  const birthDateEditedFromStorage = typeof window !== 'undefined' && (
    localStorage.getItem('birthDateEdited') === 'true' || 
    sessionStorage.getItem('birthDateEdited') === 'true'
  );
  const birthDateEditedFromUserInfo = userInfo?.birthDateEdited === true;
  const birthDate = userInfo?.birthDate || '';
  
  // OAuth kullanıcısı kontrolü (authProviders'dan)
  const authProviders = userInfo?.authProviders || [];
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

