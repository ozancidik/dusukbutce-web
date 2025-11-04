// localStorage ve sessionStorage temizleme scripti
console.log('🧹 Storage temizleme scripti başlatılıyor...');

// localStorage temizle
const localStorageKeys = ['adminLoggedIn', 'adminEmail', 'userLoggedIn', 'userName', 'userIsAdmin'];
localStorageKeys.forEach(key => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
    console.log(`✅ localStorage'dan ${key} silindi`);
  }
});

// sessionStorage temizle
const sessionStorageKeys = ['adminLoggedIn', 'adminEmail', 'userLoggedIn', 'userName', 'userIsAdmin'];
sessionStorageKeys.forEach(key => {
  if (sessionStorage.getItem(key)) {
    sessionStorage.removeItem(key);
    console.log(`✅ sessionStorage'dan ${key} silindi`);
  }
});

console.log('🎉 Tüm storage temizlendi!');
console.log('💡 Sayfayı yenileyin (F5)');




