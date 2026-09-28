export const saveFormData = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('localStorage quota hatası, veriler kaydedilemedi:', error);
    // Resimleri olmadan kaydetmeyi dene
    const dataWithoutImages = { ...data, images: [] };
    try {
      localStorage.setItem(key, JSON.stringify(dataWithoutImages));
    } catch (innerError) {
      console.error('localStorage tamamen dolu:', innerError);
    }
  }
};

export const loadFormData = (key: string): any | null => {
  try {
    const savedFormData = localStorage.getItem(key);
    if (savedFormData) {
      return JSON.parse(savedFormData);
    }
  } catch (error) {
    console.warn('localStorage\'dan veri yüklenirken hata:', error);
    try {
      localStorage.removeItem(key);
    } catch (innerError) {
      console.error('localStorage temizlenemedi:', innerError);
    }
  }
  return null;
};

export const clearFormData = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('localStorage temizlenemedi:', error);
  }
};
