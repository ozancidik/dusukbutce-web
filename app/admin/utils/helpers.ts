import { CATEGORY_MAP, STATUS_MAP } from './constants';

export const getCategoryDisplayName = (category: string): string => {
  return CATEGORY_MAP[category as keyof typeof CATEGORY_MAP] || category;
};

export const getStatusText = (status: string): string => {
  return STATUS_MAP[status as keyof typeof STATUS_MAP] || status;
};
