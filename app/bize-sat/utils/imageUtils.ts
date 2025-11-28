"use client";

/**
 * Resim sıkıştırma fonksiyonu
 * Canvas kullanarak resmi belirtilen boyutlara sıkıştırır
 */
export const compressImage = (base64String: string): Promise<string> => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        // Maksimum boyutları belirle (daha yüksek çözünürlük için artırıldı)
        const maxWidth = 1600;
        const maxHeight = 1200;
        
        let { width, height } = img;
        
        // Boyutları orantılı olarak küçült
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Kaliteyi artır (0.9 = %90 kalite - daha net görüntü için)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.9);
        resolve(compressedBase64);
      };
      
      img.src = base64String;
    });
  } catch (error) {
    console.warn('Resim sıkıştırma hatası:', error);
    return Promise.resolve(base64String);
  }
};

