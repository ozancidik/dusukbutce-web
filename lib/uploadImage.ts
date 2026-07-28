"use client";

/**
 * Görseli tarayıcıda DÜZGÜN (asenkron) sıkıştırır: dosyayı yükler, orantılı
 * küçültür, JPEG'e çevirir ve base64 data URL döndürür.
 *
 * (Eski `compressImageSync` senkrondu; Image yüklenmeden boyut okuyordu ve
 * "data:," üretiyordu — hiç sıkıştırmıyordu. Bu düzgün versiyon onun yerine geçer.)
 */
async function compressToDataUrl(
  file: File,
  maxW = 1600,
  maxH = 1200,
  quality = 0.85
): Promise<string> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Dosya okunamadı"));
    reader.readAsDataURL(file);
  });

  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Görsel yüklenemedi"));
    image.src = dataUrl;
  });

  let { width, height } = img;
  if (width > height) {
    if (width > maxW) {
      height = Math.round((height * maxW) / width);
      width = maxW;
    }
  } else {
    if (height > maxH) {
      width = Math.round((width * maxH) / height);
      height = maxH;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl; // geri dönüş: orijinal

  // Şeffaf PNG'ler JPEG'de siyah zemin almasın diye önce beyaz doldur.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", quality);
}

/**
 * Bir görsel dosyasını sıkıştırıp `/api/upload` üzerinden Vercel Blob'a yükler,
 * public URL'i döndürür. Formlarda base64 yerine bu URL saklanır.
 */
export async function uploadImage(file: File): Promise<string> {
  const dataUrl = await compressToDataUrl(file);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: dataUrl }),
  });

  if (!res.ok) {
    let message = "Görsel yüklenemedi";
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // yoksay
    }
    throw new Error(message);
  }

  const data = await res.json();
  return data.url as string;
}
