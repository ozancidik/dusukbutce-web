import { describe, it, expect } from 'vitest';
import { safeReturnUrl } from './safeReturnUrl';

describe('safeReturnUrl', () => {
  it('meşru aynı-origin yolları olduğu gibi döner', () => {
    expect(safeReturnUrl('/')).toBe('/');
    expect(safeReturnUrl('/bize-sat/cep-telefonu')).toBe('/bize-sat/cep-telefonu');
    expect(safeReturnUrl('/search?q=notebook&page=2')).toBe('/search?q=notebook&page=2');
    // encodeURIComponent('/bize-sat/kasa') biçimi (LoginRequiredCard'ın ürettiği)
    expect(safeReturnUrl('%2Fbize-sat%2Fkasa')).toBe('%2Fbize-sat%2Fkasa');
  });

  it('boş/eksik değerde fallback döner', () => {
    expect(safeReturnUrl(null)).toBe('/');
    expect(safeReturnUrl(undefined)).toBe('/');
    expect(safeReturnUrl('')).toBe('/');
    expect(safeReturnUrl('', '/profile')).toBe('/profile');
  });

  it('mutlak dış URL\'leri reddeder', () => {
    expect(safeReturnUrl('https://evil.com')).toBe('/');
    expect(safeReturnUrl('http://evil.com/login')).toBe('/');
    expect(safeReturnUrl('https%3A%2F%2Fevil.com')).toBe('/');
  });

  it('protokol-göreli ve ters-eğik-çizgili hedefleri reddeder', () => {
    expect(safeReturnUrl('//evil.com')).toBe('/');
    expect(safeReturnUrl('%2F%2Fevil.com')).toBe('/');
    expect(safeReturnUrl('/%2Fevil.com')).toBe('/');
    expect(safeReturnUrl('/\\evil.com')).toBe('/');
    expect(safeReturnUrl('%2F%5Cevil.com')).toBe('/');
  });

  it('javascript:/data: şemalarını reddeder', () => {
    expect(safeReturnUrl('javascript:alert(1)')).toBe('/');
    expect(safeReturnUrl('data:text/html,<script>1</script>')).toBe('/');
    expect(safeReturnUrl('%6Aavascript:alert(1)')).toBe('/');
  });

  it('kontrol karakterli hedefleri reddeder (tab/newline ile ayrıştırma atlatma)', () => {
    expect(safeReturnUrl('/\t/evil.com')).toBe('/');
    expect(safeReturnUrl('/%09/evil.com')).toBe('/');
    expect(safeReturnUrl('/%0a/evil.com')).toBe('/');
  });

  it('bozuk yüzde-kodlamada fallback döner (decode hata fırlatmaz)', () => {
    expect(safeReturnUrl('/%E0%A4%A')).toBe('/');
  });
});
