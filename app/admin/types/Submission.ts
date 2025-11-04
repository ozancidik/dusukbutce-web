export interface Submission {
  _id: string;
  category: string;
  brand: string;
  model: string;
  processor?: string;
  processorBrand?: string; // Notebook için
  graphicsCard?: string;
  graphicsCardWatt?: string; // Notebook için
  wattValue?: string;
  ram?: string;
  ramType?: string; // Notebook için
  storage?: string;
  storageType?: string; // Notebook için
  refreshRate?: string;
  screenSize?: string;
  batteryHealth?: string;
  cosmeticCondition: string;
  screenStatus?: string;
  deadPixelCount?: string;
  hasBox: boolean;
  hasInvoice: boolean;
  hasWarranty?: boolean; // Notebook için
  warrantyDuration?: string; // Notebook için
  invoiceDate?: string;
  quantity: number;
  createdAt: string;
  status: string;
  adminNotes?: string;
  images: string[]; // Base64 encoded images
  // Kullanıcı bilgileri
  userId?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  // Ekran kartı özel alanları
  memory?: string;
  memoryType?: string;
  coreClock?: string;
  boostClock?: string;
  powerConsumption?: string;
  ports?: string;
  // Interface alanı (ekran kartı için)
  interface?: string;
  // Ekran kartı özel alanları
  chipSet?: string;
  dviOutput?: string;
  furmarkResult?: string;
  opened?: string;
  thermalPadChanged?: string;
  miningUsed?: string;
  miningDuration?: string;
  warrantySticker?: string;
  coilWhine?: string;
  oxidation?: string;
  description?: string;
  // PlayStation özel alanları
  condition?: string;
  accessories?: string;
  storageCapacity?: string;
  // İşlemci özel alanları
  stokFan?: string;
  // Monitor özel alanları
  resolution?: string;
  panelType?: string;
  responseTime?: string;
  // RAM özel alanları
  capacity?: string;
  speed?: string;
  type?: string;
  latency?: string;
  // SSD özel alanları
  readSpeed?: string;
  writeSpeed?: string;
  // Mouse özel alanları
  connectivity?: string;
  color?: string;
  // Klavye özel alanları
  switchType?: string;
  rgb?: string;
  // Kasa özel alanları
  size?: string;
  material?: string;
  powerSupplyWatt?: string;
  // Masaüstü özel alanları
  powerSupply?: string;
  motherboard?: string;
  case?: string;
  // Gaming direksiyon özel alanları
  compatibility?: string;
  // Direksiyon özel alanları
  platform?: string;
  // Xbox özel alanları
  customerResponse?: {
    action: 'accepted' | 'rejected';
    note?: string;
    reason?: string;
    date: string;
  };
  deliveryMethod?: 'kargo' | 'evden';
  customerInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    district?: string;
    notes?: string;
  };
}

export type ModalType = 'offer' | 'listing' | 'reject' | null;
export type DeleteModalType = 'single' | 'all' | null;
export type ToastType = 'success' | 'error';
