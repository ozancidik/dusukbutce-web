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
  submissionNumber?: string;
  offerNumber?: string;
  orderNumber?: string;
  adminNotes?: string;
  images: string[]; // Base64 encoded images
  // Kullanıcı bilgileri
  userId?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthDate?: string;
    address?: string;
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
  // PlayStation/Xbox alanları
  firmware?: string;
  jailbreak?: string;
  games?: string;
  controller?: string;
  cable?: string;
  adapter?: string;
  // İşlemci alanları
  socket?: string;
  coreCount?: string;
  threadCount?: string;
  baseFrequency?: string;
  boostFrequency?: string;
  tdp?: string;
  process?: string;
  cache?: string;
  // RAM alanları
  timing?: string;
  voltage?: string;
  cooler?: string;
  // SSD alanları
  iops?: string;
  tbw?: string;
  mtbf?: string;
  // Monitör alanları
  colorGamut?: string;
  brightness?: string;
  contrast?: string;
  viewingAngle?: string;
  sync?: string;
  // Klavye alanları
  mechanical?: string;
  wireless?: string;
  bluetooth?: string;
  batteryLife?: string;
  // Mouse alanları
  dpi?: string;
  pollingRate?: string;
  sensor?: string;
  // Kulaklık alanları
  driverSize?: string;
  frequencyRange?: string;
  impedance?: string;
  soundPressure?: string;
  microphone?: string;
  // Tablet alanları
  operatingSystem?: string;
  camera?: string;
  gps?: string;
  // Ses Sistemi alanları
  power?: string;
  usb?: string;
  // Kasa alanları
  formFactor?: string;
  fanCount?: string;
  usbPorts?: string;
  // Soğutucu alanları
  socketCompatibility?: string;
  fanSize?: string;
  liquidCooling?: string;
  // Gaming Direksiyon alanları
  forceFeedback?: string;
  pedal?: string;
}

export type ModalType = 'offer' | 'listing' | 'reject' | 'delivery_completed' | null;
export type DeleteModalType = 'single' | 'all' | null;
export type ToastType = 'success' | 'error';
