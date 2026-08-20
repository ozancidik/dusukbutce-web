// Submission Types
export interface Offer {
  amount: number;
  notes: string;
  date: string;
}

export interface Submission {
  _id: string;
  category: string;
  brand: string;
  model: string;
  processor?: string;
  graphicsCard?: string;
  wattValue?: string;
  ram?: string;
  storage?: string;
  refreshRate?: string;
  screenSize?: string;
  batteryHealth?: string;
  cosmeticCondition: string;
  screenStatus?: string;
  deadPixelCount?: string;
  hasBox: boolean;
  hasInvoice: boolean;
  invoiceDate?: string;
  quantity: number;
  createdAt: string;
  status: string;
  submissionNumber?: string;
  offerNumber?: string;
  orderNumber?: string;
  adminNotes?: string;
  images: string[];
  offer?: Offer;
  listing?: {
    price: number;
    title: string;
    description: string;
    date: string;
  };
  rejectionReason?: string;
  rejectedAt?: string;
  customerResponse?: {
    action: 'accepted' | 'rejected';
    note?: string;
    reason?: string;
    date: string;
  };
}


