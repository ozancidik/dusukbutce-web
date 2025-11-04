export interface Teklif {
  _id: string;
  title: string;
  description: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected' | 'countered';
  category: string;
  images: string[];
  user: {
    _id: string;
    name: string;
    email: string;
  };
  submission: {
    _id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
  };
  counterOffer?: {
    price: number;
    message: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ModalType {
  teklif: Teklif;
  action: 'accept' | 'reject' | 'counter';
  data?: any;
}

export interface DeleteModalType {
  teklif: Teklif;
}

export interface ToastType {
  type: 'success' | 'error' | 'info';
  message: string;
}