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

export const handleImageUpload = (
  files: FileList | null,
  currentImages: string[],
  onComplete: (images: string[]) => void,
  onError?: (error: string) => void
) => {
  if (!files || files.length === 0) return;

  const maxImages = 10;
  const maxSizeInMB = 5;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const remainingSlots = maxImages - currentImages.length;
  if (remainingSlots <= 0) {
    onError?.(`Maksimum ${maxImages} resim yükleyebilirsiniz.`);
    return;
  }

  const filesToProcess = Array.from(files).slice(0, remainingSlots);
  const newImages: string[] = [];
  let processedCount = 0;

  filesToProcess.forEach(file => {
    // Check file size
    if (file.size > maxSizeInBytes) {
      processedCount++;
      onError?.(`${file.name} çok büyük. Maksimum ${maxSizeInMB}MB olmalı.`);
      if (processedCount === filesToProcess.length) {
        onComplete([...currentImages, ...newImages]);
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        newImages.push(e.target.result as string);
        processedCount++;
        
        if (processedCount === filesToProcess.length) {
          onComplete([...currentImages, ...newImages]);
        }
      }
    };
    reader.onerror = () => {
      processedCount++;
      onError?.(`${file.name} yüklenirken hata oluştu.`);
      if (processedCount === filesToProcess.length) {
        onComplete([...currentImages, ...newImages]);
      }
    };
    reader.readAsDataURL(file);
  });
};

export const removeImage = (
  index: number,
  currentImages: string[]
): string[] => {
  return currentImages.filter((_, i) => i !== index);
};

export const validateForm = (
  formData: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } => {
  const missingFields = requiredFields.filter(field => {
    const value = formData[field];
    return !value || (typeof value === 'string' && value.trim() === '');
  });

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};





