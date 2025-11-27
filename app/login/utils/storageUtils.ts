// Storage utility fonksiyonları

export interface UserData {
  id: string;
  email: string;
  name: string;
  phone?: string;
  birthDate?: string;
  isAdmin: boolean;
}

export interface UserDataToStore {
  userLoggedIn: string;
  userEmail: string;
  userName: string;
  userId: string;
  userPhone: string;
  userBirthDate: string;
  userIsAdmin: string;
  loginTime: string;
  token: string;
  user: string;
  rememberMe?: string;
}

/**
 * Kullanıcı verilerini localStorage ve sessionStorage'a kaydeder
 */
export const saveUserData = (userData: UserData, token: string, rememberMe: boolean = false): void => {
  const loginTime = Date.now();
  const userDataToStore: UserDataToStore = {
    userLoggedIn: "true",
    userEmail: userData.email,
    userName: userData.name,
    userId: userData.id,
    userPhone: userData.phone || '',
    userBirthDate: userData.birthDate || '',
    userIsAdmin: userData.isAdmin.toString(),
    loginTime: loginTime.toString(),
    token: token,
    user: JSON.stringify(userData),
    rememberMe: rememberMe.toString()
  };

  // localStorage'a kaydet
  Object.entries(userDataToStore).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  // sessionStorage'a da kaydet (gizli sekme desteği için)
  Object.entries(userDataToStore).forEach(([key, value]) => {
    sessionStorage.setItem(key, value);
  });

  // Remember Me değerini de kaydet
  localStorage.setItem("rememberMe", rememberMe.toString());
  sessionStorage.setItem("rememberMe", rememberMe.toString());

  // Remember Me işaretliyse email'i hatırla
  if (rememberMe) {
    localStorage.setItem("rememberedEmail", userData.email);
  } else {
    localStorage.removeItem("rememberedEmail");
  }

  // Admin bilgilerini de kaydet
  if (userData.isAdmin) {
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("adminEmail", userData.email);
    localStorage.setItem("adminToken", token);
    sessionStorage.setItem("adminLoggedIn", "true");
    sessionStorage.setItem("adminEmail", userData.email);
    sessionStorage.setItem("adminToken", token);
  }
};

/**
 * Kullanıcı giriş durumunu kontrol eder
 */
export const getUserLoginStatus = () => {
  const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
  const adminEmail = localStorage.getItem("adminEmail") || sessionStorage.getItem("adminEmail");
  const adminToken = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
  const userLoggedIn = localStorage.getItem("userLoggedIn") || sessionStorage.getItem("userLoggedIn");
  const userEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

  return {
    adminLoggedIn,
    adminEmail,
    adminToken,
    userLoggedIn,
    userEmail
  };
};

/**
 * Admin token'ını doğrular ve geçersizse temizler
 */
export const validateAndCleanAdminToken = (): void => {
  const adminToken = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
  
  if (!adminToken) {
    // Token yok, admin bilgilerini temizle
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminLoggedIn");
    sessionStorage.removeItem("adminEmail");
    sessionStorage.removeItem("adminToken");
    return;
  }

  // Token var, geçerliliğini kontrol et
  try {
    const tokenParts = adminToken.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      const now = Math.floor(Date.now() / 1000);
      // Token süresi dolmuşsa temizle
      if (payload.exp && payload.exp <= now) {
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminLoggedIn");
        sessionStorage.removeItem("adminEmail");
        sessionStorage.removeItem("adminToken");
      }
    } else {
      // Token formatı geçersiz, temizle
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminLoggedIn");
      sessionStorage.removeItem("adminEmail");
      sessionStorage.removeItem("adminToken");
    }
  } catch (error) {
    // Token parse edilemedi, temizle
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminLoggedIn");
    sessionStorage.removeItem("adminEmail");
    sessionStorage.removeItem("adminToken");
  }
};

/**
 * Rate limiting bilgilerini sıfırlar
 */
export const resetRateLimiting = (): void => {
  localStorage.setItem("loginAttempts", "0");
  localStorage.removeItem("lastLoginAttempt");
  localStorage.removeItem("isRealPasswordAttempt");
};

