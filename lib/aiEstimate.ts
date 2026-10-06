/**
 * Mobil uygulamadaki "Fiyat Danışmanı" ve Teknik Servis "Tamir Tahmini" için
 * Perplexity çağrısı. Eskiden mobil uygulama Perplexity SDK'sını ve API anahtarını
 * doğrudan içeriyordu (Node SDK'sı React Native'de paketlenemiyor, anahtar da
 * uygulamaya gömülüyordu). Artık anahtar yalnızca sunucuda durur.
 *
 * Güvenlik: İstemci ham istem (prompt) göndermez; yalnızca alanları gönderir ve
 * istem sunucuda sabit şablonlardan kurulur. Böylece uç, ücretli bir genel amaçlı
 * LLM vekiline dönüşemez.
 */

export type EstimateKind = 'price' | 'repair';

export interface EstimateInput {
  kind: EstimateKind;
  product?: string;
  device?: string;
  issue?: string;
}

export interface EstimateResult {
  answer: string;
  sources: { url: string }[];
  status: 'success';
}

export class AiUnavailableError extends Error {}
export class AiUpstreamError extends Error {}

/** Kontrol karakterlerini ve satır sonlarını temizler, kırpar, uzunluğu sınırlar. */
export function sanitizeField(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/["`]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function buildQuery(input: EstimateInput): string {
  if (input.kind === 'price') {
    const product = sanitizeField(input.product, 120);
    return `Türkiye'de "${product}" ikinci-el ortalama satış fiyatı nedir? Güncel pazar değeri ve fiyat aralığını söyle. (Türkçe cevap ver)`;
  }
  const device = sanitizeField(input.device, 120);
  const issue = sanitizeField(input.issue, 300);
  return `"${device}" cihazında "${issue}" sorunu için Türkiye'de tamir maliyeti ortalama ne kadar? Benzer arızaların tamir fiyatlarını söyle. (Türkçe cevap ver)`;
}

const PERPLEXITY_URL = 'https://api.perplexity.ai/chat/completions';
const TIMEOUT_MS = 20_000;

export async function getEstimate(input: EstimateInput): Promise<EstimateResult> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) throw new AiUnavailableError('PERPLEXITY_API_KEY tanımlı değil');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(PERPLEXITY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [{ role: 'user', content: buildQuery(input) }],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new AiUpstreamError(`Perplexity yanıtı: HTTP ${res.status}`);

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      citations?: unknown;
    };
    const answer = json.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new AiUpstreamError('Perplexity boş yanıt döndürdü');

    const citations = Array.isArray(json.citations) ? json.citations : [];
    const sources = citations
      .filter((c): c is string => typeof c === 'string' && /^https?:\/\//.test(c))
      .slice(0, 8)
      .map((url) => ({ url }));
    return { answer, sources, status: 'success' };
  } catch (error) {
    if (error instanceof AiUpstreamError || error instanceof AiUnavailableError) throw error;
    // Ağ hatası / zaman aşımı: ayrıntıyı (anahtar içerebilecek) istemciye sızdırma.
    throw new AiUpstreamError('Perplexity isteği başarısız');
  } finally {
    clearTimeout(timer);
  }
}
