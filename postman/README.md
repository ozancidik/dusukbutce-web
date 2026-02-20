# DusukButce API – Postman Collection

Bu klasörde **DusukButce API Collection** bulunur.

## İçe aktarma

1. Postman’i açın.
2. **Import** → **Upload Files** veya **File** → **Import**.
3. `DusukButce_API.postman_collection.json` dosyasını seçin.

## Ortam değişkenleri

Collection’da kullanılan değişkenler:

| Değişken      | Açıklama              | Örnek              |
|---------------|------------------------|--------------------|
| `base_url`    | API base URL           | `http://localhost:3000` |
| `auth_token`  | JWT (Login sonrası)    | —                  |
| `admin_token` | Admin JWT              | —                  |
| `user_id`     | Kullanıcı ID           | —                  |
| `csrf_token`  | CSRF (Login için)      | —                  |

Postman’de **Environments** oluşturup `base_url` = `http://localhost:3000` (veya production URL) verin.

## Register (Kayıt)

- **Auth → Register** isteğinde body’de `kvkkApproved: true` **zorunludur** (API 400 döner yoksa).
- Örnek body: `email`, `password`, `firstName`, `lastName`, `cep_telefonu`, `birth_date`, `acceptNewsletter`, `kvkkApproved`.
