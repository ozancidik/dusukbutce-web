// Cloudflare Worker - Güvenlik Katmanı
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Güvenlik kontrolleri
  const url = new URL(request.url)
  const userAgent = request.headers.get('user-agent') || ''
  
  // Bot kontrolü
  if (isBadBot(userAgent)) {
    return new Response('Bot erişimi engellendi', { status: 403 })
  }
  
  // SQL Injection kontrolü
  if (hasSQLInjection(url.search)) {
    return new Response('Geçersiz istek', { status: 400 })
  }
  
  // XSS kontrolü
  if (hasXSS(url.search)) {
    return new Response('XSS saldırısı tespit edildi', { status: 400 })
  }
  
  // Rate limiting (basit)
  const clientIP = request.headers.get('cf-connecting-ip')
  if (await isRateLimited(clientIP)) {
    return new Response('Çok fazla istek', { status: 429 })
  }
  
  // Güvenlik headers ekle
  const response = await fetch(request)
  const newResponse = new Response(response.body, response)
  
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('X-XSS-Protection', '1; mode=block')
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newResponse.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';")
  
  return newResponse
}

function isBadBot(userAgent) {
  const badBots = ['bot', 'crawler', 'spider', 'scraper']
  return badBots.some(bot => userAgent.toLowerCase().includes(bot)) && 
         !userAgent.toLowerCase().includes('googlebot') &&
         !userAgent.toLowerCase().includes('bingbot')
}

function hasSQLInjection(query) {
  const sqlPatterns = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'UNION']
  return sqlPatterns.some(pattern => query.toUpperCase().includes(pattern))
}

function hasXSS(query) {
  const xssPatterns = ['<script', 'javascript:', 'onload=', 'onerror=']
  return xssPatterns.some(pattern => query.toLowerCase().includes(pattern))
}

async function isRateLimited(ip) {
  // Basit rate limiting - gerçek uygulamada KV store kullanın
  return false
} 