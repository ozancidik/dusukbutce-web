import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getVerifiedUserId } from "@/lib/auth";

// Decoded görsel için üst sınır. NOT: bu ortamda request body'sinin toplamda
// ~10.5MB civarında bozulduğu/kesildiği canlı testle doğrulandı (8MB decoded
// görsel + base64 overhead + JSON sarmalayıcı bu sınırı aşıyor ve
// request.json() "Unterminated string" hatasıyla çöküyordu, kontrolün kendisi
// hiç çalışmıyordu). 7MB, base64 overhead sonrası bu eşiğin güvenle altında
// kalıyor (canlı doğrulandı: 7MB geçti, 7.5MB body kesilmesine takıldı).
const MAX_IMAGE_BYTES = 7 * 1024 * 1024;
// base64 kodlaması ~4/3 büyütür; küçük JSON sarmalayıcı için de pay bırak.
const MAX_BODY_BYTES = Math.ceil((MAX_IMAGE_BYTES * 4) / 3) + 4096;

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

    // Body'yi parse etmeden önce Content-Length ile erken reddet — aşırı
    // büyük gövdeler parse edilmeye çalışılırken bozuk-JSON 500'üne düşmesin.
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Görsel çok büyük (maksimum 7MB)" },
        { status: 400 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Görsel çok büyük veya istek bozuk" },
        { status: 400 }
      );
    }

    const { image } = (body ?? {}) as { image?: unknown };
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

    // Boyut sınırı — kötü niyetli/aşırı büyük yüklemeyi engelle.
    if (buffer.length > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: "Görsel çok büyük (maksimum 7MB)" },
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
