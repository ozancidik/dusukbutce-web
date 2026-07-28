import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getVerifiedUserId } from "@/lib/auth";

/**
 * Görsel yükleme: base64 data URL alır, Vercel Blob'a yükler, public URL döndürür.
 * Böylece görseller MongoDB'de base64 olarak şişmez; DB'de sadece URL tutulur.
 *
 * Sadece giriş yapmış kullanıcılar yükleyebilir (httpOnly cookie ile doğrulama).
 */
export async function POST(request: NextRequest) {
  try {
    const userId = getVerifiedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { image } = await request.json();
    if (typeof image !== "string") {
      return NextResponse.json({ error: "Görsel gerekli" }, { status: 400 });
    }

    // data:image/...;base64,.... biçimini ayrıştır
    const match = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json(
        { error: "Geçersiz görsel formatı" },
        { status: 400 }
      );
    }
    const contentType = match[1];
    const buffer = Buffer.from(match[2], "base64");

    // Boyut sınırı (8MB) — kötü niyetli/aşırı büyük yüklemeyi engelle.
    if (buffer.length > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Görsel çok büyük (maksimum 8MB)" },
        { status: 400 }
      );
    }

    const ext = contentType.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
    const blob = await put(`submissions/${userId}/${Date.now()}.${ext}`, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Görsel yükleme hatası:", error);
    return NextResponse.json({ error: "Görsel yüklenemedi" }, { status: 500 });
  }
}
