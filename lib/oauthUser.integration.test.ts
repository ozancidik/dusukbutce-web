import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// upsertOAuthUser, google/callback + facebook/callback + mobil social-login
// ucunun paylaştığı find-or-create mantığı — bu üç yerin davranışını tek
// bir gerçek DB'ye karşı doğrulayan test bu.

let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri();
  const { default: connectDB } = await import('@/lib/mongodb');
  await connectDB();
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('upsertOAuthUser', () => {
  it('creates a new user with the provider in authProviders and emailVerified true', async () => {
    const { upsertOAuthUser } = await import('@/lib/oauthUser');
    const { user, isNew } = await upsertOAuthUser(
      'new-google-user@example.com',
      'Test User',
      'google-provider-id-1',
      'google'
    );

    expect(isNew).toBe(true);
    expect(user.emailVerified).toBe(true);
    expect(user.authProviders).toHaveLength(1);
    expect(user.authProviders[0].provider).toBe('google');
    expect(user.authProviders[0].providerId).toBe('google-provider-id-1');
  });

  it('does not duplicate the provider on a repeat login with the same email+provider', async () => {
    const { upsertOAuthUser } = await import('@/lib/oauthUser');
    const email = 'repeat-login@example.com';

    await upsertOAuthUser(email, 'Repeat User', 'fb-id-1', 'facebook');
    const { user, isNew } = await upsertOAuthUser(email, 'Repeat User', 'fb-id-1', 'facebook');

    expect(isNew).toBe(false);
    expect(user.authProviders).toHaveLength(1);
  });

  it('links a second provider onto an existing account with the same email (account linking)', async () => {
    const { upsertOAuthUser } = await import('@/lib/oauthUser');
    const email = 'multi-provider@example.com';

    await upsertOAuthUser(email, 'Multi Provider', 'google-id-2', 'google');
    const { user, isNew } = await upsertOAuthUser(email, 'Multi Provider', 'fb-id-2', 'facebook');

    expect(isNew).toBe(false);
    expect(user.authProviders).toHaveLength(2);
    const providers = user.authProviders.map((p: any) => p.provider).sort();
    expect(providers).toEqual(['facebook', 'google']);
  });

  it('applies extraFieldsOnCreate only when the user is newly created', async () => {
    const { upsertOAuthUser } = await import('@/lib/oauthUser');
    const email = 'extra-fields@example.com';

    const { user: created } = await upsertOAuthUser(email, 'Extra Fields', 'google-id-3', 'google', {
      phone: '5551234567',
    });
    expect(created.phone).toBe('5551234567');

    // Repeat login must NOT overwrite phone via extraFieldsOnCreate (only applies on create).
    const { user: repeated } = await upsertOAuthUser(email, 'Extra Fields', 'google-id-3', 'google', {
      phone: '5559999999',
    });
    expect(repeated.phone).toBe('5551234567');
  });
});
