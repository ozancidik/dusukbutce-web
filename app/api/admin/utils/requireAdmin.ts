import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

interface AdminTokenPayload extends JwtPayload {
  userId?: string;
  role?: string;
  isAdmin?: boolean;
  email?: string;
  adminRole?: string;
}

export class AdminAuthError extends Error {
  status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

export const ensureAdminRequest = (request: NextRequest): AdminTokenPayload => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AdminAuthError("Yetkisiz erişim: token bulunamadı", 401);
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    throw new AdminAuthError("Yetkisiz erişim: token geçersiz", 401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AdminAuthError("Sunucu yapılandırma hatası", 500);
  }

  let decoded: AdminTokenPayload;
  try {
    decoded = jwt.verify(token, secret) as AdminTokenPayload;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AdminAuthError("Token süresi dolmuş", 401);
    }

    throw new AdminAuthError("Geçersiz token", 401);
  }

  if (!decoded || (!decoded.isAdmin && decoded.role !== "admin")) {
    throw new AdminAuthError("Yetkisiz erişim: admin yetkisi yok", 403);
  }

  return decoded;
};

/**
 * ensureAdminRequest gibi geçerli bir admin token'ı zorunlu kılar, ayrıca
 * token'ın "viewer" (salt okunur) rolünde OLMADIĞINI da doğrular. Yazma/
 * silme etkisi olan uçlarda (teklif ver, sil, ödeme onayla vb.) kullanılır;
 * salt-okunur listeleme uçları hâlâ ensureAdminRequest ile yetinir.
 */
export const ensureFullAdminRequest = (request: NextRequest): AdminTokenPayload => {
  const decoded = ensureAdminRequest(request);

  if (decoded.adminRole === "viewer") {
    throw new AdminAuthError("Yetkisiz erişim: salt-okunur admin hesabı bu işlemi yapamaz", 403);
  }

  return decoded;
};

export const handleAdminAuthError = (error: unknown) => {
  if (error instanceof AdminAuthError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: error.status }
    );
  }

  return NextResponse.json(
    { success: false, error: "Sunucu hatası" },
    { status: 500 }
  );
};

