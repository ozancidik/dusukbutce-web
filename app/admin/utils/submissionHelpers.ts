import { Submission } from '../types/Submission';

export const getCategoryDisplayName = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'graphics-card': 'Ekran Kartı',
    'notebook': 'Dizüstü Bilgisayar',
    'desktop': 'Masaüstü Bilgisayar',
    'processor': 'İşlemci',
    'monitor': 'Monitör',
    'keyboard': 'Klavye',
    'mouse': 'Fare',
    'headphones': 'Kulaklık',
    'ram': 'RAM',
    'ssd': 'SSD',
    'tablet': 'Tablet',
    'audio-system': 'Ses Sistemi',
    'case': 'Kasa',
    'cooler': 'Soğutucu',
    'gaming-wheel': 'Gaming Direksiyon',
    'sound-system': 'Ses Sistemi'
  };
  
  return categoryMap[category] || category;
};

export const getStatusDisplayInfo = (status: string) => {
  const statusMap: { [key: string]: { text: string; icon: string; bgColor: string } } = {
    'pending': { text: '⏳ Beklemede', icon: '⏳', bgColor: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
    'offered': { text: '💰 Teklif Verildi', icon: '💰', bgColor: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' },
    'listed': { text: '📋 İlan Oluşturuldu', icon: '📋', bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' },
    'rejected': { text: '❌ Reddedildi', icon: '❌', bgColor: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' },
    'accepted': { text: '✅ Kabul Edildi', icon: '✅', bgColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' },
    'customer_rejected': { text: '❌ Müşteri Reddetti', icon: '❌', bgColor: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' },
    'delivery_confirmed': { text: '🚚 Teslimat Onaylandı', icon: '🚚', bgColor: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }
  };
  
  return statusMap[status] || { text: status, icon: '❓', bgColor: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)' };
};

export const validateImageBase64 = (image: string): boolean => {
  return typeof image === 'string' && image.startsWith('data:image');
};

export const getSubmissionTitle = (submission: Submission): string => {
  return `${submission.brand} ${submission.model}`;
};
