import { describe, it, expect } from 'vitest';
import { SUBMISSION_CATEGORIES, getCategoryLabel, normalizeCategory } from './categories';
import { ALLOWED_FIELDS } from './handleProductSubmission';

describe('kategori tablosu', () => {
  it('id ve etiketler benzersiz', () => {
    const ids = SUBMISSION_CATEGORIES.map((c) => c.id);
    const labels = SUBMISSION_CATEGORIES.map((c) => c.label);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("Türkçe id'li canlı kategoriler etiketli (ham id görünmez)", () => {
    expect(getCategoryLabel('cep-telefonu')).toBe('Cep Telefonu');
    expect(getCategoryLabel('yazici')).toBe('Yazıcı');
    expect(getCategoryLabel('tarayici')).toBe('Tarayıcı');
    expect(getCategoryLabel('fotokopi-makinesi')).toBe('Fotokopi Makinesi');
  });

  it("eski mobil id'leri canonical id'ye çevrilir", () => {
    expect(normalizeCategory('phone')).toBe('cep-telefonu');
    expect(getCategoryLabel('printer')).toBe('Yazıcı');
    expect(getCategoryLabel('sound-system')).toBe('Ses Sistemi');
    expect(normalizeCategory('notebook')).toBe('notebook');
  });

  it('bilinmeyen id ham döner, boş değer boş döner', () => {
    expect(getCategoryLabel('bilinmeyen')).toBe('bilinmeyen');
    expect(getCategoryLabel(undefined)).toBe('');
  });

  it('category alanı ALLOWED_FIELDS içinde', () => {
    expect(ALLOWED_FIELDS).toContain('category');
  });
});
