import { NextRequest, NextResponse } from 'next/server';
import Joi from 'joi';
import { getVerifiedUser } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import { validateBody } from '@/lib/validate';
import { AiUnavailableError, getEstimate } from '@/lib/aiEstimate';

// Perplexity (ücretli) çağrısı yapar: yalnızca giriş yapmış kullanıcı, kullanıcı başına
// hız sınırı, sabit istem şablonları. Ayrıntı için lib/aiEstimate.ts.
const estimateSchema = Joi.object({
  kind: Joi.string().valid('price', 'repair').required(),
  product: Joi.when('kind', {
    is: 'price',
    then: Joi.string().trim().min(2).max(120).required(),
    otherwise: Joi.any(),
  }),
  device: Joi.when('kind', {
    is: 'repair',
    then: Joi.string().trim().min(2).max(120).required(),
    otherwise: Joi.any(),
  }),
  issue: Joi.when('kind', {
    is: 'repair',
    then: Joi.string().trim().min(2).max(300).required(),
    otherwise: Joi.any(),
  }),
});

export async function POST(request: NextRequest) {
  const user = getVerifiedUser(request);
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Kimlik doğrulama gerekli' },
      { status: 401 }
    );
  }

  const limited = checkRateLimit(request, {
    name: 'ai-estimate',
    identifier: user.userId,
    limit: 10,
    windowMs: 10 * 60_000,
  });
  if (limited) return limited;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Geçersiz JSON' }, { status: 400 });
  }
  const v = validateBody(estimateSchema, body);
  if (v.error) return v.error;

  try {
    const data = await getEstimate(body as Parameters<typeof getEstimate>[0]);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof AiUnavailableError) {
      return NextResponse.json(
        { success: false, message: 'Bu özellik şu anda kullanılamıyor' },
        { status: 503 }
      );
    }
    console.error('AI estimate error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json(
      { success: false, message: 'Tahmin servisine ulaşılamadı' },
      { status: 502 }
    );
  }
}
