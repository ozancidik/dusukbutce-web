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

// SVG kasıtlı olarak dışarıda: içine <script> gömülebilir ve tarayıcıda
// doğrudan açıldığında çalışabilir (canlı testle doğrulandı). Sadece raster
// formatlara izin veriyoruz; her biri ilk baytlarından (magic number)
// gerçekten o formatta olduğu doğrulanıyor — client'ın beyan ettiği
// content-type'a güvenmiyoruz (düz metnin "image/png" diye kabul edildiği
// bulundu).
const ALLOWED_IMAGE_TYPES: Record<string, (buf: Buffer) => boolean> = {
  "image/png": (buf) =>
    buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  "image/jpeg": (buf) => buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff,
  "image/gif": (buf) =>
    buf.length >= 6 && (buf.subarray(0, 6).toString("ascii") === "GIF87a" || buf.subarray(0, 6).toString("ascii") === "GIF89a"),
  "image/webp": (buf) =>
    buf.length >= 12 && buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP",
};

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
    const match = image.match(/^data:([a-zA-Z0-9.+-]+\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json(
        { error: "Geçersiz görsel formatı" },
        { status: 400 }
      );
    }
    const contentType = match[1];
    const isKnownType = Object.prototype.hasOwnProperty.call(ALLOWED_IMAGE_TYPES, contentType);
    if (!isKnownType) {
      return NextResponse.json(
        { error: "Geçersiz görsel formatı" },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(match[2], "base64");

    // Boyut sınırı — kötü niyetli/aşırı büyük yüklemeyi engelle.
    if (buffer.length > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: "Görsel çok büyük (maksimum 7MB)" },
        { status: 400 }
      );
    }

    // Beyan edilen content-type'ın gerçek dosya içeriğiyle eştiğini doğrula
    // (magic number) — düz metnin "image/png" diye işaretlenip kabul
    // edilmesi ve SVG'ye script gömülmesi bu kontrolle engelleniyor.
    if (!ALLOWED_IMAGE_TYPES[contentType](buffer)) {
      return NextResponse.json(
        { error: "Görsel içeriği beyan edilen formatla eşleşmiyor" },
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
