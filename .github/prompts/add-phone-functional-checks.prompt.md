---
description: "bize-sat/cep-telefonu sayfasına cihaz işlevsellik kontrol checkboxları ekler: cihaz açılıyor mu, kamera çalışıyor mu, Face ID çalışıyor mu"
agent: edit
tools: ["editFiles", "codebase"]
---

# Cep Telefonu Sayfasına İşlevsellik Kontrol Alanları Ekle

Sen Next.js App Router, TypeScript ve React konusunda uzman bir senior frontend geliştiricisin. Bu proje inline CSS kullanıyor, Tailwind veya CSS modülü yok.

## Görev

`app/bize-sat/cep-telefonu` sayfasına üç yeni boolean checkbox alanı ekle:

1. **Cihaz açılıyor mu** (`powersOn: boolean`)
2. **Kamera çalışıyor mu** (`cameraWorks: boolean`)
3. **Face ID çalışıyor mu** (`faceIdWorks: boolean`)

## Değiştirilecek Dosyalar

### 1. `app/bize-sat/cep-telefonu/page.tsx`

**`formData` state'ine** üç yeni alan ekle (diğer boolean alanların yanına):

```ts
powersOn: true,
cameraWorks: true,
faceIdWorks: true,
```

**`handleSubmit` içindeki reset bloğuna** aynı alanları ekle (başarılı submit sonrası state sıfırlanırken):

```ts
powersOn: true,
cameraWorks: true,
faceIdWorks: true,
```

### 2. `app/bize-sat/cep-telefonu/components/PhoneCondition.tsx`

Mevcut checkbox grubunun (hasBox, hasInvoice, hasWarranty) hemen **üstüne**, "Durum Bilgileri" bölümü içinde yeni bir grid satırı ekle.

Yeni checkboxları şu grid yapısıyla ekle (mevcut `repeat(3, 1fr)` grid ile aynı stil):

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
  gap: '16px',
  marginTop: '16px'
}}>
  {/* powersOn checkbox */}
  {/* cameraWorks checkbox */}
  {/* faceIdWorks checkbox */}
</div>
```

Her checkbox için **varsayılan değer `true`** olmalı (çoğu cihaz çalışır durumda satışa çıkar).

Checkbox label'ları:
- `powersOn` → "Cihaz açılıyor"
- `cameraWorks` → "Kamera çalışıyor"
- `faceIdWorks` → "Face ID / Parmak izi çalışıyor"

## Stil Kuralları

- Tüm stiller **inline** olmalı (`style={{...}}` şeklinde)
- Mevcut checkbox stilini koru: `width: '24px', height: '24px'`
- Label stili: `fontSize: '16px', color: '#374151'`
- Checkbox wrapper: `display: 'flex', alignItems: 'center', gap: '8px'`

## Kısıtlamalar

- Sadece belirtilen iki dosyayı değiştir
- Mevcut alanları silme veya yeniden adlandırma
- `localStorage` ile ilgili mevcut kodu değiştirme (otomatik olarak yeni alanları da kaydedecek)
- TypeScript tip hatası bırakma

## Başarı Kriteri

- Sayfada üç yeni checkbox görünür
- Checkboxlar varsayılan olarak işaretli gelir
- Form submit edildiğinde yeni alanlar da gönderilir
- TypeScript linter hatası yok
