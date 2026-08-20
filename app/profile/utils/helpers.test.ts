import { describe, it, expect } from 'vitest';
import { isBirthDateEditable, formatPhoneNumber } from './helpers';

const google = { provider: 'google' };
const local = { provider: 'local' };

describe('isBirthDateEditable', () => {
  it('returns false when userInfo is missing', () => {
    expect(isBirthDateEditable(null)).toBe(false);
    expect(isBirthDateEditable(undefined)).toBe(false);
  });

  it('returns false for a pure-local account (no social provider at all)', () => {
    expect(
      isBirthDateEditable({ authProviders: [local], birthDate: '', birthDateEdited: false })
    ).toBe(false);
  });

  it('returns true for a pure-OAuth account with no birthDate yet, not edited', () => {
    expect(
      isBirthDateEditable({ authProviders: [google], birthDate: '', birthDateEdited: false })
    ).toBe(true);
  });

  it('returns false for a pure-OAuth account that already has a birthDate (migration case)', () => {
    expect(
      isBirthDateEditable({ authProviders: [google], birthDate: '1990-01-01', birthDateEdited: false })
    ).toBe(false);
  });

  it('returns false once birthDateEdited is true', () => {
    expect(
      isBirthDateEditable({ authProviders: [google], birthDate: '', birthDateEdited: true })
    ).toBe(false);
  });

  // Regression test for the dual-provider bug found and fixed 2026-08-18/20:
  // an account with BOTH a social and a local provider used to be blocked
  // entirely (three separate hand-rolled reimplementations in handleEdit
  // all forgot to allow this case). It should behave exactly like a
  // pure-OAuth account: editable once, only while birthDate is empty.
  it('allows a dual-provider (google + local) account to set birthDate once, same as pure-OAuth', () => {
    expect(
      isBirthDateEditable({ authProviders: [google, local], birthDate: '', birthDateEdited: false })
    ).toBe(true);
  });

  it('blocks a dual-provider account once it already has a birthDate', () => {
    expect(
      isBirthDateEditable({ authProviders: [google, local], birthDate: '1990-01-01', birthDateEdited: false })
    ).toBe(false);
  });

  it('blocks a dual-provider account once already edited', () => {
    expect(
      isBirthDateEditable({ authProviders: [google, local], birthDate: '', birthDateEdited: true })
    ).toBe(false);
  });
});

describe('formatPhoneNumber', () => {
  it('formats a leading-zero 10-digit number starting with 5', () => {
    expect(formatPhoneNumber('05551234567')).toBe('(555) 123 45 67');
  });

  it('returns empty string for numbers not starting with 5', () => {
    expect(formatPhoneNumber('01234567890')).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(formatPhoneNumber('')).toBe('');
  });
});
