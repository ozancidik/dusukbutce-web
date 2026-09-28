# Bruno API koleksiyonu

`dusukbutce-api/` — API uçları için Bruno koleksiyonu (Postman'e alternatif, istekler bu repoda `.bru` dosyaları olarak tutulur).

## Kullanım

- **Bruno masaüstü uygulaması**: `bruno/dusukbutce-api/` klasörünü açın.
- **CLI** (headless, CI için): `npx @usebruno/cli run --env local` (proje kökünden).

## Ortam

`environments/local.bru` → `baseUrl: http://localhost:3000`. Prod'a karşı çalıştırmak için ayrı bir `prod.bru` ortamı oluşturup `baseUrl`'i değiştirin — **Contact isteğini prod'a karşı çalıştırmayın**, gerçek bir e-posta bildirimi tetikler.

## Yeni istek eklemek

Yeni bir klasör (`bru create` ya da masaüstü uygulamasından) + `.bru` dosyası. Var olan isteklerin `docs {}` bloğunu örnek alın — hangi alanların zorunlu olduğu, rate limit, ve prod'a karşı çalıştırmanın güvenli olup olmadığı belirtilmeli.
