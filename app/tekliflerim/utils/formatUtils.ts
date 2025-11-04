export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(price);
};

export const formatStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    pending: 'Beklemede',
    accepted: 'Kabul Edildi',
    rejected: 'Reddedildi',
    countered: 'Karşı Teklif'
  };
  return statusMap[status] || status;
};