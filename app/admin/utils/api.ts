import { Submission, ModalType, ToastType } from '../types';

export const fetchSubmissions = async (): Promise<{ submissions: Submission[]; error?: string }> => {
  try {
    const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!adminToken) {
      console.error('❌ Admin token bulunamadı');
      return { submissions: [], error: 'Yetkisiz erişim: Lütfen tekrar giriş yapın' };
    }
    
    console.log("🔍 fetchSubmissions: API çağrısı yapılıyor...");
    const response = await fetch('/api/admin/submissions?limit=10', {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("🔍 fetchSubmissions: Response status:", response.status);
    
    const data = await response.json();
    console.log("🔍 fetchSubmissions: Response data:", { success: data.success, submissionsCount: data.submissions?.length });
    
    if (response.ok && data.success) {
      return { submissions: data.submissions || [] };
    } else {
      const errorMessage = data.message || data.error || 'Bilinmeyen hata';
      console.error('❌ Veri çekme hatası:', errorMessage);
      return { submissions: [], error: errorMessage };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Bağlantı hatası';
    console.error('❌ API hatası:', errorMessage);
    return { submissions: [], error: errorMessage };
  }
};

export const submitAction = async (
  submissionId: string,
  modalType: ModalType,
  formData: any,
  submission?: Submission
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('submitAction called:', { submissionId, modalType, formData, submission });
    
    // Admin bilgilerini al
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
    const adminEmail = localStorage.getItem('adminEmail') || sessionStorage.getItem('adminEmail');
    const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    console.log('Admin status:', { adminLoggedIn, adminEmail: !!adminEmail, adminToken: !!adminToken });
    
    const requestBody: any = {
      submissionId,
      action: modalType === 'offer' ? 'offer' : 
              modalType === 'listing' ? 'list' : 
              modalType === 'reject' ? 'reject' : modalType,
      amount: formData.amount,
      notes: formData.notes
    };

    // Teklif verildiğinde müşteri bilgilerini de ekle
    if (modalType === 'offer' && submission) {
      requestBody.customerEmail = submission.userId?.email || '';
      requestBody.customerName = submission.userId?.name || 'Müşteri';
      requestBody.productName = `${submission.brand || ''} ${submission.model || ''}`.trim();
    }

    console.log('🚀 API isteği gönderiliyor:', {
      url: '/api/admin/action',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(adminToken && { 'Authorization': `Bearer ${adminToken.substring(0, 20)}...` })
      },
      body: requestBody
    });

    const response = await fetch('/api/admin/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(adminToken && { 'Authorization': `Bearer ${adminToken}` })
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📡 API yanıtı alındı:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    const result = await response.json();
    console.log('API response:', { status: response.status, result });
    
    return {
      success: result.success,
      message: result.message || (result.success ? 'İşlem başarılı' : 'İşlem başarısız')
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: 'Bir hata oluştu!'
    };
  }
};

export const deleteAllSubmissions = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!adminToken) {
      return { success: false, message: 'Yetkisiz erişim: Lütfen tekrar giriş yapın' };
    }
    
    const response = await fetch('/api/admin/submissions', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ action: 'deleteAll' }),
    });

    const data = await response.json();
    return {
      success: data.success,
      message: data.message || (data.success ? 'Tüm ilanlar silindi' : 'İlanlar silinirken bir hata oluştu')
    };
  } catch (error) {
    console.error('Error deleting all submissions:', error);
    return {
      success: false,
      message: 'Bağlantı hatası oluştu'
    };
  }
};

export const deleteSingleSubmission = async (submissionId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    
    if (!adminToken) {
      return { success: false, message: 'Yetkisiz erişim: Lütfen tekrar giriş yapın' };
    }
    
    const response = await fetch('/api/admin/submissions', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ action: 'deleteOne', submissionId }),
    });

    const data = await response.json();
    return {
      success: data.success,
      message: data.message || (data.success ? 'İlan silindi' : 'İlan silinirken bir hata oluştu')
    };
  } catch (error) {
    console.error('Error deleting submission:', error);
    return {
      success: false,
      message: 'Bağlantı hatası oluştu'
    };
  }
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};
