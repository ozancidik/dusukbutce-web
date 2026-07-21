import Joi from 'joi';
import { NextResponse } from 'next/server';

/**
 * Body'yi Joi şemasıyla doğrular. Geçerliyse { error: null }, geçersizse hazır
 * bir 400 NextResponse döner.
 *
 * Amaç: mevcut iş kurallarını DEĞİŞTİRMEDEN, açıkça bozuk/eksik/aşırı büyük
 * veriyi DB'ye ulaşmadan erken durduran bir "tip + boyut kalkanı". Bilinmeyen
 * alanlar reddedilmez (allowUnknown), böylece geçerli istekler etkilenmez.
 */
export function validateBody(
  schema: Joi.ObjectSchema,
  body: unknown
): { error: null } | { error: NextResponse } {
  const { error } = schema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
    stripUnknown: false,
    convert: true,
  });

  if (error) {
    return {
      error: NextResponse.json(
        { success: false, message: 'Geçersiz veri: ' + error.message },
        { status: 400 }
      ),
    };
  }
  return { error: null };
}

// --- Şemalar ---

export const loginSchema = Joi.object({
  email: Joi.string().max(254).required(),
  password: Joi.string().max(1024).required(),
  csrfToken: Joi.string().max(512).optional(), // login route CSRF'i ayrıca kontrol ediyor
});

export const registerSchema = Joi.object({
  email: Joi.string().max(254).required(),
  password: Joi.string().min(6).max(1024).required(),
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).required(),
  cep_telefonu: Joi.string().max(30).required(),
  kvkkApproved: Joi.boolean().valid(true).required(),
  acceptNewsletter: Joi.boolean().optional(),
  // Doğum tarihi birden fazla anahtarla gelebiliyor — hepsi opsiyonel.
  birth_date: Joi.string().max(30).allow('').optional(),
  birthDate: Joi.string().max(30).allow('').optional(),
  dogum_tarihi: Joi.string().max(30).allow('').optional(),
});

// Teklif (submission) — asıl payload-boyut koruması burada.
export const submissionSchema = Joi.object({
  category: Joi.string().max(60).required(),
  brand: Joi.string().max(200).required(),
  model: Joi.string().max(200).required(),
  cosmeticCondition: Joi.string().max(200).required(),
  description: Joi.string().max(5000).allow('').optional(),
  quantity: Joi.number().min(1).max(9999).optional(),
  // Base64 görseller: dizi uzunluğu ve öğe boyutu sınırlı (16MB Mongo doc limiti
  // ve aşırı payload'lara karşı). Sıkıştırılmış görseller için fazlasıyla yeterli.
  images: Joi.array().items(Joi.string().max(8_000_000)).max(20).optional(),
}).unknown(true); // diğer kategoriye özel alanları serbest bırak (handler zaten whitelist ediyor)
