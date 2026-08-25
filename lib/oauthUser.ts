import User from '@/models/User';

export interface UpsertOAuthUserResult {
  user: any;
  isNew: boolean;
}

/**
 * Google/Facebook OAuth callback'lerinin ve mobil social-login ucunun
 * paylaştığı find-or-create mantığı: email ile kullanıcıyı bul, yoksa
 * oluştur, varsa ilgili provider'ı authProviders listesine ekle (zaten
 * varsa dokunma). OAuth ile gelen email'ler doğrulanmış kabul edilir.
 */
export async function upsertOAuthUser(
  email: string,
  name: string,
  providerId: string,
  provider: 'google' | 'facebook',
  extraFieldsOnCreate: Record<string, unknown> = {}
): Promise<UpsertOAuthUserResult> {
  let user = await User.findOne({ email });
  let isNew = false;

  if (!user) {
    isNew = true;
    user = new User({
      email,
      name,
      authProviders: [{ provider, providerId, connectedAt: new Date() }],
      emailVerified: true,
      ...extraFieldsOnCreate,
    });
    await user.save();
  } else {
    const hasProvider = user.authProviders?.some((p: any) => p.provider === provider);
    if (!hasProvider) {
      if (!user.authProviders) user.authProviders = [];
      user.authProviders.push({ provider, providerId, connectedAt: new Date() });
      await user.save();
    }
  }

  return { user, isNew };
}
