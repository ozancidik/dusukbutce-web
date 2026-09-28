/**
 * Login sonrası yönlendirme hedefini (`?returnUrl=`) doğrular — open-redirect'i önler.
 *
 * `value`, çağıranın yönlendirmeden önce TEK KEZ `decodeURIComponent`'ten geçireceği
 * dize olmalı (mevcut tüm yönlendirme noktaları böyle çalışıyor). Doğrulama, bu
 * çözülmüş halin aynı-origin bir yol olup olmadığına bakar. Güvenliyse `value` olduğu
 * gibi döner (çağıranın kendi decode adımı değişmeden çalışır), değilse `fallback`.
 */
export function safeReturnUrl(value: string | null | undefined, fallback = '/'): string {
  if (!value) return fallback;

  let decoded: string;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return fallback;
  }

  // Yalnızca tek '/' ile başlayan yollar: '//host' (protokol-göreli), '/\host',
  // 'https://…', 'javascript:…' hepsi burada elenir.
  if (!decoded.startsWith('/') || decoded.startsWith('//') || decoded.startsWith('/\\')) {
    return fallback;
  }

  // Kontrol karakterleri (tab/newline tarayıcı ayrıştırmasını atlatmada kullanılır) ve ters eğik çizgi.
  if (/[\u0000-\u001f\u007f\\]/.test(decoded)) return fallback;

  return value;
}
