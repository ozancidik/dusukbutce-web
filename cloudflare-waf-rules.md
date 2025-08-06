# Cloudflare WAF Kuralları

## 🔒 Güvenlik Kuralları

### 1. SQL Injection Koruması
**Rule Name:** Block SQL Injection
**Expression:** `(http.request.uri.query contains "SELECT" or http.request.uri.query contains "INSERT" or http.request.uri.query contains "DROP" or http.request.uri.query contains "UNION")`
**Action:** Block

### 2. XSS Koruması  
**Rule Name:** Block XSS Attacks
**Expression:** `(http.request.uri.query contains "<script" or http.request.uri.query contains "javascript:" or http.request.uri.query contains "onload=")`
**Action:** Block

### 3. File Inclusion Koruması
**Rule Name:** Block File Inclusion
**Expression:** `(http.request.uri.query contains "../" or http.request.uri.query contains "php://" or http.request.uri.query contains "file://")`
**Action:** Block

### 4. Bot Koruması
**Rule Name:** Block Bad Bots
**Expression:** `(http.user_agent contains "bot" and not http.user_agent contains "googlebot" and not http.user_agent contains "bingbot")`
**Action:** Challenge (Captcha)

### 5. Rate Limiting
**Rule Name:** Rate Limit API
**Expression:** `(http.request.uri.path contains "/api/")`
**Action:** Rate Limit (100 requests per 15 minutes)

## 🛡️ Ek Güvenlik Ayarları

### Security Level: Medium
### Bot Fight Mode: On
### Browser Integrity Check: On
### Always Use HTTPS: On
### SSL/TLS: Full (strict)

## 📊 Firewall Rules

### 1. Türkiye IP Koruması (İsteğe bağlı)
**Rule Name:** Allow Turkey Only
**Expression:** `(ip.geoip.country ne "TR")`
**Action:** Block

### 2. Admin Panel Koruması
**Rule Name:** Protect Admin Routes
**Expression:** `(http.request.uri.path contains "/admin" or http.request.uri.path contains "/wp-admin")`
**Action:** Challenge

## 🔧 Page Rules

### 1. Cache Everything
**URL Pattern:** `dusukbutce.com/*`
**Settings:**
- Cache Level: Cache Everything
- Edge Cache TTL: 4 hours
- Browser Cache TTL: 30 minutes

### 2. Security Headers
**URL Pattern:** `dusukbutce.com/*`
**Settings:**
- Security Level: High
- SSL: Full (strict)
- Always Use HTTPS: On 