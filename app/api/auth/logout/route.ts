import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/cookies";

/**
 * Çıkış: httpOnly auth-token cookie'sini siler. (Cookie httpOnly olduğu için
 * JavaScript ile silinemez; sunucudan temizlenmesi gerekir.)
 */
export async function POST() {
  const response = NextResponse.json({ success: true, message: "Çıkış yapıldı" });
  clearAuthCookie(response);
  return response;
}
