/**
 * Bize-Sat sayfaları için ortak submission helper fonksiyonu
 * Tüm sayfalarda aynı API çağrı mantığını kullanmak için
 */

export interface SubmissionConfig {
  apiEndpoint: string;
  category: string;
  formData: any;
  token?: string | null;
  successMessage: string;
  localStorageKey?: string;
}

export interface SubmissionResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
}

export async function submitProductOffer(config: SubmissionConfig): Promise<SubmissionResult> {
  const {
    apiEndpoint,
    category,
    formData,
    token,
    successMessage,
  } = config;

  try {
    console.log(`📝 [${category}] Form Data before submit:`, formData);

    // Timeout için AbortController kullan (MongoDB bağlantısı için yeterli süre)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 saniye timeout

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({
        ...formData,
        category,
        cosmeticCondition: formData.cosmeticCondition || 'Mükemmel'
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    console.log(`📥 [${category}] Response status:`, response.status);

    if (response.ok) {
      const data = await response.json();
      console.log(`📥 [${category}] Response data:`, data);

      // localStorage temizleme
      if (config.localStorageKey) {
        localStorage.removeItem(config.localStorageKey);
      }

      return {
        success: true,
        message: successMessage,
        data
      };
    } else {
      const errorData = await response.json().catch(() => ({ message: 'Bilinmeyen hata' }));
      console.error(`❌ [${category}] API Error:`, errorData);
      
      return {
        success: false,
        message: errorData.message || 'Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.',
        error: errorData
      };
    }
  } catch (error: any) {
    console.error(`❌ [${category}] Submit Error:`, error);

    let errorMessage = 'Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.';
    
    if (error.name === 'AbortError') {
      errorMessage = 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
      error
    };
  }
}
