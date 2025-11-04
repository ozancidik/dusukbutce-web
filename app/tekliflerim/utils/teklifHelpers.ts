export const validateTeklifData = (data: any): boolean => {
  if (!data.title || !data.description || !data.price) {
    return false;
  }
  
  if (data.price <= 0) {
    return false;
  }
  
  return true;
};

export const getStatusColor = (status: string): string => {
  const colorMap: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    countered: 'bg-blue-100 text-blue-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};