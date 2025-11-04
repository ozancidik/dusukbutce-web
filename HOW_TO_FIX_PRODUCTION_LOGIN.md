# Production'da Admin Login Sorunu Çözümü

## Sorun
`ozancidik@gmail.com` hesabı Google ile oluşturulduğu için `authProviders` array'inde sadece `google` var.
Normal şifre ile giriş yapılamıyor.

## Çözüm Seçenekleri

### Seçenek 1: MongoDB Atlas Üzerinden Manuel Güncelleme (EN KOLAY)

1. **MongoDB Atlas**'a giriş yapın: https://cloud.mongodb.com
2. **Clusters** > **Browse Collections**
3. **users** collection'ını açın
4. `ozancidik@gmail.com` kullanıcısını bulun
5. **Edit Document** butonuna tıklayın
6. `authProviders` array'ine ekleyin:
   ```json
   {
     "provider": "local",
     "providerId": "local",
     "connectedAt": {"$date": "2025-10-07T12:00:00.000Z"}
   }
   ```
7. `password` field'ını güncelleyin (bcrypt hash):
   ```
   $2b$10$YourHashedPasswordHere
   ```
8. **Update** butonuna tıklayın

**Yeni Şifre Oluşturmak İçin:**
```bash
# Local bilgisayarınızda çalıştırın:
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YeniSifreniz123!', 10, (err, hash) => { console.log(hash); });"
```

### Seçenek 2: Script ile (Sunucu Erişiminiz Varsa)

```bash
# Production sunucusunda:
cd /path/to/dusukbutce-web
node scripts/add-local-provider.js ozancidik@gmail.com YeniSifreniz123!
```

### Seçenek 3: Şifre Sıfırlama Kullan (EN GÜVENLİ)

1. Production sitesinde: https://www.dusukbutce.com/sifremi-unuttum
2. `ozancidik@gmail.com` emailini girin
3. Gelen linke tıklayın
4. Yeni şifre belirleyin
5. Bu otomatik olarak `local` provider ekleyecek

---

## Son Kontrol

Script çalıştırıldıktan sonra:

```bash
# Test login
curl -X POST https://www.dusukbutce.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "ozancidik@gmail.com", "password": "YeniSifreniz123!"}'
```

Başarılı yanıt alırsanız:
```json
{
  "success": true,
  "message": "Giriş başarılı",
  "token": "..."
}
```

## Admin Paneline Giriş

Artık şu bilgilerle giriş yapabilirsiniz:
- URL: https://www.dusukbutce.com/admin
- E-posta: ozancidik@gmail.com
- Şifre: [Yeni belirlediğiniz şifre]

