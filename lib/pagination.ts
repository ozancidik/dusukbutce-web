/**
 * Query string'den page/limit okur, negatif/sıfır/sayısal-olmayan değerleri
 * güvenli varsayılanlara çeker. Doğrulanmamış page/limit MongoDB'ye negatif
 * `skip` olarak gidip 500'e çökebiliyordu (BSON 'skip' >= 0 hatası).
 */
export function parsePagination(
  searchParams: URLSearchParams,
  defaultLimit = 20,
  maxLimit = 100
): { page: number; limit: number } {
  const pageRaw = parseInt(searchParams.get('page') || '1', 10);
  const limitRaw = parseInt(searchParams.get('limit') || String(defaultLimit), 10);

  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const limit =
    Number.isFinite(limitRaw) && limitRaw > 0
      ? Math.min(limitRaw, maxLimit)
      : defaultLimit;

  return { page, limit };
}
