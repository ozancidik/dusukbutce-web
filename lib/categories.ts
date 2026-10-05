/**
 * "Bize sat" talep kategorilerinin tek kaynağı.
 *
 * `category` değeri formlar ve mobil uygulama tarafından gönderilir ve DB'de olduğu
 * gibi saklanır. Tarihsel nedenlerle bir kısmı Türkçe (cep-telefonu, yazici, tarayici,
 * fotokopi-makinesi), bir kısmı İngilizce id kullanır; DB'yi taşımadan tutarlı
 * görüntülemek/filtrelemek için canonical id + takma ad (alias) tablosu tutulur.
 *
 * Yeni bir kategori eklerken yalnızca burayı güncelle; admin etiketleri ve filtresi
 * buradan beslenir.
 */
export interface SubmissionCategory {
  id: string;
  label: string;
}

export const SUBMISSION_CATEGORIES: SubmissionCategory[] = [
  { id: 'notebook', label: 'Dizüstü Bilgisayar' },
  { id: 'desktop', label: 'Masaüstü Bilgisayar' },
  { id: 'cep-telefonu', label: 'Cep Telefonu' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'monitor', label: 'Monitör' },
  { id: 'graphics-card', label: 'Ekran Kartı' },
  { id: 'processor', label: 'İşlemci' },
  { id: 'ram', label: 'RAM' },
  { id: 'ssd', label: 'SSD' },
  { id: 'case', label: 'Kasa' },
  { id: 'cooler', label: 'Soğutucu' },
  { id: 'keyboard', label: 'Klavye' },
  { id: 'mouse', label: 'Mouse' },
  { id: 'headphones', label: 'Kulaklık' },
  { id: 'audio-system', label: 'Ses Sistemi' },
  { id: 'playstation', label: 'PlayStation' },
  { id: 'xbox', label: 'Xbox' },
  { id: 'nintendo', label: 'Nintendo' },
  { id: 'gamepad', label: 'Gamepad' },
  { id: 'gaming-wheel', label: 'Gaming Direksiyon' },
  { id: 'steering-wheel', label: 'Direksiyon' },
  { id: 'yazici', label: 'Yazıcı' },
  { id: 'tarayici', label: 'Tarayıcı' },
  { id: 'fotokopi-makinesi', label: 'Fotokopi Makinesi' },
];

/**
 * Eski/alternatif id → canonical id. Mobil uygulamanın ilk sürümü (phone, printer,
 * scanner, photocopier) ve kaldırılan `sound-system` uç noktasından kalan kayıtlar.
 */
export const CATEGORY_ALIASES: Record<string, string> = {
  phone: 'cep-telefonu',
  printer: 'yazici',
  scanner: 'tarayici',
  photocopier: 'fotokopi-makinesi',
  'sound-system': 'audio-system',
};

const LABELS: Record<string, string> = Object.fromEntries(
  SUBMISSION_CATEGORIES.map((c) => [c.id, c.label])
);

export function normalizeCategory(category: string | undefined | null): string {
  if (!category) return '';
  return CATEGORY_ALIASES[category] ?? category;
}

/** Bilinmeyen id ham haliyle döner (görünür kalır, kırılmaz). */
export function getCategoryLabel(category: string | undefined | null): string {
  if (!category) return '';
  return LABELS[normalizeCategory(category)] ?? category;
}
