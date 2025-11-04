// Helper Functions

// Simple JWT decode function
export function decodeJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatPrice = (price: number) => {
  return `₺${price.toLocaleString('tr-TR')}`;
};

export const getStatusText = (status: string) => {
  return getStatusInfo(status).text;
};

export const getStatusInfo = (status: string) => {
  switch (status) {
    case 'pending':
      return { color: '#f59e0b', text: 'Beklemede', icon: '⏳' };
    case 'offered':
      return { color: '#3b82f6', text: 'Teklif Verildi', icon: '💰' };
    case 'listed':
      return { color: '#059669', text: 'Listelendi', icon: '📋' };
    case 'rejected':
      return { color: '#dc2626', text: 'Reddedildi', icon: '❌' };
    case 'approved':
      return { color: '#059669', text: 'Onaylandı', icon: '✅' };
    case 'accepted':
      return { color: '#059669', text: 'Kabul Edildi', icon: '✅' };
    case 'customer_accepted':
      return { color: '#059669', text: 'Sizin Tarafınızdan Kabul Edildi', icon: '✅' };
    case 'customer_rejected':
      return { color: '#dc2626', text: 'Sizin Tarafınızdan Reddedildi', icon: '❌' };
    case 'delivery_confirmed':
      return { color: '#7c3aed', text: 'Teslimat Onaylandı', icon: '🚚' };
    default:
      return { color: '#6b7280', text: 'Bilinmeyen', icon: '❓' };
  }
};











