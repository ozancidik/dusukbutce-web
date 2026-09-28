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
  payment?: {
    status: 'pending' | 'paid';
    amount?: number;
    method?: string;
    paidAt?: string;
    paidBy?: string;
    note?: string;
  };
  cancellation?: {
    reason?: string;
    requestedAt?: string;
    previousStatus?: string;
    resolvedAt?: string;
    resolvedBy?: string;
    adminNote?: string;
  };
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
  memoryGeneration?: string;
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
  manufacturingYear?: string;
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
  ramFormFactor?: string;
  // SSD özel alanları
  // Mouse özel alanları
  connectivity?: string;
  color?: string;
  // Klavye özel alanları
  switchType?: string;
  layout?: string;
  // Kasa özel alanları
  size?: string;
  powerSupplyWatt?: string;
  // Masaüstü özel alanları
  powerSupply?: string;
  motherboard?: string;
  case?: string;
  // Kasa güç kaynağı markası
  psuBrand?: string;
  // Cep telefonu kayıt türü
  registrationType?: string;
  // Yazıcı baskı rengi
  printColor?: string;
  chargerIncluded?: string;
  knownIssues?: string;
  overclocked?: string;
  moduleKit?: string;
  missingKeys?: string;
  micWorking?: string;
  earPadCondition?: string;
  chargingCase?: string;
  pumpIssue?: string;
  sidePanelCondition?: string;
  includedFans?: string;
  tonerStatus?: string;
  adfIncluded?: string;
  usageLevel?: string;
  pinDamage?: string;
  driveHealth?: string;
  clickIssue?: string;
  controllers?: string;
  stickDrift?: string;
  shifterIncluded?: string;
  accountLock?: string;
  partReplaced?: string;
  biometricWorking?: string;
  pageCount?: string;
  mountingKit?: string;
  // Gaming direksiyon özel alanları
  compatibility?: string;
  // Direksiyon özel alanları
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
  // İşlemci alanları
  socket?: string;
  cache?: string;
  // RAM alanları
  // SSD alanları
  // Monitör alanları
  // Klavye alanları
  // Mouse alanları
  dpi?: string;
  // Kulaklık alanları
  // Tablet alanları
  // Ses Sistemi alanları
  power?: string;
  // Kasa alanları
  // Soğutucu alanları
  // Gaming Direksiyon alanları
  forceFeedback?: string;
  pedal?: string;
}

export type ModalType = 'offer' | 'listing' | 'reject' | 'delivery_completed' | 'confirm_payment' | 'approve_cancellation' | 'reject_cancellation' | null;
export type DeleteModalType = 'single' | 'all' | null;
export type ToastType = 'success' | 'error';
